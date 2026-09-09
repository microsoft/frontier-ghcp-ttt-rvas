# Project Coding Standards

## Language & Style

- Use CommonJS syntax (require/module.exports) to match the existing project
- Use `async`/`await` for asynchronous operations. Do not use `.then()` chains.
- Use `const` by default. Use `let` only for reassignment. Do not use `var`.

## Express Patterns

- Route handlers must use `async`/`await` and `try`/`catch`.
- Return errors as `{ "error": { "code": "ERROR_CODE", "message": "..." } }`.
- Validate request bodies with a dedicated validation function.
- Use the correct HTTP status: 200, 201, 400, 404, or 500.

## Naming Conventions

- Files: kebab-case (user-routes.js)
- Functions: camelCase (getUserById)
- Constants: SCREAMING_SNAKE_CASE (MAX_PAGE_SIZE)
- Classes: PascalCase (ProductService)

## Response Format

- Wrap successful single-item responses in `{ "data": ... }`.
- Return lists as `{ "data": [...], "total": N }`.
- Return errors as `{ "error": { "code": "...", "message": "...", "details": [...] } }`.

## Testing

- Use Node.js's built-in test runner
- Test files go in test/ with a .test.js extension
- Every endpoint needs success, validation-error, and not-found tests.
