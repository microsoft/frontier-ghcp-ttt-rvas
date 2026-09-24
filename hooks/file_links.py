"""Link inline file references to their published page or GitHub source."""

from pathlib import Path
import re
from urllib.parse import quote

_INLINE_FILE = re.compile(r"`(?P<reference>[^`\n]+?\.[A-Za-z0-9]+)`")
_MARKDOWN_LINK = re.compile(
    r"(?<!!)(?P<prefix>\[[^\]\n]*\]\()"
    r"(?P<reference>[^)\s]+)(?P<suffix>[^)]*\))"
)
_FENCE = re.compile(r"^\s{0,3}(?P<marker>`{3,}|~{3,})")
_EXERCISE_ASSET_DIRS = frozenset({"starter", "solution"})
_FILE_EXTENSIONS = frozenset({
    ".bicep", ".config", ".cs", ".css", ".env", ".go", ".gz", ".html", ".ini",
    ".java", ".js", ".json", ".jsx", ".kt", ".kts", ".lock", ".md", ".php",
    ".ps1", ".py", ".rb", ".rs", ".sh", ".sql", ".swift", ".tf", ".toml",
    ".ts", ".tsx", ".txt", ".xml", ".yaml", ".yml",
})


def _docs_dir(config) -> Path:
    docs_dir = Path(config["docs_dir"])
    if docs_dir.is_absolute():
        return docs_dir
    config_path = getattr(config, "config_file_path", None)
    root = Path(config_path).resolve().parent if config_path else Path.cwd()
    return (root / docs_dir).resolve()


def _find_target(reference: str, page, config) -> Path | None:
    docs_dir = _docs_dir(config)
    source_dir = (docs_dir / page.file.src_path).resolve().parent
    candidate = Path(reference)
    if candidate.is_absolute():
        return None

    for directory in (source_dir, *source_dir.parents):
        try:
            directory.relative_to(docs_dir)
        except ValueError:
            break
        target = (directory / candidate).resolve()
        if target.is_relative_to(docs_dir) and target.exists():
            return target
        if len(candidate.parts) == 1:
            matches = tuple(directory.rglob(candidate.name))
            if len(matches) == 1 and matches[0].is_file():
                return matches[0]
    return None


def _relative_url(page, target_url: str) -> str:
    depth = page.file.dest_uri.replace("\\", "/").count("/")
    return "../" * depth + target_url


def _is_file_reference(reference: str) -> bool:
    path = Path(reference)
    return "*" not in reference and path.suffix.lower() in _FILE_EXTENSIONS


def _is_exercise_asset(target: Path, config) -> bool:
    parts = target.relative_to(_docs_dir(config)).parts
    return any(
        parts[index] == "lab" and parts[index + 1] in _EXERCISE_ASSET_DIRS
        for index in range(len(parts) - 1)
    )


def _source_url(target: Path, config) -> str | None:
    repo_url = config.get("extra", {}).get("source_repository_url")
    if not repo_url:
        return None
    source = target.relative_to(_docs_dir(config)).as_posix()
    view = "tree" if target.is_dir() else "blob"
    return f"{repo_url.rstrip('/')}/{view}/main/{quote(source)}"


def _link_for(reference: str, page, config, files) -> str | None:
    if not _is_file_reference(reference):
        return None
    target = _find_target(reference, page, config)
    if target is None:
        return None

    if _is_exercise_asset(target, config):
        return _source_url(target, config)

    source = target.relative_to(_docs_dir(config)).as_posix()
    site_file = files.get_file_from_path(source)
    if target.suffix == ".md" and site_file is not None and not site_file.inclusion.is_excluded():
        return _relative_url(page, site_file.url)

    return _source_url(target, config)


def _replace_asset_link(match, page, config) -> str:
    reference = match.group("reference")
    if reference.startswith(("http://", "https://", "mailto:", "#")):
        return match.group(0)

    target = _find_target(reference, page, config)
    if target is None or not _is_exercise_asset(target, config):
        return match.group(0)

    url = _source_url(target, config)
    if url is None:
        return match.group(0)
    return f"{match.group('prefix')}{url}{match.group('suffix')}"


def _replace_file_reference(match, line: str, page, config, files) -> str:
    start, end = match.span()
    if line[start - 1:start] == "[" and line[end:end + 2] == "](":
        return match.group(0)

    reference = match.group("reference")
    url = _link_for(reference, page, config, files)
    if url is None:
        return match.group(0)
    return f"[`{reference}`]({url})"


def on_page_markdown(markdown, page, config, files):
    """Link real inline file references without touching examples or existing links."""
    output = []
    fence = None
    for line in markdown.splitlines(keepends=True):
        marker = _FENCE.match(line)
        if marker:
            if fence is None:
                fence = marker.group("marker")[0]
            elif marker.group("marker")[0] == fence:
                fence = None
            output.append(line)
            continue
        if fence is not None:
            output.append(line)
            continue
        line = _MARKDOWN_LINK.sub(
            lambda match: _replace_asset_link(match, page, config),
            line,
        )
        output.append(
            _INLINE_FILE.sub(
                lambda match: _replace_file_reference(match, line, page, config, files),
                line,
            )
        )
    return "".join(output)
