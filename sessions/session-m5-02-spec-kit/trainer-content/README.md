# Session M5-02 trainer guide: Spec Kit

## Goal

Show the complete Spec Kit loop on one small change: request, specification, plan,
tasks, implementation, tests, and convergence. Learners should know which files
Spec Kit creates and which decisions the team still owns. The lab's required
parts stop at convergence. Issue conversion and the restore cycle are optional.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:06 | Why specification-driven development |
| 0:06 to 0:18 | Spec Kit project and artifact model |
| 0:18 to 0:30 | Requirements and clarification |
| 0:30 to 0:42 | Planning, checklists, tasks, and analysis |
| 0:42 to 0:52 | Implementation and convergence |
| 0:52 to 1:00 | Installation, demonstration, and lab handoff |

The timings match the agenda in [`slides.md`](../slides.md). Keep the first five
segments moving so the demonstration and lab handoff get the last eight minutes.

## Prepare

- Install Spec Kit v1.4.0 (latest on 12 November 2026) and check the [releases page](https://github.com/github/spec-kit/releases) for newer ones. If you change the tag, rerun the lab first.
- Check whether `/speckit-taskstoissues` exists in your install. It comes from the GitHub extension. If it doesn't, tell learners to skip Part 4.
- Prepare an initialized copy of the archive-task starter. Run its tests first so learners see the baseline.
- Check that the training repository allows issue creation.

## Slide-by-slide delivery map

### 0:00 to 0:06: Why specification-driven development

**Slides:** *Spec Kit: Specification-Driven Development*, *Agenda*, *A feature
request is a starting point*, and *Resolve decisions before implementation*

1. Read the archive request aloud. Ask learners how many decisions hide inside
   the word "remove." Use the four questions on the slide. Don't answer them yet.
2. Compare the two paths. Specification-driven development moves decisions
   earlier. It doesn't add documents for their own sake.

### 0:06 to 0:18: Spec Kit project and artifact model

**Slides:** *What Spec Kit provides*, *Initialize an existing project*, *Two
artifact scopes*, *Four terms and one file layout*, and *The full workflow*

1. **Separate the three layers.** The CLI creates the project structure, the
   generated skills guide the workflow, and the feature artifacts hold the work.
2. **Show initialization as a reviewed change.** Explain `--here`, `--force`, and
   `--integration copilot`, then show the generated diff. `--force` allows
   initialization in a non-empty directory. It doesn't accept every generated file.
3. **Distinguish scopes.** The constitution applies to the project. The
   specification, plan, design files, checklists, and tasks belong to one feature.
4. **Define the four terms.** Constitution, convergence, idempotent, and skill.
   Say that `/speckit-plan` runs the instructions in `.github/skills/speckit-plan/`.
   Open that file so learners see a command is just a Markdown instruction file.
5. **Walk through the workflow once.** Clarification, checklist review, and
   analysis are optional gates for ambiguity or risk.

**Check:** Learners can say where project principles live and where feature
behavior lives.

### 0:18 to 0:30: Requirements and clarification

**Slides:** *Constitution: rules for how the project works*, *Specify behavior, not
implementation*, *Write scenarios a reviewer can challenge*, and *Clarify before
choosing a design*

1. **Make constitution principles testable.** A useful principle changes planning,
   implementation, or review.
2. **Keep `spec.md` technology-neutral.** It defines the user, outcome, scenarios,
   non-goals, and measurable requirements. Class names, storage, packages, and
   paths belong later.
3. **Use scenarios to test decisions.** Walk through the active-task and unknown-ID
   examples. Each Given/When/Then statement lets a reviewer challenge one behavior.
4. **Resolve the archive questions.** Reveal the accepted decisions after learners
   see the ambiguity. Clarification updates `spec.md`.

### 0:30 to 0:42: Planning, checklists, tasks, and analysis

**Slides:** *Plan: decide how the feature will work*, *Supporting design files have
a purpose*, *A checklist reviews requirement quality*, *Tasks turn design into
executable work*, and *Analyze artifacts before implementation*

1. **Move technical choices into the plan.** Python version, storage, fields, and
   file paths belong in `plan.md`, not `spec.md`.
2. **Explain each supporting file by the question it answers.** Not every feature
   needs every optional artifact.
3. **Separate requirement review from implementation status.** A checked checklist
   item means the requirement is clear. It doesn't mean the code exists.
4. **Read the sample tasks as a dependency sequence.** Point out the task ID,
   user-story reference, action, and exact file. "Implement the feature" is too
   broad to assign.
5. **Explain analysis as a read-only check.** Fix a finding in the artifact that
   owns the decision, then analyze again. Don't edit code to hide a spec
   contradiction.

**Check:** Ask which artifact owns an ambiguous behavior, a storage choice, and a
missing implementation step. Answers: `spec.md`, `plan.md`, `tasks.md`.

### 0:42 to 0:52: Implementation and convergence

**Slides:** *Implementation follows the accepted tasks*, *Compare implementation with accepted artifacts*,
*`specify check` is not compliance validation*,
*Living specifications evolve accepted behavior*, and *Convert tasks into
GitHub Issues*

1. **Set the implementation gate.** Review the checklist, fix the analysis
   findings, and commit the artifacts.
2. **Explain convergence.** It compares implementation, tests, specification,
   plan, and tasks. When it finds a gap, it adds work. It doesn't rewrite accepted
   requirements to match the code.
3. **Correct the `specify check` misconception.** It checks the local Spec Kit
   environment, not implementation compliance, security, performance, or coverage.
4. **Show how accepted behavior changes (optional in the lab).** Restore behavior
   starts in `spec.md`. Analysis, implementation, and convergence then bring plan,
   tasks, code, and tests back in line.
5. **Show task-to-issue conversion (optional in the lab).** Issues keep the task
   IDs, dependencies, and file paths. They are not a second requirements source.

### 0:52 to 1:00: Installation, demonstration, and lab handoff

**Slides:** *Install Spec Kit*, *Prepared demonstration*, and *Lab handoff*

1. **Install a pinned release.** The lab uses v1.4.0. A disconnected environment needs the
   official air-gapped package prepared beforehand.
2. **Run the convergence demo.** Prepare an implementation that hides archived
   tasks by default but has no test for `include_archived=True`. Run the existing
   tests, then `/speckit-converge`. Inspect the appended task, add the missing
   test, rerun the suite, and converge again.
3. **Hand off.** Learners initialize the project, define archive behavior, plan,
   implement in stages, and converge. Learners who finish early convert tasks to
   issues and add restore behavior. Reveal `change-request.md` only then.

**Final message:** Passing tests and satisfying the accepted specification are
different things.

## Generated files and commands

After `specify init`, show the generated files before running any agent command:

```text
.specify/
  memory/constitution.md
  scripts/
  templates/
.github/
  skills/speckit-*/
```

Copilot skill names generated by the current integration:

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

Another integration may use different invocation syntax. Teach the workflow and let
the generated files define the syntax.

## Common questions

**Why not ask an agent to build it immediately?** A specification exposes missing decisions while they are cheap to change.

**Can the tool define the process?** No. The team owns the process and reviews its outputs.
