---
description: "Trainer guide and prepared demo for a reliable GitHub Copilot SDK application"
---

# Session M6-01 trainer guide: Build reliable agent applications with the GitHub Copilot SDK

**Duration:** 60 minutes  
**Format:** Concept teaching, prepared live demo, lab briefing

## Goal

Show where the model's work ends and application code takes over. The model
produces an assessment. TypeScript code manages the lifecycle, limits tools,
makes permission decisions, and handles failures. Tracing is an optional extension.

## One-hour plan

| Time | Segment | What learners should show |
| --- | --- | --- |
| 0:00 to 0:10 | Application reliability boundary, SDK guarantees vs sample choices, glossary | They can name what the application owns and what the SDK provides |
| 0:10 to 0:22 | Client, session, and streaming | They can draw the startup and cleanup path |
| 0:22 to 0:39 | Tool, permissions, and hooks | They can explain where a call is denied and what each hook returns |
| 0:39 to 0:47 | Tests | They can name a stable assertion for each path |
| 0:47 to 0:57 | Prepared live demo | The denied action is visible in the CLI |
| 0:57 to 1:00 | Lab transition | Every learner has the tools installed |

Use [`slides.md`](../slides.md) for the teaching sequence.

## Prepare

1. Install Node.js and npm at the versions the project declares.
2. Optional: check that Docker Compose starts the supplied local stack.
3. Sign in to GitHub Copilot with the account learners will use.
4. In the reference solution, run `npm ci`, the tests, and the type check.
5. Run one successful assessment.
6. Run the denied action and check the reason appears in the terminal.
7. Optional: start the OpenTelemetry Collector and Jaeger, and find both runs as traces.
8. Keep the solution project open at the demo files.

## Teaching notes

### What the SDK guarantees and what the sample chooses

Use the table in the slides and the lab. The SDK defines the API: event names,
hook names and return shapes, permission result kinds. The sample defines the
policy: the tool name, the `RESTRICTED-` rule, the retry count, and the
allow-list. If a learner changes a policy value, tests change. If they change an
SDK name, the code stops compiling. The lab pins `@github/copilot-sdk` 1.0.16.
For other versions, check the SDK README.

Cover the glossary in the lab README before the streaming segment: delta, hook
return shape, OTLP, span. Skip OTLP and span unless you teach the extension.

### The application owns the boundary

Open with the synthetic change record. Ask which parts need model reasoning and
which should stay deterministic.

The readiness tool returns fixed lookup results. The model can explain them, but
it can't create a record or change the policy. That separation makes the lab
testable.

- register only `lookup_change_request`;
- inspect exact tool arguments before execution;
- deny unrecognized permission requests;
- show policy denial to the user;
- clean up even when the session fails.

### Client and session lifecycle

```text
construct client → start client → create session → subscribe →
send request → await completion → close session state → stop client
```

The session-end hook records what the agent runtime reports. The outer `finally`
block handles process-level cleanup. You need both.

### Streaming

Show `assistant.message_delta` and the final `assistant.message` as separate event
types. A CLI that prints both as primary output repeats the response.

The application streams parent-agent text deltas and uses complete events for
records and tests. It ignores sub-agent output.

### Tool and permission layers

Registration, permission requests, pre-tool policy, and handler validation are
separate controls. Use the table from the slides.

The lookup tool accepts one synthetic request ID. Normal `CR-####` values reach the
handler. IDs beginning with `RESTRICTED-` test the denial path. The pre-tool hook
blocks them before the handler runs.

### Failure and error hooks

- malformed input returns a fixed validation result;
- a failed tool execution enters `onPostToolUseFailure`;
- a runtime or model error enters `onErrorOccurred`.

A policy denial is not an error. The application did what it was designed to do.

### Tests

The tests assert control decisions and deterministic results, not the model's
prose.

### Optional extension: traces

Jaeger shows the timing and sequence of a run: whether the restricted call reached
the handler and where a failed run stopped. Trace payloads can expose prompts and
tool arguments, so the lab uses synthetic data. Teach this only if time allows.

## Demo: a denied change request

**Level:** L300  
**Time:** 10 minutes

Show the denied lookup for `RESTRICTED-0001` in the terminal. If you set up the
extension, open Jaeger and point to the same blocked tool call.

1. **Show the starting state.** Open `lab/solution/sdk-readiness-assistant/`. Point
   to `fixtures/change-requests.json`, `src/live-demo.ts`,
   `src/permission-policy.ts`, `src/hook-decisions.ts`, and the tests.

   > "The model doesn't own this data or policy. TypeScript decides which
   > capability exists and whether the exact call may run."

2. **Run the baseline.**

   ```bash
   npm test
   npm run check
   ```

   > "I want the control path green before I involve a live model. These tests
   > cover known data, denial, failure handling, streaming, and cleanup. They
   > don't compare natural-language answers."

3. **Run a permitted assessment.** Run `npm run demo`. The first request assesses
   `CR-1042`. Let the response stream. The renderer doesn't print the final event
   a second time.

4. **Watch the restricted lookup.** The third prepared prompt requests
   `RESTRICTED-0001`. The tool is known, so the request reaches policy. The
   pre-tool hook checks the request ID and denies it before the handler runs.

5. **Point to the visible denial.** Read the denial reason from the terminal and
   show the audit entry.

6. **Show invalid input and the failed-tool policy.** Point to the `bad-id` run,
   then the failed-tool hook test and the session-end hook test. Invalid input
   returns a fixed validation result. A failed tool execution uses its own hook.

7. **Optional: show the trace.** Start the stack with
   `docker compose -f compose.yaml up -d`, rerun `npm run demo`, and open Jaeger at
   `http://localhost:16686`. Select the project's service name. The latest trace
   shows the blocked tool call with no handler span after the denial.

8. **Close the demo.** Stop the application.

### Demo troubleshooting

| Problem | Response |
| --- | --- |
| SDK authentication fails | Stop. Check the GitHub Copilot sign-in and network path. |
| No streamed text appears | Check the session enables streaming and the handler listens for parent `assistant.message_delta` events. |
| Restricted data reaches the handler | Stop. Check the exact tool name and parsed `requestId` in `onPreToolUse`, then rerun the denial test. |
| Collector is unreachable (extension) | Check Docker Compose health and the OTLP HTTP endpoint `http://localhost:4318`. |
| Jaeger shows no trace (extension) | Check the Collector exports to Jaeger, select the configured service name, and widen the time range. |
| Output appears twice | Check whether both message deltas and the final assistant message are printed as primary output. |

Point learners to [`lab/README.md`](../lab/README.md). They add the same controls
to the starter project one layer at a time and run the focused checks at each
checkpoint. Tracing is an optional extension at the end.

## Lab coaching map

| Lab checkpoint | Coach question |
| --- | --- |
| Setup | Did the install and the authenticated SDK call pass? Do the starter tests fail where expected? |
| Lifecycle and streaming | Where does cleanup run if `sendAndWait` throws? |
| Tool and denial | Do the test results show the handler did not run? |
| Failure hooks | Is unknown data reported without invention or broad retry? |
| Tests | Are assertions stable without matching model prose? |
| Extension: traces | Can the learner connect terminal output to one Jaeger trace? |

## References

- [GitHub Copilot SDK documentation](https://docs.github.com/en/copilot/how-tos/copilot-sdk)
- [Authentication](https://docs.github.com/en/copilot/how-tos/copilot-sdk/auth/authenticate)
- [Streaming session events](https://docs.github.com/en/copilot/how-tos/copilot-sdk/features/streaming-events)
- [Working with hooks](https://docs.github.com/en/copilot/how-tos/copilot-sdk/features/hooks)
- [Pre-tool use hook](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/pre-tool-use)
- [Error handling hook](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/error-handling)
- [Session lifecycle hooks](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/session-lifecycle)
- [OpenTelemetry instrumentation](https://docs.github.com/en/copilot/how-tos/copilot-sdk/observability/opentelemetry)
- [TypeScript SDK reference and examples](https://github.com/github/copilot-sdk/blob/main/nodejs/README.md)
