"""Print a read-only readiness report from a synthetic JSON snapshot."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from readiness_guard import evaluate_readiness


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: python readiness_report.py SNAPSHOT.json", file=sys.stderr)
        return 2

    snapshot_path = Path(sys.argv[1])
    snapshot = json.loads(snapshot_path.read_text(encoding="utf-8"))
    result = evaluate_readiness(snapshot)

    print(f"Verdict: {result['verdict']}")
    for reason in result["reasons"]:
        print(f"- {reason}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

