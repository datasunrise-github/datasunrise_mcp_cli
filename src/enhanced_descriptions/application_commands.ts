import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// application_add
registerCommandDescription('application_add', {
  description: createCommandDescription(
    'Adds',
    'a new application definition',
    'to DataSunrise. Applications are logical entities used to group database clients or services for policy application.',
    'low' // securityImpact
  ),
  detailedDescription: `
This command creates a new application entity within DataSunrise. 
Applications serve as logical containers for database clients, services, or specific connection sources. 
They are primarily used in security and audit rules to define the scope of policy application based on the originating client application.
  `,
  examples: [
    {
      description: 'Add a new application named "WebApp1"',
      command: 'application_add -name WebApp1',
      notes: 'Application names must be unique.'
    }
  ],
  relatedCommands: ['application_update', 'application_show_one', 'application_delete', 'application_show_all'],
  commonIssues: ['Ensure the application name is unique; otherwise, the command will fail.'],
  contextualHelp: {
    name: createParameterHelp(
      'Unique name for the new application.',
      {
        suggestion: 'Use a descriptive name, e.g., "HR_Portal" or "ReportingService_Finance".'
      }
    )
  }
});

// application_update
registerCommandDescription('application_update', {
  description: createCommandDescription(
    'Updates',
    'an existing application\'s name',
    'in DataSunrise.',
    'low'
  ),
  detailedDescription: `
This command modifies the name of an existing application definition in DataSunrise. 
Use this if an application was named incorrectly or needs to be renamed due to changes in your environment.
  `,
  examples: [
    {
      description: 'Rename application "WebApp1" to "CustomerPortal"',
      command: 'application_update -name WebApp1 -newName CustomerPortal'
    }
  ],
  relatedCommands: ['application_add', 'application_show_one', 'application_delete'],
  commonIssues: [
    'Ensure the original application name exists.',
    'Ensure the new application name is unique.'
  ],
  contextualHelp: {
    name: createParameterHelp(
      'Current name of the application to be updated.',
      {
        suggestion: 'Verify the exact current name using "application_show_all".'
      }
    ),
    newName: createParameterHelp(
      'The new name for the application.',
      {
        suggestion: 'Choose a unique and descriptive new name.'
      }
    )
  }
});

// application_show_all
registerCommandDescription('application_show_all', {
  description: createCommandDescription(
    'Displays',
    'a list of all configured applications',
    'in DataSunrise.',
    'none'
  ),
  detailedDescription: 'This command retrieves and lists all application definitions currently configured in the DataSunrise environment.',
  examples: [
    {
      description: 'List all applications',
      command: 'application_show_all'
    }
  ],
  relatedCommands: ['application_add', 'application_show_one']
});

// application_show_one
registerCommandDescription('application_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific application',
    'in DataSunrise.',
    'none'
  ),
  detailedDescription: 'This command retrieves and displays the detailed configuration for a single, specified application.',
  examples: [
    {
      description: 'Show details for application "CustomerPortal"',
      command: 'application_show_one -name CustomerPortal'
    }
  ],
  relatedCommands: ['application_add', 'application_show_all', 'application_update'],
  contextualHelp: {
    name: createParameterHelp(
      'Name of the application to display.',
      {
        suggestion: 'Use "application_show_all" to find the exact name if unsure.'
      }
    )
  }
});

// application_delete
registerCommandDescription('application_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specified application',
    'from DataSunrise.',
    'medium' // Deleting an app can affect policies
  ),
  detailedDescription: `
This command removes an application definition from DataSunrise. 
Warning: Deleting an application that is currently used in active security or audit rules may affect policy enforcement. 
Ensure the application is no longer needed or referenced before deleting.
  `,
  examples: [
    {
      description: 'Delete application "OldWebApp"',
      command: 'application_delete -name OldWebApp'
    }
  ],
  relatedCommands: ['application_add', 'application_show_one'],
  commonIssues: ['Verify the application is not in use by any active policies before deletion.'],
  contextualHelp: {
    name: createParameterHelp(
      'Name of the application to delete.',
      {
        suggestion: 'Double-check the application name and its usage in policies before deletion.'
      }
    )
  }
});
