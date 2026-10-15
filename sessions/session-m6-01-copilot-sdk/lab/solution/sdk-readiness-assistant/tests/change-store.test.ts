import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { lookupChangeRequest } from "../src/change-store.js";
import type { ChangeRequest } from "../src/types.js";

const changes: ChangeRequest[] = [
  {
    id: "CR-1042",
    service: "catalog-api",
    owner: "platform-team",
    plannedWindow: "2026-10-08T20:00:00Z",
    risk: "medium",
    rollbackPlan: "Restore the prior container image.",
    approvals: ["service-owner"],
    checks: {
      testsPassing: true,
      monitoringReady: true,
      rollbackRehearsed: false,
    },
  },
];

describe("lookupChangeRequest", () => {
  it("returns a deterministic readiness assessment", () => {
    const result = lookupChangeRequest(changes, { requestId: "CR-1042" });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.readiness, "needs-review");
      assert.deepEqual(result.gaps, ["rollback rehearsal"]);
    }
  });

  it("rejects malformed input before reading records", () => {
    assert.deepEqual(lookupChangeRequest(changes, { requestId: "bad-id" }), {
      ok: false,
      code: "invalid-input",
      message: "requestId must match CR- followed by four digits.",
    });
  });
});
