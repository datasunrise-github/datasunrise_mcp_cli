/**
 * MCP Server Integration for Context-Aware Help System
 * 
 * This file demonstrates how to integrate the context-aware help system
 * into an MCP server to make it accessible to LLMs.
 * 
 * NOTE: This is a reference implementation that shows the integration concepts.
 * It is not meant to be compiled directly as it references hypothetical framework
 * components and would need to be adapted to your actual MCP server implementation.
 */

import { 
  helpRepository, 
  initializeHelp, 
  getContextualHelp, 
  searchHelp, 
  HelpContext, 
  HelpContentType, 
  DifficultyLevel,
  CommandHelp
} from './context_aware_help.js';

// Import server framework
import { MCPServer, Resource, Tool } from './mcp_server_framework.js';

// Import commands and sequences
import { allCliCommands as allCommands } from './commands/index.js';

/**
 * Initializes the context-aware help system and registers all MCP server resources and tools
 * @param server The MCP server instance
 */
export function registerHelpSystem(server: MCPServer): void {
  // Initialize the help repository with all commands
  console.log('Initializing context-aware help system...');
  initializeHelp(allCommands);
  console.log(`Initialized help for ${Object.keys(allCommands).length} commands`);

  // Register direct help resources
  registerHelpResources(server);
  
  // Register help tools
  registerHelpTools(server);
  
  console.log('Context-aware help system integration complete');
}

/**
 * Registers direct help resources with the MCP server
 * @param server The MCP server instance
 */
function registerHelpResources(server: MCPServer): void {
  // Register the full help repository as a resource
  server.addResource(
    'help/repository',
    new Resource({
      description: 'Complete help repository containing all documentation',
      getData: () => helpRepository
    })
  );
  
  // Register all commands help as a resource
  server.addResource(
    'help/commands',
    new Resource({
      description: 'Documentation for all CLI commands',
      getData: () => {
        const commands: Record<string, any> = {};
        allCommands.forEach(cmd => {
          const help = helpRepository.getCommandHelp(cmd.toolName);
          if (help) {
            commands[cmd.toolName] = help;
          }
        });
        return commands;
      }
    })
  );
}

/**
 * Registers help tools with the MCP server
 * @param server The MCP server instance
 */
function registerHelpTools(server: MCPServer): void {
  // 1. Contextual help tool - Get contextually relevant help based on user context
  server.addTool(
    'get_contextual_help',
    new Tool({
      description: 'Get context-aware help for DataSunrise CLI commands based on the current context',
      inputSchema: {
        type: 'object',
        properties: {
          currentCommand: { type: 'string', description: 'Current command being used (if any)' },
          currentOperation: { type: 'string', description: 'Current operation being attempted' },
          history: { 
            type: 'array', 
            items: { type: 'string' },
            description: 'Previous commands or steps' 
          },
          errorMessage: { type: 'string', description: 'Error message if help is requested after an error' },
          userSkillLevel: { 
            type: 'string', 
            enum: Object.values(DifficultyLevel),
            description: 'User\'s apparent skill level' 
          },
          databaseType: { type: 'string', description: 'Database type if known' },
          problematicParameters: { 
            type: 'array', 
            items: { type: 'string' },
            description: 'Specific parameters the user is struggling with' 
          },
          userGoal: { type: 'string', description: 'User\'s goal if known' },
          environment: { type: 'string', description: 'Current environment (prod, dev, test)' }
        }
      },
      execute: (params: any) => {
        const context: HelpContext = {
          currentCommand: params.currentCommand,
          currentOperation: params.currentOperation,
          history: params.history,
          errorMessage: params.errorMessage,
          userSkillLevel: params.userSkillLevel as DifficultyLevel,
          databaseType: params.databaseType,
          problematicParameters: params.problematicParameters,
          userGoal: params.userGoal,
          environment: params.environment
        };
        
        return getContextualHelp(context);
      }
    })
  );
  
  // 2. Help search tool - Find specific help content by keywords
  server.addTool(
    'search_help',
    new Tool({
      description: 'Search for help content based on keywords',
      inputSchema: {
        type: 'object',
        properties: {
          query: { 
            type: 'string', 
            description: 'Search query',
            minLength: 1
          },
          contentTypes: { 
            type: 'array', 
            items: { 
              type: 'string', 
              enum: Object.values(HelpContentType) 
            },
            description: 'Types of content to search for (optional)' 
          }
        },
        required: ['query']
      },
      execute: (params: any) => {
        return searchHelp(params.query, params.contentTypes);
      }
    })
  );
  
  // 3. Command help tool - Get detailed help for a specific command
  server.addTool(
    'get_command_help',
    new Tool({
      description: 'Get detailed help for a specific command',
      inputSchema: {
        type: 'object',
        properties: {
          commandName: { 
            type: 'string', 
            description: 'Name of the command',
            minLength: 1
          }
        },
        required: ['commandName']
      },
      execute: (params: any) => {
        const helpContent = helpRepository.getCommandHelp(params.commandName);
        
        if (!helpContent) {
          throw new Error(`No help found for command: ${params.commandName}`);
        }
        
        return helpContent;
      }
    })
  );
  
  // 5. Error resolution tool - Get help for resolving a specific error
  server.addTool(
    'get_error_help',
    new Tool({
      description: 'Get help for resolving a specific error',
      inputSchema: {
        type: 'object',
        properties: {
          errorMessage: { 
            type: 'string', 
            description: 'The error message to get help for',
            minLength: 1
          }
        },
        required: ['errorMessage']
      },
      execute: (params: any) => {
        const context: HelpContext = {
          errorMessage: params.errorMessage
        };
        
        const helpContent = getContextualHelp(context);
        
        // Filter for only error-related content
        const errorHelp = helpContent.filter(item => 
          item.metadata.contentType === HelpContentType.ERROR
        );
        
        if (errorHelp.length === 0) {
          // If no specific error help found, return general help
          return {
            message: "No specific error help found for this error message.",
            generalHelp: helpContent
          };
        }
        
        return errorHelp;
      }
    })
  );
  
  // 6. Parameter help tool - Get detailed help for a specific parameter
  server.addTool(
    'get_parameter_help',
    new Tool({
      description: 'Get detailed help for a specific parameter of a command',
      inputSchema: {
        type: 'object',
        properties: {
          command: { 
            type: 'string', 
            description: 'The command name',
            minLength: 1
          },
          parameter: { 
            type: 'string', 
            description: 'The parameter name',
            minLength: 1
          }
        },
        required: ['command', 'parameter']
      },
      execute: (params: any) => {
        const helpContent = helpRepository.getCommandHelp(params.command);
        
        if (!helpContent || !helpContent.parameters) {
          throw new Error(`No help found for ${params.command} or its parameters`);
        }
        
        const paramHelp = helpContent.parameters[params.parameter];
        
        if (!paramHelp) {
          throw new Error(`No help found for parameter ${params.parameter} of ${params.command}`);
        }
        
        return paramHelp;
      }
    })
  );
  
  // 7. Workflow help tool - Get help for accomplishing a specific task or goal
  server.addTool(
    'get_workflow_help',
    new Tool({
      description: 'Get help for accomplishing a specific task or goal',
      inputSchema: {
        type: 'object',
        properties: {
          goal: { 
            type: 'string', 
            description: 'Description of the goal or task',
            minLength: 1
          },
          databaseType: { 
            type: 'string', 
            description: 'Type of database (optional)',
          },
          userSkillLevel: { 
            type: 'string', 
            enum: Object.values(DifficultyLevel),
            description: 'User\'s skill level (optional)' 
          }
        },
        required: ['goal']
      },
      execute: (params: any) => {
        const context: HelpContext = {
          userGoal: params.goal,
          databaseType: params.databaseType,
          userSkillLevel: params.userSkillLevel as DifficultyLevel
        };
        
        const helpContent = getContextualHelp(context);
        
        // Prioritize workflow help
        const workflowHelp = helpContent.filter(item => 
          item.metadata.contentType === HelpContentType.WORKFLOW
        );
        
        if (workflowHelp.length > 0) {
          return workflowHelp;
        }
        
        // If no specific workflow help, return general help
        return helpContent;
      }
    })
  );
}

/**
 * Example of how to use the help system within an LLM's response generation
 * @param query User query
 * @param context Current interaction context
 * @returns LLM response enhanced with help content
 */
export function enhanceLLMResponseWithHelp(query: string, context: any): string {
  // Extract context information (this would be done by the LLM)
  const helpContext: HelpContext = {
    currentCommand: context.currentCommand,
    userGoal: query, // Use the query as the user goal
    userSkillLevel: inferUserSkillLevel(context.history),
    databaseType: extractDatabaseType(query)
  };
  
  // Get contextual help
  const helpContent = getContextualHelp(helpContext);
  
  // Use the help content to generate a more informed response
  // (this would be done by the LLM using its reasoning capabilities)
  let response = `Based on your question about ${helpContext.userGoal}, `;
  
  if (helpContent.length > 0) {
    const mostRelevant = helpContent[0];
    
    response += `I can provide information from our documentation on "${mostRelevant.title}".\n\n`;
    response += `${mostRelevant.description}\n\n`;
    
    if (mostRelevant.metadata.contentType === HelpContentType.COMMAND) {
      // Type cast to CommandHelp to access sampleUsage
      const commandHelp = mostRelevant as CommandHelp;
      
      if (commandHelp.sampleUsage && commandHelp.sampleUsage.length > 0) {
        response += `Here's an example of how to use it:\n\n${commandHelp.sampleUsage[0]}\n\n`;
      }
    }
  } else {
    response += `I don't have specific documentation on that topic, but I can help guide you through the process.`;
  }
  
  return response;
}

/**
 * Helper function to infer user skill level from interaction history
 * @param history Previous interaction history
 * @returns Inferred skill level
 */
function inferUserSkillLevel(history: string[]): DifficultyLevel {
  // This would be implemented with more sophisticated logic
  // based on the user's interaction patterns
  if (!history || history.length < 5) {
    return DifficultyLevel.BEGINNER;
  }
  
  // Check for advanced command usage in history
  const advancedCommands = ['rule_add_security', 'instance_update_metadata', 'static_masking_start'];
  const usesAdvancedCommands = history.some(item => 
    advancedCommands.some(cmd => item.includes(cmd))
  );
  
  if (usesAdvancedCommands) {
    return DifficultyLevel.ADVANCED;
  }
  
  return DifficultyLevel.INTERMEDIATE;
}

/**
 * Helper function to extract database type from query
 * @param query User query
 * @returns Extracted database type or undefined
 */
function extractDatabaseType(query: string): string | undefined {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('oracle')) return 'oracle';
  if (lowerQuery.includes('postgres') || lowerQuery.includes('postgresql')) return 'postgresql';
  if (lowerQuery.includes('mysql') || lowerQuery.includes('maria')) return 'mysql';
  if (lowerQuery.includes('sql server') || lowerQuery.includes('mssql')) return 'mssql';
  
  return undefined;
}
