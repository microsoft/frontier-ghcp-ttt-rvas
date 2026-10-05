---
description: "Trainer guide for GitHub Copilot app engineering sessions and PR readiness"
---

# Session 29 Trainer Guide: GitHub Copilot App for Developers

**Duration:** 60 minutes  
**Format:** Concept teaching, prepared demo, lab briefing

## Delivery objective

Learners should treat the app as a set of engineering workspaces with different
risk boundaries. The main lesson is simple: choose the right surface, isolate the
work, and require evidence before moving from code to pull-request readiness.

## Pacing

| Segment | Time | Exit signal |
| --- | ---: | --- |
| App surfaces and engineering layout | 10 min | Learners can find Projects, Chats, My work, sessions, and Automations |
| Chats, sessions, modes, and worktrees | 15 min | Learners can justify a surface, mode, and workspace |
| Context, handoffs, and inner-loop evidence | 12 min | A fresh session could continue from the written handoff |
| Issue, PR, review, checks, and critique | 13 min | Learners can state why local success is not PR readiness |
| Demo close and lab route | 10 min | Each learner has a live or fallback route |

## Trainer preflight

Complete this check on the delivery machine:

1. Open the GitHub Copilot app and sign in with an approved training account.
2. Add `lab/starter` as a local project or copy it to an approved sandbox first.
3. Confirm that Chat and a project session both open.
4. Confirm that Interactive, Plan, and Autopilot appear in the mode picker.
5. Start a working-tree session and verify its branch with `git status`.
6. Type `/` and confirm the commands needed for the demo, including file
   attachment and review commands available in the current context.
7. Confirm whether `/rubber-duck` is available. If not, use a separate
   read-only critique prompt in a fresh session.
8. Open My work and Automations only in a synthetic or approved training repository.
9. Keep `lab/starter/fallback-evidence/` open as the recovery route.

**Access is firm for the live route.** A learner who cannot open and use the app
must switch to the fallback pack. Do not spend lab time bypassing policy or moving
code to an unapproved assistant.

## Teach the app layout as an engineering map

Avoid a feature tour. Tie each area to a decision:

| Area | Engineering use |
| --- | --- |
| Chats | Explore an idea without creating a dedicated branch or worktree |
| Projects | Group local folders or repositories and start agent sessions |
| Active sessions | Switch between isolated tasks and inspect their state |
| My work | Read issues, PRs, review activity, and checks |
| Automations | Save a repeatable task with explicit triggers and tools |
| Settings | Control project instructions, sandboxing, and session defaults |

Ask learners where evidence lives after each action. If the answer is only "in
the conversation," the workflow is too fragile.

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
sandbox when that option is available. This lab uses a local working tree for the
live route.

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

If the starter is not a Git repository in the delivery setup, explain the intended
boundary and use a copied workspace.

## Demonstrate context and handoff

Attach `lab/starter/issue-brief.md` and
`lab/starter/tests/test_readiness.py`. Ask the session to explain the failing
behavior before it edits.

After the plan is approved, have the session create a handoff using:

```text
Summarize the goal, accepted scope, files changed, checks run with exact results,
open risks, and the next human decision. Keep the handoff usable in a fresh session.
```

Open a fresh session and attach the handoff. Ask it what evidence is missing. This
shows whether the handoff carries state or merely repeats the story.

## Demonstrate the inner loop

The starter has a small Python module with deliberate readiness gaps. The correct
flow is:

1. Run the focused tests and capture the failure.
2. Map each failing assertion to the issue criteria.
3. Approve the smallest plan that can satisfy those criteria.
4. Edit only `readiness_guard/readiness.py` unless tests need a justified change.
5. Run the focused test command.
6. Inspect the diff.

Use the exact test command:

```bash
python -m unittest discover -s tests -v
```

## Demonstrate independent critique

Ask the rubber duck agent to inspect the plan or tests without editing:

```text
/rubber-duck Find a case where this implementation could report READY even though
the supplied pull-request evidence is incomplete. Do not propose unrelated features.
```

If the command is unavailable, start a fresh session in read-only intent and use
the same prompt. Apply useful findings and reject unsupported suggestions.

## Teach the outer loop

Open `fallback-evidence/05-pr-snapshot.json` even during the live route. It gives
every learner the same issue, diff, review, and check state.

Ask these questions in order:

1. Which issue criterion does each changed file support?
2. Did the diff add unrelated scope?
3. Which review threads still block approval?
4. Which checks are required?
5. Which evidence is missing or stale?
6. Who makes the final readiness decision?

The expected verdict for the supplied snapshot is **NOT READY**. One required check
fails and a blocking review thread remains unresolved.

## Demonstrate the automation boundary

Open `automation-prompt-template.md`. The learner creates a manual automation or,
when cloud automation is unavailable, writes the same specification.

Use only read tools. The prompt must forbid comments, labels, pushes, approvals,
merges, and thread resolution. A good run reports evidence and uncertainty. It does
not act as a reviewer of record.

## Common coaching corrections

| Learner move | Coach response |
| --- | --- |
| Starts Autopilot with a vague request | Ask for scope, checks, and a stop condition first |
| Opens work in the local repository | Ask whether a parallel session could touch the same files |
| Attaches the whole project | Ask which files affect the next decision |
| Treats passing tests as PR approval | Open review threads and required checks |
| Accepts critique without checking it | Ask what evidence supports the critique |
| Gives the automation write tools | Remove every tool that is not needed for the report |

## Fallback delivery

The fallback route is intentional. Learners inspect captured session evidence in
sequence and make the same decisions.

Do not call the fallback hands-on app practice. It teaches the workflow and preserves
the learning outcome without pretending the tool ran.

## Official references

Checked on **October 5, 2026**:

- [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)
- [Work with agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Configure local sandboxing](https://docs.github.com/en/copilot/how-tos/github-copilot-app/configure-local-sandboxing)
- [Manage issues and pull requests](https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests)
- [Use automations](https://docs.github.com/en/copilot/how-tos/github-copilot-app/using-automations)
- [Slash command reference](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [Rubber duck agent](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck)
