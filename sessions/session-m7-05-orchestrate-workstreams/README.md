# Session M7-05: Orchestrate agents and workstreams

**Module:** Product and Delivery Teams

**Difficulty:** Intermediate

**Prerequisites:** Live GitHub Copilot app orchestration access; Sessions M7-01 to M7-04 for
the product route, or Sessions M1-01 to M1-03, M2-01 to M2-04 and M2-05 for the developer route

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Use parent-led orchestration for one delivery objective. Split four live GitHub
issues into independent workstreams, then monitor the child sessions and review
their results.

**Terms.** In **parent-led orchestration**, one session (the parent) owns the
objective, starts the child sessions, and reviews what they return. A **child
session** is a separate session that works one question from its own inputs. A
**stop condition** is the one boundary that ends a child's work, such as "stop if
the work needs personal data."

On the developer route after Session M2-05, you review your own pricing fix, its
tests, and its real pull request instead. You need `gh` or GitHub MCP, but no
product-track artifacts. Both routes use the same two-hour lab.

Each workstream needs a question, input paths or issues, a stop condition, and a
reviewer. GitHub Copilot keeps session status, links, timing, and usage on the
orchestration surface.

**Live orchestration is required.** There is no role-play or prepared-result route.

## Learning objectives

You will:

1. Decide when to split work and when to keep it in one session.
2. Make workstreams independent and handle shared dependencies.
3. Set inputs and a stop condition for each.
4. Start and monitor child sessions through `/orchestrate`.
5. Redirect, stop, accept, or reject work.
6. Name common failure modes and what to do about them.
7. Return a reviewed parent result backed by the route's sources.
8. Separate local test success from PR readiness (developer route).

## How this differs from other sessions

| Approach | What it is | Where |
| --- | --- | --- |
| Parallel chats | You run several chats yourself and merge the answers by hand. No parent holds the objective or reviews. | Not taught |
| Delegation to one agent | You hand one task to one agent and review its output. | [M2-05](../session-m2-05-copilot-app-for-developers/README.md), [M3-02](../session-m3-02-cloud-agent/README.md) |
| Parent-led orchestration | A parent splits one objective, runs several child sessions, and reconciles them. | M7-05 |
| M5-01 framework | Persistent roles and routing. | [M5-01](../session-m5-01-squad-orchestration/README.md) |

The parent reviews every result and keeps decision authority.

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab guide | [`lab/README.md`](lab/README.md) |
| Learner assets | [`lab/starter/`](lab/starter/) |
| Reference solution | [`lab/solution/`](lab/solution/) |

## You need

The built-in `orchestrate` skill and `/orchestrate` command in the GitHub Copilot
app. Product learners also need GitHub MCP read access to their parent and child
issues. Developers need Python 3.10 or later and local project read access.

## References

- [Built-in skills for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills)
- [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
