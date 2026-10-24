# Agent mode task list

Complete these three tasks in the main lab's order. Keep its permission checks
and usage limit in place. Run the tests after each task; the next task uses the
result of the previous one.

---

## Task 1: Plan and repair the bugs (15 min)

**Difficulty:** Easy

The file `src/app.js` has **3 bugs** that cause test failures. Use the Copilot CLI to find and fix them.

**How to start:**

```bash
copilot
```

Start in Plan mode:

```text
/plan Read src/app.js and tests/app.test.js. Explain the three failing behaviors.
Plan the smallest fixes. Map each behavior to a target file and an existing test.
Do not edit project files, add dependencies, or refactor unrelated code.
```

Follow the main lab's Task 1 to revise the plan, run `/rubber-duck`, and check its
critique. Approve the revised plan before leaving Plan mode and implementing it.
Inspect the diff and run `npm test` yourself.

**Hints (only if you're stuck):**

1. One bug is in the GET `/tasks` filter logic
2. One bug is in the GET `/tasks/:id` route
3. One bug is in the PUT `/tasks/:id` route

**Success criteria:** `npm test` passes all 7 tests.

---

## Task 2: Add missing tests (10 min)

**Difficulty:** Medium

The `src/utils.js` file exports four functions and has no tests. Use the CLI agent to write a test file covering all four.

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

## Task 3: Refactor from an accepted plan (15 min)

**Difficulty:** Hard

Plan the validation and JSDoc changes to `src/utils.js`, then approve only the
listed behavior changes. Continue in **Standard mode** and inspect the diff.

**Start in Plan mode:**

```text
/plan Refactor src/utils.js:
1. Add input validation to all functions (throw TypeError for invalid arguments)
2. Add JSDoc comments to every function
3. Update the tests to cover the new validation behavior (expect throws for bad input)
4. Make sure all tests still pass
Name the files and checks for each step. Do not implement yet.
```

**Success criteria:**

- All 4 functions have `@param` and `@returns` JSDoc comments
- Invalid arguments throw `TypeError` with descriptive messages
- Tests check normal behavior and error cases
- `npm test` passes all tests (including new validation tests)
