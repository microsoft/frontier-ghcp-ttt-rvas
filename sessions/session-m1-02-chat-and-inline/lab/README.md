# Session M1-02 lab: Diagnose and extend a calculator with Chat

**Duration:** 2 hours

**Deliverable:** A corrected and extended calculator, a passing test suite, and a
completed `chat-notes.md`

## Lab overview

You use different Chat surfaces on one Python calculator. A focused test exposes
a weighted-average bug. After the fix, you add missing tests, answer a workspace
question, and handle a change request that needs a decision about zero total
weight. Use synthetic data only.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Prepare the project and reproduce the failure | 15 min |
| 2 | Explain and diagnose the defect | 25 min |
| 3 | Apply the fix and expand tests | 30 min |
| 4 | Review the project with workspace and terminal context | 20 min |
| 5 | Decide and implement the change request | 20 min |
| 6 | Check the result | 10 min |

You need Python 3.10 or later, `git`, and **VS Code** with GitHub Copilot Chat.
Labels and shortcuts vary by version, so check yours.

## Part 1: Prepare and reproduce (15 minutes)

```bash
cd sessions/session-m1-02-chat-and-inline/lab/starter
python -m py_compile calculator.py test_calculator.py
python -m unittest -v
```

Three tests pass. The weighted-average test fails: the result is `190` instead of
`95`.

Read `calculator.py`, `test_calculator.py`, `change-request.md`, and
`chat-notes.md`.

**Checkpoint:** You can state the failing input, actual result, and expected
result yourself.

## Part 2: Explain and diagnose (25 minutes)

Use inline Chat or the sidebar with the `weighted_average` selection.

```text
Explain the weighted_average method line by line. State the mathematical formula
it implements. Do not propose a fix yet.
```

Compare the answer with the failing test. Then ask:

```text
The test expects weighted_average([80, 100], [1, 3]) to equal 95, but the method
returns 190. Identify the defect. Limit the answer to this method.
```

If your surface has an explain shortcut, try it on the same selection. Note the
useful context and the diagnosis in `chat-notes.md`.

**Checkpoint:** The diagnosis names `sum(weights)` as the missing denominator.

## Part 3: Fix and expand tests (30 minutes)

```text
Fix only weighted_average so it divides by the total weight. Preserve the public
method signature and the existing length check. Add no dependency.
```

Review the diff before you accept it. Run:

```bash
python -m unittest -v \
  test_calculator.CalculatorTests.test_weighted_average_uses_total_weight
```

Next, use a tests shortcut or a direct prompt to propose tests for:

- mismatched list lengths;
- empty lists;
- history recording;
- a zero total weight.

Reject tests that invent behavior. Leave the zero-total-weight rule for Part 5.

**Checkpoint:** The original four tests pass. Proposed new tests stay separate
from the tests you accepted.

## Part 4: Use workspace and terminal context (20 minutes)

```text
#codebase Summarize the Calculator public behavior and identify which methods
have focused tests. Cite the relevant files.
```

If your surface names workspace context differently, use its equivalent.

Run the tests again, then use terminal context if you have it:

```text
Explain the most recent test result. Which behavior failed or passed, and which
file owns the next change?
```

Read the failure yourself. The summary doesn't replace it.

**Checkpoint:** Your notes separate code behavior, test output, and Chat's
interpretation.

## Part 5: Decide the change request (20 minutes)

Open `change-request.md`. It says to reject a zero total weight but leaves the
exception type and message to you. The reference solution uses:

```text
ValueError("Total weight must not be zero")
```

Write a focused test first, then update `weighted_average`. Also decide how empty
inputs behave. Note both decisions in `chat-notes.md`.

```bash
python -m unittest -v
```

**Checkpoint:** The suite covers the original defect, mismatch, empty input, zero
total weight, and history.

## Part 6: Check the result (10 minutes)

*Optional:* if you have two models, send both the same prompt and compare what
you can check against the tests:

```text
Review weighted_average and its tests. List any accepted behavior that lacks a
test. Do not change code.
```

```bash
git --no-pager diff -- calculator.py test_calculator.py chat-notes.md
python -m py_compile calculator.py test_calculator.py
python -m unittest -v
```

## Final deliverable

1. `calculator.py` divides by total weight and rejects invalid inputs.
2. `test_calculator.py` covers the accepted behavior. All eight tests pass.
3. `chat-notes.md` records the surfaces, prompts, test results, your
   zero-total-weight decision, and the optional comparison if you ran it.
