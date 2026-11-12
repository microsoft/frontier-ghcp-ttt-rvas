# Session M2-02: Agent mode in the IDE

**Module:** Copilot in Practice
**Difficulty:** Intermediate
**Prerequisites:** Sessions M1-01 to M1-03, M2-01
**Duration:** 3 hours (1 hr trainer content + 2 hr lab)

## Overview

**Agent mode** lets Copilot in VS Code work through a task on its own. It reads files, edits several of them, runs commands, reads the output, and keeps going until the task is done or it needs you.

You learn how Ask, Edit, Agent, and Plan modes differ, what tools agent mode uses, and how to steer it. Then you build one multi-file feature in a small Node.js project: plan first, review the diff, ask for a fix, and hand a TODO comment to the cloud agent.

## Learning outcomes

- Pick the right mode for a task: Ask, Edit, Agent, or Plan.
- Name the tools agent mode uses: read, search, edit, terminal, and MCP.
- Steer agent mode: plan first, review diffs, undo with checkpoints, approve terminal commands.
- Explain how agent mode differs from the Copilot CLI (M2-01) and the cloud agent (M3-02).
- Compare Ask and Agent output on the same prompt.
- Delegate a TODO comment to the cloud agent from the editor.
- Spot the common mistakes: vague prompts, skipped review, and blanket auto-approval.

## You need

VS Code with GitHub Copilot Chat, Node.js 20 or later, and Git. The TODO step also needs the GitHub Pull Requests extension and a GitHub repository you own with the cloud agent enabled.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Starter project | [`lab/starter/notes-api/`](lab/starter/notes-api/) |
| Finished project | [`lab/solution/notes-api/`](lab/solution/notes-api/) |

## Key topics

- Ask, Edit, Agent, and Plan modes
- Tools: read, search, edit, terminal, MCP
- Steering: plan first, review diffs, checkpoints, command approval
- Trust: what the agent can touch and what you must read
- Agent mode vs the CLI and the cloud agent
- TODO code actions
- Pros, cons, tips, and common mistakes
