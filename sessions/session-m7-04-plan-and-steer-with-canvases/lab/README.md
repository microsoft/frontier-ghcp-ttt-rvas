# Session M7-04 lab: Build a planning canvas and reconcile stale state

**Duration:** 2 hours

**Difficulty:** Intermediate

## Lab outcome

Create and review a planning canvas with the built-in `/create-canvas` skill.
Load live issue state through GitHub MCP. Change an issue in GitHub, detect the
stale canvas data, and refresh it.

**Boundary:** the canvas reads GitHub and never writes to it. Only the one comment
in Part 5 is written, after you preview and approve it.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Check canvas and MCP capabilities | 10 min |
| 2 | Define the minimum canvas requirements | 15 min |
| 3 | Create and simplify the canvas | 30 min |
| 4 | Load and operate live issue state | 25 min |
| 5 | Create and detect state drift | 15 min |
| 6 | Reconcile and record ownership | 25 min |

## Before you start

Complete the track [capability setup](../../../tracks/product-and-delivery-teams.md#capability-setup).

## Part 1: Check canvas and MCP capabilities (10 minutes)

1. Open a GitHub Copilot app session for the training repository.
2. Type `/` and check that `/create-canvas` appears.
3. Open **Customize** → **Canvas** and inspect installed canvases.
4. Open **Customize** → **MCP** → **Installed** and check GitHub MCP.
5. Ask Copilot to retrieve the Session M7-03 parent issue and child issues.

`/create-canvas` is a built-in app skill. Don't install a community replacement.

Use a fresh GitHub MCP read as the authoritative issue list. Start from the live
Session M7-03 parent issue and follow its child links, not chat history.

## Part 2: Define the minimum canvas requirements (15 minutes)

Fill in the purpose, source issues, and ownership sections of
`starter/canvas-requirements.md`. The field and action lists are already there.
Keep only what answers one of these questions:

- Which issues are planned, active, blocked, or ready for review?
- Who owns the next action?
- Which dependency or risk needs attention?
- When did GitHub state last refresh?

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

Open the extension folder under `.github/extensions` and list its files. Check
the visible fields, the actions exposed to Copilot, and any dependency in
`package.json`. If `/create-canvas`, **Customize** → **Canvas**, or the folder
differ in your app, check current docs.

Ask Copilot to remove any field or action beyond the requirements. Don't
hand-edit extension code.

**Checkpoint:** The canvas is smaller after review and contains no GitHub write
action.

## Part 4: Load and operate live issue state (25 minutes)

Ask Copilot to retrieve the Session M7-03 issues through GitHub MCP and load:

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

Don't refresh the canvas yet. Ask Copilot to compare:

- the current visible canvas;
- the fresh GitHub issue;
- the canvas's last-refresh time.

Identify what changed in GitHub but has not yet appeared in the canvas.

## Part 6: Reconcile and record ownership (25 minutes)

Use the canvas refresh action or ask Copilot to call the approved refresh
capability.

Check that:

- the issue's planning status reflects the new blocker;
- the next action names the product-owner decision;
- the GitHub state and planning state remain distinct;
- the last-refresh time changed.

In the live canvas, record who owns it, how to refresh it, and how to recover after
an interruption. Also record when to retire it and the next safe action. Check
that it links the four status-visibility issues for Session M7-05.
Keep any optional fifth issue linked for context, but outside those workstreams.

Run `/context`. If the creation thread is crowded, start a fresh session and
retrieve the live GitHub issues and open the canvas. Then run:

```text
/rubber-duck Critique the live planning canvas against the linked GitHub issues.
Find stale source claims, mixed GitHub and planning states, unsafe actions, and
missing ownership.
```

Apply useful findings directly to the canvas.

## Final deliverable

- A project-scoped canvas under `.github/extensions` that links the four status-visibility issues.
- A short note that names the drift you detected and the refresh that fixed it.
- The canvas owner, refresh method, recovery step, and retirement trigger, recorded in the canvas.
- Your fixes from the `/rubber-duck` critique.
