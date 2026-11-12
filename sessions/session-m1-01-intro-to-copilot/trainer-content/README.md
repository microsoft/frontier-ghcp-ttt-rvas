# Session M1-01 trainer guide: Introduction to GitHub Copilot

## Delivery objective

Teach one habit: **define, inspect, test, decide**. Learners should leave able to
review an inline suggestion without assuming plausible code is correct.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:07 | The suggestion-and-tests model |
| 0:07 to 0:17 | How context shapes a suggestion |
| 0:17 to 0:32 | Inline suggestion controls |
| 0:32 to 0:50 | Prepared utility-function demonstration |
| 0:50 to 0:56 | Follow-up edits and Next Edit Suggestions |
| 0:56 to 1:00 | Access check and lab handoff |

The timings match [`slides.md`](../slides.md).

## Before delivery

- Run the starter syntax check and the solution tests.
- Check that Python 3.10 or later and Copilot work in the training editor.
- Use the shortcuts the editor shows. Don't teach fixed shortcuts or model lists.

## Slide delivery map

### 0:00 to 0:07: Suggestion and tests

**Slides:** *Introduction to GitHub Copilot*, *The review workflow*, *Plausible is
not correct*

> Copilot can draft a change. The developer defines intent, checks the result, and
> owns the decision.

Ask what checks learners want before merging ten generated lines. Listen for
tests, review, scope, and repository conventions.

### 0:07 to 0:17: Context shapes suggestions

**Slides:** *A practical system model*, *Context changes the suggestion*

```text
task + context -> Copilot surface -> suggestion -> tests + review
```

Names, types, docstrings, nearby code, selected text, and repository instructions
can all influence a suggestion.

Show two versions of `normalize_username`: one with only the function name, one
with the docstring and test. The second gives the reviewer a contract.

### 0:17 to 0:32: Inline controls

**Slides:** *Accept, revise, reject*, *Review one suggestion*

Show:

- reading the whole suggestion before accepting;
- rejecting an implementation that changes behavior;
- accepting part of a suggestion and editing the rest;
- rerunning a focused test after each decision.

### 0:32 to 0:50: Prepared demonstration

**Slides:** *Demo contract*, *Demo: inspect before accepting*, *A failing test is
useful*

Open `lab/starter/utils.py` and `test_utils.py`.

1. Read the `normalize_username` docstring and test.
2. Request an inline suggestion.
3. Ask which line handles outer whitespace, case, and repeated spaces.
4. Reject any suggestion that deletes internal word boundaries.
5. Run the focused test.
6. Replace `split()` with a single-space split.
7. Show the failure on repeated whitespace.
8. Restore the reviewed implementation and rerun the test.

The failing test exposes the whitespace bug while the change is still small.

```bash
cd sessions/session-m1-01-intro-to-copilot/lab/starter
python -m py_compile utils.py test_utils.py
python -m unittest -v test_utils.UtilityTests.test_normalize_username
```

### 0:50 to 0:56: Follow-up edits

**Slides:** *Predicted follow-up edits still need review*

Show the `profile_summary` rename from `username` to `handle`. If Next Edit
Suggestions are available, inspect each proposed caller update, then search for
the old name. A prediction can miss a reference.

### 0:56 to 1:00: Access check and handoff

**Slides:** *Access check*, *Lab handoff*

Check that every learner can request an inline suggestion. Fix access before the
lab starts. Then preview the lab: two simple functions, the apostrophe rule, the
summary, and the rename.

## Teaching points

- A clear function contract improves both suggestions and review.
- A passing test covers one stated behavior, not every behavior.
- Settle ambiguity with a decision and a test, not a guess.
- Predicted follow-up edits are suggestions.

## Common questions

**Why did two learners get different suggestions?**
Their context or the generated output differed. Run both against the same tests.

**Should learners accept a suggestion that passes one test?**
Only after they check scope, edge cases, dependencies, and readability.

**Which shortcut should I teach?**
The one the editor displays.
