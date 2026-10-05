# Service Request Portal: Orchestration Plan

**Parent objective:** Decide whether the status-visibility issue set is ready for
delivery follow-up. Produce `delivery-status-record.md` without production access
or publication.

**Human decision owner:** Product owner

**Approved sources:** Session 22 `issue-handoff.md`, Session 23
`canvas-handoff.md`, and `scenario-source-brief.md`

**Shared artifact:** `delivery-status-record.md`

**Live-use guard:** Maximum four child sessions, 30 minutes, and the approved plan
meter.

## Workstreams

| ID | Bounded question | Approved inputs | Required packet | Exclusions | Stop condition | Reviewer |
| --- | --- | --- | --- | --- | --- | --- |
| WS-01 | Is the public status mapping ready for owner approval? | SV-01 and mapping issue | Proposed vocabulary, evidence, open decisions | No internal states or queue names | Mapping needs restricted data or an invented state | Product owner |
| WS-02 | Is issue `#241` ready for implementation review? | SV-02 and issue `#241` | Field checklist, evidence, ownership gaps | No completion forecast or notification scope | A claim lacks an approved issue field | Delivery reviewer |
| WS-03 | Are empty and stale states testable? | SV-03 and fallback issue | Scenario checklist and open gaps | No response-time promise | A criterion depends on an unsupported commitment | Service reviewer |
| WS-04 | Is requester access evidence ready? | SV-04 and access issue | Access checklist, evidence gaps, recommendation | No production records or identities | Production or personal data is requested | Privacy reviewer |

## Independence check

- [x] Each workstream maps to one Session 22 issue role.
- [x] No child session waits for another child session.
- [x] Only the product owner edits `delivery-status-record.md`.
- [x] Every workstream has a hard stop condition.
- [x] A person reviews every result.

## Live child sessions

Record real links or identifiers during the lab.

| Workstream | Session link or identifier | Started at | Current action |
| --- | --- | --- | --- |
| WS-01 | `<live-session-id>` | `<time>` | Wait |
| WS-02 | `<live-session-id>` | `<time>` | Redirect |
| WS-03 | `<live-session-id>` | `<time>` | Wait |
| WS-04 | `<live-session-id>` | `<time>` | Stop |

## Parent instructions

```text
/orchestrate Review the four Service Request Portal status-visibility workstreams
in the approved orchestration plan. Keep the workstreams independent. Use only
the Session 22 issue handoff, Session 23 canvas handoff, and supplied synthetic
source brief. Return one result per workstream. Do not access production,
publish content, contact people, or change systems.
```
