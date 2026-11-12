# Session M2-01 trainer guide: GitHub Copilot in the CLI

## Teaching goal

Learners leave able to run the plan, implement, review loop in the CLI. They know what to approve, how context works, and when to reach for the IDE instead.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | What the CLI is, install, sign in |
| 0:08 to 0:15 | Interactive vs `copilot -p` |
| 0:15 to 0:25 | Plan mode and the core loop (demo) |
| 0:25 to 0:33 | Slash commands that matter |
| 0:33 to 0:45 | Permissions and context |
| 0:45 to 0:55 | Resume, CLI vs IDE, pros and cons, advanced slides |
| 0:55 to 1:00 | Lab handoff |

## Preparation

- Install the CLI and sign in. Run `copilot --version`.
- Copy `lab/starter/agent-tasks` to a scratch folder. Run `npm install` and `npm test`. Expect 4 passing and 3 failing.
- Run the lab once. Keep `lab/solution/agent-tasks` open to compare.
- Check the current [Copilot CLI docs](https://docs.github.com/en/copilot/how-tos/copilot-cli) for command or flag changes. The CLI changes fast.
- Learners need Node.js 22 or later, Git, and Copilot access. If someone can't sign in, pair them with a neighbor and keep going.

## What the CLI is (0:00 to 0:08)

- It is an agent in the terminal, not a chat box. It reads files, edits them, and runs commands.
- Install with npm, Homebrew, or WinGet. The first run asks for sign-in and folder trust.
- **Trust** lets Copilot read and act in that folder. Say it plainly: trust only your own folders.

## Interactive vs `copilot -p` (0:08 to 0:15)

- Interactive is a conversation you steer. `-p` answers once and exits.
- In `-p` mode nobody can answer a permission prompt. Allow tools up front with `--allow-tool`, or the command is refused.
- Show both with the same question. Mention that `-p` suits scripts and CI.

## Plan mode and the core loop (0:15 to 0:25)

Demo on a project other than the lab, or the starter in a scratch copy. Use a small bug that spans two files.

1. Press `Shift+Tab` to reach plan mode. Prompt: the bug, the test that shows it, and "smallest fix, don't change tests".
2. Read the plan aloud. Find one thing wrong or too big. Ask for a change.
3. Approve. Allow the first edit once. Allow `npm test` for the session.
4. Run `/diff`. Run `/review`. Read one finding and decide.

Say why: a mistake costs one sentence to fix in a plan and ten minutes to fix in code.

## Slash commands that matter (0:25 to 0:33)

Show each in 30 seconds: `/help`, `/model`, `/context`, `/compact`, `/diff`, `/review`, `/resume`, `/skills`, `/mcp`. Say that `/skills` and `/mcp` come back in M3 sessions. Don't show more commands. Learners can find them with `/help`.

## Permissions and context (0:33 to 0:45)

**Permissions.**

- Allow once, allow for the session, deny. Explain when each fits.
- `--allow-tool` and `--deny-tool` set the same rules from the command line.
- Tell the story: `/allow-all` is fast until the first surprise command.
- Rule of thumb: allow for the session only what you could describe from memory, like `npm test`.

**Context.**

- `@file` for one prompt. Instructions for every session.
- Write a short instructions file live: how to test, one scope rule.
- `/context` shows how full the window is. `/compact` summarizes it.

## Resume, CLI vs IDE, advanced (0:45 to 0:55)

- `copilot --continue` reopens the latest session. `/resume` picks one.
- Resumed sessions carry old context. Use `/clear` or `/new` when the task changes.
- Walk the CLI vs IDE table. Ask: "Where would you fix a bug on a remote box?"
- Advanced slides take one minute each. Say what it is, say the tradeoff, point to the stretch task.

## Pros, cons, tips

| Pros | Cons |
| --- | --- |
| Works anywhere a terminal works, including SSH | No inline completions |
| Scriptable with `-p` | Text-only diffs |
| Plan mode catches mistakes early | Permission prompts need attention |
| Shares repo instructions with the IDE | Long sessions drift |

**Tips**

- Ask for a plan before any change across several files.
- Name files with `@` instead of describing them.
- Commit before a large task. `git diff` then shows only Copilot's work.
- Run the tests yourself. Don't trust "all tests pass" in a summary.
- Put repeated advice in the instructions file.

## Common mistakes

- **Approving without reading.** Read the command.
- **Using `/allow-all` to silence prompts.** Allow the one command for the session instead.
- **Approving a plan you skimmed.** Check it against the code.
- **Letting Copilot change the tests to make them pass.** Say it in the instructions.
- **One endless session.** Start a new one per task. Use `/compact` in between.
- **Vague instructions.** "Write good code" does nothing. "Run `npm test`" does.
- **Trusting `/review` blindly.** It finds real issues and false ones.

## Lab notes

- **Part 1:** Cap sign-in problems at five minutes. Pair learners who are blocked.
- **Part 2:** Learners often skip the flag and wonder why the command is refused. That is the lesson.
- **Part 4:** Plans vary by model. Expect different wording. The three causes are:
  1. `GET /tasks` filter uses `!==` instead of `===`.
  2. `GET /tasks/:id` compares a number with a string. It needs `parseInt`.
  3. `PUT /tasks/:id` spreads the old task last, so the update is lost. Swap the order.
- **Part 5:** If a learner's run asks fewer prompts than the others, check their `/permissions` or `copilot config`.
- **Part 8:** Accept any answer with a concrete reason.
- **Part 9:** Fleet and Autopilot results vary. Treat them as a demo of the tradeoff, not a pass or fail.

## Answer key

The fixed project is in `lab/solution/agent-tasks/`. The reference instructions are in `.github/copilot-instructions.md` there.

## References

- [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)
- [Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli)
- [Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [Copilot CLI programmatic reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-programmatic-reference)
