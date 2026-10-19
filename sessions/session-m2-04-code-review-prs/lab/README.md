# Session m2-04 lab: Code review workflows

**Duration:** 2 hours  
**Difficulty:** Intermediate  
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-03 completed
**Deliverable:** A human-reviewed change record, corrected starter project, and conflict review

---

## Lab overview

You will review AI-assisted work within the named files. Support your comments
with code references and test results, then apply targeted fixes and decide
whether to accept the change. The starter contains deliberate defects so you can
compare your own review with Copilot-assisted review.

| Exercise | Topic | Time |
| --- | --- | --- |
| 1 | Human, code, and security review of one diff | 40 min |
| 2 | Validate and correct the starter project | 35 min |
| 3 | Resolve a conflict and check the result | 25 min |
| 4 | Review the results and make a final decision | 20 min |

---

## Access and cost preflight

Read the [course safety baseline](../../learning-safety-baseline.md). Before the
lab, check the repository, synthetic data, reviewer, test command, and any usage
limit.

Before you start, record these decisions in your notes:

1. **Repository scope:** Are you using only `lab/starter/review-project/`, a private training fork, or an approved internal sandbox?
2. **Data boundary:** Are all examples synthetic and allowed for review tooling?
3. **Review surface:** Is Copilot review available?
4. **Required checks:** Which command proves the starter project still works?
5. **Stop condition:** What requires you to stop automated work?

> **Success criteria:** You can explain what is allowed, what is out of scope, who
> reviews the work, and which check validates the change.

You need the standalone Copilot CLI with `/review` and `/security-review`,
Copilot pull-request review, a private training repository they may push to, Git,
the authenticated GitHub CLI (`gh`), Node.js, and npm. Check both Copilot commands
in `/help` and repository access with `gh auth status` before starting.

**If a required command or review access is unavailable, stop the lab.** A generic
chat review or worksheet does not replace the local commands and pull-request
practice. `/security-review` examines current changes; it does not replace
repository security scanning.

---

## Setup

Use these starter assets:

- `lab/starter/review-project/package.json`: project scripts and dependencies
- `lab/starter/review-project/src/api.js`: Express API under review
- `lab/starter/review-project/src/utils.js`: utility functions under review
- `lab/starter/review-project/tests/api.test.js`: existing Jest/Supertest checks
- `lab/starter/code-changes.md`: intentionally flawed changes to review
- `lab/starter/partner-review-checklist.md`: structured review worksheet
- `lab/starter/fix-evaluation-template.md`: finding, fix, and test record
- `lab/starter/conflict-scenario/README.md`: manual merge-conflict scenario
- `lab/starter/conflict-scenario/utils-with-conflict.js`: conflict exercise source file

Create a workspace outside the curriculum folder. This keeps the source materials unchanged:

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

> **Expected:** `npm install` completes without new dependencies and `npm test` reports that the existing API tests pass.
>
> **If install or tests fail:** Stop and fix the environment. Static review alone
> does not complete the lab. Do not change package versions to hide a failure.

Use a fresh folder for this local repository. Ask the trainer for an **empty
private training repository**. Before applying the change brief, add its URL as
`origin` and push the baseline:

```bash
git remote add origin <private-training-repository-url>
git push -u origin main
```

The baseline must be the same commit locally and remotely so the PR contains
only the intended change. If the remote already has commits, stop and ask for an
empty training repository. Do not force-push or push intentional defects to a
public repository.

---

## Exercise 1: Review one diff through three passes (40 minutes)

### Objective

Review a deliberately flawed change set. Support each risk with a code reference
or test result and name the acceptance criterion it affects.

### Steps

1. **Open the change brief.** Read `lab/starter/code-changes.md` from start to finish.

   > **Check:** The brief lists changes to `src/api.js` and `src/utils.js`. Each has an intended defect.

2. **Create a review table in your notes.** Use these columns:

   | Change | Expected behavior | Risk | Code or output to inspect | Review decision |
   | --- | --- | --- | --- | --- |
   | User search | Safe filtering | Injection risk | query construction | Request changes |
   | User list | No sensitive fields | data exposure | response payload | Request changes |

   > **Success criteria:** Every row names a file or function to inspect before you comment.

3. **Inspect the current starter project before applying changes.** Open `src/api.js`, `src/utils.js`, and `tests/api.test.js`.

   > **Check:** The baseline has a small API, utility functions, and existing tests. Record its behavior so you can separate existing code from introduced defects.

4. **Apply the change brief on `feature/add-user-management`.** Keep these changes
   uncommitted until both local reviews have finished. Check
   `git diff -- src/api.js src/utils.js` against the brief.

   > **Success criteria:** The modified files match the change brief closely enough for review; you have not added unrelated features.

5. **Run the existing checks.**

   ```bash
   npm test
   ```

   > **Expected output:** Some existing tests may still pass because the defects are not fully covered. Record both pass/fail output and any missing coverage you notice.

6. **Review the change yourself first.** Use
   `lab/starter/partner-review-checklist.md` to record your initial verdict and
   the two findings that matter most before opening an assisted review.

   > **Success criteria:** Your initial review cites the relevant file or
   > function and explains how the code or test output supports your verdict.

7. **Run the general code review.** Start `copilot` in the working repository:

   ```text
   /review Review the current changes to src/api.js and src/utils.js for
   correctness and missing tests. Cite file and line references. Review only;
   do not edit files.
   ```

8. **Run the focused security review on the same diff:**

   ```text
   /security-review
   ```

   Keep `src/api.js` and `src/utils.js` as the only modified project files during
   these runs. The command reviews staged and unstaged changes; committing the
   patch first would remove it from that scope.

9. **Triage both outputs** in `fix-evaluation-template.md`. Keep your original
   human review unchanged. For each finding, name the source, file/line, claimed
   impact, and reproduction or code reference. Accept, reject, or leave unresolved
   with a reason. Record a zero-findings result honestly.

   The search route builds SQL text but connects to no database. Reject a claim
   that this lab proves database compromise. Synthetic key-shaped strings also
   do not prove a leaked real credential. Keep actual data exposure separate from
   unsafe patterns and maintainability suggestions.

10. **Open the training PR after the local reviews.** Commit only the intended
    files, push to the trainer-provided private remote, and open a PR:

    ```bash
    git add src/api.js src/utils.js
    git commit -m "Add synthetic user-management change for review"
    git push -u origin feature/add-user-management
    gh pr create --base main --title "Review synthetic user management" \
      --body "Training-only change. Contains intentional defects; do not merge."
    ```

    The remote must already contain the baseline `main` branch. Request Copilot
    review from the PR page and record at least one comparison with the local
    results. Do not merge the intentionally flawed change.

### Checkpoint

You are ready to continue when you can answer:

- Which findings block approval?
- Which findings are suggestions only?
- Which defects were not covered by the existing tests?
- Which code checks or test results would show that the fixes are complete?
- What changed after the assisted review, if anything?
- What did `/review` and `/security-review` each report?
- Which claim was supported by actual behavior rather than an assumed backend?

---

## Exercise 2: Validate and correct the starter project (35 minutes)

### Objective

Fix the defects with the smallest safe changes. Then show that the corrected project meets the review criteria.

### Steps

1. **Prioritize blocking findings.** Start with issues that can leak sensitive data, allow injection, crash the server, or produce incorrect behavior.

   > **Success criteria:** Your fix plan lists each blocking defect, the target file, and the check you will run.

2. **Fix input handling in `src/api.js`.** Replace unsafe string interpolation and fragile parsing with validated inputs and safe response shapes that fit the starter project.

   > **Expected:** The endpoint handles empty, missing, malformed, and valid inputs predictably. Tests or manual requests show the error responses.

3. **Fix sensitive response data.** Remove password-like or token-like fields from user-facing responses.

   > **Success criteria:** Inspecting the JSON response shows only fields needed by the API contract.

4. **Fix pagination in `src/utils.js`.** Check that page 1 begins with the first item and boundary cases return predictable results.

   > **Expected output:** A focused test or manual Node.js check demonstrates page 1, page 2, and empty collections.

5. **Add or update focused tests in `tests/api.test.js`.** Cover the behavior that was missing from the original test suite.

   > **Success criteria:** New tests fail before the fix and pass after the fix.

6. **Run checks again.**

   ```bash
   npm test
   ```

   > **Expected output:** All tests pass. If tests fail, record the failing assertion and correct only the related implementation or test expectation.

7. **Fill in `lab/starter/fix-evaluation-template.md`.** Record the finding, fix, test result, reviewer decision, and residual risk.

   > **Success criteria:** A reviewer can trace every fix back to an original finding.

8. **Before committing the fixes**, rerun `/review` and `/security-review` on the
   correction diff. Compare the results with the initial findings. Rerun
   `npm test`, then commit and push only the reviewed fixes to the same training
   PR. A clean automated review does not approve the PR.

### Checkpoint 2: fixes trace to findings

- [ ] Every blocking finding maps to a focused fix.
- [ ] New tests cover the missed behavior.
- [ ] `npm test` passes.
- [ ] The fix evaluation names residual risk.

---

## Exercise 3: Resolve a conflict (25 minutes)

### Objective

Resolve a merge conflict so both branches' intended behavior survives. Check the
result rather than accepting one side without review.

### Steps

1. **Read the scenario.** Open `lab/starter/conflict-scenario/README.md`.

   > **You should observe:** Two branches modify `src/utils.js`; one adds date formatting and the other changes price formatting.

2. **Open the conflicting source.** Review `lab/starter/conflict-scenario/utils-with-conflict.js`.

   > **Expected output:** You can identify the conflicting region and state what each side is trying to accomplish.

3. **Write the desired merged behavior before editing.** Use a short decision statement:

   ```text
   Preserve formatDate for date display and preserve formatPrice with an explicit
   currency parameter. Existing callers should continue to work or be updated
   intentionally.
   ```

   > **Success criteria:** Your statement names both branch intentions and the behavior that tests must prove.

4. **Resolve the conflict manually.** Remove conflict markers, keep both valid behaviors, and avoid unrelated formatting changes.

   > **Expected output:** The file contains no `<<<<<<<`, `=======`, or `>>>>>>>` markers.

5. **Add focused tests.** Check date formatting, default currency behavior, the supplied currency behavior, and any unchanged helper behavior.

   > **Success criteria:** Tests show that neither branch's intended behavior was lost.

6. **Run the project test command.**

   > **Expected output:** The check passes and produces output you can use in the review.

7. **Peer review the resolution.** Ask a partner to review only the conflict resolution and tests.

   > **Success criteria:** The reviewer can explain why both original branch goals are represented in the merged result.

### Checkpoint 3: conflict intent is preserved

- [ ] No conflict markers remain.
- [ ] Both branch goals appear in the resolved behavior.
- [ ] Tests cover date and currency formatting.
- [ ] A peer can explain the merge decision from the record.

---

## Exercise 4: Evaluate review evidence (20 minutes)

### Objective

Use the code and test results to make your final review decision. An automated
suggestion alone is not enough.

### Steps

1. **Select one blocking finding from Exercise 1.** Choose a security, correctness, or reliability issue.

   > **Success criteria:** The finding includes a file reference, impact, and acceptance criterion.

2. **Record how you checked the fix.** Include before/after behavior, test names, and command output.

   > **Expected output:** A reviewer can reproduce the result from your notes and command output.

3. **Classify remaining risk.** Use these categories:

   | Risk type | Question |
   | --- | --- |
   | Data | Did the change expose or process restricted data? |
   | Dependency | Did the change add or update packages? |
   | Permission | Did the workflow require a new permission? |
   | Security | Did validation, error handling, or secrets handling change? |
   | Quality | Do the tests and review results support the decision? |

4. **Write the final decision.** Choose approve, request changes, or pause. Name the human reviewer and explain the decision.

   > **Success criteria:** The decision is understandable without seeing the entire lab conversation.

5. **Compare the initial human review with both local command outputs and the
   PR review.** Complete all comparison fields. Preserve the original critique,
   record which source raised each finding, and state why the final human
   assessment accepted, revised, or rejected it.

   > **Expected output:** The comparison table identifies differences, false
   positives, new code references or test results, and any finding that changed the final verdict.

### Checkpoint 4: final decision is evidence-based

- [ ] The decision is approve, request changes, or pause.
- [ ] The rationale cites findings, fixes, and check results.
- [ ] Automated findings were accepted only after human review.
- [ ] Remaining risk and the reviewer are named.

## Final deliverable

Submit one folder or document containing:

1. The completed `partner-review-checklist.md` or equivalent review notes.
2. A list of blocking findings and the smallest fix for each.
3. Test output for the corrected project.
4. The resolved conflict decision and its test results.
5. A final human review decision: approve, request changes, or pause.
6. Initial and correction outputs from `/review` and `/security-review`, their
   triage decisions, and the private training PR reference.

> **Done:** A reviewer can reconstruct the original risk, fix, validation, and final decision without undocumented tool behavior.

---

## Verification checklist

- [ ] Findings cite code or test results and acceptance criteria.
- [ ] A human reviewer made the final decision.
- [ ] Both local commands ran before the initial change was committed.
- [ ] Findings name their review source and a file/line or reproduction.
- [ ] Unsupported exploit claims and zero-findings results are recorded honestly.
- [ ] Both commands ran again on the correction diff before it was committed.
- [ ] The private training PR received Copilot review; it was not merged.
- [ ] Required checks were run.
- [ ] Metered work stayed within the usage limit.
- [ ] Starter files used: `code-changes.md`, `partner-review-checklist.md`, `fix-evaluation-template.md`, `review-project/`, and `conflict-scenario/`.
