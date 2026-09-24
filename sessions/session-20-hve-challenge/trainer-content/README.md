---
description: "Trainer guide for the governed HVE Engineering Decision API challenge"
---

# Session 20 Trainer Guide: Governed HVE Challenge

## Delivery objective

Learners must show that they can keep an agent-assisted feature small and
reviewable. The endpoint matters, but evidence is the real assessment surface.
But a green implementation with no traceability is incomplete.

## One-hour plan

| Time | Segment |
|------|---------|
| 0:00–0:08 | Challenge boundary and scoring |
| 0:08–0:18 | Read the API contract as observable behavior |
| 0:18–0:30 | Research-plan-implement-review evidence |
| 0:30–0:40 | Repository and targeted instruction activation |
| 0:40–0:50 | API, container, and data-boundary review |
| 0:50–0:57 | Prepared reference demo |
| 0:57–1:00 | Lab path selection and handoff |

## Preflight

Before the session, verify Node.js 20 or later and review both project trees. The
coordinator may generate lock files after this phase; use the committed package
metadata and locks available at delivery time.

Keep these items ready:

* A clean copy of the starter
* The completed reference evidence
* A prepared test-output and container-build capture
* Printed or shared copies of the evidence workbook and fallback worksheet

Do not depend on a live HVE command. Confirm the approved installation and current
command names before showing an assisted path. If that check fails, teach the same
workflow with ordinary Markdown and local editing.

## Facilitation notes

Start with the brief. Ask learners to identify what is observable from outside the
service. They should find three required strings, one bounded status field, one
conflict rule, generated metadata, and stable errors.

Then compare two files in the reference project:

```text
.github/copilot-instructions.md
.github/instructions/api-review.instructions.md
```

The first applies repository context. The second targets route and test paths.
Activation proof is a path match plus review output that follows the listed checks.
The existence of a file is not proof by itself.

For the prepared demo, show one valid create request, a duplicate whose title uses
different case, and a malformed JSON response. Then show the test and runtime stages
in the Dockerfile. Open the criterion map beside the test file. Stop after seven
minutes even if the live tool path is still running.

## Coaching prompts

Use short questions that force a decision:

* Which file controls the behavior you need to change?
* What check could disprove your current plan fastest?
* Which acceptance criterion lacks test evidence?
* Does the image build test the exact source copied into the runtime stage?
* Did an instruction change the review, or did you only create the file?
* What would make you pause rather than approve?

## Review standard

Use the 100-point rubric in `lab/solution/reference-evidence.md`. The manual and
prepared-patch paths use the same criteria. A learner cannot claim a passing test
that did not run. Precise `not run` evidence is better than invented output.

Require a human decision at the end: approve, request changes, or pause. Missing
evidence should reduce the score even when the endpoint appears to work.

## Source boundary

This session draws on workflow facts observed at HVE showcase commit
`598ba5fbc937abf0dce622b97bcafda63bbc2dd1`. The challenge, language, API, timing,
worksheets, and reference implementation were written independently. Do not bring
source demo prose or templates into the learner materials.
