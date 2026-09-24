---
description: "Reference traceability evidence and scoring rubric for the Engineering Decision API"
---

# Reference evidence and rubric

## Criterion map

| Criterion | Implementation | Test evidence |
|-----------|----------------|---------------|
| Health route remains green | `src/index.js` | `tests/health.test.js` |
| Required strings and status | `validateDecision` | Invalid-field and status cases |
| Proposed default and accepted states | Decision creation | Create and status cases |
| Case-insensitive duplicate conflict | Route-local decision store | Duplicate-title case |
| Generated ID and UTC time | `crypto.randomUUID`, `toISOString` | Create metadata assertions |
| Stable errors | Route and error middleware | Exact envelope assertions |
| Tested production container | `Dockerfile`, `.dockerignore` | `tests/container.test.js`; image build runs `npm test` |

The targeted instruction applies to `Dockerfile`, `src/routes/decisions.js`, and
the test files. Those path matches are the activation proof. Its checks appear in
the table above and in the review notes below.

## Reference review

All required behavior is present. State is isolated per app instance, so tests do
not leak records. The implementation ignores unknown fields and returns no stack
trace. The image build runs the tests, then copies tested source and production-only
dependencies into a non-root runtime stage with a health check. Process-local
storage remains a known limit and is outside the brief.

Suggested commit preview:

```text
feat(api): add engineering decision creation
```

Suggested pull-request summary: add the bounded decision-create route, stable
validation and conflict responses, generated metadata, focused HTTP tests, and a
tested production container.

## Scoring rubric

| Area | Points | Full-credit evidence |
|------|-------:|----------------------|
| Feature and image contract | 35 | Every API rule passes and the container contract is reviewable |
| Focused tests | 20 | Tests cover success, validation, conflict, and malformed JSON |
| RPI evidence | 20 | Research, plan, changes, and review trace to the brief |
| Instruction use | 10 | Repository and targeted guidance exist with activation proof |
| Risk and handoff | 15 | Data/input risks, decision, commit preview, and PR summary |

Score the prepared-patch route against the same 100 points. Award contract and
test points for precise, reviewable planned evidence. Mark execution claims as
`not run`; do not treat them as passes.
