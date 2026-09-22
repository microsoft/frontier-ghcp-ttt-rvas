#!/usr/bin/env python3
"""Validate one Train-the-Trainer session against the shared curriculum contract."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any


REQUIRED_PATHS = (
    "README.md",
    "slides.md",
    "trainer-content/README.md",
    "lab/README.md",
    "lab/starter",
    "lab/solution",
)
VALID_DIFFICULTIES = {"Beginner", "Intermediate", "Advanced"}


def finding(category: str, path: Path, message: str) -> dict[str, str]:
    return {"category": category, "path": str(path), "message": message}


def repository_root(session_path: Path) -> Path:
    for parent in (session_path, *session_path.parents):
        if (parent / "data/session-catalog.json").is_file():
            return parent
    raise ValueError("Could not find the repository root containing data/session-catalog.json.")


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def validate_materials(session_path: Path) -> list[dict[str, str]]:
    findings: list[dict[str, str]] = []
    for relative_path in REQUIRED_PATHS:
        target = session_path / relative_path
        if not target.exists():
            kind = "directory" if target.suffix == "" else "file"
            findings.append(
                finding("required materials", target, f"Missing required {kind}.")
            )
    return findings


def catalog_session(root: Path, slug: str) -> dict[str, Any] | None:
    catalog = json.loads(read_text(root / "data/session-catalog.json"))
    return next(
        (session for session in catalog["sessions"] if session["slug"] == slug),
        None,
    )


def validate_metadata(root: Path, session_path: Path) -> list[dict[str, str]]:
    findings: list[dict[str, str]] = []
    match = re.fullmatch(r"session-(\d{2})-[a-z0-9-]+", session_path.name)
    if not match:
        return [
            finding(
                "metadata",
                session_path,
                "Directory name must use the form session-NN-topic.",
            )
        ]

    session_id = match.group(1)
    overview = session_path / "README.md"
    if not overview.is_file():
        return findings

    overview_text = read_text(overview)
    if not re.search(rf"^# Session {session_id}\b", overview_text, re.MULTILINE):
        findings.append(
            finding(
                "metadata",
                overview,
                f"Overview heading must begin with '# Session {session_id}'.",
            )
        )

    for label in ("Module", "Difficulty", "Prerequisites", "Duration"):
        if not re.search(rf"^\*\*{label}:\*\*\s+\S", overview_text, re.MULTILINE):
            findings.append(
                finding(
                    "metadata",
                    overview,
                    f"Missing a populated '**{label}:**' metadata field.",
                )
            )

    entry = catalog_session(root, session_path.name)
    if entry is None:
        findings.append(
            finding(
                "metadata",
                root / "data/session-catalog.json",
                f"Missing catalog entry for '{session_path.name}'.",
            )
        )
        return findings

    if entry["id"] != session_id:
        findings.append(
            finding(
                "metadata",
                root / "data/session-catalog.json",
                f"Catalog id '{entry['id']}' must match directory id '{session_id}'.",
            )
        )
    if entry["difficulty"] not in VALID_DIFFICULTIES:
        findings.append(
            finding(
                "metadata",
                root / "data/session-catalog.json",
                "Catalog difficulty must be Beginner, Intermediate, or Advanced.",
            )
        )
    if not isinstance(entry["duration_minutes"], int) or entry["duration_minutes"] <= 0:
        findings.append(
            finding(
                "metadata",
                root / "data/session-catalog.json",
                "Catalog duration_minutes must be a positive integer.",
            )
        )
    return findings


def validate_navigation(root: Path, session_path: Path) -> list[dict[str, str]]:
    findings: list[dict[str, str]] = []
    match = re.fullmatch(r"session-(\d{2})-[a-z0-9-]+", session_path.name)
    if not match:
        return [
            finding(
                "navigation",
                session_path,
                "Cannot validate curriculum registration until the directory uses session-NN-topic.",
            )
        ]

    session_id = match.group(1)
    required_navigation = {
        root / "mkdocs.yml": (
            f"sessions/{session_path.name}/README.md",
            f"sessions/{session_path.name}/lab/README.md",
            f"sessions/{session_path.name}/trainer-content/README.md",
        ),
        root / "README.md": (f"sessions/{session_path.name}/",),
        root / "curriculum-plan.md": (f"Session {session_id}",),
        root / "tracks/full-mastery.md": (f"| {int(session_id)}",),
    }

    for path, required_texts in required_navigation.items():
        content = read_text(path)
        for required_text in required_texts:
            if required_text not in content:
                findings.append(
                    finding(
                        "navigation",
                        path,
                        f"Missing navigation reference '{required_text}'.",
                    )
                )
    return findings


def validate_lab_readiness(session_path: Path) -> list[dict[str, str]]:
    lab = session_path / "lab/README.md"
    if not lab.is_file():
        return []

    findings: list[dict[str, str]] = []
    content = read_text(lab)
    required_patterns = {
        "setup or preflight guidance": r"^## (Setup|Preflight|Before you start)\b",
        "fallback guidance": r"\b(fallback|no-access|unavailable|manual route)\b",
        "learner deliverable": r"^## (Final )?Deliverable(s)?\b",
    }
    for description, pattern in required_patterns.items():
        if not re.search(pattern, content, re.IGNORECASE | re.MULTILINE):
            findings.append(
                finding("lab readiness", lab, f"Missing {description}.")
            )
    return findings


def validate(session_path: Path) -> dict[str, Any]:
    session_path = session_path.resolve()
    if not session_path.is_dir():
        return {
            "session": str(session_path),
            "status": "needs-work",
            "findings": [
                finding("required materials", session_path, "Session directory does not exist.")
            ],
        }

    try:
        root = repository_root(session_path)
    except ValueError as error:
        return {
            "session": str(session_path),
            "status": "needs-work",
            "findings": [finding("metadata", session_path, str(error))],
        }

    findings = [
        *validate_materials(session_path),
        *validate_metadata(root, session_path),
        *validate_navigation(root, session_path),
        *validate_lab_readiness(session_path),
    ]
    return {
        "session": str(session_path.relative_to(root)),
        "status": "ready" if not findings else "needs-work",
        "findings": findings,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("session_path", type=Path)
    parser.add_argument("--json", action="store_true", dest="as_json")
    args = parser.parse_args()

    result = validate(args.session_path)
    if args.as_json:
        print(json.dumps(result, indent=2))
    elif result["status"] == "ready":
        print(f"Ready: {result['session']}")
    else:
        print(f"Needs work: {result['session']}")
        for item in result["findings"]:
            print(f"- [{item['category']}] {item['path']}: {item['message']}")
    return 0 if result["status"] == "ready" else 1


if __name__ == "__main__":
    raise SystemExit(main())
