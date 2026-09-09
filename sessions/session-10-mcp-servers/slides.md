---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 10 — MCP Servers & Custom Tool Integration'
---

<!-- _class: lead -->
# MCP Servers & Custom Tool Integration
## Agentic Workflows | Advanced

---
# Agenda

| Time | Topic |
| --- | --- |
| 0:00–0:16 | MCP model, discovery, and transports |
| 0:16–0:26 | Local configuration |
| 0:26–0:34 | Approved local demo |
| 0:34–0:48 | Custom server walkthrough |
| 0:48–1:00 | Safety review and lab handoff |

---
# MCP model

| Part | Meaning |
| --- | --- |
| Client | AI surface that requests work |
| Server | Process or service exposing capabilities |
| Transport | stdio, SSE, or Streamable HTTP |
| Tool | Callable capability |
| Resource | Data available from the server |

The client discovers tools, calls one, and returns the result to the model.

---
# Local configuration

```json
{
  "servers": {
    "sqlite": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "./data/app.db"]
    }
  }
}
```

Use `.vscode/mcp.json` for repository-shared configuration. Verify current setting names and supported behavior in official documentation.

---
# A custom typed tool

```typescript
server.tool(
  "search_team",
  "Search team members by name, role, or team. Returns matching results.",
  { query: z.string().describe("Name, role, or team to search") },
  async ({ query }) => ({ content: [{ type: "text", text: query }] })
);
```

Clear descriptions and typed inputs help the model call the tool correctly.

---
# Safety boundary

- Use supplied synthetic data only.
- Inspect the server source, tool descriptions, inputs, and outputs.
- Stop at the customer-defined metered-work guard.
- Do not connect credentials or customer systems.
- Session 17 covers organization policy, approval, registry, and rollout.

---
<!-- _class: divider -->
# Lab

Build a weather server with `get_weather`, `get_forecast`, and `convert_temperature`. Test it locally, then use the supplied scenarios.
