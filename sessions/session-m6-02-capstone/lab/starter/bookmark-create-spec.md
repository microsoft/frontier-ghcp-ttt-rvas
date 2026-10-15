# Accepted Specification: Create a Bookmark

## Goal

Create one bookmark through `POST /api/bookmarks`.

## Functional requirements

| ID | Requirement |
| --- | --- |
| FR-001 | A valid request returns `201` with a single `data` object. |
| FR-002 | The created bookmark has a generated `id`, normalized optional fields, `createdAt`, and `updatedAt: null`. |
| FR-003 | `url` is required and must be an absolute HTTP or HTTPS URL. |
| FR-004 | `title` is a required non-empty string with at most 200 characters. |
| FR-005 | `description` is optional. When present, it is a string with at most 1000 characters. |
| FR-006 | `tags` is optional. When present, it is an array of at most 10 non-empty strings, each at most 50 characters. |
| FR-007 | A second request with the same URL returns `409` and does not create another bookmark. |
| FR-008 | Validation failures return `400` with `error.code` set to `VALIDATION_ERROR`. Duplicate URLs use `CONFLICT`. |

## Acceptance scenarios

1. Create a bookmark with every field and inspect the response envelope.
2. Create a bookmark without optional fields and confirm `description: null` and
   `tags: []`.
3. Reject missing and invalid URLs.
4. Reject missing, empty, non-string, and overlong titles.
5. Reject invalid descriptions and tags.
6. Reject a duplicate URL.

## Constraints

- Use Node.js 20+, Express, Jest, and Supertest.
- Store bookmarks in memory.
- Use the existing dependencies.
- Use synthetic test data.

## Non-goals

Authentication, persistence, other Bookmark endpoints, filtering, deployment, and
tool configuration are outside this change.

## Specification review

Before implementation, record any ambiguity. Resolve it with the reviewer or pause.
Do not silently choose new product behavior.
