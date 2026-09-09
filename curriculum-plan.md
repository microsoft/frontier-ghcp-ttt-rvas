# GitHub Copilot & Agentic Workflows — Train-the-Trainer Curriculum Plan

## Overall Learning Objectives

By completing this curriculum, trainers will be able to:

1. **Explain** GitHub Copilot's architecture, capabilities, model ecosystem, and limitations to technical audiences
2. **Demonstrate** daily Copilot workflows — inline suggestions, Chat, agent mode, and Spaces — in live coding sessions
3. **Teach** prompt engineering techniques that maximize Copilot's effectiveness across all surfaces
4. **Guide** teams through agentic workflows: IDE agent mode, canvases, cloud agent, custom agents, and MCP integration
5. **Build** custom agents (`.github/agents/`), agent skills (`.github/skills/`), canvas extensions, and MCP server integrations
6. **Automate** DevOps workflows — GitHub Actions, IaC (Terraform/Bicep), CI/CD pipelines — with Copilot assistance
7. **Design** enterprise rollout plans covering governance, policies, analytics, and security
8. **Orchestrate** multi-agent teams using optional tools such as Squad for advanced agentic automation
9. **Apply** specification-driven development to turn enterprise requirements into governed delivery artifacts
10. **Facilitate** hands-on labs where trainees build real projects using the full Copilot toolchain
11. **Assess** trainee progress and adapt delivery based on audience skill level and domain focus

---

## Curriculum Architecture

### Modules & Tracks

The curriculum is organized into **5 modules** that progress from foundations through advanced orchestration. Modules 1–3 form the **core track** — every trainer should complete these. Modules 4–5 are **elective tracks** that can be taken independently based on audience needs.

```
Module 1: Copilot Fundamentals ──────────────── (Beginner, 3 sessions)
    │
Module 2: Copilot in Practice ──────────────── (Intermediate, 4 sessions)
    │
Module 3: Agentic Workflows ───────────────── (Advanced, 5 sessions)
    │
    ├── Module 4: DevOps & Infrastructure ──── (Intermediate–Advanced, 3 sessions)
    │   └── Requires: Module 1 + Session 05
    │
    └── Module 5: Advanced Topics & Capstone ─ (Advanced, 4 sessions)
        └── Requires: Modules 1–3; Session 17 is required before the capstone
```

### Delivery Flexibility

| Audience                  | Recommended Path                 | Sessions     | Duration   |
| ------------------------- | -------------------------------- | ------------ | ---------- |
| **Copilot Beginners**     | Module 1 only                    | 01–03        | 9 hrs      |
| **Copilot Practitioners** | Modules 1–2                      | 01–07        | 21 hrs     |
| **Agentic Developers**    | Modules 1–3                      | 01–12        | 36 hrs     |
| **DevOps Engineers**      | Module 1 + Session 05 + Module 4 | 01–05, 13–15 | 21 hrs     |
| **Enterprise Admins**     | Module 1 + Session 17            | 01–03, 17    | 12 hrs     |
| **Full Track**            | All Modules                      | 01–19        | 57 hrs     |

---

## Session Plan

### Module 1: Copilot Fundamentals (Beginner)

| #   | Session                           | Difficulty  | Prerequisites   | Duration   |
| --- | --------------------------------- | ----------- | --------------- | ---------- |
| 01  | Introduction to GitHub Copilot    | Beginner    | None            | 3 hrs      |
| 02  | Copilot Chat & Inline Suggestions | Beginner    | Session 01      | 3 hrs      |
| 03  | Prompt Engineering Fundamentals   | Beginner    | Sessions 01–02  | 3 hrs      |

### Module 2: Copilot in Practice (Intermediate)

| #   | Session                                   | Difficulty   | Prerequisites   | Duration   |
| --- | ----------------------------------------- | ------------ | --------------- | ---------- |
| 04  | GitHub Copilot in the CLI                 | Intermediate | Sessions 01–03  | 3 hrs      |
| 05  | Agent Mode in the IDE                     | Intermediate | Sessions 01–03  | 3 hrs      |
| 06  | Copilot Spaces & Context Management       | Intermediate | Sessions 01–03  | 3 hrs      |
| 07  | Copilot for Code Review & Pull Requests   | Intermediate | Sessions 01–03  | 3 hrs      |

### Module 3: Agentic Workflows (Advanced)

| #   | Session                               | Difficulty  | Prerequisites      | Duration   |
| --- | ------------------------------------- | ----------- | ------------------ | ---------- |
| 08  | Copilot App, Plugins & Canvas Extensions | Advanced  | Sessions 01–07     | 3 hrs      |
| 09  | Copilot Cloud Agent                   | Advanced    | Sessions 01–07     | 3 hrs      |
| 10  | MCP Servers & Custom Tool Integration | Advanced    | Sessions 01–07     | 3 hrs      |
| 11  | Custom Agents & Agent Profiles        | Advanced    | Sessions 01–07, 10 | 3 hrs      |
| 12  | Agent Skills & the Copilot Ecosystem  | Advanced    | Sessions 01–07, 11 | 3 hrs      |

### Module 4: DevOps & Infrastructure with Copilot (Intermediate–Advanced)

| #   | Session                                    | Difficulty   | Prerequisites      | Duration   |
| --- | ------------------------------------------ | ------------ | ------------------ | ---------- |
| 13  | GitHub Actions & Workflow Generation       | Intermediate | Sessions 01–05     | 3 hrs      |
| 14  | Infrastructure as Code with Copilot        | Advanced     | Sessions 01–05, 13 | 3 hrs      |
| 15  | CI/CD Pipeline Debugging & Copilot Autofix | Advanced     | Sessions 01–05, 13 | 3 hrs      |

### Module 5: Advanced Topics & Capstone (Advanced)

| #   | Session                                     | Difficulty  | Prerequisites      | Duration   |
| --- | ------------------------------------------- | ----------- | ------------------ | ---------- |
| 16  | Multi-Agent Team Orchestration              | Advanced    | Sessions 01–12 | 3 hrs   |
| 17  | Enterprise Governance, Policies & Analytics | Advanced    | Sessions 01–03     | 3 hrs      |
| 18  | Spec Kit: Enterprise Specification-Driven Development | Advanced | Sessions 01–12, 17 | 3 hrs |
| 19  | End-to-End Capstone Project                 | Advanced    | Sessions 01–12, 17–18 | 3 hrs |

---

## Session Details

---

### Session 01 — Introduction to GitHub Copilot

**Difficulty:** Beginner
**Prerequisites:** None
**Module:** Copilot Fundamentals

**Description:**
Sets the stage. Trainers learn what GitHub Copilot is, how the underlying LLM works at a high level, what data policies apply, and how to set up the development environment. Trainees leave with Copilot installed, configured, and producing their first AI-assisted code.

**Trainer Content Outline (1 hour):**

- What is GitHub Copilot? Architecture overview, LLM basics
- Enterprise Cloud access, policy controls, and the delivery preflight
- Usage and billing fundamentals using live official GitHub documentation, not static prices, allowances, or model tables
- Privacy, data handling, and telemetry — what code is sent, what isn't
- Supported IDEs and language coverage
- Installation and activation walkthrough
- First demo: writing a function with Copilot suggestions
- Next Edit Suggestions (NES) — predictive follow-up edits
- Setting expectations — what Copilot does well, where it struggles
- Q&A framework for common objections

**Lab Outline (2 hours):**

- Install and configure GitHub Copilot in VS Code
- Accept, reject, and cycle through inline suggestions
- Enable and experiment with Next Edit Suggestions
- Write 3–5 functions across different languages (Python, JavaScript, TypeScript)
- Compare Copilot output with manually written code
- Document observations: where was Copilot helpful? Where did it miss?
- **Deliverable:** A small multi-function utility file generated with Copilot assistance

**Expected Learning Outcomes:**

- Explain what GitHub Copilot is and how it generates suggestions
- Explain Enterprise access, delivery preflight, and usage-based billing basics using current official documentation
- Install and configure Copilot in VS Code
- Accept, reject, and navigate inline suggestions and NES
- Identify scenarios where Copilot excels vs. where human judgment is critical

---

### Session 02 — Copilot Chat & Inline Suggestions

**Difficulty:** Beginner
**Prerequisites:** Session 01
**Module:** Copilot Fundamentals

**Description:**
Deepens the daily developer workflow. Covers Copilot Chat (sidebar, inline, quick chat), slash commands, chat participants (@workspace, @terminal, @vscode), model selection, and strategies for integrating Copilot into routine development tasks.

**Trainer Content Outline (1 hour):**

- Copilot Chat UI surfaces: sidebar, inline, quick chat, terminal
- Chat participants: @workspace, @terminal, @vscode — when to use each
- Slash commands: /explain, /fix, /tests, /doc, /new
- Context management: #file, #selection, #editor references
- Model selection: a task, quality, governance, and cost framework backed by the current official model reference
- Auto selection and metered-usage tradeoffs without hard-coded rates
- Conversational workflows: iterating on code through dialogue
- Demo: debugging a bug using Chat + inline suggestions together

**Lab Outline (2 hours):**

- Use Copilot Chat to explain unfamiliar code in a provided repository
- Debug 3 intentionally broken functions using /fix and conversational Chat
- Generate unit tests with /tests for an existing module
- Use @workspace to answer questions about a multi-file project
- Use @terminal to troubleshoot a failing build command
- Compare available models only when the customer’s policy and current official reference allow them
- **Deliverable:** A debugged and tested module with Chat conversation history documented

**Expected Learning Outcomes:**

- Use all Copilot Chat surfaces effectively
- Apply slash commands for common tasks (explain, fix, test, document)
- Reference specific files and selections in Chat context
- Choose models with the live-doc selection framework

---

### Session 03 — Prompt Engineering Fundamentals

**Difficulty:** Beginner
**Prerequisites:** Sessions 01–02
**Module:** Copilot Fundamentals

**Description:**
Teaches the art and science of writing effective prompts for Copilot. Covers the structure of good prompts, context provision strategies, iterative refinement, and common anti-patterns. This is the foundation session that makes all subsequent sessions more effective.

**Trainer Content Outline (1 hour):**

- Why prompts matter: garbage in, garbage out
- Anatomy of a good prompt: intent, context, constraints, examples
- The "neighboring tabs" effect — how open files influence suggestions
- Comment-driven development: using comments as prompts
- Iterative prompting: refining output through follow-up instructions
- Anti-patterns: vague prompts, over-specified prompts, prompt injection risks
- Demo: same task, three prompt strategies — compare results
- Prompt libraries and team-shared prompt patterns

**Lab Outline (2 hours):**

- Prompt challenge round: given a task, write the best prompt (timed exercises)
- Refactor a poorly prompted Copilot session into a well-prompted one
- Build a small REST API endpoint using only comment-driven prompting
- Experiment with context manipulation: open/close files, see how suggestions change
- Create a personal prompt cheat sheet for common development tasks
- **Deliverable:** A prompt engineering cheat sheet + a fully prompted REST endpoint

**Expected Learning Outcomes:**

- Write clear, structured prompts that produce accurate Copilot output
- Use context strategically (open files, comments, naming conventions)
- Identify and fix common prompting anti-patterns
- Create reusable prompt templates for repeated tasks

---

### Session 04 — GitHub Copilot in the CLI

**Difficulty:** Intermediate
**Prerequisites:** Sessions 01–03
**Module:** Copilot in Practice

**Description:**
Introduces GitHub Copilot's terminal-native experience via the standalone `copilot` CLI and CLI agent mode. Trainees learn to use Copilot directly from the command line — interactive chat, non-interactive prompts, shell script generation, troubleshooting, and autonomous agent tasks without leaving the terminal. This session bridges the gap between the foundational Copilot skills (Sessions 01–03) and the full IDE agent mode (Session 05), showing that Copilot is a multi-surface tool. Covers CLI-exclusive capabilities like piping command output to Copilot, remote/SSH workflows, and environments where the IDE isn't available.

**Trainer Content Outline (1 hour):**

- The Copilot surface spectrum: IDE ↔ Chat ↔ CLI — three ways to work
- Installing standalone `copilot` (`npm install -g @github/copilot`): prerequisites, authentication, terminal setup
- Interactive `copilot` mode — conversational terminal assistance for commands, code, and errors
- Non-interactive `copilot -p "<prompt>"` — generating answers, commands, and scripts from prompts
- Slash commands: `/plan`, `/agent`, `/skills`, `/mcp`, `/model`, and when to use each
- Plan and Autopilot modes: autonomous multi-step terminal tasks with planning and iteration
- CLI-exclusive capabilities: piping output to Copilot, log analysis, environment debugging
- Remote/SSH workflows: when the CLI is your only Copilot surface
- Demo: compare the same task (set up a Docker compose project) done via CLI vs. IDE
- CLI vs. IDE decision framework: when each surface is most effective
- Security considerations: what context the CLI sends, command execution trust boundaries
- Scripting with Copilot: generating, debugging, and iterating on shell scripts

**Lab Outline (2 hours):**

- Install standalone `copilot` and authenticate it for terminal use
- Use interactive `copilot` to explain progressively complex commands: simple → piped → scripted
- Use `copilot -p "<prompt>"` to generate commands for file operations, git workflows, Docker, and cloud CLIs
- Generate a multi-step shell script using Copilot CLI, then debug and refine it
- Use CLI agent mode to scaffold a project, install dependencies, and configure a development environment
- Pipe real command output (error logs, test results) to Copilot for analysis
- Side-by-side comparison: complete the same task in CLI and IDE, document tradeoffs
- Create a CLI workflow cheat sheet mapping common developer tasks to optimal Copilot surface
- **Deliverable:** A CLI workflow cheat sheet + a shell script generated and refined via Copilot CLI

**Expected Learning Outcomes:**

- Install and configure standalone `copilot` for terminal workflows
- Use interactive and non-interactive `copilot -p "<prompt>"` workflows effectively for daily terminal work
- Run Plan/Autopilot modes and built-in agents for autonomous multi-step terminal tasks
- Identify CLI-exclusive capabilities and workflows where CLI outperforms the IDE
- Apply the CLI vs. IDE decision framework to advise teams on surface selection
- Generate and iterate on shell scripts using Copilot CLI assistance

---

### Session 05 — Agent Mode in the IDE

**Difficulty:** Intermediate
**Prerequisites:** Sessions 01–03
**Module:** Copilot in Practice

**Description:**
The pivotal session. Introduces agent mode — Copilot's autonomous multi-step coding experience in VS Code and JetBrains. Agent mode plans, executes, runs terminal commands, iterates on errors, and integrates with MCP servers. This session establishes the mental model shift from "assistant" to "agent" and covers multi-file editing as a natural capability of agent mode. All subsequent sessions build on agent mode fluency.

**Trainer Content Outline (1 hour):**

- What is "agentic" AI? From autocomplete → assistant → agent
- Agent mode in VS Code: how it works, what it can do
- The agent loop: plan → act → observe → iterate
- Tool use: terminal commands, file operations, web search
- Multi-file changes: how agent mode handles cross-file edits autonomously
- Trust boundaries: what agents should and shouldn't do autonomously
- Demo: agent mode solving a multi-step task (create feature, write tests, fix build)
- Comparison: same task done via Chat vs. Agent mode
- When to use agent mode vs. when to stay in Chat
- TODO code actions: delegate tasks to the cloud agent from comments

**Lab Outline (2 hours):**

- Use agent mode to scaffold a new project from a description
- Have the agent create, test, and debug a feature end-to-end
- Refactor a module across 4–5 files using agent mode (multi-file editing)
- Observe the agent's tool use: terminal commands, file edits, iterations
- Intervene mid-task: redirect the agent, add constraints, correct course
- Use TODO code actions to delegate a task to the cloud agent
- Compare: complete the same task manually vs. with agent mode — document differences
- **Deliverable:** A feature built entirely via agent mode, with a reflection on the agent's decision-making

**Expected Learning Outcomes:**

- Explain the difference between assistant and agentic AI
- Use agent mode in VS Code for multi-step, multi-file tasks
- Understand the agent loop (plan, act, observe, iterate)
- Know when to use agent mode vs. Chat vs. inline suggestions
- Use TODO code actions to bridge IDE and cloud agent workflows

---

### Session 06 — Copilot Spaces & Context Management

**Difficulty:** Intermediate
**Prerequisites:** Sessions 01–03
**Module:** Copilot in Practice

**Description:**
Covers how to give Copilot the right context for better results. Introduces Copilot Spaces — curated context sets that ground Copilot in the right code, docs, and specs. Also covers custom instructions (`.github/copilot-instructions.md`), reusable prompt files (`.github/prompts/`), Copilot Memory, and VS Code-level instruction configuration.

**Trainer Content Outline (1 hour):**

- The context problem: why Copilot needs grounding
- Copilot Spaces: organizing code, docs, issues, and specs into curated sets
- Creating and sharing Spaces across teams
- Custom instructions per Space for specialized workflows
- `.github/copilot-instructions.md` — project-level instructions
- `.github/prompts/*.md` — reusable prompt files for team tasks
- VS Code settings: `github.copilot.chat.codeGeneration.useInstructionFiles`
- Copilot Memory: how the agent remembers and validates knowledge (Preview)
- Demo: before/after — same prompt with and without Space context
- Maintenance: keeping Spaces and instructions current as projects evolve

**Lab Outline (2 hours):**

- Create a Copilot Space for a provided multi-repo project
- Add relevant files, docs, and specs to the Space
- Set custom instructions for the Space and observe behavior changes
- Create a `copilot-instructions.md` for a provided project with specific coding standards
- Build 3 reusable prompt files for common team tasks
- Compare Copilot's responses: no context vs. instructions vs. Space
- **Deliverable:** A complete Copilot Space + custom instructions setup with before/after comparison

**Expected Learning Outcomes:**

- Create and configure Copilot Spaces for team workflows
- Write project-level and user-level custom instructions
- Create reusable prompt files for team standards
- Explain the context hierarchy: instructions → Spaces → Memory
- Maintain and iterate on context configurations as projects evolve

---

### Session 07 — Copilot for Code Review & Pull Requests

**Difficulty:** Intermediate
**Prerequisites:** Sessions 01–03
**Module:** Copilot in Practice

**Description:**
Focuses on using Copilot in the code review process. Covers Copilot-generated PR summaries, AI code review, review comments with suggested fixes, and how to use Copilot as a first-pass reviewer. Also covers merge conflict resolution via the cloud agent.

**Trainer Content Outline (1 hour):**

- Copilot in the PR workflow: summaries, review comments, suggestions
- Requesting Copilot review on a PR (manual and automatic)
- Configuring automatic reviews at repo and org level
- Copilot-generated commit messages and PR descriptions
- Quality gates: using Copilot review as a pre-human-review step
- Merge conflict resolution with the cloud agent
- Demo: a complete PR lifecycle with Copilot assistance
- Limitations: what Copilot review catches vs. what it misses
- Team adoption patterns for Copilot-assisted review

**Lab Outline (2 hours):**

- Create a feature branch with intentional code quality issues
- Open a PR and request Copilot review
- Analyze Copilot's review comments — which are valid? Which are noise?
- Apply Copilot's suggested fixes with one-click
- Use Copilot to generate a PR summary and improve commit messages
- Create a merge conflict and resolve it via the cloud agent
- Practice the reviewer workflow: use Copilot to assist your own review of a partner's PR
- **Deliverable:** A PR with Copilot review, human review layered on top, and a reflection on review quality

**Expected Learning Outcomes:**

- Use Copilot to generate PR summaries and review comments
- Configure automatic Copilot reviews at repo/org level
- Evaluate Copilot review quality and identify blind spots
- Resolve merge conflicts using the cloud agent
- Integrate Copilot into a team code review workflow

---

### Session 08 — Copilot App, Plugins & Canvas Extensions

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–07
**Module:** Agentic Workflows

**Description:**
Introduces the GitHub Copilot App as a customizable work surface. Trainers use the Customize area to explain plugins, skills, MCP servers, and canvases. Learners create a small canvas for a synthetic workflow, then review its state, actions, data boundary, ownership, and fallback.

**Trainer Content Outline (1 hour):**

- Copilot App sessions and the Customize area
- Plugins, skills, MCP servers, and canvases: separate responsibilities
- Canvas model: a shared artifact with direct user actions and agent-callable capabilities
- Choosing a canvas for visible state, steering, or a handoff artifact
- Project scope (`.github/extensions/`) and personal scope (`~/.copilot/extensions/`)
- Demo: create a delivery-readiness canvas with `/create-canvas`
- Design review: state, user actions, agent capabilities, validation, ownership, and fallback
- Security: synthetic data, approved actions, least privilege, and no-access fallback

**Lab Outline (2 hours):**

- Review a synthetic delivery-readiness workflow and its data boundary
- Define the canvas state, user actions, agent capabilities, and validation evidence
- Create the canvas with `/create-canvas` on an approved Copilot App surface
- Add one bounded user action and one agent-callable capability
- Test direct edits and agent updates against the same shared artifact
- Complete a peer review of scope, data, actions, owner, and fallback
- **Deliverable:** A reviewed canvas brief and a canvas created in an approved sandbox, or the manual fallback record

**Expected Learning Outcomes:**

- Explain how a canvas differs from instructions, skills, custom agents, and MCP servers
- Build a bounded canvas in the Copilot App
- Define user actions and agent capabilities around shared state
- Review canvas scope, data handling, ownership, and fallback before use

---

### Session 09 — Copilot Cloud Agent

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–07
**Module:** Agentic Workflows

**Description:**
Covers the GitHub Copilot cloud agent — assigning GitHub issues directly to Copilot for autonomous resolution. Copilot creates a branch, writes code, runs builds and tests in an isolated environment, and opens a draft PR. Includes third-party coding agents (Claude, Codex) and agent session management.

**Trainer Content Outline (1 hour):**

- What is the cloud agent? Cloud-based, issue-driven, async
- How it works: assign issue → agent creates branch → writes code → opens draft PR
- Configuring the cloud agent: `copilot-setup-steps.yml`, firewall rules, runner config
- Writing good issues for the cloud agent (specificity, acceptance criteria)
- The `copilot-instructions.md` role in guiding agent behavior
- Third-party agents: Claude (@claude) and Codex (@codex) — assigning and comparing
- Agent session management: tracking progress across sessions
- Demo: assign an issue, watch the agent work, review the PR
- Security: network firewall, toolset restrictions, shell controls
- Team workflow: the cloud agent as a junior developer on the team

**Lab Outline (2 hours):**

- Configure a repository for the Copilot cloud agent (`copilot-setup-steps.yml`)
- Write 3 issues of varying complexity and assign them to Copilot
- Assign the same issue to Copilot and a third-party agent — compare results
- Monitor agent progress via the Agent Sessions view
- Review the draft PRs: quality, correctness, test coverage
- Iterate: provide feedback via PR comments, watch the agent respond
- **Deliverable:** 3+ agent-completed PRs with review feedback documented

**Expected Learning Outcomes:**

- Configure a repository for the Copilot cloud agent
- Write effective issues that the cloud agent can resolve
- Use third-party coding agents (Claude, Codex) alongside Copilot
- Manage agent sessions and track progress
- Review and iterate on agent-generated PRs

---

### Session 10 — MCP Servers & Custom Tool Integration

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–07
**Module:** Agentic Workflows

**Description:**
Introduces the Model Context Protocol (MCP) — an open standard for connecting AI models to external tools and data sources. Covers MCP server architecture, configuration in VS Code and GitHub, and building custom MCP servers to extend Copilot's capabilities. Enterprise registry, allowlist, data-handling, and approval decisions are handled authoritatively in Session 17.

**Trainer Content Outline (1 hour):**

- What is MCP? The "USB-C for AI" — standardized tool integration
- MCP architecture: clients, servers, transports (stdio, SSE, streamable HTTP)
- Built-in MCP support in VS Code, GitHub.com, and cloud agent
- Configuring MCP servers: `mcp.json`, workspace vs. user settings
- Organization-level MCP registry management
- Available MCP servers: GitHub, filesystem, databases, APIs
- Demo: connect an MCP server and use it via Copilot agent mode
- Building a custom MCP server (Node.js / Python)
- Security considerations: tool approval, transport security, org policies

**Lab Outline (2 hours):**

- Configure the GitHub MCP server and use it to query issues/PRs from agent mode
- Connect a database MCP server and query data conversationally
- Build a simple custom MCP server that exposes a REST API as tools
- Test the custom server in VS Code with Copilot agent mode
- Add tool descriptions and parameter schemas for better Copilot interaction
- **Deliverable:** A working custom MCP server with 2–3 tools, integrated into VS Code

**Expected Learning Outcomes:**

- Explain MCP architecture and the client-server model
- Configure existing MCP servers in VS Code and at the org level
- Build a custom MCP server with typed tools
- Understand security and trust boundaries for MCP tools

---

### Session 11 — Custom Agents & Agent Profiles

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–07, 10
**Module:** Agentic Workflows

**Description:**
Covers building custom GitHub agents — specialized AI teammates defined via Markdown files with YAML frontmatter. Custom agents live in `.github/agents/`, specify their own instructions, tools, and MCP servers, and can be invoked by name in Copilot Chat, cloud agent, and CLI. This is the modern extensibility model.

**Trainer Content Outline (1 hour):**

- What are custom agents? Specialized AI teammates via `.github/agents/`
- Agent profile anatomy: name, description, prompt, tools, MCP servers
- Repository, organization, and enterprise-level agents
- Creating agents for specific domains: test-writer, readme-creator, security-reviewer
- Agent tool configuration: which tools and MCP servers each agent can use
- Invoking custom agents: Chat, cloud agent, CLI
- Comparison: custom agents vs. MCP servers vs. custom instructions — when to use each
- Demo: build a custom agent and assign it work
- Enterprise distribution: sharing agents across an organization

**Lab Outline (2 hours):**

- Create a custom agent profile (`.github/agents/test-writer.md`) that specializes in writing tests
- Create a second agent for documentation generation
- Configure each agent with specific tools and MCP servers
- Test agents via Copilot Chat: invoke by name, observe specialized behavior
- Assign a GitHub issue to a custom agent and review the results
- Iterate on agent instructions based on output quality
- **Deliverable:** 2 working custom agents deployed in a repository, with test results documented

**Expected Learning Outcomes:**

- Create custom agent profiles using `.github/agents/` Markdown files
- Configure agent-specific tools, MCP servers, and instructions
- Invoke custom agents across Copilot Chat, cloud agent, and CLI
- Evaluate when to build a custom agent vs. use MCP vs. use custom instructions
- Distribute agents at the organization level

---

### Session 12 — Agent Skills & the Copilot Ecosystem

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–07, 11
**Module:** Agentic Workflows

**Description:**
Introduces agent skills — folders of instructions, scripts, and resources that Copilot loads to improve performance on specialized tasks. Covers creating skills, the open Agent Skills specification, personal vs. project skills, and notable community contributions. Showcases real-world custom agents and skills from the GitHub community.

**Trainer Content Outline (1 hour):**

- What are agent skills? Specialized knowledge packs for Copilot
- Skills specification: `.github/skills/` for versioned team delivery
- Project-shared skills: `.github/skills/` — versioned team guidance
- Skill anatomy: SKILL.md format, when skills are loaded, confidence levels
- Creating skills for common workflows: deployment, testing, code review
- Community ecosystem: `github/awesome-copilot`, `anthropics/skills`
- Notable community examples: real-world agents and skills in production
- Demo: create a skill, observe behavior change, share it
- Composing agents + skills + MCP for powerful workflows
- The future: skill marketplaces and discovery

**Lab Outline (2 hours):**

- Create a project skill (`.github/skills/api-design/SKILL.md`) for API design patterns
- Create a personal skill for a preferred workflow
- Install a community skill from `github/awesome-copilot` and test it
- Combine a custom agent + skill + MCP server into an integrated workflow
- Document a "skill catalog" for a fictional team: which skills would benefit them?
- **Deliverable:** 2 custom skills (project + personal), 1 community skill installed, integrated workflow demo

**Expected Learning Outcomes:**

- Create project-level and personal agent skills
- Understand the Agent Skills specification and SKILL.md format
- Discover and install community skills
- Compose agents, skills, and MCP servers into integrated workflows
- Curate a skill catalog for a development team

---

### Session 13 — GitHub Actions & Workflow Generation

**Difficulty:** Intermediate
**Prerequisites:** Sessions 01–05
**Module:** DevOps & Infrastructure with Copilot

**Description:**
Covers using Copilot to generate, explain, and debug GitHub Actions workflows. Trainers learn to leverage agent mode for creating CI/CD pipelines, custom Actions, and workflow automation from natural language descriptions.

**Trainer Content Outline (1 hour):**

- GitHub Actions fundamentals recap (for context)
- Using Copilot Chat to generate workflow YAML
- Agent mode for Actions: creating complete CI/CD pipelines
- Workflow debugging with Copilot: reading logs, fixing failures
- Creating custom Actions with Copilot assistance
- Reusable workflows and composite actions
- Demo: generate a complete CI/CD pipeline from a project description
- Best practices: workflow security, secrets management, caching
- Copilot cloud agent + Actions: how the agent uses Actions for build/test

**Lab Outline (2 hours):**

- Generate a CI workflow for a provided Node.js project using agent mode
- Add CD (deployment) steps to the workflow via Copilot Chat
- Debug 2 intentionally broken workflows using Copilot
- Create a custom Action that runs a specific tool
- Set up branch protection rules that require CI to pass
- **Deliverable:** A complete CI/CD pipeline with custom Action, tested and passing

**Expected Learning Outcomes:**

- Generate GitHub Actions workflows using Copilot agent mode and Chat
- Debug failing workflows with Copilot assistance
- Create custom Actions with Copilot
- Understand the relationship between Copilot cloud agent and GitHub Actions
- Apply security best practices to generated workflows

---

### Session 14 — Infrastructure as Code with Copilot

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–05, 13
**Module:** DevOps & Infrastructure with Copilot

**Description:**
Covers using Copilot to write, refactor, and manage Infrastructure as Code. Focuses on Terraform and Bicep — the two most common IaC languages — with Copilot agent mode generating, explaining, and iterating on infrastructure definitions.

**Trainer Content Outline (1 hour):**

- IaC fundamentals: why infrastructure as code matters
- Copilot for Terraform: generating modules, variables, state management
- Copilot for Bicep: ARM template generation, Azure resource definitions
- Agent mode for IaC: multi-file infrastructure projects
- Copilot Spaces for IaC: grounding Copilot in cloud documentation
- Security: avoiding common IaC anti-patterns (open security groups, hardcoded secrets)
- Demo: generate a complete cloud infrastructure from requirements
- Validating generated IaC: terraform plan, bicep build, linting

**Lab Outline (2 hours):**

- Generate a Terraform module for a 3-tier web application using agent mode
- Generate equivalent Bicep templates for the same architecture
- Refactor an insecure IaC configuration — fix security issues with Copilot
- Use Copilot Spaces to ground IaC generation in cloud provider docs
- Validate all generated code: plan, build, lint
- **Deliverable:** Terraform + Bicep definitions for a 3-tier app, validated and security-reviewed

**Expected Learning Outcomes:**

- Generate Terraform and Bicep code using Copilot agent mode
- Use Copilot Spaces to ground IaC in cloud provider documentation
- Identify and fix security anti-patterns in generated IaC
- Validate generated infrastructure code using native tools

---

### Session 15 — CI/CD Pipeline Debugging & Agentic Remediation

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–05, 13
**Module:** DevOps & Infrastructure with Copilot

**Description:**
Covers advanced CI/CD debugging with Copilot assistance and an approved, reviewable agentic remediation workflow for security findings. Trainers learn to diagnose pipeline failures, optimize build times, and safely route remediation work through the organization’s controls.

**Trainer Content Outline (1 hour):**

- Diagnosing pipeline failures: logs, error messages, Copilot analysis
- Code scanning findings and the "Assign to Copilot" remediation workflow
- Required review, branch protection, and security-owner gates before merge
- Availability, policy, and licensing checks using live official documentation
- Pipeline optimization: caching, parallel jobs, conditional execution
- Demo: debug a complex pipeline failure using Copilot
- Demo: review a code-scanning finding, assign bounded remediation work, and review the resulting change
- Security-first CI/CD: integrating scanning into every pipeline

**Lab Outline (2 hours):**

- Debug 3 failing CI/CD pipelines of increasing complexity using Copilot
- Enable CodeQL scanning on a repository with known vulnerabilities
- Route a security finding through the approved agentic remediation workflow and review the proposed change
- Optimize a slow pipeline: add caching, parallelize jobs
- (Stretch) Compare a manual and agentic remediation path under the same review policy
- **Deliverable:** 3 fixed pipelines + a reviewed remediation proposal with required approval evidence

**Expected Learning Outcomes:**

- Diagnose and fix CI/CD pipeline failures with Copilot assistance
- Configure code scanning and use the approved agentic remediation workflow
- Optimize pipeline performance with Copilot suggestions
- Integrate security scanning into CI/CD workflows
- Apply human review and policy controls to agentic security remediation

---

### Session 16 — Multi-Agent Team Orchestration

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–07 and 09–12
**Module:** Advanced Topics & Capstone

**Description:**
An optional advanced session on multi-agent orchestration patterns. [`bradygaster/squad`](https://github.com/bradygaster/squad) is the worked community-tool example, not a required product dependency. Trainers learn to define roles, route work, manage decisions, and decide when a single well-bounded agent is safer than a team.

**Trainer Content Outline (1 hour):**

- When multi-agent orchestration is warranted, and when it is not
- Squad as a community-tool example, with a vendor-neutral orchestration model
- Team composition: casting agents, assigning roles, defining charters
- The coordinator pattern: routing work to the right agent
- Shared memory: decisions, history, skills, orchestration logs
- Ralph — the work monitor: continuous development loops
- GitHub Issues integration: issue-driven agent development
- MCP integration with Squad: extending agent capabilities
- Demo: initialize a Squad team, assign work, observe agent collaboration
- Advanced patterns: reviewer gates, parallel fan-out, worktree management
- When Squad adds value vs. when individual agents suffice

**Lab Outline (2 hours):**

- Use the provided Squad example or a no-install role-play fallback
- Cast a team: lead, frontend, backend, tester, scribe
- Assign work to individual agents and observe output
- Set up GitHub Issues integration — watch agents pick up and complete issues
- Configure custom ceremonies (design meetings, retros)
- Run Ralph's work-check loop on a backlog of issues
- **Deliverable:** A fully configured Squad team with completed issues, decision log, and agent memories

**Expected Learning Outcomes:**

- Evaluate and configure a multi-agent orchestration approach for a development project
- Cast agent teams with appropriate roles and charters
- Route work to agents and manage multi-agent collaboration
- Use Ralph for continuous development monitoring
- Integrate Squad with GitHub Issues for issue-driven development

---

### Session 17 — Enterprise Governance, Policies & Analytics

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–03
**Module:** Advanced Topics & Capstone

**Description:**
Covers the enterprise side of Copilot and is the authoritative governance and cost-control session for capstone and administrator delivery paths. It is also accessible after Module 1 for managers and IT leadership. Trainers learn to validate customer-specific access rather than teaching static commercial or model facts.

**Trainer Content Outline (1 hour):**

- Enterprise Cloud as the delivery baseline; Business only when it materially changes feasibility
- Organization policies: enabling/disabling features, seat management
- Content exclusions: preventing Copilot from accessing sensitive repos/paths
- MCP registry and server access policies
- Audit logs: tracking Copilot usage and events
- Usage analytics: adoption metrics, acceptance rates, cloud agent activity
- Data, retention, residency, compliance, and legal questions: how to use live official documentation and the customer’s approved policy sources
- Metered usage, budgets, stop guards, and lab-cost controls
- Model-selection governance: task fit, quality, approved availability, and cost
- Rollout strategies: pilot → team → org → enterprise
- Demo: walking through the GitHub admin panels for Copilot management
- Change management: addressing developer concerns and resistance

**Lab Outline (2 hours):**

- Configure organization-level Copilot policies (simulated environment)
- Set up content exclusions for sensitive directories
- Configure MCP registry and server access policies in the simulated environment
- Review audit logs and identify usage patterns
- Build a rollout plan for a fictional 500-person engineering org
- Create a "Copilot Champion" program outline for grassroots adoption
- **Deliverable:** A complete enterprise rollout plan document with policies, exclusions, and adoption metrics

**Expected Learning Outcomes:**

- Configure organization-level Copilot policies, content exclusions, and MCP registries
- Read and interpret Copilot usage analytics
- Create a delivery preflight covering access, policy, data handling, metering, and no-access fallback
- Design an enterprise rollout strategy with measurable milestones
- Address common enterprise concerns (security, IP, compliance)

---

### Session 18 — Spec Kit: Enterprise Specification-Driven Development

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–12 and 17
**Module:** Advanced Topics & Capstone

**Description:**
Teaches a repeatable specification-driven development method before implementation begins. Trainees use Spec Kit as the practical example to convert enterprise requirements into a constitution, specification, plan, tasks, and an implementation handoff. The session uses a small, language-agnostic flow rather than a full application build.

**Trainer Content Outline (1 hour):**

- Why enterprise delivery needs an explicit specification and constitution
- Specification-driven flow: constitution → specify → clarify → plan → checklist → tasks → analyze → implement → converge
- Spec Kit as an open-source, pre-1.0 implementation example; pin the customer-approved version
- Copilot integration with project-shared skills under `.github/skills/`
- Private catalog, air-gapped, and no-install delivery alternatives
- How to translate artifacts into a coding-agent-ready issue or task

**Lab Outline (2 hours):**

- Complete a 45–60 minute small-feature flow from constitution through a reviewed implementation handoff
- Use the prepared artifacts if the tool is unavailable, blocked by policy, or unsuitable for the customer network
- Review the deliverables against governance, access, and acceptance criteria
- **Deliverable:** A constitution, specification, plan, tasks, and implementation handoff for a bounded feature

**Expected Learning Outcomes:**

- Apply specification-driven development to a bounded feature
- Configure or consume a project-shared Copilot skill integration
- Produce implementation-ready artifacts with acceptance and governance criteria
- Adapt the method for customer catalog, network, and policy constraints

---

### Session 19 — End-to-End Capstone Project

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–12 and 17–18; Session 16 is optional
**Module:** Advanced Topics & Capstone

**Description:**
The capstone is a bounded integration scenario, not a full production build. Trainees connect a governed specification, a single agentic implementation task, review evidence, and a handover decision in one realistic two-hour lab.

**Trainer Content Outline (1 hour):**

- Recap: governance and specification before implementation
- Selecting the smallest safe toolchain for a customer scenario
- Issue → agent → review → handover, with required human gates
- How to adapt the scenario for customer access and policy limits
- Trainer readiness and delivery debrief

**Lab Outline (2 hours):**

- Use the provided feature brief and governance constraints
- Select or consume a prepared specification artifact from Session 18
- Create one implementation-ready issue and complete one bounded agentic task
- Review the change against acceptance criteria and policy constraints
- Record the handover decision and retrospective
- **Deliverable:** A reviewed, handoff-ready feature change with governance evidence

---

## Delivery Notes

- **Total track duration:** 57 hours (19 sessions × 3 hours each)
- **Recommended delivery schedules:**
  - Intensive: 3 sessions/day × 6 days, plus the capstone day
  - Standard: 2 sessions/day × 9 days, plus the capstone day
  - Extended: 1 session/day × 19 days, or 3 sessions/week over about 7 weeks
- **Group size:** 8–15 trainees per cohort for optimal lab support
- **Module independence:**
  - Modules 1–3 form the core track (required for full certification)
  - Module 4 (DevOps) can be delivered independently with Module 1 + Session 05 as prereqs
  - Session 17 (Enterprise) can be delivered standalone with Module 1 for admin audiences and is required before the capstone
  - Session 16 is optional; it is not a prerequisite for Session 18 or Session 19
- **Trainer prep time:** Allocate 2 hours prep per session for first-time delivery
- **Feature status notes:** Sessions covering Preview features (Copilot Memory, third-party agents) should include availability disclaimers and be updated as features reach GA.
