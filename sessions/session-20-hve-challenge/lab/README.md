---
description: "Two-hour governed HVE challenge for an Engineering Decision API endpoint"
---

# Session 20 Lab: Governed Engineering Decision Delivery

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–12 and 17–18, or an approved equivalent baseline

## Objective

Add `POST /api/decisions` to a green Express starter. Deliver code or a precise
prepared patch together with a tested production container and research, plan,
review, risk, and handoff evidence.

## Preflight

1. Work in a local sandbox with synthetic decision records.
2. Identify the human reviewer and a hard stop at 110 minutes.
3. Confirm Node.js 20 or later and whether local package downloads are approved.
4. Run `npm test` when dependencies already exist. Run `npm ci` first only when
	package downloads are approved.
5. Read `starter/challenge-brief.md` and open `starter/evidence-workbook.md`.
6. Choose local, approved remote-container, or prepared-patch validation.
7. Choose the HVE-assisted, manual, or prepared-patch delivery path.

The expected baseline is one passing health test and no implementation of
`POST /api/decisions`.

If HVE Core, package installation, or local execution is unavailable, continue by
editing the evidence workbook manually. Use `starter/prepared-patch-fallback.md`
when you cannot change or run the project. Do not install an unapproved tool or
claim that a command passed when it did not run. A trainer-managed remote build may
use an approved Azure Container Registry after the Dockerfile is ready.

## Time plan

| Time | Work | Evidence |
|------|------|----------|
| 0–10 min | Preflight and boundary | Path, reviewer, stop condition, baseline |
| 10–25 min | Add local guidance | Repository instruction, targeted instruction, activation check |
| 25–40 min | Research the owning files | Research notes and rejected scope |
| 40–55 min | Plan the feature | Criterion-to-file-to-check map |
| 55–90 min | Implement or prepare the patch | Code or precise patch plan, focused tests |
| 90–110 min | Review behavior and risk | Criterion verdicts, test evidence, risk note |
| 110–120 min | Prepare local Git handoff | Commit preview, PR summary, next action |

## Exercise 1: Set the instruction boundary (15 min)

Create concise repository instructions for the starter project. Add
`.github/instructions/api-review.instructions.md` with `description` and `applyTo`
frontmatter. Target only the route, test, and Dockerfile paths you expect to review.

Record an activation check. Name one matching file and show which instruction rule
affected the plan or review. Do not count file creation as activation evidence.

If policy prevents instruction-file changes, write the proposed files in the
evidence workbook and mark them as a prepared patch.

## Exercise 2: Research and plan (30 min)

Read the brief, package metadata, starter route, and health test. Use an approved
HVE RPI workflow if available, or fill the workbook directly.

Research only what controls this feature. Identify routing, state ownership,
validation, errors, the test boundary, and container packaging. Then map each
criterion to a file and a check. Reject authentication, persistence, remote
deployment, list/update/delete routes, and application dependency changes.

Your plan must include malformed JSON and a title that differs only by case. Those
two checks catch weak implementations early.

## Exercise 3: Implement the bounded slice (35 min)

Add the route and focused Jest/Supertest tests. The finished behavior must:

* require non-empty string values for `title`, `context`, and `decision`;
* accept `proposed`, `accepted`, or `superseded` as status;
* default status to `proposed`;
* reject a stored title after trimmed, case-insensitive comparison;
* generate a unique string ID and UTC `createdAt` value;
* return stable success and error envelopes;
* leave the health route green.
* run tests in a container build stage;
* ship only production dependencies and tested source in the runtime stage;
* run as a non-root user with a health check for `GET /health`.

Run `npm test` when local dependencies are available. Validate the image with a
local build only when approved, or use a trainer-managed remote ACR build. Record
the exact command and result. If you are using the fallback, write file-level
pseudocode, concrete request/response cases, and the Dockerfile stage plan instead.

## Exercise 4: Review, risk, and handoff (30 min)

Review every criterion as `pass`, `fail`, `deferred`, or `not run`. Check that
errors reveal no stack traces and that the service does not retain data outside
the local process. Check the runtime image for development dependencies and root
execution. Record the limits of in-memory duplicate detection.

Write a conventional commit-message preview and pull-request summary. Keep Git
local and unchanged: do not commit, push, merge, or create a remote pull request.
At minute 110, stop implementation and finish the handoff.

## Source-demo-to-task map

The lab was independently rewritten from workflow facts observed at HVE showcase
commit `598ba5fbc937abf0dce622b97bcafda63bbc2dd1`. No source prose or templates were
copied.

| Source demo | Core choice | Stretch choice | Excluded choice |
|-------------|-------------|----------------|-----------------|
| 01, full RPI | Research, plan, implement, and review one endpoint | Continue one deferred criterion after approval | Greenfield app and authentication expansion |
| 02, daily RPI | Keep a multi-file feature bounded and regression-tested | Extract storage or update API docs after core review | Separate bug-fix task that repeats error testing |
| 03, product and TPM | Trace supplied criteria and non-goals into the plan | None in this lab | BRD creation and live backlog writes |
| 04, Git operations | Prepare commit and PR text | None in this lab | Commit, merge, push, and remote PR creation |
| 05, prompt engineering | None in the timed core | Analyze and refine the targeted instruction | Broad prompt-library work |
| 06, security planning | Record input and data-boundary risks | Add one owned follow-up risk | Invented incident response exercise |
| 07, customization | Add repository guidance and one targeted instruction | Draft a small API-review agent after tests pass | Editor settings, templates, agent ejection, organization distribution |

Stretch work starts only after the core review decision. It cannot replace risk or
handoff evidence.

## Final Deliverable

Submit or demonstrate:

* A completed `evidence-workbook.md`
* Repository guidance and one targeted API-review instruction, or their prepared patch
* The implemented endpoint and focused tests, or `prepared-patch-fallback.md`
* A tested, production-only container definition or its exact prepared-patch plan
* Exact test or manual evidence with honest `not run` labels
* A risk note, review decision, commit preview, and pull-request summary

## Scoring rubric

| Area | Points | Full-credit evidence |
|------|-------:|----------------------|
| Feature and image contract | 35 | API rules plus tested source, production dependencies, non-root runtime, and health check |
| Focused tests | 20 | Success, validation, conflict, and malformed JSON checks |
| RPI evidence | 20 | Research, plan, changes, and review trace to the brief |
| Instruction use | 10 | Repository and targeted guidance with activation proof |
| Risk and handoff | 15 | Input/data risks, human decision, and local Git text |

Use the same rubric for the prepared-patch path. Planned evidence can earn points
when it is exact and reviewable. It cannot earn execution credit for commands that
did not run.

## Solution reference

Trainers can compare the result with `solution/decision-api` and
`solution/reference-evidence.md` after the learner records a review decision.
