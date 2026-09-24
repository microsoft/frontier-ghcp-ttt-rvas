---
description: "Reference HVE traceability and scoring rubric for the Engineering Decision API"
---

# Reference HVE evidence and rubric

## HVE artifact chain

| Phase | Expected artifact | Required handoff |
|-------|-------------------|------------------|
| Research | `.copilot-tracking/research/` | Approach, alternatives, constraints |
| Plan | `.copilot-tracking/plans/`, `details/`, and plan log | Criteria, files, checks, approval |
| Implement | `.copilot-tracking/changes/` | Changed files and validation results |
| Review | `.copilot-tracking/reviews/` | Findings, criterion verdicts, human decision |

The reference chain starts in standalone mode so every handoff is visible. The
combined `/rpi` agent would orchestrate the same phases and add Discover after
Review.

## Product and Agile handoff

Product Manager Advisor should preserve the create-only experiment, identify
durability and adoption as unproven assumptions, and keep persistence out of the
slice. Agile Coach should turn that decision into one story whose acceptance
criteria match the request, validation, conflict, metadata, and container rules.

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

Repository context applies to every HVE agent. The targeted JavaScript instruction
applies to `src/routes/decisions.js` and both test files. The custom Decision API
Reviewer must return findings first and a criterion verdict table. Those observed
effects are activation evidence.

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
| HVE RPI evidence | 40 | Four phase artifacts form a traceable handoff chain |
| HVE customization | 25 | Context, coding instruction, custom agent, and activation evidence |
| Product and Agile agents | 20 | Advisor and coach outputs shape or confirm the plan |
| Feature validation | 15 | API and container evidence support the review decision |

Recovery artifacts do not earn execution points for the phase they replace. A
submission with no HVE execution does not pass the challenge.
