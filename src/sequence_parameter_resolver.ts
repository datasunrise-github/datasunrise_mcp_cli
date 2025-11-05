/**
 * Sequence parameter resolution system
 * 
 * This module provides automatic parameter resolution for sequences,
 * searching previous step results for matching parameter values.
 */

import { SequenceContext } from './parameter_store.js';

/**
 * Parameter search strategies for finding parameter values in previous results
 */
export enum ParamSearchStrategy {
  /**
   * Exact match - parameter name must exactly match a field in the result
   */
  EXACT_MATCH = 'exact_match',
  
  /**
   * Case-insensitive match - parameter name matches a field in the result, ignoring case
   */
  CASE_INSENSITIVE = 'case_insensitive',
  
  /**
   * Suffix match - parameter name ends with the field name in the result
   * e.g., "instanceId" would match "newInstanceId", "myInstanceId"
   */
  SUFFIX_MATCH = 'suffix_match',
  
  /**
   * Prefix match - parameter name starts with the field name in the result
   * e.g., "instance" would match "instanceName", "instanceId"
   */
  PREFIX_MATCH = 'prefix_match'
}

/**
 * Configuration for auto parameter resolution
 */
export interface AutoParamResolveConfig {
  /**
   * Whether auto resolution is enabled
   */
  enabled: boolean;
  
  /**
   * Search strategies to use, in order of priority
   */
  strategies: ParamSearchStrategy[];
  
  /**
   * Maximum steps to look back for parameter values
   * Default is to look back through all previous steps
   */
  maxLookbackSteps?: number;
  
  /**
   * Parameter names to exclude from auto resolution
   */
  excludeParams?: string[];
  
  /**
   * Whether to log automatic parameter resolutions
   */
  logResolutions?: boolean;
}

/**
 * Default configuration for auto parameter resolution
 */
export const defaultAutoResolveConfig: AutoParamResolveConfig = {
  enabled: true,
  strategies: [
    ParamSearchStrategy.EXACT_MATCH,
    ParamSearchStrategy.SUFFIX_MATCH,
    ParamSearchStrategy.PREFIX_MATCH
  ],
  maxLookbackSteps: undefined, // look back through all steps
  excludeParams: ['password', 'pwd', 'secret', 'key', 'token'], // security-sensitive params
  logResolutions: true
};

/**
 * Resolves parameters for a sequence step by checking previous step results
 * @param requiredParams Array of parameter names required by this step
 * @param mappedParams Already mapped parameters from the sequence definition
 * @param context Sequence execution context containing previous step results
 * @param config Configuration for auto-resolution
 * @returns Object with resolved parameters
 */
export function resolveAutomaticParameters(
  requiredParams: string[],
  mappedParams: Record<string, any>,
  context: SequenceContext,
  config: AutoParamResolveConfig = defaultAutoResolveConfig
): Record<string, any> {
  // If auto-resolution is disabled, return the mapped params unchanged
  if (!config.enabled) {
    return mappedParams;
  }
  
  // Create a new object with the already mapped parameters
  const resolvedParams = { ...mappedParams };
  
  // For each required parameter not already mapped
  for (const param of requiredParams) {
    // Skip if parameter is already mapped or is in the exclude list
    if (param in resolvedParams || 
        (config.excludeParams && config.excludeParams.includes(param))) {
      continue;
    }
    
    // Try to find the parameter in previous step results
    const paramValue = findParameterInPreviousResults(
      param,
      context,
      config.strategies,
      config.maxLookbackSteps
    );
    
    // If found, add it to the resolved parameters
    if (paramValue !== undefined) {
      resolvedParams[param] = paramValue;
      
      if (config.logResolutions) {
        console.log(`Auto-resolved parameter '${param}' from previous step result`);
      }
    }
  }
  
  return resolvedParams;
}

/**
 * Finds a parameter value in previous step results
 * @param paramName Name of the parameter to find
 * @param context Sequence execution context
 * @param strategies Search strategies to use
 * @param maxLookbackSteps Maximum steps to look back
 * @returns Parameter value if found, undefined otherwise
 */
function findParameterInPreviousResults(
  paramName: string,
  context: SequenceContext,
  strategies: ParamSearchStrategy[],
  maxLookbackSteps?: number
): any {
  // Get all previous step results
  const allResults = context.getAllResults();
  
  // Determine how many steps to look back
  const stepsToCheck = maxLookbackSteps !== undefined
    ? Math.min(maxLookbackSteps, allResults.length)
    : allResults.length;
  
  // Look through previous steps, starting with the most recent
  for (let i = allResults.length - 1; i >= allResults.length - stepsToCheck; i--) {
    if (i < 0) break; // Safety check
    
    const result = allResults[i];
    if (!result || typeof result !== 'object') continue;
    
    // Try each strategy in order
    for (const strategy of strategies) {
      const value = findByStrategy(paramName, result, strategy);
      if (value !== undefined) {
        return value;
      }
    }
  }
  
  return undefined;
}

/**
 * Finds a parameter value using a specific search strategy
 * @param paramName Name of the parameter to find
 * @param resultObj Result object to search in
 * @param strategy Search strategy to use
 * @returns Parameter value if found, undefined otherwise
 */
function findByStrategy(
  paramName: string,
  resultObj: Record<string, any>,
  strategy: ParamSearchStrategy
): any {
  switch (strategy) {
    case ParamSearchStrategy.EXACT_MATCH:
      return resultObj[paramName];
      
    case ParamSearchStrategy.CASE_INSENSITIVE:
      for (const key in resultObj) {
        if (key.toLowerCase() === paramName.toLowerCase()) {
          return resultObj[key];
        }
      }
      break;
      
    case ParamSearchStrategy.SUFFIX_MATCH:
      for (const key in resultObj) {
        if (key.endsWith(paramName)) {
          return resultObj[key];
        }
      }
      break;
      
    case ParamSearchStrategy.PREFIX_MATCH:
      for (const key in resultObj) {
        if (key.startsWith(paramName)) {
          return resultObj[key];
        }
      }
      break;
  }
  
  // For nested objects, recursively search
  for (const key in resultObj) {
    const value = resultObj[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const nestedResult = findByStrategy(paramName, value, strategy);
      if (nestedResult !== undefined) {
        return nestedResult;
      }
    }
  }
  
  return undefined;
}
