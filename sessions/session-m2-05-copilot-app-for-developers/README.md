---
description: "Use the GitHub Copilot app for isolated, evidence-backed engineering work"
---

# Session M2-05: GitHub Copilot App for developers

**Module:** Module 2: Copilot in Practice

**Difficulty:** Intermediate

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04

**Duration:** 180 minutes (1 hour trainer content, 2 hour lab)

## Overview

Use the GitHub Copilot app for engineering work. Separate exploratory chats from
project sessions and choose Interactive, Plan, or Autopilot based on risk.
Keep concurrent work in isolated working trees.

Follow one synthetic change through a local inner loop and a GitHub-facing outer
loop. Attach files and test output, hand work between sessions, and request an
independent critique. Then inspect an issue and pull-request snapshot and define
a manual read-only automation that reports PR readiness without changing GitHub.

## Learning outcomes

- Choose between a chat and a project session, and between Interactive, Plan, and Autopilot.
- Start isolated work and check the working-tree boundary.
- Hand a task to a fresh session through a written handoff.
- Challenge `/plan` with `/rubber-duck`, compare a `/spar` fork, and run `/review` on the uncommitted repair.
- Connect issue intent, pull-request changes, review threads, and checks.
- Define and run a manual read-only PR-readiness automation.

## You need

**GitHub Copilot app access.** Each learner must be able to open the app, sign in,
connect the local Git training project, and start a working-tree session. Check
that `/plan`, `/review`, `/rubber-duck`, `/fork`, `/merge-to-parent`, and `/spar`
appear in the command picker. Keep the local sandbox and approval settings as they are.

After this session, use the [Session M7-05 developer route](../session-m7-05-orchestrate-workstreams/lab/README.md#developer-route-review-pr-readiness)
to practise supervising independent child sessions. Sessions M7-01 to M7-04 are not
prerequisites for that route.

## Session structure

| Block | Duration | Content |
| --- | ---: | --- |
| Trainer content | 60 min | [Slides](slides.md) and [trainer guide](trainer-content/README.md) |
| Lab | 120 min | [App workflow lab](lab/README.md) |

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab guide | [`lab/README.md`](lab/README.md) |
| Starter project and sample results | [`lab/starter/`](lab/starter/) |
| Reference solution | [`lab/solution/`](lab/solution/) |
| Shared glossary | [`../glossary.md`](../glossary.md) |

All issue text, code, pull-request metadata, checks, and review comments are
synthetic. Don't replace them with customer data, private repository URLs,
secrets, or production logs.

## Product references

The app is evolving. Recheck command names and preview labels before you teach.

- [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)
- [Get started with the GitHub Copilot app](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app)
- [Work with agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Manage issues and pull requests](https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests)
- [Use automations in the app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/using-automations)
- [GitHub Copilot app slash commands](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [About the rubber duck agent](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck)
