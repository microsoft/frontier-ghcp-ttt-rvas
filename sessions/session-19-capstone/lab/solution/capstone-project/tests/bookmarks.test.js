const request = require('supertest');
const app = require('../src');

describe('Bookmark API', () => {
  it('creates and lists a bookmark', async () => {
    const bookmark = {
      url: 'https://example.com/getting-started',
      title: 'Getting started',
      tags: ['docs'],
    };

    const createResponse = await request(app)
      .post('/api/bookmarks')
      .send(bookmark)
      .expect(201);

    expect(createResponse.body.data).toMatchObject(bookmark);

    const listResponse = await request(app)
      .get('/api/bookmarks')
      .expect(200);

    expect(listResponse.body.data).toEqual(
      expect.arrayContaining([expect.objectContaining(bookmark)])
    );
  });

  it('rejects an invalid bookmark', async () => {
    const response = await request(app)
      .post('/api/bookmarks')
      .send({ url: 'invalid', title: 'Invalid bookmark' })
      .expect(400);

    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('returns 404 for a missing bookmark', async () => {
    const response = await request(app)
      .get('/api/bookmarks/missing')
      .expect(404);

    expect(response.body.error.code).toBe('NOT_FOUND');
  });

  it('deletes an existing bookmark', async () => {
    const createResponse = await request(app)
      .post('/api/bookmarks')
      .send({
        url: 'https://example.com/remove-me',
        title: 'Remove me',
      })
      .expect(201);

    await request(app)
      .delete(`/api/bookmarks/${createResponse.body.data.id}`)
      .expect(204);

    await request(app)
      .get(`/api/bookmarks/${createResponse.body.data.id}`)
      .expect(404);
  });
});
