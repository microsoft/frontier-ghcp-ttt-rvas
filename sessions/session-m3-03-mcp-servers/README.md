# Session M3-03: MCP servers & custom tool integration

**Module:** Agentic Workflows
**Difficulty:** Advanced
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04
**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Model Context Protocol (MCP) gives AI clients a standard way to discover and call
tools. Build a local stdio server in two stages. First, trace
`get_weather` from its JSON Schema through the handler. Test good and bad input,
then call it with MCP Inspector. Only then add `get_forecast` and
`convert_temperature`.

The server uses deterministic synthetic weather data. No network service,
credential, or source-system data is needed.

### MCP server or plugin?

An **MCP server** exposes tools and context through a protocol. A **plugin** is an
installable package that can bundle MCP server configuration with skills, agents,
hooks, or other components. Build the server when you need a protocol endpoint.
Use a plugin when you need to distribute and version a set of Copilot
customizations. A plugin may include an MCP server, but the two terms are not
interchangeable.

See the [curriculum glossary](../glossary.md) for MCP server, tool, transport, and
plugin terminology.

## Learning outcomes

- Explain the MCP client-server model and transports.
- Trace one tool from schema to protocol response.
- Return visible errors for invalid arguments and unknown tools.
- Test handlers without starting an AI client.
- Use MCP Inspector to list and call local tools.
- Add tools without weakening the first tool's contract.

## Required access

You need Node.js 20 or later and npm. GitHub Copilot is
useful for the final integration check but is not required. The local tests and
Inspector calls prove the server contract.

If package installation is blocked, stop before the executable lab. Do not use an
unapproved registry or copied `node_modules` directory.

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Staged server | [`lab/starter/custom-mcp/`](lab/starter/custom-mcp/) |
| Completed server | [`lab/solution/custom-mcp/`](lab/solution/custom-mcp/) |
| Expected test and Inspector output | [`lab/solution/custom-mcp/EVIDENCE.md`](lab/solution/custom-mcp/EVIDENCE.md) |
