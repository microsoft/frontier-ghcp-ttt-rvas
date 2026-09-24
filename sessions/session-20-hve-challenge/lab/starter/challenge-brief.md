---
description: "Feature contract for the Engineering Decision API challenge"
---

# Engineering Decision API brief

The starter service has one green health check. Add `POST /api/decisions` without
changing `GET /health`.

## Request contract

Accept a JSON object with these fields:

| Field      | Rule                                                    |
|------------|---------------------------------------------------------|
| `title`    | Required, non-empty string                              |
| `context`  | Required, non-empty string                              |
| `decision` | Required, non-empty string                              |
| `status`   | Optional: `proposed`, `accepted`, or `superseded`       |

Trim required strings before storage. Default an omitted status to `proposed`.
Keep records in memory.

## Observable behavior

* Return `201` and `{ "data": { ... } }` for a valid request.
* Generate a unique string ID.
* Set `createdAt` to a UTC ISO 8601 timestamp.
* Return `400` for invalid required fields, invalid status, or malformed JSON.
* Return `409` when a stored title matches after trimming and
  case-insensitive comparison.
* Use `{ "error": { "code": "...", "message": "..." } }` as the base error
  envelope. Validation errors may add a stable `details` array.

## Non-goals

Do not add update, delete, list, authentication, persistent storage, remote
deployment, or new application dependencies. Unknown request fields may be ignored.

## Done conditions

The health test still passes. Focused Jest and Supertest tests prove valid create,
default and explicit status, invalid fields, duplicate title, generated metadata,
and stable errors. A multi-stage Dockerfile runs the tests during the image build,
installs production dependencies from the lock file, runs as a non-root user, and
checks `GET /health`. The evidence workbook traces each criterion to a file and test.
