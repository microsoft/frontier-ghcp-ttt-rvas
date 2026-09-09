# Session 09 Lab — Cloud-Agent Workflows

**Duration:** 2 hours  
**Difficulty:** Intermediate  
**Prerequisites:** Sessions 01–07 completed  
**Deliverable:** A bounded issue, review record, and policy-aware comparison or manual baseline.

---

## Lab overview

Prepare a task for a cloud coding agent, review the resulting change, and compare the live workflow with a manual baseline. You will use issue templates, repository instructions, setup steps, a sample project, and a review checklist.

| Exercise | Topic | Time |
| --- | --- | --- |
| 1 | Prepare a bounded issue | 30 min |
| 2 | Review repository guidance and setup | 25 min |
| 3 | Review a proposed cloud-agent change | 40 min |
| 4 | Compare approved agents or manual baseline | 25 min |

---

## Access and cost preflight

Use Enterprise Cloud as the governance baseline. Check current official GitHub documentation and customer administrator policy before delivery. Confirm the repository scope, participant role, data classification, permitted workflow, and human reviewer. For metered work, set a customer-defined meter, threshold, escalation route, and stop guard.

Before you begin, write down:

1. The sandbox repository or local folder you will use.
2. Whether assigning issues to a cloud coding agent is approved.
3. Which files may be edited by the agent.
4. Which tests must pass before a human review.
5. What condition stops automated work.

> **Success criteria:** You can describe the approved and no-access paths before assigning an issue.

---

## No-access fallback for the whole lab

If cloud-agent access is unavailable, complete the lab manually:

1. Use `lab/starter/issue-templates/good-issue.md` as the target issue.
2. Copy `lab/starter/sample-project/` into a writable sandbox.
3. Apply the smallest implementation manually.
4. Run or inspect the checks requested in the issue.
5. Review the change with `lab/starter/pr-review-checklist.md`.
6. Fill in `lab/starter/agent-comparison-template.md` by comparing the manual baseline with the expected agent workflow.

> **Check:** You have a bounded issue, a code change or implementation plan, test evidence, and a human review decision.

---

## Setup

Use these starter assets:

- `lab/starter/issue-templates/issue-writing-guide.md` — how to write agent-ready work
- `lab/starter/issue-templates/good-issue.md` — example of a strong issue
- `lab/starter/issue-templates/bad-issue.md` — example of a weak issue
- `lab/starter/copilot-instructions.md` — repository guidance template
- `lab/starter/copilot-setup-steps.yml` — setup-step example for repeatable environments
- `lab/starter/sample-project/package.json` — project scripts and dependencies
- `lab/starter/sample-project/src/app.js` — application under change
- `lab/starter/sample-project/tests/app.test.js` — test suite for validation
- `lab/starter/pr-review-checklist.md` — review worksheet for agent output
- `lab/starter/agent-comparison-template.md` — comparison worksheet

Set up the sample project locally:

```bash
mkdir -p ~/copilot-labs/session-09
cp -R lab/starter/sample-project ~/copilot-labs/session-09/sample-project
cd ~/copilot-labs/session-09/sample-project
npm install
npm test
```

> **Expected output:** Dependencies install and the starter tests pass. If the install is blocked, continue with static review and record the blocked command in your fallback notes.

---

## Exercise 1: Prepare a bounded issue (30 minutes)

### Objective

Write an issue that gives a cloud coding agent enough context for a small task and gives a human reviewer testable criteria.

### Steps

1. **Read the guide.** Open `lab/starter/issue-templates/issue-writing-guide.md`.

   > **Check:** Strong issues include a specific title, clear description, testable acceptance criteria, file references, and constraints.

2. **Compare example issues.** Read `lab/starter/issue-templates/good-issue.md` and `lab/starter/issue-templates/bad-issue.md`.

   > **Expected:** You can explain why the good issue is actionable and the bad issue is ambiguous.

3. **Choose one bounded task.** Use a task that changes one small behavior in `lab/starter/sample-project/src/app.js` and its test file.

   Example scope:

   ```text
   Add validation so POST /api/tasks returns 400 when title is empty.
   Do not change unrelated endpoints or add dependencies.
   ```

   > **Success criteria:** The task fits in one short pull request and is easy to review.

4. **Write the issue body.** Include these sections:

   - Problem statement
   - Current behavior
   - Desired behavior
   - Acceptance criteria as checkboxes
   - Files in scope
   - Files out of scope
   - Required checks
   - Human review requirement
   - No-access fallback

   > **Expected:** A peer can read the issue and know what to build.

5. **Add explicit constraints.** State that synthetic data only is permitted, unapproved dependencies are not allowed, and any broader refactor must be deferred.

   > **Success criteria:** The issue limits scope and does not rely on implicit project knowledge.

6. **Peer-review the issue before assignment.** Ask a partner to find missing acceptance criteria or ambiguous language.

   > **Expected output:** The issue is either approved for use or updated with clearer constraints.

### Exercise 1 no-access fallback

If you cannot create a GitHub issue, write the issue in a local Markdown file or shared notes. The fallback is complete when the issue includes the same scope, acceptance criteria, constraints, and review requirement.

---

## Exercise 2: Review repository guidance and setup (25 minutes)

### Objective

Prepare the repository context for the agent and confirm the setup path is repeatable.

### Steps

1. **Read the instruction template.** Open `lab/starter/copilot-instructions.md`.

   > **Check:** The template defines the project, stack, conventions, tests, file structure, and constraints.

2. **Customize the instructions for the sample project.** In your sandbox, place the content at `.github/copilot-instructions.md` if policy permits repository instructions.

   > **Success criteria:** Instructions mention Node.js 20, Express, Jest/Supertest, `src/app.js`, `tests/app.test.js`, no new dependencies unless approved, and `npm test` as the completion check.

3. **Review setup steps.** Open `lab/starter/copilot-setup-steps.yml`.

   > **Expected:** You can explain how the setup installs dependencies and prepares tests for the agent environment.

4. **Decide whether setup steps are needed.** If the sample project needs only `npm install`, record it. If your sandbox requires additional approved commands, document them without adding secrets.

   > **Success criteria:** The setup record lists only commands. It contains no credentials or environment-specific secrets.

5. **Run the local baseline.**

   ```bash
   npm test
   ```

   > **Expected:** Tests pass before work starts. If they fail, understand the baseline failure before assigning the issue.

6. **Write the implementation plan.** List the files the agent may edit and the tests it must change.

   > **Success criteria:** The plan matches the issue and the repository instructions. Anything outside the bounded task is marked out of scope.

### Exercise 2 no-access fallback

If repository instructions or setup-step files cannot be used in a live repository, keep them as reviewed local artifacts. The fallback is complete when a human implementer can follow the same instructions and reproduce the baseline test result.

---

## Exercise 3: Review a proposed change (40 minutes)

### Objective

Assess a cloud-agent pull request or manual implementation against the issue, repository guidance, and checklist.

### Steps

1. **Start only from an approved workflow.** If policy allows, assign the issue to the approved agent or use the approved cloud-agent entry point. If not, use your manual implementation from the fallback path.

   > **Success criteria:** The work item is bounded, and a human reviewer is named before any generated change is accepted.

2. **Wait for a proposed change or create the manual baseline.** Do not expand the issue while you wait. If the agent asks for clarification, answer only within the approved scope.

   > **Expected:** You have a pull request, patch, or local diff that claims to satisfy the issue.

3. **Inspect changed files.** Compare the diff with the files named in the issue.

   > **Success criteria:** All changes are necessary for the task. Any unrelated edits are called out as review findings.

4. **Run required checks.** Use the same command from the issue:

   ```bash
   npm test
   ```

   > **Expected output:** The test output is captured in the review record. Passing tests do not replace human inspection.

5. **Complete `lab/starter/pr-review-checklist.md`.** Review correctness, code quality, security, dependencies, documentation, and agent-specific checks.

   > **Success criteria:** The checklist includes the final decision and at least one concrete evidence item for every relevant category.

6. **Request changes when evidence is missing.** If tests were not added, acceptance criteria are unmet, or unrelated files changed, write specific comments.

   > **Expected output:** Comments include file/function, problem, expected behavior, and how to verify the fix.

7. **Re-review after changes.** Confirm that new commits address the comments and do not add scope.

   > **Success criteria:** The final diff satisfies the issue and the reviewer can approve or explicitly pause.

### Exercise 3 no-access fallback

If no PR exists, review the local diff with the same checklist. If no code change is possible, review a proposed implementation plan and mark which acceptance criteria still need execution evidence.

---

## Exercise 4: Compare approved agents or use the manual baseline (25 minutes)

### Objective

Compare outcomes consistently. Do not assume any specific third-party or cloud agent is enabled.

### Steps

1. **Open the comparison template.** Use `lab/starter/agent-comparison-template.md`.

   > **Check:** The template compares scope control, correctness, tests, review findings, time, and policy fit.

2. **Define comparison inputs.** Use the same issue, starter project, required checks, and review rubric for every path.

   > **Success criteria:** The comparison is fair because each path works from the same acceptance criteria.

3. **Record the live path if approved.** For each approved agent or tool, note the output type, changed files, tests run, review findings, and any required iteration.

   > **Expected output:** You can describe what the agent did and what the human reviewer accepted or rejected.

4. **Record the manual baseline.** If no agent path is approved, compare the manual implementation against the same rubric.

   > **Success criteria:** The lab still demonstrates how to evaluate an implementation even without live automation.

5. **Make a decision.** Answer:

   - Was the issue sufficiently bounded?
   - Did the implementation match the acceptance criteria?
   - Did the checks prove the intended behavior?
   - Did policy or access constraints change the workflow?
   - What would you improve before using this process with a real team?

   > **Expected:** A concise recommendation to continue, revise the issue-writing standard, or pause for policy clarification.

### Exercise 4 no-access fallback

The manual baseline is the fallback. If no approved agent is available, complete the comparison by contrasting the expected automated path with the manual implementation and review evidence.

---

## Final deliverable

Submit a compact review packet containing:

1. The bounded issue you wrote.
2. The repository instructions or setup notes you reviewed.
3. The proposed change or manual baseline.
4. `npm test` output or a documented static-review fallback.
5. The completed `pr-review-checklist.md`.
6. The completed `agent-comparison-template.md`.
7. A final decision: approve, request changes, or pause.

> **Done means:** The reviewer can identify the request, change, checks, approval, and fallback used when cloud-agent access was unavailable.

---

## Verification checklist

- [ ] The issue has explicit acceptance criteria and constraints.
- [ ] Current documentation and customer policy were checked.
- [ ] A human reviewer assessed the change.
- [ ] Required checks passed or a no-access/static fallback is documented.
- [ ] Metered work used a customer-defined stop guard.
- [ ] Starter files used: issue templates, `copilot-instructions.md`, `copilot-setup-steps.yml`, `sample-project/`, `pr-review-checklist.md`, and `agent-comparison-template.md`.
