# Session 09 Lab: One Issue from Contract to Review

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–07

**Deliverable:** One completed issue evidence packet

## Objective

Carry one synthetic issue through five checkpoints: issue contract, setup, proposed change, tests, and human decision. Use Copilot cloud agent only when access is approved. Otherwise complete the same journey manually.

## Deliverables

Submit:

1. the approved `issue.md`;
2. the completed `checkpoint-record.md`;
3. the proposed diff or pull request reference;
4. test output;
5. the completed `pr-review-checklist.md`;
6. a final decision: approve, request changes, or pause.

## Access policy

The live route requires approved Copilot cloud agent access for the training repository, synthetic data, and a named reviewer.

If access, policy approval, or reviewer ownership is missing, **do not assign the issue**. Use the manual route with the supplied sample project. Do not add credentials to issues, instructions, setup workflows, or comments.

## The one issue

Use `starter/issue.md` for the entire lab.

The request is:

```text
Reject blank or whitespace-only task titles.
```

Do not replace it with another issue, add another endpoint, or expand it into API cleanup.

## Setup

From the repository root:

```bash
cd sessions/session-09-cloud-agent/lab
npm --prefix starter/sample-project install
npm --prefix starter/sample-project test
```

Expected result: the starter suite passes before the new validation is added.

Open:

- `../issue.md`
- `../copilot-instructions.md`
- `../copilot-setup-steps.yml`
- `../checkpoint-record.md`
- `../pr-review-checklist.md`

The setup workflow asset is intended for `.github/workflows/copilot-setup-steps.yml` in a live training repository.

## Time plan

| Checkpoint | Work | Time |
| --- | --- | --- |
| 1 | Approve the issue contract | 20 min |
| 2 | Verify repository setup | 20 min |
| 3 | Produce and inspect the proposed change | 35 min |
| 4 | Run and review tests | 25 min |
| 5 | Make the human decision | 20 min |

## Checkpoint 1: Issue contract (20 minutes)

Read `starter/issue.md`.

Have a peer answer:

- Which request is invalid?
- What exact response is required?
- Which valid behavior must remain?
- Which files may change?
- Which command proves completion?
- What is out of scope?

Record the answers in `checkpoint-record.md`.

The issue is approved only when the answers come from the text rather than verbal context.

**Visible evidence:** The issue has a reviewer, fixed acceptance criteria, allowed files, non-goals, and a stop condition.

## Checkpoint 2: Setup (20 minutes)

1. Review `starter/copilot-instructions.md`.
2. Review `starter/copilot-setup-steps.yml`.
3. Confirm that the workflow content targets `.github/workflows/copilot-setup-steps.yml`.
4. Confirm the single job is named `copilot-setup-steps`.
5. Run the starter baseline:

   ```bash
   npm --prefix starter/sample-project test
   ```

6. Record the command and result.
7. Record the allowed file list: `src/app.js` and `tests/app.test.js`.

Stop if the baseline failure is unexplained, setup needs a credential, or any required command is not approved.

**Visible evidence:** Passing baseline, reviewed setup files, named reviewer, and stop condition.

## Checkpoint 3: Proposed change (35 minutes)

### Live route

Place the sample project in an approved training repository. Add the reviewed instructions and setup workflow if policy permits.
Copy the contents of `starter/sample-project/` to the repository root. The setup
workflow expects `package.json`, `package-lock.json`, `src/`, and `tests/` at that
root.

Create or reuse the one issue from `starter/issue.md`. Assign it through a currently supported and approved Copilot cloud agent entry point.

Monitor the session. Record:

- files the agent plans to change;
- commands it reports;
- questions or steering;
- the final proposed files.

Use this message only if the work drifts:

```text
Keep the existing issue contract. Change only src/app.js and tests/app.test.js.
Add no dependency. Stop and ask for clarification if broader work is required.
```

### Manual route

Copy the starter project to a writable folder:

```bash
cp -R starter/sample-project working-project
cd working-project
```

Implement only the fixed issue.

### Review the proposal

Before tests, inspect the diff with `starter/pr-review-checklist.md`.

Confirm:

- only the two allowed files changed;
- blank and whitespace-only titles return HTTP 400;
- the error body is `{ "error": "title is required" }`;
- valid task creation keeps its existing response shape;
- no dependency or unrelated endpoint changed.

If no live proposal is ready after 25 minutes, use `solution/proposed-change.diff` as prepared evidence and continue the review.

**Visible evidence:** A pull request, local diff, or prepared diff tied to the same issue.

## Checkpoint 4: Tests (25 minutes)

Run:

```bash
npm test
```

The evidence must cover:

| Case | Expected result |
| --- | --- |
| Empty title `""` | HTTP 400 and required error body |
| Whitespace title `"   "` | HTTP 400 and required error body |
| Valid title `" Weekly plan "` | HTTP 201 with the existing response fields |
| Existing endpoints | Existing tests still pass |

Record the command, pass count, failure count, and any review comment.

If a required case is missing, request that focused change. Do not add a new issue or unrelated cleanup.

**Visible evidence:** Test output linked to the reviewed proposal.

## Checkpoint 5: Human decision (20 minutes)

The named reviewer completes `starter/pr-review-checklist.md`.

Choose:

- **approve** when the issue, diff, and tests agree;
- **request changes** when a bounded correction remains;
- **pause** when access, evidence, policy, or ownership is unresolved.

Record the reason and next safe action in `checkpoint-record.md`.

Compare your packet with `solution/issue-journey.md` only after the decision.

**Visible evidence:** A signed review decision. Do not merge as part of this lab unless the training repository policy explicitly requires it.

## Final deliverable

The packet is complete when another reviewer can trace:

```text
same issue → reviewed setup → proposed change → test evidence → human decision
```

## Troubleshooting

| Issue | Response |
| --- | --- |
| Copilot cloud agent access is missing | Use the manual route. |
| Setup workflow is not active on the default branch | Use the local baseline and record the setup gap. |
| Session edits extra files | Stop or request a scoped correction. |
| Test output is missing | Run the verified command before deciding. |
| A test passes but response shape changed | Request changes and cite the preserved-behavior criterion. |
| Review suggests a second feature | Record it as future work, outside this issue. |

## Solution reference

`solution/` contains the completed issue journey, prepared diff, setup workflow, runnable solution project, test evidence, and final review decision.
