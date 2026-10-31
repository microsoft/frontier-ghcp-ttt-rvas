# Track: Product and Delivery Teams

**Target Audience:** Product Managers, Product Owners, Business Analysts, Project Managers, delivery leads, and other non-developer roles
**Duration:** 18 hours (6 sessions × 3 hrs)
**Difficulty:** Beginner → Intermediate
**Recommended Delivery:** 3 days

---

## Description

Use the GitHub Copilot app to work through one product initiative across six
sessions. The path is called **Delivery Decision Studio**. That is the curriculum's
name, not a GitHub product or app mode.

Gather context and settle product decisions first. Then plan the issues, build a
planning canvas, supervise parallel reviews, and draft a follow-up within the
agreed limits.

The initiative is the fictional **Service Request Portal**. Do not replace it
with customer work in the standard path. Trainer-approved substitutions must be
synthetic, sanitized, and free of customer or source organization names.

## Prerequisites

- **A GitHub account with GitHub Copilot access**
- Browser access to the training repository
- The GitHub Copilot app
- The approved GitHub MCP server with access to the training repository
- Canvas creation, orchestration, and Automations access
- Basic knowledge of the learner's product or delivery process

You do not need programming experience, Git command-line knowledge, or repository
administration skills.

**GitHub Copilot access is required for Sessions M7-01 to M7-06.** Learners without access
should not take this track. Stop and reschedule their training after access is
available.

## Capability setup

Complete this setup before Session M7-01. Check the tools again before each later
session. Organizational policy can change which tools the app makes available.

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

An MCP server and a plugin do different jobs:

- **MCP server:** exposes named tools and data sources to Copilot.
- **Plugin:** installs a reusable package that may include skills, agents, hooks,
  MCP servers, or canvases.

A plugin installation does not tell you whether GitHub MCP can read the training
repository. Test the connection separately.

### 3. Check skills

Sessions M7-04 and M7-05 use the built-in `/create-canvas` and `/orchestrate` skills.
Type `/` in a session and check that both commands appear before those sessions.
They are built-in app skills, so do not install look-alike community skills.

Session M7-02 supplies a project skill under
`.github/skills/decision-interview/SKILL.md`. After copying it into the training
repository:

1. commit the skill;
2. open a new app session for the project;
3. open **Customize** → **Skills** → **Installed**;
4. check that `decision-interview` appears;
5. run `/decision-interview` with a short test request.

Copilot CLI users can check the same project skill with:

```text
/skills reload
/skills info decision-interview
```

### 4. Check GitHub MCP

Sessions M7-03 to M7-06 require GitHub repository tools.

In the app:

1. open **Customize** → **MCP** → **Installed**;
2. check that the approved GitHub MCP connection is available;
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

### 5. Check session-specific tools

| Session | Required tool or access |
| --- | --- |
| M7-01 | App project and repository reads |
| M7-02 | Project skill `decision-interview` |
| M7-03 | GitHub MCP issue reads and writes |
| M7-04 | Built-in `/create-canvas` and GitHub MCP reads |
| M7-05 | Built-in `/orchestrate`, child-session steering, and GitHub MCP |
| M7-06 | Automations and GitHub MCP |

**Stop the lab if a required tool is unavailable.** Role-play and prepared files
do not replace hands-on work.

### 6. Check session controls and context syntax

Before Session M7-01, check these controls in the current app:

- session modes: **Interactive**, **Plan**, and **Autopilot**;
- `@` for adding files, `#` for referencing issues, and `/` for commands;
- `/context` for current context usage;
- `/compact` for summarizing an active session under token pressure;
- `/clear` or `/reset` for a fresh session;
- `/rubber-duck` for an independent critique from a different model.

GitHub notes that command availability depends on context. Type `/` in the app
before delivery. If a command is missing, record it in the trainer notes.
Do not teach a substitute without checking that it works.

## Delivery Decision Studio continuity

Use these roles throughout the path:

| Role | Responsibility |
| --- | --- |
| Decision owner | Makes product and scope decisions |
| Delivery reviewer | Checks results, readiness, and handoffs |
| Work-system steward | Checks the authoritative GitHub or Azure Boards state |
| Trainer | Checks access and teaches optional practices |

Save and reuse these results:

| Session | Authoritative result | Used next |
| --- | --- | --- |
| M7-01 | `initiative-context-brief.md` | Repository context for Session M7-02 |
| M7-02 | `decision-brief.md`, `issue-proposal.md` | Product decisions for Session M7-03 |
| M7-03 | Live parent and child GitHub issues | Issue state for Session M7-04 |
| M7-04 | Live canvas linked to GitHub issues | Reconciled planning view for Session M7-05 |
| M7-05 | `orchestration-plan.md`, live issues, reviewed parent result | Authoritative inputs for Session M7-06 |
| M7-06 | `automation-definition.md`, `stakeholder-update.md` | Human-owned operating decision |

At each step, record the next action and open questions in the file or work system
listed above.

## What learners should bring

- The supplied Service Request Portal initiative
- The supplied synthetic issue and status data
- The approved live issue state from the training repository
- One recurring workflow pattern they want to evaluate
- Their team's definition of ready or done
- One decision that must remain with a named person

The supplied scenario covers every exercise and is the default learner path.

## Sessions

| Order | Session ID | Title | Difficulty | Duration |
| --- | --- | --- | --- | --- |
| 1 | M7-01 | Work Effectively in the GitHub Copilot App | Beginner | 3 hrs |
| 2 | M7-02 | Interview Ideas and Shape Better Work | Beginner | 3 hrs |
| 3 | M7-03 | Plan Work with GitHub Issues and MCP | Intermediate | 3 hrs |
| 4 | M7-04 | Build and Use a Planning Canvas | Intermediate | 3 hrs |
| 5 | M7-05 | Orchestrate Agents and Workstreams | Intermediate | 3 hrs |
| 6 | M7-06 | Automate Delivery Follow-up and Connect Work Systems | Intermediate | 3 hrs |

## Recommended delivery schedule

### Three-day workshop

| Day | Sessions | Focus |
| --- | --- | --- |
| Day 1 | Sessions M7-01 to M7-02 | App fluency, context, and interviewing |
| Day 2 | Sessions M7-03 to M7-04 | GitHub issues, MCP, and planning canvases |
| Day 3 | Sessions M7-05 to M7-06 | Orchestration, automation, and work-system handoff |

## Learning outcomes

After this track, you should be able to:

1. Compare unscoped and repository-grounded Copilot work.
2. Install and use a project skill to create and revise a decision brief.
3. Use GitHub MCP to preview, create, check, and correct an issue plan.
4. Create a planning canvas and reconcile it after GitHub state changes.
5. Use built-in orchestration to supervise, redirect, and review child sessions.
6. Run a draft-only Automation twice and compare the recorded results.
7. Decide which work system approved by the organization remains authoritative.

## Trainer guidance

- Use the supplied Service Request Portal path in standard delivery.
- Keep customer and source organization names out of prompts, artifacts, issues,
  screenshots, and demonstrations.
- Reuse the initiative so learners can follow the work between sessions.
- Check current official GitHub documentation and organizational policy before every live delivery.
- Treat generated output as a proposal. The accountable person accepts, rejects, or revises it.
- Keep the path no-code. Learners review generated extensions and tool calls but
  do not write application code, MCP servers, plugins, or canvas extensions.

### Trainer-only Azure Boards supplement

Use Azure Boards only when the delivery plan calls for it before the workshop.
Do not introduce it as an alternate learner path during the standard labs.

The tools described in `scripts/azure-boards/README.md` seed, check,
and reset a synthetic backlog for Agile or Scrum projects. They check existing
project settings and never create them.

Use the [Session M7-02 supplement](../sessions/session-m7-02-interview-and-shape-work/lab/azure-boards/README.md)
to shape a seeded requirement. Use the
[Session M7-05 supplement](../sessions/session-m7-05-orchestrate-workstreams/lab/azure-boards/README.md)
to supervise seeded workstreams. Both still require GitHub Copilot.

## Next steps

- **Agentic Development** teaches technical teams how to build the agents, skills, and integrations used behind these workflows.
- **Full Mastery** prepares trainers to deliver every technical and role-based session.
