# Inventory Reconciliation Reference Solution

The reference solution separates parsing, rules, reconciliation, reporting, and
the command-line entry point. It has no process-wide result state.

## Run

```bash
python -m pip install -r requirements-dev.txt
python -m inventory_reconciliation \
  --warehouse fixtures/input/warehouse.csv \
  --ledger fixtures/input/ledger.csv \
  --output-dir build
pytest -q
```

The generated files should match `fixtures/expected/`.
