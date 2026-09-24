"""Convert GitHub alert blockquotes to MkDocs Material admonitions."""

import re


_ALERT = re.compile(
    r"^\s{0,3}>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$",
    re.IGNORECASE,
)
_BLOCKQUOTE = re.compile(r"^\s{0,3}>\s?(.*)$")
_FENCE = re.compile(r"^\s{0,3}(?P<marker>`{3,}|~{3,})")
_ADMONITIONS = {
    "NOTE": ("note", "Note"),
    "TIP": ("tip", "Tip"),
    "IMPORTANT": ("info", "Important"),
    "WARNING": ("warning", "Warning"),
    "CAUTION": ("danger", "Caution"),
}


def convert_github_alerts(markdown: str) -> str:
    """Convert alerts outside fenced examples and preserve ordinary blockquotes."""
    lines = markdown.splitlines(keepends=True)
    output = []
    fence = None
    index = 0

    while index < len(lines):
        line = lines[index]
        fence_match = _FENCE.match(line)
        if fence_match:
            marker = fence_match.group("marker")[0]
            if fence is None:
                fence = marker
            elif marker == fence:
                fence = None
            output.append(line)
            index += 1
            continue

        alert_match = _ALERT.match(line.rstrip("\r\n")) if fence is None else None
        if alert_match is None:
            output.append(line)
            index += 1
            continue

        alert_type, title = _ADMONITIONS[alert_match.group(1).upper()]
        output.extend((f'!!! {alert_type} "{title}"\n', "\n"))
        index += 1

        while index < len(lines):
            quote_match = _BLOCKQUOTE.match(lines[index].rstrip("\r\n"))
            if quote_match is None:
                break
            content = quote_match.group(1)
            output.append(f"    {content}\n" if content else "    \n")
            index += 1

    return "".join(output)


def on_page_markdown(markdown, **_kwargs):
    """Render GitHub alerts through the configured MkDocs admonition extension."""
    return convert_github_alerts(markdown)
