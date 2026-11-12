const { test, beforeEach, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('../server');
const store = require('../src/store');

let server;
let base;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}/api/notes`;
});

after(() => server.close());
beforeEach(() => store.reset());

function post(body) {
  return fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

test('creates a note', async () => {
  const res = await post({ title: 'Buy milk', body: 'Two litres' });
  assert.strictEqual(res.status, 201);
  const note = await res.json();
  assert.strictEqual(note.title, 'Buy milk');
  assert.strictEqual(note.id, 1);
});

test('rejects a note without a title', async () => {
  const res = await post({ body: 'No title' });
  assert.strictEqual(res.status, 400);
});

test('searches notes with ?q=', async () => {
  await post({ title: 'Buy milk' });
  await post({ title: 'Call Sam' });
  const res = await fetch(`${base}?q=milk`);
  const notes = await res.json();
  assert.strictEqual(notes.length, 1);
  assert.strictEqual(notes[0].title, 'Buy milk');
});

test('stores tags and filters with ?tag=', async () => {
  await post({ title: 'Buy milk', tags: ['home'] });
  await post({ title: 'Call Sam', tags: ['work'] });
  const res = await fetch(`${base}?tag=work`);
  const notes = await res.json();
  assert.strictEqual(notes.length, 1);
  assert.strictEqual(notes[0].title, 'Call Sam');
});

test('defaults tags to an empty list', async () => {
  const note = await (await post({ title: 'No tags' })).json();
  assert.deepStrictEqual(note.tags, []);
});

test('rejects invalid tags', async () => {
  const res = await post({ title: 'Bad', tags: ['Not Valid'] });
  assert.strictEqual(res.status, 400);
});

test('returns 404 for a missing note', async () => {
  const res = await fetch(`${base}/99`);
  assert.strictEqual(res.status, 404);
});
