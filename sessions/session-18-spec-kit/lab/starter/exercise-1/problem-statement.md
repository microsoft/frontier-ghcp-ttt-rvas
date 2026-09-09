# Exercise 1: Problem Statement

## User API — Create, Read, Update Users

### Requirement

Build a REST API that creates, reads, and updates user records.

### User Model

Each user has:

- `id` (UUID, auto-generated)
- `email` (string, must be valid email format, must be globally unique)
- `name` (string, 1–100 characters)
- `createdAt` (ISO-8601 timestamp, auto-generated)
- `updatedAt` (ISO-8601 timestamp, auto-updated on every change)

### Endpoints to Implement

1. **Create User** — `POST /users`
   - Request: `{ email, name }`
   - Response: `{ id, email, name, createdAt, updatedAt }`
   - Validation: Email must be valid format; name 1–100 chars
   - Error: 400 if validation fails; 409 if email already exists

2. **Get User** — `GET /users/{id}`
   - Request: None (id in URL)
   - Response: `{ id, email, name, createdAt, updatedAt }`
   - Error: 404 if user not found

3. **List Users** — `GET /users`
   - Request: Query params `?limit=20&offset=0`
   - Response: `{ users: [...], total: N, limit, offset }`
   - Default limit: 20, max limit: 100

4. **Update User** — `PATCH /users/{id}`
   - Request: `{ email?, name? }` (at least one field)
   - Response: Updated user object
   - Validation: Same as create
   - Error: 400 if validation fails; 404 if not found; 409 if email duplicate

### Success Criteria

- [ ] All 4 endpoints implemented
- [ ] Input validation works (email format, name length)
- [ ] Unique email constraint enforced
- [ ] All status codes correct (200, 201, 400, 404, 409)
- [ ] Response format consistent across all endpoints
- [ ] Generated code passes `specify check`

### Your task

Use `specify-cli` and Copilot to:

1. Create a formal specification for the API
2. Use Copilot to suggest specification sections
3. Generate code that implements the specification
4. Verify specification compliance with `specify check`

### Hints

- Start with the Constitution phase: "Standardized user record API"
- In the Specify phase, define every endpoint and request/response format.
- In the Clarify phase, resolve duplicate emails, invalid formats, and missing users.
- For Plan, Checklist, and Tasks, estimate effort, list deliverables, and break the work into tasks.
- In Implement, let Copilot generate code.
- In Converge, verify that the code matches the specification.

### Time: 30 minutes
