/**
 * Context-Aware Help Documentation System for DataSunrise CLI MCP
 * 
 * This module provides a comprehensive help system designed specifically for LLM consumption.
 * It structures documentation in a way that enables LLMs to understand context, relationships,
 * and usage patterns, making it easier to provide relevant assistance to users.
 */

import { CliCommand } from './commands/types.js';

/**
 * Types of help content available in the system
 */
export enum HelpContentType {
  /**
   * Help for a specific command
   */
  COMMAND = 'command',
  
  /**
   * Help for a parameter
   */
  PARAMETER = 'parameter',
  
  /**
   * General concept explanation
   */
  CONCEPT = 'concept',
  
  /**
   * Error explanation and resolution
   */
  ERROR = 'error',
  
  /**
   * Usage example
   */
  EXAMPLE = 'example',
  
  /**
   * Workflow guide
   */
  WORKFLOW = 'workflow'
}

/**
 * Context tags for help content to enable contextual relevance
 */
export enum ContextTag {
  // Database types
  ORACLE = 'oracle',
  POSTGRESQL = 'postgresql',
  MYSQL = 'mysql',
  MSSQL = 'mssql',
  
  // Feature areas
  SECURITY = 'security',
  AUDIT = 'audit',
  MASKING = 'masking',
  MONITORING = 'monitoring',
  
  // User roles
  ADMIN = 'admin',
  DEVELOPER = 'developer',
  SECURITY_ADMIN = 'security_admin',
  
  // Usage patterns
  GETTING_STARTED = 'getting_started',
  ADVANCED = 'advanced',
  TROUBLESHOOTING = 'troubleshooting',
  
  // Environments
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TESTING = 'testing'
}

/**
 * Difficulty level of help content
 */
export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

/**
 * Metadata for help content that enables better LLM understanding
 */
export interface HelpMetadata {
  /**
   * Type of help content
   */
  contentType: HelpContentType;
  
  /**
   * Context tags to help match content to user context
   */
  contextTags: ContextTag[];
  
  /**
   * Difficulty level of the content
   */
  difficulty: DifficultyLevel;
  
  /**
   * Related topics, commands, or sequences
   */
  relatedTopics?: string[];
  
  /**
   * Keywords for improved search and matching
   */
  keywords?: string[];
  
  /**
   * Categories for organizational grouping
   */
  categories?: string[];
  
  /**
   * Applicability constraints (when this help is relevant)
   */
  applicableWhen?: string;
  
  /**
   * Last updated timestamp
   */
  lastUpdated?: string;
}

/**
 * Basic help content structure
 */
export interface HelpContent {
  /**
   * Unique identifier for this help content
   */
  id: string;
  
  /**
   * Title or name of the help content
   */
  title: string;
  
  /**
   * Brief summary (1-2 sentences)
   */
  summary: string;
  
  /**
   * Detailed explanation
   */
  description: string;
  
  /**
   * Metadata for contextual relevance
   */
  metadata: HelpMetadata;
  
  /**
   * Usage examples
   */
  examples?: string[];
  
  /**
   * Common errors and resolutions
   */
  commonErrors?: Array<{error: string, resolution: string}>;
  
  /**
   * Additional notes or tips
   */
  notes?: string[];
}

/**
 * Help content specific to a command
 */
export interface CommandHelp extends HelpContent {
  /**
   * The command this help is for
   */
  command: string;
  
  /**
   * Parameter-specific help
   */
  parameters?: Record<string, ParameterHelp>;
  
  /**
   * Sample command execution
   */
  sampleUsage: string[];
  
  /**
   * Expected output examples
   */
  sampleOutput?: string[];
  
  /**
   * Alternative commands that achieve similar results
   */
  alternatives?: string[];
}

/**
 * Help content specific to a parameter
 */
export interface ParameterHelp {
  /**
   * Parameter name
   */
  name: string;
  
  /**
   * Brief description
   */
  description: string;
  
  /**
   * Data type
   */
  type: string;
  
  /**
   * Valid values or format
   */
  validValues?: string;
  
  /**
   * Default value if any
   */
  defaultValue?: string;
  
  /**
   * Required or optional
   */
  required: boolean;
  
  /**
   * Security sensitivity
   */
  sensitive?: boolean;
  
  /**
   * Value examples
   */
  examples?: string[];
  
  /**
   * Related parameters (often used together)
   */
  relatedParameters?: string[];
}

/**
 * Help content specific to a workflow
 */
export interface WorkflowHelp extends HelpContent {
  /**
   * Steps in the workflow
   */
  workflowSteps: Array<{
    step: number,
    title: string,
    description: string,
    commands: string[]
  }>;
  
  /**
   * Decision points in the workflow
   */
  decisionPoints?: Array<{
    id: string,
    question: string,
    options: Array<{
      option: string,
      nextStep: number
    }>
  }>;
  
  /**
   * Prerequisites for this workflow
   */
  prerequisites: string[];
  
  /**
   * Expected outcomes
   */
  outcomes: string[];
  
  /**
   * Visual flow diagram (mermaid or ASCII)
   */
  flowDiagram?: string;
}

/**
 * Context for a help request
 */
export interface HelpContext {
  /**
   * Command or sequence being used (if any)
   */
  currentCommand?: string;
  
  /**
   * Current operation being attempted
   */
  currentOperation?: string;
  
  /**
   * Previous commands or steps
   */
  history?: string[];
  
  /**
   * Error message if help is requested after an error
   */
  errorMessage?: string;
  
  /**
   * User's apparent skill level
   */
  userSkillLevel?: DifficultyLevel;
  
  /**
   * Database type if known
   */
  databaseType?: string;
  
  /**
   * Specific parameters the user is struggling with
   */
  problematicParameters?: string[];
  
  /**
   * User's goal if known
   */
  userGoal?: string;
  
  /**
   * Current environment (prod, dev, test)
   */
  environment?: string;
}

/**
 * Repository of all help content
 */
class HelpRepository {
  private commandHelp: Record<string, CommandHelp> = {};
  private parameterHelp: Record<string, ParameterHelp> = {};
  private conceptHelp: Record<string, HelpContent> = {};
  private errorHelp: Record<string, HelpContent> = {};
  private workflowHelp: Record<string, WorkflowHelp> = {};
  
  /**
   * Registers command help content
   * @param help Command help content
   */
  registerCommandHelp(help: CommandHelp): void {
    this.commandHelp[help.command] = help;
  }
  
  /**
   * Registers concept help content
   * @param help Concept help content
   */
  registerConceptHelp(help: HelpContent): void {
    this.conceptHelp[help.id] = help;
  }
  
  /**
   * Registers error help content
   * @param help Error help content
   */
  registerErrorHelp(help: HelpContent): void {
    this.errorHelp[help.id] = help;
  }
  
  /**
   * Registers workflow help content
   * @param help Workflow help content
   */
  registerWorkflowHelp(help: WorkflowHelp): void {
    this.workflowHelp[help.id] = help;
  }
  
  /**
   * Gets help content for a command
   * @param commandName Command name
   * @returns Command help content if found
   */
  getCommandHelp(commandName: string): CommandHelp | undefined {
    return this.commandHelp[commandName];
  }
  
  /**
   * Gets help content for a concept
   * @param conceptId Concept ID
   * @returns Concept help content if found
   */
  getConceptHelp(conceptId: string): HelpContent | undefined {
    return this.conceptHelp[conceptId];
  }
  
  /**
   * Gets help content for an error
   * @param errorId Error ID
   * @returns Error help content if found
   */
  getErrorHelp(errorId: string): HelpContent | undefined {
    return this.errorHelp[errorId];
  }
  
  /**
   * Gets help content for a workflow
   * @param workflowId Workflow ID
   * @returns Workflow help content if found
   */
  getWorkflowHelp(workflowId: string): WorkflowHelp | undefined {
    return this.workflowHelp[workflowId];
  }
  
  /**
   * Searches for help content based on keywords
   * @param query Search query
   * @param contentTypes Types of content to search (default: all)
   * @returns Matching help content
   */
  searchHelp(query: string, contentTypes?: HelpContentType[]): HelpContent[] {
    const results: HelpContent[] = [];
    const searchTerms = query.toLowerCase().split(/\s+/);
    
    // Helper function to check if content matches search terms
    const matches = (content: HelpContent): boolean => {
      const text = `${content.title} ${content.summary} ${content.description} ${content.metadata.keywords?.join(' ') || ''}`.toLowerCase();
      return searchTerms.every(term => text.includes(term));
    };
    
    // If no content types specified, search all
    const types = contentTypes || Object.values(HelpContentType);
    
    // Search in each content type
    for (const type of types) {
      switch (type) {
        case HelpContentType.COMMAND:
          results.push(...Object.values(this.commandHelp).filter(matches));
          break;
        case HelpContentType.CONCEPT:
          results.push(...Object.values(this.conceptHelp).filter(matches));
          break;
        case HelpContentType.ERROR:
          results.push(...Object.values(this.errorHelp).filter(matches));
          break;
        case HelpContentType.WORKFLOW:
          results.push(...Object.values(this.workflowHelp).filter(matches));
          break;
      }
    }
    
    return results;
  }
  
  /**
   * Finds contextually relevant help based on the current context
   * @param context Current help context
   * @returns Contextually relevant help content
   */
  findContextualHelp(context: HelpContext): HelpContent[] {
    const results: HelpContent[] = [];
    
    // If user has an error, prioritize error help
    if (context.errorMessage) {
      // Look for error help that matches the error message
      const errorHelp = Object.values(this.errorHelp).filter(help => 
        context.errorMessage?.includes(help.id) || 
        help.metadata.keywords?.some(keyword => context.errorMessage?.includes(keyword))
      );
      results.push(...errorHelp);
    }
    
    // If user is working with a specific command, include command help
    if (context.currentCommand) {
      const commandHelp = this.getCommandHelp(context.currentCommand);
      if (commandHelp) {
        results.push(commandHelp);
      }
      
      // Also include related commands
      if (commandHelp?.metadata.relatedTopics) {
        for (const related of commandHelp.metadata.relatedTopics) {
          const relatedHelp = this.getCommandHelp(related);
          if (relatedHelp) {
            results.push(relatedHelp);
          }
        }
      }
    }
    
    // If user has a specific goal, find relevant workflows
    if (context.userGoal) {
      const goal = context.userGoal.toLowerCase();
      const workflowHelp = Object.values(this.workflowHelp).filter(help => 
        help.title.toLowerCase().includes(goal) || 
        help.summary.toLowerCase().includes(goal) ||
        help.metadata.keywords?.some(keyword => goal.includes(keyword.toLowerCase()))
      );
      results.push(...workflowHelp);
    }
    
    // Add content relevant to user's skill level
    if (context.userSkillLevel) {
      // For beginners, include getting started content
      if (context.userSkillLevel === DifficultyLevel.BEGINNER) {
        const beginnerContent = Object.values(this.conceptHelp).filter(help => 
          help.metadata.difficulty === DifficultyLevel.BEGINNER &&
          help.metadata.contextTags.includes(ContextTag.GETTING_STARTED)
        );
        results.push(...beginnerContent);
      }
      
      // For advanced users, include advanced content
      if (context.userSkillLevel === DifficultyLevel.ADVANCED || 
          context.userSkillLevel === DifficultyLevel.EXPERT) {
        const advancedContent = Object.values(this.conceptHelp).filter(help => 
          help.metadata.difficulty === context.userSkillLevel &&
          help.metadata.contextTags.includes(ContextTag.ADVANCED)
        );
        results.push(...advancedContent);
      }
    }
    
    // Add database-specific content
    if (context.databaseType) {
      const dbType = context.databaseType.toLowerCase();
      const dbSpecificContent = [...Object.values(this.commandHelp)]
        .filter(help => {
          // Check if help is tagged with this database type
          return help.metadata.contextTags.some(tag => 
            tag.toLowerCase() === dbType || 
            (tag === ContextTag.ORACLE && dbType.includes('oracle')) ||
            (tag === ContextTag.POSTGRESQL && (dbType.includes('postgres') || dbType.includes('pg'))) ||
            (tag === ContextTag.MYSQL && dbType.includes('mysql')) ||
            (tag === ContextTag.MSSQL && (dbType.includes('sql server') || dbType.includes('mssql')))
          );
        });
      results.push(...dbSpecificContent);
    }
    
    // Add environment-specific content
    if (context.environment) {
      const envTag = context.environment.toLowerCase() === 'production' ? ContextTag.PRODUCTION :
                     context.environment.toLowerCase() === 'development' ? ContextTag.DEVELOPMENT :
                     context.environment.toLowerCase() === 'testing' ? ContextTag.TESTING : null;
      
      if (envTag) {
        const envContent = [...Object.values(this.commandHelp)]
          .filter(help => help.metadata.contextTags.includes(envTag));
        results.push(...envContent);
      }
    }
    
    // Deduplicate results
    const uniqueResults = Array.from(new Map(results.map(item => [item.id, item])).values());
    
    return uniqueResults;
  }
  
  /**
   * Generates help content from commands
   * @param commands Commands to generate help for
   */
  generateHelpFromApi(commands: CliCommand[]): void {
    // Generate command help
    for (const command of commands) {
      const commandHelp: CommandHelp = {
        id: `command_${command.toolName}`,
        title: `Command: ${command.toolName}`,
        command: command.toolName,
        summary: command.description || `Executes the ${command.toolName} command`,
        description: this.generateDescriptionFromCommand(command),
        metadata: this.generateMetadataFromCommand(command),
        sampleUsage: this.generateSampleUsageFromCommand(command),
        parameters: this.generateParameterHelpFromCommand(command)
      };
      
      this.registerCommandHelp(commandHelp);
    }
  }
  
  /**
   * Generates description from command definition
   * @param command Command definition
   * @returns Generated description
   */
  private generateDescriptionFromCommand(command: CliCommand): string {
    // Start with the command description
    let description = command.description || '';
    
    // Add information about what the command does
    if (command.category) {
      description += `\n\nCategory: ${command.category}`;
    }
    
    // Add information about required parameters
    const requiredParams = command.params.filter(p => p.required).map(p => p.name);
    if (requiredParams.length > 0) {
      description += '\n\nRequired parameters:';
      for (const paramName of requiredParams) {
        const param = command.params.find(p => p.name === paramName);
        const paramDesc = param?.description || '';
        description += `\n- ${paramName}: ${paramDesc}`;
      }
    }
    
    return description;
  }
  
  /**
   * Generates metadata from command definition
   * @param command Command definition
   * @returns Generated metadata
   */
  private generateMetadataFromCommand(command: CliCommand): HelpMetadata {
    const metadata: HelpMetadata = {
      contentType: HelpContentType.COMMAND,
      contextTags: [],
      difficulty: DifficultyLevel.INTERMEDIATE,
      keywords: [command.toolName],
      categories: command.category ? [command.category] : []
    };
    
    // Add relevant context tags based on command name and category
    const name = command.toolName.toLowerCase();
    
    if (name.includes('oracle')) metadata.contextTags.push(ContextTag.ORACLE);
    if (name.includes('postgres')) metadata.contextTags.push(ContextTag.POSTGRESQL);
    if (name.includes('mysql')) metadata.contextTags.push(ContextTag.MYSQL);
    if (name.includes('mssql')) metadata.contextTags.push(ContextTag.MSSQL);
    
    if (name.includes('audit') || name.includes('report')) metadata.contextTags.push(ContextTag.AUDIT);
    if (name.includes('mask')) metadata.contextTags.push(ContextTag.MASKING);
    if (name.includes('security') || name.includes('protect')) metadata.contextTags.push(ContextTag.SECURITY);
    if (name.includes('monitor') || name.includes('status')) metadata.contextTags.push(ContextTag.MONITORING);
    
    // Set difficulty based on command complexity
    if (name.includes('show') || name.includes('list') || name.includes('get')) {
      metadata.difficulty = DifficultyLevel.BEGINNER;
    } else if (name.includes('add') || name.includes('create')) {
      metadata.difficulty = DifficultyLevel.INTERMEDIATE;
    } else if (name.includes('update') || name.includes('config')) {
      metadata.difficulty = DifficultyLevel.INTERMEDIATE;
    } else if (name.includes('delete') || name.includes('remove')) {
      metadata.difficulty = DifficultyLevel.INTERMEDIATE;
    } else if (name.includes('advanced') || name.includes('complex')) {
      metadata.difficulty = DifficultyLevel.ADVANCED;
    }
    
    return metadata;
  }
  
  /**
   * Generates sample usage from command definition
   * @param command Command definition
   * @returns Sample usage examples
   */
  private generateSampleUsageFromCommand(command: CliCommand): string[] {
    const samples: string[] = [];
    
    // Create a basic sample with required parameters
    const requiredParams = command.params.filter(p => p.required).map(p => p.name);
    let basicSample = `${command.toolName}`;
    
    if (requiredParams.length > 0) {
      basicSample += ' with required parameters:';
      const sampleObj: Record<string, any> = {};
      
      for (const paramName of requiredParams) {
        // Find the parameter definition
        const paramDef = command.params.find(p => p.name === paramName);
        if (!paramDef) continue;
        
        // Generate a sample value based on parameter type and name
        const paramType = paramDef.type;
        const paramExample = this.generateSampleValueForParam(paramName, paramType, paramDef);
        sampleObj[paramName] = paramExample;
      }
      
      basicSample += `\n${JSON.stringify(sampleObj, null, 2)}`;
    } else {
      basicSample += ' (no required parameters)';
    }
    
    samples.push(basicSample);
    
    // Add additional samples for common scenarios if available
    // (In a real implementation, these would be more tailored to each command)
    
    return samples;
  }
  
  /**
   * Generates parameter help from command definition
   * @param command Command definition
   * @returns Parameter help record
   */
  private generateParameterHelpFromCommand(command: CliCommand): Record<string, ParameterHelp> {
    const paramHelp: Record<string, ParameterHelp> = {};
    
    for (const param of command.params) {
      paramHelp[param.name] = {
        name: param.name,
        description: param.description || `Parameter: ${param.name}`,
        type: param.type,
        required: param.required,
        defaultValue: param.defaultValue !== undefined ? String(param.defaultValue) : undefined,
        sensitive: this.isSensitiveParameter(param.name),
        examples: this.generateExamplesForParameter(param.name, {
          type: param.type,
          default: param.defaultValue
        })
      };
    }
    
    return paramHelp;
  }
  
  /**
   * Determines if a parameter is sensitive (passwords, keys, etc.)
   * @param paramName Parameter name
   * @returns Whether the parameter is sensitive
   */
  private isSensitiveParameter(paramName: string): boolean {
    const sensitivePatterns = [
      /password/i,
      /pwd/i,
      /secret/i,
      /key/i,
      /token/i,
      /credential/i
    ];
    
    return sensitivePatterns.some(pattern => pattern.test(paramName));
  }
  
  /**
   * Generates sample value for a parameter
   * @param paramName Parameter name
   * @param paramType Parameter type
   * @param paramSchema Parameter schema
   * @returns Sample value
   */
  private generateSampleValueForParam(paramName: string, paramType: string, paramSchema: any): any {
    // If the schema has an enum, use the first enum value
    if (paramSchema?.enum && paramSchema.enum.length > 0) {
      return paramSchema.enum[0];
    }
    
    // If the parameter has a default value, use that
    if (paramSchema?.default !== undefined) {
      return paramSchema.default;
    }
    
    // Otherwise, generate a sample value based on parameter name and type
    const name = paramName.toLowerCase();
    
    // Handle sensitive parameters specially
    if (this.isSensitiveParameter(name)) {
      return '********';
    }
    
    // Generate values based on parameter type
    switch (paramType) {
      case 'string':
        if (name.includes('name')) return 'example-name';
        if (name.includes('host')) return '127.0.0.1';
        if (name.includes('port')) return '11000';
        if (name.includes('login')) return 'admin';
        if (name.includes('email')) return 'user@example.com';
        if (name.includes('path') || name.includes('file')) return '/path/to/file.txt';
        return 'example-value';
        
      case 'number':
      case 'integer':
        if (name.includes('port')) return 11000;
        if (name.includes('count')) return 10;
        if (name.includes('limit')) return 100;
        if (name.includes('size')) return 1024;
        return 42;
        
      case 'boolean':
        return true;
        
      case 'array':
        return [];
        
      case 'object':
        return {};
        
      default:
        return 'example-value';
    }
  }
  
  /**
   * Generates examples for a parameter
   * @param paramName Parameter name
   * @param paramSchema Parameter schema
   * @returns Array of example values
   */
  private generateExamplesForParameter(paramName: string, paramSchema: any): string[] {
    const examples: string[] = [];
    
    // If there are specified examples in the schema, use those
    if (paramSchema?.examples && Array.isArray(paramSchema.examples)) {
      return paramSchema.examples.map((ex: any) => String(ex));
    }
    
    // Otherwise, generate examples based on parameter type and name
    const paramType = paramSchema?.type || 'string';
    
    // Add the default sample value
    const defaultSample = this.generateSampleValueForParam(paramName, paramType, paramSchema);
    examples.push(String(defaultSample));
    
    // Add additional examples based on parameter type and name
    const name = paramName.toLowerCase();
    
    if (paramType === 'string') {
      if (name.includes('host')) {
        examples.push('localhost');
        examples.push('db-server.example.com');
      } else if (name.includes('port')) {
        examples.push('1521');  // Oracle
        examples.push('5432');  // PostgreSQL
        examples.push('3306');  // MySQL
      } else if (name.includes('name')) {
        examples.push('production-instance');
        examples.push('dev-db');
      }
    } else if (paramType === 'boolean') {
      examples.push('true');
      examples.push('false');
    }
    
    return examples;
  }
}

// Export an instance of the help repository
export const helpRepository = new HelpRepository();

/**
 * Initializes the help repository with API commands
 * @param commands Commands to generate help for
 */
export function initializeHelp(commands: CliCommand[]): void {
  helpRepository.generateHelpFromApi(commands);
}

/**
 * Gets contextual help based on the current context
 * @param context Current help context
 * @returns Contextually relevant help content
 */
export function getContextualHelp(context: HelpContext): HelpContent[] {
  return helpRepository.findContextualHelp(context);
}

/**
 * Searches for help content based on keywords
 * @param query Search query
 * @param contentTypes Types of content to search
 * @returns Matching help content
 */
export function searchHelp(query: string, contentTypes?: HelpContentType[]): HelpContent[] {
  return helpRepository.searchHelp(query, contentTypes);
}
