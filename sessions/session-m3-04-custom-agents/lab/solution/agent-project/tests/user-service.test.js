const {
  createUser,
  findUserById,
  findUsersByRole,
  updateUser,
  deleteUser,
  validateEmail,
  getUserCount,
  resetUsers
} = require('../src/user-service');

beforeEach(() => {
  resetUsers();
});

describe('createUser', () => {
  it('should create a user with valid inputs', () => {
    const user = createUser('Alice', 'alice@example.com', 'editor');
    expect(user.id).toBe(1);
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@example.com');
    expect(user.role).toBe('editor');
    expect(user.active).toBe(true);
    expect(user.createdAt).toBeDefined();
  });

  it('should default role to viewer', () => {
    const user = createUser('Bob', 'bob@example.com');
    expect(user.role).toBe('viewer');
  });

  it('should trim whitespace from name', () => {
    const user = createUser('  Carol  ', 'carol@example.com');
    expect(user.name).toBe('Carol');
  });

  it('should lowercase email', () => {
    const user = createUser('Dave', 'Dave@Example.COM');
    expect(user.email).toBe('dave@example.com');
  });

  it('should assign incrementing IDs', () => {
    const u1 = createUser('A', 'a@example.com');
    const u2 = createUser('B', 'b@example.com');
    expect(u1.id).toBe(1);
    expect(u2.id).toBe(2);
  });

  it('should throw for empty name', () => {
    expect(() => createUser('', 'e@example.com')).toThrow('Name is required');
  });

  it('should throw for whitespace-only name', () => {
    expect(() => createUser('   ', 'e@example.com')).toThrow('Name is required');
  });

  it('should throw for null name', () => {
    expect(() => createUser(null, 'e@example.com')).toThrow('Name is required');
  });

  it('should throw for invalid email', () => {
    expect(() => createUser('Test', 'not-an-email')).toThrow('valid email');
  });

  it('should throw for duplicate email (case-insensitive)', () => {
    createUser('First', 'dupe@example.com');
    expect(() => createUser('Second', 'DUPE@Example.com')).toThrow('Email already in use');
  });

  it('should throw for invalid role', () => {
    expect(() => createUser('Test', 'r@example.com', 'superadmin')).toThrow('Role must be');
  });

  it('should return a copy (not a reference)', () => {
    const user = createUser('Test', 't@example.com');
    user.name = 'Mutated';
    const found = findUserById(user.id);
    expect(found.name).toBe('Test');
  });
});

describe('findUserById', () => {
  it('should find an existing user', () => {
    const created = createUser('Find', 'find@example.com');
    const found = findUserById(created.id);
    expect(found).toEqual(created);
  });

  it('should return null for non-existent ID', () => {
    expect(findUserById(999)).toBeNull();
  });
});

describe('findUsersByRole', () => {
  it('should return users with matching role', () => {
    createUser('Admin', 'admin@example.com', 'admin');
    createUser('Viewer1', 'v1@example.com', 'viewer');
    createUser('Viewer2', 'v2@example.com', 'viewer');
    const viewers = findUsersByRole('viewer');
    expect(viewers).toHaveLength(2);
  });

  it('should exclude inactive users', () => {
    const user = createUser('Gone', 'gone@example.com', 'viewer');
    deleteUser(user.id);
    expect(findUsersByRole('viewer')).toHaveLength(0);
  });

  it('should return empty array when no matches', () => {
    expect(findUsersByRole('admin')).toEqual([]);
  });
});

describe('updateUser', () => {
  it('should update name', () => {
    const user = createUser('Old', 'up@example.com');
    const updated = updateUser(user.id, { name: 'New' });
    expect(updated.name).toBe('New');
  });

  it('should update role', () => {
    const user = createUser('Role', 'role@example.com');
    const updated = updateUser(user.id, { role: 'admin' });
    expect(updated.role).toBe('admin');
  });

  it('should throw for non-existent user', () => {
    expect(() => updateUser(999, { name: 'X' })).toThrow('User not found');
  });

  it('should throw for empty name', () => {
    const user = createUser('Valid', 'val@example.com');
    expect(() => updateUser(user.id, { name: '' })).toThrow('non-empty string');
  });

  it('should throw for invalid role', () => {
    const user = createUser('Valid', 'val2@example.com');
    expect(() => updateUser(user.id, { role: 'boss' })).toThrow('Role must be');
  });
});

describe('deleteUser', () => {
  it('should soft-delete a user', () => {
    const user = createUser('Delete', 'del@example.com');
    expect(deleteUser(user.id)).toBe(true);
    const found = findUserById(user.id);
    expect(found.active).toBe(false);
  });

  it('should return false for non-existent user', () => {
    expect(deleteUser(999)).toBe(false);
  });
});

describe('validateEmail', () => {
  it('should accept valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
  });

  it('should reject emails without @', () => {
    expect(validateEmail('no-at-sign.com')).toBe(false);
  });

  it('should reject emails with multiple @', () => {
    expect(validateEmail('a@b@c.com')).toBe(false);
  });

  it('should reject emails with no domain dot', () => {
    expect(validateEmail('user@localhost')).toBe(false);
  });

  it('should reject non-string input', () => {
    expect(validateEmail(123)).toBe(false);
    expect(validateEmail(null)).toBe(false);
  });

  it('should reject empty local or domain parts', () => {
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('user@')).toBe(false);
  });
});

describe('getUserCount', () => {
  it('should return 0 when no users', () => {
    expect(getUserCount()).toBe(0);
  });

  it('should count only active users', () => {
    createUser('A', 'a@example.com');
    const b = createUser('B', 'b@example.com');
    createUser('C', 'c@example.com');
    deleteUser(b.id);
    expect(getUserCount()).toBe(2);
  });
});
