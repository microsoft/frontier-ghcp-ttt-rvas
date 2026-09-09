# Issue 1 (Simple): Add Input Validation

## Add input validation to POST /api/tasks

### Description

`POST /api/tasks` currently accepts any input. It allows tasks with empty titles or invalid priority values.

**Current behavior:** The endpoint accepts any JSON body. `{}`, `{"title": ""}`, and `{"priority": "banana"}` all create tasks.

**Desired behavior:** The endpoint validates input and returns HTTP 400 for invalid data.

### Acceptance Criteria

- [ ] `title` is required, a non-empty string, and at most 200 characters
- [ ] `priority` is `"low"`, `"medium"`, or `"high"`; it defaults to `"medium"` when omitted
- [ ] Invalid requests return 400 with `{ "error": "<description>" }`
- [ ] Existing tests continue to pass
- [ ] New tests cover empty title, missing title, title too long, and invalid priority

### Files to Modify

- `src/app.js` — add validation to POST handler
- `tests/app.test.js` — add validation test cases
