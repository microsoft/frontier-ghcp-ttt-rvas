# Session 08 Lab — Copilot App and Canvas Extensions

**Duration:** 2 hours  
**Difficulty:** Advanced  
**Prerequisites:** Sessions 01–07  
**Deliverable:** A reviewed canvas brief and an approved-sandbox canvas, or a manual fallback record

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Use only synthetic data. Confirm that the Copilot App, canvas creation, repository scope, and selected actions are approved.

If the app or canvas access is unavailable, complete the brief and simulate the changes manually. Do not bypass policy or move the workflow to another surface.

| Exercise | Task | Time |
| --- | --- | --- |
| 1 | Define the canvas contract | 25 min |
| 2 | Create and test the canvas | 45 min |
| 3 | Add one bounded capability | 25 min |
| 4 | Peer review and handoff | 25 min |

## 1. Define the canvas contract

Read `lab/starter/canvas-brief.md`. Complete the state, user actions, agent capabilities, validation, data boundary, owner, and fallback. Limit the scope to the synthetic delivery-readiness workflow.

The canvas must support these statuses:

```text
planned
in-progress
review
ready
```

An item can move to `ready` only when it has evidence. Do not add deployment, external data, or unbounded agent actions.

## 2. Create and test the canvas

On an approved Copilot App surface, run `/create-canvas` and use the completed brief as the prompt. Choose **project scope** only when the sandbox repository is approved for shared extensions. Otherwise, use personal scope or complete the manual fallback.

Add two synthetic items through the canvas. Change one status directly. Ask the agent to change the other named item. Confirm that the visible board matches the agent result.

## 3. Add one bounded capability

Ask the agent to add one capability that supports the workflow. Good choices:

- list items flagged for review;
- reject an attempt to mark an item ready without evidence;
- return the evidence missing from a named item.

Do not add external tools or data sources. Test the new capability with one success case and one rejected case.

## 4. Peer review and handoff

Complete `lab/starter/canvas-review.md` with a partner. Check that each action is needed, the data boundary is explicit, and the owner can retire the canvas. Record the approved-sandbox or manual-fallback result.

## Completion checklist

- [ ] The canvas has bounded state and accepted statuses.
- [ ] User actions and agent capabilities are named and reviewed.
- [ ] The ready state requires evidence.
- [ ] The canvas uses synthetic data and no external tools.
- [ ] The reviewer, owner, fallback, and removal path are recorded.
