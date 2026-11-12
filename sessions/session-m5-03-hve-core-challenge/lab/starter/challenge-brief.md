---
description: "HVE Core challenge contract from product intent through reviewed implementation"
---

# HVE Core challenge brief

Use HVE Core to move one Engineering Decision API feature from product intent
to reviewed code. The API is one part. The RPI files from each phase are the other.

## Challenge progression

Complete these stages in order:

1. **Understand and run HVE RPI.** Use direct Research and Plan prompts before changing
  code. Later, run Implement and Review. Inspect the `.copilot-tracking/` artifact
  produced by each phase and record how the next phase used it.
2. **Optional: customize HVE for the repository.** Add repository context, a targeted
  JavaScript/API coding instruction, and a Decision API Reviewer agent with a defined scope.
  Check that each one is active and changed a later plan, implementation, or review.
3. **Optional: refine the product intent.** Use Product Manager Advisor to test value,
  assumptions, priority, and non-goals. Use Agile Coach to produce one user story,
  acceptance criteria, and exclusions. Update the HVE plan when needed.
4. **Implement and review.** Run HVE Implement and Review against the approved plan.
  Validate the API and container, inspect the changes and review artifacts, and
  record the human decision.

After Review, explain how combined `/rpi` would orchestrate the same phases and
use Follow-up to route new work. Do not start another implementation cycle.

## Required HVE files

Research, plan, changes, and review files, each produced by its HVE phase, and your
decision to approve, request changes, or pause.

For the optional exercises, add `.github/copilot-instructions.md`,
`.github/instructions/javascript-api.instructions.md`,
`.github/agents/decision-api-reviewer.agent.md`, and the Product Manager Advisor and
Agile Coach outputs.

## Implementation slice

The starter service has one green health check. Add `POST /api/decisions` without
changing `GET /health`.

## Request contract

Accept a JSON object with these fields:

| Field      | Rule                                                    |
|------------|---------------------------------------------------------|
| `title`    | Required, non-empty string                              |
| `context`  | Required, non-empty string                              |
| `decision` | Required, non-empty string                              |
| `status`   | Optional: `proposed`, `accepted`, or `superseded`       |

Trim required strings before storage. Default an omitted status to `proposed`.
Keep records in memory.

## Observable behavior

* Return `201` and `{ "data": { ... } }` for a valid request.
* Generate a unique string ID.
* Set `createdAt` to a UTC ISO 8601 timestamp.
* Return `400` for invalid required fields, invalid status, or malformed JSON.
* Return `409` when a stored title matches after trimming and
  case-insensitive comparison.
* Use `{ "error": { "code": "...", "message": "..." } }` as the base error
  envelope. Validation errors may add a stable `details` array.

## Non-goals

Do not add update, delete, list, authentication, persistent storage, remote
deployment, or new application dependencies. Unknown request fields may be ignored.

Do not create live work items, commit, push, merge, or open a remote pull request.

## Container contract

Add a multi-stage Dockerfile that:

* runs the complete test suite before runtime assembly;
* installs production dependencies from the lock file;
* copies tested source into the runtime image;
* runs as a non-root user;
* checks `GET /health`.

Use an approved local engine or trainer-managed remote build. Record unavailable
validation as `not run`; do not infer a pass.

## Done conditions

You're done when:

* the four RPI files exist and each builds on the one before;
* the health test remains green;
* focused Jest and Supertest tests prove valid create, default and explicit status,
  invalid fields, duplicate title, generated metadata, and stable errors;
* the container contract is implemented and checked;
* the review maps every criterion to a result and supports your decision;
* the handoff lists the four paths, your decision, open risks, and the next action.
