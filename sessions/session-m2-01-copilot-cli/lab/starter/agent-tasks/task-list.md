# Agent Mode Task List

Complete these three tasks with Copilot CLI agent mode. Run the tests after each task; the next task uses the result of the previous one.

---

## Task 1: Fix the Bugs (10 min)

**Difficulty:** Easy

The file `src/app.js` has **3 bugs** that cause test failures. Use the Copilot CLI to find and fix them.

**How to start:**

```bash
copilot
```

Then tell the agent:

```
Read src/app.js and tests/app.test.js. There are 3 bugs in app.js causing test failures. Find and fix all of them. Run the tests after fixing to verify.
```

**Hints (only if you're stuck):**

1. One bug is in the GET `/tasks` filter logic
2. One bug is in the GET `/tasks/:id` route
3. One bug is in the PUT `/tasks/:id` route

**Success criteria:** `npm test` passes all 7 tests.

---

## Task 2: Add Missing Tests (10 min)

**Difficulty:** Medium

The `src/utils.js` file exports four functions and has no tests. Use the CLI agent to create a full test file.

**Tell the agent:**

```
The utils.js file has 4 exported functions but no tests. Create a full test file at tests/utils.test.js that covers every function, including edge cases. Run the tests to verify they pass.
```

**Success criteria:**

- `tests/utils.test.js` exists
- At least 3 tests per function (12+ total)
- Tests cover edge cases (empty strings, special characters, etc.)
- `npm test` passes all tests

---

## Task 3: Refactor with Validation (10 min)

**Difficulty:** Hard

Refactor `src/utils.js` to be production-quality. Use **autopilot mode** (press `Shift+Tab` until you see "autopilot").

**Tell the agent:**

```
Refactor src/utils.js:
1. Add input validation to all functions (throw TypeError for invalid arguments)
2. Add JSDoc comments to every function
3. Update the tests to cover the new validation behavior (expect throws for bad input)
4. Make sure all tests still pass
```

**Success criteria:**

- All 4 functions have `@param` and `@returns` JSDoc comments
- Invalid arguments throw `TypeError` with descriptive messages
- Tests verify normal behavior and error cases
- `npm test` passes all tests (including new validation tests)
