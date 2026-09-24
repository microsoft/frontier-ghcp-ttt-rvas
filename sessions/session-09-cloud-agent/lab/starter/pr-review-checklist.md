# Human Review Checklist

## Issue contract

- [ ] The proposal addresses the same `Reject blank task titles` issue.
- [ ] The acceptance criteria did not change during implementation.
- [ ] The reviewer is named.

## Scope

- [ ] Only `src/app.js` and `tests/app.test.js` changed.
- [ ] No dependency, configuration, or generated file changed.
- [ ] No unrelated endpoint or refactor is included.

## Behavior

- [ ] Missing, empty, and whitespace-only titles return HTTP 400.
- [ ] The error body is `{ "error": "title is required" }`.
- [ ] Valid task creation preserves the existing response fields.
- [ ] Priority behavior is unchanged.

## Tests

- [ ] `npm test` was run against the reviewed proposal.
- [ ] Focused invalid-title tests pass.
- [ ] A valid-title regression test passes.
- [ ] Existing endpoint tests pass.
- [ ] Failures, skipped tests, or missing evidence are recorded.

## Safety and reviewability

- [ ] No credential or non-synthetic data appears.
- [ ] The diff is small enough to review against the issue.
- [ ] Session or manual evidence is linked in the checkpoint record.

## Decision

- Reviewer:
- Decision: approve / request changes / pause
- Reason:
- Required correction or next safe action:
