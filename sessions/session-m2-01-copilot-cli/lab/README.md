# Session m2-01 lab: GitHub Copilot in the CLI

**Duration:** 2 hours  
**Difficulty:** Intermediate  
**Prerequisites:** Sessions m1-01 to m1-03 completed, GitHub CLI (`gh`) installed
**Deliverable:** A reviewed `agent-tasks` project, a project health script, and a CLI workflow cheat sheet

---

## Lab overview

You are taking over the `agent-tasks` Node.js project. Use the standalone CLI to
inspect its commands, repair it, and automate a health report. Then decide whether
the CLI or IDE fits each task. Keep all notes and generated artifacts tied to this
project.

| Exercise   | Topic                                     | Time   |
| ---------- | ----------------------------------------- | ------ |
| 1          | CLI Setup & First Commands                | 15 min |
| 2          | Plan, Revise, and Repair                  | 40 min |
| 3          | Programmatic Output and Fleet             | 35 min |
| 4          | Recovery, isolated alternatives, and surface choice | 30 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Check that you may use the [Copilot CLI](https://docs.github.com/en/copilot/get-started/cli-quickstart), its authentication method, and terminal access.

### Required access

- [ ] GitHub Copilot access checked for the standalone CLI
- [ ] Approval to use the local `agent-tasks` training project
- [ ] GitHub CLI (`gh`) installed
- [ ] Node.js 22 or later
- [ ] Git with a configured local commit identity
- [ ] Terminal access
- [ ] VS Code for the final comparison
- [ ] Local sandbox available and enabled under the trainer's policy

In the CLI, check `/plan`, `/rubber-duck`, `/subagents`, `/fleet`, `/tasks`,
`/permissions`, `/sandbox`, `/limits`, `/rewind`, `/fork`, `/move`, and `/resume`
in `/help`. Check the queue and background shortcuts in quick help. Install and
authenticate before delivery; the lab setup block checks an existing installation.
Agree a usage limit with the trainer before starting parallel work.

**If CLI access or a required command is unavailable, stop the lab.** Fix access
before continuing. Normal shell work or a cloud delegation does not replace the
planning and fleet exercises.

### Check your setup

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

## Exercise 1: CLI setup & first commands (15 min)

### Objective

Set up the GitHub Copilot standalone CLI and check that it works. Then use it to
explain and suggest commands.

### Part A: Installation (5 min)

1. **Install the Copilot CLI** (choose one method):

   ```bash
   # Via npm (recommended: requires Node.js 22+)
   npm install -g @github/copilot

   # Via Homebrew (macOS)
   brew install --cask github-copilot-cli

   # Via WinGet (Windows)
   winget install GitHub.Copilot
   ```

2. **Check installation:**

   ```bash
   copilot --version
   ```

   **Expected:** A version number (e.g., `v1.x.x` or higher).

3. **Authenticate (if needed):**

   ```bash
   copilot
   /login
   ```

   This starts an OAuth device flow. Follow the browser prompts.

4. **Check that you can start a session:**

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
| "Copilot isn't enabled" error    | Check your GitHub account has Copilot access at github.com/settings/copilot   |
| Permission denied during install | On Linux/macOS, you may need `sudo` for global npm install, or use `nvm`      |

---

### Part B: Explain commands (5 min)

Open `lab/starter/explain-challenges.md`. The file has five commands, from simple to complex. For each one:

1. Launch the CLI with `copilot` and ask it to explain the command (e.g., "Explain what this command does: `<command>`")
2. Read the explanation Copilot provides
3. Rate the explanation from 1 to 5. Check its accuracy and coverage of edge cases.
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

### Part C: Suggest commands (5 min)

Open `lab/starter/suggest-challenges.md`. The file has five tasks written in plain language. For each one:

1. In the Copilot CLI session, describe the task and ask for a command. For
   example: "Give me a command to find all Python files larger than 1MB."
2. Review the suggested command. Check that it does what you asked.
3. Try running the suggested command (or note what it would do)
4. If the suggestion isn't quite right, refine your description and try again

**Choose two challenges.** The remaining examples are reference practice:

| #   | Task                                                        | Type   | What to Look For                               |
| --- | ----------------------------------------------------------- | ------ | ---------------------------------------------- |
| 1   | Find all Python files larger than 1MB                       | shell  | Does it use `find` with `-size`?               |
| 2   | Show commits from the last 7 days by a specific author      | git    | Does it use `--since` and `--author`?          |
| 3   | Create a new branch, make a commit, and push in one line    | git    | Does it chain the commands correctly?          |
| 4   | Find the top 10 largest files in the current directory tree | shell  | Does it use `du` or `find` + `sort`?           |
| 5   | List all open issues assigned to you in a specific repo     | gh     | Does it use `gh issue list` with `--assignee`? |

Compare your two results with `lab/solution/suggest-answers.md`.

### Checkpoint 1: CLI ready and project understood

By the end of Exercise 1:

- [ ] Copilot CLI is installed and working (`copilot --version`)
- [ ] You can start an interactive session with `copilot`
- [ ] You've explained 5 commands and understand what Copilot covers well vs. misses
- [ ] You've generated commands for two tasks and checked them
- [ ] Your notes connect each command to the `agent-tasks` takeover story

---

## Exercise 2: Plan, revise, and repair (40 min)

### Objective

Fix bugs, add tests, and refactor code in the terminal with the Copilot CLI's full
agent mode. Keep the IDE closed for this exercise.

### Setup

1. **From the curriculum root, copy the starter to a fresh workspace:**

   ```bash
   mkdir -p ~/copilot-labs/session-m2-01
   cp -R sessions/session-m2-01-copilot-cli/lab/starter/agent-tasks \
     ~/copilot-labs/session-m2-01/agent-tasks
   cp sessions/session-m2-01-copilot-cli/lab/starter/workflow-record.md \
     ~/copilot-labs/session-m2-01/workflow-record.md
   cd ~/copilot-labs/session-m2-01/agent-tasks
   git init
   printf 'node_modules/\nproject-report.md\ncommits.jsonl\n' > .gitignore
   git add .gitignore package.json src tests task-list.md
   git commit -m "Record training baseline"
   ```

   Use a new destination if that folder already exists. Keep the curriculum
   starter unchanged. Record all planning and fleet results in `workflow-record.md`.

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the existing tests to see failures:**

   ```bash
   npm test
   ```

   **Expected:** Multiple test failures because the project has intentional bugs.

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

5. **Read `task-list.md`.** It contains 3 tasks of increasing complexity.

---

### Task 1: Plan and fix the bugs (15 min)

**Launch the Copilot CLI in interactive mode:**

```bash
copilot
```

### Inspect controls before the first repair

Run:

```text
/rename Session m2-01 takeover
/permissions show
/sandbox status
/sandbox policy
/limits
```

Record the permission mode and effective filesystem/network restrictions.
Permission approval controls whether a tool may run; the local sandbox restricts
what a sandboxed process can reach. Neither an instruction nor a worktree grants
repository authority.

Inspect policy for a harmless command without running it:

```text
/sandbox policy node --version
```

Keep the restrictions unchanged. If the sandbox is unavailable or the trainer's
required policy is not enforced, stop and resolve the setup. Do not disable it,
broaden grants, or switch to unrestricted permissions to complete the exercise.

In `/limits`, inspect the current value, unit, minimum, and scope. With the
trainer, choose a permitted AI-credit value and set it through the dialog or:

```text
/limits set max-ai-credits <trainer-agreed-value>
```

**This is a soft limit, not a guaranteed spending ceiling.** GitHub's command
reference describes response limits that reset per message; its session-limit
guide describes a cumulative session limit. Record the installed version's UI
wording and the trainer's checked reset behavior. If scope is unclear, stop before
the metered task. Do not assume a new prompt resets the limit, force exhaustion,
or raise a limit to make the lab pass. Keep the overall workshop usage limit too.

**Start in Plan mode:**

```text
/plan Read src/app.js and tests/app.test.js. Explain the three failing behaviors.
Plan the smallest fixes. Map each behavior to a target file and an existing test.
Do not edit project files, add dependencies, or refactor unrelated code.
```

Read the plan before accepting it. Then add this constraint:

```text
Revise the plan so the fixes preserve the existing response fields and status
codes. Explain which steps change and which stay the same.
```

Before approval, run:

```text
/rubber-duck Critique the revised repair plan against src/app.js and its tests.
Look for a change that could hide a defect or break the response contract.
Do not edit files.
```

Rubber duck is a built-in, read-only critic in the CLI and app. Copilot chooses a
contrasting model automatically when one is available; do not guess its identity
or treat the author's second answer as an independent critique. Check each
finding yourself. Revise for supported findings, explain rejected suggestions,
and record no findings honestly.

Open `/subagents`, select rubber duck, and inspect **Proactive invocation**.
Manual use is the default. The opt-in setting persists across CLI sessions and
adds model usage. Leave its existing value unchanged; the required manual
invocation makes this lab repeatable.

Save the plans and checked critique in `workflow-record.md`. Name one assumption
you challenged. Reject steps that change the public API or test away a defect.
Check `git diff` before approval; planning should not have changed project files.

**Approve the revised plan**, leave Plan mode, and ask Copilot to implement it.
Inspect the diff and run the checks yourself:

```bash
git diff -- src/app.js tests/app.test.js
npm test
```

Record the test result and any deviation from the accepted plan.

**Plan mode is not a sandbox.** Keep tool permissions in place, especially for
external or MCP tools. Saying "plan first" in an ordinary prompt is not the same
as selecting Plan mode.

---

### Task 2: Add missing tests (10 min)

**In the same Copilot CLI session (or start a new one):**

```
The utils.js file has 4 exported functions but no tests. Create a full test file at tests/utils.test.js that covers every function, including edge cases. Run the tests to verify they pass.
```

**What to observe:**

- [ ] Does it read `utils.js` to understand the function signatures?
- [ ] Does it create meaningful edge case tests (empty strings, negative numbers, null values)?
- [ ] Does it run the tests automatically?
- [ ] Are there at least 3 tests per function?

**Check:**

```bash
npm test
```

**Expected:** A new `tests/utils.test.js` file with passing tests for all utility functions.

---

### Task 3: Refactor from an accepted plan (15 min)

Use `/plan` again:

```text
/plan Refactor src/utils.js:
1. Add input validation to all functions (throw TypeError for invalid arguments)
2. Add JSDoc comments to every function
3. Update the tests to cover the new validation behavior (expect throws for bad input)
4. Make sure all tests still pass
Name the files and checks for each step. Do not implement yet.
```

Approve only the listed behavior changes. Continue in Standard mode and inspect
the resulting diff. Autopilot is a mode choice for a narrow task; it does not
replace tool permissions or human review.

Run `npm test` and record the result.

**Expected:** Your utility functions validate inputs and have documentation.
The updated tests all pass.

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
| Agent makes changes to wrong files | Stop, inspect the diff, and use `/rewind` only for edits it can safely restore |
| Agent gets stuck in a loop         | Press `Esc` to interrupt, then give clearer instructions                |
| "Permission denied" on tool use    | Inspect the requested action and policy; stop if the lab needs a prohibited action |

### Checkpoint 2: project repaired

By the end of Exercise 2:

- [ ] All 3 original bugs are fixed
- [ ] An initial plan, challenged assumption, and revised plan are recorded
- [ ] The project diff was checked before approval and after implementation
- [ ] New test file `tests/utils.test.js` covers every exported function and its edge cases
- [ ] Utility functions have input validation and JSDoc comments
- [ ] All tests pass: `npm test` shows 0 failures

---

## Exercise 3: Programmatic output and fleet (35 min)

### Objective

Automate a report in the terminal, then delegate independent analysis of the same
project. You can also use `/fleet` and `/research` in the app.

### Part A: Programmatic mode (15 min)

Programmatic mode (`-p`) lets you use Copilot in automated pipelines. Review its inputs, permissions, and output before adding it to a workflow.

1. **From the curriculum root, copy the script into your working project:**

   ```bash
   cp sessions/session-m2-01-copilot-cli/lab/starter/cli-exclusive/pipeline-script.sh \
     ~/copilot-labs/session-m2-01/agent-tasks/pipeline-script.sh
   cd ~/copilot-labs/session-m2-01/agent-tasks
   ```

2. **Open `pipeline-script.sh`.** Fill in the Copilot commands at its TODO comments.

3. **Try programmatic mode manually first:**

   ```bash
   # Basic: get a one-shot answer
   copilot -p "What is the current git branch?" --allow-tool='shell(git)' --silent
   ```

   Check the reported branch against `git branch --show-current`. `--silent`
   suppresses CLI commentary; it does not guarantee the model's answer format.

4. **Try generating structured output:**

   ```bash
   copilot -p "Summarize the last 5 commits. Do not edit files." \
     --allow-tool='shell(git log)' --output-format=json > commits.jsonl
   copilot_status=$?
   printf 'Copilot exit status: %s\n' "$copilot_status"
   if [ "$copilot_status" -ne 0 ]; then
     echo "Stop: inspect the Copilot error before parsing output."
   else
     node -e 'const fs = require("node:fs"); const lines = fs.readFileSync("commits.jsonl", "utf8").trim().split("\n"); lines.forEach(line => JSON.parse(line)); console.log(`Parsed ${lines.length} JSONL records`);'
   fi
   ```

   `--output-format=json` emits a **JSONL event stream**. Do not treat it as one
   JSON array containing the answer. Inspect the event types and any error result.
   Parsing each line checks the JSONL format, not whether the task succeeded or
   the answer is correct.
   Record the CLI exit status immediately after the Copilot command. If it failed,
   stop and inspect the error before running the parser.

5. **Complete the pipeline script.** Open `pipeline-script.sh` in a text editor or the Copilot CLI and fill in the TODO sections:

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

   **Expected:** A generated `agent-tasks` health report combining git history analysis, a code assessment, and a TODO scan.

7. **Compare with `lab/solution/cli-exclusive/pipeline-script.sh`** for the completed version.

### Queue a follow-up and background a command

Within the same 15-minute block, use a harmless timed command to practise the
controls without changing the project. In interactive Copilot, ask:

```text
Run only node -e "setTimeout(() => console.log('training wait complete'), 15000)"
and report its exit status. Do not edit files or detach the process.
```

While the command runs, type `After the command finishes, restate its output and
exit status without running it again.` Press **Ctrl+Q** to queue it. Check the
pending label, then press **Ctrl+X, b** to promote the running command to the
background. Open `/tasks` and inspect its state and final result.

Wait for the queued follow-up and check its claim against the actual output.
If the command finishes before the shortcuts, retry once; do not add an unbounded
wait. Backgrounding keeps work in the CLI session. It is not shell detachment and
does not make shared-file writes safe. `Ctrl+S` stashes/restores an unsent draft;
it does not queue or send it. Record which control did what.

---

### Part B: Focused research with `/research` (5 min)

The `/research` command starts a research agent that searches your codebase, GitHub repositories, and the web, then writes a report.

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
   - [ ] Does it search GitHub repositories for relevant examples?
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

### Part C: Plan and supervise a fleet (15 min)

Open `starter/cli-exclusive/delegation-scenario.md`. Use the repaired project as a
shared snapshot for independent read-only analysis.

1. Use `/plan` to divide the analysis into independent questions. Each task needs
   input paths, an expected result, and a stop rule. Keep implementation and its
   dependent tests out of the parallel work.
2. Accept the breakdown and leave Plan mode. Run:

   ```text
   /fleet Use the accepted analysis plan. Delegate independent read-only tasks:
   inspect the route behavior in src/app.js, the input contract in src/utils.js,
   and gaps in tests/. Each task must cite files and distinguish a proven defect
   from a proposed improvement. Do not edit files, install packages, or use the
   network. Stop on scope growth or the agreed usage limit.
   ```

3. Run `/tasks`. Open task details and inspect the actual work. Stop any task
   that starts editing or expands the scope.
4. Check at least one claim from each result against the source or a focused
   test. Reject unsupported claims; do not invent a bad finding for the exercise.
5. Ask the parent to reconcile duplicates or disagreements. Run `/usage` and
   record the observed usage and whether coordination was worth the work.

**Completion requires live child-task results.** Do not require exactly three
agents or a speedup. If Copilot keeps the analysis sequential, record that result
and ask the trainer to adjust the task split before retrying within the usage
limit. A `/delegate` attempt does not count as fleet practice; Session m3-02 covers
cloud delegation.

### Troubleshooting

| Problem                 | Solution                                                                      |
| ----------------------- | ----------------------------------------------------------------------------- |
| `/research` seems slow  | Research agents do more work. 1-3 minutes is normal for thorough results      |
| `/delegate` fails       | Ensure your repo is pushed to a GitHub remote and you have cloud agent access |
| `/fleet` not recognized | Ensure you have the latest CLI version: `npm update -g @github/copilot`       |
| Programmatic mode hangs | Add `--max-autopilot-continues=5` to cap iterations                           |

<a id="checkpoint-3-automation-evidence-captured"></a>

### Checkpoint 3: automation results recorded

By the end of Exercise 3:

- [ ] You've run Copilot in programmatic mode (`-p`) with `--silent` and `--allow-tool`
- [ ] You've completed and executed `pipeline-script.sh`
- [ ] You've used `/research` and compared its depth with regular prompts
- [ ] You've used `/plan`, `/fleet`, and `/tasks` and inspected live child results
- [ ] Each accepted child claim has a source reference or focused check
- [ ] You recorded usage and explained whether parallel work helped

---

## Exercise 4: Recovery, isolated alternatives, and surface choice (30 min)

### Objective

Recover one disposable edit, isolate an alternative, then compare the CLI and IDE
on one task.

### Part A: Recover a disposable edit (10 min)

Run `npm test` and inspect the repair diff. Commit only the reviewed working
project files, including the lockfile and completed script if present, not
generated reports or credentials. Keep generated files outside the Git worktree
or in its ignore file so its status is clean before forking. This checkpoint
makes the repaired code available to a worktree fork.

Ask Copilot to create only `recovery-note.txt` with `temporary training note`.
Inspect the file and Git status. Then run `/rewind` and inspect both choices:

- **Conversation only** removes turns without restoring files.
- **Conversation + files** also restores tracked agent edits for the discarded
  turns; later manual edits may be skipped.

Choose **Conversation + files** for that disposable turn. Check that the note is
gone and the committed repair remains. Do not edit the note manually before
rewinding. Rewind is not a Git commit rollback and cannot undo a push or an
external-system action.

### Part B: Fork context and move a draft (10 min)

From the clean repaired repository, run:

```text
/fork worktree
```

Ask the fork to report `pwd`, its branch, and `git worktree list`. Compare them
with the parent. A plain `/fork` copies conversation context; do not assume it
isolates files. `/fork worktree` adds a separate Git checkout based on `HEAD`.
The parent and its uncommitted work stay behind.

In the fork, ask for a read-only alternative to the utility refactor. Then ask
Copilot to write only `alternative-note.txt` with that proposal. Inspect it and
run:

```text
/move
```

Check the new path and Git status: the draft should move to the new worktree
rather than stay as an uncommitted edit in the old one. Do not force a move if
the client reports a conflict. Return to the parent through `/resume` and check
its path, branch, and status. Do not merge the alternative or delete worktrees
before the trainer has checked the result.

`/worktree` leaves uncommitted edits behind; `/move` transfers them. `/resume`
restores a conversation, while `/compact` summarizes one and `/new` starts fresh.
Check workspace state after each transition rather than inferring it from the
conversation.

### Part C: Surface comparison and cheat sheet (10 min)

Choose one task from `lab/starter/comparison-tasks.md`. Do it in the CLI and IDE,
then record the tradeoff. Choose two scenarios from
`lab/starter/workflow-scenarios.md` and explain your surface choice. The remaining
examples are reference practice.

Open `lab/starter/cli-cheatsheet-template.md`. Fill in the template with:

- Your top 5 CLI commands (the ones you'll actually use)
- Your decision rules for CLI vs. IDE
- Shortcuts and aliases you've set up
- Notes from today's exercises

Customize the sheet for how you work.

Restore the original `/limits` setting after recording the exercise results.
Do not remove a cap that was present before the lab.

**See `lab/solution/cli-cheatsheet-example.md`** for an example of a completed cheat sheet.

### Checkpoint 4: surface decision recorded

By the end of Exercise 4:

- [ ] You've completed the same task in CLI and IDE and documented the tradeoffs
- [ ] You've checked a rewind result and preserved the committed repair
- [ ] A worktree fork and moved draft were checked against actual paths and Git status
- [ ] You've made CLI vs. IDE decisions for two practical scenarios
- [ ] You have a personalized CLI workflow cheat sheet

---

## Final deliverable

Submit one folder containing:

1. The fixed `agent-tasks/` project with passing `npm test` output.
2. The completed `pipeline-script.sh` and one generated project health report.
3. The completed `workflow-record.md` with critique, controls, queue/background
   results, checked recovery/worktree state, and fleet results.
4. The completed CLI-versus-IDE comparison and workflow cheat sheet.

**Done:** Another learner can trace the plan revision to the diff, check accepted
fleet findings, and run the tests and script. Shell-only work or a cloud
delegation does not complete this lab.

## Command references

Checked October 15, 2026:

- [CLI commands and shortcuts](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [Rubber duck](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck)
- [Session-limit guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit)
- [Local sandbox settings](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings)

---

## Trainer notes

1. **Treat the CLI as a terminal workflow.** Check the current supported commands and controls in official documentation before teaching or automating them.

2. **Programmatic mode (`-p`) supports automation.** It can generate changelogs, reports, and audit summaries. Start with limited permissions and review the output.

3. **Show the CLI agent loop.** Have learners watch the agent plan, act, inspect results, and iterate in the terminal.

4. **Choose between the CLI and IDE based on the work.** SSH, CI/CD, and automation favor the CLI. Visual development and code navigation favor the IDE.

5. **Choose the surface deliberately.** Use current official documentation and your organization's policy to decide whether CLI, IDE, or web workflows fit the task.
