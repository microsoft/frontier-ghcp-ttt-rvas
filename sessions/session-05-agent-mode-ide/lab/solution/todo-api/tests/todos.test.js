const request = require('supertest');
const app = require('../server');

describe('Todo API', () => {
  let createdTodoId;

  test('POST /api/todos — creates a todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Test todo', priority: 'high' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test todo');
    expect(res.body.priority).toBe('high');
    expect(res.body.status).toBe('pending');
    expect(res.body).toHaveProperty('createdAt');
    createdTodoId = res.body.id;
  });

  test('GET /api/todos — lists all todos', async () => {
    const res = await request(app).get('/api/todos');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/todos/:id — gets a specific todo', async () => {
    const res = await request(app).get(`/api/todos/${createdTodoId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdTodoId);
  });

  test('GET /api/todos/:id — returns 404 for missing todo', async () => {
    const res = await request(app).get('/api/todos/9999');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  test('POST /api/todos — rejects invalid input', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ priority: 'urgent' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('details');
  });

  test('PUT /api/todos/:id — updates a todo', async () => {
    const res = await request(app)
      .put(`/api/todos/${createdTodoId}`)
      .send({ status: 'completed' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('completed');
  });

  test('DELETE /api/todos/:id — deletes a todo', async () => {
    const res = await request(app).delete(`/api/todos/${createdTodoId}`);
    expect(res.status).toBe(204);
  });
});
