---
description: "Review decision API routes, tests, and container against the challenge contract"
applyTo: "Dockerfile,src/routes/**/*.js,tests/**/*.test.js"
---

# Decision API review instructions

Review only behavior required by the challenge brief.

* Trace each request rule to a focused HTTP test.
* Check that required values are non-empty strings after trimming.
* Check status defaults and the exact accepted status set.
* Compare duplicate titles after trimming and case normalization.
* Check generated IDs, UTC timestamps, status codes, and stable envelopes.
* Check that the image build runs tests and the runtime uses production dependencies,
  a non-root user, and the health endpoint.
* Flag new endpoints, packages, persistence, or authentication as scope growth.
* Require evidence for malformed JSON and unexpected internal errors.
