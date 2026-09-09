# Session 04 Lab — GitHub Copilot in the CLI

**Duration:** 2 hours  
**Difficulty:** Intermediate  
**Prerequisites:** Sessions 01–03 completed, GitHub CLI (`gh`) installed  
**Deliverable:** A CLI workflow cheat sheet + a fixed Node.js project + a completed pipeline script

---

## Lab Overview

Use the standalone CLI from the terminal. Explain and generate commands, work through agent tasks, try programmatic mode and `/research`, then compare CLI and IDE workflows. Record the commands and workflow choices you would use.

| Exercise   | Topic                                     | Time   |
| ---------- | ----------------------------------------- | ------ |
| 1          | CLI Setup & First Commands                | 25 min |
| 2          | CLI Agent Mode                            | 30 min |
| 3          | CLI-Exclusive Features                    | 35 min |
| 4          | CLI vs IDE Comparison & Workflow Patterns | 30 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Confirm that the [Copilot CLI](https://docs.github.com/en/copilot/get-started/cli-quickstart), its authentication method, and terminal access are approved.

## If access is unavailable

Complete the command-analysis and workflow exercises with shell documentation and peer review. Keep the prompts in the cheat sheet, but do not run them against customer repositories.

---

## Before You Start

### Prerequisites Checklist

- [ ] Customer administrator confirmation that standalone CLI access is permitted (see the preflight).
- [ ] GitHub CLI (`gh`) installed — [Install guide](https://cli.github.com/)
- [ ] Node.js 22+ installed (for `npm` installation method)
- [ ] Terminal access (macOS Terminal, Windows Terminal/WSL, or Linux terminal)
- [ ] VS Code installed (for Exercise 4 comparison)

### Verify Your Setup

```bash
# Check GitHub CLI
gh --version
# Expected: gh version 2.x.x or higher

# Check Node.js
node --version
# Expected: v22.x.x or higher

# Check GitHub auth
gh auth status
# Expected: Logged in to github.com
```

> **Troubleshooting:** If `gh auth status` shows you're not logged in, run `gh auth login` and follow the prompts. Choose HTTPS and authenticate via browser.

---

## Exercise 1: CLI Setup & First Commands (25 min)

### Objective

Install the GitHub Copilot standalone CLI, verify it's working, and use it to explain commands and generate suggestions interactively.

### Part A: Installation (5 min)

1. **Install the Copilot CLI** (choose one method):

   ```bash
   # Via npm (recommended — requires Node.js 22+)
   npm install -g @github/copilot

   # Via Homebrew (macOS)
   brew install --cask github-copilot-cli

   # Via WinGet (Windows)
   winget install GitHub.Copilot
   ```

2. **Verify installation:**

   ```bash
   copilot --version
   ```

   **Expected:** A version number (e.g., `v1.x.x` or higher).

3. **Authenticate (if needed):**

   ```bash
   copilot
   /login
   ```

   This triggers an OAuth device flow — follow the browser prompts.

4. **Verify you can start a session:**

   ```bash
   copilot
   ```

   **Expected:** The interactive Copilot CLI prompt, ready for input.

   Type `/exit` to leave the session for now.

### Troubleshooting

| Problem                          | Solution                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------ |
| `copilot: command not found`     | Ensure Node.js 22+ is installed, or try `npx @github/copilot`                 |
| Authentication fails             | Run `copilot` then `/login`, or set `GH_TOKEN` environment variable           |
| "Copilot isn't enabled" error    | Verify your GitHub account has Copilot access at github.com/settings/copilot   |
| Permission denied during install | On Linux/macOS, you may need `sudo` for global npm install, or use `nvm`      |

---

### Part B: Explain Commands (10 min)

Open `lab/starter/explain-challenges.md`. The file has five commands, from simple to complex. For each one:

1. Launch the CLI with `copilot` and ask it to explain the command (e.g., "Explain what this command does: `<command>`")
2. Read the explanation Copilot provides
3. Rate the explanation quality (1–5) — Was it accurate? Did it cover edge cases?
4. Note anything the explanation missed or got wrong

**Work through all 5 challenges:**

| #   | Command                                                                                | Complexity       | What to Look For                                     |
| --- | -------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------- |
| 1   | `ls -la`                                                                               | Simple           | Does it explain each flag?                           |
| 2   | `find . -name "*.log" -mtime +7 -delete`                                               | Moderate         | Does it warn about deletion?                         |
| 3   | `git log --oneline --graph --all --decorate`                                           | Git-specific     | Does it explain each flag's visual effect?           |
| 4   | `tar czf backup.tar.gz --exclude='node_modules' --exclude='.git' ./src`                | Multi-flag       | Does it explain the compression and exclusions?      |
| 5   | `awk -F',' '{sum[$1]+=$3; count[$1]++} END {for (k in sum) print k, sum[k]/count[k]}'` | Complex pipeline | Does it explain the associative arrays and the math? |

**After completing all 5, compare your notes with `lab/solution/explain-answers.md`.**

---

### Part C: Suggest Commands (10 min)

Open `lab/starter/suggest-challenges.md`. The file has five tasks written in plain language. For each one:

1. In the Copilot CLI session, describe the task and ask for a command (e.g., "Give me a command to find all Python files larger than 1MB")
2. Review the suggested command — does it do what you asked?
3. Try running the suggested command (or note what it would do)
4. If the suggestion isn't quite right, refine your description and try again

**Work through all 5 challenges:**

| #   | Task                                                        | Type   | What to Look For                               |
| --- | ----------------------------------------------------------- | ------ | ---------------------------------------------- |
| 1   | Find all Python files larger than 1MB                       | shell  | Does it use `find` with `-size`?               |
| 2   | Show commits from the last 7 days by a specific author      | git    | Does it use `--since` and `--author`?          |
| 3   | Create a new branch, make a commit, and push in one line    | git    | Does it chain the commands correctly?          |
| 4   | Find the top 10 largest files in the current directory tree | shell  | Does it use `du` or `find` + `sort`?           |
| 5   | List all open issues assigned to you in a specific repo     | gh     | Does it use `gh issue list` with `--assignee`? |

**After completing all 5, compare with `lab/solution/suggest-answers.md`.**

### Exercise 2 check

By the end of Exercise 1:

- [ ] Copilot CLI is installed and working (`copilot --version`)
- [ ] You can start an interactive session with `copilot`
- [ ] You've explained 5 commands and understand what Copilot covers well vs. misses
- [ ] You've generated commands for 5 tasks and verified they work

---

## Exercise 2: CLI Agent Mode (30 min)

### Objective

Use the Copilot CLI's full agent mode to solve multi-step development tasks from the terminal. You'll fix bugs, add tests, and refactor code — all without opening an IDE.

### Setup

1. **Open the starter project:**

   ```bash
   cd sessions/session-04-copilot-cli/lab/starter/agent-tasks
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the existing tests to see failures:**

   ```bash
   npm test
   ```

   **Expected:** Multiple test failures — the project has intentional bugs.

4. **Review the project structure:**

   ```
   agent-tasks/
   ├── package.json          # Project config with test script
   ├── src/
   │   ├── app.js            # Express app with 3 bugs
   │   └── utils.js          # Utility functions needing refactoring
   ├── tests/
   │   └── app.test.js       # Basic tests (some failing due to bugs)
   └── task-list.md          # Your 3 tasks for agent mode
   ```

5. **Read `task-list.md`** — it contains 3 tasks of increasing complexity.

---

### Task 1: Fix the Bugs (10 min)

**Launch the Copilot CLI in interactive mode:**

```bash
copilot
```

**Give the agent this prompt:**

```
Read src/app.js and tests/app.test.js. There are 3 bugs in app.js causing test failures. Find and fix all of them. Run the tests after fixing to verify.
```

**What to observe while the agent works:**

- [ ] Does it read the relevant files first?
- [ ] Does it identify the bugs before attempting fixes?
- [ ] Does it run `npm test` after making changes?
- [ ] Does it iterate if tests still fail?

**Expected:** All tests passing after the agent finishes.

**Verify manually:**

```bash
npm test
```

> **Tip:** If you're in interactive mode, you can press `Shift+Tab` to switch to **Plan mode** first, which makes the agent explain its approach before coding.

---

### Task 2: Add Missing Tests (10 min)

**In the same Copilot CLI session (or start a new one):**

```
The utils.js file has 4 exported functions but no tests. Create a full test file at tests/utils.test.js that covers every function, including edge cases. Run the tests to verify they pass.
```

**What to observe:**

- [ ] Does it read `utils.js` to understand the function signatures?
- [ ] Does it create meaningful edge case tests (empty strings, negative numbers, null values)?
- [ ] Does it run the tests automatically?
- [ ] Are there at least 3 tests per function?

**Verify:**

```bash
npm test
```

**Expected:** A new `tests/utils.test.js` file with passing tests for all utility functions.

---

### Task 3: Refactor with Agent Mode (10 min)

**This task uses autopilot mode for more autonomous work:**

Press `Shift+Tab` until the mode indicator shows **autopilot**, then enter:

```
Refactor src/utils.js:
1. Add input validation to all functions (throw TypeError for invalid arguments)
2. Add JSDoc comments to every function
3. Update the tests to cover the new validation behavior (expect throws for bad input)
4. Make sure all tests still pass
```

**What to observe:**

- [ ] Does the agent work through the subtasks in order?
- [ ] Does it run tests after each change or only at the end?
- [ ] Does it handle the coordination between changing utils.js and updating tests?
- [ ] Does it use the `!` prefix to run shell commands directly?

**Expected:** Validated, documented utility functions with updated tests — all passing.

**Exit the CLI:**

```
/exit
```

**Compare your results with `lab/solution/agent-tasks/`** to see the expected final state.

### Troubleshooting

| Problem                            | Solution                                                                |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `copilot` command not found        | Install: `npm install -g @github/copilot`, Homebrew cask, or WinGet     |
| Agent doesn't run tests            | Prompt it explicitly: "Run npm test to verify"                          |
| Agent makes changes to wrong files | Use `/undo` to revert, then be more specific about file paths           |
| Agent gets stuck in a loop         | Press `Esc` to interrupt, then give clearer instructions                |
| "Permission denied" on tool use    | Type `y` to allow, or `!` to allow all similar requests for the session |

### You Should See

By the end of Exercise 2:

- [ ] All 3 original bugs are fixed
- [ ] New test file `tests/utils.test.js` covers every exported function and its edge cases
- [ ] Utility functions have input validation and JSDoc comments
- [ ] All tests pass: `npm test` shows 0 failures

---

## Exercise 3: CLI-Exclusive Features (35 min)

### Objective

Explore CLI features for terminal-first workflows. Check current GitHub documentation and customer policy before using a feature.

### Part A: Programmatic Mode (15 min)

Programmatic mode (`-p`) lets you use Copilot in automated pipelines. Review its inputs, permissions, and output before adding it to a workflow.

1. **Open the starter directory:**

   ```bash
   cd sessions/session-04-copilot-cli/lab/starter/cli-exclusive
   ```

2. **Open `pipeline-script.sh`.** This is a skeleton bash script with TODO comments. Your job is to fill in the Copilot commands.

3. **Try programmatic mode manually first:**

   ```bash
   # Basic: get a one-shot answer
   copilot -p "What is the current git branch?" --allow-tool='shell(git)' --silent
   ```

   **Expected:** Just the branch name, no extra formatting (thanks to `--silent`).

4. **Try generating structured output:**

   ```bash
   # Generate a commit summary in JSON format
   copilot -p "List the last 5 commits with hash, author, and message. Output as JSON array." \
     --allow-tool='shell(git)' --silent --output-format=json
   ```

5. **Now complete the pipeline script.** Open `pipeline-script.sh` in a text editor (or use the Copilot CLI itself!) and fill in the TODO sections:

   ```bash
   # You can even use Copilot to help you complete the script:
   copilot
   # Then: "Read starter/cli-exclusive/pipeline-script.sh and fill in all the TODO sections"
   ```

6. **Make the script executable and run it:**

   ```bash
   chmod +x pipeline-script.sh
   ./pipeline-script.sh
   ```

   **Expected:** A generated summary report combining git history analysis, a code health assessment, and a TODO scan — all produced by Copilot in programmatic mode.

7. **Compare with `lab/solution/cli-exclusive/pipeline-script.sh`** for the completed version.

---

### Part B: Deep Research with `/research` (10 min)

The `/research` command launches a specialized research agent that searches your codebase, GitHub repositories, and the web to produce in-depth reports.

1. **Open `starter/cli-exclusive/research-topics.md`.** Pick one of the 3 research topics.

2. **Launch the CLI and run your research:**

   ```bash
   copilot
   ```

   Then use the `/research` command with your chosen topic. For example:

   ```
   /research What are the security best practices for Express.js middleware in 2026? Cover OWASP Top 10 mitigations.
   ```

3. **While it researches, observe:**
   - [ ] Does it search GitHub repositories for real-world examples?
   - [ ] Does it cite sources?
   - [ ] How long does the research take vs. a regular prompt?
   - [ ] Is the output more thorough than a standard chat response?

4. **Save the research output:**

   ```
   /share file research
   ```

   This exports the research results to a Markdown file.

5. **Compare the depth** of the `/research` output to what you'd get from a simple prompt like "tell me about Express.js security."

---

### Part C: Delegation and Subagents (10 min)

The CLI can delegate work to specialized subagents and even push tasks to the cloud agent.

1. **Open `starter/cli-exclusive/delegation-scenario.md`.** It describes a multi-part task.

2. **Use `/delegate` to push work to the cloud agent:**

   ```
   /delegate Review the README.md in the agent-tasks project and suggest improvements for clarity, structure, and completeness
   ```

   **What happens:** The cloud agent (on GitHub.com) picks up the task, creates a branch, makes changes, and opens a draft PR. You'll get a link to the PR.

   > **Note:** `/delegate` requires your repo to be pushed to GitHub. If you're working locally without a remote, observe the command's behavior and note what it attempts.

3. **Use `/fleet` for parallel subagent work:**

   ```
   /fleet Analyze the agent-tasks project:
   1. Review code quality of src/app.js
   2. Review code quality of src/utils.js
   3. Check test coverage of tests/
   ```

   **What to observe:**
   - [ ] Does `/fleet` spawn multiple subagents simultaneously?
   - [ ] Can you see them working in parallel via `/tasks`?
   - [ ] Is the combined result faster than asking sequentially?

4. **Check each subagent's status:**

   ```
   /tasks
   ```

   **Expected:** A list of active/completed subagent tasks with their status.

### Troubleshooting

| Problem                 | Solution                                                                      |
| ----------------------- | ----------------------------------------------------------------------------- |
| `/research` seems slow  | Research agents do more work — 1-3 minutes is normal for thorough results     |
| `/delegate` fails       | Ensure your repo is pushed to a GitHub remote and you have cloud agent access |
| `/fleet` not recognized | Ensure you have the latest CLI version: `npm update -g @github/copilot`       |
| Programmatic mode hangs | Add `--max-autopilot-continues=5` to cap iterations                           |

### Exercise 3 check

By the end of Exercise 3:

- [ ] You've run Copilot in programmatic mode (`-p`) with `--silent` and `--allow-tool`
- [ ] You've completed and executed `pipeline-script.sh`
- [ ] You've used `/research` and seen the depth difference vs. regular prompts
- [ ] You've tried `/delegate` and/or `/fleet` for task distribution
- [ ] You understand which features are CLI-exclusive and why they matter

---

## Exercise 4: CLI vs IDE Comparison & Workflow Patterns (30 min)

### Objective

Complete the same tasks in the CLI and IDE, then record which surface fits each task. Build a personal workflow cheat sheet from those observations.

### Part A: Side-by-Side Comparison (15 min)

Open `lab/starter/comparison-tasks.md`. It contains 3 tasks. For each one:

1. **Do it in the CLI first** — time yourself
2. **Do it in VS Code (IDE) second** — time yourself
3. **Record your observations** in the comparison table

**The 3 comparison tasks:**

| #   | Task                                            | What to Compare                                  |
| --- | ----------------------------------------------- | ------------------------------------------------ |
| 1   | Explain a complex regex pattern                 | Speed, depth, follow-up ability                  |
| 2   | Generate a shell script to process log files    | Accuracy, iteration workflow, running the result |
| 3   | Debug a failing test in the agent-tasks project | Tool access, file navigation, iteration speed    |

**For each task, note:**

- Which was faster?
- Which produced better output?
- Which was more natural for this type of task?
- Would you choose differently next time?

**Compare your findings with `lab/solution/comparison-results.md`.**

---

### Part B: Workflow Scenarios (10 min)

Open `lab/starter/workflow-scenarios.md`. For each of the 5 real-world scenarios, decide: **CLI or IDE?** Write your reasoning.

The scenarios span common developer situations:

1. SSH'd into a production server debugging a crash
2. Setting up CI/CD pipeline in a new repository
3. Analyzing a 500-line error log from a failed deployment
4. Writing a new React component with tests
5. Automating a weekly report generation script

---

### Part C: Build Your Cheat Sheet (5 min)

Open `lab/starter/cli-cheatsheet-template.md`. Fill in the template with:

- Your top 5 CLI commands (the ones you'll actually use)
- Your decision rules for CLI vs. IDE
- Shortcuts and aliases you've set up
- Notes from today's exercises

Customize the sheet for how you work.

**See `lab/solution/cli-cheatsheet-example.md`** for an example of a completed cheat sheet.

### Exercise 4 check

By the end of Exercise 4:

- [ ] You've completed the same task in CLI and IDE and documented the tradeoffs
- [ ] You've made CLI vs. IDE decisions for 5 real-world scenarios
- [ ] You have a personalized CLI workflow cheat sheet

---

## Deliverable Checklist

Before you wrap up, verify you've completed:

- [ ] **Exercise 1:** standalone `copilot` installed, 5 explanation + 5 command-generation challenges completed
- [ ] **Exercise 2:** All bugs fixed in `agent-tasks/src/app.js`, `tests/utils.test.js` created, utils refactored with validation
- [ ] **Exercise 3:** `pipeline-script.sh` completed and executed, `/research` used, `/delegate` or `/fleet` tried
- [ ] **Exercise 4:** 3 CLI vs IDE comparisons documented, 5 workflow scenarios evaluated, personal cheat sheet created
- [ ] **Deliverables collected:**
  - Your completed CLI cheat sheet
  - The fixed `agent-tasks/` project
  - The completed `pipeline-script.sh`

---

## Key Takeaways for Trainers

1. **Treat the CLI as a terminal workflow.** Confirm the current supported commands and controls in official documentation before teaching or automating them.

2. **Programmatic mode (`-p`) supports automation.** It can generate changelogs, reports, and audit summaries. Start with limited permissions and review the output.

3. **CLI agent mode makes the workflow visible.** Learners can watch the agent plan, act, inspect results, and iterate in the terminal.

4. **Choose between the CLI and IDE based on the work.** SSH, CI/CD, and automation favor the CLI. Visual development and code navigation favor the IDE.

5. **Choose the surface deliberately.** Use current official documentation and customer policy to decide whether CLI, IDE, or web workflows are appropriate for the task.
