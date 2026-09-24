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
12. **Teach** product and delivery teams to use the GitHub Copilot app, create durable planning artifacts, and supervise agent work without requiring programming
13. **Use** GitHub MCP, canvases, orchestration, and Automations with explicit review and verification

---

## Curriculum Architecture

### Modules & Tracks

The curriculum is organized into **7 modules**. Modules 1–3 form the technical core. Modules 4–7 are role-based or technical electives that trainers can combine for their audience.

```
Module 1: Copilot Fundamentals ──────────────── (Beginner, 3 sessions)
    │
Module 2: Copilot in Practice ──────────────── (Intermediate–Advanced, 6 sessions)
    │
Module 3: Agentic Workflows ───────────────── (Advanced, 5 sessions)
    │
    ├── Module 4: DevOps & Infrastructure ──── (Intermediate–Advanced, 3 sessions)
    │   └── Requires: Module 1 + Session 05
    │
    ├── Module 5: Specification-Driven Frameworks ─ (Advanced, 3 sessions)
    │   └── Uses Squad, Spec Kit, and HVE as worked framework examples
    │
    └── Module 6: Advanced Topics & Capstone ─────── (Advanced, 2 sessions)
        └── Requires: Modules 1–3; Sessions 17–18 are required before the capstone

Module 7: Product and Delivery Teams ─────────────── (Beginner–Intermediate, 6 sessions)
    └── Standalone role-based path; no programming prerequisite
```

### Delivery Flexibility

| Audience                  | Recommended Path                 | Sessions     | Duration   |
| ------------------------- | -------------------------------- | ------------ | ---------- |
| **Copilot Beginners**     | Module 1 only                    | 01–03        | 9 hrs      |
| **Copilot Practitioners** | Modules 1–2                      | 01–07, 27, 26 | 27 hrs    |
| **Agentic Developers**    | Modules 1–3                      | 01–12        | 36 hrs     |
| **DevOps Engineers**      | Module 1 + Session 05 + Module 4 | 01–05, 13–15 | 21 hrs     |
| **Enterprise Admins**     | Module 1 + Session 17            | 01–03, 17    | 12 hrs     |
| **Product and Delivery Teams** | Module 7                    | 20–25        | 18 hrs     |
| **HVE Practitioners**     | HVE Engineering                  | 01–07, 10–11, 28 | 31 hrs |
| **Full Track**            | All Modules                      | 01–28        | 85 hrs     |

---

## Session Plan

### Module 1: Copilot Fundamentals (Beginner)

| #   | Session                           | Difficulty  | Prerequisites   | Duration   |
| --- | --------------------------------- | ----------- | --------------- | ---------- |
| 01  | Introduction to GitHub Copilot    | Beginner    | None            | 3 hrs      |
| 02  | Copilot Chat & Inline Suggestions | Beginner    | Session 01      | 3 hrs      |
| 03  | Prompt Engineering Fundamentals   | Beginner    | Sessions 01–02  | 3 hrs      |

### Module 2: Copilot in Practice (Intermediate–Advanced)

| #   | Session                                   | Difficulty   | Prerequisites   | Duration   |
| --- | ----------------------------------------- | ------------ | --------------- | ---------- |
| 04  | GitHub Copilot in the CLI                 | Intermediate | Sessions 01–03  | 3 hrs      |
| 05  | Agent Mode in the IDE                     | Intermediate | Sessions 01–04  | 3 hrs      |
| 06  | Copilot Spaces & Context Management       | Intermediate | Sessions 01–05  | 3 hrs      |
| 07  | Copilot for Code Review & Pull Requests   | Intermediate | Sessions 01–06  | 3 hrs      |
| 27  | Repair and Refactor a Broken Python Application | Intermediate | Sessions 01–07 | 3 hrs |
| 26  | Migrate a Legacy Java Service to Modern .NET | Advanced | Sessions 01–07 | 3 hrs |

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
| 14  | Infrastructure as Code with Copilot        | Advanced     | Sessions 01–05, 13 | 2 hrs 30 min |
| 15  | CI/CD Pipeline Debugging & Agentic Remediation | Advanced | Sessions 01–05, 13 | 3 hrs      |

### Module 5: Specification-Driven Frameworks (Advanced)

| #   | Session                                     | Difficulty  | Prerequisites      | Duration   |
| --- | ------------------------------------------- | ----------- | ------------------ | ---------- |
| 16  | Brady's Squad: Human-Led AI Teams           | Advanced    | Sessions 01–12 | 3 hrs   |
| 18  | Spec Kit: Enterprise Specification-Driven Development | Advanced | Sessions 01–12, 17 | 3 hrs |
| 28  | HVE Core: Evidence-Led Delivery with RPI | Advanced | Sessions 01–07, 10–11 | 4 hrs |

### Module 6: Advanced Topics & Capstone (Advanced)

| #   | Session                                     | Difficulty  | Prerequisites      | Duration   |
| --- | ------------------------------------------- | ----------- | ------------------ | ---------- |
| 17  | Enterprise Governance, Policies & Analytics | Advanced    | Sessions 01–03     | 3 hrs      |
| 19  | End-to-End Capstone Project                 | Advanced    | Sessions 01–12, 17–18 | 3 hrs |

### Module 7: Product and Delivery Teams (Beginner–Intermediate)

| # | Session | Difficulty | Prerequisites | Duration |
| --- | --- | --- | --- | --- |
| 20 | Work Effectively in the GitHub Copilot App | Beginner | GitHub Copilot app access | 3 hrs |
| 21 | Interview Ideas and Shape Better Work | Beginner | Session 20 | 3 hrs |
| 22 | Plan Work with GitHub Issues and MCP | Intermediate | Sessions 20–21; GitHub MCP write access | 3 hrs |
| 23 | Build and Use a Planning Canvas | Intermediate | Sessions 20–22; canvas creation access | 3 hrs |
| 24 | Orchestrate Agents and Workstreams | Intermediate | Sessions 20–23; orchestration access | 3 hrs |
| 25 | Automate Delivery Follow-up and Connect Work Systems | Intermediate | Sessions 20–24; Automations and GitHub MCP access | 3 hrs |

**Access requirement:** GitHub Copilot access is required for Sessions 20–25.
Learners without access should not start Module 7. Stop and reschedule their
training after access is available.

**Trainer-only supplement:** A trainer may prepare the Azure Boards route before
the workshop when the delivery plan requires it. The standard learner path uses
GitHub issues and does not branch into an alternate platform exercise.

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

**Lab Outline (2 hours 30 minutes):**

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
**Prerequisites:** Sessions 01–04
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
**Prerequisites:** Sessions 01–05
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
**Prerequisites:** Sessions 01–06
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
**Duration:** 2 hours 30 minutes

**Description:**
Uses Copilot to build and connect one modular Terraform architecture, validate it
locally, and repair a configuration that fails a deterministic security gate.
Bicep remains a short trainer comparison and optional extension.

**Trainer Content Outline (1 hour):**

- Read architecture requirements as module contracts.
- Separate root inputs, module inputs, and narrow outputs.
- Generate and review network, compute, and database modules.
- Run formatting, initialization, and validation in order.
- Investigate one intentional security-gate failure.
- Explain what local checks prove and what still needs a reviewed plan.
- Compare the equivalent Bicep structure without creating a second required build.

**Lab Outline (1 hour 30 minutes):**

- Inspect the supplied architecture and module contracts.
- Build and connect the Terraform modules.
- Run `terraform fmt`, `terraform init -backend=false`, and `terraform validate`.
- Reproduce and investigate the supplied security-gate failure.
- Repair the security case and record passing evidence.
- **Deliverable:** Validated Terraform modules, a repaired security case, and command evidence.

**Expected Learning Outcomes:**

- Generate Terraform modules from fixed architecture constraints.
- Connect module inputs and outputs without copying values between layers.
- Run local Terraform checks in the correct order.
- Identify and fix security problems supported by the architecture.
- Explain why local validation does not approve a deployment.

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

### Session 16 — Brady's Squad: Human-Led AI Teams

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–07 and 09–12
**Module:** Specification-Driven Frameworks

**Description:**
An optional advanced session on the [Brady's Squad](https://github.com/bradygaster/squad) framework. Learners use a scoped issue as the work contract, then define roles, route work, and review durable decisions. Squad is a worked example, not a required product dependency.

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

### Session 18 — Spec Kit: Specification-Driven Development

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–12 and 17
**Module:** Specification-Driven Frameworks
**Duration:** 3 hours 30 minutes

**Description:**
Uses Spec Kit to carry one bounded feature from a source request to working code. Trainees convert tasks into GitHub Issues, implement in stages, converge, then evolve the living specification to add restore behavior.

**Trainer Content Outline (1 hour):**

- Why requirements should be reviewed before implementation
- Specification-driven flow: constitution → specify → clarify → plan → checklist → tasks → analyze → implement → converge
- The generated `.specify/`, `specs/`, and Copilot integration files
- The difference between behavior in `spec.md` and technical choices in `plan.md`
- How analysis and convergence expose gaps
- Task-to-issue conversion and staged implementation
- Living-spec evolution and approved installation paths

**Lab Outline (2 hours):**

- Initialize Spec Kit in a runnable Python starter project
- Specify and clarify archive behavior
- Generate a plan, checklist, and dependency-ordered tasks
- Convert tasks into GitHub Issues
- Implement in stages, run unit tests, and converge
- Evolve the specification, plan, tasks, code, and tests for restore behavior
- **Deliverable:** Working archive and restore behavior with traceable artifacts, issues, passing tests, and a final convergence result

**Expected Learning Outcomes:**

- Apply specification-driven development to a bounded feature
- Identify the files that Spec Kit creates and the decisions the team owns
- Produce requirements, design artifacts, and tasks that trace to tests
- Use task-to-issue conversion and scoped implementation runs
- Use analysis before implementation and repeat the implement/converge loop
- Evolve a living specification without leaving downstream artifacts behind

---

### Session 28 — HVE Core: Evidence-Led Delivery with RPI

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–07 and 10–11, or equivalent experience
**Module:** Specification-Driven Frameworks
**Duration:** 4 hours

**Description:**
Learners use HVE Core to move a bounded Engineering Decision API feature from
product intent through Research, Plan, Implement, Review, Follow-up, and a human
delivery decision.

**Trainer Content Outline (1 hour):**

- HVE agents, prompts, instructions, and local tracking artifacts
- Direct RPI phase prompts and combined `/rpi` orchestration
- Repository context, targeted instructions, and bounded custom agents
- Product Manager Advisor and Agile Coach handoffs
- Review evidence, Follow-up routing, and the final human decision

**Lab Outline (3 hours):**

- Run Research and Plan before changing code
- Add repository context, a targeted JavaScript instruction, and a custom reviewer
- Refine the supplied intent with Product Manager Advisor and Agile Coach
- Implement and test the bounded API endpoint and container contract
- Run Review, inspect the evidence chain, and record the human decision
- **Deliverable:** A tested API slice with traceable HVE artifacts, customization
  evidence, product and Agile decisions, and a reviewed handoff

**Expected Learning Outcomes:**

- Explain how HVE components and tracking artifacts support RPI handoffs
- Run and inspect each direct RPI phase
- Prove that repository customizations changed a later phase
- Feed product and Agile decisions back into the implementation plan
- Use Follow-up to route defects or missing evidence without expanding scope
- Support a human approval, change request, or pause decision

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

### Session 20 — Work Effectively in the GitHub Copilot App

**Difficulty:** Beginner
**Prerequisites:** GitHub Copilot app access
**Module:** Product and Delivery Teams

**Description:**
Learners open the GitHub Copilot app, choose repository context, inspect the capabilities available in their environment, and create a reviewed working brief.

**Trainer Content Outline (1 hour):**

- Chats, Projects, My work, Search, Automations, and Customize
- Choosing the smallest approved context
- Skills, agents, MCP servers, canvases, and Automations
- The read, propose, review, write, and verify pattern

**Lab Outline (2 hours):**

- Compare an unscoped answer with a repository-grounded answer
- Create and commit a sourced working brief
- Apply approved late evidence through a focused revision
- Verify the saved brief in a fresh Copilot session
- **Deliverable:** A revised working brief with context comparison and fresh-session verification

---

### Session 21 — Interview Ideas and Shape Better Work

**Difficulty:** Beginner
**Prerequisites:** Session 20
**Module:** Product and Delivery Teams

**Description:**
Learners run a decision-tree interview in the GitHub Copilot app. They turn approved answers into a repository decision brief and issue proposal.

**Trainer Content Outline (1 hour):**

- Decision-tree interviews and question frontiers
- Facts, recommendations, and owner decisions
- Durable Markdown decision briefs
- Issue proposals with testable acceptance criteria

**Lab Outline (2 hours):**

- Install and verify the supplied `decision-interview` project skill
- Run a dependency-ordered Copilot interview
- Create the decision brief and issue proposal
- Reopen one decision branch after a late visibility constraint
- Verify the revised artifacts in a fresh session
- **Deliverable:** An installed project skill, revised decision brief, aligned issue proposal, and readiness result

---

### Session 22 — Plan Work with GitHub Issues and MCP

**Difficulty:** Intermediate
**Prerequisites:** Sessions 20-21; GitHub MCP write access
**Module:** Product and Delivery Teams

**Description:**
Learners use the GitHub MCP server to inspect existing work, propose an issue hierarchy, create the approved issues, and verify the result through a fresh read.

**Trainer Content Outline (1 hour):**

- MCP from the tool user's point of view
- Read and write boundaries
- Outcome-based decomposition
- Preview, approval, and fresh-read verification

**Lab Outline (2 hours):**

- Read the approved decision brief
- Search for duplicate issues and approved labels
- Plan one parent issue and three to five child issues
- Review and approve the complete GitHub write
- Retrieve the issues, apply one reviewed correction, and verify it through another fresh read
- **Deliverable:** A live issue hierarchy with create and correction evidence

---

### Session 23 — Build and Use a Planning Canvas

**Difficulty:** Intermediate
**Prerequisites:** Sessions 20-22; canvas creation access
**Module:** Product and Delivery Teams

**Description:**
Learners create a planning canvas from a plain-language request, load the Session 22 issues, and keep visible planning state aligned with GitHub and Copilot.

**Trainer Content Outline (1 hour):**

- When visible state is better than another chat
- `/create-canvas`
- Reviewing generated state and actions
- Ownership, recovery, and retirement

**Lab Outline (2 hours):**

- Define the minimum planning state
- Create and simplify the canvas
- Load issues through GitHub MCP
- Make one visible update and one Copilot-requested update
- Create a controlled GitHub state change and detect that the canvas is stale
- Refresh and reconcile the visible planning state
- **Deliverable:** A planning canvas with drift and reconciliation evidence

---

### Session 24 — Orchestrate Agents and Workstreams

**Difficulty:** Intermediate
**Prerequisites:** Sessions 20-23; live orchestration access
**Module:** Product and Delivery Teams

**Description:**
Learners select independent work from the issue plan and canvas, start child sessions, review each result, and update the approved plan.

**Trainer Content Outline (1 hour):**

- Parent objectives and independent workstreams
- Output packets and stop conditions
- Monitoring, redirecting, and stopping sessions
- Consolidating only accepted evidence

**Lab Outline (2 hours):**

- Select workstreams from the approved issues
- Run live GitHub Copilot orchestration
- Wait, redirect, stop, accept, or reject live child-session work
- Update the canvas and relevant GitHub issue
- **Deliverable:** An orchestration plan, intervention record, reviewed result packets, and verified plan updates

---

### Session 25 — Automate Delivery Follow-up and Connect Work Systems

**Difficulty:** Intermediate
**Prerequisites:** Sessions 20-24; Automations and GitHub MCP access
**Module:** Product and Delivery Teams

**Description:**
Learners turn one manual delivery follow-up into a draft-only GitHub Copilot Automation. They review one run and decide whether GitHub or Azure Boards remains authoritative.

**Trainer Content Outline (1 hour):**

- Choosing a useful recurring task
- Draft-only Automation configuration
- Minimum tools, evidence, and stop conditions
- GitHub and Azure Boards system-of-record decisions

**Lab Outline (2 hours):**

- Create the automation contract
- Configure a manual, draft-only Automation
- Run it against the first approved input version
- Apply an approved source change and run the same Automation again
- Compare both evidence packets and record keep, revise, disable, or pause
- Produce a stakeholder update and work-system handoff
- **Deliverable:** Two reviewed Automation runs and a system-of-record decision

---

### Session 26 — Migrate a Legacy Java Service to Modern .NET

**Difficulty:** Advanced
**Prerequisites:** Sessions 01–07
**Module:** Copilot in Practice
**Duration:** 3 hours

**Description:**
Learners inspect a legacy Java service, capture its required behavior, and migrate it to modern .NET without losing compatibility.

**Trainer Content Outline (1 hour):**

- Define the migration boundary before changing code
- Map Java structures and dependencies to .NET equivalents
- Preserve API behavior and error handling
- Use tests to compare the old and new implementations

**Lab Outline (2 hours):**

- Inspect the legacy service and its tests
- Build the modern .NET replacement in stages
- Fix compatibility gaps found by the test suite
- Record migration decisions and verification evidence
- **Deliverable:** A working .NET service with passing compatibility tests and a concise migration record

---

### Session 27 — Repair and Refactor a Broken Python Application

**Difficulty:** Intermediate
**Prerequisites:** Sessions 01–07
**Module:** Copilot in Practice
**Duration:** 3 hours

**Description:**
Learners diagnose a broken Python application, restore its expected behavior, and refactor it behind a stable test suite.

**Trainer Content Outline (1 hour):**

- Separate repair work from structural refactoring
- Trace failures from symptoms to root causes
- Strengthen tests before changing design
- Refactor in small steps with continuous verification

**Lab Outline (2 hours):**

- Reproduce the supplied failures
- Repair the application until the baseline tests pass
- Add focused tests for uncovered behavior
- Refactor the repaired code and rerun the full suite
- **Deliverable:** A repaired Python application with passing tests and documented refactoring decisions

---

## Delivery Notes

- **Total track duration:** 85 hours across 28 sessions
- **Recommended delivery schedules:**
  - Intensive: Up to 3 sessions/day across 10 days
  - Standard: 1–2 sessions/day across 15 days
  - Extended: 1 session/day across 28 days
- **Group size:** 8–15 trainees per cohort for optimal lab support
- **Module independence:**
  - Modules 1–3 form the core track (required for full certification)
  - Module 4 (DevOps) can be delivered independently with Module 1 + Session 05 as prereqs
  - Session 17 (Enterprise) can be delivered standalone with Module 1 for admin audiences and is required before the capstone
  - Session 16 is optional; it is not a prerequisite for Session 18 or Session 19
  - Session 28 is the final session in the HVE Engineering track and should run
    after Sessions 10–11
  - Module 7 is a standalone role-based path and does not require programming experience
- **Trainer prep time:** Allocate 2 hours prep per session for first-time delivery
- **Feature status notes:** Sessions covering Preview features (Copilot Memory, third-party agents) should include availability disclaimers and be updated as features reach GA.
