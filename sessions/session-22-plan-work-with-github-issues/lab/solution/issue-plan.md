# GitHub Issue Plan

## Source brief

`docs/discovery/decision-brief.md`

## Existing-work check

The concrete seeded records were reviewed before planning:

| Existing issue | Classification | Decision | Reason |
| --- | --- | --- | --- |
| `#241` | Partial overlap | Reuse and extend | It already owns the last public update time |
| `#256` | Out of scope | Leave unchanged | Notifications are excluded |
| `#263` | Conflict | Reject as implementation work | It exposes restricted fields |
| `#278` | Historical duplicate | Link for context only | It is closed and lacks current decisions |

## Parent issue

### Title

Make request status understandable to requesters

### Outcome

Requesters can understand the current public status and next step for supported requests.

### Scope and non-goals

The parent issue covers facilities and equipment requests. Notifications, internal workflow changes, and reporting dashboards remain out of scope.

### Acceptance evidence

The parent closes only after the public mapping, requester view, empty and stale states, access checks, and owner review are complete.

## Child issues

| Order | Title | Independent outcome | Dependency | Owner or gap |
| --- | --- | --- | --- | --- |
| 1 | Approve the public status mapping | Approved mapping and wording | None | Product owner |
| 2 | Extend #241 with public status and next step | Requester-facing status view | Issue 1 | Implementation owner unset |
| 3 | Handle unavailable and stale status | Safe fallback behavior | Issue 1 | Implementation owner unset |
| 4 | Verify requester access boundaries | Evidence that users see only their requests | Issues 2-3 | Access reviewer |
| 5 | Prepare service handoff evidence | Reviewed support and release notes | Issues 2-4 | Delivery lead |

## Proposed labels and milestone

Use only labels and milestones that already exist in the training repository.

## Handoff roles

- **Decision owner:** Product owner
- **Work-system steward:** Training repository owner
