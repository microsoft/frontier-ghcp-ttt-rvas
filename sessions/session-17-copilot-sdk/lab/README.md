---
description: "Two-hour TypeScript lab for a reliable GitHub Copilot SDK readiness assistant"
---

# Session 17 Lab: Build a Traced Change Readiness Assistant

**Duration:** 120 minutes  
**Difficulty:** Advanced  
**Prerequisites:** Sessions 01 to 12 and the Session 17 trainer content

## Objective

Complete a TypeScript CLI that uses the GitHub Copilot SDK to assess deterministic
synthetic change records. The finished application must stream its response, call
one bounded tool, deny a restricted lookup, record failures, pass focused tests,
and export traces through an OpenTelemetry Collector to Jaeger.

## Final deliverables

Submit or demonstrate:

1. a working CLI under `sdk-readiness-assistant/`;
2. explicit client and session cleanup;
3. streamed parent-agent output without duplicate final text;
4. the typed readiness tool over the supplied synthetic data;
5. permission handling plus a pre-tool policy that visibly denies
   `RESTRICTED-0001`;
6. failed-tool, error, and session-end hook records;
7. passing tests and type checks;
8. one Jaeger trace for a permitted assessment;
9. one Jaeger trace or trace event showing the denied action;
10. terminal evidence for the unknown-change failure path.

## Time plan

| Part | Work | Time |
| --- | --- | ---: |
| 1 | Preflight and baseline | 15 min |
| 2 | Client, session, and streaming | 20 min |
| 3 | Readiness tool and policy | 30 min |
| 4 | Failure hooks and cleanup | 20 min |
| 5 | Tests | 15 min |
| 6 | Collector, Jaeger, and final verification | 20 min |

## Required preflight

Work from:

```text
sessions/session-17-copilot-sdk/lab/starter/sdk-readiness-assistant/
```

You must have:

- authenticated GitHub Copilot SDK access;
- Node.js and npm versions accepted by `package.json`;
- Docker Engine;
- Docker Compose;
- permission to bind the local ports declared in the Compose file.

**Stop if any item is unavailable. There is no fallback route.** Do not switch to
BYOK, another model provider, a remote session, or a different language.

Run the local checks:

```bash
node --version
npm --version
docker version
docker compose version
npm ci
npm run check
npm test
```

Some focused tests should fail because the reliability controls are incomplete.
The project must compile far enough to show the intended gaps. Use the
instructor-provided authentication check in `src/live-demo.ts` before starting the
live exercises. If `client.getAuthStatus()` reports that the user is not
authenticated, stop.

### Project map

Use the names present in the starter project. The expected layout is:

```text
sdk-readiness-assistant/
├── package.json
├── compose.yaml
├── otel-collector-config.yaml
├── fixtures/
│   └── change-requests.json
├── src/
│   ├── live-demo.ts
│   ├── change-store.ts
│   ├── permission-policy.ts
│   ├── hook-decisions.ts
│   └── types.ts
└── tests/
    ├── change-store.test.ts
    ├── permission-policy.test.ts
    └── hook-decisions.test.ts
```

Do not add external data sources or new runtime dependencies.

## Part 1: Establish lifecycle and streaming (20 minutes)

### Goal

Start the client, create one local session, stream parent-agent output, and close
the client on every exit path.

### Steps

1. Open the application entry point and lifecycle module.
2. Create `CopilotClient` with the supplied telemetry endpoint.
3. Start the client before creating the session.
4. Create one session with streaming enabled.
5. Subscribe to `assistant.message_delta`.
6. Print only parent-agent deltas.
7. Keep final message events for audit or tests. Do not print the same response
   again.
8. Put client shutdown in `finally`.
9. Keep per-session state keyed by the session ID.

Use this lifecycle shape:

```ts
const client = new CopilotClient(clientOptions);
await client.start();
let session;

try {
  session = await client.createSession(sessionConfig);
  subscribeToOutput(session);
  await session.sendAndWait({ prompt });
} finally {
  await session?.disconnect();
  await client.stop();
}
```

Run:

```bash
npm run check
npm test
```

### Checkpoint 1

- The client starts before session creation.
- The session disconnects after success and thrown errors.
- The client stops after success and thrown errors.
- Parent text streams once.
- Per-session state is not global shared state.

## Part 2: Complete the readiness tool and policy (30 minutes)

### Goal

Expose deterministic readiness data through one typed tool. Permit normal lookups
and deny the restricted synthetic record before the handler runs.

### Steps

1. Open the supplied change records in `fixtures/change-requests.json`.
2. Do not edit the record IDs or expected verdicts.
3. Complete the `lookup_change_request` tool with its supplied JSON Schema.
4. Validate the change ID inside the handler.
5. Return the matching evidence, gaps, and verdict.
6. Return the fixed `invalid-input` or `not-found` result for bad IDs.
7. Add `onPermissionRequest`.
8. Approve only the supplied readiness tool request.
9. Reject unknown request kinds and unrelated tools.
10. Add `onPreToolUse`.
11. Deny IDs beginning with `RESTRICTED-` with this reason:

    ```text
    Restricted change requests cannot be read by this assistant.
    ```

12. Record whether the handler ran. The denied test must prove that it did not.

Do not use an approve-all helper. The lab is about a narrow permission boundary.

Run the focused tool and policy tests:

```bash
npm test
```

### Checkpoint 2

Demonstrate:

- `CR-1042` returns `ready` with no gaps;
- `CR-2087` returns `needs-review` with fixed gaps;
- malformed or unknown IDs return fixed results without invention;
- a normal lookup is permitted;
- `RESTRICTED-0001` is denied with a visible reason;
- the denied request never enters the tool handler.

## Part 3: Add failure, error, and end hooks (20 minutes)

### Goal

Record the expected failure paths and clear session state at the end.

### Steps

1. Complete `onPostToolUseFailure`.
2. Record the tool name and failed result.
3. Add context that tells the agent to report unknown data instead of inventing a
   change record.
4. Complete `onErrorOccurred`.
5. Store the original error.
6. Retry once only when the SDK marks the error recoverable.
7. Abort unrecoverable errors and show a short user notification.
8. Complete `onSessionEnd`.
9. Record the end reason and timestamp.
10. Delete state for the ended session.
11. Keep cleanup safe if called more than once.

Do not treat a denied tool call as an SDK error. It is a policy result.

Run:

```bash
npm test
npm run check
```

### Checkpoint 3

The audit record distinguishes:

- policy denial;
- failed tool result;
- recoverable or unrecoverable SDK error;
- normal or abnormal session end.

Session state is empty after the end hook.

## Part 4: Finish the automated tests (15 minutes)

### Goal

Prove the control path without depending on model wording or a live trace backend.

Complete or repair tests for:

- a known ready change;
- a known blocked change;
- malformed and unknown change IDs;
- denied `RESTRICTED-0001` lookup;
- handler non-execution after denial;
- one retry for a recoverable error;
- abort for an unrecoverable error;
- session state cleanup;
- streamed deltas rendered once;
- client shutdown after an exception.

Mock the SDK boundary where the starter already provides seams. Do not call a live
model from unit tests.

Run:

```bash
npm test
npm run check
```

If `package.json` defines linting, run:

```bash
npm run lint
```

### Checkpoint 4

All tests pass twice without data or snapshot changes.

## Part 5: Start tracing and run the application (20 minutes)

### Goal

Export one connected trace through the local Collector and inspect it in Jaeger.

### Steps

1. Review `compose.yaml` and `otel-collector-config.yaml`.
2. Confirm the SDK OTLP HTTP endpoint is:

   ```text
   http://localhost:4318
   ```

3. Start the local stack:

   ```bash
   docker compose -f compose.yaml up -d
   docker compose -f compose.yaml ps
   ```

4. Wait until the Collector and Jaeger services are healthy.
5. Run `npm run demo`.
6. Confirm `CR-1042` streams a ready assessment.
7. Confirm `bad-id` returns the fixed invalid-input result.
8. Confirm `RESTRICTED-0001` prints the denial reason.
9. Confirm the session disconnects and the client stops.
10. Open the Jaeger UI at `http://localhost:16686`.
11. Select the service name configured by the project.
12. Find the three most recent runs.
13. Open the denied run and confirm no lookup handler work follows the policy
    denial.
14. Locate the permitted and invalid-input paths.

Stop the local stack when the trainer tells you to:

```bash
docker compose -f compose.yaml down
```

### Checkpoint 5

Show the trainer:

- the permitted terminal run;
- the visible denied action;
- the invalid-input result;
- one connected Jaeger trace;
- the session end reason;
- passing tests and type checks.

## Verification checklist

- [ ] Authenticated GitHub Copilot SDK preflight passed.
- [ ] Node.js, npm, Docker, and Docker Compose preflight passed.
- [ ] Client startup and shutdown are explicit.
- [ ] The session streams parent output without duplicate final text.
- [ ] The readiness tool reads only deterministic synthetic data.
- [ ] Permission handling rejects unrelated requests.
- [ ] The pre-tool hook denies `RESTRICTED-0001` before handler execution.
- [ ] The denial reason is visible.
- [ ] Failed-tool, error, and session-end hooks record distinct outcomes.
- [ ] Per-session state is cleared.
- [ ] Tests pass.
- [ ] Type checks pass.
- [ ] The Collector and Jaeger receive traces.
- [ ] A Jaeger trace shows the denied path.
- [ ] No excluded feature or external business system was added.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `client.getAuthStatus()` reports unauthenticated | Stop. Confirm the approved GitHub Copilot sign-in and network path. Do not use BYOK or another provider. |
| `CopilotClient` starts but session creation fails | Check the installed package lock, supported Node.js version, and current GitHub Copilot access. |
| Output is duplicated | Print `assistant.message_delta` as live output and keep the final message for records only. |
| Restricted data reaches the handler | Match the exact tool name and inspect parsed `toolArgs.requestId` in `onPreToolUse`. |
| Unknown IDs produce an invented answer | Return a failed tool result and add failure-hook context that forbids invention. |
| Tests call the live model | Mock the SDK session boundary and assert deterministic events or decisions. |
| Collector cannot bind port 4318 | Stop the conflicting approved process or change the supplied local configuration consistently. |
| Jaeger is empty | Check container health, the Collector export pipeline, service name, and Jaeger time range. |
| Session state remains after completion | Delete the session ID in `onSessionEnd` and keep outer cleanup in `finally`. |

## Solution reference

After completing all checkpoints, compare your work with:

```text
sessions/session-17-copilot-sdk/lab/solution/sdk-readiness-assistant/
```

Review these areas in order:

1. `src/live-demo.ts` for client, session, streaming, and hooks;
2. `src/change-store.ts` for the deterministic lookup;
3. `src/permission-policy.ts` for permission decisions;
4. `src/hook-decisions.ts` for prompt and pre-tool policy;
5. `tests/` for stable control-path assertions;
6. `compose.yaml` and `otel-collector-config.yaml` for trace routing.

Do not copy the solution before the checkpoints. Use it to compare boundaries and
verification evidence.

## Official references

Verified on **October 5, 2026**:

- [Authentication](https://docs.github.com/en/copilot/how-tos/copilot-sdk/auth/authenticate)
- [Streaming session events](https://docs.github.com/en/copilot/how-tos/copilot-sdk/features/streaming-events)
- [Session hooks](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/hooks-overview)
- [Pre-tool use hook](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/pre-tool-use)
- [Error handling hook](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/error-handling)
- [Session lifecycle hooks](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/session-lifecycle)
- [OpenTelemetry instrumentation](https://docs.github.com/en/copilot/how-tos/copilot-sdk/observability/opentelemetry)
- [TypeScript SDK reference and examples](https://github.com/github/copilot-sdk/blob/main/nodejs/README.md)
