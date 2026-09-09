# Bookmark API — Copilot Instructions

## Project

Node.js Express API that manages bookmarks.

## Code Style

- Use async/await (no callbacks)
- Use `const` unless a variable needs reassignment
- Error responses: `{ error: { code: 'ERROR_CODE', message: '...' } }`
- Success responses: `{ data: { ... } }`
- All endpoints must have input validation
- All new features must have tests (Jest + Supertest)

## Error Codes

- VALIDATION_ERROR — invalid input
- NOT_FOUND — resource doesn't exist
- CONFLICT — duplicate resource
- INTERNAL_ERROR — unexpected server error

## File layout

- Routes: `src/routes/`
- Models: `src/models/`
- Middleware: `src/middleware/`
- Tests: `tests/`

## Testing

- Use Jest with Supertest for API tests
- Test success and error cases
- Aim for more than 80% coverage
