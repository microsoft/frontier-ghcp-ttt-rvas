import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createAuditRecord,
  decideErrorHandling,
  decidePreToolUse,
  decidePrompt,
  finishSession,
  recordToolFailure,
} from "../src/hook-decisions.js";

describe("hook decisions", () => {
  it("allows a normal synthetic lookup", () => {
    assert.deepEqual(
      decidePreToolUse({
        toolName: "lookup_change_request",
        toolArgs: { requestId: "CR-1042" },
      }),
      { permissionDecision: "allow" },
    );
  });

  it("denies restricted records", () => {
    assert.equal(
      decidePreToolUse({
        toolName: "lookup_change_request",
        toolArgs: { requestId: "RESTRICTED-0001" },
      }).permissionDecision,
      "deny",
    );
  });

  it("rewrites an empty prompt into visible guidance", () => {
    assert.equal(
      decidePrompt("   ")?.modifiedPrompt,
      "The submitted request was empty. Ask for a change request by ID.",
    );
  });

  it("records failed tools and returns anti-invention guidance", () => {
    const audit = createAuditRecord();
    const result = recordToolFailure(audit, {
      toolName: "lookup_change_request",
      error: "Change request was not found.",
    });

    assert.equal(audit.failedTools.length, 1);
    assert.match(result.additionalContext, /Do not invent/);
  });

  it("retries one recoverable error and then aborts", () => {
    const audit = createAuditRecord();
    const input = {
      errorContext: "model_call",
      error: "Temporary model error",
      recoverable: true,
    };

    assert.deepEqual(decideErrorHandling(audit, input), {
      errorHandling: "retry",
      retryCount: 1,
    });
    assert.equal(decideErrorHandling(audit, input).errorHandling, "abort");
  });

  it("aborts unrecoverable errors with a visible notification", () => {
    const result = decideErrorHandling(createAuditRecord(), {
      errorContext: "system",
      error: "Runtime stopped",
      recoverable: false,
    });

    assert.equal(result.errorHandling, "abort");
    assert.match(result.userNotification ?? "", /could not continue/);
  });

  it("records the session end and clears per-session state", () => {
    const audits = new Map([["session-1", createAuditRecord()]]);
    const result = finishSession(
      audits,
      "session-1",
      { reason: "complete" },
      "2026-10-05T12:00:00.000Z",
    );

    assert.equal(audits.size, 0);
    assert.equal(result.sessionSummary, "Readiness session ended: complete");
  });
});
