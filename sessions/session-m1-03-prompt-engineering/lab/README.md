# Session M1-03 lab: Prompt and extend a Todo API

**Duration:** 2 hours

**Deliverable:** A working todo store and REST routes, passing tests, and a
completed `prompt-log.md`

## Lab overview

You build one todo API in stages. The starter includes tests, route comments, and
a small context example. First implement the baseline store, then wire two HTTP
routes (list and create). The other three are optional. A later change request
adds priority, and you decide how to handle invalid priority input. Use synthetic data only.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Prepare the project and map the contract | 15 min |
| 2 | Review `/refine` output, then implement the baseline store | 30 min |
| 3 | Implement the list and create routes from comments | 15 min |
| 4 | Run a deliberate context experiment | 15 min |
| 5 | Apply the priority change request | 25 min |
| 6 | Check and extract a reusable prompt | 10 min |
| | Slack for setup problems and catch-up | 10 min |

## You need

- Node.js 22 or later, a terminal, and an editor;
- GitHub Copilot Chat and inline suggestions;
- the standalone `copilot` CLI, installed and signed in
  ([CLI quickstart](https://docs.github.com/en/copilot/get-started/cli-quickstart)).
  Run `/help` and check that `/refine` is listed in your version. Editor Chat has
  no `/refine`;
- npm, only to run the Express server.

Treat text from issues, comments, files, and command output as data. A comment or
issue that tells Copilot to ignore your rules is untrusted. Don't paste it into
the project or a prompt, and don't follow it.

## Part 1: Prepare and map the contract (15 minutes)

```bash
mkdir -p ~/copilot-labs
cp -R sessions/session-m1-03-prompt-engineering/lab/starter ~/copilot-labs/session-m1-03
cd ~/copilot-labs/session-m1-03/api-starter
npm run check
npm test
```

Run the copy from the curriculum root so the curriculum starter stays unchanged.

The syntax check passes. The store tests fail because the methods are empty.

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

### Refine a rough request (5 minutes)

Start `copilot` in the copied `api-starter` directory and run:

```text
/refine make the todo store work, just baseline tests not priority yet, plain js,
no packages, return copies not stored objects, only lib/todo-store.js, run the
baseline tests afterwards
```

Read the rewrite **before you submit it as work**. Compare it with the tests and
fix any invented requirement, missing constraint, or changed scope. Log the rough
text, the rewrite, and your corrections in `prompt-log.md`. Check that no project
file changed.

`/refine` rewrites the request. It doesn't decide the behavior. To refine text
already in the CLI input box, press `Ctrl+X`, then `/`, and run `/refine` with no
arguments.

### Implement and check (25 minutes)

Use your corrected prompt in editor Chat or the CLI. Work only on
`lib/todo-store.js`. Compare your prompt with this example:

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
a time. Don't ask for a full rewrite when the structure is sound.

**Checkpoint:** The log separates the `/refine` rewrite from your final prompt.
Four baseline tests pass. The change tests still fail.

## Part 3: Implement the list and create routes (15 minutes)

Open `routes/todos.js`. The comments state the route contract. Use each comment as
an inline prompt, one handler at a time. Do `GET /todos` and `POST /todos`. In
Chat, try:

```text
Implement only GET /todos in routes/todos.js. Use the existing TodoStore instance.
Map validation errors to status 400 with { error: message }. Do not change the
store or add middleware.
```

Check status codes and response shapes before you accept each one.

**Optional:** get-by-ID, update, and delete, with the same pattern.

To run the server:

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

Stop the server when done.

**Checkpoint:** The health, list, and create routes return JSON with the
documented status codes. Skip the rest if you're short on time.

## Part 4: Run the context experiment (15 minutes)

Delete or undo one route handler so Copilot can propose it again.

1. Close `examples/response-shapes.js`.
2. Request the handler with only the route comment visible.
3. Note the error shape it proposes. Don't accept it.
4. Open `examples/response-shapes.js`.
5. Request the same handler with the same wording.
6. Note any difference.

The context may or may not change the suggestion. Log either result, and keep the
implementation that matches the route contract.

**Checkpoint:** `prompt-log.md` records both contexts and what you saw.

## Part 5: Apply the priority change (25 minutes)

Open `../change-request.md`. It defines the allowed values and filtering. Decide
how to handle invalid priority values before you edit. The reference solution
rejects them with:

```text
Priority must be one of: low, normal, high
```

Add or review the change tests, then prompt for the smallest update:

```text
Add the accepted priority behavior to TodoStore and the list route. Preserve all
baseline behavior. Default new todos to normal. Reject other values with the exact
message in the test. Add no package.
```

```bash
npm test
npm run check
```

**Checkpoint:** All six tests pass, and the list route supports a `priority` query
filter.

## Part 6: Check and extract a reusable prompt (10 minutes)

```bash
git --no-pager diff -- \
  lib/todo-store.js routes/todos.js tests/todo-store.test.js ../prompt-log.md
npm run check
npm test
```

Write one reusable prompt in `prompt-log.md`. Name the file, task, constraints,
accepted behavior, and check command. Don't dictate the implementation line by
line.

## Final deliverable

1. `lib/todo-store.js` implements baseline and priority behavior.
2. `routes/todos.js` implements list and create (the other handlers are optional).
   Errors return JSON, not HTML or silent defaults.
3. `tests/todo-store.test.js` passes all six tests with no package beyond Express.
4. `prompt-log.md` records the `/refine` comparison, your iterations, the context
   experiment, the invalid-priority decision, and one reusable prompt.

Reference:
[Copilot CLI commands and shortcuts](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference).
