# Session M3-03 lab: Build and test an MCP server

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04
**Deliverable:** A three-tool local MCP server with automated tests, Inspector
output, and recorded good and bad requests

## Lab overview

Build and test one tool before adding the next two. That keeps the first protocol
review small.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Preflight and inspect the staged server | 15 min |
| 2 | Prove `get_weather` from schema through handler | 30 min |
| 3 | Inspect good and bad protocol calls | 25 min |
| 4 | Add `get_forecast` and `convert_temperature` | 35 min |
| 5 | Run all checks and record output | 15 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Use only the
supplied synthetic data.

You need:

- Node.js 20 or later;
- npm access to the approved package registry;
- a writable copy of this repository;
- MCP Inspector 2.5.0 through the approved npm source.

The required lab route uses local tests and MCP Inspector. GitHub Copilot is
optional and may assist with review. If Node.js, MCP Inspector, or package registry
access is unavailable, stop the lab.

Do not copy or commit `node_modules`. Each project has a package manifest and lockfile.

## Part 1: Preflight and inspect the staged server

```bash
cd sessions/session-m3-03-mcp-servers/lab/starter/custom-mcp
npm ci
npm test
```

Read:

```text
package.json
src/index.js
test/get-weather.test.js
```

The staged server exposes one tool. Find these four parts:

1. the `get_weather` tool definition;
2. its JSON Schema;
3. `invokeTool`, which validates and handles the call;
4. the protocol handlers that connect MCP requests to the catalog and handler.

**Checkpoint:** `npm test` reports three passing tests. The tool catalog contains
only `get_weather`.

## Part 2: Prove `get_weather` from schema through handler

Trace this request:

```json
{
  "name": "get_weather",
  "arguments": {
    "city": "Oslo"
  }
}
```

The schema requires a non-empty `city` and rejects extra properties. The handler
returns deterministic data:

```json
{
  "city": "Oslo",
  "temperature": 30,
  "unit": "celsius",
  "conditions": "rain"
}
```

Now trace bad input:

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

The MCP result sets `isError: true`. An invalid request must not look like an empty
successful result.

Add one focused test for a second city. Do not add another tool yet.

**Checkpoint:** the new test passes and no production data or network call appears
in the implementation.

## Part 3: Inspect good and bad protocol calls

List the staged tool:

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

Use the Inspector web client when a browser is available:

```bash
npx --yes @modelcontextprotocol/inspector@2.5.0 node src/index.js
```

Record the tool name, description, and input schema. Include the request,
response, and error shape. If Inspector cannot run, stop and fix access before
continuing. Passing unit tests do not replace the protocol calls.

## Part 4: Add the remaining tools

Add these definitions and handlers:

| Tool | Required behavior |
| --- | --- |
| `get_forecast` | `city` is required; `days` defaults to 3 and accepts integers from 1 to 7 |
| `convert_temperature` | `value` is finite; `from` is `celsius` or `fahrenheit` |

Keep your output deterministic so the tests can assert exact values. Add focused
tests for the forecast default and invalid range, both conversion directions and
bad units, and an unknown tool.

Update the catalog assertion in `test/get-weather.test.js`: it should now expect
`get_weather`, `get_forecast`, and `convert_temperature`, in that order. Keep the
existing weather schema and handler checks.

**Stay in your edited `lab/starter/custom-mcp` working copy.** Run your completed suite:

```bash
npm test
```

**Checkpoint:** all your tests pass. Bad forecast ranges, bad units, and unknown
tools return visible errors. Compare with
[`lab/solution/custom-mcp/`](solution/custom-mcp/) afterward; passing reference
tests does not check your implementation.

## Part 5: Record requests and responses

Run these commands against the server in your edited working copy:

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

The catalog must list all three tools. The bad forecast call must return
`isError: true` and exit status `5`; that nonzero status is expected.
Keep the actual protocol output and your passing `npm test` output from Part 4.
Use [`solution/custom-mcp/EVIDENCE.md`](solution/custom-mcp/EVIDENCE.md) to compare
response shapes, not as a substitute for running your server.

If repository policy allows a Copilot client, attach the local server and ask for a
three-day forecast in Fahrenheit. Check each tool call against the recorded
contract. Use the local tests and Inspector output to judge completion.

## Final deliverable

1. A staged commit or diff showing `get_weather` before the other tools.
2. A completed server with three tool schemas and handlers.
3. Passing automated tests.
4. Inspector output from your server.
5. One good request and one bad request with expected and actual responses.

## Verification

- [ ] No `node_modules` directory is tracked.
- [ ] Package manifests and lockfiles are present.
- [ ] `get_weather` was tested before the other tools were added.
- [ ] Good input returns deterministic synthetic data.
- [ ] Bad input and unknown tools return `isError: true`.
- [ ] The completed tool catalog contains exactly three tools.
- [ ] `npm test` passes in the edited working copy.
- [ ] Inspector output from the edited server is captured.
- [ ] No credential, network service, or source-system data was used.

## References

- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- [MCP Inspector CLI](https://github.com/modelcontextprotocol/inspector/blob/main/clients/cli/README.md)
- [Extending GitHub Copilot Chat with MCP](https://docs.github.com/copilot/customizing-copilot/extending-copilot-chat-with-mcp)
