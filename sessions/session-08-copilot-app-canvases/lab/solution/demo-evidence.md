# Completed Demo Evidence

## Route

- Access route: approved sandbox or prepared manual route
- Data: `prepared-items.json`
- External systems: none

## Accepted change 1

- Actor: human through a visible control
- Item: `WEB-318`
- Before: `review`
- After: `ready`
- Evidence present: `preview://empty-state`

## Accepted change 2

- Actor: agent-requested capability
- Item: `API-204`
- Before: `in-progress`
- After: `review`
- Other items changed: none

## Rejection

- Request: move `DOC-101` to `ready`
- Result: `Rejected: evidence is required before ready`
- State after rejection: `planned`

## Recovery

- Correction: add `docs://operator-guide-review`
- Retry: move `DOC-101` to `ready`
- Result: accepted
- Rule removed or weakened: no

## Human decision

- Decision: approve
- Reason: final state matches the contract and the rejection left state unchanged.
