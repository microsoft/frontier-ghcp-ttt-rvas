# GitHub Issue Proposal: Show Requesters the Current Status of Included Requests

## User and outcome

As an employee who submitted a facilities or equipment request, I want to see its
current public status and last updated time so that I can understand progress
without contacting the service desk.

## Context

The portal currently shows a reference number and title. Internal service states
and timestamps exist, but requesters cannot see them. GitHub Copilot drafted this
item from the approved decision brief. The request owner and delivery reviewer
checked the draft before marking it ready.

## Scope

### In scope

- Show an approved public status for facilities and equipment requests.
- Show the source last updated time.
- Show a safe summary when one is available.
- Preserve the detailed status reason for authorized support staff.
- Apply safe fallback behavior for unmapped or stale states.
- Enforce requester-only access.

### Non-goals

- Notifications through email, chat, push, or mobile channels.
- Changes to internal queue states or service workflows.
- Completion-date predictions or service-level commitments.
- Exposure of internal notes, assigned agent names, or security details.
- Support for other request types.

## Acceptance criteria

- [ ] A signed-in requester can view the approved public status and last updated time for each facilities or equipment request they submitted.
- [ ] A request with an approved safe summary shows that summary without internal notes, agent names, or security details.
- [ ] A user who does not own a request cannot see its status, timestamp, summary, or identifying details.
- [ ] A requester cannot see the detailed status reason, internal notes, queue
      names, staff identities, or escalation details.
- [ ] An authorized support user can view the detailed status reason through the
      existing support view.
- [ ] An internal state without an approved public mapping shows `Status unavailable` and the standard contact route.
- [ ] A request older than the approved freshness threshold shows `Update pending` and does not present the existing state as current.
- [ ] A request with no safe summary still shows its public status and last updated time without an empty summary panel.
- [ ] Request types outside facilities and equipment keep their current experience.

## Dependencies and risks

| Item | Owner | Effect |
| --- | --- | --- |
| Public state mapping | Service operations manager | Needed before final validation |
| Freshness threshold | Service operations manager | Needed before release approval |
| Access-rule validation | Privacy reviewer | Must pass before product approval |
| Contact route text | Portal product owner | Required for fallback state |

## Open questions

| Question | Owner | Must close before |
| --- | --- | --- |
| Is two business days the approved freshness threshold for both included request types? | Service operations manager | Release approval |

## Definition of done

- [ ] Every acceptance criterion has test or review evidence.
- [ ] The service operations manager approves the public state mapping and fallback wording.
- [ ] The privacy reviewer confirms requester-only access and the visible field set.
- [ ] Supported, unmapped, stale, empty-summary, and unauthorized states are covered.
- [ ] Requester and support visibility boundaries have focused evidence.
- [ ] The portal guidance explains the public statuses and contact route.
- [ ] No notification channel or additional request type entered the change.
- [ ] The delivery reviewer confirms that the Copilot draft matches the approved brief.
- [ ] The portal product owner reviews the evidence and records approval or required changes.

## Ownership

**Work item owner:** Portal product owner
**Delivery reviewer:** Delivery lead
**Release approver:** Portal product owner
