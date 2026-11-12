const test = require('node:test');
const assert = require('node:assert/strict');
const { median } = require('../src/stats');

test('median of an odd list', () => {
  assert.equal(median([9, 1, 5]), 5);
});

test('median of an even list', () => {
  assert.equal(median([4, 1, 3, 2]), 2.5);
});

test('median does not change its input', () => {
  const input = [3, 1, 2];
  median(input);
  assert.deepEqual(input, [3, 1, 2]);
});
