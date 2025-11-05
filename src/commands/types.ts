export interface CliParam {
  name: string; // Argument name in the tool's inputSchema (e.g., dbHost)
  type: 'string' | 'number' | 'boolean';
  description: string;
  required: boolean;
  cliName: string; // Name of the parameter for the CLI (e.g., "-dbHost")
  defaultValue?: any; // Default value for optional parameters
}

export interface CliCommand {
  toolName: string; // MCP tool name (e.g., "instance_add_plus")
  description: string;
  baseCommand: string;
  params: CliParam[];
  category?: string; // Optional: to group commands, e.g., "Application", "Instance"
  highRiskOperation?: boolean; // Indicates if the operation is high risk (e.g., restart, stop core)
  requiresExplicitApproval?: boolean; // Indicates if the operation requires explicit user approval
  allowEmptyToolArguments?: boolean; // If true, an empty arguments object in use_mcp_tool will result in the baseCommand being run without any CLI parameters.
  dependencies?: {
    [key: string]: {
      oneOf: Array<{
        properties: {
          [propKey: string]: {
            enum?: string[];
            not?: { enum?: string[] };
            type?: string;
            minLength?: number;
            description?: string;
          };
        };
        required: string[];
      }>;
    };
  };
}
