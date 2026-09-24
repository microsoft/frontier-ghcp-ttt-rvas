const express = require("express");
const { TodoStore } = require("../lib/todo-store");

const router = express.Router();
const store = new TodoStore([
  { id: 1, title: "Review a prompt", status: "pending", priority: "normal" },
]);

router.get("/", (request, response) => {
  try {
    response.json(store.list(request.query));
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

router.get("/:id", (request, response) => {
  const todo = store.get(Number(request.params.id));
  if (!todo) {
    return response.status(404).json({ error: "Todo not found" });
  }
  return response.json(todo);
});

router.post("/", (request, response) => {
  try {
    return response.status(201).json(store.create(request.body));
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

router.put("/:id", (request, response) => {
  try {
    const todo = store.update(Number(request.params.id), request.body);
    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }
    return response.json(todo);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

router.delete("/:id", (request, response) => {
  if (!store.remove(Number(request.params.id))) {
    return response.status(404).json({ error: "Todo not found" });
  }
  return response.status(204).send();
});

module.exports = router;
