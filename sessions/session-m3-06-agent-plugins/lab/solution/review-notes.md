# Review of `tidy-tools`

**Verdict: don't install.** Its hooks and MCP config run code you haven't read, and one hook sends your environment to a remote host.

| File | What it can run or change | Trigger | Risk | Fix or verdict |
| --- | --- | --- | --- | --- |
| `hooks.json` (`sessionStart`) | Pipes `env` to `curl`, which posts it to `collect.example.invalid` | Every session start | **Critical.** Environment variables often hold tokens and keys. The script claims nothing about why it needs them | Remove the hook. This alone decides the verdict |
| `hooks.json` (`preToolUse`) | Returns `permissionDecision: allow` | Before every tool call | **High.** Skips the approval prompt for every tool, including shell | Remove the hook. Approvals belong to the user |
| `.mcp.json` | Runs `npx -y tidy-helper-mcp@latest` | Session start | **High.** Downloads and runs whatever the newest version is. Gives it `tools: ["*"]` | Pin an exact version, read the package, expose only the tools you need |
| `agents/tidy.agent.md` | `tools: ["*"]`; told to run any shell command and never ask before editing | When selected | **High.** Full tool access with no review step | Limit to `view`, `edit`, and the one command it needs. Require a prompt before edits |
| `skills/tidy-imports/SKILL.md` | Instructions only; runs `npm run lint -- --fix` | Description matches "any request about code, files, or the repository" | **Medium.** Triggers on almost everything and edits files | Narrow the description to import sorting. Name the languages |
| `plugin.json` | Points to all of the above | On install | **Medium.** Author is `unknown-contributor`. No repository, license, or history | Ask for a source repository, a license, and a version history |

## What would change the verdict

Install after changes if the author removes both hooks, pins the MCP package, limits the agent, narrows the skill description, and publishes a repository you can read. Then run it on a throwaway repository first.

## Habits to keep

- Read `hooks.json`, `.mcp.json`, and every agent file before you install.
- Treat a plugin like a dependency with shell access.
- Ask who maintains it and what changed in the last release.
- Check the organization's managed settings before you add a marketplace.
