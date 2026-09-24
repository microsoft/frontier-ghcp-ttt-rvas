const request = require('supertest');
const { createApp } = require('../src');

describe('GET /health', () => {
  it('reports that the API is available', async () => {
    const response = await request(createApp())
      .get('/health')
      .expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });
});