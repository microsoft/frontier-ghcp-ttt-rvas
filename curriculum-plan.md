# GitHub Copilot & Agentic Workflows: Train-the-Trainer Curriculum Plan

## Overall learning objectives

After this curriculum, you should be able to:

1. **Explain** GitHub Copilot's architecture, capabilities, model ecosystem, and limitations to technical audiences
2. **Demonstrate** inline suggestions, Chat, agent mode, and Spaces in live coding sessions
3. **Teach** prompt engineering techniques for Copilot's IDE, CLI, and app workflows
4. **Guide** teams through agentic workflows: IDE agent mode, canvases, cloud agent, custom agents, and MCP integration
5. **Build** custom agents (`.github/agents/`), agent skills (`.github/skills/`), canvas extensions, and MCP server integrations
6. **Automate** GitHub Actions, IaC (Terraform/Bicep), and CI/CD workflows with Copilot assistance
7. **Orchestrate** multi-agent teams using optional tools such as Squad for advanced agentic automation
8. **Apply** specification-driven development to keep requirements, plans, code, and tests aligned
9. **Run** hands-on labs where trainees build real projects using the full Copilot toolchain
10. **Assess** trainee progress and adapt delivery based on audience skill level and domain focus
11. **Teach** product and delivery teams to use the GitHub Copilot app, save plans in repository files, and supervise agent work without programming
12. **Use** GitHub MCP, canvases, orchestration, and Automations with human review and result checks

---

## Curriculum structure

### Modules and tracks

The curriculum has **7 modules**. Use Modules 1 to 3 as the technical core.
Combine the role-based and technical electives in Modules 4 to 7 to suit your audience.

```
Module 1: Copilot Fundamentals ──────────────── (Beginner, 3 sessions)
    │
Module 2: Copilot in Practice ──────────────── (Intermediate to Advanced, 7 sessions)
    │
Module 3: Agentic Workflows ───────────────── (Advanced, 5 sessions)
    │
    ├── Module 4: DevOps & Infrastructure ──── (Intermediate to Advanced, 3 sessions)
    │   └── Requires: Module 1 + Sessions m2-01 to m2-02
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
| **Agentic Developers**    | Agentic Development | m1-01 to m1-03, m2-01 to m2-05, m7-05, m3-01 to m3-05 | 42 hrs |
| **DevOps Engineers**      | DevOps & Automation | m1-01 to m1-03, m2-01 to m2-02, m4-01 to m4-03 | 23 hrs 30 min |
| **SDK Application Developers** | SDK application development | m1-01 to m1-03, m2-01 to m2-04, m3-01 to m3-05, m6-01 | 39 hrs |
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
| m5-02  | Spec Kit: Specification-Driven Development | Advanced | Sessions m1-01 to m1-03, m2-01 to m2-04, m3-01 to m3-05 | 3 hrs 30 min |
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
Start with what GitHub Copilot does and how the underlying LLM works at a high
level. Explain the data policies before setting up the development environment.
Trainees then install and configure Copilot and use it to write their first code.

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
- Prepare answers to common objections

**Lab Outline (2 hours):**

- Install and configure GitHub Copilot in VS Code
- Review inline suggestions while completing the supplied Python utility module
- Resolve the word-parsing rules, add a summary, and rename a parameter
- Run the supplied tests and record the decisions behind accepted or rejected suggestions
- **Deliverable:** The utility module, five passing tests, and `lab-notes.md`

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
Show how sidebar, inline, and quick chat fit daily development tasks. Trainees try
slash commands and chat participants, including @workspace, @terminal, and @vscode.
They also learn how to choose a model.

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

- Diagnose the supplied Calculator's weighted-average defect with Copilot Chat
- Fix the defect and expand the tests
- Inspect the context used for the answer
- Implement and test the supplied change request
- **Deliverable:** The tested Calculator and `chat-notes.md`

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
Have trainees write a prompt, inspect the result, and revise it. Teach prompt
structure and context selection through common mistakes. Later sessions use
the same methods.

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

- Run `/refine` on the rough todo-store request and correct its rewrite before implementation
- Build the Todo API's store and routes through focused prompts
- Compare results with different context
- Add priority support from the supplied change request and run the tests
- Save one reusable prompt in the prompt log
- **Deliverable:** The Todo API, six passing tests, and `prompt-log.md`

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
Use the standalone `copilot` CLI for terminal tasks. Learners must review and revise
a plan before implementation, inspect programmatic output, and supervise `/fleet`
analysis. They check generated work against local files and tests before accepting it.

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
Give agent mode a task that needs related changes across files in VS Code or
JetBrains. Follow its planning, edits, terminal commands, and response to errors.
Explain how it connects to MCP servers. Later sessions assume this knowledge.

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

**Lab Outline (2 hours):**

- Scaffold and extend one Todo API in IDE agent mode
- Compare Ask and Agent responses to the same task
- Follow the agent's file edits, terminal commands, and response to errors
- Redirect the agent when the supplied change alters the task
- Test the API and review the final diff
- **Deliverable:** The Todo API, tests, two API checks, and decision notes

**Expected Learning Outcomes:**

- Explain the difference between assistant and agentic AI
- Use agent mode in VS Code for multi-step, multi-file tasks
- Understand the agent loop (plan, act, observe, iterate)
- Know when to use agent mode vs. Chat vs. inline suggestions

---

### Session m2-03: Copilot Spaces & Context Management

**Difficulty:** Intermediate
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-02
**Module:** Copilot in Practice

**Description:**
Help trainees choose code, docs, and specifications as context for Copilot Spaces.
Then add project instructions in `.github/copilot-instructions.md` and reusable
prompts in `.github/prompts/`. Explain where Copilot Memory and VS Code instruction
settings fit.

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
Copilot pull-request review. They reproduce findings and correct the code.
A person still decides whether to merge.

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
In the GitHub Copilot app, learners plan a small engineering change and challenge
the plan with `/rubber-duck`. They approve a revision before implementation, then
review the diff and record whether the change is ready for a pull request.

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
Fix the Python application before changing its design. Learners diagnose the
failures and restore the expected behavior, then use the test suite to check
that refactoring preserves it.

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
Establish how the legacy Java service must behave before migrating it to modern
.NET. Learners use that behavior to check compatibility throughout the migration.

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
Use the GitHub Copilot App Customize area to explain plugins, skills, MCP servers,
and canvases. Learners then create a small canvas for a synthetic workflow. Review
its state, actions, data boundary, ownership, and failure handling with them.

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
Assign one GitHub issue to the Copilot cloud agent and review its proposed change.
Check the diff and test results before giving feedback or making a merge decision.

**Trainer Content Outline (1 hour):**

- What is the cloud agent? Cloud-based, issue-driven, async
- How it works: assign issue → agent creates branch → writes code → opens draft PR
- Configuring the cloud agent: `copilot-setup-steps.yml`, firewall rules, runner config
- Writing good issues for the cloud agent (specificity, acceptance criteria)
- The `copilot-instructions.md` role in guiding agent behavior
- Agent session management: tracking progress across sessions
- Demo: assign an issue, watch the agent work, review the PR
- Security: network firewall, toolset restrictions, shell controls
- Team workflow: assign work to the cloud agent and review its changes

**Lab Outline (2 hours):**

- Configure a repository for the Copilot cloud agent (`copilot-setup-steps.yml`)
- Write the supplied issue with clear acceptance criteria and assign it to Copilot
- Monitor agent progress via the Agent Sessions view
- Review the proposed change: quality, correctness, test coverage
- Iterate: provide feedback via PR comments, watch the agent respond
- **Deliverable:** One reviewed agent proposal with test results, feedback, and a human decision

**Expected Learning Outcomes:**

- Configure a repository for the Copilot cloud agent
- Write effective issues that the cloud agent can resolve
- Manage agent sessions and track progress
- Review and iterate on agent-generated PRs

---

### Session m3-03: MCP Servers & Custom Tool Integration

**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04
**Module:** Agentic Workflows

**Description:**
Explain how Model Context Protocol (MCP) connects AI models to external tools and
data through an open standard. Show the server architecture and configuration in
VS Code and GitHub before building a custom server.

Before delivery, check enterprise registry, allowlist, data-handling, and approval
requirements against current documentation and customer policy.

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
Build a custom GitHub agent as a Markdown file with YAML frontmatter in
`.github/agents/`. Define its instructions, tools, and MCP servers, then show how
to invoke it by name in Copilot Chat, cloud agent, and CLI.

**Trainer Content Outline (1 hour):**

- Custom agent profiles and their instructions in `.github/agents/`
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

- How skill instructions and supporting files guide Copilot
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
Carry one Node.js application through CI generation, deployment design, workflow
repair, and custom-action checks. The required lab runs locally and does not deploy.

**Trainer Content Outline (1 hour):**

- GitHub Actions fundamentals recap (for context)
- Using Copilot Chat to generate workflow YAML
- Agent mode for Actions: generating CI and designing deployment steps
- Workflow debugging with Copilot: reading logs, fixing failures
- Creating custom Actions with Copilot assistance
- Reusable workflows and composite actions
- Demo: generate CI and review a deployment design from a project description
- Best practices: workflow security, secrets management, caching
- Copilot cloud agent + Actions: how the agent uses Actions for build/test

**Lab Outline (2 hours):**

- Generate a CI workflow for a provided Node.js project using agent mode
- Design deployment steps from the supplied specification without deploying
- Debug 2 intentionally broken workflows using Copilot
- Create a custom Action that runs a specific tool
- Run local checks against the repaired application, workflows, and custom action
- **Deliverable:** CI and deployment workflow files, a checked custom action, and local check results

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
Build and connect one modular Terraform architecture with Copilot. Validate it
locally, then repair a configuration that fails a deterministic security gate.
Keep Bicep as a short trainer comparison and optional extension.

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
Diagnose CI/CD failures with Copilot and check changes intended to reduce build
times. Repair the supplied security case and test the result locally. Remote
scanning and agentic remediation are optional extensions that require repository
access and the organization's review controls.

**Trainer Content Outline (1 hour):**

- Diagnosing pipeline failures: logs, error messages, Copilot analysis
- Code scanning findings and the "Assign to Copilot" remediation workflow
- Required review, branch protection, and security-owner gates before merge
- Availability, policy, and licensing checks using live official documentation
- Pipeline optimization: caching, parallel jobs, conditional execution
- Demo: debug a complex pipeline failure using Copilot
- Optional demo: review a code-scanning finding and the proposed remediation
- Security-first CI/CD: integrating scanning into every pipeline

**Lab Outline (2 hours):**

- Debug 3 failing CI/CD pipelines of increasing complexity using Copilot
- Review the supplied security case, repair it, and run the local regression check
- Optionally enable remote CodeQL scanning and request remediation when access and policy permit
- Optimize a slow pipeline: add caching, parallelize jobs
- (Stretch) Compare a manual and agentic remediation path under the same review policy
- **Deliverable:** Three repaired pipelines, a tested security fix, and checked workflow improvements

**Expected Learning Outcomes:**

- Diagnose and fix CI/CD pipeline failures with Copilot assistance
- Review and test a proposed security fix; use remote code scanning when access permits
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
- Set up the lead, backend, tester, and scribe roles
- Have the lead assign Issue 001's `POST /api/users` input-validation change
- Let the backend implement the change and the tester add and run tests
- Have the lead review the result and the scribe record the decision
- Inspect Ralph's monitoring output after review; backlog implementation is optional
- **Deliverable:** One packet with the team structure, assignment, code and tests,
  passing `npm test` output, lead review, and committed decision record

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

**Lab Outline (2 hours 30 minutes):**

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
Start in the GitHub Copilot app with repository context. Learners check which
tools they can use, then create and review a working brief.

**Trainer Content Outline (1 hour):**

- Chats, Projects, My work, Search, Automations, and Customize
- Choose only the context approved for the task
- Skills, agents, MCP servers, canvases, and Automations
- Read, propose, review, write, and check the result

**Lab Outline (2 hours):**

- Compare an unscoped answer with a repository-grounded answer
- Create and commit a sourced working brief
- Revise the brief using the supplied new source material
- Check the saved brief in a fresh Copilot session
- **Deliverable:** A revised working brief with an answer comparison and a fresh-session check

---

### Session m7-02: Interview Ideas and Shape Better Work

**Difficulty:** Beginner
**Prerequisites:** Session m7-01
**Module:** Product and Delivery Teams

**Description:**
Use a decision-tree interview in the GitHub Copilot app to settle an unclear
request. Learners save the approved answers in a repository decision brief and
issue proposal.

**Trainer Content Outline (1 hour):**

- Ask questions in an order that resolves dependent decisions
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
Read the existing work through GitHub MCP before proposing an issue hierarchy.
Learners review the proposed write, create the approved issues, and read them
back to check the result.

**Trainer Content Outline (1 hour):**

- MCP from the tool user's point of view
- Read and write boundaries
- Outcome-based decomposition
- Preview and approve changes, then read the issues again to check the result

**Lab Outline (2 hours):**

- Read the approved decision brief
- Search for duplicate issues and existing labels
- Plan one parent issue and four child issues: public status mapping, requester
  status view, empty and stale states, and requester-access verification
- Keep any fifth issue optional and separate from those four workstreams
- Review and approve the complete GitHub write
- Retrieve the issues, apply one reviewed correction, and check it through another fresh read
- **Deliverable:** A live issue hierarchy with records of issue creation and correction

---

### Session m7-04: Build and Use a Planning Canvas

**Difficulty:** Intermediate
**Prerequisites:** Sessions m7-01 to m7-03; canvas creation access
**Module:** Product and Delivery Teams

**Description:**
Create a planning canvas from a plain-language request and load the issues from
Session m7-03. Learners check that the canvas shows the same planning state as
GitHub and Copilot.

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
  - Standard: 1 to 2 sessions/day across 15 days, with up to 7 teaching hours per day before breaks
  - Extended: 1 session/day across 29 days
- **Group size:** 8 to 15 trainees per cohort for optimal lab support
- **Module independence:**
  - Modules 1 to 3 form the technical core
  - Module 4 (DevOps) can be delivered independently after Module 1 and Sessions m2-01 to m2-02
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
