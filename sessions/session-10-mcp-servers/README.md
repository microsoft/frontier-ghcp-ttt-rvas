# Session 10: MCP Servers & Custom Tool Integration

**Module:** Agentic Workflows
**Difficulty:** Advanced
**Prerequisites:** Sessions 01–07
**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Model Context Protocol (MCP) gives AI clients a standard way to discover and call
tools. Learners build a local stdio server in two stages. They first carry
`get_weather` from JSON Schema through its handler, good input, bad input, tests,
and MCP Inspector. Only then do they add `get_forecast` and
`convert_temperature`.

The server uses deterministic synthetic weather data. No network service,
credential, or source-system data is needed.

## Learning outcomes

- Explain the MCP client-server model and transports.
- Trace one tool from schema to protocol response.
- Return visible errors for invalid arguments and unknown tools.
- Test handlers without starting an AI client.
- Use MCP Inspector to list and call local tools.
- Add tools without weakening the first tool's contract.

## Required access

Learners need Node.js 20 or later and npm. An approved GitHub Copilot surface is
useful for the final integration check but is not required. The local tests and
Inspector route prove the server contract.

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
| Expected evidence | [`lab/solution/custom-mcp/EVIDENCE.md`](lab/solution/custom-mcp/EVIDENCE.md) |
