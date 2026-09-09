# Copilot Instructions

<!-- 
  This file goes at .github/copilot-instructions.md in your repository.
  It gives Copilot Chat, code review, and cloud-agent workflows
  persistent instructions.
  
  Customize the sections below for your project.
-->

## Project Overview

<!-- TODO: Describe what this project does -->
This is a [describe your project here].

## Tech Stack

<!-- TODO: List your tech stack -->
- Runtime: Node.js 20
- Framework: Express.js
- Testing: Jest + Supertest
- Linting: ESLint

## Coding Conventions

<!-- TODO: Add your team's coding standards -->
- Use `async`/`await` for asynchronous code. Do not use raw callbacks.
- Use `const` by default. Use `let` only when reassignment is needed.
- All functions must have JSDoc comments
- Error responses must use the format: `{ "error": "<message>" }`

## Testing Requirements

<!-- TODO: Define your testing expectations -->
- Every new feature must include unit tests
- Tests go in the `tests/` directory
- Use descriptive test names: `it('should return 400 when title is empty')`
- Cover edge cases and expected behavior

## File Structure

<!-- TODO: Document your project's file layout -->
```
src/
  app.js          — Express app setup, routes, middleware
tests/
  app.test.js     — Unit and integration tests
package.json      — Dependencies and scripts
```

## Important Notes

<!-- TODO: Add any constraints or warnings -->
- Do not add external databases; use in-memory storage
- Do not modify the health-check endpoint
- Run `npm test` before considering work complete
