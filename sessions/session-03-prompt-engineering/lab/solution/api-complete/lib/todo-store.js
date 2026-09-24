const ALLOWED_STATUSES = ["pending", "in-progress", "completed"];
const ALLOWED_PRIORITIES = ["low", "normal", "high"];

function validateChoice(value, allowed, label) {
  if (!allowed.includes(value)) {
    throw new ValueError(`${label} must be one of: ${allowed.join(", ")}`);
  }
}

class ValueError extends Error {}

class TodoStore {
  constructor(seed = []) {
    this.todos = seed.map((todo) => ({ ...todo }));
    this.nextId = Math.max(0, ...this.todos.map((todo) => todo.id)) + 1;
  }

  list(filters = {}) {
    const { status, priority } = filters;
    if (status !== undefined) {
      validateChoice(status, ALLOWED_STATUSES, "Status");
    }
    if (priority !== undefined) {
      validateChoice(priority, ALLOWED_PRIORITIES, "Priority");
    }
    return this.todos
      .filter((todo) => status === undefined || todo.status === status)
      .filter((todo) => priority === undefined || todo.priority === priority)
      .map((todo) => ({ ...todo }));
  }

  get(id) {
    const todo = this.todos.find((candidate) => candidate.id === id);
    return todo ? { ...todo } : null;
  }

  create(input) {
    const title = typeof input.title === "string" ? input.title.trim() : "";
    if (!title) {
      throw new ValueError("Title is required");
    }
    const status = input.status ?? "pending";
    const priority = input.priority ?? "normal";
    validateChoice(status, ALLOWED_STATUSES, "Status");
    validateChoice(priority, ALLOWED_PRIORITIES, "Priority");
    const todo = { id: this.nextId++, title, status, priority };
    this.todos.push(todo);
    return { ...todo };
  }

  update(id, input) {
    const todo = this.todos.find((candidate) => candidate.id === id);
    if (!todo) {
      return null;
    }
    if (input.title !== undefined) {
      const title = typeof input.title === "string" ? input.title.trim() : "";
      if (!title) {
        throw new ValueError("Title is required");
      }
      todo.title = title;
    }
    if (input.status !== undefined) {
      validateChoice(input.status, ALLOWED_STATUSES, "Status");
      todo.status = input.status;
    }
    if (input.priority !== undefined) {
      validateChoice(input.priority, ALLOWED_PRIORITIES, "Priority");
      todo.priority = input.priority;
    }
    return { ...todo };
  }

  remove(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return false;
    }
    this.todos.splice(index, 1);
    return true;
  }
}

module.exports = { ALLOWED_PRIORITIES, ALLOWED_STATUSES, TodoStore, ValueError };
