# Session M3-01: Trainer guide

**Teaching time:** 60 minutes

**Lab handoff:** `../lab/README.md`

## Teaching goal

Teach learners to define a canvas contract and explain each action. Show a rejected update, then check whether the final state matches the contract.

## Preparation

1. Check that you have Copilot app access and the built-in `/create-canvas` skill.
2. Decide on project scope (`.github/extensions`) or user scope.
3. Optional: run the scaffolding tests (see 0:24 to 0:28):

   ```bash
   cd sessions/session-m3-01-copilot-app-canvases/lab/starter
   npm test
   ```

4. Open `prepared-items.json`, `canvas-contract.md`, and `demo-runbook.md`.
5. Keep `../lab/solution/demo-evidence.md` ready in case the live run is delayed or unavailable. If `/create-canvas` is missing, use this prepared manual demo and say so.

## One-hour plan

| Time | Segment | What learners show |
| --- | --- | --- |
| 0:00 to 0:03 | Outcome | Deliverables understood |
| 0:03 to 0:08 | Choose the right customization | Canvas decision explained |
| 0:08 to 0:16 | Terms and boundaries | Canvas, plugin, capability defined |
| 0:16 to 0:24 | Contract and generated files | State, actions, capabilities, validation |
| 0:24 to 0:28 | Prepared inputs and scaffolding | Items understood |
| 0:28 to 0:40 | Live or prepared demo | Two visible state changes |
| 0:40 to 0:46 | Rejection and recovery | Rule preserved through recovery |
| 0:46 to 0:50 | Generated extension review | Keep, revise, or remove |
| 0:50 to 0:56 | Pros, cons, and limits | Fit decision |
| 0:56 to 1:00 | Lab handoff | Roles and checkpoints clear |

## 0:00 to 0:03: Outcome

Frame the session: "We are designing one shared artifact. Judge it by its visible behavior, not by a polished chat response."

Show the deliverables and say whether you'll run the live or prepared demo.

## 0:03 to 0:08: Choose the right customization

Use the decision table from the slides:

- instructions state conventions;
- a skill describes a repeatable procedure;
- a custom agent supplies specialist behavior;
- an MCP server connects tools or data;
- a canvas gives people and an agent one interactive artifact;
- a plugin can package a canvas with other customizations.

Tie back to M3-03 to M3-05: a skill gives know-how, a custom agent gives a role, an MCP server gives reach. A canvas gives a shared surface.

Use a canvas when state must stay visible across several actions or a handoff. Stay in chat for a short answer or one draft.

**Checkpoint:** Ask, "What breaks if this stays in chat?" A good answer names lost visibility, direct control, or saved state for handoff.

## 0:08 to 0:16: Terms and boundaries

Define four terms, using the slides:

- **Canvas extension:** a shared, interactive panel in the Copilot app for one work artifact.
- **Human action:** a control in the panel.
- **Agent-callable capability:** a named action the agent can call on the canvas. Copilot generates capabilities from your prompt. You can ask it to add, remove, or revise them.
- **Plugin:** a package that can ship a canvas with skills or MCP servers. Some featured canvases need a plugin installed from **Customize > Canvas**.

Then state the boundaries. A capability is the agent's whole reach on that canvas, so the contract lists only what is needed. A canvas is not the system of record. Generated code and dependencies need review.

**Checkpoint:** Ask, "Which capability would you refuse to expose, and why?"

## 0:16 to 0:24: Contract and generated files

Open `../lab/starter/canvas-contract.md` and walk through it:

1. **State:** `id`, `item`, `status`, `reviewFlag`, and `evidence`.
2. **Human actions:** add evidence, set a status, set the review flag.
3. **Agent capabilities:** read the board, update one named item, list flagged items.
4. **Validation:** reject unknown IDs, unknown statuses, and `ready` without evidence.
5. **Boundary:** synthetic data, no external systems.

**Teaching test:** Every action must fit in one sentence. A broad verb such as "manage" needs a smaller action.

Then explain what Copilot generates from the contract. Scope sets the location: `.github/extensions/<name>/` (project) or `~/.copilot/extensions/<name>/` (user). The docs describe a typical layout: `package.json` for metadata and dependencies, an entry file such as `extension.mjs` for behavior and capabilities, and optional JSON under `artifacts/` for state. **Layouts vary, so check what appears.**

## 0:24 to 0:28: Prepared inputs and scaffolding

Open `prepared-items.json`. Point out the three starting states and which item lacks evidence. Optionally run:

```bash
cd sessions/session-m3-01-copilot-app-canvases/lab/starter
npm test
```

**The tests are scaffolding.** Hand-built code in `src/canvas-contract.mjs` encodes this exercise's rules so learners can check them quickly. They don't run, test, or imitate Copilot canvas behavior. The real check is the generated canvas against the contract. The rules they encode:

- an item with evidence can move to `ready`;
- an agent-requested named update changes the same state model;
- `DOC-101` cannot move to `ready` without evidence;
- adding evidence allows the retry.

## 0:28 to 0:40: Live or prepared demo

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

If the canvas isn't ready by 0:36, switch to the prepared demo. Keep the rejection, recovery, and review segments.

## 0:40 to 0:46: Rejection and recovery

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

## 0:46 to 0:50: Inspect the extension

Check generated files and dependencies, state fields and persisted data, visible human actions, agent-callable capabilities, and validation messages. Remove generated features the contract didn't request.

## 0:50 to 0:56: Pros, cons, and limits

| Pros | Cons and limits |
| --- | --- |
| Visible state you can inspect and steer | Canvas extensions are new; behavior and docs may change |
| People and agent share one artifact | Generated code needs review like any code |
| State survives turns and handoffs | Not a system of record |
| Capabilities limit what the agent can call | Needs the Copilot app; project scope needs write access to `.github/extensions` |

Ask: "Would you use a canvas or chat for this task?" Check current docs before teaching: the `/create-canvas` skill, the two scopes, and the file layout come from GitHub's canvas extension docs.

## 0:56 to 1:00: Lab handoff

Assign four roles. One person may hold two in a small group: contract writer, app operator, contract tester, reviewer.

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

## Optional: Feature Workbench

Skip this unless learners finish early or the audience is CI-focused. It reuses the same method with a narrower decision: may synthetic feature work pass a test gate?

- `../lab/starter/feature-workbench-contract.md`
- `../lab/starter/feature-workbench-sample.json`
- `../lab/solution/feature-workbench-solution.md`
- `../lab/solution/feature-workbench-final-state.json`

Learners review three synthetic CI checks, see a gate decision rejected when a required check fails, then add the evidence that allows a retry. People may acknowledge a result and request a gate evaluation. The agent may propose `pass`, `hold`, or `rerun`. A human reviewer records the decision. The workbench never deploys, merges, or calls a live CI service. The worked solution holds `FEAT-204` because `integration-tests` failed.
