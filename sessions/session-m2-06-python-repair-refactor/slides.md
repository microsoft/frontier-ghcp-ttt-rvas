---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M2-06: Repair and Refactor a Broken Python Application'
---

<!-- _class: lead -->

# Repair and refactor a broken Python application

## Copilot in Practice

Session M2-06 | Intermediate | 3 hours

---

<!-- _class: agenda -->

# Agenda

| Segment | Time |
| --- | ---: |
| Start from the failure output | 8 min |
| Python concepts and failure order | 10 min |
| Prepared repair demonstration | 12 min |
| Recover behavior from fixtures | 12 min |
| Lock behavior with tests | 10 min |
| Refactor and lab handoff | 8 min |

---

# Broken code fails in layers

A broken program rarely has one bug. Each fix lets execution reach the next failure.

**Fix the lowest blocked layer first.** Do not refactor code Python cannot import.

---

# The failure ladder

```text
parse → import → start → behavior → structure
```

- **Parse:** Python can't read the file.
- **Import:** a module or name is missing.
- **Start:** the entry point crashes.
- **Behavior:** it runs and gives wrong answers.
- **Structure:** it works, but is hard to change.

---

# Python concepts you need

- **Import:** `from .rules import check` loads a name from a sibling module. A missing file or name stops startup.
- **Entry point:** `python -m package` runs `__main__.py`.
- **pytest:** runs `test_*` functions with plain `assert`. A file that can't import stops collection.
- **CSV:** every value is a string. Convert and validate numbers.
- **Module-level state:** a top-level variable lives as long as the process, so calls leak into each other.

---

# Read a traceback from the bottom

Capture four facts:

1. **exception type**;
2. **file and line**;
3. **failing source text**;
4. **command** that produced it.

That is enough for a first hypothesis. Don't guess before you have all four.

---

# The repair loop

```text
capture failure
  → state one hypothesis
  → make one small change
  → run one narrow check
  → record the result
```

If the next failure is different, the repair moved execution forward. If it's the same, the hypothesis was wrong.

---

# Narrow checks beat noisy checks

| Goal | Command |
| --- | --- |
| Parse | `python -m compileall <pkg>` |
| Import | `python -c "import <pkg>.cli"` |
| Start | `python -m <pkg> --help` |
| Behavior | `pytest -q` |

Run the **smallest command that can disprove your hypothesis**.

---

# Use Copilot inside a boundary

```text
Explain this SyntaxError using only the shown file and traceback.
Propose the smallest repair.
Do not refactor or change behavior.
```

Give Copilot the failure, the file, and a limit on scope. **A narrow prompt gives a patch you can check in seconds.**

---

# Demo: one full loop

1. Run the command and capture the first failure.
2. Ask Copilot about that failure only.
3. Apply the smallest change.
4. Re-run the narrow check.
5. Log the repair, then stop.

Resist the second fix until the first is logged.

---

# Fixtures and expected outputs are a contract

When no spec exists, **sample inputs and expected outputs define correct behavior**.

- Run the program on the fixtures and diff against the expected output.
- Fix the code, not the expected file.
- Editing the contract to hide a defect is the wrong turn.

---

# Reproduce a defect before you fix it

Find a fixture that fails the same way every time. Then:

- name the symptom (wrong total, missing row, stale value);
- form a hypothesis about where it comes from;
- fix it and watch the same fixture pass.

Typical culprits: overwritten values, dropped rows, off-by-one thresholds, state kept between calls.

---

# Characterization tests come before refactoring

A refactor must not change behavior. Tests are how you know.

- Keep the fixture-level checks as a safety net.
- Add a focused test for each edge you fixed: boundaries and invalid input.
- Make invalid input fail with **context** (which row, which field).

Refactor only when the tests pass.

---

# Remove global state

```python
HISTORY = []

def run(items):
    HISTORY.extend(process(items))
    return HISTORY
```

The first call looks right. **The second call exposes the leak.**

Fix: build results inside the function and return them. Test by calling twice and comparing.

---

# Untangle control flow

A function that reads, converts, merges, classifies, formats, and stores state hides its rules.

```text
parse → aggregate → classify → report
```

Give each job one function. **Each rule should have one implementation**, reused everywhere. Duplicated rules drift apart.

---

# Refactor in small moves

1. Remove process-wide mutable state.
2. Extract one rule into one function.
3. Reuse it from every caller.
4. Split parsing and aggregation.
5. Run the tests after each move.

Keep public behavior stable. The command-line layer coordinates and owns no rules.

---

# Use code intelligence for navigation

A language server (LSP) answers "where is this defined, and who calls it?" from parsed code.

```text
/lsp show           list configured servers
/lsp test python    check that the server starts
```

`/lsp test` checks startup only. Then ask for definitions and references and check the locations.

**References miss inline copies of a rule.** Read the code too. Approve a `/plan` before structural edits.

---

# Review Copilot output like a patch

Ask:

- Did the change touch only the current fault?
- Which test shows the claimed behavior?
- Did a rule move, or get copied?
- Is output still deterministic?

Check generated code against tests and fixtures, not against how confident it sounds.

---

# In the lab

| Part | Time |
| --- | ---: |
| Preflight and baseline | 10 min |
| Restore parsing and imports | 30 min |
| Recover behavior | 30 min |
| Add regression tests | 20 min |
| Refactor and check | 25 min |
| Final output comparison and tests | 5 min |

You repair an inventory-reconciliation app. Keep a repair log, add regression tests, and finish with the supplied outputs and a passing `pytest -q`.

---

<!-- _class: divider -->

# Lab handoff

Work in failure order. One hypothesis, one change, one check.

Log each repair. Finish with the expected outputs, passing tests, and the same result on repeated runs.
