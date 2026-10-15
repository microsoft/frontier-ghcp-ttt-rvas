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
        city: {
          type: 'string',
          minLength: 1,
          description: 'Non-empty city name.'
        }
      },
      required: ['city'],
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

async function invokeTool(name, args = {}) {
  if (name !== 'get_weather') {
    return toolError(`Unknown tool: ${name}`);
  }

  if (typeof args.city !== 'string' || args.city.trim() === '') {
    return toolError('city must be a non-empty string');
  }

  return {
    content: [{ type: 'text', text: JSON.stringify(syntheticWeather(args.city)) }]
  };
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
