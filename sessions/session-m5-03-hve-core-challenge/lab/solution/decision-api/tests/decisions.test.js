const request = require('supertest');
const { createApp } = require('../src');

const validDecision = {
  title: 'Adopt PostgreSQL for decision records',
  context: 'The service needs durable storage and transactional updates.',
  decision: 'Use PostgreSQL as the system of record.'
};

describe('POST /api/decisions', () => {
  it('creates a proposed decision with generated metadata', async () => {
    const response = await request(createApp())
      .post('/api/decisions')
      .send(validDecision)
      .expect(201);

    expect(response.body).toEqual({
      data: {
        ...validDecision,
        id: expect.stringMatching(
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        ),
        status: 'proposed',
        createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
      }
    });
  });

  it.each(['proposed', 'accepted', 'superseded'])('accepts the %s status', async (status) => {
    const response = await request(createApp())
      .post('/api/decisions')
      .send({ ...validDecision, status })
      .expect(201);

    expect(response.body.data.status).toBe(status);
  });

  it.each([
    ['title', { ...validDecision, title: '  ' }],
    ['context', { title: validDecision.title, decision: validDecision.decision }],
    ['decision', { ...validDecision, decision: 42 }]
  ])('rejects an invalid %s', async (field, payload) => {
    const response = await request(createApp())
      .post('/api/decisions')
      .send(payload)
      .expect(400);

    expect(response.body).toEqual({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details: [
          { field, message: `${field} must be a non-empty string` }
        ]
      }
    });
  });

  it('rejects an unsupported status with a stable error envelope', async () => {
    const response = await request(createApp())
      .post('/api/decisions')
      .send({ ...validDecision, status: 'retired' })
      .expect(400);

    expect(response.body).toEqual({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details: [
          {
            field: 'status',
            message: 'status must be proposed, accepted, or superseded'
          }
        ]
      }
    });
  });

  it('rejects a duplicate title without regard to case or surrounding space', async () => {
    const app = createApp();

    await request(app)
      .post('/api/decisions')
      .send(validDecision)
      .expect(201);

    const response = await request(app)
      .post('/api/decisions')
      .send({ ...validDecision, title: '  ADOPT POSTGRESQL FOR DECISION RECORDS  ' })
      .expect(409);

    expect(response.body).toEqual({
      error: {
        code: 'DUPLICATE_TITLE',
        message: 'A decision with this title already exists'
      }
    });
  });

  it('returns a stable error envelope for malformed JSON', async () => {
    const response = await request(createApp())
      .post('/api/decisions')
      .set('Content-Type', 'application/json')
      .send('{"title":')
      .expect(400);

    expect(response.body).toEqual({
      error: {
        code: 'INVALID_JSON',
        message: 'Request body must contain valid JSON'
      }
    });
  });
});