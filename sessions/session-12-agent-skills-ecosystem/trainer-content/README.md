# Session 12 Trainer Guide: Skill Selection and Failure

## Delivery objective

Teach the skill as a selection contract plus a procedure. The demonstration must
show one matching task, one task that stays out of scope, and one matching task
that stops because a precondition is missing.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:08 | Skill directory and loading model |
| 0:08–0:18 | Required frontmatter and description |
| 0:18–0:30 | Trigger and non-trigger design |
| 0:30–0:42 | Preconditions and visible failure |
| 0:42–0:52 | Directory validation and bounded runner |
| 0:52–1:00 | Candidate review and lab handoff |

## Preflight

- Run `npm test`, `npm run validate:skill`, and `npm run demo`.
- Open the completed `api-design/SKILL.md`.
- Keep the three JSON scenarios visible.
- Do not connect the static MCP configuration.
- Use live skill loading only on an approved surface.

If live loading is unavailable, use the local contract runner. It measures the same
selection and stop behavior without claiming to reproduce every product detail.

## Teaching sequence

### 0:00–0:08: Directory model

Show:

```text
.github/
└── skills/
    └── api-design/
        └── SKILL.md
```

The directory name is lowercase with hyphens. The instruction file is named
exactly `SKILL.md`. Supporting scripts or references may sit beside it when they
are reviewed and necessary.

### 0:08–0:18: Frontmatter

The minimum frontmatter has `name` and `description`.

```yaml
---
name: api-design
description: Use for creating or reviewing REST routes under src/api/ when acceptance criteria, a reviewer, and a verified focused test command are available. Do not use for documentation, UI, deployment, or generated clients.
---
```

The name matches the directory. The description does more than summarize the body:
it tells Copilot when to select the skill.

### 0:18–0:30: Positive and negative selection

Compare:

```text
Review GET /api/tasks/:id under src/api/.
```

with:

```text
Rewrite the installation section in README.md.
```

The first task matches the work and path. The second does not. A skill that triggers
for both is noisy and unsafe.

Open `trigger.json` and `non-trigger.json`. Ask learners which fields make the
decision observable.

### 0:30–0:42: Preconditions and visible failure

The API skill requires:

- named acceptance criteria;
- a human reviewer;
- a verified focused test command.

Open `failure.json`. It matches the trigger but has no reviewer. The expected
result is:

```json
{
  "status": "blocked",
  "skill": "api-design",
  "reason": "Missing precondition: human reviewer."
}
```

This is correct application. The skill selected itself, checked its preconditions,
and stopped.

### 0:42–0:52: Validate and run

Run:

```bash
npm run validate:skill
npm test
npm run demo
```

Separate the claims:

| Check | Proves |
| --- | --- |
| Directory validator | Required file, frontmatter, and sections exist |
| Scenario tests | Selection and failure behavior match the contract |
| Bounded demo | A reviewer can see the applied and blocked outputs |
| Live surface | The selected product discovers and uses the skill |

The local runner is intentionally bounded. It is a teaching harness, not a new
skill platform.

### 0:52–1:00: Candidate review and handoff

Use `community-skills-catalog.md`. Review a candidate before adaptation:

- source and license;
- files and scripts;
- dependencies and network use;
- data flow;
- repository fit;
- owner and retirement trigger.

Do not run an unfamiliar script to learn what it does.

## Prepared demonstration

1. Validate the completed directory.
2. Run the five automated tests.
3. Run the trigger scenario and point to the bounded paths.
4. Run the documentation non-trigger.
5. Run the missing-reviewer failure.
6. Show the same outputs in `RUN-EVIDENCE.md`.

## Common mistakes

- Missing YAML frontmatter.
- A `name` that differs from the directory.
- A description that says what the skill is but not when to use it.
- No negative trigger.
- Preconditions hidden inside a long procedure.
- Returning success after a command failed or did not run.
- Treating a popular community skill as approved.

## Lab handoff

Learners create the skill, validate its structure, run the three scenarios, and end
with the bounded demonstration. The final record must include both correct
application and the visible missing-reviewer failure.

## Reference

- [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
