const assert = require("node:assert/strict");
const sets = require("../overrides/sets.js");

const sessions = [
  { id: "01", module: "1", title: "Introduction", description: "Getting started", difficulty: "Beginner", duration_minutes: 180 },
  { id: "02", module: "1", title: "Chat", description: "Inline assistance", difficulty: "Beginner", duration_minutes: 180 },
  { id: "10", module: "3", title: "MCP servers", description: "Custom tools", difficulty: "Advanced", duration_minutes: 90 }
];
const state = { ids: ["10", "01"], name: "Team A & B / \u00e9", intro: "First line\n<script>alert(1)</script> # ? +" };
const encoded = sets.encodeSet(state);
assert.deepEqual(sets.parseSet(`?${encoded}`, sessions), state);
assert.deepEqual(sets.parseSet("", sessions), { ids: [], name: "", intro: "" });
assert.deepEqual(sets.parseSet("?v=1&ids=", sessions).ids, []);
for (const hash of [
  "?v=2&ids=01", "?v=1", "?v=1&ids=99", "?v=1&ids=01,01",
  "?v=1&ids=01&ids=02", "?v=1&ids=01&extra=x",
  "?v=1&ids=01&name=" + "x".repeat(81),
  "?v=1&ids=01&intro=" + "x".repeat(401),
  "?" + "x".repeat(8001)
]) {
  assert.throws(() => sets.parseSet(hash, sessions), sets.SetLinkError, hash.slice(0, 60));
}
for (const prefix of ["/", "/emu-ghcp-ttt/"]) {
  const url = sets.setUrl("../session-set/", state, `https://example.test${prefix}build-set/`);
  assert.equal(new URL(url).pathname, `${prefix}session-set/`);
  assert.deepEqual(sets.parseSet(new URL(url).search, sessions), state);
  const fileUrl = sets.setUrl("session-set.html", state, `https://example.test${prefix}build-set.html`);
  assert.equal(new URL(fileUrl).pathname, `${prefix}session-set.html`);
}
assert.deepEqual(sets.matchingSessions(sessions, { query: " INLINE " }).map(s => s.id), ["02"]);
assert.deepEqual(sets.matchingSessions(sessions, { module: "1", level: "Advanced" }), []);
assert.deepEqual(sets.matchingSessions(sessions, { level: "Beginner" }).map(s => s.id), ["01", "02"]);
assert.deepEqual(sets.matchingSessions(sessions, { query: "10" }).map(s => s.id), ["10"]);
const ids = ["01", "02", "10"];
assert.deepEqual(sets.moveSession(ids, "10", -1), ["01", "10", "02"]);
assert.deepEqual(sets.moveSession(ids, "01", -1), ids);
assert.deepEqual(sets.moveSession(ids, "10", 1), ids);
assert.deepEqual(ids, ["01", "02", "10"]);
assert.equal(sets.durationLabel(60), "1 hour");
assert.equal(sets.durationLabel(90), "1 hour 30 min");
assert.equal(sets.summary(state, new Map(sessions.map(s => [s.id, s]))), "2 sessions / Catalog duration: 4 hours 30 min");
