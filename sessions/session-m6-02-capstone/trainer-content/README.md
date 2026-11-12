# Session M6-02 trainer guide: End-to-end capstone for one endpoint

## Goal

Guide learners through one reviewed `POST /api/bookmarks` change with GitHub Copilot.
Scope decisions live in the accepted GitHub issue, and the Session M5-02
specification standards apply. Don't let the exercise grow into a full API,
deployment, or tool tour.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | Define the one-slice capstone |
| 0:08 to 0:18 | Set the issue boundary |
| 0:18 to 0:30 | Inspect and tighten the specification |
| 0:30 to 0:40 | Write the implementation issue |
| 0:40 to 0:50 | Walk through the patch and tests |
| 0:50 to 1:00 | Make the review decision and hand off |

## Teach the boundary

The required slice is `POST /api/bookmarks`. Learners use GitHub Copilot to
implement it, run the tests, and review the result with a person. **Unfinished work
isn't capstone completion.**

Write these non-goals where everyone can see them:

- no authentication;
- no persistent storage;
- no list, read, update, or delete endpoint;
- no deployment or CI redesign;
- no new dependency.

Learners put every scope decision in the accepted GitHub issue. They stop if the
work needs another endpoint, live data, deployment, tool configuration, or a new
dependency.

## Apply Session M5-02

Use `lab/starter/bookmark-create-spec.md` as the source for accepted behavior.
Learners check that each requirement is observable, technology choices stay in the
constraints section, and non-goals are named. They map each issue criterion to a
specification ID and a test.

The issue names the exact route, response shapes, validation rules, duplicate
behavior, expected files, required tests, reviewer, and stop conditions. It adds no
behavior missing from the specification.

## Implementation walkthrough

Use this work order:

```text
Implement only the accepted POST /api/bookmarks issue in the training sandbox.
Use synthetic data and the existing dependencies. Before editing, name the expected
files and map each change to a requirement. Run npm test. Stop if the work requires
another endpoint, live data, deployment, tool configuration, or a new dependency.
Report changed files, test results, deviations, and deferred scope for review.
```

After 30 minutes, check whether learners can finish in the segment. If blocked,
they record the blocker and a request-changes or pause decision in the handoff.

## Review gate

1. Specification and acceptance criteria.
2. Scope and deferrals.
3. Validation, response shape, duplicate handling, and tests.
4. Deviations from the accepted issue.
5. Next action and its owner.

Record one decision: approve, request changes, or pause. **Don't approve a change
with a serious issue because time ran out.**

## Reference assets

- `lab/solution/capstone-project/`: the creation endpoint and tests.
- `lab/solution/reference-handoff.md`: the full issue-to-handoff record.
- `lab/starter/capstone-handoff.md`: the learner template.
- `lab/starter/trainer-delivery-plan-template.md`: optional trainer reflection, not a learner deliverable.

## Common questions

**Should learners add the other Bookmark endpoints?** No. Record them under deferred scope.

**What if agent access fails?** A patch plan isn't capstone completion.

**What if the tests can't run?** Record the command, the failure, findings from
inspection, and the next action. Don't approve without executable test results.
