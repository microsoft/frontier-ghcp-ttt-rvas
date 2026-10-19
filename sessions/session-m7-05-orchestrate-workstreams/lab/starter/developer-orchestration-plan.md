# Developer orchestration plan

**Parent objective:** Separate implementation correctness, test coverage, and PR
readiness for the supplied synthetic change.

**Human reviewer:**

**Usage limit and stop decision:**

| Workstream | Independent question | Input paths | Permitted command | Stop condition |
| --- | --- | --- | --- | --- |
| Implementation | | | None | |
| Tests | | | Supplied unittest command only | |
| PR state | | | None | |

## Shared decisions made before starting

Which source defines behavior? Which source defines PR state?
Why can each child finish without another child's output?

## Planned follow-up

After the test result, redirect the test reviewer to criterion 5. Ask whether the
test proves ordering, the exact complete reason list, or both.

## Parent result requirements

Keep child-session links, status, timing, and usage in the app.
The parent result must name accepted findings, rejected or unresolved claims, and
the human decision. Check the provisional author note against the PR fields.
