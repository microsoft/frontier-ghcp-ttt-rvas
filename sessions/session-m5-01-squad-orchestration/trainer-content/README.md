# Session M5-01 trainer guide: Brady's Squad

**Module:** 5: Specification-Driven Frameworks

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04 and M3-02 to M3-05

**Duration:** 1 hour trainer content + 2 hours lab

## Goal

Squad is an optional open-source example:
[`bradygaster/squad`](https://github.com/bradygaster/squad). Use it to teach
coordination, role limits, shared decisions, and review. Learners decide whether a
task needs an agent team and assign owners without conflicting changes.

## One-hour plan

| Time | Segment | Outcome |
| --- | --- | --- |
| 0:00 to 0:07 | Why coordinate agents | Learners can name the cost and benefit of orchestration. |
| 0:07 to 0:17 | Roles and routing | Learners can define a coordinator, agent limits, and a reviewer. |
| 0:17 to 0:27 | Shared memory | Learners can separate committed decisions from temporary work. |
| 0:27 to 0:35 | Work monitoring and issues | Learners can map an issue to assignment, review, and closure. |
| 0:35 to 0:47 | Prepared demo | Initialize or inspect a small team and assign Issue 001. |
| 0:47 to 0:55 | Decision framework | Learners choose one agent or a team. |
| 0:55 to 1:00 | Lab handoff | Learners start the lab. |

## Prepare

- Install Node.js 20 or later, the Squad CLI, and sign in to GitHub.
- Prepare a small repository with several independent issues. Label only the issues used in the demo.
- Have an exported `.squad/` example or recording ready in case the live run stalls.

## 1. Why coordinate agents (0:00 to 0:07)

Start with a task one agent can finish alone. Contrast it with work that needs
several specialties and shared decisions beyond one conversation.

Coordination adds state, review work, and cost. Someone still owns scope and the
final decision.

| Individual agent | Coordinated team |
| --- | --- |
| One focused change | Several independent work items |
| Context stays in one conversation | Decisions and assignments must be shared |
| Human routes the work | A coordinator routes the work |
| Low overhead | Extra review and state-management cost |

A team for a typo or a one-file repair is slower and harder to review.

## 2. Roles and routing (0:07 to 0:17)

The coordinator receives a request, picks the role, and gathers the result. It
should not turn an ambiguous request into a broad implementation.

| Role | Owns |
| --- | --- |
| Lead | Scope, technical decisions, and review gate |
| Frontend or backend implementer | A defined part of the product |
| Tester | Test plan, focused checks, and reported gaps |
| Scribe or decision owner | Committed decisions and change history |
| Work monitor | Triage of ready work |

A charter states a role's responsibilities, inputs, outputs, and boundaries.
Assign file ownership or dependency order before running tasks in parallel. Two
agents editing the same route or dependency manifest cause conflicts.

Use an issue as the work contract: acceptance criteria, non-goals, constraints,
required tests, and a reviewer. The coordinator then picks a single agent, fans
out read-only research, or defers the work.

## 3. Saved team decisions (0:17 to 0:27)

A committed decision log holds the chosen architecture, the rejected option, the
owner, supporting results, and the date. Personal history can record role-specific
lessons. Inboxes, drafts, and task output stay out.

To avoid conflicting writes:

1. Each agent writes its proposal to its own file.
2. The lead or scribe reviews the proposals.
3. One owner updates the shared decision record.

Git history is the audit trail.

## 4. Ralph, issues, and review (0:27 to 0:35)

Ralph is a work monitor. It inspects ready issues, picks work that meets its
rules, and presents the result for review. A human approves delivery.

```text
Issue with acceptance criteria → assignment → bounded change →
focused checks → human review → merge or follow-up issue
```

Stop when ownership is unclear, a test fails, an unexpected dependency appears, or
the task grows beyond its issue.

## 5. Prepared demonstration (0:35 to 0:47)

Use Issue 001, **Add input validation to `POST /api/users`**, from
`lab/starter/sample-issues.md`. Keep it on screen.

1. **0:35 to 0:37: Read the contract.** Point to the acceptance criteria, non-goals,
   permitted files, required tests, and reviewer.
2. **0:37 to 0:39: Show the team.** Open the reference `.squad/team.md`,
   `.squad/routing.md`, and the backend charter. The backend role owns the
   implementation. The tester returns test results without editing source.
3. **0:39 to 0:41: Assign the issue.** Open
   `.squad/decisions/inbox/issue-001-proposal.md` and
   `.squad/orchestration-log/issue-001.md`. The assignment must keep the issue
   limits.
4. **0:41 to 0:44: Inspect implementation and tests.** Compare the starter and
   solution versions of `src/routes/api.js` and `tests/api.test.js`. Run `npm test`
   from the solution.
5. **0:44 to 0:46: Review the result.** Open
   `.squad/reviews/issue-001-review.md`. Check each acceptance criterion against
   code and test results.
6. **0:46 to 0:47: Record the decision.** Open `.squad/decisions.md`.

Work order for the live run:

```text
Assign the approved input-validation issue to one role.
Do not edit files outside the issue, add dependencies, or start parallel implementation.
Record the proposal, focused-check evidence, and a lead review decision.
Stop if ownership or the data boundary is unclear.
```

If the live run has not produced the assignment by 0:41, switch to the reference
`.squad/` example. If implementation or tests are still blocked at 0:44, switch to
the tabletop packet.

## 6. When a team helps (0:47 to 0:55)

| Situation | Recommended path |
| --- | --- |
| One small, well-understood change | Individual agent or manual work |
| Separate frontend, backend, and test work with defined interfaces | Coordinated team |
| Ambiguous architecture or overlapping file ownership | Plan first; do not fan out implementation |
| No tool access | Manual workflow with prepared artifacts |
| Repeated operational work with stable acceptance checks | A monitored team may help |

Judge the team by the changes it completes and reviews, not its agent count.

## Lab handoff (0:55 to 1:00)

Point learners to `lab/README.md`.

1. Learners run the starter tests.
2. They check Squad access.
3. They carry Issue 001 through assignment, implementation, tests, and review.
4. They compare their packet with `lab/solution/squad-project/`.

The deliverable: **one reviewed issue with a matching committed decision record**.

## Common questions

**Does Squad replace GitHub Copilot?** No. It coordinates Copilot-powered agents.

**How do we control cost?** Limit active tasks, require acceptance criteria, and stop at a set threshold.

**What happens when two agents disagree?** The decision owner resolves it from test results and review findings. Don't merge competing changes by accident.
