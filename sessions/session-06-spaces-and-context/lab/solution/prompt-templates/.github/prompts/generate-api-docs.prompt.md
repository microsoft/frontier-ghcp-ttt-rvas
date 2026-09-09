---
description: "Generate API documentation from endpoint code"
---

Write API documentation for the selected endpoint.

Include these sections:

## Endpoint Overview

- HTTP method and path
- One-sentence description
- Authentication requirements

## Request

- **Headers:** required headers, such as `Content-Type` and `Authorization`
- **Path parameters:** name, type, and description
- **Query parameters:** name, type, whether required, description, and default
- **Request body:** JSON schema with field descriptions, types, constraints, and examples

## Response

- **Success response:** status code, body schema, and example
- **Error responses:** status code, error code, and example for each possible error

## Examples

Provide 3 curl examples:

1. Successful request
2. Request with filters/parameters
3. Request that triggers a validation error

## Notes

- Rate limits (if applicable)
- Pagination details (if applicable)
- Related endpoints
