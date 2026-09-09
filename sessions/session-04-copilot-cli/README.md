# Session 04 — GitHub Copilot in the CLI

**Module:** Copilot in Practice
**Difficulty:** Intermediate
**Prerequisites:** Sessions 01–03
**Duration:** 3 hours (1 hr trainer content + 2 hr lab)

## Overview

Cover GitHub Copilot's terminal-native experience through the standalone `copilot` CLI. Learners explain commands, generate shell scripts, troubleshoot errors, and run multi-step agent tasks from the terminal. The session compares CLI and IDE workflows so trainers can help teams choose a suitable surface.

## Learning Outcomes

- Install and configure the standalone `copilot` CLI and shell workflows.
- Use interactive `copilot` and `copilot -p "..."` for command-line help.
- Use Standard, Plan, and Autopilot modes for multi-step tasks.
- Compare CLI, IDE Chat, IDE Agent Mode, and Copilot App workflows.
- Identify CLI-specific features and when the CLI fits better than the IDE.
- Check Copilot App and cross-IDE support for the approved environment.

## Session Materials

| Resource                | Location                               |
| ----------------------- | -------------------------------------- |
| Lab exercises           | [`lab/`](lab/)                         |
| Lab starter files       | `lab/starter/`         |
| Lab solution files      | `lab/solution/`       |

## Key Topics

- Standalone `copilot` binary: installation, authentication, configuration
- Interactive `copilot` prompts — natural language command explanations
- `copilot -p "..."` — command generation from intent descriptions
- Shell integrations: aliases, shell completion, inline invocation
- CLI agent mode: autonomous multi-step terminal tasks
- CLI-exclusive features: piping output to Copilot, log analysis, environment debugging
- Copilot App orientation and handoff to Session 08 for plugins and canvas extensions
- Cross-IDE comparison: VS Code, Visual Studio, JetBrains, Eclipse, Xcode, and others
- Decision framework: when to use CLI vs. IDE Chat vs. IDE Agent Mode vs. Copilot App
- SSH and remote workflows where CLI is the only option
- Scripting with Copilot: generating and debugging shell scripts
- Security considerations: what context the CLI sends, privacy implications
