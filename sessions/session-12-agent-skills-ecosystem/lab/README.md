# Session 12 Lab: Test Skill Selection and Failure Behavior

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–07 and 11
**Deliverable:** A valid repository skill with trigger, non-trigger, failure, and
bounded-run evidence

## Lab overview

The procedure is only half the skill. The description must select the right work,
and missing preconditions must stop the run.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Build and validate the skill directory | 30 min |
| 2 | Test a matching task | 25 min |
| 3 | Test a non-matching task | 20 min |
| 4 | Test visible precondition failure | 20 min |
| 5 | Run the bounded demonstration and review | 25 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Use the
synthetic repository sandbox.

You need Node.js 20 or later and a writable repository copy. An approved GitHub
Copilot surface is optional. If Node.js is unavailable, stop and do not continue
the executable lab.

**Fallback:** use `SKILL.md` as a manual checklist and run the local contract
runner. Record live loading as **not executed**.

Do not connect the static MCP configuration in `integrated-workflow/`. Do not run
unreviewed community scripts.

## Part 1: Build and validate the skill directory

Create this exact structure:

```text
.github/
└── skills/
    └── api-design/
        └── SKILL.md
```

`SKILL.md` must start with:

```yaml
---
name: api-design
description: Use for creating or reviewing REST routes under src/api/ when acceptance criteria, a reviewer, and a verified focused test command are available. Do not use for documentation, UI, deployment, or generated clients.
---
```

The body must define preconditions, procedure, validation, failure behavior, and
maintenance.

Run:

```bash
cd sessions/session-12-agent-skills-ecosystem/lab/starter/skills-project
npm install
npm run validate:skill
```

The validator checks the directory name, exact `SKILL.md` file name, required
frontmatter, and body sections.

**Checkpoint:** the validator passes. A mismatched directory and frontmatter name
fails visibly in the automated suite.

## Part 2: Test the trigger

Open `scenarios/trigger.json`. It names a REST route under `src/api/`, acceptance
criteria, a reviewer, and `npm test`.

Run all contract tests:

```bash
npm test
```

The matching scenario must return:

```json
{
  "status": "applied",
  "skill": "api-design"
}
```

The full result also lists the bounded paths and ordered checks. The skill may not
expand the task to deployment, documentation, or unrelated refactoring.

## Part 3: Test the non-trigger

Open `scenarios/non-trigger.json`. The request changes `README.md`.

Expected result:

```json
{
  "status": "not_applicable",
  "skill": "api-design",
  "reason": "Task is outside REST route work under src/api/."
}
```

A useful skill stays quiet outside its boundary. Do not rewrite the description to
match every software task.

**Checkpoint:** the documentation scenario does not apply the API procedure.

## Part 4: Test a missing precondition

Open `scenarios/failure.json`. The task matches the API trigger but has no reviewer.

Expected result:

```json
{
  "status": "blocked",
  "skill": "api-design",
  "reason": "Missing precondition: human reviewer."
}
```

This is a successful test of failure behavior. Do not replace the missing reviewer,
skip the condition, or return an applied result.

## Part 5: Run the bounded demonstration

```bash
npm run demo
```

The command runs two scenarios:

1. a matching route review that applies the skill to named files;
2. the same class of work without a reviewer, which stops.

Compare the output with
[`solution/skills-project/RUN-EVIDENCE.md`](solution/skills-project/RUN-EVIDENCE.md).

If an approved surface can load the skill, submit the same two prompts without
changing the files. Record whether the surface selected the skill and whether it
stopped on the missing reviewer. Otherwise, mark live loading as **not executed**.

Review one candidate from `starter/community-skills-catalog.md`. Record its source,
license, scripts, network use, data flow, and repository fit. Do not execute it.

## Final deliverable

1. `.github/skills/api-design/SKILL.md`.
2. Passing directory and file validation.
3. Trigger and non-trigger results.
4. A visible missing-precondition result.
5. One bounded run record and a human review decision.

## Verification

- [ ] The directory is lowercase and uses hyphens.
- [ ] The file is named exactly `SKILL.md`.
- [ ] `name` matches the directory.
- [ ] `description` states when to use and when not to use the skill.
- [ ] The trigger scenario applies the skill.
- [ ] The documentation scenario does not apply it.
- [ ] The missing-reviewer scenario returns `blocked`.
- [ ] Invalid skill structure fails validation.
- [ ] `npm test` passes.
- [ ] The bounded run shows both correct application and visible failure.
- [ ] Live loading is recorded as executed or **not executed**.

## References

- [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
