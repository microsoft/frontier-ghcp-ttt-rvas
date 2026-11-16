const assert = require('node:assert/strict');
const test = require('node:test');

const { orderTotal, formatCents } = require('../src/pricing.js');

test('no code means no discount', () => {
  assert.equal(orderTotal([{ unitCents: 1005, quantity: 3 }]), 3015);
});

test('SAVE25 takes 25% off a single item', () => {
  assert.equal(orderTotal([{ unitCents: 2000, quantity: 1 }], 'SAVE25'), 1500);
});

test('an unknown code is ignored', () => {
  assert.equal(orderTotal([{ unitCents: 500, quantity: 2 }], 'NOPE'), 1000);
});

test('formatCents prints dollars', () => {
  assert.equal(formatCents(2714), '$27.14');
});
