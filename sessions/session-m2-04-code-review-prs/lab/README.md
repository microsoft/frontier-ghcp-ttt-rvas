# Session M2-04 lab: Code review workflows

**Duration:** 2 hours
**Deliverable:** A reviewed change record, corrected starter project, and conflict review

---

## Lab overview

Review a deliberately flawed change. Support each comment with a code reference
or test result, apply targeted fixes, and decide whether to accept the change.
Compare your own review with Copilot-assisted review. Use only synthetic data.

| Exercise | Topic | Time |
| --- | --- | --- |
| 1 | Human, code, and security review of one diff | 40 min |
| 2 | Validate and correct the starter project | 35 min |
| 3 | Resolve a conflict and check the result | 25 min |
| 4 | Review the results and make a final decision | 20 min |

---

## You need

- the standalone Copilot CLI with `/review` and `/security-review` (check `/help`);
- Copilot pull-request review;
- a private training repository you may push to (the trainer provides an empty one);
- Git, the authenticated GitHub CLI (`gh auth status`), Node.js, and npm.

---

## Setup

Starter assets:

- `lab/starter/review-project/`: Express API under review, with `src/api.js`, `src/utils.js`, and Jest/Supertest tests in `tests/api.test.js`
- `lab/starter/code-changes.md`: intentionally flawed changes to review
- `lab/starter/partner-review-checklist.md`: structured review worksheet
- `lab/starter/fix-evaluation-template.md`: finding, fix, and test record
- `lab/starter/conflict-scenario/`: manual merge-conflict scenario (`README.md`, `utils-with-conflict.js`)

Create a workspace outside the curriculum folder:

```bash
mkdir -p ~/copilot-labs/session-m2-04
cp -R lab/starter/review-project ~/copilot-labs/session-m2-04/review-project
cd ~/copilot-labs/session-m2-04/review-project
npm install
npm test
git init
printf 'node_modules/\n' > .gitignore
git add .gitignore package.json package-lock.json src tests
git commit -m "Record review baseline"
git branch -M main
git switch -c feature/add-user-management
```

> **Expected:** `npm install` adds no new dependencies and `npm test` reports that the existing API tests pass.
>
> **If install or tests fail:** Fix the environment. Don't change package versions to hide a failure.

Add the trainer's private repository as `origin` and push the baseline:

```bash
git remote add origin <private-training-repository-url>
git push -u origin main
```

The baseline must be the same commit locally and remotely, so the PR contains
only the intended change. If the remote already has commits, ask for an empty
repository. Never force-push or push the intentional defects to a public repository.

---

## Exercise 1: Review one diff through three passes (40 minutes)

### Steps

1. **Read the change brief.** Open `lab/starter/code-changes.md`. It lists changes to `src/api.js` and `src/utils.js`, each with an intended defect.

2. **Open `lab/starter/fix-evaluation-template.md`.** Use its single triage table
   for human, local-command, and PR findings throughout the lab. Each finding
   names a file or function, the affected acceptance criterion, and the code or
   test output that supports it.

3. **Read the baseline.** Open `src/api.js`, `src/utils.js`, and `tests/api.test.js`. Note the existing behavior so you can separate it from introduced defects.

4. **Apply the change brief on `feature/add-user-management`.** Keep the changes
   uncommitted until both local reviews finish. Compare
   `git diff -- src/api.js src/utils.js` with the brief. Add no unrelated features.

5. **Run the existing checks.**

   ```bash
   npm test
   ```

   Some tests may still pass because the defects aren't fully covered. Note the output and any missing coverage.

6. **Review the change yourself first.** Record your initial verdict in
   `lab/starter/partner-review-checklist.md`. Record the two findings that matter
   most in the triage table with `Human` as the source, before you open an
   assisted review. Cite the file or function and the code or test output.

7. **Run the general code review.** Start `copilot` in the working repository:

   ```text
   /review Review the current changes to src/api.js and src/utils.js for
   correctness and missing tests. Cite file and line references. Review only;
   do not edit files.
   ```

8. **Run the security review on the same diff:**

   ```text
   /security-review
   ```

   Both commands review staged and unstaged changes. Committing the patch first
   removes it from that scope.

9. **Triage both outputs** in `fix-evaluation-template.md`. Leave your human
   review unchanged. For each finding, record the source, file/line, claimed
   impact, and reproduction or code reference. Accept, reject, or leave it
   unresolved with a reason. If a review reports no findings, record that.

   The search route builds SQL text but connects to no database, so reject a claim
   that the lab proves database compromise. Synthetic key-shaped strings aren't a
   leaked real credential. Keep actual data exposure separate from unsafe patterns
   and maintainability suggestions.

10. **Open the training PR.** Commit only the intended files, push to the private
    remote, and open a PR:

    ```bash
    git add src/api.js src/utils.js
    git commit -m "Add synthetic user-management change for review"
    git push -u origin feature/add-user-management
    gh pr create --base main --title "Review synthetic user management" \
      --body "Training-only change. Contains intentional defects; do not merge."
    ```

    Request Copilot review from the PR page and record at least one comparison
    with the local results. Don't merge the flawed change.

### Checkpoint

- Which findings block approval, and which are suggestions only?
- Which defects did the existing tests miss?
- What did `/review` and `/security-review` each report?
- What changed after the assisted review?
- Which claim rests on actual behavior rather than an assumed backend?

---

## Exercise 2: Validate and correct the starter project (35 minutes)

Fix the defects with the smallest safe changes, then show the corrected project meets the review criteria.

### Steps

1. **Prioritize blocking findings.** Start with issues that leak sensitive data, allow injection, crash the server, or return incorrect behavior. List each defect, its file, and the check you will run.

2. **Fix input handling in `src/api.js`.** Replace unsafe string interpolation and fragile parsing with validated inputs and safe response shapes. The endpoint should handle empty, missing, malformed, and valid inputs predictably. Show the error responses in tests or manual requests.

3. **Fix sensitive response data.** Remove password-like or token-like fields from responses. The JSON should show only fields the API contract needs.

4. **Fix pagination in `src/utils.js`.** Page 1 starts with the first item, and boundary cases return predictable results. A focused test or Node.js check covers page 1, page 2, and empty collections.

5. **Add or update focused tests in `tests/api.test.js`** for the behavior the original suite missed. New tests fail before the fix and pass after it.

6. **Run checks again.**

   ```bash
   npm test
   ```

   All tests should pass. If one fails, record the failing assertion and correct only the related implementation or test expectation.

7. **Update the triage rows in `fix-evaluation-template.md`.** Add the fix and regression test to each accepted finding. Record residual risk in its Human decision section.

8. **Review the correction diff before committing.** Rerun `/review` and
   `/security-review` on it and compare with the initial findings. Rerun
   `npm test`, then commit and push only the reviewed fixes to the same PR. A clean
   automated review doesn't approve the PR.

### Checkpoint 2

- [ ] Every blocking finding maps to a focused fix.
- [ ] New tests cover the missed behavior.
- [ ] `npm test` passes.
- [ ] The fix evaluation names residual risk.

---

## Exercise 3: Resolve a conflict (25 minutes)

Resolve a merge conflict so both branches' intended behavior survives.

### Steps

1. **Read the scenario.** Open `lab/starter/conflict-scenario/README.md`. Two branches modify `src/utils.js`: one adds date formatting, the other changes price formatting.

2. **Open the conflicting source,** `lab/starter/conflict-scenario/utils-with-conflict.js`. Find the conflicting region and state what each side does.

3. **Write the merged behavior before editing:**

   ```text
   Preserve formatDate for date display and preserve formatPrice with an explicit
   currency parameter. Existing callers should continue to work or be updated
   intentionally.
   ```

4. **Resolve the conflict manually.** Remove the `<<<<<<<`, `=======`, and `>>>>>>>` markers, keep both valid behaviors, and avoid unrelated formatting changes.

5. **Add focused tests** for date formatting, default currency, supplied currency, and unchanged helpers.

6. **Run the project test command** and save the output.

7. **Peer review the resolution.** Ask a partner to review only the resolution and tests. They should be able to say why both branch goals appear in the result.

### Checkpoint 3

- [ ] No conflict markers remain.
- [ ] Both branch goals appear in the resolved behavior.
- [ ] Tests cover date and currency formatting.

---

## Exercise 4: Review the code and test results (20 minutes)

Use the code and test results to make your final decision. An automated suggestion alone isn't enough.

### Steps

1. **Select one blocking finding from Exercise 1** (security, correctness, or reliability). It needs a file reference, impact, and acceptance criterion.

2. **Check its triage row.** Add any missing before/after behavior, test names, or command output. A reviewer should reproduce the result from your notes.

3. **Classify remaining risk:**

   | Risk type | Question |
   | --- | --- |
   | Data | Did the change expose or process restricted data? |
   | Dependency | Did the change add or update packages? |
   | Permission | Did the workflow need a new permission? |
   | Security | Did validation, error handling, or secrets handling change? |
   | Quality | Do the tests and review results support the decision? |

4. **Complete Human decision in `fix-evaluation-template.md`.** Choose approve,
   request changes, or pause, and explain why. Someone reading it should understand
   the decision without seeing your lab conversation.

5. **Compare your initial review with both local outputs and the PR review.**
   Complete the remaining template fields. Keep the original critique, record which
   source raised each finding, and say why you accepted, revised, or rejected it.
   The table should show differences, false positives, new code references or test
   results, and any finding that changed the verdict.

### Checkpoint 4

- [ ] The decision is approve, request changes, or pause.
- [ ] The rationale cites findings, fixes, and check results.
- [ ] You accepted automated findings only after reviewing them.

## Final deliverable

One folder or document containing:

1. `partner-review-checklist.md` with the unchanged initial verdict.
2. `fix-evaluation-template.md` with the review runs, finding triage, fixes, test results, remaining risk, and final decision.
3. Initial and correction outputs from `/review` and `/security-review`, the private training PR reference, and test output for the corrected project.
4. The resolved conflict decision and its test results.

Don't merge the training PR.
