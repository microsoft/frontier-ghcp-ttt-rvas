# Repository sandbox skill guide

This curriculum uses `.github/skills/` as its only delivery and training location. Keep skills with the code so teams can review and version them.

```bash
mkdir -p .github/skills/development-workflow
touch .github/skills/development-workflow/SKILL.md
```

Before use, name the bounded task, required permissions and data, reviewer, validation, recovery step, and manual fallback. Verify current documentation and customer policy before a live demonstration.

```markdown
# Pull Request Review
## When to use
Pull requests that change API behavior in this repository.
## Procedure
1. Read acceptance criteria and tests.
2. Check input validation and error handling.
3. Run the repository test command.
4. Request human approval before merging.
## Fallback
Perform the same review manually.
```
