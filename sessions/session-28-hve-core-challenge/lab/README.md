---
description: "HVE Core challenge covering RPI, customization, product agents, and reviewed delivery"
---

# Session 28 Lab: HVE From Product Intent to Reviewed Code

**Duration:** 3 hours

**Difficulty:** Advanced

**Prerequisites:** HVE Core installed; Sessions 01 to 07 and 11 or equivalent experience

## Objective

Use HVE Core to take one Engineering Decision API feature through direct RPI phases,
repository customization, product and Agile refinement, implementation, and review.
The HVE artifacts must show what each agent produced and how one phase changed the
next. The handoff only indexes those artifacts and records the final decision.

## Preflight

1. Work in a local sandbox with synthetic decision records.
2. Confirm the approved HVE Core extension or Copilot CLI plugin is active. Record
   its version or channel. Verify that `/rpi-research`, `/rpi-plan`,
   `/rpi-implement`, `/rpi-review`, `/rpi`, `@Product Manager Advisor`, and
   `@Agile Coach` are available.
3. Confirm that `.copilot-tracking/` is ignored by Git.
4. Identify the human reviewer and reserve roughly the final 20 to 30 minutes for
   Review, the human decision, and handoff.
5. Confirm Node.js 20 or later and whether local package downloads are approved.
6. Run `npm test` when dependencies already exist. Run `npm ci` first only when
   package downloads are approved.
7. Read `starter/product-intent.md`, `starter/challenge-brief.md`, and the thin
   artifact index in `starter/challenge-handoff.md`.
8. Confirm whether container validation will use an approved local engine or a
   trainer-managed remote build.

The expected baseline is one passing health test and no implementation of
`POST /api/decisions`. If an HVE invocation fails, use the HVE phase fallback in
`starter/hve-phase-recovery.md` and continue with the next HVE agent. Do not replace
the complete HVE workflow with manual artifacts.

## Indicative effort

Agent latency varies by model, reasoning level, workspace size, and tool access.
Use these ranges for pacing, not as deadlines. Move on when the evidence gate is
met. If one agent stalls, use the phase-recovery guide and protect time for Review.

| Stage | Indicative range | Evidence gate |
|-------|------------------|---------------|
| HVE preflight and artifact model | 10 to 15 min | Required agents are visible; tracking paths are understood |
| Research and Plan | 30 to 40 min | Research, plan, critique, and human approval exist |
| HVE customization | 20 to 25 min | Three customization layers have activation evidence |
| Product and Agile refinement | 20 to 25 min | Advisor decision, story, criteria, and exclusions exist |
| Implement and validate | 35 to 45 min | Changes log, code, tests, and container evidence exist |
| Review and combined-RPI comparison | 20 to 30 min | Review artifact, human decision, and comparison are recorded |

Treat the ranges as planning guidance, not additive deadlines. Faster phases create
room for deeper artifact review. Slower phases should use recovery rather than
consume the final review gate.

## Exercise 1: Understand HVE and run Research

Before changing code, identify HVE's four component types:

* agents define roles and multi-step protocols;
* prompts provide slash-command entry points;
* instructions apply standards by file pattern;
* `.copilot-tracking/` files carry durable state between phases.

Run:

```text
/rpi-research "Add POST /api/decisions to the starter API using the supplied product intent and feature contract"
```

Open the research artifact under `.copilot-tracking/research/`. Confirm that it
records the scope, a rejected alternative, a constraint, and the next phase.

Clear the chat, attach the research artifact, then run `/rpi-plan`. Inspect the
plan and critique. Approve the plan only when every acceptance
criterion maps to an owning file and a focused check.

## Exercise 2: Customize HVE for the repository

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

## Exercise 3: Explore HVE product and Agile agents

Give `starter/product-intent.md` to `@Product Manager Advisor`. Ask it to test the
feature's value, users, assumptions, priority, and non-goals. Keep its output in
the platform record and cite it from the Plan artifact.

Give the advisor output and challenge brief to `@Agile Coach`. Ask it to produce
one outcome-oriented user story, acceptance criteria, and explicit exclusions.
Compare those criteria with the HVE plan. Update the plan when the product or Agile
artifact exposes a gap, and record that effect in the Plan artifact. Do not copy
the agent outputs into the handoff. Do not create live work items in this lab.

Use the agent picker to locate `@BRD Builder` and `@PRD Builder`. Record when the
team would start with each agent instead of the supplied product intent.

## Exercise 4: Implement and review with HVE

Attach the approved plan and product/Agile artifact, then run `/rpi-implement`.
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

Inspect `.copilot-tracking/changes/`, then run `/rpi-review`. Review every
criterion as `pass`, `fail`, `deferred`, or `not run`. Check that errors reveal no
stack traces, app instances do not share records, and the runtime image excludes
development dependencies and root execution.

If the platform produces commit or pull-request text, leave it in the platform
output. Keep Git local and unchanged: do not commit, push, merge, or create a
remote pull request.

Finally, explain how `/rpi task="..."` would orchestrate the same phases and use
Follow-up to route defects or missing evidence back to the responsible phase. Do
not start another implementation cycle during the lab.

## Scenario-to-task map

| HVE capability | Required task | Evidence |
|----------------|---------------|----------|
| Direct RPI phases | Run Research, Plan, Implement, and Review in order | Tracking artifact from each phase |
| Combined RPI | Explain `/rpi` orchestration and Follow-up | Direct-to-combined comparison |
| Repository context | Add `.github/copilot-instructions.md` | Later phase cites a project rule |
| Coding practice | Add a targeted API instruction | Matching source or test file follows the rule |
| Agent customization | Add a bounded review agent | Agent output uses the required criterion map |
| Product planning | Use Product Manager Advisor | Value, assumptions, priority, and human question |
| Agile refinement | Use Agile Coach | User story, acceptance criteria, and exclusions |

Stretch work starts only after the core review decision. It cannot replace risk or
handoff evidence.

## Final Deliverable

Submit or demonstrate:

* Research, Plan, Implement, and Review artifacts from HVE
* `challenge-handoff.md` with links or paths to those four artifacts, the final
  human decision, unresolved risks, and the next action
* Repository context, a targeted JavaScript/API instruction, and a custom reviewer agent
* Product Manager Advisor and Agile Coach outputs
* The implemented endpoint, focused tests, and production container definition
* Exact test and container results in the HVE artifacts or platform output

## Scoring rubric

| Area | Points | Authoritative evidence |
|------|-------:|------------------------|
| HVE RPI evidence | 40 | Research, Plan, Implement, and Review artifacts |
| HVE customization | 25 | Repository files plus activation evidence in the HVE artifacts |
| Product and Agile agents | 20 | Platform outputs cited by the Plan artifact |
| Feature validation | 15 | Test and container output cited by Implement or Review |

Trainer-provided recovery artifacts can unblock one failed phase. They do not earn
the execution points for that phase, and a fully manual submission does not pass
this HVE challenge. The thin handoff is required for review, but it does not replace
missing phase evidence.

## Official references

* [HVE Core installation](https://github.com/microsoft/hve-core/blob/main/docs/getting-started/install.md)
* [RPI workflow](https://github.com/microsoft/hve-core/blob/main/docs/rpi/README.md)
* [RPI commands](https://github.com/microsoft/hve-core/blob/main/docs/rpi/commands.md)

## Solution reference

Trainers can compare the result with `solution/decision-api` and
`solution/reference-evidence.md` after the learner records a review decision.
