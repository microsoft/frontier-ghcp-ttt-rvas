---
description: "Lab for isolated GitHub Copilot app sessions and PR-readiness evidence"
---

# Session 29 Lab: From Isolated Session to PR-Readiness Report

**Duration:** 120 minutes  
**Difficulty:** Intermediate  
**Prerequisites:** Sessions 01 to 07 and the Session 29 trainer content

## Objective

Use the GitHub Copilot app to repair a small readiness evaluator, verify the change
with focused checks, hand the work to a fresh session, and assess a synthetic pull
request. Finish by defining a manual read-only automation that can repeat the
readiness report without modifying GitHub.

## Required setup

### Live route

You must have:

- access to the GitHub Copilot app;
- an approved GitHub account and Copilot plan, or an approved model-provider setup;
- permission to connect a local training folder;
- Python 3.10 or later;
- Git when using the working-tree steps.

Before starting, open the app and confirm that you can create a project session.
Verify that Interactive, Plan, and Autopilot appear in the mode picker.

**If GitHub Copilot app access is missing or unavailable, stop the live route.**
Do not continue by pasting the files into another assistant. Use the intentional
no-access fallback below.

### No-access fallback

Use `starter/fallback-evidence/` in numbered order. The pack contains a captured
chat analysis, session plan, implementation result, independent critique, PR
snapshot, and check output. Complete the same readiness report.

The fallback teaches the workflow from supplied evidence. It does not claim live
app experience.

### Workspace

Copy `lab/starter` to an approved writable location. If the copy is inside a Git
repository, create a clean branch before opening it in the app.

```bash
cp -R lab/starter ~/copilot-labs/session-29
cd ~/copilot-labs/session-29
python -m unittest discover -s tests -v
```

The starter is intentionally incomplete. Three focused readiness tests should fail.
Do not change package versions or add dependencies.

## Data rules

Use only the synthetic assets in this session. Do not add customer names, private
repository links, email addresses, secrets, tenant identifiers, or production logs.

## Exercise 1: Choose the surface and establish isolation (20 minutes)

### Goal

Use chat for discovery, then start a project session with an explicit workspace
and mode.

### Live steps

1. Open a new Chat in the app.
2. Attach `issue-brief.md` and ask:

   ```text
   Explain the requested behavior and identify the evidence needed to prove it.
   Do not edit files.
   ```

3. Decide whether Chat was the right surface for discovery.
4. Add the copied starter as a project.
5. Start a **Plan** mode session in a new working tree. If the folder is not in a
   Git repository, use a copied local workspace.
6. Ask the session to run:

   ```text
   Report the current path, branch, worktree list, and concise Git status. Do not
   edit anything.
   ```

### Fallback steps

Read `fallback-evidence/01-chat-discovery.md` and
`fallback-evidence/02-plan-session.md`. Decide whether the chosen surface, mode,
and workspace fit the task.

### Checkpoint

- The chat produced understanding, not edits.
- The project session has a named workspace boundary.
- Plan mode matches the task risk.

## Exercise 2: Run the evidence-led inner loop (35 minutes)

### Goal

Repair the evaluator with a bounded plan and exact test evidence.

### Live steps

1. Attach `issue-brief.md`, `readiness_guard/readiness.py`, and
   `tests/test_readiness.py`.
2. Ask the session to run:

   ```bash
   python -m unittest discover -s tests -v
   ```

3. Ask for a plan that maps each failing test to one issue criterion. Reject
   unrelated refactoring.
4. Approve the plan when it names the target file and focused checks.
5. Let the session implement the change.
6. Run the same test command again.
7. Ask for the concise diff and inspect every changed line.

### Required behavior

`evaluate_readiness(snapshot)` must:

- return `NOT_READY` when a required check failed;
- return `NOT_READY` when a blocking review thread is unresolved;
- return `UNKNOWN` when required evidence is absent;
- return `READY` only when required checks pass and blocking threads are resolved;
- return stable, sorted reason codes.

### Fallback steps

Read `fallback-evidence/03-implementation-session.md` and
`fallback-evidence/06-checks.txt`. Compare the captured change with the issue
criteria. Run the tests locally if Python is available. Otherwise, mark them
`not run` and cite the supplied output.

### Checkpoint

The tests, diff, and command output support the behavior claims.

## Exercise 3: Create a handoff and request independent critique (25 minutes)

### Goal

Check that a fresh session can continue from a concise handoff.

### Live steps

1. Ask the current session to write a handoff using
   `session-handoff-template.md`.
2. Start a fresh project session.
3. Attach the handoff, issue brief, changed file, and test output.
4. Ask the fresh session:

   ```text
   Review this handoff. State what is proven, what remains uncertain, and the next
   human decision. Do not edit files.
   ```

5. Request an independent critique:

   ```text
   /rubber-duck Find a case where this evaluator could return READY from incomplete
   or contradictory evidence. Review only; do not edit files.
   ```

6. If `/rubber-duck` is unavailable, ask a separate session for the same read-only
   critique.
7. Apply useful findings to the implementation or handoff. Ignore unsupported
   suggestions.

### Fallback steps

Complete `session-handoff-template.md` from the captured implementation result.
Then read `fallback-evidence/04-independent-critique.md` and apply any useful
finding.

### Checkpoint

A fresh reader can identify the goal, changed files, checks, remaining risk, and
next decision without the original conversation.

## Exercise 4: Assess the outer loop and define automation (30 minutes)

### Goal

Connect issue intent to PR evidence and create a safe repeatable readiness report.

### Steps for both routes

1. Open `fallback-evidence/05-pr-snapshot.json`.
2. Trace each issue criterion to changed files and checks.
3. Inspect review threads. Separate blocking comments from non-blocking notes.
4. Inspect required check results and their timestamps.
5. Write `pr-readiness-report.md` with:
   - suggested verdict;
   - blocker reason codes;
   - evidence references;
   - missing or stale evidence;
   - the human decision still required.
6. Open `automation-prompt-template.md`.
7. Define a **manual trigger** and read-only tools.
8. In the live route, create the automation if policy and repository access allow.
   Run it manually against an approved synthetic repository or keep it as a saved
   specification when no repository is available.
9. Confirm that the automation cannot comment, label, push, approve, merge, or
   resolve review threads.

The supplied PR snapshot should produce `NOT_READY`.

### Checkpoint

The report names the failing required check and the unresolved blocking thread.
The automation gathers evidence but cannot change repository state.

## Final deliverables

Submit or demonstrate:

- the repaired `readiness_guard/readiness.py`;
- passing focused test output, or clearly marked supplied evidence;
- `session-handoff-template.md` completed as a handoff;
- `pr-readiness-report.md`;
- a completed `automation-prompt-template.md`;
- output from the no-customer-name check.

## Completion check

- The change is small and the focused tests pass.
- A fresh session can use the handoff without the original conversation.
- The PR-readiness report names the real blockers.
- The automation remains manual and read-only.

## Troubleshooting

| Problem | Response |
| --- | --- |
| App access is missing | Stop the live route and use the numbered fallback pack |
| Working-tree option is unavailable | Use a clean copied workspace |
| Rubber duck is unavailable | Use a fresh read-only critique session |
| Python is unavailable | Use supplied check output and mark execution as not run |
| Automation is unavailable by policy | Complete the specification and permission review |
| Agent proposes GitHub writes | Remove write tools and restate the read-only contract |

## Solution reference

After making the final decision, compare your work with `../solution/`.
