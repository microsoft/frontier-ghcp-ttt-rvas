---
description: "Two-hour HVE Core challenge covering RPI, customization, product agents, and reviewed delivery"
---

# Session 20 Lab: HVE From Product Intent to Reviewed Code

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** HVE Core installed; Sessions 01–07 and 11 or equivalent experience

## Objective

Use HVE Core to take one Engineering Decision API feature through standalone RPI,
repository customization, product and Agile refinement, implementation, and review.
The completed evidence must show what each HVE agent produced and how one phase
changed the next.

## Preflight

1. Work in a local sandbox with synthetic decision records.
2. Confirm the HVE Core extension is active and these entries are available:
   `/task-research`, `/task-plan`, `/task-implement`, `/task-review`, `/rpi`,
   `@Product Manager Advisor`, and `@Agile Coach`.
3. Identify the human reviewer and a hard stop at 115 minutes.
4. Confirm Node.js 20 or later and whether local package downloads are approved.
5. Run `npm test` when dependencies already exist. Run `npm ci` first only when
   package downloads are approved.
6. Read `starter/product-intent.md`, `starter/challenge-brief.md`, and
   `starter/evidence-workbook.md`.
7. Confirm whether container validation will use an approved local engine or a
   trainer-managed remote build.

The expected baseline is one passing health test and no implementation of
`POST /api/decisions`. If an HVE invocation fails, use the HVE phase fallback in
`starter/hve-phase-recovery.md` and continue with the next HVE agent. Do not replace
the complete HVE workflow with manual artifacts.

## Time plan

| Time | Work | Evidence |
|------|------|----------|
| 0–10 min | Verify HVE and inspect the artifact model | Agent availability and tracking paths |
| 10–35 min | Run HVE Research | Research artifact, alternatives, constraints |
| 35–50 min | Run HVE Plan | Plan, details, log, human approval |
| 50–75 min | Customize HVE | Project context, coding instruction, custom agent |
| 75–95 min | Use product and Agile agents | Value review, user story, acceptance criteria |
| 95–110 min | Run HVE Implement | Changes log, code, tests, container definition |
| 110–118 min | Run HVE Review | Findings, criterion verdicts, human decision |
| 118–120 min | Compare combined RPI | `/rpi` and Discover follow-up map |

## Exercise 1: Understand HVE and run Research (35 min)

Before changing code, identify HVE's four component types:

* agents define roles and multi-step protocols;
* prompts provide slash-command entry points;
* instructions apply standards by file pattern;
* `.copilot-tracking/` files carry durable state between phases.

Run:

```text
/task-research topic=add POST /api/decisions to the starter API using the supplied product intent and feature contract
```

Open the research artifact under `.copilot-tracking/research/`. Record the scope,
one rejected alternative, one constraint, and the next agent that consumes it.

Clear the chat, attach the research artifact, then run `/task-plan`. Inspect the
plan, details, and planning log. Approve the plan only when every acceptance
criterion maps to an owning file and a focused check.

## Exercise 2: Customize HVE for the repository (25 min)

Create three repository-owned customization layers:

1. `.github/copilot-instructions.md` with the service context, architecture, data
   boundary, and dependency rule.
2. `.github/instructions/javascript-api.instructions.md` with `description` and
   `applyTo` frontmatter for `src/**/*.js` and `tests/**/*.test.js`. Require stable
   envelopes, app-instance state, and HTTP-level tests.
3. `.github/agents/decision-api-reviewer.agent.md` with a narrow review mission,
   read/search tools only, and a response format that maps findings to criteria.

Record an activation check for each layer. Then ask HVE to review the current plan
again. Note one concrete change caused by the repository context, coding instruction,
or custom agent. File creation alone is not activation evidence.

## Exercise 3: Explore HVE product and Agile agents (20 min)

Give `starter/product-intent.md` to `@Product Manager Advisor`. Ask it to test the
feature's value, users, assumptions, priority, and non-goals. Record its decision
and one question that still needs a human answer.

Give the advisor output and challenge brief to `@Agile Coach`. Ask it to produce
one outcome-oriented user story, acceptance criteria, and explicit exclusions.
Compare those criteria with the HVE plan. Update the plan when the product or Agile
artifact exposes a gap. Do not create live work items in this lab.

Use the agent picker to locate `@BRD Builder` and `@PRD Builder`. Record when the
team would start with each agent instead of the supplied product intent.

## Exercise 4: Implement and review with HVE (25 min)

Attach the approved plan and product/Agile artifact, then run `/task-implement`.
The finished behavior must:

* require non-empty string values for `title`, `context`, and `decision`;
* accept `proposed`, `accepted`, or `superseded` as status;
* default status to `proposed`;
* reject a stored title after trimmed, case-insensitive comparison;
* generate a unique string ID and UTC `createdAt` value;
* return stable success and error envelopes;
* leave the health route green;
* run tests in a container build stage;
* ship only production dependencies and tested source in the runtime stage;
* run as a non-root user with a health check for `GET /health`.

Inspect `.copilot-tracking/changes/`, then run `/task-review`. Review every
criterion as `pass`, `fail`, `deferred`, or `not run`. Check that errors reveal no
stack traces, app instances do not share records, and the runtime image excludes
development dependencies and root execution.

Write a conventional commit-message preview and pull-request summary. Keep Git
local and unchanged: do not commit, push, merge, or create a remote pull request.

Finally, explain how `/rpi task=... auto=false` would orchestrate the same phases
and add Discover. Do not start another implementation cycle during the lab.

## Scenario-to-task map

| HVE capability | Required task | Evidence |
|----------------|---------------|----------|
| Standalone RPI | Run Research, Plan, Implement, and Review in order | Tracking artifact from each phase |
| Combined RPI | Explain `/rpi` orchestration and Discover | Standalone-to-combined comparison |
| Repository context | Add `.github/copilot-instructions.md` | Later phase cites a project rule |
| Coding practice | Add a targeted API instruction | Matching source or test file follows the rule |
| Agent customization | Add a bounded review agent | Agent output uses the required criterion map |
| Product planning | Use Product Manager Advisor | Value, assumptions, priority, and human question |
| Agile refinement | Use Agile Coach | User story, acceptance criteria, and exclusions |

Stretch work starts only after the core review decision. It cannot replace risk or
handoff evidence.

## Final Deliverable

Submit or demonstrate:

* A completed `evidence-workbook.md` with an HVE artifact chain
* Research, plan, changes, and review artifacts from HVE
* Repository context, a targeted JavaScript/API instruction, and a custom reviewer agent
* Product Manager Advisor and Agile Coach outputs
* The implemented endpoint, focused tests, and production container definition
* Exact test evidence, a human review decision, and local Git handoff text

## Scoring rubric

| Area | Points | Full-credit evidence |
|------|-------:|----------------------|
| HVE RPI evidence | 40 | Research, plan, changes, and review artifacts form a traceable chain |
| HVE customization | 25 | Repository context, targeted instruction, custom agent, and activation proof |
| Product and Agile agents | 20 | Advisor decision and Agile story change or confirm the plan |
| Feature validation | 15 | API tests and container evidence support the review decision |

Trainer-provided recovery artifacts can unblock one failed phase. They do not earn
the execution points for that phase, and a fully manual submission does not pass
this HVE challenge.

## Solution reference

Trainers can compare the result with `solution/decision-api` and
`solution/reference-evidence.md` after the learner records a review decision.
