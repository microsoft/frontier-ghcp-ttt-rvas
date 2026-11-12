# Session M2-01: GitHub Copilot in the CLI trainer content

> **Duration:** 1 hour | **Difficulty:** Intermediate | **Module:** Copilot in Practice

Demonstrate the standalone CLI in terminal workflows and show when it beats an
IDE. Use `lab/starter/agent-tasks/` for the demos.

## Before delivery

- Install the CLI (`npm install -g @github/copilot`, Node.js 22+) and run `/login`.
- Set the terminal font to 24pt or larger.
- Rehearse every demo. CLI versions change quickly.
- Check `/plan`, `/fleet`, `/tasks`, `/usage`, `/rubber-duck`, `/subagents`,
  `/rewind`, `/fork worktree`, `/move`, `/resume`, and `/limits` in the installed
  version, including the limit's units, minimum, scope, and reset behavior.
- Check the permission mode and sandbox policy. Don't weaken them.
- Agree a usage limit and practice stopping a child task.
- Rehearse `Ctrl+Q` and `Ctrl+X, b` with the lab's 15-second command.

## Section 1: Why a dedicated CLI session? (5 min)

> "You've used Copilot in VS Code through Chat, inline suggestions, and agent mode.
> The CLI is a separate surface with its own agent loop."

**It has its own agent loop.** The `copilot` binary reads and writes files, runs
shell commands, manages Git, talks to GitHub.com, and orchestrates subagents.

**It has terminal-oriented features:**

- Autopilot mode for autonomous continuation (tool permissions still apply)
- Programmatic mode (`-p`) for scripting
- Custom model providers (Ollama, Azure OpenAI, Anthropic)
- Built-in specialized agents (check the installed version for the list)
- Parallel subagents with `/fleet`, cloud delegation with `/delegate`
- Hooks for CI/CD automation
- OpenTelemetry monitoring

**It works where IDEs don't:** SSH sessions, CI/CD scripts, headless containers,
and machines where you can't install VS Code.

## Section 2: Installation and setup (5 min)

The CLI is a standalone binary, not a `gh` extension.

| Method | Command | Platform |
| --- | --- | --- |
| npm | `npm install -g @github/copilot` | All (Node.js 22+) |
| Homebrew | `brew install --cask github-copilot-cli` | macOS |
| WinGet | `winget install GitHub.Copilot` | Windows |
| Install script | `curl -fsSL https://gh.io/copilot-install \| bash` | macOS, Linux |

**Authentication:** `/login` on first launch starts an OAuth device flow. In
CI/CD, set `COPILOT_GITHUB_TOKEN` or `GH_TOKEN`.

```bash
copilot
# Ask: "What files are in the current directory?"
/exit
```

If learners already have it installed, skip to the interactive interface.

## Section 3: Core interactive modes (10 min)

`Shift+Tab` cycles three modes:

| Mode | Behavior | Use it when |
| --- | --- | --- |
| **Standard** | Copilot responds and asks permission before acting | Default for most work |
| **Plan** | Copilot analyzes, asks questions, and builds a plan before writing code | You want to review the approach first |
| **Autopilot** | Copilot works without asking at each step | The task is narrow and you know what you want |

Autopilot can continue without another prompt, but tool permissions still apply.
Keep the task small and read the result.

**Required lab practice:** run `/plan`, challenge one assumption, and request a
`/rubber-duck` critique before approving. Check findings against the source, then
revise or explain what you rejected. Check the diff before approval and after
implementation.

Rubber duck is a built-in, read-only critic. Copilot picks a contrasting model
when one is available. Check `/subagents` Proactive invocation and leave it
unchanged. The opt-in persists and adds model usage.

Plan mode protects project edits during planning. It isn't a sandbox for external
or MCP tools, so keep those permissions restricted. A normal "plan first" prompt
isn't Plan mode.

### Slash commands

The CLI has 40+ slash commands. The ones this session uses:

- **Session:** `/clear` or `/new`, `/resume`, `/compact`, `/context`, `/usage`
- **Agents:** `/agent`, `/delegate` (cloud agent), `/fleet` (parallel subagents),
  `/plan`, `/research`, `/review`, `/security-review` (practiced in M2-04), `/pr`,
  `/diff`
- **Configuration:** `/model`, `/mcp`, `/skills`, `/init` (generates
  `copilot-instructions.md`)

The app also provides `/plan`, `/fleet`, and `/review`.

### Demo: interactive modes

```bash
copilot
# Standard: "What does this project do?"

/plan Explain the failing behaviors in src/app.js. Name the files and tests for the smallest fixes. Do not implement.

# Challenge it: "Preserve response fields and status codes. Revise the affected steps."
# Check git diff, then approve implementation
```

Show where learners save both plan versions in `workflow-record.md`.

## Section 4: Programmatic mode (10 min)

`-p` runs one prompt and exits. Use it in scripts, CI/CD, and cron.

```bash
copilot -p "PROMPT" [OPTIONS]
```

| Flag | What it does |
| --- | --- |
| `-p "PROMPT"` | Single-shot prompt, exit when done |
| `--allow-tool='shell(git log)'` | Pre-approve that operation; other permissions still apply |
| `--deny-tool='shell(rm)'` | Block specific tools |
| `--output-format=json` | JSONL output for machine parsing |
| `-s` / `--silent` | Output only the agent's response |
| `--share=PATH` | Export session to Markdown |
| `--autopilot` | Enable autonomous continuation |
| `--max-autopilot-continues=10` | Cap autonomous iterations |
| `--no-ask-user` | Disable all user prompts (fully headless) |

**Changelog from git history:**

```bash
copilot -p "Generate a changelog from the last 10 commits" \
  --allow-tool='shell(git)' --silent > CHANGELOG.md
```

**Review a diff in CI:**

```bash
copilot -p "Summarize the current diff. Do not edit files." \
  --allow-tool='shell(git diff)' --output-format=json > review-events.jsonl
```

Check the exit status before parsing. A JSON parser accepting the file doesn't
mean the task succeeded. To get the answer, extract it using the event schema of
the installed version, then validate it. Don't assume every event has a
`.content` field.

**Infrastructure validation:**

```bash
copilot -p "Check this Terraform for security issues and fix them" \
  --allow-tool='view' --allow-tool='edit' --allow-tool='shell(terraform)' \
  --autopilot
```

For refactoring, use the lab's `/plan` flow to review scope before edits. Don't
remove permission prompts to finish a demo.

### Fine-grained tool permissions

`Kind(argument)` syntax restricts individual operations:

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

### Demo

```bash
copilot -p "Explain what 'git rebase -i HEAD~3' does" --silent

copilot -p "Create a Python script that reads a CSV and outputs summary statistics" \
  --allow-tool='create' --silent

copilot -p "List all TODO comments in this project" \
  --allow-tool='shell(grep)' --silent | sort | uniq -c | sort -rn
```

## Section 5: Built-in agents and subagents (10 min)

Check `/agent` for the installed agents.

| Agent | Purpose |
| --- | --- |
| **Explore** | Fast codebase exploration and Q&A |
| **Task** | Commands such as tests, builds, and lints |
| **Code Review** | High signal-to-noise review of diffs for bugs, security, and logic |
| **Security Review** | Read-only review of current changes for exploitable vulnerabilities |
| **Rubber Duck** | Adversarial feedback on designs and answers |

**Plan is a mode**, not a custom agent. `/plan` prepares an implementation plan.

The main agent delegates to specialists in **separate context windows**. For a
complex task it might explore first, then run tests with the task agent.
Available concurrency depends on plan and configuration.

**`/delegate`** sends work to the Copilot cloud agent. It creates a branch, writes
code, and opens a draft PR:

```text
/delegate Create a PR that fixes issue #42
```

Cloud delegation is practiced in M3-02. It doesn't replace the local fleet run.

**`/fleet`** delegates independent work:

```text
/fleet Use the accepted analysis plan. Inspect route behavior, utility contracts,
and test gaps as independent read-only tasks. Cite files. Do not edit or use the
network. Stop on scope growth or the agreed usage limit.
```

Copilot decides how to split the work. Don't promise one agent per bullet or a
speedup. Keep shared decisions with the parent and check every accepted claim. The
app's `/orchestrate` skill is taught in M7-05.

**`/research`** runs deep research and produces a report. Check its citations.

```text
/research What are the best practices for rate limiting in Express.js?
```

**`/tasks`** monitors background subagents. Open a task's details, stop it if it
leaves scope, and finish with `/usage`.

### Demo

```bash
copilot
/fleet Inspect routes, utilities, and test gaps using the accepted plan.
/tasks
/usage
```

## Section 6: Terminal automation and session control (10 min)

Show the controls, then the lab's recovery flow. The providers, hooks, ACP, and
telemetry material below is reference, not part of the hour.

```text
/permissions show
/sandbox status
/sandbox policy node --version
/limits
```

Tool approval and the sandbox are different. Approval decides whether a tool runs.
The sandbox limits filesystem and network access. Don't disable the sandbox or
change the permission mode to remove a denial.

Record the original `/limits` value, then set a trainer-agreed soft AI-credit
limit. Restore the original afterward. GitHub's command reference describes
per-response limits, and its session-limit guide describes a cumulative cap. Check
what the installed UI shows. If the scope is unclear, stop before the metered
task.

Show the 15-second command from the lab. Queue a follow-up with `Ctrl+Q`, move the
command to the background with `Ctrl+X, b`, and inspect `/tasks`. Check the real
output before trusting the queued follow-up's summary. `Ctrl+S` stashes a draft
without sending it. Backgrounding doesn't detach the process or isolate writes.

For recovery, commit a repair, let the agent create a disposable note, then open
`/rewind`. Conversation-only and conversation-plus-files differ. Rewind doesn't
undo external writes or replace Git rollback.

Use `/fork worktree` to carry context to a new checkout of `HEAD`. A plain fork
shares files. Move only the disposable draft with `/move`, compare the old and new
paths, and return with `/resume`. Don't merge the alternative.

### Custom model providers

| Provider | Setup |
| --- | --- |
| **Ollama** (local) | `copilot --model ollama:deepseek-coder` |
| **Azure OpenAI** | Configure via environment variables |
| **Anthropic Direct** | `copilot --model anthropic:claude-opus-4` |

> "If policy stops you sending code to GitHub's servers, point the CLI at a local
> Ollama instance running an open-source model."

### Hooks

Hooks are external commands that fire at lifecycle points. Configure them in
`.github/hooks/*.json`:

| Event | When | Can block? |
| --- | --- | --- |
| `preToolUse` | Before each tool executes | **Yes:** allow, deny, or modify |
| `postToolUse` | After a tool completes | **Yes:** can replace the result |
| `permissionRequest` | Before the permission dialog | **Yes:** auto-approve or deny |
| `sessionStart` | Session begins | No |
| `agentStop` | Agent finishes a turn | **Yes:** can force continuation |
| + 8 more events | Various lifecycle points | Various |

Uses: SAST scanning before edits are committed, logging tool calls for audit,
running tests before `git push`, linting after every edit, and tool approval in
headless CI/CD.

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

### ACP server mode (preview)

The CLI can act as an **AI backend** for any ACP-compatible tool, such as custom
IDE integrations, web interfaces, or automation:

```bash
copilot --acp --transport=sse --port=8080
```

### OpenTelemetry monitoring

```bash
copilot --otel-endpoint=http://localhost:4318
```

This produces traces, spans, and metrics for tool calls, model requests, and token
use. Send them to Grafana, Datadog, or any OTLP-compatible backend. It matters most
for enterprise audiences.

### Session management and remote access

- **Resume:** `copilot --continue`
- **Cross-device:** start on GitHub.com, continue in the CLI with `/resume`
- **Remote:** `/remote` opens access from GitHub.com and GitHub Mobile
- **Sharing:** `/share gist` exports the session as a gist

Show `/context` before a phase change. Use `/compact Preserve the accepted plan,
changed files, and remaining checks` to continue the same thread, and note that a
summary can lose detail. Save the accepted plan and test output in the workflow
record before starting a fresh session.

## Section 7: CLI vs IDE decision framework (5 min)

| Scenario | CLI | IDE Chat | IDE Agent | Copilot App |
| --- | --- | --- | --- | --- |
| SSH'd into a remote server | Yes | No | No | No |
| Scripting and CI/CD automation | Yes | No | No | No |
| Quick shell command help | Yes | No | No | Check support |
| Custom or local model | Check provider support | Check editor | Check editor | Check provider support |
| Deep codebase research | Yes | Yes | Check editor | Yes |
| Parallel multi-agent orchestration | Yes | Check editor | Check editor | Yes |
| Writing code in an editor | No | Yes | Yes | No |
| Visual diff review before accepting | `/diff` | Check editor | Yes | Yes |
| Inline suggestions while typing | No | No | Yes | No |
| Multi-file refactoring with visual diffs | No | No | Yes | No |
| Quick question about selected code | No | Yes | No | Yes |
| Chat-only (no coding) | Check support | Yes | No | Yes |
| Shared artifact and direct steering | No | No | Check support | Yes |

- **CLI:** automation, scripting, headless environments, parallel subagents.
  Fits operators, SREs, and CI/CD.
- **IDE Chat:** quick questions and refinements with open-file context.
- **IDE Agent Mode:** multi-step coding with visual control. Review diffs before
  accepting complex edits.
- **Copilot App:** isolated developer sessions and review (M2-05), customization
  and canvas extensions (M3-01), and supervised child sessions with
  `/orchestrate` (M7-05).

> "Use the IDE for daily coding, the CLI for terminal automation, Chat for short
> questions, and the App when shared state helps people steer the work."

### Copilot App orientation

The App is another Copilot surface. M3-01 covers it in depth. In brief:

- **Agent sessions** are app-managed.
- **Customize** area: plugins, skills, MCP servers, and canvases.
- **Shared canvases:** work with an agent on a visible plan, board, or checklist.

### Cross-IDE comparison

| IDE | Completions | Chat | Agent Mode | Notes |
| --- | --- | --- | --- | --- |
| **VS Code** | Yes (GA) | Yes (GA) | Yes (GA) | Primary platform, most features first |
| **Visual Studio** | Yes (GA) | Yes (GA) | Yes (GA) | Full support for .NET developers |
| **JetBrains** (IntelliJ, PyCharm, WebStorm) | Yes (GA) | Yes (GA) | Yes (GA) | Multi-language work |
| **Eclipse** | Yes (GA) | Yes (GA) | Yes (Preview) | |
| **Xcode** | Yes (GA) | Yes (GA) | Yes (Preview) | Apple development |
| **Vim / Neovim** | Yes (GA) | No | No | Completions only |
| **Azure Data Studio** | Yes (GA) | Yes (GA) | No | Database-focused |
| **Sublime Text** | Yes (GA) | Yes (GA) | No | Lightweight |

> "This curriculum uses **VS Code as the baseline IDE**. Check the current feature
> matrix before teaching a different IDE."

### CLI-native workflow patterns

**Ops/SRE:**

```bash
ssh prod-server
copilot -p "Analyze the last 100 lines of /var/log/app.log and identify errors" \
  --allow-tool='shell(tail,grep,cat)' --silent
```

**CI/CD** (in a GitHub Actions step):

```bash
copilot -p "Review the diff for this PR" \
  --allow-tool='shell(git)' --output-format=json > review.json
```

**Automation** (nightly cron):

```bash
copilot -p "Generate a weekly code quality report for src/" \
  --allow-tool='view,grep,glob' --silent > reports/weekly-$(date +%F).md
```

**Data engineering:**

```bash
copilot -p "Explain the schema in migrations/ and suggest indexes for common queries" \
  --allow-tool='view,grep' --silent
```

## Section 8: Wrap-up (5 min)

1. The CLI is a standalone agent.
2. `-p` makes Copilot scriptable for CI/CD and automation.
3. Built-in agents and `/fleet` run work in parallel.
4. Custom model providers allow local or private models.
5. Hooks add security controls and audit.
6. Pick the CLI or IDE by the task.

> "M2-02 covers agent mode in the IDE, with visual diffs and inline changes. The
> CLI stays the terminal automation surface."

## Common questions

**Do I need both the CLI and the IDE extension?**
Use the surface that fits the task.

**Can I use the CLI in GitHub Actions?**
Yes. Use programmatic mode with task-specific permissions and the documented
authentication. M4-01 covers workflow setup.

**Is the CLI safe for production servers?**
This lab uses a synthetic local project. Production use needs its own permission
and data review.

**Can I use the CLI without internet?**
Only with a custom provider pointing at a local model such as Ollama. GitHub-hosted
models need a connection.

**How does the CLI handle large codebases?**
`/context` shows usage. `/compact` summarizes the thread and can lose detail. Keep
the accepted plan and test results in files, and start a fresh session with a
handoff when the old conversation stops helping.

**Can I share sessions with my team?**
Yes. `/share gist` creates a secret gist, and `/share file PATH` exports Markdown.
You can also resume across devices.

## Time budget

| Section | Duration | Cumulative |
| --- | --- | --- |
| 1. Why a CLI session? | 5 min | 5 min |
| 2. Installation and setup | 5 min | 10 min |
| 3. Core interactive modes | 10 min | 20 min |
| 4. Programmatic mode | 10 min | 30 min |
| 5. Built-in agents and subagents | 10 min | 40 min |
| 6. Automation and session control | 10 min | 50 min |
| 7. CLI vs IDE framework | 5 min | 55 min |
| 8. Wrap-up | 5 min | 60 min |

## Lab

The lab runs 120 minutes: setup 15, plan and repair 40, programmatic and fleet 35,
recovery and surface choice 30. Learners pick two command-generation examples and
one surface-comparison task. Require `workflow-record.md`, passing tests, a
reviewed diff, and a health report. Each accepted child claim needs a file
reference or focused test. The lab requires `/fleet`. `/delegate` doesn't replace
it.

## References

- [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [Plan and fleet workflow](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/speed-up-task-completion)
- [App slash commands](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [Rubber duck](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck)
- [Session-limit guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit)
