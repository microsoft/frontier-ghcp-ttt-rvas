# Session 27 Trainer Guide: Repair and Refactor a Broken Python Application

## Delivery objective

Teach learners to repair a deliberately broken inventory-reconciliation
application, then improve its design without changing its output. The goal is
disciplined repair, not a race to make the test command green.

Each learner finishes with a working command-line application, added regression
tests, a completed repair log, and evidence that the refactor preserved the
supplied text and JSON outputs.

> [!IMPORTANT]
> Confirm GitHub Copilot access before the session. If Copilot access is missing or
> unavailable in the approved environment, stop and do not continue.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00-0:08 | Frame repair work as evidence gathering |
| 0:08-0:18 | Read Python failures in execution order |
| 0:18-0:30 | Demonstrate syntax and import recovery |
| 0:30-0:42 | Use fixtures to recover behavior |
| 0:42-0:52 | Add regression tests before refactoring |
| 0:52-1:00 | Refactor boundaries and hand off to the lab |

## Trainer preparation

Before delivery:

1. Open the repository in its Dev Container or a Codespace.
2. Confirm Python 3.11 or later.
3. Confirm GitHub Copilot Chat and inline suggestions work.
4. Create a private working copy of `lab/starter/`.
5. Install `requirements-dev.txt` in that copy.
6. Run the starter command and preserve the first failure.
7. Run the solution tests.
8. Keep `lab/solution/` closed until the lab review.

Use these commands from the session directory:

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

The expected first failure is `SYN-01` in `inventory_reconciliation/cli.py`.
Do not fix later faults during this demonstration.

## Teaching model

### The repair ladder

Work from the lowest layer that blocks evidence:

| Layer | Question | Check |
| --- | --- | --- |
| Parse | Can Python read every imported file? | `python -m compileall inventory_reconciliation` |
| Import | Can the package and entry point load? | `python -c "import inventory_reconciliation.cli"` |
| Start | Can the command show help? | `python -m inventory_reconciliation --help` |
| Behavior | Does the output match the contract? | `pytest -q` and fixture comparison |
| Structure | Can the code change safely? | regression tests stay green |

Skipping a layer creates noisy evidence. A test suite cannot explain business
logic while test collection is blocked by a syntax error.

### One failure at a time

Teach this loop:

1. Capture the exact command and failure.
2. State one hypothesis.
3. Ask Copilot for the smallest relevant explanation or change.
4. Inspect the proposed edit.
5. Run the narrowest useful check.
6. Record the result in the repair log.

The learner owns the diagnosis. Copilot can suggest a path. Command output decides
whether the hypothesis was right.

## Controlled starter sequence

The starter uses named faults so every learner can compare progress without
sharing source-level answers.

| Order | Fault | Surface | Intended signal |
| ---: | --- | --- | --- |
| 1 | `SYN-01` | `cli.py` | Parser stops at the first malformed function definition |
| 2 | `SYN-02` | `service.py` | The next imported module cannot parse |
| 3 | `IMP-01` | `cli.py` | Startup imports a module that does not exist |
| 4 | `IMP-02` | `reporting.py` | Startup imports a symbol that does not exist |
| 5 | `LOG-01` | parsing | Duplicate SKU rows overwrite earlier quantities |
| 6 | `LOG-02` | reconciliation | SKUs present only in the ledger disappear |
| 7 | `LOG-03` | rules | Severity thresholds do not match the contract |
| 8 | `STATE-01` | service | Repeated runs leak results through global state |
| 9 | `DESIGN-01` | service/reporting | Rules are duplicated and control flow is tangled |

The first four faults should appear in order when learners use the checks in the
lab. The behavior defects are deterministic and exposed by the supplied fixtures.

## Prepared demonstration

### 1. Capture the first failure

Run:

```bash
python -m inventory_reconciliation \
  --warehouse fixtures/input/warehouse.csv \
  --ledger fixtures/input/ledger.csv \
  --output-dir build
```

Read the traceback from the bottom. Point out the file, line, exception type, and
source line. Ignore every later concern until Python can parse that file.

### 2. Ask a bounded Copilot question

Use a prompt such as:

```text
Explain this SyntaxError using only the shown file and traceback. Identify the
smallest syntax repair. Do not refactor or change behavior.
```

Show that a good repair prompt includes evidence and a boundary.

### 3. Verify the repair

Run:

```bash
python -m compileall inventory_reconciliation
```

The command should expose `SYN-02`. This is progress. The application has moved
one step further through startup.

### 4. Stop before solving the lab

Show how to add an entry to `repair-log.md`:

| Field | Example |
| --- | --- |
| Failure | `SYN-01` |
| Evidence | `SyntaxError` in `cli.py` |
| Hypothesis | Function header is incomplete |
| Change | Small syntax-only edit |
| Check | Re-run compile command |
| Result | Parser advances to `SYN-02` |

Do not demonstrate the behavior fixes.

## Behavioral contract

The fixture pair represents two views of stock:

- `warehouse.csv` contains physical counts;
- `ledger.csv` contains expected counts.

The intended rules are:

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

The expected text and JSON files are executable requirements. Learners should not
change them to make broken code pass.

## Regression tests before refactoring

The starter tests cover the fixture-level contract and repeated-run isolation.
Learners must add at least two focused tests:

- the boundary between `review` and `urgent`;
- rejection of a negative quantity with file and row context.

They may add more. Each test should name one rule and fail for one reason.

## Refactoring targets

The clean design has five boundaries:

| Boundary | Responsibility |
| --- | --- |
| `parsing.py` | Read, validate, normalize, and aggregate CSV data |
| `rules.py` | Classify variance status and severity |
| `service.py` | Reconcile two quantity maps |
| `reporting.py` | Render stable text and JSON output |
| `cli.py` | Parse arguments, call the service, write files |

The starter violates these boundaries on purpose. Learners should remove the
module-level result list, call one rule implementation, and turn nested branches
into named functions.

Do not ask for a large rewrite. First lock behavior with tests. Then make one
structural change at a time.

## Useful Copilot prompts

Repair prompt:

```text
Use the traceback and this file only. Suggest the smallest change that resolves
the current failure. Preserve behavior and do not refactor.
```

Test prompt:

```text
Write one pytest test for the severity boundary at absolute variance 6. Follow
the existing test style. Do not change production code.
```

Refactor prompt:

```text
The tests are green. Refactor this function to remove global state and duplicated
classification logic. Preserve public function signatures and output order.
Show the plan before editing.
```

Review prompt:

```text
Review the diff for behavior changes. Compare it with the supplied fixtures,
expected outputs, and tests. Call out any unproved assumption.
```

## Facilitation notes

- Keep learners on the current failure. Later defects are distractions until the
  program reaches them.
- Require repair-log entries before broad edits.
- Treat a new failure after a repair as useful evidence.
- Reject changes to expected outputs unless the class first proves the contract
  is wrong.
- Ask learners to explain each Copilot suggestion before they accept it.
- Pair learners when one is stuck for more than eight minutes.
- Keep the solution hidden until the review.

## Common wrong turns

| Wrong turn | Coaching response |
| --- | --- |
| Rewrite the application from scratch | Return to the first failing command and preserve the supplied interface |
| Ask Copilot to “fix everything” | Narrow the prompt to one failure and one file |
| Change fixtures to match broken output | Restate that fixtures are the contract |
| Refactor while imports still fail | Restore startup first |
| Remove the repeated-run test | Explain that global state often passes once and fails in a process |
| Mock all file reads | Keep at least one fixture-level test through the real parser |

## Lab handoff

Learners submit:

- a completed repair log;
- a working command-line application;
- at least two added regression tests;
- unchanged expected-output fixtures;
- a refactored design with no process-wide result state;
- passing pytest output and generated reports.

**Success means the same inputs produce the supplied outputs before and after the
refactor.**
