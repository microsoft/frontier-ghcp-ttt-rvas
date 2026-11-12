# Session M5-01 trainer guide: Brady's Squad

## Teaching goal

Learners leave knowing what Squad really is, how a team is defined and remembered, what Ralph does, and when a team of agents is worth its cost.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:10 | What Squad is |
| 0:10 to 0:25 | Charters, routing, and shared memory |
| 0:25 to 0:35 | How it runs, and Ralph |
| 0:35 to 0:50 | Demo: a live run |
| 0:50 to 0:57 | Team or one agent? |
| 0:57 to 1:00 | Lab handoff |

## Preparation

- Install Squad and the Copilot CLI. Run the whole lab once. **Check the Squad README for your version**: install method, file names, and flags change.
- Keep a finished `squad-run` project to fall back on. A live run takes minutes and can stall.
- Open [bradygaster/squad](https://github.com/bradygaster/squad) and its `docs/` folder. Read "What is Squad?", "Memory & Knowledge", "Parallel Work & Models", and "Ralph".
- Prepare a throwaway GitHub repo with three `squad`-labeled issues for the Ralph demo.
- Warn learners about Node.js 22.5 or later for the npm install.

## What Squad is (0:00 to 0:10)

- Squad is an **open-source tool** that gives you a human-led team of AI specialists. Brady Gaster maintains it. It is not a GitHub product, so say so.
- The team lives in your repo as files, in `.squad/`. Commit them and anyone who clones gets the team.
- You talk to a **coordinator**. It reads your request, applies routing, and starts specialists as separate sub-agents with their own context.
- A **Scribe** records decisions. **Ralph** watches the work queue. Both are on every team.
- It is not "a chatbot wearing hats". Each specialist has its own context window and its own memory file.
- Humans stay accountable. Squad drafts and coordinates. You review and merge.

Ask: "What would you want a team to do that one agent can't?" Collect answers. Come back to them at 0:50.

## Charters, routing, and shared memory (0:10 to 0:25)

Show each file from a real project.

| File | Job |
| --- | --- |
| `team.md` | Roster. Who is on the team. |
| `routing.md` | Who handles which kind of work. |
| `agents/<name>/charter.md` | Identity, what the agent owns, what it doesn't handle. |
| `agents/<name>/history.md` | What this agent learned about your project. Only that agent reads it. |
| `decisions.md` | Shared rules and choices. **Every agent reads it before working.** |
| `decisions/inbox/` | Where agents drop new decisions. The Scribe merges them. |
| `casting/` | Persistent names from a themed universe. |

Teach these points:

- **Charter** = a job description. Narrow charters make routing predictable.
- **Routing** = a table. Named request beats path rule beats skill match. If nothing matches, the lead triages. You can always name an agent.
- **Shared decisions** keep agents from re-arguing settled questions. **Personal history** lets an agent get better at its own area.
- **Directives**: say "always" or "never" and Squad saves it as a team rule.
- Memory is **plain Markdown in git**. You can read it, diff it, and fix it.
- Context cost: a long `decisions.md` and long histories get loaded into every spawn. `squad nap` compresses them.

Say clearly: **the folder layout and roles come from Squad. The names, routing rows, and decision text are your team's.** Learners confuse a sample file with a required format.

Version note: docs and README have differed on some names (for example `history.md` or `context.md`). Tell learners to trust what their version wrote.

## How it runs, and Ralph (0:25 to 0:35)

- Interface: `copilot --agent squad` in the Copilot CLI is the recommended way. In VS Code, pick the **Squad** agent in Copilot Chat. The `squad` command is for setup and checks (`init`, `upgrade`, `doctor`, `watch`). Its interactive shell is deprecated.
- `squad init` writes the files. Copilot then loads the coordinator as a custom agent.
- Parallel work: the coordinator checks dependencies, starts independent agents in the background, and runs dependent ones in order. A reviewer gate runs before the result returns.
- `--yolo` skips tool approvals. Explain why the lab allows it and why a real repo shouldn't.
- **Ralph** has three forms:
  1. In a chat session, Ralph checks GitHub for more work after each batch.
  2. `squad watch` polls on a timer. Without `--execute` it only triages. With it, it starts Copilot sessions.
  3. A GitHub Actions heartbeat triages labeled issues between sessions.
- Ralph needs `gh` and a token that can read and write issues and PRs. Check the Squad docs for the current scope advice.
- Ralph triages from `routing.md`. A weak routing table means weak triage.

## Demo: a live run (0:35 to 0:50)

1. In an empty sample repo, run `squad init`. Show the folder.
2. `copilot --agent squad --yolo`. Say what you're building. Show the proposed roster. Rename one member. Accept.
3. Open `routing.md` and one charter. Read three lines aloud.
4. Give a multi-part task. Use the lab task or something similar with a shared file.
5. While it runs, narrate: who started, who waits, who is writing to `decisions/inbox/`.
6. Review as a human. Run the tests. Say "always return errors as `{ error }`" and show the directive land in `decisions.md`.
7. Show `orchestration-log/` and one `history.md`.

If the run stalls, switch to the finished project and walk its files. Tell learners you did.

## Team or one agent? (0:50 to 0:57)

Reveal the answers to the 0:00 question.

| A team helps when | A single agent is better when |
| --- | --- |
| Parts are independent (docs, tests, separate modules) | The task is small or tightly coupled |
| Roles need different context or tools | One file or one idea carries the task |
| Work spans many sessions and needs memory | It is a one-off |
| You want a standing review gate | You'd read all of it anyway |
| A backlog needs triage (Ralph) | You have two issues |

What a team costs:

- **Tokens.** Every specialist starts with its own context and reads `decisions.md` and its history. More agents mean more input tokens, and the coordinator adds its own.
- **Coordination overhead.** Splitting, routing, and collecting takes time. Small tasks finish slower.
- **Conflicting edits.** Parallel agents can overwrite the same file. Routing says "split only independent deliverables." When your task isn't independent, don't split it.
- **Review load.** You read several agents' output plus their memory files.
- **Memory drift.** Stale decisions mislead every agent. Prune them.

Rule of thumb: start with one agent. Add a team when you hit a ceiling you can name.

## Lab handoff (0:57 to 1:00)

Show the lab parts. Point at Part 6 (single-agent comparison) and say it's the point of the lab. Remind learners to use the throwaway repo for Ralph and to delete it.

## Lab timing and tips

| Part | Common snag |
| --- | --- |
| 1 | Node.js below 22.5. Use another install method. |
| 2 | Learners skip the roster tweak. Make them change one thing. |
| 3 | The run takes long. Tell learners to read `routing.md` while they wait. |
| 4 | The team skipped the shared-file conflict. Ask which agent edited `api.js`. |
| 5 | A file name differs. Ask learners to list `.squad/` and use what is there. |
| 6 | Usage numbers are hard to find. Accept request counts or wall-clock time. |
| 7 | `gh` token lacks scope. Check the Squad docs, then use a PAT. |

## Answer key

- Part 2 questions: reviewer and ownership are in `routing.md` and charters. Learners cite their own files.
- Part 4: a correct run has both `api.js` changes, passing tests, and a README that matches. See `lab/solution/README.md`.
- Part 6: expect the team to cost more and to take longer on this size of task. Some runs show fewer README or test misses from the team. Don't force a winner.
- Part 7: each issue should get a `squad:<member>` label that fits `routing.md`.

## Pros, cons, and tips

**Pros**

- Memory persists in git and carries across sessions.
- Charters and routing make roles visible and editable.
- Parallel work saves time on independent parts.
- Decisions are written down where everyone, including humans, can read them.

**Cons**

- Higher token and request use.
- Slower on small tasks.
- Newer tool that changes quickly. File names and flags move.
- More output to review.
- Needs good routing. A vague table sends work to the wrong agent.

**Tips**

- Keep the team small. Three to five specialists is plenty.
- Write narrow charters, with "I don't handle" lines.
- Give each agent its own files in the task.
- Review `decisions.md` like code. Delete what's stale.
- Run `squad nap` when histories grow.
- Use `squad doctor` when something breaks.

## Common mistakes

- Treating a sample `.squad/` file as the required format.
- Using a team for a task one agent finishes in a minute.
- Splitting work that edits the same file.
- Running `--yolo` on a repository you care about.
- Never reading `decisions.md`, then wondering why agents behave oddly.
- Expecting Ralph to work without `gh` access or without a useful `routing.md`.
- Leaving `squad watch --execute` running.
- Assuming the docs match your installed version.

## References

- [bradygaster/squad](https://github.com/bradygaster/squad)
- Squad docs in the repo: `docs/src/content/docs/concepts/` and `features/ralph.md`
- [Squad installation guide](https://bradygaster.github.io/squad/docs/get-started/installation/)
- [GitHub Copilot CLI documentation](https://docs.github.com/en/copilot/how-tos/copilot-cli)
