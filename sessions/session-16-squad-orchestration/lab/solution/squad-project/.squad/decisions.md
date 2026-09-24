# Durable Decisions

## D-001: Validate user creation at the route boundary

- **Date:** 2026-09-24
- **Owner:** Lead
- **Recorded by:** Scribe
- **Decision:** Approve Issue 001. `POST /api/users` now trims names, rejects empty
  or non-string names, rejects names longer than 100 characters, and rejects
  malformed email values.
- **Boundary:** The change is limited to `src/routes/api.js` and
  `tests/api.test.js`. No package, model, or response-envelope change was accepted.
- **Evidence:** `npm test` passed all baseline and validation cases. See
  `.squad/reviews/issue-001-review.md`.
- **Rejected option:** Adding a validation package. The issue required no new
  dependency and the rules are small.
