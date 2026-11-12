# Track: Product and Delivery Teams

**For:** product managers, product owners, business analysts, project managers, and delivery leads
**Time:** 18 hours, 6 sessions
**Delivery:** 3 days

Learners use the GitHub Copilot app to work through one initiative, the fictional **Service Request Portal**. They gather context, settle product decisions, plan issues, build a planning canvas, supervise parallel reviews, and draft a follow-up. The path is called **Delivery Decision Studio**. That's the curriculum's name, not a GitHub product.

No programming, Git command line, or repository administration skills needed. Keep the path no-code and use the supplied scenario. If you substitute your own, use synthetic, sanitized data with no customer names.

## Before you start

Learners need:

- A GitHub account with Copilot access
- The GitHub Copilot app and browser access to the training repository
- GitHub MCP access to the training repository
- Canvas creation, orchestration, and Automations access

Learners without Copilot access can't take this track. Reschedule them.

## Trainer setup

Do this before M7-01 and check the tools again before each session.

1. **Open the project.** In the app, add the training repository under **Projects**, start a session, and ask Copilot to read one file.
2. **Check customizations.** Open **Customize** → **Installed** and list the skills, MCP servers, plugins, and canvases. Installing a plugin doesn't prove GitHub MCP can read the repository, so test that separately.
3. **Check skills.** M7-04 and M7-05 use the built-in `/create-canvas` and `/orchestrate`. Type `/` and confirm both appear. For M7-02, commit `.github/skills/decision-interview/SKILL.md` to the training repository, open a new session, and run `/decision-interview` with a test request. In the CLI, use `/skills reload` and `/skills info decision-interview`.
4. **Check GitHub MCP** (M7-03 to M7-06). Open **Customize** → **MCP** → **Installed**, ask Copilot to list its GitHub tools, and read one thing from the repository. Don't start a write lab until the read works. In the CLI, use `/mcp list` and `/mcp show github`. Never paste tokens into prompts or files.
5. **Check session controls.** Confirm the Interactive, Plan, and Autopilot modes; `@`, `#`, and `/` references; `/context`, `/compact`, `/clear`, and `/rubber-duck`. If a command is missing, note it and teach only what works.

| Session | Needs |
| --- | --- |
| M7-01 | App project and repository reads |
| M7-02 | Project skill `decision-interview` |
| M7-03 | GitHub MCP issue reads and writes |
| M7-04 | `/create-canvas` and GitHub MCP reads |
| M7-05 | `/orchestrate`, child-session steering, GitHub MCP |
| M7-06 | Automations and GitHub MCP |

## Sessions

| # | ID | Session | Time | Saves | Used next |
| ---: | --- | --- | --- | --- | --- |
| 1 | M7-01 | [Work Effectively in the GitHub Copilot App](../sessions/session-m7-01-copilot-app-foundations/README.md) | 3 hrs | `initiative-context-brief.md` | M7-02 context |
| 2 | M7-02 | [Interview Ideas and Shape Better Work](../sessions/session-m7-02-interview-and-shape-work/README.md) | 3 hrs | `decision-brief.md`, `issue-proposal.md` | M7-03 decisions |
| 3 | M7-03 | [Plan Work with GitHub Issues and MCP](../sessions/session-m7-03-plan-work-with-github-issues/README.md) | 3 hrs | Parent and child GitHub issues | M7-04 issue state |
| 4 | M7-04 | [Build and Use a Planning Canvas](../sessions/session-m7-04-plan-and-steer-with-canvases/README.md) | 3 hrs | Canvas linked to the issues | M7-05 planning view |
| 5 | M7-05 | [Orchestrate Agents and Workstreams](../sessions/session-m7-05-orchestrate-workstreams/README.md) | 3 hrs | `orchestration-plan.md`, reviewed parent result | M7-06 inputs |
| 6 | M7-06 | [Automate Delivery Follow-up and Connect Work Systems](../sessions/session-m7-06-automate-delivery-follow-up/README.md) | 3 hrs | `automation-definition.md`, `stakeholder-update.md` | The team's operating decision |

Each learner also brings one recurring workflow to evaluate, their team's definition of done, and one decision that stays with a named person.

## Schedule

| Day | Sessions |
| --- | --- |
| 1 | M7-01, M7-02 |
| 2 | M7-03, M7-04 |
| 3 | M7-05, M7-06 |

## Trainer notes

- Treat generated output as a proposal. A named person accepts, rejects, or revises it.
- Keep customer and source organization names out of prompts, artifacts, issues, and screenshots.
- Learners review generated extensions and tool calls. They don't write application code, MCP servers, plugins, or canvas extensions.

### Azure Boards supplement (trainer only)

Use Azure Boards only if your delivery plan calls for it, and prepare it before the workshop. Don't offer it as a learner alternative. `scripts/azure-boards/README.md` describes the tools that seed, check, and reset a synthetic Agile or Scrum backlog. They check existing project settings and never create them. The supplements need Copilot too:

- [M7-02 supplement](../sessions/session-m7-02-interview-and-shape-work/lab/azure-boards/README.md): shape a seeded requirement
- [M7-05 supplement](../sessions/session-m7-05-orchestrate-workstreams/lab/azure-boards/README.md): supervise seeded workstreams

## Next

- **Agentic Development** teaches the agents, skills, and integrations behind these workflows.
- **Full Mastery** prepares you to deliver every session.
