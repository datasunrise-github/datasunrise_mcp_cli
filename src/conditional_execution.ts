/**
 * Conditional execution support for DataSunrise CLI MCP sequences
 * 
 * This module provides utilities for implementing conditional paths
 * in sequence execution based on runtime conditions.
 */

import { SequenceContext } from './parameter_store.js';

/**
 * Types of conditions that can be evaluated
 */
export enum ConditionType {
  /**
   * Check if a value equals another value
   */
  EQUALS = 'equals',
  
  /**
   * Check if a value doesn't equal another value
   */
  NOT_EQUALS = 'not_equals',
  
  /**
   * Check if a value is greater than another value
   */
  GREATER_THAN = 'greater_than',
  
  /**
   * Check if a value is less than another value
   */
  LESS_THAN = 'less_than',
  
  /**
   * Check if a value contains another value (for strings and arrays)
   */
  CONTAINS = 'contains',
  
  /**
   * Check if a value matches a regular expression (for strings)
   */
  MATCHES = 'matches',
  
  /**
   * Check if a value exists and is not undefined, null, or empty
   */
  EXISTS = 'exists',
  
  /**
   * Check if a previous step succeeded
   */
  STEP_SUCCEEDED = 'step_succeeded',
  
  /**
   * Custom condition with a function
   */
  CUSTOM = 'custom'
}

/**
 * Definition of a condition to evaluate
 */
export interface Condition {
  /**
   * Type of condition
   */
  type: ConditionType;
  
  /**
   * Left operand of the condition
   * Can be a literal value or a parameter reference (e.g., "${steps[0].result.id}")
   */
  leftOperand: any;
  
  /**
   * Right operand of the condition, if applicable
   * Can be a literal value or a parameter reference
   */
  rightOperand?: any;
  
  /**
   * For CUSTOM conditions, the function to evaluate
   * The function should return a boolean
   */
  customEvaluator?: (context: SequenceContext) => boolean;
  
  /**
   * For STEP_SUCCEEDED, the step index to check
   */
  stepIndex?: number;
}

/**
 * Logical operations for combining conditions
 */
export enum LogicalOperation {
  /**
   * All conditions must be true
   */
  AND = 'and',
  
  /**
   * At least one condition must be true
   */
  OR = 'or'
}

/**
 * Combined conditions with a logical operation
 */
export interface CompositeCondition {
  /**
   * Logical operation to apply to the conditions
   */
  operation: LogicalOperation;
  
  /**
   * Conditions to evaluate
   */
  conditions: (Condition | CompositeCondition)[];
}

/**
 * Conditional branch in a sequence
 */
export interface ConditionalBranch {
  /**
   * Condition to evaluate
   */
  condition: Condition | CompositeCondition;
  
  /**
   * Step index to jump to if the condition is true
   */
  targetStepIndex: number;
  
  /**
   * Description of this conditional branch
   */
  description?: string;
}

/**
 * Step for conditional execution
 */
export interface ConditionalStep {
  /**
   * Branches to evaluate
   */
  branches: ConditionalBranch[];
  
  /**
   * Default step index to jump to if no conditions match
   * If not provided, execution continues with the next step
   */
  defaultTargetStepIndex?: number;
  
  /**
   * Description of this conditional step
   */
  description?: string;
}

/**
 * Evaluates a condition based on the current context
 * @param condition Condition to evaluate
 * @param context Sequence execution context
 * @returns Result of the condition evaluation
 */
export function evaluateCondition(
  condition: Condition | CompositeCondition,
  context: SequenceContext
): boolean {
  // If it's a composite condition, evaluate each sub-condition
  if ('operation' in condition) {
    const results = condition.conditions.map(c => evaluateCondition(c, context));
    
    if (condition.operation === LogicalOperation.AND) {
      return results.every(result => result);
    } else {
      return results.some(result => result);
    }
  }
  
  // It's a simple condition
  const { type } = condition;
  
  // Resolve operands if they're parameter references
  const leftVal = resolveOperand(condition.leftOperand, context);
  
  switch (type) {
    case ConditionType.EXISTS:
      return leftVal !== undefined && leftVal !== null && leftVal !== '';
      
    case ConditionType.STEP_SUCCEEDED:
      if (condition.stepIndex === undefined) {
        throw new Error('stepIndex is required for STEP_SUCCEEDED conditions');
      }
      const stepResult = context.getStepResult(condition.stepIndex);
      return stepResult && !stepResult.error;
      
    case ConditionType.CUSTOM:
      if (!condition.customEvaluator) {
        throw new Error('customEvaluator is required for CUSTOM conditions');
      }
      return condition.customEvaluator(context);
  }
  
  // For conditions that require a right operand
  const rightVal = resolveOperand(condition.rightOperand, context);
  
  switch (type) {
    case ConditionType.EQUALS:
      return leftVal === rightVal;
      
    case ConditionType.NOT_EQUALS:
      return leftVal !== rightVal;
      
    case ConditionType.GREATER_THAN:
      return leftVal > rightVal;
      
    case ConditionType.LESS_THAN:
      return leftVal < rightVal;
      
    case ConditionType.CONTAINS:
      if (typeof leftVal === 'string') {
        return leftVal.includes(String(rightVal));
      } else if (Array.isArray(leftVal)) {
        return leftVal.includes(rightVal);
      }
      return false;
      
    case ConditionType.MATCHES:
      if (typeof leftVal === 'string' && typeof rightVal === 'string') {
        const regex = new RegExp(rightVal);
        return regex.test(leftVal);
      }
      return false;
      
    default:
      throw new Error(`Unknown condition type: ${type}`);
  }
}

/**
 * Resolves an operand value, handling parameter references
 * @param operand Operand to resolve
 * @param context Sequence execution context
 * @returns Resolved operand value
 */
function resolveOperand(operand: any, context: SequenceContext): any {
  if (typeof operand === 'string' && operand.includes('${steps[')) {
    return context.resolveParameterReference(operand);
  }
  return operand;
}

/**
 * Determines the next step to execute based on conditions
 * @param conditionalStep Conditional step definition
 * @param context Sequence execution context
 * @returns Index of the next step to execute
 */
export function determineNextStep(
  conditionalStep: ConditionalStep,
  context: SequenceContext
): number {
  for (const branch of conditionalStep.branches) {
    if (evaluateCondition(branch.condition, context)) {
      return branch.targetStepIndex;
    }
  }
  
  return conditionalStep.defaultTargetStepIndex !== undefined
    ? conditionalStep.defaultTargetStepIndex
    : -1; // -1 indicates continue with next step
}

/**
 * Creates a simple condition that checks a step's success
 * @param stepIndex Index of the step to check
 * @returns Condition that evaluates to true if the step succeeded
 */
export function stepSucceeded(stepIndex: number): Condition {
  return {
    type: ConditionType.STEP_SUCCEEDED,
    leftOperand: null,
    stepIndex
  };
}

/**
 * Creates a simple condition that checks if a step's result field equals a value
 * @param stepIndex Index of the step to check
 * @param field Field in the step result to check
 * @param value Value to compare against
 * @returns Condition that evaluates to true if the field equals the value
 */
export function resultEquals(stepIndex: number, field: string, value: any): Condition {
  return {
    type: ConditionType.EQUALS,
    leftOperand: `\${steps[${stepIndex}].result.${field}}`,
    rightOperand: value
  };
}

/**
 * Creates an AND composite condition
 * @param conditions Conditions to combine with AND
 * @returns Composite condition
 */
export function and(...conditions: (Condition | CompositeCondition)[]): CompositeCondition {
  return {
    operation: LogicalOperation.AND,
    conditions
  };
}

/**
 * Creates an OR composite condition
 * @param conditions Conditions to combine with OR
 * @returns Composite condition
 */
export function or(...conditions: (Condition | CompositeCondition)[]): CompositeCondition {
  return {
    operation: LogicalOperation.OR,
    conditions
  };
}
