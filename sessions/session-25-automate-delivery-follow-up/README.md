# Session 25: Automate Delivery Follow-up and Connect Work Systems

**Module:** Product and Delivery Teams

**Difficulty:** Intermediate

**Prerequisites:** Sessions 20-24, GitHub Copilot app Automations access, and GitHub MCP access

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Session 25 turns the reviewed Session 24 result into one bounded automation. The
automation reads live GitHub issues and the parent orchestration result, then
drafts a stakeholder update for human review.

Learners run the automation, update one approved issue, rerun it, and compare the
platform results. The stakeholder update is the real output. Scheduling remains
disabled unless the trainer approves it.

## Learning outcomes

- Define a bounded automation in a few operational fields.
- Use live GitHub issues and the parent orchestration result as authoritative inputs.
- Restrict the automation to one draft stakeholder update.
- Review platform run evidence instead of copying it into a separate form.
- Rerun after an approved issue change.
- Decide whether to keep, revise, disable, or pause the automation.
- Name the authoritative planning system.

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Starter assets | [`lab/starter/`](lab/starter/) |
| Reference solution | [`lab/solution/`](lab/solution/) |

## Boundaries

- The automation may read only approved GitHub issues and the Session 24 parent result.
- Its only permitted output is a draft stakeholder update.
- It may not publish, message people, edit issues, change labels, or write to external systems.
- A person reviews every draft.
- The enabled or disabled state must match the definition.

## Optional Azure Boards route

When Azure Boards is authoritative, use approved Boards items and the Session 24
parent result as inputs. Keep the output draft only. Do not maintain competing
status fields in GitHub and Azure Boards.
