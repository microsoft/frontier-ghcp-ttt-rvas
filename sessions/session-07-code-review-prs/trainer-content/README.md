# Session 07 — Code Review Workflows

## Trainer content guide

### Delivery baseline

Use Enterprise Cloud as the governance baseline. Verify current official GitHub documentation and the customer administrator policy before demonstrating any review automation. Treat availability, controls, data handling, and measurement as live customer decisions.

### Access and cost preflight

1. Confirm repository scope, data classification, reviewer roles, and required checks.
2. Verify current official documentation and customer policy for the intended review workflow.
3. Choose a non-sensitive pull request with explicit acceptance criteria.
4. For metered work, define a customer-owned meter, threshold, escalation contact, and stop guard.
5. Prepare the human-only review exercise.

### No-access fallback

Learners conduct a human-only review using the intentional defects and checklists. They record findings as pull-request comments, implement corrections manually, run checks, and compare with the solution reference.

## Session objective

Teach automation as review input, not review authority. Learners collect evidence and make a human decision on correctness, safety, scope, and maintainability.

## Suggested agenda

| Segment | Activity |
| --- | --- |
| Preflight | Confirm policy, data, roles, measurement, and fallback. |
| Review contract | Define acceptance criteria and required checks. |
| Findings | Separate observed evidence from assumptions. |
| Human decision | Accept, request changes, or reject with rationale. |
| Conflict exercise | Resolve intent and tests manually before editing. |
| Fallback | Complete the same review without a live surface. |

## Trainer talking points

> “A review tool can raise questions, but it cannot replace the accountable reviewer. The reviewer owns the decision and needs evidence.”

> “Demonstrate only a current, approved workflow. When customer policy or documentation is incomplete, use the human-only exercise.”

> “Metered review work requires a customer-defined stop guard. Stop at the boundary and keep the manual review path.”

## Review contract

```markdown
## Change intent
Describe the user-visible behavior and allowed scope.

## Acceptance criteria
- [ ] Expected and failure behavior are testable.
- [ ] Relevant tests and checks pass.
- [ ] Data, dependencies, and permissions are reviewed.
- [ ] A human reviewer accepts the change.
```

## Review rubric

- Does the implementation meet the stated intent?
- Are tests relevant and reproducible?
- Did the change introduce data, dependency, security, or permission questions?
- Is the diff within the approved scope?
- Can the reviewer explain the decision to accept or request revision?

## Conflict-resolution exercise

Have learners read both branch intentions, write the desired merged behavior, resolve the conflict manually, run tests, and review the result. An assisted demonstration is optional and may occur only when current documentation and customer policy permit it.

## Close

Ask learners to name the evidence they need before approving a change. A no-access manual review is still a complete, valid exercise.

---

## Minute-mapped delivery plan (60 minutes)

| Time | Segment | Evidence produced |
| --- | --- | --- |
| 0:00–0:08 | Review roles and accountability | Author, automation, checks, and reviewer roles are named. |
| 0:08–0:18 | PR summaries and review contracts | Learners separate generated prose from diff evidence. |
| 0:18–0:28 | Review requests and quality gates | A policy-aware first-pass workflow is defined. |
| 0:28–0:43 | Scripted intentional-defect demo | Finding, regression test, fix, and human decision are traced. |
| 0:43–0:51 | Suggested fixes and conflicts | Learners preserve intent before editing. |
| 0:51–0:58 | Limits, adoption, and Q&A | Learners design reversible human gates. |
| 0:58–1:00 | Close and lab handoff | Reviewer roles and fallback artifacts are assigned. |

### Time-pressure cutpoints

- At 0:08, reduce lifecycle discussion to issue, diff, checks, and human decision.
- At 0:18, draft only the Validation and Risk sections of the PR template.
- At 0:28, describe automatic review governance without navigating settings.
- At 0:38, use the prepared fix and focus on verification.
- At 0:43, omit optional assisted fix application.
- At 0:51, run the conflict decision statement without editing code.
- Never cut accountable review, test evidence, access fallback, or lab roles.

## Segment 1 — Review is an accountable decision (0:00–0:08)

### Trainer talking points

1. The author explains intent and supplies evidence.
2. Automated checks report configured results.
3. An assisted review can surface hypotheses.
4. A human reviewer evaluates intent, evidence, and risk.
5. Required approval and branch controls remain authoritative.
6. A generated summary, comment, or suggested fix is never proof by itself.
7. Availability, controls, data handling, and metering must be verified in current official documentation and organizational policy.

### Opening prompt

Ask: “Who can explain why this change should merge?”

Expected answer: the accountable author and reviewer, supported by reproducible evidence.

### Transition

> “Start with a review contract, not generated prose.”

## Segment 2 — Review contract and PR description (0:08–0:18)

### Trainer walkthrough

Display:

```markdown
## Problem
Suspended users must not view invoices.

## Change
Add an explicit suspended-status denial before role and ownership checks.

## Validation
- [ ] suspended administrator is denied
- [ ] suspended owner is denied
- [ ] active administrator is allowed
- [ ] active owner is allowed

## Risk and rollback
Authorization behavior changes only for suspended users; revert the bounded commit if needed.
```

### Talking points

- Compare every generated statement with the diff.
- Do not claim a test ran unless command output exists.
- Name breaking behavior, dependencies, permissions, and data implications.
- Remove sensitive details from prose as well as code.
- Keep the PR focused enough for a reviewer to reconstruct intent.
- Use fictional examples; never use customer or source organization names.

### Mini-exercise

Read: “Improves invoice security and all tests pass.”

Ask learners to identify unsupported claims.

Expected response: “improves” needs defined behavior; “all tests pass” needs named command output.

### Transition

> “Once the contract and evidence are ready, an assisted review can be requested as a first pass when approved.”

## Segment 3 — Review request and quality gates (0:18–0:28)

### Exact preflight actions

1. Revisit the Delivery baseline.
2. Confirm repository, data classification, author, reviewer, and required checks.
3. Verify current official documentation for the selected review workflow.
4. Confirm organization and repository policy.
5. Identify any applicable meter, threshold, escalation owner, and stop guard.
6. Prepare the human-only review worksheet.
7. Use a synthetic, bounded diff.
8. Select live or fallback mode before opening a review surface.

### Quality gates

| Gate | Required evidence |
| --- | --- |
| Ready for first pass | Clear intent, bounded diff, and focused checks available. |
| Ready for human review | Assisted comments, if any, are classified and checks reported. |
| Ready for approval | Acceptance criteria and risks are reviewed by an accountable human. |
| Ready for merge | Required approvals and repository protections are satisfied. |

### Safe wording

> “We demonstrate only the currently documented and approved controls. An assisted review is input to, not a replacement for, required reviewers.”

### Transition

> “Now we will trace one defect from requirement to finding, test, fix, and decision.”

## Scripted demo — Suspended invoice viewer (0:28–0:43)

### Purpose

Show a complete review lifecycle using synthetic code and a localized authorization defect.

This example teaches review discipline. It does not prescribe production authorization design.

### Setup

Use a disposable JavaScript file:

```js
export function canViewInvoice(user, invoice) {
  return user.role === "admin" || user.id === invoice.ownerId;
}
```

Requirement:

```text
Suspended users must never view invoices.
Active administrators and active invoice owners may view an invoice.
Other users may not view it.
```

Prepare four fictional cases:

- suspended administrator;
- suspended owner;
- active administrator;
- unrelated active user.

### Exact assisted-review prompt

When current access and policy permit:

```text
Review only canViewInvoice against the stated requirement.
Return one file-specific finding with observed behavior, impact, and a test idea.
Do not propose unrelated refactoring.
```

### Exact trainer actions

1. Read the requirement before the implementation.
2. Ask learners to predict each case.
3. Run a prepared test or trace the cases manually.
4. If approved, request the bounded assisted review.
5. Classify the response as valid, uncertain, noise, or out of scope.
6. Restate the valid finding:

   ```text
   Observed: suspended administrators and owners currently return true.
   Required: suspended users must always return false.
   Decision: request changes and add regression coverage.
   ```

7. Add or display a failing suspended-administrator test.
8. Apply the smallest proposed fix:

   ```js
   export function canViewInvoice(user, invoice) {
     if (user.status === "suspended") return false;
     return user.role === "admin" || user.id === invoice.ownerId;
   }
   ```

9. Run all four focused cases.
10. Inspect the complete diff.
11. Ask the human reviewer to choose approve, request changes, or pause.

### Expected outcome

- The pre-fix suspended cases demonstrate the defect.
- The post-fix suspended cases return `false`.
- Active administrator behavior remains `true`.
- An unrelated active user remains denied.
- The diff contains one guard plus focused test changes.
- The final decision cites requirement and test evidence.

### Verification prompts

- Does the guard run before role and ownership checks?
- Is the status value defined by the fictional contract?
- Did any unrelated behavior change?
- Which test failed before and passed after?
- Does the review comment distinguish observation from assumption?

### No-access/manual fallback

Give learners the requirement, original function, and truth-table rows.

They complete:

| User state | Role/ownership | Before | Required | Decision |
| --- | --- | --- | --- | --- |
| Suspended | Admin | true | false | Block |
| Suspended | Owner | true | false | Block |
| Active | Admin | true | true | Preserve |
| Active | Neither | false | false | Preserve |

Learners write a review comment, minimal patch, and test names on the worksheet.

A peer makes the final decision.

### Demo recovery

- If the assisted review misses the defect, treat that as evidence of limits and continue manually.
- If it invents broader policy, mark the comment uncertain or out of scope.
- If tests cannot run, execute the truth table line by line.
- If a suggested fix rewrites unrelated code, reject it and use the guard only.
- If review access is unavailable, move to the worksheet without attempting a bypass.
- If the meter reaches its guard, stop assisted activity and retain manual evidence.

### Transition

> “Applying a fix saved typing at most; the requirement, regression test, and human decision made it reviewable.”

## Segment 5 — Suggested fixes and conflict intent (0:43–0:51)

### Before applying any suggested fix

1. Restate the finding independently.
2. Reproduce the defect or locate the violated criterion.
3. Inspect the entire patch.
4. Add a test that fails before the fix when practical.
5. Run broader checks proportional to risk.
6. Retain author ownership and human review.

### Conflict micro-exercise

Present:

```text
Branch A adds formatDate.
Branch B adds an explicit currency parameter to formatPrice.
```

Before editing, learners write:

```text
Preserve date formatting and price formatting with explicit currency.
Keep existing callers working or update them intentionally.
```

Ask for four checks:

- no conflict markers;
- date example;
- default currency example;
- explicit currency example.

### Transition

> “Review assistance has bounded strengths, so adoption must preserve human gates and an off switch.”

## Segment 6 — Limits and adoption (0:51–0:58)

### Talking points

Assisted review may help surface localized correctness, missing tests, error handling, or convention mismatches.

It may miss unstated product intent, cross-system behavior, subtle authorization issues, operational risk, or misleading but plausible changes.

Start with a bounded repository set.

Measure actionable findings, noise, rework, delays, and escaped defects.

Assign an owner for triage and escalation.

Expand only when the organization’s quality and risk criteria are met.

Keep the manual path and a documented disable or pause decision.

## Common trainee Q&A

### “Can Copilot approve a PR?”

Do not treat an assisted response as accountable approval. Follow current repository rules, required reviewers, and organizational policy.

### “Should we apply every suggested fix?”

No. Reproduce the issue, inspect the complete patch, add evidence, and accept only the smallest correct change.

### “What if human and assisted reviews disagree?”

Return to requirements and reproducible evidence. The accountable human records the final rationale or escalates domain uncertainty.

### “Can automatic review replace branch protection?”

No course material should suggest bypassing required controls. Verify current supported configuration and preserve mandated human gates.

### “Why review a generated PR description?”

It can invent results, omit risk, or misread intent. Compare every claim with the diff and command evidence.

### “Is security review covered by this feature?”

An assisted general review is not a substitute for the organization’s required security practices, tooling, or specialists.

### “Which repositories should enable automatic review?”

That is an organizational risk decision. Start with approved, bounded candidates and define exclusions, owners, measures, and reversal criteria.

### “How is review activity priced or metered?”

Verify current official documentation and organization-specific terms. Do not teach static prices or allowances.

## Pitfalls, anti-patterns, and recoveries

| Anti-pattern | Recovery |
| --- | --- |
| Reviewing the summary before the diff | Read intent, diff, and checks first. |
| Treating comments as findings without evidence | Reproduce or tie each comment to a criterion. |
| Applying a patch from the highlighted lines only | Inspect the entire proposed patch. |
| Approving because checks are green | Review coverage, intent, risk, and scope. |
| Blindly choosing “ours” in a conflict | Write merged behavior before editing. |
| Mixing style noise with blockers | Classify severity and approval impact. |
| Claiming tests passed without output | Name and rerun the relevant command. |
| Using restricted PR data in an unapproved flow | Stop and use the synthetic local exercise. |
| Removing required human review | Restore repository gates and escalate. |
| Assuming fixed UI or availability | Verify current official docs and policy. |

## Closing and lab handoff (0:58–1:00)

### Closing script

> “Automation can broaden a first pass, but the reviewer owns the decision. A useful review connects intent, observed evidence, the smallest correction, validation, and a human rationale.”

### Lab handoff

Open `lab/README.md`.

Assign author and reviewer roles.

Learners use `code-changes.md`, `partner-review-checklist.md`, `fix-evaluation-template.md`, the local review project, and the conflict scenario.

The live path may request an approved assisted first pass.

The fallback performs the same review from local files and records comments in the worksheet.

### Readiness checklist

- [ ] Synthetic bounded change is selected.
- [ ] Required checks and reviewer are named.
- [ ] Live or human-only path is selected.
- [ ] Findings will include file/function evidence.
- [ ] The conflict intent statement is ready.
- [ ] Meter and stop guard are recorded when they apply.
- [ ] Final approval remains a human decision.
