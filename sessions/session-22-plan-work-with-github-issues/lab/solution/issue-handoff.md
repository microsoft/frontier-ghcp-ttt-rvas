# Issue Handoff

**Initiative:** Service Request Portal
**Decision owner:** Product owner
**Work-system steward:** Training repository owner

## Verified issue set

| Role in plan | Issue number | Create or reuse | Fresh-read result |
| --- | --- | --- | --- |
| Parent | Recorded from live run | Create | Title and body match |
| Public status mapping | Recorded from live run | Create | Acceptance evidence present |
| Requester status view | `#241` | Reuse and update | Last-update scope preserved; public status added |
| Empty and stale states | Recorded from live run | Create | Safe fallback criteria present |
| Access-boundary verification | Recorded from live run | Create | Internal fields remain hidden |

## Existing-work decisions

| Existing issue | Duplicate, overlap, conflict, or unrelated | Decision | Reason |
| --- | --- | --- | --- |
| `#241` | Partial overlap | Reuse and extend | It already owns the last-update field |
| `#256` | Out of scope | Leave unchanged | Notifications are a non-goal |
| `#263` | Conflict | Do not link as implementation work | It would expose restricted fields |
| `#278` | Historical duplicate | Link for context only | It is closed and lacks current decisions |

## Session 23 input

- **Parent issue:** Recorded from the learner's live run
- **Child issues:** Mapping, requester view, empty/stale states, access verification
- **Open ownership gaps:** Implementation owners remain unset
- **Approved GitHub fields:** Existing labels only; no invented milestone
- **Fields that remain unset:** Assignees, due dates, and unavailable relationships
- **Source brief:** `decision-brief.md`
