# Stale Issue Reviewer

## Trigger

Run daily at 8:00 AM UTC or through `workflow_dispatch`.

## Instructions

An issue is stale after 14 days without comments, commits, or label changes. Add this comment:

> 👋 This issue has had no activity for 14 days. Is it still relevant? If so, please leave a comment with an update. Otherwise, we'll close it in 7 days. Thank you!

Apply `stale`, but skip issues labeled `pinned`, `keep-open`, or `stale`, and skip pull requests. When a Daily Status Report issue exists, add the count to the newest one.

## Guardrails

- Use `safe-outputs` for comments and labels.
- Do not close issues.
