import csv
from pathlib import Path


def normalize_sku(value: str) -> str:
    return value.strip().upper()


def read_quantities(path: Path) -> dict[str, int]:
    quantities: dict[str, int] = {}
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != ["sku", "quantity"]:
            raise ValueError(f"{path}: expected sku,quantity headers")

        for row_number, row in enumerate(reader, start=2):
            sku = normalize_sku(row["sku"])
            quantity = int(row["quantity"])
            if quantity < 0:
                raise ValueError(f"{path}:{row_number}: quantity cannot be negative")

            # LOG-01: assignment overwrites an earlier normalized SKU.
            quantities[sku] = quantity

    return quantities
