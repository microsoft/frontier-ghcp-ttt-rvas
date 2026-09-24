# Repository Instructions

## Project

This synthetic Node.js 20 project exposes an in-memory task API with Express. Tests use Jest and Supertest.

## Scope for the training issue

- Change only `src/app.js` and `tests/app.test.js`.
- Reject missing, empty, or whitespace-only task titles.
- Preserve the existing response shape for valid task creation.
- Keep the existing priority behavior.

## Constraints

- Add no dependency.
- Change no other endpoint.
- Use the existing error response shape: `{ "error": "<message>" }`.
- Use synthetic data only.
- Never add credentials or external service calls.

## Validation

Run:

```bash
npm test
```

Report the command result accurately. Stop and ask for clarification if the issue requires broader scope.
