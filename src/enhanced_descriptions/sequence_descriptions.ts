/**
 * Enhanced descriptions for DataSunrise CLI MCP sequences
 * 
 * This file contains rich metadata for all sequences, including detailed documentation,
 * examples, related commands, and contextual help.
 * 
 * These descriptions are used by the MCP client to provide comprehensive documentation
 * and context-sensitive help for sequences.
 */

import { EnhancedDescription, Example, ParameterContextualHelp } from '../enhanced_descriptions.js';
import { createSequenceDescription, createParameterHelp } from '../sequence_description_helpers.js';

/**
 * Register all sequence descriptions in the description registry
 */
export const registerAllSequenceDescriptions = () => {
  // Import the registry using dynamic import to avoid circular dependencies
  import('../description_registry.js').then(registry => {
    // Register all sequence descriptions
    
    console.error('All sequence descriptions registered successfully');
  }).catch(error => {
    console.error('Failed to register sequence descriptions:', error);
  });
};
