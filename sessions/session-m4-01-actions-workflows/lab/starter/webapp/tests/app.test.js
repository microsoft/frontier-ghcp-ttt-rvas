const request = require('supertest');
const app = require('../src/app');

describe('Health Check', () => {
  test('GET /health returns ok status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.timestamp).toBeDefined();
  });
});

describe('Items API', () => {
  test('GET /api/items returns all items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(3);
    expect(res.body.total).toBe(3);
  });

  test('GET /api/items?category=tools filters by category', async () => {
    const res = await request(app).get('/api/items?category=tools');
    expect(res.status).toBe(200);
    expect(res.body.data.every(i => i.category === 'tools')).toBe(true);
  });

  test('GET /api/items/:id returns one item', async () => {
    const res = await request(app).get('/api/items/1');
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Widget A');
  });

  test('GET /api/items/:id returns 404 for missing item', async () => {
    const res = await request(app).get('/api/items/999');
    expect(res.status).toBe(404);
  });

  test('POST /api/items creates a new item', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'New Item', price: 29.99, category: 'misc' });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe('New Item');
    expect(res.body.data.id).toBeDefined();
  });

  test('POST /api/items returns 400 without required fields', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ category: 'misc' });
    expect(res.status).toBe(400);
  });
});
