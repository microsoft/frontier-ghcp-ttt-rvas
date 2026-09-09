# Work Assignments

Use these three Exercise 2 tasks. Assign each to its named role and review the result before assigning dependent work.

## Lead: product-catalog decision

```text
{LeadName}, review the project structure and write a technical decision for a
product catalog feature. Cover its data model, endpoints, integration with the
existing user system, non-goals, and the reviewer.
```

The lead should inspect the existing application, put the proposal in `.squad/decisions/inbox/`, and update `history.md`. The decision owner then merges or rejects it in the shared record.

## Backend: user lookup endpoint

```text
{BackendName}, add GET /api/users/:id. Return a single user, return 404 for a
missing user, follow existing patterns, and add or update focused tests.
```

Review the diff and run:

```bash
npm test
```

If a server is started for a manual check, stop it with its specific process ID after testing `/api/users/1` and a missing-user case.

## Tester: edge cases

```text
{TesterName}, review the current tests and add focused user-API coverage for
invalid input, missing users, and duplicate email handling.
```

Use the existing Jest and Supertest style. Review test names and assertions against the stated cases, then run `npm test`.

## Review notes

Name the role in each request. Mention relevant files and constraints. Inspect the decision inbox and role history after each task:

```bash
ls .squad/decisions/inbox/
cat .squad/agents/{name}/history.md
```

Do not accept output merely because an agent produced it.
