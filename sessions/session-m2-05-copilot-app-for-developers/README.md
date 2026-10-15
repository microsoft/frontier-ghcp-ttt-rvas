---
description: "Use the GitHub Copilot app for isolated, evidence-backed engineering work"
---

# Session m2-05: GitHub Copilot App for Developers

**Module:** Module 2: Copilot in Practice

**Difficulty:** Intermediate

**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04

**Duration:** 180 minutes (1 hour trainer content, 2 hour lab)

## Overview

This session teaches the GitHub Copilot app as an engineering workspace, not a
larger chat window. Learners separate exploratory chats from project sessions,
choose Interactive, Plan, or Autopilot based on risk, and keep concurrent work in
isolated working trees.

The lab follows one synthetic change through a tight inner loop and a GitHub-facing
outer loop. Learners attach evidence, hand work between sessions, request an
independent critique, inspect an issue and pull-request snapshot, and define a
manual read-only automation that reports PR readiness without changing GitHub.

## Learning outcomes

By the end of this session, learners can:

- Choose between a chat and a project session.
- Explain when to use Interactive, Plan, or Autopilot.
- Start isolated work and verify the branch or working-tree boundary.
- Attach only the files needed for the next decision.
- Hand a task to a fresh session without relying on hidden conversation history.
- Use tests, diffs, and command output as evidence in the inner loop.
- Challenge `/plan` with `/rubber-duck` before implementation and record the revision.
- Explain the critic's read-only role and automatic contrasting-model selection.
- Compare a `/spar` argument in a checked fork and review `/merge-to-parent`.
- Run `/review` on the uncommitted repair and check its findings.
- Connect issue intent, pull-request changes, review threads, and checks.
- Request an independent critique before declaring work ready.
- Define and run a manual read-only PR-readiness automation.

## Access policy

**GitHub Copilot app access is required.** Before the session,
check that each learner can open the app, sign in, connect the local Git training
project, and start a working-tree session. Check `/plan`, `/review`, and
`/rubber-duck` in the command picker.
The lab also requires `/fork`, `/merge-to-parent`, and `/spar`. Check local
sandbox and approval settings before the run; do not weaken them for the exercise.

If app access is unavailable, learners must not improvise with customer repositories
or paste protected code into another service. Stop the lab if app access or a
required command is unavailable.

After this session, use the [Session m7-05 developer route](../session-m7-05-orchestrate-workstreams/lab/README.md#developer-route-review-pr-readiness)
to practise supervising independent child sessions. Sessions m7-01 to m7-04 are not
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
| Starter project and evidence | [`lab/starter/`](lab/starter/) |
| Reference solution | [`lab/solution/`](lab/solution/) |
| Shared glossary | [`../glossary.md`](../glossary.md) |

## Data boundary

All issue text, code, pull-request metadata, checks, and review comments in this
session are synthetic. Do not replace them with customer names, tenant details,
private repository URLs, secrets, or production logs.

## Product references

These references were checked on **October 15, 2026**. The app is evolving, so
trainers should recheck command names and preview labels before delivery.

- [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)
- [Get started with the GitHub Copilot app](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app)
- [Work with agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Manage issues and pull requests](https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests)
- [Use automations in the app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/using-automations)
- [GitHub Copilot app slash commands](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [About the rubber duck agent](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck)
