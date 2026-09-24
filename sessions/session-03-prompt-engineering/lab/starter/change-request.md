# Change request

Add todo priority.

- Allowed values are `low`, `normal`, and `high`.
- New todos default to `normal`.
- `GET /todos?priority=high` filters the collection.

The request does not say what to do with an invalid priority. Decide whether to
reject it or normalize it. Record the decision in `prompt-log.md`, add a test, and
then update the store and routes.
