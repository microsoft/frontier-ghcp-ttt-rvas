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

  test('POST /api/users creates a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Test User', email: 'test-unique@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.name).toBe('Test User');
    expect(res.body.data.id).toBeDefined();
  });

  test('POST /api/users rejects missing fields', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: '' });
    expect(res.statusCode).toBe(400);
  });
});

describe('Users validation', () => {
  test('POST /api/users rejects a malformed email', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Dan', email: 'not-an-email' });
    expect(res.statusCode).toBe(400);
  });

  test('POST /api/users rejects a name over 100 characters', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'x'.repeat(101), email: 'long-name@example.com' });
    expect(res.statusCode).toBe(400);
  });
});

describe('Tasks API', () => {
  test('creates, filters, updates, and deletes a task', async () => {
    const created = await request(app).post('/api/tasks').send({ title: 'Write docs' });
    expect(created.statusCode).toBe(201);
    expect(created.body.data.status).toBe('todo');
    const id = created.body.data.id;

    const todo = await request(app).get('/api/tasks?status=todo');
    expect(todo.body.data.some(t => t.id === id)).toBe(true);

    const patched = await request(app).patch(`/api/tasks/${id}`).send({ status: 'done' });
    expect(patched.statusCode).toBe(200);
    expect(patched.body.data.status).toBe('done');

    const removed = await request(app).delete(`/api/tasks/${id}`);
    expect(removed.statusCode).toBe(204);
  });

  test('rejects an empty title and a bad status', async () => {
    expect((await request(app).post('/api/tasks').send({ title: '  ' })).statusCode).toBe(400);
    expect((await request(app).post('/api/tasks').send({ title: 'x', status: 'later' })).statusCode).toBe(400);
    expect((await request(app).get('/api/tasks?status=later')).statusCode).toBe(400);
  });

  test('returns 404 for an unknown task', async () => {
    expect((await request(app).patch('/api/tasks/nope').send({ status: 'done' })).statusCode).toBe(404);
    expect((await request(app).delete('/api/tasks/nope')).statusCode).toBe(404);
  });
});
