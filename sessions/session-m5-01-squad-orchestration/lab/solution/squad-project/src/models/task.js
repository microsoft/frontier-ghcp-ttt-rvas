const { randomUUID } = require('crypto');

const STATUSES = ['todo', 'doing', 'done'];

class Task {
  constructor() {
    this.tasks = [];
  }

  getAll(status) {
    return status ? this.tasks.filter(t => t.status === status) : this.tasks;
  }

  findById(id) {
    return this.tasks.find(t => t.id === id);
  }

  create({ title, status = 'todo' }) {
    const task = { id: randomUUID(), title, status, createdAt: new Date().toISOString() };
    this.tasks.push(task);
    return task;
  }

  update(id, changes) {
    const task = this.findById(id);
    if (!task) return undefined;
    Object.assign(task, changes);
    return task;
  }

  delete(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }
}

module.exports = Task;
module.exports.STATUSES = STATUSES;
