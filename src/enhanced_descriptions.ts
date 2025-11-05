/**
 * Enhanced description metadata that extends normal command/sequence descriptions
 */
export interface EnhancedDescription {
  /** Original description field (improved) */
  description: string;
  /** Detailed multi-paragraph explanation */
  detailedDescription?: string;
  /** Security impact level (none, low, medium, high) */
  securityImpact?: 'none' | 'low' | 'medium' | 'high';
  /** Performance impact details */
  performanceImpact?: string;
  /** List of example usages with description, command/args, and notes */
  examples?: Example[];
  /** Common issues and troubleshooting hints */
  commonIssues?: string[];
  /** Related commands that work with this one */
  relatedCommands?: string[];
  /** Related sequences that use or extend this functionality */
  relatedSequences?: string[];
  /** Parameter-specific contextual help information */
  contextualHelp?: Record<string, ParameterContextualHelp>;
}

/**
 * Structured example of command/sequence usage
 */
export interface Example {
  /** Short description of what this example accomplishes */
  description: string;
  /** The actual command string or argument object */
  command: string | Record<string, any>;
  /** Additional notes, considerations, or explanations */
  notes?: string;
}

/**
 * Context-aware help for a specific parameter
 */
export interface ParameterContextualHelp {
  /** Other parameters this one depends on */
  dependsOn?: string[];
  /** Detailed help text for this parameter */
  help: string;
  /** Function that determines if this parameter applies given current values */
  condition?: (params: Record<string, any>) => boolean;
  /** Example or suggestion for this parameter */
  suggestion?: string;
  /** Warning about potential issues with certain values */
  warning?: string;
}
