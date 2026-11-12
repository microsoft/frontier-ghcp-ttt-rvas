# Session M7-02: Interview ideas and shape better work

**Module:** Product and Delivery Teams

**Difficulty:** Beginner

**Prerequisites:** Session M7-01 and working GitHub Copilot access

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Continue the **Delivery Decision Studio** path with your Session M7-01 context
brief. Copy in the supplied `decision-interview` skill, read how it works, and use
it to ask questions in dependency order. Compare it with an ordinary prompt. Turn
the approved answers into a decision brief and issue proposal. When a late
constraint arrives, revise only the affected decisions.

**How this differs from M3-05.** [Session M3-05](../session-m3-05-agent-skills/README.md)
teaches how to write an interview skill (`grill-me`). This session uses a
ready-made, decision-focused one to shape real work. Both skills ask one question
at a time, give a recommended answer, and stop on a stated condition.

The fictional Service Request Portal remains the initiative.

> [!IMPORTANT]
> **GitHub Copilot is required.**

## Learning outcomes

Learners can:

- Install the supplied `decision-interview` skill and explain its frontmatter and how its description triggers it.
- Define a **decision frontier** and sequence dependent decisions across rounds.
- Tell a useful interview question from a leading one, and decide when to stop.
- Explain what an interview skill adds over an ordinary prompt.
- Run a GitHub Copilot interview that asks only questions whose prerequisites are settled.
- Resolve scope, constraints, success, failure, ownership, and approval.
- Review Copilot recommendations before accepting or revising them.
- Create a reviewed Markdown decision brief in the repository.
- Draft an issue proposal with testable acceptance criteria and a definition of done.
- Reopen only the decisions affected by new source information.
- Check that the revised brief and issue proposal agree.
- Use the M7-01 context controls between rounds and for the final fresh-session review.
- Request an independent critique before approving the brief and proposal.
- Assign an owner and reviewer before work enters a sprint.

## Session flow

```text
Vague request
  -> project skill installation
  -> GitHub Copilot decision interview
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

## Boundaries

- Teach the interview pattern, not skill authoring. Learners read and use the supplied skill without editing it. Writing one is M3-05.
- Use sanitized material only. Treat Copilot questions, recommendations, and drafts as proposals.
- Product and approval decisions stay with named people.
- Don't create or update a live work item until the request owner approves the brief. Session M7-03 creates the approved GitHub issues.
