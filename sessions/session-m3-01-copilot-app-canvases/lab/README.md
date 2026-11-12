# Session M3-01 lab: Build and review a canvas contract

## Objective

Use one synthetic delivery-readiness contract from setup through handoff. Create the canvas in the Copilot app from the contract. Make a visible change and an agent-requested change to the same state. Check that an invalid change is rejected, then recover without changing the rule.

You need the Copilot app and `/create-canvas`. Use synthetic data only. Canvas extensions are new, so check the [current docs](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions) if a step differs from what you see.

## Deliverables

1. Your completed `canvas-contract.md`.
2. The generated extension location.
3. A final state that matches the accepted transitions.

## Setup (optional)

The local tests are **scaffolding**: hand-built JavaScript that checks this exercise's rules. They don't test Copilot or the canvas you generate. Run them for a quick sanity check, or skip them.

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
| 1 | Check the contract | 15 min |
| 2 | Optional scaffolding tests | 5 min |
| 3 | Create the canvas | 30 min |
| 4 | Make two visible state changes | 25 min |
| 5 | Check rejection and recovery | 25 min |
| 6 | Inspect and hand off | 20 min |

## Part 1: Check the contract (15 minutes)

1. Pick project or user scope.
2. Check that all data comes from `prepared-items.json`.
3. Review every state field, human action, agent capability, and validation rule in `canvas-contract.md`.

The contract must keep these rules:

- statuses are `planned`, `in-progress`, `review`, and `ready`;
- one update changes one named item;
- `ready` requires non-empty evidence;
- unknown items and statuses are rejected;
- no external system is connected.

**Checkpoint 1:** A peer can explain the contract without adding verbal requirements.

## Part 2: Optional scaffolding tests (5 minutes)

```bash
npm test
```

Map each test in `test/canvas-contract.test.mjs` to a contract rule. If the tests fail, reset your copy from `lab/starter/` or skip this part. The canvas doesn't depend on them.

**Checkpoint 2:** Your group can name the planned rejection.

## Part 3: Create the canvas (30 minutes)

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

Find the generated directory (`.github/extensions/<name>/` or `~/.copilot/extensions/<name>/`). Expect a `package.json` and an entry file such as `extension.mjs`, and possibly JSON state. The exact layout can differ, so write down what you see.

Read the entry file for state, visible controls, and agent-callable capabilities. Check `package.json` for dependencies you didn't ask for. Ask Copilot to remove anything outside the contract.

**Checkpoint 3:** The canvas shows all three prepared items and no extra capability.

## Part 4: Make two visible state changes (25 minutes)

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

## Part 5: Check rejection and recovery (25 minutes)

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
- dependencies and persisted data.

Fix contract mismatches, then compare the final state with `../solution/final-state.json`.

**Checkpoint 6:** The canvas matches the contract.

You're done when another person can identify the extension scope, the fixed contract, the starting state, both accepted changes, and the rejected change with its recovery.

## Troubleshooting

| Issue | Response |
| --- | --- |
| Project scope is blocked | Use user scope. |
| Generated actions exceed the contract | Remove them before testing. |
| State and agent response disagree | Stop and inspect the shared artifact. |
| Local tests fail before edits | Restore the starter files, or skip Part 2. |
| `ready` accepts empty evidence | Fix the rule before review. |

The worked contract and final state are in `../solution/`.

## Optional variant: Feature Workbench

Optional. Skip it unless you finish early or your trainer assigns it.

1. Open `starter/feature-workbench-contract.md`.
2. Load the synthetic checks from `starter/feature-workbench-sample.json`.
3. Decide whether `FEAT-204` should pass the test gate.
4. Record the required check that blocks the decision.
5. Compare your review with `solution/feature-workbench-solution.md` and `solution/feature-workbench-final-state.json`.

The canvas may propose `pass`, `hold`, or `rerun`. A human reviewer records the final decision. Don't connect a live CI system, merge code, or trigger deployment.
