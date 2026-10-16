# Session m7-06: Automate delivery follow-up and connect work systems

**Module:** Product and Delivery Teams

**Difficulty:** Intermediate

**Prerequisites:** Sessions m7-01 to m7-05, GitHub Copilot app Automations access, and GitHub MCP access

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Build one draft-only automation from the reviewed Session m7-05 result. It reads
live GitHub issues and the parent orchestration result, then drafts a stakeholder
update for human review.

Run the automation, update one approved issue, and run it again. Compare the
results on the platform before finishing the stakeholder update. Keep scheduling
disabled unless the trainer approves it.

## Learning outcomes

- Define an automation's inputs, output, and limits in a short table.
- Use live GitHub issues and the parent orchestration result as authoritative inputs.
- Restrict the automation to one draft stakeholder update.
- Review run records on the platform instead of copying them into a separate form.
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

- The automation may read only approved GitHub issues and the Session m7-05 parent result.
- Its only permitted output is a draft stakeholder update.
- It may not publish, message people, edit issues, change labels, or write to external systems.
- A person reviews every draft.
- The enabled or disabled state must match the definition.

## Optional Azure Boards route

When Azure Boards is authoritative, use approved Boards items and the Session m7-05
parent result as inputs. Keep the output draft only. Do not maintain competing
status fields in GitHub and Azure Boards.
