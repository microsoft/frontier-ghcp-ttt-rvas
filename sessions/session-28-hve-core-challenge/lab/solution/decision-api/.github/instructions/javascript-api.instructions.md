---
description: "JavaScript API coding and test practices for the Engineering Decision service"
applyTo: "src/**/*.js,tests/**/*.test.js"
---

# JavaScript API coding practices

* Keep route handlers small and return immediately after sending an error response.
* Validate type and trimmed content at the HTTP boundary.
* Keep mutable records inside `createApp()` or a router created per app instance.
* Return success payloads under `data` and failures under `error`.
* Use stable error codes that tests can assert without parsing message text.
* Test behavior through HTTP with Jest and Supertest.
* Cover malformed JSON, normalized duplicates, every accepted status, and one
  unsupported status.
* Preserve the exported `createApp` boundary and the existing health test.