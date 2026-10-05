---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 29. GitHub Copilot App for Developers'
---

<!-- _class: lead -->

# GitHub Copilot App for Developers

Isolated work, visible evidence, reviewable handoffs

Session 29 | Module 2 | Intermediate

---

<!-- _class: agenda -->

# Agenda

| Segment | Time |
| --- | ---: |
| App mental model and engineering surfaces | 10 min |
| Chats, sessions, modes, and isolation | 15 min |
| Evidence-led inner loop | 12 min |
| Issue-to-PR outer loop and critique | 13 min |
| Prepared demo and lab handoff | 10 min |

---

# The app has two different work surfaces

| Surface | Good use | Boundary |
| --- | --- | --- |
| Chat | Questions, comparison, early exploration | No dedicated branch or working tree |
| Project session | Code changes, commands, tests, PR work | Runs in a selected project workspace |

**Decision:** Start in chat when the output is understanding. Start a project
session when the output should change files or produce branch-backed evidence.

---

# A useful prompt names the evidence

Weak:

```text
Fix the readiness tool.
```

Better:

```text
Read issue-brief.md and the failing tests. Explain the current behavior, propose
the smallest change, then run the focused test command. Do not edit unrelated files.
```

The second prompt gives the agent a boundary and tells it what checks to return.

---

# Choose autonomy from the cost of a wrong move

| Mode | Use it when | Human checkpoint |
| --- | --- | --- |
| Interactive | Scope is unclear or decisions need discussion | Frequent steering |
| Plan | The task spans files or has review risk | Approve the plan before edits |
| Autopilot | Scope and checks are explicit, and rollback is cheap | Review the result and evidence |

Mode is a risk control. It is not a ranking of model quality.

---

# Isolation has two layers

```text
Project
├── local repository session
├── working-tree session A
└── working-tree session B
```

A working tree separates branches and files for concurrent sessions.

Local sandboxing can also restrict filesystem, network, and credential access.
Working-tree isolation does not provide that security boundary by itself.

---

# Verify the workspace before work starts

Ask the session to report:

```text
pwd
git status --short --branch
git worktree list
```

Then check:

- the expected project path;
- the session branch;
- no unrelated changes;
- the allowed test command.

If the boundary is wrong, stop before editing.

---

# Attach context for the next decision

Use `@` references or `/attach-files` for:

- the issue brief;
- the failing test or error output;
- the implementation file;
- the session handoff.

Do not attach the whole repository by habit. More context can hide the signal.

---

# A handoff must survive a fresh session

Write a short handoff that includes:

```text
Goal
Accepted scope
Files changed
Checks run and exact result
Open risks
Next decision
```

Start a fresh session and attach the handoff plus the relevant files. If the new
session cannot continue, the handoff is incomplete.

---

# The inner loop is evidence first

```text
Observe failing behavior
  → form a bounded plan
  → change the smallest surface
  → run focused checks
  → inspect the diff
```

Chat narration is not verification. Use a command, diff, test, or reproducible
manual check.

---

# Check only what supports the decision

| Claim | Evidence | Result |
| --- | --- | --- |
| Failed checks block readiness | focused unit test | pass |
| Unresolved blocking review blocks readiness | snapshot fixture + test | pass |
| Neutral checks do not hide failures | full test output | pass |

Each claim should point to something another engineer can inspect.

---

# Ask for a separate critique

Use `/rubber-duck` or ask the session for an independent second opinion:

```text
Critique the plan and current tests. Look for a case that could produce a false
READY verdict. Do not edit files.
```

The critic reviews. The main session decides whether and how to act.

---

# The outer loop starts with issue intent

```text
Issue acceptance criteria
  → branch and diff
  → pull-request summary
  → review threads
  → required checks
  → human readiness decision
```

A green local test is one piece of evidence. It does not settle the PR decision.

---

# Read the pull request as a linked record

| Surface | Question |
| --- | --- |
| Issue | What outcome was requested? |
| Diff | What changed, including scope drift? |
| Review | Which concerns remain unresolved? |
| Checks | Which required jobs passed, failed, or did not run? |

The app keeps these surfaces close. The learner still has to connect them.

---

# Automate the report, not the decision

The lab defines a **manual, read-only** automation.

It may:

- read issue and PR metadata;
- inspect review and check status;
- return blockers, unknowns, and a suggested verdict;
- link each statement to evidence.

It must not comment, label, push, approve, merge, or resolve threads.

---

# Prepared demonstration

1. Open the starter as a project.
2. Use chat to explain the issue without editing.
3. Start a Plan-mode working-tree session.
4. Attach the brief and focused test.
5. Approve a bounded plan and run checks.
6. Request a read-only critique.
7. Show the synthetic PR snapshot and readiness report.

If the live app fails, switch to the captured evidence at the same step.

---

# Completion evidence

Learners submit:

- an implementation with passing tests;
- a session handoff;
- a PR-readiness report;
- a manual read-only automation specification.

**Success means another engineer can replay the reasoning from the evidence.**

---

<!-- _class: divider -->

# Lab handoff

Use the live app route if access is confirmed. Otherwise, use the supplied
fallback evidence and make the same decisions.

The work is synthetic. Keep it that way.
