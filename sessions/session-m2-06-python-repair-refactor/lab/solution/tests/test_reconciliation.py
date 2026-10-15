import json
from pathlib import Path

from inventory_reconciliation.reporting import build_payload, render_text
from inventory_reconciliation.service import reconcile


FIXTURES = Path(__file__).parents[1] / "fixtures"
WAREHOUSE = FIXTURES / "input" / "warehouse.csv"
LEDGER = FIXTURES / "input" / "ledger.csv"


def test_reconciliation_matches_expected_json():
    expected = json.loads(
        (FIXTURES / "expected" / "reconciliation.json").read_text(encoding="utf-8")
    )
    assert build_payload(reconcile(WAREHOUSE, LEDGER)) == expected


def test_text_report_matches_expected_output():
    expected = (FIXTURES / "expected" / "report.txt").read_text(encoding="utf-8")
    assert render_text(reconcile(WAREHOUSE, LEDGER)) == expected


def test_repeated_runs_are_isolated():
    first = reconcile(WAREHOUSE, LEDGER)
    second = reconcile(WAREHOUSE, LEDGER)
    assert second == first
    assert first is not second
    assert len(second) == 6
