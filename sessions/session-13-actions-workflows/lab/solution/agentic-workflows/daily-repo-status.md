# Daily Repository Status Report

## Trigger

Run daily at 9:00 AM UTC or through `workflow_dispatch`.

## Instructions

Report PRs that have been open for more than three days, including failing checks; failed workflow runs from the last 24 hours with their branch and run link; commits by author from the last 24 hours; TODO or FIXME comments added in the last seven days with file and line; and open Dependabot alerts with severity and package name.

## Output and guardrails

Create `Daily Status Report — {date}` as a Markdown GitHub Issue. Use tables when useful and write “All clear ✓” for an empty section.

- Read repository content and metadata only.
- Use `safe-outputs` only to create the issue.
