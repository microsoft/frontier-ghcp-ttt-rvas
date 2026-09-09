# CLI vs IDE Comparison Tasks

Do each task twice: once in the CLI and once in VS Code. Time both attempts and record what you observed.

---

## Task 1: Explain a Complex Regex

**The regex:**

```
^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
```

**CLI approach:**

```bash
copilot -p "Explain this regex: ^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
```

**IDE approach:**

1. Open Copilot Chat in VS Code
2. Paste: "Explain this regex: `^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`"

**Record your comparison:**

| Aspect                           | CLI     | IDE     |
| -------------------------------- | ------- | ------- |
| Time to get answer               | ___ sec | ___ sec |
| Explanation quality (1–5)        | ___     | ___     |
| Could you ask follow-ups easily? | ___     | ___     |
| Which felt more natural?         | ___     | ___     |

**Your verdict for "explain" tasks:** CLI / IDE / Either: ___

---

## Task 2: Generate a Log Processing Script

**The task:** Write a bash script that:

1. Finds all `.log` files in `/var/log/` modified in the last 24 hours
2. Extracts lines containing "ERROR" or "WARN"
3. Counts occurrences per file
4. Outputs a summary sorted by error count (highest first)

**CLI approach:**

```bash
copilot -p "Write a bash script that finds all .log files in /var/log modified in the last 24 hours, extracts ERROR and WARN lines, counts them per file, and outputs a sorted summary" --silent
```

**IDE approach:**

1. Open a new file `log-analyzer.sh` in VS Code
2. Add a comment describing the requirements
3. Let Copilot generate the script
4. Or use Chat: "/new Write a bash script that..."

**Record your comparison:**

| Aspect                         | CLI     | IDE     |
| ------------------------------ | ------- | ------- |
| Time to working script         | ___ sec | ___ sec |
| Script quality (1–5)           | ___     | ___     |
| Could you test it immediately? | ___     | ___     |
| Iteration workflow             | ___     | ___     |

**Your verdict for "generate scripts" tasks:** CLI / IDE / Either: ___

---

## Task 3: Debug a Failing Test

**Setup:** Open the `agent-tasks` project from Exercise 2. If you've already fixed the bugs, reset the project by copying from `starter/agent-tasks/` again.

**The task:** Find and fix the bug that causes the "should filter tasks by status" test to fail.

**CLI approach:**

```bash
copilot
# Then: "Run npm test in the agent-tasks directory. One test is failing — find and fix the bug."
```

**IDE approach:**

1. Open the `agent-tasks` project in VS Code
2. Open Copilot Chat
3. Ask: "Run the tests in this project and fix the failing test"
4. Or use agent mode

**Record your comparison:**

| Aspect                                  | CLI     | IDE     |
| --------------------------------------- | ------- | ------- |
| Time to identify bug                    | ___ sec | ___ sec |
| Time to fix                             | ___ sec | ___ sec |
| Could you see the code while debugging? | ___     | ___     |
| Navigation between files                | ___     | ___     |
| Running tests was easier in             | ___     | ___     |

**Your verdict for "debug" tasks:** CLI / IDE / Either: ___

---

## Summary

| Task Type             | Winner   | Why   |
| --------------------- | -------- | ----- |
| Explain commands/code | ___      | ___   |
| Generate scripts      | ___      | ___   |
| Debug failing tests   | ___      | ___   |

**What I learned from this comparison:** ___
