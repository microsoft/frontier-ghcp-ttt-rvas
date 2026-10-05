# Delivery Decision Studio: Initiative Context Brief

**Initiative:** Service Request Portal
**Decision owner:** Product owner

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

## Handoff to Session 21

- **Source path:** `docs/discovery/initiative-context-brief.md`
- **Decision owner:** Product owner
- **Open decisions:** Public status vocabulary and supported stale-state wording
- **Next action:** Run the `decision-interview` skill.
