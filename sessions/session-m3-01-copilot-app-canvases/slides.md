---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M3-01: Copilot App & Canvases'
---

<!-- _class: lead -->
# Canvas extensions
## Define the contract, state, and allowed actions

---
# Today's outcome

Build one delivery-readiness canvas in the Copilot app.

Record:

- the contract;
- one direct update;
- one agent-requested update;
- one rejected update and its recovery.

You need the Copilot app and the built-in `/create-canvas` skill. If project scope is unavailable, use user scope.

---
# Choose the right customization

| Need | Use |
| --- | --- |
| Repository convention | Instructions |
| Repeatable procedure | Skill |
| Specialist behavior | Custom agent |
| External tool or data | MCP server |
| Shared interactive artifact | Canvas |
| Packaged customizations | Plugin |

Use a canvas when people and an agent need to inspect or change the same visible state.

Compare with [M3-03](../session-m3-03-mcp-servers/README.md), [M3-04](../session-m3-04-custom-agents/README.md), and [M3-05](../session-m3-05-agent-skills/README.md): a skill gives know-how, a custom agent gives a role, an MCP server gives reach. A canvas gives a shared surface.

---
# Terms

| Term | Meaning |
| --- | --- |
| **Canvas extension** | A shared, interactive panel in the Copilot app for one work artifact: a board, plan, checklist, or dashboard |
| **Agent-callable capability** | A named action the agent can call on the canvas, such as `move_card`. Each has an input schema |
| **Human action** | A control in the panel: button, card, or filter |
| **Plugin** | A package that can ship a canvas with skills or MCP servers. You install it from **Customize > Canvas** |

People and the agent change the **same state**. Capabilities are generated from your prompt, and you can ask the agent to add, remove, or revise them.

---
# Boundaries

| A canvas is | A canvas is not |
| --- | --- |
| A visible, shared working surface | The system of record |
| Limited to the capabilities you list | A way to give the agent broad access |
| Editable by a person and the agent | A replacement for review |

**A capability is the agent's whole reach.** If the contract does not list it, remove it. Dependencies and persisted data come with the extension, so read them before you keep it.

---
# Canvas anatomy

```text
shared state
  ├─ human actions in the interface
  ├─ agent-callable capabilities
  └─ validation before every change
```

The **contract** is a short document you write first. It names all four parts. Copilot generates the extension from the contract, and you check the result against it.

---
# Generated files

Scope decides where the extension lives:

| Scope | Path |
| --- | --- |
| Project (repository) | `.github/extensions/<name>/` |
| User | `~/.copilot/extensions/<name>/` |

Docs describe a typical layout. **Check what Copilot actually generated.**

- `package.json`: metadata and dependencies
- an entry file such as `extension.mjs`: canvas behavior, capabilities, validation
- optional JSON under `artifacts/`: persisted state

Read the entry file against the contract. Check `package.json` for packages you did not ask for.

---
# Write the contract first

A contract is one page. Answer five questions:

| Part | Question |
| --- | --- |
| State | What does the canvas hold, and what are the defaults? |
| Vocabulary | Which values are allowed (statuses, types, roles)? |
| Human actions | What can a person do in the panel? |
| Agent capabilities | What can the agent call, with which inputs? |
| Validation | Which changes get rejected, and with what message? |

If you can't answer one, the prompt isn't ready.

---
# Design capabilities as the agent's whole reach

Good capabilities are:

- **named** for one verb and one object, such as `update_item`;
- **typed**, with an input schema that lists required fields;
- **narrow**, so one call changes one thing;
- **read-only** when the agent only needs to look.

Avoid `manage_project`, free-form commands, and anything that writes outside the canvas.

---
# Keep authority narrow

| Usually fine | Out of scope |
| --- | --- |
| Read the current state | Deployments |
| Update one named item | External writes |
| List items by a flag | Credentials |
| Add a note or evidence | Hidden data imports |

If a capability has no use in your workflow, remove it. Each one is something the agent can do without asking.

---
# Validate before every change

Put the rules **in the canvas**, so they hold for the person and the agent.

Common rules:

- the item exists;
- the value is in the allowed list;
- the transition is legal from the current state;
- required fields are present, such as evidence or an owner.

On failure: **leave the state unchanged and name the rule** in the message.

---
# One state, two paths

| Path | What to check |
| --- | --- |
| Human control | The visible state changes at once |
| Agent capability | The call's response matches what the canvas shows |

Test both paths with the same rule. If the response and the screen disagree, stop and read the persisted state before you go on.

---
# Rejection is part of the design

A good rejection:

1. changes nothing;
2. names the rule that failed;
3. tells the caller what to supply.

```text
Rejected: evidence is required before ready.
```

A rejection that says only "error" can't be fixed by a person or an agent.

---
# Recover without weakening the rule

When a change is rejected:

1. supply what the rule asked for;
2. retry the same change;
3. check that it is now accepted.

Don't loosen the rule to get past it. Record the state before, the rejection, the correction, and the state after.

---
# Write the prompt from the contract

```text
/create-canvas

Create a <name> canvas from @<data file>.
Use the contract in @<contract file>.
People can <human actions>.
Copilot can <capabilities, with inputs>.
Reject <invalid cases>. Require <field> before <state>.
Do not connect external systems.
```

Name the data, the contract, the allowed actions, the rejections, and the limits. Use project scope if `.github/extensions` is allowed. Otherwise use user scope.

---
# Review the generated extension

Treat it like code from a new teammate. Check:

- state fields and defaults;
- visible actions;
- agent-callable capabilities;
- dependencies and persisted data.

**Keep** what the contract asks for. **Revise** what is close. **Remove** the rest.

---
# Test the rules outside Copilot

You can test validation logic in plain code, with no canvas at all.

- A small module encodes the rules.
- Unit tests check each rule and each rejection message.
- The generated canvas must give the same answers.

This tests **your contract**, not Copilot. The real check is the generated canvas against the contract.

---
# Where canvases fit

| Good fit | Poor fit |
| --- | --- |
| Delivery board with statuses | One-off answer |
| Review checklist with evidence | A single draft |
| Plan that a person and an agent both edit | Data that another system owns |
| Dashboard with a few controlled actions | Broad automation |

Ask: "What breaks if this stays in chat?"

---
# Pros, cons, and limits

| Pros | Cons and limits |
| --- | --- |
| **Visible state** you can inspect and steer | Canvases are new. Behavior and docs may change |
| People and agent share one artifact | Generated code needs review like any code |
| State survives turns and handoffs | A canvas is not a system of record |
| Capabilities limit what the agent can call | Needs the Copilot app. Project scope needs write access to `.github/extensions` |

Check the current docs before you teach.

---
# Source of truth

The canvas is a working artifact, not a system of record.

If another system owns the data, label the canvas as a projection and keep external writes out of scope.

---
# In the lab

You apply these ideas to one synthetic **delivery-readiness board**:

- items move through `planned`, `in-progress`, `review`, and `ready`;
- the agent can read the board, update one named item, and list review flags;
- `ready` needs evidence.

You record one direct change, one agent change, one rejection, and one recovery.

---
<!-- _class: divider -->
# Lab handoff

Use one contract and one prepared data set for the full two hours.
