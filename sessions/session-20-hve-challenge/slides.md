---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 20: Governed HVE Challenge'
---

<!-- _class: lead -->

# HVE Challenge: Governed Specification-to-Delivery

Session 20 of 20 | Optional specialization | 3 hours

---

# One feature, one evidence chain

Deliver `POST /api/decisions` from a fixed brief.

Research → plan → implement → package → review → handoff

The endpoint is small on purpose. Scope control is part of the score.

---

# The contract

| Input | Rule |
|-------|------|
| `title` | Required non-empty string; duplicate check ignores case |
| `context` | Required non-empty string |
| `decision` | Required non-empty string |
| `status` | `proposed`, `accepted`, or `superseded` |

Generate an ID and UTC timestamp. Keep state in memory.

Package tested source in a non-root runtime image with production dependencies and
a health check.

---

# Evidence before code

* Name the owning files.
* Map each criterion to a change and check.
* State the non-goals again.
* Pick the human review gate.

If the plan cannot say how a criterion will be tested, implementation is early.

---

# Two instruction layers

```text
.github/copilot-instructions.md
.github/instructions/api-review.instructions.md
```

Repository guidance sets the local rules. Targeted guidance applies only to
matching route and test paths.

Activation needs proof from a matching task or review.

---

# Fast checks that find weak work

1. Send a required field as whitespace or a number.
2. Create the same trimmed title with different case.
3. Send malformed JSON.
4. Inspect the exact error envelope.
5. Check which stage supplies source to the runtime image.

These checks test the boundary, not the happy path.

---

# Three delivery paths

| Path | Output |
|------|--------|
| Approved HVE-assisted | Code and the full evidence workbook |
| Manual | The same code and evidence, written directly |
| Prepared patch | File-level patch plan, HTTP checks, and container stage plan |

Command names are not graded. Observable evidence is.

---

# Review before handoff

For every criterion, record `pass`, `fail`, `deferred`, or `not run`.

Check input handling, process-local data, errors, scope, tests, and the runtime
image. Then choose one human decision: approve, request changes, or pause.

---

# Final ten minutes

Stop implementation at minute 110.

Prepare a conventional commit-message preview, pull-request summary, test evidence,
review owner, and next action. Do not change remote Git state.

---

# Source boundary

This lab was independently rewritten from workflow facts observed at HVE showcase
commit `598ba5fbc937abf0dce622b97bcafda63bbc2dd1`.

No source prose, prompts, samples, or templates were copied.
