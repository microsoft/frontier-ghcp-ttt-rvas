# Session 07 Lab — Code Review Workflows

**Duration:** 2 hours  
**Difficulty:** Intermediate  
**Prerequisites:** Sessions 01–06 completed  
**Deliverable:** A human-reviewed change record, corrected starter project, and conflict review

---

## Lab overview

Practice reviewing AI-assisted work with a bounded scope, evidence-based comments, targeted fixes, and a human decision. The starter project includes deliberate defects so you can compare human review, Copilot-assisted review, and the manual path without live access.

| Exercise | Topic | Time |
| --- | --- | --- |
| 1 | Review a bounded change | 30 min |
| 2 | Validate and correct the starter project | 35 min |
| 3 | Resolve a conflict with review evidence | 35 min |
| 4 | Evaluate review evidence and final decision | 20 min |

---

## Access and cost preflight

Use Enterprise Cloud as the governance baseline. Before delivery, verify current official GitHub documentation and customer administrator policy. Confirm repository scope, data classification, reviewer roles, and required checks. For metered work, define a customer-owned meter, threshold, escalation route, and stop guard.

Before you start, record these decisions in your notes:

1. **Repository scope:** Are you using only `lab/starter/review-project/`, a private training fork, or an approved internal sandbox?
2. **Data boundary:** Are all examples synthetic and allowed for review tooling?
3. **Review surface:** Is Copilot review, local agent mode, or a human-only review permitted?
4. **Required checks:** Which command proves the starter project still works?
5. **Stop guard:** What time, usage, or policy condition requires you to stop automated work?

> **Success criteria:** You can explain what is allowed, what is out of scope, who reviews the work, and which check or manual inspection validates the change.

---

## No-access fallback for the whole lab

If Copilot review, GitHub pull requests, or cloud access are unavailable, complete the workflow locally:

1. Copy `lab/starter/review-project/` to a writable sandbox.
2. Read `lab/starter/code-changes.md` and apply the intentionally flawed changes by hand.
3. Use `lab/starter/partner-review-checklist.md` as the review form.
4. Record each finding as if it were a pull-request comment: file, line or function, severity, evidence, and suggested fix.
5. Correct the project manually, run the available checks, and compare the outcome with `lab/solution/README.md` if a solution reference is available in your delivery environment.

> **Check:** You produce review comments, corrected code, test evidence, and a final human decision without automated review access.

---

## Setup

Use these starter assets:

- `lab/starter/review-project/package.json` — project scripts and dependencies
- `lab/starter/review-project/src/api.js` — Express API under review
- `lab/starter/review-project/src/utils.js` — utility functions under review
- `lab/starter/review-project/tests/api.test.js` — existing Jest/Supertest checks
- `lab/starter/code-changes.md` — intentionally flawed changes to review
- `lab/starter/partner-review-checklist.md` — structured review worksheet
- `lab/starter/fix-evaluation-template.md` — evidence template for corrected changes
- `lab/starter/conflict-scenario/README.md` — manual merge-conflict scenario
- `lab/starter/conflict-scenario/utils-with-conflict.js` — conflict exercise source file

Create a workspace outside the curriculum folder. This keeps the source materials unchanged:

```bash
mkdir -p ~/copilot-labs/session-07
cp -R lab/starter/review-project ~/copilot-labs/session-07/review-project
cd ~/copilot-labs/session-07/review-project
npm install
npm test
```

> **Expected:** `npm install` completes without new dependencies and `npm test` reports that the existing API tests pass.
>
> **If install fails:** Read `package.json` to identify the expected test command, note the error, and continue with static review. Do not change package versions unless the instructor explicitly approves that troubleshooting exercise.

---

## Exercise 1: Review a bounded change (30 minutes)

### Objective

Review a deliberately flawed change set. Focus on risks you can connect to evidence and acceptance criteria.

### Steps

1. **Open the change brief.** Read `lab/starter/code-changes.md` from start to finish.

   > **Check:** The brief lists changes to `src/api.js` and `src/utils.js`. Each has an intended defect.

2. **Create a review table in your notes.** Use these columns:

   | Change | Expected behavior | Risk | Evidence to inspect | Review decision |
   | --- | --- | --- | --- | --- |
   | User search | Safe filtering | Injection risk | query construction | Request changes |
   | User list | No sensitive fields | data exposure | response payload | Request changes |

   > **Success criteria:** Every row names a file or function to inspect before you comment.

3. **Inspect the current starter project before applying changes.** Open `src/api.js`, `src/utils.js`, and `tests/api.test.js`.

   > **Check:** The baseline has a small API, utility functions, and existing tests. Record its behavior so you can separate existing code from introduced defects.

4. **Apply the change brief in a local branch or sandbox.** If you are using a real Git repository, create a branch named `feature/add-user-management`. If you are using a copied folder without Git, keep a written change log instead.

   > **Success criteria:** The modified files match the change brief closely enough for review; you have not added unrelated features.

5. **Run the existing checks.**

   ```bash
   npm test
   ```

   > **Expected output:** Some existing tests may still pass because the defects are not fully covered. Record both pass/fail output and any missing coverage you notice.

6. **Complete the checklist.** Use `lab/starter/partner-review-checklist.md` to review correctness, security, performance, readability, testing, and final verdict.

   > **Success criteria:** At least four findings cite a file or function, severity, and a suggested fix. Include a security concern, a correctness concern, and a testing gap.

7. **Optional assisted review.** If policy allows Copilot review or an approved local agent, ask it to review only the bounded change.

   Suggested prompt:

   ```text
   Review only the changes described in code-changes.md. Focus on correctness,
   security, tests, and whether the implementation should be approved.
   Return file-specific findings with evidence. Do not propose unrelated rewrites.
   ```

   > **Expected output:** The assistant should produce specific findings. Compare each finding with your human review before accepting it.

### Exercise 1 no-access fallback

If pull requests or Copilot review are unavailable, review the local diff or copied files. Write comments in the review worksheet instead of a PR. The fallback is complete when another participant can read your worksheet and understand what must change before approval.

### Checkpoint

You are ready to continue when you can answer:

- Which findings block approval?
- Which findings are suggestions only?
- Which defects were not covered by the existing tests?
- What evidence would convince you that the fixes are complete?

---

## Exercise 2: Validate and correct the starter project (35 minutes)

### Objective

Fix the defects with the smallest safe changes. Then show that the corrected project meets the review criteria.

### Steps

1. **Prioritize blocking findings.** Start with issues that can leak sensitive data, allow injection, crash the server, or produce incorrect behavior.

   > **Success criteria:** Your fix plan lists each blocking defect, the target file, and the expected verification.

2. **Fix input handling in `src/api.js`.** Replace unsafe string interpolation and fragile parsing with validated inputs and safe response shapes appropriate for the starter project.

   > **Expected:** The endpoint handles empty, missing, malformed, and valid inputs predictably. Tests or manual requests show the error responses.

3. **Fix sensitive response data.** Ensure user-facing responses do not expose password-like or token-like fields.

   > **Success criteria:** Inspecting the JSON response shows only fields needed by the API contract.

4. **Fix pagination in `src/utils.js`.** Verify that page 1 begins with the first item and boundary cases return predictable results.

   > **Expected output:** A focused test or manual Node.js check demonstrates page 1, page 2, and empty collections.

5. **Add or update focused tests in `tests/api.test.js`.** Cover the behavior that was missing from the original test suite.

   > **Success criteria:** New tests fail before the fix and pass after the fix, or your notes explain why a manual verification is being used instead.

6. **Run checks again.**

   ```bash
   npm test
   ```

   > **Expected output:** All tests pass. If tests fail, record the failing assertion and correct only the related implementation or test expectation.

7. **Fill in `lab/starter/fix-evaluation-template.md`.** Use it to summarize the finding, fix, test evidence, reviewer decision, and residual risk.

   > **Success criteria:** A reviewer can trace every fix back to an original finding.

### Exercise 2 no-access fallback

If you cannot install dependencies or run tests, do a static validation pass:

1. Read the changed functions line by line.
2. Create manual input/output examples for each endpoint or helper.
3. Ask a peer to execute the same examples mentally or in another environment.
4. Mark each fix as verified only when the expected output is explicit.

> **Fallback success:** The change record states which checks were not run, why they were unavailable, and what evidence was used instead.

---

## Exercise 3: Resolve a conflict (35 minutes)

### Objective

Resolve a merge conflict by preserving intent and adding verification. Do not blindly accept one side.

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

5. **Add focused tests or examples.** Verify date formatting, default currency behavior, explicit currency behavior, and any unchanged helper behavior.

   > **Success criteria:** Tests or examples show that neither branch's intended behavior was lost.

6. **Run the relevant check.** Use the project test command when available, or run a direct Node.js invocation for the utility functions.

   > **Expected output:** The check passes and produces output you can paste into the review record.

7. **Peer review the resolution.** Ask a partner to review only the conflict resolution and tests.

   > **Success criteria:** The reviewer can explain why both original branch goals are represented in the merged result.

### Exercise 3 no-access fallback

If you cannot create branches or run Git commands, use the conflict file as a paper exercise. Copy the final resolved function bodies into your notes and list the tests you would run. The fallback is complete when a peer agrees that conflict intent was preserved.

---

## Exercise 4: Evaluate review evidence (20 minutes)

### Objective

Make the final review decision from evidence, not an automated suggestion.

### Steps

1. **Select one blocking finding from Exercise 1.** Choose a security, correctness, or reliability issue.

   > **Success criteria:** The finding includes a file reference, impact, and acceptance criterion.

2. **Record the fix evidence.** Include before/after behavior, test names, and command output.

   > **Expected output:** A reviewer can reproduce the result or understand the manual fallback evidence.

3. **Classify remaining risk.** Use these categories:

   | Risk type | Question |
   | --- | --- |
   | Data | Did the change expose or process restricted data? |
   | Dependency | Did the change add or update packages? |
   | Permission | Did the workflow require a new permission? |
   | Security | Did validation, error handling, or secrets handling change? |
   | Quality | Are tests and review evidence sufficient? |

4. **Write the final decision.** Choose approve, request changes, or pause. Include the human reviewer and rationale.

   > **Success criteria:** The decision is understandable without seeing the entire lab conversation.

5. **Compare automated and human findings if applicable.** Mark which findings were caught by Copilot, by the human reviewer, or by both.

   > **Expected output:** The comparison table in `partner-review-checklist.md` is complete enough to support a team discussion.

### Exercise 4 no-access fallback

If no automated review was used, compare your review with a peer's review. The fallback records the same evidence, decision, and rationale.

---

## Final submission

Submit one folder or document containing:

1. The completed `partner-review-checklist.md` or equivalent review notes.
2. A list of blocking findings and the smallest fix for each.
3. Test or manual verification evidence for the corrected project.
4. The resolved conflict decision and validation evidence.
5. A final human review decision: approve, request changes, or pause.
6. The no-access fallback record, even if you did not need to use it.

> **Done:** A reviewer can reconstruct the original risk, fix, validation, and final decision without undocumented tool behavior.

---

## Verification checklist

- [ ] Findings are tied to evidence and acceptance criteria.
- [ ] A human reviewer made the final decision.
- [ ] Required checks were run or a manual fallback was documented.
- [ ] Metered work had a customer-defined stop guard.
- [ ] The manual fallback is complete and reproducible.
- [ ] Starter files used: `code-changes.md`, `partner-review-checklist.md`, `fix-evaluation-template.md`, `review-project/`, and `conflict-scenario/`.
