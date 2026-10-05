interface ToolInput {
  toolName: string;
  toolArgs: unknown;
}

export interface PreToolDecision {
  permissionDecision: "allow" | "deny" | "ask";
  permissionDecisionReason?: string;
}

export interface PromptDecision {
  modifiedPrompt?: string;
  additionalContext?: string;
}

export interface AuditRecord {
  failedTools: Array<{ toolName: string; error: string }>;
  errors: Array<{ context: string; error: string; recoverable: boolean }>;
  recoverableRetries: number;
  endReason?: string;
  endedAt?: string;
}

export interface ErrorDecision {
  errorHandling: "retry" | "abort";
  retryCount?: number;
  userNotification?: string;
}

export function createAuditRecord(): AuditRecord {
  return {
    failedTools: [],
    errors: [],
    recoverableRetries: 0,
  };
}

export function decidePreToolUse(input: ToolInput): PreToolDecision {
  if (input.toolName !== "lookup_change_request") {
    return {
      permissionDecision: "deny",
      permissionDecisionReason: `Tool ${input.toolName} is outside the demo allow-list.`,
    };
  }

  const requestId =
    typeof input.toolArgs === "object" &&
    input.toolArgs !== null &&
    "requestId" in input.toolArgs &&
    typeof input.toolArgs.requestId === "string"
      ? input.toolArgs.requestId
      : "";

  if (requestId.startsWith("RESTRICTED-")) {
    // TODO: Deny restricted records before the tool handler runs.
    return { permissionDecision: "allow" };
  }

  return { permissionDecision: "allow" };
}

export function decidePrompt(
  prompt: string,
): PromptDecision | undefined {
  if (prompt.trim().length > 0) return undefined;

  return {
    modifiedPrompt:
      "The submitted request was empty. Ask for a change request by ID.",
    additionalContext: "Do not call a tool until the user supplies an ID.",
  };
}

export function recordToolFailure(
  audit: AuditRecord,
  input: { toolName: string; error: string },
): { additionalContext: string } {
  // TODO: Record the failure and return guidance that prevents invention.
  return { additionalContext: "" };
}

export function decideErrorHandling(
  audit: AuditRecord,
  input: { errorContext: string; error: string; recoverable: boolean },
): ErrorDecision {
  // TODO: Record the error, retry one recoverable error, and abort the rest.
  return { errorHandling: "abort" };
}

export function finishSession(
  audits: Map<string, AuditRecord>,
  sessionId: string,
  input: { reason: string },
  endedAt = new Date().toISOString(),
): { sessionSummary: string } {
  // TODO: Record the end state and remove this session from the map.
  return { sessionSummary: "" };
}
