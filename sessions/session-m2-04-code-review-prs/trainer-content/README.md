# Session M2-04: Code review workflows

## Before teaching

Prepare a small synthetic pull request, a reviewer, and a test command. Check that
CLI `/review`, `/security-review`, and Copilot PR review work for you. Learners
create their own empty private repository for the PR step. If they can't, they
skip that step.

## Session objective

Show learners how to use automated findings in a review. Learners check the diff,
tests, and comments before they decide.

## Minute-mapped delivery plan (60 minutes)

| Time | Segment | Result |
| --- | --- | --- |
| 0:00 to 0:08 | Review roles | Author, automation, checks, and reviewer roles are named. |
| 0:08 to 0:18 | PR summaries and review contracts | Learners compare generated prose with the diff. |
| 0:18 to 0:28 | Local commands and PR review | The group tells diff review from PR review. |
| 0:28 to 0:43 | Intentional-defect and triage demo | Findings connect to behavior. Unsupported exploit claims are rejected. |
| 0:43 to 0:51 | Suggested fixes and conflicts | Learners preserve intent before editing. |
| 0:51 to 0:58 | Limits, adoption, and Q&A | Learners decide where people must review. |
| 0:58 to 1:00 | Close and lab handoff | Reviewer roles are assigned. |

The lab allocates 40/35/25/20 minutes to its four exercises.

## Segment 1: Review is an accountable decision (0:00 to 0:08)

### Talking points

1. The author explains intent and supplies the diff and test output.
2. Automated checks report results.
3. Assisted review suggests issues to investigate.
4. A human reviewer weighs intent, results, and risk.
5. Branch rules and required approvals still apply.
6. A generated summary, comment, or fix is never proof by itself.

Ask: "Who can explain why this change should merge?" The answer is the author and
reviewer, backed by the diff and test output.

## Segment 2: Review contract and PR description (0:08 to 0:18)

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
- Don't claim a test ran unless command output exists.
- Name breaking behavior, dependencies, permissions, and data implications.
- Keep the PR small enough to reconstruct intent.

### Mini-exercise

Read: "Improves invoice security and all tests pass."

Ask learners to find the unsupported claims. "Improves" needs defined behavior.
"All tests pass" needs named command output.

## Segment 3: Review request and quality gates (0:18 to 0:28)

Open the small synthetic diff. Prepare the human-only review worksheet before opening assisted review.

| Gate | Result |
| --- | --- |
| Ready for independent critique | Clear intent, a small diff, and focused checks. |
| Ready for assisted review | The learner has written an initial verdict and the findings that matter most. |
| Ready for human review | Local and PR findings are classified and checks reported. |
| Ready for approval | A human reviewer has checked acceptance criteria and risks. |
| Ready for merge | Required approvals and repository protections are satisfied. |

Before the assisted prompt, have learners write their initial verdict and their
two important findings in `lab/starter/fix-evaluation-template.md`, with `Human`
as the source. Afterward,
they compare missed findings, false positives, and anything that changed the
final decision.

### What the local commands run

Say this before the demo:

- `/review` and `/security-review` run inside the Copilot CLI session, on the
  working repository on your machine. They read your staged and unstaged changes
  before any commit or push. Nothing appears on GitHub.
- `/review` looks for correctness problems and missing tests.
  `/security-review` looks only for high-confidence vulnerabilities in that
  patch. Both only read; they don't edit files.
- Copilot PR review runs on GitHub against the pushed PR diff. It leaves
  comments in the PR, some with a suggested fix, and can run automatically.
  Teammates see it.
- Use the local commands for a private first pass. Use PR review where the
  team already reviews. Their findings overlap but differ, so triage both.
  Neither approves a change.

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
leaves nothing for `/review` to examine, and `/security-review` falls back to the
branch diff. Keep the output even if there are
no findings. Check `git diff` afterward; review should not change the project.

Use the triage table in `fix-evaluation-template.md`. Each accepted finding needs
a source, a claimed impact, and a reproduction or code reference. The mock search
route doesn't execute SQL, and the training strings aren't live credentials, so
don't teach them as proven exploits. Show the password exposure defect separately
by inspecting the response.

After the local review, have learners stage the patch and ask Copilot to draft
the commit message and PR description from the diff. They delete any claim the
diff doesn't show. Then they push, request Copilot PR review, and compare
results. Repeat both local commands on the uncommitted correction diff before
they commit fixes.

## Scripted demo: Suspended invoice viewer (0:28 to 0:43)

Use synthetic code with a local authorization defect to show the review steps.

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

Prepare four cases: suspended administrator, suspended owner, active
administrator, and unrelated active user.

### Assisted-review prompt

```text
Review only canViewInvoice against the stated requirement.
Return one file-specific finding with observed behavior, impact, and a test idea.
Do not propose unrelated refactoring.
```

### Steps

1. Read the requirement before the implementation.
2. Ask learners to predict each case.
3. Run a prepared test or trace the cases manually.
4. Request the assisted review of this function only.
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

9. Run all four focused cases and inspect the complete diff.
10. Ask the human reviewer to choose approve, request changes, or pause.

### Expected outcome

- The suspended cases fail before the fix and return `false` after it.
- Active administrator behavior stays `true`. An unrelated active user stays denied.
- The diff contains one guard plus focused test changes.
- The final decision cites the requirement and test results.

### Questions to ask

- Does the guard run before role and ownership checks?
- Did any unrelated behavior change?
- Does the review comment separate observation from assumption?

### Fallback worksheet

If the assisted review is unavailable or misses the defect, learners complete this
table, write a review comment, a minimal patch, and test names. A peer makes the
final decision.

| User state | Role/ownership | Before | Required | Decision |
| --- | --- | --- | --- | --- |
| Suspended | Admin | true | false | Block |
| Suspended | Owner | true | false | Block |
| Active | Admin | true | true | Preserve |
| Active | Neither | false | false | Preserve |

If the assisted review invents broader policy, mark the comment uncertain or out
of scope. If a suggested fix rewrites unrelated code, reject it and use the guard only.

## Segment 5: Suggested fixes and conflict intent (0:43 to 0:51)

### Before applying a suggested fix

1. Restate the finding yourself.
2. Reproduce the defect or find the violated criterion.
3. Inspect the entire patch.
4. Add a test that fails before the fix when practical.
5. Run broader checks in proportion to risk.

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

Ask for four checks: no conflict markers, a date example, a default currency
example, and an explicit currency example.

Learners resolve the lab conflict manually, run tests, and review the result.

## Segment 6: Limits and adoption (0:51 to 0:58)

Assisted review may find local correctness issues, missing tests, error-handling
problems, or convention mismatches.

It may miss unstated product intent, cross-system behavior, subtle authorization
issues, operational risk, or plausible but misleading changes.

To adopt it, start with a small set of repositories. Track actionable findings,
noise, rework, delays, and escaped defects. Decide who triages and how to pause
automatic review.

## Common trainee Q&A

### "Can Copilot approve a PR?"

Not by default. Copilot reviews don't count toward required approvals unless an
admin turns on Copilot approvals in the repository, organization, and enterprise
settings. Required human reviewers and branch rules still apply.

### "Should we apply every suggested fix?"

No. Reproduce the issue, inspect the complete patch, add a focused test, and
accept only the smallest correct change.

### "What if human and assisted reviews disagree?"

Return to the requirements, diff, and test output. Ask a domain owner if that doesn't settle it.

### "Can automatic review replace branch protection?"

No. Keep required human review.

### "Why review a generated PR description?"

It can invent results, omit risk, or misread intent. Compare every claim with the
diff and command output.

### "Is security review covered by this feature?"

`/review` checks general code issues. `/security-review` targets high-confidence
vulnerabilities in current changes. It's a focused, read-only check. It doesn't
replace code scanning, secret scanning, or dependency checks. Check
`/help` in your Copilot CLI version before teaching.

### "Which repositories should enable automatic review?"

Start with a few low-risk repositories. Define exclusions, owners, and a way to
turn it off.

## Common mistakes

| Mistake | Fix |
| --- | --- |
| Reviewing the summary before the diff | Read intent, diff, and checks first. |
| Applying a patch from the highlighted lines only | Inspect the entire proposed patch. |
| Approving because checks pass | Review coverage, intent, risk, and scope. |
| Choosing "ours" in a conflict without thought | Write the merged behavior before editing. |
| Claiming tests passed without output | Name and rerun the command. |

## Closing and lab handoff (0:58 to 1:00)

Use automation as a first pass. Check its findings against the intended
behavior, diff, and test output. The reviewer decides.

Open `lab/README.md` and assign author and reviewer roles. Learners use
`code-changes.md`, `fix-evaluation-template.md`, the local review project, and
the conflict scenario. `partner-review-checklist.md` is optional. The demo
worksheet doesn't replace the learner pull-request workflow.

Remind learners not to commit the initial patch before the local reviews.

## Product references

- [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [App review command reference](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [About Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)
