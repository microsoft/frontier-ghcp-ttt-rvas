# Session 17 Lab: Decide a Bounded Governance Trial

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–03

**Deliverable:** A completed evidence map, policy decision, measurement guardrail,
and reversible rollout plan for one fictional trial

## Lab overview

Use the fixed tabletop scenario in `starter/fictional-scenario-brief.md`. A team
proposes a two-week code-review trial in `training-review-sandbox`. The repository
contains synthetic task records. Production repositories, customer data,
deployment, external MCP servers, and live policy changes are outside scope.

| Exercise | Output | Time |
| --- | --- | --- |
| 1 | Evidence map and Checkpoint 1 | 35 min |
| 2 | Policy decision and Checkpoint 2 | 30 min |
| 3 | Measurement guardrail | 25 min |
| 4 | Rollout gates and final review | 30 min |

## Preflight and access rule

The tabletop route needs only the supplied files. Use it when live policy pages,
administrator settings, or analytics are unavailable.

For a live review, confirm approved access to current GitHub documentation and the
relevant administrator settings. If access is missing, **stop the live claim or
setting change**. Mark the evidence request as pending and continue with the
fictional scenario.

Use synthetic data only. Never copy the exclusion examples into a prompt, issue,
comment, or live system.

| Starter file | Use |
| --- | --- |
| `fictional-scenario-brief.md` | Fixed scenario facts and exclusions |
| `policy-checklist.md` | Evidence map and checkpoint record |
| `analytics-scenarios.md` | Measurement prompts |
| `sample-analytics-data.json` | Synthetic trial observations |
| `rollout-template.md` | Policy, measurement, and rollout record |
| `exclusion-config/` | Static example; verify current surface limitations before live use |

## Exercise 1: Build the evidence map (35 min)

Read `fictional-scenario-brief.md`, then complete `policy-checklist.md`.

For every claim, choose one status:

- **confirmed in scenario**;
- **live evidence pending**;
- **out of scope**.

Record:

1. repository and bounded workflow;
2. administrator, data owner, engineering owner, reviewer, and final approver;
3. data classification and excluded data;
4. approved tool boundary and prohibited integrations;
5. the trainer-maintained exercise run counter and stop rule;
6. the manual review fallback.

Current entitlement, retention, administrator settings, and commercial terms are
not scenario facts. Assign an owner and mark each relevant claim pending.

### Checkpoint 1: Evidence map

A partner or trainer must verify:

- [ ] Every required claim has an owner and status.
- [ ] Scenario facts are separate from live claims.
- [ ] Production, customer data, deployment, external MCP servers, and live policy
  changes are outside scope.
- [ ] The manual fallback produces the same review evidence.

Do not continue until the checkpoint is signed. Compare with
`solution/evidence-map.md` only after peer review.

## Exercise 2: Make the policy decision (30 min)

Choose one decision: proceed, proceed in the repository sandbox only, defer, or
pause.

The reference scenario supports work **in the repository sandbox only**. It does
not support production use or wider rollout.

Record:

- what may start now;
- what remains blocked;
- the owner of each pending evidence request;
- the immediate pause triggers;
- the next review date.

### Checkpoint 2: Policy decision

A partner or trainer must verify:

- [ ] The decision cites the evidence map.
- [ ] Allowed and blocked scope are explicit.
- [ ] Pending evidence has an owner.
- [ ] The record states when the decision expires or must be reviewed.

Do not begin measurement design until the checkpoint is signed. Compare with
`solution/policy-decision.md` after review.

## Exercise 3: Define the measurement guardrail (25 min)

Use `analytics-scenarios.md` and `sample-analytics-data.json`.

Use these fictional trial rules:

| Item | Rule |
| --- | --- |
| Window | Two weeks or 10 reviewed tasks, whichever comes first |
| Quality | At least 9 of 10 tasks meet acceptance criteria |
| Safety | Zero restricted-data events |
| Rework | No more than 3 tasks need material rewrite |
| Exercise guard | Trainer-maintained automated-run counter |
| Stop guard | Pause at 20 automated runs |
| Fallback | Human review with the same acceptance checklist |

Map each signal to a decision: continue, gather more evidence, or pause. These are
fictional exercise values, not product usage metrics, billing controls, or
commercial guidance.

Compare with `solution/measurement-guardrail.md`.

## Exercise 4: Complete reversible rollout gates (30 min)

Complete `rollout-template.md`.

| Gate | Required decision |
| --- | --- |
| Start | Sandbox facts, owners, tool boundary, reviewer, meter, and fallback are recorded. |
| Continue | Quality, safety, rework, and run-count rules pass. |
| Expand | Administrator and data owner confirm current evidence for the added scope. |
| Pause | Restricted data appears, a boundary check fails, rework exceeds 3 tasks, or the run counter reaches 20. |

Record the final decision and next action. Compare the full set with
`solution/rollout-plan.md`.

## Final deliverable

Submit:

1. completed evidence map;
2. sandbox-only policy decision;
3. measurement guardrail;
4. reversible rollout plan.

## Verification

- [ ] Checkpoint 1 is signed after the evidence map.
- [ ] Checkpoint 2 is signed after the policy decision.
- [ ] Every decision has an owner and evidence source.
- [ ] Live claims are marked pending when current access is unavailable.
- [ ] The trial uses synthetic data and excludes production actions.
- [ ] The exercise guard, threshold, escalation, stop condition, and fallback are explicit.
- [ ] The record identifies the run counter as an exercise stop guard.
- [ ] Expand requires new evidence and owner approval.
- [ ] The final decision states the next action and review date.
