# Session M2-01 lab: GitHub Copilot in the CLI

**Duration:** 2 hours

**Deliverable:** A reviewed `agent-tasks` project, a project health script, and a
CLI workflow cheat sheet

## Lab overview

You take over the `agent-tasks` Node.js project. Use the standalone CLI to inspect
its commands, repair it, and automate a health report. Then decide whether the CLI
or the IDE fits each task. Use synthetic data only.

| Exercise | Topic | Time |
| --- | --- | --- |
| 1 | CLI setup and first commands | 15 min |
| 2 | Plan, revise, and repair | 40 min |
| 3 | Programmatic output and fleet | 35 min |
| 4 | Recovery, isolated alternatives, and surface choice | 30 min |

## You need

- the standalone [Copilot CLI](https://docs.github.com/en/copilot/get-started/cli-quickstart)
  with a signed-in GitHub account that has Copilot;
- GitHub CLI (`gh`), Node.js 22 or later, and Git with a local commit identity;
- the local sandbox, enabled;
- VS Code for the final comparison.

In the CLI, check that `/help` lists `/plan`, `/rubber-duck`, `/subagents`,
`/fleet`, `/tasks`, `/permissions`, `/sandbox`, `/limits`, `/rewind`, `/fork`,
`/move`, and `/resume`. Quick help lists the queue and background shortcuts.

```bash
gh --version        # 2.x or higher
node --version      # v22 or higher
gh auth status      # Logged in to github.com
```

If `gh auth status` says you're not logged in, run `gh auth login`, choose HTTPS,
and sign in through the browser.

---

## Exercise 1: CLI setup and first commands (15 min)

### Part A: Install (5 min)

1. Install the CLI with one of these:

   ```bash
   npm install -g @github/copilot          # needs Node.js 22+
   brew install --cask github-copilot-cli  # macOS
   winget install GitHub.Copilot           # Windows
   ```

2. Check the install. Expect a version number.

   ```bash
   copilot --version
   ```

3. Sign in if needed. This starts an OAuth device flow in the browser.

   ```bash
   copilot
   /login
   ```

4. Start `copilot` and check that the interactive prompt appears. Type `/exit` to
   leave.

| Problem | Fix |
| --- | --- |
| `copilot: command not found` | Check Node.js 22+, or run `npx @github/copilot` |
| Authentication fails | Run `/login`, or set `GH_TOKEN` |
| "Copilot isn't enabled" | Check github.com/settings/copilot |
| Permission denied on global npm install | Use `nvm`, or `sudo` on Linux/macOS |

### Part B: Explain commands (5 min)

Open `lab/starter/explain-challenges.md`. For each of its five commands:

1. In `copilot`, ask: "Explain what this command does: `<command>`".
2. Rate the explanation from 1 to 5 for accuracy and edge cases.
3. Note what it missed or got wrong.

| # | Command | What to look for |
| --- | --- | --- |
| 1 | `ls -la` | Does it explain each flag? |
| 2 | `find . -name "*.log" -mtime +7 -delete` | Does it warn about deletion? |
| 3 | `git log --oneline --graph --all --decorate` | Does it explain each flag's visual effect? |
| 4 | `tar czf backup.tar.gz --exclude='node_modules' --exclude='.git' ./src` | Does it explain compression and exclusions? |
| 5 | `awk -F',' '{sum[$1]+=$3; count[$1]++} END {for (k in sum) print k, sum[k]/count[k]}'` | Does it explain the associative arrays and the math? |

Compare your notes with `lab/solution/explain-answers.md`.

### Part C: Suggest commands (5 min)

Open `lab/starter/suggest-challenges.md` and **choose two tasks**. For each:

1. Describe the task in the CLI, for example "Give me a command to find all Python
   files larger than 1MB."
2. Check that the command does what you asked. Run it, or note what it would do.
3. If it's off, refine the description and retry.

| # | Task | What to look for |
| --- | --- | --- |
| 1 | Find all Python files larger than 1MB | `find` with `-size` |
| 2 | Show commits from the last 7 days by a specific author | `--since` and `--author` |
| 3 | Create a branch, commit, and push in one line | Correctly chained commands |
| 4 | Find the 10 largest files in the current tree | `du`, or `find` + `sort` |
| 5 | List open issues assigned to you in a repo | `gh issue list --assignee` |

Compare with `lab/solution/suggest-answers.md`.

### Checkpoint 1

- [ ] `copilot --version` works and you can start an interactive session
- [ ] You explained five commands and know where Copilot is weak
- [ ] You generated and checked commands for two tasks

---

## Exercise 2: Plan, revise, and repair (40 min)

Fix bugs, add tests, and refactor in the terminal. Keep the IDE closed.

### Setup

1. From the curriculum root, copy the starter to a fresh folder:

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

   Use a new destination if the folder exists. Record plans and fleet results in
   `workflow-record.md`.

2. Install and run the tests. Expect failures: the project has three intentional
   bugs.

   ```bash
   npm install
   npm test
   ```

3. The project layout:

   ```text
   agent-tasks/
   ├── package.json          # Project config with test script
   ├── src/
   │   ├── app.js            # Express app with 3 bugs
   │   └── utils.js          # Utility functions needing refactoring
   ├── tests/
   │   └── app.test.js       # Basic tests (some failing due to bugs)
   └── task-list.md          # Your 3 tasks for agent mode
   ```

4. Read `task-list.md`.

### Task 1: Plan and fix the bugs (15 min)

Start `copilot` in the project and inspect the controls:

```text
/rename Session M2-01 takeover
/permissions show
/sandbox status
/sandbox policy
/sandbox policy node --version
/limits
```

Note the permission mode and the filesystem and network restrictions. Approval
decides whether a tool may run. The sandbox limits what a process can reach. Don't
disable the sandbox or broaden permissions to finish the lab. If the sandbox is
unavailable, stop and fix the setup.

In `/limits`, read the value, unit, minimum, and scope. Set a soft AI-credit
limit with the trainer's value, in the dialog or with:

```text
/limits set max-ai-credits <trainer-agreed-value>
```

The limit is **soft**. GitHub's command reference describes limits that reset per
message, and its session-limit guide describes a cumulative limit. Note what your
installed version shows. If the scope is unclear, ask the trainer before you start
the next step.

**Start in Plan mode:**

```text
/plan Read src/app.js and tests/app.test.js. Explain the three failing behaviors.
Plan the smallest fixes. Map each behavior to a target file and an existing test.
Do not edit project files, add dependencies, or refactor unrelated code.
```

Read the plan, then add a constraint:

```text
Revise the plan so the fixes preserve the existing response fields and status
codes. Explain which steps change and which stay the same.
```

Before you approve, get a critique:

```text
/rubber-duck Critique the revised repair plan against src/app.js and its tests.
Look for a change that could hide a defect or break the response contract.
Do not edit files.
```

Rubber duck is a built-in, read-only critic. Copilot picks a contrasting model
when one is available. Check each finding against the source. Revise the plan for
findings that hold up, and explain the ones you reject. If it finds nothing, note
that.

Open `/subagents`, select rubber duck, and look at **Proactive invocation**. Leave
it as it is. The opt-in persists across sessions and adds model usage.

Save both plans and the critique in `workflow-record.md`, and name one assumption
you challenged. Reject steps that change the public API or test away a defect.
Run `git diff`. Planning shouldn't have changed any file.

**Approve the revised plan**, leave Plan mode, and ask Copilot to implement it.
Then check:

```bash
git diff -- src/app.js tests/app.test.js
npm test
```

Note the test result and any deviation from the plan.

**Plan mode isn't a sandbox.** Keep tool permissions in place, especially for
external and MCP tools. Writing "plan first" in a normal prompt isn't Plan mode.

### Task 2: Add missing tests (10 min)

In the same session or a new one:

```text
The utils.js file has 4 exported functions but no tests. Create a full test file at
tests/utils.test.js that covers every function, including edge cases. Run the tests
to verify they pass.
```

Watch for:

- reading `utils.js` before writing tests;
- edge cases (empty strings, negative numbers, null);
- running the tests on its own;
- at least three tests per function.

```bash
npm test
```

Expect a new `tests/utils.test.js` with passing tests for every utility function.

### Task 3: Refactor from an accepted plan (15 min)

```text
/plan Refactor src/utils.js:
1. Add input validation to all functions (throw TypeError for invalid arguments)
2. Add JSDoc comments to every function
3. Update the tests to cover the new validation behavior (expect throws for bad input)
4. Make sure all tests still pass
Name the files and checks for each step. Do not implement yet.
```

Approve only the listed behavior changes. Continue in Standard mode and read the
diff. Autopilot suits a narrow task, but it doesn't replace permissions or review.

Run `npm test`. The utilities now validate input and have JSDoc, and all tests
pass. Type `/exit`, then compare your result with `lab/solution/agent-tasks/`.

| Problem | Fix |
| --- | --- |
| Agent doesn't run tests | Prompt: "Run npm test to verify" |
| Agent edits the wrong files | Stop, read the diff, use `/rewind` only for edits it can restore |
| Agent loops | Press `Esc`, then give clearer instructions |
| "Permission denied" on a tool | Read the requested action and the policy; stop if the lab would need a prohibited action |

### Checkpoint 2

- [ ] All three original bugs are fixed
- [ ] The first plan, a challenged assumption, and the revised plan are recorded
- [ ] You checked the diff before approval and after implementation
- [ ] `tests/utils.test.js` covers every exported function
- [ ] Utilities have validation and JSDoc
- [ ] `npm test` shows 0 failures

---

## Exercise 3: Programmatic output and fleet (35 min)

Automate a report in the terminal, then delegate independent analysis of the same
project. The app also supports `/fleet` and `/research`.

### Part A: Programmatic mode (15 min)

`-p` runs one prompt and exits, so you can use it in scripts and pipelines.

1. Copy the script into your project:

   ```bash
   cp sessions/session-m2-01-copilot-cli/lab/starter/cli-exclusive/pipeline-script.sh \
     ~/copilot-labs/session-m2-01/agent-tasks/pipeline-script.sh
   cd ~/copilot-labs/session-m2-01/agent-tasks
   ```

2. Open `pipeline-script.sh`. You fill in the Copilot commands at its TODO
   comments.

3. Try a one-shot answer first:

   ```bash
   copilot -p "What is the current git branch?" --allow-tool='shell(git)' --silent
   ```

   Compare it with `git branch --show-current`. `--silent` removes CLI commentary.
   It doesn't fix the answer format.

4. Try structured output:

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

   `--output-format=json` emits a **JSONL event stream**, not one JSON array with
   the answer. Look at the event types and any error. Parsing every line proves
   the format, not that the task succeeded. Read the exit status right after the
   Copilot command.

5. Complete the TODO sections, by hand or with the CLI:

   ```text
   Read starter/cli-exclusive/pipeline-script.sh and fill in all the TODO sections
   ```

6. Run it:

   ```bash
   chmod +x pipeline-script.sh
   ./pipeline-script.sh
   ```

   Expect an `agent-tasks` health report with git history analysis, a code
   assessment, and a TODO scan. Compare with
   `lab/solution/cli-exclusive/pipeline-script.sh`.

**Queue a follow-up and background a command.** Use a harmless timed command to
practice the controls. In interactive Copilot:

```text
Run only node -e "setTimeout(() => console.log('training wait complete'), 15000)"
and report its exit status. Do not edit files or detach the process.
```

While it runs, type `After the command finishes, restate its output and exit
status without running it again.` and press **Ctrl+Q** to queue it. Check the
pending label, then press **Ctrl+X, b** to move the running command to the
background. Open `/tasks` to see its state and result.

When the queued follow-up arrives, compare its claim with the real output. If the
command finishes before you press the shortcuts, retry once. Backgrounding keeps
the work in the CLI session. It doesn't detach the process or make shared-file
writes safe. `Ctrl+S` stashes or restores an unsent draft. It doesn't queue or
send it. Note which control did what.

### Part B: Research with `/research` (5 min)

`/research` starts an agent that searches your code, GitHub repositories, and the
web, then writes a report.

1. Pick one topic from `starter/cli-exclusive/research-topics.md`.
2. Run it in `copilot`:

   ```text
   /research What are the security best practices for Express.js middleware in 2026? Cover OWASP Top 10 mitigations.
   ```

3. Watch for: GitHub repository searches, cited sources, time versus a normal
   prompt, and depth.
4. Save the output with `/share file research`.
5. Compare it with the answer to "tell me about Express.js security."

### Part C: Plan and supervise a fleet (15 min)

Open `starter/cli-exclusive/delegation-scenario.md`. Treat the repaired project as
a shared snapshot for independent read-only analysis.

1. Use `/plan` to split the analysis into independent questions. Give each task
   input paths, an expected result, and a stop rule. Keep implementation and its
   dependent tests out of the parallel work.
2. Accept the breakdown, leave Plan mode, and run:

   ```text
   /fleet Use the accepted analysis plan. Delegate independent read-only tasks:
   inspect the route behavior in src/app.js, the input contract in src/utils.js,
   and gaps in tests/. Each task must cite files and distinguish a proven defect
   from a proposed improvement. Do not edit files, install packages, or use the
   network. Stop on scope growth or the agreed usage limit.
   ```

3. Run `/tasks` and open the task details. Stop any task that starts editing or
   widens its scope.
4. Check at least one claim from each result against the source or a focused test.
   Reject claims you can't support.
5. Ask the parent to reconcile duplicates or disagreements. Run `/usage` and note
   the usage and whether the coordination was worth it.

You need live child-task results. Copilot decides how many agents to use. If it
keeps the analysis sequential, note that and ask the trainer to adjust the split.
`/delegate` is cloud delegation and doesn't count as fleet practice (see M3-02).

| Problem | Fix |
| --- | --- |
| `/research` is slow | 1 to 3 minutes is normal |
| `/delegate` fails | Push the repo to a GitHub remote and check cloud agent access |
| `/fleet` not recognized | `npm update -g @github/copilot` |
| Programmatic mode hangs | Add `--max-autopilot-continues=5` |

<a id="checkpoint-3-automation-evidence-captured"></a>

### Checkpoint 3

- [ ] You ran `-p` with `--silent` and `--allow-tool`
- [ ] `pipeline-script.sh` runs and produces a report
- [ ] You compared `/research` with a regular prompt
- [ ] You used `/plan`, `/fleet`, and `/tasks` and read live child results
- [ ] Each accepted child claim has a file reference or focused test
- [ ] You noted usage and whether parallel work helped

---

## Exercise 4: Recovery, isolated alternatives, and surface choice (30 min)

### Part A: Recover a disposable edit (10 min)

Run `npm test` and read the repair diff. Commit the reviewed project files,
including the lockfile and the finished script. Leave out generated reports and
credentials: keep them outside the worktree or in `.gitignore`, so `git status` is
clean before you fork. The commit makes the repair available to a worktree fork.

Ask Copilot to create only `recovery-note.txt` containing `temporary training
note`. Check the file and `git status`. Then run `/rewind` and compare the two
choices:

- **Conversation only** removes turns and leaves files.
- **Conversation + files** also restores the agent's tracked edits for those
  turns. Later manual edits may be skipped.

Choose **Conversation + files**. Check that the note is gone and the committed
repair remains. Don't edit the note by hand first. Rewind isn't a Git rollback and
can't undo a push or an external action.

### Part B: Fork context and move a draft (10 min)

From the clean repaired repo:

```text
/fork worktree
```

Ask the fork for `pwd`, its branch, and `git worktree list`, and compare them with
the parent. A plain `/fork` copies conversation context only, without isolating
files. `/fork worktree` adds a separate checkout of `HEAD`. The parent's
uncommitted work stays behind.

In the fork, ask for a read-only alternative to the utility refactor, then have
Copilot write only `alternative-note.txt` with it. Check the file and run:

```text
/move
```

Check the new path and Git status. The draft should now be in the new worktree. If
the client reports a conflict, don't force the move. Go back to the parent with
`/resume` and check its path, branch, and status. Don't merge the alternative or
delete worktrees yet.

`/worktree` leaves uncommitted edits behind. `/move` carries them. `/resume`
restores a conversation, `/compact` summarizes one, and `/new` starts fresh. Check
the workspace after each step.

### Part C: Surface comparison and cheat sheet (10 min)

Pick one task from `lab/starter/comparison-tasks.md`. Do it in the CLI and the
IDE, and note the tradeoff. Pick two scenarios from
`lab/starter/workflow-scenarios.md` and explain your surface choice.

Fill in `lab/starter/cli-cheatsheet-template.md` with your top five CLI commands,
your CLI-versus-IDE rules, your shortcuts and aliases, and notes from today.
`lab/solution/cli-cheatsheet-example.md` shows a finished one.

Restore your original `/limits` setting. Keep any cap that existed before the lab.

### Checkpoint 4

- [ ] You did the same task in the CLI and IDE and noted the tradeoffs
- [ ] The rewind removed the note and kept the committed repair
- [ ] You checked the worktree fork and moved draft against real paths and Git status
- [ ] You chose CLI or IDE for two scenarios
- [ ] You have a CLI workflow cheat sheet

---

## Final deliverable

Submit one folder with:

1. The fixed `agent-tasks/` project and passing `npm test` output.
2. The finished `pipeline-script.sh` and one generated health report.
3. `workflow-record.md` with the critique, controls, queue and background results,
   recovery and worktree state, and fleet results.
4. The CLI-versus-IDE comparison and your cheat sheet.

Another learner should be able to trace the plan revision to the diff, check the
accepted fleet findings, and run the tests and script. Shell-only work or a cloud
delegation doesn't complete this lab.

## Command references

- [CLI commands and shortcuts](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [Rubber duck](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck)
- [Session-limit guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit)
- [Local sandbox settings](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings)
