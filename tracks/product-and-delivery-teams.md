# Track: Product and Delivery Teams

**Target Audience:** Product Managers, Product Owners, Business Analysts, Project Managers, delivery leads, and other non-developer roles
**Duration:** 18 hours (6 sessions × 3 hrs)
**Difficulty:** Beginner → Intermediate
**Recommended Delivery:** 3 days

---

## Description

This track teaches product and delivery teams to use the GitHub Copilot app as a working environment. Learners create repository briefs, interview unclear ideas, build GitHub issues through MCP, create planning canvases, supervise parallel sessions, and automate one recurring follow-up.

The sessions use one fictional Service Request Portal scenario. Learners can replace it with sanitized work from their own team.

## Prerequisites

- **A GitHub account with GitHub Copilot access**
- Browser access to the training repository
- The GitHub Copilot app
- The approved GitHub MCP server with access to the training repository
- Canvas creation, orchestration, and Automations access
- Basic knowledge of the learner's product or delivery process

Programming experience, Git command-line knowledge, and repository administration are not required.

**GitHub Copilot access is required for Sessions 20–25.** Learners without access
should not take this track. Stop and reschedule their training after access is
available.

## Optional Azure Boards route

Azure Boards is an optional system-of-record route. **GitHub Copilot remains the learning focus.** Learners use Copilot for interviewing, planning, delegation, review, and automation while Azure Boards retains approved backlog state.

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

Use the optional [Session 21 companion](../sessions/session-21-interview-and-shape-work/lab/azure-boards/README.md) to shape a seeded requirement. Use the [Session 24 companion](../sessions/session-24-orchestrate-workstreams/lab/azure-boards/README.md) to supervise seeded workstreams. **Both companions still require GitHub Copilot.**

Direct work-item delegation in Session 24 requires a linked GitHub repository and an environment that supports the approved delegation flow.

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
| 1 | 20 | Work Effectively in the GitHub Copilot App | Beginner | 3 hrs |
| 2 | 21 | Interview Ideas and Shape Better Work | Beginner | 3 hrs |
| 3 | 22 | Plan Work with GitHub Issues and MCP | Intermediate | 3 hrs |
| 4 | 23 | Build and Use a Planning Canvas | Intermediate | 3 hrs |
| 5 | 24 | Orchestrate Agents and Workstreams | Intermediate | 3 hrs |
| 6 | 25 | Automate Delivery Follow-up and Connect Work Systems | Intermediate | 3 hrs |

## Recommended delivery schedule

### Three-day workshop

| Day | Sessions | Focus |
| --- | --- | --- |
| Day 1 | Sessions 20–21 | App fluency, context, and interviewing |
| Day 2 | Sessions 22–23 | GitHub issues, MCP, and planning canvases |
| Day 3 | Sessions 24–25 | Orchestration, automation, and work-system handoff |

## Learning outcomes

By completing this track, learners will be able to:

1. Work confidently in the GitHub Copilot app with repository context.
2. Turn an interview into a reviewed Markdown decision brief.
3. Use GitHub MCP to create and verify an approved issue plan.
4. Create a planning canvas and keep it aligned with GitHub state.
5. Split a parent objective into bounded workstreams and review each result.
6. Run one draft-only Automation with explicit evidence and stop conditions.
7. Decide whether GitHub or Azure Boards remains the authoritative planning system.

## Trainer guidance

- Start with the learner's work when it is approved and sanitized.
- Use the supplied scenario when learner data is not approved or sanitized.
- Teach the product through one continuous delivery workflow. Avoid a disconnected feature tour.
- Verify current official GitHub documentation and organizational policy before every live delivery.
- Treat generated output as a proposal. The accountable person accepts, rejects, or revises it.

## Next steps

- **Enterprise Rollout** adds organization-level policies, analytics, and adoption planning.
- **Agentic Development** teaches technical teams how to build the agents, skills, and integrations used behind these workflows.
- **Full Mastery** prepares trainers to deliver every technical and role-based session.
