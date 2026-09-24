# Reference Handoff: Bookmark Creation

## Issue

**Title:** Implement the accepted `POST /api/bookmarks` slice

**Goal:** Create one bookmark in memory and return the accepted response envelope.

**Accepted specification:** FR-001 through FR-008 in
`../starter/bookmark-create-spec.md`.

**Non-goals:** Authentication, persistence, other Bookmark endpoints, filtering,
deployment, CI changes, new dependencies, and tool configuration.

**Expected files:**

- `src/index.js`
- `src/routes/bookmarks.js`
- `src/models/bookmark.js`
- `tests/bookmarks.test.js`
- `tests/health.test.js`
- `README.md`

**Reviewer:** Training peer acting as the human reviewer.

**Stop conditions:** Pause if the change needs a new dependency, sensitive data,
another endpoint, or a file outside the plan.

### Acceptance criteria and trace

| Criterion | Specification | Test evidence |
| --- | --- | --- |
| Valid requests return `201` and one `data` object | FR-001 | `creates a bookmark with all accepted fields` |
| Optional fields use accepted defaults | FR-002 | `normalizes omitted optional fields` |
| URL and title rules return `400` | FR-003, FR-004 | required-field table tests |
| Description and tag rules return `400` | FR-005, FR-006 | optional-field table tests |
| Duplicate URL returns `409` | FR-007, FR-008 | `rejects a duplicate URL` |

## Patch

| File | Change | Requirement |
| --- | --- | --- |
| `src/index.js` | Mount the Bookmark router and preserve the health endpoint. | FR-001 |
| `src/routes/bookmarks.js` | Validate input, reject duplicate URLs, and return accepted envelopes. | FR-001, FR-003 to FR-008 |
| `src/models/bookmark.js` | Store bookmarks in memory and generate IDs and timestamps. | FR-002, FR-007 |
| `tests/bookmarks.test.js` | Exercise every accepted creation behavior. | FR-001 to FR-008 |
| `tests/health.test.js` | Protect the starter health behavior. | Regression check |
| `README.md` | Document the bounded slice and verification command. | Handoff |

No dependency or unrelated endpoint was added.

## Tests

**Command:** `npm test`

**Observed result:** 2 suites and 18 tests pass.

**Review evidence:** The suite sends HTTP requests through Express with Supertest.
It checks status codes, response envelopes, generated fields, defaults, validation,
and duplicate handling.

## Review decision

**Decision:** Approve

**Reviewer:** Training peer acting as the human reviewer.

**Reason:** The patch matches FR-001 through FR-008, adds no dependency, keeps the
health endpoint, and leaves every non-goal untouched.

## Deferred scope

Authentication, authorization, persistent storage, list/read/update/delete routes,
filtering, pagination, import/export, rate limiting, deployment, CI changes, MCP
configuration, and custom-agent work remain deferred.

The in-memory store resets when the process restarts. The training slice accepts
this behavior. **Do not present it as production persistence.**

## Governance record

| Field | Decision |
| --- | --- |
| Repository boundary | Training sandbox only |
| Workflow | Implement and review one Bookmark creation issue |
| Data | Synthetic `.test` URLs and invented titles only |
| Allowed tools | Approved coding assistant or manual editor, local Node.js test runner |
| Dependencies | Existing `package.json` only |
| Meter | One implementation run plus one correction run |
| Threshold and stop | Stop after the correction run or any scope, data, tool, or dependency breach |
| Meter owner | Learner |
| Reviewer | Training peer |
| Fallback | Manual patch or file-level patch plan |
| Evidence request | None unresolved |

## Next action

**Action:** Merge or copy the patch only after the actual repository reviewer repeats
`npm test` in the approved environment.

**Owner:** Repository reviewer.

**Trigger:** The reviewer has the patch, governance record, and passing local test
output.
