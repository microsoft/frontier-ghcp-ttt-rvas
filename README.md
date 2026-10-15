# GitHub Copilot & Agentic Workflows: Train-the-Trainer

A structured, repeatable curriculum for training trainers on GitHub Copilot and GitHub Agentic Workflows. It contains 29 sessions across 7 modules, including dedicated paths for product and delivery teams and HVE engineering. Most sessions have 1 hour of trainer content and a 2-hour hands-on lab. Session 14 uses a 90-minute lab, Session 18 uses a 2-hour 30-minute lab, and Session 28 uses a 3-hour lab.

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
- GitHub Copilot Enterprise Cloud access
- Comfort with live coding and demos
- Docker for the Session 17 observability lab

### For Technical-Track Trainees

- Working knowledge of at least one programming language
- GitHub account with Copilot access
- VS Code installed with GitHub Copilot extension
- Basic Git proficiency
- Node.js 22 or later and standalone CLI `/refine` access before Session 03
- Working language servers for Session 11 (JavaScript) and Session 27 (Python)

### For Product and Delivery Trainees

- Basic knowledge of their product or delivery process
- **A GitHub account with GitHub Copilot access**
- Browser access to the training repository
- The GitHub Copilot app
- The approved GitHub MCP server and a writable training repository

Programming experience, Git command-line knowledge, and repository administration are not required.

**GitHub Copilot access is required for Sessions 20 to 25.** Learners without access
should not take these sessions. Stop and reschedule their Module 7 training after
access is available.

## Curriculum Overview

### Module 1: Copilot Fundamentals (Beginner)

| #   | Session                                                                    | Difficulty  | Duration   | Summary                                                                                                              |
| --- | -------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| 01  | [Introduction to GitHub Copilot](sessions/session-01-intro-to-copilot/)    | Beginner    | 3 hrs      | Explains what Copilot is, how the LLM and billing model work, data privacy, and how to install and configure it.   |
| 02  | [Copilot Chat & Inline Suggestions](sessions/session-02-chat-and-inline/)  | Beginner    | 3 hrs      | Covers Copilot Chat surfaces, slash commands, chat participants, model selection, and the CLI for daily development. |
| 03  | [Prompt Engineering Fundamentals](sessions/session-03-prompt-engineering/) | Beginner    | 3 hrs      | Builds a todo API with focused prompts and a checked CLI `/refine` rewrite. |

### Module 2: Copilot in Practice (Intermediate to Advanced)

| #   | Session                                                                        | Difficulty   | Duration   | Summary                                                                                                              |
| --- | ------------------------------------------------------------------------------ | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| 04  | [GitHub Copilot in the CLI](sessions/session-04-copilot-cli/)                   | Intermediate | 3 hrs      | Checks plan critique, CLI controls, queued/background work, recovery, and live fleet results. |
| 05  | [Agent Mode in the IDE](sessions/session-05-agent-mode-ide/)                   | Intermediate | 3 hrs      | Introduces agent mode, Copilot's autonomous plan-act-observe loop for multi-step, multi-file coding tasks in the IDE. |
| 06  | [Copilot Spaces & Context Management](sessions/session-06-spaces-and-context/) | Intermediate | 3 hrs      | Curates context and inspects loaded CLI instructions to correct a stale rule before implementation. |
| 07  | [Copilot for Code Review & PRs](sessions/session-07-code-review-prs/)          | Intermediate | 3 hrs      | Compares human review, local `/review` and `/security-review`, and Copilot PR findings before focused fixes. |
| 29  | [GitHub Copilot App for Developers](sessions/session-29-copilot-app-for-developers/) | Intermediate | 3 hrs | Compares checked rubber-duck and `/spar` critiques, returns a forked plan note, and reviews repair and PR readiness. |
| 27  | [Repair and Refactor a Broken Python Application](sessions/session-27-python-repair-refactor/) | Intermediate | 3 hrs | Repairs Python in failure order, checks LSP references, and refactors from an accepted plan without changing reports. |
| 26  | [Migrate a Legacy Java Service to Modern .NET](sessions/session-26-java-to-dotnet-modernization/) | Advanced | 3 hrs | Ports a legacy Java service to modern .NET while preserving behavior through focused tests. |

**App access is required for Session 29 and Session 24's developer route.** Check
the required commands before delivery. Prepared outputs do not replace live work.

### Module 3: Agentic Workflows (Advanced)

| #   | Session                                                                             | Difficulty  | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| 08  | [Copilot App, Plugins & Canvas Extensions](sessions/session-08-copilot-app-canvases/) | Advanced  | 3 hrs      | Uses the Copilot App Customize area and builds a shared canvas with bounded state, actions, and review evidence. |
| 09  | [Copilot Cloud Agent](sessions/session-09-cloud-agent/)                             | Advanced    | 3 hrs      | Covers assigning GitHub issues to the cloud agent for autonomous resolution, branch, code, tests, and draft PR.   |
| 10  | [MCP Servers & Custom Tool Integration](sessions/session-10-mcp-servers/)           | Advanced    | 3 hrs      | Introduces the Model Context Protocol, server architecture, configuration, and building custom MCP servers.       |
| 11  | [Custom Agents & Agent Profiles](sessions/session-11-custom-agents/)                | Advanced    | 3 hrs      | Checks JavaScript LSP results and a live test-only agent that stops at a source-code conflict. |
| 12  | [Agent Skills & the Copilot Ecosystem](sessions/session-12-agent-skills-ecosystem/) | Advanced    | 3 hrs      | Tests live skills, compares interviews before `/plan`, and reviews scoped Chronicle suggestions. |

### Module 4: DevOps & Infrastructure with Copilot (Intermediate to Advanced)

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
| 28  | [HVE Core: Evidence-Led Delivery with RPI](sessions/session-28-hve-core-challenge/)       | Advanced    | 4 hrs      | Uses HVE Research, Plan, Implement, Review, and Follow-up to move a bounded API feature from product intent to a human decision. |

### Module 6: Advanced Topics & Capstone (Advanced)

| #   | Session                                                                                   | Difficulty  | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| 17  | [Build Reliable Agent Applications with the GitHub Copilot SDK](sessions/session-17-copilot-sdk/) | Advanced | 3 hrs | Builds a TypeScript agent application with streaming, a custom tool, explicit permissions, blocking hooks, tests, and OpenTelemetry traces. |
| 19  | [End-to-End Capstone Project](sessions/session-19-capstone/)                              | Advanced    | 3 hrs      | Uses a bounded integration scenario to connect governance, specification, agentic delivery, review, and handover. |

### Module 7: Product and Delivery Teams (Beginner to Intermediate)

| # | Session | Difficulty | Duration | Summary |
| --- | --- | --- | --- | --- |
| 20 | [Work Effectively in the GitHub Copilot App](sessions/session-20-copilot-app-foundations/) | Beginner | 3 hrs | Uses repository context, inspects available capabilities, and creates a reviewed working brief. |
| 21 | [Interview Ideas and Shape Better Work](sessions/session-21-interview-and-shape-work/) | Beginner | 3 hrs | Turns an unclear request into a repository decision brief and approved GitHub issue proposal. |
| 22 | [Plan Work with GitHub Issues and MCP](sessions/session-22-plan-work-with-github-issues/) | Intermediate | 3 hrs | Creates and verifies a bounded GitHub issue plan through the GitHub MCP server. |
| 23 | [Build and Use a Planning Canvas](sessions/session-23-plan-and-steer-with-canvases/) | Intermediate | 3 hrs | Creates a planning canvas and aligns its visible state with GitHub issues. |
| 24 | [Orchestrate Agents and Workstreams](sessions/session-24-orchestrate-workstreams/) | Intermediate | 3 hrs | Supervises live child sessions over GitHub issues, or local code and PR snapshots in the developer route. |
| 25 | [Automate Delivery Follow-up and Connect Work Systems](sessions/session-25-automate-delivery-follow-up/) | Intermediate | 3 hrs | Runs one draft-only Automation and records whether GitHub or Azure Boards remains authoritative. |

**Total track duration:** 88 hours across 29 sessions

## Getting Started

1. **Review the curriculum plan**. Read [`curriculum-plan.md`](curriculum-plan.md) for full session details, learning objectives, and progression. Use the [`glossary`](sessions/glossary.md) for shared product and workflow terms.

2. **Understand the template**. Check [`track-template/`](track-template/) for the standard session structure. Every session follows the same format.

3. **Browse learning tracks**. See [`tracks/`](tracks/) for paths based on role,
   maturity, and goals, including Product and Delivery Teams and HVE Engineering.

4. **Pick your path:**

   | Audience              | Recommended Path                 | Sessions     | Duration   |
   | --------------------- | -------------------------------- | ------------ | ---------- |
   | Copilot Beginners     | Module 1                         | 01 to 03        | 9 hrs      |
   | Copilot Practitioners | Modules 1 to 2 + developer orchestration | 01 to 07, 29, 24, 27, 26 | 33 hrs |
   | Agentic Developers    | Modules 1 to 3 + developer orchestration | 01 to 12, 29, 24 | 42 hrs |
   | DevOps Engineers      | Module 1 + Session 05 + Module 4 | 01 to 05, 13 to 15 | 21 hrs     |
   | SDK Application Developers | Modules 1 to 3 + Session 17 | 01 to 12, 17 | 39 hrs |
   | Product and Delivery Teams | Module 7                   | 20 to 25        | 18 hrs     |
   | HVE Practitioners     | HVE Engineering                  | 01 to 07, 10 to 11, 28 | 31 hrs |
   | Full Track            | All Modules                      | All available sessions | 88 hrs |

5. **Prepare your environment:**
   - GitHub Enterprise Cloud organization with Copilot enabled according to customer policy
   - Pre-configured repositories for each lab (see individual session READMEs)
   - VS Code with GitHub Copilot and GitHub Copilot Chat extensions
   - GitHub Copilot app for sessions that use canvases or orchestration

6. **Deliver and iterate**. Each session has trainer notes. After delivering, update the materials based on what worked.

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
│   ├── product-and-delivery-teams.md
│   ├── hve-engineering.md
│   └── full-mastery.md
├── track-template/                        # Reusable session template
│   └── session-template/
│       ├── README.md
│       ├── trainer-content/
│       └── lab/ (starter/ + solution/)
└── sessions/                              # All 29 sessions
    ├── glossary.md                        # Shared product and workflow terms
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
    ├── session-17-copilot-sdk/            # Module 6: Advanced & Capstone
    ├── session-18-spec-kit/
    ├── session-19-capstone/               # Module 6: Advanced & Capstone
    ├── session-20-copilot-app-foundations/ # Module 7: Product & Delivery
    ├── session-21-interview-and-shape-work/
    ├── session-22-plan-work-with-github-issues/
    ├── session-23-plan-and-steer-with-canvases/
    ├── session-24-orchestrate-workstreams/
    ├── session-25-automate-delivery-follow-up/
    ├── session-26-java-to-dotnet-modernization/ # Module 2: In Practice
    ├── session-27-python-repair-refactor/       # Module 2: In Practice
    ├── session-28-hve-core-challenge/           # Module 5: Specification-Driven Frameworks
    └── session-29-copilot-app-for-developers/   # Module 2: In Practice
```
