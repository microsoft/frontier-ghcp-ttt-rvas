# Session 09: Trainer Guide

**Teaching time:** 60 minutes

**Lab handoff:** `../lab/README.md`

## Teaching goal

Teach one bounded issue-to-review journey. Learners should be able to stop at each checkpoint, point to evidence, and name the human who decides what happens next.

## Required preparation

Before class:

1. Confirm whether Copilot cloud agent is approved for the training repository.
2. Use only the synthetic task API in `../lab/starter/sample-project/`.
3. Name the reviewer and define the stop condition.
4. Run:

   ```bash
   cd sessions/session-09-cloud-agent/lab/starter/sample-project
   npm install
   npm test
   ```

5. Review `../lab/starter/issue.md`.
6. Review `../lab/starter/copilot-instructions.md`.
7. Review `../lab/starter/copilot-setup-steps.yml` as content intended for `.github/workflows/copilot-setup-steps.yml`.
8. Keep `../lab/solution/issue-journey.md` and `../lab/solution/proposed-change.diff` ready.

## Access decision

The live route requires:

- Copilot cloud agent is enabled for the repository;
- the repository and synthetic data are approved;
- the issue and setup are reviewed;
- a human reviewer is named;
- the stop condition is visible.

If one condition is missing, use the manual route. **Do not assign the issue, broaden access, or paste credentials into an issue or instruction file.**

## One-hour plan

| Time | Segment | Checkpoint evidence |
| --- | --- | --- |
| 0:00–0:05 | Frame and access decision | Live or manual route selected |
| 0:05–0:16 | Checkpoint 1: issue contract | Approved issue |
| 0:16–0:27 | Checkpoint 2: setup | Passing baseline and reviewed setup |
| 0:27–0:39 | Start or simulate one session | Bounded progress evidence |
| 0:39–0:47 | Checkpoint 3: proposed change | Scoped diff review |
| 0:47–0:54 | Checkpoint 4: tests | Recorded test result |
| 0:54–0:58 | Checkpoint 5: human decision | Approve, request changes, or pause |
| 0:58–1:00 | Lab handoff | Roles and records ready |

## 0:00–0:05: Frame the journey

Show the five-checkpoint sequence.

Say:

> “We will keep one issue fixed from assignment through review. If the work needs a different issue, we stop and write one.”

State the selected access route. Ask the reviewer to confirm ownership of the final decision.

## 0:05–0:16: Checkpoint 1: issue contract

Start with this weak request:

```text
Fix title validation.
```

Open `../lab/starter/issue.md`. Show how the same request becomes a bounded contract:

- blank and whitespace-only titles return HTTP 400;
- the error body is `{ "error": "title is required" }`;
- valid creation keeps its response shape;
- only `src/app.js` and `tests/app.test.js` may change;
- `npm test` must pass;
- no dependency or unrelated endpoint change is allowed.

Ask a learner to map each criterion to evidence.

**Gate:** Do not assign the issue until a peer can name changed behavior, preserved behavior, allowed files, required checks, and non-goals.

## 0:16–0:27: Checkpoint 2: setup

Open `../lab/starter/copilot-instructions.md`.

Confirm that it describes:

- Node.js and the supplied Express app;
- file scope;
- response format;
- no new dependencies;
- `npm test`.

Open `../lab/starter/copilot-setup-steps.yml`.

Explain that the asset is intended for:

```text
.github/workflows/copilot-setup-steps.yml
```

Point out the single job named `copilot-setup-steps`, least required permissions, dependency install, and baseline test.

Run the local baseline:

```bash
cd sessions/session-09-cloud-agent/lab/starter/sample-project
npm test
```

**Gate:** Stop when the baseline fails without an explanation, setup requests a credential, or the reviewer cannot identify the allowed files.

## 0:27–0:39: Start or simulate one session

### Live route

Assign only `../lab/starter/issue.md` through a currently supported and approved entry point.

Monitor observed facts:

- planned files;
- commands;
- edits;
- test reports;
- questions or scope changes.

Use this steering message only if needed:

```text
Keep the current issue contract. Change only src/app.js and tests/app.test.js.
Add no dependency. Stop and ask for clarification if broader work is required.
```

Stop on scope drift. Do not edit the issue during the run.

### Manual route

Have one learner implement the fixed issue in a copy of the starter project. Another learner watches the allowed file list and stop conditions.

### Time guard

At 0:35, switch to `../lab/solution/proposed-change.diff` if no reviewable proposal exists. Label it prepared evidence.

## 0:39–0:47: Checkpoint 3: proposed change

Review the live or prepared diff before running tests.

Check:

1. Only `src/app.js` and `tests/app.test.js` changed.
2. Blank and whitespace-only strings are rejected.
3. The response body matches the issue.
4. Valid task creation preserves its response shape.
5. No dependency, configuration, or unrelated endpoint changed.

Use `../lab/starter/pr-review-checklist.md`.

Model one bounded review comment:

```text
The blank-title test passes, but the whitespace case is missing.
Add that focused test in tests/app.test.js. Keep the current file scope,
then run npm test and report the result.
```

## 0:47–0:54: Checkpoint 4: tests

Run:

```bash
npm test
```

Require evidence for:

- empty string;
- whitespace-only string;
- valid title with surrounding whitespace;
- all existing endpoints.

Passing tests are necessary, but they do not replace diff review.

If a test fails, decide whether the correction fits the issue. Request a bounded change or pause.

## 0:54–0:58: Checkpoint 5: human decision

The named reviewer chooses:

- **approve** when scope, behavior, and tests match the issue;
- **request changes** when the required correction stays within the issue;
- **pause** when access, evidence, policy, or ownership is unresolved.

Do not turn the decision into a new implementation request.

## 0:58–1:00: Lab handoff

Assign:

- issue owner;
- live operator or manual implementer;
- reviewer;
- evidence recorder.

Point learners to `../lab/starter/checkpoint-record.md`. The same issue must appear at all five checkpoints.

## Demo rejection and recovery

Use one of these controlled failures:

| Failure | Expected review response |
| --- | --- |
| Whitespace test is missing | Request one focused test. |
| `package.json` changes | Reject the unrelated dependency or script change. |
| Error body differs | Cite the exact acceptance criterion. |
| Valid response shape changes | Request restoration and a regression test. |

Recovery succeeds when the proposal returns to the fixed issue and the full suite passes.

## Common failures

| Failure | Recovery |
| --- | --- |
| Cloud agent access is unavailable | Use the manual route. |
| Setup workflow is not on the default branch | Treat the live environment as unprepared and use the manual route. |
| Baseline tests fail | Diagnose before assignment; do not hide the failure. |
| Session changes extra files | Stop or request a scoped correction. |
| Learners rewrite the issue mid-run | Stop and create a separate future issue. |
| Live work is delayed | Switch to prepared evidence at 0:35. |
| Tests pass but the diff violates scope | Request changes or pause. |

## Product notes checked September 24, 2026

Official GitHub documentation describes Copilot cloud agent as an asynchronous workflow that can work from an issue, use an ephemeral development environment, produce a pull request, expose session logs, and accept human steering. The documented setup workflow path is `.github/workflows/copilot-setup-steps.yml`, with one job named `copilot-setup-steps`. Access, policies, available entry points, and usage controls can differ, so trainers must verify them before delivery.
