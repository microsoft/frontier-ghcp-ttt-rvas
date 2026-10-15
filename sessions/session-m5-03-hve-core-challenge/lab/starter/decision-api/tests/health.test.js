const request = require('supertest');
const app = require('../src');

describe('GET /health', () => {
  it('reports that the API is available', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });
});