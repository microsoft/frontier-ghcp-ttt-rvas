# Issue 001 Tabletop Review Packet

This packet is the no-tool equivalent of the reference `.squad/` workflow.

## Assignment

- **Lead:** Assigned Issue 001.
- **Backend:** Owns `src/routes/api.js`.
- **Tester:** Owns `tests/api.test.js` and test evidence.
- **Scribe:** Records the accepted decision.
- **Stop conditions:** Ownership overlap, scope growth, failed tests, or a changed
  policy or data boundary.

## Implementation

The backend learner added inline name and email validation. No dependency, model,
response-envelope, or unrelated route changed.

## Test evidence

```text
Command: npm test
Result: PASS
Suites: 1 passed
Tests: 7 passed
```

## Lead review

**Approve.** Every acceptance criterion has matching code and test evidence.

## Durable decision

Record D-001 from `.squad/decisions.md`. The issue may move to the reviewed column
and a human may close it.
