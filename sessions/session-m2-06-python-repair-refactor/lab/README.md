# Session M2-06 lab: Repair and refactor a broken Python application

**Duration:** 2 hours

## Objective

Repair a synthetic inventory-reconciliation application one failure at a time.
Recover its intended behavior from fixtures, add regression tests, then refactor
without changing the reports.

## Deliverables

- a completed `repair-log.md`;
- a command that writes the expected text and JSON reports;
- at least two new focused regression tests;
- unchanged files under `fixtures/expected/`;
- production code with no process-wide result state or duplicated rules;
- passing `pytest -q` output;
- a Python LSP lookup and an accepted refactor plan.

## You need

- GitHub Copilot and the standalone Copilot CLI;
- Python 3.11 or later;
- a working Python language server (`pyright-langserver`).

Use the repository Dev Container or GitHub Codespaces. Copy the starter to a
scratch directory so the original stays available:

```bash
cp -R sessions/session-m2-06-python-repair-refactor/lab/starter \
  /tmp/session-m2-06-inventory
cd /tmp/session-m2-06-inventory
git init
```

Use a fresh destination if that folder exists. Read `.github/lsp.json` before
opening the copy in the CLI. Set up `pyright-langserver` with the
[LSP setup guide](../../session-m3-04-custom-agents/lab/lsp-setup.md#python-session-m2-06).
Session M3-04 isn't a prerequisite. Check `/plan`, `/lsp show`, and `/lsp test python`.

Create the environment:

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements-dev.txt
```

On Windows PowerShell, activate with:

```powershell
.\.venv\Scripts\Activate.ps1
```

Outside the Dev Container, copy `lab/starter/` to a writable folder and run the
same commands. Keep the fixture files unchanged.

## Scenario

The application compares physical warehouse counts with ledger quantities. The
starter is broken on purpose. The named faults appear in this order:

```text
SYN-01 → SYN-02 → IMP-01 → IMP-02
       → LOG-01/02/03 → STATE-01 → DESIGN-01
```

Fix the current failure before investigating the next one.

## Behavioral contract

- CSV files have `sku` and `quantity` headers.
- SKU values are trimmed and converted to uppercase.
- Duplicate rows are summed after normalization.
- Quantities are whole numbers and can't be negative.
- A SKU may appear in only one input. The missing quantity is zero.
- Variance equals warehouse quantity minus ledger quantity.
- Zero is `MATCH`; negative is `SHORT`; positive is `OVER`.
- Absolute variance 1-5 is `review`; 6 or more is `urgent`.
- Rows are sorted by SKU.
- Repeated calls in one Python process return independent results.

The files under `fixtures/expected/` are authoritative.

## Part 1: Capture the baseline (10 minutes)

```bash
cp repair-log.md repair-log-working.md
python -m inventory_reconciliation \
  --warehouse fixtures/input/warehouse.csv \
  --ledger fixtures/input/ledger.csv \
  --output-dir build
```

**Expected starter failure:** Python stops at `SYN-01` in
`inventory_reconciliation/cli.py`.

Record the command, exception type, file and line, one hypothesis, and the next
narrow check. Don't ask Copilot to repair the whole project.

## Part 2: Restore parsing and imports (30 minutes)

### 2.1 Repair `SYN-01`

```text
Explain the current SyntaxError from this traceback and file. Suggest the
smallest syntax-only repair. Do not refactor or change behavior.
```

Inspect the suggestion, make the smallest edit, and run:

```bash
python -m compileall inventory_reconciliation
```

Record the result. The next fault is `SYN-02`.

### 2.2 Repair `SYN-02`

Repeat. When the package compiles, check imports:

```bash
python -c "import inventory_reconciliation.cli"
```

The next fault is `IMP-01`.

### 2.3 Repair `IMP-01` and `IMP-02`

For each import failure:

1. Read the missing module or symbol from the traceback.
2. Search the package for the intended implementation.
3. Decide whether the import path or exported name is wrong.
4. Make one import-only change and re-run the import command.
5. Add a repair-log entry.

Then run:

```bash
python -m inventory_reconciliation --help
```

**Checkpoint:** The package parses, imports, and displays command help.

## Part 3: Recover intended behavior (30 minutes)

```bash
pytest -q
```

The tests should now collect. Use their failures to find the behavior defects, and
compare the inputs with `fixtures/expected/report.txt` and
`fixtures/expected/reconciliation.json`.

Repair one rule at a time:

1. **`LOG-01`:** duplicate normalized SKUs must sum.
2. **`LOG-02`:** reconcile the union of warehouse and ledger SKUs.
3. **`LOG-03`:** apply the stated severity boundary.
4. **`STATE-01`:** repeated calls must not retain prior results.

After each change, run the narrowest failing test, then the full suite.

```text
The failing test and expected fixture define the behavior. Find the smallest
production-code change for this one failure. Do not refactor unrelated code or
edit expected outputs.
```

**Checkpoint:** Existing tests pass and generated output matches both expected files.

## Part 4: Add regression tests (20 minutes)

Add at least two tests before refactoring:

1. absolute variance `5` is `review` and `6` is `urgent`;
2. a negative quantity raises `ValueError` with the file and row number.

Keep each test focused. Use temporary files for invalid CSV input. Run
`pytest -q`, then commit or save this green state before changing structure.

## Part 5: Refactor without behavior changes (25 minutes)

Remove `DESIGN-01`. Give each file one job:

| File | Owns |
| --- | --- |
| `parsing.py` | CSV validation, normalization, aggregation |
| `rules.py` | status and severity classification |
| `service.py` | reconciliation across both inputs |
| `reporting.py` | stable text and JSON rendering |
| `cli.py` | arguments, orchestration, output files |

Required changes:

- remove module-level mutable result state;
- keep one implementation of status and severity rules;
- replace nested reconciliation branches with named functions;
- keep the command arguments and output format;
- keep deterministic SKU order.

### Inspect references before planning (5 minutes of this block)

With tests green, ask the CLI:

```text
Use Python language-server operations to locate severity_for and its references.
Report paths and lines. Then inspect service.py for inline classification that
would not appear as a reference to that function. Do not edit files.
```

Inspect the actual operation or `/lsp logs` and check its locations against the
source. A successful server-start test or a plain text search isn't a lookup.
Record the result in the repair log.

Inline classification can duplicate a rule without calling its function, so
track duplicates separately from references. Don't ask for a bulk rename while
syntax or behavior checks still fail.

Use Plan mode for the rest of the refactor:

```text
/plan The tests are green. Plan a small refactor that removes global result state and
duplicated classification rules. Preserve the CLI, output files, output order,
and public behavior. Use the checked reference locations and identify inline
duplicates separately. Name the tests that protect each step. Do not implement.
```

Approve the plan, leave Plan mode, and run `pytest -q` after each structural move.

## Part 6: Final check (5 minutes)

```bash
rm -rf build
python -m inventory_reconciliation \
  --warehouse fixtures/input/warehouse.csv \
  --ledger fixtures/input/ledger.csv \
  --output-dir build
diff -u fixtures/expected/report.txt build/report.txt
diff -u fixtures/expected/reconciliation.json build/reconciliation.json
pytest -q
```

On Windows, compare the files in the editor if `diff` is unavailable.

## Final deliverable

- `repair-log-working.md` with one entry per named failure;
- repaired and refactored source files;
- the added regression tests;
- `build/report.txt` and `build/reconciliation.json`;
- terminal output showing all tests pass.

## Checklist

- [ ] `SYN-01`, `SYN-02`, `IMP-01`, and `IMP-02` are each recorded and repaired separately.
- [ ] Duplicate rows aggregate after SKU normalization.
- [ ] Ledger-only and warehouse-only SKUs appear.
- [ ] Severity changes from `review` to `urgent` at absolute variance 6.
- [ ] Negative quantities include file and row context.
- [ ] Repeated service calls don't leak results.
- [ ] Status and severity rules have one implementation.
- [ ] Expected fixture files are unchanged.
- [ ] You inspected the LSP lookup and checked inline duplicates separately.
- [ ] An accepted `/plan` preceded the structural changes.
- [ ] `pytest -q` passes and the text and JSON output match.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| A later fault appears before the named one | Restore the starter copy and repeat only the documented small edits |
| `pytest` cannot be imported | Activate `.venv` and reinstall `requirements-dev.txt` |
| Package import fails from another directory | Run commands from the copied starter root |
| JSON diff shows only formatting changes | Use the provided JSON writer settings and final newline |
| A test passes alone but fails in the suite | Look for module-level mutable state |
| Copilot proposes a rewrite | Reject it and ask for one-file, one-failure scope |
| Native setup uses the wrong Python | Recreate `.venv` with a Python 3.11+ executable |

## Solution reference

The tested reference implementation is in [`solution/`](solution/). Review it
after the lab.

## Command reference

[Adding LSP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/add-lsp-servers)
