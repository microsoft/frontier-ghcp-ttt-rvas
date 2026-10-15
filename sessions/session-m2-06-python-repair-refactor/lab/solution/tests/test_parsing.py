from pathlib import Path

import pytest

from inventory_reconciliation.parsing import normalize_sku, read_quantities


def test_normalize_sku_strips_and_uppercases():
    assert normalize_sku(" ax-100 ") == "AX-100"


def test_read_quantities_aggregates_duplicate_skus(tmp_path: Path):
    source = tmp_path / "stock.csv"
    source.write_text(
        "sku,quantity\n AX-100 ,7\nax-100,3\n",
        encoding="utf-8",
    )
    assert read_quantities(source) == {"AX-100": 10}


def test_negative_quantity_reports_file_and_row(tmp_path: Path):
    source = tmp_path / "stock.csv"
    source.write_text("sku,quantity\nAX-100,-1\n", encoding="utf-8")

    with pytest.raises(ValueError, match=r"stock\.csv:2: quantity cannot be negative"):
        read_quantities(source)
