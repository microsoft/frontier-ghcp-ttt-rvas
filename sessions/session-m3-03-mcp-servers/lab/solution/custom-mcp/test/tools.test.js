const assert = require('node:assert/strict');
const test = require('node:test');

const { invokeTool, toolDefinitions } = require('../src/index.js');

test('the completed server exposes the three bounded tools', () => {
  assert.deepEqual(
    toolDefinitions.map((tool) => tool.name),
    ['get_weather', 'get_forecast', 'convert_temperature']
  );
});

test('get_weather accepts good input', async () => {
  const response = await invokeTool('get_weather', { city: 'Oslo' });

  assert.deepEqual(JSON.parse(response.content[0].text), {
    city: 'Oslo',
    temperature: 30,
    unit: 'celsius',
    conditions: 'rain'
  });
});

test('get_forecast uses the default and rejects an invalid range', async () => {
  const good = await invokeTool('get_forecast', { city: 'Lima' });
  const bad = await invokeTool('get_forecast', { city: 'Lima', days: 8 });

  assert.equal(JSON.parse(good.content[0].text).forecast.length, 3);
  assert.equal(bad.isError, true);
  assert.deepEqual(JSON.parse(bad.content[0].text), {
    error: 'days must be an integer from 1 to 7'
  });
});

test('convert_temperature handles both directions and bad units', async () => {
  const celsius = await invokeTool('convert_temperature', { value: 20, from: 'celsius' });
  const fahrenheit = await invokeTool('convert_temperature', { value: 68, from: 'fahrenheit' });
  const bad = await invokeTool('convert_temperature', { value: 20, from: 'kelvin' });

  assert.equal(JSON.parse(celsius.content[0].text).converted.value, 68);
  assert.equal(JSON.parse(fahrenheit.content[0].text).converted.value, 20);
  assert.equal(bad.isError, true);
});

test('unknown tools return a visible protocol error', async () => {
  const response = await invokeTool('delete_forecast', {});

  assert.equal(response.isError, true);
  assert.deepEqual(JSON.parse(response.content[0].text), {
    error: 'Unknown tool: delete_forecast'
  });
});
