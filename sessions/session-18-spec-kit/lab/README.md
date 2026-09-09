# Session 18 Lab — Specification-Driven Feature Handoff

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–12 and 17
**Deliverable:** An implementation-ready, governed feature handoff

## Lab overview

Turn a feature request into a handoff that an engineer or approved agent can implement. Each later artifact should trace to the constitution, specification, clarifications, and acceptance criteria.

| Exercise | Work | Time |
| --- | --- | --- |
| 1 | Specify a User API | 35 min |
| 2 | Practice the nine-phase flow | 40 min |
| 3 | Review governance and fallback | 25 min |
| 4 | Review the handoff | 20 min |

## Preflight and fallback

Before starting, confirm the approved Spec Kit source and pinned version, Enterprise Cloud access, repository permissions, allowed Copilot features, data boundary, usage stop guard, and final reviewer. Choose the tool path or prepared-artifact fallback.

The approved tool path can use:

```bash
uv tool install 'specify-cli==0.8.5'
specify init <project> --integration copilot --integration-options="--skills"
```

Do not use an unapproved package source, blocked network route, or unbounded request. If the path is unavailable, write the same artifacts in Markdown. Use peer review instead of `specify check`.

| Starter file | Use |
| --- | --- |
| `exercise-1/problem-statement.md` | User API source requirements |
| `exercise-1/.specify.yml` | Visible configuration skeleton |
| `exercise-2/feature-request.md` | Favorites feature request |
| `exercise-3/setup.sh` | Static setup-risk review |

## Exercise 1: Specification first for a User API (35 min)

Read `exercise-1/README.md` and `problem-statement.md`. Write a short constitution before defining endpoint details:

- outcome: standardized User API;
- non-goals: authentication, deletion, roles, and an external database;
- constraints: valid and unique email, name length, ISO timestamps;
- owners: implementer, reviewer, and policy/data owner.

If approved, initialize a specification workspace. Otherwise use manual Markdown. Write observable criteria, for example:

```text
Given an invalid email, POST /users returns HTTP 400 and creates no user.
Given an existing email, POST /users returns HTTP 409.
Given limit=20&offset=0, GET /users returns users, total, limit, and offset.
```

Resolve or defer duplicate emails, invalid UUIDs, empty partial updates, maximum limits, timestamp updates, and response consistency. Build ordered tasks for storage and model work, validation, endpoints, focused tests, and convergence review. Run `specify check` only when it is available and approved.

## Exercise 2: Nine-phase feature flow (40 min)

Read `exercise-2/README.md` and `feature-request.md`. Work through these phases:

1. **Constitution:** purpose, non-goals, constraints, and owners.
2. **Specify:** endpoints, payloads, status codes, response shape, and data relationships.
3. **Clarify:** self-favorites, missing targets, deletion behavior, lab authentication, and the 1,000-favorites performance check.
4. **Plan:** schema or data structure, routes, validation, tests, and performance check.
5. **Checklist:** duplicates, authorization, missing users, unfavorite behavior, list performance, and no N+1 query behavior.
6. **Tasks:** independent, ordered work with files and tests.
7. **Analyze:** remove or defer work that policy or time rules out.
8. **Implement:** produce code only when implementation is approved; otherwise produce the handoff.
9. **Converge:** compare implementation, tests, and documentation with the specification.

Keep notifications, mutual favorites, groups, and analytics out of version 1. Remove any of them that an assistant adds to the handoff.

## Exercise 3: Governance and fallback readiness (25 min)

Read `exercise-3/README.md` and inspect `setup.sh`. Do not run an unapproved command. Record:

- the approved source and exact pinned version;
- reproducibility evidence, including the required lock-file step;
- manual workflow when the tool, network, or assistant is unavailable;
- content that must not enter assistant context;
- fallback owner, review gate, and recheck date.

The manual route must still include the constitution, specification, plan, checklist, tasks, and convergence review.

## Exercise 4: Handoff review and convergence (20 min)

Choose the User API or favorites feature. Assemble the problem statement, constitution summary, accepted specification, clarifications and deferrals, plan, tasks, required checks, policy and data constraints, reviewer, and pause path.

Review each task against the source requirements. Each criterion must be passed, deferred, or returned for changes with evidence. Ask a peer to find hidden assumptions and missing tests.

## Final deliverable

1. Constitution and specification with observable criteria.
2. Clarification log and explicit deferrals.
3. Ordered plan, tasks, and required checks.
4. Governance notes: tool path or fallback, pinned version decision, data boundary, stop guard, reviewer, and pause path.
5. A convergence review that maps each task to a requirement.

## Verification

- [ ] The selected path and fallback are documented.
- [ ] The source request, constitution, specification, and tasks trace to each other.
- [ ] Acceptance criteria can be checked through requests, responses, tests, or manual evidence.
- [ ] Scope additions are removed or deferred.
- [ ] A peer reviewed the final handoff.
