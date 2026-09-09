# GitHub Copilot CLI Cheat Sheet — Example

> Example completed cheat sheet. Make yours reflect your preferences and workflow.

---

## Quick Reference

### Installation & Setup

```bash
# Install
npm install -g @github/copilot
# or: brew install --cask github-copilot-cli
# or: winget install GitHub.Copilot

# Verify
copilot --version
```

### Top 5 Commands

| #   | Command                        | What I Use It For                                           |
| --- | ------------------------------ | ----------------------------------------------------------- |
| 1   | `copilot -p "Explain: command"` | Quick explanations of unfamiliar commands found in scripts  |
| 2   | `copilot -p "Suggest a command to ..."` | Generate commands I can't remember the flags for     |
| 3   | `copilot -p "prompt" --silent` | Automate report generation in scripts                       |
| 4   | `copilot` → `Shift+Tab` → Plan | Complex multi-step tasks where I want to see the plan first |
| 5   | `/research topic`              | Deep dives before adopting a new library or approach        |

---

## CLI Modes

| Mode         | How to Activate       | When to Use                                         |
| ------------ | --------------------- | --------------------------------------------------- |
| Interactive  | `copilot`             | General work — conversations, multi-step tasks      |
| Plan         | `Shift+Tab` to cycle  | When I want to review the approach before execution |
| Autopilot    | `Shift+Tab` to cycle  | Trusted tasks I know are safe to run autonomously   |
| Programmatic | `copilot -p "prompt"` | Scripts, CI/CD, automation, one-shot tasks          |

---

## CLI-Exclusive Features I Will Use

| Feature        | Command                     | My Use Case                                   |
| -------------- | --------------------------- | --------------------------------------------- |
| Research       | `/research "topic"`         | Evaluate libraries before adding to project   |
| Delegate       | `/delegate "task"`          | Push documentation tasks to cloud agent       |
| Fleet          | `/fleet "multi-part task"`  | Parallel code reviews across multiple files   |
| Session resume | `copilot --continue`        | Pick up where I left off after lunch          |
| Programmatic   | `copilot -p "..." --silent` | Generate changelogs, reports, audit summaries |

---

## My CLI vs IDE Decision Rules

| Situation           | My Choice   | Why                                              |
| ------------------- | ----------- | ------------------------------------------------ |
| Quick terminal task | CLI         | Already there, no context switch                 |
| Multi-file coding   | IDE         | Need to see code and move between files          |
| Script generation   | CLI         | Programmatic mode + immediate testing            |
| Debugging           | IDE         | Visual context is essential for debugging        |
| CI/CD automation    | CLI         | `-p` mode is scriptable, IDE isn't               |
| SSH / remote server | CLI         | Only option — no GUI available                   |
| Code review         | Either      | CLI `/review` for diffs, IDE for inline comments |

---

## Useful Flags

```bash
# Flags I use regularly:
--silent            # Clean output for scripting — no stats, no formatting
--allow-tool='shell(git)'  # Pre-approve specific tools to avoid prompts
--yolo              # Skip ALL approval prompts (only for trusted tasks!)
--output-format=json # Machine-readable output for piping to jq
--share=output.md   # Save session to file for documentation
--effort=high       # Deeper reasoning for complex problems
--max-autopilot-continues=10  # Safety cap on autonomous iterations
```

---

## My Shell Aliases

```bash
# Quick explain and suggest helpers
explain() { copilot -p "Explain this command: $*"; }
suggest() { copilot -p "Suggest a command for: $*"; }

# Custom aliases
alias cop='copilot'
alias copa='copilot --autopilot'
copq() { copilot -p "$*" --silent; }  # Quick one-shot, clean output

# Generate changelog (useful before releases)
alias changelog='copilot -p "Generate a changelog from the last 20 commits, grouped by type (feat, fix, chore)" --allow-tool="shell(git)" --silent'

# Quick code review of staged changes
alias cr='copilot -p "Review my staged git changes. Focus on bugs, security issues, and logic errors." --allow-tool="shell(git)" --silent'
```

---

## Key Shortcuts (Interactive Mode)

| Shortcut    | Action                                    |
| ----------- | ----------------------------------------- |
| `Shift+Tab` | Cycle modes (standard → plan → autopilot) |
| `Esc`       | Cancel current operation                  |
| `!command`  | Run shell command directly                |
| `@filename` | Include file in prompt context            |
| `Ctrl+T`    | Toggle reasoning visibility               |
| `/undo`     | Revert last change                        |
| `/compact`  | Free up context window                    |

---

## Notes from Today's Lab

1. **Programmatic mode fits scripts.** I can use it in bash pipelines for reports, changelogs, and audits.
2. **Autopilot can make several changes without stopping.** Set `--max-autopilot-continues` until you understand its behavior for a task.
3. **The CLI sees ~40% more features than the IDE.** `/research`, `/delegate`, `/fleet`, custom model providers, hooks, and OTel are all CLI-only.
4. **Use the IDE to debug and the CLI to automate.** That is the rule I will start with.
5. **`/research` produces significantly deeper output than regular chat** — worth the extra wait time for important decisions.
