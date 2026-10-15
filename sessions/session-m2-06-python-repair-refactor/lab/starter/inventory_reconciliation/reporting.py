import json
from dataclasses import asdict
from pathlib import Path

from .models import ReconciliationItem
# IMP-02: rules.py exports severity_for, not label_severity.
from .rules import label_severity


def render_text(items: list[ReconciliationItem]) -> str:
    lines = [
        "SKU | Warehouse | Ledger | Variance | Status | Severity",
        "--- | ---: | ---: | ---: | --- | ---",
    ]
    counts = {"MATCH": 0, "SHORT": 0, "OVER": 0}
    urgent = 0

    for item in items:
        # DESIGN-01: reporting recalculates a business rule it should only display.
        severity = label_severity(item.variance)
        counts[item.status] += 1
        if severity == "urgent":
            urgent += 1
        lines.append(
            f"{item.sku} | {item.warehouse_quantity} | {item.ledger_quantity} | "
            f"{item.variance} | {item.status} | {severity}"
        )

    lines.extend(
        [
            "",
            (
                f"Summary: {len(items)} SKUs; {counts['MATCH']} match; "
                f"{counts['SHORT']} short; {counts['OVER']} over; {urgent} urgent."
            ),
        ]
    )
    return "\n".join(lines) + "\n"


def write_outputs(items: list[ReconciliationItem], output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "report.txt").write_text(render_text(items), encoding="utf-8")
    payload = {
        "summary": {
            "total": len(items),
            "match": sum(item.status == "MATCH" for item in items),
            "short": sum(item.status == "SHORT" for item in items),
            "over": sum(item.status == "OVER" for item in items),
            "urgent": sum(item.severity == "urgent" for item in items),
        },
        "items": [asdict(item) for item in items],
    }
    (output_dir / "reconciliation.json").write_text(
        json.dumps(payload, indent=2) + "\n",
        encoding="utf-8",
    )
