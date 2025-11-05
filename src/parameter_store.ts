/**
 * Parameter storage for DataSunrise CLI MCP commands
 * 
 * This module implements a simple parameter store to allow saving and reusing
 * command parameters across multiple invocations. It also provides a mechanism
 * for capturing and using return values from previous steps in a sequence.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get the current module path
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Default storage location
const DEFAULT_STORAGE_PATH = path.join(__dirname, '..', 'stored-parameters.json');

/**
 * Class for storing and retrieving command parameters
 */
export class ParameterStore {
  private storagePath: string;
  private data: Record<string, Record<string, any>>;

  /**
   * Create a new parameter store
   * @param storagePath Path to the storage file (defaults to 'stored-parameters.json')
   */
  constructor(storagePath: string = DEFAULT_STORAGE_PATH) {
    this.storagePath = storagePath;
    this.data = this.loadData();
  }

  /**
   * Load parameter data from storage
   * @returns The loaded parameter data or an empty object if no data exists
   */
  private loadData(): Record<string, Record<string, any>> {
    try {
      if (fs.existsSync(this.storagePath)) {
        const rawData = fs.readFileSync(this.storagePath, 'utf-8');
        return JSON.parse(rawData);
      }
    } catch (error) {
      console.error(`Error loading parameter store data: ${error}`);
    }
    
    // If file doesn't exist or there's an error, return an empty structure
    return {
      connections: {},
      instances: {},
      rules: {},
    };
  }

  /**
   * Save parameter data to storage
   */
  private saveData(): void {
    try {
      fs.writeFileSync(this.storagePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error saving parameter store data: ${error}`);
    }
  }

  /**
   * Save a set of parameters
   * @param category Category for the parameters (e.g., 'connections', 'instances')
   * @param name Name for this parameter set
   * @param parameters The parameter values to store
   * @returns true if successful, false otherwise
   */
  saveParameters(category: string, name: string, parameters: Record<string, any> | any): boolean {
    try {
      // Create category if it doesn't exist
      if (!this.data[category]) {
        this.data[category] = {};
      }
      
      // Store the parameters - use deep clone to handle arrays properly
      this.data[category][name] = JSON.parse(JSON.stringify(parameters));
      
      // Save to storage
      this.saveData();
      return true;
    } catch (error) {
      console.error(`Error saving parameters: ${error}`);
      return false;
    }
  }

  /**
   * List stored parameter sets in a category
   * @param category Category to list parameter sets from
   * @returns Array of parameter set names
   */
  listParameters(category: string): string[] {
    if (!this.data[category]) {
      return [];
    }
    
    return Object.keys(this.data[category]);
  }

  /**
   * Retrieve a stored parameter set
   * @param category Category of the parameter set
   * @param name Name of the parameter set
   * @returns The parameter set values or undefined if not found
   */
  getParameters(category: string, name: string): Record<string, any> | undefined {
    if (!this.data[category] || !this.data[category][name]) {
      return undefined;
    }
    
    // Deep clone the parameters to prevent modification of stored data
    return JSON.parse(JSON.stringify(this.data[category][name]));
  }

  /**
   * Delete a stored parameter set
   * @param category Category of the parameter set
   * @param name Name of the parameter set
   * @returns true if successful, false otherwise
   */
  deleteParameters(category: string, name: string): boolean {
    if (!this.data[category] || !this.data[category][name]) {
      return false;
    }
    
    delete this.data[category][name];
    this.saveData();
    
    return true;
  }

  /**
   * List all categories
   * @returns Array of category names
   */
  listCategories(): string[] {
    return Object.keys(this.data);
  }
}

/**
 * Singleton instance of the parameter store
 */
export const parameterStore = new ParameterStore();

/**
 * Sequence execution context for tracking return values between steps
 */
export class SequenceContext {
  // Store results from each step
  private stepResults: any[] = [];
  
  /**
   * Store the result of a step
   * @param stepIndex Index of the step
   * @param result Result value to store
   */
  setStepResult(stepIndex: number, result: any): void {
    this.stepResults[stepIndex] = result;
  }
  
  /**
   * Get the result of a previous step
   * @param stepIndex Index of the step
   * @returns The stored result or undefined if not found
   */
  getStepResult(stepIndex: number): any {
    return this.stepResults[stepIndex] === undefined ? undefined : this.stepResults[stepIndex];
  }
  
  /**
   * Get all step results
   * @returns Array of all step results
   */
  getAllResults(): any[] {
    return [...this.stepResults];
  }

  /**
   * Resolve parameter references in a value
   * References use the format ${steps[n].result.path}
   * @param value Value that might contain parameter references
   * @returns Resolved value with all references replaced
   */
  resolveParameterReference(value: any): any {
    // Handle string values that might contain references
    if (typeof value === 'string' && value.includes('${steps[')) {
      // Check if the entire string is just a single reference
      const fullRefMatch = value.match(/^\${steps\[(\d+)\]\.result\.([^}]+)}$/);
      if (fullRefMatch) {
        // If it's a full match, extract the reference directly to preserve type
        const [, stepIndex, path] = fullRefMatch;
        const stepResult = this.getStepResult(parseInt(stepIndex));
        if (!stepResult) {
          return value; // Return the original reference if step result doesn't exist
        }
        
        // Navigate the path (e.g., "id" or "data.name")
        const pathParts = path.split('.');
        let result = stepResult;
        
        for (const part of pathParts) {
          if (result && typeof result === 'object' && part in result) {
            result = result[part];
          } else {
            return value; // Return the original reference if path doesn't exist
          }
        }
        
        // Return the raw value (preserves type)
        return result;
      }
      
      // For partial references in a string, use replace (will convert to string)
      return value.replace(/\${steps\[(\d+)\]\.result\.([^}]+)}/g, (match, stepIndex, path) => {
        const stepResult = this.getStepResult(parseInt(stepIndex));
        if (!stepResult) {
          // Return the original reference if step result doesn't exist
          return match;
        }
        
        // Navigate the path (e.g., "id" or "data.name")
        const pathParts = path.split('.');
        let result = stepResult;
        
        for (const part of pathParts) {
          if (result && typeof result === 'object' && part in result) {
            result = result[part];
          } else {
            // Return the original reference if path doesn't exist
            return match;
          }
        }
        
        return String(result); // Convert to string for replacement
      });
    }
    
    return value;
  }

  /**
   * Resolve parameter references in an object
   * @param params Object with potential parameter references
   * @returns New object with all references resolved
   */
  resolveParameterReferencesInObject(params: Record<string, any>): Record<string, any> {
    if (!params || typeof params !== 'object') {
      return params;
    }
    
    // Handle arrays
    if (Array.isArray(params)) {
      return params.map(item => this.resolveParameterReferencesInObject(item));
    }
    
    const result: Record<string, any> = {};
    
    for (const key in params) {
      const value = params[key];
      
      if (value !== null && typeof value === 'object') {
        // Recursively resolve references in nested objects
        result[key] = this.resolveParameterReferencesInObject(value);
      } else {
        // Resolve references in primitive values
        result[key] = this.resolveParameterReference(value);
      }
    }
    
    return result;
  }
}

/**
 * Extract and map specific fields from a result using the result mapping
 * @param result The full result object
 * @param mapping Mapping of target fields to source paths
 * @returns Object with mapped fields
 */
export function mapResultFields(result: any, mapping: Record<string, string>): Record<string, any> {
  const mappedResult: Record<string, any> = {};
  
  for (const targetField in mapping) {
    const sourcePath = mapping[targetField];
    const pathParts = sourcePath.split('.');
    
    let value = result;
    for (const part of pathParts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        value = undefined;
        break;
      }
    }
    
    mappedResult[targetField] = value;
  }
  
  return mappedResult;
}
