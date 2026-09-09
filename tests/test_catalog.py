"""Coverage for the shared session catalog and page-relative material links."""

from contextlib import chdir
from copy import deepcopy
from html.parser import HTMLParser
import importlib.util
from pathlib import Path
import re
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch
from urllib.parse import urljoin

from jinja2 import ChoiceLoader, DictLoader, Environment, FileSystemLoader, StrictUndefined
from mkdocs.structure.files import File, Files, InclusionLevel

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("catalog_hook", ROOT / "hooks/presentation_embed.py")
HOOK = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(HOOK)


class Tags(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.tags = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

    def with_class(self, name):
        return [attrs for _, attrs in self.tags if name in attrs.get("class", "").split()]


class CatalogTests(unittest.TestCase):
    def setUp(self):
        self.catalog = HOOK.load_catalog(ROOT)
        HOOK.on_config({})

    def tearDown(self):
        HOOK.on_config({})

    def fixture(self, directory_urls=True):
        config = {"docs_dir": str(ROOT), "use_directory_urls": directory_urls}
        files = Files(
            File(
                f"sessions/{session['slug']}/{directory}README.md",
                str(ROOT), str(ROOT / "site"), directory_urls,
            )
            for session in self.catalog["sessions"]
            for directory in ("", "lab/", "trainer-content/")
        )
        for source in ("build-set.md", "session-set.md"):
            files.append(File(source, str(ROOT), str(ROOT / "site"), directory_urls))
        env = Environment(undefined=StrictUndefined)
        HOOK.on_env(env, config, files)
        return config, files, env

    def page(self, source, directory_urls=True):
        file = File(source, str(ROOT), str(ROOT / "site"), directory_urls)
        return SimpleNamespace(file=file, url=file.url)

    def test_catalog_matches_all_nav_session_sources(self):
        self.assertEqual([m["id"] for m in self.catalog["modules"]], list("12345"))
        self.assertEqual([s["id"] for s in self.catalog["sessions"]], [f"{i:02d}" for i in range(1, 20)])
        sources = [
            f"sessions/{session['slug']}/{directory}README.md"
            for session in self.catalog["sessions"]
            for directory in ("", "lab/", "trainer-content/")
        ]
        nav = re.findall(
            r"^\s+- (?:Overview|Lab|Trainer Guide): (sessions/\S+)$",
            (ROOT / "mkdocs.yml").read_text(encoding="utf-8"), re.MULTILINE,
        )
        self.assertCountEqual(sources, nav)
        self.assertEqual(len(set(sources)), 57)
        for source in sources:
            self.assertTrue((ROOT / source).is_file(), source)

    def test_invalid_schema_is_rejected(self):
        for catalog in (
            None, [], {}, {"modules": [], "sessions": []},
            {"modules": {}, "sessions": self.catalog["sessions"]},
            {"modules": self.catalog["modules"], "sessions": "bad"},
            {**self.catalog, "unexpected": True},
        ):
            with self.subTest(catalog=catalog):
                with self.assertRaisesRegex(ValueError, "Session catalog"):
                    HOOK.validate_catalog(catalog)
        for collection in ("modules", "sessions"):
            for entry in (None, "bad", {}, {"id": "01"}):
                catalog = deepcopy(self.catalog)
                catalog[collection][0] = entry
                with self.subTest(collection=collection, entry=entry):
                    with self.assertRaisesRegex(ValueError, "must contain exactly"):
                        HOOK.validate_catalog(catalog)

    def test_required_strings_and_durations_are_validated(self):
        for collection in ("modules", "sessions"):
            for key in self.catalog[collection][0]:
                for value in (None, "", " ", [], 1, True):
                    if key == "duration_minutes" and type(value) is int:
                        continue
                    catalog = deepcopy(self.catalog)
                    catalog[collection][0][key] = value
                    with self.subTest(collection=collection, key=key, value=value):
                        with self.assertRaisesRegex(ValueError, f"\\.{key} "):
                            HOOK.validate_catalog(catalog)
        for duration in (-1, 0, 180.0, "180", False):
            catalog = deepcopy(self.catalog)
            catalog["sessions"][0]["duration_minutes"] = duration
            with self.subTest(duration=duration):
                with self.assertRaisesRegex(ValueError, "positive integer"):
                    HOOK.validate_catalog(catalog)

    def test_duplicate_ids_and_slugs_are_rejected(self):
        for collection, key, message in (
            ("modules", "id", "duplicate module id"),
            ("sessions", "id", "duplicate session id"),
            ("sessions", "slug", "duplicate session slug"),
        ):
            catalog = deepcopy(self.catalog)
            catalog[collection][1][key] = catalog[collection][0][key]
            with self.subTest(collection=collection, key=key):
                with self.assertRaisesRegex(ValueError, message):
                    HOOK.validate_catalog(catalog)

    def test_invalid_ids_module_references_difficulty_and_paths_are_rejected(self):
        for key, value, message in (
            ("id", "1", "two-digit"),
            ("id", "00", "two-digit"),
            ("id", "100", "two-digit"),
            ("module", "99", "unknown module"),
            ("difficulty", "beginner", "difficulty"),
            ("difficulty", "Expert", "difficulty"),
            ("slug", "../session-01-test", "session path"),
            ("slug", "session-01-test/lab", "session path"),
            ("slug", "session-01-test\\lab", "session path"),
            ("slug", "session-02-test", "session path"),
            ("slug", "session-01-test?query", "session path"),
            ("slug", "session-01-test#fragment", "session path"),
            ("slug", "session-01-test\n", "session path"),
        ):
            catalog = deepcopy(self.catalog)
            catalog["sessions"][0][key] = value
            with self.subTest(key=key, value=value):
                with self.assertRaisesRegex(ValueError, message):
                    HOOK.validate_catalog(catalog)
        for module_id in ("0", "-1", "one", "1/2"):
            catalog = deepcopy(self.catalog)
            catalog["modules"][0]["id"] = module_id
            with self.assertRaisesRegex(ValueError, "positive integer string"):
                HOOK.validate_catalog(catalog)

    def test_missing_or_malformed_catalog_fails_clearly(self):
        with tempfile.TemporaryDirectory() as tmp:
            with self.assertRaisesRegex(ValueError, "Session catalog is missing:"):
                HOOK.load_catalog(tmp)
        with patch.object(Path, "read_text", return_value="{invalid"):
            with self.assertRaisesRegex(ValueError, "Invalid session catalog JSON"):
                HOOK.load_catalog(ROOT)

    def test_every_material_must_exist_and_be_included(self):
        for directory in ("", "lab/", "trainer-content/"):
            config, files, env = self.fixture()
            source = f"sessions/{self.catalog['sessions'][0]['slug']}/{directory}README.md"
            target = files.get_file_from_path(source)
            original_is_file = Path.is_file
            with patch.object(Path, "is_file", lambda path: path != ROOT / source and original_is_file(path)):
                with self.assertRaisesRegex(ValueError, "material file is missing"):
                    HOOK.on_env(env, config, files)
            self.assertIsNone(HOOK._catalog_state)
            target.inclusion = InclusionLevel.EXCLUDED
            with self.assertRaisesRegex(ValueError, "target is excluded"):
                HOOK.on_env(env, config, files)
            files.remove(target)
            with self.assertRaisesRegex(ValueError, "target is missing from MkDocs files"):
                HOOK.on_env(env, config, files)

    def test_set_routes_must_exist_in_registry_and_be_included(self):
        for source in ("build-set.md", "session-set.md"):
            config, files, env = self.fixture()
            target = files.get_file_from_path(source)
            target.inclusion = InclusionLevel.EXCLUDED
            with self.assertRaisesRegex(ValueError, f"target is excluded.*{source}"):
                HOOK.on_env(env, config, files)
            files.remove(target)
            with self.assertRaisesRegex(ValueError, f"target is missing from MkDocs files.*{source}"):
                HOOK.on_env(env, config, files)
            self.assertIsNone(HOOK._catalog_state)

    def test_urls_from_every_page_work_in_both_modes_and_site_subpaths(self):
        for directory_urls in (True, False):
            config, files, _ = self.fixture(directory_urls)
            for source in (
                "README.md", "build-set.md", "builder.md", "session-set.md",
                "nested/tools/builder.md",
                "sessions/session-01-intro-to-copilot/trainer-content/README.md",
            ):
                page = self.page(source, directory_urls)
                context = HOOK.on_page_context({}, page, config, None)
                self.assertEqual(context["session_catalog"]["modules"], self.catalog["modules"])
                for prefix in ("/", "/emu-ghcp-ttt/", "/org/training/site/"):
                    base = f"https://example.test{prefix}{page.file.url}"
                    for key, target_source in (
                        ("set_builder_url", "build-set.md"),
                        ("session_set_url", "session-set.md"),
                    ):
                        with self.subTest(mode=directory_urls, source=source, prefix=prefix, key=key):
                            target = files.get_file_from_path(target_source)
                            self.assertEqual(
                                urljoin(base, context[key]),
                                f"https://example.test{prefix}{target.url}",
                            )
                    for session in context["session_catalog"]["sessions"]:
                        for key, directory in (("url", ""), ("lab_url", "lab/"), ("trainer_url", "trainer-content/")):
                            with self.subTest(mode=directory_urls, source=source, prefix=prefix, id=session["id"], key=key):
                                target = files.get_file_from_path(f"sessions/{session['slug']}/{directory}README.md")
                                self.assertEqual(
                                    urljoin(base, session[key]),
                                    f"https://example.test{prefix}{target.url}",
                                )
                                self.assertNotIn("\\", session[key])

    def test_links_use_actual_registry_urls(self):
        config, files, _ = self.fixture()
        source = f"sessions/{self.catalog['sessions'][0]['slug']}/lab/README.md"
        files.get_file_from_path(source).url = "relocated/lab.html"
        files.get_file_from_path("build-set.md").url = "relocated/builder.html"
        files.get_file_from_path("session-set.md").url = "relocated/viewer.html"
        page = self.page("nested/build-set.md")
        context = HOOK.on_page_context({}, page, config, None)
        catalog = context["session_catalog"]
        self.assertEqual(context["set_builder_url"], "../../relocated/builder.html")
        self.assertEqual(context["session_set_url"], "../../relocated/viewer.html")
        self.assertEqual(catalog["sessions"][0]["lab_url"], "../../relocated/lab.html")
        page.file.dest_uri = page.file.dest_uri.replace("/", "\\")
        self.assertEqual(
            HOOK.on_page_context({}, page, config, None)["session_catalog"],
            catalog,
        )

    def test_catalog_is_loaded_once_per_build_and_contexts_do_not_leak(self):
        with patch.object(HOOK, "load_catalog", wraps=HOOK.load_catalog) as load:
            config, files, env = self.fixture()
            for source in ("README.md", "build-set.md", "session-set.md"):
                context = HOOK.on_page_context({"keep": True}, self.page(source), config, None)
                self.assertTrue(context["keep"])
                context["session_catalog"]["sessions"][0]["title"] = "Changed"
                context["session_catalog"]["modules"][0]["title"] = "Changed"
            self.assertEqual(load.call_count, 1)
            self.assertEqual(env.globals["session_catalog"], self.catalog)
            HOOK.on_env(env, config, files)
            self.assertEqual(load.call_count, 2)
            self.assertNotIn("url", env.globals["session_catalog"]["sessions"][0])

    def test_uninitialized_or_stale_build_state_fails(self):
        page = self.page("README.md")
        with self.assertRaisesRegex(ValueError, "not initialized"):
            HOOK.on_page_context({}, page, {}, None)
        config, _, _ = self.fixture()
        with self.assertRaisesRegex(ValueError, "not initialized"):
            HOOK.on_page_context({}, page, dict(config), None)
        HOOK.on_config(config)
        with self.assertRaisesRegex(ValueError, "not initialized"):
            HOOK.on_page_context({}, page, config, None)

    def test_catalog_path_does_not_depend_on_working_directory(self):
        config, files, env = self.fixture()
        with tempfile.TemporaryDirectory() as tmp, chdir(tmp):
            HOOK.on_env(env, config, files)
            config["docs_dir"] = "."
            HOOK.on_env(env, config, files)
        self.assertEqual(env.globals["session_catalog"], self.catalog)

    def test_home_renders_catalog_cards_and_preserves_module_anchors_and_tracks(self):
        for directory_urls in (True, False):
            config, _, env = self.fixture(directory_urls)
            env.loader = ChoiceLoader([
                DictLoader({
                    "base.html": "{% block header %}{% endblock %}{% block hero %}{% endblock %}{% block content %}{% endblock %}",
                    "partials/rvap-header.html": "",
                }),
                FileSystemLoader(ROOT / "overrides"),
            ])
            page = self.page("README.md", directory_urls)
            context = HOOK.on_page_context({"page": page}, page, config, None)
            rendered = env.get_template("main.html").render(context)
            tags = Tags(rendered)
            cards = tags.with_class("ghcp-session-card")
            self.assertEqual(len(cards), 19)
            self.assertEqual(len(tags.with_class("ghcp-sessions")), 5)
            self.assertEqual(len(tags.with_class("ghcp-track-card")), 6)
            for card, session in zip(cards, context["session_catalog"]["sessions"]):
                self.assertEqual(card["href"], session["url"])
                self.assertEqual(card["data-number"], session["id"])
            headings = {
                attrs["id"]: attrs for tag, attrs in tags.tags
                if tag == "h2" and "id" in attrs
            }
            for module in self.catalog["modules"]:
                self.assertEqual(headings[f"module-{module['id']}"]["tabindex"], "-1")
            self.assertEqual(
                [link["href"] for link in tags.with_class("ghcp-module-node")],
                [f"#module-{m['id']}" for m in self.catalog["modules"]],
            )
            self.assertEqual(
                tags.with_class("rvap-action--primary")[0]["href"],
                context["session_catalog"]["sessions"][0]["url"],
            )


if __name__ == "__main__":
    unittest.main()
