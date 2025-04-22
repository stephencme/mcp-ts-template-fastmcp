#!/usr/bin/env node

import { FastMCP } from "fastmcp";
import { z } from "zod";

const packageJson = require("../package.json") as any;

// Create a new MCP server
const server = new FastMCP(
  {
    name: packageJson.name,
    version: packageJson.version,
  },
);

// Implement the ping_pong tool
server.addTool(
{
  name: "ping_pong",
  description: "Ping the server and receive a pong back",
  parameters: z.object({}),
  execute: async () => {
    return "pong";
  },
}
);

// Implement the echo tool
server.addTool(
  {
    name: "echo",
    description: "Send a message to the server and receive the message back",
    parameters: z.object({ message: z.string() }),
    execute: async (params) => {
      return params.message;
    },
  }
);

// Start the server
server.start({
  transportType: "stdio",
});
