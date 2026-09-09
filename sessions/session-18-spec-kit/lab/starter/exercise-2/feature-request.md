# Exercise 2: Feature Request — Favorites Feature

## Feature: Add Favorites to User API

### User Story

> As a user, I want to mark other users as favorites for quick access so that I can build a personal network of key contacts.

### Acceptance Criteria

- [x] Users can favorite other users
- [x] Users can unfavorite (remove from favorites)
- [x] Users can view their favorites list
- [x] Only authenticated users can manage favorites
- [x] Performance requirement: List my 1,000 favorites in <100ms
- [x] No duplicate favorites (same user can't be favorited twice)

### Out of Scope (V1)

- [ ] Notifications when someone favorites you
- [ ] Mutual favorites (friend requests)
- [ ] Favorite groups or collections
- [ ] Analytics on popularity

### Technical Constraints

- Build on the User API from Exercise 1
- Use the same database (add a favorites table)
- Performance: <100ms for 1,000 favorites query
- No N+1 queries allowed

### Success Metrics

- [ ] All 3 endpoints pass load test
- [ ] 99th percentile response time < 100ms
- [ ] Code passes specification compliance check

---

## Your task

Specify this feature using all 9 phases:

1. **Constitution** — Agree on scope and success metrics
2. **Specify** — Define endpoints, request/response, validation
3. **Clarify** — Address edge cases (self-favorite, duplicates, permissions)
4. **Plan** — Estimate effort and identify dependencies
5. **Checklist** — List deliverables (schema, code, tests, load test)
6. **Tasks** — Break into work units
7. **Analyze** — Track progress
8. **Implement** — Generate code
9. **Converge** — Verify specification compliance

Each phase should surface new information. Document how the specification changes.

### Hints

- Copilot will suggest database indexes for performance.
- In the Clarify phase, decide what happens to favorites when a user is deleted.
- In the performance review, decide how to avoid N+1 queries when listing favorites.

### Time: 30 minutes
