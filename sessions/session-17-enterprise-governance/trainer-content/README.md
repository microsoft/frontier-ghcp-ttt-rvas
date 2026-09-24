# Session 17 Trainer Guide: Enterprise Governance

## Delivery objective

Learners create an evidence-backed decision record, an exercise run guard, and
reversible rollout gates. This is a tabletop decision exercise, not an
administrator configuration lab. Check current GitHub documentation and customer
policy. Training material cannot establish entitlement, compliance, retention,
or availability.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:08 | Governance decisions need owners and evidence |
| 0:08–0:18 | Access, data, and tool preflight |
| 0:18–0:30 | Evidence-map exercise |
| 0:30–0:42 | Scenario-based policy decision |
| 0:42–0:52 | Measurement guardrail |
| 0:52–1:00 | Rollout gates and lab handoff |

## Prepare

- Use the supplied fictional scenario in
  `lab/starter/fictional-scenario-brief.md`.
- Name the administrator, data owner, engineering reviewer, and final approver.
- Add security, privacy, legal, or finance reviewers only when the scope requires
  them.
- Confirm the approved tools and usage guard. Prepare the static exclusion
  example, but never place its sensitive content into a prompt or live system.

## Scripted walkthrough

### 0:00–0:08: Decision owners and evidence

**Slides:** *Enterprise Governance*, *Agenda*, *Start with evidence*, and
*Governance turns uncertainty into decisions*

1. Say: “The team wants one workflow in one sandbox. The decision is smaller than
   an enterprise rollout.”
2. Ask who owns access, data classification, review, and the final start decision.
3. Reject answers that cite only a slide or training statement. Evidence must come
   from a named owner or current approved source.
4. Open `lab/solution/evidence-map.md` and show the status vocabulary:
   **confirmed in scenario**, **live evidence pending**, and **out of scope**.

### 0:08–0:18: Access, data, and tool boundary

**Slides:** *A boundary has inputs, actions, and outputs* and *Preflight*

1. Read the fixed scope from `fictional-scenario-brief.md`.
2. Draw a box around `training-review-sandbox`.
3. Put synthetic task records and one pull request inside the box.
4. Put production repositories, customer data, deployment, external MCP servers,
   and live policy changes outside it.
5. Name the manual fallback: use the same acceptance checklist and human review
   without automated assistance.

### 0:18–0:30: Build the evidence map

**Slides:** *Policy decision sequence*, *Worked scenario*, and
*Evidence-map checkpoint*

1. Open `policy-checklist.md`.
2. Fill the repository, workflow, data class, approved tool boundary, reviewer,
   meter, stop rule, and fallback.
3. Mark the repository and synthetic data as confirmed scenario facts.
4. Mark current entitlement, retention, and administrator settings as live evidence
   pending.
5. Ask one learner to find an unsupported assumption.

**Checkpoint 1:** Compare the map with `lab/solution/evidence-map.md`. Do not move
to policy choice until every required field has an owner and status.

### 0:30–0:42: Make the policy decision

**Slides:** *Policy decision checkpoint* and *Data and tool boundaries*

1. State the available choices: proceed, sandbox only, defer, or pause.
2. Ask the group to choose one and cite the evidence map.
3. Use the reference decision: **Proceed in the repository sandbox only.**
4. Read the blocked scope aloud. Expansion needs current administrator and data
   owner evidence.
5. Record the next review date and the event that would force an immediate pause.

**Checkpoint 2:** Compare with `lab/solution/policy-decision.md`. A complete record
must state what may start now, what remains blocked, and who owns the missing
evidence.

### 0:42–0:52: Measurement and rollout gates

**Slides:** *Measurements need a decision attached*, *Measurement guardrail*,
*Worked measurement rule*, and *Rollout gates*

1. Open `sample-analytics-data.json`. State that it is synthetic.
2. Use the fixed window: two weeks or 10 reviewed tasks.
3. Record the quality rule, zero restricted-data rule, rework threshold, and
   20-run stop guard.
4. State that the counter is an exercise stop guard, not a product usage or
   billing metric.
5. Map each threshold to continue, gather evidence, or pause.
6. Open `lab/solution/rollout-plan.md` and trace start, continue, expand, and pause.

### 0:52–1:00: Lab handoff

**Slides:** *Lab handoff*

1. Point learners to `lab/README.md` and the fixed scenario brief.
2. State that Checkpoint 1 follows the evidence map and Checkpoint 2 follows the
   policy decision.
3. Name the four deliverables: evidence map, policy decision, measurement
   guardrail, and rollout plan.
4. Explain the access rule. Missing live evidence does not block the tabletop. It
   blocks live claims and scope expansion.
5. Tell learners to compare with `lab/solution/` only after recording their final
   decision.

**Handoff line:** “Start with the evidence map. The trainer will not approve the
policy decision until every required claim has an owner and status.”

## Facilitation notes

At 0:42, complete the policy decision even when live evidence is pending. At 0:55,
stop discussion and move to the lab handoff.

## Common questions

**Which plan includes a feature?** Check current official GitHub documentation and the customer agreement or ask the administrator. Do not guess.

**Can analytics prove productivity?** No. They are one input. Compare bounded work with acceptance criteria, review evidence, and a human baseline.

**Does content exclusion make all data safe?** No. Treat it as one control.
Check current support for the Copilot surface in use. Keep restricted data out of
training prompts and follow the customer classification process.
