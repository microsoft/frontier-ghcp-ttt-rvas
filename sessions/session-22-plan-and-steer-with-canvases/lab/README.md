# Session 22 Lab: Plan and Steer Work with Canvases

**Duration:** 2 hours

**Difficulty:** Intermediate

**Prerequisites:** Sessions 20–21, active GitHub Copilot access, and the approved prepared canvas

## Deliverable

A reviewed release-readiness canvas for the synthetic Service Request Portal, plus a completed evidence record. The deliverable must come from live work in the approved canvas with GitHub Copilot.

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Use only the synthetic data supplied in this session.

### Required preflight

- Sign in to GitHub Copilot and confirm that prompts run.
- Open the approved prepared canvas.
- Confirm that Copilot can read the canvas state and call the required actions.
- Confirm that policy allows the canvas and its actions.
- Work in an approved training repository or local folder.
- Do not install an extension, add dependencies, or connect an external system.
- Load the supplied seed state through the approved canvas setup.
- Name a reviewer and a timebox owner.

**Stop here** if GitHub Copilot, the approved canvas, or a required action is unavailable. The files cannot replace live canvas work. Also stop if policy, data classification, action scope, ownership, or evidence rules are unclear.

## Scenario

The Service Request Portal team is preparing a limited release. The release includes intake category selection, attachment guidance, and a support handoff. Current readiness is `conditional` because work, gate, and risk state still need attention.

| Exercise | Task | Time |
| --- | --- | --- |
| 1 | Use Copilot to inspect the contract and baseline | 20 min |
| 2 | Change visible state and verify it with Copilot | 30 min |
| 3 | Ask Copilot to update the same state | 30 min |
| 4 | Review readiness and record ownership | 30 min |
| Buffer | Recovery or peer review | 10 min |

## Exercise 1: Inspect the contract and baseline with Copilot (20 minutes)

**Goal:** Decide whether the prepared artifact is safe and clear enough to use.

1. Open the approved prepared canvas with the supplied seed state.
2. Read `canvas-contract.md`.
3. Ask GitHub Copilot to read the current canvas state.
4. Ask Copilot to list the state collections, allowed actions, validation rules, current revision, and readiness reason.
5. Compare the response with the visible canvas and the contract.
6. In `evidence-record.md`, record the canvas, reviewer, baseline revision, and preflight result.

Pause if an action can change external systems, use non-synthetic data, or bypass the release owner.

**Expected result:** The contract is accepted for the lab, or the record states why the learner paused.

## Exercise 2: Change visible state and verify it with Copilot (30 minutes)

**Goal:** Make a visible state change and keep the proof with it.

Use the canvas controls:

1. Add evidence `E-003`.
   - Type: `test`
   - Summary: `Focused accessibility check passed for attachment guidance.`
   - Location: `training://checks/accessibility-attachment-guidance`
   - Reviewer: `Quality reviewer`
   - Result: `accepted`
2. Move `W-102` from `in-progress` to `review`.
3. Link `E-003` to `W-102`.
4. Increment the revision once.
5. Keep readiness at `conditional`. Pending work, an open risk, and a pending gate remain.
6. Add the before-and-after values to `evidence-record.md`.

Ask Copilot to read the resulting state and report only `W-102`, `E-003`, the revision, and readiness. Compare that report with the canvas.

**Expected result:** `W-102` is in review with accepted evidence, and the visible artifact matches the evidence record.

## Exercise 3: Ask Copilot to update the same state (30 minutes)

**Goal:** Test one refused update and one accepted update.

### 3.1 Test the guardrail

Use the prepared canvas action names if they differ from the prompt below.

```text
Read the current Service Request Portal release state.
Try to update W-103 to ready.
Do not invent or reuse unrelated evidence.
If the contract blocks the change, leave state unchanged.
Report the item ID, linked evidence, revision, readiness result, and reason.
```

The state should not change because `W-103` lacks accepted evidence. Check the visible canvas before recording the refusal.

### 3.2 Add evidence, then request the bounded update

Add:

```text
ID: E-004
Type: runbook
Summary: Support handoff and rollback steps reviewed in the training scenario.
Location: training://runbooks/service-request-portal-support
Reviewer: Operations reviewer
Result: accepted
```

Then ask GitHub Copilot:

```text
Update only W-103 to ready using evidence E-004.
Read the resulting state.
Report W-103, its evidence, the revision, readiness result, and reason.
Do not change any gate, risk, or decision.
```

Compare the report with the visible canvas. Record each field as match or mismatch.

**Expected result:** The refused request leaves the revision unchanged. The accepted request changes only `W-103`, links `E-004`, and increments the revision once.

## Exercise 4: Review readiness and record ownership (30 minutes)

**Goal:** Produce a reviewable release-readiness decision.

1. Review every open work item, risk, decision, gate, and evidence entry.
2. Update `R-001` to `mitigated` only if the record contains a valid mitigation.
3. Set the operations gate to `passed` only if `E-004` supports it.
4. Accept `D-001` only after its owner and rationale are present.
5. Recalculate readiness from the contract.
6. Ask Copilot to read the full state and explain the readiness result from the contract.
7. Complete the ownership section:
   - artifact owner;
   - reviewer;
   - recovery procedure;
   - removal trigger;
   - stop conditions;
   - next safe action.
8. Ask a peer to choose `approve`, `revise`, or `pause`.

Do not force `go`. A correct `conditional` or `no-go` record is better than an unsupported green status.

**Expected result:** The final readiness call follows the recorded state and names who owns the next action.

## Review checklist

- [ ] GitHub Copilot and approved canvas access are recorded.
- [ ] Only synthetic Service Request Portal data is present.
- [ ] Visible and Copilot-requested changes use the same contract.
- [ ] The refused update did not mutate state.
- [ ] The accepted update is visible and bounded.
- [ ] The Copilot report matches the canvas, or the mismatch is resolved.
- [ ] Gate and readiness results cite evidence.
- [ ] Owner, reviewer, recovery procedure, removal trigger, and stop conditions are complete.
- [ ] The peer decision is recorded.

## Recovery procedure

This procedure handles an interruption after the preflight passed. It does not replace the access requirement.

1. Stop all changes.
2. Record the last visible revision and the action that was in progress.
3. Reopen the same approved canvas.
4. Ask Copilot to read the current state without changing it.
5. Compare the reported revision and affected records with the visible canvas.
6. Resume only when the state and report match. Otherwise record `pause` and end the lab.

## Troubleshooting

| Issue | Response |
| --- | --- |
| Copilot or canvas access is missing at preflight | Stop. The learner cannot complete this session |
| Canvas stops responding after preflight | Run the recovery procedure |
| Required action is missing | Stop and record which prerequisite failed |
| Copilot invents evidence | Reject the report and leave state unchanged |
| Report and artifact differ | Treat the artifact as authoritative and pause approval |
| Policy or ownership is unclear | Stop the exercise and record `pause` |

## Solution reference

The `lab/solution/` directory contains one acceptable reviewed state and evidence record. It is a reference, not the only valid release decision.
