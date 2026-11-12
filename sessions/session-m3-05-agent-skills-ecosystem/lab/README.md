# Session M3-05 lab: Test skills and compare live interviews

**Deliverable:** A validated repository skill, live trigger and failure results, and a local-versus-community interview comparison that feeds `/plan`

## Lab overview

Test both parts of a skill: how its description selects work and how its procedure handles that work. Check that missing preconditions stop the run.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Build and validate the skill directory | 25 min |
| 2 | Test a matching task | 15 min |
| 3 | Test a non-matching task | 10 min |
| 4 | Test visible precondition failure | 10 min |
| 5 | Check the local harness and live loading | 15 min |
| 6 | Compare interviews, plan, and review session corrections | 45 min |

## Before you start

You need Node.js 22 or later, a writable workspace, and the standalone Copilot CLI from Session M2-01. Check `/skills`, `/plan`, `/chronicle improve`, and project skill loading first. Use only the training repository's history. Don't connect the static MCP configuration in `integrated-workflow/`, and don't run unreviewed community scripts.

From the curriculum root, copy the lab and the Session M7-02 inputs:

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

Use a fresh destination if that folder exists.

## Part 1: Build and validate the skill directory

Create:

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

The body defines preconditions, procedure, validation, failure behavior, and maintenance.

```bash
npm install
npm run validate:skill
```

The validator checks the directory name, the exact `SKILL.md` file name, required frontmatter, and body sections.

**Checkpoint:** The validator passes. A mismatched directory and frontmatter name fails visibly in the automated suite.

## Part 2: Test the trigger

Open `scenarios/trigger.json`. It names a REST route under `src/api/`, acceptance criteria, a reviewer, and `npm test`.

```bash
npm test
```

The matching scenario returns:

```json
{
  "status": "applied",
  "skill": "api-design"
}
```

The full result lists the allowed paths and ordered checks. The skill may not expand the task to deployment, documentation, or unrelated refactoring.

## Part 3: Test the non-trigger

Open `scenarios/non-trigger.json`. The request changes `README.md`. Expected:

```json
{
  "status": "not_applicable",
  "skill": "api-design",
  "reason": "Task is outside REST route work under src/api/."
}
```

Don't widen the description to match every software task.

**Checkpoint:** The documentation scenario doesn't apply the API procedure.

## Part 4: Test a missing precondition

Open `scenarios/failure.json`. The task matches the API trigger but has no reviewer. Expected:

```json
{
  "status": "blocked",
  "skill": "api-design",
  "reason": "Missing precondition: human reviewer."
}
```

Don't supply a reviewer, skip the condition, or return an applied result.

## Part 5: Check the local harness and live loading

```bash
npm run demo
```

It runs two scenarios: a matching route review that applies the skill to named files, and the same work without a reviewer, which stops. Compare the output with [`solution/skills-project/EXPECTED-OUTPUT.md`](solution/skills-project/EXPECTED-OUTPUT.md).

Start `copilot` in the working `skills-project` directory. Run `/skills reload` and `/skills info api-design`. Submit the same matching and missing-reviewer prompts. Record the actual skill selection and the missing-reviewer stop. The harness tests its own contract. Only these live outputs show what Copilot did.

If the skill doesn't load or doesn't stop correctly, fix it and repeat.

## Part 6: Compare live interviews, then plan

### Inspect and load the pinned skills

Read `../community-interview/README.md`, both upstream `SKILL.md` files, and the license. The snapshot pins Matt Pocock's `grill-me` entry point and its `grilling` dependency. They're community skills, not Copilot built-ins.

From your working `skills-project`:

```bash
cd ../community-interview
sha256sum -c SHA256SUMS
cd ../skills-project
cp -R ../community-interview/grill-me ../community-interview/grilling .github/skills/
cp ../community-interview/LICENSE .github/skills/MATT-POCOCK-LICENSE
```

On macOS use `shasum -a 256 -c SHA256SUMS`. **Stop on a checksum mismatch.** Review both files, including any delegated fact-finding. There are no bundled scripts or downloads to run.

In Copilot, run:

```text
/skills reload
/skills info decision-interview
/skills info grill-me
/skills info grilling
```

If a skill is missing, fix its project path or client support. Don't install a global copy or drop the dependency.

### Run the same interview twice

Attach `../vague-request.md`. In a fresh **Interactive** session, run:

```text
/decision-interview
Use the attached synthetic request. I am the request owner. Ask the first
dependency-ordered question round, then wait. Do not draft or implement yet.
```

Answer as the owner. Record decisions and reasons in a copy of `../interview-comparison.md`. Continue until the main scope decisions are settled. Add `../late-constraint.md` and ask the skill to reopen only the affected decisions.

Start another fresh Interactive session with the same request and run:

```text
/grill-me
Use the attached synthetic request and only the supplied local inputs. I am the
request owner. Ask the first question round, then wait. Do not edit, use the
network, or implement.
```

Use the same owner decisions and the same late constraint, and record the effect. Check that Copilot actually invokes `grilling` through the entry point. It may start a fact-finding subagent. If so, inspect its scope. A subagent isn't required when no fact lookup is needed.

**Keep Plan mode off during both interviews.** The upstream guidance recommends a fresh conversation without Plan mode so the interview finishes before the agent drafts a plan.

### Turn decisions into an implementation plan

Save an accepted `decision-brief.md` with the outcome, non-goals, decisions, and remaining questions. Start a fresh planning session, attach the brief, and run:

```text
/plan Use decision-brief.md to plan the smallest request-status change. Map each
step and acceptance check to an owner decision. Mark open questions as blockers
instead of guessing. Do not implement or create a live work item.
```

Name at least two decisions that changed a plan step or acceptance check. Compare how the skills actually behaved and pick the one that fits this task. One run each doesn't make a universal winner.

### Review recurring corrections with `/chronicle` (last 5 minutes)

```text
/chronicle improve
```

This uses history for the current repository or working directory. Inspect each suggestion before its apply step, since suggestions may be selected by default. Cancel without applying, then check Git status. Don't run `reindex`, broad `tips`, or account-wide history searches to get more recommendations.

Check one suggestion against a real correction from your sessions. Decide whether it belongs in repository instructions, a skill, or neither. Record the source correction and your decision in `interview-comparison.md`. If there's too little history or no useful recommendation, record that.

## Final deliverable

1. `.github/skills/api-design/SKILL.md`.
2. Passing validation and `npm test`.
3. Trigger, non-trigger, and missing-reviewer results.
4. Live API-skill loading and missing-reviewer stop results.
5. `interview-comparison.md`, the accepted decision brief, and `/plan` output.
6. The scoped `/chronicle improve` result and your decision, with nothing applied automatically.

## References

- [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
- [Pinned source and license record](starter/community-interview/README.md)
- [Comparison reference](solution/interview-comparison-reference.md)
- [Using CLI session data](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle)
