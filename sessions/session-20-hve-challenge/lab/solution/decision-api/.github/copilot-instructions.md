---
description: "Repository context for HVE agents working on the Engineering Decision API"
---

# Engineering Decision API repository instructions

## Project context

This Express service captures structured engineering decisions. HVE agents must
keep the first slice limited to decision creation and preserve the health route.

## Architecture and delivery boundary

* Keep the service in CommonJS JavaScript with Express.
* Preserve `GET /health` and the exported `createApp` test boundary.
* Keep decision state in memory and scoped to one app instance.
* Do not add dependencies or endpoints outside the challenge brief.
* Use synthetic records. Do not connect to a remote service or persistent store.

## Quality bar

* Return success data under `data` and errors under `error`.
* Test observable HTTP behavior with Jest and Supertest.
* Build tested source into a production-only container that runs as a non-root user.
* Treat learner-provided strings as untrusted input. Do not echo stack traces.
