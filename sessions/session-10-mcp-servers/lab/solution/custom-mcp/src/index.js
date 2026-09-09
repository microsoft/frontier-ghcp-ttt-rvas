/**
 * Custom MCP Server — Weather Tools (SOLUTION)
 *
 * Complete implementation with 3 tools:
 *   1. get_weather — Current weather for a city
 *   2. get_forecast — Multi-day forecast for a city
 *   3. convert_temperature — Convert between Celsius and Fahrenheit
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  ListToolsRequestSchema,
  CallToolRequestSchema
} = require('@modelcontextprotocol/sdk/types.js');

const server = new Server(
  {
    name: 'weather-mcp-server',
    version: '1.0.0'
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// Helper: generate simulated weather data
function simulateWeather(city) {
  const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Overcast', 'Clear'];
  const hash = city.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return {
    city,
    temperature: (hash % 30) + 5,
    conditions: conditions[hash % conditions.length],
    humidity: (hash % 50) + 30,
    windSpeed: (hash % 20) + 3,
    unit: 'celsius'
  };
}

// Register tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_weather',
        description: 'Get current weather for a city. Returns temperature (Celsius), conditions, humidity, and wind speed.',
        inputSchema: {
          type: 'object',
          properties: {
            city: {
              type: 'string',
              description: "City name (e.g., 'London', 'New York', 'Tokyo')"
            }
          },
          required: ['city']
        }
      },
      {
        name: 'get_forecast',
        description: 'Get a multi-day weather forecast for a city. Returns daily temperature highs/lows and conditions.',
        inputSchema: {
          type: 'object',
          properties: {
            city: {
              type: 'string',
              description: "City name (e.g., 'London', 'New York', 'Tokyo')"
            },
            days: {
              type: 'number',
              description: 'Number of days to forecast (1-7, default: 3)',
              minimum: 1,
              maximum: 7
            }
          },
          required: ['city']
        }
      },
      {
        name: 'convert_temperature',
        description: 'Convert a temperature value between Celsius and Fahrenheit.',
        inputSchema: {
          type: 'object',
          properties: {
            value: {
              type: 'number',
              description: 'Temperature value to convert'
            },
            from: {
              type: 'string',
              enum: ['celsius', 'fahrenheit'],
              description: "Source unit: 'celsius' or 'fahrenheit'"
            }
          },
          required: ['value', 'from']
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'get_weather': {
      const weather = simulateWeather(args.city);
      return {
        content: [{ type: 'text', text: JSON.stringify(weather, null, 2) }]
      };
    }

    case 'get_forecast': {
      const days = Math.min(Math.max(args.days || 3, 1), 7);
      const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Clear'];
      const base = simulateWeather(args.city);
      const forecast = [];

      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i + 1);
        forecast.push({
          date: date.toISOString().split('T')[0],
          high: base.temperature + Math.floor(Math.random() * 5),
          low: base.temperature - Math.floor(Math.random() * 8) - 2,
          conditions: conditions[Math.floor(Math.random() * conditions.length)],
          humidity: base.humidity + Math.floor(Math.random() * 10) - 5
        });
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ city: args.city, unit: 'celsius', forecast }, null, 2)
        }]
      };
    }

    case 'convert_temperature': {
      const { value, from } = args;
      let result;
      let toUnit;

      if (from === 'celsius') {
        result = (value * 9) / 5 + 32;
        toUnit = 'fahrenheit';
      } else if (from === 'fahrenheit') {
        result = ((value - 32) * 5) / 9;
        toUnit = 'celsius';
      } else {
        throw new Error(`Invalid unit: ${from}. Use 'celsius' or 'fahrenheit'.`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            original: { value, unit: from },
            converted: { value: Math.round(result * 100) / 100, unit: toUnit }
          }, null, 2)
        }]
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Weather MCP server running on stdio');
}

main().catch(console.error);
