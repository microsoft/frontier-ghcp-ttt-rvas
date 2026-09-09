# API Design Patterns

## When to use

Use for REST endpoint changes, API-convention questions, or reviews under `src/api/`.

## Conventions

Use the repository response wrappers, plural resource paths, kebab-case multi-word paths, and query parameters for filtering. Validate input at the route boundary. Return `200`, `201`, `204`, `400`, `404`, `409`, and `500` according to the existing contract. Never expose stack traces.

## Validation

Add focused success and failure tests. Check response shape, status code, input validation, and error details before review.

## Anti-patterns

- Do not send plain-text errors or mix response formats.
- Do not return a body with `204`.
- Do not invent fields or endpoints.

**Confidence:** high
