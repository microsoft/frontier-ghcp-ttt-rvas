# Completed Reversible Rollout Plan

## Scope

- **Repository:** `training-review-sandbox`
- **Workflow:** Review one synthetic pull request at a time
- **Data:** Synthetic task records only
- **Decision:** Proceed in the repository sandbox only

## Rollout gates

| Gate | Evidence required | Decision owner | Action |
| --- | --- | --- | --- |
| Start | Completed evidence map, synthetic-data boundary, engineering reviewer, exercise run counter, stop guard, and manual fallback | Engineering lead | Start the bounded training trial |
| Continue | At least 9 of 10 tasks meet acceptance criteria, no restricted-data or boundary event, no more than 3 material rewrites, fewer than 20 automated runs | Engineering lead | Continue until the window or guard ends |
| Expand | Platform administrator confirms current settings; data owner confirms the added repository and data class; required reviewers approve the new boundary | Final approver for added scope | Open a new decision record before expansion |
| Pause | Restricted data, boundary failure, more than 3 material rewrites, 20 automated runs, missing human review, or changed scope | Any named owner may trigger; engineering lead records | Stop automated work, preserve evidence, and use manual review |

## Observed evidence

- 9 of 10 tasks met acceptance criteria.
- 2 tasks needed material rewrite.
- No restricted-data event or boundary failure was observed.
- 16 of 20 automated runs were used.

## Final decision

Continue the bounded sandbox trial until the two-week or 10-task window closes.
**Do not expand.** The platform administrator and data owner still own the live
evidence needed for any added scope.

- **Next action:** Complete the remaining review window with the manual fallback
  ready.
- **Next review date:** 2026-10-08
