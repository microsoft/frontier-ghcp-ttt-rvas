import assert from "node:assert/strict";
import test from "node:test";
import {
  addEvidence,
  updateStatus,
} from "../src/canvas-contract.mjs";

const initialItems = [
  {
    id: "DOC-101",
    item: "Draft operator guide",
    status: "planned",
    reviewFlag: true,
    evidence: "",
  },
  {
    id: "API-204",
    item: "Add retry metric",
    status: "in-progress",
    reviewFlag: false,
    evidence: "tests://retry-metric",
  },
  {
    id: "WEB-318",
    item: "Check empty state",
    status: "review",
    reviewFlag: true,
    evidence: "preview://empty-state",
  },
];

test("the complete journey reaches the reviewed final state", () => {
  const items = structuredClone(initialItems);
  updateStatus(items, "WEB-318", "ready");
  updateStatus(items, "API-204", "review");
  assert.throws(
    () => updateStatus(items, "DOC-101", "ready"),
    /evidence is required before ready/,
  );
  addEvidence(items, "DOC-101", "docs://operator-guide-review");
  updateStatus(items, "DOC-101", "ready");

  assert.deepEqual(
    items.map(({ id, status }) => ({ id, status })),
    [
      { id: "DOC-101", status: "ready" },
      { id: "API-204", status: "review" },
      { id: "WEB-318", status: "ready" },
    ],
  );
});
