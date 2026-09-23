const { randomUUID } = require('crypto');

class User {
  constructor() {
    this.users = [
      { id: '1', name: 'Alice Johnson', email: 'alice@example.com', createdAt: '2026-01-15T10:00:00Z' },
      { id: '2', name: 'Bob Smith', email: 'bob@example.com', createdAt: '2026-02-20T14:30:00Z' },
      { id: '3', name: 'Carol Davis', email: 'carol@example.com', createdAt: '2026-03-10T09:15:00Z' },
    ];
  }

  getAll() {
    return this.users;
  }

  findById(id) {
    return this.users.find(u => u.id === id);
  }

  findByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  create({ name, email }) {
    const user = {
      id: randomUUID(),
      name,
      email,
      createdAt: new Date().toISOString(),
    };
    this.users.push(user);
    return user;
  }

  delete(id) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

module.exports = User;
