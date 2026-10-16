# Session m3-02: Copilot cloud agent

**Module:** Agentic Workflows

**Difficulty:** Advanced

**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

This session follows one synthetic issue from contract through human decision.
Learners prepare the repository, start a Copilot cloud agent session,
inspect the proposed change, run the required tests, and decide whether to approve,
request changes, or pause.

The issue stays fixed throughout the journey: reject blank or whitespace-only task titles while preserving valid task creation.

## Learning outcomes

- Write an issue with testable acceptance criteria, allowed files, and non-goals.
- Review repository instructions and Copilot setup steps before assignment.
- Monitor an agent session without expanding the issue or its repository access.
- Compare a proposed change with the issue and allowed file scope.
- Run and record focused tests.
- Name the human reviewer and record their decision.

## Deliverables

Learners finish with:

1. the fixed issue contract;
2. the proposed change;
3. focused test output;
4. the review outcome.

## Access policy

Learners need Copilot cloud agent access to the training repository, synthetic
data, and a human reviewer.

If anything is missing, **do not assign the issue**. Stop the lab.

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
