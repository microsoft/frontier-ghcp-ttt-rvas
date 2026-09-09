#!/usr/bin/env python3
"""Keep legacy trainer artifact URLs working; MkDocs now renders the guides."""

from html import escape
from pathlib import Path
import re
import sys

REPO_ROOT = Path(__file__).resolve().parent.parent
SESSIONS_DIR = REPO_ROOT / "sessions"
OUTPUT_DIR = REPO_ROOT / "output" / "trainer"


def build_redirect(session_name: str) -> str:
    if not re.fullmatch(r"session-\d{2}-[a-z0-9-]+", session_name):
        raise ValueError(f"Invalid session name: {session_name}")
    # README.md produces index.html with either MkDocs directory URL setting.
    target = f"../../sessions/{session_name}/trainer-content/index.html"
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Trainer guide moved</title>
</head>
<body>
  <p>This guide now uses the training site's shared layout.</p>
  <p><a id="trainer-guide" href="{escape(target, quote=True)}">Open trainer guide</a></p>
  <script>
    const link = document.getElementById("trainer-guide");
    const target = new URL(link.href);
    target.search = window.location.search;
    target.hash = window.location.hash;
    link.href = target.href;
    window.location.replace(target.href);
  </script>
</body>
</html>
"""


def render_session(session_dir: Path) -> None:
    trainer_file = session_dir / "trainer-content" / "README.md"
    if not trainer_file.is_file():
        print(f"Skipping {session_dir.name}: no trainer-content/README.md", file=sys.stderr)
        return
    page_html = build_redirect(session_dir.name)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    out_file = OUTPUT_DIR / f"{session_dir.name}-trainer.html"
    out_file.write_text(page_html, encoding="utf-8")
    print(f"  {out_file.relative_to(REPO_ROOT)}")


def main() -> None:
    session_dirs = sorted(path for path in SESSIONS_DIR.glob("session-*") if path.is_dir())
    if not session_dirs:
        sys.exit("No session directories found under sessions/")
    for session_dir in session_dirs:
        render_session(session_dir)
    print("Trainer guide redirects written to output/trainer/")


if __name__ == "__main__":
    main()
