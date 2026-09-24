# Capstone Brief: Create a Bookmark

## Goal

Implement one endpoint that creates a bookmark in memory.

```http
POST /api/bookmarks
```

The supplied specification owns the accepted behavior. The issue, patch, tests,
and review must trace to it.

## Example request

```json
{
  "url": "https://docs.example.test/node",
  "title": "Node reference",
  "description": "Synthetic training bookmark",
  "tags": ["node", "reference"]
}
```

## Constraints

- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Data storage:** In memory
- **Testing:** Jest + Supertest
- **Dependencies:** Use the existing package manifest
- **Data:** Synthetic examples only
- **Review:** A human records the final decision

## Deferred scope

- authentication and authorization;
- persistent storage;
- list, read, update, and delete endpoints;
- filtering, search, and pagination;
- import and export;
- deployment, CI changes, MCP configuration, and new agents.
