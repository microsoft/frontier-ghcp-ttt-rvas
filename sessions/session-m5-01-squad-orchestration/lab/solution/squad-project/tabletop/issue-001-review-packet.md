# Issue 001 prepared trainer review packet

Use this packet when the trainer demonstration stalls. It illustrates the
reference `.squad/` workflow but does not replace a learner Squad run.

## Assignment

- **Lead:** Assigned Issue 001.
- **Backend:** Owns `src/routes/api.js`.
- **Tester:** Owns `tests/api.test.js` and test results.
- **Scribe:** Records the accepted decision.
- **Stop conditions:** Ownership overlap, scope growth, failed tests, or a changed
  policy or data boundary.

## Implementation

The backend learner added inline name and email validation. No dependency, model,
response-envelope, or unrelated route changed.

## Test results

```text
Command: npm test
Result: PASS
Suites: 1 passed
Tests: 7 passed
```

## Lead review

**Approve.** Every acceptance criterion has matching code and test results.

## Recorded decision

Record D-001 from `.squad/decisions.md`. The issue may move to the reviewed column
and a human may close it.
