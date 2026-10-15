const request = require('supertest');
const app = require('../src/api');

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
