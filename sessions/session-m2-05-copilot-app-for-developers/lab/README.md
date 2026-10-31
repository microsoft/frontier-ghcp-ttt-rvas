---
description: "Lab for isolated GitHub Copilot app sessions and PR-readiness evidence"
---

# Session M2-05 lab: From isolated session to PR-readiness report

**Duration:** 120 minutes  
**Difficulty:** Intermediate  
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04 and the Session M2-05 trainer content

## Objective

Use the GitHub Copilot app to repair a small readiness evaluator. Run focused
checks, then hand the work to a fresh session and assess a synthetic pull request.
Finish by defining a manual read-only automation that can repeat the
readiness report without modifying GitHub.

## Required setup

You must have:

- access to the GitHub Copilot app;
- a GitHub account and Copilot plan, or a model-provider setup allowed by your organization;
- permission to connect a local training folder;
- Python 3.10 or later;
- Git with a configured local commit identity.

Before starting, open the app and check that you can create a project session.
Check that Interactive, Plan, and Autopilot appear in the mode picker and that
`/plan`, `/review`, and `/rubber-duck` appear in the command picker.
Check `/fork`, `/merge-to-parent`, and `/spar` too. Inspect the project's local
sandbox and tool-approval settings before starting the working-tree session.
Keep the trainer's filesystem/network restrictions enabled. A separate worktree
isolates files; it is not a sandbox or permission grant.

**If app access or a required command is unavailable, stop the lab.**
Do not continue by pasting the files into another assistant or
by treating the supplied session output as hands-on app work.

### Workspace

Copy `lab/starter` to a writable training folder. If the copy is inside a Git
repository, create a clean branch before opening it in the app.

```bash
cp -R lab/starter ~/copilot-labs/session-m2-05
cd ~/copilot-labs/session-m2-05
python -m unittest discover -s tests -v
git init
printf '__pycache__/\n*.pyc\n' > .gitignore
git add .
git commit -m "Record readiness training baseline"
```

The starter is intentionally incomplete. Three focused readiness tests should fail.
Do not change package versions or add dependencies.

Use a fresh folder if `~/copilot-labs/session-m2-05` already exists. The committed
baseline lets `/review` inspect the actual repair diff. Keep the repair uncommitted
until the review and triage are complete.

## Data rules

Use only the synthetic assets in this session. Do not add customer names, private
repository links, email addresses, secrets, tenant identifiers, or production logs.

## Exercise 1: Choose the surface and establish isolation (15 minutes)

### Goal

Use chat for discovery, then start a project session with a named workspace
and mode.

1. Open a new Chat in the app.
2. Attach `issue-brief.md` and ask:

   ```text
   Explain the requested behavior and identify the evidence needed to prove it.
   Do not edit files.
   ```

3. Decide whether Chat was the right surface for discovery.
4. Add the copied starter as a project.
5. Start a **Plan** mode session in a new working tree of the training repository.
6. Ask the session to run:

   ```text
   Report the current path, branch, worktree list, and concise Git status. Do not
   edit anything.
   ```

### Checkpoint

- The chat produced understanding, not edits.
- The project session has a named workspace boundary.
- Plan mode matches the task risk.

## Exercise 2: Challenge the plan, compare an alternative, and repair (55 minutes)

### Goal

Repair the evaluator with a plan that names the files and tests.

1. Attach `issue-brief.md`, `readiness_guard/readiness.py`, and
   `tests/test_readiness.py`.
2. Ask the session to run:

   ```bash
   python -m unittest discover -s tests -v
   ```

3. Use `/plan` to request a plan that maps each failing test to one issue
   criterion. Reject unrelated refactoring.
4. Before implementation, run:

   ```text
   /rubber-duck Critique this plan and its test coverage against issue-brief.md.
   Look for a way incomplete or contradictory evidence could produce READY.
   Check the sorted reason-code requirement too. Do not edit files.
   ```

5. Check the critique against the brief and tests. Ask the planning session to
   revise the plan for useful findings and explain rejected suggestions. Do not
   invent a flaw if the critique finds none.
6. Record the initial plan, critique, and revision in `engineering-review.md`.
   Inspect the source diff and complete the fork exercise below before approval.
   Return to this step and settle the plan using the checked critiques. Approve
   only a plan that names the target file and checks; leave Plan mode before
   implementation.
7. Let the session implement the accepted plan. Run the same test command again
   and inspect every changed line in the diff.
8. While the repair is still uncommitted, run:

   ```text
   /review Review the current repair diff against issue-brief.md. Focus on
   correctness and regression coverage. Cite files and lines. Do not edit files.
   ```

9. Triage findings in `engineering-review.md`. Link each accepted finding to a
   test or code reference. Fix supported defects, rerun the focused tests, and
   rerun `/review` on any correction. If a review reports no findings, record that.

### What the critic does

Rubber duck is a built-in, read-only agent in the app and CLI. Copilot chooses a
contrasting model automatically when a suitable model is available. Record the
model only if the client shows it; do not infer it from the wording. Another
answer from the session that wrote the plan is not the same second opinion.

Check the critique before changing the plan. The critic adds model usage and
latency, and its conclusion is not an approval. Session M2-01 also explains the
CLI's opt-in **Proactive invocation** setting in `/subagents`; it persists.
This lab uses a manual invocation rather than assuming an automatic run occurred.

### Fork a plan and challenge it with `/spar`

Do this **before implementation**, while the parent source still matches the
committed baseline:

1. Inspect the parent path, branch, and source diff. Run `/fork` in the app.
2. Inspect the fork's path, branch, and files. Do not assume the command copied
   uncommitted files or created the workspace you intended. Stop if the fork
   cannot be separated safely from the parent.
3. Attach the same brief and tests. Run:

   ```text
   /spar Challenge the proposed readiness plan. Look for a counterexample where
   missing or contradictory inputs would incorrectly produce READY. Stay within
   issue-brief.md. Reason only; do not edit files, run commands, or implement.
   ```

4. Check the actual argument against the tests. `/spar` is documented as
   adversarial reasoning; do not assume it has rubber duck's model-selection or
   read-only tool guarantees. Keep permissions restricted and inspect the diff.
5. Switch the fork to Interactive mode to write only `planning-alternative.md`, with the checked
   counterexample or no-findings result and its effect on the plan.
   Inspect the note and the entire fork diff.
6. Run `/merge-to-parent` from the fork. Review the app's return/merge flow and
   accept only the analysis note. If it asks for a commit, commit only that note
   in the fork. Stop on an unexpected source change or merge conflict.
7. Return to the parent. Check that the note arrived and
   `readiness_guard/readiness.py` and `tests/` still match the baseline. Reconcile
   the two critiques, settle the plan, and then approve implementation.

This is a local fork-to-parent operation, not `/pr-merge` or permission to merge
a GitHub pull request. Do not treat one pair of critiques as a model benchmark.

### Required behavior

`evaluate_readiness(snapshot)` must:

- return `NOT_READY` when a required check failed;
- return `NOT_READY` when a blocking review thread is unresolved;
- return `UNKNOWN` when required evidence is absent;
- return `READY` only when required checks pass and blocking threads are resolved;
- return stable, sorted reason codes.

### Checkpoint

You can explain the diff from the accepted plan and any revision. Your tests and
`/review` triage support the behavior claims. Keep the critique of the approach
separate from the review of the implemented patch.

## Exercise 3: Create a handoff and request independent critique (20 minutes)

### Goal

Check that a fresh session can continue from a concise handoff.

1. Ask the current session to write a handoff using
   `session-handoff-template.md`.
2. Start a fresh project session.
3. Attach the handoff, issue brief, changed file, and test output.
4. Ask the fresh session:

   ```text
   Review this handoff. State what is proven, what remains uncertain, and the next
   human decision. Do not edit files.
   ```

5. Attach `engineering-review.md` and the implementation diff. Ask the fresh
   reader to distinguish the plan critique from the code-review findings and
   identify any unresolved concern.
6. If the fresh reader finds a supported gap, return it to the implementation
   session, rerun the tests and `/review`, and update the handoff.

Keep the fresh reader read-only. Do not start a second implementation in a
different worktree. Session M7-05 teaches coordinating several child sessions.

### Checkpoint

A fresh reader can identify the goal, changed files, checks, remaining risk, and
next decision without the original conversation.

## Exercise 4: Assess the outer loop and define automation (30 minutes)

### Goal

Trace the issue's requirements through the PR diff, reviews, and checks. Use them
to create a repeatable read-only readiness report.

### Steps

1. Open `prepared-evidence/05-pr-snapshot.json`.
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
8. When using the live app, create the automation if policy and repository access allow.
   Run it manually against a synthetic repository you may use or keep it as a saved
   specification when no repository is available.
9. Check that the automation cannot comment, label, push, approve, merge, or
   resolve review threads.

The supplied PR snapshot should produce `NOT_READY`.

### Checkpoint

The report names the failing required check and the unresolved blocking thread.
The automation gathers check results and review-thread status without changing repository state.

## Final deliverables

Submit or demonstrate:

- the repaired `readiness_guard/readiness.py`;
- passing focused test output;
- `engineering-review.md` with plan critique, plan revision, and `/review` triage;
- `planning-alternative.md` returned from the checked `/spar` fork;
- `session-handoff-template.md` completed as a handoff;
- `pr-readiness-report.md`;
- a completed `automation-prompt-template.md`;
- output from the no-customer-name check.

## Completion check

- The change is small and the focused tests pass.
- Plan critique occurred before implementation; code review inspected the repair diff.
- Accepted findings have a test or code reference; rejected suggestions have a reason.
- The fork's workspace and merge result were checked; no source changed before approval.
- The record distinguishes rubber duck, `/spar`, and diff review without assuming identical guarantees.
- A fresh session can use the handoff without the original conversation.
- The PR-readiness report names the real blockers.
- The automation remains manual and read-only.

## Troubleshooting

| Problem | Response |
| --- | --- |
| App access is missing | Stop the lab |
| Working-tree option or a required command is unavailable | Stop and resolve app, version, or policy access |
| Python is unavailable | Stop the lab |
| Automation is unavailable by policy | Write the specification and review permissions |
| Fork return flow includes unexpected source changes | Stop; do not accept the merge or overwrite the parent's repair |
| Agent proposes GitHub writes | Remove write tools and restate the read-only contract |

## Solution reference

After making the final decision, compare your work with `../solution/`.

## Continue with developer orchestration

Session M7-05's [developer route](../../session-m7-05-orchestrate-workstreams/lab/README.md#developer-route-review-pr-readiness)
uses independent read-only child sessions to review implementation and PR
readiness. Passing local tests still does not decide whether a PR is ready.

## Command references

Checked October 15, 2026:

- [Rubber duck](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck)
- [App slash commands](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
