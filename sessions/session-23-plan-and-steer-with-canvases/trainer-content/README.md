# Session 23 Trainer Guide: Build and Use a Planning Canvas

**Duration:** 1 hour

## Delivery objective

Learners create a project-scoped planning canvas, review the generated extension,
and learn that a canvas is a projection of GitHub state rather than the source of
record.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00-0:08 | Decide when visible state helps |
| 0:08-0:18 | Translate the issue plan into canvas requirements |
| 0:18-0:32 | Create the canvas with `/create-canvas` |
| 0:32-0:43 | Review state, actions, and boundaries |
| 0:43-0:53 | Create drift and reconcile the canvas |
| 0:53-1:00 | Explain ownership and launch the lab |

## Required preflight

- Confirm that every learner has the GitHub Copilot app.
- Confirm that `/create-canvas` is available.
- Open **Customize** → **Skills** → **Installed** and show that `create-canvas` is
  a built-in skill.
- Confirm that the learner can read the Session 22 issues through GitHub MCP.
- Use a training repository and synthetic issue data.
- Name the canvas owner and reviewer.

> [!IMPORTANT]
> Stop if canvas creation, GitHub reads, or the required canvas actions are unavailable. A static JSON edit does not meet this session's outcome.

## When to use a canvas

Use a canvas when the work needs:

- visible shared state;
- repeated updates;
- several related records;
- named actions;
- a review view that survives the chat.

Stay in chat when the learner needs one answer, one draft, or a short interview.

## Translate the plan into requirements

Start from `lab/starter/canvas-requirements.md`. The minimum planning state is:

- parent objective;
- issue number and title;
- status;
- owner or ownership gap;
- dependency;
- risk;
- decision;
- next action.

The minimum actions are:

- load or refresh approved GitHub issues;
- change a planning status;
- record a decision;
- add or update a risk;
- produce a current summary.

Closing issues, changing assignees, or publishing updates stays outside the canvas unless the learner adds and approves those capabilities.

## Demonstration prompt

```text
/create-canvas Create a delivery-planning canvas for the approved GitHub issues.
Show the parent objective, issue number, status, owner, dependency, risk,
decision, and next action. People can update planning status and record
decisions. Copilot can summarize the canvas and propose updates. Do not close
issues, change assignees, or publish content without a separate confirmation.
```

After generation, ask learners what they would remove. Simpler is better.

## Review the generated canvas

Check:

1. Does every state field support a real decision?
2. Can each action be explained in one sentence?
3. Does the canvas distinguish planning state from GitHub issue state?
4. Are external writes excluded or separately confirmed?
5. Can the owner recover after an interrupted update?
6. Is there a clear reason to retire the canvas?

## Demo update and drift

1. Ask Copilot to retrieve the Session 22 issues through GitHub MCP.
2. Load the approved issue fields into the canvas.
3. Change one status through the visible controls.
4. Ask Copilot to record one decision.
5. Add the lab's reviewed blocker comment to one GitHub issue through MCP.
6. Read the issue again without refreshing the canvas.
7. Show the mismatch and last-refresh time.
8. Refresh the canvas and verify the blocker and next action.

## Optional prepared route

The previous release-readiness canvas exercise remains in `lab/optional-prepared-canvas/`. Use it when the audience needs deeper guardrail practice after creating the main canvas.

## Product notes verified September 24, 2026

Check current canvas availability, `/create-canvas`, Customize controls, capability review, and persistence behavior before delivery.

Official references:

- [Working with canvas extensions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
- [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
