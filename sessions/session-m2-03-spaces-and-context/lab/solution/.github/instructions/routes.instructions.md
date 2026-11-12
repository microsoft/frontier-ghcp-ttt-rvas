---
applyTo: "src/routes/**/*.js"
---

- Wrap each handler in `try`/`catch` and return a 500 `INTERNAL_ERROR` on failure.
- Register fixed paths such as `/low-stock` before `/:id` routes.
- Parse query parameters yourself and return 400 `VALIDATION_ERROR` for bad values.
