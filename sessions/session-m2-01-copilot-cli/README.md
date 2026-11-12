# Session M2-01: GitHub Copilot in the CLI

**Module:** Copilot in Practice
**Difficulty:** Intermediate
**Prerequisites:** Sessions M1-01 to M1-03
**Duration:** 3 hours (1 hour trainer content + 2 hour lab)

## Overview

The **Copilot CLI** is the `copilot` command. It runs Copilot as an agent in your terminal. It reads your files, edits code, and runs commands, and it asks before it does anything risky.

You learn the core workflow: start a session, **plan**, approve tools, implement, **review**, and resume later. You also learn when the terminal beats the IDE and when it doesn't. In the lab you fix three real bugs in a small Node.js API. Advanced features (fleet, Autopilot, worktrees, JSONL output) get one slide each and an optional stretch task.

## Learning outcomes

- Install the CLI, sign in, and start an interactive session.
- Choose between interactive mode and one-shot `copilot -p`.
- Use plan mode to agree on a fix before Copilot edits files.
- Use `/help`, `/model`, `/context`, `/compact`, `/diff`, `/review`, `/resume`, `/skills`, and `/mcp`.
- Allow or deny tools on purpose, and know what is safe to approve.
- Add context with `@` file mentions and custom instructions.
- Resume a session and keep its context small.
- Decide when to use the CLI and when to use the IDE.

## You need

Node.js 22 or later, Git, and a GitHub account with Copilot access. Install steps are in the lab.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Starter project | [`lab/starter/agent-tasks/`](lab/starter/agent-tasks/) |
| Fixed project | [`lab/solution/agent-tasks/`](lab/solution/agent-tasks/) |

## Key topics

- Install, sign in, and the first session
- Interactive mode vs `copilot -p`
- Plan mode: plan, then implement, then review
- The slash commands that matter
- Permissions: what to allow, what to deny, and why
- Context: `@` mentions and custom instructions
- Resuming sessions
- CLI vs IDE: pros, cons, tips, and common mistakes
- Advanced, in one slide each: fleet, Autopilot, worktrees, JSONL output
