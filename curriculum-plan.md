# GitHub Copilot & Agentic Workflows: Train-the-Trainer Curriculum Plan

## Overall learning objectives

By completing this curriculum, trainers will be able to:

1. **Explain** GitHub Copilot's architecture, capabilities, model ecosystem, and limitations to technical audiences
2. **Demonstrate** inline suggestions, Chat, agent mode, and Spaces in live coding sessions
3. **Teach** prompt engineering techniques for Copilot's IDE, CLI, and app workflows
4. **Guide** teams through agentic workflows: IDE agent mode, canvases, cloud agent, custom agents, and MCP integration
5. **Build** custom agents (`.github/agents/`), agent skills (`.github/skills/`), canvas extensions, and MCP server integrations
6. **Automate** GitHub Actions, IaC (Terraform/Bicep), and CI/CD workflows with Copilot assistance
7. **Orchestrate** multi-agent teams using optional tools such as Squad for advanced agentic automation
8. **Apply** specification-driven development to turn enterprise requirements into governed delivery artifacts
9. **Run** hands-on labs where trainees build real projects using the full Copilot toolchain
10. **Assess** trainee progress and adapt delivery based on audience skill level and domain focus
11. **Teach** product and delivery teams to use the GitHub Copilot app, save plans in repository files, and supervise agent work without programming
12. **Use** GitHub MCP, canvases, orchestration, and Automations with human review and result checks

---

## Curriculum structure

### Modules and tracks

The curriculum is organized into **7 modules**. Modules 1 to 3 form the technical core. Modules 4 to 7 are role-based or technical electives that trainers can combine for their audience.

```
Module 1: Copilot Fundamentals ──────────────── (Beginner, 3 sessions)
    │
Module 2: Copilot in Practice ──────────────── (Intermediate to Advanced, 7 sessions)
    │
Module 3: Agentic Workflows ───────────────── (Advanced, 5 sessions)
    │
    ├── Module 4: DevOps & Infrastructure ──── (Intermediate to Advanced, 3 sessions)
    │   └── Requires: Module 1 + Session m2-02
    │
    ├── Module 5: Specification-Driven Frameworks ─ (Advanced, 3 sessions)
    │   └── Uses Squad, Spec Kit, and HVE as worked framework examples
    │
    └── Module 6: Advanced Topics & Capstone ─────── (Advanced, 2 sessions)
        └── Session m6-01 is independent; Session m5-02 is required before the capstone

Module 7: Product and Delivery Teams ─────────────── (Beginner to Intermediate, 6 sessions)
    └── Standalone role-based path; no programming prerequisite
```

### Delivery options

| Audience                  | Recommended Path                 | Sessions     | Duration   |
| ------------------------- | -------------------------------- | ------------ | ---------- |
| **Copilot Beginners**     | Module 1 only                    | m1-01 to m1-03        | 9 hrs      |
| **Copilot Practitioners** | Modules 1 to 2 + developer orchestration | m1-01 to m1-03, m2-01 to m2-04, m2-05, m7-05, m2-06, m2-07 | 33 hrs |
| **Agentic Developers**    | Modules 1 to 3 + developer orchestration | m1-01 to m1-03, m2-01 to m2-04, m3-01 to m3-05, m2-05, m7-05 | 42 hrs |
| **DevOps Engineers**      | Module 1 + Session m2-02 + Module 4 | m1-01 to m1-03, m2-01 to m2-02, m4-01 to m4-03 | 21 hrs     |
| **SDK Application Developers** | Modules 1 to 3 + Session m6-01 | m1-01 to m1-03, m2-01 to m2-04, m3-01 to m3-05, m6-01 | 39 hrs |
| **Product and Delivery Teams** | Module 7                    | m7-01 to m7-06        | 18 hrs     |
| **HVE Practitioners**     | HVE Engineering                  | m1-01 to m1-03, m2-01 to m2-04, m3-03 to m3-04, m5-03 | 31 hrs |
| **Full Track**            | All Modules                      | All available sessions | 88 hrs |

---

## Session plan

### Module 1: Copilot Fundamentals (Beginner)

| #   | Session                           | Difficulty  | Prerequisites   | Duration   |
| --- | --------------------------------- | ----------- | --------------- | ---------- |
| m1-01  | Introduction to GitHub Copilot    | Beginner    | None            | 3 hrs      |
| m1-02  | Copilot Chat & Inline Suggestions | Beginner    | Session m1-01      | 3 hrs      |
| m1-03  | Prompt Engineering Fundamentals   | Beginner    | Sessions m1-01 to m1-02  | 3 hrs      |

### Module 2: Copilot in Practice (Intermediate to Advanced)

| #   | Session                                   | Difficulty   | Prerequisites   | Duration   |
| --- | ----------------------------------------- | ------------ | --------------- | ---------- |
| m2-01  | GitHub Copilot in the CLI                 | Intermediate | Sessions m1-01 to m1-03  | 3 hrs      |
| m2-02  | Agent Mode in the IDE                     | Intermediate | Sessions m1-01 to m1-03, m2-01  | 3 hrs      |
| m2-03  | Copilot Spaces & Context Management       | Intermediate | Sessions m1-01 to m1-03, m2-01 to m2-02  | 3 hrs      |
| m2-04  | Copilot for Code Review & Pull Requests   | Intermediate | Sessions m1-01 to m1-03, m2-01 to m2-03  | 3 hrs      |
| m2-05  | GitHub Copilot App for Developers         | Intermediate | Sessions m1-01 to m1-03, m2-01 to m2-04  | 3 hrs      |
| m2-06  | Repair and Refactor a Broken Python Application | Intermediate | Sessions m1-01 to m1-03, m2-01 to m2-04 | 3 hrs |
| m2-07  | Migrate a Legacy Java Service to Modern .NET | Advanced | Sessions m1-01 to m1-03, m2-01 to m2-04 | 3 hrs |

**App access:** Session m2-05 requires GitHub Copilot app access. The developer
tracks then use Session m7-05's developer route, which needs `/orchestrate` but does
not require Sessions m7-01 to m7-04 or GitHub MCP. Check access before scheduling.

### Module 3: Agentic Workflows (Advanced)

| #   | Session                               | Difficulty  | Prerequisites      | Duration   |
| --- | ------------------------------------- | ----------- | ------------------ | ---------- |
| m3-01  | Copilot App, Plugins & Canvas Extensions | Advanced  | Sessions m1-01 to m1-03, m2-01 to m2-04     | 3 hrs      |
| m3-02  | Copilot Cloud Agent                   | Advanced    | Sessions m1-01 to m1-03, m2-01 to m2-04     | 3 hrs      |
| m3-03  | MCP Servers & Custom Tool Integration | Advanced    | Sessions m1-01 to m1-03, m2-01 to m2-04     | 3 hrs      |
| m3-04  | Custom Agents & Agent Profiles        | Advanced    | Sessions m1-01 to m1-03, m2-01 to m2-04, m3-03 | 3 hrs      |
| m3-05  | Agent Skills & the Copilot Ecosystem  | Advanced    | Sessions m1-01 to m1-03, m2-01 to m2-04, m3-04 | 3 hrs      |

### Module 4: DevOps & Infrastructure with Copilot (Intermediate to Advanced)

| #   | Session                                    | Difficulty   | Prerequisites      | Duration   |
| --- | ------------------------------------------ | ------------ | ------------------ | ---------- |
| m4-01  | GitHub Actions & Workflow Generation       | Intermediate | Sessions m1-01 to m1-03, m2-01 to m2-02     | 3 hrs      |
| m4-02  | Infrastructure as Code with Copilot        | Advanced     | Sessions m1-01 to m1-03, m2-01 to m2-02, m4-01 | 2 hrs 30 min |
| m4-03  | CI/CD Pipeline Debugging & Agentic Remediation | Advanced | Sessions m1-01 to m1-03, m2-01 to m2-02, m4-01 | 3 hrs      |

### Module 5: Specification-Driven Frameworks (Advanced)

| #   | Session                                     | Difficulty  | Prerequisites      | Duration   |
| --- | ------------------------------------------- | ----------- | ------------------ | ---------- |
| m5-01  | Brady's Squad: Human-Led AI Teams           | Advanced    | Sessions m1-01 to m1-03, m2-01 to m2-04, m3-01 to m3-05 | 3 hrs   |
| m5-02  | Spec Kit: Enterprise Specification-Driven Development | Advanced | Sessions m1-01 to m1-03, m2-01 to m2-04, m3-01 to m3-05 | 3 hrs |
| m5-03  | HVE Core: Evidence-Led Delivery with RPI | Advanced | Sessions m1-01 to m1-03, m2-01 to m2-04, m3-03 to m3-04 | 4 hrs |

### Module 6: Advanced Topics & Capstone (Advanced)

| #   | Session                                     | Difficulty  | Prerequisites      | Duration   |
| --- | ------------------------------------------- | ----------- | ------------------ | ---------- |
| m6-01  | Build Reliable Agent Applications with the GitHub Copilot SDK | Advanced | Sessions m1-01 to m1-03, m2-01 to m2-04, m3-01 to m3-05 | 3 hrs |
| m6-02  | End-to-End Capstone Project                 | Advanced    | Sessions m1-01 to m1-03, m2-01 to m2-04, m3-01 to m3-05 and m5-02 | 3 hrs |

### Module 7: Product and Delivery Teams (Beginner to Intermediate)

| # | Session | Difficulty | Prerequisites | Duration |
| --- | --- | --- | --- | --- |
| m7-01 | Work Effectively in the GitHub Copilot App | Beginner | GitHub Copilot app access | 3 hrs |
| m7-02 | Interview Ideas and Shape Better Work | Beginner | Session m7-01 | 3 hrs |
| m7-03 | Plan Work with GitHub Issues and MCP | Intermediate | Sessions m7-01 to m7-02; GitHub MCP write access | 3 hrs |
| m7-04 | Build and Use a Planning Canvas | Intermediate | Sessions m7-01 to m7-03; canvas creation access | 3 hrs |
| m7-05 | Orchestrate Agents and Workstreams | Intermediate | Product route: Sessions m7-01 to m7-04; developer route: Session m2-05; app orchestration access | 3 hrs |
| m7-06 | Automate Delivery Follow-up and Connect Work Systems | Intermediate | Sessions m7-01 to m7-05; Automations and GitHub MCP access | 3 hrs |

**Access requirement:** GitHub Copilot access is required for Sessions m7-01 to m7-06.
Learners without access should not start Module 7. Stop and reschedule their
training after access is available.

**Trainer-only supplement:** A trainer may prepare the Azure Boards route before
the workshop when the delivery plan requires it. The standard learner path uses
GitHub issues and does not branch into an alternate platform exercise.

---

## Session details

---

### Session m1-01: Introduction to GitHub Copilot

**Difficulty:** Beginner
**Prerequisites:** None
**Module:** Copilot Fundamentals

**Description:**
Trainers learn what GitHub Copilot is, how the underlying LLM works at a high level, which data policies apply, and how to set up the development environment. Trainees install and configure Copilot, then use it to write their first code.

**Trainer Content Outline (1 hour):**

- What is GitHub Copilot? Architecture overview, LLM basics
- Enterprise Cloud access, policy controls, and the delivery preflight
- Usage and billing fundamentals using live official GitHub documentation, not static prices, allowances, or model tables
- Privacy, data handling, and telemetry: what code is sent, what isn't
- Supported IDEs and language coverage
- Installation and activation walkthrough
- First demo: writing a function with Copilot suggestions
- Next Edit Suggestions (NES): predictive follow-up edits
- Setting expectations: what Copilot does well, where it struggles
- Q&A framework for common objections

**Lab Outline (2 hours 30 minutes):**

- Install and configure GitHub Copilot in VS Code
- Accept, reject, and cycle through inline suggestions
- Enable and experiment with Next Edit Suggestions
- Write 3 to 5 functions across different languages (Python, JavaScript, TypeScript)
- Compare Copilot output with manually written code
- Document observations: where was Copilot helpful? Where did it miss?
- **Deliverable:** A small multi-function utility file generated with Copilot assistance

**Expected Learning Outcomes:**

- Explain what GitHub Copilot is and how it generates suggestions
- Explain Enterprise access, delivery preflight, and usage-based billing basics using current official documentation
- Install and configure Copilot in VS Code
- Accept, reject, and navigate inline suggestions and NES
- Identify tasks Copilot handles well and those that need human judgment

---

### Session m1-02: Copilot Chat & Inline Suggestions

**Difficulty:** Beginner
**Prerequisites:** Session m1-01
**Module:** Copilot Fundamentals

**Description:**
Covers Copilot Chat in the sidebar, inline, and quick chat, plus slash commands, chat participants, and model selection. Trainees use @workspace, @terminal, and @vscode in routine development tasks.

**Trainer Content Outline (1 hour):**

- Copilot Chat UI surfaces: sidebar, inline, quick chat, terminal
- Chat participants: @workspace, @terminal, @vscode: when to use each
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
- Compare available models only when the customer's policy and current official reference allow them
- **Deliverable:** A debugged and tested module with Chat conversation history documented

**Expected Learning Outcomes:**

- Use all Copilot Chat surfaces effectively
- Apply slash commands for common tasks (explain, fix, test, document)
- Reference specific files and selections in Chat context
- Choose models with the live-doc selection framework

---

### Session m1-03: Prompt Engineering Fundamentals

**Difficulty:** Beginner
**Prerequisites:** Sessions m1-01 to m1-02
**Module:** Copilot Fundamentals

**Description:**
Teaches trainees to write effective prompts for Copilot. Covers prompt structure, context selection, revision, and common mistakes. Later sessions use these methods.

**Trainer Content Outline (1 hour):**

- How prompt detail affects the result
- Anatomy of a good prompt: intent, context, constraints, examples
- The "neighboring tabs" effect: how open files influence suggestions
- Comment-driven development: using comments as prompts
- Iterative prompting: refining output through follow-up instructions
- CLI `/refine`: review the rewrite against the task before submitting it
- Anti-patterns: vague prompts, over-specified prompts, prompt injection risks
- Demo: same task, three prompt strategies: compare results
- Prompt libraries and team-shared prompt patterns

**Lab Outline (2 hours):**

- Prompt challenge round: given a task, write the best prompt (timed exercises)
- Refactor a poorly prompted Copilot session into a well-prompted one
- Run `/refine` on the rough todo-store request and correct its rewrite before implementation
- Build a small REST API endpoint using only comment-driven prompting
- Experiment with context manipulation: open/close files, see how suggestions change
- Create a personal prompt cheat sheet for common development tasks
- **Deliverable:** A prompt engineering cheat sheet + a fully prompted REST endpoint

**Expected Learning Outcomes:**

- Write clear, structured prompts that produce accurate Copilot output
- Use context strategically (open files, comments, naming conventions)
- Identify and fix common prompting anti-patterns
- Create reusable prompt templates for repeated tasks
- Distinguish prompt rewriting from task execution and test results

**Access:** Session m1-03 needs standalone CLI `/refine` and Node.js 22 or later.
Prepare it before delivery; Session m2-01 is not a prerequisite.

---

### Session m2-01: GitHub Copilot in the CLI

**Difficulty:** Intermediate
**Prerequisites:** Sessions m1-01 to m1-03
**Module:** Copilot in Practice

**Description:**
Introduces the standalone `copilot` CLI through terminal assistance, required
planning and revision, programmatic output, and supervised `/fleet` analysis.
Learners check generated work against local files and tests before accepting it.

**Trainer Content Outline (1 hour):**

- Compare Copilot in the IDE, Chat, and CLI
- Installing standalone `copilot` (`npm install -g @github/copilot`): prerequisites, authentication, terminal setup
- Interactive `copilot` mode: conversational terminal assistance for commands, code, and errors
- Non-interactive `copilot -p "<prompt>"`: generating answers, commands, and scripts from prompts
- Slash commands: `/plan`, `/agent`, `/skills`, `/mcp`, `/model`, and when to use each
- Plan mode: challenge an assumption, revise the plan, then approve implementation
- Rubber duck: a read-only contrasting-model critic; inspect the persistent proactive opt-in
- Terminal-first workflows: piping output, log analysis, and environment debugging
- `/fleet` task independence, `/tasks` inspection, usage limits, and parent reconciliation
- Programmatic output: distinguish plain text from a JSONL event stream
- Permission and sandbox inspection; check the installed version's soft-limit scope
- Queue/background controls and checked recovery/worktree transitions
- Remote/SSH workflows: when the CLI is your only Copilot surface
- Demo: compare the same task (set up a Docker compose project) done via CLI vs. IDE
- CLI vs. IDE decision framework: when each surface is most effective
- Security considerations: what context the CLI sends, command execution trust boundaries
- Scripting with Copilot: generating, debugging, and iterating on shell scripts

**Lab Outline (2 hours):**

- Install standalone `copilot` and authenticate it for terminal use
- Use interactive `copilot` to explain a simple command, a pipeline, and a script
- Use `copilot -p "<prompt>"` to generate commands for file operations, git workflows, Docker, and cloud CLIs
- Generate a multi-step shell script using Copilot CLI, then debug and refine it
- Repair the starter project from an accepted `/plan` revision and run its tests
- Check `/rubber-duck` findings before approving the repair plan
- Inspect `/permissions show`, sandbox policy, and `/limits` before a metered run
- Queue a follow-up, background the harmless timed command, and check `/tasks`
- Pipe real command output (error logs, test results) to Copilot for analysis
- Parse JSONL output and check the CLI exit status separately from answer correctness
- Run live read-only `/fleet` tasks, check child claims, and reconcile disagreements
- Rewind a disposable edit; check `/fork worktree`, `/move`, and parent `/resume`
- Side-by-side comparison: complete the same task in CLI and IDE, document tradeoffs
- Create a cheat sheet that matches common developer tasks to the right Copilot tool
- **Deliverable:** A CLI cheat sheet, repaired project, pipeline script, and
  workflow record with plan revisions and checked child-task results

**Expected Learning Outcomes:**

- Install and configure standalone `copilot` for terminal workflows
- Use interactive and non-interactive `copilot -p "<prompt>"` workflows effectively for daily terminal work
- Revise and approve a plan before implementation
- Supervise independent fleet tasks and check the parent's synthesis
- Distinguish terminal-first workflows from commands also available in the app
- Apply the CLI vs. IDE decision framework to advise teams on surface selection
- Generate and iterate on shell scripts using Copilot CLI assistance

---

### Session m2-02: Agent Mode in the IDE

**Difficulty:** Intermediate
**Prerequisites:** Sessions m1-01 to m1-03, m2-01
**Module:** Copilot in Practice

**Description:**
This session introduces agent mode in VS Code and JetBrains. Agent mode plans work, edits files, runs terminal commands, responds to errors, and connects to MCP servers. Trainees learn how it handles related changes across files. Later sessions assume this knowledge.

**Trainer Content Outline (1 hour):**

- Compare autocomplete, assistant responses, and agent execution
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
- Refactor a module across 4 to 5 files using agent mode (multi-file editing)
- Observe the agent's tool use: terminal commands, file edits, iterations
- Intervene mid-task: redirect the agent, add constraints, correct course
- Use TODO code actions to delegate a task to the cloud agent
- Compare: complete the same task manually vs. with agent mode: document differences
- **Deliverable:** A feature built entirely via agent mode, with a reflection on the agent's decision-making

**Expected Learning Outcomes:**

- Explain the difference between assistant and agentic AI
- Use agent mode in VS Code for multi-step, multi-file tasks
- Understand the agent loop (plan, act, observe, iterate)
- Know when to use agent mode vs. Chat vs. inline suggestions
- Use TODO code actions to bridge IDE and cloud agent workflows

---

### Session m2-03: Copilot Spaces & Context Management

**Difficulty:** Intermediate
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-02
**Module:** Copilot in Practice

**Description:**
Covers how to select code, docs, and specifications as context for Copilot Spaces. Also covers custom instructions in `.github/copilot-instructions.md`, reusable prompt files in `.github/prompts/`, Copilot Memory, and VS Code instruction settings.

**Trainer Content Outline (1 hour):**

- The context problem: why Copilot needs grounding
- Copilot Spaces: organizing code, docs, issues, and specs into curated sets
- Creating and sharing Spaces across teams
- Custom instructions per Space for specialized workflows
- `.github/copilot-instructions.md`: project-level instructions
- `.github/prompts/*.md`: reusable prompt files for team tasks
- CLI `/env` and `/instructions`: discovery, file-match scope, and actual behavior
- VS Code settings: `github.copilot.chat.codeGeneration.useInstructionFiles`
- Copilot Memory: how the agent remembers and validates knowledge (Preview)
- Demo: before/after: same prompt with and without Space context
- Maintenance: keeping Spaces and instructions current as projects evolve

**Lab Outline (2 hours):**

- Create a Copilot Space for a provided multi-repo project
- Add relevant files, docs, and specs to the Space
- Set custom instructions for the Space and observe behavior changes
- Create a `copilot-instructions.md` for a provided project with specific coding standards
- Inspect and correct the copied stale module-style instruction, then restart and inspect again
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

### Session m2-04: Copilot for Code Review & Pull Requests

**Difficulty:** Intermediate
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-03
**Module:** Copilot in Practice

**Description:**
Learners review a synthetic change themselves, run `/review` and
`/security-review` on the same uncommitted diff, then compare the results with
Copilot pull-request review. They reproduce findings, correct the code, and
retain the human merge decision.

**Trainer Content Outline (1 hour):**

- Copilot in the PR workflow: summaries, review comments, suggestions
- Requesting Copilot review on a PR (manual and automatic)
- Configuring automatic reviews at repo and org level
- Copilot-generated commit messages and PR descriptions
- Human review before assisted review to preserve an independent initial verdict
- Local `/review` and `/security-review`: scope, claim checking, and false positives
- Security review limits: the command does not replace repository scanners
- Merge conflict resolution with tests
- Demo: a complete PR lifecycle with Copilot assistance
- Limitations: what Copilot review catches vs. what it misses
- Team adoption patterns for Copilot-assisted review

**Lab Outline (2 hours):**

- Create a feature branch with intentional defects and record a human review
- Run both local commands before committing the change
- Open a private training PR and compare its Copilot review with the local results
- Accept, reject, or leave findings unresolved with file references and reasons
- Fix defects, add focused tests, and rerun local review on the correction diff
- Resolve a conflict without losing either branch's intent
- **Deliverable:** The reviewed training PR, corrected project, and finding-to-test
  record with the final human decision

**Expected Learning Outcomes:**

- Use Copilot to generate PR summaries and review comments
- Configure automatic Copilot reviews at repo/org level
- Evaluate Copilot review quality and identify blind spots
- Run local code and security review and distinguish demonstrated impact from speculation
- Resolve merge conflicts and test the result
- Integrate Copilot into a team code review workflow

---

### Session m2-05: GitHub Copilot App for Developers

**Difficulty:** Intermediate
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04
**Module:** Copilot in Practice
**Duration:** 3 hours

**Description:**
Learners use the GitHub Copilot app to plan a small engineering change, critique
the plan with `/rubber-duck`, and approve a revision before implementation. They
review the resulting diff and record pull-request readiness.

**Trainer Content Outline (1 hour):**

- Choose between chat, project sessions, and the repository workflow
- Keep parallel work isolated and give each session a clear stop condition
- Challenge a plan with `/rubber-duck` before approving implementation
- Explain automatic contrasting-model selection and the critic's read-only role
- App `/fork`, checked `/spar` reasoning, and reviewed `/merge-to-parent`
- Separate implementation from independent code critique
- Run app `/review` on the active diff and check its findings
- Gather test results and review findings before a pull request decision
- Use a manual read-only automation without expanding repository access

**Lab Outline (2 hours):**

- Start from a small engineering change with testable acceptance criteria
- Use `/plan`, critique it, and approve a revised plan
- Before implementation, compare a forked `/spar` argument and return only the checked plan note
- Run the implementation in an isolated project session
- Ask a separate session to critique the change, test results, and review findings
- Resolve findings and prepare a pull-request readiness record
- Triage active-diff code-review findings before committing
- Run the supplied manual read-only automation
- **Deliverable:** A tested change, independent critique, pull-request readiness
  record, and automation run output

**Expected Learning Outcomes:**

- Select the right Copilot App surface for a development task
- Isolate parallel sessions and define useful stop conditions
- Use independent critique to find gaps in code, tests, or review findings
- Revise a plan before implementation and check active-diff review claims
- Distinguish a local fork return from merging a GitHub pull request
- Decide pull-request readiness from test results and review findings
- Run and review a manual read-only automation

> **App access is required.** Stop if a required command is unavailable.
> Developer tracks continue with Session m7-05's developer orchestration route.

---

### Session m2-06: Repair and Refactor a Broken Python Application

**Difficulty:** Intermediate
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04
**Module:** Copilot in Practice
**Duration:** 3 hours

**Description:**
Learners diagnose a broken Python application, restore its expected behavior, and refactor it behind a stable test suite.

**Trainer Content Outline (1 hour):**

- Separate repair work from structural refactoring
- Trace failures from symptoms to root causes
- Strengthen tests before changing design
- Inspect Python LSP references and check inline copies of rules separately
- Refactor in small steps and run tests after each change

**Lab Outline (2 hours):**

- Reproduce the supplied failures
- Repair the application until the baseline tests pass
- Add focused tests for uncovered behavior
- With tests green, inspect `severity_for` references and inline classification
- Approve CLI `/plan` before the refactor
- Refactor the repaired code and rerun the full suite
- **Deliverable:** A repaired Python application with passing tests and documented refactoring decisions

---

### Session m2-07: Migrate a Legacy Java Service to Modern .NET

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04
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
- Record migration decisions and compatibility test results
- **Deliverable:** A working .NET service with passing compatibility tests and a concise migration record

---

### Session m3-01: Copilot App, Plugins & Canvas Extensions

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04
**Module:** Agentic Workflows

**Description:**
Trainers use the GitHub Copilot App Customize area to explain plugins, skills, MCP servers, and canvases. Learners create a small canvas for a synthetic workflow, then review its state, actions, data boundary, ownership, and failure handling.

**Trainer Content Outline (1 hour):**

- Copilot App sessions and the Customize area
- Plugins, skills, MCP servers, and canvases: separate responsibilities
- Canvas model: a shared artifact with direct user actions and agent-callable capabilities
- Choosing a canvas for visible state, steering, or a handoff artifact
- Project scope (`.github/extensions/`) and personal scope (`~/.copilot/extensions/`)
- Demo: create a delivery-readiness canvas with `/create-canvas`
- Design review: state, user actions, agent capabilities, validation, and ownership
- Security: synthetic data, approved actions, least privilege, and access checks

**Lab Outline (2 hours):**

- Review a synthetic delivery-readiness workflow and its data boundary
- Define the canvas state, user actions, agent capabilities, and checks
- Create the canvas with `/create-canvas` in the Copilot App
- Add one user action with defined limits and one agent-callable capability
- Test direct edits and agent updates against the same shared artifact
- Complete a peer review of scope, data, actions, and owner
- **Deliverable:** A reviewed canvas brief and a canvas created in the training sandbox

**Expected Learning Outcomes:**

- Explain how a canvas differs from instructions, skills, custom agents, and MCP servers
- Build a canvas with defined state and action limits in the Copilot App
- Define user actions and agent capabilities around shared state
- Review canvas scope, data handling, ownership, and failure handling before use

---

### Session m3-02: Copilot Cloud Agent

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04
**Module:** Agentic Workflows

**Description:**
Covers the GitHub Copilot cloud agent and how to assign GitHub issues to it. Copilot creates a branch, writes code, runs builds and tests in an isolated environment, and opens a draft PR. The session also covers third-party coding agents such as Claude and Codex, plus agent session management.

**Trainer Content Outline (1 hour):**

- What is the cloud agent? Cloud-based, issue-driven, async
- How it works: assign issue → agent creates branch → writes code → opens draft PR
- Configuring the cloud agent: `copilot-setup-steps.yml`, firewall rules, runner config
- Writing good issues for the cloud agent (specificity, acceptance criteria)
- The `copilot-instructions.md` role in guiding agent behavior
- Third-party agents: Claude (@claude) and Codex (@codex): assigning and comparing
- Agent session management: tracking progress across sessions
- Demo: assign an issue, watch the agent work, review the PR
- Security: network firewall, toolset restrictions, shell controls
- Team workflow: the cloud agent as a junior developer on the team

**Lab Outline (2 hours):**

- Configure a repository for the Copilot cloud agent (`copilot-setup-steps.yml`)
- Write 3 issues of varying complexity and assign them to Copilot
- Assign the same issue to Copilot and a third-party agent: compare results
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

### Session m3-03: MCP Servers & Custom Tool Integration

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04
**Module:** Agentic Workflows

**Description:**
Introduces the Model Context Protocol (MCP), an open standard for connecting AI models to external tools and data sources. Covers MCP server architecture, configuration in VS Code and GitHub, and custom MCP servers. Trainers must check enterprise registry, allowlist, data-handling, and approval requirements against current documentation and customer policy.

**Trainer Content Outline (1 hour):**

- How MCP connects agents to tools through a standard protocol
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
- **Deliverable:** A working custom MCP server with 2 to 3 tools, integrated into VS Code

**Expected Learning Outcomes:**

- Explain MCP architecture and the client-server model
- Configure existing MCP servers in VS Code and at the org level
- Build a custom MCP server with typed tools
- Understand security and trust boundaries for MCP tools

---

### Session m3-04: Custom Agents & Agent Profiles

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04, m3-03
**Module:** Agentic Workflows

**Description:**
Covers custom GitHub agents, which are defined in Markdown files with YAML frontmatter. Custom agents live in `.github/agents/`, specify their own instructions, tools, and MCP servers, and can be invoked by name in Copilot Chat, cloud agent, and CLI.

**Trainer Content Outline (1 hour):**

- What are custom agents? Specialized AI teammates via `.github/agents/`
- Agent profile anatomy: name, description, prompt, tools, MCP servers
- Repository, organization, and enterprise-level agents
- Creating agents for specific domains: test-writer, readme-creator, security-reviewer
- Agent tool configuration: which tools and MCP servers each agent can use
- CLI LSP setup, server-start checks, and inspected definition/reference operations
- Invoking custom agents: Chat, cloud agent, CLI
- Comparison: custom agents vs. MCP servers vs. custom instructions: when to use each
- Demo: build a custom agent and assign it work
- Enterprise distribution: sharing agents across an organization

**Lab Outline (2 hours):**

- Inspect JavaScript LSP references and distinguish a caller from a CommonJS export
- Fail the weak test-writer contract and create `.github/agents/test-writer.agent.md`
- Check the learner's local profile with the same contract
- Load it through CLI `/agent` and request behavior that would require a source edit
- Check that the test-only agent stops without changing production code
- **Deliverable:** The tightened profile, contract results, and actual LSP/live-run record

**Expected Learning Outcomes:**

- Create custom agent profiles using `.github/agents/` Markdown files
- Configure agent-specific tools, MCP servers, and instructions
- Invoke custom agents across Copilot Chat, cloud agent, and CLI
- Evaluate when to build a custom agent vs. use MCP vs. use custom instructions
- Distribute agents at the organization level
- Distinguish language-server startup from a checked symbol lookup

**Access:** Session m3-04 requires the standalone CLI and working JavaScript LSP
server. Static tests or manual traces do not replace the live run.

---

### Session m3-05: Agent Skills & the Copilot Ecosystem

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04, m3-04
**Module:** Agentic Workflows

**Description:**
Learners build and test a repository skill, then check its actual loading in
Copilot. They compare the local `decision-interview` skill with a pinned copy of
Matt Pocock's `grill-me` and its `grilling` dependency before passing accepted
decisions to `/plan`.

**Trainer Content Outline (1 hour):**

- What are agent skills? Specialized knowledge packs for Copilot
- Skills specification: `.github/skills/` for versioned team delivery
- Project-shared skills: `.github/skills/`: versioned team guidance
- Skill anatomy: SKILL.md format, when skills are loaded, confidence levels
- Creating skills for common workflows: deployment, testing, code review
- Community ecosystem: `github/awesome-copilot`, `anthropics/skills`
- Community source review, pinned revisions, dependency inspection, and licensing
- Demo: create a skill, observe behavior change, share it
- Combine agents, skills, and MCP in one workflow
- Interview first in Interactive mode; start planning from accepted decisions
- Scoped `/chronicle improve`: inspect friction and cancel before applying suggestions

**Lab Outline (2 hours):**

- Create a project skill (`.github/skills/api-design/SKILL.md`) for API design patterns
- Test matching, non-matching, and missing-precondition scenarios locally
- Check live skill loading and the missing-reviewer stop in Copilot
- Inspect and load pinned `grill-me` plus `grilling`
- Run both interview skills in fresh sessions with the same request and late constraint
- Save accepted decisions and trace at least two into `/plan` steps or checks
- Check a Chronicle recommendation against an actual correction, or record insufficient history
- **Deliverable:** A validated repository skill, live loading results, and an
  interview comparison with the resulting plan

**Expected Learning Outcomes:**

- Create and test a repository skill
- Understand the Agent Skills specification and SKILL.md format
- Discover and install community skills
- Distinguish local contract tests from live skill behavior
- Compare interview skills and carry accepted decisions into a plan
- Decide whether session friction belongs in instructions, a skill, or neither

---

### Session m4-01: GitHub Actions & Workflow Generation

**Difficulty:** Intermediate
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-02
**Module:** DevOps & Infrastructure with Copilot

**Description:**
Covers using Copilot to generate, explain, and debug GitHub Actions workflows. Trainers use agent mode to create CI/CD pipelines, custom Actions, and workflow automation from natural-language descriptions.

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

### Session m4-02: Infrastructure as Code with Copilot

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-02, m4-01
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
- Repair the security case and save the passing check output.
- **Deliverable:** Validated Terraform modules, a repaired security case, and command output.

**Expected Learning Outcomes:**

- Generate Terraform modules from fixed architecture constraints.
- Connect module inputs and outputs without copying values between layers.
- Run local Terraform checks in the correct order.
- Identify and fix security problems supported by the architecture.
- Explain why local validation does not approve a deployment.

---

### Session m4-03: CI/CD Pipeline Debugging & Agentic Remediation

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-02, m4-01
**Module:** DevOps & Infrastructure with Copilot

**Description:**
Covers advanced CI/CD debugging with Copilot assistance and an approved, reviewable agentic remediation workflow for security findings. Trainers learn to diagnose pipeline failures, optimize build times, and safely route remediation work through the organization's controls.

**Trainer Content Outline (1 hour):**

- Diagnosing pipeline failures: logs, error messages, Copilot analysis
- Code scanning findings and the "Assign to Copilot" remediation workflow
- Required review, branch protection, and security-owner gates before merge
- Availability, policy, and licensing checks using live official documentation
- Pipeline optimization: caching, parallel jobs, conditional execution
- Demo: debug a complex pipeline failure using Copilot
- Demo: review a code-scanning finding, limit the remediation scope, and review the resulting change
- Security-first CI/CD: integrating scanning into every pipeline

**Lab Outline (2 hours):**

- Debug 3 failing CI/CD pipelines of increasing complexity using Copilot
- Enable CodeQL scanning on a repository with known vulnerabilities
- Route a security finding through the approved agentic remediation workflow and review the proposed change
- Optimize a slow pipeline: add caching, parallelize jobs
- (Stretch) Compare a manual and agentic remediation path under the same review policy
- **Deliverable:** 3 fixed pipelines and a reviewed remediation proposal with the required approval records

**Expected Learning Outcomes:**

- Diagnose and fix CI/CD pipeline failures with Copilot assistance
- Configure code scanning and use the approved agentic remediation workflow
- Optimize pipeline performance with Copilot suggestions
- Integrate security scanning into CI/CD workflows
- Apply human review and policy controls to agentic security remediation

---

### Session m5-01: Brady's Squad: Human-Led AI Teams

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04 and m3-02 to m3-05
**Module:** Specification-Driven Frameworks

**Description:**
An optional advanced session on the [Brady's Squad](https://github.com/bradygaster/squad) framework. Learners define the work in an issue, assign roles, route tasks, and review the saved decisions. Squad is a worked example, not a required product dependency.

**Trainer Content Outline (1 hour):**

- When multi-agent orchestration is warranted, and when it is not
- Squad as a community-tool example, with a vendor-neutral orchestration model
- Team composition: casting agents, assigning roles, defining charters
- The coordinator pattern: routing work to the right agent
- Shared memory: decisions, history, skills, orchestration logs
- Ralph: the work monitor: continuous development loops
- GitHub Issues integration: issue-driven agent development
- MCP integration with Squad: extending agent capabilities
- Demo: initialize a Squad team, assign work, observe agent collaboration
- Advanced patterns: reviewer gates, parallel fan-out, worktree management
- When Squad adds value vs. when individual agents suffice

**Lab Outline (2 hours):**

- Use the approved Squad installation and provided example
- Cast a team: lead, frontend, backend, tester, scribe
- Assign work to individual agents and observe output
- Set up GitHub Issues integration: watch agents pick up and complete issues
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

### Session m5-02: Spec Kit: Specification-Driven Development

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04, m3-01 to m3-05
**Module:** Specification-Driven Frameworks
**Duration:** 3 hours 30 minutes

**Description:**
Uses Spec Kit to implement one feature from a source request. Trainees convert tasks into GitHub Issues, implement in stages, run convergence checks, then update the specification to add restore behavior.

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

- Apply specification-driven development to one scoped feature
- Identify the files that Spec Kit creates and the decisions the team owns
- Produce requirements, design artifacts, and tasks that trace to tests
- Use task-to-issue conversion and scoped implementation runs
- Use analysis before implementation and repeat the implement/converge loop
- Evolve a living specification without leaving downstream artifacts behind

---

### Session m5-03: HVE Core: Evidence-Led Delivery with RPI

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04 and m3-03 to m3-04, or equivalent experience
**Module:** Specification-Driven Frameworks
**Duration:** 4 hours

**Description:**
Learners use HVE Core to develop one Engineering Decision API feature through
Research, Plan, Implement, Review, and Follow-up. A person makes the delivery decision.

**Trainer Content Outline (1 hour):**

- HVE agents, prompts, instructions, and local tracking artifacts
- Direct RPI phase prompts and combined `/rpi` orchestration
- Repository context, targeted instructions, and custom agents with defined scope
- Product Manager Advisor and Agile Coach handoffs
- Review findings, Follow-up routing, and the final human decision

**Lab Outline (3 hours):**

- Run Research and Plan before changing code
- Add repository context, a targeted JavaScript instruction, and a custom reviewer
- Refine the supplied intent with Product Manager Advisor and Agile Coach
- Implement and test the specified API endpoint and container contract
- Run Review, check its links to earlier phase results, and record the human decision
- **Deliverable:** A tested API feature with linked HVE artifacts, records of
  customization use, product and Agile decisions, and a reviewed handoff

**Expected Learning Outcomes:**

- Explain how HVE components and tracking artifacts support RPI handoffs
- Run and inspect each direct RPI phase
- Prove that repository customizations changed a later phase
- Feed product and Agile decisions back into the implementation plan
- Use Follow-up to route defects or missing check results without expanding scope
- Support a human approval, change request, or pause decision

---

### Session m6-01: Build Reliable Agent Applications with the GitHub Copilot SDK

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04, m3-01 to m3-05
**Module:** Advanced Topics & Capstone

**Description:**
Learners build a TypeScript command-line application on the GitHub Copilot SDK. The application streams session events and calls one deterministic custom tool. It handles permission and hook decisions, reports failures, and exports OpenTelemetry traces to a local collector and Jaeger.

**Trainer Content Outline (1 hour):**

- SDK architecture: application, SDK client, Copilot CLI server, and agent session
- Session lifecycle and streaming events
- Custom tools with constrained schemas and deterministic handlers
- Permission requests and pre-tool decisions
- Failure, error, and session-end hooks
- OpenTelemetry trace propagation through the SDK and CLI
- Demo: accept one read-only request and deny one out-of-bound action

**Lab Outline (2 hours):**

- Inspect the staged TypeScript assistant and synthetic change data
- Complete and test the custom readiness tool
- Add permission decisions and blocking hooks
- Run one accepted request and one denied request
- Start the local OpenTelemetry Collector and Jaeger stack
- Save test results, audit records, and traces
- **Deliverable:** A tested TypeScript SDK application with a custom tool, permission and hook controls, live accepted and denied runs, and recorded traces

**Expected Learning Outcomes:**

- Create and close a Copilot SDK client and a session with defined tool access
- Consume streaming events without treating partial output as a final result
- Define and test a deterministic custom tool
- Enforce tool and argument boundaries through permissions and hooks
- Return visible errors for invalid input and failed tool execution
- Trace one session from application request through tool decision and completion

---

### Session m6-02: End-to-End Capstone Project

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04, m3-01 to m3-05 and m5-02; Session m5-01 is optional
**Module:** Advanced Topics & Capstone

**Description:**
In this two-hour capstone, trainees use a governed specification to complete one agentic implementation task. They review the results and make a handover decision. The lab does not require a full production build.

**Trainer Content Outline (1 hour):**

- Recap: work boundaries and specification before implementation
- Selecting the smallest safe toolchain for a customer scenario
- Issue → agent → review → handover, with required human gates
- How to adapt the scenario for customer access and policy limits
- Trainer readiness and delivery debrief

**Lab Outline (2 hours):**

- Use the provided feature brief and governance constraints
- Select or consume a prepared specification artifact from Session m5-02
- Create one implementation-ready issue and complete the scoped agentic task
- Review the change against acceptance criteria and policy constraints
- Record the handover decision and retrospective
- **Deliverable:** A reviewed feature change ready for handoff, with records of the governance checks

---

### Session m7-01: Work Effectively in the GitHub Copilot App

**Difficulty:** Beginner
**Prerequisites:** GitHub Copilot app access
**Module:** Product and Delivery Teams

**Description:**
Learners open the GitHub Copilot app, choose repository context, inspect the capabilities available in their environment, and create a reviewed working brief.

**Trainer Content Outline (1 hour):**

- Chats, Projects, My work, Search, Automations, and Customize
- Choose only the context approved for the task
- Skills, agents, MCP servers, canvases, and Automations
- Read, propose, review, write, and check the result

**Lab Outline (2 hours):**

- Compare an unscoped answer with a repository-grounded answer
- Create and commit a sourced working brief
- Revise the brief using the approved new source material
- Check the saved brief in a fresh Copilot session
- **Deliverable:** A revised working brief with context comparison and fresh-session verification

---

### Session m7-02: Interview Ideas and Shape Better Work

**Difficulty:** Beginner
**Prerequisites:** Session m7-01
**Module:** Product and Delivery Teams

**Description:**
Learners run a decision-tree interview in the GitHub Copilot app. They turn approved answers into a repository decision brief and issue proposal.

**Trainer Content Outline (1 hour):**

- Decision-tree interviews and question frontiers
- Facts, recommendations, and owner decisions
- Markdown decision briefs saved in the repository
- Issue proposals with testable acceptance criteria

**Lab Outline (2 hours):**

- Install and check the supplied `decision-interview` project skill
- Run a dependency-ordered Copilot interview
- Create the decision brief and issue proposal
- Reopen one decision branch after a late visibility constraint
- Check the revised files in a fresh session
- **Deliverable:** An installed project skill, revised decision brief, aligned issue proposal, and readiness result

---

### Session m7-03: Plan Work with GitHub Issues and MCP

**Difficulty:** Intermediate
**Prerequisites:** Sessions m7-01 to m7-02; GitHub MCP write access
**Module:** Product and Delivery Teams

**Description:**
Learners use the GitHub MCP server to inspect existing work, propose an issue hierarchy, create the approved issues, and check the result through a fresh read.

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
- Retrieve the issues, apply one reviewed correction, and check it through another fresh read
- **Deliverable:** A live issue hierarchy with records of issue creation and correction

---

### Session m7-04: Build and Use a Planning Canvas

**Difficulty:** Intermediate
**Prerequisites:** Sessions m7-01 to m7-03; canvas creation access
**Module:** Product and Delivery Teams

**Description:**
Learners create a planning canvas from a plain-language request, load the Session m7-03 issues, and keep visible planning state aligned with GitHub and Copilot.

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
- **Deliverable:** A planning canvas with recorded stale-state detection and reconciliation

---

### Session m7-05: Orchestrate Agents and Workstreams

**Difficulty:** Intermediate
**Prerequisites:** Product route: Sessions m7-01 to m7-04; developer route: Session m2-05.
Both routes require live app orchestration access.
**Module:** Product and Delivery Teams

**Description:**
Learners start independent child sessions, intervene when needed, and check the
parent's result. The product route uses live issues. The developer route uses
local Session m2-05 code and a synthetic PR snapshot, without GitHub MCP.

**Trainer Content Outline (1 hour):**

- Parent objectives and independent workstreams
- Input paths, independent questions, stop conditions, and reviewers
- Monitoring, redirecting, and stopping sessions
- Reviewing the parent result against live issues
- Developer route: reconcile local test success with a blocked PR snapshot
- Keep `/fleet` task parallelism distinct from app `/orchestrate` child sessions

**Lab Outline (2 hours):**

- Select independent workstreams from live issues or the developer review brief
- Run live GitHub Copilot orchestration
- Wait, redirect, stop, accept, or reject live child-session work
- Review the parent result and check any approved GitHub issue update
- Developer route: run read-only child reviews, check their claims, and resolve
  conflicting release-readiness conclusions without writing code or updating GitHub
- **Deliverable:** An orchestration plan, checked child results, and a reviewed
  parent decision with issue references or local file and PR-field references

---

### Session m7-06: Automate Delivery Follow-up and Connect Work Systems

**Difficulty:** Intermediate
**Prerequisites:** Sessions m7-01 to m7-05; Automations and GitHub MCP access
**Module:** Product and Delivery Teams

**Description:**
Learners turn the Session m7-05 parent result and live issues into a draft-only
GitHub Copilot Automation. They review two runs and decide whether GitHub or Azure
Boards remains authoritative.

**Trainer Content Outline (1 hour):**

- Choosing a useful recurring task
- Concise Automation definition
- Authoritative inputs, side-effect boundaries, and stop conditions
- GitHub and Azure Boards system-of-record decisions

**Lab Outline (2 hours):**

- Create the concise automation definition
- Configure a manual, draft-only Automation
- Run it against live issues and the Session m7-05 parent result
- Apply one approved issue change and run the same Automation again
- Compare both runs on the platform and record keep, revise, disable, or pause
- Produce a stakeholder update
- **Deliverable:** A concise automation definition and reviewed stakeholder update

---

## Delivery notes

- **Total track duration:** 88 hours across 29 sessions
- **Recommended delivery schedules:**
  - Intensive: Up to 3 sessions/day across 10 days
  - Standard: 1 to 2 sessions/day across 15 days
  - Extended: 1 session/day across 29 days
- **Group size:** 8 to 15 trainees per cohort for optimal lab support
- **Module independence:**
  - Modules 1 to 3 form the core track (required for full certification)
  - Module 4 (DevOps) can be delivered independently with Module 1 + Session m2-02 as prereqs
  - Session m5-01 is optional; it is not a prerequisite for Session m5-02 or Session m6-02
  - Session m6-01 is an independent SDK specialization and is not a prerequisite for Session m6-02
  - Developer tracks require Session m2-05 and Session m7-05's developer route.
    Check their app commands before scheduling
  - Prepare standalone CLI access before Session m1-03, JavaScript LSP before
    Session m3-04, and Python LSP before Session m2-06
  - Session m5-03 is the final session in the HVE Engineering track and should run
    after Sessions m3-03 to m3-04
  - Module 7 is a standalone role-based path and does not require programming experience
- **Trainer prep time:** Allocate 2 hours prep per session for first-time delivery
- **Feature status notes:** Sessions covering Preview features (Copilot Memory, third-party agents) should include availability disclaimers and be updated as features reach GA.
