# GitHub Copilot & Agentic Workflows: Train-the-Trainer

Teach GitHub Copilot and GitHub Agentic Workflows with **29 sessions in 7 modules**, including paths for product and delivery teams and HVE engineering.

Most sessions pair 1 hour of trainer content with a 2-hour lab. M4-02 has a 90-minute lab, M5-02 a 2-hour 30-minute lab, and M5-03 a 3-hour lab.

## Who this is for

Trainers, developer advocates, engineering leads, and DevOps engineers who teach Copilot to developers. Product and delivery leaders can teach non-developers to steer and review agent work.

## Prerequisites

**Technical trainers and learners**

- Working knowledge of one programming language, Git, and GitHub (repos, PRs, issues, Actions)
- A GitHub account with Copilot access; trainers need Copilot Enterprise Cloud
- VS Code with the GitHub Copilot extension
- Node.js 22 or later and standalone CLI `/refine` access before M1-03
- Working language servers for M3-04 (JavaScript) and M2-06 (Python)
- Docker for the M6-01 observability lab

**Product and delivery learners** (M7-01 to M7-06)

- A GitHub account with Copilot access, the GitHub Copilot app, browser access to the training repository, and the GitHub MCP server
- No programming, Git command line, or repository administration skills

Learners without Copilot access should start Module 7 once they have it.

## Curriculum overview

**Session IDs start with their module:** `M2-01` is the first session in Module 2. Numbers restart at `01` in each module. Directories use lowercase IDs, such as `sessions/session-m2-01-copilot-cli/`. `data/session-catalog.json` holds the teaching order. Use the full module-local ID in saved sets and links.

### Module 1: Copilot Fundamentals (Beginner)

| #   | Session                                                                    | Difficulty  | Duration   | Summary                                                                                                              |
| --- | -------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| M1-01  | [Introduction to GitHub Copilot](sessions/session-m1-01-intro-to-copilot/)    | Beginner    | 3 hrs      | Explains what Copilot is, how the LLM and billing model work, data privacy, and how to install and configure it.   |
| M1-02  | [Copilot Chat & Inline Suggestions](sessions/session-m1-02-chat-and-inline/)  | Beginner    | 3 hrs      | Uses Chat to diagnose a Calculator defect, add tests, inspect context, and implement a change request. |
| M1-03  | [Prompt Engineering Fundamentals](sessions/session-m1-03-prompt-engineering/) | Beginner    | 3 hrs      | Builds a todo API with focused prompts and a checked CLI `/refine` rewrite. |

### Module 2: Copilot in Practice (Intermediate to Advanced)

| #   | Session                                                                        | Difficulty   | Duration   | Summary                                                                                                              |
| --- | ------------------------------------------------------------------------------ | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| M2-01  | [GitHub Copilot in the CLI](sessions/session-m2-01-copilot-cli/)                   | Intermediate | 3 hrs      | Critiques a plan, checks CLI controls and fleet results, and practices queued work, background work, and recovery. |
| M2-02  | [Agent Mode in the IDE](sessions/session-m2-02-agent-mode-ide/)                   | Intermediate | 3 hrs      | Builds and extends one Todo API in IDE agent mode, then tests and reviews the changes. |
| M2-03  | [Copilot Spaces & Context Management](sessions/session-m2-03-spaces-and-context/) | Intermediate | 3 hrs      | Chooses context, inspects loaded CLI instructions, and corrects a stale rule before implementation. |
| M2-04  | [Copilot for Code Review & PRs](sessions/session-m2-04-code-review-prs/)          | Intermediate | 3 hrs      | Compares human review, local `/review` and `/security-review`, and Copilot PR findings, then tests focused fixes. |
| M2-05  | [GitHub Copilot App for Developers](sessions/session-m2-05-copilot-app-for-developers/) | Intermediate | 3 hrs | Checks rubber-duck and `/spar` critiques, returns a plan note from a fork, then reviews the repair and decides if it is ready for a PR. |
| M2-06  | [Repair and Refactor a Broken Python Application](sessions/session-m2-06-python-repair-refactor/) | Intermediate | 3 hrs | Fixes Python failures in order, checks LSP references, then refactors from an accepted plan without changing reports. |
| M2-07  | [Migrate a Legacy Java Service to Modern .NET](sessions/session-m2-07-java-to-dotnet-modernization/) | Advanced | 3 hrs | Ports a legacy Java service to modern .NET while preserving behavior through focused tests. |

**M2-05 and M7-05's developer route need Copilot app access.**

### Module 3: Agentic Workflows (Advanced)

| #   | Session                                                                             | Difficulty  | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| M3-01  | [Copilot App, Plugins & Canvas Extensions](sessions/session-m3-01-copilot-app-canvases/) | Advanced  | 3 hrs      | Uses the Copilot App Customize area to build a shared canvas with state limits, defined actions, and a review record. |
| M3-02  | [Copilot Cloud Agent](sessions/session-m3-02-cloud-agent/)                             | Advanced    | 3 hrs      | Follows one issue from assignment to a proposed change, test results, and human review. |
| M3-03  | [MCP Servers & Custom Tool Integration](sessions/session-m3-03-mcp-servers/)           | Advanced    | 3 hrs      | Introduces the Model Context Protocol, server architecture, configuration, and building custom MCP servers.       |
| M3-04  | [Custom Agents & Agent Profiles](sessions/session-m3-04-custom-agents/)                | Advanced    | 3 hrs      | Checks JavaScript LSP results and a live test-only agent that stops at a source-code conflict. |
| M3-05  | [Agent Skills & the Copilot Ecosystem](sessions/session-m3-05-agent-skills-ecosystem/) | Advanced    | 3 hrs      | Write a skill with `skill-creator`, test it live, and learn when skills beat instructions or agents. |

### Module 4: DevOps & Infrastructure with Copilot (Intermediate to Advanced)

| #   | Session                                                                                   | Difficulty   | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| M4-01  | [GitHub Actions & Workflow Generation](sessions/session-m4-01-actions-workflows/)            | Intermediate | 3 hrs      | Generates CI, designs deployment, repairs workflows, and checks a custom action for one Node.js application. |
| M4-02  | [Infrastructure as Code with Copilot](sessions/session-m4-02-iac-with-copilot/)              | Advanced     | 2 hrs 30 min | Builds, connects, validates, and security-reviews Terraform modules. Bicep is an optional comparison. |
| M4-03  | [CI/CD Pipeline Debugging & Agentic Remediation](sessions/session-m4-03-cicd-debugging-autofix/) | Advanced     | 3 hrs      | Diagnoses pipeline failures from logs and local checks, reproduces a staged failure, and reviews a security fix. |

### Module 5: Specification-Driven Frameworks (Advanced)

| #   | Session                                                                                   | Difficulty  | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| M5-01  | [Brady's Squad: Human-Led AI Teams](sessions/session-m5-01-squad-orchestration/)             | Advanced    | 3 hrs      | Uses Squad to assign scoped work to persistent roles and save decisions and results for review. |
| M5-02  | [Spec Kit: Specification-Driven Development](sessions/session-m5-02-spec-kit/)              | Advanced    | 3.5 hrs    | Turns Spec Kit tasks into issues, implements them in stages, runs convergence checks, and updates the specification. |
| M5-03  | [HVE Core: Evidence-Led Delivery with RPI](sessions/session-m5-03-hve-core-challenge/)       | Advanced    | 4 hrs      | Uses HVE Research, Plan, Implement, Review, and Follow-up to develop one API feature and submit it for a human decision. |

### Module 6: Advanced Topics & Capstone (Advanced)

| #   | Session                                                                                   | Difficulty  | Duration   | Summary                                                                                                              |
| --- | ----------------------------------------------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| M6-01  | [Build Reliable Agent Applications with the GitHub Copilot SDK](sessions/session-m6-01-copilot-sdk/) | Advanced | 3 hrs | Builds a TypeScript agent application with streaming, a custom tool, permission decisions, blocking hooks, tests, and OpenTelemetry traces. |
| M6-02  | [End-to-End Capstone Project](sessions/session-m6-02-capstone/)                              | Advanced    | 3 hrs      | Connects governance, specification, agentic delivery, review, and handover in one integration scenario. |

### Module 7: Product and Delivery Teams (Beginner to Intermediate)

| # | Session | Difficulty | Duration | Summary |
| --- | --- | --- | --- | --- |
| M7-01 | [Work Effectively in the GitHub Copilot App](sessions/session-m7-01-copilot-app-foundations/) | Beginner | 3 hrs | Uses repository context, checks available tools, and creates and reviews a working brief. |
| M7-02 | [Interview Ideas and Shape Better Work](sessions/session-m7-02-interview-and-shape-work/) | Beginner | 3 hrs | Turns an unclear request into a repository decision brief and approved GitHub issue proposal. |
| M7-03 | [Plan Work with GitHub Issues and MCP](sessions/session-m7-03-plan-work-with-github-issues/) | Intermediate | 3 hrs | Creates and checks a GitHub issue plan through the GitHub MCP server. |
| M7-04 | [Build and Use a Planning Canvas](sessions/session-m7-04-plan-and-steer-with-canvases/) | Intermediate | 3 hrs | Creates a planning canvas and aligns its visible state with GitHub issues. |
| M7-05 | [Orchestrate Agents and Workstreams](sessions/session-m7-05-orchestrate-workstreams/) | Intermediate | 3 hrs | Supervises live child sessions over GitHub issues, or local code and PR snapshots in the developer route. |
| M7-06 | [Automate Delivery Follow-up and Connect Work Systems](sessions/session-m7-06-automate-delivery-follow-up/) | Intermediate | 3 hrs | Runs one draft-only Automation and records whether GitHub or Azure Boards is the system of record. |

**Total track duration:** 88 hours across 29 sessions

## Getting started

1. Read the [curriculum plan](curriculum-plan.md) to pick and order sessions. The [glossary](sessions/glossary.md) defines product and workflow terms.
2. Choose a [learning track](tracks/) for your audience, or build your own [session set](build-set.md).
3. Set up your environment: a GitHub Enterprise Cloud organization with Copilot enabled, the lab repositories (listed in each session README), VS Code with GitHub Copilot and Copilot Chat, and the GitHub Copilot app for canvas and orchestration sessions.

| Audience | Track | Sessions | Time |
| --- | --- | --- | --- |
| Copilot beginners | Module 1 | M1-01 to M1-03 | 9 hrs |
| Copilot practitioners | Modules 1 to 2 + developer orchestration | M1-01 to M1-03, M2-01 to M2-05, M7-05, M2-06 to M2-07 | 33 hrs |
| Agentic developers | Agentic Development | M1-01 to M1-03, M2-01 to M2-05, M7-05, M3-01 to M3-05 | 42 hrs |
| DevOps engineers | DevOps & Automation | M1-01 to M1-03, M2-01 to M2-02, M4-01 to M4-03 | 23 hrs 30 min |
| SDK application developers | SDK application development | M1-01 to M1-03, M2-01 to M2-04, M3-01 to M3-05, M6-01 | 39 hrs |
| Product and delivery teams | Module 7 | M7-01 to M7-06 | 18 hrs |
| HVE practitioners | HVE Engineering | M1-01 to M1-03, M2-01 to M2-04, M3-03 to M3-04, M5-03 | 31 hrs |
| Everything | All modules | All 29 sessions | 88 hrs |

## Repository structure

```
ghcp-ttt/
├── README.md
├── curriculum-plan.md      # Session order and prerequisites
├── tracks/                 # Learning tracks
├── track-template/         # Template for new sessions
└── sessions/               # 29 sessions, one directory each
    ├── glossary.md
    └── session-mN-NN-slug/ # README, slides, trainer-content/, lab/
```
