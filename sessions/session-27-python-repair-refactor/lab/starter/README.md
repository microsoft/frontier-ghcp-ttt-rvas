# Broken Inventory Reconciliation Starter

This application is deliberately broken. Fix the named failures in the order
listed in the lab guide.

Do not edit `fixtures/expected/`. Those files define the intended behavior.

## Commands

```bash
python -m pip install -r requirements-dev.txt
python -m inventory_reconciliation \
  --warehouse fixtures/input/warehouse.csv \
  --ledger fixtures/input/ledger.csv \
  --output-dir build
pytest -q
```

The first command-line run should stop at `SYN-01`.
