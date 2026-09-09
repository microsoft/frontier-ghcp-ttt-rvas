# Writing Good Issues for the Copilot Cloud Agent

## The Golden Rule

**Write the issue for a developer who does not know the codebase.** The agent can access the code; the issue supplies team context.

---

## Anatomy of a Good Issue

### 1. Title — Specific and Action-Oriented

- **Good:** "Add input validation to POST /api/tasks — reject empty titles and invalid priorities"
- **Bad:** "Fix the tasks endpoint"
- **Bad:** "Validation"

### 2. Description — What and Why

Explain the change and why it is needed:

- The current behavior
- The desired behavior
- Any relevant business context

### 3. Acceptance Criteria — Testable Checkboxes

Each criterion must be independently verifiable:

- [ ] POST with empty title returns 400
- [ ] POST with invalid priority returns 400
- [ ] Existing valid requests still work (regression check)

### 4. File References

Point the agent to the right files:

- `src/app.js` — main application logic
- `tests/app.test.js` — test file to update

### 5. Constraints (Optional)

- "Do not add external dependencies"
- "Keep existing API clients compatible"
- "Use the same error response format as other endpoints"

---

## Issue Complexity Guide

| Complexity  | Scope                   | Example                                                 |
| ----------- | ----------------------- | ------------------------------------------------------- |
| **Simple**  | 1–2 files, clear change | Fix a bug, add validation, update a message             |
| **Medium**  | 2–4 files, new feature  | Add a new endpoint, add middleware, create a utility    |
| **Complex** | 4+ files, multi-step    | Add authentication, refactor storage layer, add logging |

---

## Common Mistakes

| Mistake                      | Why It Fails                                        | Fix                          |
| ---------------------------- | --------------------------------------------------- | ---------------------------- |
| "Make it better"             | The agent cannot infer “better”                     | State the exact improvement  |
| No acceptance criteria       | The agent cannot tell when it is done               | Add testable checkboxes      |
| Referencing external context | The agent cannot see Slack, Figma, or similar tools | Include the needed context   |
| Multiple unrelated changes   | The work becomes broad and unfocused                | One concern per issue        |
| No file references           | The agent may search or edit too broadly            | Name the relevant files      |
