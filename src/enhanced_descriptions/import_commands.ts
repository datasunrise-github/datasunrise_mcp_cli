import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// import_users
registerCommandDescription('import_users', {
  description: createCommandDescription(
    'Imports',
    'DataSunrise users from a specified CSV file',
    'into the system. Useful for bulk user creation.',
    'medium' // Security impact: Potentially adding many users
  ),
  detailedDescription: `
This command allows for bulk import of DataSunrise administrative user definitions from a CSV file. 
The CSV file must follow a specific format for columns like login, password, role, email, etc. 
This is useful for migrating users or setting up multiple user accounts quickly.
  `,
  examples: [
    {
      description: 'Import DataSunrise users from "ds_users.csv"',
      command: 'import_users -fileName "/path/to/ds_users.csv"'
    }
  ],
  relatedCommands: ['ds_user_add', 'ds_user_show_all'],
  commonIssues: [
    'Ensure the CSV file is correctly formatted according to DataSunrise specifications.',
    'Passwords in the CSV might need to adhere to complexity rules if not already hashed.',
    'Roles specified in the CSV must exist in DataSunrise.'
  ],
  contextualHelp: {
    fileName: createParameterHelp(
      'Path to the CSV file containing user data to import.',
      {
        suggestion: 'Provide an absolute path or a path relative to where dscli is executed. Ensure the file is readable by the DataSunrise service.'
      }
    )
  }
});

// import_hosts
registerCommandDescription('import_hosts', {
  description: createCommandDescription(
    'Imports',
    'host definitions from a specified CSV file',
    'into DataSunrise. Useful for bulk host/network entry.',
    'low'
  ),
  detailedDescription: `
This command allows for bulk import of host, network, or IP range definitions from a CSV file. 
The CSV file must follow a specific format for columns like name, host/network details, etc. 
This is useful for populating DataSunrise with many network entities quickly.
  `,
  examples: [
    {
      description: 'Import host definitions from "network_entities.csv"',
      command: 'import_hosts -fileName "/path/to/network_entities.csv"'
    }
  ],
  relatedCommands: ['host_add', 'host_show_all'],
  commonIssues: ['Ensure the CSV file format matches DataSunrise requirements for host imports.'],
  contextualHelp: {
    fileName: createParameterHelp(
      'Path to the CSV file containing host data to import.',
      {
        suggestion: 'Provide an absolute path or a path relative to where dscli is executed.'
      }
    )
  }
});

// import_apps
registerCommandDescription('import_apps', {
  description: createCommandDescription(
    'Imports',
    'application definitions from a specified CSV file',
    'into DataSunrise. Useful for bulk application entry.',
    'low'
  ),
  detailedDescription: `
This command allows for bulk import of application definitions from a CSV file. 
The CSV file must follow a specific format, typically requiring application names. 
This is useful for quickly adding multiple application entities that will be used in policies.
  `,
  examples: [
    {
      description: 'Import application definitions from "client_apps.csv"',
      command: 'import_apps -fileName "/path/to/client_apps.csv"'
    }
  ],
  relatedCommands: ['application_add', 'application_show_all'],
  commonIssues: ['Ensure the CSV file format matches DataSunrise requirements for application imports.'],
  contextualHelp: {
    fileName: createParameterHelp(
      'Path to the CSV file containing application data to import.',
      {
        suggestion: 'Provide an absolute path or a path relative to where dscli is executed.'
      }
    )
  }
});
