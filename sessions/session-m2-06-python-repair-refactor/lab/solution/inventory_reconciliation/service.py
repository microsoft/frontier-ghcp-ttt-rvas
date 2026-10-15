from pathlib import Path

from .models import ReconciliationItem
from .parsing import read_quantities
from .rules import severity_for, status_for


def reconcile_quantities(
    warehouse: dict[str, int],
    ledger: dict[str, int],
) -> list[ReconciliationItem]:
    items: list[ReconciliationItem] = []
    for sku in sorted(set(warehouse) | set(ledger)):
        warehouse_quantity = warehouse.get(sku, 0)
        ledger_quantity = ledger.get(sku, 0)
        variance = warehouse_quantity - ledger_quantity
        items.append(
            ReconciliationItem(
                sku=sku,
                warehouse_quantity=warehouse_quantity,
                ledger_quantity=ledger_quantity,
                variance=variance,
                status=status_for(variance),
                severity=severity_for(variance),
            )
        )
    return items


def reconcile(warehouse_path: Path, ledger_path: Path) -> list[ReconciliationItem]:
    return reconcile_quantities(
        read_quantities(warehouse_path),
        read_quantities(ledger_path),
    )
