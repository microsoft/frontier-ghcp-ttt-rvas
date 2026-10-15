import { readFile } from "node:fs/promises";
import type { ChangeRequest, LookupResult } from "./types.js";

const CHANGE_ID_PATTERN = /^CR-\d{4}$/;

export async function loadChangeRequests(path: string): Promise<ChangeRequest[]> {
  const content = await readFile(path, "utf8");
  return JSON.parse(content) as ChangeRequest[];
}

export function lookupChangeRequest(
  changes: readonly ChangeRequest[],
  input: unknown,
): LookupResult {
  const requestId =
    typeof input === "object" &&
    input !== null &&
    "requestId" in input &&
    typeof input.requestId === "string"
      ? input.requestId
      : "";

  // TODO: Reject malformed IDs before searching the fixture.
  void CHANGE_ID_PATTERN;
  const change = changes.find((item) => item.id === requestId);
  if (!change) {
    return {
      ok: false,
      code: "not-found",
      message: `No synthetic change request was found for ${requestId}.`,
    };
  }

  const gaps: string[] = [];
  if (change.approvals.length === 0) gaps.push("approval");
  if (!change.checks.testsPassing) gaps.push("tests");
  if (!change.checks.monitoringReady) gaps.push("monitoring");
  if (!change.checks.rollbackRehearsed) gaps.push("rollback rehearsal");

  return {
    ok: true,
    change,
    readiness: gaps.length === 0 ? "ready" : "needs-review",
    gaps,
  };
}
