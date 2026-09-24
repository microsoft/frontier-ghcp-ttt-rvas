# Session 04: GitHub Copilot in the CLI Trainer Content

> **Duration:** 1 hour | **Difficulty:** Intermediate | **Module:** Copilot in Practice

---

## Session Overview

This session covers GitHub Copilot's standalone CLI. Trainers learn its terminal
workflows and when it fits better than an IDE. They also learn how to teach those
choices without overstating product behavior.

**Session focus:** The CLI supports scriptable workflows in headless environments.
It fits DevOps engineers, SREs, and other terminal-focused developers.

---

## Preparation Checklist

- [ ] Install the Copilot CLI: `npm install -g @github/copilot` (requires Node.js 22+)
- [ ] Authenticate: run `copilot` and use `/login`
- [ ] Use `lab/starter/agent-tasks/` for the demo and lab handoff
- [ ] Terminal with good font size for projection (24pt+)
- [ ] Test all demo commands beforehand because CLI versions change rapidly
- [ ] Have backup screenshots/recordings in case of auth issues
- [ ] Review the CLI-exclusive features table in Section 5

---

## Section 1: Why a Dedicated CLI Session? (5 min)

### Talking Points

Open with this framing:

> "You have already used Copilot in VS Code through Chat, inline suggestions, and agent mode. The CLI is a separate product surface with its own architecture and capabilities."

Walk through three reasons the CLI matters:

**1. It has its own agent loop**

- The `copilot` binary is standalone with its own agent loop
- It can read/write files, execute shell commands, manage Git, interact with GitHub.com, and orchestrate subagents

**2. It includes terminal-oriented features**

- Autopilot mode (no approval prompts)
- Programmatic mode for scripting (`-p` flag)
- Custom model providers (Ollama, Azure OpenAI, Anthropic)
- 6 built-in specialized agents
- Subagent orchestration with `/delegate` and `/fleet`
- Hooks system for CI/CD automation
- OpenTelemetry monitoring for enterprise observability

**3. It works where IDEs don't**

- SSH into remote servers
- CI/CD pipeline scripts
- Headless containers
- Environments where you can't install VS Code

> **Slide suggestion:** Use a Venn diagram to show IDE-only, shared, and CLI-only features.

### Transition

> "Start with installation and the first commands."

---

## Section 2: Installation & Setup (5 min)

### Talking Points

The CLI installs as a standalone binary, not a `gh` extension:

| Method         | Command                                            | Platform          |
| -------------- | -------------------------------------------------- | ----------------- |
| npm            | `npm install -g @github/copilot`                   | All (Node.js 22+) |
| Homebrew       | `brew install --cask github-copilot-cli`           | macOS             |
| WinGet         | `winget install GitHub.Copilot`                    | Windows           |
| Install script | `curl -fsSL https://gh.io/copilot-install \| bash` | macOS, Linux      |

**Authentication:**

- First launch: `/login` triggers an OAuth device flow
- For CI/CD: Set `COPILOT_GITHUB_TOKEN` or `GH_TOKEN` environment variable
- For GitHub Enterprise Server: `copilot login --host YOUR-GHES-HOST`

### Demo: Installation & First Launch

```bash
# Install (if not already installed)
npm install -g @github/copilot

# Launch
copilot

# You'll see the interactive interface
# Type a question: "What files are in the current directory?"
# Copilot will use the shell to answer

# Exit
/exit
```

> **Trainer tip:** Run through installation live if time permits. If the audience already has it installed, skip to the interactive interface and show the three sub-modes.

### Transition

> "Next, review the interactive experience."

---

## Section 3: Core Interactive Modes (10 min)

### Three Sub-Modes

The interactive CLI has three modes, cycled with `Shift+Tab`:

| Mode          | Behavior                                                                                  | When to Use                                                   |
| ------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Standard**  | Ask or execute; Copilot responds and asks permission before acting                       | Default. Most conversations.                                  |
| **Plan**      | Copilot analyzes, asks clarifying questions, builds a structured plan BEFORE writing code | Complex tasks where you want to review the approach first.    |
| **Autopilot** | Copilot works autonomously without asking for input at each step                          | Trusted tasks, batch operations, when you know what you want. |

> **Trainer note:** "Plan mode asks questions, develops an approach, and shows the plan before it writes code. You approve the plan, then it executes."

> **Autopilot:** "It does not stop to request approval for file edits, shell commands, or Git operations. Use it carefully."

### Slash Commands

The CLI has **40+ slash commands** that control every aspect of behavior. Here are the most important:

**Session Management:**

- `/clear` or `/new`: start a fresh conversation
- `/resume`: resume a previous session (sessions persist!)
- `/compact`: compress conversation to free up context window
- `/context`: visualize token usage
- `/usage`: inspect session information when the approved CLI exposes it

**Agentic Commands:**

- `/agent`: browse and select from available agents
- `/delegate`: send work to the cloud agent on GitHub
- `/fleet`: enable parallel subagent execution
- `/plan`: create an implementation plan before coding
- `/research`: deep research using GitHub search and the web
- `/review`: run the code review agent
- `/pr`: PR operations (view, create, fix, auto)
- `/diff`: review changes

**Configuration:**

- `/model`: select an AI model
- `/mcp`: manage MCP servers inline
- `/skills`: manage skills inline
- `/init`: generate `copilot-instructions.md` for your project

> **Slide suggestion:** A categorized slash command reference card. Highlight the ones marked "CLI-exclusive."

### Demo: Interactive Modes

```bash
# Start the CLI
copilot

# STANDARD MODE (default)
# Ask: "What does this project do?"
# Copilot reads files, explains

# PLAN MODE (press Shift+Tab)
# Ask: "Add input validation to all API endpoints"
# Copilot will ask questions: "What validation library?", "Which endpoints?"
# Then present a structured plan before coding

# AUTOPILOT MODE (press Shift+Tab again)
# Ask: "Fix all linting errors in src/"
# Copilot will find and fix without stopping to ask
# Watch it cycle through files autonomously
```

> **Trainer tip:** Have a project with linting errors ready. Autopilot can fix them
> without a risky demo. Do not use it for destructive operations.

### Transition

> "The CLI can also run **without interaction.**"

---

## Section 4: Programmatic Mode and Scriptable AI (10 min)

### Talking Points

This CLI feature lets you run a prompt from the command line.

**Programmatic mode (`-p`)** passes a prompt on the command line, Copilot executes it, then exits. You can embed Copilot in bash scripts, CI/CD pipelines, cron jobs, and automation workflows.

```bash
copilot -p "PROMPT" [OPTIONS]
```

### Key Flags for Scripting

| Flag                           | What it does                              |
| ------------------------------ | ----------------------------------------- |
| `-p "PROMPT"`                  | Single-shot prompt, exit when done        |
| `--allow-all-tools` / `--yolo` | Skip all approval prompts                 |
| `--allow-tool='shell(git)'`    | Allow only specific tools                 |
| `--deny-tool='shell(rm)'`      | Block specific tools                      |
| `--output-format=json`         | JSONL output for machine parsing          |
| `-s` / `--silent`              | Output only the agent's response          |
| `--share=PATH`                 | Export session to Markdown file           |
| `--autopilot`                  | Enable autonomous continuation            |
| `--max-autopilot-continues=10` | Cap autonomous iterations                 |
| `--no-ask-user`                | Disable all user prompts (fully headless) |

### Scripting examples

**1. Generate a changelog from git history:**

```bash
copilot -p "Generate a changelog from the last 10 commits" \
  --allow-tool='shell(git)' --silent > CHANGELOG.md
```

**2. Automated code review in CI:**

```bash
copilot -p "Review the changes in this PR for security issues" \
  --allow-tool='shell(git)' --output-format=json | \
  jq '.content' > review-results.txt
```

**3. Batch refactoring:**

```bash
copilot -p "Rename all snake_case variables to camelCase in src/" \
  --allow-all-tools --autopilot --max-autopilot-continues=20
```

**4. Infrastructure validation:**

```bash
copilot -p "Check this Terraform for security issues and fix them" \
  --allow-tool='view' --allow-tool='edit' --allow-tool='shell(terraform)' \
  --autopilot
```

> **Trainer note:** "Programmatic mode supports automation in CI/CD pipelines, Git hooks, and deployment scripts."

### Fine-Grained Tool Permissions

The permission system uses `Kind(argument)` syntax for precise control:

```bash
# Allow all git commands except push
copilot --allow-tool='shell(git:*)' --deny-tool='shell(git push)'

# Allow specific MCP tools
copilot --allow-tool='MyMCP(create_issue)'

# Block reading sensitive files
copilot --deny-tool='read(.env)' --deny-tool='read(**/secrets/*)'

# Only allow read operations (safe for CI analysis)
copilot --available-tools='view,grep,glob'
```

> **Trainer tip:** The permission system lets you restrict what Copilot can access in CI/CD.

### Demo: Programmatic Mode

```bash
# Simple: explain a command (one-shot, exits after)
copilot -p "Explain what 'git rebase -i HEAD~3' does" --silent

# Generate: create a file from description
copilot -p "Create a Python script that reads a CSV and outputs summary statistics" \
  --allow-tool='create' --silent

# Pipeline: feed Copilot into another command
copilot -p "List all TODO comments in this project" \
  --allow-tool='shell(grep)' --silent | sort | uniq -c | sort -rn
```

### Transition

> "Programmatic mode supports scripting. The CLI also includes specialized agents."

---

## Section 5: Built-in Agents & Subagent Architecture (10 min)

### Talking Points

The CLI ships with **5 verified built-in specialized agents**, each optimized for a specific task type:

| Agent           | Purpose                                                             |
| --------------- | ------------------------------------------------------------------- |
| **Explore**     | Fast codebase exploration and Q&A                                   |
| **Task**        | Command execution such as tests, builds, and lints                  |
| **Code Review** | High signal-to-noise review of diffs for bugs, security, and logic  |
| **Plan**        | Structured implementation planning before coding                    |
| **Rubber Duck** | Adversarial feedback that identifies weak points in designs/answers |

> "The main agent can delegate work to these specialists. For a complex task, it can explore the codebase first, then run tests with the task agent."

### Subagent Orchestration

The CLI has a full orchestration system:

- Main agent delegates tasks to subagents running in **separate context windows**
- Subagents can be nested up to 6 levels deep
- Up to 32 subagents can run concurrently
- `/fleet` enables parallel execution of task parts

**`/delegate`:** Send work to the Copilot cloud agent on GitHub:

```
/delegate Create a PR that fixes issue #42
```

This creates a branch, writes code, and opens a draft PR from your terminal.

**`/fleet`:** Run subagents in parallel:

```
/fleet Refactor all 5 service modules to use the new logging library
```

The CLI spawns multiple subagents to work on different modules simultaneously.

**`/research`:** Start deep research mode:

```
/research What are the best practices for rate limiting in Express.js?
```

Uses the research agent (Sonnet 4.6) to search GitHub repos, read documentation, and produce a report.

**`/tasks`:** Monitor background subagents:

```
/tasks
```

Shows status of all running subagents.

> **Trainer note:** "The CLI can run subagents in parallel with `/fleet`."

### Demo: Subagent Orchestration

```bash
copilot

# Use /research for a deep dive
/research How does authentication work in this codebase?

# Use /delegate to send work to the cloud
/delegate Write tests for the user authentication module

# Check on background tasks
/tasks
```

### Transition

> "The CLI also lets you connect other AI models."

---

## Section 6: CLI-Exclusive Power Features (10 min)

### Custom Model Providers

You can connect alternative AI providers:

| Provider             | Setup                                     |
| -------------------- | ----------------------------------------- |
| **Ollama** (local)   | `copilot --model ollama:deepseek-coder`   |
| **Azure OpenAI**     | Configure via environment variables       |
| **Anthropic Direct** | `copilot --model anthropic:claude-opus-4` |

> "If policy prevents sending code to GitHub's servers, point the CLI at a local
> Ollama instance that runs an open-source model. The CLI agent can then use that
> local model."

### Hooks System for CI/CD Automation

Hooks are external commands that fire at lifecycle points. Configured in `.github/hooks/*.json`:

| Event               | When                             | Can Block?                       |
| ------------------- | -------------------------------- | -------------------------------- |
| `preToolUse`        | Before each tool executes        | **Yes:** can allow/deny/modify   |
| `postToolUse`       | After tool completes             | **Yes:** can replace result      |
| `permissionRequest` | Before showing permission dialog | **Yes:** auto-approve/deny       |
| `sessionStart`      | Session begins                   | No                               |
| `agentStop`         | Agent finishes a turn            | **Yes:** can force continuation  |
| + 8 more events     | Various lifecycle points         | Various                          |

**Use cases:**

- Run SAST scanning before file edits are committed
- Log all tool invocations for audit/compliance
- Ensure tests pass before allowing `git push`
- Auto-run linting after every file edit
- Programmatic tool approval in headless CI/CD mode

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [{
      "type": "command",
      "bash": "./scripts/validate-edit.sh",
      "timeoutSec": 30
    }]
  }
}
```

### ACP Server Mode (Preview)

The CLI can function as an **AI backend** for any ACP-compatible tool:

```bash
copilot --acp --transport=sse --port=8080
```

This turns Copilot into a server for requests from custom IDE integrations, web
interfaces, or automation tools.

### OpenTelemetry Monitoring

Enterprise observability for AI agent usage:

```bash
copilot --otel-endpoint=http://localhost:4318
```

This produces traces, spans, and metrics for agent actions such as tool calls,
model requests, and token use. Send them to Grafana, Datadog, or another
OTLP-compatible backend.

> **Trainer tip:** This matters most for enterprise audiences. Pair with Session 17 (Enterprise Governance) for organizations that need to monitor AI agent behavior.

### Session Management & Remote Access

- **Session persistence:** Sessions are saved and can be resumed (`copilot --continue`)
- **Cross-device resume:** Start on GitHub.com, continue in CLI (`/resume`)
- **Remote access:** `/remote` enables access from GitHub.com and GitHub Mobile
- **Session sharing:** `/share gist` exports your session as a GitHub gist

### Transition

> "Choose the CLI or IDE based on the work."

---

## Section 7: CLI vs IDE Decision Framework (5 min)

### Talking Points

Present this decision framework for CLI, IDE Chat, IDE Agent Mode, and Copilot App:

| Scenario                              | CLI | IDE Chat | IDE Agent | Copilot App |
| ------------------------------------- | --- | --- | --- | --- |
| SSH'd into remote server              | ✅  | ❌  | ❌  | ❌  |
| Scripting/CI/CD automation            | ✅  | ❌  | ❌  | ❌  |
| Quick shell command help              | ✅  | ❌  | ❌  | ⚠️  |
| Custom/local model needed             | ✅  | ❌  | ❌  | ❌  |
| Deep codebase research                | ✅  | ✅  | ❌  | ⚠️  |
| Parallel multi-agent orchestration    | ✅  | ❌  | ❌  | ❌  |
| Writing code in an IDE editor         | ❌  | ✅  | ✅  | ❌  |
| Visual diff review before accepting   | ❌  | ❌  | ✅  | ❌  |
| Inline suggestions while typing       | ❌  | ❌  | ✅  | ❌  |
| Multi-file refactoring w/ visual diffs| ❌  | ❌  | ✅  | ❌  |
| Quick question about selected code    | ❌  | ✅  | ❌  | ✅  |
| Chat-only (no coding)                 | ⚠️  | ✅  | ❌  | ✅  |
| Shared artifact and direct steering   | ❌  | ❌  | ⚠️  | ✅  |

#### Understanding the Surfaces

**CLI** supports automation, scripting, and headless environments. It offers programmatic control and parallel subagents. It fits operators, SREs, and CI/CD pipelines.

**IDE Chat:** Use it for quick questions and refinements without leaving the
editor. It can use open-file context.

**IDE Agent Mode:** Use it for multi-step coding tasks that need visual control.
Review diffs before accepting complex edits or refactors.

**Copilot App:** Use this dedicated surface for app-managed agent sessions or a
shared canvas. Session 08 covers the Customize area, plugins, and canvas
extensions.

> "Use the IDE for daily coding, the CLI for terminal automation, Chat for short questions, and the App when shared state helps people steer the work."

### Copilot App Orientation

The Copilot App gives teams a dedicated place to run agent sessions and manage customizations. Keep this part of Session 04 brief. Session 08 covers the App in depth.

**Key capabilities:**

- **Agent sessions:** Work in an app-managed session when that surface fits the task.
- **Customize area:** Discover plugins, skills, MCP servers, and canvases.
- **Shared canvases:** Work with an agent on a visible plan, board, or checklist.
- **Approved access:** Confirm the enabled plan, features, data boundary, and policy.

**When to use:**

- Inspecting or steering work that benefits from a shared artifact
- Discovering approved plugins and other app customizations
- Starting a canvas workflow after Session 08

**Trainer talking point:**

> "The Copilot App is another Copilot surface. It is also where people can work with shared canvases and manage customizations. We will use the CLI for terminal work today. Session 08 covers the App and canvas extensions."

### Cross-IDE Comparison

Copilot works across multiple IDEs, though the IDE environment affects which features are available:

| IDE | Completions | Chat | Agent Mode | Notes |
| --- | --- | --- | --- | --- |
| **VS Code** | ✅ (GA) | ✅ (GA) | ✅ (GA) | Primary platform, most features first |
| **Visual Studio** | ✅ (GA) | ✅ (GA) | ✅ (GA) | Full support for .NET developers |
| **JetBrains** (IntelliJ, PyCharm, WebStorm) | ✅ (GA) | ✅ (GA) | ✅ (GA) | Excellent support for multi-language work |
| **Eclipse** | ✅ (GA) | ✅ (GA) | ✅ (Preview) | Agent mode in preview |
| **Xcode** | ✅ (GA) | ✅ (GA) | ✅ (Preview) | Apple dev-focused; agent mode in preview |
| **Vim / Neovim** | ✅ (GA) | ❌ | ❌ | Completions only; minimal overhead |
| **Azure Data Studio** | ✅ (GA) | ✅ (GA) | ❌ | Database-focused, no agent mode |
| **Sublime Text** | ✅ (GA) | ✅ (GA) | ❌ | Lightweight, no agent mode |

**Trainer talking point:**

> "This curriculum uses **VS Code as the baseline IDE**. Copilot also works in
> Visual Studio, IntelliJ, Vim, Sublime, and other editors. Check the current
> feature matrix before teaching a different IDE because support varies."

### CLI vs IDE: The Complementary Approach

**Teaching point:** The CLI and IDE support different parts of the workflow.

- **Use the IDE** when you're actively writing and editing code in a graphical editor
- **Use the CLI** when you're automating, scripting, operating in headless environments, or need to orchestrate parallel agents
- **Use Copilot App** when a shared canvas or app-managed session fits the work
- **Use IDE Chat** for rapid Q&A without leaving your editor

> "A team may use the IDE for feature work, the CLI for deployment automation, and
> Copilot App for an app-managed review session. Pick the surface for the task."

### CLI-Native Workflow Patterns

**1. The Ops/SRE Pattern:**

```bash
ssh prod-server
copilot -p "Analyze the last 100 lines of /var/log/app.log and identify errors" \
  --allow-tool='shell(tail,grep,cat)' --silent
```

**2. The CI/CD Pattern:**

```bash
# In a GitHub Actions workflow step
copilot -p "Review the diff for this PR" \
  --allow-tool='shell(git)' --output-format=json > review.json
```

**3. The Automation Pattern:**

```bash
# Nightly cron job: generate reports
copilot -p "Generate a weekly code quality report for src/" \
  --allow-tool='view,grep,glob' --silent > reports/weekly-$(date +%F).md
```

**4. The Data Engineer Pattern:**

```bash
copilot -p "Explain the schema in migrations/ and suggest indexes for common queries" \
  --allow-tool='view,grep' --silent
```

> **Trainer note:** "Use the IDE when you are writing code, the CLI when you are automating, and the App when it provides the right shared surface."

---

## Section 8: Wrap-up & Transition to Session 05 (5 min)

### What to remember

1. **The CLI is a standalone agentic system**
2. **Programmatic mode (`-p`)** makes AI scriptable for CI/CD and automation
3. **Built-in agents and /fleet** enable parallel multi-agent orchestration
4. **Custom model providers** let you use local/private AI models
5. **The hooks system** enables enterprise security controls and audit
6. **Use the CLI or IDE based on the task context**

### Connection to Next Session

> "Session 05 covers agent mode in the IDE. It uses visual diffs and inline changes
> for a tighter edit-and-review loop. The CLI remains the terminal automation
> surface."

---

## Common Q&A

**Q: Do I need both the CLI and the IDE extension?**
A: Use the surface that fits the task and is approved for the environment. Confirm current entitlement and metering behavior in official documentation and the applicable policy.

**Q: How is CLI use metered?**
A: Do not teach a fixed rule. Check the current official billing documentation with the administrator and honor the agreed metered-work stop guard.

**Q: Can I use the CLI in GitHub Actions?**
A: Yes. Use programmatic mode with `--yolo` or specific `--allow-tool` flags.
Authenticate through `GITHUB_TOKEN`.

**Q: Is the CLI safe for production servers?**
A: With proper permission controls (`--available-tools`, `--deny-tool`), yes. The fine-grained permission system lets you lock down exactly what the CLI can do. Never use `--yolo` on production.

**Q: Can I use Copilot CLI without internet?**
A: Only with custom model providers pointing to a local model (e.g., Ollama). GitHub-hosted models require internet connectivity.

**Q: How does the CLI handle large codebases?**
A: Auto-compaction keeps conversations going virtually forever. The `/context` command shows token usage. The explore agent uses fast Haiku models for efficient codebase scanning.

**Q: Can I share sessions with my team?**
A: Yes. `/share gist` creates a secret GitHub gist, and `/share file PATH` exports
to Markdown. Sessions can also be resumed across devices.

---

## Slide Suggestions

1. **Title slide:** "GitHub Copilot in the CLI — Your Terminal's AI Agent"
2. **Three Modes:** Standard / Plan / Autopilot with descriptions
3. **Programmatic Mode:** Code examples showing CI/CD integration
4. **Built-in Agents:** Table of 5 verified agents and purposes
5. **Subagent Architecture:** Diagram showing main agent → subagents → /fleet
6. **CLI-Exclusive Features:** Venn diagram (CLI-only / Shared / IDE-only)
7. **Custom Model Providers:** Ollama / Azure OpenAI / Anthropic logos
8. **Hooks System:** Lifecycle event diagram
9. **Decision Framework:** When to use CLI vs IDE table
10. **CLI Workflow Patterns:** 4 patterns (Ops, CI/CD, Automation, Data)
11. **What to remember:** 6 bullet points

---

## Time Budget

| Section                         | Duration   | Cumulative   |
| ------------------------------- | ---------- | ------------ |
| 1. Why a CLI Session?           | 5 min      | 5 min        |
| 2. Installation & Setup         | 5 min      | 10 min       |
| 3. Core Interactive Modes       | 10 min     | 20 min       |
| 4. Programmatic Mode            | 10 min     | 30 min       |
| 5. Built-in Agents & Subagents  | 10 min     | 40 min       |
| 6. CLI-Exclusive Power Features | 10 min     | 50 min       |
| 7. CLI vs IDE Framework         | 5 min      | 55 min       |
| 8. Wrap-up & Transition         | 5 min      | 60 min       |
