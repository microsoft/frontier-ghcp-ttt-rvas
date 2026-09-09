# Ralph Guide — Work Monitor

Treat Ralph as a monitored work queue. Human approval is still required. Confirm its current behavior and customer approval before using a live command.

## Commands

| Command | Use |
| --- | --- |
| `squad triage` | Run one triage pass. |
| `squad watch --execute` | Monitor and dispatch approved work. |
| `squad watch --health` | Inspect watch status without dispatching. |
| `squad watch --interval N` | Set the polling interval. |
| `touch .squad/ralph-stop` | Request a stop through the sentinel file. |

## Review cycle

1. Inspect `squad` issues that have no role label.
2. Send ready items to the lead for triage.
3. Assign one role per bounded issue.
4. Inspect implementation, CI, and review feedback.
5. Let the human reviewer decide whether to merge, request changes, or pause.

Use the status view to check untriaged items, active work, pull requests, and completed work. The exact output can vary.

## Stop conditions

Stop the loop when policy, data boundary, ownership, scope, test status, or the usage guard is unclear. Use the manual board when the live path is unavailable: triage the issue, assign an owner, review the result, and write the decision.

Do not configure a persistent watch process for this lab unless the trainer explicitly approves it.
