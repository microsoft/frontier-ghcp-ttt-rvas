# Developer orchestration plan

**Parent objective:** Separate implementation correctness, test coverage, and PR
state for the M2-05 pricing fix.

**Usage limit and stop decision:**

| Workstream | Independent question | Inputs | Allowed command | Stop condition |
| --- | --- | --- | --- | --- |
| Implementation | | | None | |
| Tests | | | `python -m unittest discover -s tests -v` | |
| PR state | | | Read-only `gh` or GitHub MCP | |

## Decisions before starting

Which file defines the behavior? Where does the PR state come from?
Why can each child finish without another child's output?

## Planned follow-up

After the test result, redirect the test reviewer. Ask it to map each rule and
symptom in `issue-brief.md` to the test that would catch it, and to list the rules
no test covers.

## Parent result requirements

Keep child-session links, status, timing, and usage in the app. The parent result
names accepted findings, rejected or unresolved claims, and your decision. Check
the provisional author note against the PR's checks and threads.
