# GitHub Copilot & Agentic Workflows: Train-the-Trainer

Use this curriculum to teach GitHub Copilot and GitHub Agentic Workflows.
Choose from **29 sessions across 7 modules**, including paths for product and
delivery teams and HVE engineering.

Most sessions pair 1 hour of trainer content with a 2-hour hands-on lab.
Session M4-02 has a 90-minute lab, Session M5-02 has a 2-hour 30-minute lab,
and Session M5-03 has a 3-hour lab.

## Who this is for

- **Trainers** teaching development teams to use GitHub Copilot
- **Developer advocates** building Copilot adoption programs
- **Engineering leads** teaching Copilot skills within their teams
- **DevOps engineers** integrating Copilot into CI/CD and infrastructure workflows
- **Product and delivery leaders** teaching non-developers to understand, steer, and review agent work

## Prerequisites

### For technical-track trainers

- Strong software development background (any language)
- Familiarity with GitHub (repos, PRs, issues, Actions)
- GitHub Copilot Enterprise Cloud access
- Comfort with live coding and demos
- Docker for the Session M6-01 observability lab

### For technical-track trainees

- Working knowledge of at least one programming language
- GitHub account with Copilot access
- VS Code installed with GitHub Copilot extension
- Basic Git proficiency
- Node.js 22 or later and standalone CLI `/refine` access before Session M1-03
- Working language servers for Session M3-04 (JavaScript) and Session M2-06 (Python)

### For product and delivery trainees

- Basic knowledge of their product or delivery process
- **A GitHub account with GitHub Copilot access**
- Browser access to the training repository
- The GitHub Copilot app
- The approved GitHub MCP server and a writable training repository

Product and delivery learners do not need programming experience, Git command-line
knowledge, or repository administration skills.

**GitHub Copilot access is required for Sessions M7-01 to M7-06.** If a learner
does not have access, stop and reschedule their Module 7 training once they do.

## Curriculum overview

**Session IDs start with their module:** `M2-01` is the first session in Module 2.
Numbers restart at `01` in each module. Directories use lowercase IDs, such as
`sessions/session-m2-01-copilot-cli/`.

Use `data/session-catalog.json` for the teaching order.
**Use the full module-local ID** in saved sets and session links.

### Module 1: Copilot Fundamentals (Beginner)

| #   | Session                                                                    | Difficulty  | Duration   | Summary                                                                                                              |
| --- | -------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| M1-01  | [Introduction to GitHub Copilot](sessions/session-m1-01-intro-to-copilot/)    | Beginner    | 3 hrs      | Explains what Copilot is, how the LLM and billing model work, data privacy, and how to install and configure it.   |
| M1-02  | [Copilot Chat & Inline Suggestions](sessions/session-m1-02-chat-and-inline/)  | Beginner    | 3 hrs      | Uses Chat to diagnose a Calculator defect, add tests, inspect context, and implement a change request. |
| M1-03  | [Prompt Engineering Fundamentals](sessions/session-m1-03-prompt-engineering/) | Beginner    | 3 hrs      | Builds a todo API with focused prompts and a checked CLI `/refine` rewrite. |

### Module 2: Copilot in Practice (Intermediate to Advanced)

| #   | Session                                                                        | Difficulty   | Duration   | Summary                                                                                                              |
| --- | ------------------------------------------------------------------------------ | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| M2-01  | [GitHub Copilot in the CLI](sessions/session-m2-01-copilot-cli/)                   | Intermediate | 3 hrs      | Checks plan critique, CLI controls, queued/background work, recovery, and live fleet results. |
| M2-02  | [Agent Mode in the IDE](sessions/session-m2-02-agent-mode-ide/)                   | Intermediate | 3 hrs      | Builds and extends one Todo API in IDE agent mode, then tests and reviews the changes. |
| M2-03  | [Copilot Spaces & Context Management](sessions/session-m2-03-spaces-and-context/) | Intermediate | 3 hrs      | Curates context and inspects loaded CLI instructions to correct a stale rule before implementation. |
| M2-04  | [Copilot for Code Review & PRs](sessions/session-m2-04-code-review-prs/)          | Intermediate | 3 hrs      | Compares human review, local `/review` and `/security-review`, and Copilot PR findings before focused fixes. |
| M2-05  | [GitHub Copilot App for Developers](sessions/session-m2-05-copilot-app-for-developers/) | Intermediate | 3 hrs | Compares checked rubber-duck and `/spar` critiques, returns a forked plan note, and reviews repair and PR readiness. |
| M2-06  | [Repair and Refactor a Broken Python Application](sessions/session-m2-06-python-repair-refactor/) | Intermediate | 3 hrs | Repairs Python in failure order, checks LSP references, and refactors from an accepted plan without changing reports. |
| M2-07  | [Migrate a Legacy Java Service to Modern .NET](sessions/session-m2-07-java-to-dotnet-modernization/) | Advanced | 3 hrs | Ports a legacy Java service to modern .NET while preserving behavior through focused tests. |

**App access is required for Session M2-05 and Session M7-05's developer route.** Check
the required commands before delivery. Prepared outputs do not replace live work.

### Module 3: Agentic Workflows (Advanced)

| #   | Session                                                                             | Difficulty  | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| M3-01  | [Copilot App, Plugins & Canvas Extensions](sessions/session-m3-01-copilot-app-canvases/) | Advanced  | 3 hrs      | Uses the Copilot App Customize area to build a shared canvas with state limits, defined actions, and a review record. |
| M3-02  | [Copilot Cloud Agent](sessions/session-m3-02-cloud-agent/)                             | Advanced    | 3 hrs      | Follows one issue from assignment to a proposed change, test results, and human review. |
| M3-03  | [MCP Servers & Custom Tool Integration](sessions/session-m3-03-mcp-servers/)           | Advanced    | 3 hrs      | Introduces the Model Context Protocol, server architecture, configuration, and building custom MCP servers.       |
| M3-04  | [Custom Agents & Agent Profiles](sessions/session-m3-04-custom-agents/)                | Advanced    | 3 hrs      | Checks JavaScript LSP results and a live test-only agent that stops at a source-code conflict. |
| M3-05  | [Agent Skills & the Copilot Ecosystem](sessions/session-m3-05-agent-skills-ecosystem/) | Advanced    | 3 hrs      | Tests live skills, compares interviews before `/plan`, and reviews scoped Chronicle suggestions. |

### Module 4: DevOps & Infrastructure with Copilot (Intermediate to Advanced)

| #   | Session                                                                                   | Difficulty   | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| M4-01  | [GitHub Actions & Workflow Generation](sessions/session-m4-01-actions-workflows/)            | Intermediate | 3 hrs      | Carries one Node.js application through CI generation, deployment design, workflow repair, and custom-action validation. |
| M4-02  | [Infrastructure as Code with Copilot](sessions/session-m4-02-iac-with-copilot/)              | Advanced     | 2 hrs 30 min | Builds, connects, validates, and security-reviews Terraform modules. Bicep is an optional comparison. |
| M4-03  | [CI/CD Pipeline Debugging & Agentic Remediation](sessions/session-m4-03-cicd-debugging-autofix/) | Advanced     | 3 hrs      | Diagnoses pipeline failures from logs and local checks, including a staged failure and reviewed security remediation. |

### Module 5: Specification-Driven Frameworks (Advanced)

| #   | Session                                                                                   | Difficulty  | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| M5-01  | [Brady's Squad: Human-Led AI Teams](sessions/session-m5-01-squad-orchestration/)             | Advanced    | 3 hrs      | Uses Squad to assign scoped work to persistent roles and save decisions and results for review. |
| M5-02  | [Spec Kit: Specification-Driven Development](sessions/session-m5-02-spec-kit/)              | Advanced    | 3.5 hrs    | Uses Spec Kit for task-to-issue conversion, staged implementation, convergence, and living-spec evolution. |
| M5-03  | [HVE Core: Evidence-Led Delivery with RPI](sessions/session-m5-03-hve-core-challenge/)       | Advanced    | 4 hrs      | Uses HVE Research, Plan, Implement, Review, and Follow-up to develop one API feature and submit it for a human decision. |

### Module 6: Advanced Topics & Capstone (Advanced)

| #   | Session                                                                                   | Difficulty  | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| M6-01  | [Build Reliable Agent Applications with the GitHub Copilot SDK](sessions/session-m6-01-copilot-sdk/) | Advanced | 3 hrs | Builds a TypeScript agent application with streaming, a custom tool, permission decisions, blocking hooks, tests, and OpenTelemetry traces. |
| M6-02  | [End-to-End Capstone Project](sessions/session-m6-02-capstone/)                              | Advanced    | 3 hrs      | Connects governance, specification, agentic delivery, review, and handover in one integration scenario. |

### Module 7: Product and Delivery Teams (Beginner to Intermediate)

| # | Session | Difficulty | Duration | Summary |
| --- | --- | --- | --- | --- |
| M7-01 | [Work Effectively in the GitHub Copilot App](sessions/session-m7-01-copilot-app-foundations/) | Beginner | 3 hrs | Uses repository context, inspects available capabilities, and creates a reviewed working brief. |
| M7-02 | [Interview Ideas and Shape Better Work](sessions/session-m7-02-interview-and-shape-work/) | Beginner | 3 hrs | Turns an unclear request into a repository decision brief and approved GitHub issue proposal. |
| M7-03 | [Plan Work with GitHub Issues and MCP](sessions/session-m7-03-plan-work-with-github-issues/) | Intermediate | 3 hrs | Creates and checks a GitHub issue plan through the GitHub MCP server. |
| M7-04 | [Build and Use a Planning Canvas](sessions/session-m7-04-plan-and-steer-with-canvases/) | Intermediate | 3 hrs | Creates a planning canvas and aligns its visible state with GitHub issues. |
| M7-05 | [Orchestrate Agents and Workstreams](sessions/session-m7-05-orchestrate-workstreams/) | Intermediate | 3 hrs | Supervises live child sessions over GitHub issues, or local code and PR snapshots in the developer route. |
| M7-06 | [Automate Delivery Follow-up and Connect Work Systems](sessions/session-m7-06-automate-delivery-follow-up/) | Intermediate | 3 hrs | Runs one draft-only Automation and records whether GitHub or Azure Boards remains authoritative. |

**Total track duration:** 88 hours across 29 sessions

## Getting started

1. Read the [`curriculum plan`](curriculum-plan.md) to see what each session teaches
   and which sessions come first. Use the [`glossary`](sessions/glossary.md) for
   product and workflow terms.

2. Check [`track-template/`](track-template/) to see how a session is organized.
   Every session follows the same format.

3. Browse the [`learning tracks`](tracks/) and choose one that fits your audience's
   role and experience. Product and Delivery Teams and HVE Engineering have
   dedicated paths.

4. **Pick your path:**

   | Audience              | Recommended Path                 | Sessions     | Duration   |
   | --------------------- | -------------------------------- | ------------ | ---------- |
   | Copilot Beginners     | Module 1                         | M1-01 to M1-03 | 9 hrs |
   | Copilot Practitioners | Modules 1 to 2 + developer orchestration | M1-01 to M1-03, M2-01 to M2-05, M7-05, M2-06 to M2-07 | 33 hrs |
   | Agentic Developers    | Agentic Development | M1-01 to M1-03, M2-01 to M2-05, M7-05, M3-01 to M3-05 | 42 hrs |
   | DevOps Engineers      | DevOps & Automation | M1-01 to M1-03, M2-01 to M2-02, M4-01 to M4-03 | 23 hrs 30 min |
   | SDK Application Developers | SDK application development | M1-01 to M1-03, M2-01 to M2-04, M3-01 to M3-05, M6-01 | 39 hrs |
   | Product and Delivery Teams | Module 7                   | M7-01 to M7-06 | 18 hrs |
   | HVE Practitioners     | HVE Engineering                  | M1-01 to M1-03, M2-01 to M2-04, M3-03 to M3-04, M5-03 | 31 hrs |
   | Full Track            | All Modules                      | All available sessions | 88 hrs |

5. **Prepare your environment:**
   - GitHub Enterprise Cloud organization with Copilot enabled according to customer policy
   - Pre-configured repositories for each lab (see individual session READMEs)
   - VS Code with GitHub Copilot and GitHub Copilot Chat extensions
   - GitHub Copilot app for sessions that use canvases or orchestration

6. Use the trainer notes to teach each session. Afterwards, update the materials
   based on what worked and where learners needed help.

## Repository structure

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
    ├── session-m1-01-intro-to-copilot/       # Module 1: Fundamentals
    ├── session-m1-02-chat-and-inline/
    ├── session-m1-03-prompt-engineering/
    ├── session-m2-01-copilot-cli/            # Module 2: In Practice
    ├── session-m2-02-agent-mode-ide/
    ├── session-m2-03-spaces-and-context/
    ├── session-m2-04-code-review-prs/
    ├── session-m2-05-copilot-app-for-developers/   # Module 2: In Practice
    ├── session-m2-06-python-repair-refactor/       # Module 2: In Practice
    ├── session-m2-07-java-to-dotnet-modernization/ # Module 2: In Practice
    ├── session-m3-01-copilot-app-canvases/   # Module 3: Agentic Workflows
    ├── session-m3-02-cloud-agent/            # Module 3: Agentic Workflows
    ├── session-m3-03-mcp-servers/
    ├── session-m3-04-custom-agents/
    ├── session-m3-05-agent-skills-ecosystem/
    ├── session-m4-01-actions-workflows/      # Module 4: DevOps & Infrastructure
    ├── session-m4-02-iac-with-copilot/
    ├── session-m4-03-cicd-debugging-autofix/
    ├── session-m5-01-squad-orchestration/    # Module 5: Specification-Driven Frameworks
    ├── session-m5-02-spec-kit/
    ├── session-m5-03-hve-core-challenge/           # Module 5: Specification-Driven Frameworks
    ├── session-m6-01-copilot-sdk/            # Module 6: Advanced & Capstone
    ├── session-m6-02-capstone/               # Module 6: Advanced & Capstone
    ├── session-m7-01-copilot-app-foundations/ # Module 7: Product & Delivery
    ├── session-m7-02-interview-and-shape-work/
    ├── session-m7-03-plan-work-with-github-issues/
    ├── session-m7-04-plan-and-steer-with-canvases/
    ├── session-m7-05-orchestrate-workstreams/
    └── session-m7-06-automate-delivery-follow-up/
```
