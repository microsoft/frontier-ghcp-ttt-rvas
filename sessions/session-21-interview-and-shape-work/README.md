# Session 21: Interview Ideas and Shape Better Work

**Module:** Product and Delivery Teams

**Difficulty:** Beginner

**Prerequisites:** Session 20 and working GitHub Copilot access

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Vague requests hide decisions. Learners use the GitHub Copilot app to run a decision-tree interview, review its recommendations, and turn approved answers into a durable decision brief and issue proposal.

Learners may use an approved, sanitized request from their own work. The fictional Service Request Portal is the supplied training scenario.

> [!IMPORTANT]
> **GitHub Copilot is required.** Learners must confirm access before the session. If GitHub Copilot cannot run the interview, stop and resolve access before starting.

## Learning outcomes

By the end of this session, learners will be able to:

- Run the `grill-me` or `grilling` interview pattern with GitHub Copilot.
- Ask only questions whose prerequisites are settled.
- Resolve scope, constraints, success, failure, ownership, and approval.
- Review Copilot recommendations before accepting or revising them.
- Create a reviewed Markdown decision brief in the repository.
- Draft an issue proposal with testable acceptance criteria and a practical definition of done.
- Assign an owner and reviewer before work enters a sprint.

## Session flow

```text
Vague request
  -> GitHub Copilot decision-tree interview
  -> human review and decisions
  -> Markdown decision brief
  -> GitHub issue proposal
  -> acceptance criteria
  -> definition of done
```

## Session structure

| Block | Duration | Material |
| --- | --- | --- |
| Trainer content | 1 hour | [Trainer guide](trainer-content/README.md) |
| Lab | 2 hours | [Lab guide](lab/README.md) |

## Materials

| Resource | Location |
| --- | --- |
| Marp slides | [`slides.md`](slides.md) |
| Starter request and repository templates | [`lab/starter/`](lab/starter/) |
| Completed Copilot-reviewed examples | [`lab/solution/`](lab/solution/) |
| Azure Boards companion | [`lab/azure-boards/README.md`](lab/azure-boards/README.md) |

## Azure Boards companion

Learners with an approved training project may shape a seeded Azure Boards requirement. They still run the interview in the GitHub Copilot app. They may read and update Azure Boards through an approved MCP connection or the browser.

## Boundaries

- Teach the interview pattern, not skill authoring.
- Use only approved, sanitized material.
- Treat Copilot questions, recommendations, and drafts as proposals.
- Keep product and approval decisions with named people.
- Do not create or update a live work item until the request owner approves the brief.
- Session 22 creates the approved GitHub issues. Session 21 prepares the source artifact and issue proposal.
