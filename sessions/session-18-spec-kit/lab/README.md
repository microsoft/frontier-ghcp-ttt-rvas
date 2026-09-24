# Session 18 Lab: Implement and Evolve a Feature with Spec Kit

**Duration:** 2 hours 30 minutes

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–12 and 17
**Deliverable:** An implemented and evolved feature with traceable Spec Kit
artifacts, GitHub Issues, tests, and convergence evidence

## Lab overview

Add task archiving to a small Python project, implement it in stages, and run
convergence review. Then use Spec Kit's living-spec workflow to add a restore
requirement and update the accepted artifacts and implementation.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Prepare and initialize the project | 15 min |
| 2 | Specify and clarify archive behavior | 25 min |
| 3 | Plan, check, create tasks, and analyze | 25 min |
| 4 | Convert tasks to GitHub Issues | 15 min |
| 5 | Implement in stages and run tests | 25 min |
| 6 | Converge the archive implementation | 15 min |
| 7 | Evolve the living specification | 30 min |

## Before you start

Confirm the approved Spec Kit source and release tag. Do not install an unapproved
package or use production data.

You need:

- Python 3.10 or later;
- Git and a local terminal;
- confirmed GitHub Copilot access in your coding environment;
- `uv` and an approved Spec Kit release;
- a GitHub training repository where you can create issues.

If GitHub Copilot access is unavailable, **stop the lab**. If the
environment cannot run Spec Kit or the selected integration, stop and fix the
approved installation. For a disconnected environment, the instructor must prepare
the official Spec Kit air-gapped package before the session.

## Part 1: Prepare and initialize the project (15 minutes)

Copy the starter into the instructor-provided GitHub training repository:

```bash
cp -R sessions/session-18-spec-kit/lab/starter/archive-task/. <training-repository>/
cd <training-repository>
git add .
git commit -m "Start Spec Kit archive-task lab"
python -m unittest discover -s tests -v
```

The two starter tests should pass. Read `feature-request.md`, but do not open
`change-request.md` yet.

Install the approved Spec Kit release:

```bash
export SPECKIT_TAG='<approved-release-tag>'
uv tool install specify-cli --force \
  --from "git+https://github.com/github/spec-kit.git@${SPECKIT_TAG}"
specify version
```

Record the source and reported version in `lab-notes.md`. Initialize the current
repository:

```bash
specify init --here --force --integration copilot
```

Review the generated files:

```bash
git status --short
find .specify -maxdepth 3 -type f | sort
find .github -maxdepth 3 -type f | sort
```

**Checkpoint:** `.specify/memory/constitution.md`, templates, scripts, and
Copilot integration files exist. There is no `.specify.yml`.

## Part 2: Specify and clarify archive behavior (25 minutes)

Create the project constitution:

```text
/speckit-constitution

Create principles for this training project:
- preserve existing create and list behavior;
- use only the Python standard library;
- require tests for every accepted behavior;
- keep requirements separate from implementation choices.
```

Open `.specify/memory/constitution.md`. Each principle should create a check that
can affect planning, implementation, or review.

Create the feature specification:

```text
/speckit-specify

Use feature-request.md as the source. Add task archiving without changing create
or list behavior. Keep the specification technology-neutral.
```

Inspect `specs/<feature>/spec.md`. Confirm that it contains prioritized,
independently testable user stories and measurable acceptance scenarios.

Clarify the missing decisions:

```text
/speckit-clarify

Focus on repeated archive requests, unknown task IDs, whether archived tasks stay
in the default list, and whether task titles may change during archive.
```

The specification should settle these decisions:

- archiving an active task succeeds;
- archiving an already archived task is idempotent;
- an unknown task ID produces a clear not-found result;
- the default list excludes archived tasks;
- callers can request archived tasks explicitly;
- archiving does not change the title.

**Checkpoint:** `spec.md` defines behavior without choosing classes, file names,
or storage structures.

## Part 3: Plan, check, create tasks, and analyze (25 minutes)

Create the implementation plan:

```text
/speckit-plan

Use Python 3.10+ and the standard library. Extend src/task_store.py and
tests/test_task_store.py. Keep storage in memory. Do not add packages.
```

Review `plan.md`, `research.md`, `data-model.md`, and `quickstart.md`. Remove any dependency, service, or infrastructure that the accepted feature does
not need.

Generate and review a requirements-quality checklist:

```text
/speckit-checklist

Check archive state transitions, list filtering, not-found behavior, and
regression protection for existing create and list behavior.
```

Mark an item complete only when its requirement is clear in `spec.md`. A checked
requirements item does not mean the implementation exists.

Create tasks and analyze the artifacts:

```text
/speckit-tasks
/speckit-analyze
```

Fix each material finding in the artifact that owns the decision. Run
`/speckit-analyze` again until the specification, plan, and tasks agree.

**Checkpoint:** each implementation task names an exact file and traces to an
accepted user story.

## Part 4: Convert tasks to GitHub Issues (15 minutes)

Commit and push the accepted artifacts:

```bash
git add .specify .github specs lab-notes.md
git commit -m "Specify task archive behavior"
git push
```

Convert the generated task list into GitHub Issues:

```text
/speckit-taskstoissues

Create issues from the unchecked tasks in tasks.md. Preserve task IDs, user-story
references, dependencies, and file paths.
```

Open the created issues and verify:

- each issue maps to a task ID;
- dependency order remains visible;
- parallel tasks are distinguishable;
- the issue does not add requirements absent from `spec.md`.

## Part 5: Implement in stages and run tests (25 minutes)

Use Spec Kit's scoped implementation support. Do not implement everything in one
agent run.

First implement the primary archive behavior:

```text
/speckit-implement

Implement only the tasks for the primary archive user story. Stop before repeated
archive and unknown-ID behavior.
```

Run the tests:

```bash
python -m unittest discover -s tests -v
```

Then implement the remaining archive tasks:

```text
/speckit-implement

Implement the remaining archive tasks, including repeated requests, unknown IDs,
and final verification.
```

Run the full suite again. Existing create and list tests must still pass.

## Part 6: Converge the archive implementation (15 minutes)

Run convergence review:

```text
/speckit-converge
```

If convergence appends a new phase to `tasks.md`:

1. inspect each appended task and its source reference;
2. run `/speckit-implement` for the appended convergence tasks;
3. rerun the unit tests;
4. run `/speckit-converge` again.

Repeat until Spec Kit reports **Converged**. A clean result does not change
`tasks.md`.

## Part 7: Evolve the living specification (30 minutes)

Open `change-request.md`. The accepted behavior now includes restoring archived
tasks.

Use the documented living-spec sequence:

1. Update the specification:

   ```text
   /speckit-clarify

   Update the current feature for change-request.md. Define restore success,
   repeated restore, unknown IDs, and default-list behavior after restore.
   ```

2. Update the technical plan:

   ```text
   /speckit-plan

   Revise the current plan for restore behavior. Keep the existing Python,
   standard-library, in-memory design.
   ```

3. Regenerate the task list and analyze it:

   ```text
   /speckit-tasks
   /speckit-analyze
   ```

4. Convert only the new unchecked restore tasks into issues:

   ```text
   /speckit-taskstoissues

   Create issues only for new restore tasks that do not already have an issue.
   Preserve their task IDs and dependencies.
   ```

5. Implement, test, and converge:

   ```text
   /speckit-implement
   /speckit-converge
   ```

The final suite should prove:

- archive and restore preserve the task ID and title;
- repeated archive and restore requests are idempotent;
- unknown IDs produce `TaskNotFoundError`;
- restored tasks return to the default list;
- existing behavior remains intact.

If convergence appends work, repeat the implement and converge loop.

## Final deliverable

1. A project constitution and an evolved feature specification.
2. Plans, supporting design files, reviewed checklists, and dependency-ordered
   tasks for archive and restore behavior.
3. GitHub Issues created from the Spec Kit task list.
4. Working archive and restore behavior with passing tests.
5. A final **Converged** result.

## Verification

- [ ] No `.specify.yml` file was added.
- [ ] `spec.md` contains the accepted archive and restore behavior.
- [ ] `plan.md` uses the required Python files and adds no dependency.
- [ ] `tasks.md` maps implementation work to user stories and exact file paths.
- [ ] GitHub Issues preserve task IDs and dependency information.
- [ ] All unit tests pass.
- [ ] `/speckit-analyze` has no unresolved material finding.
- [ ] `/speckit-converge` reports Converged.
