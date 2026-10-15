# Integration test scenarios

Use these scenarios against the custom server. Record each tool call, its inputs, results, and errors.

## 1. Simple call

```text
What's the weather like in Tokyo right now?
```

Expected: `get_weather` receives `city: "Tokyo"` and returns readable synthetic data.

## 2. Chained calls

```text
Get the 3-day forecast for London and convert all temperatures to Fahrenheit.
```

Expected: The agent calls `get_forecast`, then `convert_temperature` for each value.

## 3. Comparison

```text
Check the current weather in Paris, Berlin, and Rome. Which city would you recommend for warm weather?
```

Expected: one weather lookup per city and a comparison based on the returned data.

## 4. Error handling

```text
What's the weather in the city of Atlantis?
```

Expected: the server returns a clear error or supported response without crashing.

## 5. Cross-server query

```text
List products in the "Outdoor" category, then check weather in three cities to recommend where outdoor products fit today.
```

Expected: The agent combines SQLite and weather results. Run this only when both servers are approved and connected.

| Scenario | Result | Notes |
| --- | --- | --- |
| Simple call | ☐ Pass ☐ Fail | |
| Chained calls | ☐ Pass ☐ Fail | |
| Comparison | ☐ Pass ☐ Fail | |
| Error handling | ☐ Pass ☐ Fail | |
| Cross-server query | ☐ Pass ☐ Fail | |
