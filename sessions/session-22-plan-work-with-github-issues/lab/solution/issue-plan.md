# GitHub Issue Plan

## Source brief

`docs/discovery/request-status-decision-brief.md`

## Existing-work check

Search the training repository for open issues containing `request status`, `public status`, and `stale status`. The reference assumes no active duplicate.

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
| 2 | Show public status and next step | Requester-facing status view | Issue 1 | Implementation owner unset |
| 3 | Handle unavailable and stale status | Safe fallback behavior | Issue 1 | Implementation owner unset |
| 4 | Verify requester access boundaries | Evidence that users see only their requests | Issues 2-3 | Access reviewer |
| 5 | Prepare service handoff evidence | Reviewed support and release notes | Issues 2-4 | Delivery lead |

## Proposed labels and milestone

Use only labels and milestones that already exist in the training repository.

## Review decision

- **Decision:** Approve
- **Reviewer:** Delivery reviewer
- **Reason:** Each child issue has an independently reviewable outcome and follows the approved brief.
