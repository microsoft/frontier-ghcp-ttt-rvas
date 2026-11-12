# Session M2-06 lab: Repair and refactor a broken Python application

**Duration:** 2 hours

## Objective

Repair a synthetic inventory-reconciliation application. Recover its intended behavior from fixtures, add regression tests, then refactor
without changing the reports.

## Deliverables

- a `repair-log.md` with an entry for each core repair;
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
Session M3-04 isn't a prerequisite. Then check `/plan`, `/lsp show`, and
`/lsp test python` (see [Python concepts and the LSP config](#python-concepts-and-the-lsp-config)).

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

## Python concepts and the LSP config

| Term | What you need to know |
| --- | --- |
| Import | `from .rules import severity_for` loads one name from `rules.py` in the same package. A missing file raises `ModuleNotFoundError`. A missing name raises `ImportError`. |
| Package entry point | `python -m inventory_reconciliation` runs `inventory_reconciliation/__main__.py`, which calls `main()` in `cli.py`. Python reads `cli.py` and everything it imports before running anything. |
| pytest | Finds `tests/test_*.py` and runs each `test_*` function. A plain `assert` is the check. If a file fails to parse or import, pytest stops during collection, before any test runs. |
| CSV | Plain text with a header row. Python's `csv` module returns every value as a string, so `quantity` needs an `int()` conversion and a validity check. |
| Module-level state | A variable defined at the top of a module lives as long as the process. A function that appends to it leaks results from one call into the next. |

**The LSP config.** A language server (LSP) answers code questions such as
"where is this function defined, and who calls it?" from the parsed code, not
from text search. `.github/lsp.json` tells the Copilot CLI to start
`pyright-langserver --stdio`, Pyright's server, for `.py` files under the name
`python`. The CLI starts the process, so read the file before you open the copy.

- `/lsp show` lists the configured servers.
- `/lsp test python` starts a temporary server and checks that it responds.
  This proves startup only. It doesn't look up any code.
- A real lookup is a request for definition or references. You run one in Part 5.

## Scenario

The application compares physical warehouse counts with ledger quantities. The
starter is broken on purpose. The named faults appear in this order:

```text
SYN-01 → SYN-02 → IMP-01 → IMP-02
       → LOG-01/02/03 → STATE-01 → DESIGN-01
```

Each fault blocks the next, so fix them in order. You must repair all nine for
the tests and reports to pass. **Core** repairs use the full loop: a Copilot
prompt, one check, and one repair-log entry. **Quick** repairs repeat a pattern
you just did. Fix them directly and log them only if time allows.

| Core | Quick |
| --- | --- |
| `SYN-01`, `IMP-01`, `LOG-01`, `LOG-03`, `STATE-01`, `DESIGN-01` | `SYN-02` (same as `SYN-01`), `IMP-02` (same as `IMP-01`), `LOG-02` |

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
narrow check in `repair-log-working.md`. Keep each Copilot request to one failure
in one file. Don't ask it to repair the whole project.

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

### 2.2 Repair `SYN-02` (quick)

Repeat the same steps without a log entry. When the package compiles, check imports:

```bash
python -c "import inventory_reconciliation.cli"
```

The next fault is `IMP-01`.

### 2.3 Repair `IMP-01` (core) and `IMP-02` (quick)

For each import failure:

1. Read the missing module or symbol from the traceback.
2. Search the package for the intended implementation.
3. Decide whether the import path or exported name is wrong.
4. Make one import-only change and re-run the import command.

Log `IMP-01`. Log `IMP-02` only if time allows.

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

Repair these in order:

1. **`LOG-01` (core):** duplicate normalized SKUs must sum.
2. **`LOG-02` (quick):** reconcile the union of warehouse and ledger SKUs.
3. **`LOG-03` (core):** apply the stated severity boundary.
4. **`STATE-01` (core):** repeated calls must not retain prior results.

After each change, run the narrowest failing test, then the full suite.

```text
The failing test and expected fixture define the behavior. Find the smallest
production-code change for this failure. Do not refactor unrelated code or
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
source. `/lsp test python` and a plain text search aren't lookups. Record the
result in the repair log.

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

- `repair-log-working.md` with entries for the six core repairs;
- repaired and refactored source files;
- the added regression tests;
- `build/report.txt` and `build/reconciliation.json`;
- terminal output showing all tests pass.

## Checklist

- [ ] All nine faults are repaired. The six core ones are in the repair log.
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
| Copilot proposes a rewrite | Reject it and narrow the request to one file |
| Native setup uses the wrong Python | Recreate `.venv` with a Python 3.11+ executable |

## Solution reference

The tested reference implementation is in [`solution/`](solution/). Review it
after the lab.

## Command reference

[Adding LSP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/add-lsp-servers)
