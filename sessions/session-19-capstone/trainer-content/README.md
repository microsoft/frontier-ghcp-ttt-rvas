# Session 19 Trainer Guide — Bounded End-to-End Capstone

## Delivery objective

The capstone ends with one reviewed, handoff-ready feature change or plan. It links the Session 17 governance decisions to the Session 18 specification. You do not need a finished application, a deployment, or several agents working in parallel.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:05 | Define success and limits |
| 0:05–0:11 | Run the preflight |
| 0:11–0:18 | Trace governance and specification inputs |
| 0:18–0:27 | Write one implementation-ready issue |
| 0:27–0:33 | Select an approved delivery path |
| 0:33–0:45 | Prepared implementation walkthrough |
| 0:45–0:54 | Review gate |
| 0:54–1:00 | Handover and lab launch |

## Facilitation

Choose one Bookmark API slice, preferably `POST /api/bookmarks`. Include acceptance criteria, non-goals, constraints, required tests, a reviewer, and stop conditions in the issue. Keep authentication, persistent storage, deployment, and unrelated endpoints out of scope.

**Preflight**

- Confirm the approved repository and features, data boundary, allowed dependencies and MCP servers, usage guard, delivery path, and reviewer.
- Open the issue, prepared patch plan, and verified repository checks.
- If a decision is unclear, choose the prepared-artifact or manual path before work begins.

Show one of four paths: approved cloud agent, approved local agent mode, manual implementation, or prepared patch plan. Start from the issue and use this bounded work order:

```text
Implement only the attached `POST /api/bookmarks` issue in the training sandbox.
Use synthetic data, preserve existing response conventions, and add no dependencies.
Before editing, list the expected files. Run only verified checks. Stop if broader
files, tools, data, or requirements are needed. Report changed files, check results,
and unresolved evidence for human review.
```

Learners should capture the expected-file plan, a small change with focused test evidence, or an explicit blocked status. At 0:39, move unfinished live work to the prepared patch plan. Do not merge or deploy.

## Review gate

Review the result in this order:

1. Specification and acceptance criteria.
2. Scope and explicit deferrals.
3. Correctness, validation, tests, error handling, and dependencies.
4. Governance: data, allowed tools, meter, and reviewer.
5. Handover: changed files, evidence, decision, owner, and next action.

Record one decision: approve, request changes, or pause. Do not approve a serious issue because time ran out.

## Manual fallback

If implementation stops, the group produces a patch plan that names files, routes, validation rules, tests, expected responses, risks, and open questions. Review it with the same gate, then hand it to the next owner.

## Common questions

**Demonstrating every session:** Use only the path needed for one bounded delivery.

**When live access fails:** Switch to the prepared patch plan or manual path. Keep the review and handoff.

**When time remains:** Finish the review and handoff. Scope another endpoint as future work.
