#!/usr/bin/env python3
"""Verify Azure Boards work items recorded by the seed command."""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
from collections import Counter
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

from common import (
    DEFAULT_MANIFEST_PATH,
    DEFAULT_MAPPING_PATH,
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
    """Raised when a local input file does not match the command contract."""


def _read_json(path: Path, label: str) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise InputError(f"{label} file not found: {path}") from exc
    except (OSError, json.JSONDecodeError) as exc:
        raise InputError(f"Could not read {label} file {path}: {exc}") from exc
    if not isinstance(value, dict):
        raise InputError(f"{label} file must contain a JSON object: {path}")
    return value


def _require_string(value: Any, path: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise InputError(f"State field {path} must be a non-empty string.")
    return value.strip()


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

    creation_order = state.get("creationOrder")
    if not isinstance(creation_order, list):
        raise InputError(
            "State field creationOrder must be an array. "
            "This state file predates the supported seed schema; create a new seed."
        )
    if any(not isinstance(key, str) or key not in work_items for key in creation_order):
        raise InputError("State creationOrder must contain only recorded work item keys.")
    if len(creation_order) != len(set(creation_order)):
        raise InputError("State creationOrder must not repeat work item keys.")
    missing_order_keys = set(work_items) - set(creation_order)
    if missing_order_keys:
        raise InputError(
            "State creationOrder is missing work items: "
            + ", ".join(sorted(missing_order_keys))
            + "."
        )

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


def _seed_tag(state: dict[str, Any]) -> str:
    tag = state.get("seedTag")
    if not isinstance(tag, str) or not tag.strip():
        raise InputError(
            "State field seedTag must contain the unique tag added to every seeded item."
        )
    return tag.strip()


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


def _load_work_item(
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
            "--expand",
            "relations",
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


def _validate_manifest(manifest: dict[str, Any]) -> tuple[dict[str, dict[str, Any]], list[dict[str, str]]]:
    if manifest.get("schemaVersion") != SCHEMA_VERSION:
        raise InputError(
            f"Manifest schemaVersion must be {SCHEMA_VERSION}, "
            f"found {manifest.get('schemaVersion')!r}."
        )
    items = manifest.get("workItems")
    if not isinstance(items, list) or not items:
        raise InputError("Manifest field workItems must be a non-empty array.")
    by_key: dict[str, dict[str, Any]] = {}
    for index, item in enumerate(items):
        if not isinstance(item, dict):
            raise InputError(f"Manifest workItems[{index}] must be an object.")
        key = item.get("key")
        if not isinstance(key, str) or not key:
            raise InputError(f"Manifest workItems[{index}].key must be a non-empty string.")
        if key in by_key:
            raise InputError(f"Manifest contains duplicate work item key {key!r}.")
        if not isinstance(item.get("type"), str):
            raise InputError(f"Manifest work item {key!r} must define type.")
        if item.get("iteration") not in ITERATION_ALIASES:
            raise InputError(
                f"Manifest work item {key!r} has unsupported iteration "
                f"{item.get('iteration')!r}."
            )
        by_key[key] = item

    relations = manifest.get("relations")
    if not isinstance(relations, list):
        raise InputError("Manifest field relations must be an array.")
    checked_relations: list[dict[str, str]] = []
    for index, relation in enumerate(relations):
        if not isinstance(relation, dict):
            raise InputError(f"Manifest relations[{index}] must be an object.")
        source = relation.get("source")
        target = relation.get("target")
        relation_name = relation.get("relation")
        if source not in by_key or target not in by_key:
            raise InputError(
                f"Manifest relations[{index}] references an unknown work item key."
            )
        if relation_name not in LOGICAL_RELATIONS:
            raise InputError(
                f"Manifest relations[{index}] has unsupported relation {relation_name!r}."
            )
        checked_relations.append(
            {"source": source, "relation": relation_name, "target": target}
        )
    return by_key, checked_relations


def _process_mapping(mapping: dict[str, Any], process: str) -> tuple[dict[str, str], dict[str, str], dict[str, str]]:
    if mapping.get("schemaVersion") != SCHEMA_VERSION:
        raise InputError(
            f"Mapping schemaVersion must be {SCHEMA_VERSION}, "
            f"found {mapping.get('schemaVersion')!r}."
        )
    processes = mapping.get("processes")
    process_entry = processes.get(process) if isinstance(processes, dict) else None
    if not isinstance(process_entry, dict):
        raise InputError(f"Mapping does not define process {process!r}.")
    work_item_types = process_entry.get("workItemTypes")
    fields = mapping.get("fields")
    relations = mapping.get("relations")
    if not isinstance(work_item_types, dict):
        raise InputError(f"Mapping process {process!r} must define workItemTypes.")
    if not isinstance(fields, dict):
        raise InputError("Mapping field fields must be an object.")
    if not isinstance(relations, dict):
        raise InputError("Mapping field relations must be an object.")
    return work_item_types, fields, relations


def _tags(value: Any) -> set[str]:
    if isinstance(value, str):
        return {part.strip().casefold() for part in value.split(";") if part.strip()}
    if isinstance(value, list):
        return {str(part).strip().casefold() for part in value if str(part).strip()}
    return set()


def _relation_target_id(relation: dict[str, Any]) -> int | None:
    url = relation.get("url")
    if not isinstance(url, str):
        return None
    try:
        return int(url.rstrip("/").rsplit("/", 1)[-1])
    except ValueError:
        return None


def _manifest_digest(path: Path) -> str:
    try:
        return hashlib.sha256(path.read_bytes()).hexdigest()
    except OSError as exc:
        raise InputError(f"Could not hash manifest file {path}: {exc}") from exc


def verify(args: argparse.Namespace) -> int:
    state_path = Path(args.state)
    manifest_path = Path(args.manifest)
    mapping_path = Path(args.mapping)
    state = _read_json(state_path, "State")
    _validate_state(state)
    manifest = _read_json(manifest_path, "Manifest")
    manifest_items, manifest_relations = _validate_manifest(manifest)
    mapping = _read_json(mapping_path, "Mapping")
    work_item_types, fields, relation_types = _process_mapping(
        mapping, state["process"]
    )
    organization = _normalize_organization(args.organization)
    state_organization = _normalize_organization(state["organization"])

    mismatches: list[str] = []
    if organization != state_organization:
        mismatches.append(
            "Organization mismatch: "
            f"state has {state_organization!r}, command has {organization!r}."
        )
    if args.project.strip().casefold() != state["project"].strip().casefold():
        mismatches.append(
            f"Project mismatch: state has {state['project']!r}, "
            f"command has {args.project!r}."
        )
    actual_digest = _manifest_digest(manifest_path)
    if actual_digest.casefold() != state["manifestSha256"].casefold():
        mismatches.append(
            "Manifest hash mismatch: the state file was created from a different manifest."
        )

    state_items: dict[str, dict[str, Any]] = state["workItems"]
    missing_keys = sorted(set(manifest_items) - set(state_items))
    extra_keys = sorted(set(state_items) - set(manifest_items))
    if missing_keys:
        mismatches.append(
            "State is missing manifest work items: " + ", ".join(missing_keys) + "."
        )
    if extra_keys:
        mismatches.append(
            "State contains work items not present in the manifest: "
            + ", ".join(extra_keys)
            + "."
        )

    seed_tag = _seed_tag(state)
    remote_items: dict[str, dict[str, Any]] = {}
    expected_type_counts: Counter[str] = Counter()
    actual_type_counts: Counter[str] = Counter()
    expected_logical_counts = Counter(
        item["type"] for item in manifest_items.values()
    )
    actual_logical_counts: Counter[str] = Counter()
    logical_type_by_azure_type = {
        azure_type: logical_type
        for logical_type, azure_type in work_item_types.items()
        if isinstance(azure_type, str)
    }
    area_path = state["areaPath"]
    area_field = fields.get("areaPath", "System.AreaPath")
    iteration_field = fields.get("iterationPath", "System.IterationPath")
    tags_field = fields.get("tags", "System.Tags")

    for key, record in state_items.items():
        item, error = _load_work_item(record["id"], organization, args.project)
        if error:
            mismatches.append(
                f"Work item {key!r} ({record['id']}) could not be read: {error}."
            )
            continue
        remote_items[key] = item
        item_fields = item.get("fields")
        if not isinstance(item_fields, dict):
            mismatches.append(
                f"Work item {key!r} ({record['id']}) has no fields object."
            )
            continue

        spec = manifest_items.get(key)
        if spec is None:
            continue
        expected_type = work_item_types.get(spec["type"])
        if not isinstance(expected_type, str):
            mismatches.append(
                f"Mapping has no work-item type for logical type {spec['type']!r}."
            )
        else:
            expected_type_counts[expected_type] += 1
            actual_type = item_fields.get("System.WorkItemType")
            if isinstance(actual_type, str):
                actual_type_counts[actual_type] += 1
                logical_type = logical_type_by_azure_type.get(actual_type)
                if logical_type:
                    actual_logical_counts[logical_type] += 1
            if actual_type != expected_type:
                mismatches.append(
                    f"Work item {key!r} ({record['id']}) type is "
                    f"{actual_type!r}; expected {expected_type!r}."
                )
            if record["type"] != expected_type:
                mismatches.append(
                    f"State work item {key!r} records type {record['type']!r}; "
                    f"expected {expected_type!r}."
                )

        if seed_tag.casefold() not in _tags(item_fields.get(tags_field)):
            mismatches.append(
                f"Work item {key!r} ({record['id']}) is missing seed tag "
                f"{seed_tag!r}."
            )

        actual_project = item_fields.get("System.TeamProject")
        if actual_project is not None and (
            not isinstance(actual_project, str)
            or actual_project.casefold() != state["project"].casefold()
        ):
            mismatches.append(
                f"Work item {key!r} ({record['id']}) belongs to project "
                f"{actual_project!r}; expected {state['project']!r}."
            )
        actual_area = item_fields.get(area_field)
        if actual_area != area_path:
            mismatches.append(
                f"Work item {key!r} ({record['id']}) area path is "
                f"{actual_area!r}; expected {area_path!r}."
            )
        expected_iteration = state["iterationPaths"][spec["iteration"]]
        actual_iteration = item_fields.get(iteration_field)
        if actual_iteration != expected_iteration:
            mismatches.append(
                f"Work item {key!r} ({record['id']}) iteration path is "
                f"{actual_iteration!r}; expected {expected_iteration!r}."
            )

    if expected_type_counts != actual_type_counts:
        mismatches.append(
            "Work-item counts by Azure type differ: "
            f"expected {dict(sorted(expected_type_counts.items()))}, "
            f"found {dict(sorted(actual_type_counts.items()))}."
        )
    if expected_logical_counts != actual_logical_counts:
        mismatches.append(
            "Work-item counts by logical type differ: "
            f"expected {dict(sorted(expected_logical_counts.items()))}, "
            f"found {dict(sorted(actual_logical_counts.items()))}."
        )

    state_relation_set = {
        (relation["source"], relation["relation"], relation["target"])
        for relation in state["relations"]
    }
    manifest_relation_set = {
        (relation["source"], relation["relation"], relation["target"])
        for relation in manifest_relations
    }
    if state_relation_set != manifest_relation_set:
        missing = sorted(manifest_relation_set - state_relation_set)
        extra = sorted(state_relation_set - manifest_relation_set)
        if missing:
            mismatches.append(f"State is missing relations: {missing}.")
        if extra:
            mismatches.append(f"State contains unexpected relations: {extra}.")

    for relation in manifest_relations:
        source_key = relation["source"]
        target_key = relation["target"]
        if source_key not in remote_items or target_key not in state_items:
            continue
        relation_name = relation["relation"]
        expected_relation_type = relation_types.get(relation_name)
        if not isinstance(expected_relation_type, str):
            mismatches.append(
                f"Mapping has no Azure relation for {relation_name!r}."
            )
            continue
        remote_relations = remote_items[source_key].get("relations", [])
        found = any(
            isinstance(remote_relation, dict)
            and remote_relation.get("rel") == expected_relation_type
            and _relation_target_id(remote_relation) == state_items[target_key]["id"]
            for remote_relation in remote_relations
        )
        if not found:
            mismatches.append(
                f"Relation {source_key!r} {relation_name} {target_key!r} is missing."
            )

    if mismatches:
        for mismatch in mismatches:
            print(f"ERROR: {mismatch}", file=sys.stderr)
        print(
            f"Verification failed with {len(mismatches)} mismatch(es).",
            file=sys.stderr,
        )
        return 1

    print(f"Verified {len(state_items)} work items and {len(manifest_relations)} relations.")
    return 0


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Verify Azure Boards items recorded in a local seed state file."
    )
    parser.add_argument("--organization", required=True, help="Azure DevOps organization URL.")
    parser.add_argument("--project", required=True, help="Azure DevOps project name.")
    parser.add_argument(
        "--manifest",
        default=DEFAULT_MANIFEST_PATH,
        help=f"Seed manifest path. Default: {DEFAULT_MANIFEST_PATH}",
    )
    parser.add_argument(
        "--mapping",
        default=DEFAULT_MAPPING_PATH,
        help=f"Process mapping path. Default: {DEFAULT_MAPPING_PATH}",
    )
    parser.add_argument(
        "--state",
        "--state-file",
        dest="state",
        default=DEFAULT_STATE_PATH,
        help=f"Seed state path. Default: {DEFAULT_STATE_PATH}",
    )
    return parser


def main() -> int:
    try:
        return verify(_parser().parse_args())
    except InputError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
