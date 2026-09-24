---
description: "Prepared-patch fallback for learners who cannot edit or run the starter project"
---

# Prepared-patch fallback

Use this route when package installation, the approved assistant, or local code
execution is unavailable. Produce a patch plan that another engineer can apply.

## Required patch description

1. Name each file to add or change.
2. Describe route registration and in-memory state ownership.
3. Write pseudocode for validation, duplicate detection, record creation, and
   error handling.
4. List exact request bodies and expected status codes for the focused tests.
5. Describe a multi-stage Dockerfile that runs tests, installs production-only
   dependencies, uses a non-root user, and checks `GET /health`.
6. Complete the evidence workbook with `not run` where execution was blocked.

## Manual review table

| Check | Expected proof | Learner proof |
|-------|----------------|---------------|
| Health behavior stays unchanged | Existing route and baseline test remain | |
| Required strings are enforced | Empty, missing, and non-string cases | |
| Status is bounded | Default plus all accepted values and one rejected value | |
| Duplicate titles conflict | Case-insensitive, trimmed comparison | |
| Metadata is generated | UUID-shaped ID and UTC timestamp | |
| Errors stay stable | Named code and message for each error class | |
| Container contract is bounded | Tested source, production dependencies, non-root user, health check | |

The prepared patch earns implementation credit only when it is specific enough
to review file by file. General advice does not count.
