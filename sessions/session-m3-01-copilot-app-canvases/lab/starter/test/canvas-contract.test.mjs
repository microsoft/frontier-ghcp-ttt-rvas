import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  addEvidence,
  listFlagged,
  updateStatus,
} from "../src/canvas-contract.mjs";

async function loadItems() {
  return JSON.parse(
    await readFile(new URL("../prepared-items.json", import.meta.url), "utf8"),
  );
}

test("a visible action can move an evidenced item to ready", async () => {
  const items = await loadItems();
  updateStatus(items, "WEB-318", "ready");
  assert.equal(items.find((item) => item.id === "WEB-318").status, "ready");
});

test("an agent-requested action updates only the named item", async () => {
  const items = await loadItems();
  updateStatus(items, "API-204", "review");
  assert.equal(items.find((item) => item.id === "API-204").status, "review");
  assert.equal(items.find((item) => item.id === "DOC-101").status, "planned");
});

test("ready is rejected when evidence is empty and state is unchanged", async () => {
  const items = await loadItems();
  assert.throws(
    () => updateStatus(items, "DOC-101", "ready"),
    /evidence is required before ready/,
  );
  assert.equal(items.find((item) => item.id === "DOC-101").status, "planned");
});

test("adding evidence supports recovery without weakening validation", async () => {
  const items = await loadItems();
  addEvidence(items, "DOC-101", "docs://operator-guide-review");
  updateStatus(items, "DOC-101", "ready");
  assert.equal(items.find((item) => item.id === "DOC-101").status, "ready");
  assert.deepEqual(
    listFlagged(items).map((item) => item.id),
    ["DOC-101", "WEB-318"],
  );
});
