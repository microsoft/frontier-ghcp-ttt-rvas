# Optional Feature Workbench Contract

## Purpose

Review synthetic CI results for one feature and prepare a human test-gate
decision. This variant does not connect to a repository or CI service.

## Shared state

| Field | Rule |
| --- | --- |
| `featureId` | Fixed to `FEAT-204` |
| `checks` | Read from `feature-workbench-sample.json` |
| `proposal` | `pass`, `hold`, or `rerun` |
| `reviewerDecision` | Set only by the named human reviewer |
| `evidence` | Names the required checks and their observed results |

## Human actions

- Acknowledge a check result.
- Request a gate evaluation.
- Record the final decision and rationale.

## Agent-callable capabilities

- Read the synthetic check list.
- List failed or missing required checks.
- Propose `pass`, `hold`, or `rerun`.

## Validation

- Every required check must be present.
- A `pass` proposal requires every required check to have status `passed`.
- A failed required check produces `hold`.
- The agent cannot set `reviewerDecision`.

## Boundary

Use the supplied synthetic JSON only. The workbench cannot merge code, trigger a
workflow, deploy software, or call an external system.
