---
description: "Lab for isolated GitHub Copilot app sessions and PR-readiness evidence"
---

# Session M2-05 lab: From isolated session to PR-readiness report

**Duration:** 120 minutes

## Objective

Use the GitHub Copilot app to repair a small readiness evaluator. Run focused
checks, hand the work to a fresh session, and assess a synthetic pull request.
Finish by defining a manual read-only automation that repeats the readiness
report without modifying GitHub.

## You need

- the GitHub Copilot app, with permission to connect a local training folder;
- a GitHub account and Copilot plan;
- Python 3.10 or later;
- Git with a configured local commit identity.

Open the app and check that you can create a project session. Interactive, Plan,
and Autopilot should appear in the mode picker. `/plan`, `/review`, `/rubber-duck`,
`/fork`, `/merge-to-parent`, and `/spar` should appear in the command picker.
Keep the trainer's filesystem and network restrictions on. A separate worktree
isolates files. It isn't a sandbox or a permission grant.

Use only the synthetic assets in this session.

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
Use a fresh folder if `~/copilot-labs/session-m2-05` already exists. The committed
baseline lets `/review` inspect the repair diff. Keep the repair uncommitted
until the review and triage finish.

## Exercise 1: Choose the surface and establish isolation (15 minutes)

Use chat for discovery, then start a project session with a named workspace and mode.

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
   revise the plan for useful findings and explain rejected suggestions. If the
   critique finds nothing, don't invent a flaw.
6. Record the initial plan, critique, and revision in `engineering-review.md`.
   Inspect the source diff and complete the fork exercise below before approval.
   Then return here and settle the plan using both critiques. Approve only a plan
   that names the target file and checks, and leave Plan mode before implementation.
7. Let the session implement the accepted plan. Run the same test command and
   inspect every changed line in the diff.
8. While the repair is still uncommitted, run:

   ```text
   /review Review the current repair diff against issue-brief.md. Focus on
   correctness and regression coverage. Cite files and lines. Do not edit files.
   ```

9. Triage findings in `engineering-review.md`. Link each accepted finding to a
   test or code reference. Fix supported defects, rerun the focused tests, and
   rerun `/review` on any correction. If a review reports no findings, record that.

### What the critic does

Rubber duck is a built-in, read-only agent in the app and CLI. Copilot picks a
contrasting model automatically when one is available. Record the model only if
the client shows it. Another answer from the session that wrote the plan isn't a
second opinion.

Check the critique before changing the plan. The critic adds model usage and
latency, and its conclusion isn't an approval. Session M2-01 covers the CLI's
opt-in **Proactive invocation** setting in `/subagents`, which persists. This lab
invokes the critic manually.

### Fork a plan and challenge it with `/spar`

Do this **before implementation**, while the parent source still matches the
committed baseline:

1. Inspect the parent path, branch, and source diff. Run `/fork` in the app.
2. Inspect the fork's path, branch, and files. The command may not copy
   uncommitted files or create the workspace you intended. Stop if the fork
   can't be separated safely from the parent.
3. Attach the same brief and tests. Run:

   ```text
   /spar Challenge the proposed readiness plan. Look for a counterexample where
   missing or contradictory inputs would incorrectly produce READY. Stay within
   issue-brief.md. Reason only; do not edit files, run commands, or implement.
   ```

4. Check the argument against the tests. `/spar` is adversarial reasoning. It
   doesn't share rubber duck's model selection or read-only tool guarantees, so
   keep permissions restricted and inspect the diff.
5. Switch the fork to Interactive mode to write only `planning-alternative.md`,
   with the counterexample (or no-findings result) and its effect on the plan.
   Inspect the note and the entire fork diff.
6. Run `/merge-to-parent` from the fork. Review the return flow and accept only
   the analysis note. If it asks for a commit, commit only that note in the fork.
   Stop on an unexpected source change or merge conflict.
7. Return to the parent. Check that the note arrived and that
   `readiness_guard/readiness.py` and `tests/` still match the baseline. Reconcile
   the two critiques, settle the plan, and approve implementation.

This is a local fork-to-parent operation. It isn't `/pr-merge`, and it doesn't
merge a GitHub pull request.

### Required behavior

`evaluate_readiness(snapshot)` must:

- return `NOT_READY` when a required check failed;
- return `NOT_READY` when a blocking review thread is unresolved;
- return `UNKNOWN` when required evidence is absent;
- return `READY` only when required checks pass and blocking threads are resolved;
- return stable, sorted reason codes.

### Checkpoint

You can explain the diff from the accepted plan and any revision. Your tests and
`/review` triage support the behavior claims. The plan critique and the patch
review stay separate.

## Exercise 3: Create a handoff and request independent critique (20 minutes)

Check that a fresh session can continue from a concise handoff.

1. Ask the current session to write a handoff using `session-handoff-template.md`.
2. Start a fresh project session.
3. Attach the handoff, issue brief, changed file, and test output.
4. Ask the fresh session:

   ```text
   Review this handoff. State what is proven, what remains uncertain, and the next
   human decision. Do not edit files.
   ```

5. Attach `engineering-review.md` and the implementation diff. Ask the fresh
   reader to separate the plan critique from the code-review findings and name any
   unresolved concern.
6. If the fresh reader finds a supported gap, return it to the implementation
   session, rerun the tests and `/review`, and update the handoff.

Keep the fresh reader read-only, and don't start a second implementation in
another worktree. Session M7-05 teaches coordinating several child sessions.

### Checkpoint

A fresh reader can name the goal, changed files, checks, remaining risk, and
next decision without the original conversation.

## Exercise 4: Assess the outer loop and define automation (30 minutes)

Trace the issue's requirements through the PR diff, reviews, and checks. Then create
a repeatable read-only readiness report.

1. Open `prepared-evidence/05-pr-snapshot.json`.
2. Trace each issue criterion to changed files and checks.
3. Inspect review threads. Separate blocking comments from non-blocking notes.
4. Inspect required check results and their timestamps.
5. Write `pr-readiness-report.md` with:
   - suggested verdict;
   - blocker reason codes;
   - references to the snapshot data;
   - missing or stale data;
   - the human decision still required.
6. Open `automation-prompt-template.md`.
7. Define a **manual trigger** and read-only tools.
8. In the live app, create the automation and run it manually against a synthetic
   repository. If automation is unavailable or no repository is available, keep it
   as a saved specification.
9. Check that the automation can't comment, label, push, approve, merge, or
   resolve review threads.

The supplied PR snapshot should produce `NOT_READY`.

### Checkpoint

The report names the failing required check and the unresolved blocking thread.
The automation gathers check results and review-thread status without changing
repository state.

## Final deliverables

- the repaired `readiness_guard/readiness.py`;
- passing focused test output;
- `engineering-review.md` with plan critique, plan revision, and `/review` triage;
- `planning-alternative.md` returned from the `/spar` fork;
- `session-handoff-template.md` completed as a handoff;
- `pr-readiness-report.md`;
- a completed `automation-prompt-template.md`.

## Troubleshooting

| Problem | Response |
| --- | --- |
| Automation is unavailable | Write the specification instead |
| Fork return flow includes unexpected source changes | Stop. Don't accept the merge or overwrite the parent's repair |
| Agent proposes GitHub writes | Remove write tools and restate the read-only contract |

## Next steps

Compare your work with `../solution/`.

Session M7-05's [developer route](../../session-m7-05-orchestrate-workstreams/lab/README.md#developer-route-review-pr-readiness)
uses independent read-only child sessions to review implementation and PR
readiness. Passing local tests still doesn't decide whether a PR is ready.

## Command references

- [Rubber duck](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck)
- [App slash commands](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
