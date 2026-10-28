# GitHub issue plan

> Temporary preview only. The created GitHub issues become authoritative.

## Source brief

`docs/discovery/decision-brief.md`

## Existing-work check

The seeded issues were reviewed before planning:

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

Requesters can see the public status label and latest update date for supported
requests.

### Scope and non-goals

The parent issue covers facilities and equipment requests. Notifications, internal workflow changes, and reporting dashboards remain out of scope.

### Acceptance evidence

The parent closes only after the public mapping, requester view, empty and stale states, access checks, and owner review are complete.

## Child issues

| Order | Title | Independent outcome | Dependency | Owner or gap |
| --- | --- | --- | --- | --- |
| 1 | Approve the public status mapping | Approved mapping and wording | None | Product owner |
| 2 | Extend #241 with the public status label | Requester status view with only the public label and latest update date | Issue 1 | Implementation owner unset |
| 3 | Handle unavailable and stale status | Safe fallback behavior | Issue 1 | Implementation owner unset |
| 4 | Check requester access boundaries | Recorded checks show users see only their requests | Issues 2-3 | Access reviewer |

The four required rows map to the four Session M7-05 workstreams.

### Optional fifth child

If the owner approves a separate service handoff issue, it depends on Issues 2-4.
Keep it outside the four Session M7-05 workstreams.

## Proposed labels and milestone

Use only labels and milestones that already exist in the training repository.
