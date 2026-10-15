"""Regression coverage for shared session pages and trainer controls."""

from html.parser import HTMLParser
import importlib.util
from pathlib import Path
import re
import shutil
import subprocess
from types import SimpleNamespace
import unittest
from urllib.parse import urljoin

ROOT = Path(__file__).resolve().parents[1]
SESSION = "session-m1-01-intro-to-copilot"


def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


HOOK = load_module("presentation_embed", "hooks/presentation_embed.py")


class Tags(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.tags = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

    def named(self, name):
        return [attrs for tag, attrs in self.tags if tag == name]


class SessionRenderingTests(unittest.TestCase):
    def fixture(self, kind="", directory_urls=True):
        source = f"sessions/{SESSION}/{kind + '/' if kind else ''}README.md"
        dest = source.replace("README.md", "index.html")
        page = SimpleNamespace(
            file=SimpleNamespace(src_path=source, dest_uri=dest),
            title='Session m1-01 & "Copilot"',
        )
        targets = {
            f"sessions/{SESSION}/{directory}README.md": SimpleNamespace(
                url=f"sessions/{SESSION}/{directory}" + ("" if directory_urls else "index.html")
            )
            for directory in ("", "lab/", "trainer-content/")
        }
        return page, SimpleNamespace(get_file_from_path=targets.get)

    def test_page_kinds_and_windows_paths(self):
        for directory, kind in (("", "overview"), ("lab/", "lab"), ("trainer-content/", "trainer-content")):
            for separator in ("/", "\\"):
                source = f"sessions/{SESSION}/{directory}README.md".replace("/", separator)
                with self.subTest(source=source):
                    self.assertEqual(HOOK.session_page(source), (SESSION, kind))

    def test_other_content_is_untouched(self):
        for source in (
            "README.md", "tracks/README.md",
            f"sessions/{SESSION}/slides/README.md",
            f"sessions/{SESSION}/lab/solution/README.md",
            f"sessions/{SESSION}/trainer-content/notes.md",
        ):
            page = SimpleNamespace(file=SimpleNamespace(src_path=source))
            self.assertIsNone(HOOK.session_page(source))
            self.assertEqual(HOOK.on_page_content("<h1>Keep me</h1>", page, {}, None), "<h1>Keep me</h1>")

    def test_navigation_depth_subpath_and_directory_settings(self):
        for directory_urls in (True, False):
            for kind in ("", "lab", "trainer-content"):
                for subpath in ("/", "/emu-ghcp-ttt/"):
                    with self.subTest(kind=kind, directory_urls=directory_urls, subpath=subpath):
                        page, files = self.fixture(kind, directory_urls)
                        output = HOOK.session_navigation(page, files, SESSION, kind or "overview")
                        links = Tags(output).named("a")
                        base = f"https://example.test{subpath}{page.file.dest_uri}"
                        if directory_urls:
                            base = base.removesuffix("index.html")
                        for link, target_kind in zip(links, ("", "lab", "trainer-content")):
                            expected = f"https://example.test{subpath}sessions/{SESSION}/"
                            expected += f"{target_kind}/" if target_kind else ""
                            expected += "" if directory_urls else "index.html"
                            self.assertEqual(urljoin(base, link["href"]), expected)
                            self.assertEqual(link.get("aria-current"), "page" if kind == target_kind else None)
                            self.assertNotIn("target", link)
                        self.assertEqual(sum("aria-current" in link for link in links), 1)

    def test_missing_navigation_target_fails_loudly(self):
        page, _ = self.fixture()
        with self.assertRaisesRegex(ValueError, "Session navigation target is missing"):
            HOOK.session_navigation(page, SimpleNamespace(get_file_from_path=lambda _: None), SESSION, "overview")

    def test_only_overview_has_lazy_dialog_and_slide_links(self):
        for kind in ("", "lab", "trainer-content"):
            page, files = self.fixture(kind)
            output = HOOK.on_page_content("<h1>Curriculum</h1>", page, {}, files)
            tags = Tags(output)
            self.assertEqual(len(tags.named("dialog")), int(kind == ""))
            self.assertEqual('class="trainer-controls"' in output, kind == "trainer-content")
            for _, attrs in tags.tags:
                self.assertFalse(any(name.startswith("on") for name in attrs))
            self.assertNotIn("<script", output)
            if not kind:
                frame = tags.named("iframe")[0]
                self.assertNotIn("src", frame)
                self.assertEqual(frame["data-src"], f"../../output/html/{SESSION}.html")
                self.assertEqual(frame["title"], 'Slides: Session m1-01 & "Copilot"')
                self.assertIn(f'href="../../output/pdf/{SESSION}.pdf"', output)

    def test_rendered_content_and_heading_ids_are_preserved(self):
        page, files = self.fixture("trainer-content")
        html = '<h2 id="bounded-task-pattern">Bounded task</h2><pre><code>## Not a section</code></pre>'
        result = HOOK.on_page_content(html, page, {}, files)
        self.assertTrue(result.endswith(html))
        self.assertEqual(result.count("<h2"), 1)

    def test_page_title_precedes_role_specific_controls(self):
        for kind, marker in (
            ("", 'class="presentation-launcher"'),
            ("trainer-content", 'class="trainer-controls"'),
        ):
            page, files = self.fixture(kind)
            html = '<h1 id="session">Session title</h1><p>Original content</p>'
            result = HOOK.on_page_content(html, page, {}, files)
            self.assertLess(result.index('class="session-nav"'), result.index("<h1"))
            self.assertLess(result.index("</h1>"), result.index(marker))
            self.assertLess(result.index(marker), result.index("<p>Original content</p>"))

    def test_heading_ids_are_preserved_without_aliases(self):
        html = (
            '<h2 id="demo-review-qa">Demo <em>\u2014 Review</em>: Q&amp;A?'
            '<a class="headerlink" href="#demo-review-qa">Permanent link</a></h2>'
        )
        for kind in ("", "lab", "trainer-content"):
            page, files = self.fixture(kind)
            result = HOOK.on_page_content(html, page, {}, files)
            self.assertTrue(result.endswith(html))
            self.assertNotIn('id="demo--review-qa"', result)
            self.assertFalse(any("id" in attrs for attrs in Tags(result).named("span")))

    def test_every_session_has_complete_navigation(self):
        config = (ROOT / "mkdocs.yml").read_text(encoding="utf-8")
        sources = re.findall(r"^\s+- (Overview|Lab|Trainer Guide): (sessions/\S+)$", config, re.MULTILINE)
        trainer_sources = sorted(ROOT.glob("sessions/session-*/trainer-content/README.md"))
        self.assertEqual(len(trainer_sources), 29)
        self.assertEqual(len(sources), 29 * 3)
        for trainer in trainer_sources:
            directory = trainer.parent.parent.relative_to(ROOT).as_posix()
            for label, suffix in (("Overview", "README.md"), ("Lab", "lab/README.md"), ("Trainer Guide", "trainer-content/README.md")):
                path = f"{directory}/{suffix}"
                self.assertIn((label, path), sources)
                self.assertTrue((ROOT / path).is_file())

    def test_internal_docs_excluded_without_hiding_training(self):
        config = (ROOT / "mkdocs.yml").read_text(encoding="utf-8")
        excludes = config.split("exclude_docs: |\n", 1)[1].split("\ntheme:", 1)[0]
        for path in (
            "PRODUCT.md",
            "DESIGN.md",
            "AGENTS.md",
            ".impeccable/",
            ".agents/",
            "hooks/",
            "tests/",
            "scripts/",
            "overrides/partials/",
            "sessions/session-*/lab/starter/",
            "sessions/session-*/lab/solution/",
        ):
            self.assertIn(f"  {path}\n", excludes)
        self.assertNotIn("trainer-content", excludes)
        self.assertNotIn("  sessions/\n", excludes)
        self.assertIn("  - overrides/session.js", config)
        self.assertNotIn("scheme: slate", config)
        self.assertNotIn("toggle:", config)
        self.assertIn("  font: false", config)
        self.assertIn("  logo: assets/logos/rvap-full.png", config)
        self.assertTrue((ROOT / "assets/logos/rvap-full.png").is_file())
        self.assertIn(
            "extra_css:\n  - overrides/rvap-brand.css\n  - overrides/extra.css\n",
            config,
        )

    @unittest.skipUnless(shutil.which("node"), "Node is needed to execute the Marp engine")
    def test_slide_decoration_transform_preserves_instructional_content(self):
        subprocess.run(
            ["node", str(ROOT / "tests/marp_engine.js")],
            check=True,
            cwd=ROOT,
        )

    @unittest.skipUnless(shutil.which("node"), "Node is needed to execute session sets")
    def test_custom_set_state_and_share_links(self):
        subprocess.run(
            ["node", str(ROOT / "tests/session_sets.js")],
            check=True, cwd=ROOT,
        )

    @unittest.skipUnless(shutil.which("node"), "Node is needed to execute trainer controls")
    def test_trainer_timer_controls_and_shortcut(self):
        subprocess.run(
            ["node", str(ROOT / "tests/session_controls.js")],
            check=True, capture_output=True, text=True,
        )


if __name__ == "__main__":
    unittest.main()
