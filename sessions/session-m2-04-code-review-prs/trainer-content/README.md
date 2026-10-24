# Session M2-04: Code review workflows

## Before teaching

Read the [course safety baseline](../../learning-safety-baseline.md). Before the
demo, check the current GitHub docs and your organization's rules. Review controls
and availability can change.

### Access and cost preflight

1. Choose the training repository, synthetic data, reviewer, and test command.
2. Check the current docs for the review tools.
3. Choose a small pull request with clear acceptance criteria.
4. Set a usage limit if the work is metered and name who can approve more.
5. Check CLI `/review` and `/security-review`, Copilot PR review, and a private
   training remote with the baseline `main` branch before the lab.
6. Ask learners to write their first verdict before assisted review.

### Access failure

Stop the learner lab if a required command or review surface is unavailable.
The intentional defects can recover a trainer demonstration, but they do not
replace the local commands and pull-request review.

## Session objective

Show learners how to use automated findings in a review. Have them check the diff,
tests, and comments before making their own decision.

## Minute-mapped delivery plan (60 minutes)

| Time | Segment | Result |
| --- | --- | --- |
| 0:00 to 0:08 | Review roles and accountability | Author, automation, checks, and reviewer roles are named. |
| 0:08 to 0:18 | PR summaries and review contracts | Learners compare generated prose with the diff. |
| 0:18 to 0:28 | Local commands and PR review | The group distinguishes diff review from PR review. |
| 0:28 to 0:43 | Intentional-defect and triage demo | Findings connect to behavior; unsupported exploit claims are rejected. |
| 0:43 to 0:51 | Suggested fixes and conflicts | Learners preserve intent before editing. |
| 0:51 to 0:58 | Limits, adoption, and Q&A | Learners decide where people must review and how to pause automation. |
| 0:58 to 1:00 | Close and lab handoff | Reviewer roles and access are checked. |

### Time-pressure cutpoints

- At 0:08, reduce lifecycle discussion to issue, diff, checks, and human decision.
- At 0:18, draft only the Validation and Risk sections of the PR template.
- At 0:28, describe automatic review governance without navigating settings.
- At 0:38, use the prepared fix and focus on checking it.
- At 0:43, omit optional assisted fix application.
- At 0:51, run the conflict decision statement without editing code.
- Never cut the learner's human review, either local command, test output, or
  access checks. The lab allocates 40/35/25/20 minutes to its four exercises.

## Segment 1: Review is an accountable decision (0:00 to 0:08)

### Trainer talking points

1. The author explains intent and supplies the diff and test output.
2. Automated checks report configured results.
3. An assisted review can suggest issues to investigate.
4. A human reviewer evaluates intent, results, and risk.
5. Branch rules and required approvals still apply.
6. A generated summary, comment, or suggested fix is never proof by itself.
7. Check current docs and organization rules before the demo.

### Opening prompt

Ask: "Who can explain why this change should merge?"

Expected answer: the author and reviewer, supported by the diff and test output.

### Transition

> "Start with a review contract, not generated prose."

## Segment 2: Review contract and PR description (0:08 to 0:18)

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
- Use fictional examples; never use real organization names.

### Mini-exercise

Read: "Improves invoice security and all tests pass."

Ask learners to identify unsupported claims.

Expected response: "improves" needs defined behavior; "all tests pass" needs named command output.

### Transition

> "Once the contract, diff, and test output are ready, request an assisted first
> pass if you have permission."

## Segment 3: Review request and quality gates (0:18 to 0:28)

### Exact preflight actions

1. Use the repository, reviewer, checks, and usage limit checked
   [before teaching](#before-teaching).
2. Open the small synthetic diff.
3. Prepare the human-only review worksheet before opening assisted review.

### Quality gates

| Gate | Required result |
| --- | --- |
| Ready for independent critique | Clear intent, a small diff, and focused checks. |
| Ready for assisted review | The learner has written an initial verdict and the findings that matter most. |
| Ready for human review | Local and PR findings are classified and checks reported. |
| Ready for approval | Acceptance criteria and risks are reviewed by an accountable human. |
| Ready for merge | Required approvals and repository protections are satisfied. |

### Safe wording

> "We demonstrate only the currently documented and approved controls. An assisted review is input to, not a replacement for, required reviewers."

Before the assisted prompt, have learners write their initial verdict in
`lab/starter/partner-review-checklist.md` and their two important findings in
`lab/starter/fix-evaluation-template.md`, with `Human` as the source. Afterward,
they can compare missed findings, false positives, and anything that changed the
final decision without copying findings into a second record.

### Demonstrate the two local commands

Use a fresh Git repository with a committed baseline. Apply the synthetic changes
from `code-changes.md` and leave them uncommitted.

```text
/review Review the current changes for correctness and missing tests. Cite files
and lines. Review only; do not edit.
```

Then run:

```text
/security-review
```

Both commands must see the same staged or unstaged patch. Committing it first
removes it from the security command's current-change scope. Record command output
even if there are no findings. Check `git diff` afterward; review should not have
changed the project.

Use the triage table in `fix-evaluation-template.md`. Require a source, claimed
impact, and reproduction or code reference for each accepted finding. The mock
search route does not execute SQL. The training strings are not live credentials.
Do not teach those as proven exploits. Show the observable password response
defect separately.

After the initial local review, commit and push only the training patch, request
Copilot PR review, and compare results. Repeat both local commands on the
uncommitted correction diff before committing fixes.

### Transition

> "Now we will trace one defect from requirement to finding, test, fix, and decision."

## Scripted demo: Suspended invoice viewer (0:28 to 0:43)

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
4. If approved, request the assisted review of this function only.
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
- The final decision cites the requirement and test results.

### Verification prompts

- Does the guard run before role and ownership checks?
- Is the status value defined by the fictional contract?
- Did any unrelated behavior change?
- Which test failed before and passed after?
- Does the review comment distinguish observation from assumption?

### Prepared demonstration

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

Use this only to recover the trainer demonstration. Learners still need the
required review surfaces for the lab.

### Demo recovery

- If the assisted review misses the defect, use the worksheet to finish the
  trainer explanation.
- If it invents broader policy, mark the comment uncertain or out of scope.
- If tests cannot run, stop the learner lab and fix the environment.
- If a suggested fix rewrites unrelated code, reject it and use the guard only.
- If review access fails during the demo, use the worksheet and fix access before
  the lab.
- If the run reaches its usage limit, stop assisted activity and record progress.

### Transition

> "The requirement explains the fix. The regression test checks it, and the reviewer decides whether to accept it."

## Segment 5: Suggested fixes and conflict intent (0:43 to 0:51)

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

Learners resolve the lab conflict manually, run tests, and review the result.
An assisted trainer demonstration is optional and requires permission to use
the chosen workflow.

### Transition

> "Review assistance has limits, so keep human review and an off switch."

## Segment 6: Limits and adoption (0:51 to 0:58)

### Talking points

Explain that assisted review may find local correctness issues, missing tests,
error-handling problems, or convention mismatches.

It may miss unstated product intent, cross-system behavior, subtle authorization issues, operational risk, or misleading but plausible changes.

Start with a small repository set.

Measure actionable findings, noise, rework, delays, and escaped defects.

Assign an owner for triage and escalation.

Expand only when the organization's quality and risk criteria are met.

Record the decision to disable or pause reviews.

## Common trainee Q&A

### "Can Copilot approve a PR?"

Do not treat an assisted response as accountable approval. Follow current repository rules, required reviewers, and organizational policy.

### "Should we apply every suggested fix?"

No. Reproduce the issue, inspect the complete patch, add a focused test, and
accept only the smallest correct change.

### "What if human and assisted reviews disagree?"

Return to the requirements, diff, and test output. The reviewer records the
decision or asks a domain owner.

### "Can automatic review replace branch protection?"

Do not bypass required controls. Check the current configuration and keep the
required human review.

### "Why review a generated PR description?"

It can invent results, omit risk, or misread intent. Compare every claim with the
diff and command output.

### "Is security review covered by this feature?"

`/review` checks general code issues. `/security-review` targets high-confidence
vulnerabilities in current changes. It is a focused, read-only check, not a full
repository audit or a replacement for code scanning, secret scanning, or
dependency checks. Check current preview and access requirements before teaching.

### "Which repositories should enable automatic review?"

That is an organization decision. Start with a few low-risk repositories and
define exclusions, owners, measures, and a way to disable the feature.

### "How is review activity priced or metered?"

Check current docs and organization terms. Do not teach static prices or
allowances.

## Pitfalls, anti-patterns, and recoveries

| Anti-pattern | Recovery |
| --- | --- |
| Reviewing the summary before the diff | Read intent, diff, and checks first. |
| Treating comments as findings without proof | Reproduce the issue or tie the comment to a criterion. |
| Applying a patch from the highlighted lines only | Inspect the entire proposed patch. |
| Approving because checks are green | Review coverage, intent, risk, and scope. |
| Blindly choosing "ours" in a conflict | Write merged behavior before editing. |
| Mixing style noise with blockers | Classify severity and approval impact. |
| Claiming tests passed without output | Name and rerun the relevant command. |
| Using restricted PR data in an unapproved flow | Stop and use the synthetic local exercise. |
| Removing required human review | Restore repository gates and escalate. |
| Assuming fixed UI or availability | Check current docs before delivery. |

## Closing and lab handoff (0:58 to 1:00)

### Closing script

> "Use automation for another first pass. Check its findings against the intended
> behavior, diff, and test output. The reviewer still decides whether to accept
> the correction."

### Lab handoff

Open `lab/README.md`.

Assign author and reviewer roles.

Learners use `code-changes.md`, `partner-review-checklist.md`, `fix-evaluation-template.md`, the local review project, and the conflict scenario.

The worksheet supports the prepared trainer demonstration. It does not replace
the learner pull-request workflow.

### Readiness checklist

- [ ] A small synthetic change is selected.
- [ ] Required checks and reviewer are named.
- [ ] Both local commands and Copilot PR review are available.
- [ ] The private remote has the baseline branch before learners open a PR.
- [ ] No learner commits the initial patch before the local command reviews.
- [ ] Findings will name the file and function.
- [ ] The conflict intent statement is ready.
- [ ] A usage limit is recorded when it applies.
- [ ] Final approval remains a human decision.

## Product references

Checked on October 15, 2026:

- [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [App review command reference](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [About Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)
