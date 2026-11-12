# Session M3-01 lab: Build and review a canvas contract

## Objective

Use one synthetic delivery-readiness contract from setup through handoff. Test the contract locally, then create the canvas in the Copilot app. Make a visible change and an agent-requested change to the same state. Check that an invalid change is rejected, then recover without changing the rule.

You need the Copilot app and `/create-canvas`. Use synthetic data only.

## Deliverables

1. Your completed `canvas-contract.md`.
2. The generated extension location.
3. A final state that matches the accepted transitions.

## Setup

From the repository root:

```bash
cd sessions/session-m3-01-copilot-app-canvases/lab/starter
npm test
```

Expected result:

```text
tests 4
pass 4
fail 0
```

Open `canvas-contract.md`, `prepared-items.json`, and `demo-runbook.md`. Copy them to a working folder if you don't want to edit the starter files.

## Time plan

| Part | Work | Time |
| --- | --- | --- |
| 1 | Check the contract | 20 min |
| 2 | Run the prepared contract tests | 15 min |
| 3 | Create the canvas | 25 min |
| 4 | Make two visible state changes | 20 min |
| 5 | Check rejection and recovery | 20 min |
| 6 | Inspect and hand off | 20 min |

## Part 1: Check the contract (20 minutes)

1. Pick project or user scope.
2. Check that all data comes from `prepared-items.json`.
3. Review every state field, human action, agent capability, and validation rule in `canvas-contract.md`.
4. Replace the owner and reviewer placeholders.
5. Check the retirement trigger.

The contract must keep these rules:

- statuses are `planned`, `in-progress`, `review`, and `ready`;
- one update changes one named item;
- `ready` requires non-empty evidence;
- unknown items and statuses are rejected;
- no external system is connected.

**Checkpoint 1:** A peer can explain the contract without adding verbal requirements.

## Part 2: Run the prepared contract tests (15 minutes)

```bash
npm test
```

Read `test/canvas-contract.test.mjs` and map each test to a contract rule. Note the command, the result, and any mismatch between code and contract.

Don't continue with a failing harness. Fix only a mismatch your edits caused, or reset your copy from `lab/starter/`.

**Checkpoint 2:** The harness passes, and your group can name the planned rejection.

## Part 3: Create the canvas (25 minutes)

Open a Copilot app session and run:

```text
/create-canvas

Create a delivery-readiness canvas from @prepared-items.json.
Use the contract in @canvas-contract.md.
People can add evidence and update one item.
Copilot can read the board, update one named item, and list review flags.
Reject unknown items or statuses. Require evidence before ready.
Do not connect external systems.
```

Choose **project scope** if you can create files under `.github/extensions`. Otherwise choose **user scope**.

Inspect the generated directory, metadata, dependencies, state, visible controls, and agent-callable capabilities. Ask Copilot to remove anything outside the contract.

**Checkpoint 3:** The canvas shows all three prepared items and no extra capability.

## Part 4: Make two visible state changes (20 minutes)

**Change A, direct action.** Move `WEB-318` from `review` to `ready`. It succeeds because the item already has evidence.

**Change B, agent-requested action.** Ask Copilot:

```text
Move API-204 from in-progress to review. Change only that item.
```

Check that:

- `WEB-318` is `ready`;
- `API-204` is `review`;
- `DOC-101` is still `planned`;
- the visible state and the response agree.

**Checkpoint 4:** One human action and one agent request changed the same state without breaking the contract.

## Part 5: Check rejection and recovery (20 minutes)

Request:

```text
Move DOC-101 to ready.
```

Expected result:

```text
Rejected: evidence is required before ready.
```

`DOC-101` stays `planned`. Now add this synthetic evidence:

```text
docs://operator-guide-review
```

Retry the same status change. It succeeds.

Record the state before the request, the rejection text, the evidence you added, and the final accepted state.

If the first request succeeds, stop. Restore the validation rule and repeat the case.

**Checkpoint 5:** Recovery corrected the data and kept the rule.

## Part 6: Inspect and hand off (20 minutes)

Swap canvases with another group. Inspect:

- artifact location and scope;
- state and defaults;
- visible human actions;
- agent-callable capabilities;
- rejection and recovery records;
- dependencies and persisted data;
- owner and retirement trigger.

Fix contract mismatches, then compare the final state with `../solution/final-state.json`.

**Checkpoint 6:** The canvas matches the contract.

You're done when another person can identify the extension scope, the fixed contract, the starting state, both accepted changes, and the rejected change with its recovery.

## Troubleshooting

| Issue | Response |
| --- | --- |
| Project scope is blocked | Use user scope. |
| Generated actions exceed the contract | Remove them before testing. |
| State and agent response disagree | Stop and inspect the shared artifact. |
| Local tests fail before edits | Restore the starter files. |
| `ready` accepts empty evidence | Fix the rule before review. |

The worked contract and final state are in `../solution/`.

## Optional variant: Feature Workbench

Try this after the default lab, or when the trainer assigns it as follow-up.

1. Open `starter/feature-workbench-contract.md`.
2. Load the synthetic checks from `starter/feature-workbench-sample.json`.
3. Decide whether `FEAT-204` should pass the test gate.
4. Record the required check that blocks the decision.
5. Compare your review with `solution/feature-workbench-solution.md` and `solution/feature-workbench-final-state.json`.

The canvas may propose `pass`, `hold`, or `rerun`. A human reviewer records the final decision. Don't connect a live CI system, merge code, or trigger deployment.
