/**
 * Parameter storage commands for DataSunrise CLI MCP
 * 
 * These commands provide functionality for storing and retrieving command parameters
 * to avoid having to re-enter common parameter sets like connection details.
 */

import { CliCommand, CliParam } from './types.js';
import { parameterStore } from '../parameter_store.js';
import { enhanceParameterDescription } from '../description_helpers.js';

/**
 * Convert command parameters into CliParam array
 * @param properties Object properties to convert
 * @param required Array of required property names
 * @returns Array of CliParam objects
 */
function schemaToParams(
  properties: Record<string, { type: string; description: string }>,
  required: string[] = []
): CliParam[] {
  return Object.entries(properties).map(([name, prop]) => ({
    name,
    type: prop.type === 'object' ? 'string' : (prop.type as 'string' | 'number' | 'boolean'),
    description: prop.description,
    required: required.includes(name),
    cliName: `-${name}`
  }));
}

/**
 * Commands for managing stored parameters
 */
export const parametersCommands: CliCommand[] = [
  // System Parameter Commands
  {
    toolName: 'parameter_show_all',
    description: 'Displays all system parameters and their current values in DataSunrise. (CLI Guide 25.2)',
    baseCommand: 'showParameters',
    params: [
      { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'DataSunrise server name. Optional.'), required: false, cliName: '-dsServer' },
    ],
    category: 'System Parameter',
  },
  {
    toolName: 'parameter_change',
    description: 'Changes the value of a specified system parameter in DataSunrise. Use with caution as incorrect values can affect system stability.',
    baseCommand: 'changeParameter',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'The name of the system parameter to change (e.g., AgentPort, LogDeletePeriod).'), required: true, cliName: '-name' },
      { name: 'value', type: 'string', description: enhanceParameterDescription('string', 'The new value for the parameter. Type consistency is important (e.g., string for text, number for numeric values).'), required: true, cliName: '-value' },
      { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'DataSunrise server name. Optional.'), required: false, cliName: '-dsServer' },
    ],
    category: 'System Parameter',
  }
];
