# Backlog Items for Ralph

Create these five Exercise 4 issues for a monitored backlog.

> **Important:** Apply only the `squad` label. The lead assigns `squad:{member}` labels during triage.

---

## Issue 6: Add Rate Limiting

```bash
gh issue create --title "Add basic rate limiting to API" \
  --body "## Description
Protect the API from abuse by adding basic rate limiting.

## Acceptance Criteria
- [ ] Limit each IP to 100 requests per 15-minute window
- [ ] Return 429 status with 'Too Many Requests' message when exceeded
- [ ] Include Retry-After header in 429 responses
- [ ] Add tests for rate limiting behavior

## Technical Notes
- Implement as Express middleware
- Use an in-memory store (no external dependencies)
- Apply to all routes except health check" --label "squad"
```

---

## Issue 7: Add GET /api/users/search Endpoint

```bash
gh issue create --title "Add user search endpoint" \
  --body "## Description
Allow searching users by name or email.

## Acceptance Criteria
- [ ] GET /api/users/search?q=alice returns matching users
- [ ] Search is case-insensitive
- [ ] Search matches partial name or email
- [ ] Returns empty array if no matches
- [ ] Add tests

## Technical Notes
- Add to existing routes/api.js
- Filter the in-memory users array" --label "squad"
```

---

## Issue 8: Add Created/Updated Timestamps

```bash
gh issue create --title "Add updatedAt timestamp to user model" \
  --body "## Description
Users have createdAt but no updatedAt. Add update tracking.

## Acceptance Criteria
- [ ] Add updatedAt field to user model, initially null
- [ ] Set updatedAt when a user is modified (PATCH)
- [ ] Return updatedAt in all user responses
- [ ] Add tests verifying timestamp behavior

## Technical Notes
- Modify the User model class
- Use ISO 8601 format" --label "squad"
```

---

## Issue 9: Add Pagination to GET /api/users

```bash
gh issue create --title "Add pagination to user listing" \
  --body "## Description
GET /api/users returns all users. Add pagination for scalability.

## Acceptance Criteria
- [ ] Support \`?page=1&limit=10\` query parameters
- [ ] Default: page=1, limit=20
- [ ] Response includes pagination metadata: page, limit, total, totalPages
- [ ] Handle edge cases: page beyond total, negative values
- [ ] Add tests for pagination

## Technical Notes
- Modify the existing GET /api/users route
- Add a paginate method to the User model or handle in the route" --label "squad"
```

---

## Issue 10: Add Error Codes to API Responses

```bash
gh issue create --title "Standardize error responses with error codes" \
  --body "## Description
Error responses are inconsistent. Standardize with machine-readable codes.

## Acceptance Criteria
- [ ] All errors use format: \`{ error: { code: 'ERROR_CODE', message: '...' } }\`
- [ ] Error codes: VALIDATION_ERROR, NOT_FOUND, CONFLICT, RATE_LIMITED, INTERNAL_ERROR
- [ ] Update all existing error responses to use the new format
- [ ] Add a shared error helper function
- [ ] Update tests to check for error codes

## Technical Notes
- Create a shared error utility in src/utils/ or similar
- Update routes/api.js to use the new format
- This touches multiple files — coordinate carefully" --label "squad"
```

---

## Creating All Issues

Run each command in sequence:

```bash
# Run each gh issue create command above
# Then verify:
gh issue list --label "squad" --state open
```

The list shows five new issues, plus any remaining from Exercise 3.

---

## What to Expect from Ralph

When approved, `squad watch --execute` can follow this flow:

1. **Round 1:** Ralph finds all untriaged issues → dispatches Lead to triage
2. **Round 2:** Lead assigns `squad:{member}` labels → Ralph dispatches agents
3. **Rounds 3–5:** Agents work on issues → create branches → open PRs
4. **Rounds 6+:** Ralph checks PR status → merges approved PRs → closes issues
5. **Then:** the queue can be empty and the monitor idles.

Timing depends on issue complexity. Do not wait for the whole cycle during the lab.
