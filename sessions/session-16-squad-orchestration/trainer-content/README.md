# Session 16 — Brady's Squad — AI Team Orchestration

**Module:** 5 — Advanced Topics & Capstone

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–07 and 09–12

**Duration:** 1 hour trainer content + 2 hours lab
**Last updated:** April 2026

## Delivery goal

Squad is an optional open-source example: [`bradygaster/squad`](https://github.com/bradygaster/squad). Use it to teach coordination, bounded roles, shared decisions, and review. Verify current availability, requirements, and customer approval before any live demonstration.

Learners learn when a team of agents helps, how to define ownership that prevents conflicting changes, and how to fall back to a manual workflow when the tool path is unavailable.

## One-hour plan

| Time | Segment | Outcome |
| --- | --- | --- |
| 0:00–0:07 | Why coordinate agents | Learners can name the added cost and benefit of orchestration. |
| 0:07–0:17 | Roles and routing | Learners can define a coordinator, bounded agents, and a reviewer. |
| 0:17–0:27 | Shared memory | Learners can separate durable decisions from temporary work. |
| 0:27–0:35 | Work monitoring and issues | Learners can map an issue to assignment, review, and closure. |
| 0:35–0:47 | Prepared demo | Initialize or inspect a small team and assign one bounded issue. |
| 0:47–0:55 | Decision framework | Learners select individual, team, or manual delivery. |
| 0:55–1:00 | Lab handoff | Confirm the approved path and fallback. |

The original guide budgeted 85 minutes. This version keeps the architectural content and the demonstration within the stated hour.

## Prepare

- Confirm the approved tool path, permitted repositories, budget threshold, and stop condition.
- If the live path is approved, verify Node.js 20 or later, the required CLI, GitHub authentication, and the current installation instructions.
- Prepare a small repository with several safe, independent issues. Label only the issues used in the demo.
- Have an exported `.squad/` example or recording ready. Do not rely on a live network response.
- Use synthetic or customer-approved data only.

## 1. Why coordinate agents (0:00–0:07)

An individual agent works well for a bounded task. A team becomes useful when work has clear boundaries, several specialties, and a shared decision that must outlive the current conversation.

Coordination adds state and review work. It also costs more, and mistakes take time to recover from. The tool does not remove the engineering lead. Someone still owns scope and the final decision.

Use this contrast:

| Individual agent | Coordinated team |
| --- | --- |
| One focused change | Several independent work items |
| Context stays in one conversation | Decisions and assignments must be shared |
| Human routes the work | A coordinator can route approved work |
| Low overhead | Extra review and state-management cost |

Avoid calling a team for a typo or a one-file repair. It is slower and harder to review.

## 2. Roles and routing (0:07–0:17)

The coordinator receives a work request, chooses the relevant role, and gathers the result. It should not silently turn an ambiguous request into a broad implementation effort.

| Role | Owns |
| --- | --- |
| Lead | Scope, technical decisions, and review gate |
| Frontend or backend implementer | A bounded part of the product |
| Tester | Test plan, focused checks, and reported gaps |
| Scribe or decision owner | Durable decisions and change history |
| Work monitor | Triage of approved, ready work |

Charters should state the role's responsibilities, inputs, outputs, and boundaries. Assign file ownership or dependency order before running tasks in parallel. Two agents editing the same route or dependency manifest is a coordination failure waiting to happen.

Use an issue as the work contract. It needs acceptance criteria, non-goals, constraints, required tests, and a reviewer. The coordinator can then choose a single agent, fan out read-only research, or defer the work.

## 3. Durable memory (0:17–0:27)

Keep shared state small and useful. A committed decision log answers questions that should not be rediscovered every session: chosen architecture, rejected option, owner, evidence, and date.

Personal history can record role-specific lessons. Temporary inboxes, drafts, and task output do not belong in the decision record.

The “drop-box” pattern prevents conflicting writes:

1. Each agent writes its proposal or result to its own location.
2. The lead or scribe reviews the proposals.
3. One owner updates the shared decision record.
4. Git history provides the audit trail.

This is less magical than a shared brain. It is also more reliable.

## 4. Ralph, issues, and review (0:27–0:35)

Treat Ralph as a work monitor. It can inspect ready issues, select work that meets its rules, and surface the result for review. A human still approves delivery. Confirm its current behavior before teaching implementation details.

Use this lifecycle:

```text
Issue with acceptance criteria → assignment → bounded change →
focused checks → human review → merge or follow-up issue
```

Set clear stop conditions: missing policy approval, unclear ownership, a meter threshold, a failing test, an unexpected dependency, or a task that expands beyond its issue. The manual fallback is a human triage and review of the same issues.

## 5. Prepared demonstration (0:35–0:47)

Use a small project and one narrow issue, such as input validation or a focused API endpoint.

1. Show the issue, its non-goals, and its reviewer.
2. Initialize the approved tool path or open the prepared `.squad/` example.
3. Inspect the team roster, routing rules, and one charter.
4. Assign the issue to one role. Explain why no other role needs to edit the same files.
5. Show where the proposal, test evidence, and decision are recorded.
6. Review the result against the issue. Decide whether to approve, request changes, or stop.

If the tool is unavailable, do not improvise commands. Walk through the prepared files and use the manual assignment and review process.

Use one bounded work order:

```text
Assign the approved input-validation issue to one role.
Do not edit files outside the issue, add dependencies, or start parallel implementation.
Record the proposal, focused-check evidence, and a lead review decision.
Stop if ownership or the data boundary is unclear.
```

Learners should see one charter, one assignment, a proposal or result in its own location, focused-check evidence, and the lead's decision. At 0:43, switch to the exported `.squad/` example or tabletop process if the live path has not produced that evidence.

## 6. When a team helps (0:47–0:55)

Choose the lightest path that can produce a reviewable result.

| Situation | Recommended path |
| --- | --- |
| One small, well-understood change | Individual agent or manual work |
| Separate frontend, backend, and test work with explicit interfaces | Coordinated team |
| Ambiguous architecture or overlapping file ownership | Plan first; do not fan out implementation |
| Restricted access, unclear data boundary, or unapproved tool | Manual workflow with prepared artifacts |
| Repeated operational work with stable acceptance checks | A monitored team may be useful |

Success is a smaller queue of clear, reviewed changes. It is not the largest possible number of agents.

## Lab handoff (0:55–1:00)

Point learners to `lab/README.md`. The lab covers team initialization, assignments, GitHub Issues, and a monitored work loop. Require them to choose the approved path first. The no-access route uses the same issue contracts, role boundaries, and review evidence.

## Common questions

**Does Squad replace GitHub Copilot?** No. Treat it as a coordination layer that can use Copilot-powered agents, subject to current tool support and policy.

**How do we control cost?** Set a customer-owned meter, limit the number of active tasks, require acceptance criteria, and stop at the defined threshold.

**What happens when two agents disagree?** The designated decision owner resolves it with evidence. Do not merge competing changes by accident.
