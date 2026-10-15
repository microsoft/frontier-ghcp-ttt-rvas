# Issue 001 Lead Review

**Decision:** Approve

## Acceptance criteria

- [x] A name must be a non-empty string after trimming.
- [x] Names longer than 100 characters return status 400.
- [x] A malformed email returns status 400.
- [x] Errors are descriptive and keep the existing response envelope.
- [x] Focused tests cover every rule.

## Boundary review

- Changed source: `src/routes/api.js`
- Changed tests: `tests/api.test.js`
- New dependencies: none
- Unrelated routes changed: none

## Test evidence

```text
Command: npm test
Result: PASS
Suites: 1 passed
Tests: 7 passed
```

## Lead note

The implementation matches Issue 001 and keeps the write boundaries intact. The
scribe may record the decision and the human reviewer may close the issue.
