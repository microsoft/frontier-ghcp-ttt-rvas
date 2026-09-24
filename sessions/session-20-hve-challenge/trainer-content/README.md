---
description: "Trainer guide for HVE Core RPI, customization, and product delivery"
---

# Session 20 Trainer Guide: HVE From Product Intent to Reviewed Code

## Delivery objective

Learners should leave able to explain HVE and use it. The API is the practice
surface. The assessed skill is moving from product intent to reviewed code through
HVE agents, prompts, instructions, and durable tracking artifacts.

## One-hour plan

| Time | Segment |
|------|---------|
| 0:00–0:10 | What HVE is and what problem it solves |
| 0:10–0:27 | Standalone Research, Plan, Implement, Review |
| 0:27–0:35 | Combined `/rpi`, Discover, and checkpoints |
| 0:35–0:47 | Additive instructions and custom agents |
| 0:47–0:56 | Product Manager Advisor, Agile Coach, BRD, and PRD agents |
| 0:56–1:00 | Challenge gates, recovery, and scoring |

## Preflight

Before the session, verify Node.js 20 or later and HVE Core in VS Code. Open
Copilot Chat and confirm the required prompts and agents appear. Do not describe
HVE as optional or substitute generic agent mode for an HVE phase.

Keep these items ready:

* A clean copy of the starter
* Completed reference RPI, product, and Agile evidence
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
* `.copilot-tracking/` is the durable interface between phases.

The file-as-interface model matters. Research does not hand an invisible chat
summary to Plan. It writes an artifact that a person can inspect, diff, attach,
and approve.

## Demonstrate standalone RPI

Use the starter product intent and show the first two phases live:

```text
/task-research topic=add POST /api/decisions using the supplied product intent and feature contract
/task-plan
```

Pause on the artifacts, not the chat narration. Show what each phase owns:

| Phase | Question | Evidence |
|-------|----------|----------|
| Research | What is true, constrained, and uncertain? | Research findings and alternatives |
| Plan | What will change, in what order, and how will we disprove mistakes? | Plan, details, and planning log |
| Implement | Did the changes follow the approved plan? | Code, tests, and changes log |
| Review | Does the result satisfy the request and quality bar? | Findings, criterion verdicts, decision |

Then show the combined form without running a second feature:

```text
/rpi task=<bounded task> auto=false
```

Explain that combined RPI orchestrates the same phases and adds Discover. Use
standalone mode for learning and explicit gates; use combined mode after the team
trusts the workflow and understands its artifacts.

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

Ask for activation evidence. A path match plus an observed effect on Research,
Plan, code, or Review is evidence. File existence is not.

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
a gap. No live backlog writes are needed.

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
* Which acceptance criterion lacks test evidence?
* Does the image build test the exact source copied into the runtime stage?
* Did an instruction change the review, or did you only create the file?
* Did Product Manager Advisor or Agile Coach change the plan?
* What would make you pause rather than approve?

## Review standard

Use the 100-point rubric in `lab/solution/reference-evidence.md`. Forty points are
reserved for the HVE RPI chain, 25 for customization, and 20 for product and Agile
agents. A correct endpoint without those artifacts does not pass.

Require a human decision at the end: approve, request changes, or pause. Missing
evidence should reduce the score even when the endpoint appears to work. One
trainer-provided recovery artifact can keep the lab moving, but it earns no
execution credit for the replaced phase.
