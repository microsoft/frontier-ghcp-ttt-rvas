# Session M6-02 trainer guide: End-to-end capstone for one endpoint

## Goal

Guide learners through one reviewed `POST /api/bookmarks` change with GitHub Copilot:
specification to issue, issue to prompt, prompt to patch, patch to review. Keep it
to one endpoint.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:07 | Define the one-slice capstone and the four terms |
| 0:07 to 0:15 | Review the specification (keep it short) |
| 0:15 to 0:30 | Worked example: spec to issue to prompt |
| 0:30 to 0:38 | The failing tests as the baseline |
| 0:38 to 0:50 | Walk through the patch and review it beyond the trace |
| 0:50 to 1:00 | Hand off |

## Teach the boundary

Learners use Copilot to implement `POST /api/bookmarks`, run the tests, and have a
person review the result. Write the non-goals where everyone can see them:

- no authentication;
- no persistent storage;
- no list, read, update, or delete endpoint;
- no deployment or CI redesign;
- no new dependency.

## Define the terms

Spend two minutes on these. They are in the lab README.

- **Synthetic data:** made-up bookmarks. Nothing real.
- **Specification ID:** `FR-001` to `FR-008` in `lab/starter/bookmark-create-spec.md`.
- **Response envelope:** `{ "data": ... }` on success, `{ "error": { "code", "message" } }` on failure.
- **Baseline:** the test results before the change.

## Review the specification

Keep this to the lab's 15 minutes. Learners check that requirements describe
something observable and that technology choices sit under constraints. Ask them to
find one ambiguity. The error `message` text is a good one: the tests fix it, the
spec doesn't.

## Worked example: spec to issue to prompt

Walk through the example in the lab README. Take FR-007 and FR-008, write the issue
live, then show the prompt:

```text
Implement this issue in the capstone project. Use only the existing dependencies.
Don't edit anything under tests/.

[paste the issue]

First list the files you will change and the specification ID each change serves.
Then make the change and run npm test. Report the changed files and the test
output.
```

Point out three things: each criterion cites a spec ID and a test, the prompt asks
for the file list before any edit, and the prompt forbids test edits.

## Frame the baseline

The Bookmark tests fail on purpose. They are the spec as executable checks, and
they define done. Health passes. Learners record both results and don't edit the
tests. If Copilot edits a test to make it pass, that's a review finding.

## Review beyond the trace

Mapping each criterion to a spec ID is the first pass. Then teach the checks in
Phase 4 of the lab:

1. Run the suite.
2. Check the diff for test or `package.json` changes.
3. Name a test for each specification ID.
4. Break a rule on purpose and watch its test fail. This shows the test can catch
   the bug.
5. Read the responses against the spec.

Don't approve a change with a serious issue because time ran out.

## Reference assets

- `lab/solution/capstone-project/`: the creation endpoint and tests.
- `lab/solution/reference-handoff.md`: the issue-to-handoff record.
- `lab/starter/capstone-handoff.md`: the learner template.

## Common questions

**Should learners add the other Bookmark endpoints?** No. Note them as deferred scope.

**What if Copilot access fails?** Write the issue and the prompt anyway. Review the
reference patch with the five checks.

**What if the tests can't run?** Record the command and the failure. Don't approve
without test results.
