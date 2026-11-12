# Session M5-02 lab: Implement and evolve a feature with Spec Kit

**Duration:** 2 hours 30 minutes

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04, M3-01 to M3-05

## Overview

Add task archiving to a small Python project. You implement it in stages and
use convergence review to find missing work.

Parts 1, 2, 3, 5, and 6 take about 1 hour 45 minutes. Parts 4 and 7 are **optional**.
Do them with the time that remains.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Prepare and initialize the project | 15 min |
| 2 | Specify and clarify archive behavior | 25 min |
| 3 | Plan, check, create tasks, and analyze | 25 min |
| 4 | Optional: convert tasks to GitHub Issues | 15 min |
| 5 | Implement in stages and run tests | 25 min |
| 6 | Converge the archive implementation | 15 min |
| 7 | Optional: evolve the living specification (restore) | 30 min |

## Terms you will see

- **Constitution:** the project's rules, in `.specify/memory/constitution.md`. Spec Kit reads it when it plans and reviews. A rule that can't change a plan or a review doesn't belong there.
- **Convergence:** `/speckit-converge` compares the code, tests, spec, plan, and tasks. If something is missing, it adds tasks to `tasks.md`. You implement them and run it again until it reports **Converged**.
- **Idempotent:** doing it twice has the same result as doing it once. Archiving an archived task succeeds and changes nothing.
- **Skills and commands:** `specify init` writes one folder per command under `.github/skills/`, such as `.github/skills/speckit-plan/`. Typing `/speckit-plan` makes Copilot follow the instructions in that folder. Edit the folder and the command changes.

## Before you start

You need Python 3.10 or later, Git, GitHub Copilot, and `uv`. Part 4 also needs a GitHub training
repository where you can create issues. For a disconnected environment, the
instructor prepares the official Spec Kit air-gapped package beforehand.

## Part 1: Prepare and initialize the project (15 minutes)

Copy the starter into the instructor-provided GitHub training repository:

```bash
cp -R sessions/session-m5-02-spec-kit/lab/starter/archive-task/. <training-repository>/
cd <training-repository>
git add .
git commit -m "Start Spec Kit archive-task lab"
python -m unittest discover -s tests -v
```

The two starter tests should pass. Read `feature-request.md`, but do not open
`change-request.md` yet.

Install Spec Kit v1.4.0. If your instructor gave you a different tag, use that one:

```bash
export SPECKIT_TAG='v1.4.0'
uv tool install specify-cli --force \
  --from "git+https://github.com/github/spec-kit.git@${SPECKIT_TAG}"
specify version
```

Initialize the current repository:

```bash
specify init --here --force --integration copilot
```

Review the generated files:

```bash
git status --short
find .specify -maxdepth 3 -type f | sort
find .github -maxdepth 3 -type f | sort
```

**Checkpoint:** `.specify/memory/constitution.md` and the `.github/skills/speckit-*` folders exist.

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

Open `.specify/memory/constitution.md`. Check that you can use each principle
to judge a plan, implementation, or review.

Create the feature specification:

```text
/speckit-specify

Use feature-request.md as the source. Add task archiving without changing create
or list behavior. Keep the specification technology-neutral.
```

Inspect `specs/<feature>/spec.md`. Check that it contains prioritized,
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

Review `plan.md`, `research.md`, `data-model.md`, and `quickstart.md`.
Remove any dependency, service, or infrastructure that the accepted feature does
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

## Part 4 (optional): Convert tasks to GitHub Issues (15 minutes)

`/speckit-taskstoissues` comes from Spec Kit's GitHub extension. If your install
doesn't have it, skip this part. Parts 5 and 6 don't depend on it.

Commit and push the artifacts so far:

```bash
git add .specify .github specs
git commit -m "Specify task archive behavior"
git push
```

Convert the generated task list into GitHub Issues:

```text
/speckit-taskstoissues

Create issues from the unchecked tasks in tasks.md. Preserve task IDs, user-story
references, dependencies, and file paths.
```

Open the created issues. Each should carry a task ID and its dependencies, and
add nothing that isn't in `spec.md`.

## Part 5: Implement in stages and run tests (25 minutes)

Use Spec Kit to implement one set of tasks at a time. Do not implement everything
in one agent run.

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

Repeat until Spec Kit reports **Converged**. When it finds no remaining work,
it leaves `tasks.md` unchanged.

## Part 7 (optional): Evolve the living specification (30 minutes)

Do this part only if Parts 1 to 6 are finished and converged. A living specification
is one you update when requirements change, then bring the plan, tasks, and code
back in line.

Open `change-request.md`. Add restoring archived tasks to the accepted behavior.

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

4. If you did Part 4, convert only the new unchecked restore tasks into issues:

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

The final suite should cover restore the way it covers archive: ID and title
preserved, repeated requests idempotent, unknown IDs raise `TaskNotFoundError`,
and restored tasks return to the default list. If convergence appends work, repeat
the implement and converge loop.

## Final deliverable

1. A constitution, a specification, a plan, and tasks for archive behavior.
2. Working archive behavior with passing tests.
3. A final **Converged** result.
4. Optional: GitHub Issues from the task list, and restore behavior with its own **Converged** result.
