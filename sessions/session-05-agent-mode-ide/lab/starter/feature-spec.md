# Feature Spec: Add Todo Ownership and Due Dates

Extend the Todo API created from `project-brief.md`. Keep all existing routes and response behavior working.

## New fields

- `owner`: optional string, 1–80 characters.
- `dueDate`: optional ISO date in `YYYY-MM-DD` format.

## Required behavior

1. `POST /api/todos` and `PUT /api/todos/:id` accept the new fields.
2. Invalid owners or dates return `400` with validation details.
3. `GET /api/todos?owner=<value>` filters by exact owner.
4. `GET /api/todos?due=overdue` returns incomplete todos with a due date before today.
5. Existing status and priority filters still work.
6. Existing records without the new fields remain valid.

## Tests

Add focused tests for:

- creating a todo with both fields;
- rejecting an invalid date;
- filtering by owner;
- returning only overdue incomplete todos;
- preserving existing create and list behavior.

## Constraints

- Add no dependency for date parsing.
- Keep in-memory storage.
- Do not add authentication, a database, or a front end.
