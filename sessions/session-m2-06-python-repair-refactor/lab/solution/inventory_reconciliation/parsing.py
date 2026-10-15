import csv
from collections import defaultdict
from pathlib import Path


def normalize_sku(value: str) -> str:
    sku = value.strip().upper()
    if not sku:
        raise ValueError("SKU cannot be empty")
    return sku


def parse_quantity(value: str, path: Path, row_number: int) -> int:
    try:
        quantity = int(value)
    except ValueError as error:
        raise ValueError(
            f"{path}:{row_number}: quantity must be a whole number"
        ) from error

    if quantity < 0:
        raise ValueError(f"{path}:{row_number}: quantity cannot be negative")
    return quantity


def read_quantities(path: Path) -> dict[str, int]:
    quantities: defaultdict[str, int] = defaultdict(int)
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != ["sku", "quantity"]:
            raise ValueError(f"{path}: expected sku,quantity headers")

        for row_number, row in enumerate(reader, start=2):
            sku = normalize_sku(row["sku"])
            quantity = parse_quantity(row["quantity"], path, row_number)
            quantities[sku] += quantity

    return dict(quantities)
