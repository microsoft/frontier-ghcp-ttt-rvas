const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

test('search treats SQL syntax as a username value', async () => {
  const response = await request(app)
    .get('/api/users/search')
    .query({ username: "' OR '1'='1" });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body.data, []);
});

test('greeting encodes HTML input', async () => {
  const response = await request(app)
    .get('/greet')
    .query({ name: '<script>alert(1)</script>' });

  assert.equal(response.status, 200);
  assert.match(response.text, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(response.text, /<script>/);
});

test('file route rejects a path outside uploads', async () => {
  const response = await request(app)
    .get('/api/files')
    .query({ filename: '../../../etc/passwd' });

  assert.equal(response.status, 403);
});
