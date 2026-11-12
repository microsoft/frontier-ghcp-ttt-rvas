# Session M3-04 trainer guide: Custom agent boundaries

## Teaching goal

Start with a profile that enables every tool and permits any needed change. Run the contract, show why a test-only task can drift into production code, tighten the profile, and rerun the same test.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:06 | What a profile controls; custom vs general agent |
| 0:06 to 0:16 | Frontmatter and tool aliases |
| 0:16 to 0:23 | Selection; effects of tools, instructions, model |
| 0:23 to 0:32 | Weak profile and boundary violation |
| 0:32 to 0:41 | Least-privilege tools and path rules |
| 0:41 to 0:47 | Stop and handoff |
| 0:47 to 0:52 | Rerun the contract |
| 0:52 to 0:58 | Agent vs skill vs MCP |
| 0:58 to 1:00 | Lab handoff |

## Preparation

- Open the weak and tightened profiles side by side.
- Run `npm test` from `lab/starter/agent-project`.
- Keep `PROFILE-REFERENCE.md` and `BOUNDARY-EVIDENCE.md` open.
- Check the [custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration) page. Frontmatter fields differ by client and change over time.
- Optional stretch: set up the JavaScript LSP server with `lab/lsp-setup.md`. Skip it if time is short.

## Teaching sequence

### 0:00 to 0:06: What the profile controls

A profile supplies instructions and filters the tools the agent sees. It doesn't grant repository permissions.

```text
Profile: role, available tools, procedure, stop rules
Environment: actual tool permissions and repository access
Human: accepts, revises, or rejects the result
```

**Custom agent vs general agent.** Use a custom agent when the same role comes back often, it needs fewer tools than the default, it needs a stop rule or fixed procedure, or the team should get the same behavior. Use the general agent plus repository instructions for one-off work. If instructions are enough, don't make an agent.

### 0:06 to 0:16: Frontmatter and tool aliases

```text
.github/
└── agents/
    └── test-writer.agent.md
```

Walk the frontmatter from `PROFILE-REFERENCE.md`:

- `description` is required. Copilot reads it to choose the agent.
- `name` is optional.
- `tools` lists what the agent may use. Omit it or use `["*"]` and it gets everything, including MCP tools. `[]` means none. Unknown names are ignored, so a typo fails quietly.
- `model` is optional. Unset inherits the default.
- `target` is `vscode` or `github-copilot`. Unset means both.
- `disable-model-invocation: true` stops Copilot from picking the agent on its own. A person must select it. It replaces the retired `infer: false`.
- `user-invocable: false` hides the agent from people. Default is `true`.

Aliases, all case-insensitive: `read`, `search`, `edit`, `execute`, `agent`, `web`. MCP tools use `server-name/tool` or `server-name/*`.

The Markdown body tells the agent what it may do and when to stop. **Say once: check current docs.** Some fields (`metadata`, `mcp-servers`) don't apply in IDE agents.

### 0:16 to 0:23: Selection and effects

Three ways to start an agent in the CLI: `/agent`, naming it in a prompt, or `copilot --agent=NAME`. Copilot can also delegate to a custom agent by itself, based on `description`. Set `disable-model-invocation: true` when a wrong auto-pick is costly.

What changes behavior:

| Setting | Effect |
| --- | --- |
| Tools | Ceiling on what it can do |
| Instructions | How it works inside that ceiling, and where it stops |
| Model | Reasoning quality, speed, cost |

Too many tools means it can edit anything. Vague instructions mean it guesses. A weak model or an expensive one is a bad fit for the wrong task.

### 0:23 to 0:32: Weak profile

Open `weak-test-writer.agent.md`:

```yaml
tools: ["*"]
```

Its body says to make any changes needed. Run:

```bash
npm run check:weak
```

Use this conflict:

```text
Add tests for updateOrderStatus. Change tests only.
A new criterion allows reversing shipped to processing; the implementation
rejects it.
```

Nothing makes the profile stop before editing `src/`. The contract is broken even if one model run happens to stay in bounds.

### 0:32 to 0:41: Tighten tools and paths

Open `test-writer.agent.md`:

```yaml
tools:
  - read
  - search
  - edit
  - execute
```

The allowlist isn't enough: `edit` can still touch the wrong file. The body limits edits to `tests/` and names forbidden paths.

| Rule | Where it lives |
| --- | --- |
| Tool is available | Frontmatter |
| Only tests may change | Profile body |
| Repository blocks a write | Environment or repository policy |
| Change is accepted | Human review |

### 0:41 to 0:47: Stop and handoff

Read the production-conflict rule aloud. The correct output names:

- no files changed;
- the behavior that conflicts with the criteria;
- the forbidden production path;
- the decision a human must make.

Then run `npm test`. If the command can't run, the profile reports **not run** rather than success.

### 0:47 to 0:52: Rerun

```bash
npm run check:tight
npm test
```

The same contract now passes. Load the learner's profile with CLI `/agent` and run the conflict scenario. You need the actual stop report and unchanged source. A manual trace doesn't count as a live run.

### 0:52 to 0:58: Agent vs skill vs MCP

This matches M3-03 and M3-05: a skill gives **know-how**, a custom agent gives a **role**, an MCP server gives **reach**.

| Need | Use | Example |
| --- | --- | --- |
| Always applies | Instructions | "Use npm test" |
| How we do this | Skill | `release-notes` writes your changelog format |
| Act as a role with limits | Custom agent | `test-writer` edits `tests/` only |
| Reach a system | MCP server | GitHub or Microsoft Learn server |

They combine: an agent can use a skill and list the MCP tools it may call. Don't add MCP to a role that only needs repository files.

### 0:58 to 1:00: Lab handoff

See the lab handoff below. The LSP lookup is an optional stretch at the end of the lab.

## Prepared demonstration

1. Show the weak profile.
2. Run `check:weak` and read the failed checks.
3. Trace the production edit the weak wording permits.
4. Show the tightened frontmatter and body.
5. Run `check:tight` and the full tests.
6. Produce the stop report for the same conflict.
7. Keep the selected profile and result in `agent-run.md`.

## Common mistakes

- Treating `tools: ["*"]` as harmless convenience.
- Naming a role without naming paths.
- Writing "do not edit source" with no stop and handoff result.
- Reporting validation as passed when the command didn't run.
- Assuming the profile grants permission.
- Adding MCP to a role that doesn't need external data.
- Making a custom agent when repository instructions would do.
- Typing a tool name wrong. Unknown names are ignored.

## Lab handoff

Learners inspect the structure, run the failing weak profile, tighten it, and rerun the contract. They record a stop report with no source edits. The LSP lookup is an optional stretch in the last 15 minutes. The lab stays at 120 minutes.

## References

- [Creating custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents)
- [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [Invoking custom agents from Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/invoke-custom-agents)
- [Adding LSP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/add-lsp-servers)
