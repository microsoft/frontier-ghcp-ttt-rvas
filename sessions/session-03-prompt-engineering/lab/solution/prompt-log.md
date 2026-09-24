# Prompt log

## Access path

- [x] Live Copilot path
- [ ] Manual fallback

## Prompt iterations

| Stage | Prompt | Missing or wrong behavior | Revision |
| --- | --- | --- | --- |
| Understand the project | Explain the store, routes, and tests. | The first answer skipped copy semantics. | Asked how returned objects could mutate store state. |
| Implement the store | Implement baseline tests only. Use no packages. | Empty titles were accepted. | Added the exact invalid-input behavior. |
| Implement the routes | Map store outcomes to the documented status codes. | Errors returned HTML. | Required `{ error: message }` JSON. |
| Add tests | Add focused tests for each accepted behavior. | It added route tests with a new package. | Kept the built-in `node:test` constraint. |
| Apply the change request | Add priority without changing status behavior. | Invalid priority was normalized. | Required rejection and named the allowed values. |

## Context experiment

With `examples/response-shapes.js` open, the proposed route errors used an
`{ error: message }` object. With it closed, the first proposal used plain text.
The API contract still decided which result to keep.

## Judgment call

**Invalid priority behavior:** Reject the request with a clear error.

**Reason:** Silent normalization hides input defects and makes filtering less
predictable.

## Reusable prompt

Update only `TodoStore.create` to support the accepted priority values. Default to
`normal`, reject any other value with the required message, add no dependency, and
keep existing status behavior unchanged.
