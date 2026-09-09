# Daily Repository Status Report

## Trigger

Run daily at 9:00 AM UTC or through `workflow_dispatch`.

## Instructions

Report PRs that have been open for more than three days, failed CI runs from the last 24 hours, commits by author from the last 24 hours, and TODO or FIXME comments added in the last seven days. Include the title, author, branch, file, and line where available.

## Output and guardrails

Create `Daily Status Report — {date}` as a Markdown GitHub Issue. Use tables when useful; state “All clear ✓” for an empty section.

- Read repository content and metadata only.
- Use `safe-outputs` only to create the status issue.
