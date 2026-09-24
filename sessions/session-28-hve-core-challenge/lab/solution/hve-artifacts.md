---
description: "Trainer reference for the HVE RPI, customization, product, and Agile artifact chain"
---

# HVE artifact reference

Use this reference to explain expected handoffs or recover one blocked phase. It
shows the minimum useful content, not text that learners should copy. Learners must
record the paths and decisions produced by their own HVE run.

## Research reference

**Expected path:** `.copilot-tracking/research/<date>/decision-create-research.md`

* Owning code: `src/index.js`, the decision router, and HTTP tests
* Selected approach: one router instance per app, with process-local records
* Rejected approach: module-global records because tests and app instances would share state
* Constraints: no new application dependency, persistence, authentication, or extra endpoint
* Discriminating checks: malformed JSON and a duplicate title with changed case and spacing

## Plan reference

**Expected path:** `.copilot-tracking/plans/<date>/`

| Phase | Files | Exit check |
|-------|-------|------------|
| Route behavior | `src/routes/decisions.js`, `src/index.js` | Focused HTTP tests pass |
| Contract tests | `tests/decisions.test.js` | Every supplied criterion has evidence |
| Container | `Dockerfile`, `.dockerignore`, container test | Tested source reaches non-root runtime |
| Review | HVE review artifact | Human chooses approve, request changes, or pause |

The plan or critique should record any difference between research, Product
Manager Advisor, Agile Coach, and the approved implementation path.

## Customization reference

* Repository context keeps every HVE agent inside the create-only slice.
* The JavaScript/API instruction applies stable envelopes, app-instance state, and
  HTTP-level tests to matching files.
* Decision API Reviewer reads evidence and returns findings before a criterion table.

Activation is proven when a later artifact cites or applies one of those rules.

## Product and Agile reference

Product Manager Advisor should recommend a bounded experiment. The intended value
is faster, more consistent capture of decisions. Adoption and durable retention
remain assumptions, and a human must decide who owns decision quality.

Agile Coach should produce a story similar to:

> As a technical lead, I want to submit a structured engineering decision so that
> the team can capture its context and chosen direction while they are fresh.

Acceptance criteria should cover required strings, allowed status values, default
status, normalized duplicate detection, generated metadata, stable errors, focused
tests, and the production container. List, update, delete, persistence, and
authentication remain excluded.

## Changes reference

**Expected path:** `.copilot-tracking/changes/<date>/decision-create-changes.md`

The changes log should name modified files, decisions, validation commands, and any
deviation from the approved plan. It must separate an offline Dockerfile contract
check from an actual image build.

## Review reference

**Expected path:** `.copilot-tracking/reviews/<date>/decision-create-plan-review.md`

The review should map every acceptance criterion to implementation and test
evidence, list findings by severity, and record the human decision. Missing command
evidence is `not run`, never inferred as a pass.

## Combined RPI comparison

Direct phase prompts expose and gate each handoff. Combined `/rpi` orchestrates
the same phases and uses Follow-up after Review. Follow-up routes defects or
missing evidence without silently expanding the approved implementation.