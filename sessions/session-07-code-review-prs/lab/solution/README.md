# Session 07 Lab — Solution Reference

**For trainers only.** This directory contains the fully corrected review project after applying all 6 code changes from `lab/starter/code-changes.md` and fixing every issue Copilot should have flagged.

## Access and cost preflight

Use Enterprise Cloud as the governance baseline. Verify current official GitHub documentation and the customer administrator policy before a live exercise. For metered work, use a customer-defined stop guard.

## No-access fallback

Use this reference for a human-only review and compare the result with the documented fixes.

Use this reference to:

- Verify fixes during demo preparation.
- Help trainees who are stuck on a specific fix.
- Compare with the Exercise 2 test suite.

---

## Fixes

| #   | Issue                                                      | File           | Fix Applied                                                                                           |
| --- | ---------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| 1   | SQL injection in `/api/users/search`                       | `src/api.js`   | Replaced string interpolation with in-memory filter; comment notes parameterized queries for real DBs |
| 2   | Password returned in API response                          | `src/api.js`   | Added `sanitizeUser()` helper that strips `passwordHash` before all responses                         |
| 3   | Off-by-one in `paginate()` — page=1 skipped first items    | `src/utils.js` | Corrected `start = page * pageSize` → `start = (page - 1) * pageSize`                                 |
| 4   | Missing error handling in `POST /api/users`                | `src/api.js`   | Wrapped in `try/catch`, returns 400 with message on invalid input                                     |
| 5   | Hardcoded `JWT_SECRET` and `API_KEY`                       | `src/api.js`   | Moved to `process.env.JWT_SECRET` / `process.env.API_KEY` with startup warning                        |
| 6   | `/api/products` duplicated the items array (DRY violation) | `src/api.js`   | Removed duplicate array; endpoint now references `items` directly                                     |

---

## Test Coverage

`tests/api.test.js` covers:

- All original item CRUD tests (passing before and after fixes)
- Password field exclusion verification (Fix 2)
- SQL injection input handling — no raw SQL echoed, sanitized results (Fix 1)
- Error handling for invalid `POST /api/users` body (Fix 4)
- `/api/products` returns same data as `/api/items` (Fix 6)
- Pagination page-1 starts at index 0, not pageSize (Fix 3)

Run tests:

```bash
cd solution/review-project
npm install
npm test
```

All 16 tests should pass.

---

## Common Trainer Questions

**"Will Copilot catch all 6 issues?"**  
Often four or five. It may catch SQL injection, password exposure, and hardcoded secrets. It may miss the pagination off-by-one or a small duplicate. The lab uses those misses for false-negative analysis.

**"What if Copilot's suggested fix for the SQL injection is wrong?"**  
Copilot may suggest `.escape()` from a MySQL library or parameterized-query syntax. The solution uses an in-memory filter because there is no database. Accept an approach that prevents string interpolation of user input.

**"Trainee applied a fix but tests still fail — why?"**  
The `paginate` off-by-one is a likely cause. The fix may change only one number. Run `npm test` and read the failing test name to identify the wrong page.
