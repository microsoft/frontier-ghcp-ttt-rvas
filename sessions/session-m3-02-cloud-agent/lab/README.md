# Session M3-02 lab: One issue from contract to review

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04

**Deliverable:** One reviewed change with passing focused tests

## Objective

Take one synthetic issue from its fixed contract through setup and
implementation with Copilot cloud agent, then test and review the change.
If access or permission is missing, stop the lab and resolve it before assigning
the issue. Manual work does not complete this lab.

## Deliverables

Submit:

1. the fixed `issue.md`;
2. the proposed diff or pull request reference;
3. test output;
4. the review outcome in the pull request or local review.

## Access policy

You need Copilot cloud agent access to the training repository, synthetic
data, and a reviewer.

If access, policy approval, or reviewer ownership is missing, do not assign the
issue. Stop the lab. Do not add credentials to issues, instructions,
setup workflows, or comments.

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
cd sessions/session-m3-02-cloud-agent/lab
npm --prefix starter/sample-project install
npm --prefix starter/sample-project test
```

Expected result: the starter suite passes before the new validation is added.

Open:

- `../issue.md`
- `../copilot-instructions.md`
- `../copilot-setup-steps.yml`
- `../pr-review-checklist.md`

The setup workflow belongs at `.github/workflows/copilot-setup-steps.yml` in a live training repository.

## Time plan

| Checkpoint | Work | Time |
| --- | --- | --- |
| 1 | Approve the issue contract | 20 min |
| 2 | Check repository setup | 20 min |
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

Clarify any ambiguous issue text before implementation.

**Result:** The issue has fixed acceptance criteria, allowed files, non-goals, and
a stop condition.

## Checkpoint 2: Setup (20 minutes)

1. Review `starter/copilot-instructions.md`.
2. Review `starter/copilot-setup-steps.yml`.
3. Check that the workflow content targets `.github/workflows/copilot-setup-steps.yml`.
4. Check that the single job is named `copilot-setup-steps`.
5. Run the starter baseline:

   ```bash
   npm --prefix starter/sample-project test
   ```

6. Record the command and result.
7. Record the allowed file list: `src/app.js` and `tests/app.test.js`.

Stop if the baseline failure is unexplained, setup needs a credential, or any required command is not approved.

**Checkpoint record:** Passing test output, reviewed setup files, named reviewer, and stop condition.

## Checkpoint 3: Proposed change (35 minutes)

Place the sample project in an approved training repository. Add the reviewed instructions and setup workflow if policy permits.
Copy the contents of `starter/sample-project/` to the repository root. The setup
workflow expects `package.json`, `package-lock.json`, `src/`, and `tests/` at that
root.

Create or reuse the one issue from `starter/issue.md`. Assign it through a currently supported Copilot cloud agent entry point allowed by repository policy.

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

### Review the proposal

Before tests, inspect the diff with `starter/pr-review-checklist.md`.

Check:

- only the two allowed files changed;
- blank and whitespace-only titles return HTTP 400;
- the error body is `{ "error": "title is required" }`;
- valid task creation keeps its existing response shape;
- no dependency or unrelated endpoint changed.

If no proposal is ready after 25 minutes, stop the run.

**Checkpoint record:** A pull request or agent-produced diff tied to the same issue.

## Checkpoint 4: Tests (25 minutes)

Run:

```bash
npm test
```

The test output must cover:

| Case | Expected result |
| --- | --- |
| Empty title `""` | HTTP 400 and required error body |
| Whitespace title `"   "` | HTTP 400 and required error body |
| Valid title `" Weekly plan "` | HTTP 201 with the existing response fields |
| Existing endpoints | Existing tests still pass |

If a required case is missing, request a test for that case. Do not add a new issue or unrelated cleanup.

**Result:** The reviewed proposal has focused test output.

## Checkpoint 5: Human decision (20 minutes)

Use `starter/pr-review-checklist.md` to inspect the change.

Choose:

- **approve** when the issue, diff, and tests agree;
- **request changes** when a correction within the issue remains;
- **pause** when access, test output, policy, or ownership is unresolved.

Compare the result with `solution/issue-journey.md` after the review.

**Result:** The pull request or local review shows the outcome. Do not merge as
part of this lab unless the training repository policy explicitly requires it.

## Final deliverable

Your work is complete when another reviewer can trace:

```text
same issue → reviewed setup → proposed change → tests → review outcome
```

## Troubleshooting

| Issue | Response |
| --- | --- |
| Copilot cloud agent access is missing | Stop the lab. |
| Setup workflow is not active on the default branch | Stop the lab. |
| Session edits extra files | Stop or ask the agent to change only the allowed files. |
| Test output is missing | Run the required test command before deciding. |
| A test passes but response shape changed | Request changes and cite the criterion for preserving the response shape. |
| Review suggests a second feature | Record it as future work, outside this issue. |

## Solution reference

`solution/` contains the completed issue journey and final review decision. It also includes the prepared diff, setup workflow, runnable solution project, and test output.
