# Delivery-Readiness Canvas Brief

## Purpose

Track synthetic work items until a reviewer confirms they are ready.

## State

| Field | Allowed values or rule |
| --- | --- |
| Item | Short synthetic work-item name |
| Status | `planned`, `in-progress`, `review`, or `ready` |
| Review flag | `true` or `false` |
| Evidence | Required before status is `ready` |

## User actions

1. Add a work item.
2. Update its status.
3. Flag or clear review.

## Agent capabilities

1. Read the board.
2. Update the status of one named item.
3. List items that are flagged for review.

## Validation

- Reject an unknown status.
- Reject `ready` when evidence is empty.
- Reject an update when the named item does not exist.

## Boundary and ownership

- Data: synthetic examples only.
- External systems: none.
- Owner: ____________________
- Reviewer: ____________________
- Manual fallback: update this brief as a checklist.
- Retirement trigger: ____________________
