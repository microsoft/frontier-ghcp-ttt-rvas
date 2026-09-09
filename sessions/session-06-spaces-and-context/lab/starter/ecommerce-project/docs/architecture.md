# Architecture Decisions

## Overview

The Acme E-Commerce API uses a **layered architecture**.

## Architecture Layers

```
Routes (HTTP) → Validation (Middleware) → Models (Business Logic) → Store (Data)
```

### Routes Layer

- Handles HTTP request/response
- Uses the model's static validation methods
- Sends data operations to the store
- Always returns structured JSON responses

### Validation Layer

- Each model has a static `validate()` method
- Validation runs before any data mutation
- Returns an array of human-readable error strings
- Supports both create (all required fields) and update (partial) validation

### Model Layer

- Plain JavaScript classes
- Holds business logic and transforms data
- Generates `createdAt` and `updatedAt`
- Receives and returns plain objects, without HTTP knowledge

### Data Layer

- In-memory arrays (planned migration to PostgreSQL)
- Auto-incrementing integer IDs
- All operations return copies, not references

## Conventions

### Response Envelope

Successful responses use a `{ data: ... }` envelope:

```json
{ "data": { "id": 1, "name": "Widget" } }
{ "data": [...], "total": 42 }
```

### Error Format

All errors use the structured format:

```json
{ "error": { "code": "ERROR_CODE", "message": "...", "details": [...] } }
```

### Import Style

- ES module syntax (`import/export`), not CommonJS
- Named imports preferred over default imports

### Naming

- Files: kebab-case (`product-routes.js`)
- Classes: PascalCase (`Product`)
- Functions: camelCase (`getProductById`)
- Constants: SCREAMING_SNAKE_CASE (`MAX_PAGE_SIZE`)
