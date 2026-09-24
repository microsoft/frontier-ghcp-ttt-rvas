const request = require('supertest');
const app = require('../src');

describe('Health check', () => {
  it('reports that the service is running', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });
});
