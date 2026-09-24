# Copilot Working Brief

## Initiative

Make Service Request Portal status information understandable without exposing internal service details.

## Affected users

- Employees who submitted facilities or equipment requests.
- Support staff who answer status questions.

## Known facts

| Fact | Source |
| --- | --- |
| The portal lets employees submit and track requests. | `initiative-overview.md`, Product |
| Requesters contact support because internal status names are unclear. | `initiative-overview.md`, Current problem |
| Internal notes must remain hidden. | `initiative-overview.md`, Known constraints |
| The service system remains the source of record. | `initiative-overview.md`, Known constraints |
| Email and chat notifications are outside the first release. | `late-evidence.md`, approved additions |
| No approved baseline exists for status-related contacts. | `late-evidence.md`, approved additions |

## Assumptions and unknowns

| Item | State | Owner |
| --- | --- | --- |
| Which public status labels users understand | Unknown | Product owner with service operations |
| Baseline volume for status-related contacts | Unknown | Delivery lead |

## Non-goals

- Email and chat notifications.
- Changes to the internal service workflow.
- Exposure of internal notes or staff-only details.

## Relevant GitHub artifacts

- This working brief
- A decision brief after the owner interview
- GitHub issues created from the approved brief
- A planning canvas for delivery status and decisions

## Available Copilot capabilities

Record the capabilities visible in the learner's approved environment. Do not
assume every installation exposes the same skills, agents, MCP servers, canvases,
or automations.

## Next decision

Approve the public status vocabulary for the first release.

## Ownership

- **Decision owner:** Product owner
- **Reviewer:** Delivery lead
- **Review result:** Ready

## Revision record

| Evidence | Sections changed | Contradiction resolved | Commit |
| --- | --- | --- | --- |
| `late-evidence.md` | Users, facts, unknowns, non-goals, next decision | Notifications are no longer an open decision | `Update working brief with approved evidence` |

## Fresh-session verification

- **Session used only this brief:** Yes
- **Missing or ambiguous state:** Public status vocabulary remains an owner decision.
- **Final result:** Ready for the Session 21 decision interview.
