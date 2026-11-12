# Session M7-04 trainer guide: Build and use a planning canvas

**Duration:** 1 hour

## Goal

Show learners how to create and review a project-scoped planning canvas. The
canvas displays GitHub state alongside planning information. GitHub remains the
source of record.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00-0:10 | Define canvas, extension, and drift; compare with chat and issues |
| 0:10-0:17 | Pros, cons, limits, and when not to use one |
| 0:17-0:25 | Translate live issues into canvas requirements |
| 0:25-0:37 | Create the canvas with `/create-canvas` |
| 0:37-0:45 | Review state, actions, and boundaries |
| 0:45-0:55 | Create drift and reconcile the canvas |
| 0:55-1:00 | Explain ownership and launch the lab |

## Prepare

- Every learner has the GitHub Copilot app with `/create-canvas`. Show it under **Customize** → **Skills** → **Installed** as a built-in skill.
- Learners can read the Session M7-03 parent and child issues through GitHub MCP.
- Use a training repository and synthetic issue data.
- Name the canvas owner and reviewer.
- `/context`, `/clear` or `/reset`, and `/rubber-duck` work.

A static JSON edit doesn't meet this session's outcome. It needs live canvas creation.

## Define the terms

- **Canvas:** a shared panel in the app where you and the agent work on one artifact. Both can edit it.
- **Project-scoped canvas:** stored under `.github/extensions` and committed with the repository. User scope (`~/.copilot/extensions`) is personal.
- **Extension:** the code behind the canvas: `package.json`, an entry file such as `extension.mjs`, and optional saved state.
- **State drift:** the canvas shows older data than the source. Show it in the demo.

Docs checked: [Working with canvas extensions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
confirms `/create-canvas`, **Customize** → **Canvas**, and both folders. Check
current docs before class; the app UI changes.

## Canvas, chat, and issues

| | Chat | Canvas | GitHub issues |
| --- | --- | --- | --- |
| Purpose | Ask and reason | See and steer shared state | Record work |
| Lasts | The conversation | Until retired | Until closed |
| Authoritative for | Nothing | Planning fields it owns | Issue state, title, assignee |

**GitHub wins for issue facts.** The canvas wins only for planning status, risk,
and decision.

## Pros, cons, and limits

- **Pros:** one visible view, repeatable actions, survives the chat, direct editing.
- **Cons:** generated code needs review; it keeps a copy of data, so it goes stale; it needs an owner.
- **Refresh:** nothing updates it automatically. A refresh action reads GitHub again and sets the last-refresh time.
- **Don't use one** for a single answer, a one-off draft, or data nobody revisits.

## When to use a canvas

Use a canvas when work needs:

- visible shared state;
- repeated updates;
- several related records;
- named actions;
- a view people can review after the chat ends.

Keep a single answer, draft, or short interview in chat.

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

The source set is fixed: public status mapping, requester status view, empty and
stale states, and access-boundary verification.

The minimum actions are:

- load or refresh approved GitHub issues;
- change a planning status;
- record a decision;
- add or update a risk;
- produce a current summary.

Closing issues, changing assignees, or publishing updates stays outside the canvas.

## Demonstration prompt

```text
/create-canvas Create a delivery-planning canvas for the approved GitHub issues.
Show the parent objective, issue number, status, owner, dependency, risk,
decision, and next action. People can update planning status and record
decisions. Copilot can summarize the canvas and propose updates. Do not close
issues, change assignees, or publish content without a separate confirmation.
```

After generation, ask learners what they would remove. **Keep only what supports a
decision or action.**

## Review the generated canvas

Check:

1. Does every state field support a real decision?
2. Can each action be explained in one sentence?
3. Does the canvas distinguish planning state from GitHub issue state?
4. Are external writes excluded or separately approved?
5. Can the owner recover after an interrupted update?
6. Is there a clear reason to retire the canvas?

## Demo update and drift

1. Ask Copilot to retrieve the Session M7-03 issues through GitHub MCP.
2. Load the approved issue fields into the canvas.
3. Change one status through the visible controls.
4. Ask Copilot to record one decision.
5. Add the lab's reviewed blocker comment to one GitHub issue through MCP.
6. Read the issue again without refreshing the canvas.
7. Show the mismatch and last-refresh time.
8. Refresh the canvas and check the blocker and next action.

Leave learners with the live canvas and linked GitHub issues, not a transfer file.

## References

- [Working with canvas extensions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
- [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
