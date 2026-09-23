---
name: session-format-validator
description: Validate new or changed GitHub Copilot Train-the-Trainer session directories before they are added to the curriculum. Use this skill whenever a user creates, adds, updates, reviews, or asks whether a session under sessions/session-* follows the repository's repeatable format, including required materials, catalog metadata, navigation, and lab access or fallback guidance. Use it even when the user only asks to check a session README or lab.
compatibility: Requires Python 3.11+ and repository access.
---

# Session format validator

Use this skill to verify that a training session is ready to join the curriculum.
It reports gaps. It does not create files, rewrite curriculum content, or repair
metadata unless the user asks for a separate implementation task.

## Validate a session

1. Identify the session directory. If the user provides only a number, find the
   matching `sessions/session-NN-*` directory. If the request is ambiguous, ask
   for the intended session.
2. Run the validator from the repository root:

   ```bash
   python .github/skills/session-format-validator/scripts/validate_session.py \
     sessions/session-NN-topic
   ```

   Add `--json` when the result must feed another tool or a CI job.
3. Read the session overview, lab, and trainer guide only for findings that need
   explanation. Do not invent a requirement that the validator did not find.
4. Report results under **Passed checks** and **Needs work**. Group failures by
   materials, metadata, navigation, or lab readiness. Include the exact file and
   a concrete correction for every failed check.

## What the validator checks

- **Required materials:** overview, trainer guide, lab guide, slides, starter
  assets, and solution assets.
- **Metadata:** the directory name, overview heading, shared catalog entry, and
  valid module, difficulty, and duration values.
- **Navigation:** entries in `mkdocs.yml`, `README.md`, `curriculum-plan.md`, and
  `tracks/full-mastery.md`.
- **Lab readiness:** a setup or preflight section, a learner deliverable, and one
  clear access policy. The lab must either require access and tell learners to
  stop when access is missing, or provide an intentional fallback.

The repository's established template is the reference:
`track-template/session-template/`.

## Result format

Use this structure:

```markdown
## Session NN — <title>

**Status:** Ready | Needs work

### Passed checks

- <short confirmation>

### Needs work

- `path:line or section` — <what is missing>. <specific correction>.
```

If every check passes, omit **Needs work**. If the directory is missing, state that
first and stop. Do not claim that a session is ready when required files or
curriculum navigation are missing.

## Scope boundaries

- Keep existing material intact during validation.
- Accept a firm access prerequisite with a stop-if-missing instruction.
- Accept fallback guidance when an older session still supports a no-access route.
- Do not require fallback wording when a session requires GitHub Copilot.
- Do not require a live vendor tool, customer access, or a finished application.
- Use `scripts/validate-labs.sh` separately when the user also asks to validate
  executable starter or solution files.
