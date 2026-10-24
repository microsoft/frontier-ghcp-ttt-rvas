# Ralph guide: Work monitor

Treat Ralph as a monitored work queue. Human approval is still required. Check
current behavior and get approval before using a live command.

## Commands

| Command | Use |
| --- | --- |
| `squad triage` | Run one triage pass. |
| `squad watch --execute` | Monitor and dispatch approved work. |
| `squad watch --health` | Inspect watch status without dispatching. |
| `squad watch --interval N` | Set the polling interval. |
| `touch .squad/ralph-stop` | Request a stop through the sentinel file. |

## Issue 001 review cycle

1. Inspect Issue 001 and check that the lead assignment exists.
2. Check that the backend and tester stayed within their file boundaries.
3. Read the focused test result.
4. Read the lead review.
5. Mark the issue as ready to close only when the lead approves it.

Use the status view to check the issue, active work, pull request, and review state.
The exact output can vary.

## Trainer walkthrough

Use four columns: **assigned**, **implemented**, **tested**, and **reviewed**. Move
Issue 001 one column at a time and attach the assignment, changes, tests, or review.
This view illustrates the monitor; it does not replace the learner's Squad run.

## Stop conditions

Stop when policy, data boundary, ownership, scope, test status, or the usage limit
is unclear. Do not configure a persistent watch process unless the trainer
approves it.
