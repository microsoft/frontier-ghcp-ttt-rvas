# Change request: Restore archived tasks

Open this file only after the archive implementation reports **Converged**.

Users now need to restore archived tasks to the normal working list.

## Requested behavior

- A caller can restore an archived task by ID.
- Restore keeps the task ID and title unchanged.
- A restored task appears in the default task list.
- Restoring an active task is idempotent.
- Restoring an unknown task produces the same not-found result as archive.

## Unchanged constraints

- Preserve all accepted archive behavior.
- Keep storage in memory.
- Use Python 3.10 or later and the standard library.
- Deletion, persistence, due dates, owners, and API transport remain out of scope.
