import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';


// parameter_show_all (System Parameter)
registerCommandDescription('parameter_show_all', {
  description: createCommandDescription(
    'Displays',
    'all system parameters and their current values',
    'in DataSunrise.',
    'none'
  ),
  detailedDescription: `
This command lists all configurable system-level parameters within the DataSunrise application 
and their current values. These parameters control various aspects of DataSunrise behavior.
  `,
  examples: [
    {
      description: 'Show all DataSunrise system parameters',
      command: 'parameter_show_all'
    }
  ],
  relatedCommands: ['parameter_change'],
});

// parameter_change (System Parameter)
registerCommandDescription('parameter_change', {
  description: createCommandDescription(
    'Changes',
    'the value of a specified system parameter',
    'in DataSunrise. ⚠️ Use with caution as incorrect values can affect system stability.',
    'high', // Security: Can alter core behavior
    true,   // Stability: High risk if misused
    false
  ),
  detailedDescription: `
This command modifies the value of a specific DataSunrise system parameter. 
System parameters control core functionalities, performance tuning, and operational settings. 
Changing these parameters requires a thorough understanding of their impact. 
Incorrect values can lead to system instability or unexpected behavior.
  `,
  examples: [
    {
      description: 'Change the AgentPort system parameter to 9001 (USE WITH CAUTION)',
      command: 'parameter_change -name AgentPort -value 9001'
    }
  ],
  relatedCommands: ['parameter_show_all'],
  commonIssues: [
    'Ensure the parameter name is correct and the value is of the appropriate type.',
    'Some parameter changes may require a core engine restart to take effect.'
  ],
  contextualHelp: {
    name: createParameterHelp(
      'The name of the system parameter to change (e.g., AgentPort, LogDeletePeriod).',
      { suggestion: 'Use "parameter_show_all" to get a list of valid parameter names.' }
    ),
    value: createParameterHelp(
      'The new value for the parameter. Type consistency is important (e.g., string for text, number for numeric values).',
      { warning: 'Incorrect values can seriously affect system operation.' }
    )
  }
});
