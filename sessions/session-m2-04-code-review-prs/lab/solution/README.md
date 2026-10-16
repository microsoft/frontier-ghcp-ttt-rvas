# Session m2-04 lab: Solution reference

**For trainers only.** This directory contains a corrected review project for the
six changes in `lab/starter/code-changes.md`. It is a code reference, not a
prediction of what either review command will report.

## Required live review record

Learners must retain their first human review, initial `/review` and
`/security-review` outputs, and the same commands run on the uncommitted correction
diff. Use `fix-evaluation-template.md` to record accepted and rejected findings,
then compare with Copilot review on the private training PR.

Do not require a fixed number of security findings. The SQL text is never sent
to a database, and the hardcoded strings are fake and unused. Reject claims of
proven database compromise or leaked live credentials. Password exposure is an
observable response defect; pagination and duplication are separate review topics.

The commands supplement repository security scanning. Their output does not
replace the human decision or authorize merging intentional defects.

## Access and cost preflight

Follow the [course safety baseline](../../../learning-safety-baseline.md). Set a
usage limit if the work is metered.

Use this reference after the assisted review and required checks. Compare the
learner decision with the documented fixes.

Use this reference to:

- Check fixes during demo preparation.
- Help trainees who are stuck on a specific fix.
- Compare with the Exercise 2 test suite.

---

## Fixes

| #   | Issue                                                      | File           | Fix Applied                                                                                           |
| --- | ---------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| 1   | Unsafe SQL-string construction in `/api/users/search` (no database executes it) | `src/api.js` | Replaced string interpolation with in-memory filter; comment notes parameterized queries for real DBs |
| 2   | Password returned in API response                          | `src/api.js`   | Added `sanitizeUser()` helper that strips `passwordHash` before all responses                         |
| 3   | Off-by-one in `paginate()`: page=1 skipped first items     | `src/utils.js` | Corrected `start = page * pageSize` → `start = (page - 1) * pageSize`                                 |
| 4   | Missing error handling in `POST /api/users`                | `src/api.js`   | Wrapped in `try/catch`, returns 400 with message on invalid input                                     |
| 5   | Hardcoded synthetic `JWT_SECRET` and `API_KEY` values       | `src/api.js`   | Moved to `process.env.JWT_SECRET` / `process.env.API_KEY` with startup warning                        |
| 6   | `/api/products` duplicated the items array (DRY violation) | `src/api.js`   | Removed duplicate array; endpoint now references `items` directly                                     |

---

## Test coverage

`tests/api.test.js` covers:

- All original item CRUD tests (passing before and after fixes)
- Password field exclusion (Fix 2)
- Search input handling: no raw SQL echoed, filtered results (Fix 1)
- Error handling for invalid `POST /api/users` body (Fix 4)
- `/api/products` returns same data as `/api/items` (Fix 6)
- Pagination page-1 starts at index 0, not pageSize (Fix 3)

Run tests:

```bash
cd solution/review-project
npm install
npm test
```

All 17 tests should pass.

---

## Common trainer questions

**"Will Copilot catch all 6 issues?"**  
Do not promise a count. General and security review have different scopes. Record
misses and unsupported claims, then inspect the actual behavior and tests.

**"What if Copilot's suggested fix for the SQL-string construction is wrong?"**

Copilot may suggest `.escape()` from a MySQL library or parameterized-query syntax. The solution uses an in-memory filter because there is no database. Accept an approach that prevents string interpolation of user input.

**"Trainee applied a fix but tests still fail: why?"**
The `paginate` off-by-one is a likely cause. The fix may change only one number. Run `npm test` and read the failing test name to identify the wrong page.
