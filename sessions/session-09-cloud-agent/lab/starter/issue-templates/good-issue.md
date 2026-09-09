# Example: Good Issue

## Add input validation to POST /api/tasks

### Description

`POST /api/tasks` currently accepts any input. Users can create tasks with empty titles or invalid priorities. Add validation on the server.

**Current behavior:** Any JSON body is accepted, including `{}`, `{"title": ""}`, or `{"priority": "banana"}`.

**Desired behavior:** The endpoint rejects invalid input with HTTP 400 and a descriptive error.

### Acceptance Criteria

- [ ] `title` is required, a non-empty string, and at most 200 characters
- [ ] `priority` is `"low"`, `"medium"`, or `"high"`; it defaults to `"medium"` when omitted
- [ ] Invalid requests return 400 with `{ "error": "<description of what's wrong>" }`
- [ ] Valid requests continue to work (existing tests pass)
- [ ] New unit tests cover validation for empty titles, long titles, and invalid priorities

### Files to Modify

- `src/app.js` — add validation to the POST route handler
- `tests/app.test.js` — add validation tests

### Constraints

- Do not add external validation libraries (use plain JavaScript)
- Keep the same response format as other endpoints
- Do not modify the health check or GET endpoints

---

**Why this works:**

- The title identifies the endpoint to change
- Current and desired behavior state the expected result
- Each acceptance criterion can be tested
- File references narrow the search
- Constraints limit scope
