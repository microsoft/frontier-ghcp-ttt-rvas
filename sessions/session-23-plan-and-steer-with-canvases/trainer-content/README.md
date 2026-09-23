# Session 22 Trainer Guide: Plan and Steer Work with Canvases

**Duration:** 1 hour

**Format:** Discussion, prepared demonstration, and lab briefing

## Trainer goal

Show product and delivery roles how to use GitHub Copilot with a prepared canvas as a shared work artifact. Keep extension construction out of scope. Learners use Copilot to inspect, change, and verify the same state.

## Preflight

Complete this check before the session:

- Use a non-sensitive training repository or local folder.
- Use only the synthetic Service Request Portal assets in this session.
- Confirm every learner has active GitHub Copilot access.
- Confirm every learner can open the approved prepared canvas.
- Confirm which Copilot actions the prepared canvas exposes.
- Test a Copilot state read, one visible update, and one Copilot-requested update.
- Load `lab/starter/release-state.json` through the approved canvas setup.
- Name the trainer who owns the live artifact and will remove it after the session.
- Stop the live demo if policy, data scope, action scope, or ownership is unclear.

Do not install or construct an extension during delivery. **GitHub Copilot and the approved prepared canvas are required.** If either is unavailable, stop the lab. JSON edits and written reports do not meet the session outcomes.

## One-hour plan

| Time | Topic | Trainer evidence |
| --- | --- | --- |
| 0:00–0:08 | Session boundary and scenario | Session 08 distinction is clear |
| 0:08–0:18 | Read the prepared contract | State, actions, validation, and limits identified |
| 0:18–0:33 | Visible steering and Copilot verification | One visible change with evidence |
| 0:33–0:47 | Copilot steering demonstration | One accepted and one refused update |
| 0:47–0:55 | Compare state with report | Mismatch check completed |
| 0:55–1:00 | Ownership and lab handoff | Owner, recovery, removal, and stop rules named |

## 1. Set the boundary (8 minutes)

Start with the distinction:

| Session 08 | Session 22 |
| --- | --- |
| Designs and creates an extension | Uses a prepared canvas |
| Defines implementation details | Reviews the operating contract |
| Tests extension behavior | Steers delivery state |
| Technical builder focus | Product and delivery role focus |

The session uses a synthetic Service Request Portal release. The canvas does not deploy, merge, approve production access, or call an external system.

## 2. Read the contract (10 minutes)

Open `lab/starter/canvas-contract.md`. Ask the group to find:

1. the authoritative state;
2. direct user actions;
3. Copilot-callable actions;
4. validation rules;
5. the data boundary;
6. the owner and removal trigger.

Explain why the contract comes before the interface. Product labels and control placement can change. The state rules and authority boundary must remain reviewable.

## 3. Demonstrate visible steering and Copilot verification (15 minutes)

Open the prepared canvas. If it is unavailable, stop the lab.

Use the visible controls to:

1. move `W-102` from `in-progress` to `review`;
2. add evidence `E-003` for the focused accessibility check;
3. link `E-003` to `W-102`;
4. increment the revision;
5. confirm that readiness remains `conditional`.

Write the same change in an evidence record. Then ask Copilot to read `W-102`, `E-003`, the revision, and readiness from the canvas. Compare the response with the visible state.

## 4. Demonstrate Copilot steering (14 minutes)

First ask for an invalid update:

```text
Update W-103 to ready. Use the prepared canvas state. Do not invent evidence.
If the contract blocks the update, leave the state unchanged and explain why.
Report the item ID, revision, and readiness result.
```

The expected result is refusal because `W-103` has no acceptable evidence.

Then add evidence `E-004` through the visible surface. Ask GitHub Copilot:

```text
Update W-103 to ready using evidence E-004.
Change only that work item.
Then read the current state and report the item, linked evidence, revision,
and readiness result.
```

Do not promise a fixed UI flow. Current GitHub documentation says people can use canvas controls while Copilot calls exposed capabilities against the same state. The available controls and capability names depend on the prepared canvas.

## 5. Compare visible state with the report (8 minutes)

Check the visible artifact rather than trusting the response.

| Check | Question |
| --- | --- |
| Scope | Did only `W-103` change? |
| Evidence | Is `E-004` present and linked? |
| Revision | Did it change once? |
| Readiness | Does the result follow the contract? |
| Record | Does the evidence log describe the same change? |

If the report and state differ, pause approval. Re-read the state, correct the record, and rerun only the smallest needed action.

## 6. Close with ownership (5 minutes)

Show the final section of `evidence-record.md`. A release artifact needs:

- an owner who maintains the state;
- a reviewer who can approve or pause;
- a recovery procedure for interrupted canvas work;
- a removal trigger;
- stop conditions for policy, scope, and evidence gaps.

## Demo recovery

| Problem | Recovery |
| --- | --- |
| Copilot or canvas access is missing at preflight | Stop the lab and record the failed prerequisite |
| Canvas stops responding after preflight | Stop changes, reopen the same canvas, ask Copilot to read state, and compare revisions |
| Prepared canvas is not approved | Stop. Do not install or use another extension |
| Copilot action is missing | Stop and record the missing prerequisite |
| Copilot report conflicts with state | Treat the visible state as authoritative and pause approval |
| A learner uses real data | Stop, remove it from the artifact, and restart with synthetic data |
| Product labels have changed | Follow current documentation and identify the equivalent surface |

## Product claims checked September 23, 2026

- The GitHub Copilot app is generally available for macOS, Windows, and Linux.
- Official documentation describes canvases as shared, interactive, bidirectional surfaces.
- People can update a canvas through its controls, while Copilot can use exposed capabilities.
- Project-scoped and user-scoped canvas locations are documented.
- The Customize tab is generally available and includes canvases.
- Plan, client, and administrator policy affect access.

Sources:

- https://github.blog/changelog/2026-06-17-github-copilot-app-generally-available/
- https://docs.github.com/en/copilot/get-started/quickstart-copilot-app
- https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions
- https://github.blog/changelog/2026-08-25-github-copilot-app-customize-tab-is-generally-available/

## Talking points

1. **Inspect the contract before acting.** A polished surface can still expose the wrong action or data.
2. **State beats chat.** Verify the shared artifact after every material Copilot update.
3. **Evidence moves with the decision.** A green status without proof is not release readiness.
4. **People keep authority.** The canvas helps a release owner decide; it does not approve the release.
