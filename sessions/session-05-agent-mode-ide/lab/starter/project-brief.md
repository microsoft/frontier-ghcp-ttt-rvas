# Project Brief: Todo API

## What to Build

Build an Express.js REST API for a simple task list.

## Requirements

### API Endpoints

| Method   | Route            | Description                                                                                                    |
| -------- | ---------------- | -------------------------------------------------------------------------------------------------------------- |
| GET      | `/api/todos`     | List todos. Support `?status=pending\|completed` and `?priority=low\|medium\|high` filters.                    |
| GET      | `/api/todos/:id` | Return one todo by ID, or 404 when it does not exist.                                                          |
| POST     | `/api/todos`     | Create a todo. `title` is required. `priority` defaults to `"medium"` and `status` to `"pending"`.             |
| PUT      | `/api/todos/:id` | Update any todo field. Return 404 when the todo does not exist.                                                |
| DELETE   | `/api/todos/:id` | Delete a todo. Return 404 when the todo does not exist.                                                        |

### Data Model

Each todo has:

- `id` — auto-incrementing integer
- `title` — required string, 1–200 characters
- `description` — optional string
- `status` — `"pending"` or `"completed"`; defaults to `"pending"`
- `priority` — `"low"`, `"medium"`, or `"high"`; defaults to `"medium"`
- `createdAt` — automatically generated ISO timestamp
- `updatedAt` — automatically updated ISO timestamp

### Technical Requirements

- **Runtime:** Node.js with Express.js
- **Storage:** In-memory array (no database)
- **Validation:** Return 400 with error details for invalid input
- **Error handling:** Centralized error handler middleware
- **Testing:** At least 5 test cases using a test framework (Jest or similar)
- **Structure:** Separate routes, middleware, and utilities into their own files

### Project Structure

```
todo-api/
├── package.json
├── server.js              # App entry point
├── routes/
│   └── todos.js           # Todo route handlers
├── middleware/
│   ├── validate.js         # Input validation middleware
│   └── errorHandler.js     # Centralized error handler
├── utils/
│   └── helpers.js          # Utility functions (ID generation, timestamps)
└── tests/
    └── todos.test.js       # API tests
```

### Example Requests & Responses

**Create a todo:**

```json
POST /api/todos
Body: { "title": "Buy groceries", "priority": "high" }
Response (201): { "id": 1, "title": "Buy groceries", "priority": "high", "status": "pending", "createdAt": "2026-04-16T10:00:00Z", "updatedAt": "2026-04-16T10:00:00Z" }
```

**Validation error:**

```json
POST /api/todos
Body: { "priority": "urgent" }
Response (400): { "error": "Validation failed", "details": ["title is required", "priority must be low, medium, or high"] }
```

**Not found:**

```json
GET /api/todos/999
Response (404): { "error": "Todo not found" }
```
