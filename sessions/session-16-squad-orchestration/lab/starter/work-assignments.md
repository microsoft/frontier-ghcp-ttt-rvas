# Issue 001 Work Assignment

Use this sheet for the live or tabletop route.

## Issue

**Add input validation to `POST /api/users`.**

## Role boundaries

| Role | Owns | Must not do |
| --- | --- | --- |
| Lead | Assignment and final review | Edit implementation or test files |
| Backend | `src/routes/api.js` | Add packages or edit unrelated routes |
| Tester | `tests/api.test.js` and test evidence | Change source to make a test pass |
| Scribe | `.squad/decisions.md` or tabletop decision record | Change the lead's decision |

## Assignment

```text
Assign Issue 001 to the backend role.

Implement validation for POST /api/users in src/routes/api.js.
Accept a non-empty string name up to 100 characters and a valid email shape.
Return status 400 with a descriptive error for invalid input.
Do not add dependencies, change the response envelope, or edit unrelated routes.

The tester owns focused evidence in tests/api.test.js.
The lead reviews the final packet.
Stop if ownership overlaps, scope grows, or any test fails.
```

## Evidence fields

- Assignment owner:
- Implementation owner:
- Test owner:
- Reviewer:
- Permitted source file:
- Permitted test file:
- Non-goals:
- Test command:
- Stop conditions:
- Final decision:
