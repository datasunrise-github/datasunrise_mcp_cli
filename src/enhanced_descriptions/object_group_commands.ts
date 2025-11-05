import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// object_group_add
registerCommandDescription('object_group_add', {
  description: createCommandDescription(
    'Adds',
    'a new Object Group',
    'to DataSunrise. Object Groups are used to logically group database objects (tables, columns, schemas, etc.) for policy application.',
    'low'
  ),
  detailedDescription: `
This command creates a new Object Group. Object Groups allow you to define collections of database objects 
(like specific tables, columns, schemas, or even all objects of a certain type) that can then be referenced 
in security, audit, or masking rules. This simplifies policy management for multiple database objects.
Actual members (database objects) are typically added to the group via the DataSunrise UI or specific 'add member' CLI commands if available (not listed here).
  `,
  examples: [
    {
      description: 'Add a new Object Group named "PII_Tables"',
      command: 'object_group_add -name PII_Tables'
    }
  ],
  relatedCommands: ['object_group_update', 'object_group_show_one', 'object_group_delete'],
  commonIssues: ['Object Group names must be unique.'],
  contextualHelp: {
    name: createParameterHelp(
      'Unique name for the new Object Group.',
      {
        suggestion: 'e.g., "SensitiveCustomerData", "FinancialTables", "AllAuditObjects".'
      }
    )
  }
});

// object_group_update
registerCommandDescription('object_group_update', {
  description: createCommandDescription(
    'Updates',
    'an existing Object Group\'s name', // Assuming CLI only supports renaming, not member management here
    'in DataSunrise.',
    'low'
  ),
  detailedDescription: `
This command updates the name of an existing Object Group. 
Note: Managing the members of an Object Group (adding/removing database objects) is typically done through the DataSunrise UI or more specific CLI commands if they exist for member management. This command primarily handles renaming the group itself.
  `,
  examples: [
    {
      description: 'Rename Object Group "Old_PII" to "Current_PII_Tables"',
      command: 'object_group_update -name Old_PII -newName Current_PII_Tables'
    }
  ],
  relatedCommands: ['object_group_add', 'object_group_show_one'],
  contextualHelp: {
    name: createParameterHelp(
      'Current name of the Object Group to update.'
    ),
    newName: createParameterHelp(
      'New name for the Object Group. Must be unique if provided.'
    )
  }
});

// object_group_show_all
registerCommandDescription('object_group_show_all', {
  description: createCommandDescription(
    'Displays',
    'a list of all configured Object Groups',
    'in DataSunrise.',
    'none'
  ),
  examples: [
    {
      description: 'List all Object Groups',
      command: 'object_group_show_all'
    }
  ]
});

// object_group_show_one
registerCommandDescription('object_group_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific Object Group, including its members',
    'in DataSunrise.',
    'none'
  ),
  detailedDescription: 'This command retrieves and displays details for a specific Object Group, which may include the list of database objects (tables, columns, etc.) that are members of this group.',
  examples: [
    {
      description: 'Show details for Object Group "PII_Tables"',
      command: 'object_group_show_one -name PII_Tables'
    }
  ],
  contextualHelp: {
    name: createParameterHelp(
      'Name of the Object Group to display.'
    )
  }
});

// object_group_delete
registerCommandDescription('object_group_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specified Object Group',
    'from DataSunrise. This does not delete the actual database objects.',
    'medium' // Deleting groups can affect policies
  ),
  detailedDescription: `
This command removes an Object Group definition from DataSunrise. 
Deleting an Object Group can affect any security, audit, or masking rules that reference it. 
The actual database objects (tables, columns, etc.) that were members of the group are not affected by this operation.
  `,
  examples: [
    {
      description: 'Delete Object Group "Temporary_Objects"',
      command: 'object_group_delete -name Temporary_Objects'
    }
  ],
  relatedCommands: ['object_group_add', 'object_group_show_one'],
  commonIssues: ['Ensure the Object Group is not referenced by active policies before deletion to avoid unintended consequences.'],
  contextualHelp: {
    name: createParameterHelp(
      'Name of the Object Group to delete.'
    )
  }
});
