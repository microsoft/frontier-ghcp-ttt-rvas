# Session M3-01: Trainer guide

**Teaching time:** 60 minutes

**Lab handoff:** `../lab/README.md`

## Teaching goal

Teach learners to define a canvas contract and explain each action. Show a rejected update, then check whether the final state matches the contract.

## Preparation

1. Check that you have Copilot app access and the built-in `/create-canvas` skill.
2. Decide on project scope (`.github/extensions`) or user scope.
3. Run the harness:

   ```bash
   cd sessions/session-m3-01-copilot-app-canvases/lab/starter
   npm test
   ```

4. Open `prepared-items.json`, `canvas-contract.md`, and `demo-runbook.md`.
5. Keep `../lab/solution/demo-evidence.md` ready in case the live run is delayed or unavailable. If `/create-canvas` is missing, use this prepared manual demo and say so.

For early finishers or a CI-focused audience, the optional Feature Workbench variant reuses the same method with a narrower decision: may synthetic feature work pass a test gate?

- `../lab/starter/feature-workbench-contract.md`
- `../lab/starter/feature-workbench-sample.json`
- `../lab/solution/feature-workbench-solution.md`
- `../lab/solution/feature-workbench-final-state.json`

Learners review three synthetic CI checks, see a gate decision rejected when a required check fails, then add the evidence that allows a retry. People may acknowledge a result and request a gate evaluation. The agent may propose `pass`, `hold`, or `rerun`. A human reviewer records the decision. The workbench never deploys, merges, or calls a live CI service. The worked solution holds `FEAT-204` because `integration-tests` failed.

## One-hour plan

| Time | Segment | What learners show |
| --- | --- | --- |
| 0:00 to 0:05 | Outcome | Deliverables understood |
| 0:05 to 0:13 | Choose the right customization | Canvas decision explained |
| 0:13 to 0:23 | Build the contract | State, actions, capabilities, validation |
| 0:23 to 0:30 | Prepared inputs and harness | Passing local contract tests |
| 0:30 to 0:43 | Live or prepared demo | Two visible state changes |
| 0:43 to 0:50 | Rejection and recovery | Rule preserved through recovery |
| 0:50 to 0:56 | Generated extension review | Keep, revise, or remove |
| 0:56 to 1:00 | Lab handoff | Roles and checkpoints clear |

## 0:00 to 0:05: Outcome

Frame the session: "We are designing one shared artifact. Judge it by its visible behavior, not by a polished chat response."

Show the deliverables and say whether you'll run the live or prepared demo.

## 0:05 to 0:13: Choose the right customization

Use the decision table from the slides:

- instructions state conventions;
- a skill describes a repeatable procedure;
- a custom agent supplies specialist behavior;
- an MCP server connects tools or data;
- a canvas gives people and an agent one interactive artifact;
- a plugin can package a canvas with other customizations.

Use a canvas when state must stay visible across several actions or a handoff. Stay in chat for a short answer or one draft.

**Checkpoint:** Ask, "What breaks if this stays in chat?" A good answer names lost visibility, direct control, or saved state for handoff.

## 0:13 to 0:23: Build the worked contract

Open `../lab/starter/canvas-contract.md` and walk through it:

1. **State:** `id`, `item`, `status`, `reviewFlag`, and `evidence`.
2. **Human actions:** add evidence, set a status, set the review flag.
3. **Agent capabilities:** read the board, update one named item, list flagged items.
4. **Validation:** reject unknown IDs, unknown statuses, and `ready` without evidence.
5. **Boundary:** synthetic data, no external systems.

**Teaching test:** Every action must fit in one sentence. A broad verb such as "manage" needs a smaller action.

## 0:23 to 0:30: Prepared inputs and harness

Open `prepared-items.json`. Point out the three starting states and which item lacks evidence. Then run:

```bash
cd sessions/session-m3-01-copilot-app-canvases/lab/starter
npm test
```

The harness doesn't imitate the Copilot app. It checks the state rules the generated canvas must keep:

- an item with evidence can move to `ready`;
- an agent-requested named update changes the same state model;
- `DOC-101` cannot move to `ready` without evidence;
- adding evidence allows the retry.

## 0:30 to 0:43: Live or prepared demo

### Live demo

```text
/create-canvas

Create a delivery-readiness canvas from @prepared-items.json.
Use the contract in @canvas-contract.md.
People can add evidence and update one item.
Copilot can read the board, update one named item, and list review flags.
Reject unknown items or statuses. Require evidence before ready.
Do not connect external systems.
```

After generation:

1. inspect the files and declared capabilities;
2. remove fields or actions outside the contract;
3. use a visible control to move `WEB-318` from `review` to `ready`;
4. ask Copilot to move `API-204` from `in-progress` to `review`;
5. compare the visible board with the agent response.

### Prepared demo

Open `../lab/solution/demo-evidence.md` and `../lab/solution/final-state.json`. Trace the same two changes and tell learners these are prepared examples, not a live app call.

If the canvas isn't ready by 0:38, switch to the prepared demo. Keep the rejection, recovery, and review segments.

## 0:43 to 0:50: Rejection and recovery

Request:

```text
Move DOC-101 to ready.
```

Expected:

- the update is rejected;
- the message names the missing evidence rule;
- `DOC-101` stays `planned`.

Add the synthetic evidence `docs://operator-guide-review`, then retry. The same transition now succeeds, the rule is unchanged, and the change record shows the state before, the rejection, the correction, and the state after.

If the generated canvas accepts the first request, pause and restore the rule. An accepted unsafe update is a failed demo.

## 0:50 to 0:56: Inspect the extension

Check generated files and dependencies, state fields and persisted data, visible human actions, agent-callable capabilities, validation messages, and the retirement trigger. Remove generated features the contract didn't request.

## 0:56 to 1:00: Lab handoff

Assign four roles. One person may hold two in a small group: contract owner, app operator, contract tester, handoff owner.

Point to the six lab checkpoints. The same three prepared items stay in use for the whole lab.

Close with: "Keep the contract fixed while you test the implementation. If the implementation needs broader authority, review the contract first."

## Common failures

| Failure | Recovery |
| --- | --- |
| `/create-canvas` is missing | Use the prepared demo. |
| Project scope is not allowed | Use user scope. |
| Generation takes too long | Stop and show the prepared demo record. |
| Extra capabilities appear | Remove them. |
| Agent response and visible state differ | Stop and inspect the artifact. |
| `ready` succeeds without evidence | Fix the rule and rerun the rejection. |
| A learner proposes real work data | Use the supplied synthetic input. |
