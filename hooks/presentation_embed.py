"""Add shared session navigation, slide access, and trainer controls to MkDocs."""

from html import escape
from html.parser import HTMLParser
import json
from pathlib import Path
import posixpath
import re
import shutil

_SESSION_RE = re.compile(
    r"^sessions/(session-m[1-9]\d*-\d{2}-[^/]+)/(?:((?:lab|trainer-content))/)?README\.md$"
)
_PAGE_KINDS = (
    ("overview", "", "Overview"),
    ("lab", "lab/", "Lab"),
    ("trainer-content", "trainer-content/", "Trainer Guide"),
)
_CATALOG_LINKS = ("url", "lab_url", "trainer_url")
_SET_PAGES = (
    ("set_builder_url", "build-set.md"),
    ("session_set_url", "session-set.md"),
)
_catalog_state = None


def validate_catalog(catalog):
    """Reject incomplete or ambiguous catalog entries before rendering pages."""
    if not isinstance(catalog, dict) or set(catalog) != {"modules", "sessions"}:
        raise ValueError("Session catalog must contain modules and sessions.")
    for collection in ("modules", "sessions"):
        if not isinstance(catalog[collection], list) or not catalog[collection]:
            raise ValueError(f"Session catalog {collection} must be a nonempty list.")

    module_ids = set()
    session_ids = set()
    legacy_ids = set()
    slugs = set()
    for collection, keys in (
        ("modules", {"id", "title"}),
        ("sessions", {"id", "slug", "module", "title", "description", "difficulty", "duration_minutes"}),
    ):
        for index, item in enumerate(catalog[collection]):
            label = f"Session catalog {collection}[{index}]"
            optional = {"legacy_id"} if collection == "sessions" else set()
            if not isinstance(item, dict) or not keys <= set(item) or set(item) - keys - optional:
                raise ValueError(f"{label} must contain required fields: {', '.join(sorted(keys))}; optional: {', '.join(sorted(optional)) or 'none'}.")
            for key in set(item) - {"duration_minutes"}:
                if not isinstance(item[key], str) or not item[key].strip():
                    raise ValueError(f"{label}.{key} must be a nonempty string.")
            if collection == "modules":
                if not re.fullmatch(r"[1-9][0-9]*", item["id"]):
                    raise ValueError(f"{label}.id must be a positive integer string.")
                if item["id"] in module_ids:
                    raise ValueError(f"{label} has a duplicate module id: {item['id']}.")
                module_ids.add(item["id"])
                continue
            if not re.fullmatch(r"m[1-9]\d*-(?:0[1-9]|[1-9][0-9])", item["id"]):
                raise ValueError(f"{label}.id must use a module prefix and two-digit local number, such as m2-01.")
            if item["id"] in session_ids:
                raise ValueError(f"{label} has a duplicate session id: {item['id']}.")
            if item["slug"] in slugs:
                raise ValueError(f"{label} has a duplicate session slug: {item['slug']}.")
            if not re.fullmatch(rf"session-{item['id']}-[a-z0-9]+(?:-[a-z0-9]+)*", item["slug"]):
                raise ValueError(f"{label}.slug must be a session path matching its id.")
            if item["module"] not in module_ids:
                raise ValueError(f"{label} references an unknown module: {item['module']}.")
            if not item["id"].startswith(f"m{item['module']}-"):
                raise ValueError(f"{label}.id must match its module.")
            if "legacy_id" in item and not re.fullmatch(r"(?:0[1-9]|[1-9][0-9])", item["legacy_id"]):
                raise ValueError(f"{label}.legacy_id must be a two-digit string from 01 to 99.")
            if "legacy_id" in item and item["legacy_id"] in legacy_ids:
                raise ValueError(f"{label} has a duplicate legacy id: {item['legacy_id']}.")
            if item["difficulty"] not in {"Beginner", "Intermediate", "Advanced"}:
                raise ValueError(f"{label}.difficulty must be Beginner, Intermediate, or Advanced.")
            if type(item["duration_minutes"]) is not int or item["duration_minutes"] <= 0:
                raise ValueError(f"{label}.duration_minutes must be a positive integer.")
            session_ids.add(item["id"])
            if "legacy_id" in item:
                legacy_ids.add(item["legacy_id"])
            slugs.add(item["slug"])
    expected_ids = [
        f"m{module['id']}-{index:02d}"
        for module in catalog["modules"]
        for index in range(1, 1 + sum(s["module"] == module["id"] for s in catalog["sessions"]))
    ]
    if [s["id"] for s in catalog["sessions"]] != expected_ids:
        raise ValueError("Session catalog sessions must be ordered by module with consecutive local numbers starting at 01.")
    return catalog


def load_catalog(docs_dir):
    path = Path(docs_dir) / "data/session-catalog.json"
    try:
        catalog = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as error:
        raise ValueError(f"Session catalog is missing: {path}") from error
    except json.JSONDecodeError as error:
        raise ValueError(f"Invalid session catalog JSON in {path}: {error}") from error
    return validate_catalog(catalog)


def on_config(config):
    global _catalog_state
    _catalog_state = None
    return config


def _catalog_target(files, source):
    target = files.get_file_from_path(source)
    if target is None:
        raise ValueError(f"Session catalog target is missing from MkDocs files: {source}")
    if target.inclusion.is_excluded():
        raise ValueError(f"Session catalog target is excluded from the site: {source}")
    return target


def on_env(env, config, files):
    """Load once per build, after MkDocs has resolved its output files."""
    global _catalog_state
    _catalog_state = None
    docs_dir = Path(config["docs_dir"])
    if not docs_dir.is_absolute():
        config_path = getattr(config, "config_file_path", None)
        root = Path(config_path).resolve().parent if config_path else Path(__file__).resolve().parents[1]
        docs_dir = root / docs_dir
    catalog = load_catalog(docs_dir)
    targets = {}
    for session in catalog["sessions"]:
        links = {}
        for key, (_, directory, _) in zip(_CATALOG_LINKS, _PAGE_KINDS):
            source = f"sessions/{session['slug']}/{directory}README.md"
            if not (docs_dir / source).is_file():
                raise ValueError(f"Session catalog material file is missing: {source}")
            links[key] = _catalog_target(files, source)
        targets[session["id"]] = links
    set_pages = {key: _catalog_target(files, source) for key, source in _SET_PAGES}
    _catalog_state = (config, catalog, targets, set_pages)
    env.globals["session_catalog"] = catalog
    return env


def on_page_context(context, page, config, nav):
    if _catalog_state is None or _catalog_state[0] is not config:
        raise ValueError("Session catalog is not initialized for this build; on_env must run first.")
    _, catalog, targets, set_pages = _catalog_state
    context.update({
        key: site_relative_url(page, target.url)
        for key, target in set_pages.items()
    })
    context["session_catalog"] = {
        "modules": [dict(module) for module in catalog["modules"]],
        "sessions": [
            {
                **session,
                **{
                    key: site_relative_url(page, target.url)
                    for key, target in targets[session["id"]].items()
                },
            }
            for session in catalog["sessions"]
        ],
    }
    return context


def redirect_page(target: str) -> str:
    return f"""<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Session moved</title></head>
<body>
<p><a id="session-target" href="{escape(target, quote=True)}">Open this session</a></p>
<script>
const link = document.getElementById("session-target");
const target = new URL(link.href);
target.search = window.location.search;
target.hash = window.location.hash;
link.href = target.href;
window.location.replace(target.href);
</script>
</body>
</html>
"""


def preserve_session_anchors(html: str, sessions) -> str:
    for session in sessions:
        if "legacy_id" not in session:
            continue
        pattern = rf'(<h[1-6]\b[^>]*\bid="session-{session["id"]}([^"]*)"[^>]*>)'

        def alias(match):
            old_id = f"session-{session['legacy_id']}{match[2]}"
            if f'id="{old_id}"' in html:
                return match[0]
            return f'<span id="{escape(old_id, quote=True)}" aria-hidden="true"></span>' + match[0]

        html = re.sub(pattern, alias, html)
    return html


def on_post_build(config):
    """Keep published session and artifact URLs working after renumbering."""
    if _catalog_state is None or _catalog_state[0] is not config:
        raise ValueError("Session catalog is not initialized for this build.")
    _, catalog, targets, _ = _catalog_state
    site = Path(config["site_dir"])
    for session in catalog["sessions"]:
        if "legacy_id" not in session:
            continue
        old_slug = session["slug"].replace(f"session-{session['id']}-", f"session-{session['legacy_id']}-", 1)
        redirects = {
            f"sessions/{old_slug}/{directory}index.html": targets[session["id"]][key].url
            for key, (_, directory, _) in zip(_CATALOG_LINKS, _PAGE_KINDS)
        }
        redirects[f"output/html/{old_slug}.html"] = f"output/html/{session['slug']}.html"
        redirects[f"output/trainer/{old_slug}-trainer.html"] = targets[session["id"]]["trainer_url"].url
        for source, target in redirects.items():
            path = site / source
            path.parent.mkdir(parents=True, exist_ok=True)
            relative = posixpath.relpath(target, posixpath.dirname(source))
            if target.endswith("/"):
                relative += "/"
            path.write_text(redirect_page(relative), encoding="utf-8")
        pdf = site / f"output/pdf/{session['slug']}.pdf"
        if pdf.is_file():
            shutil.copyfile(pdf, site / f"output/pdf/{old_slug}.pdf")


class _TrainerHeadings(HTMLParser):
    """Find rendered headings without rewriting their HTML or fenced examples."""

    def __init__(self, html: str):
        super().__init__()
        self.ids = set()
        self.headings = []
        self.heading = None
        self.in_permalink = False
        self.line_offsets = [0] + [match.end() for match in re.finditer("\n", html)]
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "h2":
            line, column = self.getpos()
            self.heading = {
                "offset": self.line_offsets[line - 1] + column,
                "id": attrs.get("id"),
                "text": [],
            }
        elif self.heading is not None and tag == "a":
            self.in_permalink = "headerlink" in (attrs.get("class") or "").split()

    def handle_data(self, data):
        if self.heading is not None and not self.in_permalink:
            self.heading["text"].append(data)

    def handle_endtag(self, tag):
        if tag == "a":
            self.in_permalink = False
        elif tag == "h2" and self.heading is not None:
            self.headings.append(self.heading)
            self.heading = None


def preserve_trainer_anchors(html: str) -> str:
    parsed = _TrainerHeadings(html)
    insertions = []
    for heading in parsed.headings:
        title = "".join(heading["text"])
        legacy = re.sub(r"[^\w\s-]", "", title).strip().lower().replace(" ", "-")
        if not heading["id"] or not legacy or legacy in parsed.ids:
            continue
        parsed.ids.add(legacy)
        alias = f'<span id="{escape(legacy, quote=True)}" aria-hidden="true"></span>'
        insertions.append((heading["offset"], alias))
    for offset, alias in reversed(insertions):
        html = html[:offset] + alias + html[offset:]
    return html


def session_page(src_path: str):
    """Return the session name and page kind, or None for other content."""
    match = _SESSION_RE.fullmatch(src_path.replace("\\", "/"))
    return (match[1], match[2] or "overview") if match else None


def site_relative_url(page, target_url: str) -> str:
    """Resolve a site-relative URL from the page's actual output directory."""
    depth = page.file.dest_uri.replace("\\", "/").count("/")
    return "../" * depth + target_url


def session_navigation(page, files, session_name: str, kind: str) -> str:
    links = []
    for target_kind, directory, label in _PAGE_KINDS:
        source = f"sessions/{session_name}/{directory}README.md"
        target = files.get_file_from_path(source)
        if target is None:
            raise ValueError(f"Session navigation target is missing: {source}")
        url = escape(site_relative_url(page, target.url), quote=True)
        active = ' aria-current="page"' if target_kind == kind else ""
        css_class = ' class="trainer-guide-btn"' if target_kind == "trainer-content" else ""
        links.append(f'  <a href="{url}"{css_class}{active}>{label}</a>')
    return '<nav class="session-nav" aria-label="Session materials">\n' + "\n".join(links) + "\n</nav>\n"


def presentation_launcher(page, session_name: str) -> str:
    presentation_url = escape(
        site_relative_url(page, f"output/html/{session_name}.html"), quote=True
    )
    pdf_url = escape(
        site_relative_url(page, f"output/pdf/{session_name}.pdf"), quote=True
    )
    title = escape(page.title or session_name, quote=True)
    return f"""
<div class="presentation-launcher">
  <button type="button" class="presentation-launch-btn" data-presentation-open
    aria-haspopup="dialog" aria-controls="pres-modal" hidden>Launch Slides</button>
  <a class="presentation-newwindow-btn" href="{presentation_url}"
    target="_blank" rel="noopener">Slides in new tab</a>
  <a class="presentation-pdf-btn" href="{pdf_url}"
    target="_blank" rel="noopener">Download PDF</a>
</div>
<dialog id="pres-modal" class="pres-modal" aria-label="Presentation viewer">
  <div class="pres-modal__frame-wrap">
    <button type="button" class="pres-modal__close" data-presentation-close
      autofocus>Close slides</button>
    <iframe class="pres-modal__iframe" data-src="{presentation_url}"
      title="Slides: {title}" allowfullscreen></iframe>
  </div>
</dialog>
"""


def trainer_controls() -> str:
    return """
<div class="trainer-controls" role="group" aria-label="Trainer timer controls" hidden>
  <span class="trainer-timer" role="timer" aria-label="Elapsed session time"
    aria-live="off">00:00</span>
  <button type="button" data-trainer-timer>Start timer</button>
  <button type="button" data-trainer-reset>Reset timer</button>
  <button type="button" data-trainer-print>Print guide</button>
  <label class="trainer-controls__shortcuts">
    <input type="checkbox" data-trainer-shortcuts>
    Enable timer shortcut (T)
  </label>
</div>
"""


def on_page_content(html: str, page, config, files) -> str:
    if _catalog_state is not None and _catalog_state[0] is config:
        html = preserve_session_anchors(html, _catalog_state[1]["sessions"])
    session = session_page(page.file.src_path)
    if session is None:
        return html
    session_name, kind = session
    navigation = session_navigation(page, files, session_name, kind)
    controls = ""
    if kind == "overview":
        controls = presentation_launcher(page, session_name)
    elif kind == "trainer-content":
        controls = trainer_controls()
        html = preserve_trainer_anchors(html)
    title_end = re.search(r"</h1\s*>", html, re.IGNORECASE)
    if controls and title_end:
        html = html[:title_end.end()] + controls + html[title_end.end():]
    else:
        html = controls + html
    return navigation + html
