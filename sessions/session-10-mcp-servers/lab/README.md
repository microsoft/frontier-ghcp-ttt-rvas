# Session 10 Lab — MCP Servers & Custom Tool Integration

**Duration:** 2 hours · **Difficulty:** Advanced
**Prerequisites:** Sessions 01–07 · **Deliverable:** A custom MCP server with three tools and test evidence

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Check current [MCP client and server configuration](https://docs.github.com/copilot/customizing-copilot/extending-copilot-chat-with-mcp), authentication, and tool approval with the customer. Use synthetic data only. Define a customer-owned meter, threshold, and stop guard before metered work.

If access is unavailable, build and test the server locally, then trace the scenarios in `lab/starter/integration-test.md`. Do not connect Copilot or external services.

| Exercise | Task | Time |
| --- | --- | --- |
| 1 | Inspect an approved GitHub MCP connection | 30 min |
| 2 | Query the synthetic SQLite database | 30 min |
| 3 | Build the weather MCP server | 40 min |
| 4 | Run integration scenarios | 20 min |

## Setup

- VS Code with GitHub Copilot
- Node.js 20+ (`node --version`)
- `gh` installed and authenticated, only if an approved training connection uses it

## 1. Inspect the GitHub MCP configuration

Read `lab/starter/mcp-config/mcp.json`. It shows a named server configuration with `command`, `args`, and optional `env`. Do not add a token to a tracked file. Use an approved preconfigured connection only with a synthetic or training repository.

In agent mode, inspect the tools panel. Record the exposed tool names, descriptions, inputs, and approval behavior. If allowed, try the supplied repository queries and verify each result before relying on it. Otherwise, continue with Exercise 2.

## 2. Query the synthetic database

```bash
cd lab/starter/db-project
npm install
node setup-db.js
node seed-data.js
npm run query -- "SELECT COUNT(*) FROM products"
npm run query -- "SELECT * FROM products LIMIT 3"
```

Configure the approved local SQLite MCP server with the supplied database path. Restart the server, inspect its tool catalog, and ask for the schema before requesting:

- the five most expensive products;
- product counts by category;
- orders with customer names and amounts.

Compare results with `lab/solution/db-project/README.md`. Fix path and setup errors before changing queries.

## 3. Build the weather server

```bash
cd lab/starter/custom-mcp
npm install
node --check src/index.js
node src/index.js
```

In `src/index.js`, implement `get_weather`, `get_forecast`, and `convert_temperature`. Keep data simulated. Each tool needs a clear name and description, an input schema, a handler, and structured output. `get_forecast` accepts `city` and `days` (1–7, default 3); `convert_temperature` accepts a number and `celsius` or `fahrenheit`.

Compare only after attempting the implementation: `lab/solution/custom-mcp/`.

## 4. Test integration

Add the local server to the approved configuration, restart it, and run the scenarios in `lab/starter/integration-test.md`. Observe tool selection, chained calls, cross-server results, and error handling. Record inputs, output shape, and failures.

## Completion checklist

- [ ] Approved connection inspected, or local fallback recorded.
- [ ] Synthetic SQLite database queried through the local server.
- [ ] Weather server exposes all three tools.
- [ ] Local startup and syntax check completed.
- [ ] Integration scenarios have observations and results.
- [ ] No credentials or customer data were used.
