# Session 12 — Agent Skills and Repository Guidance

## Trainer content guide

Use Enterprise Cloud as the governance baseline. Store skills in `.github/skills/` and review them through the repository process. Verify current official GitHub documentation and customer policy before demonstrating loading or activation. Focus on the reviewed procedure because surface behavior can change.

If live access is unavailable, learners create the artifact, apply it as a manual checklist in the repository sandbox, and record the same acceptance evidence.

**Preflight**

- Open `lab/starter/skills-project/src/api/routes.js`, its adjacent tests, and `lab/starter/community-skills-catalog.md`.
- Confirm the repository sandbox, data boundary, reviewer, meter, and manual fallback.
- Verify loading behavior only when the customer has approved the surface.

## One-hour plan

| Time | Topic | Learner evidence |
| --- | --- | --- |
| 0:00–0:10 | Preflight | Sandbox, policy, reviewer, meter, fallback |
| 0:10–0:20 | Anatomy and trigger | Bounded `SKILL.md` |
| 0:20–0:35 | Build | API-design skill under `.github/skills/` |
| 0:35–0:45 | Apply and review | Checklist result and peer decision |
| 0:45–0:53 | Community candidate | Accept, revise, or reject rationale |
| 0:53–1:00 | Composition and lab | Ownership map and handoff |

At 0:44, stop activation troubleshooting and finish the exercise manually.

## Skill anatomy

A skill captures a recurring repository procedure. Keep supporting files small and inspectable.

```markdown
# API Design

## When to use
Use when creating or changing REST routes under `src/api/`.
Do not use for deployment, UI, or unrelated refactoring.

## Preconditions
- The issue names one endpoint behavior.
- Existing route and test conventions have been read.
- A human reviewer is assigned.

## Procedure
1. Map acceptance criteria to success and failure evidence.
2. Read the route and adjacent tests.
3. Preserve response and error shapes.
4. Validate input at the boundary.
5. Make the smallest code and focused-test change.

## Validation
Run the repository’s verified focused test command and request review.

## Fallback
Follow this procedure as a human checklist and record the same evidence.
```

The trigger controls when the skill applies. Give learners two matching tasks, two non-matching tasks, and one ambiguous task that requires human clarification.

## Build and apply the skill

Use `lab/starter/skills-project/src/api/routes.js` and create:

```text
.github/skills/api-design/SKILL.md
```

Check that the skill has a bounded trigger, data and permission limits, an ordered procedure, explicit validation, a fallback, and an owner. Apply it manually to the bounded route-review task. Record missing evidence instead of inventing repository conventions or unverified commands.

If an approved surface is available, run the same task without edits and compare it to the manual checklist. The comparison should measure scope, acceptance coverage, and validation evidence.

For the prepared walkthrough, give learners this task:

```text
Review the proposed `GET /api/tasks/:id` route with the API-design skill.
Check identifier handling, the existing not-found response shape, and focused tests.
Do not edit files, add dependencies, or invent a repository convention.
Stop if the convention is unclear.
```

Learners should produce a checked procedure, the acceptance gaps they found, a `pass`, `fail`, or `not executed` validation status, and a peer decision. At 0:44, stop activation troubleshooting and complete this review manually.

## Community review and composition

Use `lab/starter/community-skills-catalog.md`. Before adapting a candidate, inspect its source, owner, license, version, instructions, scripts, dependencies, network use, data flow, repository fit, and retirement trigger. Never execute an unfamiliar script just to see what it does.

Choose the smallest design:

| Need | Use |
| --- | --- |
| Repository convention | Instructions |
| Repeated procedure | Skill |
| Bounded specialist role | Custom agent |
| Approved external capability | MCP |
| Shared interactive artifact | Canvas |
| Distributed set of customizations | Plugin |

Each added layer needs an owner, permission boundary, evidence, and fallback.

## Lab handoff

Learners create the API-design and development-workflow skills, evaluate one repository-sandbox candidate, apply a checklist manually, and review the static integrated-workflow samples. Tool configuration stays static until policy approves it. The deliverable is reviewable skill files, peer-review evidence, an applied manual checklist, and an approve, revise, or pause decision.

## Likely questions

**Is a skill executable code?** Treat it as a repository procedure. Review any supporting scripts, dependencies, and network use separately.

**Can we use a community skill as-is?** Review its source, owner, license, version, instructions, and data flow before adapting it.

**What if the surface does not load the skill?** Finish the same procedure as a manual checklist and record that live behavior was unverified.
