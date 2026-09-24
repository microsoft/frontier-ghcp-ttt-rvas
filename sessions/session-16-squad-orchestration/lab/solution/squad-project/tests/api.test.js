const request = require('supertest');
const app = require('../src/app');

describe('Health Check', () => {
  test('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('Users API', () => {
  test('GET /api/users returns array of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.count).toBeGreaterThan(0);
  });

  test('POST /api/users trims a valid name and creates a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: '  Test User  ', email: 'test-unique@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.name).toBe('Test User');
    expect(res.body.data.id).toBeDefined();
  });

  test.each([
    [{ name: '', email: 'valid@example.com' }, 'Name must be a non-empty string'],
    [{ name: 42, email: 'valid@example.com' }, 'Name must be a non-empty string'],
    [{ name: 'x'.repeat(101), email: 'valid@example.com' }, 'Name must be 100 characters or fewer'],
    [{ name: 'Valid Name', email: 'not-an-email' }, 'Email must be a valid email address'],
  ])('POST /api/users rejects invalid input %#', async (body, error) => {
    const res = await request(app).post('/api/users').send(body);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe(error);
  });
});
