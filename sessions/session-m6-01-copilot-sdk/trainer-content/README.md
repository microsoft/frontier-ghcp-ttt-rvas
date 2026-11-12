---
description: "Trainer guide and prepared demo for a reliable GitHub Copilot SDK application"
---

# Session M6-01 trainer guide: Build reliable agent applications with the GitHub Copilot SDK

**Duration:** 60 minutes  
**Format:** Concept teaching, prepared live demo, lab briefing

## Goal

Show where the model's work ends and application code takes over. The model
produces an assessment. TypeScript code manages the lifecycle, limits tools,
makes permission decisions, handles failures, and records traces.

## One-hour plan

| Time | Segment | What learners should show |
| --- | --- | --- |
| 0:00 to 0:08 | Application reliability boundary | They can name what the application owns |
| 0:08 to 0:20 | Client, session, and streaming | They can draw the startup and cleanup path |
| 0:20 to 0:37 | Tool, permissions, and hooks | They can explain where a call is denied |
| 0:37 to 0:47 | Tests and traces | They can name a stable assertion for each path |
| 0:47 to 0:57 | Prepared live demo | The denied action is visible in the CLI and Jaeger |
| 0:57 to 1:00 | Lab transition | Every learner has the tools installed |

Use [`slides.md`](../slides.md) for the teaching sequence.

## Prepare

1. Install Node.js and npm at the versions the project declares.
2. Check that Docker Compose starts the supplied local stack.
3. Sign in to GitHub Copilot with the account learners will use.
4. In the reference solution, run `npm ci`, the tests, and the type check.
5. Start the OpenTelemetry Collector and Jaeger.
6. Run one successful assessment and find its trace in Jaeger.
7. Run the denied action and check the reason appears in the terminal and the trace.
8. Keep the solution project open at the demo files.

## Teaching notes

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

### Tests and traces

The tests assert control decisions and deterministic results, not the model's
prose.

Jaeger shows the timing and sequence of a run: whether the restricted call reached
the handler and where a failed run stopped. Trace payloads can expose prompts and
tool arguments, so the lab uses synthetic data.

## Demo: trace a denied change request

**Level:** L300  
**Time:** 10 minutes

Show the denied lookup for `RESTRICTED-0001` in the terminal. Then open Jaeger and
point to the same blocked tool call in the connected trace.

1. **Show the starting state.** Open `lab/solution/sdk-readiness-assistant/`. Point
   to `fixtures/change-requests.json`, `src/live-demo.ts`,
   `src/permission-policy.ts`, `src/hook-decisions.ts`, the tests, and the
   telemetry configuration.

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

3. **Start the trace stack.**

   ```bash
   docker compose -f compose.yaml up -d
   docker compose -f compose.yaml ps
   ```

   The SDK exports OTLP data to the Collector on port 4318. The Collector forwards
   traces to Jaeger.

4. **Run a permitted assessment.** Run `npm run demo`. The first request assesses
   `CR-1042`. Let the response stream. The renderer doesn't print the final event
   a second time.

5. **Watch the restricted lookup.** The third prepared prompt requests
   `RESTRICTED-0001`. The tool is known, so the request reaches policy. The
   pre-tool hook checks the request ID and denies it before the handler runs.

6. **Point to the visible denial.** Read the denial reason from the terminal and
   show the audit entry.

7. **Open Jaeger.** Select the service name from the project and find the latest
   trace. It shows the session work and the blocked tool call, with no handler
   span after the denial.

8. **Show invalid input and the failed-tool policy.** Point to the `bad-id` run,
   then the failed-tool hook test and the session-end hook test. Invalid input
   returns a fixed validation result. A failed tool execution uses its own hook.

9. **Close the demo.** Stop the application. Leave the trace stack running for the
   lab if the machine is shared.

### Demo troubleshooting

| Problem | Response |
| --- | --- |
| SDK authentication fails | Stop. Check the GitHub Copilot sign-in and network path. |
| No streamed text appears | Check the session enables streaming and the handler listens for parent `assistant.message_delta` events. |
| Restricted data reaches the handler | Stop. Check the exact tool name and parsed `requestId` in `onPreToolUse`, then rerun the denial test. |
| Collector is unreachable | Check Docker Compose health and the OTLP HTTP endpoint `http://localhost:4318`. |
| Jaeger shows no trace | Check the Collector exports to Jaeger, select the configured service name, and widen the time range. |
| Output appears twice | Check whether both message deltas and the final assistant message are printed as primary output. |

Point learners to [`lab/README.md`](../lab/README.md). They add the same controls
to the starter project one layer at a time and run the focused checks at each
checkpoint.

## Lab coaching map

| Lab checkpoint | Coach question |
| --- | --- |
| Setup | Did every tool and the authenticated SDK call pass? |
| Lifecycle and streaming | Where does cleanup run if `sendAndWait` throws? |
| Tool and denial | Do the test results show the handler did not run? |
| Failure hooks | Is unknown data reported without invention or broad retry? |
| Tests | Are assertions stable without matching model prose? |
| Traces | Can the learner connect terminal output to one Jaeger trace? |

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
