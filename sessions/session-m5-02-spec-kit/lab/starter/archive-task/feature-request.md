# Feature request: Archive tasks

Users need to remove completed tasks from their normal working list without
deleting task history.

## Requested behavior

- A caller can archive a task by ID.
- Archiving keeps the task title and ID.
- The normal task list hides archived tasks.
- A caller can ask to include archived tasks in the list.
- Archiving an unknown task returns a clear not-found result.
- Repeating an archive request does not corrupt the task or create a duplicate.

## Constraints

- Preserve existing create and list behavior.
- Keep storage in memory.
- Use Python 3.10 or later and the standard library.
- Do not add deletion, restore, due dates, owners, or persistence.
