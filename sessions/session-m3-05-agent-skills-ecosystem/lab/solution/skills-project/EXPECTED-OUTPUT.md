# Expected skill validation and demo output

Run from the working copy of `lab/starter/skills-project` after creating the
learner's `.github/skills/api-design/SKILL.md`.

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
tests 6
pass 6
fail 0
```

The suite covers the fixed scenario contract and a demo run that loads the
project-local skill without relying on a sibling solution directory.

## Demo run

```bash
npm run demo
```

The first scenario applies `api-design` only to `src/api/routes.js` and its focused
test. It prints the ordered checks and `npm test`, the command checked for this project.

The second scenario stops before work:

```json
{
  "status": "blocked",
  "skill": "api-design",
  "reason": "Missing precondition: human reviewer."
}
```

That blocked result is expected. The skill must not hide a missing
precondition behind a success response.

These deterministic outputs do not complete the live checks. Require actual
Copilot invocation and the interview comparison described in
`../interview-comparison-reference.md`.
