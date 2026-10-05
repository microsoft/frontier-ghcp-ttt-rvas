# Session 24: Orchestrate Agents and Workstreams

**Module:** Product and Delivery Teams

**Difficulty:** Intermediate

**Prerequisites:** Sessions 20-23 and live GitHub Copilot orchestration access

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

**Last updated:** October 5, 2026

## Overview

Session 24 teaches parent-led orchestration for one delivery objective. Learners
split four live GitHub issues into independent workstreams, monitor the child
sessions, and review the results.

The plan stays small. Each workstream needs only a bounded question, approved
inputs, a stop condition, and a reviewer. GitHub Copilot keeps session status,
links, timing, and usage on the orchestration surface.

**Live orchestration access is required.** There is no role-play or prepared-result
route.

## Learning objectives

Learners practice how to:

1. Split one objective into independent workstreams.
2. Set approved inputs and hard stop conditions.
3. Start and monitor child sessions through `/orchestrate`.
4. Redirect, stop, accept, or reject work.
5. Return a reviewed parent result backed by live GitHub issues.

## Session 16 distinction

Session 16 uses an optional framework for persistent roles and routing. Session 24
uses built-in orchestration for temporary workstreams. The parent reviews every
result and keeps decision authority.

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab guide | [`lab/README.md`](lab/README.md) |
| Learner assets | [`lab/starter/`](lab/starter/) |
| Reference solution | [`lab/solution/`](lab/solution/) |

## Required preflight

Confirm the built-in `orchestrate` skill and `/orchestrate` command in the GitHub
Copilot app. Confirm that GitHub MCP can read the approved parent and child issues.

**Stop if orchestration or issue access is unavailable.** Resolve access before the
lab.

## Product-state note

**Verified against official GitHub documentation on October 5, 2026.** Interface
labels can change by plan, policy, and app version. Use the current session
management surface. The orchestration requirement does not change.

## Official references

- [Built-in skills for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills)
- [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
