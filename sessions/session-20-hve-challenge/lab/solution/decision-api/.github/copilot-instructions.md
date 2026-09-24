---
description: "Repository instructions for the Engineering Decision API reference project"
---

# Engineering Decision API repository instructions

* Keep the service in CommonJS JavaScript with Express.
* Preserve `GET /health` and the exported `createApp` test boundary.
* Keep decision state in memory and scoped to one app instance.
* Do not add dependencies or endpoints outside the challenge brief.
* Return success data under `data` and errors under `error`.
* Test observable HTTP behavior with Jest and Supertest.
* Build tested source into a production-only container that runs as a non-root user.
* Treat learner-provided strings as untrusted input. Do not echo stack traces.
