# Service Request Portal: Orchestration Plan

**Parent objective:** Decide whether the Service Request Portal release is ready for the release-review meeting. Produce a short evidence record without changing production systems or publishing release claims.

**Human decision owner:** Release manager

**Approved sources:** Sanitized change summary, test report, support checklist, tabletop record, and approval log

**Shared artifact:** `release-readiness-record.md`

**Live-use guard:** Maximum four child sessions, 30 minutes, and the approved plan meter.

## Workstreams

| ID | Bounded question | Approved inputs | Required packet | Exclusions | Stop condition | Reviewer |
| --- | --- | --- | --- | --- | --- | --- |
| WS-01 | Which user-visible changes are supported? | Change summary and test report | Draft notes with references | No adoption or performance claims | A claim lacks an approved source | Release manager |
| WS-02 | What does support need before launch? | Support checklist | Readiness checklist with owners and gaps | No invented SLA or policy | The work needs an unsupported commitment | Support lead |
| WS-03 | What could block or delay release? | Tabletop record and approval log | Risk register with go/no-go conditions | No guessed likelihood or impact | A rating requires speculation | Release manager |
| WS-04 | Which approved answers can be prepared? | Sanitized change summary and support checklist | FAQ with references and open questions | No production or personal data | Restricted data is required | Communications reviewer |

## Independence check

- [x] Each workstream can start from the approved inputs.
- [x] No child session must wait for another child session.
- [x] Only the release manager edits the shared artifact.
- [x] Every workstream has a hard stop condition.
- [x] A person reviews every result.
- [x] GitHub Copilot created and coordinates every child session.

## Live child sessions

Record real links or identifiers here. These placeholders show the format and
cannot replace live sessions.

| Workstream | Session link or identifier | Started at | Current action |
| --- | --- | --- | --- |
| WS-01 | `<live-session-id>` | `<time>` | Wait |
| WS-02 | `<live-session-id>` | `<time>` | Redirect |
| WS-03 | `<live-session-id>` | `<time>` | Wait |
| WS-04 | `<live-session-id>` | `<time>` | Stop |

## Parent instructions

```text
/orchestrate Prepare release-review evidence for the fictional Service Request Portal.
Run WS-01 through WS-04 as independent workstreams using only the approved
sanitized sources. Return one result packet per workstream. Do not access
production, contact people, publish content, or change systems. Stop a
workstream when its listed stop condition occurs. The release manager will
review every packet and owns the final decision.
```
