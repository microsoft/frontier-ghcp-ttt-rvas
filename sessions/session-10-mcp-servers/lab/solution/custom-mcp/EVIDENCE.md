# MCP test and Inspector evidence

Run these commands from `lab/solution/custom-mcp`.

## Automated tests

```bash
npm ci
npm test
```

Expected result:

```text
tests 5
pass 5
fail 0
```

The suite checks the tool catalog, good requests, bad arguments, both conversion
directions, and an unknown tool.

## Inspector

Use the approved, pinned Inspector version:

```bash
npx --yes @modelcontextprotocol/inspector@2.5.0 --cli \
  node src/index.js --method tools/list
```

The result must list `get_weather`, `get_forecast`, and
`convert_temperature`.

Call the first staged tool:

```bash
npx --yes @modelcontextprotocol/inspector@2.5.0 --cli \
  node src/index.js --method tools/call \
  --tool-name get_weather --tool-arg city=Oslo
```

Expected response payload:

```json
{
  "city": "Oslo",
  "temperature": 30,
  "unit": "celsius",
  "conditions": "rain"
}
```

Try bad input:

```bash
npx --yes @modelcontextprotocol/inspector@2.5.0 --cli \
  node src/index.js --method tools/call \
  --tool-name get_forecast --tool-arg city=Lima --tool-arg days=8
```

Expected tool error:

```json
{
  "error": "days must be an integer from 1 to 7"
}
```

Inspector returns the tool payload with `isError: true` and exits with status `5`.
That nonzero exit is expected for this negative test.

## Recorded verification

On September 24, 2026, the pinned Inspector listed all three tools. The good call
returned the exact Oslo payload above. The bad forecast call returned the expected
error with `isError: true` and exit status `5`.
