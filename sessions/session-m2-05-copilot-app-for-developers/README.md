---
description: "Use the GitHub Copilot app for the developer inner loop: sessions, worktrees, modes, review, and PRs"
---

# Session M2-05: GitHub Copilot app for developers

**Module:** Module 2: Copilot in Practice

**Difficulty:** Intermediate

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04

**Duration:** 180 minutes (1 hour trainer content, 2 hour lab)

## Overview

The **GitHub Copilot app** is a desktop app for directing coding agents. It is built on the Copilot CLI and adds a session list, isolated workspaces, a diff view, and issue and pull request screens.

This session covers the developer **inner loop**: scope a bug, let an agent fix it in its own **git worktree**, review the diff, and open a PR. You learn what a session and a workspace are, what Interactive, Plan, and Autopilot each do, and how the app compares with IDE agent mode and the CLI.

In the lab you fix a real bug in a throwaway GitHub repo, run two sessions side by side, and open a real pull request.

Other sessions cover the rest of the app. [Session M7-01](../session-m7-01-copilot-app-foundations/README.md) tours the app for non-developers and context briefs. [Session M3-01](../session-m3-01-copilot-app-canvases/README.md) covers canvases and plugins. [Session M7-05](../session-m7-05-orchestrate-workstreams/lab/README.md#developer-route-review-pr-readiness) covers supervising many child sessions.

## Learning outcomes

- Explain sessions, chats, and workspaces, and how a git worktree isolates parallel work.
- Choose Interactive, Plan, or Autopilot, and name the failure mode of each.
- Keep mode, tool permissions, and sandbox settings apart in your head.
- Use `/plan`, `/review`, `/rubber-duck`, `/fork`, `/spawn`, `/pr-open`, and related commands, and know to check the picker for your version.
- Hand work to a fresh or child session without losing context.
- Review an agent's diff, open a PR from the app, and read its checks.
- Choose between the app, IDE agent mode, and the CLI for a task.

## You need

The GitHub Copilot app, signed in. Git, Python 3.10 or later, and the `gh` CLI signed in to GitHub. A GitHub account where you can create a **private throwaway repo**. Without one, you can do Parts 1 to 5 locally.

## Session structure

| Block | Duration | Content |
| --- | ---: | --- |
| Trainer content | 60 min | [Slides](slides.md) and [trainer guide](trainer-content/README.md) |
| Lab | 120 min | [Fix a bug in the app and open a PR](lab/README.md) |

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab guide | [`lab/README.md`](lab/README.md) |
| Starter repo (four failing tests) | [`lab/starter/`](lab/starter/) |
| Reference fix and sample comparison note | [`lab/solution/`](lab/solution/) |
| Shared glossary | [`../glossary.md`](../glossary.md) |

## Key topics

- Chats vs project sessions
- Workspaces: new worktree vs current checkout
- Interactive, Plan, and Autopilot: when, trade-offs, failure modes
- Tool permissions and sandboxes (separate from mode)
- Slash commands that exist in the app
- Handoff: `/fork`, `/spawn`, `/compact`, a fresh session
- Review, `/pr-open`, checks, and Agent Merge
- App vs IDE agent mode vs CLI

## Product references

The app changes often. Check the docs and `/` in your version before you teach.

- [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/copilot-surfaces/github-copilot-app)
- [Get started with the GitHub Copilot app](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app)
- [Work with agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Manage issues and pull requests](https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests)
- [Slash commands for the app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [About local sandboxing](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes)
