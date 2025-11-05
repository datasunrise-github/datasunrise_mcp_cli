import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// dictionary_backup_create
registerCommandDescription('dictionary_backup_create', {
  description: createCommandDescription(
    'Creates',
    'a backup of the DataSunrise system dictionary (configuration database)',
    'on the server. Essential for disaster recovery.',
    'low', // Security impact is low, but operational impact of not having backups is high
    true,  // Stability impact if restore is needed
    false  // Service interruption: No for backup, yes for restore
  ),
  detailedDescription: `
This command initiates a backup of the DataSunrise system dictionary. 
The dictionary contains all configuration data, including instances, rules, users, and settings. 
Regular backups are crucial for disaster recovery and system restoration.
  `,
  examples: [
    {
      description: 'Create a dictionary backup',
      command: 'dictionary_backup_create'
    }
  ],
  relatedCommands: ['dictionary_backup_show_all', 'dictionary_recover', 'dictionary_clean'],
  commonIssues: ['Ensure sufficient disk space for the backup file.'],
});

// dictionary_backup_show_all
registerCommandDescription('dictionary_backup_show_all', {
  description: createCommandDescription(
    'Displays',
    'a list of available dictionary backups',
    'on the server.',
    'none'
  ),
  detailedDescription: 'This command lists all previously created backups of the DataSunrise system dictionary, showing their IDs and creation timestamps.',
  examples: [
    {
      description: 'List all available dictionary backups',
      command: 'dictionary_backup_show_all'
    }
  ],
  relatedCommands: ['dictionary_backup_create', 'dictionary_recover']
});

// dictionary_clean
registerCommandDescription('dictionary_clean', {
  description: createCommandDescription(
    'Cleans',
    'the DataSunrise dictionary',
    'on the server. ⚠️ This is a destructive operation and should be used with extreme caution.',
    'high', // Security impact: High, as it wipes configuration
    true,   // Stability impact: High
    true    // Service interruption: Yes, system will be reset
  ),
  detailedDescription: `
This command cleans (wipes) the DataSunrise system dictionary. 
This is a highly destructive operation that will remove all configurations and reset DataSunrise to a default state. 
It should only be used under specific guidance from DataSunrise support or when intentionally resetting the system. 
Ensure you have a valid backup before running this command.
  `,
  examples: [
    {
      description: 'Force clean the DataSunrise dictionary (USE WITH EXTREME CAUTION)',
      command: 'dictionary_clean -force true'
    }
  ],
  relatedCommands: ['dictionary_backup_create', 'dictionary_recover'],
  commonIssues: [
    'This command is irreversible without a backup.',
    'Accidental execution can lead to complete loss of DataSunrise configuration.'
  ],
  contextualHelp: {
    force: createParameterHelp(
      'Force clean without confirmation.',
      {
        suggestion: 'Always ensure you understand the implications before using -force true. A backup is highly recommended.',
        warning: 'This is a destructive operation. Set to true only if you are certain.'
      }
    )
  }
});

// dictionary_recover
registerCommandDescription('dictionary_recover', {
  description: createCommandDescription(
    'Recovers',
    'the DataSunrise dictionary from a specified backup ID',
    'on the server. This will overwrite the current configuration.',
    'high', // Security impact: High, restores previous security settings
    true,   // Stability impact: High
    true    // Service interruption: Yes, during restore
  ),
  detailedDescription: `
This command restores the DataSunrise system dictionary from a previously created backup, identified by its ID. 
This operation will overwrite all current DataSunrise configurations with the content of the backup. 
It is typically used for disaster recovery or to roll back to a previous known-good state.
The DataSunrise core engine may need to be restarted after recovery.
  `,
  examples: [
    {
      description: 'Recover dictionary from backup ID "backup12345"',
      command: 'dictionary_recover -id backup12345'
    }
  ],
  relatedCommands: ['dictionary_backup_create', 'dictionary_backup_show_all'],
  commonIssues: [
    'Ensure the backup ID is valid (use "dictionary_backup_show_all" to list).',
    'This operation will overwrite current settings. Ensure this is the intended action.'
  ],
  contextualHelp: {
    id: createParameterHelp(
      'ID of the dictionary backup to recover from.',
      {
        suggestion: 'Use "dictionary_backup_show_all" to get a list of valid backup IDs.'
      }
    )
  }
});
