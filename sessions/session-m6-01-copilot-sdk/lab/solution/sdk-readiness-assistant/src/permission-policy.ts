import type {
  PermissionRequest,
  PermissionRequestResult,
} from "@github/copilot-sdk";

export function decidePermission(
  request: PermissionRequest,
): PermissionRequestResult {
  if (
    request.kind === "custom-tool" &&
    request.toolName === "lookup_change_request" &&
    !request.managedApprovalRequired
  ) {
    return { kind: "approve-once" };
  }

  return {
    kind: "reject",
    feedback: `The readiness demo does not permit ${request.kind} operations.`,
  };
}
