# Session M5-02 trainer guide: Spec Kit

## Teaching goal

Show the complete Spec Kit loop on one small change: request, specification, plan,
tasks, implementation, tests, and convergence. Learners should know which files
Spec Kit creates and which decisions the team still owns. The lab then uses the
documented living-spec workflow to add restore behavior.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | Why specification-driven development |
| 0:08 to 0:18 | Spec Kit project and artifact model |
| 0:18 to 0:30 | Requirements and clarification |
| 0:30 to 0:42 | Planning, checklists, tasks, and analysis |
| 0:42 to 0:52 | Implementation and convergence |
| 0:52 to 1:00 | Installation, demonstration, and lab handoff |

The timings match the agenda in [`slides.md`](../slides.md). Keep the first five
segments moving so the prepared demonstration and lab handoff receive the final
eight minutes.

## Slide-by-slide delivery map

### 0:00 to 0:08: Why specification-driven development

**Slides:** *Spec Kit: Specification-Driven Development*, *Agenda*, *A feature
request is a starting point*, and *Resolve decisions before implementation*

1. **Open with the lesson goal.** Decide what the feature means before asking an
   agent to implement it. Spec Kit makes those decisions visible.
2. **Set the pace from the agenda.** Explain how Spec Kit works before the lab.
   Learners will run the complete workflow in the 2-hour 30-minute lab.
3. **Read the archive request aloud.** Ask learners to notice how many decisions
   hide inside the word "remove." Use the four questions on the slide. Do not answer
   them yet.
4. **Compare the two development paths.** Specification-driven development moves
   decisions earlier. It does not add documents for their own sake.

### 0:08 to 0:18: Spec Kit project and artifact model

**Slides:** *What Spec Kit provides*, *Initialize an existing project*, *Two
artifact scopes*, and *The full workflow*

1. **Separate the three layers.** The CLI creates the project structure, the
   generated skills guide the workflow, and the feature artifacts hold the work.
   The team remains responsible for the decisions in those artifacts.
2. **Show initialization as a reviewed change.** Explain `--here`, `--force`, and
   `--integration copilot`. Then show the generated diff. `--force` allows
   initialization in a non-empty directory; it does not approve every generated
   file.
3. **Distinguish project-wide and feature-specific artifacts.** The constitution
   applies to the project. The specification, plan, design files, checklists, and
   tasks belong to one feature.
4. **Walk through the workflow once.** Point out the optional quality gates.
   Clarification, checklist review, and analysis are used when ambiguity or risk
   warrants them.

**Trainer check:** Learners should be able to say where project principles live
and where feature behavior lives before you continue.

### 0:18 to 0:30: Requirements and clarification

**Slides:** *Constitution: rules for how the project works*, *Specify behavior, not
implementation*, *Write scenarios a reviewer can challenge*, and *Clarify before
choosing a design*

1. **Make constitution principles testable.** Compare each weak principle with its
   reviewable replacement. A useful principle must change planning, implementation,
   or review.
2. **Keep `spec.md` technology-neutral.** It defines the user, outcome, scenarios,
   non-goals, and measurable requirements. Class names, storage choices, packages,
   and file paths belong later.
3. **Use scenarios to test decisions.** Walk through the active-task and
   unknown-ID examples. Each Given/When/Then statement should let a reviewer
   challenge one behavior.
4. **Resolve the archive questions.** Reveal the accepted decisions only after
   learners have seen the ambiguity. Clarification updates `spec.md`; it does not
   create a competing decision log.

Use the agreed archive behavior to show which technical choices the plan must support.

### 0:30 to 0:42: Planning, checklists, tasks, and analysis

**Slides:** *Plan: decide how the feature will work*, *Supporting design files have
a purpose*, *A checklist reviews requirement quality*, *Tasks turn design into
executable work*, and *Analyze artifacts before implementation*

1. **Move technical choices into the plan.** Use the archive example to show why
   Python version, storage, fields, and file paths belong in `plan.md`, not
   `spec.md`.
2. **Explain each supporting file by the question it answers.** Do not imply that
   every feature needs every optional artifact. Keep only what helps implementation
   or review.
3. **Separate requirement review from implementation status.** A checked checklist
   item means the requirement is clear. It does not mean the code exists or the
   test passes.
4. **Read the sample tasks as a dependency sequence.** Point out the task ID,
   user-story reference, action, and exact file. "Implement the feature" is too
   broad to review or assign.
5. **Explain analysis as a read-only consistency check.** Fix a finding in the
   artifact that owns the decision, then analyze again. Do not edit the code to
   hide a specification or planning contradiction.

**Trainer check:** Ask which artifact owns an ambiguous behavior, a storage choice,
and a missing implementation step. The expected answers are `spec.md`, `plan.md`,
and `tasks.md`.

### 0:42 to 0:52: Implementation and convergence

**Slides:** *Implementation follows the accepted tasks*, *Compare implementation with accepted artifacts*,
*`specify check` is not compliance validation*,
*Living specifications evolve accepted behavior*, and *Convert tasks into
GitHub Issues*

1. **Set the implementation gate.** The checklist has been reviewed, material
   analysis findings are resolved, accepted artifacts are committed, and the task
   scope is clear.
2. **Explain what convergence compares.** It compares
   the implementation, tests, specification, plan, and tasks. When it finds a gap,
   it adds work. It must not rewrite accepted requirements to match the code.
3. **Correct the `specify check` misconception.** It checks the local Spec Kit
   environment. It does not prove implementation compliance, security, performance,
   or test coverage.
4. **Show how accepted behavior changes.** Restore behavior starts in `spec.md`.
   The plan, tasks, code, and tests then return to agreement through analysis,
   implementation, and convergence.
5. **Show how task-to-issue conversion distributes work.** GitHub Issues preserve the
   accepted task IDs, dependencies, parallel markers, file paths, and scope. They
   do not become a second requirements source.

### 0:52 to 1:00: Installation, demonstration, and lab handoff

**Slides:** *Approved installation paths*, *Prepared demonstration*, and *Lab
handoff*

1. **State the installation boundary.** Use an approved source and pinned release.
   A disconnected environment needs the official air-gapped package prepared before
   delivery. Stop when the approved installation or integration is unavailable.
2. **Run the prepared convergence demonstration.** Show an implementation that
   filters archived tasks but lacks the `include_archived=True` test. Run the
   existing tests, then run `/speckit-converge`. Inspect the appended task, add the
   missing test, rerun the suite, and converge again.
3. **Use the lab handoff as a checklist.** Learners will initialize the project,
   define archive behavior, plan the work, create issues, implement in stages,
   converge, and then evolve the specification to add restore behavior.

**Final message:** Passing tests and satisfying the accepted specification are
related, but they are not the same claim.

## Facilitation

Use the archive-task starter project from the lab. Run its existing tests first so
learners see the baseline.

**Preflight**

- Check the approved Spec Kit source and release tag.
- Prepare an initialized demo copy before the session.
- Check that the training repository allows issue creation.
- Do not install an unapproved package during delivery.

After `specify init`, show the generated files before running any agent command:

```text
.specify/
  memory/constitution.md
  scripts/
  templates/
.github/
  skills/speckit-*/
```

Use the GitHub Copilot skill names generated by the current integration:

```text
/speckit-constitution
/speckit-specify
/speckit-clarify
/speckit-plan
/speckit-checklist
/speckit-tasks
/speckit-analyze
/speckit-implement
/speckit-converge
/speckit-taskstoissues
```

The exact invocation can differ for another integration. Teach the workflow and let
the generated integration files define the command syntax.

## Prepared demo

Prepare one mismatch before the session: make the implementation hide archived
tasks by default, but omit the test for `include_archived=True`. Run convergence
and show the appended test task. Then add the test, run the suite, and converge
again. Then reveal `change-request.md` and show how restore behavior flows through
clarification, planning, tasks, analysis, implementation, and convergence.

## Delivery controls

Use synthetic data and a GitHub training repository. Record the approved package
source and release tag. If the environment is disconnected, use an official
air-gapped package prepared before delivery. Stop when the approved Spec Kit
installation or selected integration is unavailable.

## Common questions

**Why not ask an agent to build it immediately?** A specification exposes missing decisions while they are still cheap to change.

**Can the tool define the process?** No. The team owns the process and reviews its outputs.

**What if the package is not approved?** Stop. Do not replace Spec Kit with
course-created commands.
