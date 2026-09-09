# Session 08 — Copilot App, Plugins & Canvas Extensions

## Trainer content guide

Use a non-sensitive sandbox. Confirm the Copilot App, enabled features, and participant permissions before the demo. The fallback uses a reviewed canvas brief and manual action simulation.

## One-hour plan

| Time | Topic | Learner evidence |
| --- | --- | --- |
| 0:00–0:10 | App and Customize orientation | Approved surface and sandbox |
| 0:10–0:20 | Pick the smallest customization | Decision table |
| 0:20–0:35 | Canvas design | State and action contract |
| 0:35–0:48 | Create and steer a canvas | Shared artifact update |
| 0:48–0:55 | Review and governance | Peer decision |
| 0:55–1:00 | Lab handoff | Bounded canvas brief |

## Choose the right customization

| Need | Use |
| --- | --- |
| Repository convention | Instructions |
| Repeatable procedure | Skill |
| Specialized role | Custom agent |
| Approved external capability | MCP |
| Shared interactive artifact | Canvas |
| Distributed customizations | Plugin |

Use a canvas when people need to see, edit, steer, or hand off shared state. A chat transcript is usually enough for a question or one-time instruction.

## Canvas design

Start with the artifact. For the lab, use a delivery-readiness board with synthetic work items.

Define:

1. **State:** item name, status, review flag, and evidence link.
2. **User actions:** add an item, update its status, and mark it for review.
3. **Agent capabilities:** read the board and update one named item.
4. **Validation:** reject unknown statuses and require evidence before an item is marked ready.
5. **Boundaries:** synthetic data only, no deployment, no external connections, and a named owner.

Avoid an unbounded canvas. Add only capabilities the workflow needs.

## Demo

In an approved Copilot App session, use `/create-canvas` with a bounded prompt:

```text
Create a delivery-readiness canvas for synthetic work items.
People can add an item, set its status to planned, in-progress, review, or ready,
and flag it for review. The agent can read the board and update one named item.
Reject unknown statuses. Require an evidence link before marking an item ready.
Store no customer data. Do not connect external systems.
```

Open the canvas. Add an item directly, then ask the agent to update its status. Confirm that the visible artifact matches the agent response. Ask the agent to refuse an item with an unknown status.

If the app is unavailable, review `lab/starter/canvas-brief.md` and perform the same state changes manually.

## Review gate

Before a team shares a canvas, review:

- the artifact and its storage location;
- each user action and agent capability;
- data classification and external connections;
- validation evidence and human reviewer;
- owner, fallback, and retirement trigger.

Record the decision in the repository or approved platform. Do not rely on memory or a chat transcript.
