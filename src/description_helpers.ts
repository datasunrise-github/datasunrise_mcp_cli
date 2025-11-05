import { EnhancedDescription, Example, ParameterContextualHelp } from './enhanced_descriptions.js';

/**
 * Creates a standardized command description with icon and warning if needed
 */
export function createCommandDescription(
  action: string,
  object: string,
  context: string,
  securityImpact?: 'none' | 'low' | 'medium' | 'high',
  stabilityImpact?: boolean,
  serviceInterruption?: boolean
): string {
  let prefix = '';
  
  // Add appropriate icons based on impact
  if (securityImpact === 'high') {
    prefix += '🔒 ';
  }
  
  if (stabilityImpact) {
    prefix += '⚠️ ';
  }
  
  if (serviceInterruption) {
    prefix += '🔄 ';
  }
  
  // Format: [Action verb] [Object] [in/from/to] DataSunrise [additional context]. [Security/impact note if applicable].
  let description = `${prefix}${action} ${object} in DataSunrise ${context}.`;
  
  // Add impact warning if applicable
  if (securityImpact === 'high') {
    description += ' This operation affects system security.';
  } else if (stabilityImpact) {
    description += ' This operation may affect system stability.';
  } else if (serviceInterruption) {
    description += ' This operation may cause service interruption.';
  }
  
  description += ' IMPORTANT: If a parameter is not specified, it should be omitted entirely rather than passing an empty string.';
  return description;
}

/**
 * Enhances a parameter description with type prefix and other details
 */
export function enhanceParameterDescription(
  type: 'string' | 'number' | 'boolean',
  description: string,
  format?: string,
  defaultValue?: any,
  range?: string
): string {
  let result = `[${type.toUpperCase()}`;
  
  // Add format if specified
  if (format) {
    result += `:${format.toUpperCase()}`;
  }
  
  result += '] ';
  
  // Add description
  result += description;
  
  // Add default value if specified
  if (defaultValue !== undefined) {
    result += ` Default: "${defaultValue}".`;
  }
  
  // Add range if specified
  if (range) {
    result += ` ${range}.`;
  }
  
  return result;
}

/**
 * Creates a contextual help object for a parameter
 */
export function createParameterHelp(
  help: string,
  options: {
    dependsOn?: string[],
    suggestion?: string,
    warning?: string,
    condition?: (params: Record<string, any>) => boolean
  } = {}
): ParameterContextualHelp {
  return {
    dependsOn: options.dependsOn || [],
    help,
    suggestion: options.suggestion,
    warning: options.warning,
    condition: options.condition
  };
}
