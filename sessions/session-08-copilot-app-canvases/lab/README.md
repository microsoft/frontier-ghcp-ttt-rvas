# Session 08 Lab: Build and Review a Bounded Canvas

**Duration:** 2 hours  
**Difficulty:** Advanced  
**Prerequisites:** Sessions 01–07  
**Deliverable:** A completed canvas evidence packet

## Objective

Use one synthetic delivery-readiness contract from setup through peer review. You will test the contract locally, create or simulate the canvas, make visible and agent-requested changes, prove that an invalid change is rejected, recover, and record a human decision.

## Deliverables

Submit:

1. your completed `canvas-contract.md`;
2. the generated extension location, or a note that you used the manual route;
3. a completed `checkpoint-record.md`;
4. a completed `canvas-review.md`;
5. final state that matches the accepted transitions.

## Access policy

The live route requires GitHub Copilot app access and the built-in `/create-canvas` skill. Project scope requires approval to create files under `.github/extensions`.

If access, the skill, or the requested scope is unavailable, **stop the live route**. Use the manual route in each exercise. Do not bypass policy, install a replacement, or copy the synthetic workflow into another external service.

## Setup

From the repository root:

```bash
cd sessions/session-08-copilot-app-canvases/lab/starter
npm test
```

Expected result:

```text
tests 4
pass 4
fail 0
```

Open these files:

- `canvas-contract.md`
- `prepared-items.json`
- `demo-runbook.md`
- `checkpoint-record.md`
- `canvas-review.md`

Copy the record files to a writable working folder if you do not want to edit the starter assets.

## Time plan

| Part | Work | Time |
| --- | --- | --- |
| 1 | Confirm access and contract | 20 min |
| 2 | Run the prepared contract tests | 15 min |
| 3 | Create or simulate the canvas | 25 min |
| 4 | Make two visible state changes | 20 min |
| 5 | Prove rejection and recovery | 20 min |
| 6 | Peer review and handoff | 20 min |

## Part 1: Confirm access and contract (20 minutes)

1. Record the selected route in `checkpoint-record.md`: project scope, user scope, or manual.
2. Confirm that all data comes from `prepared-items.json`.
3. Review every state field, human action, agent capability, and validation rule in `canvas-contract.md`.
4. Replace the owner and reviewer placeholders.
5. Confirm the retirement trigger.

The contract must retain these rules:

- statuses are `planned`, `in-progress`, `review`, and `ready`;
- only one named item changes per update;
- `ready` requires non-empty evidence;
- unknown items and statuses are rejected;
- no external system is connected.

**Checkpoint 1:** A peer can explain the contract without adding verbal requirements.

## Part 2: Run the prepared contract tests (15 minutes)

Run:

```bash
npm test
```

Read `test/canvas-contract.test.mjs` and map each test to a contract rule.

Record:

- the command;
- pass or fail;
- the four rules tested;
- any mismatch between code and contract.

Do not continue with a failing harness. Fix only a mismatch caused by your edits, or reset your working copy from `lab/starter/`.

**Checkpoint 2:** The local harness passes and the group can identify the planned rejection.

## Part 3: Create or simulate the canvas (25 minutes)

### Live route

Open an approved GitHub Copilot app session. Run:

```text
/create-canvas

Create a delivery-readiness canvas from @prepared-items.json.
Use the contract in @canvas-contract.md.
People can add evidence and update one item.
Copilot can read the board, update one named item, and list review flags.
Reject unknown items or statuses. Require evidence before ready.
Do not connect external systems.
```

Choose:

- **project scope** only when `.github/extensions` is approved for the training repository;
- **user scope** when a personal local extension is approved.

Inspect the generated directory, metadata, dependencies, state, visible controls, and agent-callable capabilities. Ask Copilot to remove anything outside the contract.

### Manual route

Initialize `working-state.json`:

```bash
node src/demo.mjs init
```

Treat that file as the visible canvas state. Use the commands in `demo-runbook.md` to apply each transition through the local harness.

**Checkpoint 3:** The canvas or manual state shows all three prepared items and no extra capability.

## Part 4: Make two visible state changes (20 minutes)

Use the same state for both paths.

### Change A: direct human action

Move `WEB-318` from `review` to `ready`.

This should succeed because the item already has evidence.

### Change B: agent-requested action

Ask Copilot:

```text
Move API-204 from in-progress to review. Change only that item.
```

On the manual route, run the matching command from `demo-runbook.md`.

Verify:

- `WEB-318` is `ready`;
- `API-204` is `review`;
- `DOC-101` is still `planned`;
- the visible state and response agree.

Record before and after values in `checkpoint-record.md`.

**Checkpoint 4:** One human action and one agent-requested capability changed the same bounded state model.

## Part 5: Prove rejection and recovery (20 minutes)

Request:

```text
Move DOC-101 to ready.
```

Expected result:

```text
Rejected: evidence is required before ready.
```

Confirm that `DOC-101` remains `planned`.

Now add this synthetic evidence:

```text
docs://operator-guide-review
```

Retry the same status change. It should succeed.

Record:

1. state before the request;
2. rejection text;
3. evidence added;
4. final accepted state.

If the first request succeeds, stop. Restore the validation rule and repeat the case. Do not approve a canvas that reaches `ready` without evidence.

**Checkpoint 5:** Recovery corrected the data and kept the rule.

## Part 6: Peer review and handoff (20 minutes)

Exchange evidence packets with another group.

Complete `canvas-review.md`. The reviewer must inspect:

- artifact location and scope;
- state and defaults;
- visible human actions;
- agent-callable capabilities;
- rejection and recovery evidence;
- dependencies and persisted data;
- owner, fallback, and retirement trigger.

Choose one final decision:

- **approve** when the implementation matches the contract;
- **revise** when a bounded correction is named;
- **pause** when access, behavior, data, or ownership is unresolved.

Compare your final state with `../solution/final-state.json` only after the review.

**Checkpoint 6:** A named reviewer records a decision and the next safe action.

## Final deliverable

The evidence packet is complete when another person can identify:

- the selected access route;
- the fixed canvas contract;
- the prepared starting state;
- both accepted changes;
- the rejected change and recovery;
- the final human decision.

## Troubleshooting

| Issue | Response |
| --- | --- |
| `/create-canvas` is unavailable | Stop the live route and use the manual path. |
| Project scope is blocked | Use approved user scope or the manual path. |
| Generated actions exceed the contract | Remove them before testing. |
| State and agent response disagree | Stop and inspect the shared artifact. |
| Local tests fail before edits | Record the failure and restore the supplied starter files. |
| `ready` accepts empty evidence | Fix the rule before review. |

## Solution reference

`../solution/` contains the worked contract, completed evidence, and final state. Review it after your peer decision.
