# Session 24: Orchestrate Agents and Workstreams

**Module:** Product and Delivery Teams

**Difficulty:** Intermediate

**Prerequisites:** Sessions 20-23 and live GitHub Copilot orchestration access

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

**Last updated:** October 5, 2026

## Overview

Session 24 continues the **Delivery Decision Studio** path. Managers and delivery
leads orchestrate the four status-visibility issue roles created in Session 22 and
reconciled in Session 23. They guide child sessions, review evidence, and create
the delivery-status record that Session 25 consumes.

**GitHub Copilot orchestration access is required.** Learners need the built-in
`/orchestrate` skill, which creates and coordinates child sessions. There is no
manual, prepared-result, offline, or no-access route.

Azure Boards can hold planning state through MCP or the browser. GitHub Copilot must still perform the orchestration.

## Learning objectives

Learners practice how to:

1. Turn a release objective into independent workstreams with clear boundaries.
2. Define the output packet and stop condition for each child session.
3. Start and monitor live child sessions through GitHub Copilot orchestration.
4. Redirect or stop weak work and accept or reject completed results.
5. Consolidate approved evidence in `delivery-status-record.md` with a
   release-readiness decision.

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
| Learner assets | [`lab/starter/`](lab/starter/) |
| Reference solution | [`lab/solution/`](lab/solution/) |

## Required preflight

Before the session, open **Customize** → **Skills** → **Installed**, confirm the
built-in `orchestrate` skill, then type `/` in a session and confirm that
`/orchestrate` is available.

**Stop if orchestration is unavailable.** Resolve the license, policy, client, repository, or command-access issue before the learner starts the lab. `/spawn` by itself does not meet the requirement because this session teaches parent-led orchestration across workstreams.

## Product-state note

**Verified against official GitHub documentation on October 5, 2026.** GitHub documents `/orchestrate` as a built-in GitHub Copilot app skill for coordinating work across sessions or repositories. GitHub also documents `/spawn`, parallel isolated sessions, steering, stopping, usage details, and the **My work** entry point.

Interface labels can change by context, plan, policy, and app version. If **My work** has moved, use the current session or agent surface. The orchestration requirement does not change.

## Official references

- [Built-in skills for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills)
- [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)
- [Rolling out the GitHub Copilot app to your team](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/enable-developers/copilot-app-for-teams)
- [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
