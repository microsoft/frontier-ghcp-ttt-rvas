// FIX: Data access layer — all DB operations in one place per entity
const db = require('../db');

function getAllUsers(filters = {}) {
  let users = [...db.users];
  if (filters.role) {
    users = users.filter(u => u.role === filters.role);
  }
  if (filters.name) {
    users = users.filter(u => u.name.toLowerCase().includes(filters.name.toLowerCase()));
  }
  return users;
}

function getUserById(id) {
  return db.users.find(u => u.id === id) || null;
}

function createUser(data) {
  const user = {
    id: db.nextUserId++,
    name: data.name,
    email: data.email,
    role: data.role || 'user'
  };
  db.users.push(user);
  return user;
}

function updateUser(id, data) {
  const index = db.users.findIndex(u => u.id === id);
  if (index === -1) return null;
  db.users[index] = { ...db.users[index], ...data, id };
  return db.users[index];
}

function deleteUser(id) {
  const index = db.users.findIndex(u => u.id === id);
  if (index === -1) return null;
  const deleted = db.users[index];
  db.users.splice(index, 1);
  return deleted;
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
