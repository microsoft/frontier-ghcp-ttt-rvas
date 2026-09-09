# Agent profile template

Use this as a reviewable starting point. Verify current frontmatter and tool names in official documentation before use.

````markdown
---
name: "your-agent-name"
description: "One specific repository responsibility."
tools:
  - "readFile"
  - "editFiles"
---

# Agent title

## Use when
Name the bounded task and paths.

## Procedure
1. Read the relevant source and tests.
2. Make the smallest permitted change.
3. Run the named check.
4. Report changed files and results.
5. Request human review.

## Constraints
- Do not change files outside the stated scope.
- Do not add dependencies or use external tools without approval.
- Stop when requirements or conventions are unclear.

## Fallback
Describe the manual procedure and the same evidence.
````

Keep one profile focused on one job. Define positive and negative triggers, a stop rule, validation, and an owner.
