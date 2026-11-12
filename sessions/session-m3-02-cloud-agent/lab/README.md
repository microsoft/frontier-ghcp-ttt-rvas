# Session M3-02 lab: One issue from contract to review

## Objective

Take one synthetic issue from its fixed contract through setup and implementation with Copilot cloud agent. Then test and review the change. Manual work doesn't complete this lab.

You need cloud agent access to a training repository and a reviewer. Don't put credentials in issues, instructions, setup workflows, or comments.

## Deliverables

1. The fixed `issue.md`.
2. The proposed diff or pull request reference.
3. Test output.
4. The review outcome in the pull request or a local review.

## The one issue

Use `starter/issue.md` for the whole lab:

```text
Reject blank or whitespace-only task titles.
```

Don't swap in another issue, add an endpoint, or widen it into API cleanup.

## Setup

From the repository root:

```bash
cd sessions/session-m3-02-cloud-agent/lab
npm --prefix starter/sample-project install
npm --prefix starter/sample-project test
```

The starter suite passes before you add the validation.

Open `starter/issue.md`, `starter/copilot-instructions.md`, `starter/copilot-setup-steps.yml`, and `starter/pr-review-checklist.md`. In a live training repository the setup workflow goes at `.github/workflows/copilot-setup-steps.yml`.

## Time plan

| Checkpoint | Work | Time |
| --- | --- | --- |
| 1 | Check the issue contract | 20 min |
| 2 | Check repository setup | 20 min |
| 3 | Produce and inspect the proposed change | 35 min |
| 4 | Run and review tests | 25 min |
| 5 | Make the human decision | 20 min |

## Checkpoint 1: Issue contract (20 minutes)

Read `starter/issue.md`. Have a peer answer:

- Which request is invalid?
- What exact response is required?
- Which valid behavior must remain?
- Which files may change?
- Which command proves completion?
- What is out of scope?

Fix any ambiguous text before implementation.

**Result:** The issue has acceptance criteria, allowed files, non-goals, and a stop condition.

## Checkpoint 2: Setup (20 minutes)

1. Read `starter/copilot-instructions.md` and `starter/copilot-setup-steps.yml`.
2. Check that the workflow targets `.github/workflows/copilot-setup-steps.yml` and has a single job named `copilot-setup-steps`.
3. Run the baseline:

   ```bash
   npm --prefix starter/sample-project test
   ```

4. Write down the result and the allowed files: `src/app.js` and `tests/app.test.js`.

Stop if the baseline fails without explanation or setup needs a credential.

**Result:** Passing baseline output, reviewed setup files, a named reviewer, and a stop condition.

## Checkpoint 3: Proposed change (35 minutes)

Copy the contents of `starter/sample-project/` to the root of the training repository. The setup workflow expects `package.json`, `package-lock.json`, `src/`, and `tests/` there. Add the instructions and setup workflow.

Create the issue from `starter/issue.md` and assign it to Copilot cloud agent.

Monitor the session. Note the planned files, reported commands, any steering, and the final files. Steer only if the work drifts:

```text
Keep the existing issue contract. Change only src/app.js and tests/app.test.js.
Add no dependency. Stop and ask for clarification if broader work is required.
```

Before running tests, inspect the diff with `starter/pr-review-checklist.md`:

- only the two allowed files changed;
- blank and whitespace-only titles return HTTP 400;
- the error body is `{ "error": "title is required" }`;
- valid task creation keeps its response shape;
- no dependency or unrelated endpoint changed.

If no proposal is ready after 25 minutes, stop the run.

**Result:** A pull request or diff tied to the same issue.

## Checkpoint 4: Tests (25 minutes)

```bash
npm test
```

| Case | Expected result |
| --- | --- |
| Empty title `""` | HTTP 400 and required error body |
| Whitespace title `"   "` | HTTP 400 and required error body |
| Valid title `" Weekly plan "` | HTTP 201 with the existing response fields |
| Existing endpoints | Existing tests still pass |

If a case is missing, ask for a test for that case only.

**Result:** Focused test output for the reviewed proposal.

## Checkpoint 5: Human decision (20 minutes)

Choose:

- **approve** when the issue, diff, and tests agree;
- **request changes** when a correction within the issue remains;
- **pause** when test output or ownership is unresolved.

Compare your decision with `solution/issue-journey.md`. Don't merge unless your training repository requires it.

**Result:** The pull request or local review shows the outcome.

## Troubleshooting

| Issue | Response |
| --- | --- |
| Setup workflow isn't active on the default branch | Ask the trainer to prepare the repository. |
| Session edits extra files | Stop it or tell the agent to change only the allowed files. |
| Test passes but response shape changed | Request changes and cite the response-shape criterion. |
| Review suggests a second feature | Log it as future work. |

`solution/` has the completed issue journey, prepared diff, setup workflow, runnable solution project, and test output.
