# GitHub Copilot & Agentic Workflows — Train-the-Trainer

A structured, repeatable curriculum for training trainers on GitHub Copilot and GitHub Agentic Workflows. It contains 27 sessions across 7 modules, including a dedicated GitHub Copilot adoption path for product and delivery teams. Most sessions have 1 hour of trainer content and a 2-hour hands-on lab. Session 14 uses a 90-minute lab, and Session 18 uses a 2-hour 30-minute lab.

## Who This Is For

- **Trainers** delivering GitHub Copilot enablement to development teams
- **Developer advocates** building Copilot adoption programs
- **Engineering leads** running internal Copilot skill-building initiatives
- **DevOps engineers** integrating Copilot into CI/CD and infrastructure workflows
- **Product and delivery leaders** teaching non-developers to understand, steer, and review agent work

## Prerequisites

### For Technical-Track Trainers

- Strong software development background (any language)
- Familiarity with GitHub (repos, PRs, issues, Actions)
- GitHub Copilot Enterprise Cloud access (Business is a fallback only where a
  session explicitly supports it)
- Comfort with live coding and demos

### For Technical-Track Trainees

- Working knowledge of at least one programming language
- GitHub account with Copilot access
- VS Code installed with GitHub Copilot extension
- Basic Git proficiency

### For Product and Delivery Trainees

- Basic knowledge of their product or delivery process
- **A GitHub account with GitHub Copilot access**
- Browser access to the training repository
- The GitHub Copilot app
- The approved GitHub MCP server and a writable training repository

Programming experience, Git command-line knowledge, and repository administration are not required.

**GitHub Copilot access is required for Sessions 20–25.** Learners without access
should not take these sessions. Stop and reschedule their Module 7 training after
access is available.

## Curriculum Overview

### Module 1: Copilot Fundamentals (Beginner)

| #   | Session                                                                    | Difficulty  | Duration   | Summary                                                                                                              |
| --- | -------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| 01  | [Introduction to GitHub Copilot](sessions/session-01-intro-to-copilot/)    | Beginner    | 3 hrs      | Explains what Copilot is, how the LLM and billing model work, data privacy, and how to install and configure it.   |
| 02  | [Copilot Chat & Inline Suggestions](sessions/session-02-chat-and-inline/)  | Beginner    | 3 hrs      | Covers Copilot Chat surfaces, slash commands, chat participants, model selection, and the CLI for daily development. |
| 03  | [Prompt Engineering Fundamentals](sessions/session-03-prompt-engineering/) | Beginner    | 3 hrs      | Teaches how to write effective prompts — intent, context, constraints, examples — plus refinement and anti-patterns. |

### Module 2: Copilot in Practice (Intermediate)

| #   | Session                                                                        | Difficulty   | Duration   | Summary                                                                                                              |
| --- | ------------------------------------------------------------------------------ | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| 04  | [GitHub Copilot in the CLI](sessions/session-04-copilot-cli/)                   | Intermediate | 3 hrs      | Uses standalone `copilot` for terminal-first workflows and points learners to the Copilot App session. |
| 05  | [Agent Mode in the IDE](sessions/session-05-agent-mode-ide/)                   | Intermediate | 3 hrs      | Introduces agent mode — Copilot's autonomous plan-act-observe loop for multi-step, multi-file coding tasks in the IDE. |
| 06  | [Copilot Spaces & Context Management](sessions/session-06-spaces-and-context/) | Intermediate | 3 hrs      | Covers grounding Copilot with the right context: Spaces, custom instructions, reusable prompt files, and Memory.   |
| 07  | [Copilot for Code Review & PRs](sessions/session-07-code-review-prs/)          | Intermediate | 3 hrs      | Uses Copilot across the PR workflow — summaries, AI review comments, suggested fixes, and merge conflict resolution. |

### Module 3: Agentic Workflows (Advanced)

| #   | Session                                                                             | Difficulty  | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| 08  | [Copilot App, Plugins & Canvas Extensions](sessions/session-08-copilot-app-canvases/) | Advanced  | 3 hrs      | Uses the Copilot App Customize area and builds a shared canvas with bounded state, actions, and review evidence. |
| 09  | [Copilot Cloud Agent](sessions/session-09-cloud-agent/)                             | Advanced    | 3 hrs      | Covers assigning GitHub issues to the cloud agent for autonomous resolution — branch, code, tests, and draft PR.   |
| 10  | [MCP Servers & Custom Tool Integration](sessions/session-10-mcp-servers/)           | Advanced    | 3 hrs      | Introduces the Model Context Protocol — server architecture, configuration, and building custom MCP servers.       |
| 11  | [Custom Agents & Agent Profiles](sessions/session-11-custom-agents/)                | Advanced    | 3 hrs      | Covers building specialized custom agents in `.github/agents/` with their own instructions, tools, and MCP servers. |
| 12  | [Agent Skills & the Copilot Ecosystem](sessions/session-12-agent-skills-ecosystem/) | Advanced    | 3 hrs      | Covers agent skills — `SKILL.md` knowledge packs — plus the community ecosystem and composing agents, skills, MCP. |

### Module 4: DevOps & Infrastructure with Copilot (Intermediate–Advanced)

| #   | Session                                                                                   | Difficulty   | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| 13  | [GitHub Actions & Workflow Generation](sessions/session-13-actions-workflows/)            | Intermediate | 3 hrs      | Carries one Node.js application through CI generation, deployment design, workflow repair, and custom-action validation. |
| 14  | [Infrastructure as Code with Copilot](sessions/session-14-iac-with-copilot/)              | Advanced     | 2 hrs 30 min | Builds, connects, validates, and security-reviews Terraform modules. Bicep is an optional comparison. |
| 15  | [CI/CD Pipeline Debugging & Agentic Remediation](sessions/session-15-cicd-debugging-autofix/) | Advanced     | 3 hrs      | Diagnoses pipeline failures from workflow evidence and local proof, including a staged failure and reviewed security remediation. |

### Module 5: Specification-Driven Frameworks (Advanced)

| #   | Session                                                                                   | Difficulty  | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| 16  | [Brady's Squad: Human-Led AI Teams](sessions/session-16-squad-orchestration/)             | Advanced    | 3 hrs      | Uses Squad to turn scoped work into persistent roles, decisions, and reviewable evidence. |
| 18  | [Spec Kit: Specification-Driven Development](sessions/session-18-spec-kit/)              | Advanced    | 3.5 hrs    | Uses Spec Kit for task-to-issue conversion, staged implementation, convergence, and living-spec evolution. |

### Module 6: Advanced Topics & Capstone (Advanced)

| #   | Session                                                                                   | Difficulty  | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| 17  | [Enterprise Governance, Policies & Analytics](sessions/session-17-enterprise-governance/) | Advanced    | 3 hrs      | Covers enterprise Copilot administration — policies, content exclusions, audit logs, analytics, compliance, rollout. |
| 19  | [End-to-End Capstone Project](sessions/session-19-capstone/)                              | Advanced    | 3 hrs      | Uses a bounded integration scenario to connect governance, specification, agentic delivery, review, and handover. |
| 26  | [Migrate a Legacy Java Service to Modern .NET](sessions/session-26-java-to-dotnet-modernization/) | Advanced | 3 hrs | Ports a legacy Java service to modern .NET while preserving behavior through focused tests. |
| 27  | [Repair and Refactor a Broken Python Application](sessions/session-27-python-repair-refactor/) | Advanced | 3 hrs | Repairs a broken Python application, stabilizes its tests, and refactors it without changing required behavior. |

### Module 7: Product and Delivery Teams (Beginner–Intermediate)

| # | Session | Difficulty | Duration | Summary |
| --- | --- | --- | --- | --- |
| 20 | [Work Effectively in the GitHub Copilot App](sessions/session-20-copilot-app-foundations/) | Beginner | 3 hrs | Uses repository context, inspects available capabilities, and creates a reviewed working brief. |
| 21 | [Interview Ideas and Shape Better Work](sessions/session-21-interview-and-shape-work/) | Beginner | 3 hrs | Turns an unclear request into a repository decision brief and approved GitHub issue proposal. |
| 22 | [Plan Work with GitHub Issues and MCP](sessions/session-22-plan-work-with-github-issues/) | Intermediate | 3 hrs | Creates and verifies a bounded GitHub issue plan through the GitHub MCP server. |
| 23 | [Build and Use a Planning Canvas](sessions/session-23-plan-and-steer-with-canvases/) | Intermediate | 3 hrs | Creates a planning canvas and aligns its visible state with GitHub issues. |
| 24 | [Orchestrate Agents and Workstreams](sessions/session-24-orchestrate-workstreams/) | Intermediate | 3 hrs | Runs bounded child sessions and updates the approved plan with reviewed results. |
| 25 | [Automate Delivery Follow-up and Connect Work Systems](sessions/session-25-automate-delivery-follow-up/) | Intermediate | 3 hrs | Runs one draft-only Automation and records whether GitHub or Azure Boards remains authoritative. |

**Total track duration:** 81 hours across 27 sessions

## Getting Started

1. **Review the curriculum plan** — Read [`curriculum-plan.md`](curriculum-plan.md) for full session details, learning objectives, and progression.

2. **Understand the template** — Check [`track-template/`](track-template/) for the standard session structure. Every session follows the same format.

3. **Browse learning tracks** — See [`tracks/`](tracks/) for paths based on role, maturity, and goals, including Product and Delivery Teams.

4. **Pick your path:**

   | Audience              | Recommended Path                 | Sessions     | Duration   |
   | --------------------- | -------------------------------- | ------------ | ---------- |
   | Copilot Beginners     | Module 1                         | 01–03        | 9 hrs      |
   | Copilot Practitioners | Modules 1–2                      | 01–07        | 21 hrs     |
   | Agentic Developers    | Modules 1–3                      | 01–12        | 36 hrs      |
   | DevOps Engineers      | Module 1 + Session 05 + Module 4 | 01–05, 13–15 | 21 hrs     |
   | Enterprise Admins     | Module 1 + Session 17            | 01–03, 17    | 12 hrs     |
   | Product and Delivery Teams | Module 7                   | 20–25        | 18 hrs     |
   | Full Track            | All Modules                      | 01–27        | 81 hrs      |

5. **Prepare your environment:**
   - GitHub Enterprise Cloud organization with Copilot enabled according to customer policy
   - Pre-configured repositories for each lab (see individual session READMEs)
   - VS Code with GitHub Copilot and GitHub Copilot Chat extensions
   - GitHub Copilot app for sessions that use canvases or orchestration

6. **Deliver and iterate** — Each session has trainer notes. After delivering, update the materials based on what worked.

## Repository Structure

```
ghcp-ttt/
├── README.md                              # This file
├── curriculum-plan.md                     # Full curriculum with session details
├── tracks/                                # Pre-defined learning tracks
│   ├── README.md                          # Track index and comparison
│   ├── beginner-essentials.md
│   ├── developer-productivity.md
│   ├── agentic-development.md
│   ├── devops-automation.md
│   ├── enterprise-rollout.md
│   ├── product-and-delivery-teams.md
│   └── full-mastery.md
├── track-template/                        # Reusable session template
│   └── session-template/
│       ├── README.md
│       ├── trainer-content/
│       └── lab/ (starter/ + solution/)
└── sessions/                              # All 27 sessions
    ├── session-01-intro-to-copilot/       # Module 1: Fundamentals
    ├── session-02-chat-and-inline/
    ├── session-03-prompt-engineering/
    ├── session-04-copilot-cli/            # Module 2: In Practice
    ├── session-05-agent-mode-ide/
    ├── session-06-spaces-and-context/
    ├── session-07-code-review-prs/
    ├── session-08-copilot-app-canvases/   # Module 3: Agentic Workflows
    ├── session-09-cloud-agent/            # Module 3: Agentic Workflows
    ├── session-10-mcp-servers/
    ├── session-11-custom-agents/
    ├── session-12-agent-skills-ecosystem/
    ├── session-13-actions-workflows/      # Module 4: DevOps & Infrastructure
    ├── session-14-iac-with-copilot/
    ├── session-15-cicd-debugging-autofix/
    ├── session-16-squad-orchestration/    # Module 5: Specification-Driven Frameworks
    ├── session-17-enterprise-governance/
    ├── session-18-spec-kit/
    ├── session-19-capstone/               # Module 6: Advanced & Capstone
    ├── session-20-copilot-app-foundations/ # Module 7: Product & Delivery
    ├── session-21-interview-and-shape-work/
    ├── session-22-plan-work-with-github-issues/
    ├── session-23-plan-and-steer-with-canvases/
    ├── session-24-orchestrate-workstreams/
    ├── session-25-automate-delivery-follow-up/
    ├── session-26-java-to-dotnet-modernization/ # Module 6: Advanced & Capstone
    └── session-27-python-repair-refactor/       # Module 6: Advanced & Capstone
```
