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

## Capability setup

Complete this setup before Session 20. Recheck the relevant capability before each
later session because organizational policy can change what the app exposes.

### 1. Open the training project

1. Sign in to the GitHub Copilot app.
2. Add or open the approved training repository under **Projects**.
3. Start an interactive session.
4. Ask Copilot to read one known file from the repository.
5. Stop if it cannot read the approved project.

### 2. Inspect installed customizations

Open **Customize**, then **Installed**. Record the available:

- skills;
- MCP servers;
- plugins;
- canvases.

Use only capabilities approved for the training repository.

### 3. Verify skills

Sessions 23 and 24 use the built-in `/create-canvas` and `/orchestrate` skills.
Type `/` in a session and confirm that both commands appear before those sessions.
They are built-in app skills, so do not install look-alike community skills.

Session 21 supplies a project skill under
`.github/skills/decision-interview/SKILL.md`. After copying it into the training
repository:

1. commit the skill;
2. open a new app session for the project;
3. open **Customize** → **Skills** → **Installed**;
4. confirm that `decision-interview` appears;
5. run `/decision-interview` with a short test request.

Copilot CLI users can verify the same project skill with:

```text
/skills reload
/skills info decision-interview
```

### 4. Verify GitHub MCP

Sessions 22–25 require GitHub repository tools.

In the app:

1. open **Customize** → **MCP** → **Installed**;
2. confirm that the approved GitHub MCP connection is available;
3. start a session and ask Copilot to list the available GitHub tools;
4. test one read against the training repository;
5. do not continue to a write lab until the read succeeds.

GitHub MCP is built into Copilot CLI. CLI users can inspect it with:

```text
/mcp list
/mcp show github
```

If an additional MCP server is required, install it through **Customize** → **MCP**
or `/mcp add` using the organization-approved server definition. Do not paste
personal access tokens into prompts or repository files.

### 5. Verify session-specific capabilities

| Session | Required capability |
| --- | --- |
| 20 | App project and repository reads |
| 21 | Project skill `decision-interview` |
| 22 | GitHub MCP issue reads and writes |
| 23 | Built-in `/create-canvas` and GitHub MCP reads |
| 24 | Built-in `/orchestrate`, child-session steering, and GitHub MCP |
| 25 | Automations and GitHub MCP |

When a required capability is unavailable, stop that lab. Do not replace a live
capability with role-play or claim that a static artifact proves the workflow ran.

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

1. Compare unscoped and repository-grounded Copilot work.
2. Install and use a project skill to create and revise a decision brief.
3. Use GitHub MCP to preview, create, verify, and correct an issue plan.
4. Create a planning canvas and reconcile it after GitHub state changes.
5. Use built-in orchestration to supervise, redirect, and review child sessions.
6. Run and compare two draft-only Automation runs with explicit evidence.
7. Decide which approved work system remains authoritative.

## Trainer guidance

- Start with the learner's work when it is approved and sanitized.
- Use the supplied scenario when learner data is not approved or sanitized.
- Teach the product through one continuous delivery workflow. Avoid a disconnected feature tour.
- Verify current official GitHub documentation and organizational policy before every live delivery.
- Treat generated output as a proposal. The accountable person accepts, rejects, or revises it.

### Trainer-only Azure Boards supplement

Use Azure Boards only when the delivery plan calls for it before the workshop.
Do not introduce it as an alternate learner path during the standard labs.

The tools in [`../scripts/azure-boards/`](../scripts/azure-boards/) seed, verify,
and reset a synthetic backlog for Agile or Scrum projects. They verify existing
project settings and never create them.

Use the [Session 21 supplement](../sessions/session-21-interview-and-shape-work/lab/azure-boards/README.md)
to shape a seeded requirement. Use the
[Session 24 supplement](../sessions/session-24-orchestrate-workstreams/lab/azure-boards/README.md)
to supervise seeded workstreams. Both still require GitHub Copilot.

## Next steps

- **Enterprise Rollout** adds organization-level policies, analytics, and adoption planning.
- **Agentic Development** teaches technical teams how to build the agents, skills, and integrations used behind these workflows.
- **Full Mastery** prepares trainers to deliver every technical and role-based session.
