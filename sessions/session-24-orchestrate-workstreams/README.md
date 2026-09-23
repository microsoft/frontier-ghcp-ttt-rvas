# Session 24: Orchestrate Agents and Workstreams

**Module:** Product and Delivery Teams

**Difficulty:** Intermediate

**Prerequisites:** Sessions 20-23 and live GitHub Copilot orchestration access

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

**Last updated:** September 23, 2026

## Overview

This session teaches managers and delivery leads to run live GitHub Copilot orchestration. Learners select work from the approved GitHub issue plan and planning canvas, split one objective into independent workstreams, guide child sessions, review evidence, and make the final decision.

**GitHub Copilot orchestration access is required.** Learners need `/orchestrate` or an approved equivalent that creates and coordinates live child sessions. There is no manual, prepared-result, offline, or no-access route.

Azure Boards can hold planning state through MCP or the browser. GitHub Copilot must still perform the orchestration.

## Learning objectives

By the end of this session, learners can:

1. Turn a release objective into independent workstreams with clear boundaries.
2. Define the output packet and stop condition for each child session.
3. Start and monitor live child sessions through GitHub Copilot orchestration.
4. Redirect or stop weak work and accept or reject completed results.
5. Consolidate approved evidence in a shared release-readiness record.

## Session 16 distinction

Session 16 uses Brady's Squad as an optional framework for persistent roles, routing rules, shared memory, and monitored issue queues. Session 24 uses built-in GitHub Copilot orchestration for one objective. The manager reviews child-session output and owns the release decision.

| Session 16 | Session 24 |
| --- | --- |
| Squad implementation and role charters | Built-in GitHub Copilot orchestration |
| Persistent team and routing model | Temporary child sessions |
| Framework setup and shared memory | Output packets, stop conditions, and evidence review |
| Advanced implementation pattern | Intermediate delivery-management practice |

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab guide | [`lab/README.md`](lab/README.md) |
| Azure Boards companion | [`lab/azure-boards/README.md`](lab/azure-boards/README.md) |
| Learner assets | [`lab/starter/`](lab/starter/) |
| Reference solution | [`lab/solution/`](lab/solution/) |

The Azure Boards companion uses a seeded Service Request Portal Epic or Feature as the planning surface. The core route uses the Session 22 GitHub issues and Session 23 canvas. Learners must use live GitHub Copilot orchestration for the child workstreams.

## Required preflight

Before the session, type `/` in the GitHub Copilot app and confirm that `/orchestrate` is available. An organization may approve an equivalent orchestration entry point if it creates and coordinates live child sessions with the same controls.

**Stop if orchestration is unavailable.** Resolve the license, policy, client, repository, or command-access issue before the learner starts the lab. `/spawn` by itself does not meet the requirement because this session teaches parent-led orchestration across workstreams.

## Product-state note

**Verified against official GitHub documentation on September 23, 2026.** GitHub documents `/orchestrate` as a built-in GitHub Copilot app skill for coordinating work across sessions or repositories. GitHub also documents `/spawn`, parallel isolated sessions, steering, stopping, usage details, and the **My work** entry point.

Interface labels can change by context, plan, policy, and app version. If **My work** has moved, use the current session or agent surface. The orchestration requirement does not change.

## Official references

- [Built-in skills for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills)
- [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)
- [Rolling out the GitHub Copilot app to your team](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/enable-developers/copilot-app-for-teams)
- [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
