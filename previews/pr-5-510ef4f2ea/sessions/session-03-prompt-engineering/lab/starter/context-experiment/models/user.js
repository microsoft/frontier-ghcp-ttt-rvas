/**
 * User Model
 * ==========
 * This model defines the data structure for users.
 * Keep this file OPEN in a neighboring tab when working on routes/users.js
 * to see how Copilot uses it as context.
 */

class User {
  constructor(name, email, age) {
    this.id = null; // Set when saved
    this.name = name;
    this.email = email;
    this.age = age;
    this.createdAt = new Date().toISOString();
    this.role = "member"; // Default role
  }

  validate() {
    const errors = [];
    if (!this.name || this.name.trim().length < 2) {
      errors.push("Name must be at least 2 characters");
    }
    if (!this.email || !this.email.includes("@")) {
      errors.push("Valid email is required");
    }
    if (!Number.isInteger(this.age) || this.age < 13 || this.age > 150) {
      errors.push("Age must be an integer between 13 and 150");
    }
    return errors;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      role: this.role,
      createdAt: this.createdAt,
    };
  }
}

// In-memory user store
const users = [
  Object.assign(new User("Alice Smith", "alice@example.com", 28), { id: 1, role: "admin" }),
  Object.assign(new User("Bob Jones", "bob@example.com", 35), { id: 2 }),
  Object.assign(new User("Carol White", "carol@example.com", 22), { id: 3 }),
];

let nextUserId = 4;

module.exports = { User, users, getNextId: () => nextUserId++ };
