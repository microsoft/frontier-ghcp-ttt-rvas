# Session 10 — MCP Servers & Custom Tool Integration

**Module:** 3 — Agentic Workflows  
**Difficulty:** Advanced  
**Prerequisites:** Sessions 01–07  
**Duration:** 1 hour trainer content + 2 hours lab
**Last updated:** April 2026

## Prepare and set boundaries

Use only the supplied synthetic database and simulated weather service. Before a live connection, check current official GitHub documentation and customer policy. Confirm the approved server, tools, authentication method, data boundary, and customer-defined metered-work stop guard. If approval is unavailable, use the local server and manual scenarios in `lab/starter/integration-test.md`.

Do not use customer credentials or systems in this session. Session 17 covers organization policy, registry, approval, and rollout.

**Preflight**

- Open the synthetic database, weather-server starter, and the manual scenarios.
- Confirm the approved local server, tool list, data boundary, and stop guard.
- Test the MCP tools panel or prepare the schema walkthrough and Inspector command.
- Keep the expected schema in `lab/solution/db-project/README.md` ready.

## One-hour plan

| Time | Topic | Trainer move |
| --- | --- | --- |
| 0:00–0:08 | MCP model | Explain client, server, transport, tool, and resource. |
| 0:08–0:16 | Discovery and transports | Show how descriptions and schemas guide tool calls. |
| 0:16–0:26 | Configuration | Read a safe `.vscode/mcp.json` example. |
| 0:26–0:34 | Demo | Connect an approved local SQLite server or use the fallback. |
| 0:34–0:48 | Custom server | Walk through one typed tool and its handler. |
| 0:48–0:55 | Review and safety | Inspect inputs, outputs, and permissions. |
| 0:55–1:00 | Lab handoff | Assign the local build and test scenarios. |

At 0:30, stop live-connection troubleshooting. Use the local or manual fallback and protect time for the custom-server walkthrough.

## MCP mental model

MCP is a protocol that connects an AI client to external tools and data. “USB-C for AI” is useful shorthand: a server can expose a standard interface that compatible clients can discover and call.

| Part | Meaning | Example |
| --- | --- | --- |
| Client | The AI surface that requests work | VS Code, GitHub.com, Copilot CLI |
| Server | A process or service that exposes capabilities | SQLite server |
| Transport | The connection between client and server | stdio, SSE, Streamable HTTP |
| Tool | A callable capability | `query_database` |
| Resource | Readable server data | database schema |

The client connects, discovers tools and parameter schemas, calls an appropriate tool, and passes the result to the model. Tool descriptions tell the model when a tool applies and what its arguments mean.

Use **stdio** for local processes. Use SSE or Streamable HTTP for remote services after the owner has approved their identity, permissions, and data flow.

MCP does not grant permissions or replace an API. The server and platform controls still decide what can happen.

## Configuration walkthrough

Show this local shape without adding credentials:

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

Explain the two common scopes:

| Location | Use |
| --- | --- |
| `.vscode/mcp.json` | A repository-shared local configuration |
| VS Code user settings | A developer’s local configuration |

Support, setting names, and server catalogs change. Verify them in current documentation rather than treating examples as a frozen reference.

For the demo, show the MCP tools panel, inspect the available tool descriptions, then enter:

```text
What tables are in the synthetic database? Show the schema.
```

Learners should see the server's table and schema tools, the approved request, and a schema result they can compare with `lab/solution/db-project/README.md`. If the connection fails, trace the request, input, result, and error path manually with that expected schema.

## Custom server walkthrough

Show the smallest useful shape:

```typescript
server.tool(
  "search_team",
  "Search team members by name, role, or team. Returns matching results.",
  { query: z.string().describe("Name, role, or team to search") },
  async ({ query }) => ({ content: [{ type: "text", text: query }] })
);
```

Review four parts: the name, description, typed input, and handler result. Use concrete descriptions, state limits, and return structured output. Test the server with MCP Inspector before attaching it to a client:

```bash
npx @modelcontextprotocol/inspector
```

The lab server uses only synthetic weather data. Learners implement `get_weather`, `get_forecast`, and `convert_temperature`, then run the scenarios in `lab/starter/integration-test.md`.

## Review checklist

Before accepting a server or a tool call, check:

- the server owner and distribution source;
- each exposed tool, its input schema, and its output;
- the data sent to and returned from the tool;
- the authentication and secret-handling path;
- the least-privileged permissions;
- the customer-owned meter and stop guard;
- the manual fallback.

MCP can combine tools from different servers. Review scope carefully before attaching another server.

## Lab handoff

Learners configure or inspect an approved local server, query the synthetic SQLite database, build the weather server, and exercise it in agent mode or through manual test scenarios. The deliverable is a custom server with three tools, observed request and response behavior, and focused test evidence.

## Likely questions

**Can we connect a customer system for the demo?** No. Use the supplied synthetic services. A live connection needs customer approval for the server, authentication, data flow, and meter.

**Why inspect tool descriptions before prompting?** The description and schema define what the model may call and what each argument means.

**What if the Inspector or server does not start?** Stop at the 30-minute cutpoint and use the expected schema and manual scenarios.
