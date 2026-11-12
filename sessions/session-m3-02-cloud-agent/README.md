# Session M3-02: Copilot cloud agent

**Module:** Agentic Workflows

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

The Copilot cloud agent works on GitHub, not on your machine. You assign it an issue. It runs a session in a temporary environment, edits code, runs tests, and opens a draft pull request. You review it.

In this session you take one synthetic issue from its contract to a review decision. Set up a training repository, start a cloud agent session, inspect the pull request, and run the tests. Then approve, request changes, or pause.

The issue stays fixed throughout: reject blank or whitespace-only task titles and keep valid task creation working.

## Learning outcomes

- Write an issue with testable acceptance criteria, allowed files, and non-goals.
- Explain how an issue becomes an agent session and a pull request, and how that differs from IDE and CLI agents.
- Read repository instructions and Copilot setup steps before assignment.
- Monitor an agent session without expanding the issue.
- Compare a proposed change with the issue and its file scope.
- Run and record focused tests.

## You need

- Copilot cloud agent access to a training repository.
- A training repository where you have write access and can merge to the default branch.
- A human reviewer.
- Node.js and npm.

## Deliverables

1. The fixed issue.
2. The proposed change.
3. Focused test output.
4. The review outcome.

## Session materials

| Resource | Purpose |
| --- | --- |
| [`trainer-content/README.md`](trainer-content/README.md) | Minute-mapped teaching and demo plan |
| [`slides.md`](slides.md) | Trainer-facing teaching deck |
| [`lab/README.md`](lab/README.md) | Two-hour issue-to-review lab |
| [`lab/starter/`](lab/starter/) | Issue, setup, sample project, and review guide |
| [`lab/solution/`](lab/solution/) | Reference material: completed issue journey, `proposed-change.diff`, and runnable solution |

## References

Session environments and setup steps are changing. Check current docs.

- [Get started with Copilot agents on GitHub](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/overview)
- [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
- [Configure the development environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment)
- [Add repository custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions)
