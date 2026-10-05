# Change readiness assistant evidence

**Asset:** solution  
**Validation date:** October 5, 2026  
**SDK:** `@github/copilot-sdk` 1.0.16

## Local checks

| Check | Result |
|---|---|
| `npm ci` | Passed |
| `npm run check` | Passed |
| `npm test` | Passed, 12 tests |
| `npm run build` | Passed |

## Reliability behavior

- The custom tool rejects malformed IDs before reading fixture records.
- The permission policy approves only `lookup_change_request`.
- The pre-tool hook denies restricted IDs and tools outside the allow-list.
- The live demo prints session, prompt, pre-tool, failed-tool, error, session-end,
  and permission decisions.

## Live checks

The authenticated SDK demo passed on October 5, 2026:

- `CR-1042` returned the fixed `ready` evidence.
- `bad-id` returned the fixed `invalid-input` result.
- `RESTRICTED-0001` was denied before the handler ran.
- Each request ended with `reason=complete`.

Docker was not available in the validation environment. Start
`docker compose up -d`, rerun the demo, and confirm the traces in Jaeger at
`http://localhost:16686` before using this record as delivery evidence.
