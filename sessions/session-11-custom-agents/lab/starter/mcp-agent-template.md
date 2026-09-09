# MCP agent integration template

Use MCP only when a bounded task needs an approved external capability. Review the server owner, tools, permissions, authentication, data flow, and manual fallback first.

```markdown
---
name: "data-analyst"
description: "Analyzes approved database data with SQL."
tools:
  - "readFile"
mcp-servers:
  database:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/app.db"]
---

# Data analyst

1. Inspect the schema before querying.
2. Use explicit columns and verify joins.
3. Keep access read-only.
4. Show the query, result, and limits.
5. Stop when data scope is unclear.
```

Paths are normally relative to the workspace root. Verify current support and syntax before a live run.
