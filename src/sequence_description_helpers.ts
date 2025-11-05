import { EnhancedDescription, Example, ParameterContextualHelp } from './enhanced_descriptions.js';

// Custom example interface that uses 'code' instead of 'command'
interface CodeExample {
  description: string;
  code: string | Record<string, any>;
  notes?: string;
}

/**
 * Creates a standardized sequence description with all the enhanced metadata
 */
export function createSequenceDescription(sequenceInfo: {
  name: string;
  summary: string;
  detailedDescription: string;
  securityImpact?: 'none' | 'low' | 'medium' | 'high';
  performanceImpact?: string;
  examples: (CodeExample | Example)[];
  relatedCommands?: string[];
  relatedSequences?: string[];
  commonIssues?: string[];
  contextualHelp?: Record<string, ParameterContextualHelp>;
}): EnhancedDescription {
  // Convert the examples to the standard Example interface
  const convertedExamples: Example[] = sequenceInfo.examples.map(ex => {
    // If it has a 'code' property, convert it to 'command'
    if ('code' in ex) {
      return {
        description: ex.description,
        command: ex.code,
        notes: ex.notes
      };
    }
    // It's already an Example
    return ex;
  });

  return {
    description: sequenceInfo.summary,
    detailedDescription: sequenceInfo.detailedDescription,
    securityImpact: sequenceInfo.securityImpact,
    performanceImpact: sequenceInfo.performanceImpact,
    examples: convertedExamples,
    relatedCommands: sequenceInfo.relatedCommands || [],
    relatedSequences: sequenceInfo.relatedSequences || [],
    commonIssues: sequenceInfo.commonIssues || [],
    contextualHelp: sequenceInfo.contextualHelp || {}
  };
}

/**
 * Creates a contextual help object for a sequence parameter
 */
export function createParameterHelp(params: {
  description: string;
  recommendations?: string[];
  warnings?: string[];
}): ParameterContextualHelp {
  const helpText = `${params.description}${params.recommendations?.length ? 
    `\n\nRecommendations:\n${params.recommendations.map(r => `- ${r}`).join('\n')}` : ''}${params.warnings?.length ? 
    `\n\nWarnings:\n${params.warnings.map(w => `- ${w}`).join('\n')}` : ''}`;

  return {
    help: helpText,
    suggestion: params.recommendations?.length ? params.recommendations[0] : undefined,
    warning: params.warnings?.length ? params.warnings[0] : undefined
  };
}
