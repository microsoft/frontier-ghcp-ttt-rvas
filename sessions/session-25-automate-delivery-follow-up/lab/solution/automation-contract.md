# Automation Contract: Service Request Portal Weekly Status

## Contract identity

| Field | Value |
| --- | --- |
| Contract ID | `SRP-WEEKLY-STATUS` |
| Version | `1.0` |
| Effective date | September 18, 2026 |
| Review date | October 16, 2026 |
| Cadence | Weekly after separate scheduling approval |
| Status | Approved for two manual, draft-only test runs |

## Purpose

Prepare an internal weekly status draft from approved Service Request Portal training records. The draft helps the product owner review throughput, active work, blocked work, and data exceptions.

## Accountability

| Role | Named role or person |
| --- | --- |
| Accountable owner | Product owner |
| Run reviewer | Delivery lead |
| Escalation contact | Operations lead |
| Backup owner | Product analyst |

## Autonomy and approval

| Field | Decision |
| --- | --- |
| Autonomy level | A1: Draft |
| Approval level | Human approval required for every use |
| Actions that require human approval | Accepting the draft and preparing stakeholder distribution |
| Actions never delegated | Publishing, messaging, editing requests, changing labels, or approving the run |

## Allowed inputs

1. `synthetic-service-requests.csv`, classified as synthetic. Each accepted record must contain request ID, category, state, owner alias, due date, and summary.
2. `synthetic-change-log.md`, classified as synthetic and limited to the reporting period.
3. This contract.

## Prohibited inputs

Customer records, production exports, secrets, personal data, private messages, support transcripts, unrestricted repository content, and any source without owner approval.

## Allowed outputs

1. One local markdown status draft.
2. One local JSON run evidence packet.
3. One local exception list inside those artifacts.

## Prohibited outputs and side effects

The workflow may not post, send messages, change source records, write to a repository, call an external service, invent missing values, or hide rejected records.

## Required evidence

- Contract ID and version
- Run ID, trigger, start time, and end time
- Input names, classifications, and source counts
- Accepted and rejected counts with reasons
- Status counts derived from accepted records
- Output artifact names
- Tools and side effects
- GitHub Copilot surface and available usage evidence
- Validation results and unresolved exceptions

## Acceptance rules

The reviewer may accept the draft when counts reconcile, each claim traces to accepted records, rejected records are explicit, no prohibited action occurred, usage status is recorded, and every exception has an owner and next action.

## Rejection and pause rules

Reject a run with incorrect counts, invented details, hidden exclusions, missing evidence, or prohibited side effects. Pause when policy, data classification, meter access, ownership, or the stop path is unresolved.

## Meter

| Field | Decision |
| --- | --- |
| Meter source | Current approved GitHub Copilot usage and compute view |
| Budget or run limit | Two manual test runs, maximum 12 minutes each |
| Observer | Delivery lead |
| Alert condition | Meter unavailable, approved limit reached, or unexpected usage |

## Stop guard

Stop when an input is outside the allowed list, required data is missing, a tool
or side effect exceeds the contract, the meter is unavailable, either run reaches
12 minutes, or the owner cannot review the result.

## Recovery procedure

Stop the automation and preserve its prompt, output, and evidence packet. The product owner assigns the exception, keeps stakeholder distribution on hold, and returns to the last approved operating method for urgent work. The delivery lead approves any restart.

## Change control

The product owner may propose contract changes. The delivery lead approves changes. A2 or A3 autonomy also needs the roles responsible for the affected system and data to approve the new boundary.
