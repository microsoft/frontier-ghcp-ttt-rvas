# Session M3-02: Trainer guide

**Teaching time:** 60 minutes

**Lab handoff:** `../lab/README.md`

## Teaching goal

Demonstrate one issue from assignment through review. At each checkpoint, ask learners to show the relevant files or test output and name who decides what happens next.

## Preparation

Do this before the session. The demo runs live in a real repository.

1. Confirm Copilot cloud agent is enabled for a training repository where you have write access.
2. Copy `../lab/starter/sample-project/` to the repository root. Add `../lab/starter/copilot-instructions.md` as `.github/copilot-instructions.md` and `../lab/starter/copilot-setup-steps.yml` as `.github/workflows/copilot-setup-steps.yml`. Merge to the default branch.
3. Run the baseline locally:

   ```bash
   cd sessions/session-m3-02-cloud-agent/lab/starter/sample-project
   npm install
   npm test
   ```

4. Create the issue from `../lab/starter/issue.md`, but don't assign it yet.
5. Keep `../lab/solution/issue-journey.md` and `../lab/solution/proposed-change.diff` open as the fallback. Check the Copilot docs for the current session environment.

If cloud agent isn't available, don't assign the issue. Walk through the prepared diff instead and say that it's a prepared example.

Learners set up their own repository in the lab. Don't set it up for them.

## One-hour plan

| Time | Segment | What to check |
| --- | --- | --- |
| 0:00 to 0:08 | Mental model | Issue, session, pull request; cloud vs IDE and CLI |
| 0:08 to 0:14 | Checkpoint 1: issue contract | Issue is complete |
| 0:14 to 0:20 | Checkpoint 2: setup | Setup workflow and instructions understood |
| 0:20 to 0:40 | Live demo: issue to pull request | Assignment, session log, draft PR |
| 0:40 to 0:46 | Checkpoint 3: proposed change | Diff checked against allowed files |
| 0:46 to 0:52 | Checkpoint 4: tests | Recorded test result |
| 0:52 to 0:57 | Checkpoint 5: human decision | Approve, request changes, or pause |
| 0:57 to 1:00 | Lab handoff | Where the work happens |

## 0:00 to 0:08: Mental model

Draw the flow from the slides: an issue is assigned to Copilot, a session starts in a temporary environment, the agent edits and runs tests, then it pushes a branch and opens a draft pull request. You review. A review comment starts another round.

Explain the environment. For Actions-based sessions, `copilot-setup-steps.yml` runs before the agent starts. It installs what the agent needs to build and test. It needs one job named `copilot-setup-steps` and must be on the default branch. Instructions tell the agent how to work in the repository. Newer cloud sandbox sessions don't use setup steps, so tell learners to check current docs.

Compare with the IDE and CLI agents: they run on your machine while you watch. The cloud agent runs on GitHub while you do something else, then hands you a pull request. Use it for well-scoped work you can review later.

Say: "We keep one issue fixed from assignment through review. If the work needs a different issue, we stop and write one."

## 0:08 to 0:14: Checkpoint 1: issue contract

Start with a weak request:

```text
Fix title validation.
```

Open `../lab/starter/issue.md` and show how the same request gains testable criteria and a file scope:

- blank and whitespace-only titles return HTTP 400;
- the error body is `{ "error": "title is required" }`;
- valid creation keeps its response shape;
- only `src/app.js` and `tests/app.test.js` may change;
- `npm test` must pass;
- no dependency or unrelated endpoint change.

**Gate:** Don't assign until you can name the changed behavior, preserved behavior, allowed files, required check, and non-goals.

## 0:14 to 0:20: Checkpoint 2: setup

Open the repository's `.github/copilot-instructions.md`: Node.js and the Express app, file scope, response format, no new dependencies, `npm test`.

Open `.github/workflows/copilot-setup-steps.yml`. Point out the single job, minimal permissions, dependency install, and baseline test. Show that it already ran in the **Actions** tab.

**Gate:** Stop if setup asks for a credential.

## 0:20 to 0:40: Live demo: issue to pull request

1. Assign the issue to Copilot.
2. Open the session. Narrate the plan, the commands, and the edits.
3. While it runs, show `../lab/starter/pr-review-checklist.md`.
4. Open the draft pull request. Read the diff before the checks.

Steer only if needed, with a comment on the pull request:

```text
Keep the current issue contract. Change only src/app.js and tests/app.test.js.
Add no dependency. Stop and ask for clarification if broader work is required.
```

Stop on scope drift. Don't edit the issue during the run.

At 0:34, if there's no reviewable pull request, show `../lab/solution/proposed-change.diff` and say it's a prepared example. Fix access problems before the learner lab.

## 0:40 to 0:46: Checkpoint 3: proposed change

Review the diff before running tests, using `../lab/starter/pr-review-checklist.md`:

1. Only `src/app.js` and `tests/app.test.js` changed.
2. Blank and whitespace-only strings are rejected.
3. The response body matches the issue.
4. Valid task creation keeps its response shape.
5. No dependency, configuration, or unrelated endpoint changed.

Model a review comment that stays within the issue:

```text
The blank-title test passes, but the whitespace case is missing.
Add that focused test in tests/app.test.js. Keep the current file scope,
then run npm test and report the result.
```

## 0:46 to 0:52: Checkpoint 4: tests

```bash
npm test
```

Look for results covering the empty string, a whitespace-only string, a valid title with surrounding whitespace, and all existing endpoints.

Passing tests don't replace diff review. If a test fails, decide whether the fix fits the issue. Then request it or pause.

## 0:52 to 0:57: Checkpoint 5: human decision

Choose:

- **approve** when scope, behavior, and tests match the issue;
- **request changes** when the correction stays within the issue;
- **pause** when test output is unclear.

Don't turn the decision into a new implementation request.

## 0:57 to 1:00: Lab handoff

The lab runs in the learners' own training repository on GitHub. They copy the starter files, merge the setup workflow, create the issue, and assign it themselves. `proposed-change.diff` is reference only. Roles: issue writer, agent operator, reviewer, test runner.

## Controlled failures to demo

| Failure | Expected review response |
| --- | --- |
| Whitespace test is missing | Request one focused test. |
| `package.json` changes | Reject the unrelated dependency or script change. |
| Error body differs | Cite the exact acceptance criterion. |
| Valid response shape changes | Request restoration and a regression test. |

Recovery works when the proposal returns to the fixed issue and the full suite passes.

## Common failures

| Failure | Recovery |
| --- | --- |
| Setup workflow isn't on the default branch | Merge it, then run it from the **Actions** tab. |
| Baseline tests fail | Diagnose before assignment. |
| Session changes extra files | Stop it or tell the agent to change only the allowed files. |
| Learners rewrite the issue mid-run | Stop and write a separate future issue. |
| Tests pass but the diff breaks scope | Request changes or pause. |
