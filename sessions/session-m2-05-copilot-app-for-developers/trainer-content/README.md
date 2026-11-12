# Session M2-05 trainer guide: GitHub Copilot app for developers

## Teaching goal

Learners leave knowing what a session and a worktree are, how the three modes differ and fail, how to review and ship an agent's work from the app, and when another surface fits better.

Don't tour the app. Session M7-01 does that. Stay on the developer inner loop.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | What the app is, and how it differs from IDE and CLI |
| 0:08 to 0:20 | Sessions, chats, and workspaces (worktrees) |
| 0:20 to 0:35 | Modes, tool permissions, and sandboxes |
| 0:35 to 0:47 | Demo: bug to PR |
| 0:47 to 0:55 | Commands, handoff, pros, cons, tips |
| 0:55 to 1:00 | Lab handoff |

## Preparation

- Install the app and sign in. Type `/` in a session and note which commands from this guide appear.
- Run the lab once with your own throwaway repo. Keep the PR open as a backup.
- Have `git worktree list` ready in a terminal for the demo.
- Make a second small task ready for the comparison (negative quantities).

## What the app is (0:00 to 0:08)

- A desktop app, built on the Copilot CLI, with GitHub integration. It runs on macOS, Linux, and Windows.
- You direct agents. You don't type code. The center of the app is the **session**.
- Sessions can run on **This computer** or in a **Cloud** sandbox hosted by GitHub.

**How it compares.** Use one sentence each.

| | App | IDE agent mode | CLI |
| --- | --- | --- | --- |
| **Lives in** | Desktop app | Your editor | Terminal |
| **Works in** | Its own worktree, or your checkout | Your open checkout | The current folder |
| **Parallel work** | Built in: many sessions, one worktree each | One at a time, in practice | Many terminals, you manage folders |
| **Strong at** | Reviewing diffs, issues, PRs, supervising | Edit with you, inline, in context | Scripts, remote boxes, quick tasks |
| **Weak at** | Heavy for a one-line fix | Easy to collide with your own edits | You build the review flow yourself |

The app and CLI share an engine, so skills, instructions, and many commands carry over.

## Sessions, chats, and workspaces (0:08 to 0:20)

**Chat.** A conversation with no branch and no worktree. Use it to think, compare options, or explain a stack trace. It doesn't edit your repo.

**Session.** An agent working in a repo or folder, with history, a branch, and a diff. Start one when you expect edits, commands, or a PR. Start a **new session** when you switch tasks. Old context hurts new work.

**Workspace.** Where the session works. The prompt box offers:

- **New worktree.** A separate folder on its own branch.
- **Current checkout.** Your existing folder.

**What a git worktree is.** A worktree is a second working folder for the *same* repository. It has its own branch and files, and it shares the repo's history. Two worktrees can't have the same branch checked out. Show it live:

```bash
git worktree list
```

**Why it matters.** Two agents editing one folder overwrite each other and mix up `git status`. Two worktrees don't. You also keep working in your checkout while an agent runs.

**Trade-offs and failure modes:**

- A new worktree has only **tracked files**. A `.env`, `node_modules`, or a virtual environment isn't there. The agent's tests may fail for setup reasons. Tell it how to set up.
- Worktrees use disk. Archive finished sessions (**Settings → Sessions → Manage sessions** shows disk use).
- Isolation stops overwrites, not merge conflicts. Two sessions that change the same lines still conflict at merge.
- **Current checkout** is faster but unisolated. Use it for one session on one task.

## Modes, tool permissions, and sandboxes (0:20 to 0:35)

Three separate settings. Don't let learners mix them up.

| Setting | Controls | Options |
| --- | --- | --- |
| **Mode** | How the agent works with you | Interactive, Plan, Autopilot |
| **Tool permissions** | When it asks before running a tool | Ask every time, Assisted, Approve all |
| **Sandbox** | What a tool *can* reach | Local sandbox (`/sandbox on` or `/sandbox off`), cloud sandbox |

### The modes

| Mode | What it does | Choose it when | Trade-off | Failure mode |
| --- | --- | --- | --- | --- |
| **Interactive** | Suggests changes and waits for your input | The task is unclear, or you want to steer | You are the bottleneck | You approve without reading, or you stall |
| **Plan** (`/plan`) | Writes a plan. You approve before it edits | The change crosses files, or a wrong turn is costly | An extra review step | A plausible plan you rubber-stamp, and the plan misses the real problem |
| **Autopilot** (`/autopilot`) | Works on its own: code, tests, retries | The task is well defined and tests exist | You see the result, not the steps | Runs far on a wrong assumption, burns credits, changes more than asked |

**Autopilot isn't for hard problems.** It is for clear problems. A vague goal plus Autopilot gives a confident wrong answer.

Common pairing: **Plan** to agree the approach, then switch to **Autopilot** to run it, with **Assisted** permissions. You can switch modes at any time.

Mode and permissions are different. Autopilot with *Ask every time* still stops for each tool. Interactive with *Approve all* still waits for you but runs tools without asking. **Approve all** (also `/allow-all-tools` or `/yolo`) removes your check on each command. Use it only in a sandbox or a throwaway repo.

**Sandboxes.** A local sandbox limits the filesystem, network, and credentials of tools on your machine. A cloud sandbox runs the whole session on GitHub. They're different technologies with different settings.

## Demo: bug to PR (0:35 to 0:47)

Use the lab repo. Narrate your choices.

1. Chat: paste the issue. Ask what's ambiguous. (1 min)
2. New session, **New worktree**, **Plan**. Prompt with the issue. (2 min)
3. Read the plan aloud. Ask for one revision, such as "don't change the tests". Approve. (3 min)
4. While it runs, run `git worktree list` and show the new folder. (1 min)
5. Open the diff. Run the tests yourself. Run `/review`. (3 min)
6. `/pr-open`. Show the PR and the check on GitHub. (2 min)

Say out loud what you check each time: tests changed? signature changed? new files?

## Commands, handoff, pros, cons, tips (0:47 to 0:55)

Type `/` in the app for the current list. The ones this session uses:

| Command | Use |
| --- | --- |
| `/plan`, `/interactive`, `/autopilot` | Switch mode, optionally with a prompt |
| `/review` | Review the session's changes |
| `/rubber-duck` | Critique by a different model |
| `/spar` | Argue against your approach |
| `/security-review` | Security-focused review of the diff (public preview) |
| `/fork`, `/merge-to-parent` | Copy a session at the latest turn. Merge it back |
| `/spawn` | Start a focused child session |
| `/compact`, `/clear`, `/context` | Shrink, reset, or inspect context |
| `/pr-open`, `/pr-fix-checks`, `/pr-resolve-comments`, `/pr-merge` | PR steps, each needing an open PR or changes |
| `/terminal`, `/sandbox`, `/rename` | Terminal, sandbox, naming |

Anything the docs don't list or that your picker lacks: **type `/` and check your version's list**.

**Handing off work.** Pick by what you need:

| Need | Use |
| --- | --- |
| Try an alternative without losing the current path | `/fork`, then `/merge-to-parent` or discard |
| Give a side task to a focused agent | `/spawn` |
| Keep going but shorten history | `/compact` |
| Switch task | New session. Paste a three-line brief: goal, what's done, what's next |
| Follow from your phone or browser | Cloud session, or `/remote` if your policy allows it |

A written brief beats a long history. Name the branch, the failing test, and the decision you made.

**Pros**

- Parallel work without folder collisions.
- Diff, checks, and PR in one place.
- Starts from an issue with context loaded.
- Choose autonomy per session.

**Cons**

- Heavier than the CLI for a quick edit.
- Parallel sessions multiply review work. You are the limit.
- Preview features and commands change.
- Worktrees need setup and disk.

**Tips**

- Put the finish line in the prompt: "tests pass, don't edit tests".
- Read the plan as hard as you'd read a design.
- One task per session. Rename sessions with `/rename`.
- Use `/rubber-duck` on plans, not just code.
- Agent Merge can watch a PR, fix checks, and merge. Try it only in a repo you can afford to break.

## Common mistakes

| Mistake | Fix |
| --- | --- |
| Treating the agent's "done" as proof | Run the tests yourself |
| Using Autopilot with a vague prompt | Plan first, then Autopilot |
| Approve all on a real repo | Use Assisted or a sandbox |
| Two sessions in one checkout | New worktree for each |
| Agent edits the tests until they pass | Say so in the prompt, and read the diff |
| Missing `.env` or dependencies in a worktree | Tell the agent how to set up |
| Letting one session run for days | New session per task, with a short brief |

## Lab handoff (0:55 to 1:00)

Learners need `gh` signed in. Point them to the "No GitHub repo" notes in Parts 1 and 6. Remind them to delete the throwaway repo afterwards.

## Lab answer key

Reference fix: [`lab/solution/shop/pricing.py`](../lab/solution/shop/pricing.py). Three root causes: `>` instead of `>=`, coupon applied to shipping and shipping decided on the pre-coupon subtotal, and `round()` on floats (ties round to even). Common agent slips are editing the tests and changing the function signature.

Part 4 answers: each session sees only its own branch, so the second session doesn't have the first fix until you merge. If both edit `pricing.py`, the second merge conflicts.

## References

- [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/copilot-surfaces/github-copilot-app)
- [Work with agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Manage issues and pull requests](https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests)
- [Slash commands for the app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [`git worktree`](https://git-scm.com/docs/git-worktree)
