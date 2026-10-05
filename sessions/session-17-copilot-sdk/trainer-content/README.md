---
description: "Trainer guide and prepared demo for a reliable GitHub Copilot SDK application"
---

# Session 17 Trainer Guide: Build Reliable Agent Applications with the GitHub Copilot SDK

**Duration:** 60 minutes  
**Format:** Concept teaching, prepared live demo, lab briefing

## Delivery objective

Learners should leave with a clear application boundary. The model produces an
assessment, while TypeScript code owns lifecycle, tool scope, permission decisions,
failure handling, and trace evidence.

Keep the session local and focused. Do not add orchestration, remote sessions,
BYOK, packaging, deployment, external systems, or another language.

## One-hour plan

| Time | Segment | Exit signal |
| --- | --- | --- |
| 0:00 to 0:08 | Application reliability boundary | Learners can name what the application owns |
| 0:08 to 0:20 | Client, session, and streaming | Learners can draw the startup and cleanup path |
| 0:20 to 0:37 | Tool, permissions, and hooks | Learners can explain where a call is denied |
| 0:37 to 0:47 | Tests and trace evidence | Learners can name a stable assertion for each path |
| 0:47 to 0:57 | Prepared live demo | The denied action is visible in the CLI and Jaeger |
| 0:57 to 1:00 | Lab transition | Every learner has passed preflight |

Use [`slides.md`](../slides.md) for the teaching sequence.

## Trainer prerequisites

Prepare the delivery machine before learners arrive:

1. Confirm Node.js and npm meet the versions declared in the supplied project.
2. Confirm Docker Engine and Docker Compose can start the supplied local stack.
3. Confirm authenticated GitHub Copilot SDK access with the same account and
   network path learners will use.
4. Run `npm ci`, the test command, and the type-check command in the reference
   solution.
5. Start the OpenTelemetry Collector and Jaeger from the reference solution.
6. Run one successful readiness assessment and find its trace in Jaeger.
7. Run the denied action and confirm the reason appears in both terminal output
   and trace data.
8. Keep the solution project open at the files used in the demo.

**Stop if any required access or local tool is unavailable.** This session has no
fallback. Do not replace authenticated Copilot access with another model provider.

## Teaching notes

### The application owns the boundary

Open with the synthetic change record. Ask which parts need model reasoning and
which parts should stay deterministic.

The readiness tool returns fixed evidence. The model can explain that evidence,
but it cannot create a new record or change the policy. This separation makes the
lab testable.

Emphasize these decisions:

- register only `lookup_change_request`;
- inspect exact tool arguments before execution;
- deny unrecognized permission requests;
- show policy denial to the user;
- clean up even when the session fails.

### Client and session lifecycle

Draw the sequence on the slide:

```text
construct client → start client → create session → subscribe →
send request → await completion → close session state → stop client
```

The session-end hook records what the agent runtime reports. The outer `finally`
block protects the process-level cleanup path. Both are needed.

### Streaming

Show `assistant.message_delta` and the final `assistant.message` as separate event
types. A CLI that prints both as primary output repeats the response.

The supplied application streams parent-agent text deltas. It uses complete events
for records and tests. It ignores sub-agent output because sub-agents are outside
this session.

### Tool and permission layers

Use the table from the slides. Registration, permission requests, pre-tool policy,
and handler validation are separate controls.

The lookup tool accepts one synthetic request ID. Normal `CR-####` values reach
the handler. IDs beginning with `RESTRICTED-` prove the denial path. The pre-tool
hook blocks them before the handler runs.

### Failure and error hooks

Explain the distinction with two prepared runs:

- malformed input returns a fixed validation result;
- a failed tool execution enters `onPostToolUseFailure`;
- a runtime or model error enters `onErrorOccurred`.

Do not call a policy denial an error. The application did exactly what it was
designed to do.

### Tests and traces

The tests assert control decisions and deterministic results. They do not assert
the model's prose.

Jaeger adds timing and sequence evidence. It helps answer whether the restricted
call reached the handler and where a failed run stopped. Remind learners that trace
payloads can expose prompts and tool arguments. The lab uses synthetic data for
that reason.

## Demo 1: Trace a denied change request

**Level:** L300  
**Time:** 10 minutes

### WOW moment

The terminal shows a denied lookup for `RESTRICTED-0001`. Seconds later, the
trainer opens Jaeger and points to the same blocked tool call inside the connected
trace. The policy is visible from both the user and operator view.

### Demo prerequisites

- Authenticated GitHub Copilot SDK access is confirmed.
- Node.js, npm, Docker, and Docker Compose are working.
- The reference solution dependencies are installed.
- The solution tests pass.
- Ports used by the supplied Collector and Jaeger configuration are free.
- The deterministic change IDs in the solution have not been edited.

### Demo steps

1. **Show the starting state.**

   Open `lab/solution/sdk-readiness-assistant/`. Point to
   `fixtures/change-requests.json`, `src/live-demo.ts`,
   `src/permission-policy.ts`, `src/hook-decisions.ts`, the tests, and the
   telemetry configuration.

   > **Say this:** "The model does not own this data or policy. It can reason over
   > one fixed record. TypeScript decides which capability exists and whether the
   > exact call may run."

2. **Prove the baseline.**

   Run:

   ```bash
   npm test
   npm run check
   ```

   > **Say this:** "I want the control path green before I involve a live model.
   > These tests check known data, denial, failure handling, streaming, and
   > cleanup. They do not compare natural-language answers."

3. **Start the trace stack.**

   Run:

   ```bash
   docker compose -f compose.yaml up -d
   docker compose -f compose.yaml ps
   ```

   > **Say this:** "The SDK exports OTLP data to the Collector on port 4318. The
   > Collector forwards traces to Jaeger. The CLI stays unaware of the Jaeger
   > backend."

4. **Run a permitted assessment.**

   Run `npm run demo`. The first request assesses `CR-1042`. Let the response
   stream to the terminal.

   > **Say this:** "You see text as it arrives. The final event is still recorded,
   > but the renderer does not print it a second time."

5. **Watch the restricted lookup.**

   The third prepared prompt requests `RESTRICTED-0001`.

   > **Say this:** "The tool is known to the application, so the request reaches
   > policy. The pre-tool hook checks the request ID and denies this lookup before
   > the handler can run."

6. **Point to the visible denial.**

   Read the denial reason from the terminal. Show the audit entry produced by the
   application.

   > **Say this:** "A denied action is an expected result. The user gets a reason,
   > and the audit path records the decision. Nothing is silently dropped."

7. **Open Jaeger.**

   Open the local Jaeger UI, select the service name declared by the project, and
   find the latest trace.

   > **Say this:** "This is the same run from the operator view. The trace shows
   > the session work and the blocked tool call. There is no handler span after
   > the denial."

8. **Show invalid input and the failed-tool policy.**

   Point to the `bad-id` run. Then show the failed-tool hook test and session-end
   hook test.

   > **Say this:** "Invalid input is different from denied policy. The tool returns
   > a fixed validation result. A failed tool execution uses its own hook, and the
   > session-end hook records why the session closed."

9. **Close the demo.**

   Stop the application. Leave the trace stack running for the lab if the training
   machine is shared and the instructor setup permits it.

   > **Say this:** "The reliable part is not the wording of the answer. It is the
   > chain of bounded capability, explicit decision, visible outcome, test
   > evidence, and trace evidence."

### Demo troubleshooting

| Problem | Response |
| --- | --- |
| SDK authentication fails | Stop the demo. Confirm the approved GitHub Copilot sign-in and network path. Do not use BYOK or another provider. |
| No streamed text appears | Confirm the session enables streaming and the handler listens for parent `assistant.message_delta` events. |
| Restricted data reaches the handler | Stop. Check the exact tool name and parsed `requestId` in `onPreToolUse`, then rerun the denial test. |
| Collector is unreachable | Check Docker Compose health and the OTLP HTTP endpoint configured as `http://localhost:4318`. |
| Jaeger shows no trace | Confirm the Collector exports to Jaeger, select the configured service name, and widen the time range. |
| Output appears twice | Check whether both message deltas and the final assistant message are printed as primary output. |

### Transition to the lab

Say:

> "You will now build the same reliability rail in the starter project. Finish one
> layer at a time, run the focused checks at each checkpoint, and do not continue
> if access or Docker preflight fails."

Point learners to [`lab/README.md`](../lab/README.md).

## Lab coaching map

| Lab checkpoint | Coach question |
| --- | --- |
| Preflight | Did every required tool and authenticated SDK call pass? |
| Lifecycle and streaming | Where does cleanup run if `sendAndWait` throws? |
| Tool and denial | Can the learner prove the handler did not run? |
| Failure hooks | Is unknown data reported without invention or broad retry? |
| Tests | Are assertions stable without matching model prose? |
| Traces | Can the learner connect terminal output to one Jaeger trace? |

## Official references

Verified on **October 5, 2026**:

- [GitHub Copilot SDK documentation](https://docs.github.com/en/copilot/how-tos/copilot-sdk)
- [Authentication](https://docs.github.com/en/copilot/how-tos/copilot-sdk/auth/authenticate)
- [Streaming session events](https://docs.github.com/en/copilot/how-tos/copilot-sdk/features/streaming-events)
- [Working with hooks](https://docs.github.com/en/copilot/how-tos/copilot-sdk/features/hooks)
- [Pre-tool use hook](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/pre-tool-use)
- [Error handling hook](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/error-handling)
- [Session lifecycle hooks](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/session-lifecycle)
- [OpenTelemetry instrumentation](https://docs.github.com/en/copilot/how-tos/copilot-sdk/observability/opentelemetry)
- [TypeScript SDK reference and examples](https://github.com/github/copilot-sdk/blob/main/nodejs/README.md)
