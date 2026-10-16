# My GitHub Copilot CLI cheat sheet

> Fill this in during the lab for use as a daily reference.

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

### Top 5 commands (fill in your favorites)

| #   | Command            | What I Use It For   |
| --- | ------------------ | ------------------- |
| 1   | `copilot -p "Explain ___"` | ___        |
| 2   | `copilot -p "Suggest ___"` | ___        |
| 3   | `copilot -p "___"` | ___                 |
| 4   | `___`              | ___                 |
| 5   | `___`              | ___                 |

---

## CLI modes

| Mode         | How to Activate       | When to Use   |
| ------------ | --------------------- | ------------- |
| Interactive  | `copilot`             | ___           |
| Plan         | `/plan` or `Shift+Tab` | ___          |
| Autopilot    | `Shift+Tab` to cycle  | ___           |
| Programmatic | `copilot -p "prompt"` | ___           |

---

## Workflows I will use

| Feature        | Command                     | My Use Case   |
| -------------- | --------------------------- | ------------- |
| Research       | `/research ___`             | ___           |
| Delegate       | `/delegate ___`             | ___           |
| Fleet          | `/fleet ___`                | ___           |
| Task inspection | `/tasks`                   | ___           |
| Usage          | `/usage`                    | ___           |
| Soft limit     | `/limits`                   | Value, unit, scope, and reset behavior checked: ___ |
| Critique       | `/rubber-duck ___`           | ___           |
| Proactive critic | `/subagents`              | Existing setting and persistence: ___ |
| Approval       | `/permissions show`         | ___           |
| Sandbox        | `/sandbox status` and `/sandbox policy` | ___ |
| Recovery       | `/rewind`                   | Conversation-only versus files: ___ |
| Isolated fork  | `/fork worktree`            | ___           |
| Draft move     | `/move`                     | ___           |
| Session resume | `copilot --continue`        | ___           |
| Programmatic   | `copilot -p "___" --silent` | ___           |

---

## My CLI vs IDE decision rules

| Situation           | My Choice   | Why   |
| ------------------- | ----------- | ----- |
| Quick terminal task | ___         | ___   |
| Multi-file coding   | ___         | ___   |
| Script generation   | ___         | ___   |
| Debugging           | ___         | ___   |
| CI/CD automation    | ___         | ___   |
| SSH / remote server | ___         | ___   |
| Code review         | ___         | ___   |

---

## Useful flags

```bash
# I always use these flags:
--silent            # ___
--allow-tool='___'  # ___
--output-format=json # ___
--share=output.md   # ___
```

Which commands are shared with the app? Which workflow needs a terminal?
Use the command picker and current product documentation to check.

| Shortcut | My observed result |
| --- | --- |
| `Ctrl+Q` | ___ |
| `Ctrl+S` | ___ |
| `Ctrl+X, b` then `/tasks` | ___ |

---

## My shell aliases (beyond the defaults)

```bash
# Add custom aliases here as you discover useful patterns
# alias ___="___"
```

---

## Notes from today's lab

_Write what you will use here:_

1. ---
2. ---
3. ---
