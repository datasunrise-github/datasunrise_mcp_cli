import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// tag_add
registerCommandDescription('tag_add', {
  description: createCommandDescription(
    'Adds',
    'a tag (key-value pair, though value is often implicit or not set via CLI) to a DataSunrise entity',
    '(Rule, Periodic Task, Object Group). Helps in organizing and filtering entities.',
    'low'
  ),
  detailedDescription: `
This command associates a tag with a specific DataSunrise entity such as a Rule, Periodic Task, or Object Group. 
Tags are simple labels (often key-only, or key with an implicit value of 'true') that help categorize, 
filter, and manage configurations within DataSunrise. For example, you could tag rules by department, compliance standard, or project.
  `,
  examples: [
    {
      description: 'Add tag "Compliance:PCI" to Rule "CreditCardAuditRule"',
      command: 'tag_add -name "Compliance:PCI" -entityType Rule -entityName CreditCardAuditRule'
    },
    {
      description: 'Tag Periodic Task "DailyBackup" with "Critical"',
      command: 'tag_add -name Critical -entityType "Periodic Task" -entityName DailyBackup'
      // Note: "Periodic Task" might need specific casing or exact name as per DataSunrise enum for entityType.
    }
  ],
  relatedCommands: ['tag_update', 'tag_show_for_entity', 'tag_delete', 'tag_show_tagged_entities'],
  contextualHelp: {
    name: createParameterHelp(
      'The key/name of the tag to add.',
      { suggestion: 'Use a consistent naming convention, e.g., "Department:Finance", "Project:Alpha", "Status:Review".' }
    ),
    entityType: createParameterHelp(
      'Type of the entity to tag (Rule, Periodic Task, Object Group).',
      { suggestion: 'Ensure this matches the exact entity type name used by DataSunrise.' }
    ),
    entityName: createParameterHelp(
      'Name of the specific entity instance to tag.',
      { suggestion: 'This is the unique name of the rule, task, or group.' }
    )
  }
});

// tag_update
registerCommandDescription('tag_update', {
  description: createCommandDescription(
    'Updates',
    'an existing tag\'s key for a specific entity',
    'in DataSunrise.',
    'low'
  ),
  detailedDescription: 'This command allows you to change the name (key) of an existing tag associated with a DataSunrise entity.',
  examples: [
    {
      description: 'Rename tag "OldProjectTag" to "ProjectPhoenix" for Rule "MainRule"',
      command: 'tag_update -name OldProjectTag -newName ProjectPhoenix -entityType Rule -entityName MainRule'
    }
  ],
  relatedCommands: ['tag_add', 'tag_show_for_entity'],
  contextualHelp: {
    name: createParameterHelp('Current key/name of the tag to update.'),
    newName: createParameterHelp('New key/name for the tag.'),
    entityType: createParameterHelp('Type of the entity the tag belongs to.'),
    entityName: createParameterHelp('Name of the entity the tag belongs to.')
  }
});

// tag_show_for_entity
registerCommandDescription('tag_show_for_entity', {
  description: createCommandDescription(
    'Displays',
    'all tags associated with a specific DataSunrise entity',
    '.',
    'none'
  ),
  examples: [
    {
      description: 'Show all tags for Rule "CreditCardAuditRule"',
      command: 'tag_show_for_entity -entityType Rule -entityName CreditCardAuditRule'
    }
  ],
  contextualHelp: {
    entityType: createParameterHelp('Type of the entity (Rule, Periodic Task, Object Group).'),
    entityName: createParameterHelp('Name of the entity whose tags to display.')
  }
});

// tag_show_one (Assuming this means showing a specific tag on a specific entity, if supported)
// If the CLI doesn't support showing a single tag by its name for an entity, this might be redundant with tag_show_for_entity.
registerCommandDescription('tag_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific tag on a specific entity',
    '(if supported, otherwise similar to tag_show_for_entity).',
    'none'
  ),
  examples: [
    {
      description: 'Show tag "Compliance:PCI" for Rule "CreditCardAuditRule"',
      command: 'tag_show_one -name "Compliance:PCI" -entityType Rule -entityName CreditCardAuditRule'
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Key/name of the tag to display.'),
    entityType: createParameterHelp('Type of the entity the tag belongs to.'),
    entityName: createParameterHelp('Name of the entity the tag belongs to.')
  }
});

// tag_show_tagged_entities
registerCommandDescription('tag_show_tagged_entities', {
  description: createCommandDescription(
    'Shows',
    'all DataSunrise entities that have at least one tag',
    '. Useful for finding tagged configurations.',
    'none'
  ),
  examples: [
    {
      description: 'List all entities that have been tagged',
      command: 'tag_show_tagged_entities'
    }
  ]
});

// tag_show_untagged_entities
registerCommandDescription('tag_show_untagged_entities', {
  description: createCommandDescription(
    'Shows',
    'all DataSunrise entities that do not have any tags',
    '. Helps identify configurations that may need categorization.',
    'none'
  ),
  examples: [
    {
      description: 'List all untagged entities',
      command: 'tag_show_untagged_entities'
    }
  ]
});

// tag_delete
registerCommandDescription('tag_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specific tag from a DataSunrise entity',
    '.',
    'low'
  ),
  examples: [
    {
      description: 'Delete tag "ObsoleteProject" from Rule "OldRule"',
      command: 'tag_delete -name ObsoleteProject -entityType Rule -entityName OldRule'
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Key/name of the tag to delete.'),
    entityType: createParameterHelp('Type of the entity from which to delete the tag.'),
    entityName: createParameterHelp('Name of the entity from which to delete the tag.')
  }
});
