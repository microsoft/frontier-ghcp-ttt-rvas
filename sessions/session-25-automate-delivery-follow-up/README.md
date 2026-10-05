# Session 25: Automate Delivery Follow-up and Connect Work Systems

**Module:** Product and Delivery Teams

**Difficulty:** Intermediate

**Prerequisites:** Sessions 20-24, GitHub Copilot app Automations access, and GitHub MCP access

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Session 25 closes the **Delivery Decision Studio** path. Product and delivery
owners consume Session 24 `delivery-status-record.md` and create one manual,
draft-only GitHub Copilot Automation. They review the first run, update one
approved input, rerun the same automation, and compare evidence.

The Service Request Portal remains the initiative. The core route is manual and
draft only. Scheduling is an optional stretch after separate approval.

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
- Explain why scheduling and higher autonomy require stronger controls.

## Scope

Session 17 covers enterprise access, policy, and administration. Session 25 starts
after those decisions and focuses on the accountable workflow owner, one bounded
automation, and a system-of-record decision.

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

## Boundaries

- No customer or source organization names.
- No publishing, messaging, issue edits, or external writes in the core lab.
- No learner move beyond A1 draft autonomy.
- Trainer-only maturity guidance covers A2 and A3.
- Optional scheduling does not change the draft-only output boundary.
