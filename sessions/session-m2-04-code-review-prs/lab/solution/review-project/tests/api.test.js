const request = require('supertest');
const app = require('../src/api');
const { paginate } = require('../src/utils');

// ---- Original tests (passing) ----

describe('Items API', () => {
  test('GET /api/items returns all items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/items/:id returns one item', async () => {
    const res = await request(app).get('/api/items/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Widget');
  });

  test('GET /api/items/:id returns 404 for missing', async () => {
    const res = await request(app).get('/api/items/999');
    expect(res.status).toBe(404);
  });

  test('POST /api/items creates an item', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'New Item', price: 15.99 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('New Item');
  });
});

// ---- FIXED: Tests for the corrected user endpoints ----

describe('Users API — no password exposure (Fix 2)', () => {
  test('GET /api/users does not return password fields', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    res.body.forEach(user => {
      expect(user).not.toHaveProperty('password');
      expect(user).not.toHaveProperty('passwordHash');
    });
  });

  test('GET /api/users returns expected fields', async () => {
    const res = await request(app).get('/api/users');
    expect(res.body[0]).toHaveProperty('username');
    expect(res.body[0]).toHaveProperty('email');
    expect(res.body[0]).toHaveProperty('role');
  });
});

describe('User search — sanitized input (Fix 1)', () => {
  test('GET /api/users/search returns results for valid query', async () => {
    const res = await request(app).get('/api/users/search?q=admin');
    expect(res.status).toBe(200);
    expect(res.body.results.length).toBeGreaterThan(0);
  });

  test('GET /api/users/search does not echo raw SQL', async () => {
    const res = await request(app).get("/api/users/search?q='; DROP TABLE users; --");
    expect(res.status).toBe(200);
    // Results should be empty for nonsense input, not an SQL string
    expect(typeof res.body.results).toBe('object');
    expect(Array.isArray(res.body.results)).toBe(true);
  });

  test('GET /api/users/search with empty query returns empty results', async () => {
    const res = await request(app).get('/api/users/search');
    expect(res.status).toBe(200);
    expect(res.body.results).toHaveLength(0);
  });

  test('GET /api/users/search results do not contain passwords', async () => {
    const res = await request(app).get('/api/users/search?q=jane');
    expect(res.status).toBe(200);
    res.body.results.forEach(user => {
      expect(user).not.toHaveProperty('password');
      expect(user).not.toHaveProperty('passwordHash');
    });
  });
});

describe('POST /api/users — error handling (Fix 4)', () => {
  test('returns 400 for invalid JSON body', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ data: 'not-valid-json{{{' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('creates a user with valid JSON body', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ data: JSON.stringify({ username: 'newuser', email: 'new@test.com', role: 'user' }) });
    expect(res.status).toBe(201);
    expect(res.body.username).toBe('newuser');
    expect(res.body).not.toHaveProperty('passwordHash');
  });
});

describe('GET /api/products — DRY fix (Fix 6)', () => {
  test('returns same data as /api/items (shared source)', async () => {
    const items = await request(app).get('/api/items');
    const products = await request(app).get('/api/products');
    expect(products.status).toBe(200);
    expect(products.body).toEqual(items.body);
  });
});

// ---- Pagination fix test (Fix 3) ----

describe('paginate utility — off-by-one fix (Fix 3)', () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  test('page 1 starts at index 0', () => {
    const result = paginate(data, 1, 3);
    expect(result.data).toEqual([1, 2, 3]);
  });

  test('page 2 starts at index pageSize', () => {
    const result = paginate(data, 2, 3);
    expect(result.data).toEqual([4, 5, 6]);
  });

  test('total pages is calculated correctly', () => {
    const result = paginate(data, 1, 3);
    expect(result.totalPages).toBe(4);
  });

  test('last page returns remaining items', () => {
    const result = paginate(data, 4, 3);
    expect(result.data).toEqual([10]);
  });
});
