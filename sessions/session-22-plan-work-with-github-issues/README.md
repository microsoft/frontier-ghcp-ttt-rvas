# Session 22: Plan Work with GitHub Issues and MCP

**Module:** Product and Delivery Teams

**Difficulty:** Intermediate

**Prerequisites:** Sessions 20-21, GitHub Copilot app access, and an approved GitHub MCP connection

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Learners turn an approved decision brief into a reviewable GitHub issue plan. They use the GitHub MCP server to inspect the repository, propose an issue hierarchy, create approved issues, and verify the result.

This session teaches safe tool use for non-developers. It does not teach MCP server development.

> [!IMPORTANT]
> **The GitHub MCP connection and write access to the training repository are required.** Stop if the learner cannot inspect tools, preview the write, or verify the created issues.

## Learning outcomes

By the end of this session, learners can:

1. Explain what an MCP server lets Copilot do.
2. Inspect the GitHub tools available to the current session.
3. Decompose an approved outcome into a parent issue and bounded child issues.
4. Review issue titles, descriptions, acceptance criteria, dependencies, and ownership.
5. Approve a GitHub write operation only after checking its target and arguments.
6. Retrieve the created issues and compare them with the approved plan.

## Session structure

| Block | Duration | Material |
| --- | --- | --- |
| Trainer content | 1 hour | [Trainer guide](trainer-content/README.md) |
| Lab | 2 hours | [Lab guide](lab/README.md) |

## Materials

| Resource | Location |
| --- | --- |
| Slides | [`slides.md`](slides.md) |
| Approved brief and templates | [`lab/starter/`](lab/starter/) |
| Reference plan and review | [`lab/solution/`](lab/solution/) |

## Boundaries

- Use only the approved training repository.
- Read before writing.
- Ask Copilot to show the complete proposed issue set before creation.
- Keep issue creation within the agreed count and labels.
- Verify every created issue through a fresh GitHub read.
- Use an optional Azure Boards route only when it remains the approved system of record.
