# Prompt templates: Starter

Create reusable prompt files in this directory.

## Access and cost preflight

Follow the [course safety baseline](../../../../learning-safety-baseline.md). Set a
usage limit if the work is metered.

GitHub Copilot and Spaces access are required for the lab. If either is
unavailable, stop the lab.

## Prompt file format

Prompt files use the `.prompt.md` extension and live in `.github/prompts/`.

### Structure

```markdown
---
description: "Short description shown in the prompt picker"
---

Write the prompt instructions here.

Use `{{ variable_name }}` for a value the user supplies.
```

## Your task

Create **three prompt files** for common team workflows:

1. **Bug investigation:** diagnose a bug in a repeatable way
2. **API documentation:** write docs from endpoint code
3. **Migration checklist:** plan a dependency upgrade

Place them in the project's `.github/prompts/` directory.

## Tips

- Be specific. Vague prompts produce vague results.
- Include examples of the output format you want
- Use numbered steps for procedural workflows
- State the criteria the result must meet
