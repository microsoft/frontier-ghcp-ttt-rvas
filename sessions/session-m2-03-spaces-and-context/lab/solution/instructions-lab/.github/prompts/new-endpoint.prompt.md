---
description: "Generate a new REST endpoint following team standards"
---

Create a REST endpoint with:

1. A route handler using `async`/`await` and `try`/`catch`
2. Input validation through the model's static `validate()` method
3. The correct HTTP status: 200 for success, 201 for creation, 400 for validation, 404 when absent, and 500 for a server error
4. Errors shaped as `{ error: { code, message, details } }`
5. `{ data: ... }` for one item and `{ data: [...], total: N }` for a list
6. At least three Vitest cases: success, validation error, and not found

Use ES module imports. Use kebab-case file names and camelCase functions.

The endpoint should be for: {{ endpoint_description }}
