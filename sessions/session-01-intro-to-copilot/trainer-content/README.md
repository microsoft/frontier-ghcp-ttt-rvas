# Session 01 Trainer Guide: Introduction to GitHub Copilot

## Delivery objective

Teach one durable habit: **define, inspect, test, decide**. Learners should leave
able to review an inline suggestion without treating fluency as correctness.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:07 | The proposal-and-evidence model |
| 0:07–0:17 | How context shapes a suggestion |
| 0:17–0:27 | Access, data, repository, and metering preflight |
| 0:27–0:38 | Inline suggestion controls |
| 0:38–0:50 | Prepared utility-function demonstration |
| 0:50–0:56 | Follow-up edits and Next Edit Suggestions |
| 0:56–1:00 | Manual fallback and lab handoff |

The timings match [`slides.md`](../slides.md).

## Before delivery

- Confirm the training repository uses synthetic content.
- Confirm Python 3.10 or later is available.
- Verify current product setup in official documentation.
- Confirm the selected editor and account are approved.
- If the exercise can create metered use, name the owner, threshold, and stop
  condition.
- Prepare both the live path and the manual fallback.
- Run the starter syntax check and the solution tests.

Do not teach fixed prices, model lists, shortcuts, or data-handling claims. Show the
controls available in the approved environment.

## Slide delivery map

### 0:00–0:07: Proposal and evidence

**Slides:** *Introduction to GitHub Copilot*, *The durable workflow*, *Proposal is
not proof*

State the session rule:

> Copilot can draft a change. The developer defines intent, checks the result, and
> owns the decision.

Ask what evidence learners require before merging ten generated lines. Listen for
tests, review, scope, and repository conventions.

### 0:07–0:17: Context shapes suggestions

**Slides:** *A practical system model*, *Context changes the proposal*

Draw this model:

```text
task + approved context -> product surface -> proposal -> checks + review
```

Explain that names, types, docstrings, nearby code, selected text, and repository
instructions can influence a proposal. Avoid claims about hidden service internals.

Use two versions of `normalize_username`: one with only the function name, then one
with the docstring and test. The second version gives reviewers a clear contract.

### 0:17–0:27: Preflight

**Slides:** *Preflight before use*, *Access policy*

Confirm four boundaries:

1. **Access:** Is the selected account and surface enabled?
2. **Data:** Is every file and value approved for this workflow?
3. **Scope:** Which repository and files may change?
4. **Metering:** Who owns any limit and stop decision?

If any answer is missing, switch to the manual route. Do not troubleshoot policy
by trial and error.

### 0:27–0:38: Inline controls

**Slides:** *Accept, revise, reject*, *Review one suggestion*

Use the key bindings shown by the editor. Demonstrate:

- reading the full proposal before accepting;
- rejecting an implementation that changes behavior;
- accepting a useful portion and editing the rest;
- rerunning a focused test after each decision.

The control names matter less than the review loop.

### 0:38–0:50: Prepared demonstration

**Slides:** *Demo contract*, *Demo: inspect before accepting*, *A failing check is
useful*

Open `lab/starter/utils.py` and `test_utils.py`.

1. Read the `normalize_username` docstring and test.
2. Request an inline suggestion.
3. Ask which line handles outer whitespace, case, and repeated spaces.
4. Reject any proposal that deletes internal word boundaries.
5. Run the focused test.
6. Deliberately replace `split()` with a single-space split.
7. Show the failure for repeated whitespace.
8. Restore the reviewed implementation and rerun the test.

This demo shows why a failing check is useful evidence rather than a bad outcome.

### 0:50–0:56: Follow-up edits

**Slides:** *Predicted follow-up edits still need review*

Show the `profile_summary` rename from `username` to `handle`.

If Next Edit Suggestions are available, inspect each proposed caller update. Then
run an independent search for the old name. A prediction can miss a reference.

### 0:56–1:00: Fallback and handoff

**Slides:** *Manual fallback*, *Lab handoff*

For the fallback, reveal one candidate implementation at a time from the solution.
Learners mark accept, revise, or reject and run the same tests.

The lab continues in one module. Learners complete two simple functions, settle
the apostrophe rule, add the summary, and review the rename.

## Prepared demo commands

```bash
cd sessions/session-01-intro-to-copilot/lab/starter
python -m py_compile utils.py test_utils.py
python -m unittest -v test_utils.UtilityTests.test_normalize_username
```

## Teaching points

- A clear function contract improves both suggestions and review.
- A passing test supports a stated behavior. It does not prove every behavior.
- Ambiguity belongs in a decision and a test, not in an unreviewed guess.
- Predicted follow-up edits are proposals.
- The manual path teaches the same engineering judgment.

## Common questions

**Why did two learners receive different suggestions?**

Their context or generated output differed. Compare both results with the same
tests.

**Should learners accept a proposal that passes one test?**

Only after they also inspect scope, edge cases, dependencies, and readability.

**What if access disappears during the lab?**

Stop the live path. Continue manually from the same file and keep the same
verification.

**Which editor shortcut should I teach?**

Use the shortcut displayed by the current approved editor.

## Lab readiness check

- [ ] The starter files are open.
- [ ] The five expected baseline failures are understood.
- [ ] The live or manual path is declared.
- [ ] Learners know where to record decisions.
- [ ] The solution is available but closed.
