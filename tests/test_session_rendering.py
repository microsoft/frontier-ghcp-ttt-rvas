"""Regression coverage for shared session pages and legacy trainer URLs."""

from contextlib import redirect_stdout
from html.parser import HTMLParser
import importlib.util
import io
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch
from urllib.parse import urljoin

ROOT = Path(__file__).resolve().parents[1]
SESSION = "session-01-intro-to-copilot"


def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


HOOK = load_module("presentation_embed", "hooks/presentation_embed.py")
RENDERER = load_module("render_trainer_guides", "scripts/render-trainer-guides.py")


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
            title='Session 01 & "Copilot"',
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
                self.assertEqual(frame["title"], 'Slides: Session 01 & "Copilot"')
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

    def test_legacy_heading_alias_handles_punctuation_and_inline_markup(self):
        html = (
            '<h2 id="demo-review-qa">Demo <em>\u2014 Review</em>: Q&amp;A?'
            '<a class="headerlink" href="#demo-review-qa">Permanent link</a></h2>'
        )
        result = HOOK.preserve_trainer_anchors(html)
        self.assertEqual(
            result,
            '<span id="demo--review-qa" aria-hidden="true"></span>' + html,
        )
        self.assertEqual(HOOK.preserve_trainer_anchors(result), result)

    def test_legacy_alias_does_not_duplicate_any_existing_or_added_id(self):
        html = (
            '<h2 id="a-b">A \u2014 B</h2>\n'
            '<h2 id="c-d">C \u2014 D</h2>\n'
            '<h2 id="c-d_1">C \u2014 D</h2>\n'
            '<h2 id="unchanged">Unchanged</h2>\n'
            '<h2 id="empty">!?</h2>\n'
            '<div id="a--b">Existing target later in the page</div>'
        )
        result = HOOK.preserve_trainer_anchors(html)
        ids = [attrs["id"] for _, attrs in Tags(result).tags if "id" in attrs]
        self.assertEqual(len(ids), len(set(ids)))
        self.assertEqual(ids.count("a--b"), 1)
        self.assertEqual(ids.count("c--d"), 1)
        self.assertEqual(len(Tags(result).named("span")), 1)

    def test_legacy_aliases_skip_code_examples_and_preserve_multiline_html(self):
        html = (
            '<pre><code>&lt;h2 id="example"&gt;Example \u2014 Heading&lt;/h2&gt;'
            '\n## Another \u2014 Example</code></pre>\n'
            '  <h2\n id="real-heading">Real \u2014 Heading</h2>\n'
        )
        self.assertEqual(
            HOOK.preserve_trainer_anchors(html),
            html.replace(
                '<h2\n',
                '<span id="real--heading" aria-hidden="true"></span><h2\n',
            ),
        )

    def test_legacy_aliases_are_only_added_to_trainer_pages(self):
        html = '<h2 id="demo-review">Demo \u2014 Review</h2>'
        for kind in ("", "lab", "trainer-content"):
            page, files = self.fixture(kind)
            result = HOOK.on_page_content(html, page, {}, files)
            self.assertEqual('id="demo--review"' in result, kind == "trainer-content")

    def test_every_session_has_complete_navigation(self):
        config = (ROOT / "mkdocs.yml").read_text(encoding="utf-8")
        sources = re.findall(r"^\s+- (Overview|Lab|Trainer Guide): (sessions/\S+)$", config, re.MULTILINE)
        trainer_sources = sorted(ROOT.glob("sessions/session-*/trainer-content/README.md"))
        self.assertEqual(len(trainer_sources), 19)
        self.assertEqual(len(sources), 19 * 3)
        for trainer in trainer_sources:
            directory = trainer.parent.parent.relative_to(ROOT).as_posix()
            for label, suffix in (("Overview", "README.md"), ("Lab", "lab/README.md"), ("Trainer Guide", "trainer-content/README.md")):
                path = f"{directory}/{suffix}"
                self.assertIn((label, path), sources)
                self.assertTrue((ROOT / path).is_file())

    def test_internal_docs_excluded_without_hiding_training(self):
        config = (ROOT / "mkdocs.yml").read_text(encoding="utf-8")
        excludes = config.split("exclude_docs: |\n", 1)[1].split("\ntheme:", 1)[0]
        for path in ("PRODUCT.md", "DESIGN.md", "AGENTS.md", ".impeccable/", ".agents/", "hooks/", "tests/", "scripts/", "overrides/partials/"):
            self.assertIn(f"  {path}\n", excludes)
        self.assertNotIn("trainer-content", excludes)
        self.assertNotIn("sessions/", excludes)
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
    def test_trainer_controls_timer_shortcuts_and_scroll_margin(self):
        subprocess.run(
            ["node", str(ROOT / "tests/session_controls.js")],
            check=True, capture_output=True, text=True,
        )


class RedirectTests(unittest.TestCase):
    def test_stable_filename_and_target_without_reading_curriculum(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            session = root / "sessions" / SESSION
            trainer = session / "trainer-content" / "README.md"
            trainer.parent.mkdir(parents=True)
            trainer.write_bytes(b"\xff")  # Redirects never parse or rewrite Markdown.
            with patch.multiple(RENDERER, REPO_ROOT=root, OUTPUT_DIR=root / "output" / "trainer"):
                with redirect_stdout(io.StringIO()):
                    RENDERER.render_session(session)
            output = root / "output" / "trainer" / f"{SESSION}-trainer.html"
            self.assertTrue(output.is_file())
            self.assertEqual(output.read_text(), RENDERER.build_redirect(SESSION))

    def test_fallback_link_resolves_at_root_and_pages_subpath(self):
        html = RENDERER.build_redirect(SESSION)
        anchor = Tags(html).named("a")[0]
        self.assertNotIn("target", anchor)
        for prefix in ("/", "/emu-ghcp-ttt/"):
            base = f"https://example.test{prefix}output/trainer/{SESSION}-trainer.html"
            self.assertEqual(
                urljoin(base, anchor["href"]),
                f"https://example.test{prefix}sessions/{SESSION}/trainer-content/index.html",
            )

    def test_invalid_session_names_are_rejected(self):
        for name in ("../escape", "session-01-<script>", "session-01-test/other"):
            with self.assertRaises(ValueError):
                RENDERER.build_redirect(name)

    @unittest.skipUnless(shutil.which("node"), "Node is needed to execute redirect JavaScript")
    def test_redirect_preserves_query_and_fragment(self):
        html = RENDERER.build_redirect(SESSION)
        script = re.search(r"<script>(.*?)</script>", html, re.DOTALL)[1]
        anchor = Tags(html).named("a")[0]
        import json
        harness = """
const assert = require("node:assert/strict");
const vm = require("node:vm");
for (const prefix of ["/", "/emu-ghcp-ttt/"]) {
  for (const hash of ["", "#trainer-talking-points", "#caf%C3%A9", "#old--anchor"]) {
    const base = "https://example.test" + prefix + "output/trainer/SESSION-trainer.html";
    const link = {href: new URL(HREF, base).href};
    let replaced;
    vm.runInNewContext(SCRIPT, {
      URL,
      document: { getElementById: () => link },
      window: { location: { search: "?from=legacy", hash, replace: value => { replaced = value; } } }
    });
    const target = new URL(replaced);
    assert.equal(target.pathname, prefix + "sessions/SESSION/trainer-content/index.html");
    assert.equal(target.search, "?from=legacy");
    assert.equal(target.hash, hash);
    assert.equal(link.href, replaced);
  }
}
""".replace("SESSION", SESSION).replace("HREF", json.dumps(anchor["href"])).replace("SCRIPT", json.dumps(script))
        subprocess.run(["node", "-e", harness], check=True, capture_output=True, text=True)


if __name__ == "__main__":
    unittest.main()
