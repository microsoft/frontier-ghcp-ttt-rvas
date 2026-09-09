# Exercise 1 Solution

This solution contains a complete User API built from a specification.

## Structure

- `.specify.yml` — Full specification configuration
- `.specify/` — All nine phases completed
- `src/users-api.js` — Generated Express.js code
- `src/users-api.test.js` — Focused tests

## What this solution covers

1. **All nine phases** — Each phase builds on the previous one.
2. **Copilot integration points** — Comments show where Copilot helped.
3. **Code generation** — The generated code matches the specification exactly.
4. **Tests** — Tests cover endpoints, validation, and error cases.
5. **Specification compliance** — The solution passes `specify check`.

## Key Files to Compare

### Constitution Phase

- Problem: "Standardized user record API"
- Scope: 4 endpoints (create, read, list, update)
- Non-goals: Authentication, authorization (v2 feature)

### Specification Phase

- 4 endpoints with full request/response definitions
- Validation rules for email format, name length, and uniqueness
- Status codes: 200, 201, 400, 404, and 409
- A consistent response envelope across all endpoints

### Implementation Phase

- An Express.js server with four route handlers
- Input validation with ajv (JSON Schema validation)
- Error handling with semantic status codes
- An in-memory data store (production would use a database)

### Convergence Phase

- All endpoints match specification
- Tests validate specification compliance
- No deviations or gaps

## Use this solution

1. **Read `.specify/constitution.md`** to see how the solution frames the problem.
2. **Compare it with your constitution** to find missed scope.
3. **Read `.specify/specification.yml`** for the formal specification.
4. **Compare the endpoints** and confirm that request and response formats match.
5. **Review `src/users-api.js`** to inspect the generated code.
6. **Review the validation logic** and compare its error handling with yours.

## Running the Solution

```bash
# Install dependencies (if not already done)
npm install

# Start the API server
npm start

# In another terminal, run tests
npm test

# Verify specification compliance
specify check . --against .specify/specification.yml --verify-code src/users-api.js
```

## Expected Test Output

```
✓ All 4 endpoints implemented
✓ Input validation working
✓ Status codes correct
✓ Response format consistent
✓ Specification compliance verified
```

## What to carry forward

1. Specifications are **executable contracts**. Code can be generated from them.
2. **Consistency matters.** All endpoints use the same response format and error handling.
3. **Validation matters.** Most bugs are validation edge cases rather than happy-path logic.
4. **Tests verify compliance.** They show that code matches the specification, not only that it works.

## Apply this with your team

- Use this as a template for the next API.
- Copy the validation pattern (ajv + JSON Schema).
- Adopt the response format (data + meta + errors).
- Run `specify check` before shipping.
