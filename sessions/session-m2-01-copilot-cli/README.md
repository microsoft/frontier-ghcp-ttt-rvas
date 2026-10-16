# Session m2-01: GitHub Copilot in the CLI

**Module:** Copilot in Practice
**Difficulty:** Intermediate
**Prerequisites:** Sessions m1-01 to m1-03
**Duration:** 3 hours (1 hr trainer content + 2 hr lab)

## Overview

Use the standalone `copilot` CLI to take over one small Node.js project. Learners
inspect commands, revise an implementation plan, and fix the project. They also
inspect live fleet results and automate a project health report. Finally, they
compare terminal and IDE workflows. The `agent-tasks` project ties the lab together
from the first command through the final handoff.

## Learning outcomes

- Install and configure the standalone `copilot` CLI and shell workflows.
- Use interactive `copilot` and `copilot -p "..."` for command-line help.
- Use Standard, Plan, and Autopilot modes for multi-step tasks.
- Revise a `/plan` before approval and trace it to the implementation diff.
- Check a `/rubber-duck` critique and inspect its persistent proactive-invocation setting.
- Inspect permissions, sandbox policy, and the installed version's soft-limit scope.
- Queue a follow-up, background a command, and inspect its actual result.
- Recover a disposable edit and distinguish fork, worktree, move, and resume.
- Use `/fleet` and `/tasks` for independent analysis, then check results and usage.
- Distinguish JSONL events from an answer payload in programmatic output.
- Compare CLI, IDE Chat, IDE Agent Mode, and Copilot App workflows.
- Identify CLI-specific features and when the CLI fits better than the IDE.
- Check Copilot App and cross-IDE support in the training environment.
- Produce test output, an automation artifact, and a surface-choice record at clear review checkpoints.

## Session materials

| Resource                | Location                               |
| ----------------------- | -------------------------------------- |
| Lab exercises           | [`lab/`](lab/)                         |
| Lab starter files       | `lab/starter/`         |
| Lab solution files      | `lab/solution/`       |

## Key topics

- Standalone `copilot` binary: installation, authentication, configuration
- Interactive `copilot` prompts for natural-language command explanations
- `copilot -p "..."` for command generation from intent descriptions
- Shell integrations: aliases, shell completion, inline invocation
- CLI agent mode: autonomous multi-step terminal tasks
- Terminal automation and shared CLI/app commands
- Copilot App orientation and handoff to Session m3-01 for plugins and canvas extensions
- Cross-IDE comparison: VS Code, Visual Studio, JetBrains, Eclipse, Xcode, and others
- Decision framework: when to use CLI vs. IDE Chat vs. IDE Agent Mode vs. Copilot App
- SSH and remote workflows where CLI is the only option
- Scripting with Copilot: generating and debugging shell scripts
- Security considerations: what context the CLI sends, privacy implications
- Recovery and session controls without broadening permissions
