const test = require('node:test');
const assert = require('node:assert/strict');
const { total } = require('../src');

test('total adds all values', () => {
  assert.equal(total([2, 3, 5]), 10);
});
