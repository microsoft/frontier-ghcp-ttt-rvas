# Session M3-05 trainer guide: Skill selection and failure

## Teaching goal

Demonstrate three skill outcomes: a matching task runs, an out-of-scope task doesn't, and a matching task stops because a precondition is missing. Then have learners load skills live and compare two decision interviews before moving into `/plan`.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | Skill directory and loading model |
| 0:08 to 0:16 | Required frontmatter and description |
| 0:16 to 0:26 | Trigger, non-trigger, and visible failure |
| 0:26 to 0:36 | Directory validation versus live invocation |
| 0:36 to 0:54 | Pinned interview comparison and plan handoff |
| 0:54 to 1:00 | Lab handoff |

## Preparation

- In a scratch copy of the full lab, put the reference API skill at the learner's `.github/skills/api-design` path. Run `npm test`, `npm run validate:skill`, and `npm run demo` there.
- Open the completed `api-design/SKILL.md` and keep the three JSON scenarios visible.
- Check CLI `/skills reload`, `/skills info`, and `/plan`.
- Check the community snapshot's checksums and MIT license.
- Load `decision-interview`, `grill-me`, and `grilling` in the scratch project.
- Check `/chronicle improve` against this copy's training history.

The local harness teaches deterministic checks. It doesn't show that Copilot discovered or invoked a skill.

## Teaching sequence

### 0:00 to 0:08: Directory model

```text
.github/
└── skills/
    └── api-design/
        └── SKILL.md
```

The directory name is lowercase with hyphens. The file is named exactly `SKILL.md`. Supporting scripts or references may sit beside it.

### 0:08 to 0:16: Frontmatter

Minimum frontmatter is `name` and `description`:

```yaml
---
name: api-design
description: Use for creating or reviewing REST routes under src/api/ when acceptance criteria, a reviewer, and a verified focused test command are available. Do not use for documentation, UI, deployment, or generated clients.
---
```

The name matches the directory. The description does more than summarize the body: it tells Copilot when to select the skill.

### 0:16 to 0:26: Selection and visible failure

Compare:

```text
Review GET /api/tasks/:id under src/api/.
```

with:

```text
Rewrite the installation section in README.md.
```

The first matches the work and path. The second doesn't. A skill that triggers on both applies the API procedure outside its scope.

Open `trigger.json` and `non-trigger.json`. Ask which fields make the decision visible in the output.

#### Missing precondition

The API skill requires named acceptance criteria, a human reviewer, and a focused test command that runs in this project. `failure.json` matches the trigger but has no reviewer. The expected result:

```json
{
  "status": "blocked",
  "skill": "api-design",
  "reason": "Missing precondition: human reviewer."
}
```

The skill matched, checked its preconditions, and stopped.

### 0:26 to 0:36: Validate and invoke

```bash
npm run validate:skill
npm test
npm run demo
```

| Check | Shows |
| --- | --- |
| Directory validator | Required file, frontmatter, and sections exist |
| Scenario tests | The local harness follows its fixed contract |
| Two-scenario demo | The applied and blocked outputs are visible |
| Live invocation | Copilot discovers and uses the skill |

The learner validator and demo read the project-local API skill. The harness unit tests use a fixed reference fixture. Neither shows that an LLM followed the Markdown procedure, so show `/skills info` and live invocation separately.

### 0:36 to 0:54: Live interview comparison

Open `community-interview/README.md`. The snapshot pins upstream revision `49dd158d1076134a641b33efb035946536778336` and contains unchanged, MIT-licensed `grill-me` and `grilling` files. Read both: the entry point needs the dependency.

Use the Session M7-02 synthetic request and late constraint. Run local `decision-interview` and `/grill-me` in separate fresh Interactive sessions with the same owner decisions, and inspect actual skill loading. Keep Plan mode off, as the upstream guide recommends.

`grilling` may delegate fact-finding. Don't let that widen network or repository access.

Write a short decision brief, then start `/plan` in a fresh session. You need two decisions that change a plan step or acceptance check. Don't implement. Question wording varies, so this is a comparison, not a ranking.

Use the last five minutes for `/chronicle improve`, which scopes history to the current repository or directory. Check a recommendation against a real learner correction, then cancel the apply step (suggestions may start selected). Decide whether the rule belongs in instructions, a skill, or neither. Too little history is a valid result. Don't reindex or query unrelated work to find a pattern.

### 0:54 to 1:00: Handoff

Show `interview-comparison.md`. The final record needs the actual skill invocations, owner decisions, the late constraint's effect, and the plan handoff. Stop on a missing dependency or checksum mismatch.

## Prepared demonstration

1. Validate the completed directory.
2. Run the six automated tests.
3. Run the trigger scenario and point to the allowed paths.
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
- Preconditions buried in a long procedure.
- Returning success after a command failed or didn't run.
- Installing `grill-me` without `grilling`.
- Leaving Plan mode on while the interview is still settling decisions.
- Treating the author's second answer as an independent interview run.

## Lab handoff

The lab stays at 120 minutes: 25/15/10/10/15 for the API skill, then 45 for the interview comparison, plan handoff, and retrospective. If the first half runs long, shorten discussion, not the live comparison.

Learners must show correct skill application, a visible missing-reviewer failure, live loading, and the decision-to-plan comparison. A manual checklist or copied model transcript doesn't count.

## Reference

- [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
- [Pinned source and license record](../lab/starter/community-interview/README.md)
- [Using CLI session data](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle)
