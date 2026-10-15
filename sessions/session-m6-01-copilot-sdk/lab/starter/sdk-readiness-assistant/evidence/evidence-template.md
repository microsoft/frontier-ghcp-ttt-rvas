# Change readiness assistant evidence

**Asset:** starter  
**Validation date:**  
**SDK:** `@github/copilot-sdk` 1.0.16

## Local checks

| Check | Result |
|---|---|
| `npm ci` | |
| `npm run check` | |
| `npm test` | Expected to fail before the reliability fixes |
| `npm run build` | |

## Reliability behavior

- [ ] The custom tool rejects malformed IDs before reading fixture records.
- [ ] The permission policy approves only `lookup_change_request`.
- [ ] The pre-tool hook denies restricted IDs and tools outside the allow-list.
- [ ] The live demo prints hook and permission decisions.

## Live checks

Run `./run-demo.sh` after the unit tests pass. Paste the accepted request, invalid input, and denied request output here.

Start `docker compose up -d`, run the demo, and record the Jaeger trace ID here:
