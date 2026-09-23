# Track: Product and Delivery Teams

**Target Audience:** Product Managers, Product Owners, Business Analysts, Project Managers, delivery leads, and other non-developer roles  
**Duration:** 15 hours (5 sessions × 3 hrs)  
**Difficulty:** Beginner → Intermediate  
**Recommended Delivery:** 2–3 days

---

## Description

This track teaches product and delivery teams how to work with Copilot without asking them to become developers. Learners question technical evidence, interview unclear ideas, steer visible work, supervise parallel agent sessions, and decide whether an automated result is safe to accept.

The sessions use one fictional Service Request Portal scenario. Learners can replace it with sanitized work from their own team.

## Prerequisites

- **A GitHub account with GitHub Copilot access**
- Browser access to the training repository
- The GitHub Copilot app for canvas and orchestration exercises
- Basic knowledge of the learner's product or delivery process

Programming experience, Git command-line knowledge, and repository administration are not required.

**GitHub Copilot access is required for Sessions 20–24.** Learners without access
should not take this track. Stop and reschedule their training after access is
available.

## Optional Azure Boards route

Azure Boards is an optional platform route for this track. **Use it to teach the Module 7 outcomes, not the product.** The route keeps the work-item context in Azure Boards while learners practice interviewing, bounded delegation, review, and approval.

Trainers can seed the synthetic Service Request Portal backlog with [`../scripts/azure-boards/seed.py`](../scripts/azure-boards/seed.py), check it with [`verify.py`](../scripts/azure-boards/verify.py), and clean it up with [`reset.py`](../scripts/azure-boards/reset.py).

```bash
python scripts/azure-boards/seed.py \
  --organization https://dev.azure.com/ORG \
  --project PROJECT \
  --team TEAM \
  --process Scrum \
  --area-path 'PROJECT\AREA' \
  --current-iteration 'PROJECT\ITERATION_CURRENT' \
  --future-iteration 'PROJECT\ITERATION_FUTURE' \
  --state-file .azure-boards-seed-state.json \
  --yes

python scripts/azure-boards/verify.py \
  --organization https://dev.azure.com/ORG \
  --project PROJECT \
  --state-file .azure-boards-seed-state.json

python scripts/azure-boards/reset.py \
  --organization https://dev.azure.com/ORG \
  --project PROJECT \
  --state-file .azure-boards-seed-state.json \
  --dry-run

python scripts/azure-boards/reset.py \
  --organization https://dev.azure.com/ORG \
  --project PROJECT \
  --state-file .azure-boards-seed-state.json \
  --yes
```

Pass the real values only at the command line. Do not add accounts, credentials, tokens, or live work data to this repository.

The tools support Agile and Scrum. They stop with a clear error for Basic, CMMI, or custom processes. They also check that the project, team, area path, and both iteration paths already exist and match the command. **They verify project-level configuration. They do not create it.**

Reset reads the local state file, checks every recorded ID for the matching seed tag, and moves only those items to the recycle bin. It never asks Azure Boards to destroy an item permanently. Run the dry run first.

Use the optional [Session 21 companion](../sessions/session-21-interview-and-shape-work/lab/azure-boards/README.md) to shape a seeded requirement. Use the [Session 23 companion](../sessions/session-23-orchestrate-workstreams/lab/azure-boards/README.md) to supervise seeded workstreams. **Both companions still require GitHub Copilot.**

Direct work-item delegation in Session 23 requires a linked GitHub repository and an environment that supports the approved delegation flow.

## What learners should bring

- One unclear initiative or feature request
- Five to ten sanitized backlog items
- One recent status report, release update, or sprint summary
- One recurring workflow they may want an agent to support
- Their team's definition of ready or done
- One decision that must remain with a named person

The supplied scenario covers every exercise when learners cannot use their own material.

## Sessions

| Order | Session # | Title | Difficulty | Duration |
| --- | --- | --- | --- | --- |
| 1 | 20 | Understand Technical Work Without Reading Code | Beginner | 3 hrs |
| 2 | 21 | Interview Ideas and Shape Better Work | Beginner | 3 hrs |
| 3 | 22 | Plan and Steer Work with Canvases | Intermediate | 3 hrs |
| 4 | 23 | Orchestrate Agents and Workstreams | Intermediate | 3 hrs |
| 5 | 24 | Review Outcomes and Govern Automation | Intermediate | 3 hrs |

## Recommended delivery schedule

### Two-day intensive

| Day | Sessions | Focus |
| --- | --- | --- |
| Day 1 | Sessions 20–22 | Understand work, sharpen the request, and make the plan visible |
| Day 2 | Sessions 23–24 | Supervise parallel work and control what can be accepted |

### Three-day workshop

| Day | Sessions | Focus |
| --- | --- | --- |
| Day 1 | Sessions 20–21 | Evidence and interviewing |
| Day 2 | Session 22 | Planning, risks, and decisions |
| Day 3 | Sessions 23–24 | Orchestration, review, and approval |

## Learning outcomes

By completing this track, learners will be able to:

1. Explain a technical change in product and delivery terms.
2. Separate a generated summary from verified evidence.
3. Interview an unclear request until the team can make the next decision.
4. Turn the interview into a scoped work item with testable acceptance criteria.
5. Use a shared canvas to keep plans, risks, decisions, and evidence visible.
6. Split a parent objective into bounded workstreams and review each result.
7. Define what an agent may do independently and where a person must approve.
8. Create an automation contract with an owner, stop condition, and human-run recovery path.

## Trainer guidance

- Start with the learner's work when it is approved and sanitized.
- Use the supplied scenario when learner data is not approved or sanitized.
- Keep the focus on decisions and evidence. Avoid turning the track into a tour of product screens.
- Verify current official GitHub documentation and organizational policy before every live delivery.
- Treat generated output as a proposal. The accountable person accepts, rejects, or revises it.

## Next steps

- **Enterprise Rollout** adds organization-level policies, analytics, and adoption planning.
- **Agentic Development** teaches technical teams how to build the agents, skills, and integrations used behind these workflows.
- **Full Mastery** prepares trainers to deliver every technical and role-based session.
