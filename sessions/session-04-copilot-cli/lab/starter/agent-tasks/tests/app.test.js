const { describe, it, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../src/app');

let server;
const PORT = 3099;
const BASE_URL = `http://localhost:${PORT}`;

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path,
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

describe('Task API', () => {
  beforeEach(() => {
    app.resetTasks();
  });

  // Start server before all tests
  const serverReady = new Promise((resolve) => {
    server = app.listen(PORT, resolve);
  });

  after(() => {
    server?.close();
  });

  it('should create a task', async () => {
    await serverReady;
    const res = await request('POST', '/tasks', { title: 'Test task', description: 'A test' });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.title, 'Test task');
    assert.strictEqual(res.body.status, 'pending');
    assert.strictEqual(res.body.id, 1);
  });

  it('should reject task without title', async () => {
    await serverReady;
    const res = await request('POST', '/tasks', { description: 'No title' });
    assert.strictEqual(res.status, 400);
  });

  it('should get a task by ID', async () => {
    await serverReady;
    await request('POST', '/tasks', { title: 'Find me' });
    const res = await request('GET', '/tasks/1');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.title, 'Find me');
  });

  it('should return 404 for missing task', async () => {
    await serverReady;
    const res = await request('GET', '/tasks/999');
    assert.strictEqual(res.status, 404);
  });

  it('should filter tasks by status', async () => {
    await serverReady;
    await request('POST', '/tasks', { title: 'Task 1' });
    await request('POST', '/tasks', { title: 'Task 2' });
    // Update task 1 to 'done'
    await request('PUT', '/tasks/1', { status: 'done' });
    const res = await request('GET', '/tasks?status=pending');
    assert.strictEqual(res.status, 200);
    // Should return only pending tasks (Task 2)
    assert.strictEqual(res.body.length, 1);
    assert.strictEqual(res.body[0].title, 'Task 2');
  });

  it('should update a task', async () => {
    await serverReady;
    await request('POST', '/tasks', { title: 'Original' });
    const res = await request('PUT', '/tasks/1', { title: 'Updated', status: 'done' });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.title, 'Updated');
    assert.strictEqual(res.body.status, 'done');
  });

  it('should delete a task', async () => {
    await serverReady;
    await request('POST', '/tasks', { title: 'Delete me' });
    const res = await request('DELETE', '/tasks/1');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.title, 'Delete me');
    // Verify it's gone
    const check = await request('GET', '/tasks/1');
    assert.strictEqual(check.status, 404);
  });
});
