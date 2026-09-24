# Service Request Portal Release-Readiness Contract

## Purpose

Keep delivery work and release evidence in one reviewable artifact. The canvas supports planning and release decisions. It does not deploy, merge, approve production access, or change an external system.

## Authoritative state

The live prepared canvas is authoritative during the lab. `release-state.json` supplies the initial seed only.

| Collection | Required fields |
| --- | --- |
| Release | Name, target date, scope |
| Work items | ID, title, status, owner, evidence IDs |
| Risks | ID, title, impact, owner, severity, status, mitigation |
| Decisions | ID, summary, rationale, owner, status |
| Gates | ID, label, status, owner, evidence IDs |
| Evidence | ID, type, summary, location, reviewer, result |
| Ownership | Artifact owner, reviewer, recovery procedure, removal trigger, stop conditions |

## Allowed values

- Work status: `planned`, `in-progress`, `review`, `ready`, `removed`
- Risk severity: `low`, `medium`, `high`
- Risk status: `open`, `mitigated`, `closed`
- Decision status: `proposed`, `accepted`, `deferred`
- Gate status: `pending`, `passed`, `blocked`, `waived`
- Evidence result: `accepted`, `rejected`, `not-run`
- Readiness: `go`, `conditional`, `no-go`

## Human actions

1. Inspect the full state.
2. Add or revise a work item.
3. Add evidence and link it to work or a gate.
4. Record or revise a risk.
5. Record or revise a decision.
6. Change a gate after reviewing evidence.
7. Record ownership and the review result.

## Copilot actions

GitHub Copilot may see different capability names in the prepared canvas. Map them to these bounded actions:

| Logical action | Rule |
| --- | --- |
| `get_release_state` | Return the current state without mutation |
| `update_work_item` | Change one named item |
| `record_risk` | Add or update one named risk |
| `record_decision` | Add or update one decision |
| `set_gate_status` | Change one gate with linked evidence |
| `add_evidence` | Add one evidence record |

No action may deploy, merge, send a message, change access, or call an external system.

## Validation rules

1. Reject unknown IDs and values.
2. A work item can move to `ready` only when it links at least one `accepted` evidence record.
3. A gate can move to `passed` or `waived` only when it links accepted evidence.
4. An accepted decision needs a non-empty owner and rationale.
5. A mitigated risk needs a non-empty mitigation.
6. Each accepted mutation increments `revision` once.
7. A refused action changes no field, including `revision`.
8. A Copilot action may change only the fields named in the request.

## Readiness rule

Evaluate in this order:

1. `no-go` when any required gate is `blocked`.
2. `conditional` when a required gate is `pending`, any risk is `open`, or any in-scope work item is not `ready`.
3. `go` when every required gate is `passed` or `waived`, no risk is open, and every in-scope work item is ready.

The release owner makes the decision. The readiness value is decision support.

## Data and policy boundary

- Use synthetic data only.
- Do not add secrets, personal data, customer data, or production evidence.
- Do not install packages or connect external systems.
- Use only approved prepared canvas actions.
- Use GitHub Copilot to inspect, change, and verify the shared state.
- Stop when policy, ownership, scope, or evidence is unclear.

## Recovery procedure

If the canvas fails after a successful preflight, stop all changes. Reopen the same approved canvas, ask Copilot to read the state without mutation, and compare the reported revision with the visible state. Resume only when they match.

This procedure restores an interrupted session. It applies only when GitHub Copilot and the approved canvas passed preflight.

## Ownership requirement

Approval requires an artifact owner, reviewer, recovery procedure, removal trigger, stop conditions, and next safe action.
