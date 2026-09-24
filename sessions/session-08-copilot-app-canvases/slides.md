---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 08: Copilot App & Canvases'
---

<!-- _class: lead -->
# Canvas Extensions
## Contract first, visible state, bounded actions

---
# Today’s outcome

Build or simulate one delivery-readiness canvas.

Evidence must show:

- the approved contract;
- one direct update;
- one agent-requested update;
- one rejected update and recovery;
- one human review decision.

---
# Access policy

The live route requires:

- GitHub Copilot app access;
- the built-in `/create-canvas` skill;
- approval for the chosen extension scope.

If any requirement is missing, use the manual route. Do not install a replacement or move data to an unapproved surface.

---
# Pick the smallest fit

| Need | Use |
| --- | --- |
| Repository convention | Instructions |
| Repeatable procedure | Skill |
| Specialist behavior | Custom agent |
| External tool or data | MCP server |
| Shared interactive artifact | Canvas |
| Packaged customizations | Plugin |

A canvas is useful when people and an agent need to inspect or change the same visible state.

---
# Canvas anatomy

```text
shared state
  ├─ human actions in the interface
  ├─ agent-callable capabilities
  └─ validation before every change
```

The contract names all four parts before implementation starts.

---
# Worked contract

| Part | Delivery-readiness rule |
| --- | --- |
| State | item, status, review flag, evidence |
| Status | `planned`, `in-progress`, `review`, `ready` |
| Human actions | add item, set status, flag review, add evidence |
| Agent capabilities | read board, update one named item, list flagged items |
| Validation | known item, accepted status, evidence before `ready` |

---
# Authority stays narrow

Safe:

- read the current board;
- update one named item;
- list items flagged for review.

Out of scope:

- deployment;
- external writes;
- credentials;
- hidden data imports;
- broad actions such as “manage the project.”

---
# Prepared demo inputs

| ID | Item | Start state | Evidence |
| --- | --- | --- | --- |
| DOC-101 | Draft operator guide | `planned` | none |
| API-204 | Add retry metric | `in-progress` | test log |
| WEB-318 | Check empty state | `review` | preview |

All names and evidence are synthetic.

---
# Prepared demo sequence

1. Run the local contract tests.
2. Create the canvas from the worked prompt.
3. Move `WEB-318` to `ready` with a visible control.
4. Ask the agent to move `API-204` to `review`.
5. Ask for `DOC-101` to move to `ready`.
6. Show the rejection, add evidence, and retry.

---
# Creation prompt

```text
/create-canvas

Create a delivery-readiness canvas from @prepared-items.json.
Use the contract in @canvas-contract.md.
People can add evidence and update one item.
Copilot can read the board, update one named item, and list review flags.
Reject unknown items or statuses. Require evidence before ready.
Do not connect external systems.
```

Choose project scope only when `.github/extensions` is approved. Otherwise choose user scope or use the manual route.

---
# Visible and agent-requested changes

The same state must change through both paths:

| Path | Evidence |
| --- | --- |
| Human control | The item visibly changes in the canvas |
| Agent capability | The named item changes and the response matches the canvas |

If the response and visible state disagree, stop and inspect the artifact.

---
# Rejection is part of the design

Request:

```text
Move DOC-101 to ready.
```

Expected:

```text
Rejected: evidence is required before ready.
```

A safe canvas keeps the state unchanged and explains the rule.

---
# Recovery keeps the rule

1. Add synthetic evidence to `DOC-101`.
2. Retry the same transition.
3. Confirm `ready` is now accepted.
4. Record before, rejection, correction, and after state.

Do not “fix” the demo by removing validation.

---
# Review the generated extension

Check:

- state fields and defaults;
- visible actions;
- agent-callable capabilities;
- dependencies and persisted data;
- owner and reviewer;
- fallback and retirement trigger.

Remove anything the contract did not request.

---
# Source of truth

The canvas is a working artifact, not an automatic system of record.

If another system owns the data:

- label the canvas as a projection;
- record refresh or reconciliation rules;
- keep external writes outside this lab.

---
# Peer decision

The reviewer chooses:

- **approve** when the contract and evidence match;
- **revise** when a bounded correction is clear;
- **pause** when access, ownership, data, or behavior is unresolved.

---
<!-- _class: divider -->
# Lab handoff

Use one contract and one prepared data set for the full two hours.
