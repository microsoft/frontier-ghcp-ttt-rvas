from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class ReconciliationItem:
    sku: str
    warehouse_quantity: int
    ledger_quantity: int
    variance: int
    status: str
    severity: str

    def to_dict(self) -> dict[str, str | int]:
        return asdict(self)
