# Issue 2 (Medium): Add Search Endpoint

## Add GET /api/tasks/search endpoint with keyword search

### Description

Add a search endpoint that filters tasks by a keyword in the `title`.

### Acceptance Criteria

- [ ] `GET /api/tasks/search?q=keyword` returns tasks whose `title` contains the keyword, ignoring case
- [ ] Return an empty array `[]` with HTTP 200 when no task matches
- [ ] Returns 400 if `q` parameter is missing or empty
- [ ] Search accepts partial matches, such as `q=deploy` for "Deploy to production"
- [ ] New tests cover matches, no results, missing `q`, and case-insensitive matching

### Files to Modify

- `src/app.js` — add new GET route (place BEFORE the `GET /api/tasks/:id` route to avoid route conflicts)
- `tests/app.test.js` — add search test cases

### Constraints

- Do not add external search libraries. Use `String.prototype.includes()` or similar.
- The search route must be declared before `/api/tasks/:id` to prevent Express from treating "search" as an ID
