# Exercise 2 Solution

This solution contains a complete nine-phase specification for the Favorites feature.

## Structure

- `.specify/constitution.md` — Problem framing
- `.specify/specification.yml` — Full API specification
- `.specify/clarifications.md` — Edge cases and constraints
- `.specify/plan.md` — Schedule and dependencies
- `.specify/checklist.md` — Deliverables
- `.specify/tasks.yml` — Work breakdown
- `.specify/analysis.md` — Progress tracking
- `src/favorites-api.js` — Generated code
- `src/favorites-api.test.js` — Tests, including performance checks

## Evolution of the Specification

The specification changes as you work through the phases:

### Constitution

- Problem: "Users need a favorites feature for quick contact access"
- Scope: favorite and unfavorite, list, and require authentication
- Success metric: <100ms for 1,000 favorites

### Specify

- Three endpoints: POST, DELETE, and GET (with pagination)
- Request and response formats
- An authentication requirement

### Clarify (Important!)

- Edge cases:
  - Reject a user who tries to favorite themselves with 400.
  - Treat a duplicate favorite as idempotent (OK).
  - Cascade-delete favorites when the favorited user is deleted.
  - Add a database index on (user_id, favorite_id) for performance.

### Plan

- Estimate: 8 hours (schema 1hr, API 3hr, tests 2hr, performance testing 2hr)
- Dependencies: Exercise 1 (User API) must be complete first

### Checklist

- [ ] Database schema migration
- [ ] 3 API endpoints + tests
- [ ] Load test (1,000 favorites × 1,000 users)
- [ ] API documentation
- [ ] Deployment runbook

## What to check

1. **The specification evolves.** Clarify often sends you back to Specify.
2. **Edge cases need decisions.** The request did not mention self-favorite rejection, cascade deletion, or performance indexing.
3. **The plan makes scope concrete.** It records the schedule and dependencies.
4. **The checklist catches omitted work.** It keeps load testing visible when the specification has performance requirements.

## Performance review

The Clarify phase surfaced the <100ms constraint. The solution includes:

```sql
-- Schema: Add index for performance
CREATE TABLE user_favorites (
  user_id UUID NOT NULL,
  favorite_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, favorite_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (favorite_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)  -- Critical for performance
);
```

```javascript
// Code: Single query, no N+1
async function getFavorites(userId) {
  // Single query with index
  const result = await db.query(
    'SELECT * FROM user_favorites WHERE user_id = $1 LIMIT $2 OFFSET $3',
    [userId, limit, offset]
  );
  // Response includes paginated results
  return {
    favorites: result.rows,
    total: result.count,
    limit,
    offset
  };
}
```

## Running the Solution

```bash
# Initialize the specification
specify init favorites-feature \
  --integration copilot \
  --integration-options="--skills"

# Apply the schema migration
npm run migrate

# Start the API
npm start

# Run tests including performance test
npm test

# Verify specification compliance
specify check . \
  --against .specify/specification.yml \
  --verify-code src/favorites-api.js \
  --verify-performance src/load-test.js
```

## Compare with your specification

Use this checklist to review your work:

- [ ] Did you consider self-favorite edge case?
- [ ] Did you think about cascade deletion?
- [ ] Did you include database indexes in the plan?
- [ ] Did you estimate load test time in the plan phase?
- [ ] Did you include pagination in the spec?
- [ ] Did your checklist include a deployment runbook?

If you missed any of these, compare your work with the solution. It shows the parts of a complete specification.

## Apply this with your team

1. **Specification evolution is normal.** Refine phases as you clarify.
2. **Include governance with the feature specification.** Cover performance, security, and compliance constraints.
3. **Use the checklist before implementation.** It catches gaps.
4. **Test performance requirements.** Include load testing when the specification requires it.
