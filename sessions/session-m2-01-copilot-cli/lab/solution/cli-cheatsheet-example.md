# GitHub Copilot CLI cheat sheet: Example

> Example completed cheat sheet. Make yours reflect your preferences and workflow.

---

## Quick reference

### Installation & setup

```bash
# Install
npm install -g @github/copilot
# or: brew install --cask github-copilot-cli
# or: winget install GitHub.Copilot

# Verify
copilot --version
```

### Top 5 commands

| #   | Command                        | What I Use It For                                           |
| --- | ------------------------------ | ----------------------------------------------------------- |
| 1   | `copilot -p "Explain: command"` | Quick explanations of unfamiliar commands found in scripts  |
| 2   | `copilot -p "Suggest a command to ..."` | Generate commands I can't remember the flags for     |
| 3   | `copilot -p "prompt" --silent` | Automate report generation in scripts                       |
| 4   | `/plan` | Review and revise the approach before implementation |
| 5   | `/research topic`              | Research before adopting a new library or approach        |

---

## CLI modes

| Mode         | How to Activate       | When to Use                                         |
| ------------ | --------------------- | --------------------------------------------------- |
| Interactive  | `copilot`             | General work: conversations and multi-step tasks    |
| Plan         | `/plan` or `Shift+Tab` | Review and revise the approach before execution |
| Autopilot    | `Shift+Tab` to cycle  | Trusted tasks I know are safe to run autonomously   |
| Programmatic | `copilot -p "prompt"` | Scripts, CI/CD, automation, one-shot tasks          |

---

## Workflows I will use

| Feature        | Command                     | My Use Case                                   |
| -------------- | --------------------------- | --------------------------------------------- |
| Research       | `/research "topic"`         | Evaluate libraries before adding to project   |
| Delegate       | `/delegate "task"`          | Push documentation tasks to cloud agent       |
| Fleet          | `/fleet "multi-part task"`  | Parallel code reviews across multiple files   |
| Task inspection | `/tasks`                  | Inspect results and stop out-of-scope work |
| Usage          | `/usage`                    | Check observed usage after parallel work |
| Soft limit     | `/limits`                   | Inspect units and installed-version scope; not a hard budget |
| Critique       | `/rubber-duck`              | Check a second opinion before approving a plan |
| Proactive critic | `/subagents`              | Inspect persistent opt-in; do not change it for this lab |
| Approval       | `/permissions show`         | Inspect current tool-approval mode |
| Sandbox        | `/sandbox status` and `/sandbox policy` | Inspect process access without weakening it |
| Recovery       | `/rewind`                   | Choose conversation-only or conversation-plus-files, then check |
| Isolated fork  | `/fork worktree`            | Preserve context in a new checkout of HEAD |
| Draft move     | `/move`                     | Transfer an uncommitted analysis note to a new worktree |
| Session resume | `copilot --continue`        | Pick up where I left off after lunch          |
| Programmatic   | `copilot -p "..." --silent` | Generate changelogs, reports, audit summaries |

---

## My CLI vs IDE decision rules

| Situation           | My Choice   | Why                                              |
| ------------------- | ----------- | ------------------------------------------------ |
| Quick terminal task | CLI         | Already there, no context switch                 |
| Multi-file coding   | IDE         | Need to see code and move between files          |
| Script generation   | CLI         | Programmatic mode + immediate testing            |
| Debugging           | IDE         | Visual context is essential for debugging        |
| CI/CD automation    | CLI         | `-p` mode is scriptable, IDE isn't               |
| SSH / remote server | CLI         | Only option because no GUI is available           |
| Code review         | Either      | CLI `/review` for diffs, IDE for inline comments |

---

## Useful flags

```bash
# Flags I use regularly:
--silent            # Suppress CLI commentary; still check the answer format
--allow-tool='shell(git)'  # Pre-approve specific tools to avoid prompts
--output-format=json # JSONL events; inspect task errors and validate any payload
--share=output.md   # Save session to file for documentation
--effort=high       # Deeper reasoning for complex problems
--max-autopilot-continues=10  # Safety cap on autonomous iterations
```

---

## My shell aliases

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

## Key shortcuts (interactive mode)

| Shortcut    | Action                                    |
| ----------- | ----------------------------------------- |
| `Shift+Tab` | Cycle modes (standard → plan → autopilot) |
| `Esc`       | Cancel current operation                  |
| `!command`  | Run shell command directly                |
| `@filename` | Include file in prompt context            |
| `Ctrl+T`    | Toggle reasoning visibility               |
| `Ctrl+Q`    | Queue a follow-up; check it ran after the current task |
| `Ctrl+S`    | Stash/restore an unsent draft |
| `Ctrl+X, b` | Promote a running task/command; inspect `/tasks` |
| `/rewind`   | Inspect recovery choice; not an external-action undo |
| `/compact`  | Free up context window                    |

---

## Notes from today's lab

1. **Programmatic mode fits scripts.** I can use it in bash pipelines for reports, changelogs, and audits.
2. **Autopilot can make several changes without stopping.** Set `--max-autopilot-continues` until you understand its behavior for a task.
3. **Commands can be shared across surfaces.** The app also supports `/plan`,
   `/fleet`, and `/research`. Terminal automation is the reason to choose the CLI.
4. **Choose from the task results.** Visual navigation may favor the IDE;
   terminal automation may favor the CLI.
5. **Check `/research` claims and sources.** Compare its usefulness with regular
   chat rather than judging the answer by its length.
