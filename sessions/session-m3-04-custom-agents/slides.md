---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M3-04: Custom Agents & Agent Profiles'
---

<!-- _class: lead -->

# Custom agents

## Write a profile with limits, then test it the same way every time

Session M3-04 | 3 hours

---

<!-- _class: agenda -->

# Agenda

| Segment | Time |
| --- | --- |
| What a profile controls, and when it beats a general agent | 6 min |
| `.agent.md` frontmatter and tool aliases | 10 min |
| How an agent is selected; tools, instructions, model | 7 min |
| Scope in the body: vague profiles drift | 9 min |
| Least-privilege tools and paths | 9 min |
| Stop conditions and human handoff | 6 min |
| Test an agent the same way every time | 5 min |
| Agent vs skill vs MCP | 6 min |
| Common mistakes and lab handoff | 2 min |

---

# A profile is a role contract

```text
Profile
  role + tools + procedure + stop rules

Environment
  actual permissions + repository access

Human
  accept + revise + reject
```

The profile guides behavior. It doesn't grant authority.

---

# Custom agent vs general agent

A **custom agent** is a saved role: instructions, a tool list, and optionally a model, in one Markdown file the team can review.

| Use the general agent | Use a custom agent |
| --- | --- |
| One-off or exploratory work | The same role, again and again |
| Rules fit in repository instructions | The role needs **fewer tools** than the default |
| You steer every step | It needs a **stop rule** or a fixed procedure |
| One person, one session | A team should get **the same behavior** |

If instructions are enough, don't make an agent.

---

# Repository profile structure

```text
.github/
└── agents/
    └── test-writer.agent.md
```

YAML frontmatter plus a Markdown body. The filename identifies the profile.

---

# Frontmatter example

```yaml
---
name: Test-only writer
description: Adds focused JavaScript tests in tests/ and stops when production code must change.
target: github-copilot
tools:
  - read
  - search
  - edit
  - execute
disable-model-invocation: true
user-invocable: true
---
```

---

# Frontmatter, field by field

| Field | What it does |
| --- | --- |
| `description` | **Required.** Says what the agent does. Copilot reads it to pick the agent |
| `name` | Display name. Optional |
| `tools` | Which tools the agent can use. **Omit it and you get all tools** |
| `model` | Model for this agent. Unset inherits the default |
| `target` | `vscode` or `github-copilot`. Unset means both |
| `disable-model-invocation` | `true`: Copilot never picks this agent on its own. A person must select it |
| `user-invocable` | `false`: people can't select it. Default `true` |
| `mcp-servers` | Extra MCP servers for this agent |

`infer` is retired. Use the two fields above. **Check current docs**: fields differ by client, and `metadata` and `mcp-servers` don't apply in IDE agents.

---

# Tool aliases

`tools` takes aliases. They are case-insensitive.

| Alias | Allows |
| --- | --- |
| `read` | Read file contents |
| `search` | Find files or text |
| `edit` | Edit files |
| `execute` | Run shell commands |
| `agent` | Call another custom agent |
| `web` | Fetch URLs and search (not in the cloud agent today) |

- `tools: ["*"]` or no `tools`: everything, including MCP tools.
- `tools: []`: nothing.
- MCP tools: `server-name/tool` or `server-name/*`.
- Unknown names are ignored. A typo fails quietly.

---

# How an agent is selected

| Way | How |
| --- | --- |
| **Pick it** | `/agent` in the CLI, or `copilot --agent=NAME` |
| **Name it** | "Use the test-writer agent to..." |
| **Copilot picks it** | The model may delegate to a matching agent, based on `description` |

Set `disable-model-invocation: true` when a wrong auto-pick is costly. Then only a person starts it.

Where agents live: `.github/agents/` (repository), `~/.copilot/agents` (user), or the organization's `.github` repository. On a name clash, user beats repository, and repository beats organization.

---

# What changes the agent's behavior

| Setting | Effect | Failure when wrong |
| --- | --- | --- |
| **Tools** | What it can do at all | Too many: it can edit anything |
| **Instructions** (body) | How it works, where it stops | Vague: it guesses |
| **Model** | Reasoning quality, speed, cost | Too weak for the task, or too costly |

Tools set the ceiling. Instructions steer inside it. **Neither replaces review.** The environment still controls real permissions.

---

# Vague profiles drift

```yaml
tools: ["*"]
```

```text
Read the code, make any changes needed,
run the tests, and report the result.
```

"Any changes needed" is a blank check. The agent picks its own scope, and a small task grows into edits you didn't want.

A profile that names a role but no limits **invites drift**.

---

# Tools set the ceiling

Start from the job and list the least the agent needs.

| Job | Aliases |
| --- | --- |
| Review code | `read`, `search` |
| Write or fix files | add `edit` |
| Run a known command | add `execute` |
| Hand work to another agent | add `agent` |

An allowlist limits **which kinds of action** are possible. `edit` still means *any* file. Paths belong in the body.

---

# The body sets the scope

Name what the agent may touch. Name what it may not.

```text
Read:    src/
Edit:    tests/
Run:     npm test
Never:   edit src/, change manifests or workflows,
         add dependencies, push or merge
```

Also write the **procedure** (ordered steps), the **check command**, and the **output format**. Use paths and commands, not adjectives like "careful".

The body guides the agent. It can't enforce anything. The environment's permissions do.

---

# Write stop conditions

Tell the agent when to quit and what to hand back.

```text
No files changed.
Blocked: <what the task needs that is out of scope>.
Decision needed: <what a person must choose>.
```

Good stop conditions cover:

- the task needs a change outside the allowed paths;
- a required tool, file, or access is missing;
- the request conflicts with the instructions.

A stop report names the conflict and the **decision a human owns**. Without one, an agent fills the gap with a guess.

---

# Test an agent the same way every time

One good run proves little. Check the profile and the behavior separately.

| Check | What it catches |
| --- | --- |
| **Contract test** | Profile text: tool list, path rules, stop rule, check command. A script can assert these |
| **Scenario run** | Behavior: give a task that **forces a conflict** and check that the agent stops |

Steps:

1. Write the scenario once. Reuse the exact wording.
2. Run the checks against the weak version. They should fail.
3. Fix the profile. Rerun the same checks.
4. Load the profile in the CLI with `/agent` and run the scenario live.

A static check and a hand trace don't replace a live run.

---

# Agent, skill, or MCP?

| | Skill | Custom agent | MCP server |
| --- | --- | --- | --- |
| **Gives Copilot** | Know-how | A role | Reach |
| **Example** | `release-notes`: your changelog format | `test-writer`: edits `tests/` only, runs `npm test` | GitHub or Microsoft Learn server: live data |
| **Loads** | On demand | When picked or delegated | When configured |
| **Risk** | Wrong trigger | Too many tools | Credentials, data |

Pick by the need:

- "Copilot should **know how** we do this" → skill.
- "Copilot should **act as** this role, with these limits" → custom agent.
- "Copilot should **reach** this system" → MCP server.
- "This always applies" → instructions.

They combine. A custom agent can use a skill and list the MCP tools it may call. Don't add MCP to a role that only needs repository files. More: [M3-03](../session-m3-03-mcp-servers/README.md), [M3-05](../session-m3-05-agent-skills/README.md).

---

# Common mistakes

| Mistake | Fix |
| --- | --- |
| Omit `tools`, so every tool is on | List aliases |
| Misspell an alias; it is ignored quietly | Check names against the docs |
| Name a role but no paths | List read, edit, and forbidden paths |
| No stop rule | Say when to stop and what to report |
| Trust the profile as a permission | Set permissions in the environment |
| Let Copilot auto-pick a risky agent | `disable-model-invocation: true` |
| Build an agent where instructions would do | Use repository instructions |
| Test once, by hand | Script the checks and rerun them |

---

# In the lab

You tighten a weak `test-writer` profile: it reads `src/`, edits `tests/`, runs `npm test`, and stops when production code must change.

1. Run the contract against the weak profile. It fails.
2. Tighten tools, paths, check command, and stop rule.
3. Rerun the same contract. It passes.
4. Load the profile with `/agent` and run the source-conflict scenario. It must stop with no edits.

**Submit** the failed weak profile, the passing tightened profile, and the live stop report. Optional stretch: an LSP definition and references lookup.
