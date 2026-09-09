/**
 * User Service — manages user accounts.
 * This module has NO tests — that's the lab exercise.
 */

// In-memory user store
const users = new Map();
let nextId = 1;

/**
 * Create a new user.
 * @param {string} name - User's full name
 * @param {string} email - User's email address
 * @param {string} role - User role: 'admin', 'editor', or 'viewer'
 * @returns {object} The created user
 * @throws {Error} If name or email is missing, or email is invalid
 */
function createUser(name, email, role = 'viewer') {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Name is required and must be a non-empty string');
  }
  if (!email || !validateEmail(email)) {
    throw new Error('A valid email address is required');
  }
  const validRoles = ['admin', 'editor', 'viewer'];
  if (!validRoles.includes(role)) {
    throw new Error(`Role must be one of: ${validRoles.join(', ')}`);
  }

  // Check for duplicate email
  for (const user of users.values()) {
    if (user.email.toLowerCase() === email.toLowerCase()) {
      throw new Error(`Email already in use: ${email}`);
    }
  }

  const user = {
    id: nextId++,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    role,
    createdAt: new Date().toISOString(),
    active: true
  };
  users.set(user.id, user);
  return { ...user };
}

/**
 * Find a user by ID.
 * @param {number} id - User ID
 * @returns {object|null} The user, or null if not found
 */
function findUserById(id) {
  const user = users.get(id);
  return user ? { ...user } : null;
}

/**
 * Find users by role.
 * @param {string} role - Role to filter by
 * @returns {object[]} Array of matching users
 */
function findUsersByRole(role) {
  const result = [];
  for (const user of users.values()) {
    if (user.role === role && user.active) {
      result.push({ ...user });
    }
  }
  return result;
}

/**
 * Update a user's name or role.
 * @param {number} id - User ID
 * @param {object} updates - Fields to update (name, role)
 * @returns {object} The updated user
 * @throws {Error} If user not found or updates are invalid
 */
function updateUser(id, updates) {
  const user = users.get(id);
  if (!user) {
    throw new Error(`User not found: ${id}`);
  }
  if (updates.name !== undefined) {
    if (typeof updates.name !== 'string' || updates.name.trim().length === 0) {
      throw new Error('Name must be a non-empty string');
    }
    user.name = updates.name.trim();
  }
  if (updates.role !== undefined) {
    const validRoles = ['admin', 'editor', 'viewer'];
    if (!validRoles.includes(updates.role)) {
      throw new Error(`Role must be one of: ${validRoles.join(', ')}`);
    }
    user.role = updates.role;
  }
  return { ...user };
}

/**
 * Soft-delete a user (set active to false).
 * @param {number} id - User ID
 * @returns {boolean} True if deleted, false if not found
 */
function deleteUser(id) {
  const user = users.get(id);
  if (!user) return false;
  user.active = false;
  return true;
}

/**
 * Validate an email address.
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
  if (typeof email !== 'string') return false;
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (local.length === 0 || domain.length === 0) return false;
  if (!domain.includes('.')) return false;
  if (domain.startsWith('.') || domain.endsWith('.')) return false;
  return true;
}

/**
 * Get user count (active users only).
 * @returns {number}
 */
function getUserCount() {
  let count = 0;
  for (const user of users.values()) {
    if (user.active) count++;
  }
  return count;
}

/**
 * Reset all users (for testing).
 */
function resetUsers() {
  users.clear();
  nextId = 1;
}

module.exports = {
  createUser,
  findUserById,
  findUsersByRole,
  updateUser,
  deleteUser,
  validateEmail,
  getUserCount,
  resetUsers
};
