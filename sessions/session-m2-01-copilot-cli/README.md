# Session M2-01: GitHub Copilot in the CLI

**Module:** Copilot in Practice
**Difficulty:** Intermediate
**Prerequisites:** Sessions M1-01 to M1-03
**Duration:** 3 hours (1 hr trainer content + 2 hr lab)

## Overview

Use the standalone `copilot` CLI to take over one small Node.js project. Inspect
commands, revise a plan, then fix the project. Then inspect live fleet results,
automate a health report, and compare terminal and IDE workflows. You work in
`agent-tasks` throughout.

## Learning outcomes

- Install and configure the `copilot` CLI.
- Use interactive `copilot` and `copilot -p "..."`.
- Use Standard, Plan, and Autopilot modes for multi-step tasks.
- Revise a `/plan` before approval and trace it to the diff.
- Check a `/rubber-duck` critique.
- Inspect permissions, sandbox policy, and the soft AI-credit limit.
- Queue a follow-up, background a command, and read its real result.
- Recover a disposable edit and tell fork, worktree, move, and resume apart.
- Use `/fleet` and `/tasks` for independent analysis, then check results and usage.
- Tell JSONL events from an answer payload in programmatic output.
- Compare CLI, IDE Chat, IDE Agent Mode, and Copilot App workflows.

## Session materials

| Resource | Location |
| --- | --- |
| Lab exercises | [`lab/`](lab/) |
| Lab starter files | `lab/starter/` |
| Lab solution files | `lab/solution/` |

## Key topics

- Standalone `copilot` binary: installation, authentication, configuration
- Interactive prompts for command explanations; `copilot -p "..."` for command generation
- Shell integrations: aliases, completion, inline invocation
- Agent mode for multi-step terminal tasks
- Copilot App orientation, with plugins and canvas extensions in Session M3-01
- Cross-IDE comparison: VS Code, Visual Studio, JetBrains, Eclipse, Xcode, and others
- When to use the CLI, IDE Chat, IDE Agent Mode, or the Copilot App
- SSH and remote workflows where the CLI is the only option
- Scripting with Copilot: generating and debugging shell scripts
- What context the CLI sends
- Recovery and session controls without broadening permissions
