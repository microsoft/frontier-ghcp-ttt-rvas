# Worked Delivery-Readiness Canvas Contract

## Purpose

Track three synthetic work items until the assigned reviewer can inspect their evidence and make a readiness decision.

## Shared state

| Field | Type | Rule |
| --- | --- | --- |
| `id` | string | Stable synthetic ID |
| `item` | string | Short synthetic work-item name |
| `status` | enum | `planned`, `in-progress`, `review`, or `ready` |
| `reviewFlag` | boolean | Marks items that need reviewer attention |
| `evidence` | string | Required before `ready` |

## Human actions

1. Add evidence to one named item.
2. Set the status of one named item.
3. Set or clear the review flag on one named item.

## Agent-callable capabilities

1. Read the current board.
2. Update the status of one named item.
3. List items whose review flag is set.

## Validation

- Unknown IDs are rejected.
- Unknown statuses are rejected.
- `ready` without evidence is rejected.
- Rejected actions leave state unchanged.

## Boundary and ownership

- Data: supplied synthetic items only.
- External systems and writes: none.
- Owner: Training canvas owner.
- Reviewer: Assigned peer reviewer.
- Manual fallback: local contract harness and JSON state.
- Retirement trigger: end of lab or loss of an accountable owner.
