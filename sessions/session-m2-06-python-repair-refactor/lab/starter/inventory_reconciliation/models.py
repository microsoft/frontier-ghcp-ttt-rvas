from dataclasses import dataclass


@dataclass(frozen=True)
class ReconciliationItem:
    sku: str
    warehouse_quantity: int
    ledger_quantity: int
    variance: int
    status: str
    severity: str
