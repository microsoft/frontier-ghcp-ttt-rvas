# Session M3-03 trainer guide: MCP servers

## Teaching goal

Show one MCP tool from its contract through tests and Inspector output. Walk through the schema and handler, then demonstrate good and bad input. Run the automated test and an Inspector call before expanding the server to three tools.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | MCP request path and boundaries |
| 0:08 to 0:18 | Tool names, descriptions, and JSON Schema |
| 0:18 to 0:33 | Stage-one `get_weather` walkthrough |
| 0:33 to 0:43 | Bad input and visible errors |
| 0:43 to 0:52 | Tests and MCP Inspector |
| 0:52 to 1:00 | Add tools without weakening the contract; lab handoff |

The timings match [`slides.md`](../slides.md). Stop live Inspector troubleshooting at 0:50 and use the recorded output in [`EVIDENCE.md`](../lab/solution/custom-mcp/EVIDENCE.md).

## Preparation

- Use Node.js 20 or later.
- Run `npm ci && npm test` in both custom MCP projects.
- Check that no `node_modules` directory is tracked.
- Pin MCP Inspector 2.5.0 for the demo.

If you can't install packages, walk through the code and label Inspector and tests as **not executed**.

## Teaching sequence

### 0:00 to 0:08: MCP request path

```text
Client → tools/list → tool selection → tools/call → handler → result
```

The protocol standardizes discovery and calls. It doesn't grant permissions or make a result correct.

Keep the packaging distinction short: an MCP server provides protocol tools and context. A plugin distributes a versioned set of Copilot customizations and may include MCP server configuration. Installing a plugin doesn't run the server it references.

| Boundary | Question |
| --- | --- |
| Tool catalog | What can the client discover? |
| Input schema | Which arguments are accepted? |
| Handler | What work happens? |
| Result | How does success or failure appear? |
| Transport | Which process or endpoint carries the request? |

### 0:08 to 0:18: The tool contract

Open `lab/starter/custom-mcp/src/index.js`. Read the `get_weather` definition before the handler. Point out:

- a specific name;
- a description that says the data is synthetic;
- a required, non-empty `city`;
- `additionalProperties: false`.

The schema helps clients form a request. The handler still validates arguments, because direct tests and other transports can reach it without a client-side validator.

### 0:18 to 0:33: One tool end to end

Trace:

```json
{
  "name": "get_weather",
  "arguments": {
    "city": "Oslo"
  }
}
```

Show `invokeTool`, `syntheticWeather`, and the protocol registration. Then run:

```bash
cd sessions/session-m3-03-mcp-servers/lab/starter/custom-mcp
npm test
```

Deterministic output allows exact assertions. Random output would make a small contract test flaky.

### 0:33 to 0:43: Failure is part of the interface

Trace an empty city. The response sets `isError: true` and carries:

```json
{
  "error": "city must be a non-empty string"
}
```

Compare two weak patterns: returning an empty success object, and throwing an unhandled exception that kills the server. The caller needs an error it can report without crashing.

### 0:43 to 0:52: Inspector output and test results

```bash
npx --yes @modelcontextprotocol/inspector@2.5.0 --cli \
  node src/index.js --method tools/list
```

Then call `get_weather`. Keep test results and Inspector output separate:

| Check | Shows |
| --- | --- |
| Unit test | Handler behavior for known inputs |
| `tools/list` | The server exposes the expected catalog |
| `tools/call` | The stdio protocol path reaches the handler |
| Copilot call | A client can discover and choose the tool |

A Copilot call shows client integration works. Keep the deterministic tests anyway.

### 0:52 to 1:00: Add the remaining tools

Open the completed server. `get_forecast` and `convert_temperature` follow the same shape as `get_weather`:

- forecast days are integers from 1 to 7;
- conversion units are a fixed enum;
- unknown tools return a visible error;
- output stays deterministic and synthetic.

Remind learners to keep the first tool passing while they add the other two.

## Prepared demonstration

1. Run the starter tests.
2. Show the good `Oslo` request and exact response.
3. Change the request to an empty city and show the tool error.
4. List tools with Inspector.
5. Open the solution catalog and show the two added tools.
6. Run the five solution tests.

Don't type the full server from scratch in class.

## Review prompts

- Which file owns the tool description?
- Which check rejects an empty city?
- Why does the handler validate input when the schema exists?
- What does `tools/list` show that a direct handler test doesn't?
- What would make adding a fourth tool risky?

## Lab handoff

Learners start with the one-tool server, add one test, and inspect good and bad calls before adding the other tools. They update the one-tool catalog assertion when the catalog grows, run tests and Inspector against their edited copy (not the reference solution), and submit the lockfile, test output, and protocol requests and responses.

## References

- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- [MCP Inspector CLI](https://github.com/modelcontextprotocol/inspector/blob/main/clients/cli/README.md)
- [Extending GitHub Copilot Chat with MCP](https://docs.github.com/copilot/customizing-copilot/extending-copilot-chat-with-mcp)
