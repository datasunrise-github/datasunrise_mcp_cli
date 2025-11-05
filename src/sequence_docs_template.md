# DataSunrise CLI MCP Sequence Documentation Template

This template provides a standard documentation structure for all sequence tools in the DataSunrise CLI MCP.

## Basic Structure

```typescript
/**
 * [SEQUENCE_NAME] - [ONE_LINE_SUMMARY]
 * 
 * [DETAILED_DESCRIPTION - 2-3 paragraphs explaining what the sequence does in detail]
 * 
 * ## Purpose
 * [CLEAR_EXPLANATION of the purpose and primary goal of this sequence]
 * 
 * ## Use Cases
 * - [WHEN_TO_USE_1]
 * - [WHEN_TO_USE_2]
 * - [WHEN_TO_USE_3]
 * 
 * ## Prerequisites
 * - [PREREQUISITE_1]
 * - [PREREQUISITE_2]
 * 
 * ## Steps Performed
 * 1. [STEP_1_DESCRIPTION]
 * 2. [STEP_2_DESCRIPTION]
 * 3. [STEP_3_DESCRIPTION]
 * 
 * ## Results
 * Upon successful completion, this sequence returns:
 * - [RESULT_FIELD_1]: [DESCRIPTION]
 * - [RESULT_FIELD_2]: [DESCRIPTION]
 * 
 * ## Related Commands
 * - [RELATED_COMMAND_1]: [BRIEF_DESCRIPTION]
 * - [RELATED_COMMAND_2]: [BRIEF_DESCRIPTION]
 * 
 * @returns [RETURN_TYPE_DESCRIPTION]
 */
```

## Parameter Documentation

For each parameter in the `inputSchema`, provide:

```typescript
properties: {
  parameter_name: { 
    type: 'string', 
    description: 'Clear, detailed description of the parameter.',
    default: 'default-value', // if applicable
    examples: ['example1', 'example2'], // if helpful
    pattern: '^[a-zA-Z0-9_-]+$', // if validation is needed
    minLength: 1, // if applicable
    enum: ['option1', 'option2'], // if only specific values are allowed
  }
}
```

## Step Documentation

For each step in the sequence:

```typescript
steps: [
  {
    commandToolName: 'command_name',
    paramMapping: {
      // parameter mappings
    },
    description: 'Detailed description of what this step does and why it's important',
    resultMapping: {
      // result mappings if applicable
    }
  }
]
```

## Examples Section

The examples section should include:

1. Basic usage example
2. Advanced usage with optional parameters
3. Examples for different database types if applicable

```typescript
examples: `
Example 1 - Basic Usage:
{
  "param1": "value1",
  "param2": "value2"
}

Example 2 - Advanced Usage:
{
  "param1": "value1",
  "param2": "value2",
  "optionalParam1": "optionalValue1"
}
`
```

## Visual Representation

Consider adding ASCII-based or mermaid-compatible diagrams to illustrate sequence flow:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   First Step    │────▶│   Second Step   │────▶│    Third Step   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

or

```mermaid
graph LR
    A[First Step] --> B[Second Step]
    B --> C[Third Step]
    C --> D[Final Result]
