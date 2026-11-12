# Session M5-01 lab: Run a real Squad team

**Duration:** 2 hours
**Deliverable:** A Squad team in a sample repo, one finished multi-part task, your notes on what the team did and cost, and a Ralph triage run

## Lab overview

You install Squad, create a team for a small Express API, and give it one task with four parts. You watch the team split the work, steer it, and read the files it wrote. Then you compare against a single agent and try Ralph on real GitHub issues.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Install Squad and set up the project | 10 min |
| 2 | Create the team | 15 min |
| 3 | Give the team a task | 30 min |
| 4 | Review and steer | 15 min |
| 5 | Read what Squad wrote | 10 min |
| 6 | Same task, one agent | 20 min |
| 7 | Ralph on real issues | 20 min |

## Before you start

Squad installs in the **sample project only**. Use a scratch folder. Use synthetic data only.

```bash
mkdir -p ~/copilot-labs/session-m5-01
cp -R sessions/session-m5-01-squad-orchestration/lab/starter/squad-project \
  ~/copilot-labs/session-m5-01/
cd ~/copilot-labs/session-m5-01/squad-project
npm install && npm test
git init -q && printf 'node_modules/\n' > .gitignore
git add -A && git commit -qm "Start" && git branch -M main
```

The tests should pass.

## Part 1: Install Squad

The Squad README lists several install methods. With Node.js 22.5 or later, use npm:

```bash
npm install -g @bradygaster/squad-cli@latest
squad --version
```

Other methods (Homebrew, WinGet, an install script) are in the Squad README. **Check the Squad README for your version** if the command or the Node.js requirement has changed.

Create the Squad files:

```bash
squad init
```

`squad init` is safe to run again. Read its output. It may ask questions. Answer them from the project: a small Node.js and Express API with Jest tests. The README also describes `squad init --preset default`, which starts with a ready-made team. Skip the preset in this lab. You want to see the team being proposed.

```bash
squad doctor
git status --short
```

`squad doctor` checks your setup. `git status` shows what `init` added. Squad owns the coordinator file and templates. Your team's state goes in `.squad/`.

**Checkpoint:** `.squad/` exists and `squad doctor` reports no blocking problem.

## Part 2: Create the team

Start the Copilot CLI with the Squad agent:

```bash
copilot --agent squad --yolo
```

`--yolo` lets Squad run its many tool calls without asking each time. That is acceptable here because the project is a disposable sample. Don't use it on a real repository until you understand what Squad runs. In VS Code you can pick the **Squad** agent in Copilot Chat instead.

Tell the coordinator what you are building:

```text
This is a small Express API with a users resource and Jest tests. Set up the team.
```

Squad scans the repo and **proposes a roster**: a lead, one or more developers, a tester, and a Scribe. Each member gets a name from a themed "universe". That is **casting**: names persist, so the same person returns in every session.

Change something before you accept. For example, ask it to drop a role you don't need, or rename a member. Then say `yes`.

Open the files it wrote. File names depend on your Squad version, so check the README if one is missing.

```bash
ls -R .squad | head -50
```

Read three of them:

- `.squad/team.md` is the **roster**.
- `.squad/routing.md` says **who handles what**. Look for rules tied to `src/` and `tests/`.
- One agent's `charter.md` says what that agent owns, what it does not handle, and how it works.

**Checkpoint:** You can answer from the files: Who reviews work? Who owns `tests/`? What does the lead's charter forbid?

## Part 3: Give the team a task

Commit the new team first, then work on a branch so you can compare later.

```bash
git add -A && git commit -qm "Add Squad team"
git switch -c squad-run
```

In the Squad session, paste this task:

```text
Do these four things in this repo:
1. Validate POST /api/users: reject a malformed email and a name over 100 characters with 400.
2. Add a tasks resource: GET /api/tasks (optional ?status=todo|doing|done), POST /api/tasks
   (title required, at most 100 characters), PATCH /api/tasks/:id (change status), and
   DELETE /api/tasks/:id. Status is todo, doing, or done.
3. Add tests for both changes.
4. Document the new endpoints in README.md.
```

The task has parts that can run **in parallel** (docs, tests) and parts that **touch the same file** (items 1 and 2 both change `src/routes/api.js`). That is on purpose.

Watch the session. As it runs, write down:

- Which agents the coordinator started, and in what order.
- What it ran in parallel and what it ran one after another.
- Whether any two agents touched the same file.
- Whether anyone asked you a question or stopped for review.

Don't interrupt unless the team is stuck. Expect this to take several minutes. A multi-agent run is slower to read than a single-agent run, even when it finishes sooner.

**Checkpoint:** The session reports the work as done, and you have your notes on who did what.

## Part 4: Review and steer

You stay in charge. Review the result like a pull request.

```bash
git diff main --stat
npm test
```

Open `src/routes/api.js` and check that **both** the user validation and the tasks routes are present. Compare the README with the real endpoints.

Pick one thing you would change and steer the team in the same session. Examples:

- "Return errors as `{ error, field }` everywhere."
- "Always write tests before changing a route."
- "Fix the README. It lists an endpoint that doesn't exist." (Only if it's true for your run.)

Squad treats a phrase like "always" or "never" as a **directive**: a rule saved for the whole team. Try one, then check that it was saved (Part 5).

Run `npm test` again.

**Checkpoint:** Tests pass, and you steered the team at least once.

## Part 5: Read what Squad wrote

Commit the run and look at what changed under `.squad/`:

```bash
git add -A && git commit -qm "Squad run"
git diff HEAD~1 --stat -- .squad
```

Open these. If one is missing, check the Squad README for your version.

| File | Ask |
| --- | --- |
| `.squad/decisions.md` and `.squad/decisions/inbox/` | Which decisions did agents record? Is your directive here? |
| `.squad/agents/<name>/history.md` | What did one agent learn about this project? |
| `.squad/orchestration-log/` | What did the coordinator start, and why? |
| `.squad/log/` | Is there a session record? |

Now separate **what the product requires** from **what this run chose**. Squad defines the folder layout, the roster, routing, charters, and decisions. The agent names, the routing rows, the decision wording, and the error format are this run's choices. Don't copy them into another project as if they were required.

Check the cost. The Squad CLI documents `squad cost`, but also says hosts that run the coordinator themselves, such as the Copilot CLI, don't write its usage ledger. Use the Copilot CLI's own usage view (check the current Copilot CLI docs for the command) and note the total for the run.

**Checkpoint:** You can point to one decision, one history entry, and one orchestration entry, and say which agent wrote each.

## Part 6: Same task, one agent

Run the identical task with plain Copilot on a fresh branch. The team's `.squad/` folder is already committed, and plain Copilot ignores it.

```bash
git switch main && git switch -c single-agent
copilot --yolo
```

Paste the same four-part task. Record wall-clock time and the usage total.

Then compare the two branches:

```bash
git diff squad-run single-agent --stat -- src tests README.md
```

Fill in this table in `notes.md`:

| | Squad | One agent |
| --- | --- | --- |
| Time to finish | | |
| Usage (tokens or requests) | | |
| Tests pass | | |
| Both routes edits present in `api.js` | | |
| README matches the code | | |
| What you had to fix yourself | | |

Answer in two sentences each: Where did the team help? Where did it cost more than it gave? A four-part task on one small API is a **weak case for a team**. Say what size of task would change your answer.

**Checkpoint:** `notes.md` has the table and your two answers.

## Part 7: Ralph on real issues

**Ralph** is the work monitor. He is on every roster. He reads GitHub issues, triages them using `routing.md`, and can start agents on them. He needs the `gh` CLI. The Squad docs say the default token may lack the scopes to read and write issues and labels, so you may need a personal access token. **Check the Squad README for your version** before you sign in.

Use a **throwaway repository**, not a real one. Push the project and create three issues:

```bash
git switch squad-run
gh repo create squad-lab-m5 --private --source . --push
gh issue create --title "Add pagination to GET /api/users" --body "Support ?page and ?limit."
gh issue create --title "Add a README section on running tests" --body "Short section in README.md."
gh issue create --title "Return JSON for unknown routes" --body "A 404 JSON error instead of the HTML default."
```

Squad triages issues that carry the `squad` label. Add it to all three:

```bash
gh label create squad --color 0E8A16 2>/dev/null; for n in 1 2 3; do gh issue edit $n --add-label squad; done
```

**Triage only.** Run one pass of watch mode without executing anything:

```bash
squad watch --interval 1
```

Leave it for a minute or two, then stop it with Ctrl+C. Look at the issues: Ralph should assign each one a `squad:<member>` label based on `routing.md`. Flags change between versions. Run `squad watch --help` if one of these fails.

**Execute one.** Pick one small issue (the README one). Ask Ralph in the Squad session:

```text
Ralph, show me what everyone is working on.
Ralph, assign and start the README issue only.
```

Or run `squad watch --execute` and stop it after one issue. Don't leave it polling. Read what it did: the comment on the issue, the branch or PR, and the new entries in `.squad/`.

**Checkpoint:** All three issues have a `squad:<member>` label, and you can explain how Ralph chose the member.

When you finish, stop `squad watch` and delete the throwaway repository.

## Final deliverable

1. The `squad-project` repo with `squad-run` and `single-agent` branches.
2. `notes.md` with your Part 3 observations, the comparison table, and your two answers.
3. A list of three `.squad/` files you read and one thing each told you.
4. Your Ralph result: the labels it assigned, and what it did on the issue you started.

Compare your code against [`solution/`](solution/). Your files and names will differ. Behavior should match.

## References

- [bradygaster/squad](https://github.com/bradygaster/squad)
- [Squad installation guide](https://bradygaster.github.io/squad/docs/get-started/installation/)
- [Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli)
