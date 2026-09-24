# Session 10 Lab: Build and Test an MCP Server

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–07
**Deliverable:** A three-tool local MCP server with automated tests, Inspector
evidence, and recorded good and bad requests

## Lab overview

Build one tool completely before adding the next two. This keeps the protocol
surface small enough to review.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Preflight and inspect the staged server | 15 min |
| 2 | Prove `get_weather` from schema through handler | 30 min |
| 3 | Inspect good and bad protocol calls | 25 min |
| 4 | Add `get_forecast` and `convert_temperature` | 35 min |
| 5 | Run the full verification and record evidence | 15 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Use only the
supplied synthetic data.

You need:

- Node.js 20 or later;
- npm access to the approved package registry;
- a writable copy of this repository;
- MCP Inspector 2.5.0 through the approved npm source.

GitHub Copilot access is optional. If it is unavailable, use the local tests and
Inspector commands. If Node.js or approved package access is unavailable, stop and
do not continue the executable lab.

**Fallback:** the local tests and Inspector route are the intentional no-Copilot
path. Record any command that cannot run as **not executed**.

Do not copy or commit `node_modules`. Each project has a package manifest and lockfile.

## Part 1: Preflight and inspect the staged server

```bash
cd sessions/session-10-mcp-servers/lab/starter/custom-mcp
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

Record the tool name, description, input schema, request, response, and error
shape. If Inspector cannot run but `npm test` passes, record Inspector as **not
executed**. Do not invent output.

## Part 4: Add the remaining tools

Add these definitions and handlers:

| Tool | Required behavior |
| --- | --- |
| `get_forecast` | `city` is required; `days` defaults to 3 and accepts integers from 1 to 7 |
| `convert_temperature` | `value` is finite; `from` is `celsius` or `fahrenheit` |

Keep the output deterministic so the tests can assert exact values. Add focused
tests before broad integration prompts.

Compare your result with
[`lab/solution/custom-mcp/`](solution/custom-mcp/) only after the staged tests pass.

Run the completed suite:

```bash
cd ../../solution/custom-mcp
npm ci
npm test
```

**Checkpoint:** five tests pass. Bad forecast ranges, bad units, and unknown tools
return visible errors.

## Part 5: Record request and response evidence

Run the commands in
[`solution/custom-mcp/EVIDENCE.md`](solution/custom-mcp/EVIDENCE.md). Record actual
output for:

1. `tools/list`;
2. a good `get_weather` call;
3. a bad `get_forecast` call;
4. `npm test`.

If an approved Copilot surface is available, attach the local server and ask for a
three-day forecast in Fahrenheit. Verify each tool call against the recorded
contract. The local evidence remains the acceptance source.

## Final deliverable

1. A staged commit or diff showing `get_weather` before the other tools.
2. A completed server with three tool schemas and handlers.
3. Passing automated tests.
4. Inspector output or an explicit **not executed** record.
5. One good request and one bad request with expected and actual responses.

## Verification

- [ ] No `node_modules` directory is tracked.
- [ ] Package manifests and lockfiles are present.
- [ ] `get_weather` was tested before the other tools were added.
- [ ] Good input returns deterministic synthetic data.
- [ ] Bad input and unknown tools return `isError: true`.
- [ ] The completed tool catalog contains exactly three tools.
- [ ] `npm test` passes in the starter and solution projects.
- [ ] Inspector evidence is captured or marked **not executed**.
- [ ] No credential, network service, or source-system data was used.

## References

- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- [MCP Inspector CLI](https://github.com/modelcontextprotocol/inspector/blob/main/clients/cli/README.md)
- [Extending GitHub Copilot Chat with MCP](https://docs.github.com/copilot/customizing-copilot/extending-copilot-chat-with-mcp)
