# Session M3-05 lab: Test skills and compare live interviews

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04 and M3-04
**Deliverable:** A validated repository skill, live trigger and failure results,
and a local-versus-community interview comparison that feeds `/plan`

## Lab overview

Test both parts of a skill: how its description selects work and how its
procedure handles that work. Check that missing preconditions stop the run.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Build and validate the skill directory | 25 min |
| 2 | Test a matching task | 15 min |
| 3 | Test a non-matching task | 10 min |
| 4 | Test visible precondition failure | 10 min |
| 5 | Check the local harness and live loading | 15 min |
| 6 | Compare interviews, plan, and review session corrections | 45 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Use the
synthetic repository sandbox.

You need Node.js 22 or later, a writable training workspace, and the standalone
Copilot CLI from Session M2-01. Check `/skills`, `/plan`, and loading of project
skills before starting. **If CLI access, a required skill, or package access is
unavailable, stop the lab.** A local contract runner does not replace live loading.
Check `/chronicle improve` too. Use only the synthetic training repository's
history; do not run account-wide history analysis during this exercise.

Do not connect the static MCP configuration in `integrated-workflow/`. Do not run
unreviewed community scripts.

From the curriculum root, copy the complete lab and the reused Session M7-02 inputs:

```bash
mkdir -p ~/copilot-labs/session-m3-05
cp -R sessions/session-m3-05-agent-skills-ecosystem/lab \
  ~/copilot-labs/session-m3-05/
cp sessions/session-m7-02-interview-and-shape-work/lab/starter/vague-request.md \
  sessions/session-m7-02-interview-and-shape-work/lab/starter/late-constraint.md \
  ~/copilot-labs/session-m3-05/lab/starter/
mkdir -p ~/copilot-labs/session-m3-05/lab/starter/skills-project/.github/skills/decision-interview
cp sessions/session-m7-02-interview-and-shape-work/lab/starter/.github/skills/decision-interview/SKILL.md \
  ~/copilot-labs/session-m3-05/lab/starter/skills-project/.github/skills/decision-interview/
cd ~/copilot-labs/session-m3-05/lab/starter/skills-project
```

Use a fresh destination if that folder exists. Keep the curriculum files unchanged.

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

The full result also lists the allowed paths and ordered checks. The skill may not
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

Keep the skill out of tasks beyond its scope. Do not rewrite the description to
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

This result shows that your failure check works. Do not replace the missing reviewer,
skip the condition, or return an applied result.

## Part 5: Check the local harness and live loading

```bash
npm run demo
```

The command runs two scenarios:

1. a matching route review that applies the skill to named files;
2. the same class of work without a reviewer, which stops.

Compare the output with
[`solution/skills-project/EXPECTED-OUTPUT.md`](solution/skills-project/EXPECTED-OUTPUT.md).

Start `copilot` in the working `skills-project` directory. Run `/skills reload`
and `/skills info api-design`. Submit the same matching and missing-reviewer
prompts without changing the files. Record actual skill selection and the
missing-reviewer stop. The local harness tests its own deterministic contract;
these live outputs show what Copilot actually did.

If the skill does not load or does not stop correctly, fix the skill and repeat
the check. Do not mark live loading as complete from the harness output.

## Part 6: Compare live interviews, then plan

### Inspect and load the pinned skills

Read `../community-interview/README.md`, both upstream `SKILL.md` files, and the
license. The snapshot pins Matt Pocock's `grill-me` entry point and its `grilling`
dependency. It is a community skill, not a Copilot built-in.

From your working `skills-project`:

```bash
cd ../community-interview
sha256sum -c SHA256SUMS
cd ../skills-project
cp -R ../community-interview/grill-me ../community-interview/grilling .github/skills/
cp ../community-interview/LICENSE .github/skills/MATT-POCOCK-LICENSE
```

Use `shasum -a 256 -c SHA256SUMS` on macOS. **Stop on a checksum mismatch.**
Review both files, including any delegated fact-finding, against the agreed usage
limit. There are no bundled scripts or downloads to run during the lab.

In Copilot, run:

```text
/skills reload
/skills info decision-interview
/skills info grill-me
/skills info grilling
```

If any skill is missing, stop and correct its project path or client support.
Do not install a global copy or drop the dependency.

### Run the same interview twice

Attach `../vague-request.md`. In a fresh **Interactive** session, run:

```text
/decision-interview
Use the attached synthetic request. I am the request owner. Ask the first
dependency-ordered question round, then wait. Do not draft or implement yet.
```

Answer the questions as the owner. Record decisions and reasons in a copy of
`../interview-comparison.md`. Continue until the main scope decisions are settled.
Add `../late-constraint.md` and ask the skill to reopen only affected decisions.

Start another fresh Interactive session with the same request and run:

```text
/grill-me
Use the attached synthetic request and only the supplied local inputs. I am the
request owner. Ask the first question round, then wait. Do not edit, use the
network, or implement. Stay within the agreed usage limit.
```

Use the same owner decisions. Add the same late constraint and record the effect.
Check that Copilot actually invokes `grilling` through the entry point. It may
request a fact-finding subagent; inspect its scope and usage if that happens.
Do not require a subagent when no fact lookup is needed.

**Keep Plan mode off during both interviews.** The pinned upstream guidance
recommends a fresh conversation without Plan mode so the interview can finish
before the agent starts drafting an implementation plan.

### Turn decisions into an implementation plan

Save an accepted `decision-brief.md` with the outcome, non-goals, decisions, and
remaining questions. Start a fresh planning session, attach that brief, and run:

```text
/plan Use decision-brief.md to plan the smallest request-status change. Map each
step and acceptance check to an owner decision. Mark open questions as blockers
instead of guessing. Do not implement or create a live work item.
```

Name at least two decisions that changed a plan step or acceptance check. Compare
the skills' actual behavior and choose which fits this task. Different phrasing
or one model run does not prove a universal winner.

### Review recurring corrections with `/chronicle` (last 5 minutes)

After the interviews and plan, run:

```text
/chronicle improve
```

This subcommand uses history for the current repository or working directory.
Inspect any suggestion before its apply step; suggestions may be selected by
default. Cancel without applying changes during this comparison. Check Git status
afterward. Do not run `reindex`, broad `tips`, or account-wide history searches
to make a short lab produce more recommendations.

Check one suggestion against an actual correction in your training sessions.
Decide whether it belongs in repository instructions, a reusable skill, or
neither. Record the source correction and decision in `interview-comparison.md`.
If there is too little indexed history or no useful recommendation, record that
result. Do not invent a pattern from one run or claim a generated instruction
has already improved the workflow.

## Final deliverable

1. `.github/skills/api-design/SKILL.md`.
2. Passing directory and file validation.
3. Trigger and non-trigger results.
4. A visible missing-precondition result.
5. Live API-skill loading and missing-reviewer stop results.
6. `interview-comparison.md`, the accepted decision brief, and `/plan` output.
7. The scoped `/chronicle improve` result and a human decision, without applying suggestions automatically.

## Final checks

- [ ] The directory is lowercase and uses hyphens.
- [ ] The file is named exactly `SKILL.md`.
- [ ] `name` matches the directory.
- [ ] `description` states when to use and when not to use the skill.
- [ ] The trigger scenario applies the skill.
- [ ] The documentation scenario does not apply it.
- [ ] The missing-reviewer scenario returns `blocked`.
- [ ] Invalid skill structure fails validation.
- [ ] `npm test` passes.
- [ ] The demo run shows both correct application and visible failure.
- [ ] Copilot loaded and used the API skill in both live scenarios.
- [ ] The community snapshot passed checksums and both dependency skills loaded.
- [ ] Both interviews ran live in separate Interactive sessions.
- [ ] The same request, owner decisions, and late constraint were used.
- [ ] At least two decisions changed the resulting `/plan` steps or checks.
- [ ] No implementation or live work-item creation occurred during comparison.
- [ ] Chronicle suggestions were checked against actual corrections, or insufficient history was recorded.
- [ ] No instruction suggestion was applied automatically.

## References

- [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
- [Pinned source and license record](starter/community-interview/README.md)
- [Comparison reference](solution/interview-comparison-reference.md)
- [Using CLI session data](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle)
