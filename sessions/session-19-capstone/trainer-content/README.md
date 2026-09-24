# Session 19 Trainer Guide: Bounded End-to-End Capstone

## Delivery objective

The capstone ends with one reviewed `POST /api/bookmarks` change or patch plan. The
learner must use a Session 17 governance record and Session 18 specification
standards. Do not let the exercise expand into a full API, deployment, or tool tour.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:08 | Define the one-slice capstone |
| 0:08–0:18 | Apply the governance gate |
| 0:18–0:30 | Inspect and tighten the specification |
| 0:30–0:40 | Write the implementation issue |
| 0:40–0:50 | Walk through the patch and tests |
| 0:50–1:00 | Make the review decision and hand off |

## Teach the boundary

The required slice is `POST /api/bookmarks`. Learners may implement it with an
approved agent or manually. They may also produce a patch plan when execution is
blocked. All paths use the same issue, checks, review gate, and handoff.

Write these non-goals where everyone can see them:

- no authentication;
- no persistent storage;
- no list, read, update, or delete endpoint;
- no deployment or CI redesign;
- no new dependency.

## Apply Session 17

Have learners complete `lab/starter/governance-record.md` before they write code.
Check the repository boundary, synthetic-data rule, allowed tools, dependency rule,
meter, stop condition, reviewer, and fallback. An unknown owner or tool approval is
a stop signal.

Do not accept "policy approved" without details. Ask who approved what, which
evidence they used, and when work must stop.

## Apply Session 18

Use `lab/starter/bookmark-create-spec.md` as the accepted behavior source. Ask
learners to check that each requirement is observable, technology choices stay in
the constraints section, and non-goals are explicit. They must map each issue
criterion to a specification ID and a test.

The issue should name the exact route, response shapes, validation rules, duplicate
behavior, expected files, required tests, reviewer, and stop conditions. It must not
invent behavior absent from the specification.

## Implementation walkthrough

Use this work order with the selected approved path:

```text
Implement only the accepted POST /api/bookmarks issue in the training sandbox.
Use synthetic data and the existing dependencies. Before editing, name the expected
files and map each change to a requirement. Run npm test. Stop if the work needs a
new dependency, another endpoint, sensitive data, or a file outside the plan. Report
changed files, test results, deferred scope, and unresolved evidence for review.
```

After 30 minutes of implementation, move unfinished work to a patch plan. The
learner still reviews tests by inspection and completes the decision and handoff.

## Review gate

Review in this order:

1. Specification and acceptance criteria.
2. Scope and deferrals.
3. Validation, response shape, duplicate handling, and tests.
4. Governance record and stop conditions.
5. Handoff owner and next action.

Record one decision: approve, request changes, or pause. **Do not approve a serious
issue because time ran out.**

## Reference assets

- `lab/solution/capstone-project/` contains the bounded implementation and tests.
- `lab/solution/reference-handoff.md` shows the full issue-to-handoff record.
- `lab/starter/capstone-handoff.md` is the learner template.

## Common questions

**Should learners add the other Bookmark endpoints?** No. Record them under deferred
scope.

**What if agent access fails?** Use the manual path or write the patch plan. Keep
the same tests and review gate.

**What if the tests cannot run?** Record the command, failure, static evidence, and
owner for the next action. The decision cannot be approve without executable proof.
