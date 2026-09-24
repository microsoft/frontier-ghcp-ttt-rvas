# Delivery-Readiness Canvas Contract

## Purpose

Track synthetic work items until a reviewer can inspect the evidence and decide whether each item is ready.

## Shared state

| Field | Type | Rule |
| --- | --- | --- |
| `id` | string | Stable synthetic ID; cannot be changed |
| `item` | string | Short synthetic work-item name |
| `status` | enum | `planned`, `in-progress`, `review`, or `ready` |
| `reviewFlag` | boolean | Set when a reviewer must inspect the item |
| `evidence` | string | Required before status can become `ready` |

## Human actions

1. Add evidence to one named item.
2. Set the status of one named item.
3. Set or clear the review flag on one named item.

## Agent-callable capabilities

1. Read the current board.
2. Update the status of one named item.
3. List items whose review flag is set.

## Validation

- Reject an item ID that is not present.
- Reject a status outside the allowed set.
- Reject `ready` when evidence is empty.
- Keep state unchanged after a rejected action.

## Boundary

- Data: synthetic examples from `prepared-items.json`.
- External systems: none.
- External writes: none.
- Dependencies: review any generated package before use.
- Owner: ____________________
- Reviewer: ____________________
- Manual fallback: use the local contract harness and JSON state.
- Retirement trigger: remove the training canvas after the lab or when no owner remains.
