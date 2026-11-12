---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M2-02: IDE Agent Workflows'
---

<!-- _class: lead -->

# Agent mode in the IDE

## Plan first, review the diff, stay in charge

Session M2-02 | 3 hours

---

<!-- _class: agenda -->

# Agenda

| Segment | Time |
| --- | --- |
| Four modes | 10 min |
| What agent mode can touch | 12 min |
| Steering | 13 min |
| Agent mode vs CLI vs cloud agent | 8 min |
| Demo | 12 min |
| Pros, cons, mistakes | 5 min |

---

# Four modes

| Mode | What it does | Changes files? |
| --- | --- | --- |
| **Ask** | Answers questions about your code | No |
| **Edit** | Edits the files you pick, in one pass | Yes, only those |
| **Agent** | Finds files, edits, runs commands, loops | Yes, and runs things |
| **Plan** | Researches and writes a plan | No, until you approve |

Pick the **smallest mode** that does the job. Current VS Code lists Ask, Agent, and Plan. Check what your picker shows for Edit.

---

# What agent mode does

```text
You: prompt
  → Copilot picks a tool and asks the editor to run it
  → the editor runs it and returns the result
  → Copilot reads the result and picks the next tool
  → ... until done, or it asks you
```

A **tool** is an action the editor can run for the model.

---

# Tools

| Tool kind | Examples |
| --- | --- |
| **Read** | Open a file, list a folder |
| **Search** | Find text or symbols in the workspace |
| **Edit** | Change or create files |
| **Terminal** | Run `npm test`, `git status` |
| **MCP** | Tools from servers you add: issues, databases, docs |

Open the **tools picker** in chat to see and switch them off.

---

# Trust: what it can touch

- **Your files.** It edits them directly. Git is your safety net.
- **Your terminal.** Commands run as you. Each one asks first.
- **MCP servers.** They can reach outside systems with your credentials.
- **Text it reads.** A file or web page can contain instructions. Treat it as untrusted.

You are the **review step**. Nothing else is.

---

# Steering

1. **Plan first.** Use Plan mode, or say "plan, don't edit yet".
2. **Be specific.** Goal, files, how to check it.
3. **Watch the tool calls.** Stop it if it wanders.
4. **Review every diff.** Keep or undo per file.
5. **Undo with checkpoints.** Restore chat to an earlier point.
6. **Read terminal commands** before you allow them.

---

# Terminal approval

Agent mode asks before it runs a command. You can:

- Allow once.
- Allow a command prefix for this session, or always.
- Auto-approve chosen commands with `chat.tools.terminal.autoApprove`.

**Tip:** auto-approve `npm test`. Keep asking for anything that deletes, installs, or pushes.

Menu labels vary by version. Check the current docs.

---

# Agent mode, CLI, cloud agent

| | IDE agent mode | Copilot CLI (M2-01) | Cloud agent (M3-02) |
| --- | --- | --- | --- |
| **Runs** | Your machine, in VS Code | Your machine, in a terminal | GitHub, in its own environment |
| **You are** | Watching, in the editor | Watching, in the terminal | Away until the PR |
| **Result** | Edits in your working tree | Edits in your working tree | A pull request |
| **Best for** | Feature work with diff review | Terminal tasks, scripts | Well-defined tasks you can hand off |

---

# TODO code action

```js
// TODO: Add GET /export that returns all notes as CSV.
```

With the **GitHub Pull Requests** extension, a lightbulb appears. Pick **Delegate to coding agent**. The cloud agent opens a pull request.

Good for **small, well-described** tasks. You review the PR.

---

# Demo

Same prompt, two modes. Then agent mode with a plan.

- **Ask:** explains what to change.
- **Agent:** changes it and runs the tests.

Watch the tool calls, then the diff.

---

# Pros and cons

| Pros | Cons |
| --- | --- |
| Multi-file changes in one go | Can edit more than you wanted |
| Runs tests and fixes failures | Long runs are hard to review |
| Sees your real project | Wrong assumptions hide in big diffs |
| Easy to undo | Slower than a quick Ask |

---

# Common mistakes

- **Vague prompt.** "Add tags" gets guesses. Name the behavior.
- **No plan.** Big tasks drift.
- **Skipping the diff.** Accepting all without reading.
- **Blanket auto-approve.** One bad command costs more than the clicks.
- **Giant tasks.** Split them.
- **No tests.** The agent has nothing to check against.

---

<!-- _class: lead -->

# Lab

## Add a feature with agent mode

Plan, build, review, fix, delegate.
