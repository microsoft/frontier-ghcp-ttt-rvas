# Reject blank task titles

## Problem

`POST /api/tasks` accepts a missing, empty, or whitespace-only title and creates an `Untitled` task. The endpoint should reject those requests.

## Acceptance criteria

- [x] A missing title returns HTTP 400.
- [x] An empty title returns HTTP 400.
- [x] A whitespace-only title returns HTTP 400.
- [x] Each invalid request returns `{ "error": "title is required" }`.
- [x] A valid title still returns HTTP 201 with the existing response fields.
- [x] The supplied test suite passes.

## Files in scope

- `src/app.js`
- `tests/app.test.js`

## Non-goals

No other endpoint, dependency, priority rule, configuration file, or storage behavior changed.
