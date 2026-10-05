import { fileURLToPath } from "node:url";
import {
  CopilotClient,
  type CopilotSession,
  defineTool,
  type SessionEvent,
} from "@github/copilot-sdk";
import { loadChangeRequests, lookupChangeRequest } from "./change-store.js";
import {
  createAuditRecord,
  decideErrorHandling,
  decidePreToolUse,
  decidePrompt,
  finishSession,
  recordToolFailure,
  type AuditRecord,
} from "./hook-decisions.js";
import { decidePermission } from "./permission-policy.js";

const fixturePath = fileURLToPath(
  new URL("../fixtures/change-requests.json", import.meta.url),
);
const changes = await loadChangeRequests(fixturePath);
const audits = new Map<string, AuditRecord>();

function printEvent(event: SessionEvent): void {
  switch (event.type) {
    case "assistant.message_delta":
      if (!event.agentId) {
        process.stdout.write(event.data.deltaContent);
      }
      break;
    case "tool.execution_start":
      console.log(`\n[tool:start] ${event.data.toolName}`);
      break;
    case "tool.execution_complete":
      console.log(
        `[tool:complete] call=${event.data.toolCallId} success=${event.data.success}`,
      );
      break;
    case "permission.requested":
      console.log(
        `[permission] ${event.data.permissionRequest.kind} requested`,
      );
      break;
  }
}

const lookupTool = defineTool("lookup_change_request", {
  description:
    "Read one synthetic change request and calculate its readiness gaps.",
  defer: "never",
  parameters: {
    type: "object",
    properties: {
      requestId: {
        type: "string",
        description: "Synthetic change request ID",
      },
    },
    required: ["requestId"],
    additionalProperties: false,
  },
  handler: async (args: unknown) => lookupChangeRequest(changes, args),
});

const client = new CopilotClient({
  telemetry: {
    otlpEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "http://localhost:4318",
    otlpProtocol: "http/protobuf",
    sourceName: "sdk-readiness-assistant",
    captureContent: false,
  },
});

let session: CopilotSession | undefined;

try {
  await client.start();
  const auth = await client.getAuthStatus();
  if (!auth.isAuthenticated) {
    throw new Error(
      `GitHub Copilot authentication is required. ${auth.statusMessage ?? ""}`.trim(),
    );
  }

  console.log(`[auth] signed in as ${auth.login ?? auth.authType ?? "GitHub user"}`);

  session = await client.createSession({
    clientName: "sdk-readiness-assistant",
    workingDirectory: process.cwd(),
    streaming: true,
    tools: [lookupTool],
    onPermissionRequest: (request) => {
      const decision = decidePermission(request);
      console.log(`[permission:decision] ${request.kind} -> ${decision.kind}`);
      return decision;
    },
    hooks: {
      onSessionStart: async (input, invocation) => {
        audits.set(invocation.sessionId, createAuditRecord());
        console.log(`[hook:session-start] source=${input.source}`);
        return {
          additionalContext:
            "Use lookup_change_request for every requested ID. Report only facts returned by the tool.",
        };
      },
      onUserPromptSubmitted: async (input) => {
        const decision = decidePrompt(input.prompt);
        console.log(
          `[hook:prompt] ${decision ? "rewritten-invalid-input" : "accepted"}`,
        );
        return decision;
      },
      onPreToolUse: async (input) => {
        const decision = decidePreToolUse(input);
        console.log(
          `[hook:pre-tool] ${input.toolName} -> ${decision.permissionDecision}`,
        );
        return decision;
      },
      onPostToolUse: async (input) => {
        console.log(`[hook:post-tool] ${input.toolName} completed`);
      },
      onPostToolUseFailure: async (input, invocation) => {
        const audit =
          audits.get(invocation.sessionId) ?? createAuditRecord();
        audits.set(invocation.sessionId, audit);
        console.error(`[hook:tool-failure] ${input.toolName}: ${input.error}`);
        return recordToolFailure(audit, input);
      },
      onErrorOccurred: async (input, invocation) => {
        const audit =
          audits.get(invocation.sessionId) ?? createAuditRecord();
        audits.set(invocation.sessionId, audit);
        console.error(`[hook:error] ${input.errorContext}: ${input.error}`);
        return decideErrorHandling(audit, input);
      },
      onSessionEnd: async (input, invocation) => {
        console.log(`\n[hook:session-end] reason=${input.reason}`);
        return finishSession(audits, invocation.sessionId, input);
      },
    },
  });

  session.on(printEvent);

  const prompts = [
    [
      "ACCEPTED REQUEST",
      "Call lookup_change_request with requestId CR-1042. Summarize readiness in two sentences.",
    ],
    [
      "INVALID INPUT",
      "Call lookup_change_request with requestId bad-id. Explain the tool validation result.",
    ],
    [
      "DENIED TOOL REQUEST",
      "Call lookup_change_request with requestId RESTRICTED-0001. Explain the denial.",
    ],
  ] as const;

  for (const [label, prompt] of prompts) {
    console.log(`\n\n=== ${label} ===`);
    await session.sendAndWait({ prompt }, 120_000);
    console.log();
  }

} catch (error) {
  console.error(
    `[demo:error] ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
} finally {
  await session?.disconnect();
  const stopErrors = await client.stop();
  for (const error of stopErrors) {
    console.error(`[shutdown:error] ${error.message}`);
  }
  if (stopErrors.length > 0) process.exitCode = 1;
}
