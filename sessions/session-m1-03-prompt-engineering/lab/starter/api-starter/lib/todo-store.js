const ALLOWED_STATUSES = ["pending", "in-progress", "completed"];
const ALLOWED_PRIORITIES = ["low", "normal", "high"];

class TodoStore {
  constructor(seed = []) {
    this.todos = seed.map((todo) => ({ ...todo }));
    this.nextId = Math.max(0, ...this.todos.map((todo) => todo.id)) + 1;
  }

  list(filters = {}) {
    // Prompt for status filtering first. Add priority filtering after the change request.
  }

  get(id) {
    // Return a copy of the matching todo or null.
  }

  create(input) {
    // Validate the input, apply defaults, store a new todo, and return a copy.
  }

  update(id, input) {
    // Update supplied fields only. Return null when the todo does not exist.
  }

  remove(id) {
    // Remove the todo and return true. Return false when the ID does not exist.
  }
}

module.exports = { ALLOWED_PRIORITIES, ALLOWED_STATUSES, TodoStore };
