import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { PermissionRequest } from "@github/copilot-sdk";
import { decidePermission } from "../src/permission-policy.js";

describe("decidePermission", () => {
  it("approves only the readiness lookup tool", () => {
    const request = {
      kind: "custom-tool",
      toolName: "lookup_change_request",
    } as PermissionRequest;

    assert.deepEqual(decidePermission(request), { kind: "approve-once" });
  });

  it("rejects shell access", () => {
    const request = {
      kind: "shell",
      fullCommandText: "cat /etc/passwd",
    } as PermissionRequest;

    assert.equal(decidePermission(request).kind, "reject");
  });

  it("does not bypass managed approval", () => {
    const request = {
      kind: "custom-tool",
      toolName: "lookup_change_request",
      managedApprovalRequired: true,
    } as PermissionRequest;

    assert.equal(decidePermission(request).kind, "reject");
  });
});
