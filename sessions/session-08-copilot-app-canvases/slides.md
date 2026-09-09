---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 08 — Copilot App & Canvases'
---

<!-- _class: lead -->
# Copilot App and Canvases
## Shared artifacts for people and agents

---
# The Customize area

Use the Copilot App to find approved:

- plugins;
- skills;
- MCP servers;
- canvases.

Verify the surface, policy, and data boundary before a live exercise.

---
# Pick the smallest fit

| Need | Use |
| --- | --- |
| Convention | Instructions |
| Procedure | Skill |
| Specialist role | Custom agent |
| External capability | MCP |
| Shared artifact | Canvas |
| Distributed package | Plugin |

---
# # A canvas shares state

People work directly on the artifact.

The agent can read or change the same state through bounded capabilities.

Use a canvas when work needs visible progress, direct steering, or a handoff artifact.

---
# Design the contract

```text
State: item, status, review flag, evidence
User actions: add, update status, flag review
Agent capabilities: read board, update named item
Validation: accepted statuses, evidence before ready
Boundary: synthetic data, no external systems
```

---
# Create a bounded canvas

```text
/create-canvas

Create a delivery-readiness canvas for synthetic work items.
People can add an item and update its status.
The agent can read the board and update one named item.
Reject unknown statuses. Require evidence before ready.
Do not connect external systems.
```

---
# Review before sharing

- State and artifact storage
- User actions and agent capabilities
- Data classification and approvals
- Validation and reviewer
- Owner, fallback, and removal

---
<!-- _class: divider -->
# Lab

Create or simulate a delivery-readiness canvas. Review it with a peer before sharing it.
