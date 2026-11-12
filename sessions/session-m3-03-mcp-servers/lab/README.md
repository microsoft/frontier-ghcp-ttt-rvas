# Session M3-03 lab: Build and test an MCP server

## Lab overview

Build and test one tool before adding the next two. Use only the supplied synthetic data.

You need Node.js 20 or later, npm, and MCP Inspector 2.5.0 (run through `npx`). Copilot is optional. Don't copy or commit `node_modules`.

**Deliverable:** A three-tool local MCP server with automated tests, Inspector output, and recorded good and bad requests.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Inspect the staged server | 15 min |
| 2 | Test `get_weather` from schema through handler | 30 min |
| 3 | Inspect good and bad protocol calls | 25 min |
| 4 | Add `get_forecast` and `convert_temperature` | 35 min |
| 5 | Run all checks and record output | 15 min |

## Part 1: Inspect the staged server

```bash
cd sessions/session-m3-03-mcp-servers/lab/starter/custom-mcp
npm ci
npm test
```

Read `package.json`, `src/index.js`, and `test/get-weather.test.js`. Find:

1. the `get_weather` tool definition;
2. its JSON Schema;
3. `invokeTool`, which validates and handles the call;
4. the protocol handlers that connect MCP requests to the catalog and handler.

**Checkpoint:** `npm test` reports three passing tests. The catalog contains only `get_weather`.

## Part 2: Test `get_weather` from schema through handler

Trace this request:

```json
{
  "name": "get_weather",
  "arguments": {
    "city": "Oslo"
  }
}
```

The schema requires a non-empty `city` and rejects extra properties. The handler returns deterministic data:

```json
{
  "city": "Oslo",
  "temperature": 30,
  "unit": "celsius",
  "conditions": "rain"
}
```

Now bad input:

```json
{
  "name": "get_weather",
  "arguments": {
    "city": "   "
  }
}
```

Expected tool response:

```json
{
  "error": "city must be a non-empty string"
}
```

The MCP result sets `isError: true`. An invalid request must not look like an empty success.

Add one focused test for a second city. Don't add another tool yet.

**Checkpoint:** The new test passes and the implementation makes no network call.

## Part 3: Inspect good and bad protocol calls

List the tool:

```bash
npx --yes @modelcontextprotocol/inspector@2.5.0 --cli \
  node src/index.js --method tools/list
```

Call it:

```bash
npx --yes @modelcontextprotocol/inspector@2.5.0 --cli \
  node src/index.js --method tools/call \
  --tool-name get_weather --tool-arg city=Oslo
```

If you have a browser, use the Inspector web client:

```bash
npx --yes @modelcontextprotocol/inspector@2.5.0 node src/index.js
```

Record the tool name, description, input schema, request, response, and error shape. Passing unit tests don't replace the protocol calls.

## Part 4: Add the remaining tools

| Tool | Required behavior |
| --- | --- |
| `get_forecast` | `city` is required; `days` defaults to 3 and accepts integers from 1 to 7 |
| `convert_temperature` | `value` is finite; `from` is `celsius` or `fahrenheit` |

Keep output deterministic so tests can assert exact values. Add tests for the forecast default and invalid range, both conversion directions, bad units, and an unknown tool.

Update the catalog assertion in `test/get-weather.test.js`. It should now expect `get_weather`, `get_forecast`, and `convert_temperature`, in that order. Keep the existing weather checks.

**Work in your edited `lab/starter/custom-mcp` copy.** Run:

```bash
npm test
```

**Checkpoint:** All your tests pass. Bad forecast ranges, bad units, and unknown tools return visible errors. Compare with [`lab/solution/custom-mcp/`](solution/custom-mcp/) afterward. Passing the reference tests doesn't check your code.

## Part 5: Record requests and responses

Run these against your edited server:

```bash
npx --yes @modelcontextprotocol/inspector@2.5.0 --cli \
  node src/index.js --method tools/list
npx --yes @modelcontextprotocol/inspector@2.5.0 --cli \
  node src/index.js --method tools/call \
  --tool-name get_weather --tool-arg city=Oslo
npx --yes @modelcontextprotocol/inspector@2.5.0 --cli \
  node src/index.js --method tools/call \
  --tool-name get_forecast --tool-arg city=Lima --tool-arg days=8
```

The catalog must list all three tools. The bad forecast call must return `isError: true` and exit with status `5`. That nonzero status is expected.

Keep the Inspector output and your passing `npm test` output. Use [`solution/custom-mcp/EVIDENCE.md`](solution/custom-mcp/EVIDENCE.md) to compare response shapes, not to replace running your server.

Optionally, attach the local server to a Copilot client and ask for a three-day forecast in Fahrenheit. Check each tool call against your contract.

## Final deliverable

1. A commit or diff showing `get_weather` before the other tools.
2. A server with three tool schemas and handlers.
3. Passing automated tests, with no tracked `node_modules`, and manifests and lockfiles present.
4. Inspector output from your server.
5. One good and one bad request with expected and actual responses.

## References

- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- [MCP Inspector CLI](https://github.com/modelcontextprotocol/inspector/blob/main/clients/cli/README.md)
- [Extending GitHub Copilot Chat with MCP](https://docs.github.com/copilot/customizing-copilot/extending-copilot-chat-with-mcp)
