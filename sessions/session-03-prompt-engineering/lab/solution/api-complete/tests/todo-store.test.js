const test = require("node:test");
const assert = require("node:assert/strict");

const { TodoStore } = require("../lib/todo-store");

test("baseline: create trims the title and applies defaults", () => {
  const store = new TodoStore();
  const todo = store.create({ title: "  Write clear prompts  " });
  assert.deepEqual(todo, {
    id: 1,
    title: "Write clear prompts",
    status: "pending",
    priority: "normal",
  });
});

test("baseline: list filters by status without exposing internal state", () => {
  const store = new TodoStore([
    { id: 1, title: "One", status: "pending", priority: "normal" },
    { id: 2, title: "Two", status: "completed", priority: "high" },
  ]);
  const result = store.list({ status: "completed" });
  assert.deepEqual(result, [
    { id: 2, title: "Two", status: "completed", priority: "high" },
  ]);
  result[0].title = "Changed outside the store";
  assert.equal(store.get(2).title, "Two");
});

test("baseline: update changes supplied fields only", () => {
  const store = new TodoStore([
    { id: 1, title: "One", status: "pending", priority: "normal" },
  ]);
  assert.deepEqual(store.update(1, { status: "completed" }), {
    id: 1,
    title: "One",
    status: "completed",
    priority: "normal",
  });
});

test("baseline: remove reports whether the ID existed", () => {
  const store = new TodoStore([
    { id: 1, title: "One", status: "pending", priority: "normal" },
  ]);
  assert.equal(store.remove(1), true);
  assert.equal(store.remove(1), false);
});

test("change: list filters by priority", () => {
  const store = new TodoStore([
    { id: 1, title: "One", status: "pending", priority: "low" },
    { id: 2, title: "Two", status: "pending", priority: "high" },
  ]);
  assert.deepEqual(store.list({ priority: "high" }), [
    { id: 2, title: "Two", status: "pending", priority: "high" },
  ]);
});

test("change: invalid priority is rejected", () => {
  const store = new TodoStore();
  assert.throws(
    () => store.create({ title: "One", priority: "urgent" }),
    /Priority must be one of: low, normal, high/,
  );
});
