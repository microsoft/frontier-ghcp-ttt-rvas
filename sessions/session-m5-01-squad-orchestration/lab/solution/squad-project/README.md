# Solution project

Reference result for the lab task: user validation, a tasks resource, and tests.

The starter README is the base. Add this section to your own README when you document the new endpoints.

## Endpoints added

- `GET /api/tasks`: list tasks. Filter with `?status=todo|doing|done`.
- `POST /api/tasks`: create a task (`{ title, status? }`). `title` is required, at most 100 characters.
- `PATCH /api/tasks/:id`: change status (`{ status }`).
- `DELETE /api/tasks/:id`: delete a task.

`POST /api/users` now returns `400` for a malformed email or a name over 100 characters.
