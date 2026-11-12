---
description: "Trainer guide for HVE Core RPI, customization, and product delivery"
---

# Session M5-03 trainer guide: HVE from product intent to reviewed code

## Goal

Use the API challenge to teach how HVE works. Learners run Research, Plan,
Implement, and Review and read the file each phase writes. Customization and the
product agents are optional, so the 3-hour lab fits.

## Pacing

Model response time and questions change the pace. Shorten demonstrations before
you cut artifact review.

| Segment | Range | What learners should show |
|---------|-------|---------------------------|
| What HVE is, RPI, and file as interface | 8 to 12 min | They can say what R, P, I, R stand for and why phases hand off through files |
| Direct RPI phases and their handoffs | 15 to 20 min | Each phase has an owner, a file, and a gate |
| Direct vs combined `/rpi`, Follow-up | 5 to 10 min | They can choose direct prompts or combined mode |
| Optional: customization and `applyTo` | 5 to 8 min | They can check that an instruction, agent, or prompt is active |
| Optional: product and Agile agents, BRD and PRD | 5 to 8 min | They can place Advisor, Coach, BRD, and PRD before RPI |
| Challenge handoff | 2 to 4 min | They know which files to fill in |

If an agent response is slow, switch to the reference artifact and keep talking.

## Prepare

- Install Node.js 20 or later and the HVE Core extension or Copilot CLI plugin. Open Copilot Chat and check the RPI prompts and agents appear.
- HVE Core releases often and command names, docs, and output paths move. This session's names (`/rpi-research`, `/rpi-plan`, `/rpi-implement`, `/rpi-review`, Follow-up, `.copilot-tracking/reviews/logs/`) match the `main` docs checked on 12 November 2026. The plugin follows `main`. The latest tagged release, v3.2.2 (March 2026), uses older names. Install the version you teach, read its docs, and run the demo once. Adjust names in the slides and lab if they differ.
- On `main`, `Product Manager Advisor` and `Agile Coach` are no longer agents. Their questioning and story-quality guidance moved into the `requirements-author` and backlog skills. If your install has no such agents, run optional exercise 3 through those skills or demonstrate it.
- A clean copy of the starter.
- Reference RPI artifacts and product and Agile outputs.
- Captured test output and container-build result.
- One trainer-provided artifact per RPI phase, in case an invocation fails.

Generic agent mode doesn't replace an HVE phase. Without HVE, run an instructor
walkthrough. Learners can inspect the artifacts but can't complete the challenge.

## Teach HVE first

HVE is a structured engineering framework for GitHub Copilot. **RPI** is its core
workflow: Research, Plan, Implement, Review, then Follow-up. Learners must
distinguish four parts:

* agents own roles and protocols;
* prompts provide repeatable workflow entry points;
* instructions apply standards when file patterns match;
* `.copilot-tracking/` stores local handoff files between phases and stays
  ignored by Git.

**File as interface** means the next phase reads the previous phase's file, not the
chat. Open the file Research writes for Plan. Show how a person reads it, diffs it,
edits it, attaches it to a fresh chat, and approves it.

## Demonstrate direct RPI phases

Use the starter product intent and run the first two phases live:

```text
/rpi-research "Add POST /api/decisions using the supplied product intent and feature contract"
/rpi-plan
```

Pause on the artifacts, not the chat narration.

| Phase | Question | Output |
|-------|----------|--------|
| Research | What do we know, what limits apply, and what is uncertain? | Research findings and alternatives |
| Plan | What will change, in what order, and which checks will catch mistakes? | Plan and critique |
| Implement | Did the changes follow the approved plan? | Code, tests, and changes log |
| Review | Does the result satisfy the request and quality bar? | Findings, criterion verdicts, decision |

Expected files, with `<date>` and `<task>` filled in by HVE:

```text
.copilot-tracking/research/<date>/<task>-research.md
.copilot-tracking/plans/<date>/<task>-plan.md
.copilot-tracking/reviews/plans/<date>/<task>-plan-critique.md
.copilot-tracking/changes/<date>/<task>-changes.md
.copilot-tracking/reviews/logs/<date>/<task>-review.md
```

Then show the combined form without running a second feature:

```text
/rpi task="<bounded task>"
```

Combined RPI writes the same kinds of files under one task name, and the mode you
pick decides how often it stops for your approval. After Review, Follow-up routes
defects to Implement, decision gaps to Plan, and evidence gaps to Research. Use
direct prompts to learn and approve phase by phase. Use combined mode once the team
trusts the workflow. Check your version's docs for exact prompt syntax and modes.

## Demonstrate customization (optional)

Show these files in the reference project:

```text
.github/copilot-instructions.md
.github/instructions/javascript-api.instructions.md
.github/agents/decision-api-reviewer.agent.md
```

HVE is additive. Repository context reaches every agent. Targeted instructions
activate only for matching files. A custom agent adds a role with its own mission,
tools, protocol, and output contract.

An instruction's frontmatter has an `applyTo` glob, for example
`applyTo: "src/**/*.js"`. Copilot loads the instruction only for matching files.

Show how to check each piece is active:

- **Instruction:** edit a matching file, ask a question, and look for the instruction in the response's References. Repeat with a non-matching file.
- **Agent:** find it in the agent picker (`/agent` in Copilot CLI) and run it once.
- **Prompt:** type `/` and the name. It appears in the picker and runs.

Ask learners what changed in Research, Plan, code, or Review. Creating a file
doesn't show it was used.

## Demonstrate the product-to-engineering handoff (optional)

```text
Business idea
  → @BRD Builder or supplied product intent
  → @Product Manager Advisor
  → @PRD Builder when a full product specification is needed
  → @Agile Coach
  → approved HVE plan
  → Implement and Review
```

A BRD says why the business wants the thing. A PRD says what the product must do.
Learners start with supplied intent, use Product Manager Advisor to test value and
assumptions, then use Agile Coach to produce one story and acceptance criteria.
They update the HVE plan when those outputs expose a gap. The Plan artifact cites
the outputs. Learners don't copy them into the handoff. No live backlog writes.

## Reference demonstration

Show one valid create request, a duplicate whose title uses different case, and a
malformed JSON response. Then show the test and runtime stages in the Dockerfile.
Keep the RPI artifact chain open beside the code so learners can trace the
implementation back to product and Agile decisions.

## Coaching prompts

* Which file controls the behavior you need to change?
* Which HVE phase owns that decision?
* What check could disprove your plan fastest?
* Which acceptance criterion lacks test results?
* Does the image build test the exact source copied into the runtime stage?
* Did an instruction change the review, or did you only create the file?
* Did Product Manager Advisor or Agile Coach change the plan?
* What would make you pause rather than approve?

## Reviewing results

Look for each file at its generated path. `lab/solution/reference-notes.md` lists
where. Check that the handoff has the four paths, the learner's decision, open risks,
and the next action, not copied phase text.

The learner ends with a decision: approve, request changes, or pause. If a phase
failed and you supplied a recovery file, the learner says so in the handoff.

## References

* [HVE Core installation](https://github.com/microsoft/hve-core/blob/main/docs/getting-started/install.md)
* [RPI workflow](https://github.com/microsoft/hve-core/blob/main/docs/rpi/README.md)
* [Using RPI together](https://github.com/microsoft/hve-core/blob/main/docs/rpi/using-together.md)
* [HVE agent catalog](https://github.com/microsoft/hve-core/blob/main/docs/agents/README.md)
