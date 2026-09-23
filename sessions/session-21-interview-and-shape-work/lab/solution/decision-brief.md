# Decision Brief: Show Requesters a Clear Public Status

## Status

**Decision:** Approved with one open implementation question

**Request owner:** Portal product owner
**Reviewer:** Delivery lead
**Input:** Fictional Service Request Portal scenario
**Copilot interview record:** [`copilot-interview-record.md`](copilot-interview-record.md)

## Request as received

> Make request status clearer so people stop asking support.

## Problem

Employees who submit facilities or equipment requests can see a reference number but cannot tell what is happening. They contact the service desk for updates, and service agents repeat information already present in the internal queue.

## Target outcome

A requester can see a plain-language public status, the last updated time, and a safe summary for each included request.

## Scope

### In scope

- Facilities and equipment requests.
- The signed-in requester’s web view.
- A public status mapped from the existing internal state.
- Last updated time.
- A short summary approved for requester visibility.
- Safe fallback behavior for stale or unmapped states.

### Out of scope

- Email, chat, push, or mobile notifications.
- Changes to the service team’s internal workflow.
- New request types.
- Internal notes, assigned agent names, security details, or other requesters’ data.
- Service-level commitments or promised completion dates.

## Constraints and dependencies

| Item | Effect on the work | Evidence or owner |
| --- | --- | --- |
| Existing internal states | Public wording must map to current states without changing the queue | Service operations manager |
| Existing updated timestamp | The portal can show freshness without a new data source | Portal team |
| Requester-only access | Every status lookup must enforce the existing ownership rule | Privacy reviewer |
| Public wording review | State labels and summaries need service approval | Service operations manager |

## Success

| Measure | Baseline | Target | Evidence source |
| --- | --- | --- | --- |
| Status-chasing contacts for included types | Measure before pilot | 20% reduction within six weeks | Service desk contact tags |
| Supported request coverage | No public status view | 100% show a mapped status or explicit fallback | Portal validation report |
| Requester access | Existing ownership rule | No cross-user status exposure | Permission test evidence |

## Failure and safeguards

| Failure case | Expected behavior | Validation |
| --- | --- | --- |
| Signed-in user does not own the request | Show no request details | Permission test |
| Internal state has no approved public mapping | Show "Status unavailable" and a contact route | Mapping test |
| Source timestamp exceeds the approved threshold | Show "Update pending" rather than implying fresh progress | Stale-state test |
| Safe summary is empty | Show the public status and omit the summary block | Empty-state test |

## Decisions

| Decision | Choice | Reason | Decision owner |
| --- | --- | --- | --- |
| First-release users | Employees who submitted included requests | They create the update contacts | Portal product owner |
| First-release request types | Facilities and equipment | High contact volume and shared workflow | Portal product owner |
| Visible fields | Public status, updated time, safe summary | Enough context without exposing internal work | Portal product owner |
| Notifications | Excluded | They add channels and delivery rules before the view is proven | Portal product owner |
| Approval path | Service review, privacy review, product approval | Wording and access need separate checks | Portal product owner |

## Open questions

| Question | Owner | Needed by | Work blocked |
| --- | --- | --- | --- |
| Is two business days the correct stale threshold for both request types? | Service operations manager | Before release approval | Final stale-state wording |

## Ownership and approval

| Responsibility | Role |
| --- | --- |
| Work item owner | Portal product owner |
| Public state mapping | Service operations manager |
| Access and data review | Privacy reviewer |
| Delivery review | Delivery lead |
| Release approval | Portal product owner |

## Review record

**Request owner decision:** Approved with the stale-threshold question assigned.
**Copilot draft checked against confirmed answers:** Yes.
**Reviewer notes:** Scope and failure behavior are clear enough for sprint planning.
**Next action and owner:** Portal product owner creates the work item; service operations manager confirms the threshold before release.
