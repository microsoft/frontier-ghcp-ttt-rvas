# Prompt Templates — Starter

Create reusable prompt files in this directory.

## Access and cost preflight

Use Enterprise Cloud as the governance baseline. Verify current official GitHub documentation and the customer administrator policy before a live exercise. For metered work, use a customer-defined stop guard.

## No-access fallback

Draft and peer-review the prompt files as repository artifacts. Then follow their procedures manually.

## Prompt File Format

Prompt files use the `.prompt.md` extension and live in `.github/prompts/`.

### Structure

```markdown
---
description: "Short description shown in the prompt picker"
---

Write the prompt instructions here.

Use `{{ variable_name }}` for a value the user supplies.
```

## Your Task

Create **three prompt files** for common team workflows:

1. **Bug investigation** — diagnose a bug in a repeatable way
2. **API documentation** — write docs from endpoint code
3. **Migration checklist** — plan a dependency upgrade

Place them in the project's `.github/prompts/` directory.

## Tips

- Be specific. Vague prompts produce vague results.
- Include examples of the output format you want
- Use numbered steps for procedural workflows
- State the criteria the result must meet
