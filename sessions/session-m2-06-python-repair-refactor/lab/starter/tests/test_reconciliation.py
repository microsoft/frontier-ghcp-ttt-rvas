import json
from pathlib import Path

from inventory_reconciliation.reporting import render_text
from inventory_reconciliation.service import reconcile


FIXTURES = Path(__file__).parents[1] / "fixtures"
WAREHOUSE = FIXTURES / "input" / "warehouse.csv"
LEDGER = FIXTURES / "input" / "ledger.csv"


def test_reconciliation_matches_expected_json():
    items = reconcile(WAREHOUSE, LEDGER)
    actual = {
        "summary": {
            "total": len(items),
            "match": sum(item.status == "MATCH" for item in items),
            "short": sum(item.status == "SHORT" for item in items),
            "over": sum(item.status == "OVER" for item in items),
            "urgent": sum(item.severity == "urgent" for item in items),
        },
        "items": [item.__dict__ for item in items],
    }
    expected = json.loads(
        (FIXTURES / "expected" / "reconciliation.json").read_text(encoding="utf-8")
    )
    assert actual == expected


def test_text_report_matches_expected_output():
    items = reconcile(WAREHOUSE, LEDGER)
    expected = (FIXTURES / "expected" / "report.txt").read_text(encoding="utf-8")
    assert render_text(items) == expected


def test_repeated_runs_are_isolated():
    first = reconcile(WAREHOUSE, LEDGER)
    second = reconcile(WAREHOUSE, LEDGER)
    assert second == first
    assert len(second) == 6
