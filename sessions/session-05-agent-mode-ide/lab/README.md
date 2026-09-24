# Session 05 Lab: Agent Mode in the IDE

**Duration:** 2 hours
**Difficulty:** Intermediate
**Prerequisites:** Sessions 01–04 completed
**Deliverable:** A tested Todo API built and evolved with visible human review points

## Lab overview

Build one Todo API and keep it for the full lab. Scaffold the project from a brief,
then compare Ask and Agent mode on the same feature. Redirect the agent when the
requirement changes. Finish with an accept, revise, or stop decision.

| Stage | Work | Time |
| --- | --- | --- |
| 1 | Prepare and scaffold the Todo API | 30 min |
| 2 | Compare Ask and Agent mode on one feature | 35 min |
| 3 | Redirect a multi-file change | 35 min |
| 4 | Review evidence and finish the handoff | 20 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Use a disposable workspace and synthetic data.

You need:

- GitHub Copilot access in VS Code with Agent mode enabled;
- Node.js and npm;
- permission to let the agent read and edit the lab workspace;
- permission to run the project test command;
- `lab/starter/project-brief.md`, `feature-spec.md`, and `course-correction.md`.

If Copilot Agent mode access is unavailable, **do not start the agent steps**. Use
the manual fallback in each stage. Write the plan, make the same changes with normal
editor tools, and run the same checks. Record where an agent would have needed
approval.

Create a workspace outside the curriculum folder:

```bash
mkdir -p ~/copilot-labs/session-05
cp sessions/session-05-agent-mode-ide/lab/starter/project-brief.md \
  ~/copilot-labs/session-05/
cp sessions/session-05-agent-mode-ide/lab/starter/feature-spec.md \
  ~/copilot-labs/session-05/
cp sessions/session-05-agent-mode-ide/lab/starter/course-correction.md \
  ~/copilot-labs/session-05/
cd ~/copilot-labs/session-05
```

Create `lab-notes.md` with these headings:

```markdown
# Session 05 Lab Notes

## Task contract
## Agent plan
## Tool and file review
## Ask versus Agent comparison
## Course correction
## Final decision
```

## Stage 1: Prepare and scaffold the Todo API (30 minutes)

### Write the task contract

Read `project-brief.md`. Add a short contract to `lab-notes.md`:

```markdown
Goal: Build the Todo API described in project-brief.md.
Allowed scope: The session-05 workspace only.
Commands: npm install, npm test, and npm start.
Non-goals: No database, front end, deployment, or extra dependencies.
Completion: Required routes exist and the test suite passes.
Stop: Pause on network access beyond npm, destructive commands, or work outside scope.
```

### Ask Agent mode to plan first

Open the workspace in VS Code and select Agent mode. Use this prompt:

```text
Read project-brief.md. Before editing, return a plan with the files you expect to
create, the commands you need, the tests that prove completion, and any decision
that is missing. Do not edit files yet.
```

Review the plan. Reject extra features and unexplained dependencies.

### Scaffold the project

After accepting the plan, continue:

```text
Create the Todo API in a todo-api directory. Stay within the approved plan. Pause
before installing packages. After approval, implement the project and run its tests.
```

At each pause:

1. Check the command and working directory.
2. Confirm that the action supports the brief.
3. Review changed files before the next command.
4. Record any revision in `lab-notes.md`.

Run the checks yourself:

```bash
cd todo-api
npm test
```

If the generated project has no working test script, require the agent to add one that covers create, list, validation, update, and not-found behavior.

Compare the shape of your project with `lab/solution/todo-api/`. The reference is an example, not a file-for-file requirement.

### Checkpoint 1: baseline project works

- [ ] The project lives in `todo-api/`.
- [ ] The routes in `project-brief.md` exist.
- [ ] The agent stayed inside the workspace.
- [ ] You reviewed package changes before installation.
- [ ] `npm test` passes.
- [ ] `lab-notes.md` contains the accepted plan and any corrections.

### Manual fallback

Build the project from `project-brief.md` with normal editor tools. Record the file plan and commands before running them. The checkpoint does not change.

## Stage 2: Compare Ask and Agent mode on one feature (35 minutes)

`feature-spec.md` adds ownership and due-date behavior to the same Todo API.

### Capture a clean baseline

Save the passing baseline:

```bash
cp -R todo-api todo-api-ask
```

### Attempt the feature in Ask mode

Open `todo-api-ask/`, switch to Ask mode, and ask:

```text
Read feature-spec.md and explain the exact code and tests needed to add this feature
to todo-api. Give changes file by file. Do not assume files that are not present.
```

Apply enough of the answer to test the workflow. Track:

- messages sent;
- manual file edits;
- copy and paste operations;
- commands you ran;
- missing context or incorrect assumptions.

Stop after 12 minutes. Save the result or diff. Keep the original `todo-api/` as the clean baseline for the Agent mode attempt.

### Implement the same feature in Agent mode

Switch to Agent mode:

```text
Read feature-spec.md and inspect todo-api. Propose the smallest multi-file plan that
implements the feature without changing existing behavior. Include focused tests.
Wait for approval before editing.
```

Review the plan, approve the bounded work, and watch each file and command. Then run:

```bash
cd todo-api
npm test
```

Add the comparison to `lab-notes.md`:

| Evidence | Ask mode | Agent mode |
| --- | --- | --- |
| Prompts or messages | | |
| Manual edits | | |
| Files changed | | |
| Commands run | | |
| Corrections needed | | |
| Final test result | | |

### Checkpoint 2: feature and comparison are observable

- [ ] Existing tests still pass.
- [ ] New tests cover owner and due-date behavior.
- [ ] The implementation follows the existing project structure.
- [ ] The Ask-versus-Agent table uses observed counts or examples.
- [ ] You can explain why Agent mode did or did not help.

### Manual fallback

Compare two manual approaches: a chat-style file-by-file plan and a repository-wide implementation plan. Apply the repository-wide plan, run the tests, and record the difference.

## Stage 3: Redirect a multi-file change (35 minutes)

Open `course-correction.md`. Do not give it to the agent yet.

### Start the original task

Ask Agent mode:

```text
Refactor todo-api so route handlers delegate storage operations to a small repository
module. Keep the HTTP contract unchanged. Add or update tests, and stop after the
repository module and first route integration are complete.
```

Inspect the first stage:

- Did the agent preserve current behavior?
- Did it choose a clear module boundary?
- Did it avoid unrelated formatting or dependency changes?
- Do focused tests pass?

### Apply the course correction

Now read `course-correction.md` and redirect the active task:

```text
Pause. Apply the new constraints in course-correction.md. Revise the plan before
editing. Keep completed work only when it still fits the new requirement.
```

Reject any plan that rewrites the project without need. The agent should adjust the repository boundary, validation, and tests while preserving the API.

Run the full suite:

```bash
cd todo-api
npm test
```

If the agent requests an unexpected dependency, network access, or broader file scope, choose **stop**. Record the unresolved work and complete the smallest safe change manually.

### Checkpoint 3: redirect or stop decision is recorded

- [ ] `course-correction.md` changed the plan before more edits.
- [ ] The final diff stays inside `todo-api/`.
- [ ] The API contract remains compatible.
- [ ] Tests prove the changed behavior.
- [ ] `lab-notes.md` records whether you accepted, revised, or stopped the run and why.

### Manual fallback

Make the initial repository-module change, pause, then revise your own plan from `course-correction.md`. Keep a before-and-after plan in `lab-notes.md`.

## Stage 4: Review evidence and finish the handoff (20 minutes)

Review the final project as if another engineer submitted it.

1. Inspect `git diff --stat` and `git diff`, or use the editor's change view.
2. Confirm each changed file traces to the brief, feature spec, or course correction.
3. Run `npm test` again.
4. Start the service and make one create request and one filtered list request.
5. Write the final decision: **accept**, **revise**, or **stop**.

Use `lab/solution/final-review.md` as the trainer reference. Review behavior and evidence rather than requiring an exact file layout.

Example requests:

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Review agent work","owner":"learner","dueDate":"2026-10-15"}'

curl "http://localhost:3000/api/todos?owner=learner"
```

Do not approve the work only because the agent reports success. Use the diff, tests, and API behavior.

### Checkpoint 4: another reviewer can reproduce the result

- [ ] The final diff matches the accepted scope.
- [ ] Package changes are explained.
- [ ] Test output is saved in `lab-notes.md`.
- [ ] The manual API check matches the feature spec.
- [ ] The final decision names remaining risk.

## Final Deliverable

Submit the `session-05` workspace with:

1. The completed `todo-api/` project.
2. Passing test output and two manual API checks.
3. `lab-notes.md` with the task contract, plan, tool and file review, comparison, course correction, and final decision.
4. A clear record of any manual fallback or stopped action.

**Done:** A reviewer can trace the final code to the approved plan, see where you redirected the agent, and reproduce the checks.
