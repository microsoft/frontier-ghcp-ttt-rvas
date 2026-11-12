# Session M2-06 trainer guide: Repair and refactor a broken Python application

## Delivery objective

Teach learners to repair a deliberately broken inventory-reconciliation
application, then improve its design without changing its output. Keep each repair
small enough to explain and check.

Each learner finishes with a working command-line application, added regression
tests, and a repair log for the six core repairs. File comparisons show that the refactor kept the
supplied text and JSON outputs.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00-0:08 | Start repairs from the failure output |
| 0:08-0:18 | Python concepts, then failures in execution order |
| 0:18-0:30 | Demonstrate syntax and import recovery |
| 0:30-0:42 | Use fixtures to recover behavior |
| 0:42-0:52 | Add regression tests before refactoring |
| 0:52-1:00 | Refactor boundaries and hand off to the lab |

## Trainer preparation

1. Open the repository in its Dev Container or a Codespace, with Python 3.11 or later.
2. Check that GitHub Copilot Chat and inline suggestions work.
3. Create a private working copy of `lab/starter/` and install `requirements-dev.txt` in it.
4. Run the starter command and keep the first failure.
5. Run the solution tests, then keep `lab/solution/` closed until the lab review.
6. Read the supplied `.github/lsp.json`, prepare `pyright-langserver`, and check
   CLI `/plan` and `/lsp test python` in the copied repository.

From the session directory:

```bash
cd lab/starter
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements-dev.txt
python -m inventory_reconciliation \
  --warehouse fixtures/input/warehouse.csv \
  --ledger fixtures/input/ledger.csv \
  --output-dir build
```

The first failure is `SYN-01` in `inventory_reconciliation/cli.py`. Don't fix
later faults in the demo.

## Teaching model

### The repair ladder

Start at the first layer that stops you from checking the next:

| Layer | Question | Check |
| --- | --- | --- |
| Parse | Can Python read every imported file? | `python -m compileall inventory_reconciliation` |
| Import | Can the package and entry point load? | `python -c "import inventory_reconciliation.cli"` |
| Start | Can the command show help? | `python -m inventory_reconciliation --help` |
| Behavior | Does the output match the contract? | `pytest -q` and fixture comparison |
| Structure | Can the code change safely? | regression tests stay green |

Skipping a layer hides the current failure. A syntax error blocks test collection,
so tests can't check business logic.

### Repair loop

1. Capture the exact command and failure.
2. State one hypothesis.
3. Ask Copilot for the smallest relevant explanation or change.
4. Inspect the proposed edit.
5. Run the narrowest useful check.
6. Record the result in the repair log.

Learners make the diagnosis. Command output tests each hypothesis. Use the full
loop on the six core repairs. `SYN-02`, `IMP-02`, and `LOG-02` repeat earlier
patterns, so learners fix them directly. All nine must be repaired.

### Prerequisites to cover in the first segment

One minute each, with the slide "Python concepts you need":

- **Imports:** `ModuleNotFoundError` means the file is missing. `ImportError`
  means the name is missing.
- **Entry point:** `python -m pkg` runs `pkg/__main__.py`. Python parses
  `cli.py` and its imports first, so one syntax error stops startup.
- **pytest:** collects `test_*` functions. A parse or import failure stops
  collection, so no test runs.
- **CSV and module-level state:** `csv` gives strings, and a top-level list
  survives across calls.
- **Pyright LSP:** `.github/lsp.json` makes the CLI start `pyright-langserver`
  for `.py` files. `/lsp show` lists servers. `/lsp test python` only proves
  the server starts. Only a definition or references request looks up code.

## Controlled starter sequence

The starter uses named faults so learners can compare progress without sharing
source-level answers.

| Order | Fault | Tier | Surface | Intended signal |
| ---: | --- | --- | --- | --- |
| 1 | `SYN-01` | Core | `cli.py` | Parser stops at the first malformed function definition |
| 2 | `SYN-02` | Quick | `service.py` | The next imported module cannot parse |
| 3 | `IMP-01` | Core | `cli.py` | Startup imports a module that does not exist |
| 4 | `IMP-02` | Quick | `reporting.py` | Startup imports a symbol that does not exist |
| 5 | `LOG-01` | Core | parsing | Duplicate SKU rows overwrite earlier quantities |
| 6 | `LOG-02` | Quick | reconciliation | SKUs present only in the ledger disappear |
| 7 | `LOG-03` | Core | rules | Severity thresholds do not match the contract |
| 8 | `STATE-01` | Core | service | Repeated runs leak results through global state |
| 9 | `DESIGN-01` | Core | service/reporting | Rules are duplicated and control flow is tangled |

The first four faults appear in order when learners use the lab's checks. The
supplied fixtures expose the behavior defects.

## Prepared demonstration

### 1. Capture the first failure

Run the starter command above. Read the traceback from the bottom: file, line,
exception type, source line. Ignore every later concern until Python can parse that file.

### 2. Ask Copilot about one failure

```text
Explain this SyntaxError using only the shown file and traceback. Identify the
smallest syntax repair. Do not refactor or change behavior.
```

A good repair prompt includes the traceback and names what may change.

### 3. Check the repair

```bash
python -m compileall inventory_reconciliation
```

The command should expose `SYN-02`.

### 4. Log it, then stop

Show one entry in `repair-log.md`:

| Field | Example |
| --- | --- |
| Failure | `SYN-01` |
| Failure output | `SyntaxError` in `cli.py` |
| Hypothesis | Function header is incomplete |
| Change | Small syntax-only edit |
| Check | Re-run compile command |
| Result | Parser advances to `SYN-02` |

Don't demonstrate the behavior fixes.

## Behavioral contract

The fixture pair represents two views of stock:

- `warehouse.csv` contains physical counts;
- `ledger.csv` contains expected counts.

The rules:

1. Trim surrounding whitespace and uppercase each SKU.
2. Sum duplicate rows after normalization.
3. Reject negative quantities with a row-specific error.
4. Reconcile the union of SKUs from both files.
5. Calculate `variance = warehouse - ledger`.
6. Use `MATCH` for zero, `SHORT` below zero, and `OVER` above zero.
7. Use severity `none` for zero, `review` for absolute variance 1-5, and `urgent`
   for absolute variance 6 or more.
8. Sort report rows by SKU.
9. Keep repeated runs isolated.

The expected text and JSON files define the result. Learners must not change them
to make broken code pass.

## Regression tests before refactoring

The starter tests cover the fixture-level contract and repeated-run isolation.
Learners add at least two focused tests:

- the boundary between `review` and `urgent`;
- rejection of a negative quantity with file and row context.

Each test names one rule and fails for one reason.

## Refactoring targets

Keep these five jobs in separate files:

| Boundary | Responsibility |
| --- | --- |
| `parsing.py` | Read, validate, normalize, and aggregate CSV data |
| `rules.py` | Classify variance status and severity |
| `service.py` | Reconcile two quantity maps |
| `reporting.py` | Render stable text and JSON output |
| `cli.py` | Parse arguments, call the service, write files |

The starter mixes these on purpose. Learners remove the module-level result list,
call one rule implementation, and turn nested branches into named functions. No
large rewrite: add tests first, then make one structural change at a time.

Spend five minutes of the 25-minute refactor block on a real Python LSP lookup.
Ask for the definition and references of `severity_for`, and check the returned
locations in the operation output or `/lsp logs`. Then inspect `service.py` for
inline copies of the same rule. Those copies may not show up as symbol references.
Record both before approving `/plan`. Don't use LSP diagnostics to skip the
syntax and import repairs.

## Useful Copilot prompts

Repair:

```text
Use the traceback and this file only. Suggest the smallest change that resolves
the current failure. Preserve behavior and do not refactor.
```

Test:

```text
Write one pytest test for the severity boundary at absolute variance 6. Follow
the existing test style. Do not change production code.
```

Refactor:

```text
/plan The tests are green. Plan removal of global state and duplicated
classification logic using the checked references and inline duplicates.
Preserve public signatures and output order. Name protecting tests. Do not edit.
```

Review:

```text
Review the diff for behavior changes. Compare it with the supplied fixtures,
expected outputs, and tests. Call out any unproved assumption.
```

## Facilitation notes

- Keep learners on the current failure. Later defects are distractions.
- Reject changes to expected outputs unless the class first proves the contract is wrong.
- Ask learners to explain each Copilot suggestion before they accept it.
- Pair learners when one is stuck for more than eight minutes.

## Common wrong turns

| Wrong turn | Coaching response |
| --- | --- |
| Rewrite the application from scratch | Return to the first failing command and keep the supplied interface |
| Ask Copilot to "fix everything" | Narrow the prompt to one file |
| Change fixtures to match broken output | Fixtures are the contract |
| Refactor while imports still fail | Restore startup first |
| Remove the repeated-run test | Global state often passes once and fails in a process |
| Mock all file reads | Keep at least one fixture-level test through the real parser |

## Lab handoff

Learners finish with a repair log for the core repairs, a working command-line application, at
least two added regression tests, unchanged expected-output fixtures, a design with
no process-wide result state, and passing pytest output with generated reports. The
same inputs must produce the supplied outputs before and after the refactor.
