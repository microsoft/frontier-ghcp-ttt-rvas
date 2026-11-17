---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M3-06: Agent Plugins'
---

<!-- _class: lead -->

# Agent Plugins

## Package it, ship it, review it

Session M3-06 | 3 hours

---

<!-- _class: agenda -->

# Agenda

| Segment | Time |
| --- | --- |
| What a plugin is | 10 min |
| Anatomy and layouts | 12 min |
| Demo: build and load a plugin | 10 min |
| Marketplaces and rollout | 12 min |
| Trusting a plugin | 11 min |
| Lab handoff | 5 min |

---

# The problem

You built a skill (M3-05), an agent (M3-04), and an MCP config (M3-03).

Now a teammate wants all three.

- Copy three folders into every repo?
- Fix a bug in one place, then tell everyone?
- Hope nobody edits their copy?

A **plugin** is the install unit for all of it.

---

# What a plugin is

A folder with a `plugin.json` manifest. It can bundle:

| Component | What it gives Copilot |
| --- | --- |
| Skills | Know-how |
| Custom agents | Roles |
| MCP servers | Reach |
| Hooks | Scripts that run on events |
| LSP servers | Language support |

One command installs it. One command updates it.

---

# Plugin or single file?

| Need | Use |
| --- | --- |
| Rule for one repo | Repository instructions |
| One skill for one repo | Project skill in `.github/skills` |
| A skill only you use | Personal skill |
| **Several parts that ship together, to several repos or people** | **Plugin** |
| Org-wide tool, must be on | Plugin plus managed settings |

If it's one file in one repo, **don't build a plugin**.

---

# Anatomy: legacy layout

```text
release-kit/
├── plugin.json
├── agents/
│   └── release-reviewer.agent.md
├── skills/
│   └── release-notes/SKILL.md
├── hooks.json
└── .mcp.json
```

- Default folders work with no extra fields.
- `plugin.json` can also set paths for `agents`, `skills`, `hooks`, and `mcpServers`.
- Only `name` is required.

---

# `plugin.json`

```json
{
  "name": "release-kit",
  "description": "Write release notes and review changelog entries.",
  "version": "1.0.0",
  "author": { "name": "Platform Team" },
  "license": "MIT",
  "keywords": ["release", "changelog"]
}
```

- `name`: lowercase letters, digits, hyphens. Max 64 characters.
- `version`: use semantic versions. Teammates see it in `/plugin list`.
- Keep `description` plain. People search it.

---

# Anatomy: Agent Plugins 1.0

```text
release-kit/
├── plugin.json            # has a "$schema" line
├── skills/release-notes/SKILL.md
├── mcp.json
└── com.github.copilot/
    ├── agents/release-reviewer.agent.md
    └── hooks/hooks.json
```

- **Portable:** skills and MCP servers work in clients that support the format.
- **Fixed folders.** You can't reconfigure them in `plugin.json`.
- Copilot-only parts go in `com.github.copilot/`.
- A manifest with an unknown schema version is **rejected whole**.

---

# Legacy or Agent Plugins 1.0?

| | Legacy | Agent Plugins 1.0 |
| --- | --- | --- |
| **Best for** | Copilot CLI plugins with agents and hooks | Skills and MCP shared across clients |
| **Folders** | Defaults, plus configurable paths | Fixed |
| **Agents** | `agents/` | `com.github.copilot/agents/` |
| **Manifest** | No `$schema` | `$schema` required |

Check each surface's docs. CLI, VS Code, and the Copilot app don't load the same components.

---

# What you see when it loads

- `/plugin list` shows the plugin and its version.
- `/skills list` shows its skills.
- `/agent` shows its agents, **prefixed with the plugin name**: `release-kit:release-reviewer`.
- `/env` lists everything loaded: instructions, MCP servers, skills, agents, hooks, plugins.

Skill names stay as written: `release-notes`.

---

<!-- _class: lead -->

# Demo: build and load a plugin

---

# The local loop

```bash
copilot --plugin-dir ./release-kit
```

- Loads the folder for **one session**. Nothing is installed.
- Check with `/plugin list`, `/skills list`, `/agent`.
- Edit, restart, check again.

When it works, publish it to a marketplace. Local direct installs (`copilot plugin install ./path`) still work but are deprecated. Use `plugin@marketplace`.

---

# Marketplaces

A **marketplace** is a folder or GitHub repository with `.github/plugin/marketplace.json`.

```json
{
  "name": "team-tools",
  "owner": { "name": "Platform Team" },
  "plugins": [
    { "name": "release-kit", "version": "1.0.0",
      "source": "./plugins/release-kit" }
  ]
}
```

```bash
copilot plugin marketplace add YOUR-ORG/team-tools
copilot plugin install release-kit@team-tools
```

**The marketplace name is part of every plugin ID.** Don't rename it.

---

# Commands you need

| Task | Command |
| --- | --- |
| Add a marketplace | `copilot plugin marketplace add SOURCE` |
| Browse | `copilot plugin marketplace browse NAME` |
| Install | `copilot plugin install plugin@marketplace` |
| List | `copilot plugin list` |
| Update one or all | `copilot plugin update NAME` or `--all` |
| Turn off | `copilot plugin disable NAME` |
| Remove | `copilot plugin uninstall NAME` |

Inside a session, use `/plugin`.

---

# Update behavior

- **GitHub-hosted marketplace:** refresh the catalog, then update the plugin.
- **Local-path marketplace:** the plugin loads live from the folder. Edits show up in the next session.
- **Auto-update:** built-in `awesome-copilot` plugins update at session start. Your own marketplace updates automatically only if **you** set `autoUpdate: true` in user settings. Repository settings can't opt in.

Bump `version` in `plugin.json` **and** `marketplace.json` on every release.

---

# Roll it out to a team

Put one file in the repository: `.github/copilot/settings.json`.

```json
{
  "extraKnownMarketplaces": {
    "team-tools": {
      "source": { "source": "github", "repo": "YOUR-ORG/team-tools" }
    }
  },
  "enabledPlugins": { "release-kit@team-tools": true }
}
```

- A teammate who **trusts the folder** gets the plugin installed and turned on for that repo only.
- They can turn it off locally with an explicit entry.
- **Organization managed settings win.** They can require or block a plugin, and can restrict marketplace sources with `strictKnownMarketplaces`.

---

# A plugin is code you didn't write

A plugin can bundle things that **run**:

| Part | Risk |
| --- | --- |
| `hooks.json` | Shell commands on session start or before every tool call |
| `.mcp.json` | A server that downloads and runs a package |
| Agent files | `tools: ["*"]` and "don't ask before editing" |
| Skill descriptions | A trigger that matches everything |

Installing it means **you run it, with your permissions**.

---

# Review checklist

1. **Who wrote it?** Author, repository, license, release history.
2. **Hooks.** Read every command. Any network call? Any approval bypass?
3. **MCP servers.** Pinned version, or `@latest`? Which tools are exposed?
4. **Agents.** Which tools? Do they ask before editing?
5. **Skills.** Does the description match only its job?
6. **Marketplace source.** Is it allowed by policy?

Test in a **throwaway repository** first.

---

# Pros

- **One install** for a whole setup.
- **Versioned.** Everyone sees the same release.
- **Shareable** through a marketplace or one settings file.
- **Governable.** Organizations can require or block plugins.

---

# Cons

- **More to review.** A plugin hides several kinds of code behind one name.
- **Surfaces differ.** CLI, VS Code, app, and cloud agent don't load the same parts.
- **Formats are changing.** Check the docs when you author.
- **Overkill for one file.**
- **Updates can surprise people** if they're automatic.

---

# Lab handoff

1. Inventory what's loaded today.
2. Build `release-kit`: the skill from M3-05, a read-only reviewer agent, and a manifest.
3. Load it with `--plugin-dir` and test both parts.
4. Publish it to a local marketplace and install it by ID.
5. Ship version 1.1.0.
6. Write the repository settings file for a team.
7. Review `review-me` and write down what it can run.
8. Decide: plugin, or something smaller?

Use a scratch `COPILOT_HOME`. It keeps the lab out of your daily setup.
