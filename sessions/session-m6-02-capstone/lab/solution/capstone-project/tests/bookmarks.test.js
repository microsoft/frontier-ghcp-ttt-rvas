const request = require('supertest');
const app = require('../src');

describe('POST /api/bookmarks', () => {
  it('rejects a request with no body', async () => {
    const response = await request(app)
      .post('/api/bookmarks')
      .expect(400);

    expect(response.body.error).toEqual({
      code: 'VALIDATION_ERROR',
      message: 'url is required',
    });
  });

  it('creates a bookmark with all accepted fields', async () => {
    const input = {
      url: 'https://docs.example.test/node',
      title: 'Node reference',
      description: 'Synthetic training bookmark',
      tags: ['node', 'reference'],
    };

    const response = await request(app)
      .post('/api/bookmarks')
      .send(input)
      .expect(201);

    expect(response.body.data).toMatchObject({
      ...input,
      updatedAt: null,
    });
    expect(response.body.data.id).toEqual(expect.any(String));
    expect(Date.parse(response.body.data.createdAt)).not.toBeNaN();
  });

  it('normalizes omitted optional fields', async () => {
    const response = await request(app)
      .post('/api/bookmarks')
      .send({
        url: 'https://docs.example.test/minimal',
        title: 'Minimal bookmark',
      })
      .expect(201);

    expect(response.body.data).toMatchObject({
      description: null,
      tags: [],
      updatedAt: null,
    });
  });

  it.each([
    [{ title: 'Missing URL' }, 'url is required'],
    [{ url: 'ftp://files.example.test', title: 'Wrong protocol' }, 'url must be an absolute HTTP or HTTPS URL'],
    [{ url: 'not-a-url', title: 'Invalid URL' }, 'url must be an absolute HTTP or HTTPS URL'],
    [{ url: 'https://docs.example.test/missing-title' }, 'title is required'],
    [{ url: 'https://docs.example.test/empty-title', title: '   ' }, 'title is required'],
    [{ url: 'https://docs.example.test/title-type', title: 17 }, 'title must be a string'],
    [{ url: 'https://docs.example.test/long-title', title: 'x'.repeat(201) }, 'title must be 200 characters or fewer'],
  ])('rejects an invalid required field', async (input, message) => {
    const response = await request(app)
      .post('/api/bookmarks')
      .send(input)
      .expect(400);

    expect(response.body.error).toEqual({
      code: 'VALIDATION_ERROR',
      message,
    });
  });

  it.each([
    [{ description: 17 }, 'description must be a string'],
    [{ description: 'x'.repeat(1001) }, 'description must be 1000 characters or fewer'],
    [{ tags: 'node' }, 'tags must be an array'],
    [{ tags: Array.from({ length: 11 }, (_, index) => `tag-${index}`) }, 'tags must contain at most 10 items'],
    [{ tags: [''] }, 'tags must contain non-empty strings'],
    [{ tags: ['x'.repeat(51)] }, 'tags must be 50 characters or fewer'],
  ])('rejects an invalid optional field', async (fields, message) => {
    const response = await request(app)
      .post('/api/bookmarks')
      .send({
        url: `https://docs.example.test/optional-${encodeURIComponent(message)}`,
        title: 'Optional field check',
        ...fields,
      })
      .expect(400);

    expect(response.body.error).toEqual({
      code: 'VALIDATION_ERROR',
      message,
    });
  });

  it('rejects a duplicate URL', async () => {
    const input = {
      url: 'https://docs.example.test/duplicate',
      title: 'First bookmark',
    };

    await request(app)
      .post('/api/bookmarks')
      .send(input)
      .expect(201);

    const response = await request(app)
      .post('/api/bookmarks')
      .send({ ...input, title: 'Second bookmark' })
      .expect(409);

    expect(response.body.error).toEqual({
      code: 'CONFLICT',
      message: 'A bookmark with this URL already exists',
    });
  });
});
