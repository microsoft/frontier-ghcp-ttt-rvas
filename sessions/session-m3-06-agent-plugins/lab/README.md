# Session M3-06 lab: Build, ship, and review a plugin

**Duration:** 2 hours
**Deliverable:** A `release-kit` plugin in a local marketplace, installed from it and loaded in Copilot CLI, a version bump, a repository settings file that turns it on for a team, and a written review of an untrusted plugin

## Lab overview

Your team has a `release-notes` skill from M3-05. Teammates copy the folder by hand, and copies drift. You will package the skill with a reviewer agent, publish it to a marketplace, and let one settings file install it for everyone on the repository.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Inventory what is loaded today | 10 min |
| 2 | Build the plugin | 20 min |
| 3 | Test it with `--plugin-dir` | 20 min |
| 4 | Publish and install from a marketplace | 20 min |
| 5 | Ship version 1.1.0 | 10 min |
| 6 | Turn it on for the repository | 10 min |
| 7 | Review an untrusted plugin | 20 min |
| 8 | Plugin, or something smaller? | 10 min |

## Before you start

You need Git and the standalone Copilot CLI from Session M2-01 with plugin support. Use the synthetic project in this lab.

```bash
mkdir -p ~/copilot-labs/session-m3-06
cp -R sessions/session-m3-06-agent-plugins/lab/starter/* ~/copilot-labs/session-m3-06/
cd ~/copilot-labs/session-m3-06
cd release-notes-project && git init -q && git add -A && git commit -qm "Start" && cd ..
```

You now have:

```text
~/copilot-labs/session-m3-06/
├── release-notes-project/   # CHANGELOG.md and merged-prs.md
├── skills/release-notes/    # the skill from M3-05
└── review-me/               # an untrusted plugin, used in Part 7
```

**Keep your own setup safe.** Plugins install into your Copilot configuration. To keep the lab separate from your daily setup, point Copilot at a scratch directory in every terminal you use for this lab:

```bash
export COPILOT_HOME=~/copilot-labs/session-m3-06/copilot-home
mkdir -p "$COPILOT_HOME"
```

Run `copilot login` again if the CLI asks for it. Unset the variable when you finish.

## Part 1: Inventory

Start `copilot` in `release-notes-project` and run:

```text
/plugin list
/skills list
/agent
```

Save what you see as `inventory-before.md`. You should see no `release-notes` skill and no `release-reviewer` agent.

Now ask the question a teammate would ask:

```text
Write release notes for the PRs in merged-prs.md. Version 2.4.0, dated 2026-10-21.
```

Copilot writes something, but not in the team format. A teammate who wants the skill must copy `skills/release-notes/` into every repository by hand, and pick up fixes by hand too. That is the problem a plugin solves.

**Checkpoint:** You have `inventory-before.md` and you can name what a teammate would need to copy.

## Part 2: Build the plugin

A plugin lives in its own folder. You will put it inside a marketplace folder so you can publish it in Part 4.

```bash
cd ~/copilot-labs/session-m3-06
mkdir -p team-marketplace/plugins/release-kit/{skills,agents}
cp -R skills/release-notes team-marketplace/plugins/release-kit/skills/
```

**Write the manifest.** Create `team-marketplace/plugins/release-kit/plugin.json`:

```json
{
  "name": "release-kit",
  "description": "Write release notes in the team format and review changelog entries before they ship.",
  "version": "1.0.0",
  "author": { "name": "Platform Team" },
  "license": "MIT",
  "keywords": ["release", "changelog"]
}
```

`name` is the only required field. Use lowercase letters, digits, and hyphens.

**Write the reviewer agent.** Ask Copilot to draft it, then edit it yourself:

```text
Create a custom agent file at team-marketplace/plugins/release-kit/agents/release-reviewer.agent.md.
It reviews a changelog entry against the merged PR list. It may only read files. It must
never edit the changelog. It checks for missing PRs, internal work in user-facing
sections, breaking changes without an upgrade action, and a missing version or date.
```

Check the result against these rules, and fix anything that doesn't match:

- The frontmatter has `name`, `description`, and `tools: ["view", "grep", "glob"]`. A reviewer that can edit files is not a reviewer.
- The agent says what it does when someone asks it to fix the entry: decline and point to the skill.
- The file ends in `.agent.md` and sits in `agents/`.

Your plugin should look like this:

```text
release-kit/
├── plugin.json
├── agents/
│   └── release-reviewer.agent.md
└── skills/
    └── release-notes/
        ├── SKILL.md
        ├── references/format.md
        └── evals/evals.json
```

**Which layout?** This lab uses the **legacy layout**, because custom agents live in `agents/`. The **Agent Plugins 1.0 layout** is portable across clients but supports only skills and MCP servers at the top level. Agents move to `com.github.copilot/agents/`, and the manifest needs a `$schema` line. Your trainer will compare the two.

**Checkpoint:** `plugin.json` is valid JSON, the agent file has a read-only tool list, and the skill folder is inside `skills/`. Compare with [`solution/team-marketplace/plugins/release-kit/`](solution/team-marketplace/plugins/release-kit/).

## Part 3: Test it with `--plugin-dir`

Load the plugin for one session without installing it:

```bash
cd ~/copilot-labs/session-m3-06/release-notes-project
copilot --plugin-dir ../team-marketplace/plugins/release-kit
```

Check that each part loaded:

```text
/plugin list
/skills list
/agent
```

You should see `release-kit` in the plugin list and `release-notes` in the skill list. The agent appears with the plugin name as a prefix: `release-kit:release-reviewer`. Use that full name when you select it or pass `--agent`.

**Test the skill.** Restore the starter `CHANGELOG.md` first with `git checkout CHANGELOG.md`.

```text
Write release notes for the PRs in merged-prs.md. Version 2.4.0, dated 2026-10-21.
```

Compare the entry with [`solution/expected-output.md`](solution/expected-output.md) and the answer you got in Part 1.

**Test the agent.** Break the entry on purpose: add a line for `#437` (the dependency bump) under **Changed**, and delete the **Upgrade notes** line for `#440`. Then run:

```text
/agent
```

Select `release-kit:release-reviewer` and ask:

```text
Review the 2.4.0 entry in CHANGELOG.md against merged-prs.md.
```

It should flag #437 as internal work and the missing upgrade action for #440. Then ask it to fix the entry. It should decline.

Save the review as `review-1.md`. Restore the changelog with `git checkout CHANGELOG.md`.

**Checkpoint:** You saw the plugin, the skill, and the prefixed agent load. The reviewer found both planted problems and refused to edit.

## Part 4: Publish and install from a marketplace

A **marketplace** is a folder or repository with a `.github/plugin/marketplace.json` file that lists plugins. Create it next to your plugin:

```bash
mkdir -p ~/copilot-labs/session-m3-06/team-marketplace/.github/plugin
```

Create `team-marketplace/.github/plugin/marketplace.json`:

```json
{
  "name": "team-tools",
  "owner": { "name": "Platform Team" },
  "metadata": {
    "description": "Plugins for the platform team's release workflow",
    "version": "1.0.0"
  },
  "plugins": [
    {
      "name": "release-kit",
      "description": "Write release notes in the team format and review changelog entries before they ship.",
      "version": "1.0.0",
      "source": "./plugins/release-kit"
    }
  ]
}
```

The marketplace `name` becomes part of every plugin ID: `release-kit@team-tools`. Pick it once. Settings files refer to it.

Register it, browse it, and install from it:

```bash
copilot plugin marketplace add ~/copilot-labs/session-m3-06/team-marketplace
copilot plugin marketplace browse team-tools
copilot plugin install release-kit@team-tools
copilot plugin list
```

Start a fresh `copilot` session in `release-notes-project`, without `--plugin-dir`. Run `/skills list` and `/agent`. Both should be there.

A marketplace on a local path loads the plugin **live** from its folder. Nothing is copied, so edits take effect in the next session. A marketplace hosted on GitHub works differently, and you update it in Part 5.

**Publish for others (optional).** Push `team-marketplace` to a private repository, then add it as `copilot plugin marketplace add YOUR-ORG/YOUR-REPO`. Everyone who adds it needs read access and a signed-in GitHub account.

**Checkpoint:** `copilot plugin list` shows `release-kit@team-tools`, and a fresh session has the skill and the agent without `--plugin-dir`.

## Part 5: Ship version 1.1.0

Teammates report that the reviewer misses one case: an entry that lists a PR twice. Add a sixth check to the agent:

> Flag any PR number that appears more than once in the entry.

The reference plugin in `solution/` stays at 1.0.0. Bump your copy in both files:

- `plugins/release-kit/plugin.json`: `"version": "1.1.0"`
- `.github/plugin/marketplace.json`: the plugin entry's `"version": "1.1.0"`

Refresh and check:

```bash
copilot plugin marketplace update
copilot plugin list
```

You should see version 1.1.0. Start a new session and test the new check by listing `#433` twice in a planted entry.

For a plugin you install from a GitHub-hosted marketplace, `copilot plugin marketplace update` refreshes the catalog. `copilot plugin update release-kit` (or `--all`) then pulls the new files. A local-path marketplace has nothing to pull, which is why Copilot says so if you run it.

**Write the release note for the plugin.** Use your own `release-notes` skill:

```text
Use the /release-notes skill. Version 1.1.0, dated today. The only PR is #1: release-reviewer flags duplicate PR numbers. Print the entry; don't edit any file.
```

**Checkpoint:** The list shows 1.1.0 and the reviewer flags a duplicate PR in a new session.

## Part 6: Turn it on for the repository

Installing by hand doesn't scale to a team. A repository can declare its marketplace and plugins in `.github/copilot/settings.json`. When a teammate trusts the folder, Copilot installs the plugin if it's missing and turns it on in that repository only.

Check what you registered, then write the repository file:

```bash
cat "$COPILOT_HOME/settings.json"
```

In `release-notes-project`, create `.github/copilot/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "team-tools": {
      "source": { "source": "github", "repo": "YOUR-ORG/YOUR-REPO" }
    }
  },
  "enabledPlugins": {
    "release-kit@team-tools": true
  }
}
```

Use the GitHub form for anything you commit, because a local `path` only exists on your machine. If you skipped the optional publish step, use your own path to see the file work, and don't commit it.

Answer these in `rollout-notes.md`:

1. What happens to a teammate who opens the repository and trusts the folder?
2. Can a teammate turn the plugin off in this repository? Where would they do it?
3. Who wins if an organization's managed settings block the plugin?
4. Why must the marketplace and plugin names stay stable?

**Checkpoint:** The settings file parses, and `rollout-notes.md` answers all four questions. You can say who controls the final state.

## Part 7: Review an untrusted plugin

A plugin runs with your permissions. **Don't install `review-me`.** Read it instead.

```bash
cd ~/copilot-labs/session-m3-06/review-me
find . -type f | sort
```

Open every file. Write `review-notes.md` with a table:

| File | What it can run or change | Trigger | Risk | Fix or verdict |
| --- | --- | --- | --- | --- |

Then ask Copilot for a second opinion, and compare it with your table:

```text
Review the plugin in ~/copilot-labs/session-m3-06/review-me. List every file that can run code, make a network call, or widen what Copilot may do. Read only. Don't install or run anything.
```

Look for these categories:

- **Hooks** that run shell commands at session start or before tool calls.
- **MCP servers** that download or run code.
- **Agents** with broad tool lists or instructions to skip approval.
- **Skills** whose descriptions match nearly any request.
- **Provenance:** author, repository, license, and a version history.

End `review-notes.md` with one sentence: install, install after changes, or don't install. Compare with [`solution/review-notes.md`](solution/review-notes.md).

**Checkpoint:** Your table covers all five files, and you name the hook that sends your environment variables to a remote host.

## Part 8: Plugin, or something smaller?

Fill in the table. Pick one home for each need. Use **repository customization** for files committed in one repository's `.github/`.

| Need | Home |
| --- | --- |
| Everyone on one repo must use 2-space indentation | |
| A skill, an agent, and an MCP config that three repos should share | |
| A skill you want only on your own machine | |
| A one-off prompt you run weekly | |
| Org-wide tool that must be on for every developer | |
| A skill from M3-05 that only applies to one repo | |

Compare with your trainer's answers. Add one sentence on when you would stop at a single skill.

**Checkpoint:** You gave a reason for each answer, and you named at least one case where a plugin is too much.

## Clean up

```bash
unset COPILOT_HOME
```

Delete `~/copilot-labs/session-m3-06/copilot-home` when you no longer need it.

## Save these

- `inventory-before.md`
- the `release-kit` plugin and `team-marketplace`
- `review-1.md`
- `rollout-notes.md`
- `review-notes.md`
- your Part 8 table
