# Todo API Final Review Reference

Use this reference to review the learner's result. The exact file layout may differ.

## Required behavior

- Existing create, list, read, update, delete, status-filter, and priority-filter behavior still works.
- Todos may include an optional `owner` and `dueDate`.
- Invalid owners or dates return `400`.
- `?owner=<value>` filters by exact owner.
- `?due=overdue` returns incomplete todos due before the current date.
- Route handlers use a repository module instead of mutating storage directly.
- Repository reads return copies rather than stored object references.

## Required evidence

- The original API tests pass.
- Focused tests cover owner, due date, overdue filtering, and repository copies.
- The final diff stays inside the generated Todo API.
- No database, front end, authentication feature, or unapproved package was added.
- `lab-notes.md` records the plan, Ask-versus-Agent comparison, course correction, and final human decision.

Approve the result only when the code and evidence satisfy these checks.
