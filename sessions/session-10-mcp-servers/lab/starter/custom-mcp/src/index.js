/**
 * Custom MCP Server — Weather Tools
 *
 * This server exposes weather-related tools that Copilot can call
 * via the Model Context Protocol.
 *
 * YOUR TASK: Implement 3 tools:
 *   1. get_weather    — Current weather for a city
 *   2. get_forecast   — Multi-day forecast for a city
 *   3. convert_temperature — Convert between Celsius and Fahrenheit
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  ListToolsRequestSchema,
  CallToolRequestSchema
} = require('@modelcontextprotocol/sdk/types.js');

// Create the MCP server
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

// ============================================================
// TODO: Register tools
// ============================================================
// Use server.setRequestHandler(ListToolsRequestSchema, ...) to
// register your tools. Each tool needs:
//   - name: unique identifier (e.g., "get_weather")
//   - description: what the tool does (the agent reads this!)
//   - inputSchema: JSON Schema describing the parameters
//
// Hint: Start with get_weather, then add get_forecast and
// convert_temperature.
// ============================================================



// ============================================================
// TODO: Handle tool calls
// ============================================================
// Use server.setRequestHandler(CallToolRequestSchema, ...) to
// handle incoming tool calls. Match on request.params.name to
// determine which tool was called.
//
// Each handler should return:
//   { content: [{ type: "text", text: "result string" }] }
//
// For weather data, use simulated data (random temperatures,
// conditions, etc.) — we're not calling a real weather API.
// ============================================================



// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Weather MCP server running on stdio');
}

main().catch(console.error);
