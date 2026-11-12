# Session M7-06: Automate delivery follow-up and connect work systems

**Module:** Product and Delivery Teams

**Difficulty:** Intermediate

**Prerequisites:** Sessions M7-01 to M7-05, GitHub Copilot app Automations access, and GitHub MCP access

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Build one draft-only automation from the reviewed Session M7-05 result. It reads
live GitHub issues and the parent orchestration result, then drafts a stakeholder
update for human review.

Run the automation, update one issue, and run it again. Compare the results on the
platform before finishing the stakeholder update. Scheduling stays disabled.

## Learning outcomes

- Define an automation's inputs, output, and limits in a short table.
- Use live GitHub issues and the parent orchestration result as inputs.
- Restrict the automation to one draft stakeholder update.
- Review run records on the platform.
- Rerun after an issue change.
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

- The automation reads only the GitHub issues and the Session M7-05 parent result.
- Its only output is a draft stakeholder update.
- It can't publish, message people, edit issues, change labels, or write to external systems.
- A person reviews every draft.
- The enabled or disabled state matches the definition.

## Optional Azure Boards route

When Azure Boards is authoritative, use Boards items and the Session M7-05
parent result as inputs. Keep the output draft only. Don't keep competing
status fields in GitHub and Azure Boards.
