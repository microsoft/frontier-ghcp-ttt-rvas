# Session M3-02 lab: One issue from contract to review

## Objective

Take one synthetic issue from its fixed contract through setup and implementation with Copilot cloud agent. Then test and review the change. Manual work doesn't complete this lab.

You need cloud agent access to a training repository where you can merge to the default branch, and a reviewer. Don't put credentials in issues, instructions, setup workflows, or comments.

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

## Where the work happens

| Work | Where |
| --- | --- |
| Create the issue, assign it, watch the session, review the pull request | **GitHub**, in your training repository |
| Copy starter files, run `npm test` | Your clone of that repository |
| Read `solution/` | Reference only. Don't apply `proposed-change.diff`; it is what a good result looks like |

The files in `starter/` are your inputs: `issue.md`, `copilot-instructions.md`, `copilot-setup-steps.yml`, `pr-review-checklist.md`, and `sample-project/`.

## Time plan

| Checkpoint | Work | Time |
| --- | --- | --- |
| 1 | Check the issue contract | 10 min |
| 2 | Set up the repository | 20 min |
| 3 | Run the agent and inspect the pull request | 50 min |
| 4 | Run and review tests | 25 min |
| 5 | Make the human decision | 15 min |

## Checkpoint 1: Issue contract (10 minutes)

Read `starter/issue.md`. Have a peer answer:

- Which request is invalid?
- What exact response is required?
- Which valid behavior must remain?
- Which files may change?
- Which command proves completion?
- What is out of scope?

Fix any ambiguous text before implementation.

**Result:** The issue has acceptance criteria, allowed files, non-goals, and a stop condition.

## Checkpoint 2: Set up the repository (20 minutes)

You do this yourself, in your training repository.

1. Copy the contents of `starter/sample-project/` to the repository root. The setup workflow expects `package.json`, `package-lock.json`, `src/`, and `tests/` there.
2. Add `starter/copilot-instructions.md` as `.github/copilot-instructions.md`.
3. Add `starter/copilot-setup-steps.yml` as `.github/workflows/copilot-setup-steps.yml`. Check that it has one job named `copilot-setup-steps`.
4. Commit and **merge to the default branch**. The workflow doesn't run from any other branch.
5. In the **Actions** tab, run the setup workflow and check that it passes.
6. Run the baseline locally:

   ```bash
   npm install
   npm test
   ```

Stop if the baseline fails without explanation or setup needs a credential.

**Result:** Passing baseline, setup merged and run, and a named reviewer.

## Checkpoint 3: Run the agent and inspect the pull request (50 minutes)

On GitHub, create the issue from `starter/issue.md` and assign it to Copilot cloud agent.

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

If no pull request is ready after 35 minutes, stop the run and compare your issue with `solution/issue.md`.

**Result:** A pull request tied to the same issue.

## Checkpoint 4: Tests (25 minutes)

Check out the pull request branch, then run:

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

## Checkpoint 5: Human decision (15 minutes)

Choose:

- **approve** when the issue, diff, and tests agree;
- **request changes** when a correction within the issue remains;
- **pause** when test output is unclear.

Compare your decision with `solution/issue-journey.md`. Don't merge unless your training repository requires it.

**Result:** The pull request shows the outcome.

## Troubleshooting

| Issue | Response |
| --- | --- |
| Setup workflow isn't active on the default branch | Merge it to the default branch, then run it from the **Actions** tab. |
| Session edits extra files | Stop it or tell the agent to change only the allowed files. |
| Test passes but response shape changed | Request changes and cite the response-shape criterion. |
| Review suggests a second feature | Log it as future work. |

`solution/` is reference material: the completed issue journey, `proposed-change.diff`, the setup workflow, and a runnable solution project.
