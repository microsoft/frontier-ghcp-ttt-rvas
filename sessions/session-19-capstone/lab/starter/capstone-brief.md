# Capstone Project Brief — Bookmark Manager API

## Overview

Build a **Bookmark Manager API**, a RESTful service that lets users save, organize, tag, and search their bookmarks. This project uses the full Copilot toolchain: Spaces, custom instructions, custom agents, MCP, CI/CD, cloud agent, and code review.

---

## Requirements

### Core Endpoints

| Method   | Path                 | Description                         |
| -------- | -------------------- | ----------------------------------- |
| `GET`    | `/api/health`        | Health check (provided in starter)  |
| `POST`   | `/api/bookmarks`     | Create a new bookmark               |
| `GET`    | `/api/bookmarks`     | List all bookmarks (with filtering) |
| `GET`    | `/api/bookmarks/:id` | Get a single bookmark               |
| `PATCH`  | `/api/bookmarks/:id` | Update a bookmark                   |
| `DELETE` | `/api/bookmarks/:id` | Delete a bookmark                   |

### Bookmark Schema

```json
{
  "id": "uuid",
  "url": "https://example.com",
  "title": "Example Site",
  "description": "An example bookmark",
  "tags": ["example", "reference"],
  "createdAt": "2026-04-16T10:00:00Z",
  "updatedAt": null
}
```

### Filtering & Search

- `GET /api/bookmarks?tag=javascript`: Filter by tag
- `GET /api/bookmarks?search=react`: Search title and description
- `GET /api/bookmarks?page=1&limit=10`: Pagination (stretch goal)

### Validation Rules

- `url`: Required; must use a valid URL format.
- `title`: Required; maximum 200 characters.
- `description`: Optional; maximum 1000 characters.
- `tags`: Optional array of strings; maximum 10 tags, each with a maximum of 50 characters.

### Response Format

**Success:**

```json
{
  "data": { ... }
}
```

**Error:**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description"
  }
}
```

### HTTP Status Codes

- `200`: Successful GET or PATCH.
- `201`: Successful POST.
- `204`: Successful DELETE.
- `400`: Validation error.
- `404`: Bookmark not found.
- `409`: Duplicate URL.

---

## Technical Stack

- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Data storage:** In-memory (array/Map); no database required
- **Testing:** Jest + Supertest
- **CI:** GitHub Actions

---

## Capstone scope

### Phase 1–2: Foundation

- Project repo, Copilot Space, custom instructions, custom agent

### Phase 3–4: Infrastructure

- MCP server config, CI/CD pipeline, cloud agent setup

### Phase 5–6: Features

- Write issues for each endpoint, assign to cloud agent

### Phase 7–8: Quality

- Review agent PRs, iterate on feedback, fix integration issues

### Phase 9: Wrap-up

- Document, reflect, plan your own training delivery

---

## Stretch work

- Add import/export: `POST /api/bookmarks/import` (JSON array) and `GET /api/bookmarks/export`
- Add a second custom agent (e.g., "test-writer" that only writes tests)
- Add an agent skill for API design patterns
- Configure a second MCP server (e.g., filesystem MCP for importing bookmarks from a file)
- Add request logging middleware
- Add rate limiting
