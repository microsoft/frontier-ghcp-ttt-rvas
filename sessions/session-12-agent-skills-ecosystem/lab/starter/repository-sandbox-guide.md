# Repository sandbox skill guide

This curriculum uses `.github/skills/` as its only delivery and training location. Keep skills with the code so teams can review and version them.

```bash
mkdir -p .github/skills/development-workflow
touch .github/skills/development-workflow/SKILL.md
```

Before use, name the bounded task, required permissions and data, reviewer, validation, recovery step, and manual fallback. Verify current documentation and customer policy before a live demonstration.

```markdown
---
name: pull-request-review
description: Use for pull requests that change REST API behavior in this repository. Do not use for documentation-only or deployment changes.
---

# Pull Request Review

## Preconditions
- The pull request links accepted behavior.
- A reviewer is assigned.

## Procedure
1. Read acceptance criteria and tests.
2. Check input validation and error handling.
3. Run the repository test command.
4. Request human approval before merging.

## Validation
Record the test output and unresolved gaps.

## Failure behavior
Stop when the acceptance criteria or reviewer is missing.

## Maintenance
Owner: `training-maintainers`. Perform the same review manually when live loading
is unavailable.
```
