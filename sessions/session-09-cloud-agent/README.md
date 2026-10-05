# Session 09: Copilot Cloud Agent

**Module:** Agentic Workflows

**Difficulty:** Advanced

**Prerequisites:** Sessions 01 to 07

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

This session follows one synthetic issue from contract through human decision. Learners prepare the repository, start an approved Copilot cloud agent session or use the manual route, inspect the proposed change, run the required tests, and decide whether to approve, request changes, or pause.

The issue stays fixed throughout the journey: reject blank or whitespace-only task titles while preserving valid task creation.

## Learning outcomes

- Write a bounded issue with testable acceptance criteria and explicit non-goals.
- Review repository instructions and Copilot setup steps before assignment.
- Monitor an approved agent session without expanding the issue.
- Compare a proposed change with the issue and allowed file scope.
- Run and record focused tests.
- Make an accountable human review decision.

## Deliverables

Learners finish with:

1. the fixed issue contract;
2. the proposed change or manual patch;
3. focused test output;
4. the review outcome.

## Access policy

The live route requires Copilot cloud agent access for the training repository, an approved data classification, and a named human reviewer.

If access or approval is missing, **do not assign the issue**. Use the manual route with the supplied sample project. The issue, file scope, tests, checkpoints, and review decision remain the same.

## Session materials

| Resource | Purpose |
| --- | --- |
| [`trainer-content/README.md`](trainer-content/README.md) | Minute-mapped teaching and demo plan |
| [`slides.md`](slides.md) | Trainer-facing teaching deck |
| [`lab/README.md`](lab/README.md) | Two-hour issue-to-review lab |
| [`lab/starter/`](lab/starter/) | Issue, setup, sample project, and review guide |
| [`lab/solution/`](lab/solution/) | Completed issue journey and runnable solution |

## Current product references

Product notes were checked against official GitHub documentation on October 5,
2026. Trainers must recheck access and policy before delivery:

- [Get started with Copilot agents on GitHub](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/overview)
- [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
- [Configure the development environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment)
- [Add repository custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions)
