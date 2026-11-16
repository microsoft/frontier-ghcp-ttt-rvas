const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

process.env.TRACKER_STATE = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'tracker-')), 'tickets.json');
const { invokeTool, toolDefinitions } = require('../src/index.js');

const parse = (response) => JSON.parse(response.content[0].text);

test('the server exposes three tools', () => {
  assert.deepEqual(toolDefinitions.map((tool) => tool.name), ['list_tickets', 'get_ticket', 'update_ticket']);
});

test('list_tickets filters by status', async () => {
  const open = parse(await invokeTool('list_tickets', { status: 'open' }));
  assert.deepEqual(open.map((ticket) => ticket.id), ['T-101', 'T-102']);
});

test('get_ticket returns an error for an unknown id', async () => {
  const response = await invokeTool('get_ticket', { id: 'T-999' });
  assert.equal(response.isError, true);
});

test('update_ticket saves status and comment, and rejects a bad status', async () => {
  const bad = await invokeTool('update_ticket', { id: 'T-101', status: 'shipped', comment: 'x' });
  assert.equal(bad.isError, true);

  const updated = parse(await invokeTool('update_ticket', { id: 'T-101', status: 'in_review', comment: 'Fixed.' }));
  assert.equal(updated.status, 'in_review');
  assert.deepEqual(parse(await invokeTool('get_ticket', { id: 'T-101' })).comments, ['Fixed.']);
});
