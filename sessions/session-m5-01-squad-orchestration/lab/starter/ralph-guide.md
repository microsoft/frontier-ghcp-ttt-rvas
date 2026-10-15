# Ralph Guide: Work Monitor

Treat Ralph as a monitored work queue. Human approval is still required. Confirm
current behavior and approval before using a live command.

## Commands

| Command | Use |
| --- | --- |
| `squad triage` | Run one triage pass. |
| `squad watch --execute` | Monitor and dispatch approved work. |
| `squad watch --health` | Inspect watch status without dispatching. |
| `squad watch --interval N` | Set the polling interval. |
| `touch .squad/ralph-stop` | Request a stop through the sentinel file. |

## Issue 001 review cycle

1. Inspect Issue 001 and confirm that the lead assignment exists.
2. Confirm that the backend and tester stayed within their file boundaries.
3. Read the focused test result.
4. Read the lead review.
5. Surface the issue as ready for closure only when the lead approves it.

Use the status view to check the issue, active work, pull request, and review state.
The exact output can vary.

## Tabletop equivalent

Use four columns: **assigned**, **implemented**, **tested**, and **reviewed**. Move
Issue 001 one column at a time and attach the matching evidence.

## Stop conditions

Stop when policy, data boundary, ownership, scope, test status, or the usage guard
is unclear. Do not configure a persistent watch process unless the trainer
explicitly approves it.
