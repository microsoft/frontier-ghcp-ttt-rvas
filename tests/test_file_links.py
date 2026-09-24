from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path
from types import SimpleNamespace
import unittest

ROOT = Path(__file__).resolve().parents[1]
SPEC = spec_from_file_location("file_links", ROOT / "hooks/file_links.py")
FILE_LINKS = module_from_spec(SPEC)
SPEC.loader.exec_module(FILE_LINKS)


class FileLinkTests(unittest.TestCase):
    def setUp(self):
        self.config = {
            "docs_dir": str(ROOT),
            "extra": {"source_repository_url": "https://github.com/microsoft/frontier-ghcp-ttt-rvas"},
        }
        self.page = SimpleNamespace(
            file=SimpleNamespace(
                src_path="sessions/session-18-spec-kit/lab/starter/exercise-2/README.md",
                dest_uri="sessions/session-18-spec-kit/lab/starter/exercise-2/index.html",
            )
        )
        self.files = SimpleNamespace(
            get_file_from_path=lambda path: (
                SimpleNamespace(
                    url="sessions/session-04-copilot-cli/lab/starter/agent-tasks/task-list/",
                    inclusion=SimpleNamespace(is_excluded=lambda: False),
                )
                if path == "sessions/session-04-copilot-cli/lab/starter/agent-tasks/task-list.md"
                else None
            )
        )

    def test_links_an_unlinked_file_reference_to_its_published_page(self):
        page = SimpleNamespace(
            file=SimpleNamespace(
                src_path="sessions/session-04-copilot-cli/lab/README.md",
                dest_uri="sessions/session-04-copilot-cli/lab/index.html",
            )
        )
        result = FILE_LINKS.on_page_markdown(
            "Read `task-list.md`.\n", page, self.config, self.files
        )
        self.assertEqual(
            result,
            "Read [`task-list.md`](../../../sessions/session-04-copilot-cli/"
            "lab/starter/agent-tasks/task-list/).\n",
        )

    def test_preserves_existing_links_and_code_examples(self):
        page = SimpleNamespace(
            file=SimpleNamespace(
                src_path="sessions/session-04-copilot-cli/lab/starter/agent-tasks/task-list.md",
                dest_uri="sessions/session-04-copilot-cli/lab/starter/agent-tasks/task-list/index.html",
            )
        )
        result = FILE_LINKS.on_page_markdown(
            "[`src/app.js`](already-linked.md)\n"
            "```\n"
            "`src/app.js`\n"
            "```\n",
            page,
            self.config,
            self.files,
        )
        self.assertEqual(
            result,
            "[`src/app.js`](already-linked.md)\n"
            "```\n"
            "`src/app.js`\n"
            "```\n",
        )

    def test_links_non_markdown_files_to_github(self):
        page = SimpleNamespace(
            file=SimpleNamespace(
                src_path="sessions/session-04-copilot-cli/lab/starter/agent-tasks/task-list.md",
                dest_uri="sessions/session-04-copilot-cli/lab/starter/agent-tasks/task-list/index.html",
            )
        )
        result = FILE_LINKS.on_page_markdown(
            "Read `src/app.js`.\n", page, self.config, self.files
        )
        self.assertEqual(
            result,
            "Read [`src/app.js`](https://github.com/microsoft/frontier-ghcp-ttt-rvas/blob/main/"
            "sessions/session-04-copilot-cli/lab/starter/agent-tasks/src/app.js).\n",
        )
