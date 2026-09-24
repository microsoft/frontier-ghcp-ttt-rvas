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
# MCP is a protocol boundary

MCP gives a model structured ways to discover and call capabilities. It does not
make a capability safe, accurate, or approved.

The server owner still decides:

- which tools and resources exist;
- which inputs are accepted;
- what identity and permissions each call uses;
- what the server logs and returns on failure.

Treat each tool as an API surface with an agent in front of it.

---
# Tool descriptions are part of the interface

Models use names, descriptions, and schemas to decide whether and how to call a
tool. Vague descriptions create vague requests.

| Weak | Better |
| --- | --- |
| `search` | `search_team_members` |
| "Find data" | "Search synthetic team records by name, role, or team" |
| `query: string` | `query` with format, limits, and empty-result behavior |

Return data the model can cite and a clear error for an invalid request. Do not
hide a failure behind an empty success-shaped response.

---
# Transport changes the risk profile

| Transport | Typical boundary to review |
| --- | --- |
| stdio | Local command, package source, files, and process permissions |
| SSE | Network endpoint, authentication, and session handling |
| Streamable HTTP | Endpoint, identity, authorization, and request limits |

Start with the smallest approved path. A local server can still read sensitive
files or run unsafe commands, and a remote server can widen the data boundary.

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
