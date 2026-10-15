const assert = require('node:assert/strict');
const test = require('node:test');

const { invokeTool, toolDefinitions } = require('../src/index.js');

test('stage one exposes only get_weather with a required city', () => {
  assert.deepEqual(toolDefinitions.map((tool) => tool.name), ['get_weather']);
  assert.deepEqual(toolDefinitions[0].inputSchema.required, ['city']);
  assert.equal(toolDefinitions[0].inputSchema.additionalProperties, false);
});

test('get_weather returns deterministic synthetic data for good input', async () => {
  const response = await invokeTool('get_weather', { city: 'Oslo' });
  const body = JSON.parse(response.content[0].text);

  assert.equal(response.isError, undefined);
  assert.deepEqual(body, {
    city: 'Oslo',
    temperature: 30,
    unit: 'celsius',
    conditions: 'rain'
  });
});

test('get_weather rejects an empty city', async () => {
  const response = await invokeTool('get_weather', { city: '   ' });

  assert.equal(response.isError, true);
  assert.deepEqual(JSON.parse(response.content[0].text), {
    error: 'city must be a non-empty string'
  });
});
