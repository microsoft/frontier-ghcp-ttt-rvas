# Session 12 Trainer Guide: Skill Selection and Failure

## Delivery objective

Teach the skill as a selection contract plus a procedure. The demonstration must
show one matching task, one task that stays out of scope, and one matching task
that stops because a precondition is missing. Learners also load skills live and
compare two decision interviews before moving into `/plan`.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | Skill directory and loading model |
| 0:08 to 0:16 | Required frontmatter and description |
| 0:16 to 0:26 | Trigger, non-trigger, and visible failure |
| 0:26 to 0:36 | Directory validation versus live invocation |
| 0:36 to 0:54 | Pinned interview comparison and plan handoff |
| 0:54 to 1:00 | Access check and lab handoff |

## Preflight

- In a scratch copy of the full lab, place the reference API skill at the learner's
  `.github/skills/api-design` path. Run `npm test`, `npm run validate:skill`, and
  `npm run demo` there.
- Open the completed `api-design/SKILL.md`.
- Keep the three JSON scenarios visible.
- Do not connect the static MCP configuration.
- Check CLI `/skills reload`, `/skills info`, and `/plan`.
- Check the pinned community snapshot's checksums and retained MIT license.
- Load `decision-interview`, `grill-me`, and `grilling` in the scratch project.
- Agree a usage limit, including any fact-finding subagent.
- Check `/chronicle improve` against this copied repository's training history.

**If CLI access or a required skill is unavailable, stop the learner lab.**
The local harness is useful for teaching deterministic checks, but does not prove
that Copilot discovered or invoked a skill.

## Teaching sequence

### 0:00 to 0:08: Directory model

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

### 0:08 to 0:16: Frontmatter

The minimum frontmatter has `name` and `description`.

```yaml
---
name: api-design
description: Use for creating or reviewing REST routes under src/api/ when acceptance criteria, a reviewer, and a verified focused test command are available. Do not use for documentation, UI, deployment, or generated clients.
---
```

The name matches the directory. The description does more than summarize the body:
it tells Copilot when to select the skill.

### 0:16 to 0:26: Selection and visible failure

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

#### Missing precondition

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

### 0:26 to 0:36: Validate and invoke

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
| Scenario tests | The local harness behaves as its fixed contract specifies |
| Bounded demo | A reviewer can see the applied and blocked outputs |
| Live surface | The selected product discovers and uses the skill |

The local runner is intentionally bounded. It is a teaching harness, not a new
skill platform.

The learner validator and demo now read the project-local API skill. The harness
unit tests retain a fixed reference fixture. Neither claims that an LLM followed
the Markdown procedure. Show actual `/skills info` and live invocation separately.

### 0:36 to 0:54: Live interview comparison

Open `community-interview/README.md`. The snapshot pins upstream revision
`49dd158d1076134a641b33efb035946536778336` and contains unchanged, MIT-licensed
`grill-me` and `grilling` files. Read both; the entry point needs the dependency.

Use the Session 21 synthetic request and late constraint. Compare local
`decision-interview` with `/grill-me` in separate fresh Interactive sessions.
Use the same owner decisions and inspect actual skill loading. Keep the interview
out of Plan mode, as the pinned upstream guide recommends.

`grilling` may delegate fact-finding. That does not authorize a network call or
broader repository access. Keep permissions and the usage limit in place.

Write a short accepted decision brief, then start `/plan` in a fresh session.
Require two decisions that change a plan step or acceptance check. Do not implement.
Question wording can vary; the comparison is not a benchmark or universal ranking.

Use the last five minutes of the comparison for `/chronicle improve`. This
subcommand scopes history to the current repository or working directory.
Inspect a recommendation against an actual learner correction, then cancel the
apply step: suggestions may start selected. Decide whether the recurring rule
belongs in instructions, a skill, or neither. Insufficient history is a valid
result; do not reindex or query unrelated work to manufacture a pattern.

### 0:54 to 1:00: Handoff

Show `interview-comparison.md`. The final record must contain actual skill
invocations, owner decisions, the late constraint's effect, and the plan handoff.
Stop on a missing dependency or checksum mismatch; do not download a new version
during delivery.

## Prepared demonstration

1. Validate the completed directory.
2. Run the six automated tests.
3. Run the trigger scenario and point to the bounded paths.
4. Run the documentation non-trigger.
5. Run the missing-reviewer failure.
6. Show the same outputs in `EXPECTED-OUTPUT.md`.
7. Show live loading and the matching and missing-reviewer prompts.
8. Compare a question round from each interview and trace decisions into `/plan`.

## Common mistakes

- Missing YAML frontmatter.
- A `name` that differs from the directory.
- A description that says what the skill is but not when to use it.
- No negative trigger.
- Preconditions hidden inside a long procedure.
- Returning success after a command failed or did not run.
- Treating a popular community skill as approved.
- Installing only `grill-me` without `grilling`.
- Keeping Plan mode on while the interview is still settling decisions.
- Calling the author's second answer an independent interview run.

## Lab handoff

The lab stays at 120 minutes: 25/15/10/10/15 minutes for the API skill checks, then
45 for the live interview comparison, plan handoff, and five-minute retrospective. Keep the live comparison
and reduce discussion if the first half runs long.

Require correct skill application, visible missing-reviewer failure, actual live
loading, and the decision-to-plan comparison. A manual checklist or copied model
transcript does not complete the session.

## Reference

- [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
- [Pinned source and license record](../lab/starter/community-interview/README.md)
- [Using CLI session data](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle)
