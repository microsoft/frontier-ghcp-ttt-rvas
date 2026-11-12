# Session M3-02: Trainer guide

**Teaching time:** 60 minutes

**Lab handoff:** `../lab/README.md`

## Teaching goal

Demonstrate one issue from assignment through review. At each checkpoint, ask learners to show the relevant files or test output and name who decides what happens next.

## Preparation

1. Confirm Copilot cloud agent is enabled for the training repository.
2. Pick a reviewer and a stop condition.
3. Run the baseline:

   ```bash
   cd sessions/session-m3-02-cloud-agent/lab/starter/sample-project
   npm install
   npm test
   ```

4. Read `../lab/starter/issue.md`, `../lab/starter/copilot-instructions.md`, and `../lab/starter/copilot-setup-steps.yml` (content for `.github/workflows/copilot-setup-steps.yml`).
5. Keep `../lab/solution/issue-journey.md` and `../lab/solution/proposed-change.diff` ready.

If cloud agent isn't available, don't assign the issue. Walk through the prepared diff instead.

## One-hour plan

| Time | Segment | What to check |
| --- | --- | --- |
| 0:00 to 0:05 | Introduce the workflow | Five checkpoints understood |
| 0:05 to 0:16 | Checkpoint 1: issue contract | Issue is complete |
| 0:16 to 0:27 | Checkpoint 2: setup | Passing baseline, reviewed setup |
| 0:27 to 0:39 | Start one session | Planned files, commands, and edits stay within the issue |
| 0:39 to 0:47 | Checkpoint 3: proposed change | Diff checked against allowed files |
| 0:47 to 0:54 | Checkpoint 4: tests | Recorded test result |
| 0:54 to 0:58 | Checkpoint 5: human decision | Approve, request changes, or pause |
| 0:58 to 1:00 | Lab handoff | Roles ready |

## 0:00 to 0:05: Introduce the workflow

Show the five-checkpoint sequence. Say: "We keep one issue fixed from assignment through review. If the work needs a different issue, we stop and write one."

Name the reviewer who owns the final decision.

## 0:05 to 0:16: Checkpoint 1: issue contract

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

Ask a learner to map each criterion to a test or diff check.

**Gate:** Don't assign the issue until a peer can name the changed behavior, preserved behavior, allowed files, required checks, and non-goals.

## 0:16 to 0:27: Checkpoint 2: setup

Open `../lab/starter/copilot-instructions.md`. It should cover Node.js and the Express app, file scope, response format, no new dependencies, and `npm test`.

Open `../lab/starter/copilot-setup-steps.yml`. It belongs at `.github/workflows/copilot-setup-steps.yml`. Point out the single job `copilot-setup-steps`, minimal permissions, dependency install, and baseline test.

Run the baseline:

```bash
cd sessions/session-m3-02-cloud-agent/lab/starter/sample-project
npm test
```

**Gate:** Stop if the baseline fails without explanation, setup asks for a credential, or the reviewer can't name the allowed files.

## 0:27 to 0:39: Start one session

Assign `../lab/starter/issue.md` to Copilot cloud agent. Watch the session and note planned files, commands, edits, test reports, and questions.

Steer only if needed:

```text
Keep the current issue contract. Change only src/app.js and tests/app.test.js.
Add no dependency. Stop and ask for clarification if broader work is required.
```

Stop on scope drift. Don't edit the issue during the run.

At 0:35, if there's no reviewable proposal, show `../lab/solution/proposed-change.diff` to finish the demo. Fix access problems before the learner lab.

## 0:39 to 0:47: Checkpoint 3: proposed change

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

## 0:47 to 0:54: Checkpoint 4: tests

```bash
npm test
```

Look for results covering the empty string, a whitespace-only string, a valid title with surrounding whitespace, and all existing endpoints.

Passing tests don't replace diff review. If a test fails, decide whether the fix fits the issue. Then request it or pause.

## 0:54 to 0:58: Checkpoint 5: human decision

The reviewer chooses:

- **approve** when scope, behavior, and tests match the issue;
- **request changes** when the correction stays within the issue;
- **pause** when test output or ownership is unresolved.

Don't turn the decision into a new implementation request.

## 0:58 to 1:00: Lab handoff

Assign four roles: issue owner, cloud agent operator, reviewer, test runner. The same issue stays in scope from setup through review.

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
| Setup workflow isn't on the default branch | Prepare the repository. |
| Baseline tests fail | Diagnose before assignment. |
| Session changes extra files | Stop it or tell the agent to change only the allowed files. |
| Learners rewrite the issue mid-run | Stop and write a separate future issue. |
| Tests pass but the diff breaks scope | Request changes or pause. |
