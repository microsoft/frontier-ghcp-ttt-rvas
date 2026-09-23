#!/usr/bin/env python3
"""Move Azure Boards work items recorded by the seed command to the recycle bin."""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

from common import (
    DEFAULT_STATE_PATH,
    ITERATION_ALIASES,
    LOGICAL_RELATIONS,
    SCHEMA_VERSION,
    ValidationError,
    normalize_organization,
    require_supported_process,
    sanitize_text,
)


class InputError(ValueError):
    """Raised when cleanup cannot safely continue."""


def _read_json(path: Path) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise InputError(f"State file not found: {path}") from exc
    except (OSError, json.JSONDecodeError) as exc:
        raise InputError(f"Could not read state file {path}: {exc}") from exc
    if not isinstance(value, dict):
        raise InputError(f"State file must contain a JSON object: {path}")
    return value


def _require_string(value: Any, path: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise InputError(f"State field {path} must be a non-empty string.")
    return value.strip()


def _seed_tag(state: dict[str, Any]) -> str:
    tag = state.get("seedTag")
    if not isinstance(tag, str) or not tag.strip():
        raise InputError(
            "State field seedTag must contain the unique tag added to every seeded item."
        )
    return tag.strip()


def _validate_state(state: dict[str, Any]) -> None:
    if state.get("schemaVersion") != SCHEMA_VERSION:
        raise InputError(
            f"State schemaVersion must be {SCHEMA_VERSION}, "
            f"found {state.get('schemaVersion')!r}."
        )
    _require_string(state.get("organization"), "organization")
    _require_string(state.get("project"), "project")
    _require_string(state.get("team"), "team")
    _require_string(state.get("areaPath"), "areaPath")
    _require_string(state.get("manifestPath"), "manifestPath")
    _require_string(state.get("mappingPath"), "mappingPath")
    process = _require_string(state.get("process"), "process")
    try:
        require_supported_process(process)
    except ValueError as exc:
        raise InputError(str(exc)) from exc
    digest = _require_string(state.get("manifestSha256"), "manifestSha256")
    if len(digest) != 64 or any(character not in "0123456789abcdefABCDEF" for character in digest):
        raise InputError("State field manifestSha256 must be a 64-character hexadecimal digest.")
    _seed_tag(state)

    iteration_paths = state.get("iterationPaths")
    if not isinstance(iteration_paths, dict):
        raise InputError("State field iterationPaths must be an object.")
    for alias in ITERATION_ALIASES:
        _require_string(iteration_paths.get(alias), f"iterationPaths.{alias}")

    work_items = state.get("workItems")
    if not isinstance(work_items, dict) or not work_items:
        raise InputError("State field workItems must be a non-empty object.")
    seen_ids: set[int] = set()
    for key, record in work_items.items():
        _require_string(key, "workItems key")
        if not isinstance(record, dict):
            raise InputError(f"State workItems.{key} must be an object.")
        item_id = record.get("id")
        if not isinstance(item_id, int) or isinstance(item_id, bool) or item_id <= 0:
            raise InputError(f"State workItems.{key}.id must be a positive integer.")
        if item_id in seen_ids:
            raise InputError(f"State contains duplicate work item ID {item_id}.")
        seen_ids.add(item_id)
        _require_string(record.get("type"), f"workItems.{key}.type")
        _require_string(record.get("url"), f"workItems.{key}.url")

    relations = state.get("relations")
    if not isinstance(relations, list):
        raise InputError("State field relations must be an array.")
    for index, relation in enumerate(relations):
        if not isinstance(relation, dict):
            raise InputError(f"State relations[{index}] must be an object.")
        _require_string(relation.get("source"), f"relations[{index}].source")
        relation_name = _require_string(
            relation.get("relation"), f"relations[{index}].relation"
        )
        if relation_name not in LOGICAL_RELATIONS:
            raise InputError(
                f"State relations[{index}].relation has unsupported value "
                f"{relation_name!r}."
            )
        _require_string(relation.get("target"), f"relations[{index}].target")


def _normalize_organization(value: str) -> str:
    try:
        normalized = normalize_organization(value)
    except ValidationError as exc:
        raise InputError(str(exc)) from exc
    parsed = urlparse(normalized)
    return f"{parsed.scheme.lower()}://{parsed.netloc.lower()}{parsed.path.rstrip('/')}"


def _run_az(arguments: list[str]) -> subprocess.CompletedProcess[str]:
    try:
        return subprocess.run(
            ["az", *arguments],
            check=False,
            capture_output=True,
            text=True,
        )
    except FileNotFoundError as exc:
        raise InputError("Azure CLI executable 'az' was not found.") from exc


def _error_text(result: subprocess.CompletedProcess[str]) -> str:
    text = (result.stderr or result.stdout).strip()
    detail = text.splitlines()[-1] if text else f"Azure CLI exited with code {result.returncode}"
    return sanitize_text(detail)


def _show_work_item(
    item_id: int, organization: str, project: str
) -> tuple[dict[str, Any] | None, str | None]:
    result = _run_az(
        [
            "boards",
            "work-item",
            "show",
            "--id",
            str(item_id),
            "--organization",
            organization,
            "--project",
            project,
            "--output",
            "json",
        ]
    )
    if result.returncode:
        return None, _error_text(result)
    try:
        value = json.loads(result.stdout)
    except json.JSONDecodeError:
        return None, "Azure CLI returned invalid JSON"
    if not isinstance(value, dict):
        return None, "Azure CLI returned a non-object JSON value"
    return value, None


def _delete_work_item(
    item_id: int, organization: str, project: str
) -> subprocess.CompletedProcess[str]:
    return _run_az(
        [
            "boards",
            "work-item",
            "delete",
            "--id",
            str(item_id),
            "--organization",
            organization,
            "--project",
            project,
            "--yes",
            "--output",
            "json",
        ]
    )


def _tags(value: Any) -> set[str]:
    if isinstance(value, str):
        return {part.strip().casefold() for part in value.split(";") if part.strip()}
    if isinstance(value, list):
        return {str(part).strip().casefold() for part in value if str(part).strip()}
    return set()


def _atomic_write(path: Path, value: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(
        dir=path.parent, prefix=f".{path.name}.", suffix=".tmp"
    )
    temporary_path = Path(temporary_name)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8") as handle:
            json.dump(value, handle, indent=2)
            handle.write("\n")
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temporary_path, path)
    except BaseException:
        temporary_path.unlink(missing_ok=True)
        raise


def _creation_order(state: dict[str, Any]) -> list[tuple[str, dict[str, Any]]]:
    work_items: dict[str, dict[str, Any]] = state["workItems"]
    declared_order = state.get("creationOrder")
    if not isinstance(declared_order, list):
        raise InputError(
            "State field creationOrder must be an array. "
            "This state file predates the supported seed schema; create a new seed."
        )

    by_id = {record["id"]: key for key, record in work_items.items()}
    keys: list[str] = []
    for entry in declared_order:
        if isinstance(entry, str) and entry in work_items:
            key = entry
        elif isinstance(entry, int) and not isinstance(entry, bool) and entry in by_id:
            key = by_id[entry]
        else:
            raise InputError(
                f"State creationOrder entry {entry!r} does not match a recorded item."
            )
        if key in keys:
            raise InputError(f"State creationOrder repeats work item {key!r}.")
        keys.append(key)
    missing = set(work_items) - set(keys)
    if missing:
        raise InputError(
            "State creationOrder is missing work items: " + ", ".join(sorted(missing)) + "."
        )
    return [(key, work_items[key]) for key in keys]


def _command_text(item_id: int, organization: str, project: str) -> str:
    return (
        "az boards work-item delete "
        f"--id {item_id} --organization {json.dumps(organization)} "
        f"--project {json.dumps(project)} --yes --output json"
    )


def reset(args: argparse.Namespace) -> int:
    state_path = Path(args.state)
    state = _read_json(state_path)
    _validate_state(state)
    organization = _normalize_organization(args.organization)
    state_organization = _normalize_organization(state["organization"])

    if organization != state_organization:
        raise InputError(
            f"Organization mismatch: state has {state_organization!r}, "
            f"command has {organization!r}."
        )
    if args.project.strip().casefold() != state["project"].strip().casefold():
        raise InputError(
            f"Project mismatch: state has {state['project']!r}, "
            f"command has {args.project!r}."
        )

    seed_tag = _seed_tag(state)
    creation_order = _creation_order(state)
    checked_items: dict[str, dict[str, Any]] = {}
    preflight_errors: list[str] = []
    for key, record in creation_order:
        item, error = _show_work_item(record["id"], organization, args.project)
        if error:
            preflight_errors.append(
                f"Work item {key!r} ({record['id']}) could not be read: {error}."
            )
            continue
        fields = item.get("fields")
        if not isinstance(fields, dict):
            preflight_errors.append(
                f"Work item {key!r} ({record['id']}) has no fields object."
            )
            continue
        if seed_tag.casefold() not in _tags(fields.get("System.Tags")):
            preflight_errors.append(
                f"Work item {key!r} ({record['id']}) is missing seed tag "
                f"{seed_tag!r}; no items were deleted."
            )
            continue
        checked_items[key] = item

    if preflight_errors:
        for error in preflight_errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    reverse_order = list(reversed(creation_order))
    if args.dry_run:
        print(f"Dry run: {len(reverse_order)} recorded work items would be deleted.")
        for key, record in reverse_order:
            print(f"{key}: {_command_text(record['id'], organization, args.project)}")
        return 0

    if not args.yes:
        prompt = (
            f"Move {len(reverse_order)} recorded work items to the Azure Boards "
            "recycle bin? [y/N] "
        )
        try:
            answer = input(prompt)
        except EOFError as exc:
            raise InputError("Confirmation required. Pass --yes for non-interactive use.") from exc
        if answer.strip().casefold() not in {"y", "yes"}:
            print("Reset cancelled.")
            return 0

    started_at = datetime.now(timezone.utc).isoformat()
    cleanup: dict[str, Any] = {
        "startedAt": started_at,
        "status": "inProgress",
        "results": [],
    }
    state["cleanup"] = cleanup
    _atomic_write(state_path, state)

    failed = False
    for key, record in reverse_order:
        item_id = record["id"]
        result_entry: dict[str, Any] = {"key": key, "id": item_id}
        delete_result = _delete_work_item(item_id, organization, args.project)
        if delete_result.returncode:
            result_entry["status"] = "failed"
            result_entry["error"] = _error_text(delete_result)
            failed = True
        else:
            remaining, error = _show_work_item(
                item_id, organization, args.project
            )
            if remaining is not None:
                result_entry["status"] = "failed"
                result_entry["error"] = (
                    "Azure CLI delete returned success, but the item is still readable."
                )
                failed = True
            else:
                result_entry["status"] = "deleted"
                if error:
                    result_entry["confirmation"] = error
        cleanup["results"].append(result_entry)
        _atomic_write(state_path, state)
        if result_entry["status"] == "deleted":
            print(f"Deleted {key} ({item_id}) to the recycle bin.")
        else:
            print(
                f"ERROR: Could not delete {key!r} ({item_id}): "
                f"{result_entry['error']}",
                file=sys.stderr,
            )

    cleanup["completedAt"] = datetime.now(timezone.utc).isoformat()
    if failed:
        cleanup["status"] = "partialFailure"
        _atomic_write(state_path, state)
        print(
            f"Reset was incomplete. Cleanup results remain in {state_path}.",
            file=sys.stderr,
        )
        return 1

    cleanup["status"] = "complete"
    _atomic_write(state_path, state)
    try:
        state_path.unlink()
    except OSError as exc:
        cleanup["status"] = "completeStateRetained"
        cleanup["stateRemovalError"] = str(exc)
        _atomic_write(state_path, state)
        print(
            f"All work items were deleted, but the state file could not be removed: {exc}",
            file=sys.stderr,
        )
        return 1
    print(f"Reset complete. Removed state file {state_path}.")
    return 0


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Delete state-recorded Azure Boards items to the recycle bin."
    )
    parser.add_argument("--organization", required=True, help="Azure DevOps organization URL.")
    parser.add_argument("--project", required=True, help="Azure DevOps project name.")
    parser.add_argument(
        "--state",
        "--state-file",
        dest="state",
        default=DEFAULT_STATE_PATH,
        help=f"Seed state path. Default: {DEFAULT_STATE_PATH}",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Verify ownership and print delete commands without changing Azure Boards.",
    )
    parser.add_argument(
        "--yes",
        action="store_true",
        help="Skip the interactive deletion confirmation.",
    )
    return parser


def main() -> int:
    try:
        return reset(_parser().parse_args())
    except InputError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2
    except OSError as exc:
        print(f"ERROR: Could not update the state file: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
