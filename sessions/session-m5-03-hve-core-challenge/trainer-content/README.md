---
description: "Trainer guide for HVE Core RPI, customization, and product delivery"
---

# Session M5-03 trainer guide: HVE from product intent to reviewed code

## Teaching goal

Use the API challenge to teach learners how HVE works. Assess how they move from
product intent to reviewed code, using HVE agents, prompts, instructions, and
saved tracking artifacts.

## Indicative trainer pacing

Model response time and audience questions will change the pace. Use ranges rather
than fixed clock slots, and shorten demonstrations before cutting artifact review.

| Segment | Indicative range | What learners should show |
|---------|------------------|-------------|
| What HVE is and why it exists | 5 to 10 min | Learners can distinguish agents, prompts, instructions, and tracking artifacts |
| Direct RPI phases and their handoffs | 15 to 20 min | Each phase has an owner, artifact, and gate |
| Combined `/rpi`, Follow-up, and checkpoints | 5 to 10 min | Learners can choose direct prompts or combined mode |
| Additive instructions and custom agents | 8 to 12 min | Learners can explain how instructions or a custom agent changed the work |
| Product and Agile agent flow | 8 to 12 min | Learners can place Advisor, Coach, BRD, and PRD before RPI |
| Challenge gates, recovery, and scoring | 4 to 6 min | Learners know what completion requires |

The full trainer segment should remain close to one hour. If an agent response is
slow, switch to the reference artifact and continue the explanation.

## Preflight

Before the session, check Node.js 20 or later and the approved HVE Core extension
or Copilot CLI plugin. Record the version or channel. Open Copilot Chat and check
the required prompts and agents appear. Do not describe HVE as optional or
substitute generic agent mode for an HVE phase.

Keep these items ready:

* A clean copy of the starter
* Completed reference RPI artifacts and product and Agile outputs
* A captured test output and container-build result
* A trainer-provided artifact for each RPI phase in case one invocation fails

If HVE is unavailable before delivery, switch the session to an instructor
walkthrough. Learners can inspect the artifacts but cannot complete the challenge
without running HVE.

## Teach HVE first

Define HVE as a structured engineering framework for GitHub Copilot. It adds four
things learners must distinguish:

* agents own roles and protocols;
* prompts provide repeatable workflow entry points;
* instructions apply standards when file patterns match;
* `.copilot-tracking/` stores local handoff files between phases and must stay
  ignored by Git.

Open the file Research writes for Plan. Show how a person can inspect its contents,
review a diff, attach it to the next phase, and approve it.

## Demonstrate direct RPI phases

Use the starter product intent and show the first two phases live:

```text
/rpi-research "Add POST /api/decisions using the supplied product intent and feature contract"
/rpi-plan
```

Pause on the artifacts, not the chat narration. Show what each phase owns:

| Phase | Question | Output |
|-------|----------|----------|
| Research | What do we know, what limits apply, and what is uncertain? | Research findings and alternatives |
| Plan | What will change, in what order, and which checks will catch mistakes? | Plan and critique |
| Implement | Did the changes follow the approved plan? | Code, tests, and changes log |
| Review | Does the result satisfy the request and quality bar? | Findings, criterion verdicts, decision |

Then show the combined form without running a second feature:

```text
/rpi task="<bounded task>"
```

Explain that combined RPI orchestrates the same phases and uses Follow-up to route
new defects or missing evidence back to the responsible phase. Use direct phase
prompts for learning and phase-by-phase approval. Use combined mode after the team trusts
the workflow and understands its artifacts.

## Demonstrate customization

Show these three files in the reference project:

```text
.github/copilot-instructions.md
.github/instructions/javascript-api.instructions.md
.github/agents/decision-api-reviewer.agent.md
```

Explain HVE's additive model. Repository context reaches every agent. Targeted
instructions activate only for matching files. A custom agent adds a repository-owned
role with its own mission, tools, protocol, and output contract.

Ask learners to show which path matched and what changed in Research, Plan, code,
or Review. Creating an instruction file alone does not show that it activated.

## Demonstrate the product-to-engineering handoff

Show the gradual path into RPI:

```text
Business idea
  → @BRD Builder or supplied product intent
  → @Product Manager Advisor
  → @PRD Builder when a full product specification is needed
  → @Agile Coach
  → approved HVE plan
  → Implement and Review
```

For this challenge, learners start with supplied intent, use Product Manager
Advisor to test value and assumptions, then use Agile Coach to produce one story
and acceptance criteria. They should update the HVE plan when those outputs expose
a gap. The Plan artifact should cite the platform outputs. Learners should not copy
those outputs into the handoff. No live backlog writes are needed.

## Reference demonstration

For the prepared demo, show one valid create request, a duplicate whose title uses
different case, and a malformed JSON response. Then show the test and runtime stages
in the Dockerfile. Keep the RPI artifact chain open beside the code so learners can
trace implementation back to product and Agile decisions.

## Coaching prompts

Use short questions that force a decision:

* Which file controls the behavior you need to change?
* Which HVE phase owns that decision?
* What check could disprove your current plan fastest?
* Which acceptance criterion lacks test results?
* Does the image build test the exact source copied into the runtime stage?
* Did an instruction change the review, or did you only create the file?
* Did Product Manager Advisor or Agile Coach change the plan?
* What would make you pause rather than approve?

## Review standard

Use the 100-point rubric in `lab/solution/reference-evidence.md`. Grade Research,
Plan, Implement, and Review at their generated paths. Use platform output only
when an HVE artifact cites it. Grade the handoff for its artifact index and final human
decision. It should not duplicate the phase records.

Require a human decision at the end: approve, request changes, or pause. Missing
artifacts or results should reduce the score even when the endpoint appears to work. One
trainer-provided recovery artifact can keep the lab moving, but it earns no
execution credit for the replaced phase. Do not infer a pass from the handoff alone.

## Official references

Check these sources during trainer preparation:

* [HVE Core installation](https://github.com/microsoft/hve-core/blob/main/docs/getting-started/install.md)
* [RPI workflow](https://github.com/microsoft/hve-core/blob/main/docs/rpi/README.md)
* [RPI commands](https://github.com/microsoft/hve-core/blob/main/docs/rpi/commands.md)
* [HVE agent catalog](https://github.com/microsoft/hve-core/blob/main/docs/agents/README.md)
