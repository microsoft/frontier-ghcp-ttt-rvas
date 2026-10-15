# Stale Issue Reviewer

## Trigger

Run daily at 8:00 AM UTC or through `workflow_dispatch`.

## Instructions

An issue is stale after 14 days without comments, commits, or label changes. Add this comment and apply `stale`:

> 👋 This issue has had no activity for 14 days. Is it still relevant? If so, please leave a comment with an update. Otherwise, we'll close it in 7 days. Thank you!

Skip issues labeled `pinned`, `keep-open`, or `stale`, and skip pull requests. Add a summary comment to the most recent Daily Status Report issue when one exists.

## Guardrails

- Use `safe-outputs` for comments and labels.
- Do not close issues.
