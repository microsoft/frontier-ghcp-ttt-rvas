# Issue 3 (Complex): Add Task Statistics Endpoint

## Add GET /api/stats endpoint with task analytics

### Description

Add a statistics endpoint that summarizes tasks for dashboards and monitoring.

### Acceptance Criteria

- [ ] `GET /api/stats` returns a JSON object with:
  - `total` — task count
  - `completed` — completed-task count
  - `pending` — incomplete-task count
  - `byPriority` — count by priority (`{ "low": N, "medium": N, "high": N }`)
  - `completionRate` — completed-task percentage (0-100, rounded to one decimal)
- [ ] Returns correct stats when no tasks exist (`total: 0`, `completionRate: 0`)
- [ ] Also add `PATCH /api/tasks/:id` to update task fields (needed to mark tasks as completed)
  - Accepts partial updates (only fields present in the body are updated)
  - Returns the updated task
  - Returns 404 if task not found
- [ ] New tests cover no-task stats, mixed-task stats, `PATCH` update, and `PATCH` 404

### Files to Modify

- `src/app.js` — add PATCH route and GET /api/stats route
- `tests/app.test.js` — add tests for both new endpoints

### Constraints

- Do not modify existing endpoints
- `completionRate` should be `0` when there are no tasks (avoid division by zero)
- Maintain the existing in-memory storage pattern
