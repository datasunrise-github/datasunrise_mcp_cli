/**
 * Minimal MCP Server Framework Interfaces
 * 
 * This file provides basic interfaces for the MCP server framework
 * to eliminate TypeScript errors when implementing the context-aware help integration.
 * 
 * NOTE: This is a minimal implementation for reference. In a real application,
 * you would replace these with your actual MCP server framework interfaces.
 */

/**
 * Resource configuration for MCP server resources
 */
export interface ResourceConfig {
  description: string;
  getData: () => any;
}

/**
 * Resource class for MCP server resources
 */
export class Resource {
  description: string;
  getData: () => any;
  
  constructor(config: ResourceConfig) {
    this.description = config.description;
    this.getData = config.getData;
  }
}

/**
 * Tool configuration for MCP server tools
 */
export interface ToolConfig {
  description: string;
  inputSchema: any;
  execute: (params: any) => any;
}

/**
 * Tool class for MCP server tools
 */
export class Tool {
  description: string;
  inputSchema: any;
  execute: (params: any) => any;
  
  constructor(config: ToolConfig) {
    this.description = config.description;
    this.inputSchema = config.inputSchema;
    this.execute = config.execute;
  }
}

/**
 * Prompt configuration for MCP server prompts
 */
export interface PromptConfig {
  description: string;
  template: string; // The prompt template string
  inputSchema?: any; // Optional schema for template variables
}

/**
 * Prompt class for MCP server prompts
 */
export class Prompt {
  description: string;
  template: string;
  inputSchema?: any;
  
  constructor(config: PromptConfig) {
    this.description = config.description;
    this.template = config.template;
    this.inputSchema = config.inputSchema;
  }
}

/**
 * MCP Server interface
 */
export interface MCPServer {
  /**
   * Add a resource to the MCP server
   * @param uri URI for the resource
   * @param resource Resource to add
   */
  addResource(uri: string, resource: Resource): void;
  
  /**
   * Add a tool to the MCP server
   * @param name Name of the tool
   * @param tool Tool to add
   */
  addTool(name: string, tool: Tool): void;

  /**
   * Add a prompt to the MCP server
   * @param name Name of the prompt
   * @param prompt Prompt to add
   */
  addPrompt(name: string, prompt: Prompt): void;

  /**
   * List all registered resources
   * @returns An array of resource details
   */
  listResources(): Array<{ uri: string; description: string }>;

  /**
   * List all registered tools
   * @returns An array of tool details
   */
  listTools(): Array<{ name: string; description: string; inputSchema: any }>;

  /**
   * List all registered prompts
   * @returns An array of prompt details
   */
  listPrompts(): Array<{ name: string; description: string; template: string; inputSchema?: any }>;
}

/**
 * Simple MCP Server implementation
 */
export class BasicMCPServer implements MCPServer {
  private resources: Map<string, Resource> = new Map();
  private tools: Map<string, Tool> = new Map();
  private prompts: Map<string, Prompt> = new Map(); // Added prompts map
  
  addResource(uri: string, resource: Resource): void {
    this.resources.set(uri, resource);
    console.error(`[MCP Server Info] Added resource: ${uri}`);
  }
  
  addTool(name: string, tool: Tool): void {
    this.tools.set(name, tool);
    console.error(`[MCP Server Info] Added tool: ${name}`);
  }

  addPrompt(name: string, prompt: Prompt): void {
    this.prompts.set(name, prompt);
    console.error(`[MCP Server Info] Added prompt: ${name}`);
  }
  
  getResource(uri: string): Resource | undefined {
    return this.resources.get(uri);
  }
  
  getTool(name: string): Tool | undefined {
    return this.tools.get(name);
  }

  // Method to get a prompt (optional, but good practice)
  getPrompt(name: string): Prompt | undefined {
    return this.prompts.get(name);
  }

  listResources(): Array<{ uri: string; description: string }> {
    const resourceList: Array<{ uri: string; description: string }> = [];
    this.resources.forEach((resource, uri) => {
      resourceList.push({ uri, description: resource.description });
    });
    return resourceList;
  }

  listTools(): Array<{ name: string; description: string; inputSchema: any }> {
    const toolList: Array<{ name: string; description: string; inputSchema: any }> = [];
    this.tools.forEach((tool, name) => {
      toolList.push({ name, description: tool.description, inputSchema: tool.inputSchema });
    });
    return toolList;
  }

  listPrompts(): Array<{ name: string; description: string; template: string; inputSchema?: any }> {
    const promptList: Array<{ name: string; description: string; template: string; inputSchema?: any }> = [];
    this.prompts.forEach((prompt, name) => {
      promptList.push({ 
        name, 
        description: prompt.description, 
        template: prompt.template, 
        inputSchema: prompt.inputSchema 
      });
    });
    return promptList;
  }
}
