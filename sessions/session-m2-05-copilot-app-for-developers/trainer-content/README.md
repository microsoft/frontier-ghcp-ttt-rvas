---
description: "Trainer guide for GitHub Copilot app engineering sessions and PR readiness"
---

# Session M2-05 trainer guide: GitHub Copilot App for developers

**Duration:** 60 minutes  
**Format:** Concept teaching, prepared demo, lab briefing

## Delivery objective

Show how the app's workspaces separate tasks with different risks. Teach learners
to choose the surface for the task and isolate concurrent work. Before deciding
PR readiness, have them check tests, diffs, and review threads.

## Pacing

| Segment | Time | Exit signal |
| --- | ---: | --- |
| App surfaces and engineering layout | 10 min | Learners can find Projects, Chats, My work, sessions, and Automations |
| Chats, sessions, modes, and worktrees | 15 min | Learners can justify a surface, mode, and workspace |
| Context, handoffs, and local checks | 12 min | A fresh session could continue from the written handoff |
| Issue, PR, review, checks, and critique | 13 min | Learners can state why local success is not PR readiness |
| Demo close and lab route | 10 min | Each learner has checked app access |

## Trainer preflight

Run these checks on the delivery machine:

1. Open the GitHub Copilot app and sign in with a training account your organization allows.
2. Add `lab/starter` as a local project or copy it to a training sandbox your organization allows.
3. Check that Chat and a project session both open.
4. Check that Interactive, Plan, and Autopilot appear in the mode picker.
5. Start a working-tree session and check its branch with `git status`.
6. Check `/plan`, `/review`, `/rubber-duck`, `/fork`, `/merge-to-parent`, and `/spar`.
7. Check that the training Git baseline is committed and the repair is left
   uncommitted for local diff review.
8. Open My work and Automations only in a synthetic or training repository you may use.
9. Keep `lab/starter/prepared-evidence/` open for trainer demo recovery.
10. Rehearse returning only `planning-alternative.md` from the fork before any
    repair. Check local sandbox settings and tool approvals without weakening them.

**Access is required for the lab.** A learner who cannot open and use the app must
stop the lab. Stop if a required command is missing too. Do not spend lab time
bypassing policy or moving code
to an unapproved assistant.

## Tie the app layout to engineering decisions

Avoid a feature tour. Tie each area to a decision:

| Area | Engineering use |
| --- | --- |
| Chats | Explore an idea without creating a dedicated branch or worktree |
| Projects | Group local folders or repositories and start agent sessions |
| Active sessions | Switch between isolated tasks and inspect their state |
| My work | Read issues, PRs, review activity, and checks |
| Automations | Save a repeatable task with named triggers and tools |
| Settings | Control project instructions, sandboxing, and session defaults |

Ask learners to save output the next session needs rather than leave it only
in the conversation.

## Explain chat versus project session

A chat is useful before the team has decided to change code. It can compare
approaches, explain a failing test, or help tighten issue language.

A project session owns task state and can work against repository files. Start one
when the expected result includes edits, command output, a branch, or a pull request.

Use this decision test:

```text
If the next useful artifact is an explanation, start with chat.
If the next useful artifact is a changed or verified repository, start a session.
```

## Explain the modes

Use the mode names exactly as the app shows them.

- **Interactive:** Choose it when the learner expects to steer decisions as the
  agent works.
- **Plan:** Choose it when the work crosses files or carries enough risk to justify
  plan approval before edits.
- **Autopilot:** Choose it only after scope, checks, and stop conditions are clear.
  The learner still reviews the output.

Do not teach Autopilot as the default for "hard" work. Complex work often needs
more checkpoints, not fewer.

## Explain workspace choice

The app can start a session in a working tree, the local repository, or a cloud
sandbox when that option is available. This lab uses a local working tree.

Show the difference between separation and restriction:

- A working tree separates branch files from other sessions.
- Local sandboxing limits the files, network, or credentials that agent-run tools
  can reach.

Before editing, run:

```bash
pwd
git status --short --branch
git worktree list
```

The lab initializes a Git baseline before the working-tree session starts.
Do not replace it with a non-Git folder: `/review` needs the repair diff.

## Demonstrate context and handoff

Attach `lab/starter/issue-brief.md` and
`lab/starter/tests/test_readiness.py`. Ask the session to explain the failing
behavior before it edits.

After the plan is approved, have the session create a handoff using:

```text
Summarize the goal, accepted scope, files changed, checks run with exact results,
open risks, and the next human decision. Keep the handoff usable in a fresh session.
```

Open a fresh session and attach the handoff. Ask which files or check results
are missing. Use the answer to check whether another session could continue the
work.

## Demonstrate the inner loop

The starter has a small Python module with deliberate readiness gaps. Demonstrate
this repair sequence:

1. Run the focused tests and capture the failure.
2. Map each failing assertion to the issue criteria.
3. Use `/plan`, then critique the plan with `/rubber-duck` before implementation.
4. Record accepted and rejected suggestions and revise the plan.
5. Check the project diff, approve the plan, and leave Plan mode.
6. Edit only `readiness_guard/readiness.py` unless a test change is justified.
7. Run the focused tests and inspect the diff.
8. Run `/review` before committing; check its findings against code and tests.

Use the exact test command:

```bash
python -m unittest discover -s tests -v
```

## Demonstrate independent critique

Ask the rubber duck agent to inspect the plan or tests without editing:

```text
/rubber-duck Critique the plan and tests against issue-brief.md before any
implementation. Look for false READY verdicts and gaps in sorted reason codes.
Do not edit files or propose unrelated features.
```

Record the critique in `engineering-review.md`. Apply useful findings to the plan
and explain rejected suggestions. A no-findings result does not need a fabricated
revision. If the command is unavailable, stop and resolve access before the lab.

Explain why this is a second opinion: rubber duck is built in and read-only;
Copilot automatically chooses a contrasting model when one is available. Do not
promise a fixed vendor or report a model the client did not show. Manual use
adds a reasoning pass. Session M2-01 covers CLI `/subagents` and the persistent
Proactive invocation opt-in; do not present that CLI picker as an app command.

Before implementation, fork the plan with app `/fork`, check the fork's actual
workspace, and run `/spar` on the same brief and tests. Its documented purpose is
adversarial reasoning, not a promise of rubber duck's model or tool behavior.
Keep it read-only through the task and permissions, then write only the checked
analysis note. Inspect `/merge-to-parent` and accept only that note. Check that
parent source still matches the baseline before approving implementation.
This local return is unrelated to merging a GitHub PR.

After implementation, run `/review` against the uncommitted repair. The critic
checks the proposed approach; the reviewer checks the actual patch. Repeat tests
and review after any correction.

## Teach the outer loop

Open `prepared-evidence/05-pr-snapshot.json` during the demonstration. It gives
every learner the same issue, diff, review, and check state.

Ask these questions in order:

1. Which issue criterion does each changed file support?
2. Did the diff add unrelated scope?
3. Which review threads still block approval?
4. Which checks are required?
5. Which files, review results, or check results are missing or stale?
6. Who makes the final readiness decision?

The expected verdict for the supplied snapshot is **NOT READY**. One required check
fails and a blocking review thread remains unresolved.

## Demonstrate the automation boundary

Open `automation-prompt-template.md`. The learner creates a manual automation or,
when cloud automation is unavailable, writes the same specification.

Use only read tools. The prompt must forbid comments, labels, pushes, approvals,
merges, and thread resolution. Have learners check that the report cites its
sources and names uncertainty. The automation is not the responsible reviewer.

## Common coaching corrections

| Learner move | Coach response |
| --- | --- |
| Starts Autopilot with a vague request | Ask for scope, checks, and a stop condition first |
| Opens work in the local repository | Ask whether a parallel session could touch the same files |
| Attaches the whole project | Ask which files affect the next decision |
| Treats passing tests as PR approval | Open review threads and required checks |
| Accepts critique without checking it | Ask which code or test result supports the critique |
| Calls the author's second answer independent critique | Use the required `/rubber-duck` command |
| Commits before `/review` | Keep the repair diff available until review and triage finish |
| Gives the automation write tools | Remove every tool that is not needed for the report |

## Trainer demo recovery

If the trainer demonstration fails, use the saved session output to explain
the remaining decisions. Do not use that output as the learner lab or count it as
hands-on app practice.

## Official references

The 120-minute lab allocates 15 minutes to isolation, 55 to plan/fork/repair/review,
20 to the fresh handoff, and 30 to PR readiness and automation. Keep the checked
critique, fork result, and code review if discussion runs long; reduce the app
tour instead.

Session M7-05's developer route continues with live `/orchestrate` work over local
synthetic files. It does not require the product track's GitHub issues or MCP
access. Do not start a fleet inside this Session M2-05 lab.

Checked on **October 15, 2026**:

- [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)
- [Work with agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Configure local sandboxing](https://docs.github.com/en/copilot/how-tos/github-copilot-app/configure-local-sandboxing)
- [Manage issues and pull requests](https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests)
- [Use automations](https://docs.github.com/en/copilot/how-tos/github-copilot-app/using-automations)
- [Slash command reference](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [Rubber duck agent](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck)
