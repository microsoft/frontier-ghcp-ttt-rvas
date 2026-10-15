const request = require('supertest');
const app = require('../src/app');

beforeEach(() => {
  app.resetTasks();
});

describe('GET /api/health', () => {
  it('should return ok status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.timestamp).toBeDefined();
  });
});

describe('GET /api/tasks', () => {
  it('should return empty array when no tasks exist', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('POST /api/tasks', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test task', priority: 'high' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test task');
    expect(res.body.priority).toBe('high');
    expect(res.body.id).toBe(1);
    expect(res.body.completed).toBe(false);
  });

  it('should default priority to medium', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'No priority' });
    expect(res.status).toBe(201);
    expect(res.body.priority).toBe('medium');
  });
});

describe('GET /api/tasks/:id', () => {
  it('should return a specific task', async () => {
    await request(app).post('/api/tasks').send({ title: 'Find me' });
    const res = await request(app).get('/api/tasks/1');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Find me');
  });

  it('should return 404 for non-existent task', async () => {
    const res = await request(app).get('/api/tasks/999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Task not found');
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('should delete an existing task', async () => {
    await request(app).post('/api/tasks').send({ title: 'Delete me' });
    const res = await request(app).delete('/api/tasks/1');
    expect(res.status).toBe(204);

    const check = await request(app).get('/api/tasks/1');
    expect(check.status).toBe(404);
  });
});
