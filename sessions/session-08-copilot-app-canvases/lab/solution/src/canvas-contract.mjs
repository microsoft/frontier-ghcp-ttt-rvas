export const allowedStatuses = new Set([
  "planned",
  "in-progress",
  "review",
  "ready",
]);

export function updateStatus(items, id, status) {
  const item = items.find((entry) => entry.id === id);
  if (!item) {
    throw new Error(`unknown item: ${id}`);
  }
  if (!allowedStatuses.has(status)) {
    throw new Error(`unknown status: ${status}`);
  }
  if (status === "ready" && item.evidence.trim() === "") {
    throw new Error("evidence is required before ready");
  }

  item.status = status;
  return item;
}

export function addEvidence(items, id, evidence) {
  const item = items.find((entry) => entry.id === id);
  if (!item) {
    throw new Error(`unknown item: ${id}`);
  }
  if (typeof evidence !== "string" || evidence.trim() === "") {
    throw new Error("evidence must be a non-empty string");
  }

  item.evidence = evidence.trim();
  return item;
}
