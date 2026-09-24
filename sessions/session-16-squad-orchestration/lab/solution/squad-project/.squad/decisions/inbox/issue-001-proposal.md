# Issue 001 Assignment Proposal

- **Issue:** Add input validation to `POST /api/users`
- **Assigned by:** Lead
- **Implementation owner:** Backend
- **Test owner:** Tester
- **Reviewer:** Lead
- **Decision recorder:** Scribe

## Accepted scope

- Trim and validate `name`.
- Reject names longer than 100 characters.
- Validate a basic email shape.
- Return status 400 with a descriptive error.
- Add focused tests.

## File boundaries

- Backend: `src/routes/api.js`
- Tester: `tests/api.test.js`

## Non-goals

- No dependency, model, response-envelope, or unrelated route change.

## Stop conditions

Stop for overlapping ownership, scope growth, failed tests, or an unclear approved
tool or data boundary.
