# Storefront Product API

Express REST API for a product catalog. In-memory data. Synthetic project.

## Code

- Use ES modules (`import`/`export`), never `require`.
- Put each resource's routes in its own file in `src/routes/`. Name files in kebab-case.
- Validate input with the model's static `validate()` method before changing data.
- Return `{ data }` on success and `{ error: { code, message, details } }` on failure.
- Don't add dependencies without asking.

## Tests

- Use `node:test` and `node:assert/strict`. No Jest, Mocha, or Supertest.
- Start the app with `NODE_ENV=test`, import `app` from `src/app.js`, and call it with `fetch` on a random port.
- `npm test` must run the whole suite.
