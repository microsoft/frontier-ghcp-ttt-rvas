---
description: "Learner workbook for HVE RPI, customization, product, and review evidence"
---

# HVE challenge evidence workbook

## HVE preflight

* HVE Core version:
* Confirmed prompts and agents:
* Human reviewer:
* Stop condition:
* Data boundary: synthetic decision records, local memory only
* Baseline command and result:
* Container validation path: local, approved remote build, or not run

## RPI artifact chain

Record what each HVE phase produced and how the next phase used it.

| Phase | HVE entry point | Artifact path | Decision or finding | Consumed by |
|-------|-----------------|---------------|---------------------|-------------|
| Research | `/rpi-research` | | | Plan |
| Plan | `/rpi-plan` | | | Implement |
| Implement | `/rpi-implement` | | | Review |
| Review | `/rpi-review` | | | Human reviewer |

### Research check

* Selected approach:
* Rejected alternative:
* Constraint that shaped the plan:

### Plan check

| Criterion | Planned file | Planned check |
|-----------|--------------|---------------|
|           |              |               |

* Human approval before implementation:

## HVE customization

| Layer | File | Activation evidence | Effect on a later phase |
|-------|------|---------------------|-------------------------|
| Repository context | `.github/copilot-instructions.md` | | |
| Coding practice | `.github/instructions/javascript-api.instructions.md` | | |
| Custom agent | `.github/agents/decision-api-reviewer.agent.md` | | |

## Product Manager Advisor

* Value decision:
* Target user and outcome:
* Assumption or risk:
* Priority and rationale:
* Question requiring a human answer:

## Agile Coach

* User story:
* Acceptance criteria:
* Explicit exclusions:
* Plan change or confirmation:

## Implement and Review

Record changed files, decisions made, commands run, and any criterion left open.
Separate offline container-contract checks from an actual image build.

Use `pass`, `fail`, `deferred`, or `not run` for every criterion. Cite a test,
response, or source line as evidence.

| Criterion | Result | Evidence |
|-----------|--------|----------|
|           |        |          |

## Direct and combined RPI

* What the direct phase prompts exposed:
* What `/rpi` would orchestrate automatically:
* What Follow-up does after Review:

## Risk and handoff

Address empty or non-string input, malformed JSON, duplicate normalization,
untrusted error details, the base-image and dependency supply chain, and the limits
of process-local storage. Record one follow-up risk that is outside this challenge.

Write a conventional commit-message preview and a pull-request summary. Do not
commit, push, merge, or open a remote pull request during the lab.

* Commit preview:
* Pull-request summary:
* Test evidence:
* Container build evidence:
* Review decision: approve, request changes, or pause
* Next action:
