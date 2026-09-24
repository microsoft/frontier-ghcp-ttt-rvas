# Session 23 Lab: Build, Drift, and Reconcile a Planning Canvas

**Duration:** 2 hours

**Difficulty:** Intermediate

**Deliverable:** A project-scoped planning canvas that detects and reconciles a
real GitHub state change

## Deliverables

- The generated and reviewed canvas extension
- The live planning canvas
- One controlled GitHub state change
- The completed reconciliation record

## Lab outcome

Create and review a planning canvas with the official `/create-canvas` skill.
Load live issue state through GitHub MCP, create a controlled state change, detect
stale canvas data, and reconcile it.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Verify canvas and MCP capabilities | 15 min |
| 2 | Define the minimum canvas contract | 20 min |
| 3 | Create and simplify the canvas | 30 min |
| 4 | Load and operate live issue state | 25 min |
| 5 | Create and detect state drift | 15 min |
| 6 | Reconcile and record ownership | 15 min |

## Preflight

Complete the track [capability setup](../../../tracks/product-and-delivery-teams.md#capability-setup).

Confirm GitHub Copilot access. **Stop if access is unavailable.**

## Part 1: Verify canvas and MCP capabilities (15 minutes)

1. Open a GitHub Copilot app session for the training repository.
2. Type `/` and confirm that `/create-canvas` appears.
3. Open **Customize** → **Canvas** and inspect installed canvases.
4. Open **Customize** → **MCP** → **Installed** and confirm GitHub MCP.
5. Ask Copilot to retrieve the Session 22 parent issue and child issues.

`/create-canvas` is a built-in app skill. Do not install a community replacement.
Stop if the skill or GitHub reads are unavailable.

## Part 2: Define the minimum canvas contract (20 minutes)

Complete `starter/canvas-requirements.md`.

The canvas must answer:

- What outcome are we delivering?
- Which issues are planned, active, blocked, or ready for review?
- Who owns the next action?
- Which dependency or risk needs attention?
- When did GitHub state last refresh?

Allow only these actions:

- refresh issue state from GitHub;
- change planning status in the canvas;
- record a risk or decision;
- assign the next planning action.

The canvas must not close issues, change assignees, or publish comments.

**Checkpoint:** Every field and action supports a named planning decision.

## Part 3: Create and simplify the canvas (30 minutes)

Run:

```text
/create-canvas

Create a project-scoped delivery-planning canvas from
@starter/canvas-requirements.md. Store it under .github/extensions. It must show
the parent outcome, child issues, planning status, GitHub state, owner, dependency,
risk, next action, and last refresh. It may read GitHub state but must not write
to GitHub.
```

The agent should create the extension and open it in the side panel.

Review:

- the files created under `.github/extensions`;
- the visible fields and actions;
- the capabilities exposed to Copilot;
- any package or dependency added by the extension.

Ask Copilot to remove generated state or actions that exceed the approved contract.
Record each keep, change, or remove decision in
`starter/canvas-review-record.md`.

**Checkpoint:** The canvas is smaller after review and contains no GitHub write
action.

## Part 4: Load and operate live issue state (25 minutes)

Ask Copilot to retrieve the Session 22 issues through GitHub MCP and load:

- issue number and title;
- GitHub state;
- planning status;
- owner or ownership gap;
- dependency;
- next action;
- retrieval time.

Then:

1. change one planning status through the visible canvas controls;
2. ask Copilot to change another planning status through a canvas capability;
3. add one risk with an owner;
4. add one decision with a reason;
5. ask Copilot for a current canvas summary.

Compare the visible state with Copilot's summary.

## Part 5: Create and detect state drift (15 minutes)

Choose one child issue. Through GitHub MCP, preview this comment:

```text
Planning update: waiting for a product-owner decision on the public status
vocabulary. Do not start implementation until the decision brief is updated.
```

Approve the comment, then retrieve the issue in a fresh request.

Do not refresh the canvas yet. Ask Copilot to compare:

- the current visible canvas;
- the fresh GitHub issue;
- the canvas's last-refresh time.

Record the mismatch. The canvas should now be visibly stale.

## Part 6: Reconcile and record ownership (15 minutes)

Use the canvas refresh action or ask Copilot to call the approved refresh
capability.

Confirm that:

- the issue's planning status reflects the new blocker;
- the next action names the product-owner decision;
- the GitHub state and planning state remain distinct;
- the last-refresh time changed.

Complete the ownership section:

- artifact owner;
- reviewer;
- refresh procedure;
- recovery procedure;
- retirement trigger;
- next safe action.

## Verification

- [ ] `/create-canvas` created a project-scoped extension.
- [ ] Generated files and capabilities were reviewed.
- [ ] Unnecessary state and actions were removed.
- [ ] Live GitHub issues were loaded through MCP.
- [ ] One visible and one agent-requested canvas update succeeded.
- [ ] A reviewed GitHub change made the canvas stale.
- [ ] A fresh read detected the mismatch.
- [ ] Refresh reconciled the canvas without hiding the source difference.
- [ ] Owner, recovery, refresh, and retirement rules are recorded.
