from pathlib import Path

from inventory_reconciliation.cli import main


FIXTURES = Path(__file__).parents[1] / "fixtures"


def test_cli_writes_expected_outputs(tmp_path: Path):
    result = main(
        [
            "--warehouse",
            str(FIXTURES / "input" / "warehouse.csv"),
            "--ledger",
            str(FIXTURES / "input" / "ledger.csv"),
            "--output-dir",
            str(tmp_path),
        ]
    )

    assert result == 0
    assert (tmp_path / "report.txt").read_text(encoding="utf-8") == (
        FIXTURES / "expected" / "report.txt"
    ).read_text(encoding="utf-8")
    assert (tmp_path / "reconciliation.json").read_text(encoding="utf-8") == (
        FIXTURES / "expected" / "reconciliation.json"
    ).read_text(encoding="utf-8")
