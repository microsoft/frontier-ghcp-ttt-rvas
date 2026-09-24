import json
from pathlib import Path

from .models import ReconciliationItem


def summarize(items: list[ReconciliationItem]) -> dict[str, int]:
    return {
        "total": len(items),
        "match": sum(item.status == "MATCH" for item in items),
        "short": sum(item.status == "SHORT" for item in items),
        "over": sum(item.status == "OVER" for item in items),
        "urgent": sum(item.severity == "urgent" for item in items),
    }


def build_payload(items: list[ReconciliationItem]) -> dict[str, object]:
    return {
        "summary": summarize(items),
        "items": [item.to_dict() for item in items],
    }


def render_text(items: list[ReconciliationItem]) -> str:
    summary = summarize(items)

    lines = [
        "SKU | Warehouse | Ledger | Variance | Status | Severity",
        "--- | ---: | ---: | ---: | --- | ---",
    ]
    lines.extend(
        (
            f"{item.sku} | {item.warehouse_quantity} | {item.ledger_quantity} | "
            f"{item.variance} | {item.status} | {item.severity}"
        )
        for item in items
    )
    lines.extend(
        [
            "",
            (
                f"Summary: {summary['total']} SKUs; {summary['match']} match; "
                f"{summary['short']} short; {summary['over']} over; "
                f"{summary['urgent']} urgent."
            ),
        ]
    )
    return "\n".join(lines) + "\n"


def write_outputs(items: list[ReconciliationItem], output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "report.txt").write_text(render_text(items), encoding="utf-8")
    (output_dir / "reconciliation.json").write_text(
        json.dumps(build_payload(items), indent=2) + "\n",
        encoding="utf-8",
    )
