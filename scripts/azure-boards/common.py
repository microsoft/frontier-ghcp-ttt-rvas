"""Shared helpers for Azure Boards seed, verify, and reset commands."""

from __future__ import annotations

import hashlib
import json
import os
import re
import shlex
import shutil
import subprocess
import tempfile
from collections.abc import Iterable, Mapping, Sequence
from pathlib import Path
from typing import Any, Final, Literal, TypedDict, cast
from urllib.parse import urlsplit, urlunsplit


ProcessName = Literal["Agile", "Scrum"]
LogicalWorkItemType = Literal["Epic", "Feature", "Requirement", "Task", "Bug"]
LogicalRelation = Literal["parentOf", "childOf", "dependsOn", "predecessorOf"]
IterationAlias = Literal["current", "future"]

SCHEMA_VERSION: Final = 1
SUPPORTED_PROCESSES: Final[tuple[ProcessName, ...]] = ("Agile", "Scrum")
LOGICAL_WORK_ITEM_TYPES: Final[tuple[LogicalWorkItemType, ...]] = (
    "Epic",
    "Feature",
    "Requirement",
    "Task",
    "Bug",
)
LOGICAL_RELATIONS: Final[tuple[LogicalRelation, ...]] = (
    "parentOf",
    "childOf",
    "dependsOn",
    "predecessorOf",
)
ITERATION_ALIASES: Final[tuple[IterationAlias, ...]] = ("current", "future")

DEFAULT_MANIFEST_PATH: Final = "data/azure-boards/service-request-portal.json"
DEFAULT_MAPPING_PATH: Final = "data/azure-boards/process-mappings.json"
DEFAULT_STATE_PATH: Final = ".azure-boards-seed-state.json"
SEED_TAG_PREFIX: Final = "rvas-seed"

_SECRET_PATTERNS: Final[tuple[re.Pattern[str], ...]] = (
    re.compile(r"(?i)(authorization:\s*(?:basic|bearer)\s+)\S+"),
    re.compile(r"(?i)((?:pat|token|password|secret)\s*[=:]\s*)\S+"),
    re.compile(r"(?i)([?&](?:access_token|token|sig)=)[^&\s]+"),
)


class WorkItemSpec(TypedDict, total=False):
    key: str
    type: LogicalWorkItemType
    title: str
    description: str
    acceptanceCriteria: list[str]
    estimate: float
    priority: int
    tags: list[str]
    iteration: IterationAlias


class RelationSpec(TypedDict):
    source: str
    relation: LogicalRelation
    target: str


class ManifestProduct(TypedDict):
    key: str
    name: str
    description: str


class Manifest(TypedDict):
    schemaVersion: int
    product: ManifestProduct
    iterationAliases: dict[IterationAlias, str]
    workItems: list[WorkItemSpec]
    relations: list[RelationSpec]


class ProcessMapping(TypedDict):
    workItemTypes: dict[LogicalWorkItemType, str]
    estimateFields: dict[LogicalWorkItemType, str]
    states: dict[LogicalWorkItemType, dict[str, str]]


class MappingFile(TypedDict):
    schemaVersion: int
    supportedProcesses: list[ProcessName]
    logicalTypes: list[LogicalWorkItemType]
    processes: dict[ProcessName, ProcessMapping]
    fields: dict[str, str]
    relations: dict[LogicalRelation, str]


class CreatedWorkItem(TypedDict):
    id: int
    type: str
    url: str


class SeedState(TypedDict):
    schemaVersion: int
    organization: str
    project: str
    team: str
    process: ProcessName
    areaPath: str
    seedTag: str
    manifestPath: str
    mappingPath: str
    manifestSha256: str
    iterationPaths: dict[IterationAlias, str]
    workItems: dict[str, CreatedWorkItem]
    creationOrder: list[str]
    relations: list[RelationSpec]


class ToolkitError(RuntimeError):
    """Base error for user-correctable toolkit failures."""


class ValidationError(ToolkitError):
    """Raised when a local input file or argument is invalid."""


class UnsupportedProcessError(ValidationError):
    """Raised when a project process is outside the supported mapping."""


class AzureCliError(ToolkitError):
    """Raised when an Azure CLI command fails or returns invalid output."""


def require_supported_process(process: str) -> ProcessName:
    """Return a supported process name or fail with a direct message."""
    if process not in SUPPORTED_PROCESSES:
        supported = ", ".join(SUPPORTED_PROCESSES)
        raise UnsupportedProcessError(
            f"Unsupported Azure Boards process {process!r}. Use one of: {supported}."
        )
    return cast(ProcessName, process)


def load_json_object(path: str | Path, label: str) -> dict[str, Any]:
    """Load a JSON object from disk."""
    file_path = Path(path)
    try:
        with file_path.open("r", encoding="utf-8") as handle:
            value = json.load(handle)
    except FileNotFoundError as exc:
        raise ValidationError(f"{label} file not found: {file_path}") from exc
    except json.JSONDecodeError as exc:
        raise ValidationError(
            f"{label} is not valid JSON at line {exc.lineno}, column {exc.colno}: "
            f"{file_path}"
        ) from exc
    except OSError as exc:
        raise ValidationError(f"Could not read {label.lower()} file {file_path}: {exc}") from exc
    if not isinstance(value, dict):
        raise ValidationError(f"{label} must contain one JSON object: {file_path}")
    return cast(dict[str, Any], value)


def manifest_sha256(path: str | Path) -> str:
    """Return the SHA-256 digest of a manifest file."""
    try:
        return hashlib.sha256(Path(path).read_bytes()).hexdigest()
    except OSError as exc:
        raise ValidationError(f"Could not hash manifest file {path}: {exc}") from exc


def _require_keys(value: Mapping[str, Any], keys: Iterable[str], label: str) -> None:
    missing = [key for key in keys if key not in value]
    if missing:
        raise ValidationError(f"{label} is missing: {', '.join(missing)}.")


def _required_string(value: Mapping[str, Any], key: str, label: str) -> str:
    item = value.get(key)
    if not isinstance(item, str) or not item.strip():
        raise ValidationError(f"{label}.{key} must be a non-empty string.")
    return item.strip()


def _string_list(value: Any, label: str, *, allow_empty: bool = False) -> list[str]:
    if not isinstance(value, list) or (not value and not allow_empty):
        suffix = "list" if allow_empty else "non-empty list"
        raise ValidationError(f"{label} must be a {suffix} of strings.")
    if any(not isinstance(item, str) or not item.strip() for item in value):
        raise ValidationError(f"{label} must contain only non-empty strings.")
    return [cast(str, item).strip() for item in value]


def validate_manifest(raw: Mapping[str, Any]) -> Manifest:
    """Validate and return a seed manifest."""
    _require_keys(
        raw,
        ("schemaVersion", "product", "iterationAliases", "workItems", "relations"),
        "Manifest",
    )
    if raw["schemaVersion"] != SCHEMA_VERSION:
        raise ValidationError(
            f"Manifest schemaVersion must be {SCHEMA_VERSION}, "
            f"not {raw['schemaVersion']!r}."
        )

    product = raw["product"]
    if not isinstance(product, dict):
        raise ValidationError("Manifest.product must be an object.")
    product_value: ManifestProduct = {
        "key": _required_string(product, "key", "Manifest.product"),
        "name": _required_string(product, "name", "Manifest.product"),
        "description": _required_string(product, "description", "Manifest.product"),
    }
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", product_value["key"]):
        raise ValidationError(
            "Manifest.product.key must use lowercase letters, numbers, and hyphens."
        )

    aliases = raw["iterationAliases"]
    if not isinstance(aliases, dict):
        raise ValidationError("Manifest.iterationAliases must be an object.")
    alias_value: dict[IterationAlias, str] = {
        alias: _required_string(aliases, alias, "Manifest.iterationAliases")
        for alias in ITERATION_ALIASES
    }

    raw_items = raw["workItems"]
    if not isinstance(raw_items, list) or not raw_items:
        raise ValidationError("Manifest.workItems must be a non-empty list.")
    items: list[WorkItemSpec] = []
    keys: set[str] = set()
    for index, raw_item in enumerate(raw_items):
        label = f"Manifest.workItems[{index}]"
        if not isinstance(raw_item, dict):
            raise ValidationError(f"{label} must be an object.")
        _require_keys(raw_item, ("key", "type", "title", "description", "iteration"), label)
        key = _required_string(raw_item, "key", label)
        if key in keys:
            raise ValidationError(f"Manifest contains duplicate work item key {key!r}.")
        keys.add(key)
        logical_type = raw_item["type"]
        if logical_type not in LOGICAL_WORK_ITEM_TYPES:
            raise ValidationError(
                f"{label}.type must be one of: {', '.join(LOGICAL_WORK_ITEM_TYPES)}."
            )
        iteration = raw_item["iteration"]
        if iteration not in ITERATION_ALIASES:
            raise ValidationError(
                f"{label}.iteration must be one of: {', '.join(ITERATION_ALIASES)}."
            )
        item: WorkItemSpec = {
            "key": key,
            "type": cast(LogicalWorkItemType, logical_type),
            "title": _required_string(raw_item, "title", label),
            "description": _required_string(raw_item, "description", label),
            "iteration": cast(IterationAlias, iteration),
        }
        if "acceptanceCriteria" in raw_item:
            item["acceptanceCriteria"] = _string_list(
                raw_item["acceptanceCriteria"],
                f"{label}.acceptanceCriteria",
            )
        if "tags" in raw_item:
            tags = _string_list(raw_item["tags"], f"{label}.tags", allow_empty=True)
            if len(tags) != len(set(tags)):
                raise ValidationError(f"{label}.tags contains a duplicate tag.")
            item["tags"] = tags
        if "estimate" in raw_item:
            estimate = raw_item["estimate"]
            if (
                not isinstance(estimate, (int, float))
                or isinstance(estimate, bool)
                or estimate < 0
            ):
                raise ValidationError(f"{label}.estimate must be a number at least zero.")
            item["estimate"] = float(estimate)
        if "priority" in raw_item:
            priority = raw_item["priority"]
            if not isinstance(priority, int) or isinstance(priority, bool) or priority < 1:
                raise ValidationError(f"{label}.priority must be a positive integer.")
            item["priority"] = priority
        items.append(item)

    raw_relations = raw["relations"]
    if not isinstance(raw_relations, list) or not raw_relations:
        raise ValidationError("Manifest.relations must be a non-empty list.")
    relations: list[RelationSpec] = []
    relation_keys: set[tuple[str, str, str]] = set()
    dependency_count = 0
    for index, raw_relation in enumerate(raw_relations):
        label = f"Manifest.relations[{index}]"
        if not isinstance(raw_relation, dict):
            raise ValidationError(f"{label} must be an object.")
        source = _required_string(raw_relation, "source", label)
        target = _required_string(raw_relation, "target", label)
        relation = raw_relation.get("relation")
        if relation not in LOGICAL_RELATIONS:
            raise ValidationError(
                f"{label}.relation must be one of: {', '.join(LOGICAL_RELATIONS)}."
            )
        if source not in keys or target not in keys:
            raise ValidationError(f"{label} must reference existing work item keys.")
        if source == target:
            raise ValidationError(f"{label} cannot link a work item to itself.")
        relation_key = (source, cast(str, relation), target)
        if relation_key in relation_keys:
            raise ValidationError(f"{label} duplicates an earlier relation.")
        relation_keys.add(relation_key)
        if relation in ("dependsOn", "predecessorOf"):
            dependency_count += 1
        relations.append(
            {
                "source": source,
                "relation": cast(LogicalRelation, relation),
                "target": target,
            }
        )
    if dependency_count != 1:
        raise ValidationError(
            f"Manifest must define exactly one dependency relation, found {dependency_count}."
        )

    manifest: Manifest = {
        "schemaVersion": SCHEMA_VERSION,
        "product": product_value,
        "iterationAliases": alias_value,
        "workItems": items,
        "relations": relations,
    }
    ordered_work_items(manifest)
    return manifest


def load_manifest(path: str | Path) -> Manifest:
    """Load and validate a seed manifest."""
    return validate_manifest(load_json_object(path, "Manifest"))


def validate_mapping(raw: Mapping[str, Any]) -> MappingFile:
    """Validate and return the Agile and Scrum process mapping."""
    _require_keys(
        raw,
        (
            "schemaVersion",
            "supportedProcesses",
            "logicalTypes",
            "processes",
            "fields",
            "relations",
        ),
        "Mapping",
    )
    if raw["schemaVersion"] != SCHEMA_VERSION:
        raise ValidationError(
            f"Mapping schemaVersion must be {SCHEMA_VERSION}, "
            f"not {raw['schemaVersion']!r}."
        )
    supported = _string_list(raw["supportedProcesses"], "Mapping.supportedProcesses")
    if set(supported) != set(SUPPORTED_PROCESSES):
        raise ValidationError("Mapping.supportedProcesses must contain Agile and Scrum.")
    logical_types = _string_list(raw["logicalTypes"], "Mapping.logicalTypes")
    if set(logical_types) != set(LOGICAL_WORK_ITEM_TYPES):
        raise ValidationError("Mapping.logicalTypes does not match the supported logical types.")

    raw_processes = raw["processes"]
    if not isinstance(raw_processes, dict):
        raise ValidationError("Mapping.processes must be an object.")
    processes: dict[ProcessName, ProcessMapping] = {}
    for process in SUPPORTED_PROCESSES:
        raw_process = raw_processes.get(process)
        if not isinstance(raw_process, dict):
            raise ValidationError(f"Mapping.processes.{process} must be an object.")
        _require_keys(raw_process, ("workItemTypes", "estimateFields", "states"), process)
        raw_types = raw_process["workItemTypes"]
        raw_estimates = raw_process["estimateFields"]
        raw_states = raw_process["states"]
        if not all(isinstance(value, dict) for value in (raw_types, raw_estimates, raw_states)):
            raise ValidationError(f"Mapping.processes.{process} sections must be objects.")
        work_item_types: dict[LogicalWorkItemType, str] = {}
        states: dict[LogicalWorkItemType, dict[str, str]] = {}
        for logical_type in LOGICAL_WORK_ITEM_TYPES:
            work_item_types[logical_type] = _required_string(
                cast(Mapping[str, Any], raw_types),
                logical_type,
                f"Mapping.processes.{process}.workItemTypes",
            )
            raw_type_states = cast(Mapping[str, Any], raw_states).get(logical_type)
            if not isinstance(raw_type_states, dict) or not raw_type_states:
                raise ValidationError(
                    f"Mapping.processes.{process}.states.{logical_type} "
                    "must be a non-empty object."
                )
            states[logical_type] = {
                str(name): _required_string(
                    raw_type_states,
                    str(name),
                    f"Mapping.processes.{process}.states.{logical_type}",
                )
                for name in raw_type_states
            }
        estimate_fields: dict[LogicalWorkItemType, str] = {}
        for logical_type, field in cast(Mapping[str, Any], raw_estimates).items():
            if logical_type not in LOGICAL_WORK_ITEM_TYPES:
                raise ValidationError(
                    f"Mapping.processes.{process}.estimateFields has unknown type "
                    f"{logical_type!r}."
                )
            if not isinstance(field, str) or not field.strip():
                raise ValidationError(
                    f"Mapping.processes.{process}.estimateFields.{logical_type} "
                    "must be a non-empty string."
                )
            estimate_fields[cast(LogicalWorkItemType, logical_type)] = field.strip()
        processes[process] = {
            "workItemTypes": work_item_types,
            "estimateFields": estimate_fields,
            "states": states,
        }

    raw_fields = raw["fields"]
    if not isinstance(raw_fields, dict):
        raise ValidationError("Mapping.fields must be an object.")
    required_fields = (
        "title",
        "description",
        "acceptanceCriteria",
        "priority",
        "tags",
        "iterationPath",
    )
    fields = {
        key: _required_string(raw_fields, key, "Mapping.fields") for key in required_fields
    }

    raw_relations = raw["relations"]
    if not isinstance(raw_relations, dict):
        raise ValidationError("Mapping.relations must be an object.")
    relations = {
        relation: _required_string(raw_relations, relation, "Mapping.relations")
        for relation in LOGICAL_RELATIONS
    }
    return {
        "schemaVersion": SCHEMA_VERSION,
        "supportedProcesses": list(SUPPORTED_PROCESSES),
        "logicalTypes": list(LOGICAL_WORK_ITEM_TYPES),
        "processes": processes,
        "fields": fields,
        "relations": relations,
    }


def load_mapping(path: str | Path) -> MappingFile:
    """Load and validate a process mapping file."""
    return validate_mapping(load_json_object(path, "Mapping"))


def ordered_work_items(manifest: Manifest) -> list[WorkItemSpec]:
    """Return work items with every hierarchy parent before its children."""
    items_by_key = {item["key"]: item for item in manifest["workItems"]}
    incoming = {key: 0 for key in items_by_key}
    children = {key: [] for key in items_by_key}
    for relation in manifest["relations"]:
        if relation["relation"] == "parentOf":
            parent, child = relation["source"], relation["target"]
        elif relation["relation"] == "childOf":
            parent, child = relation["target"], relation["source"]
        else:
            continue
        children[parent].append(child)
        incoming[child] += 1

    manifest_order = {item["key"]: index for index, item in enumerate(manifest["workItems"])}
    ready = sorted(
        (key for key, count in incoming.items() if count == 0),
        key=manifest_order.__getitem__,
    )
    ordered: list[WorkItemSpec] = []
    while ready:
        key = ready.pop(0)
        ordered.append(items_by_key[key])
        for child in sorted(children[key], key=manifest_order.__getitem__):
            incoming[child] -= 1
            if incoming[child] == 0:
                ready.append(child)
                ready.sort(key=manifest_order.__getitem__)
    if len(ordered) != len(items_by_key):
        raise ValidationError("Manifest parent-child relations contain a cycle.")
    return ordered


def normalize_organization(value: str) -> str:
    """Validate and normalize an Azure DevOps organization URL."""
    candidate = value.strip()
    parts = urlsplit(candidate)
    if parts.scheme != "https" or not parts.netloc or parts.username or parts.password:
        raise ValidationError(
            "Organization must be an HTTPS Azure DevOps organization URL without credentials."
        )
    if parts.query or parts.fragment:
        raise ValidationError("Organization URL must not contain a query or fragment.")
    path = parts.path.rstrip("/")
    if not path:
        raise ValidationError("Organization URL must include the organization name.")
    return urlunsplit((parts.scheme, parts.netloc, path, "", ""))


def normalize_classification_path(value: str, label: str) -> str:
    """Normalize an Azure Boards area or iteration path."""
    path = value.strip().replace("/", "\\").strip("\\")
    if not path or any(part in ("", ".", "..") for part in path.split("\\")):
        raise ValidationError(f"{label} must be a valid Azure Boards path.")
    return path


def path_key(value: str) -> str:
    """Return a case-insensitive comparison key for a classification path."""
    return normalize_classification_path(value, "Path").casefold()


def build_seed_tag(product_key: str, manifest_digest: str) -> str:
    """Build the deterministic tag used to find and protect a seed."""
    return f"{SEED_TAG_PREFIX}:{product_key}:{manifest_digest[:12]}"


def wiql_string(value: str) -> str:
    """Escape one value for a single-quoted WIQL string."""
    return value.replace("'", "''")


def sanitize_text(value: str) -> str:
    """Redact common credential forms from command errors."""
    sanitized = value
    for pattern in _SECRET_PATTERNS:
        sanitized = pattern.sub(r"\1[REDACTED]", sanitized)
    return sanitized


def render_command(command: Sequence[str]) -> str:
    """Render a subprocess command for a shell without executing through one."""
    return " ".join(shlex.quote(sanitize_text(part)) for part in command)


def discover_azure_cli() -> str:
    """Find the Azure CLI executable."""
    executable = shutil.which("az")
    if executable is None:
        raise ToolkitError(
            "Azure CLI was not found. Install Azure CLI, then run this command again."
        )
    return executable


class AzureCli:
    """Run Azure CLI commands with JSON output and safe errors."""

    def __init__(self, executable: str, *, dry_run: bool = False) -> None:
        self.executable = executable
        self.dry_run = dry_run

    def command(self, arguments: Sequence[str], *, json_output: bool = True) -> list[str]:
        command = [self.executable, *arguments, "--only-show-errors"]
        if json_output:
            command.extend(("--output", "json"))
        return command

    def print_command(self, arguments: Sequence[str], *, json_output: bool = True) -> None:
        print(f"+ {render_command(self.command(arguments, json_output=json_output))}")

    def run(self, arguments: Sequence[str], *, json_output: bool = True) -> Any:
        command = self.command(arguments, json_output=json_output)
        if self.dry_run:
            print(f"+ {render_command(command)}")
            return None
        try:
            completed = subprocess.run(
                command,
                check=False,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                shell=False,
            )
        except OSError as exc:
            raise AzureCliError(
                f"Could not run Azure CLI command {render_command(command)}: {exc}"
            ) from exc
        if completed.returncode != 0:
            detail = sanitize_text(completed.stderr.strip()) or "Azure CLI returned no error text."
            raise AzureCliError(
                f"Azure CLI command failed ({completed.returncode}): "
                f"{render_command(command)}\n{detail}"
            )
        if not json_output:
            return completed.stdout
        try:
            return json.loads(completed.stdout or "null")
        except json.JSONDecodeError as exc:
            raise AzureCliError(
                f"Azure CLI returned invalid JSON for {render_command(command)}."
            ) from exc


def verify_azure_devops_extension(client: AzureCli) -> dict[str, Any]:
    """Verify that the Azure DevOps CLI extension is installed."""
    result = client.run(("extension", "show", "--name", "azure-devops"))
    if not isinstance(result, dict):
        raise AzureCliError("Azure CLI did not return Azure DevOps extension details.")
    return cast(dict[str, Any], result)


def organization_project_args(organization: str, project: str) -> list[str]:
    """Return explicit Azure DevOps scope arguments."""
    return ["--org", organization, "--project", project, "--detect", "false"]


def extract_collection(value: Any) -> list[dict[str, Any]]:
    """Normalize common Azure CLI collection response shapes."""
    if isinstance(value, list):
        return [cast(dict[str, Any], item) for item in value if isinstance(item, dict)]
    if isinstance(value, dict) and isinstance(value.get("value"), list):
        return [
            cast(dict[str, Any], item)
            for item in value["value"]
            if isinstance(item, dict)
        ]
    return []


def collect_paths(value: Any) -> dict[str, dict[str, Any]]:
    """Flatten Azure classification nodes by normalized path."""
    found: dict[str, dict[str, Any]] = {}

    def visit(node: Any, parent: str = "") -> None:
        if isinstance(node, list):
            for item in node:
                visit(item, parent)
            return
        if not isinstance(node, dict):
            return
        raw_path = node.get("path")
        name = node.get("name")
        path = raw_path if isinstance(raw_path, str) else ""
        if not path and isinstance(name, str):
            path = f"{parent}\\{name}" if parent else name
        if path:
            found[path_key(path)] = cast(dict[str, Any], node)
        next_parent = normalize_classification_path(path, "Path") if path else parent
        for key in ("children", "value", "values"):
            child_value = node.get(key)
            if isinstance(child_value, list):
                visit(child_value, next_parent)

    visit(value)
    return found


def project_process_name(project: Mapping[str, Any]) -> str:
    """Read the process template name from project details."""
    capabilities = project.get("capabilities")
    if isinstance(capabilities, dict):
        template = capabilities.get("processTemplate")
        if isinstance(template, dict):
            name = template.get("templateName")
            if isinstance(name, str):
                return name
    return ""


def relation_names_by_reference(value: Any) -> dict[str, str]:
    """Map relation reference names to CLI relation names."""
    names: dict[str, str] = {}
    for relation in extract_collection(value):
        reference = relation.get("referenceName")
        name = relation.get("name")
        if isinstance(reference, str) and isinstance(name, str):
            names[reference] = name
    return names


def field_reference_names(value: Any) -> set[str]:
    """Read field reference names from a work-item-type response."""
    fields: list[dict[str, Any]]
    if isinstance(value, dict):
        raw_fields = value.get("fields")
        if not isinstance(raw_fields, list):
            raw_fields = value.get("fieldInstances")
        fields = (
            [
                cast(dict[str, Any], field)
                for field in raw_fields
                if isinstance(field, dict)
            ]
            if isinstance(raw_fields, list)
            else []
        )
    else:
        fields = extract_collection(value)
    return {
        cast(str, field["referenceName"])
        for field in fields
        if isinstance(field.get("referenceName"), str)
    }


def extract_work_item(value: Any) -> CreatedWorkItem:
    """Read a created work item ID, type, and URL from Azure CLI output."""
    if not isinstance(value, dict):
        raise AzureCliError("Azure CLI did not return a created work item object.")
    item_id = value.get("id")
    fields = value.get("fields")
    item_type = ""
    if isinstance(fields, dict) and isinstance(fields.get("System.WorkItemType"), str):
        item_type = fields["System.WorkItemType"]
    if not item_type and isinstance(value.get("type"), str):
        item_type = value["type"]
    url = value.get("url") if isinstance(value.get("url"), str) else ""
    links = value.get("_links")
    if isinstance(links, dict):
        html_link = links.get("html")
        if isinstance(html_link, dict) and isinstance(html_link.get("href"), str):
            url = html_link["href"]
    if not isinstance(item_id, int) or not item_type:
        raise AzureCliError("Azure CLI work item output is missing its ID or type.")
    return {"id": item_id, "type": item_type, "url": url}


def new_seed_state(
    *,
    organization: str,
    project: str,
    team: str,
    process: ProcessName,
    area_path: str,
    seed_tag: str,
    manifest_path: str | Path,
    mapping_path: str | Path,
    manifest_digest: str,
    iteration_paths: dict[IterationAlias, str],
) -> SeedState:
    """Create an empty state record before the first Azure mutation."""
    return {
        "schemaVersion": SCHEMA_VERSION,
        "organization": organization,
        "project": project,
        "team": team,
        "process": process,
        "areaPath": area_path,
        "seedTag": seed_tag,
        "manifestPath": str(manifest_path),
        "mappingPath": str(mapping_path),
        "manifestSha256": manifest_digest,
        "iterationPaths": iteration_paths,
        "workItems": {},
        "creationOrder": [],
        "relations": [],
    }


def write_json_atomic(path: str | Path, value: Mapping[str, Any]) -> None:
    """Write JSON through a same-directory temporary file and atomic replace."""
    target = Path(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    temporary_name: str | None = None
    try:
        with tempfile.NamedTemporaryFile(
            mode="w",
            encoding="utf-8",
            dir=target.parent,
            prefix=f".{target.name}.",
            suffix=".tmp",
            delete=False,
        ) as handle:
            temporary_name = handle.name
            json.dump(value, handle, indent=2, sort_keys=True)
            handle.write("\n")
            handle.flush()
            os.fsync(handle.fileno())
        os.chmod(temporary_name, 0o600)
        os.replace(temporary_name, target)
        temporary_name = None
        try:
            directory_fd = os.open(target.parent, os.O_RDONLY)
        except OSError:
            directory_fd = -1
        if directory_fd >= 0:
            try:
                os.fsync(directory_fd)
            finally:
                os.close(directory_fd)
    except OSError as exc:
        raise ToolkitError(f"Could not write state file {target}: {exc}") from exc
    finally:
        if temporary_name is not None:
            try:
                os.unlink(temporary_name)
            except FileNotFoundError:
                pass


def load_seed_state(path: str | Path) -> SeedState:
    """Load the state shape shared by verify and reset."""
    raw = load_json_object(path, "State")
    required = (
        "schemaVersion",
        "organization",
        "project",
        "team",
        "process",
        "areaPath",
        "seedTag",
        "manifestPath",
        "mappingPath",
        "manifestSha256",
        "iterationPaths",
        "workItems",
        "creationOrder",
        "relations",
    )
    _require_keys(raw, required, "State")
    if raw["schemaVersion"] != SCHEMA_VERSION:
        raise ValidationError(f"State schemaVersion must be {SCHEMA_VERSION}.")
    require_supported_process(str(raw["process"]))
    if not isinstance(raw["workItems"], dict) or not isinstance(raw["creationOrder"], list):
        raise ValidationError("State workItems and creationOrder have invalid shapes.")
    if not isinstance(raw["relations"], list) or not isinstance(raw["iterationPaths"], dict):
        raise ValidationError("State relations or iterationPaths have invalid shapes.")
    return cast(SeedState, raw)
