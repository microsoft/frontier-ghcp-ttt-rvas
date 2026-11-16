---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M6-02: End-to-End Capstone'
---

<!-- _class: lead -->

# End-to-end capstone for one endpoint

Session M6-02 | 3 hours

---

# Run one slice, end to end

A slice is **one endpoint or one feature** that goes from spec to reviewed patch.

- Small enough to finish and review in one sitting.
- Whole enough to touch every step: spec, issue, prompt, tests, review.
- **Everything else is deferred.**

---

# The result is a handoff

A slice ends with something another engineer can pick up:

- the issue;
- the patch;
- the test results;
- the review decision and next action.

---

# Four terms

- **Synthetic data**: made-up values. Nothing real goes into a prompt or a test.
- **Specification ID**: the label of one requirement, such as `FR-007`.
- **Response envelope**: the fixed shape of every success and error response.
- **Baseline**: test results before the change.

---

# Cut the slice from the spec

An accepted spec separates two things:

| Behavior | Constraint |
| --- | --- |
| What a caller sees: requests, responses, validation | Stack, storage, dependencies |
| Acceptance scenarios | Files and test command |

Pick the requirements that one endpoint needs. **Name what you leave out.**

---

# The scope lives in the issue

Copilot reads the issue, not your memory of the meeting.

- List what is in scope and what is out.
- Name the data rule and the dependency rule.
- Add no behavior the spec doesn't have. If the issue drifts, **fix the issue first**.

---

# Trace every criterion

```text
specification ID -> issue criterion -> planned file -> prompt -> test
```

Each link must point to the next. A criterion with no test is a guess. A test with no
spec ID is scope creep.

---

# Write the prompt from the issue

A good prompt for a slice:

- points at the issue and the spec IDs;
- sets limits: existing dependencies only, don't edit `tests/`;
- asks for the plan first: files and IDs, then the change, then the test run.

**Review the plan before Copilot writes code.**

---

# Failing tests are the baseline

Run the suite before you change anything.

- Tests for the new slice fail. That is the spec as executable checks.
- Tests for existing behavior pass. That is what you must not break.
- You're done when the failing tests pass. **Don't edit them to get there.**

---

# Review starts at green

Passing tests prove less than they seem to.

1. Run the suite.
2. Check the diff: no edits to tests, no new dependency.
3. Name a test for each specification ID.
4. Break a rule on purpose. The matching test must fail.
5. Read real responses against the spec.

---

# What a good handoff contains

- **Issue**: scope, criteria, spec IDs.
- **Patch**: the diff, with tests untouched.
- **Test results**: baseline and final run.
- **Decision**: approve or request changes, and why.
- **Next action**: one thing, with an owner.

---

# In the lab

You build `POST /api/bookmarks` for the Bookmark API.

- Start from the supplied spec and the failing starter tests.
- Use synthetic bookmarks and the existing Node.js dependencies.
- Out of scope: authentication, persistence, other endpoints, deployment.

Details are in `lab/README.md`.

---

# Lab time plan

| Phase | Time |
| --- | --- |
| Review the specification | 15 min |
| Write the issue and run the baseline | 25 min |
| Prompt Copilot to implement it | 40 min |
| Review, test, and hand off | 40 min |
