# Agent test scenarios

Run only on approved surfaces. Record paths changed, tools used, test output, and the reviewer decision.

## Test writer

```text
@test-writer Write tests for src/user-service.js. Cover exported functions, edge cases, and error paths.
```

Expected: a Jest test file with `describe` blocks and at least 15 relevant cases.

```text
@test-writer Write tests for applyDiscount in order-service.js, including all tiers, repeated discounts, and invalid tiers.
```

Expected: a focused suite with at least six cases.

For a cloud issue, request tests for valid and invalid `updateOrderStatus()` transitions, cancellation, reverse transitions, and terminal states. Expected: a PR with tests only.

## Documentation generator

```text
@docs-generator Read the source and create README.md that documents the actual API.
```

Expected: accurate installation, API reference, and runnable examples.

```text
@docs-generator Add JSDoc to src/order-service.js, including @param, @returns, @throws, and @example.
```

Expected: accurate annotations for every function.

## Data analyst

```text
@data-analyst Show database tables, schemas, and row counts.
```

```text
@data-analyst Show revenue by product category and the top three products in each.
```

Expected: schema-first queries and readable results.

| Agent | Scenario | IDE Chat | Cloud agent | CLI |
| --- | --- | --- | --- | --- |
| Test writer | Full and focused tests | ☐ | ☐ | ☐ |
| Documentation generator | README and JSDoc | ☐ | ☐ | ☐ |
| Data analyst | Schema and analysis | ☐ | N/A | ☐ |
