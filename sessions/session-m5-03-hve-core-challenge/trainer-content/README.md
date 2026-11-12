---
description: "Trainer guide for HVE Core RPI, customization, and product delivery"
---

# Session M5-03 trainer guide: HVE from product intent to reviewed code

## Goal

Use the API challenge to teach how HVE works. Learners move from product intent to
reviewed code using HVE agents, prompts, instructions, and saved tracking
artifacts.

## Pacing

Model response time and questions change the pace. Shorten demonstrations before
you cut artifact review.

| Segment | Range | What learners should show |
|---------|-------|---------------------------|
| What HVE is and why it exists | 5 to 10 min | They can distinguish agents, prompts, instructions, and tracking artifacts |
| Direct RPI phases and their handoffs | 15 to 20 min | Each phase has an owner, artifact, and gate |
| Combined `/rpi`, Follow-up, and checkpoints | 5 to 10 min | They can choose direct prompts or combined mode |
| Additive instructions and custom agents | 8 to 12 min | They can explain how an instruction or custom agent changed the work |
| Product and Agile agent flow | 8 to 12 min | They can place Advisor, Coach, BRD, and PRD before RPI |
| Challenge gates and scoring | 4 to 6 min | They know what completion requires |

If an agent response is slow, switch to the reference artifact and keep talking.

## Prepare

- Install Node.js 20 or later and the HVE Core extension or Copilot CLI plugin. Open Copilot Chat and check the RPI prompts and agents appear.
- A clean copy of the starter.
- Reference RPI artifacts and product and Agile outputs.
- Captured test output and container-build result.
- One trainer-provided artifact per RPI phase, in case an invocation fails.

Generic agent mode doesn't replace an HVE phase. Without HVE, run an instructor
walkthrough. Learners can inspect the artifacts but can't complete the challenge.

## Teach HVE first

HVE is a structured engineering framework for GitHub Copilot. Learners must
distinguish four parts:

* agents own roles and protocols;
* prompts provide repeatable workflow entry points;
* instructions apply standards when file patterns match;
* `.copilot-tracking/` stores local handoff files between phases and stays
  ignored by Git.

Open the file Research writes for Plan. Show how a person inspects it, reviews a
diff, attaches it to the next phase, and approves it.

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

Then show the combined form without running a second feature:

```text
/rpi task="<bounded task>"
```

Combined RPI orchestrates the same phases and uses Follow-up to route new defects
or missing evidence back to the responsible phase. Use direct phase prompts to
learn and approve phase by phase. Use combined mode once the team trusts the
workflow.

## Demonstrate customization

Show these files in the reference project:

```text
.github/copilot-instructions.md
.github/instructions/javascript-api.instructions.md
.github/agents/decision-api-reviewer.agent.md
```

HVE is additive. Repository context reaches every agent. Targeted instructions
activate only for matching files. A custom agent adds a role with its own mission,
tools, protocol, and output contract.

Ask learners which path matched and what changed in Research, Plan, code, or
Review. Creating an instruction file doesn't show it activated.

## Demonstrate the product-to-engineering handoff

```text
Business idea
  → @BRD Builder or supplied product intent
  → @Product Manager Advisor
  → @PRD Builder when a full product specification is needed
  → @Agile Coach
  → approved HVE plan
  → Implement and Review
```

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

## Grading

Use the 100-point rubric in `lab/solution/reference-evidence.md`. Grade Research,
Plan, Implement, and Review at their generated paths. Grade the handoff for its
artifact index and final human decision, not for duplicated phase records.

The learner ends with a decision: approve, request changes, or pause. Missing
artifacts lower the score even when the endpoint works. A trainer-provided recovery
artifact keeps the lab moving but earns no execution credit for that phase.

## References

* [HVE Core installation](https://github.com/microsoft/hve-core/blob/main/docs/getting-started/install.md)
* [RPI workflow](https://github.com/microsoft/hve-core/blob/main/docs/rpi/README.md)
* [RPI commands](https://github.com/microsoft/hve-core/blob/main/docs/rpi/commands.md)
* [HVE agent catalog](https://github.com/microsoft/hve-core/blob/main/docs/agents/README.md)
