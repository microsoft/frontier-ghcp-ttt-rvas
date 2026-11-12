---
description: "Two-hour TypeScript lab for a reliable GitHub Copilot SDK readiness assistant"
---

# Session M6-01 lab: Build a change readiness assistant

**Duration:** 120 minutes  
**Difficulty:** Advanced  
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04, M3-01 to M3-05 and the Session M6-01 trainer content

## Objective

Complete a TypeScript CLI that uses the GitHub Copilot SDK to assess synthetic
change records. The CLI streams the response, calls one readiness tool, denies a
restricted lookup, records failures, and passes focused tests.

Tracing with Docker Compose, an OpenTelemetry Collector, and Jaeger is an
[optional extension](#optional-extension-trace-the-run-in-jaeger) after the core
lab.

## What the SDK does and what this sample chooses

Keep these apart. You change the second column; you can't change the first.

| The SDK provides | This sample chooses |
| --- | --- |
| `CopilotClient`, sessions, `sendAndWait`, `disconnect`, `stop` | One client, one session, cleanup in `finally` |
| The event name `assistant.message_delta` and the `agentId` field | Print only deltas with no `agentId`, and keep the final message for records |
| Hook names: `onPreToolUse`, `onPostToolUseFailure`, `onErrorOccurred`, `onSessionEnd` | What each hook records and returns |
| Hook return shapes (see the glossary) | Deny `RESTRICTED-` IDs; retry once on a recoverable error |
| `onPermissionRequest` and the result kinds `approve-once` and `reject` | Approve only `lookup_change_request` |
| `onPostToolUseFailure` fires only for failed tool results, not for denied calls | Treat a denial as a policy result, not an error |
| A `telemetry` client option | Endpoint, source name, and `captureContent: false` |

The SDK is `@github/copilot-sdk`, pinned to **1.0.16** in `package.json` and the
lock file. That is the version this lab was tested with end to end. On 12 November
2026 the latest version on npm was 1.0.31. The offline build and unit tests also
pass on 1.0.31 if you add `"types": ["node"]` to `tsconfig.json`; the live demo
wasn't run on it. If you upgrade, add that line and check the SDK release notes
for hook and event changes.

## Glossary

| Term | Meaning | Example |
| --- | --- | --- |
| `assistant.message_delta` | A session event carrying a small piece of the streamed reply. The final `assistant.message` event carries the whole reply. | Deltas `"CR-10"`, `"42 is "`, `"ready."` print as `CR-1042 is ready.` The final message repeats the same text, so don't print it too. |
| Hook | A function the SDK calls at a fixed point in a session. It can record, change, or block what happens next. | `onPreToolUse` runs before a tool handler. |
| Hook return shape | The object a hook returns. Each hook accepts different fields. | Pre-tool: `{ permissionDecision: "deny", permissionDecisionReason: "..." }`. Failed tool: `{ additionalContext: "..." }`. Error: `{ errorHandling: "retry", retryCount: 1 }`. Session end: `{ sessionSummary: "..." }`. |
| OTLP | OpenTelemetry Protocol, the wire format for traces. Used only in the extension. | The SDK sends OTLP over HTTP to `http://localhost:4318`. |
| Span | One timed step in a trace, such as a tool call. A trace is a tree of spans for one run. | A `lookup_change_request` span sits under the session span. |
| Synthetic data | Fake records in `fixtures/change-requests.json`. No real systems or people. | `CR-1042`, `RESTRICTED-0001` |

## Final deliverables

Demonstrate:

1. a working CLI under `sdk-readiness-assistant/`;
2. client and session cleanup on success and on thrown errors;
3. streamed output printed once;
4. the typed readiness tool over the synthetic data;
5. a permission handler and pre-tool policy that deny `RESTRICTED-0001` with a
   visible reason;
6. failed-tool, error, and session-end hook records;
7. passing tests and type checks.

## Time plan

| Part | Work | Time |
| --- | --- | ---: |
| Setup | Install and baseline | 15 min |
| 1 | Client, session, and streaming | 25 min |
| 2 | Readiness tool and policy | 30 min |
| 3 | Failure hooks and cleanup | 25 min |
| 4 | Tests and final run | 25 min |
| Extension | Jaeger tracing (optional) | 20 min |

## Setup

Work from:

```text
sessions/session-m6-01-copilot-sdk/lab/starter/sdk-readiness-assistant/
```

You need authenticated GitHub Copilot, and Node.js and npm at the versions in
`package.json`. Use Copilot authentication, not BYOK or another provider. Docker
is only for the extension.

```bash
node --version
npm --version
npm ci
npm run check
npm test
```

Some tests should fail. They are your baseline: each failing test marks a control
you will add. The project still compiles. The authentication check in
`src/live-demo.ts` runs before the live demo.

Project files you will touch:

```text
src/live-demo.ts          client, session, streaming, hooks
src/change-store.ts       lookup over fixtures/change-requests.json
src/permission-policy.ts  permission decisions
src/hook-decisions.ts     pre-tool, failure, error, and end decisions
tests/                    one test file per module
```

Don't add data sources or runtime dependencies.

## Part 1: Lifecycle and streaming (25 minutes)

Start the client, create one session, stream parent-agent output, and close
everything on every exit path.

1. Create `CopilotClient` and call `client.start()` before creating the session.
2. Create one session with `streaming: true`.
3. Subscribe to `assistant.message_delta`. Print only deltas with no `agentId`.
4. Keep the final message for tests. Don't print it again.
5. Put `session.disconnect()` and `client.stop()` in `finally`.
6. Key per-session state by session ID.

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

```bash
npm run check
npm test
```

**Checkpoint 1.** The session and client close after success and after a thrown
error. Parent text prints once. Session state isn't global.

## Part 2: Readiness tool and policy (30 minutes)

Expose the synthetic data through one typed tool. Allow normal lookups. Deny the
restricted record before the handler runs.

1. Don't edit the record IDs or verdicts in `fixtures/change-requests.json`.
2. Complete the `lookup_change_request` tool and its JSON Schema.
3. Validate the ID inside the handler. Return the fixed `invalid-input` or
   `not-found` result for bad IDs.
4. In `onPermissionRequest`, approve only the readiness tool and reject
   everything else. Don't use an approve-all helper.
5. In `onPreToolUse`, deny IDs that start with `RESTRICTED-` with this reason:

   ```text
   Restricted change requests cannot be read by this assistant.
   ```

6. Record whether the handler ran. The denial test must show it didn't.

```bash
npm test
```

**Checkpoint 2.**

- `CR-1042` returns `ready` with no gaps.
- `CR-2087` returns `needs-review` with fixed gaps.
- Malformed and unknown IDs return fixed results.
- `RESTRICTED-0001` is denied with the reason above, and the handler never runs.

## Part 3: Failure, error, and end hooks (25 minutes)

1. `onPostToolUseFailure`: record the tool name and `error`. Return
   `additionalContext` telling the agent to report unknown data, not invent a
   record.
2. `onErrorOccurred`: store the original error. Retry once if the SDK marks it
   recoverable. Otherwise abort with a short `userNotification`.
3. `onSessionEnd`: record the reason and time, and delete that session's state.
   Make it safe to call twice.

A denied tool call isn't an SDK error. It's a policy result, and it doesn't
trigger `onPostToolUseFailure`.

```bash
npm test
npm run check
```

**Checkpoint 3.** The audit record separates a policy denial, a failed tool, a
recoverable or unrecoverable error, and the session end reason. Session state is
empty after the end hook.

## Part 4: Tests and final run (25 minutes)

Test the control path, not the model's wording. Mock the SDK at the boundaries
the starter provides. Don't call a live model from unit tests.

Complete the tests so they cover:

- known ready and blocked changes, and malformed and unknown IDs;
- the denied `RESTRICTED-0001` lookup, and that the handler didn't run;
- one retry for a recoverable error, and abort for an unrecoverable one;
- session state cleanup;
- deltas rendered once;
- client shutdown after an exception.

```bash
npm test
npm run check
npm run lint   # only if package.json defines it
```

Then run the live demo:

```bash
npm run demo
```

**Final checkpoint.** Tests pass twice with no data or snapshot changes. In the
demo, `CR-1042` streams a ready assessment, `bad-id` returns the fixed
invalid-input result, `RESTRICTED-0001` prints the denial reason, and the session
and client close.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `client.getAuthStatus()` reports unauthenticated | Check the GitHub Copilot sign-in and network. |
| Session creation fails | Check the lock file, Node.js version, and Copilot access. |
| Output is duplicated | Print deltas only. Keep the final message for records. |
| Restricted data reaches the handler | Match the exact tool name and check `toolArgs.requestId` in `onPreToolUse`. |
| Unknown IDs produce an invented answer | Return a failed tool result and add failure-hook context that forbids invention. |
| Tests call the live model | Mock the session boundary. |
| Session state remains | Delete the session ID in `onSessionEnd`. |

## Solution reference

Compare your work with `lab/solution/sdk-readiness-assistant/`:
`src/live-demo.ts`, `src/change-store.ts`, `src/permission-policy.ts`,
`src/hook-decisions.ts`, and `tests/`.

## Optional extension: trace the run in Jaeger

Do this after the core lab. It adds Docker Compose, an OpenTelemetry Collector,
and Jaeger so you can see the same run as a trace. It needs Docker with Docker
Compose and free local ports.

The SDK sends **OTLP** (the OpenTelemetry wire format) over HTTP to the
**Collector** on port 4318. The Collector forwards **spans** to Jaeger.

```text
CLI → OTLP/HTTP :4318 → OpenTelemetry Collector → Jaeger :16686
```

1. Read `compose.yaml` and `otel-collector-config.yaml`.
2. Check `docker version` and `docker compose version`.
3. Start the stack and wait until both services are healthy:

   ```bash
   docker compose -f compose.yaml up -d
   docker compose -f compose.yaml ps
   ```

4. Run `npm run demo`.
5. Open `http://localhost:16686`, select the project's service name, and find the
   three most recent traces.
6. In the `RESTRICTED-0001` trace, check that no handler span follows the denial.
7. Find the permitted and invalid-input traces.
8. Stop the stack:

   ```bash
   docker compose -f compose.yaml down
   ```

| Problem | Fix |
| --- | --- |
| Collector can't bind port 4318 | Stop the process that uses it, or change the port in both config files. |
| Jaeger is empty | Check container health, the Collector pipeline, the service name, and the time range. |

## References

- [Authentication](https://docs.github.com/en/copilot/how-tos/copilot-sdk/auth/authenticate)
- [Streaming session events](https://docs.github.com/en/copilot/how-tos/copilot-sdk/features/streaming-events)
- [Session hooks](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/hooks-overview)
- [Pre-tool use hook](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/pre-tool-use)
- [Error handling hook](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/error-handling)
- [Session lifecycle hooks](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/session-lifecycle)
- [OpenTelemetry instrumentation](https://docs.github.com/en/copilot/how-tos/copilot-sdk/observability/opentelemetry)
- [TypeScript SDK reference and examples](https://github.com/github/copilot-sdk/blob/main/nodejs/README.md)
