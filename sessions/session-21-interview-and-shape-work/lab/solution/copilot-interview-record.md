# GitHub Copilot Interview Record: Request Status

## Interview record

| Field | Entry |
| --- | --- |
| Request | Make request status clearer so people stop asking support. |
| Request owner | Portal product owner |
| Copilot interview operator | Product analyst |
| Delivery reviewer | Delivery lead |
| Input classification checked | Yes, fictional training data |
| GitHub Copilot preflight | Passed |

## Round 1: problem frontier

| # | Decision | Recommendation | Owner answer |
| --- | --- | --- | --- |
| 1 | Affected user | Start with employees who submitted a request. | Accepted. |
| 2 | Current pain | Focus on update contacts caused by missing status context. | Accepted. |
| 3 | Target outcome | Let requesters understand current progress without contacting the service desk. | Revised: include the last updated time so requesters can judge freshness. |

GitHub Copilot used these confirmed answers to open the scope and current-state frontier.

## Round 2: scope and constraints frontier

| # | Decision | Recommendation | Owner answer |
| --- | --- | --- | --- |
| 1 | Request types | Include facilities and equipment requests in the first release. | Accepted. |
| 2 | Visible information | Show a public status, last updated time, and safe summary. | Accepted. |
| 3 | Notifications | Exclude email and chat notifications. | Accepted. |
| 4 | Protected data | Never show internal notes, agent names, or security details. | Accepted. |

The learner gave GitHub Copilot approved evidence that the portal stores an internal state and updated timestamp. The public status mapping still needs service review.

## Round 3: success and failure frontier

| # | Decision | Recommendation | Owner answer |
| --- | --- | --- | --- |
| 1 | Success measure | Reduce status-chasing contacts for included request types by 25% within six weeks. | Revised to 20% because the current baseline is small. |
| 2 | Coverage | Every included request shows a supported public status or an explicit fallback. | Accepted. |
| 3 | Stale state | Show "Update pending" when the source timestamp is more than two business days old. | Accepted for pilot; service owner will confirm the threshold. |
| 4 | Permission failure | Show no request details when the signed-in user is not the requester. | Accepted. |

## Round 4: ownership and approval frontier

| # | Decision | Recommendation | Owner answer |
| --- | --- | --- | --- |
| 1 | Work owner | Portal product owner owns the item. | Accepted. |
| 2 | State mapping | Service operations manager owns public wording and mapping. | Accepted. |
| 3 | Data review | Privacy reviewer checks exposed fields and access behavior. | Accepted. |
| 4 | Release approval | Portal product owner approves after service and privacy reviews pass. | Accepted. |

## Branch closure

| Branch | Result | Owner | Status |
| --- | --- | --- | --- |
| Scope | Facilities and equipment requests; web status view only | Portal product owner | Settled |
| Constraints | Reuse existing state and timestamp; hide protected fields | Delivery team | Settled |
| Success | 20% fewer status contacts within six weeks; full supported-state coverage | Portal product owner | Settled |
| Failure | No cross-user exposure; stale and unmapped states use safe fallbacks | Privacy reviewer | Settled |
| Ownership | Product owner owns work; service manager owns mapping | Named roles | Settled |
| Approval | Service and privacy reviews before product approval | Portal product owner | Settled |

## Shared understanding

The request owner confirmed the Copilot summary. One implementation detail remains:
the service operations manager must approve the two-business-day stale threshold
before release. It does not block backlog refinement.

## Reopened branch: visibility constraint

Approved late evidence established different visibility for request submitters and
support staff.

| # | Decision | Recommendation | Owner answer |
| --- | --- | --- | --- |
| 1 | Requester visibility | Show only public status, latest update date, and approved public summary. | Accepted. |
| 2 | Support visibility | Allow support staff to view the detailed status reason through their existing authorized view. | Accepted. |
| 3 | Protected details | Keep internal notes, queue names, staff identities, and escalation details hidden from requesters. | Accepted. |

The first-release users, request types, notification exclusion, ownership, and
approval path did not change.
