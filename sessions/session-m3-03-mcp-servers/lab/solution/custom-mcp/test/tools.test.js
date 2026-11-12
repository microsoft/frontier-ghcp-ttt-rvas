const assert = require('node:assert/strict');
const test = require('node:test');

const { invokeTool, toolDefinitions } = require('../src/index.js');

const parse = (response) => JSON.parse(response.content[0].text);

test('the server exposes get_weather and convert_temperature', () => {
  assert.deepEqual(toolDefinitions.map((tool) => tool.name), ['get_weather', 'convert_temperature']);
});

test('get_weather returns deterministic synthetic data', async () => {
  assert.deepEqual(parse(await invokeTool('get_weather', { city: 'Oslo' })), {
    city: 'Oslo',
    temperature: 30,
    unit: 'celsius',
    conditions: 'rain'
  });
});

test('get_weather rejects an empty city', async () => {
  const response = await invokeTool('get_weather', { city: '  ' });
  assert.equal(response.isError, true);
});

test('convert_temperature converts in both directions', async () => {
  assert.deepEqual(parse(await invokeTool('convert_temperature', { value: 30, from: 'celsius' })), {
    value: 86,
    unit: 'fahrenheit'
  });
  assert.deepEqual(parse(await invokeTool('convert_temperature', { value: 212, from: 'fahrenheit' })), {
    value: 100,
    unit: 'celsius'
  });
});

test('convert_temperature rejects a bad unit', async () => {
  const response = await invokeTool('convert_temperature', { value: 1, from: 'kelvin' });
  assert.equal(response.isError, true);
});

test('Atlantis returns tool output that contains an instruction', async () => {
  assert.match(parse(await invokeTool('get_weather', { city: 'Atlantis' })).note, /SYSTEM NOTICE/);
});

test('unknown tools return an error', async () => {
  assert.equal((await invokeTool('get_forecast', {})).isError, true);
});
