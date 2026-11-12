# Session M2-02 lab: Agent mode in the IDE

**Duration:** 2 hours

**Deliverable:** A tested Todo API built and extended with your review at each
stage

## Lab overview

You build one Todo API throughout the lab. Scaffold it from a brief, compare Ask
and Agent mode on the same feature, and redirect the agent when the requirement
changes. Finish with an accept, revise, or stop decision.

| Stage | Work | Time |
| --- | --- | --- |
| 1 | Prepare and scaffold the Todo API | 30 min |
| 2 | Compare Ask and Agent mode on one feature | 35 min |
| 3 | Redirect a multi-file change | 35 min |
| 4 | Review the diff and test results, then finish the handoff | 20 min |

## Before you start

You need VS Code with GitHub Copilot Agent mode, Node.js and npm, and a
disposable workspace. Use synthetic data only. Manual editing skips the practice
this lab is for: planning, tool approval, steering, and review.

Create a workspace outside the curriculum folder:

```bash
mkdir -p ~/copilot-labs/session-m2-02
cp sessions/session-m2-02-agent-mode-ide/lab/starter/project-brief.md \
  ~/copilot-labs/session-m2-02/
cp sessions/session-m2-02-agent-mode-ide/lab/starter/feature-spec.md \
  ~/copilot-labs/session-m2-02/
cp sessions/session-m2-02-agent-mode-ide/lab/starter/course-correction.md \
  ~/copilot-labs/session-m2-02/
cd ~/copilot-labs/session-m2-02
```

Create `lab-notes.md` with these headings:

```markdown
# Session M2-02 Lab Notes

## Task contract
## Agent plan
## Tool and file review
## Ask versus Agent comparison
## Course correction
## Final decision
```

## Stage 1: Prepare and scaffold the Todo API (30 minutes)

### Write the task contract

Read `project-brief.md`, then add a short contract to `lab-notes.md`:

```markdown
Goal: Build the Todo API described in project-brief.md.
Allowed scope: The session-m2-02 workspace only.
Commands: npm install, npm test, and npm start.
Non-goals: No database, front end, deployment, or extra dependencies.
Completion: Required routes exist and the test suite passes.
Stop: Pause on network access beyond npm, destructive commands, or work outside scope.
```

### Ask Agent mode to plan first

Open the workspace in VS Code and select Agent mode:

```text
Read project-brief.md. Before editing, return a plan with the files you expect to
create, the commands you need, the tests that prove completion, and any decision
that is missing. Do not edit files yet.
```

Reject extra features and unexplained dependencies.

### Scaffold the project

```text
Create the Todo API in a todo-api directory. Stay within the approved plan. Pause
before installing packages. After approval, implement the project and run its tests.
```

At each pause:

1. Check the command and working directory.
2. Check that the action supports the brief.
3. Read the changed files before the next command.
4. Note any revision in `lab-notes.md`.

Then run the tests yourself:

```bash
cd todo-api
npm test
```

If the project has no working test script, have the agent add one covering create,
list, validation, update, and not-found behavior.

Compare your project with `lab/solution/todo-api/`. It's an example, not a
file-for-file requirement.

### Checkpoint 1

- [ ] The project lives in `todo-api/` with the routes from `project-brief.md`.
- [ ] The agent stayed inside the workspace.
- [ ] You reviewed package changes before installation.
- [ ] `npm test` passes.
- [ ] `lab-notes.md` has the accepted plan and any corrections.

## Stage 2: Compare Ask and Agent mode on one feature (35 minutes)

`feature-spec.md` adds ownership and due-date behavior to the same API.

### Ask mode

Keep the passing baseline:

```bash
cp -R todo-api todo-api-ask
```

Open `todo-api-ask/`, switch to Ask mode, and ask:

```text
Read feature-spec.md and explain the exact code and tests needed to add this feature
to todo-api. Give changes file by file. Do not assume files that are not present.
```

Apply enough of the answer to test the workflow. Track messages sent, manual
edits, copy and paste operations, commands you ran, and missing context or wrong
assumptions. Stop after 12 minutes and save the result or diff. Keep the original
`todo-api/` as the clean baseline for Agent mode.

### Agent mode

```text
Read feature-spec.md and inspect todo-api. Propose the smallest multi-file plan that
implements the feature without changing existing behavior. Include focused tests.
Wait for approval before editing.
```

Approve only the work the plan describes, and watch each file and command. Then:

```bash
cd todo-api
npm test
```

Add this table to `lab-notes.md`:

| What you observed | Ask mode | Agent mode |
| --- | --- | --- |
| Prompts or messages | | |
| Manual edits | | |
| Files changed | | |
| Commands run | | |
| Corrections needed | | |
| Final test result | | |

### Checkpoint 2

- [ ] Existing tests still pass.
- [ ] New tests cover owner and due-date behavior.
- [ ] The implementation follows the existing project structure.
- [ ] The table uses counts or examples you observed.
- [ ] You can say why Agent mode did or didn't help.

## Stage 3: Redirect a multi-file change (35 minutes)

Open `course-correction.md`, but don't give it to the agent yet.

### Start the original task

```text
Refactor todo-api so route handlers delegate storage operations to a small repository
module. Keep the HTTP contract unchanged. Add or update tests, and stop after the
repository module and first route integration are complete.
```

Check the first stage:

- Did it preserve current behavior?
- Is the module boundary clear?
- Did it avoid unrelated formatting or dependency changes?
- Do the focused tests pass?

### Apply the course correction

Read `course-correction.md` and redirect the active task:

```text
Pause. Apply the new constraints in course-correction.md. Revise the plan before
editing. Keep completed work only when it still fits the new requirement.
```

Reject any plan that rewrites the project without need. The agent should adjust
the repository boundary, validation, and tests while keeping the API intact.

```bash
cd todo-api
npm test
```

If the agent asks for an unexpected dependency, network access, or a wider file
scope, **stop**. Note the unfinished work and make the smallest safe change by
hand.

### Checkpoint 3

- [ ] `course-correction.md` changed the plan before more edits.
- [ ] The final diff stays inside `todo-api/`.
- [ ] The API contract is still compatible.
- [ ] Tests cover the changed behavior.
- [ ] `lab-notes.md` says whether you accepted, revised, or stopped, and why.

## Stage 4: Review the diff and finish the handoff (20 minutes)

Review the project as if another engineer submitted it.

1. Read `git diff --stat` and `git diff`, or use the editor's change view.
2. Check that each changed file serves a requirement in the brief, feature spec, or
   course correction.
3. Run `npm test` again.
4. Start the service and make one create request and one filtered list request.
5. Write the final decision: **accept**, **revise**, or **stop**.

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Review agent work","owner":"learner","dueDate":"2026-10-15"}'

curl "http://localhost:3000/api/todos?owner=learner"
```

Don't approve the work because the agent says it succeeded. Use the diff, tests,
and API behavior. `lab/solution/final-review.md` is the trainer's reference.

### Checkpoint 4

- [ ] The final diff matches the scope you accepted.
- [ ] Package changes are explained.
- [ ] Test output is saved in `lab-notes.md`.
- [ ] The manual API check matches the feature spec.
- [ ] The final decision names remaining risk.

## Final deliverable

Submit the `session-m2-02` workspace with:

1. The completed `todo-api/` project.
2. Passing test output and two manual API checks.
3. `lab-notes.md` with the contract, plan, tool and file review, comparison,
   course correction, and final decision.
4. A note on any action you stopped or rejected.

A reviewer should be able to trace the final code to your plan, see where you
redirected the agent, and reproduce the checks.
