/**
 * Parameter validation system for DataSunrise CLI MCP
 * 
 * This module provides utilities for validating parameters against schemas,
 * generating helpful error messages, and implementing smart defaults based
 * on the execution environment.
 */

/**
 * Result of parameter validation
 */
export interface ValidationResult {
  /**
   * Whether validation passed
   */
  valid: boolean;
  
  /**
   * Error messages if validation failed
   */
  errors: ValidationError[];
  
  /**
   * Warnings about parameter values
   */
  warnings: ValidationWarning[];
  
  /**
   * Parameters with applied default values
   */
  defaultsApplied: Record<string, any>;
}

/**
 * Validation error details
 */
export interface ValidationError {
  /**
   * Parameter name that failed validation
   */
  param: string;
  
  /**
   * Error message
   */
  message: string;
  
  /**
   * Error code for programmatic handling
   */
  code: string;
  
  /**
   * Path to the error in nested objects
   */
  path?: string[];
  
  /**
   * Suggested fix for the error
   */
  suggestion?: string;
}

/**
 * Warning details for parameter validation
 */
export interface ValidationWarning {
  /**
   * Parameter name that triggered the warning
   */
  param: string;
  
  /**
   * Warning message
   */
  message: string;
  
  /**
   * Warning code for programmatic handling
   */
  code: string;
  
  /**
   * Suggested improvement
   */
  suggestion?: string;
}

/**
 * Options for parameter validation
 */
export interface ValidationOptions {
  /**
   * Allow unknown parameters not in the schema
   */
  allowUnknown?: boolean;
  
  /**
   * Apply smart defaults based on the environment
   */
  applySmartDefaults?: boolean;
  
  /**
   * Enable security checks for sensitive parameters
   */
  enableSecurityChecks?: boolean;
  
  /**
   * Validate nested objects
   */
  validateNested?: boolean;
  
  /**
   * Context object for smart defaults
   */
  context?: Record<string, any>;
}

/**
 * Default validation options
 */
export const DEFAULT_VALIDATION_OPTIONS: ValidationOptions = {
  allowUnknown: false,
  applySmartDefaults: true,
  enableSecurityChecks: true,
  validateNested: true,
  context: {},
};

/**
 * Validates parameters against a JSON schema
 * @param params Parameters to validate
 * @param schema JSON schema to validate against
 * @param options Validation options
 * @returns Validation result
 */
export function validateParameters(
  params: Record<string, any>,
  schema: any,
  options: ValidationOptions = DEFAULT_VALIDATION_OPTIONS
): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
    defaultsApplied: {},
  };
  
  // Check for required parameters
  if (schema.required && Array.isArray(schema.required)) {
    for (const required of schema.required) {
      if (!(required in params)) {
        result.valid = false;
        result.errors.push({
          param: required,
          message: `Missing required parameter: ${required}`,
          code: 'MISSING_REQUIRED',
          suggestion: `Please provide a value for '${required}'`,
        });
      }
    }
  }
  
  // Apply defaults and validate parameter types
  if (schema.properties) {
    for (const [param, propSchema] of Object.entries<any>(schema.properties)) {
      // Skip parameters not provided
      if (!(param in params)) {
        // Apply defaults if parameter not provided
        if ('default' in propSchema && options.applySmartDefaults) {
          const defaultValue = getSmartDefault(propSchema.default, param, options.context);
          params[param] = defaultValue;
          result.defaultsApplied[param] = defaultValue;
        }
        continue;
      }
      
      const value = params[param];
      
      // Validate type
      if (propSchema.type && !validateType(value, propSchema.type)) {
        result.valid = false;
        result.errors.push({
          param,
          message: `Invalid type for ${param}: expected ${propSchema.type}, got ${typeof value}`,
          code: 'INVALID_TYPE',
          suggestion: `Convert '${param}' to a ${propSchema.type}`,
        });
      }
      
      // Validate enum values
      if (propSchema.enum && !propSchema.enum.includes(value)) {
        result.valid = false;
        result.errors.push({
          param,
          message: `Invalid value for ${param}: must be one of [${propSchema.enum.join(', ')}]`,
          code: 'INVALID_ENUM',
          suggestion: `Choose a value from [${propSchema.enum.join(', ')}]`,
        });
      }
      
      // Validate pattern
      if (propSchema.pattern && typeof value === 'string') {
        const regex = new RegExp(propSchema.pattern);
        if (!regex.test(value)) {
          result.valid = false;
          result.errors.push({
            param,
            message: `Invalid format for ${param}: must match pattern ${propSchema.pattern}`,
            code: 'INVALID_PATTERN',
            suggestion: `Format '${param}' according to the pattern ${propSchema.pattern}`,
          });
        }
      }
      
      // Validate minimum length for strings
      if (propSchema.minLength !== undefined && typeof value === 'string' && value.length < propSchema.minLength) {
        result.valid = false;
        result.errors.push({
          param,
          message: `Invalid length for ${param}: must be at least ${propSchema.minLength} characters`,
          code: 'INVALID_MIN_LENGTH',
          suggestion: `Provide a longer value for '${param}'`,
        });
      }
      
      // Validate minimum value for numbers
      if (propSchema.minimum !== undefined && typeof value === 'number' && value < propSchema.minimum) {
        result.valid = false;
        result.errors.push({
          param,
          message: `Invalid value for ${param}: must be at least ${propSchema.minimum}`,
          code: 'INVALID_MIN_VALUE',
          suggestion: `Provide a value >= ${propSchema.minimum}`,
        });
      }
      
      // Security checks for sensitive parameters
      if (options.enableSecurityChecks && isSensitiveParameter(param) && typeof value === 'string') {
        if (value.length < 8) {
          result.warnings.push({
            param,
            message: `Weak ${param}: consider using a stronger value`,
            code: 'WEAK_SENSITIVE_PARAM',
            suggestion: 'Use a longer and more complex value for better security',
          });
        }
      }
      
      // Validate nested objects
      if (options.validateNested && value && typeof value === 'object' && propSchema.properties) {
        const nestedResult = validateParameters(value, propSchema, options);
        if (!nestedResult.valid) {
          result.valid = false;
          // Add path prefix to nested errors
          for (const error of nestedResult.errors) {
            result.errors.push({
              ...error,
              path: [param, ...(error.path || [])],
            });
          }
        }
        
        // Add nested warnings
        for (const warning of nestedResult.warnings) {
          result.warnings.push(warning);
        }
        
        // Merge defaults applied
        for (const [key, val] of Object.entries(nestedResult.defaultsApplied)) {
          result.defaultsApplied[`${param}.${key}`] = val;
        }
      }
    }
  }
  
  // Check for unknown parameters
  if (!options.allowUnknown && schema.properties) {
    const allowedParams = Object.keys(schema.properties);
    for (const param in params) {
      if (!allowedParams.includes(param)) {
        result.warnings.push({
          param,
          message: `Unknown parameter: ${param} is not defined in the schema`,
          code: 'UNKNOWN_PARAM',
          suggestion: `Remove '${param}' or check for typos in parameter names`,
        });
      }
    }
  }
  
  return result;
}

/**
 * Validates a value against a JSON schema type
 * @param value Value to validate
 * @param type Expected type
 * @returns Whether the value matches the expected type
 */
function validateType(value: any, type: string | string[]): boolean {
  const types = Array.isArray(type) ? type : [type];
  
  for (const t of types) {
    switch (t) {
      case 'string':
        if (typeof value === 'string') return true;
        break;
      case 'number':
      case 'integer':
        if (typeof value === 'number') return true;
        break;
      case 'boolean':
        if (typeof value === 'boolean') return true;
        break;
      case 'object':
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) return true;
        break;
      case 'array':
        if (Array.isArray(value)) return true;
        break;
      case 'null':
        if (value === null) return true;
        break;
    }
  }
  
  return false;
}

/**
 * Determines if a parameter is sensitive (e.g., password, key)
 * @param paramName Parameter name to check
 * @returns Whether the parameter is sensitive
 */
function isSensitiveParameter(paramName: string): boolean {
  const sensitivePatterns = [
    /password/i,
    /passwd/i,
    /pwd/i,
    /secret/i,
    /key/i,
    /token/i,
    /credential/i,
  ];
  
  return sensitivePatterns.some(pattern => pattern.test(paramName));
}

/**
 * Gets a smart default value based on the context
 * @param defaultValue Base default value
 * @param paramName Parameter name
 * @param context Context object
 * @returns Smart default value
 */
function getSmartDefault(defaultValue: any, paramName: string, context?: Record<string, any>): any {
  if (!context) return defaultValue;
  
  // Special handling for specific parameter types
  if (paramName === 'host' && context.lastUsedHost) {
    return context.lastUsedHost;
  }
  
  if (paramName === 'port' && context.lastUsedPort) {
    return context.lastUsedPort;
  }
  
  if (paramName.includes('login') && context.lastUsedLogin) {
    return context.lastUsedLogin;
  }
  
  // Environment-based defaults
  if (typeof defaultValue === 'string' && defaultValue.startsWith('$ENV.') && process.env) {
    const envVar = defaultValue.slice(5);
    return process.env[envVar] || defaultValue;
  }
  
  return defaultValue;
}

/**
 * Formats validation errors into a user-friendly message
 * @param result Validation result
 * @returns Formatted error message
 */
export function formatValidationErrors(result: ValidationResult): string {
  if (result.valid && result.warnings.length === 0) {
    return 'Validation successful.';
  }
  
  let message = '';
  
  if (!result.valid) {
    message += 'Validation errors:\n';
    for (const error of result.errors) {
      message += `- ${error.message}\n`;
      if (error.suggestion) {
        message += `  Suggestion: ${error.suggestion}\n`;
      }
    }
  }
  
  if (result.warnings.length > 0) {
    message += '\nWarnings:\n';
    for (const warning of result.warnings) {
      message += `- ${warning.message}\n`;
      if (warning.suggestion) {
        message += `  Suggestion: ${warning.suggestion}\n`;
      }
    }
  }
  
  if (Object.keys(result.defaultsApplied).length > 0) {
    message += '\nDefault values applied:\n';
    for (const [param, value] of Object.entries(result.defaultsApplied)) {
      message += `- ${param}: ${JSON.stringify(value)}\n`;
    }
  }
  
  return message;
}
