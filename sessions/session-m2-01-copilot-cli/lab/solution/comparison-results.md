# CLI vs IDE comparison: Expected results

These are example findings from the same tasks in the CLI and IDE. Your results will vary with the task and your familiarity with each surface.

---

## Task 1: Explain a complex regex

**The regex:** `^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`

| Aspect              | CLI                                         | IDE                                      |
| ------------------- | ------------------------------------------- | ---------------------------------------- |
| Time to get answer  | ~5 sec (immediate)                          | ~5 sec (immediate)                       |
| Explanation quality | 4/5: thorough and command-focused           | 4/5: thorough, may include visual aids   |
| Follow-up ability   | Good; stay in the same session              | Good; stay in the same chat thread       |
| Natural feel        | Very natural for a quick question           | Slightly more overhead (open chat panel) |

**Either works equally well** for this Q&A task. The
CLI is slightly faster when you are already in the terminal. The IDE is faster when
you are already in the editor.

---

## Task 2: Generate a log processing script

| Aspect                 | CLI                            | IDE                                      |
| ---------------------- | ------------------------------ | ---------------------------------------- |
| Time to working script | ~20 sec (programmatic mode)    | ~30 sec (create file, add comment, wait) |
| Script quality         | 4/5: production-ready and tested | 4/5: similar quality                     |
| Test immediately?      | Yes; run it there               | Need to open terminal                    |
| Iteration workflow     | Fast; edit prompt and rerun      | Slower; edit comment and regenerate      |

**The CLI is faster for scripts.** Programmatic mode (`-p`) writes
the script to stdout, so you can pipe, redirect, or inspect it at once. In the IDE,
you create a file and then switch to a terminal to test it.

---

## Task 3: Debug a failing test

| Aspect                    | CLI                                              | IDE                                         |
| ------------------------- | ------------------------------------------------ | ------------------------------------------- |
| Time to identify bug      | ~30 sec (agent reads files, runs tests)          | ~20 sec (can see code + errors together)    |
| Time to fix               | ~15 sec (agent edits file)                       | ~15 sec (accept suggestion)                 |
| See code while debugging? | Agent shows snippets but no full editor view     | Full editor with syntax highlighting         |
| File navigation           | Agent navigates by reading files sequentially    | Click to open, Ctrl+P to search               |
| Running tests             | Agent runs them automatically                    | Need to open terminal or use test runner     |

**The IDE is better for debugging.** Visual navigation and
side-by-side files make defects easier to trace. The CLI agent can debug the same
project, but you see only the code and output it shows you.

---

## Overall summary

| Task Type             | Winner     | Key Reason                              |
| --------------------- | ---------- | --------------------------------------- |
| Explain commands/code | **Either** | Both equally fast for simple Q&A        |
| Generate scripts      | **CLI**    | Programmatic mode + immediate testing   |
| Debug failing tests   | **IDE**    | Visual code navigation + seeing context |

---

## The decision framework

These results suggest the following choices:

| Factor                     | Favors CLI      | Favors IDE     |
| -------------------------- | --------------- | -------------- |
| Visual context needed      | No                | Yes             |
| Multiple files to move between | No            | Yes             |
| Quick command/script       | Yes               | No              |
| Already in terminal        | Yes               | No              |
| Already in editor          | No                | Yes             |
| Need to test immediately   | Yes               | No              |
| Autonomous multi-step work | Yes (autopilot)   | Yes (agent mode) |
| Pipeline/automation        | Yes               | No              |
| No GUI available (SSH)     | Yes (only option) | No              |

**Starting rule:** Use the IDE when you need visual code context. Use the CLI for terminal work or automation.
