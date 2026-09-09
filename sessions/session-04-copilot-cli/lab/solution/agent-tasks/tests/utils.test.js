const { describe, it } = require('node:test');
const assert = require('node:assert');
const { capitalize, slugify, truncate, parseCSV } = require('../src/utils');

describe('capitalize', () => {
  it('should capitalize the first letter and lowercase the rest', () => {
    assert.strictEqual(capitalize('hello'), 'Hello');
    assert.strictEqual(capitalize('HELLO'), 'Hello');
    assert.strictEqual(capitalize('hELLO wORLD'), 'Hello world');
  });

  it('should handle single character strings', () => {
    assert.strictEqual(capitalize('a'), 'A');
    assert.strictEqual(capitalize('Z'), 'Z');
  });

  it('should return empty string for empty/falsy input', () => {
    assert.strictEqual(capitalize(''), '');
    assert.strictEqual(capitalize(null), '');
    assert.strictEqual(capitalize(undefined), '');
  });

  it('should throw TypeError for non-string input', () => {
    assert.throws(() => capitalize(42), { name: 'TypeError' });
    assert.throws(() => capitalize(true), { name: 'TypeError' });
    assert.throws(() => capitalize([]), { name: 'TypeError' });
    assert.throws(() => capitalize({}), { name: 'TypeError' });
  });
});

describe('slugify', () => {
  it('should convert text to a URL-friendly slug', () => {
    assert.strictEqual(slugify('Hello World'), 'hello-world');
    assert.strictEqual(slugify('My Blog Post Title'), 'my-blog-post-title');
  });

  it('should handle special characters', () => {
    assert.strictEqual(slugify('Hello, World!'), 'hello-world');
    assert.strictEqual(slugify('Price: $100 (sale)'), 'price-100-sale');
    assert.strictEqual(slugify('café & résumé'), 'caf-rsum');
  });

  it('should handle underscores and multiple spaces', () => {
    assert.strictEqual(slugify('hello_world'), 'hello-world');
    assert.strictEqual(slugify('too   many   spaces'), 'too-many-spaces');
  });

  it('should trim leading and trailing hyphens', () => {
    assert.strictEqual(slugify('  hello  '), 'hello');
    assert.strictEqual(slugify('--hello--'), 'hello');
  });

  it('should return empty string for whitespace-only input', () => {
    assert.strictEqual(slugify('   '), '');
    assert.strictEqual(slugify(''), '');
  });

  it('should throw TypeError for non-string input', () => {
    assert.throws(() => slugify(42), { name: 'TypeError' });
    assert.throws(() => slugify(null), { name: 'TypeError' });
    assert.throws(() => slugify(undefined), { name: 'TypeError' });
  });
});

describe('truncate', () => {
  it('should truncate long strings with ellipsis', () => {
    assert.strictEqual(truncate('Hello, World!', 8), 'Hello...');
    assert.strictEqual(truncate('A very long string', 10), 'A very...');
  });

  it('should not truncate strings shorter than maxLength', () => {
    assert.strictEqual(truncate('Hello', 10), 'Hello');
    assert.strictEqual(truncate('Hi', 2), 'Hi');
  });

  it('should not truncate strings equal to maxLength', () => {
    assert.strictEqual(truncate('Hello', 5), 'Hello');
  });

  it('should handle empty strings', () => {
    assert.strictEqual(truncate('', 5), '');
  });

  it('should throw TypeError for non-string first argument', () => {
    assert.throws(() => truncate(42, 5), { name: 'TypeError' });
    assert.throws(() => truncate(null, 5), { name: 'TypeError' });
  });

  it('should throw TypeError for non-integer maxLength', () => {
    assert.throws(() => truncate('hello', '5'), { name: 'TypeError' });
    assert.throws(() => truncate('hello', 5.5), { name: 'TypeError' });
    assert.throws(() => truncate('hello', null), { name: 'TypeError' });
  });
});

describe('parseCSV', () => {
  it('should parse a simple CSV string into objects', () => {
    const csv = 'name,age,city\nAlice,30,NYC\nBob,25,LA';
    const result = parseCSV(csv);
    assert.strictEqual(result.length, 2);
    assert.deepStrictEqual(result[0], { name: 'Alice', age: '30', city: 'NYC' });
    assert.deepStrictEqual(result[1], { name: 'Bob', age: '25', city: 'LA' });
  });

  it('should handle whitespace in CSV values', () => {
    const csv = 'name, age, city\n Alice , 30 , NYC ';
    const result = parseCSV(csv);
    assert.strictEqual(result[0].name, 'Alice');
    assert.strictEqual(result[0].age, '30');
    assert.strictEqual(result[0].city, 'NYC');
  });

  it('should handle missing values', () => {
    const csv = 'name,age,city\nAlice,,NYC';
    const result = parseCSV(csv);
    assert.strictEqual(result[0].age, '');
  });

  it('should handle single-line CSV (headers only)', () => {
    const csv = 'name,age,city';
    const result = parseCSV(csv);
    assert.strictEqual(result.length, 0);
  });

  it('should handle CSV with trailing newlines', () => {
    const csv = 'name,age\nAlice,30\n';
    const result = parseCSV(csv);
    assert.strictEqual(result.length, 1);
  });

  it('should throw TypeError for non-string input', () => {
    assert.throws(() => parseCSV(42), { name: 'TypeError' });
    assert.throws(() => parseCSV(null), { name: 'TypeError' });
    assert.throws(() => parseCSV(undefined), { name: 'TypeError' });
    assert.throws(() => parseCSV([]), { name: 'TypeError' });
  });
});
