# API Specification Skill

## Use this skill when

Use this skill when designing or extending REST APIs in specification-driven projects. It gives Copilot your team's API patterns, validation rules, and response formats.

## Guidance for Copilot

1. **Endpoint naming** — Use resource-based paths (e.g., `/users`, `/users/{id}`, `/users/{id}/posts`).
2. **Response format** — Use a consistent envelope across endpoints:

   ```json
   {
     "data": { ... },
     "meta": {
       "timestamp": "ISO-8601",
       "requestId": "uuid"
     }
   }
   ```

3. **Error format** — Use standardized error responses:

   ```json
   {
     "error": {
       "code": "ERROR_TYPE",
       "message": "Human-readable description",
       "details": [ ... ]
     }
   }
   ```

4. **Status codes** — Use semantic HTTP status codes:
   - 200: Successful GET, PATCH
   - 201: Successful POST (resource created)
   - 204: Successful DELETE (no content)
   - 400: Validation error (bad input)
   - 404: Resource not found
   - 409: Conflict (duplicate resource)
5. **Validation** — Every endpoint validates input with JSON Schema.
6. **Testing** — Cover the success path, validation failures, edge cases, and performance.

## Template: REST API Specification

```yaml
endpoints:
  - path: "/resource"
    method: "POST"
    description: "Create a resource"
    request:
      required: ["name", "email"]
      properties:
        name:
          type: "string"
          minLength: 1
          maxLength: 100
        email:
          type: "string"
          format: "email"
    response:
      success:
        status: 201
        schema: { data: {...}, meta: {...} }
      errors:
        - status: 400
          code: "VALIDATION_ERROR"
        - status: 409
          code: "DUPLICATE_ERROR"
```

## Use in specification-driven delivery

When you run:

```bash
specify init my-project --integration copilot --integration-options="--skills"
```

Copilot loads this skill for:

- Specifying endpoints (Phase 2)
- Generating code (Phase 8)
- Verifying specification compliance (Phase 9)

## Confidence

**Medium** — This skill uses widely adopted REST API patterns (JSON:API and OpenAPI conventions). Apply it with team review when building new APIs.
