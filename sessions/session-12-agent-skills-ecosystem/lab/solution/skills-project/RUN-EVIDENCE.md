# Skill validation and bounded-run evidence

Run from `lab/starter/skills-project`.

## Validate the directory

```bash
npm run validate:skill
```

Expected:

```text
PASS .../.github/skills/api-design
- directory name and frontmatter name match
- required SKILL.md sections are present
```

## Test trigger behavior

```bash
npm test
```

Expected:

```text
tests 5
pass 5
fail 0
```

The suite covers one matching route task, one documentation task that must not
trigger, one missing-reviewer failure, and valid and invalid skill directories.

## Bounded run

```bash
npm run demo
```

The first scenario applies `api-design` only to `src/api/routes.js` and its focused
test. It prints the ordered checks and the verified `npm test` command.

The second scenario stops before work:

```json
{
  "status": "blocked",
  "skill": "api-design",
  "reason": "Missing precondition: human reviewer."
}
```

That blocked result is expected evidence. The skill must not hide a missing
precondition behind a success response.
