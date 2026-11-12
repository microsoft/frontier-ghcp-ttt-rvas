---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M3-02: Cloud Agent'
---

<!-- _class: lead -->
# One issue, one review decision
## Keep the Copilot cloud agent within the issue

---
# Issue-to-review workflow

```text
issue contract
    ↓
repository setup
    ↓
proposed change
    ↓
test output
    ↓
human decision
```

Keep the same issue and acceptance criteria at every step.

---
# The fixed issue

```text
Reject blank task titles
```

Allowed files:

- `src/app.js`
- `tests/app.test.js`

Required command:

```bash
npm test
```

No dependency changes. No unrelated refactor.

---
# Checkpoint 1: Issue contract

Before you assign the issue, a reviewer must be able to answer:

- Which behavior changes?
- Which behavior stays the same?
- Which files may change?
- What proves completion?
- What is out of scope?

---
# Repository instructions

Tell the agent how to work in this repository:

- project shape;
- coding conventions;
- allowed file scope;
- test command;
- prohibited changes.

Instructions support the issue. They don't repair a vague one.

---
# Copilot setup steps

The workflow file lives at:

```text
.github/workflows/copilot-setup-steps.yml
```

It has one job named:

```text
copilot-setup-steps
```

Review its permissions, commands, and secrets before merging it to the default branch.

---
# Checkpoint 2: Setup

Record:

- baseline test result;
- where the instructions and setup workflow live;
- allowed files;
- reviewer and stop condition.

Stop if you can't explain the baseline result or setup needs a credential.

---
# Start the session

- Assign the fixed issue.
- Watch the session log.
- Steer only within the issue.
- Stop on scope drift.

---
# Checkpoint 3: Proposed change

Inspect before running tests:

- changed files;
- validation behavior;
- response shape;
- valid request behavior;
- dependency and configuration changes.

A small diff can still be wrong.

---
# Expected behavior

```js
if (typeof title !== "string" || title.trim() === "") {
  return res.status(400).json({ error: "title is required" });
}
```

The code may differ. The behavior and constraints must not.

---
# Checkpoint 4: Tests

| Case | Expected |
| --- | --- |
| `""` | HTTP 400 |
| `"   "` | HTTP 400 |
| `" Weekly plan "` | HTTP 201 with preserved response shape |

Run the full suite and save the output.

---
# Keep review feedback within the issue

Good:

```text
The whitespace case is missing. Add a focused test in tests/app.test.js.
Keep the current response shape and do not change other endpoints.
Run npm test and report the result.
```

Bad:

```text
Clean up the API while you are there.
```

---
# Checkpoint 5: Human decision

Choose:

- **approve** when criteria, scope, and tests pass;
- **request changes** when a correction within the issue remains;
- **pause** when test output or ownership is unresolved.

The agent does not make this decision.

---
# Stop conditions

Stop when:

- the requested files expand;
- a new dependency appears;
- the agent asks for credentials;
- tests keep failing with no recovery plan;
- the issue changes mid-run.

---
<!-- _class: divider -->
# Lab handoff

Keep the same issue through all five checkpoints. Record the reviewer's decision.
