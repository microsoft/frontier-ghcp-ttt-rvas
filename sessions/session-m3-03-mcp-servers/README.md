# Session M3-03: MCP servers & custom tool integration

**Module:** Agentic Workflows
**Difficulty:** Advanced
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04
**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Copilot can only see your prompt and your files. An **MCP server** gives it **reach**: live access to GitHub, docs, databases, or your own tools. You learn what MCP is, add servers to the real Copilot CLI with `/mcp` and the config file, and connect a small server you run yourself. You also see how Copilot asks permission before it calls a tool, and how a tool's output can attack the model.

This session pairs with two others. [M3-04](../session-m3-04-custom-agents/README.md) covers custom agents (a role). [M3-05](../session-m3-05-agent-skills-ecosystem/README.md) covers skills (know-how). MCP is the third piece: reach.

See the [curriculum glossary](../glossary.md) for MCP server, tool, transport, and plugin terms.

## Learning outcomes

- Explain MCP in plain words: client, server, tools, resources, prompts, transports, and schemas.
- Add and manage MCP servers in Copilot CLI with `/mcp`, `copilot mcp add`, and the config file.
- Use the built-in GitHub MCP server and a remote server.
- Connect a small local server and watch Copilot call it.
- Control tool approval with prompts, `--allow-tool`, and `--deny-tool`.
- Weigh live access against credentials, context cost, and prompt injection.
- Choose between a skill, a custom agent, and an MCP server.

## You need

A Copilot subscription, Copilot CLI, Node.js 20 or later, and npm. Check your organization's policy first: some organizations restrict MCP servers.

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Starter server (one tool) | [`lab/starter/custom-mcp/`](lab/starter/custom-mcp/) |
| Example config file | [`lab/starter/mcp-config/mcp-config.example.json`](lab/starter/mcp-config/mcp-config.example.json) |
| Finished server | [`lab/solution/custom-mcp/`](lab/solution/custom-mcp/) |

## Key topics

- What MCP is, and what a server offers: tools, resources, prompts.
- Transports: stdio for local servers, HTTP for remote servers.
- Configuring servers: `/mcp`, `copilot mcp add`, `~/.copilot/mcp-config.json`, project `.mcp.json`, VS Code `.vscode/mcp.json`.
- Tool permissions and approval.
- Pros, cons, and tips.
- Skill vs custom agent vs MCP server.

## References

- [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers)
- [Allowing and denying tool use](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools)
- [About MCP](https://docs.github.com/en/copilot/concepts/customizations/mcp)
- [Model Context Protocol](https://modelcontextprotocol.io)
