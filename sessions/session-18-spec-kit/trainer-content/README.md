# Session 18 Trainer Guide — Spec Kit

## Delivery objective

Show how to turn a bounded request into a reviewable handoff before implementation. The method matters more than the tool. Because Spec Kit is pre-1.0, verify the customer-approved source, pinned version, integration, network path, and fallback before installing it.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:08 | Why specify before implementation |
| 0:08–0:20 | Constitution and observable specification |
| 0:20–0:32 | Clarifications, plan, and checklist |
| 0:32–0:43 | Tasks, analysis, and implementation handoff |
| 0:43–0:52 | Delivery controls and manual fallback |
| 0:52–0:58 | Prepared convergence demo |
| 0:58–1:00 | Lab handoff |

## Facilitation

Use a small feature, such as archiving a task. Start with the constitution: outcome, non-goals, constraints, and owners. Then write observable acceptance criteria before implementation details.

**Preflight**

- Open the fictional archive-task artifacts. Place the constitution, specification, plan, tasks, and handoff side by side.
- Confirm the approved package source, pinned version, integration, network path, usage guard, and fallback.
- Keep the manual traceability cards ready. Do not install an unapproved package.

Move through the flow deliberately:

```text
constitution → specify → clarify → plan → checklist → tasks →
analyze → implement → converge
```

Turn clarifications into accepted decisions or explicit deferrals. The plan identifies implementation units and dependencies. Tasks identify files, expected results, and checks. Analysis removes work without a source requirement or outside the approved path.

The handoff states the goal, scope, constraints, done conditions, tests, reviewer, data boundary, and pause path. An approved implementation can start from this record. Otherwise, it still records the decisions made.

## Delivery controls

Show the approved path only after preflight. Use synthetic requirements in a training repository. Set a customer-owned usage guard. If installation, network access, or Copilot integration is unavailable, learners write the same Markdown artifacts and use peer convergence review instead of `specify check`.

## Prepared demo

Use the archive-task artifacts and, if an approved assistant is available, enter:

```text
Review only the supplied archive-task artifacts.
Map each acceptance criterion to its task and test. List any task with no
requirement and any requirement with no evidence. Do not invent product, policy,
authorization, or data decisions. Stop if a checklist item is unresolved.
```

Show one clarification, remove one out-of-scope task, and trace the final handoff. Learners should produce a criterion-to-task-to-test map, an explicit deferral for each unresolved question, and a `converged`, `revise`, or `pause` decision. At 0:55, stop using tools and finish the traceability review with the manual cards.

## Common questions

**Why not ask an agent to build it immediately?** A specification exposes missing decisions while they are still cheap to change.

**Can the tool define the process?** No. The team owns the process and reviews its outputs.

**What if the package is not approved?** Use the manual path and record the missing approval.
