# Storefront API Instructions

- Use ES modules.
- Keep route handlers under `src/routes/`.
- Follow the `{ data: ... }` success envelope.
- Return errors as `{ error: { code, message, details? } }`.
- Use `Product.validate()` before product data changes.
- Add no dependency unless the task requires it and a reviewer approves it.
- Keep examples and tests on synthetic data.
