# Session 02 Lab: Diagnose and Extend a Calculator with Chat

**Duration:** 2 hours

**Difficulty:** Beginner

**Prerequisites:** Session 01 and Python 3.10 or later

**Deliverable:** A corrected and extended calculator, a passing test suite, and a
completed `chat-notes.md`

## Lab overview

You will use different Chat surfaces on one Python calculator project. A focused
test exposes a weighted-average bug. After fixing it, you will add missing tests,
answer a workspace question, and handle a change request that requires a judgment
about zero total weight.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Prepare the project and reproduce the failure | 15 min |
| 2 | Explain and diagnose the defect | 25 min |
| 3 | Apply the fix and expand tests | 30 min |
| 4 | Review the project with workspace and terminal context | 20 min |
| 5 | Decide and implement the change request | 20 min |
| 6 | Compare, document, and verify | 10 min |

## Before you start

Use synthetic data and an approved training repository.

For the live path, confirm GitHub Copilot Chat access in the selected editor. If
access is unavailable or not approved, stop the live interaction and use the
**manual fallback**: inspect the code and failing output yourself, implement the
change, compare with `lab/solution/`, and complete `chat-notes.md`.

If model comparison is allowed, use only choices approved for the exercise and set
any required metered-work stop condition. If no second choice is available, compare
the assisted result with the reference solution.

## Part 1: Prepare and reproduce (15 minutes)

```bash
cd sessions/session-02-chat-and-inline/lab/starter
python -m py_compile calculator.py test_calculator.py
python -m unittest -v
```

Three tests should pass. The weighted-average test should fail because the result
is `190` instead of `95`.

Read `calculator.py`, `test_calculator.py`, `change-request.md`, and
`chat-notes.md`.

**Checkpoint:** You can state the failing input, actual result, and expected result
without asking Chat to guess them.

## Part 2: Explain and diagnose (25 minutes)

Use inline Chat or the sidebar with the `weighted_average` selection.

Start with an explanation request:

```text
Explain the weighted_average method line by line. State the mathematical formula
it implements. Do not propose a fix yet.
```

Compare the response with the failing test. Then ask:

```text
The test expects weighted_average([80, 100], [1, 3]) to equal 95, but the method
returns 140. Identify the defect. Limit the answer to this method.
```

If the surface supports an explain shortcut, try it with the same selection.
Record the useful context and the diagnosis in `chat-notes.md`.

**Checkpoint:** The diagnosis identifies `sum(weights)` as the denominator.

## Part 3: Fix and expand tests (30 minutes)

Request a narrow fix:

```text
Fix only weighted_average so it divides by the total weight. Preserve the public
method signature and the existing length check. Add no dependency.
```

Review the proposed diff before accepting it. Run:

```bash
python -m unittest -v \
  test_calculator.CalculatorTests.test_weighted_average_uses_total_weight
```

Next, use a tests shortcut or a direct prompt to propose tests for:

- mismatched list lengths;
- empty lists;
- history recording;
- a zero total weight.

Do not accept tests that invent behavior. The zero-total-weight rule belongs to the
change request in Part 5.

**Checkpoint:** The original four tests pass. Proposed new tests are separated from
the accepted contract.

## Part 4: Use workspace and terminal context (20 minutes)

Ask a workspace-level question:

```text
@workspace Summarize the Calculator public behavior and identify which methods
have focused tests. Cite the relevant files.
```

If the current surface uses a different workspace-context mechanism, use its
documented equivalent.

Run the tests again. Then use terminal context, if available:

```text
Explain the most recent test result. Which behavior failed or passed, and which
file owns the next change?
```

Verify the response yourself. Terminal context can summarize output; it does not
replace reading the failure.

**Checkpoint:** Your notes distinguish code behavior, test evidence, and Chat
interpretation.

## Part 5: Decide the change request (20 minutes)

Open `change-request.md`.

The request requires rejection when the total weight is zero but does not define
the exception type or message. Choose both. The reference path uses:

```text
ValueError("Total weight must not be zero")
```

Add a focused test first. Then update `weighted_average`. While reviewing the
method, also decide how empty inputs should behave. Record both decisions in
`chat-notes.md`.

Run:

```bash
python -m unittest -v
```

**Checkpoint:** The suite covers the original defect, mismatch, empty input, zero
total weight, and history.

## Part 6: Compare and verify (10 minutes)

If two approved model choices are available, send both the same prompt:

```text
Review weighted_average and its tests. List any accepted behavior that lacks a
test. Do not change code.
```

Compare only observable accuracy and useful citations. Otherwise compare the live
or manual result with `lab/solution/`.

Inspect the final diff:

```bash
git --no-pager diff -- calculator.py test_calculator.py chat-notes.md
python -m py_compile calculator.py test_calculator.py
python -m unittest -v
```

## Final deliverable

1. `calculator.py` uses total weight and rejects invalid weighted-average inputs.
2. `test_calculator.py` covers the accepted behavior.
3. `chat-notes.md` records the chosen surfaces, prompts, verification, judgment
   call, and comparison path.

## Verification

- [ ] Both Python files compile.
- [ ] All eight reference tests pass.
- [ ] The zero-total-weight decision is explicit in code, test, and notes.
- [ ] Chat changes stayed inside the calculator project.
- [ ] No new dependency was added.
