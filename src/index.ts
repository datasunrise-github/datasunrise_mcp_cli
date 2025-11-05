#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema, 
  ErrorCode, 
  ListToolsRequestSchema, 
  McpError,
  RequestSchema, // Generic request schema
  ListResourcesResult
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod'; // Import Zod
import { exec } from 'node:child_process';
import { BasicMCPServer, Tool, Prompt } from './mcp_server_framework.js'; // MCP Framework - Added Prompt
import { promisify } from 'node:util';
import * as path from 'node:path';
import { allCliCommands, CliParam, CliCommand } from './commands/index.js';
import { getCommandDescription, getCommandParameterHelp } from './description_registry.js';
import { registerAllSequenceDescriptions } from './enhanced_descriptions/sequence_descriptions.js';
import './enhanced_descriptions/masking_rule_commands.js'; // Ensure masking rule descriptions are registered
import './enhanced_descriptions/rule_commands.js';
import './enhanced_descriptions/application_commands.js';
import './enhanced_descriptions/application_commands.js';
import './enhanced_descriptions/cef_commands.js';
import './enhanced_descriptions/core_commands.js';
import './enhanced_descriptions/db_user_commands.js';
import './enhanced_descriptions/dictionary_commands.js';
import './enhanced_descriptions/discovery_commands.js';
import './enhanced_descriptions/ds_user_commands.js';
import './enhanced_descriptions/host_commands.js';
import './enhanced_descriptions/import_commands.js';
import './enhanced_descriptions/instance_commands.js';
import './enhanced_descriptions/license_commands.js';
import './enhanced_descriptions/object_group_commands.js';
import './enhanced_descriptions/parameters_commands.js';
import './enhanced_descriptions/periodic_task_commands.js';
import './enhanced_descriptions/query_group_commands.js';
import './enhanced_descriptions/report_gen_commands.js';
import './enhanced_descriptions/reports_commands.js';
import './enhanced_descriptions/role_commands.js';
import './enhanced_descriptions/schedule_commands.js';
import './enhanced_descriptions/server_commands.js';
import './enhanced_descriptions/ssl_key_group_commands.js';
import './enhanced_descriptions/static_masking_commands.js';
import './enhanced_descriptions/subscriber_commands.js';
import './enhanced_descriptions/tag_commands.js';

const execAsync = promisify(exec);
const DEFAULT_CLI_EXECUTABLE = 'dscli';

interface CommandExecutionResult {
  command: string;
  stdout: string;
  stderr: string;
  error?: string;
  exitCode: number;
  stepName?: string; // Added for sequence results
  description?: string; // Added for sequence results
  // For sequences, to carry overall success status
  overallSuccess?: boolean; 
  // For sequences, to carry step outputs
  stepOutputs?: any;
}

// For tools like set_cli_executable_path that return content directly
interface DirectContentResult {
    content: Array<{type: string, text: string}>;
    isError?: boolean;
}

// For get_enhanced_description
interface EnhancedDescriptionResult {
    found: boolean;
    description?: any;
    message?: string;
}

class DataSunriseCliServer {
  private server: Server;
  private mcpServer: BasicMCPServer; 
  private cliExecutable: string = DEFAULT_CLI_EXECUTABLE;
  private cliVerified: boolean = false;
  private maskRuleFailureCache: Map<string, { count: number; timestamp: number }> = new Map();

  constructor() {
    this.mcpServer = new BasicMCPServer(); 
    registerAllSequenceDescriptions();
    console.error('Enhanced sequence descriptions registered');

    const cliPathArgIndex = process.argv.indexOf('--cli-path');
    if (cliPathArgIndex > -1 && process.argv.length > cliPathArgIndex + 1) {
      this.cliExecutable = process.argv[cliPathArgIndex + 1];
      console.error(`DataSunrise CLI executable path set from --cli-path argument: ${this.cliExecutable}`);
    } else {
      console.error(`DataSunrise CLI executable path defaulting to: ${this.cliExecutable}`);
    }
    
    this.server = new Server(
      {
        name: 'datasunrise-cli',
        version: '0.5.1', 
  description: 'Provides tools for individual DataSunrise CLI commands. Supports configurable CLI path.',
      },
      {
        capabilities: { 
          resources: { dynamic: true }, 
          tools: { dynamic: true },
          prompts: { dynamic: true }
        },
      }
    );
    this.populateMcpServer();
    this.setupRequestHandlers(); 
    this.server.onerror = (error: any) => {
      if (error instanceof SyntaxError && 
          (error.message.includes('Unexpected end of JSON input') || 
           error.message.includes('Unexpected token') ||
           error.message.includes('is not valid JSON'))) {
        console.warn('[MCP Info] Received non-JSON input. This is expected when running directly in a terminal. ' +
                     'The server is waiting for valid JSON messages from an MCP client.');
      } else if (process.argv.includes('--verbose')) {
        console.error('[MCP Error]', error);
      } else {
        console.error(`[MCP Error] ${error.name}: ${error.message}`);
      }
    };
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private populateMcpServer(): void {
    const sessionTokenParam: CliParam = {
      name: 'sessionToken',
      type: 'string',
      description: 'Session token to execute command at specified DataSunrise backend application',
      required: false,
      cliName: '-sessionToken'
    };

    allCliCommands.forEach(cmd => {
      if (cmd.toolName !== 'connect' && cmd.toolName !== 'connectOAuth2') {
        if (!cmd.params.some(p => p.name === 'sessionToken')) {
          cmd.params.push(sessionTokenParam);
        }
      }
    });

    this.mcpServer.addTool('run_cli_command', new Tool({
      description: 'Executes a DataSunrise CLI command. Use `get_command_schema` to get the input schema for a specific command.',
      inputSchema: {
        type: 'object',
        properties: {
          command_name: {
            type: 'string',
            description: 'The name of the CLI command to execute.',
            enum: allCliCommands.map(cmd => cmd.toolName)
          },
          arguments: {
            type: 'object',
            description: 'The arguments for the command.',
            properties: {},
            additionalProperties: true
          }
        },
        required: ['command_name']
      },
      execute: async (args: any): Promise<CommandExecutionResult> => {
        const { command_name, arguments: commandArgs } = args;
        const commandDef = allCliCommands.find(cmd => cmd.toolName === command_name);

        if (!commandDef) {
          throw new McpError(ErrorCode.InvalidParams, `Unknown command: ${command_name}`);
        }
        
        return this.executeCliCommand(commandDef, commandArgs || {});
      }
    }));

    this.mcpServer.addTool('get_command_schema', new Tool({
        description: 'Retrieves the input schema for a specific CLI command.',
        inputSchema: {
            type: 'object',
            properties: {
                command_name: {
                    type: 'string',
                    description: 'The name of the command to get the schema for.',
                    enum: allCliCommands.map(cmd => cmd.toolName)
                }
            },
            required: ['command_name']
        },
        execute: async (args: any): Promise<any> => {
            const { command_name } = args;
            const commandDef = allCliCommands.find(cmd => cmd.toolName === command_name);
            if (!commandDef) {
                throw new McpError(ErrorCode.InvalidParams, `Unknown command: ${command_name}`);
            }
            return this.buildInputSchema(commandDef.params, command_name);
        }
    }));

    this.mcpServer.addTool('set_cli_executable_path', new Tool({
      description: 'Sets the path for the dscli executable for this session and verifies it.',
      inputSchema: {
        type: 'object',
        properties: { path: { type: 'string', description: 'The absolute path to the dscli executable.'} },
        required: ['path']
      },
      execute: async (args: any): Promise<DirectContentResult> => {
        if (args && typeof args.path === 'string') {
          this.cliExecutable = args.path;
          const verified = await this.verifyCliExecutable(this.cliExecutable);
          if (verified) {
            return { content: [{ type: 'text', text: `DataSunrise CLI executable path set and verified: ${this.cliExecutable}` }]};
          } else {
            return { 
              content: [{ type: 'text', text: `DataSunrise CLI executable path set to: ${this.cliExecutable}, but verification FAILED.` }],
              isError: true 
            };
          }
        }
        throw new McpError(ErrorCode.InvalidParams, 'Path argument is required for set_cli_executable_path.');
      }
    }));

    this.mcpServer.addTool('get_enhanced_description', new Tool({
      description: 'Retrieves enhanced documentation for a command or sequence',
      inputSchema: {
        type: 'object',
        properties: { 
          name: { type: 'string', description: 'Name of the command or sequence'},
          isSequence: { type: 'boolean', description: 'Whether this is a sequence (true) or command (false)', default: false }
        },
        required: ['name']
      },
      execute: async (args: any): Promise<any> => {
        const name = args.name as string;
        const isSequence = !!args.isSequence;
        if (isSequence) {
          return { found: false, message: `Sequences are no longer supported.` };
        }
        const commandDef = allCliCommands.find(cmd => cmd.toolName === name);
        if (!commandDef) {
            throw new McpError(ErrorCode.InvalidParams, `Unknown command: ${name}`);
        }
        return this.buildInputSchema(commandDef.params, name);
      }
    }));
  }
  
  private static readonly ListResourcesRequestSchemaPlaceholder = z.object({
    method: z.literal('resources/list'),
    params: z.object({}).optional().nullable(), 
  });

  private static readonly ListPromptsRequestSchemaPlaceholder = z.object({
    method: z.literal('prompts/list'),
    params: z.object({}).optional().nullable(),
  });

  private setupRequestHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const toolsList = this.mcpServer.listTools();
      return { tools: toolsList };
    });
    
    this.server.setRequestHandler(DataSunriseCliServer.ListPromptsRequestSchemaPlaceholder, async () => {
        const promptsList = this.mcpServer.listPrompts();
        return { prompts: promptsList };
    });

    this.server.setRequestHandler(DataSunriseCliServer.ListResourcesRequestSchemaPlaceholder, async (): Promise<ListResourcesResult> => {
      const resourceInfoList = this.mcpServer.listResources(); 
      const resources = resourceInfoList.map(r => ({
        name: r.uri, 
        uri: r.uri,
        description: r.description,
        data: null, 
        mimeType: undefined, 
      }));
      return { resources }; 
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      let toolName = 'unknown'; 
      try {
        if (!request.params) {
          throw new McpError(ErrorCode.InvalidParams, 'Request params are undefined.');
        }
        toolName = request.params.name; 
        const args = request.params.arguments;

        const toolToExecute = this.mcpServer.getTool(toolName);

        if (toolToExecute) {
          const executionResult: any = await toolToExecute.execute(args);
          let responseIsError = false;

          if (toolName === 'set_cli_executable_path') {
            responseIsError = !!(executionResult as DirectContentResult).isError;
          } else if (toolName === 'run_cli_command') {
            const cliResult = executionResult as CommandExecutionResult;
            responseIsError = cliResult.exitCode !== 0 || !!cliResult.error;
          } else if (toolName === 'get_enhanced_description') {
            responseIsError = !(executionResult as EnhancedDescriptionResult).found;
          }
          
          return {
            content: [{ type: 'text', text: JSON.stringify(executionResult, null, 2) }],
            isError: responseIsError,
          };
        }
        
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${toolName}`);
      } catch (error: any) {
        console.error(`[MCP Error] Error processing tool ${toolName}:`, error.message, error.stack);
        if (error instanceof McpError) {
          throw error; 
        }
        throw new McpError(ErrorCode.InternalError, `Error processing tool ${toolName}: ${error.message || String(error)}`);
      }
    });
  }

  private async verifyCliExecutable(pathToVerify: string): Promise<boolean> {
    const pathsToTry: string[] = [pathToVerify];
    const baseDir = path.dirname(pathToVerify) + path.sep;
    const baseName = path.basename(pathToVerify);
    
    if (!baseName.endsWith('.sh')) {
      pathsToTry.push(path.join(baseDir, 'executecommand.sh'));
    }
    if (!baseName.endsWith('.bat')) {
      pathsToTry.push(path.join(baseDir, 'executecommand.bat'));
    }
    
    const classpath = process.platform === 'win32' 
      ? `"${path.join(baseDir, 'lib')}${path.sep}*"` 
      : `"${path.join(baseDir, 'lib')}${path.sep}*"`;
    const javaFallbackCmd = `java -Xms128m -Xmx128m -cp ${classpath} com.fw.console.client.cli.Main`;
    
    for (const currentPath of pathsToTry) {
      try {
        console.error(`Verifying dscli at: ${currentPath} by running it without arguments.`);
        const { stdout, stderr } = await execAsync(`"${currentPath}"`);
        if (stdout.includes("Commands:") || stderr.includes("Commands:")) {
          console.error(`dscli successfully verified at: ${currentPath} (detected help output)`);
          this.cliExecutable = currentPath;
          this.cliVerified = true;
          return true;
        } else {
          console.warn(`Output from '${currentPath}' did not contain expected help text. stdout: ${stdout}, stderr: ${stderr}`);
        }
      } catch (e: any) {
        if (e.stderr && e.stderr.includes("Cannot read information from")) {
          console.error(`dscli verified at: ${currentPath} (detected state.txt error, which means script ran)`);
          this.cliExecutable = currentPath;
          this.cliVerified = true;
          return true;
        }
        console.warn(`Failed with ${currentPath}: ${e.message}`);
      }
    }
    
    try {
      console.error(`Trying direct Java execution as fallback`);
      const { stdout, stderr } = await execAsync(javaFallbackCmd);
      if (stdout.includes("Commands:") || stderr.includes("Commands:")) {
        console.error(`Java execution successful. Using direct Java command.`);
        this.cliExecutable = javaFallbackCmd;
        this.cliVerified = true;
        return true;
      }
    } catch (e: any) {
      if (e.stderr && e.stderr.includes("Cannot read information from")) {
        console.error(`Java execution verified (detected state.txt error). Using direct Java command.`);
        this.cliExecutable = javaFallbackCmd;
        this.cliVerified = true;
        return true;
      }
      console.error(`Java fallback also failed: ${e.message}`);
    }
    
    console.error(`All CLI verification attempts failed. Could not find a working executable.`);
    this.cliVerified = false;
    return false;
  }

  private buildInputSchema(params: CliParam[], commandName: string): any {
    const properties: { [key: string]: any } = {};
    const requiredParams: string[] = [];
    params.forEach(p => {
      const enhancedDescription = getCommandParameterHelp(commandName, p.name);
      const schema: any = { 
        type: p.type, 
        description: enhancedDescription || p.description 
      };
      if (p.defaultValue !== undefined) {
        schema.default = p.defaultValue;
      }
      properties[p.name] = schema;
      if (p.required) {
        requiredParams.push(p.name);
      }
    });
    return {
      type: 'object',
      properties,
      required: requiredParams.length > 0 ? requiredParams : undefined,
    };
  }

  private async executeCliCommand(commandDef: CliCommand, commandArgs: any): Promise<CommandExecutionResult> {
    if (!this.cliVerified) {
      console.error(`CLI path '${this.cliExecutable}' not verified. Attempting verification now.`);
      await this.verifyCliExecutable(this.cliExecutable); 
      if (!this.cliVerified) {
        throw new McpError(ErrorCode.InvalidParams, `DataSunrise CLI executable ('${this.cliExecutable}') not found or failed verification. Error: PrerequisiteNotMet. Please set a valid path using 'set_cli_executable_path' tool or provide it via the --cli-path server startup argument.`);
      }
    }

    let cliCmdString = commandDef.baseCommand;
    const simpleAddRuleCommands = ['addAuditRule', 'addSecurityRule', 'addMaskRule', 'addLearnRule'];
    const isSimpleAddRuleRequest = (!commandArgs || Object.keys(commandArgs).length === 0) &&
                                simpleAddRuleCommands.includes(commandDef.baseCommand);

    if (isSimpleAddRuleRequest) {
      console.error(`[MCP Info] Detected simple add rule request for ${commandDef.toolName}. Base command: ${commandDef.baseCommand}`);
      const nameParamDef = commandDef.params.find(p => p.name === 'name');
      if (nameParamDef) { 
        if (nameParamDef.required || commandDef.baseCommand.startsWith('add')) { 
            const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 14); 
            const ruleTypeForName = commandDef.baseCommand.substring(3); 
            const defaultName = `Default_${ruleTypeForName}_${timestamp}`;
            console.error(`[MCP Info] No name provided for simple add. Generated default name: ${defaultName}`);
            cliCmdString += ` ${nameParamDef.cliName} "${defaultName}"`; 
        }
      } else {
        console.warn(`[MCP Warning] 'name' parameter definition not found for ${commandDef.toolName}, though it's an add rule command. Proceeding without adding a name.`);
      }

      if (commandDef.baseCommand === 'addAuditRule' || commandDef.baseCommand === 'addSecurityRule') {
        const enableParamDef = commandDef.params.find(p => p.name === 'enable');
        if (enableParamDef) {
          console.error(`[MCP Info] Simple add for ${commandDef.baseCommand}, adding: ${enableParamDef.cliName} true`);
          cliCmdString += ` ${enableParamDef.cliName} true`;
        } else {
          console.warn(`[MCP Warning] 'enable' parameter definition not found for ${commandDef.toolName}, cannot add default -enable true.`);
        }
      }
    } else {
      for (const param of commandDef.params) {
        let currentValue = commandArgs?.[param.name];

        if (param.name === 'enable' &&
            (commandDef.baseCommand === 'addAuditRule' || commandDef.baseCommand === 'addSecurityRule') &&
            commandArgs?.enable === undefined) {
          currentValue = 'true'; 
          console.error(`[MCP Info] Defaulting -enable to string 'true' for ${commandDef.baseCommand}`);
        } else if (currentValue === undefined && param.defaultValue !== undefined) {
          currentValue = param.defaultValue;
        }

        if (commandDef.toolName === 'core_show_state' && param.name === 'dsServer' && currentValue === 'localhost') {
          currentValue = '127.0.0.1';
          console.error(`[MCP Info] Automatically converted 'localhost' to '127.0.0.1' for dsServer parameter in core_show_state.`);
        }

        if (param.type === 'boolean') {
          if (currentValue === true || String(currentValue).toLowerCase() === 'true') {
            console.error(`[DEBUG] Boolean Param (true): "${param.cliName}", Input/Default: ${currentValue}, Appending flag.`);
            cliCmdString += ` ${param.cliName}`;
          } else {
            console.error(`[DEBUG] Boolean Param (false): "${param.cliName}", Input/Default: ${currentValue}, Omitting flag.`);
          }
        } else { 
          if (param.required && currentValue === undefined) {
            throw new McpError(ErrorCode.InvalidParams, `Missing required parameter: ${param.name} for command ${commandDef.toolName}`);
          }

          if (currentValue !== undefined) {
            let valueStr = String(currentValue);
            if (commandDef.toolName === 'license_update_key' && param.name === 'key') {
              valueStr = valueStr.replace(/"/g, '\\"');
            }
            if (typeof valueStr === 'string' &&
                (valueStr.includes(' ') ||
                 valueStr.includes('"') || 
                 valueStr.includes('\'') ||
                 valueStr.includes(':') ||
                 valueStr.includes('{') ||
                 valueStr.includes('}') ||
                 valueStr.includes('\\') || 
                 valueStr.includes('=') )) {
              valueStr = `"${valueStr}"`;
            }
            console.error(`[DEBUG] NonBoolean Param: "${param.cliName}", CLI Value: "${valueStr}"`);
            cliCmdString += ` ${param.cliName} ${valueStr}`;
          }
        }
      }
    }
    const fullCliCommand = `"${this.cliExecutable}" ${cliCmdString}`; 
    console.error(`Executing: ${fullCliCommand}`);
    try {
      const { stdout, stderr } = await execAsync(fullCliCommand);
      if (commandDef.toolName === 'rule_add_masking' && commandArgs.maskColumns) {
        this.maskRuleFailureCache.delete(commandArgs.maskColumns);
      }
      return { command: cliCmdString, stdout, stderr, exitCode: 0 };
    } catch (e: any) {
      if (e.message?.includes('ENOENT') || e.code === 127) {
         this.cliVerified = false; 
         console.error(`Execution failed because dscli was not found at '${this.cliExecutable}'. Marking as unverified.`);
         throw new McpError(ErrorCode.InvalidParams, `DataSunrise CLI executable ('${this.cliExecutable}') could not be executed. Path may be invalid. Error: PrerequisiteNotMet. Please re-verify the path.`);
      }

      let finalStderr = e.stderr || '';
      if (commandDef.toolName === 'rule_add_masking' && finalStderr.includes('is not in metadata cache')) {
        const match = finalStderr.match(/\[(.*?)\] is not in metadata cache/);
        const objectIdentifier = match ? match[1] : 'Unknown Object';
        const instanceName = commandArgs.instance || 'the specified instance';
        const cacheKey = commandArgs.maskColumns;

        const failureRecord = this.maskRuleFailureCache.get(cacheKey) || { count: 0, timestamp: 0 };
        const now = Date.now();

        if (now - failureRecord.timestamp > 300000) {
            failureRecord.count = 0;
        }

        failureRecord.count++;
        failureRecord.timestamp = now;
        this.maskRuleFailureCache.set(cacheKey, failureRecord);

        let promptMessage;
        if (failureRecord.count > 1) {
          this.maskRuleFailureCache.delete(cacheKey);
          promptMessage = `MCP-PROMPT:{"message":"Metadata for instance '${instanceName}' was updated, but the object '${objectIdentifier}' was still not found. The specified Database, Schema, Table, or Column likely does not exist. Please correct the name and try again."}`;
        } else {
          promptMessage = `MCP-PROMPT:{"message":"The specified object '${objectIdentifier}' was not found in the metadata. This can happen if the database schema has changed. Please verify that the object exists and the name is correct. Would you like to try updating the metadata for instance '${instanceName}'?","suggested_tool":"instance_update_metadata","tool_args":{"instance":"${instanceName}"}}`;
        }
        finalStderr = `${promptMessage}\n${finalStderr}`;
      }
      
      return { command: cliCmdString, stdout: e.stdout || '', stderr: finalStderr, error: e.message, exitCode: e.code || 1 };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.verifyCliExecutable(this.cliExecutable);
    await this.server.connect(transport);
    console.error(`DataSunrise CLI MCP server (v0.5.1 - modular commands & sequences, configurable CLI path) running on stdio. CLI Verified: ${this.cliVerified}`);
  }
}

const server = new DataSunriseCliServer();
server.run().catch(error => {
  console.error("Server run failed:", error);
  if (error instanceof McpError) {
    // Log McpError specifically if needed
  }
  process.exit(1); 
});
