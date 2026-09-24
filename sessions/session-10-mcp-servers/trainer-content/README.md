# Session 10 Trainer Guide: MCP Servers

## Delivery objective

Show one MCP tool from contract to evidence. Learners should see the schema, handler,
good input, bad input, automated test, and Inspector call before the server grows
to three tools.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:08 | MCP request path and boundaries |
| 0:08–0:18 | Tool names, descriptions, and JSON Schema |
| 0:18–0:33 | Stage-one `get_weather` walkthrough |
| 0:33–0:43 | Bad input and visible errors |
| 0:43–0:52 | Tests and MCP Inspector |
| 0:52–1:00 | Add tools without weakening the contract; lab handoff |

The timings match [`slides.md`](../slides.md). Stop live Inspector troubleshooting
at 0:50. Use the recorded expected output and protect the lab handoff.

## Preflight

- Use Node.js 20 or later and the approved npm registry.
- Run `npm ci && npm test` in both custom MCP projects.
- Confirm that no `node_modules` directory is tracked.
- Pin MCP Inspector 2.5.0 for the demonstration.
- Keep [`lab/solution/custom-mcp/EVIDENCE.md`](../lab/solution/custom-mcp/EVIDENCE.md)
  open as the fallback.
- Do not attach a credential, network service, or source-system data.

If approved package access is unavailable, stop the executable demonstration. A
static code walkthrough is acceptable, but mark Inspector and tests as **not
executed**.

## Teaching sequence

### 0:00–0:08: MCP request path

Use this path:

```text
Client → tools/list → tool selection → tools/call → handler → result
```

The protocol standardizes discovery and calls. It does not approve the server,
grant permissions, or make a result correct.

Separate the boundaries:

| Boundary | Question |
| --- | --- |
| Tool catalog | What can the client discover? |
| Input schema | Which arguments are accepted? |
| Handler | What work happens? |
| Result | How does success or failure appear? |
| Transport | Which process or endpoint carries the request? |

### 0:08–0:18: The tool contract

Open `lab/starter/custom-mcp/src/index.js`. Read the `get_weather` definition before
the handler.

Point out:

- a specific name;
- a description that says the data is synthetic;
- a required, non-empty `city`;
- `additionalProperties: false`.

The schema helps clients form a request. The handler still validates arguments
because direct tests and future transports may reach it outside a client-side
validator.

### 0:18–0:33: One tool end to end

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
cd sessions/session-10-mcp-servers/lab/starter/custom-mcp
npm test
```

The deterministic response makes exact assertions useful. Random output would turn
a small contract test into a flaky one.

### 0:33–0:43: Failure is part of the interface

Trace an empty city. The response sets `isError: true` and carries:

```json
{
  "error": "city must be a non-empty string"
}
```

Compare this with two weak patterns:

- returning an empty success object;
- throwing an unhandled exception that terminates the server.

The caller needs a visible, bounded failure it can report.

### 0:43–0:52: Inspector and test evidence

Run:

```bash
npx --yes @modelcontextprotocol/inspector@2.5.0 --cli \
  node src/index.js --method tools/list
```

Then call `get_weather`. Keep tests and Inspector evidence separate:

| Evidence | Proves |
| --- | --- |
| Unit test | Handler behavior for known inputs |
| `tools/list` | The server exposes the expected catalog |
| `tools/call` | The stdio protocol path reaches the handler |
| Copilot call | A selected client can discover and choose the tool |

A Copilot prompt is useful integration evidence, but it is not a replacement for
the deterministic tests.

### 0:52–1:00: Add the remaining tools

Open the completed server. Show that `get_forecast` and
`convert_temperature` follow the same shape instead of creating special cases.

Review the constraints:

- forecast days are integers from 1 to 7;
- conversion units are a fixed enum;
- unknown tools return a visible error;
- output remains deterministic and synthetic.

Hand learners to the staged lab. They must keep the first tool passing while they
add the other two.

## Prepared demonstration

1. Run the starter tests.
2. Show the good `Oslo` request and exact response.
3. Change the request to an empty city and show the tool error.
4. List tools with Inspector.
5. Open the solution catalog and show the two added tools.
6. Run the five solution tests.

Do not type the full server from scratch during delivery. The teaching point is the
contract and evidence, not watching boilerplate appear.

## Review prompts

- Which file owns the tool description?
- Which check rejects an empty city?
- Why does the handler validate input when the schema exists?
- What does `tools/list` prove that a direct handler test does not?
- What would make adding a fourth tool unsafe?

## Lab handoff

Learners start with the one-tool server, add one test, inspect good and bad calls,
then add the remaining tools. The final deliverable includes lockfiles, passing
tests, Inspector evidence or **not executed**, and exact request and response
records.

## References

- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- [MCP Inspector CLI](https://github.com/modelcontextprotocol/inspector/blob/main/clients/cli/README.md)
- [Extending GitHub Copilot Chat with MCP](https://docs.github.com/copilot/customizing-copilot/extending-copilot-chat-with-mcp)
