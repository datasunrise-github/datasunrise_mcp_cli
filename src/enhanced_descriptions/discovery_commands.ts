import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// discovery_group_add
registerCommandDescription('discovery_group_add', {
  description: createCommandDescription(
    'Adds',
    'a new Discovery Group',
    'to DataSunrise. Discovery Groups containerize attributes (filters) for sensitive data searches.',
    'low'
  ),
  detailedDescription: `
This command creates a new Discovery Group. Discovery Groups are used to organize sets of discovery attributes (filters) 
that define criteria for searching sensitive data within databases or files. 
You can associate these groups with security standards like HIPAA or PCI DSS.
  `,
  examples: [
    {
      description: 'Add a Discovery Group for PCI DSS compliance',
      command: 'discovery_group_add -name PCI_DSS_Discovery -securityStandards "PCI DSS"'
    }
  ],
  relatedCommands: ['discovery_attribute_add', 'discovery_group_update', 'discovery_group_show_one', 'discovery_group_delete'],
  contextualHelp: {
    name: createParameterHelp(
      'Unique name for the new Discovery Group.',
      {
        suggestion: 'e.g., "PII_Data_Filters" or "Credit_Card_Search_Rules".'
      }
    ),
    securityStandards: createParameterHelp(
      'Comma-separated list of security standard names (e.g., HIPAA, PCI DSS) to associate with this group.',
      {
        suggestion: 'e.g., "HIPAA,GDPR". This helps in classifying discovery efforts.'
      }
    )
  }
});

// discovery_attribute_add
registerCommandDescription('discovery_attribute_add', {
  description: createCommandDescription(
    'Adds',
    'a discovery attribute (filter criteria) to an existing Discovery Group',
    'in DataSunrise. Defines how to find specific sensitive data.',
    'medium' // Correct attributes are key to effective discovery
  ),
  detailedDescription: `
This command adds a specific filter (attribute) to an existing Discovery Group. 
An attribute defines the criteria for finding sensitive data, such as column names, data types, 
content patterns (using regular expressions), or file name patterns.
  `,
  examples: [
    {
      description: 'Add an attribute to find SSN-like patterns in columns named "SSN" or "SocialSecurityNum"',
      command: 'discovery_attribute_add -group PCI_DSS_Discovery -name SSN_Pattern -colNames "SSN;SocialSecurityNum" -colType STRING -contTemplate "^\\\\d{3}-\\\\d{2}-\\\\d{4}$"'
    }
  ],
  relatedCommands: ['discovery_group_add', 'discovery_attribute_update', 'discovery_attribute_show', 'discovery_attribute_delete'],
  commonIssues: [
    'Ensure the specified Discovery Group exists.',
    'Regular expressions in -contTemplate must be correctly formatted for Java regex syntax.'
  ],
  contextualHelp: {
    group: createParameterHelp('Name of the existing Discovery Group to add this attribute to.'),
    name: createParameterHelp('Unique name for the new discovery attribute within the group.'),
    colNames: createParameterHelp('Semicolon-separated list of column names to match (e.g., "SSN;CREDIT_CARD").'),
    colNamesCS: createParameterHelp('Case-sensitive column name matching. Default: false.'),
    colType: createParameterHelp('Expected data type of columns (ANY, STRING, NUMBER, DATE, etc.).'),
    contTemplate: createParameterHelp('Regular expression to match against column content (for STRING types).'),
    contTemplateCS: createParameterHelp('Case-sensitive content template matching. Default: false.'),
    fileNameTemplate: createParameterHelp('Semicolon-separated file name patterns for file-based discovery (e.g., "*.log;data_*.csv").'),
    fileNameTemplateCS: createParameterHelp('Case-sensitive file name template matching. Default: false.'),
    min: createParameterHelp('Minimum numeric value for NUMBER type columns.'),
    max: createParameterHelp('Maximum numeric value for NUMBER type columns.'),
    minDate: createParameterHelp('Minimum date/timestamp (yyyy-MM-dd HH:mm:ss) for DATE types.'),
    maxDate: createParameterHelp('Maximum date/timestamp (yyyy-MM-dd HH:mm:ss) for DATE types.'),
    nameSeparator: createParameterHelp('Separator for multi-value string parameters like colNames. Default: ";".')
  }
});

// discovery_group_update
registerCommandDescription('discovery_group_update', {
  description: createCommandDescription(
    'Updates',
    'an existing Discovery Group\'s name or associated security standards',
    'in DataSunrise.',
    'low'
  ),
  examples: [
    {
      description: 'Rename Discovery Group "Old_PCI" to "Current_PCI_Rules" and update standards',
      command: 'discovery_group_update -name Old_PCI -newName Current_PCI_Rules -securityStandards "PCI DSS v4.0"'
    }
  ],
  relatedCommands: ['discovery_group_add', 'discovery_group_show_one'],
  contextualHelp: {
    name: createParameterHelp('Current name of the Discovery Group to update.'),
    newName: createParameterHelp('New name for the Discovery Group. Must be unique if provided.'),
    securityStandards: createParameterHelp('Comma-separated list of security standard names to set. Replaces existing.')
  }
});

// discovery_attribute_update
registerCommandDescription('discovery_attribute_update', {
  description: createCommandDescription(
    'Updates',
    'an existing discovery attribute within a Discovery Group',
    'in DataSunrise.',
    'medium'
  ),
  examples: [
    {
      description: 'Update the content template for attribute "SSN_Pattern" in group "PCI_DSS_Discovery"',
      command: 'discovery_attribute_update -group PCI_DSS_Discovery -name SSN_Pattern -contTemplate "^[0-9]{9}$"'
    }
  ],
  relatedCommands: ['discovery_attribute_add', 'discovery_attribute_show'],
  contextualHelp: {
    group: createParameterHelp('Name of the Discovery Group containing the attribute.'),
    name: createParameterHelp('Current name of the discovery attribute to update.'),
    newName: createParameterHelp('New name for the discovery attribute. Must be unique within the group if provided.'),
    colNames: createParameterHelp('Semicolon-separated list of column names to match.'),
    colNamesCS: createParameterHelp('Case-sensitive column name matching.'),
    colType: createParameterHelp('Expected data type of columns.'),
    contTemplate: createParameterHelp('Regular expression for column content.'),
    contTemplateCS: createParameterHelp('Case-sensitive content template matching.')
    // Add other updatable attribute params
  }
});

// discovery_group_copy
registerCommandDescription('discovery_group_copy', {
  description: createCommandDescription(
    'Copies',
    'an existing Discovery Group and its attributes',
    'in DataSunrise.',
    'low'
  ),
  detailedDescription: 'This command creates a duplicate of an existing Discovery Group, including all its associated attributes. Useful for creating variations of existing rule sets.',
  examples: [
    {
      description: 'Copy Discovery Group "PCI_DSS_Discovery" to "PCI_DSS_Discovery_Test"',
      command: 'discovery_group_copy -name PCI_DSS_Discovery -newName PCI_DSS_Discovery_Test'
    }
  ],
  relatedCommands: ['discovery_group_add', 'discovery_group_show_one'],
  contextualHelp: {
    name: createParameterHelp('Name of the Discovery Group to copy.'),
    newName: createParameterHelp('Name for the new copied Discovery Group. If omitted, a default name is generated.')
  }
});

// discovery_group_show_all
registerCommandDescription('discovery_group_show_all', {
  description: createCommandDescription(
    'Displays',
    'a list of all configured Discovery Groups',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all Discovery Groups', command: 'discovery_group_show_all' }]
});

// discovery_group_show_one
registerCommandDescription('discovery_group_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific Discovery Group, including its attributes',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show details for Discovery Group "PII_Data_Filters"', command: 'discovery_group_show_one -name PII_Data_Filters' }],
  contextualHelp: { name: createParameterHelp('Name of the Discovery Group to display.') }
});

// discovery_attribute_show
registerCommandDescription('discovery_attribute_show', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific discovery attribute within a group',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show attribute "SSN_Pattern" in group "PCI_DSS_Discovery"', command: 'discovery_attribute_show -group PCI_DSS_Discovery -name SSN_Pattern' }],
  contextualHelp: {
    group: createParameterHelp('Name of the Discovery Group.'),
    name: createParameterHelp('Name of the discovery attribute to display.')
  }
});

// discovery_group_delete
registerCommandDescription('discovery_group_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specified Discovery Group and all its attributes',
    'from DataSunrise.',
    'medium' // Deleting groups can affect discovery tasks
  ),
  examples: [{ description: 'Delete Discovery Group "Temporary_Filters"', command: 'discovery_group_delete -name Temporary_Filters' }],
  contextualHelp: { name: createParameterHelp('Name of the Discovery Group to delete.') }
});

// discovery_attribute_delete
registerCommandDescription('discovery_attribute_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specific discovery attribute from a Discovery Group',
    'in DataSunrise.',
    'medium'
  ),
  examples: [{ description: 'Delete attribute "Old_Rule" from group "PII_Data_Filters"', command: 'discovery_attribute_delete -group PII_Data_Filters -name Old_Rule' }],
  contextualHelp: {
    group: createParameterHelp('Name of the Discovery Group from which to delete the attribute.'),
    name: createParameterHelp('Name of the discovery attribute to delete.')
  }
});
