import type {
  PermissionRequest,
  PermissionRequestResult,
} from "@github/copilot-sdk";

export function decidePermission(
  request: PermissionRequest,
): PermissionRequestResult {
  if (
    request.kind === "custom-tool"
  ) {
    // TODO: Limit approval to the lookup tool and honor managed approval.
    return { kind: "approve-once" };
  }

  return {
    kind: "reject",
    feedback: `The readiness demo does not permit ${request.kind} operations.`,
  };
}
