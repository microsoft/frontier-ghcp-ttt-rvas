# Session 23 Lab: Create a Delivery-Planning Canvas

**Duration:** 2 hours
**Difficulty:** Intermediate

## Objective

Create a live planning canvas from the Session 22 GitHub issues, review its capabilities, and use it to steer delivery work.

## Required preflight

**Access policy:** GitHub Copilot app access, `/create-canvas`, GitHub MCP reads, and the required canvas actions are required.

1. Open the GitHub Copilot app.
2. Confirm that `/create-canvas` is available.
3. Confirm that GitHub MCP can retrieve the Session 22 issues.
4. Name the canvas owner and reviewer.
5. Set a boundary: the canvas may not close issues, change assignees, or publish updates.

> [!IMPORTANT]
> **Stop if required access is missing.** Resolve the app, canvas creation, GitHub reads, or required action access before continuing.

## Time plan

| Phase | Work | Time |
| --- | --- | --- |
| 1 | Define the canvas | 20 min |
| 2 | Create and simplify it | 35 min |
| 3 | Load issues and update state | 30 min |
| 4 | Verify and review | 25 min |
| 5 | Record ownership | 10 min |

## Phase 1: define the canvas

Complete `starter/canvas-requirements.md`.

Keep only the fields and actions needed to answer:

- What are we trying to deliver?
- Which issues are active, blocked, or ready for review?
- Who owns the next action?
- Which dependency or risk needs attention?
- Which decision changed the plan?

## Phase 2: create and simplify the canvas

Use `/create-canvas` with the approved requirements.

Review the generated canvas before using it:

- remove fields that do not support a decision;
- remove actions that exceed the lab boundary;
- confirm that Copilot can read and update the approved state;
- record the final capabilities in `starter/canvas-review-record.md`.

Do not accept a complex canvas because it looks impressive.

## Phase 3: load issues and update state

Ask Copilot to retrieve the Session 22 parent and child issues through GitHub MCP.

Load:

- issue number and title;
- current GitHub state;
- planning status;
- owner or ownership gap;
- dependency;
- next action.

Then:

1. change one planning status through visible controls;
2. ask Copilot to update a different planning status;
3. record one risk;
4. record one decision with owner and reason;
5. ask Copilot for a concise current summary.

## Phase 4: verify and review

Compare:

- the visible canvas;
- Copilot's summary;
- a fresh GitHub MCP read.

Record each mismatch. A planning status may differ from the GitHub issue state, but the canvas must label that difference clearly.

A peer records **Approve**, **Revise**, or **Pause**.

## Phase 5: record ownership

Complete:

- artifact owner;
- reviewer;
- recovery procedure;
- retirement trigger;
- next safe action.

## Deliverables

1. A live learner-created planning canvas.
2. A completed canvas review record.
3. Loaded GitHub issue state.
4. One visible update and one Copilot-requested update.
5. A peer decision.

## Completion checklist

- [ ] `/create-canvas` was used.
- [ ] Unnecessary state or actions were removed.
- [ ] GitHub issues came from a live MCP read.
- [ ] External writes remain outside the canvas boundary.
- [ ] Visible state, Copilot's report, and GitHub state were compared.
- [ ] Mismatches are explained or resolved.
- [ ] Owner, recovery, and retirement are recorded.

## Optional prepared-canvas exercise

Use [`optional-prepared-canvas/`](optional-prepared-canvas/) for an additional release-readiness and guardrail exercise.
