from pathlib import Path

from .models import ReconciliationItem
from .parsing import read_quantities


# STATE-01: results survive across calls in the same Python process.
RUN_HISTORY: list[ReconciliationItem] = []


def reconcile(warehouse_path: Path, ledger_path: Path) -> list[ReconciliationItem]:
    warehouse = read_quantities(warehouse_path)
    ledger = read_quantities(ledger_path)

    # SYN-02: this call is missing its closing parenthesis.
    all_skus = sorted(set(warehouse)

    for sku in all_skus:
        warehouse_quantity = warehouse.get(sku, 0)
        ledger_quantity = ledger.get(sku, 0)
        variance = warehouse_quantity - ledger_quantity

        # DESIGN-01: classification rules are copied into this tangled loop.
        if variance == 0:
            status = "MATCH"
            severity = "none"
        elif variance < 0:
            status = "SHORT"
            if abs(variance) > 10:
                severity = "urgent"
            else:
                severity = "review"
        else:
            status = "OVER"
            if abs(variance) > 10:
                severity = "urgent"
            else:
                severity = "review"

        RUN_HISTORY.append(
            ReconciliationItem(
                sku=sku,
                warehouse_quantity=warehouse_quantity,
                ledger_quantity=ledger_quantity,
                variance=variance,
                status=status,
                severity=severity,
            )
        )

    # LOG-02: all_skus contains warehouse keys only, so ledger-only SKUs vanish.
    return RUN_HISTORY
