# Session 25: Automate Delivery Follow-up and Connect Work Systems

**Module:** Product and Delivery Teams

**Difficulty:** Intermediate

**Prerequisites:** Sessions 20-24, GitHub Copilot app Automations access, and GitHub MCP access

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Product and delivery owners turn the manual workflow from Sessions 20–24 into one
bounded GitHub Copilot Automation. Learners create a manual, draft-only
automation, review its first run, update an approved input, rerun the same
automation, and compare the evidence before deciding whether to keep it.

The fictional **Service Request Portal** supplies a weekly status workflow and synthetic inputs. The core route runs in the GitHub Copilot app Automations area and reads approved GitHub work through MCP.

> [!IMPORTANT]
> Confirm Automations and GitHub MCP access before the session. If either does not work, stop and resolve access before starting the lab.

## Learning outcomes

- Classify recurring work by autonomy and approval level.
- Define allowed inputs, allowed outputs, required evidence, and stop conditions.
- Create a manual, draft-only GitHub Copilot Automation.
- Run the same automation twice against two approved input versions.
- Use GitHub MCP to retrieve the approved issue state.
- Inspect the run against acceptance criteria.
- Compare evidence across runs.
- Record a human approval decision.
- Measure useful time saved after review and rework.
- Write a stakeholder update that separates facts, decisions, exceptions, and next actions.
- Decide whether GitHub or Azure Boards remains the authoritative planning system.

## Scope

Session 17 covers enterprise access, policy, and administration. Session 25 starts after those decisions. It focuses on the accountable workflow owner, one bounded automation, and a clear system-of-record decision.

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Starter templates and synthetic evidence | [`lab/starter/`](lab/starter/) |
| Reference solution | [`lab/solution/`](lab/solution/) |

## Optional Azure Boards route

When Azure Boards is the approved system of record, use the automation to prepare a draft update from approved Boards data or to identify work that should be handed to a linked GitHub repository. Keep publishing and work-item changes behind human approval.
