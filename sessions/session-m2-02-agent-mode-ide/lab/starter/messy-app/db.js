// Simulates a simple in-memory database
// This file is fine — no refactoring needed here

const db = {
  users: [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'user' }
  ],
  products: [
    { id: 1, name: 'Widget', price: 9.99, stock: 100, category: 'tools' },
    { id: 2, name: 'Gadget', price: 24.99, stock: 50, category: 'electronics' },
    { id: 3, name: 'Doohickey', price: 4.99, stock: 200, category: 'tools' }
  ],
  nextUserId: 4,
  nextProductId: 4
};

module.exports = db;
