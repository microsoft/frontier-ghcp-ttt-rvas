# Session M3-06 trainer guide: Agent Plugins

## Teaching goal

Learners leave able to package skills and agents into a plugin, publish it in a marketplace, roll it out to a team, and review someone else's plugin before they install it.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:10 | What a plugin is |
| 0:10 to 0:22 | Anatomy and layouts |
| 0:22 to 0:32 | Demo: build and load a plugin |
| 0:32 to 0:44 | Marketplaces and rollout |
| 0:44 to 0:55 | Trusting a plugin |
| 0:55 to 1:00 | Lab handoff |

## Preparation

- Run the whole lab once. Keep `lab/solution/team-marketplace/` open for comparison.
- Use a scratch `COPILOT_HOME` for the demo, so your own plugins don't show up on screen: `export COPILOT_HOME=$(mktemp -d)`.
- Check the plugin docs for your build. Plugin formats and commands change often. The slides match Copilot CLI 1.0.113. Run `copilot plugin --help` and compare.
- Check whether your learners' organization blocks marketplaces. Managed settings can restrict sources with `strictKnownMarketplaces`. Fix this before the lab starts, not during it.
- Make sure every learner has finished M3-05 or has the starter skill in `lab/starter/skills/release-notes/`.
- Read `lab/starter/review-me/` yourself. Know each finding before you teach Part 7.

## What a plugin is (0:00 to 0:10)

Start from the pain. Ask: "How does a teammate get your M3-05 skill today?" Expect "copy the folder." Ask what happens when you fix it.

- A plugin is a folder with `plugin.json`. It bundles skills, custom agents, hooks, MCP servers, and LSP servers.
- It solves **distribution**, not capability. Everything inside is something learners already built in M3-03 to M3-05.
- Connect it to the earlier lines: a skill gives know-how, an agent gives a role, an MCP server gives reach. A plugin gives **a way to ship them together**.

**Plugin or single file.** Ask the room to sort five needs, then show the table.

| Need | Home |
| --- | --- |
| 2-space indentation in one repo | Repository instructions |
| A skill for one repo only | Project skill |
| A skill only I use | Personal skill |
| Skill, agent, and MCP config for several repos | Plugin |
| A tool every developer in the organization must have | Plugin, required by managed settings |

Say plainly: **most skills don't need a plugin.** One file in one repo is a project skill.

## Anatomy and layouts (0:10 to 0:22)

Show the legacy layout first, since the lab uses it.

- `plugin.json` needs only `name`. Add `version`, `description`, `author`, `license`, and `keywords`.
- Default folders: `agents/`, `skills/`. Add `hooks.json` and `.mcp.json` when needed.
- `plugin.json` can override component paths, such as `"agents": "agents/"`.

Then show Agent Plugins 1.0.

| | Legacy | Agent Plugins 1.0 |
| --- | --- | --- |
| Manifest | No `$schema` | `$schema` with a recognized version |
| Skills | `skills/` | `skills/` (fixed) |
| MCP | `.mcp.json` or inline | `mcp.json` (fixed) |
| Agents | `agents/` | `com.github.copilot/agents/` |
| Hooks | `hooks.json` | `com.github.copilot/hooks/hooks.json` |
| Extra manifest fields | Component paths | Closed list; unknown fields are reported and ignored |

Two facts to stress:

- A plugin that declares an Agent Plugins version the CLI doesn't support is **rejected whole**. It contributes no skills, agents, or hooks.
- Not every surface loads every component. Check VS Code, the Copilot app, and the cloud agent against their own docs before you promise a learner that a plugin "works everywhere."

Name constraints are small but they bite. Names are lowercase with hyphens. Legacy names allow letters, digits, and hyphens, up to 64 characters.

## Demo: build and load a plugin (0:22 to 0:32)

Build `release-kit` live, using the reference in `lab/solution/team-marketplace/plugins/release-kit/` as your safety net.

1. Create the folder and `plugin.json`.
2. Copy in the `release-notes` skill.
3. Ask Copilot to draft the reviewer agent. Fix the tool list live: `view`, `grep`, `glob` only.
4. Run `copilot --plugin-dir ./release-kit`.
5. Run `/plugin list`, `/skills list`, `/agent`.

**Point out the prefix.** The agent shows as `release-kit:release-reviewer`. Passing `--agent release-reviewer` fails and lists the prefixed name as the one that's available. Learners trip on this in the lab.

Run the skill and the agent once. Don't go deep. The goal is to see all three parts load from one folder.

## Marketplaces and rollout (0:32 to 0:44)

- A marketplace is a folder or GitHub repository with `.github/plugin/marketplace.json`. `name`, `owner`, and `plugins` are required.
- Each plugin entry needs `name` and `source`. Add `description` and `version`.
- The plugin ID is `plugin@marketplace`. Changing a marketplace name changes every ID in every settings file.

Show the command set from the slide. Then explain updates.

| Source | What an update means |
| --- | --- |
| GitHub-hosted marketplace | `copilot plugin marketplace update`, then `copilot plugin update NAME` |
| Local-path marketplace | The plugin loads live from the folder. Edits apply to the next session, and `copilot plugin update` reports nothing to pull |

Auto-update is narrow. Built-in `awesome-copilot` plugins update at session start. A marketplace you add updates automatically only if **you** set `autoUpdate: true` on its entry in user or managed settings. Repository settings can't turn it on.

**Direct installs.** `copilot plugin install owner/repo` and `./path` still work in this build, but the CLI warns that direct installs are deprecated. Teach `plugin@marketplace`.

**Team rollout.** Show `.github/copilot/settings.json` with `extraKnownMarketplaces` and `enabledPlugins`. Walk the chain: a teammate trusts the folder, Copilot installs the plugin if it's missing, and the plugin turns on in **that repository only**. Then the limits:

- A teammate can turn a repository default off with an explicit entry in their local settings.
- Managed settings from the organization can require or block a plugin. They win over local choices.
- Copilot cloud agent reads the repository settings and has no local override.

Check the current docs for the exact override behavior in your build. This area is still moving.

## Trusting a plugin (0:44 to 0:55)

Show the four risky parts: hooks, MCP servers, agent files, and skill descriptions. Then give the review checklist from the slide.

Open `lab/starter/review-me/` on screen. **Don't run it.** Let the room find one problem each before you reveal the rest. Compare with `lab/solution/review-notes.md`.

Key lines to say out loud:

- "Installing a plugin means you run its hooks."
- "A hook that returns `allow` for every tool call switches off your approval prompts."
- "`@latest` means you run whatever the maintainer published today."
- "A skill description that matches any request will trigger on nearly everything."

Close with the habit: read the plugin like a dependency with shell access, and test it in a throwaway repository.

**Pros:** one install, versioned, shareable, governable.

**Cons:**

- More to review, because one name hides several kinds of code.
- Surfaces load different parts.
- The format is still changing.
- Overkill for one file.
- Automatic updates can surprise people.

## Lab handoff (0:55 to 1:00)

Open `lab/README.md`. Walk through the eight parts. Make sure each learner sets `COPILOT_HOME` to a scratch directory before Part 1. Without it, the lab plugin lands in their daily setup.

Tell learners where the lab is tricky: the agent prefix in Part 3, the version in two files in Part 5, and the repository file in Part 6.

## Answer key for lab Part 8

| Need | Best home |
| --- | --- |
| 2-space indentation for one repo | Repository customization (instructions) |
| Skill, agent, and MCP config shared by three repos | Plugin |
| A skill only on my machine | Personal skill |
| A weekly one-off prompt | Prompt file |
| An org-wide tool that must be on | Plugin, required by managed settings |
| A skill that only applies to one repo | Project skill |

Accept other answers if the reasoning holds. A plugin is too much for any single file in a single repo.

## Common mistakes

| Mistake | Fix |
| --- | --- |
| `--agent release-reviewer` fails | Use the prefixed name: `release-kit:release-reviewer` |
| Plugin doesn't show up | Check `plugin.json` is valid JSON and sits at the plugin root. Run `copilot plugin list`. |
| Skill is missing | Check the folder is `skills/NAME/SKILL.md`, not `skills/SKILL.md` |
| Plugin ID doesn't resolve | The marketplace `name` in `marketplace.json` is the part after `@`, not the folder or repo name |
| Version bump isn't visible | Update `version` in both `plugin.json` and `marketplace.json`, then run `copilot plugin marketplace update` |
| Edits to a plugin don't appear | Start a new session. For a GitHub-hosted plugin, run `copilot plugin update` first |
| Reviewer agent edits files | Remove `edit` and `bash` from `tools` |
| Learner installs `review-me` | Uninstall it with `copilot plugin uninstall tidy-tools`. Check `/env` for leftovers. |
| Marketplace add is blocked | The organization restricts sources. Ask the admin, or use a trainer machine. |
| Repository settings are ignored | The learner hasn't trusted the folder, or a managed setting overrides it |

## Reference

- [Creating a plugin for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating)
- [GitHub Copilot CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference)
- [Plugin and marketplace reference](https://docs.github.com/en/copilot/reference/plugin-and-marketplace-reference)
- [Creating and sharing a plugin marketplace on GitHub](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/create-and-share-plugin-marketplaces)
- [About GitHub Copilot plugins](https://docs.github.com/en/copilot/concepts/agents/about-plugins)
