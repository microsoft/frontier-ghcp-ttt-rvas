const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  ListToolsRequestSchema,
  CallToolRequestSchema
} = require('@modelcontextprotocol/sdk/types.js');

const toolDefinitions = [
  {
    name: 'get_weather',
    description: 'Return deterministic synthetic current weather for one city.',
    inputSchema: {
      type: 'object',
      properties: {
        city: { type: 'string', minLength: 1, description: 'Non-empty city name.' }
      },
      required: ['city'],
      additionalProperties: false
    }
  },
  {
    name: 'get_forecast',
    description: 'Return a deterministic synthetic forecast for one to seven days.',
    inputSchema: {
      type: 'object',
      properties: {
        city: { type: 'string', minLength: 1, description: 'Non-empty city name.' },
        days: {
          type: 'integer',
          minimum: 1,
          maximum: 7,
          default: 3,
          description: 'Forecast length from one to seven days.'
        }
      },
      required: ['city'],
      additionalProperties: false
    }
  },
  {
    name: 'convert_temperature',
    description: 'Convert one temperature between Celsius and Fahrenheit.',
    inputSchema: {
      type: 'object',
      properties: {
        value: { type: 'number', description: 'Temperature to convert.' },
        from: {
          type: 'string',
          enum: ['celsius', 'fahrenheit'],
          description: 'Unit of the input value.'
        }
      },
      required: ['value', 'from'],
      additionalProperties: false
    }
  }
];

function syntheticWeather(city) {
  const normalized = city.trim();
  const score = [...normalized].reduce((total, character) => total + character.charCodeAt(0), 0);
  const conditions = ['clear', 'cloudy', 'rain'];

  return {
    city: normalized,
    temperature: 8 + (score % 23),
    unit: 'celsius',
    conditions: conditions[score % conditions.length]
  };
}

function toolError(message) {
  return {
    isError: true,
    content: [{ type: 'text', text: JSON.stringify({ error: message }) }]
  };
}

function validateCity(city) {
  return typeof city === 'string' && city.trim() !== '';
}

async function invokeTool(name, args = {}) {
  if (name === 'get_weather') {
    if (!validateCity(args.city)) {
      return toolError('city must be a non-empty string');
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(syntheticWeather(args.city)) }]
    };
  }

  if (name === 'get_forecast') {
    if (!validateCity(args.city)) {
      return toolError('city must be a non-empty string');
    }

    const days = args.days ?? 3;
    if (!Number.isInteger(days) || days < 1 || days > 7) {
      return toolError('days must be an integer from 1 to 7');
    }

    const current = syntheticWeather(args.city);
    const forecast = Array.from({ length: days }, (_, index) => ({
      day: index + 1,
      high: current.temperature + 2 + index,
      low: current.temperature - 3 + index,
      unit: 'celsius',
      conditions: ['clear', 'cloudy', 'rain'][(index + current.temperature) % 3]
    }));

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ city: current.city, forecast })
      }]
    };
  }

  if (name === 'convert_temperature') {
    if (typeof args.value !== 'number' || !Number.isFinite(args.value)) {
      return toolError('value must be a finite number');
    }
    if (!['celsius', 'fahrenheit'].includes(args.from)) {
      return toolError("from must be 'celsius' or 'fahrenheit'");
    }

    const converted = args.from === 'celsius'
      ? { value: (args.value * 9) / 5 + 32, unit: 'fahrenheit' }
      : { value: ((args.value - 32) * 5) / 9, unit: 'celsius' };

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          original: { value: args.value, unit: args.from },
          converted: { value: Math.round(converted.value * 100) / 100, unit: converted.unit }
        })
      }]
    };
  }

  return toolError(`Unknown tool: ${name}`);
}

function createServer() {
  const server = new Server(
    { name: 'weather-mcp-server', version: '1.0.0' },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: toolDefinitions
  }));
  server.setRequestHandler(CallToolRequestSchema, async (request) => (
    invokeTool(request.params.name, request.params.arguments)
  ));

  return server;
}

async function main() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Weather MCP server running on stdio');
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { createServer, invokeTool, syntheticWeather, toolDefinitions };
