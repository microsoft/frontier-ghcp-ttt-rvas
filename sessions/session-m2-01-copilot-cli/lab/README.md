# Session M2-01 lab: Fix a bug with plan, implement, review

**Duration:** 2 hours

Your team inherited a small task API. Three tests fail. You use the Copilot CLI to find the causes, agree on a plan, fix them, and review the result. Along the way you try the commands and permission prompts you will use every day.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Install, sign in, copy the project | 10 min |
| 2 | Explore: interactive and `copilot -p` | 15 min |
| 3 | Add context: `@` mentions and instructions | 10 min |
| 4 | Plan the fix | 20 min |
| 5 | Implement and handle permissions | 20 min |
| 6 | Review the diff | 15 min |
| 7 | Resume and manage context | 10 min |
| 8 | CLI or IDE? | 10 min |
| 9 | Stretch (optional) | 10+ min |

## Part 1: Install, sign in, copy the project (10 min)

Install the CLI. Pick one:

```bash
npm install -g @github/copilot
# or: brew install copilot-cli
# or: winget install GitHub.Copilot
```

Start it. The first run asks you to sign in.

```bash
copilot
```

If you don't see a login prompt, type `/login`. If sign-in fails, ask the trainer. Don't spend more than five minutes on it.

Copilot asks whether you **trust the folder** you started in. Trust means it may read files and run tools there. Only trust folders you own. Exit with `/exit`.

Copy the project and make it a Git repository so you can see every change.

```bash
mkdir -p ~/copilot-labs/session-m2-01
cp -R sessions/session-m2-01-copilot-cli/lab/starter/agent-tasks ~/copilot-labs/session-m2-01/
cd ~/copilot-labs/session-m2-01/agent-tasks
npm install
printf 'node_modules/\n' > .gitignore
git init -q && git add -A && git commit -qm "Start"
npm test
```

**Checkpoint:** `npm test` shows 4 passing and 3 failing tests.

## Part 2: Explore with interactive mode and `copilot -p` (15 min)

**Interactive mode** is a conversation. **Programmatic mode** (`copilot -p "prompt"`) answers once and exits. Use it for scripts and quick questions.

Start `copilot` in the project and try these commands:

| Command | What to look for |
| --- | --- |
| `/help` | The list of slash commands. Press `?` on an empty prompt for a shorter list. |
| `/model` | The model picker. Note the current model. Don't change it yet. |
| `/context` | How much of the context window is used. Note the number now. |

Ask a question:

```text
What does this project do? Which files matter most?
```

Exit with `/exit`. Now run one-shot prompts from your shell:

```bash
copilot -p "List the API routes in src/app.js as a table."
copilot -p "Summarize the last git commit." --allow-tool='shell(git log)'
```

The first prompt only reads files, so it runs without asking. The second needs a shell command. In programmatic mode nobody can answer a prompt, so **you allow the tool up front** with `--allow-tool`. Leave the flag out and the command is refused.

**Checkpoint:** you can explain the difference between the two modes, and why the second command needs the flag.

## Part 3: Add context (10 min)

Copilot only knows what you show it. Two ways to show more:

- **`@` mentions.** Type `@` and a file name to attach that file to your prompt.
- **Custom instructions.** A file Copilot reads at the start of every session.

Create `.github/copilot-instructions.md`. Keep it short and specific. Include how to run the tests and one rule about scope. Write your own first. The reference file is in `lab/solution/agent-tasks/.github/copilot-instructions.md`.

Start `copilot` and run `/instructions` to check that your file is loaded. Then try an `@` mention:

```text
Which route in @src/app.js is each test in @tests/app.test.js checking?
```

Commit the file: `git add -A && git commit -qm "Add instructions"`.

**Checkpoint:** `/instructions` lists your file, and the answer cites both files.

## Part 4: Plan the fix (20 min)

**Plan mode** makes Copilot write a plan and wait. It doesn't edit files. Press `Shift+Tab` to cycle modes until you see plan mode, or use `/plan`.

```text
/plan Three tests fail in `npm test`. Find the cause of each failure.
Plan the smallest fix for each one. Name the file and line.
Don't change the tests.
```

Read the plan. Check it against the code yourself.

1. Does each failing test map to one cause?
2. Does the plan touch only what it needs?
3. Is anything missing or wrong?

Now push back. Ask for one change, for example:

```text
Add a step to run npm test after the fixes, and say which test each fix should turn green.
```

Don't approve yet. If a step confuses you, ask about it.

**Checkpoint:** you read the plan line by line and changed it at least once.

## Part 5: Implement and handle permissions (20 min)

Approve the plan and let Copilot implement it. Copilot asks before it runs a tool that can change things, such as editing a file or running a shell command. You can answer three ways:

- **Allow once.** The safe default. Use it while you learn what Copilot runs.
- **Allow for the session.** Stops the prompts for that tool until you exit. Use it for commands you trust, such as `npm test`.
- **Deny.** Copilot continues without that tool and may suggest another way.

Try each one at least once.

1. Allow the first file edit once.
2. When Copilot asks to run `npm test`, allow it for the session.
3. If Copilot asks to run anything else, read the command. Deny one you don't need, such as a `git` write.

Don't use `/allow-all` or `/yolo`. They turn off every prompt.

When Copilot finishes, run the tests yourself:

```bash
npm test
```

If a test still fails, give Copilot the test name and let it try again.

**Checkpoint:** `npm test` passes all 7 tests.

## Part 6: Review the diff (15 min)

Two checks, two purposes. `/diff` shows what changed. `/review` asks a separate agent to look for problems.

```text
/diff
```

Read every changed line. Look for a changed test, a new dependency, or an edit outside the plan.

```text
/review
```

Read the findings. For each one, decide: fix it, ignore it, or ask for detail. A reviewer can be wrong, so don't apply findings blindly.

Commit:

```bash
git add -A && git commit -qm "Fix task API bugs"
```

**Checkpoint:** you can state each of the three causes in one sentence and point to the line that fixed it. Compare with `lab/solution/agent-tasks/src/app.js`.

## Part 7: Resume and manage context (10 min)

Exit with `/exit`. Reopen the last conversation:

```bash
copilot --continue
```

`--continue` reopens the most recent session. `/resume` opens a picker so you can choose an older one.

Run `/context` and compare it with Part 2. The **context window** is the amount of text the model can consider at once. Long sessions fill it. Shrink it with:

```text
/compact focus on the three fixes
```

Run `/context` again. Then ask `What did we change and why?` The answer should still be right.

Also run `/skills` and `/mcp`. Don't install anything. Note whether you have any configured. Later sessions use them.

**Checkpoint:** the context number dropped after `/compact`, and the session still remembers the fixes.

## Part 8: CLI or IDE? (10 min)

For each task, write **CLI** or **IDE** and one reason. Share two answers with the group.

| Task | Your choice and reason |
| --- | --- |
| Rename a variable and see the code beside the change | |
| Fix a failing test in a repo on a remote server over SSH | |
| Step through a bug with a debugger | |
| Run the same prompt in a CI job | |
| Review a multi-file change in a rich diff view | |

There is no single right answer. A good reason names something concrete: SSH, scripting, a debugger, inline suggestions.

## Part 9: Stretch tasks (optional)

Pick one. Each matches an advanced slide.

- **JSONL output.** Run `copilot -p "List the routes in src/app.js" --output-format json`. **JSONL** means one JSON object per line. Find the line that holds the final answer. Use `jq` if you have it.
- **Fleet.** In a copy of the starter project, run `/fleet Add input validation to each function in src/utils.js, one subagent per function.` **Fleet** runs parts of a task in parallel. Open `/tasks` and check that the pieces don't edit the same lines.
- **Worktree.** Run `/new worktree`. A **Git worktree** is a second working folder on its own branch, sharing one repository. Make a small change there and check that your main folder is untouched.
- **Autopilot.** Press `Shift+Tab` until Autopilot mode shows. **Autopilot** lets Copilot keep going without asking after each step. Give it one small, clear goal and read what it did afterward. Check the current docs for permission behavior before you use it on a real project.

## Final deliverable

- The `agent-tasks` repository with the three bugs fixed, committed, and `npm test` passing.
- Your `.github/copilot-instructions.md`.
- Your CLI or IDE answers from Part 8.

## Common problems

- **`copilot` isn't found.** Open a new terminal, or add npm's global bin folder to `PATH`.
- **Node version error.** Run `node -v`. The CLI needs Node.js 22 or later.
- **Copilot edits the tests.** Say `Don't change tests. Fix the code.` Add that rule to your instructions.
- **The plan is vague.** Ask for file names and line numbers.
