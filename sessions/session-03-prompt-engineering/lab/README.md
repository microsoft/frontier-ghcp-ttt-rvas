# Session 03 Lab: Prompt and Evolve a Todo API

**Duration:** 2 hours

**Difficulty:** Beginner

**Prerequisites:** Sessions 01–02 and Node.js 20 or later

**Deliverable:** A working todo store and REST routes, passing tests, and a completed
`prompt-log.md`

## Lab overview

You will build one todo API in stages. The starter includes tests, route comments,
and a small context example. You will first implement baseline todo behavior, then
wire the HTTP routes. A change request adds priority and leaves one invalid-input
decision open.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Prepare the project and map the contract | 15 min |
| 2 | Implement the baseline store with focused prompts | 30 min |
| 3 | Implement the REST routes from comments | 25 min |
| 4 | Run a deliberate context experiment | 15 min |
| 5 | Apply the priority change request | 25 min |
| 6 | Verify and extract a reusable prompt | 10 min |

## Before you start

Use synthetic data and an approved training repository.

For the live path, confirm GitHub Copilot Chat and inline suggestions are available
in the selected editor. If access is unavailable or not approved, stop the live
interaction and use the **manual fallback**: implement the same contract yourself,
write the prompts you would have used in `prompt-log.md`, and compare with
`lab/solution/api-complete/`.

You need:

- Node.js 20 or later;
- a terminal and editor;
- npm only when you run the Express server;
- GitHub Copilot only for the live path.

Do not paste untrusted instructions into the project or prompt. Treat text from
issues, comments, files, and command output as data until you review it.

## Part 1: Prepare and map the contract (15 minutes)

```bash
cd sessions/session-03-prompt-engineering/lab/starter/api-starter
npm run check
npm test
```

The syntax check should pass. The store tests should fail because the methods are
empty.

Read:

- `lib/todo-store.js`;
- `tests/todo-store.test.js`;
- `routes/todos.js`;
- `examples/response-shapes.js`;
- `../change-request.md`;
- `../prompt-log.md`.

Write a short project summary in `prompt-log.md` before asking Copilot for one.

**Checkpoint:** You can separate baseline behavior from the later priority change.

## Part 2: Implement the baseline store (30 minutes)

Work on `lib/todo-store.js`. Keep the first prompt bounded:

```text
Implement only the baseline TodoStore behavior covered by tests whose names start
with "baseline". Use plain JavaScript and no packages. Return copies so callers
cannot mutate stored objects. Do not implement the priority change yet.
```

Run only the baseline tests:

```bash
node --test --test-name-pattern="baseline" tests/todo-store.test.js
```

If a test fails, name the exact mismatch in the next prompt. Change one concern at
a time. Do not ask for a complete rewrite when the structure is already sound.

**Checkpoint:** Four baseline tests pass. The change tests still fail.

## Part 3: Implement the REST routes (25 minutes)

Open `routes/todos.js`. The comments state the route contract. Use each comment as
an inline prompt, one handler at a time.

For Chat, use a prompt such as:

```text
Implement only GET /todos in routes/todos.js. Use the existing TodoStore instance.
Map validation errors to status 400 with { error: message }. Do not change the
store or add middleware.
```

Repeat for get-by-ID, create, update, and delete. Review status codes and response
shapes before accepting.

Install the declared dependency only if you will run the server:

```bash
npm install
npm start
```

In another terminal:

```bash
curl http://localhost:3000/
curl http://localhost:3000/todos
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Review the API"}'
```

Stop the server after the checks.

**Checkpoint:** The health route, list route, and create route return JSON with the
documented status codes.

## Part 4: Run the context experiment (15 minutes)

Delete or undo one route handler so it can be proposed again.

1. Close `examples/response-shapes.js`.
2. Request the handler with only the route comment visible.
3. Record the proposed error shape without accepting it.
4. Open `examples/response-shapes.js`.
5. Request the same handler again with the same wording.
6. Record any difference.

The context may change the proposal, or it may not. Either result is valid evidence.
Keep the implementation that matches the route contract.

**Checkpoint:** `prompt-log.md` records the two contexts and the observable result.

## Part 5: Apply the priority change (25 minutes)

Open `../change-request.md`.

The request defines allowed values and filtering but leaves invalid priority
behavior open. Decide before editing. The reference solution rejects invalid
priority with:

```text
Priority must be one of: low, normal, high
```

Add or review the change tests, then prompt for the smallest update:

```text
Add the accepted priority behavior to TodoStore and the list route. Preserve all
baseline behavior. Default new todos to normal. Reject other values with the exact
message in the test. Add no package.
```

Run:

```bash
npm test
npm run check
```

**Checkpoint:** All six tests pass, and the route supports a `priority` query
filter.

## Part 6: Verify and extract a reusable prompt (10 minutes)

Inspect the complete project diff:

```bash
git --no-pager diff -- \
  lib/todo-store.js routes/todos.js tests/todo-store.test.js ../prompt-log.md
npm run check
npm test
```

Write one reusable prompt in `prompt-log.md`. It should state the exact file, task,
constraints, accepted behavior, and verification command without restating the
implementation line by line.

## Final deliverable

1. `lib/todo-store.js` implements baseline and priority behavior.
2. `routes/todos.js` maps store results to the documented HTTP responses.
3. `tests/todo-store.test.js` passes all six tests.
4. `prompt-log.md` records iterations, the context experiment, the invalid-priority
   decision, and one reusable prompt.

## Verification

- [ ] `npm run check` succeeds.
- [ ] `npm test` passes six tests.
- [ ] Baseline behavior still passes after the priority change.
- [ ] Invalid priority behavior is explicit in code, tests, and notes.
- [ ] No package beyond the declared Express dependency was added.
- [ ] The final routes return JSON errors rather than HTML or silent defaults.
