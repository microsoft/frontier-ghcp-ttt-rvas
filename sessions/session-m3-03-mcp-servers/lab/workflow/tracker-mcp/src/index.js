const fs = require('node:fs');
const path = require('node:path');
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  ListToolsRequestSchema,
  CallToolRequestSchema
} = require('@modelcontextprotocol/sdk/types.js');

const seedFile = path.join(__dirname, '..', 'data', 'tickets.json');
const stateFile = process.env.TRACKER_STATE || path.join(__dirname, '..', '.state', 'tickets.json');
const statuses = ['open', 'in_progress', 'in_review', 'done'];

const toolDefinitions = [
  {
    name: 'list_tickets',
    description: 'List tickets in the team tracker. Returns id, title, status, and priority. Optionally filter by status.',
    inputSchema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: statuses, description: 'Only return tickets with this status.' }
      },
      additionalProperties: false
    }
  },
  {
    name: 'get_ticket',
    description: 'Get the full text of one ticket by id, such as T-101. Use this before you start work on a ticket.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string', description: 'Ticket id, such as T-101.' } },
      required: ['id'],
      additionalProperties: false
    }
  },
  {
    name: 'update_ticket',
    description: 'Change the status of a ticket and add a comment. This changes shared team data: call it only when the user asks you to.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Ticket id, such as T-101.' },
        status: { type: 'string', enum: statuses, description: 'New status.' },
        comment: { type: 'string', minLength: 1, description: 'What changed and how it was tested.' }
      },
      required: ['id', 'status', 'comment'],
      additionalProperties: false
    }
  }
];

function loadTickets() {
  const file = fs.existsSync(stateFile) ? stateFile : seedFile;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function saveTickets(tickets) {
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  fs.writeFileSync(stateFile, `${JSON.stringify(tickets, null, 2)}\n`);
}

const ok = (value) => ({ content: [{ type: 'text', text: JSON.stringify(value) }] });
const fail = (message) => ({
  isError: true,
  content: [{ type: 'text', text: JSON.stringify({ error: message }) }]
});

async function invokeTool(name, args = {}) {
  const tickets = loadTickets();

  if (name === 'list_tickets') {
    if (args.status !== undefined && !statuses.includes(args.status)) {
      return fail(`status must be one of: ${statuses.join(', ')}`);
    }
    return ok(
      tickets
        .filter((ticket) => !args.status || ticket.status === args.status)
        .map(({ id, title, status, priority }) => ({ id, title, status, priority }))
    );
  }

  if (name === 'get_ticket' || name === 'update_ticket') {
    const ticket = tickets.find((item) => item.id === args.id);
    if (!ticket) {
      return fail(`No ticket with id ${args.id}`);
    }
    if (name === 'get_ticket') {
      return ok(ticket);
    }

    if (!statuses.includes(args.status)) {
      return fail(`status must be one of: ${statuses.join(', ')}`);
    }
    if (typeof args.comment !== 'string' || args.comment.trim() === '') {
      return fail('comment must be a non-empty string');
    }
    ticket.status = args.status;
    ticket.comments.push(args.comment.trim());
    saveTickets(tickets);
    return ok(ticket);
  }

  return fail(`Unknown tool: ${name}`);
}

function createServer() {
  const server = new Server(
    { name: 'tracker-mcp-server', version: '1.0.0' },
    { capabilities: { tools: {} } }
  );
  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: toolDefinitions }));
  server.setRequestHandler(CallToolRequestSchema, async (request) => (
    invokeTool(request.params.name, request.params.arguments)
  ));
  return server;
}

async function main() {
  const server = createServer();
  await server.connect(new StdioServerTransport());
  console.error('Tracker MCP server running on stdio');
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { createServer, invokeTool, toolDefinitions };
