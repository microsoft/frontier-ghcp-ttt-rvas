# Reject blank task titles

## Problem

`POST /api/tasks` accepts a missing, empty, or whitespace-only title and creates an `Untitled` task. The endpoint should reject those requests.

## Acceptance criteria

- [ ] A missing title returns HTTP 400.
- [ ] An empty title returns HTTP 400.
- [ ] A whitespace-only title returns HTTP 400.
- [ ] Each invalid request returns `{ "error": "title is required" }`.
- [ ] A valid title still returns HTTP 201 with `id`, `title`, `priority`, `completed`, and `createdAt`.
- [ ] The supplied test suite passes.

## Files in scope

- `src/app.js`
- `tests/app.test.js`

## Non-goals

- Do not change another endpoint.
- Do not add a dependency.
- Do not change the priority rules.
- Do not refactor storage or routing.
- Do not edit configuration or generated files.

## Required check

```bash
npm test
```

## Review and stop condition

A named human reviewer must inspect the diff and test output before approval. Stop if the task requires another file, a new dependency, broader permissions, or non-synthetic data.
