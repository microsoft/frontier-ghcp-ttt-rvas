---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 09: Cloud Agent'
---

<!-- _class: lead -->
# One Issue, One Review Decision
## A bounded Copilot cloud agent workflow

---
# Today’s journey

```text
issue contract
    ↓
repository setup
    ↓
proposed change
    ↓
test evidence
    ↓
human decision
```

Keep the same issue and acceptance criteria at every step.

---
# Access policy

The live route requires:

- approved Copilot cloud agent access;
- a training repository with synthetic data;
- a named reviewer;
- a bounded issue and stop condition.

If one requirement is missing, use the manual route. Do not bypass policy.

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

The reviewer must answer:

- Which behavior changes?
- Which behavior stays the same?
- Which files may change?
- What proves completion?
- What is out of scope?

Assignment waits until every answer is clear.

---
# Repository instructions

Repository instructions help the agent work efficiently:

- project shape;
- coding conventions;
- allowed file scope;
- test command;
- prohibited changes.

Instructions support the issue. They do not repair a vague issue.

---
# Copilot setup steps

The workflow file belongs at:

```text
.github/workflows/copilot-setup-steps.yml
```

It uses one job named:

```text
copilot-setup-steps
```

Review permissions, commands, and secrets before merging it to the default branch.

---
# Checkpoint 2: Setup

Record:

- baseline test result;
- repository instructions location;
- setup workflow location;
- allowed files;
- reviewer and stop condition.

Stop when the baseline is unexplained or setup requires unapproved access.

---
# Start or simulate the session

Live route:

- assign the fixed issue through an approved entry point;
- watch the session log;
- steer only within the issue;
- stop on scope drift.

Manual route:

- implement the same issue locally;
- preserve the same file scope and tests.

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
# The expected behavior

```js
if (typeof title !== "string" || title.trim() === "") {
  return res.status(400).json({ error: "title is required" });
}
```

The exact code may differ. The observable behavior and constraints may not.

---
# Checkpoint 4: Tests

Required cases:

| Case | Expected |
| --- | --- |
| `""` | HTTP 400 |
| `"   "` | HTTP 400 |
| `" Weekly plan "` | HTTP 201 with preserved response shape |

Run the full supplied suite and record the command output.

---
# Review feedback stays bounded

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
- **request changes** when a bounded correction remains;
- **pause** when access, evidence, or ownership is unresolved.

The agent does not make this decision.

---
# Stop conditions

Stop the live route when:

- the requested files expand;
- a new dependency appears;
- credentials or unapproved data are requested;
- tests loop without a bounded recovery;
- the issue changes during implementation;
- the reviewer is no longer available.

---
# Prepared fallback

The solution folder contains:

- the final issue contract;
- reviewed setup workflow;
- proposed diff;
- runnable solution project;
- test evidence;
- completed human decision.

Use it when a live session is delayed. Label it as prepared evidence.

---
<!-- _class: divider -->
# Lab handoff

One issue. Five checkpoints. One accountable decision.
