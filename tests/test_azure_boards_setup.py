"""Tests for the Azure Boards seed, verify, and reset scripts."""

from __future__ import annotations

import argparse
from contextlib import redirect_stderr, redirect_stdout
from copy import deepcopy
import importlib.util
import io
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
SCRIPT_DIR = ROOT / "scripts" / "azure-boards"
DATA_DIR = ROOT / "data" / "azure-boards"


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Could not load module from {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


COMMON = load_module("common", SCRIPT_DIR / "common.py")
SEED = load_module("azure_boards_seed", SCRIPT_DIR / "seed.py")
VERIFY = load_module("azure_boards_verify", SCRIPT_DIR / "verify.py")
RESET = load_module("azure_boards_reset", SCRIPT_DIR / "reset.py")


def minimal_manifest() -> dict:
    return {
        "schemaVersion": 1,
        "product": {
            "key": "test-product",
            "name": "Test Product",
            "description": "Synthetic test backlog.",
        },
        "iterationAliases": {"current": "current", "future": "future"},
        "workItems": [
            {
                "key": "requirement",
                "type": "Requirement",
                "title": "Requirement",
                "description": "Requirement description.",
                "acceptanceCriteria": ["It works."],
                "estimate": 5,
                "priority": 1,
                "iteration": "current",
            },
            {
                "key": "epic",
                "type": "Epic",
                "title": "Epic",
                "description": "Epic description.",
                "priority": 1,
                "iteration": "current",
            },
        ],
        "relations": [
            {"source": "epic", "relation": "parentOf", "target": "requirement"},
            {"source": "requirement", "relation": "dependsOn", "target": "epic"},
        ],
    }


def write_json(path: Path, value: dict) -> None:
    path.write_text(json.dumps(value, indent=2) + "\n", encoding="utf-8")


class FakeSeedClient:
    def __init__(self, fail_create: int | None = None):
        self.fail_create = fail_create
        self.create_count = 0
        self.commands: list[list[str]] = []

    def run(self, arguments, *, json_output=True):
        command = list(arguments)
        self.commands.append(command)
        if command[:3] == ["boards", "work-item", "create"]:
            self.create_count += 1
            if self.create_count == self.fail_create:
                raise COMMON.AzureCliError("simulated create failure")
            item_type = command[command.index("--type") + 1]
            return {
                "id": 100 + self.create_count,
                "fields": {"System.WorkItemType": item_type},
                "url": f"https://example.invalid/{100 + self.create_count}",
            }
        return {}


class AzureBoardsCommonTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.mapping = COMMON.load_mapping(DATA_DIR / "process-mappings.json")

    def test_real_manifest_and_agile_scrum_mappings_are_valid(self):
        manifest = COMMON.load_manifest(DATA_DIR / "service-request-portal.json")
        self.assertEqual(len(manifest["workItems"]), 17)
        self.assertEqual(
            self.mapping["processes"]["Agile"]["workItemTypes"]["Requirement"],
            "User Story",
        )
        self.assertEqual(
            self.mapping["processes"]["Scrum"]["workItemTypes"]["Requirement"],
            "Product Backlog Item",
        )

    def test_unsupported_process_is_rejected(self):
        with self.assertRaisesRegex(COMMON.UnsupportedProcessError, "Agile, Scrum"):
            COMMON.require_supported_process("Basic")

    def test_manifest_rejects_missing_fields_and_duplicate_logical_keys(self):
        missing = minimal_manifest()
        del missing["product"]
        with self.assertRaisesRegex(COMMON.ValidationError, "product"):
            COMMON.validate_manifest(missing)

        duplicate = minimal_manifest()
        duplicate["workItems"][1]["key"] = "requirement"
        with self.assertRaisesRegex(COMMON.ValidationError, "duplicate work item key"):
            COMMON.validate_manifest(duplicate)

    def test_creation_order_places_hierarchy_parents_first(self):
        manifest = COMMON.validate_manifest(minimal_manifest())
        self.assertEqual(
            [item["key"] for item in COMMON.ordered_work_items(manifest)],
            ["epic", "requirement"],
        )

    def test_creation_order_rejects_hierarchy_cycles(self):
        manifest = minimal_manifest()
        manifest["relations"].insert(
            1, {"source": "requirement", "relation": "parentOf", "target": "epic"}
        )
        with self.assertRaisesRegex(COMMON.ValidationError, "cycle"):
            COMMON.validate_manifest(manifest)

    def test_state_schema_contains_seed_safety_fields(self):
        state = COMMON.new_seed_state(
            organization="https://dev.azure.com/example",
            project="Project",
            team="Team",
            process="Agile",
            area_path="Project\\Area",
            seed_tag="rvas-seed:test:abc",
            manifest_path="manifest.json",
            mapping_path="mapping.json",
            manifest_digest="a" * 64,
            iteration_paths={
                "current": "Project\\Current",
                "future": "Project\\Future",
            },
        )
        self.assertEqual(state["areaPath"], "Project\\Area")
        self.assertEqual(state["seedTag"], "rvas-seed:test:abc")
        self.assertEqual(state["creationOrder"], [])

    def test_azure_cli_errors_redact_credentials(self):
        completed = subprocess.CompletedProcess(
            ["az"], 1, "", "Authorization: Bearer top-secret token=other-secret"
        )
        with patch.object(COMMON.subprocess, "run", return_value=completed):
            with self.assertRaises(COMMON.AzureCliError) as raised:
                COMMON.AzureCli("az").run(["boards", "query"])
        message = str(raised.exception)
        self.assertNotIn("top-secret", message)
        self.assertNotIn("other-secret", message)
        self.assertIn("[REDACTED]", message)


class AzureBoardsSeedTests(unittest.TestCase):
    def setUp(self):
        self.mapping = COMMON.load_mapping(DATA_DIR / "process-mappings.json")
        self.organization = "https://dev.azure.com/example"
        self.iterations = {
            "current": "Project\\Current",
            "future": "Project\\Future",
        }

    def test_process_specific_requirement_types_and_estimate_fields(self):
        item = COMMON.validate_manifest(minimal_manifest())["workItems"][0]
        agile = SEED.create_arguments(
            item,
            mapping=self.mapping,
            process="Agile",
            organization=self.organization,
            project="Project",
            area_path="Project\\Area",
            iteration_paths=self.iterations,
            seed_tag="rvas-seed:test:abc",
        )
        scrum = SEED.create_arguments(
            item,
            mapping=self.mapping,
            process="Scrum",
            organization=self.organization,
            project="Project",
            area_path="Project\\Area",
            iteration_paths=self.iterations,
            seed_tag="rvas-seed:test:abc",
        )
        self.assertEqual(agile[agile.index("--type") + 1], "User Story")
        self.assertIn("Microsoft.VSTS.Scheduling.StoryPoints=5", agile)
        self.assertEqual(scrum[scrum.index("--type") + 1], "Product Backlog Item")
        self.assertIn("Microsoft.VSTS.Scheduling.Effort=5", scrum)

    def test_hierarchy_and_dependency_relation_arguments(self):
        ids = {"epic": 10, "requirement": 20}
        names = {
            "parentOf": "Child",
            "childOf": "Parent",
            "dependsOn": "Predecessor",
            "predecessorOf": "Successor",
        }
        hierarchy = SEED.relation_arguments(
            {"source": "epic", "relation": "parentOf", "target": "requirement"},
            work_item_ids=ids,
            relation_names=names,
            organization=self.organization,
        )
        dependency = SEED.relation_arguments(
            {"source": "requirement", "relation": "dependsOn", "target": "epic"},
            work_item_ids=ids,
            relation_names=names,
            organization=self.organization,
        )
        self.assertEqual(hierarchy[hierarchy.index("--id") + 1], "10")
        self.assertEqual(hierarchy[hierarchy.index("--target-id") + 1], "20")
        self.assertEqual(
            hierarchy[hierarchy.index("--relation-type") + 1], "Child"
        )
        self.assertEqual(
            dependency[dependency.index("--relation-type") + 1], "Predecessor"
        )

    def test_duplicate_seed_detection_reports_existing_ids(self):
        client = FakeSeedClient()
        client.run = lambda arguments, **kwargs: [{"id": 12}, {"id": 15}]
        with self.assertRaisesRegex(COMMON.ToolkitError, "12, 15"):
            SEED.verify_no_existing_seed(
                client,
                organization=self.organization,
                project="Project",
                seed_tag="rvas-seed:test:abc",
            )

    def _args(self, directory: Path, *, dry_run=False) -> argparse.Namespace:
        manifest_path = directory / "manifest.json"
        mapping_path = directory / "mapping.json"
        write_json(manifest_path, minimal_manifest())
        write_json(
            mapping_path,
            json.loads((DATA_DIR / "process-mappings.json").read_text(encoding="utf-8")),
        )
        return argparse.Namespace(
            organization=self.organization,
            project="Project",
            team="Team",
            process="Agile",
            area_path="Project\\Area",
            current_iteration=self.iterations["current"],
            future_iteration=self.iterations["future"],
            manifest=str(manifest_path),
            mapping=str(mapping_path),
            state_file=str(directory / "state.json"),
            allow_existing_iterations=True,
            dry_run=dry_run,
            yes=True,
        )

    def _seed_patches(self, client: FakeSeedClient):
        return (
            patch.object(SEED, "discover_azure_cli", return_value="az"),
            patch.object(SEED, "AzureCli", return_value=client),
            patch.object(SEED, "verify_azure_devops_extension"),
            patch.object(SEED, "verify_project_and_team"),
            patch.object(SEED, "verify_area_and_iterations"),
            patch.object(
                SEED,
                "verify_process_mapping",
                return_value={"parentOf": "Child", "dependsOn": "Predecessor"},
            ),
            patch.object(SEED, "verify_no_existing_seed"),
        )

    def test_state_is_persisted_after_each_item_and_relation(self):
        with tempfile.TemporaryDirectory() as temporary:
            directory = Path(temporary)
            args = self._args(directory)
            client = FakeSeedClient()
            snapshots = []
            original_write = COMMON.write_json_atomic

            def recording_write(path, state):
                snapshots.append(deepcopy(state))
                original_write(path, state)

            patches = self._seed_patches(client)
            with patches[0], patches[1], patches[2], patches[3], patches[4], patches[5], patches[6], patch.object(
                SEED, "write_json_atomic", side_effect=recording_write
            ):
                with redirect_stdout(io.StringIO()):
                    SEED.run_seed(args)

            self.assertEqual(snapshots[0]["creationOrder"], [])
            self.assertEqual(snapshots[1]["creationOrder"], ["epic"])
            self.assertEqual(
                snapshots[2]["creationOrder"], ["epic", "requirement"]
            )
            self.assertEqual(len(snapshots[3]["relations"]), 1)
            self.assertEqual(len(snapshots[4]["relations"]), 2)

    def test_partial_seed_failure_keeps_recovery_state_and_commands(self):
        with tempfile.TemporaryDirectory() as temporary:
            directory = Path(temporary)
            args = self._args(directory)
            client = FakeSeedClient(fail_create=2)
            parser = unittest.mock.Mock()
            parser.parse_args.return_value = args
            stderr = io.StringIO()
            patches = self._seed_patches(client)
            with patches[0], patches[1], patches[2], patches[3], patches[4], patches[5], patches[6], patch.object(
                SEED, "build_parser", return_value=parser
            ), redirect_stderr(stderr), redirect_stdout(io.StringIO()):
                result = SEED.main()

            state = json.loads(Path(args.state_file).read_text(encoding="utf-8"))
            self.assertEqual(result, 2)
            self.assertEqual(state["creationOrder"], ["epic"])
            self.assertEqual(list(state["workItems"]), ["epic"])
            self.assertIn("Partial state retained", stderr.getvalue())
            self.assertIn("reset.py", stderr.getvalue())

    def test_seed_dry_run_never_executes_or_writes_state(self):
        with tempfile.TemporaryDirectory() as temporary:
            args = self._args(Path(temporary), dry_run=True)
            output = io.StringIO()
            with patch.object(COMMON.subprocess, "run") as run, redirect_stdout(output):
                SEED.run_seed(args)
            run.assert_not_called()
            self.assertFalse(Path(args.state_file).exists())
            self.assertIn("Azure will not be contacted", output.getvalue())
            self.assertIn("$ID[epic]", output.getvalue())


class AzureBoardsVerifyTests(unittest.TestCase):
    def _fixture(self, directory: Path):
        manifest = minimal_manifest()
        manifest_path = directory / "manifest.json"
        mapping_path = directory / "mapping.json"
        state_path = directory / "state.json"
        write_json(manifest_path, manifest)
        write_json(
            mapping_path,
            json.loads((DATA_DIR / "process-mappings.json").read_text(encoding="utf-8")),
        )
        digest = COMMON.manifest_sha256(manifest_path)
        state = COMMON.new_seed_state(
            organization="https://dev.azure.com/example",
            project="Project",
            team="Team",
            process="Agile",
            area_path="Project\\Area",
            seed_tag="rvas-seed:test:abc",
            manifest_path=manifest_path,
            mapping_path=mapping_path,
            manifest_digest=digest,
            iteration_paths={
                "current": "Project\\Current",
                "future": "Project\\Future",
            },
        )
        state["workItems"] = {
            "epic": {"id": 1, "type": "Epic", "url": "https://example.invalid/1"},
            "requirement": {
                "id": 2,
                "type": "User Story",
                "url": "https://example.invalid/2",
            },
        }
        state["creationOrder"] = ["epic", "requirement"]
        state["relations"] = deepcopy(manifest["relations"])
        write_json(state_path, state)
        args = argparse.Namespace(
            organization="https://dev.azure.com/example/",
            project="Project",
            manifest=str(manifest_path),
            mapping=str(mapping_path),
            state=str(state_path),
        )
        remote = {
            1: {
                "fields": {
                    "System.WorkItemType": "Epic",
                    "System.Tags": "rvas-seed:test:abc",
                    "System.TeamProject": "Project",
                    "System.AreaPath": "Project\\Area",
                    "System.IterationPath": "Project\\Current",
                },
                "relations": [
                    {
                        "rel": "System.LinkTypes.Hierarchy-Forward",
                        "url": "https://example.invalid/2",
                    }
                ],
            },
            2: {
                "fields": {
                    "System.WorkItemType": "User Story",
                    "System.Tags": "rvas-seed:test:abc",
                    "System.TeamProject": "Project",
                    "System.AreaPath": "Project\\Area",
                    "System.IterationPath": "Project\\Current",
                },
                "relations": [
                    {
                        "rel": "System.LinkTypes.Dependency-Reverse",
                        "url": "https://example.invalid/1",
                    }
                ],
            },
        }
        return args, state_path, remote

    def test_verify_success(self):
        with tempfile.TemporaryDirectory() as temporary:
            args, _, remote = self._fixture(Path(temporary))
            output = io.StringIO()
            with patch.object(
                VERIFY, "_load_work_item", side_effect=lambda item_id, *_: (remote[item_id], None)
            ), redirect_stdout(output):
                result = VERIFY.verify(args)
            self.assertEqual(result, 0)
            self.assertIn("Verified 2 work items and 2 relations", output.getvalue())

    def test_verify_reports_mismatches(self):
        with tempfile.TemporaryDirectory() as temporary:
            args, _, remote = self._fixture(Path(temporary))
            remote[2]["fields"]["System.WorkItemType"] = "Bug"
            remote[2]["fields"]["System.Tags"] = "other"
            stderr = io.StringIO()
            with patch.object(
                VERIFY, "_load_work_item", side_effect=lambda item_id, *_: (remote[item_id], None)
            ), redirect_stderr(stderr):
                result = VERIFY.verify(args)
            self.assertEqual(result, 1)
            self.assertIn("type is 'Bug'; expected 'User Story'", stderr.getvalue())
            self.assertIn("missing seed tag", stderr.getvalue())
            self.assertIn("Verification failed", stderr.getvalue())

    def test_verify_rejects_old_state_without_creation_order(self):
        with tempfile.TemporaryDirectory() as temporary:
            args, state_path, _ = self._fixture(Path(temporary))
            state = json.loads(state_path.read_text(encoding="utf-8"))
            del state["creationOrder"]
            write_json(state_path, state)
            with self.assertRaisesRegex(VERIFY.InputError, "predates"):
                VERIFY.verify(args)


class AzureBoardsResetTests(unittest.TestCase):
    def _state(self, directory: Path) -> tuple[argparse.Namespace, Path]:
        state_path = directory / "state.json"
        state = COMMON.new_seed_state(
            organization="https://dev.azure.com/example",
            project="Project",
            team="Team",
            process="Scrum",
            area_path="Project\\Area",
            seed_tag="rvas-seed:test:abc",
            manifest_path="manifest.json",
            mapping_path="mapping.json",
            manifest_digest="a" * 64,
            iteration_paths={
                "current": "Project\\Current",
                "future": "Project\\Future",
            },
        )
        state["workItems"] = {
            "first": {"id": 11, "type": "Epic", "url": "https://example.invalid/11"},
            "second": {
                "id": 22,
                "type": "Product Backlog Item",
                "url": "https://example.invalid/22",
            },
        }
        state["creationOrder"] = ["first", "second"]
        write_json(state_path, state)
        return (
            argparse.Namespace(
                organization="https://dev.azure.com/example",
                project="Project",
                state=str(state_path),
                dry_run=False,
                yes=True,
            ),
            state_path,
        )

    def test_reset_deletes_only_recorded_ids_in_reverse_order(self):
        with tempfile.TemporaryDirectory() as temporary:
            args, state_path = self._state(Path(temporary))
            deleted: list[int] = []

            def show(item_id, *_):
                if item_id in deleted:
                    return None, "not found"
                return {"fields": {"System.Tags": "rvas-seed:test:abc"}}, None

            def delete(item_id, *_):
                deleted.append(item_id)
                return subprocess.CompletedProcess(["az"], 0, "{}", "")

            with patch.object(RESET, "_show_work_item", side_effect=show), patch.object(
                RESET, "_delete_work_item", side_effect=delete
            ), redirect_stdout(io.StringIO()):
                result = RESET.reset(args)

            self.assertEqual(result, 0)
            self.assertEqual(deleted, [22, 11])
            self.assertFalse(state_path.exists())

    def test_reset_refuses_any_item_missing_the_seed_tag(self):
        with tempfile.TemporaryDirectory() as temporary:
            args, state_path = self._state(Path(temporary))
            stderr = io.StringIO()
            with patch.object(
                RESET,
                "_show_work_item",
                return_value=({"fields": {"System.Tags": "not-the-seed"}}, None),
            ), patch.object(RESET, "_delete_work_item") as delete, redirect_stderr(stderr):
                result = RESET.reset(args)
            self.assertEqual(result, 1)
            delete.assert_not_called()
            self.assertTrue(state_path.exists())
            self.assertIn("no items were deleted", stderr.getvalue())

    def test_delete_command_uses_recycle_bin_not_permanent_deletion(self):
        completed = subprocess.CompletedProcess(["az"], 0, "{}", "")
        with patch.object(RESET, "_run_az", return_value=completed) as run:
            RESET._delete_work_item(
                11, "https://dev.azure.com/example", "Project"
            )
        arguments = run.call_args.args[0]
        self.assertEqual(arguments[:3], ["boards", "work-item", "delete"])
        self.assertNotIn("--destroy", arguments)
        self.assertNotIn("--permanent", arguments)

    def test_reset_dry_run_checks_tags_but_does_not_delete_or_change_state(self):
        with tempfile.TemporaryDirectory() as temporary:
            args, state_path = self._state(Path(temporary))
            before = state_path.read_bytes()
            args.dry_run = True
            output = io.StringIO()
            with patch.object(
                RESET,
                "_show_work_item",
                return_value=({"fields": {"System.Tags": "rvas-seed:test:abc"}}, None),
            ), patch.object(RESET, "_delete_work_item") as delete, redirect_stdout(output):
                result = RESET.reset(args)
            self.assertEqual(result, 0)
            delete.assert_not_called()
            self.assertEqual(state_path.read_bytes(), before)
            self.assertLess(output.getvalue().find("--id 22"), output.getvalue().find("--id 11"))

    def test_reset_rejects_old_state_without_area_path_or_creation_order(self):
        with tempfile.TemporaryDirectory() as temporary:
            args, state_path = self._state(Path(temporary))
            state = json.loads(state_path.read_text(encoding="utf-8"))
            del state["areaPath"]
            write_json(state_path, state)
            with self.assertRaisesRegex(RESET.InputError, "areaPath"):
                RESET.reset(args)

    def test_reset_rejects_credentialed_organization_without_leaking_secret(self):
        with tempfile.TemporaryDirectory() as temporary:
            args, _ = self._state(Path(temporary))
            args.organization = "https://user:super-secret@dev.azure.com/example"
            with self.assertRaises(RESET.InputError) as raised:
                RESET.reset(args)
            self.assertNotIn("super-secret", str(raised.exception))


if __name__ == "__main__":
    unittest.main()
