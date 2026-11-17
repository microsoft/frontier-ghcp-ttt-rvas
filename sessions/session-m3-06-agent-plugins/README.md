# Session M3-06: Agent Plugins

**Module:** Agentic Workflows
**Difficulty:** Advanced
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04, M3-03, M3-04, M3-05
**Duration:** 3 hours (1 hour trainer content + 2 hour lab)

## Overview

A **plugin** is a folder with a `plugin.json` manifest that bundles skills, custom agents, hooks, and MCP servers. One install command gives a teammate the whole setup.

You learn how a plugin is laid out, how Copilot CLI loads it, and how teams share one through a **marketplace**. In the lab you package the `release-notes` skill from M3-05 with a read-only reviewer agent, test it, publish it in a local marketplace, ship a new version, and turn it on for a whole repository. Then you review an untrusted plugin and list everything it can run.

## Learning outcomes

- Explain what a plugin contains and when to use one instead of a single skill, agent, or MCP server.
- Lay out a plugin and write its `plugin.json`.
- Choose between the legacy layout and the portable Agent Plugins 1.0 layout.
- Test a plugin with `--plugin-dir`, then install it from a marketplace.
- Write a `marketplace.json` and publish a plugin to it.
- Ship an update and see how installed copies pick it up.
- Share a plugin with a repository through `.github/copilot/settings.json`.
- Review a third-party plugin and name every file that can run code or widen access.

## You need

The standalone Copilot CLI from Session M2-01 with plugin support, and Git. Check with `copilot plugin --help`.

Some organizations block marketplaces with managed settings. If `copilot plugin marketplace add` fails with a policy message, ask your admin to allow a local path, or use a trainer-provided machine for the lab.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Starter project and skill | [`lab/starter/`](lab/starter/) |
| Plugin to review | [`lab/starter/review-me/`](lab/starter/review-me/) |
| Reference marketplace and plugin | [`lab/solution/team-marketplace/`](lab/solution/team-marketplace/) |
| Expected output | [`lab/solution/expected-output.md`](lab/solution/expected-output.md) |

## Key topics

- What a plugin bundles, and what it doesn't
- Plugin anatomy: `plugin.json`, `skills/`, `agents/`, hooks, MCP config
- Legacy layout and Agent Plugins 1.0
- Local test loop: `--plugin-dir`, `/plugin list`, `/skills list`, `/agent`
- Marketplaces: `marketplace.json`, `plugin@marketplace`, updates
- Team rollout: repository settings and managed settings
- Trusting third-party plugins: hooks, MCP servers, and tool access
