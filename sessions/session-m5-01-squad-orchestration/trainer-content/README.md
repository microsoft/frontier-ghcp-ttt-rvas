# Session m5-01 trainer guide: Brady's Squad

**Module:** 5: Specification-Driven Frameworks

**Difficulty:** Advanced

**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04 and m3-02 to m3-05

**Duration:** 1 hour trainer content + 2 hours lab
**Last updated:** April 2026

## Delivery goal

Squad is an optional open-source example:
[`bradygaster/squad`](https://github.com/bradygaster/squad). Use it to teach
coordination, role limits, shared decisions, and review. Before a live
demonstration, check current availability, requirements, and customer approval.

Show learners how to decide whether a task needs an agent team and assign owners
without conflicting changes. Explain the manual workflow for when the tool is
unavailable.

## One-hour plan

| Time | Segment | Outcome |
| --- | --- | --- |
| 0:00 to 0:07 | Why coordinate agents | Learners can name the added cost and benefit of orchestration. |
| 0:07 to 0:17 | Roles and routing | Learners can define a coordinator, agent limits, and a reviewer. |
| 0:17 to 0:27 | Shared memory | Learners can separate committed decisions from temporary work. |
| 0:27 to 0:35 | Work monitoring and issues | Learners can map an issue to assignment, review, and closure. |
| 0:35 to 0:47 | Prepared demo | Initialize or inspect a small team and assign Issue 001. |
| 0:47 to 0:55 | Decision framework | Learners select individual or team delivery. |
| 0:55 to 1:00 | Lab handoff | Check tool approval and required access. |

The original guide budgeted 85 minutes. This version fits the architecture and
demonstration into one hour.

## Prepare

- Check tool approval, permitted repositories, budget threshold, and stop condition.
- If tool use is approved, check Node.js 20 or later, the required CLI, GitHub authentication, and the current installation instructions.
- Prepare a small repository with several safe, independent issues. Label only the issues used in the demo.
- Have an exported `.squad/` example or recording ready. Do not rely on a live network response.
- Use synthetic or customer-approved data only.

## 1. Why coordinate agents (0:00 to 0:07)

Start with a task one agent can finish within a defined scope. Contrast it with
work that needs several specialties and shared decisions beyond the current
conversation. A team needs clear boundaries between those tasks.

Coordination adds state and review work. It also costs more, and mistakes take time to recover from. The tool does not remove the engineering lead. Someone still owns scope and the final decision.

Use this contrast:

| Individual agent | Coordinated team |
| --- | --- |
| One focused change | Several independent work items |
| Context stays in one conversation | Decisions and assignments must be shared |
| Human routes the work | A coordinator can route approved work |
| Low overhead | Extra review and state-management cost |

Avoid calling a team for a typo or a one-file repair. It is slower and harder to review.

## 2. Roles and routing (0:07 to 0:17)

The coordinator receives a work request, chooses the relevant role, and gathers the result. It should not silently turn an ambiguous request into a broad implementation effort.

| Role | Owns |
| --- | --- |
| Lead | Scope, technical decisions, and review gate |
| Frontend or backend implementer | A defined part of the product |
| Tester | Test plan, focused checks, and reported gaps |
| Scribe or decision owner | Committed decisions and change history |
| Work monitor | Triage of approved, ready work |

Charters should state the role's responsibilities, inputs, outputs, and boundaries. Assign file ownership or dependency order before running tasks in parallel. Two agents editing the same route or dependency manifest is a coordination failure waiting to happen.

Use an issue as the work contract. It needs acceptance criteria, non-goals, constraints, required tests, and a reviewer. The coordinator can then choose a single agent, fan out read-only research, or defer the work.

## 3. Saved team decisions (0:17 to 0:27)

Show what belongs in a committed decision log: the chosen architecture, rejected
option, owner, supporting results, and date. These are decisions the team should
not have to rediscover in every session.

Personal history can record role-specific lessons. Temporary inboxes, drafts, and task output do not belong in the decision record.

The "drop-box" pattern prevents conflicting writes:

1. Each agent writes its proposal or result to its own location.
2. The lead or scribe reviews the proposals.
3. One owner updates the shared decision record.
4. Git history provides the audit trail.

## 4. Ralph, issues, and review (0:27 to 0:35)

Treat Ralph as a work monitor. It can inspect ready issues, select work that meets its rules, and surface the result for review. A human still approves delivery. Check its current behavior before teaching implementation details.

Use this lifecycle:

```text
Issue with acceptance criteria → assignment → bounded change →
focused checks → human review → merge or follow-up issue
```

Set clear stop conditions: missing policy approval, unclear ownership, a meter
threshold, a failing test, an unexpected dependency, or a task that expands beyond
its issue.

## 5. Prepared demonstration (0:35 to 0:47)

Use Issue 001, **Add input validation to `POST /api/users`**, from
`lab/starter/sample-issues.md`. Keep this issue on screen for the full
demonstration.

1. **0:35 to 0:37: Read the contract.** Point to the acceptance criteria, non-goals,
   permitted files, required tests, and reviewer.
2. **0:37 to 0:39: Show the team.** Open the reference `.squad/team.md`,
   `.squad/routing.md`, and the backend charter. Explain why the backend role owns
   the implementation while the tester returns test results without editing source.
3. **0:39 to 0:41: Assign the issue.** Open
   `.squad/decisions/inbox/issue-001-proposal.md` and
   `.squad/orchestration-log/issue-001.md`. The assignment must preserve the issue
   limits.
4. **0:41 to 0:44: Inspect implementation and tests.** Compare the starter and
   solution versions of `src/routes/api.js` and `tests/api.test.js`. Run `npm test`
   from the prepared solution.
5. **0:44 to 0:46: Review the result.** Open
   `.squad/reviews/issue-001-review.md`. Check each acceptance criterion against
   code and test results.
6. **0:46 to 0:47: Record the decision.** Open `.squad/decisions.md`. Show the
   approved decision, supporting results, owner, and date.

If the tool is unavailable during the trainer demonstration, walk through the
prepared files. Fix access before the learner lab.

Use one work order with clear limits:

```text
Assign the approved input-validation issue to one role.
Do not edit files outside the issue, add dependencies, or start parallel implementation.
Record the proposal, focused-check evidence, and a lead review decision.
Stop if ownership or the data boundary is unclear.
```

Make the review trail visible: one charter and assignment, the change within the
issue scope, focused test results, and the lead's decision. At 0:41, switch to the
reference `.squad/` example if the live path has not produced the assignment.
At 0:44, switch to the
tabletop packet if implementation or tests are still blocked.

## 6. When a team helps (0:47 to 0:55)

Choose the lightest path that can produce a reviewable result.

| Situation | Recommended path |
| --- | --- |
| One small, well-understood change | Individual agent or manual work |
| Separate frontend, backend, and test work with defined interfaces | Coordinated team |
| Ambiguous architecture or overlapping file ownership | Plan first; do not fan out implementation |
| Restricted access, unclear data boundary, or unapproved tool | Manual workflow with prepared artifacts |
| Repeated operational work with stable acceptance checks | A monitored team may be useful |

Success means a smaller queue of clear, reviewed changes. Agent count does not
measure success.

## Lab handoff (0:55 to 1:00)

Point learners to `lab/README.md`.

1. Learners run the starter tests.
2. They check Squad access.
3. They carry Issue 001 through assignment, implementation, tests, and review.
4. They compare their packet with `lab/solution/squad-project/`.

State the deliverable aloud: **one reviewed issue with a matching committed decision
record**.

## Common questions

**Does Squad replace GitHub Copilot?** No. Treat it as a coordination layer that can use Copilot-powered agents, subject to current tool support and policy.

**How do we control cost?** Set a customer-owned meter, limit the number of active tasks, require acceptance criteria, and stop at the defined threshold.

**What happens when two agents disagree?** The designated decision owner uses the test results and review findings to resolve it. Do not merge competing changes by accident.
