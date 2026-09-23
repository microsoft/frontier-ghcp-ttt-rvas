#!/usr/bin/env python3
"""Seed the fictional Service Request Portal backlog in Azure Boards."""

from __future__ import annotations

import argparse
import html
import sys
from pathlib import Path
from typing import Any, cast

from common import (
    DEFAULT_MANIFEST_PATH,
    DEFAULT_MAPPING_PATH,
    DEFAULT_STATE_PATH,
    AzureCli,
    IterationAlias,
    LogicalRelation,
    Manifest,
    MappingFile,
    ProcessName,
    RelationSpec,
    ToolkitError,
    ValidationError,
    build_seed_tag,
    collect_paths,
    discover_azure_cli,
    extract_collection,
    extract_work_item,
    field_reference_names,
    load_manifest,
    load_mapping,
    manifest_sha256,
    new_seed_state,
    normalize_classification_path,
    normalize_organization,
    ordered_work_items,
    organization_project_args,
    path_key,
    project_process_name,
    relation_names_by_reference,
    render_command,
    require_supported_process,
    verify_azure_devops_extension,
    wiql_string,
    write_json_atomic,
)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Seed a synthetic Azure Boards backlog after checking the target project."
        )
    )
    parser.add_argument(
        "--organization",
        required=True,
        help="Azure DevOps organization URL, such as https://dev.azure.com/ORG.",
    )
    parser.add_argument("--project", required=True, help="Existing project name or ID.")
    parser.add_argument("--team", required=True, help="Existing team name or ID.")
    parser.add_argument(
        "--process",
        required=True,
        choices=("Agile", "Scrum"),
        help="Expected project process.",
    )
    parser.add_argument("--area-path", required=True, help="Existing team area path.")
    parser.add_argument(
        "--current-iteration",
        required=True,
        help="Existing current iteration path assigned to the team.",
    )
    parser.add_argument(
        "--future-iteration",
        required=True,
        help="Existing future iteration path assigned to the team.",
    )
    parser.add_argument("--manifest", default=DEFAULT_MANIFEST_PATH)
    parser.add_argument("--mapping", default=DEFAULT_MAPPING_PATH)
    parser.add_argument("--state-file", default=DEFAULT_STATE_PATH)
    parser.add_argument(
        "--allow-existing-iterations",
        action="store_true",
        help="Allow the target iterations to contain work items before seeding.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print Azure CLI commands without Azure access or state changes.",
    )
    parser.add_argument(
        "--yes",
        action="store_true",
        help="Create the seed without an interactive confirmation.",
    )
    return parser


def scoped(arguments: list[str], organization: str, project: str) -> list[str]:
    return [*arguments, *organization_project_args(organization, project)]


def preflight_commands(
    organization: str,
    project: str,
    team: str,
) -> list[list[str]]:
    return [
        ["extension", "show", "--name", "azure-devops"],
        scoped(["devops", "project", "show"], organization, project),
        scoped(["devops", "team", "show", "--team", team], organization, project),
        scoped(["boards", "area", "team", "list", "--team", team], organization, project),
        scoped(
            ["boards", "iteration", "team", "list", "--team", team],
            organization,
            project,
        ),
        [
            "boards",
            "work-item",
            "relation",
            "list-type",
            "--org",
            organization,
            "--detect",
            "false",
        ],
    ]


def query_arguments(organization: str, project: str, wiql: str) -> list[str]:
    return scoped(["boards", "query", "--wiql", wiql], organization, project)


def seed_tag_query(project: str, seed_tag: str) -> str:
    return (
        "SELECT [System.Id], [System.Title] FROM WorkItems "
        f"WHERE [System.TeamProject] = '{wiql_string(project)}' "
        f"AND [System.Tags] CONTAINS '{wiql_string(seed_tag)}'"
    )


def iteration_query(project: str, iteration_path: str) -> str:
    return (
        "SELECT [System.Id], [System.Title] FROM WorkItems "
        f"WHERE [System.TeamProject] = '{wiql_string(project)}' "
        f"AND [System.IterationPath] = '{wiql_string(iteration_path)}'"
    )


def work_item_type_arguments(
    organization: str,
    project: str,
    work_item_type: str,
) -> list[str]:
    return [
        "devops",
        "invoke",
        "--area",
        "wit",
        "--resource",
        "workItemTypes",
        "--route-parameters",
        f"project={project}",
        f"type={work_item_type}",
        "--api-version",
        "7.1",
        "--org",
        organization,
        "--detect",
        "false",
    ]


def acceptance_criteria_html(criteria: list[str]) -> str:
    return "<ul>" + "".join(f"<li>{html.escape(item)}</li>" for item in criteria) + "</ul>"


def format_number(value: float) -> str:
    return str(int(value)) if value.is_integer() else str(value)


def create_arguments(
    item: dict[str, Any],
    *,
    mapping: MappingFile,
    process: ProcessName,
    organization: str,
    project: str,
    area_path: str,
    iteration_paths: dict[IterationAlias, str],
    seed_tag: str,
) -> list[str]:
    logical_type = item["type"]
    process_mapping = mapping["processes"][process]
    arguments = [
        "boards",
        "work-item",
        "create",
        "--title",
        item["title"],
        "--type",
        process_mapping["workItemTypes"][logical_type],
        "--description",
        item["description"],
        "--area",
        area_path,
        "--iteration",
        iteration_paths[item["iteration"]],
        *organization_project_args(organization, project),
    ]
    fields: list[str] = []
    tags = [*item.get("tags", []), seed_tag]
    fields.append(f"{mapping['fields']['tags']}={'; '.join(dict.fromkeys(tags))}")
    if "priority" in item:
        fields.append(f"{mapping['fields']['priority']}={item['priority']}")
    if item.get("acceptanceCriteria"):
        fields.append(
            f"{mapping['fields']['acceptanceCriteria']}="
            f"{acceptance_criteria_html(item['acceptanceCriteria'])}"
        )
    if "estimate" in item:
        estimate_field = process_mapping["estimateFields"].get(logical_type)
        if estimate_field is None:
            raise ValidationError(
                f"No {process} estimate field is mapped for logical type {logical_type}."
            )
        fields.append(f"{estimate_field}={format_number(item['estimate'])}")
    return [*arguments, "--fields", *fields]


def relation_arguments(
    relation: RelationSpec,
    *,
    work_item_ids: dict[str, int | str],
    relation_names: dict[LogicalRelation, str],
    organization: str,
) -> list[str]:
    return [
        "boards",
        "work-item",
        "relation",
        "add",
        "--id",
        str(work_item_ids[relation["source"]]),
        "--relation-type",
        relation_names[relation["relation"]],
        "--target-id",
        str(work_item_ids[relation["target"]]),
        "--org",
        organization,
        "--detect",
        "false",
    ]


def ensure_state_target_available(path: Path) -> None:
    if path.exists():
        raise ValidationError(
            f"State file already exists: {path}. Verify or reset that seed before seeding again."
        )


def verify_project_and_team(
    client: AzureCli,
    *,
    organization: str,
    project: str,
    team: str,
    process: ProcessName,
) -> None:
    project_result = client.run(
        scoped(["devops", "project", "show"], organization, project)
    )
    if not isinstance(project_result, dict):
        raise ToolkitError("Could not read the Azure DevOps project.")
    actual_process = project_process_name(project_result)
    if not actual_process:
        raise ToolkitError(
            "The project response did not include its process template. "
            "Check project access and Azure DevOps extension version."
        )
    if actual_process.casefold() != process.casefold():
        raise ToolkitError(
            f"Project process is {actual_process!r}, but --process is {process!r}."
        )
    client.run(
        scoped(
            ["devops", "team", "show", "--team", team],
            organization,
            project,
        )
    )


def verify_area_and_iterations(
    client: AzureCli,
    *,
    organization: str,
    project: str,
    team: str,
    area_path: str,
    iteration_paths: dict[IterationAlias, str],
) -> None:
    areas = client.run(
        scoped(
            ["boards", "area", "team", "list", "--team", team],
            organization,
            project,
        )
    )
    area_paths = collect_paths(areas)
    requested_area = path_key(area_path)
    area_is_assigned = requested_area in area_paths
    if not area_is_assigned:
        for assigned_path, node in area_paths.items():
            include_children = node.get("includeChildren")
            if not isinstance(include_children, bool):
                include_children = node.get("includeSubAreas")
            if include_children is True and requested_area.startswith(f"{assigned_path}\\"):
                area_is_assigned = True
                break
    if not area_is_assigned:
        raise ToolkitError(
            f"Area path {area_path!r} is not assigned to team {team!r}. "
            "Assign it in team settings, then run seed again."
        )

    iterations = client.run(
        scoped(
            ["boards", "iteration", "team", "list", "--team", team],
            organization,
            project,
        )
    )
    iteration_nodes = collect_paths(iterations)
    for alias, iteration_path in iteration_paths.items():
        node = iteration_nodes.get(path_key(iteration_path))
        if node is None:
            raise ToolkitError(
                f"{alias.title()} iteration {iteration_path!r} is not assigned to "
                f"team {team!r}. Assign it in team settings, then run seed again."
            )
        time_frame = node.get("timeFrame")
        if not isinstance(time_frame, str):
            attributes = node.get("attributes")
            if isinstance(attributes, dict):
                time_frame = attributes.get("timeFrame")
        if isinstance(time_frame, str):
            expected = "current" if alias == "current" else "future"
            if time_frame.casefold() != expected:
                raise ToolkitError(
                    f"{alias.title()} iteration {iteration_path!r} has time frame "
                    f"{time_frame!r}, expected {expected!r}."
                )


def verify_process_mapping(
    client: AzureCli,
    *,
    organization: str,
    project: str,
    process: ProcessName,
    manifest: Manifest,
    mapping: MappingFile,
) -> dict[LogicalRelation, str]:
    process_mapping = mapping["processes"][process]
    used_types = {item["type"] for item in manifest["workItems"]}
    required_common_fields = {
        mapping["fields"]["title"],
        mapping["fields"]["description"],
        mapping["fields"]["tags"],
        mapping["fields"]["iterationPath"],
    }
    for logical_type in sorted(used_types):
        actual_type = process_mapping["workItemTypes"][logical_type]
        work_item_type_result = client.run(
            work_item_type_arguments(organization, project, actual_type)
        )
        available_fields = field_reference_names(work_item_type_result)
        if not available_fields:
            raise ToolkitError(
                f"Work item type {actual_type!r} returned no field definitions. "
                "Check project access and Azure DevOps extension version."
            )
        required_fields = set(required_common_fields)
        if any(
            item["type"] == logical_type and "priority" in item
            for item in manifest["workItems"]
        ):
            required_fields.add(mapping["fields"]["priority"])
        if any(
            item["type"] == logical_type and item.get("acceptanceCriteria")
            for item in manifest["workItems"]
        ):
            required_fields.add(mapping["fields"]["acceptanceCriteria"])
        if any(
            item["type"] == logical_type and "estimate" in item
            for item in manifest["workItems"]
        ):
            estimate_field = process_mapping["estimateFields"].get(logical_type)
            if estimate_field is None:
                raise ToolkitError(
                    f"Mapping has no estimate field for {process} {logical_type}."
                )
            required_fields.add(estimate_field)
        missing_fields = sorted(required_fields - available_fields)
        if missing_fields:
            raise ToolkitError(
                f"Work item type {actual_type!r} is missing required fields: "
                f"{', '.join(missing_fields)}. Check the project process customization."
            )

    relation_result = client.run(
        [
            "boards",
            "work-item",
            "relation",
            "list-type",
            "--org",
            organization,
            "--detect",
            "false",
        ]
    )
    names_by_reference = relation_names_by_reference(relation_result)
    used_relations = {relation["relation"] for relation in manifest["relations"]}
    relation_names: dict[LogicalRelation, str] = {}
    for logical_relation in used_relations:
        reference = mapping["relations"][logical_relation]
        name = names_by_reference.get(reference)
        if name is None:
            raise ToolkitError(
                f"Azure DevOps does not expose required relation {reference!r}. "
                "Check the organization process configuration."
            )
        relation_names[logical_relation] = name
    return relation_names


def verify_no_existing_seed(
    client: AzureCli,
    *,
    organization: str,
    project: str,
    seed_tag: str,
) -> None:
    result = client.run(
        query_arguments(organization, project, seed_tag_query(project, seed_tag))
    )
    existing = extract_collection(result)
    if existing:
        ids = ", ".join(str(item.get("id", "?")) for item in existing)
        raise ToolkitError(
            f"Seed tag {seed_tag!r} already exists on work item IDs: {ids}. "
            "Verify or reset the existing seed instead of creating a duplicate."
        )


def verify_empty_iterations(
    client: AzureCli,
    *,
    organization: str,
    project: str,
    iteration_paths: dict[IterationAlias, str],
) -> None:
    occupied: list[str] = []
    for iteration_path in dict.fromkeys(iteration_paths.values()):
        result = client.run(
            query_arguments(
                organization,
                project,
                iteration_query(project, iteration_path),
            )
        )
        if extract_collection(result):
            occupied.append(iteration_path)
    if occupied:
        raise ToolkitError(
            "Target iterations already contain work items: "
            f"{', '.join(occupied)}. Use --allow-existing-iterations only if this is intended."
        )


def confirm_seed(args: argparse.Namespace, item_count: int) -> None:
    if args.yes or args.dry_run:
        return
    if not sys.stdin.isatty():
        raise ToolkitError("Live seeding requires --yes when input is not interactive.")
    answer = input(
        f"Create {item_count} work items in {args.project!r} for team {args.team!r}? [y/N] "
    )
    if answer.strip().casefold() not in ("y", "yes"):
        raise ToolkitError("Seed cancelled.")


def print_dry_run(
    client: AzureCli,
    *,
    args: argparse.Namespace,
    manifest: Manifest,
    mapping: MappingFile,
    process: ProcessName,
    organization: str,
    area_path: str,
    iteration_paths: dict[IterationAlias, str],
    seed_tag: str,
) -> None:
    print("Dry run. Azure will not be contacted and no state file will be written.")
    for command in preflight_commands(organization, args.project, args.team):
        client.print_command(command)
    client.print_command(
        query_arguments(
            organization,
            args.project,
            seed_tag_query(args.project, seed_tag),
        )
    )
    if not args.allow_existing_iterations:
        for iteration_path in dict.fromkeys(iteration_paths.values()):
            client.print_command(
                query_arguments(
                    organization,
                    args.project,
                    iteration_query(args.project, iteration_path),
                )
            )
    process_mapping = mapping["processes"][process]
    for logical_type in sorted({item["type"] for item in manifest["workItems"]}):
        actual_type = process_mapping["workItemTypes"][logical_type]
        client.print_command(
            work_item_type_arguments(organization, args.project, actual_type)
        )
    for item in ordered_work_items(manifest):
        client.print_command(
            create_arguments(
                cast(dict[str, Any], item),
                mapping=mapping,
                process=process,
                organization=organization,
                project=args.project,
                area_path=area_path,
                iteration_paths=iteration_paths,
                seed_tag=seed_tag,
            )
        )
    planned_ids = {
        item["key"]: f"$ID[{item['key']}]" for item in manifest["workItems"]
    }
    fallback_relation_names: dict[LogicalRelation, str] = {
        "parentOf": "Child",
        "childOf": "Parent",
        "dependsOn": "Predecessor",
        "predecessorOf": "Successor",
    }
    for relation in manifest["relations"]:
        client.print_command(
            relation_arguments(
                relation,
                work_item_ids=planned_ids,
                relation_names=fallback_relation_names,
                organization=organization,
            )
        )
    print(f"Planned seed tag: {seed_tag}")
    print(f"Planned state file: {args.state_file}")


def run_seed(args: argparse.Namespace) -> None:
    manifest = load_manifest(args.manifest)
    mapping = load_mapping(args.mapping)
    process = require_supported_process(args.process)
    organization = normalize_organization(args.organization)
    project = args.project.strip()
    team = args.team.strip()
    if not project or not team:
        raise ValidationError("Project and team must be non-empty.")
    area_path = normalize_classification_path(args.area_path, "Area path")
    iteration_paths: dict[IterationAlias, str] = {
        "current": normalize_classification_path(
            args.current_iteration, "Current iteration"
        ),
        "future": normalize_classification_path(
            args.future_iteration, "Future iteration"
        ),
    }
    if path_key(iteration_paths["current"]) == path_key(iteration_paths["future"]):
        raise ValidationError("Current and future iterations must be different paths.")
    digest = manifest_sha256(args.manifest)
    seed_tag = build_seed_tag(manifest["product"]["key"], digest)
    state_path = Path(args.state_file)

    if args.dry_run:
        client = AzureCli("az", dry_run=True)
        print_dry_run(
            client,
            args=args,
            manifest=manifest,
            mapping=mapping,
            process=process,
            organization=organization,
            area_path=area_path,
            iteration_paths=iteration_paths,
            seed_tag=seed_tag,
        )
        return

    ensure_state_target_available(state_path)
    client = AzureCli(discover_azure_cli())
    verify_azure_devops_extension(client)
    verify_project_and_team(
        client,
        organization=organization,
        project=project,
        team=team,
        process=process,
    )
    verify_area_and_iterations(
        client,
        organization=organization,
        project=project,
        team=team,
        area_path=area_path,
        iteration_paths=iteration_paths,
    )
    relation_names = verify_process_mapping(
        client,
        organization=organization,
        project=project,
        process=process,
        manifest=manifest,
        mapping=mapping,
    )
    verify_no_existing_seed(
        client,
        organization=organization,
        project=project,
        seed_tag=seed_tag,
    )
    if not args.allow_existing_iterations:
        verify_empty_iterations(
            client,
            organization=organization,
            project=project,
            iteration_paths=iteration_paths,
        )
    confirm_seed(args, len(manifest["workItems"]))

    state = new_seed_state(
        organization=organization,
        project=project,
        team=team,
        process=process,
        area_path=area_path,
        seed_tag=seed_tag,
        manifest_path=args.manifest,
        mapping_path=args.mapping,
        manifest_digest=digest,
        iteration_paths=iteration_paths,
    )
    write_json_atomic(state_path, state)
    print(f"State: {state_path}")

    for item in ordered_work_items(manifest):
        result = client.run(
            create_arguments(
                cast(dict[str, Any], item),
                mapping=mapping,
                process=process,
                organization=organization,
                project=project,
                area_path=area_path,
                iteration_paths=iteration_paths,
                seed_tag=seed_tag,
            )
        )
        created = extract_work_item(result)
        state["workItems"][item["key"]] = created
        state["creationOrder"].append(item["key"])
        write_json_atomic(state_path, state)
        print(f"Created {item['key']}: {created['id']}")

    work_item_ids = {
        key: created["id"] for key, created in state["workItems"].items()
    }
    for relation in manifest["relations"]:
        client.run(
            relation_arguments(
                relation,
                work_item_ids=work_item_ids,
                relation_names=relation_names,
                organization=organization,
            )
        )
        state["relations"].append(relation)
        write_json_atomic(state_path, state)
        print(
            f"Linked {relation['source']} {relation['relation']} {relation['target']}"
        )

    print(f"Seed complete. Tag: {seed_tag}")
    verify_command = render_command(
        [
            "python",
            "scripts/azure-boards/verify.py",
            "--state-file",
            str(state_path),
        ]
    )
    reset_command = render_command(
        [
            "python",
            "scripts/azure-boards/reset.py",
            "--state-file",
            str(state_path),
            "--yes",
        ]
    )
    print(f"Verify: {verify_command}")
    print(f"Reset: {reset_command}")


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        run_seed(args)
    except ToolkitError as exc:
        print(f"Seed stopped: {exc}", file=sys.stderr)
        if not args.dry_run and Path(args.state_file).exists():
            print(f"Partial state retained: {args.state_file}", file=sys.stderr)
            reset_command = render_command(
                [
                    "python",
                    "scripts/azure-boards/reset.py",
                    "--state-file",
                    args.state_file,
                    "--yes",
                ]
            )
            verify_command = render_command(
                [
                    "python",
                    "scripts/azure-boards/verify.py",
                    "--state-file",
                    args.state_file,
                ]
            )
            print(
                f"Recover: {reset_command}",
                file=sys.stderr,
            )
            print(
                f"Inspect: {verify_command}",
                file=sys.stderr,
            )
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
