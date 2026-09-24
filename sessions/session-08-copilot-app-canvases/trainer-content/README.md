# Session 08: Trainer Guide

**Teaching time:** 60 minutes

**Lab handoff:** `../lab/README.md`

## Teaching goal

Learners should leave the teaching hour able to define a canvas contract, explain each action, show a safe rejection, and name the human decision that controls sharing.

## Required preparation

Before class:

1. Confirm GitHub Copilot app access and the built-in `/create-canvas` skill.
2. Decide whether project scope under `.github/extensions` is approved. Use user scope or the manual route when it is not.
3. Use only the synthetic files in `../lab/starter/`.
4. Run:

   ```bash
   cd sessions/session-08-copilot-app-canvases/lab/starter
   npm test
   ```

5. Open `prepared-items.json`, `canvas-contract.md`, and `demo-runbook.md`.
6. Name the demo owner and reviewer.
7. Keep `../lab/solution/demo-evidence.md` ready for a delayed or unavailable live run.

## Access decision

The live demo requires all of these:

- GitHub Copilot app access;
- `/create-canvas` is present;
- the chosen extension scope is approved;
- the trainer can inspect generated files and capabilities;
- synthetic data is used.

If one condition fails, use the prepared manual demo. **Do not bypass a policy, install a community replacement, or claim that a generated extension ran when it did not.**

## One-hour plan

| Time | Segment | Learner evidence |
| --- | --- | --- |
| 0:00–0:05 | Outcome and access gate | Live or manual route selected |
| 0:05–0:13 | Choose the right customization | Canvas decision explained |
| 0:13–0:23 | Build the contract | State, actions, capabilities, validation |
| 0:23–0:30 | Inspect prepared inputs and harness | Passing local contract tests |
| 0:30–0:43 | Prepared or live canvas demo | Two visible state changes |
| 0:43–0:50 | Rejection and recovery | Rule preserved through recovery |
| 0:50–0:56 | Generated extension review | Keep, revise, or remove decisions |
| 0:56–1:00 | Lab handoff | Roles, deliverables, and checkpoints clear |

## 0:00–0:05: Set the outcome and access gate

Say:

> “We are designing one shared artifact. The proof is visible state plus a review record, not a polished chat response.”

Show the required deliverables. Then state which route the class will use.

Ask one learner to name the final human decision. Accept `approve`, `revise`, or `pause`.

## 0:05–0:13: Choose the right customization

Use the decision table from the slides.

Make the distinction concrete:

- instructions state conventions;
- a skill describes a repeatable procedure;
- a custom agent supplies specialist behavior;
- an MCP server connects tools or data;
- a canvas gives people and an agent one interactive artifact;
- a plugin can package a canvas with other customizations.

Use a canvas when the state must stay visible across several actions or a handoff. Stay in chat for a short answer or one draft.

**Checkpoint:** Ask, “What breaks if this remains only in chat?” A valid answer names lost visibility, direct steering, or durable handoff state.

## 0:13–0:23: Build the worked contract

Open `../lab/starter/canvas-contract.md`.

Walk through each section:

1. **State:** `id`, `item`, `status`, `reviewFlag`, and `evidence`.
2. **Human actions:** add evidence, set a status, and set the review flag.
3. **Agent capabilities:** read the board, update one named item, and list flagged items.
4. **Validation:** reject unknown IDs, unknown statuses, and `ready` without evidence.
5. **Boundary:** synthetic data and no external systems.

Ask who can retire the artifact. Record an owner rather than saying “the team.”

**Teaching test:** Every action must fit in one sentence. A broad verb such as “manage” needs a smaller action.

## 0:23–0:30: Inspect prepared inputs and contract harness

Open `prepared-items.json`. Point out the three starting states and which item lacks evidence.

Run:

```bash
cd sessions/session-08-copilot-app-canvases/lab/starter
npm test
```

Explain that the harness does not imitate the GitHub Copilot app. It checks the state rules that the generated canvas must preserve.

Show these results:

- an item with evidence can move to `ready`;
- an agent-requested named update changes the same state model;
- `DOC-101` cannot move to `ready` without evidence;
- adding evidence allows the retry.

## 0:30–0:43: Prepared or live demo

### Live route

Start an approved app session and use:

```text
/create-canvas

Create a delivery-readiness canvas from @prepared-items.json.
Use the contract in @canvas-contract.md.
People can add evidence and update one item.
Copilot can read the board, update one named item, and list review flags.
Reject unknown items or statuses. Require evidence before ready.
Do not connect external systems.
```

Choose project scope only when repository sharing is approved. Otherwise use user scope.

After generation:

1. inspect the files and declared capabilities;
2. remove fields or actions outside the contract;
3. use a visible control to move `WEB-318` from `review` to `ready`;
4. ask Copilot to move `API-204` from `in-progress` to `review`;
5. compare the visible board with the agent response.

### Prepared route

Open `../lab/solution/demo-evidence.md` and `../lab/solution/final-state.json`.

Trace the same two changes. Mark each statement as observed evidence or prepared example. Do not imply that a live app call occurred.

### Time guard

If the canvas is not reviewable by 0:38, switch to prepared evidence. Keep the rejection, recovery, and review segments.

## 0:43–0:50: Show rejection and recovery

Request:

```text
Move DOC-101 to ready.
```

Expected behavior:

- the update is rejected;
- the message names the missing evidence rule;
- `DOC-101` remains `planned`.

Add the synthetic evidence value `docs://operator-guide-review`, then retry.

Expected behavior:

- the same transition now succeeds;
- the rule did not change;
- the evidence record shows before, rejection, correction, and after state.

If the generated canvas accepts the first request, pause the demo. Restore the rule before continuing. A successful unsafe update is a failed demo.

## 0:50–0:56: Review the extension

Use `../lab/starter/canvas-review.md`.

Inspect:

- generated files and dependencies;
- state fields and persisted data;
- visible human actions;
- agent-callable capabilities;
- validation messages;
- owner, reviewer, fallback, and retirement trigger.

For each item, record `approve`, `revise`, or `pause`. Remove generated features that the contract did not request.

## 0:56–1:00: Hand off to the lab

Assign four roles. One person may hold two roles in a small group:

- contract owner;
- app operator or manual simulator;
- independent reviewer;
- evidence recorder.

Point learners to the six lab checkpoints. Remind them that the same three prepared items stay in use for the full lab.

End with:

> “Keep the contract fixed while you test the implementation. If the implementation needs broader authority, stop and review the contract first.”

## Common failures and recovery

| Failure | Recovery |
| --- | --- |
| `/create-canvas` is missing | Use the manual route. Do not install a replacement. |
| Project scope is not approved | Use user scope or the manual route. |
| Generation takes too long | Switch to prepared evidence at 0:38. |
| Extra capabilities appear | Remove them and record the review decision. |
| Agent response and visible state differ | Stop, inspect the artifact, and record the mismatch. |
| `ready` succeeds without evidence | Treat it as a failed rule, fix it, and rerun the rejection. |
| A learner proposes real work data | Replace it with the supplied synthetic input. |

## Product notes checked September 24, 2026

Official GitHub documentation describes canvas extensions as shared interactive surfaces in the GitHub Copilot app. It documents `/create-canvas`, project scope at `.github/extensions`, user scope at `~/.copilot/extensions`, visible canvas controls, and agent-callable capabilities. Availability and policy can still differ, so the preflight remains mandatory.
