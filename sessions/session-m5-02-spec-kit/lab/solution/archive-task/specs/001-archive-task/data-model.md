# Data Model: Archive tasks

## Task

| Field | Type | Rules |
| --- | --- | --- |
| `id` | Integer | Generated once and never changed |
| `title` | String | Required, trimmed, never changed by archive or restore |
| `archived` | Boolean | `False` when active; `True` when archived |

## State transition

```text
active --archive_task(id)--> archived
archived --archive_task(id)--> archived
archived --restore_task(id)--> active
active --restore_task(id)--> active
```

An unknown ID does not create a task. It raises `TaskNotFoundError`.
