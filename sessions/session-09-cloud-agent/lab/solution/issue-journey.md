# Completed Issue Journey

## Checkpoint 1: Issue contract

- Issue: `Reject blank task titles`
- Changed behavior: missing, empty, and whitespace-only titles return HTTP 400.
- Preserved behavior: valid task creation and priority handling.
- Allowed files: `src/app.js`, `tests/app.test.js`.
- Required command: `npm test`.
- Reviewer: assigned human reviewer.

## Checkpoint 2: Setup

- Route: prepared manual evidence; the same record can support an approved live route.
- Baseline: starter tests passed.
- Repository instructions: reviewed.
- Setup workflow: single `copilot-setup-steps` job with read-only contents permission.
- Stop condition: any broader file, dependency, permission, or data requirement.

## Checkpoint 3: Proposed change

- Files changed: `src/app.js`, `tests/app.test.js`.
- Added one validation guard.
- Added focused missing, empty, and whitespace tests.
- Added a valid-title regression assertion.
- Dependency and configuration changes: none.

## Checkpoint 4: Tests

```text
Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
```

The recorded result is prepared evidence. Run `npm test` in `sample-project/` to reproduce it.

## Checkpoint 5: Human decision

- Decision: approve.
- Reason: the diff stays within scope, all criteria have test evidence, and valid behavior is preserved.
- Next safe action: use the normal repository review and merge policy if this were a live training pull request.
