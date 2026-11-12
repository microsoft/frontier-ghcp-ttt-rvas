# Session M6-02 lab: End-to-end capstone for one endpoint

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04, M3-01 to M3-05 and M5-02; Session M5-01 is optional

## Before you start

You need repository or sandbox access, GitHub Copilot, Node.js 20 or later, a
person to review your work, and synthetic bookmark data. Don't add a package or use
production data. The only slice is `POST /api/bookmarks`.

| Phase | Work | Time |
| --- | --- | --- |
| 1 | Review the specification | 15 min |
| 2 | Write the issue and run the baseline | 25 min |
| 3 | Prompt Copilot to implement it | 40 min |
| 4 | Review, test, and hand off | 40 min |

## Terms

| Term | Meaning in this lab |
| --- | --- |
| **Synthetic data** | Made-up bookmarks such as `https://docs.example.test/node`. No real URLs, accounts, or user data. |
| **Specification ID** | The label of one requirement in `starter/bookmark-create-spec.md`, such as `FR-007`. Issues, patches, and tests cite these IDs. |
| **Response envelope** | The JSON wrapper around every response. Success is `{ "data": { ... } }`. Failure is `{ "error": { "code": "...", "message": "..." } }`. |
| **Baseline** | The test results before you change anything: health passes, bookmark tests fail. |

## Phase 1: Review the specification (15 min)

Read `starter/bookmark-create-spec.md` once. Check that each requirement says
something you can observe in a request or response, and that technology choices
appear only under constraints. If a rule is ambiguous, ask your reviewer. Don't
guess.

## Phase 2: Write the issue and run the baseline (25 min)

### Worked example: from specification to issue

Take two requirements from the spec:

> **FR-007** A second request with the same URL returns `409` and does not create
> another bookmark.
> **FR-008** Validation failures return `400` with `error.code` set to
> `VALIDATION_ERROR`. Duplicate URLs use `CONFLICT`.

An issue for the duplicate rule looks like this:

```markdown
**Title:** Reject duplicate bookmark URLs on POST /api/bookmarks

**Goal:** A second POST with a URL that already exists returns 409 and stores
nothing new.

**Specification IDs:** FR-007, FR-008

**Acceptance criteria**
- A repeated `url` returns `409` with `{ "error": { "code": "CONFLICT", ... } }`. (FR-007, FR-008)
- The first bookmark is unchanged. (FR-007)

**Test:** `rejects a duplicate URL` in `tests/bookmarks.test.js`

**Expected files:** `src/routes/bookmarks.js`, `src/models/bookmark.js`

**Out of scope:** other endpoints, persistence, new dependencies
```

Each criterion cites a specification ID and a test. The issue adds no behavior that
the spec lacks.

### Your issue

Write one issue for the whole slice in `starter/capstone-handoff.md`, in the same
shape: goal, specification IDs (FR-001 to FR-008), acceptance criteria with the
test for each, expected files, out of scope, and reviewer.

### Run the baseline

```bash
mkdir -p ~/copilot-labs/session-m6-02
cp -R lab/starter/capstone-project ~/copilot-labs/session-m6-02/capstone-project
cd ~/copilot-labs/session-m6-02/capstone-project
npm install
npm test -- --runTestsByPath tests/health.test.js
npm test
```

**The failing bookmark tests are your baseline.** They are the specification as
executable checks, and they fail because the route doesn't exist. Health passes.
Write down both results. You're done when the bookmark tests pass. Don't edit them.

## Phase 3: Prompt Copilot to implement it (40 min)

Paste your issue into Copilot Chat or agent mode with a prompt like this:

```text
Implement this issue in the capstone project. Use only the existing dependencies.
Don't edit anything under tests/.

[paste the issue]

First list the files you will change and the specification ID each change serves.
Then make the change and run npm test. Report the changed files and the test
output.
```

Read the file list before you let Copilot edit. If it names a file the issue
doesn't expect, ask why. Then check that it implements only:

- route registration;
- in-memory creation and duplicate lookup;
- validation of the accepted fields;
- the documented success and error responses.

If Copilot adds another endpoint, a dependency, or live data, remove it and tighten
the prompt.

## Phase 4: Review, test, and hand off (40 min)

Passing tests are the start of the review. Do these checks in order:

1. **Run the suite.** `npm test` passes, health included.
2. **Check the diff.** `git diff` shows no edits under `tests/` and no new entry in
   `package.json`.
3. **Trace each specification ID to a test.** For each of FR-001 to FR-008, name
   the test that fails if the rule breaks. A requirement with no test is a gap.
4. **Break it on purpose.** Remove the duplicate check, or change the title limit
   from 200 to 201. The matching test must fail. Restore the change.
5. **Read the responses.** Status codes, envelope shape, `id`, `createdAt`,
   `updatedAt: null`, and the `description: null` and `tags: []` defaults all
   match the spec.
   The tests also fix the exact `message` text, such as `url is required`. The spec
   doesn't define it. Note that as a spec gap.
6. **Record deviations** from the issue.

Your reviewer then records **approve** or **request changes** in
`starter/capstone-handoff.md`. Complete the remaining sections of the handoff.

## Checkpoints

| Time | Expected state |
| --- | --- |
| 15 min | Specification reviewed |
| 40 min | Issue written and baseline recorded |
| 80 min | Copilot's patch is in place |
| 105 min | Checks 1 to 6 are done |
| 120 min | Handoff is complete |

## Final deliverable

One `capstone-handoff.md` with:

1. the issue, mapped to specification IDs;
2. a patch summary;
3. test results, including the baseline and the break-it check;
4. the reviewer's decision;
5. deviations and deferred scope;
6. the next action.
