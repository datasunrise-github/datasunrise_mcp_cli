import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// static_masking_start
registerCommandDescription('static_masking_start', {
  description: createCommandDescription(
    'Starts',
    'a static masking task',
    'in DataSunrise. This involves copying data from a source to a target instance, applying masking rules as defined in a table configuration JSON file. 🔒 Modifies data in the target database.',
    'high', // Modifies data in target DB
    false,  // Stability impact is on data, not system usually
    false   // No direct service interruption to source, but target is being written to
  ),
  detailedDescription: `
This command initiates a static data masking task. Static masking is used to create a desensitized copy of a database, 
typically for development, testing, or analytics purposes. Data is read from a source DataSunrise instance, 
masked according to rules defined in a JSON configuration file (specifying tables, columns, and masking functions), 
and then written to a target DataSunrise instance (which points to the target database).
This operation can be resource-intensive and directly modifies data in the target database.
  `,
  examples: [
    {
      description: 'Start a static masking task from "OracleProd" to "OracleTest" using "masking_config.json"',
      command: 'static_masking_start -sourceInstance OracleProd -targetInstance OracleTest -tableFile "/path/to/masking_config.json"'
    }
  ],
  relatedCommands: ['static_masking_show_status', 'static_masking_restart', 'rule_add_masking'], // Dynamic masking rules might inform static masking logic
  commonIssues: [
    'Ensure the source and target instances are correctly configured in DataSunrise and accessible.',
    'The tableFile JSON must be correctly formatted and specify valid tables, columns, and masking functions.',
    'The target database schema should typically exist and match the source for the tables being masked.',
    'This operation can take a long time and consume significant resources on both source, target, and DataSunrise server.'
  ],
  contextualHelp: {
    sourceInstance: createParameterHelp(
      'Name of the source DataSunrise instance (where original data resides).',
      { suggestion: 'This instance should point to your production or source database.' }
    ),
    targetInstance: createParameterHelp(
      'Name of the target DataSunrise instance where masked data will be written.',
      { suggestion: 'This instance should point to your development, test, or analytics database. Data in target tables will be overwritten/modified.' }
    ),
    tableFile: createParameterHelp(
      'Path to the JSON file defining tables and columns to be masked, along with their masking rules.',
      { suggestion: 'This JSON file specifies which tables/columns to process and what masking techniques (e.g., shuffle, redact, substitute) to apply to each.' }
    )
  }
});

// static_masking_show_status
registerCommandDescription('static_masking_show_status', {
  description: createCommandDescription(
    'Shows',
    'the status and details of a specific static masking task by its ID',
    'in DataSunrise.',
    'none'
  ),
  detailedDescription: 'This command retrieves the current status and progress details of an ongoing or completed static data masking task, identified by its unique task ID.',
  examples: [
    {
      description: 'Show status for static masking task ID "sm_task_12345"',
      command: 'static_masking_show_status -id sm_task_12345'
    }
  ],
  relatedCommands: ['static_masking_start', 'static_masking_restart'],
  contextualHelp: {
    id: createParameterHelp(
      'ID of the static masking task to display.',
      { suggestion: 'The task ID is typically returned when a static masking task is started.' }
    )
  }
});

// static_masking_restart
registerCommandDescription('static_masking_restart', {
  description: createCommandDescription(
    'Restarts',
    'a previously run or failed static masking task by its ID',
    'in DataSunrise. 🔒 Modifies data in the target database.',
    'high',
    false,
    false
  ),
  detailedDescription: `
This command attempts to restart a static data masking task that may have previously failed or was interrupted. 
It uses the original configuration of the task identified by its ID. 
This will re-attempt to mask and write data to the target database.
  `,
  examples: [
    {
      description: 'Restart failed static masking task ID "sm_task_67890"',
      command: 'static_masking_restart -id sm_task_67890'
    }
  ],
  relatedCommands: ['static_masking_start', 'static_masking_show_status'],
  commonIssues: ['Ensure the underlying cause of any previous failure has been addressed before restarting.'],
  contextualHelp: {
    id: createParameterHelp(
      'ID of the static masking task to restart.'
    )
  }
});
