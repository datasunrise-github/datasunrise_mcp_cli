import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// cef_add_group
registerCommandDescription('cef_add_group', {
  description: createCommandDescription(
    'Adds',
    'a new CEF (Common Event Format) group',
    'to DataSunrise. CEF groups organize configurations for exporting audit data to SIEM systems.',
    'low'
  ),
  detailedDescription: `
This command creates a new group for CEF configurations. 
CEF groups are used to logically organize different sets of CEF item configurations, 
which define how DataSunrise audit events are formatted and exported to SIEM systems or syslog servers.
  `,
  examples: [
    {
      description: 'Add a new CEF group named "SIEM_Export_Group"',
      command: 'cef_add_group -name SIEM_Export_Group -enable true'
    }
  ],
  relatedCommands: ['cef_update_group', 'cef_show_groups', 'cef_delete_group', 'cef_add_item'],
  commonIssues: ['Ensure the CEF group name is unique within DataSunrise.'],
  contextualHelp: {
    name: createParameterHelp(
      'Unique name for the new CEF group.',
      {
        suggestion: 'Use a name that reflects the purpose or destination of the CEF data, e.g., "Splunk_CEF_Events" or "ArcSight_Audit_Logs". Must not contain spaces or special characters other than underscore.'
      }
    ),
    enable: createParameterHelp(
      'Enables or disables the CEF group upon creation. If disabled, items within it will not be processed.',
      {
        suggestion: 'Set to true to activate the group immediately, or false to configure it first and enable later via "cef_update_group".'
      }
    )
  }
});

// cef_add_item
registerCommandDescription('cef_add_item', {
  description: createCommandDescription(
    'Adds',
    'a new CEF item to a specified CEF group',
    'in DataSunrise. CEF items define how specific DataSunrise events are formatted into CEF messages.',
    'medium' // Configuring CEF items correctly is important for SIEM integration
  ),
  detailedDescription: `
This command adds a new CEF item configuration to an existing CEF group. 
Each CEF item specifies a DataSunrise event type (e.g., LOGIN_SUCCESSFUL, RULE_MATCHED) and the CEF string format 
that should be used to convert this event into a CEF message for export. 
Properly configured CEF items are crucial for successful SIEM integration.
  `,
  examples: [
    {
      description: 'Add a CEF item for successful logins to "SIEM_Export_Group"',
      command: 'cef_add_item -name LoginSuccessCEF -groupName SIEM_Export_Group -type "Session Open" -cef "CEF:0|DataSunrise|DataSunrise Suite|8.0|Session Open|User login successful|Low|src=%s suser=%s"',
      notes: 'The -cef parameter requires a valid CEF formatted string with placeholders for event data.'
    }
  ],
  relatedCommands: ['cef_update_item', 'cef_show_items', 'cef_delete_item', 'cef_add_group'],
  commonIssues: [
    'Ensure the CEF group specified by -groupName already exists.',
    'The -cef format string must adhere to CEF specifications. Refer to DataSunrise and CEF documentation for correct placeholders (e.g., %s for source IP, %u for user).',
    'The event type must be a valid DataSunrise event identifier.'
  ],
  contextualHelp: {
    name: createParameterHelp(
      'Unique name for the new CEF item configuration within its group.',
      { suggestion: 'e.g., "Logon_Events_Format", "Failed_Query_CEF".'}
    ),
    groupName: createParameterHelp(
      'Name of the existing CEF group to add this item to.',
      {
        suggestion: 'Use "cef_show_groups" to list available CEF groups. This group must exist before adding items to it.'
      }
    ),
    type: createParameterHelp(
      'Type of DataSunrise event this CEF item handles (e.g., LOGIN_SUCCESSFUL, RULE_MATCHED, SESSION_OPEN, QUERY_EXECUTED).',
      {
        suggestion: 'Consult DataSunrise documentation for a comprehensive list of available event types. Default is "Session Open". The choice of event type determines which placeholders are available in the CEF string.'
      }
    ),
    cef: createParameterHelp(
      'The CEF format string for the log message. This string defines how event data is structured for your SIEM.',
      {
        suggestion: 'Example: "CEF:0|DataSunrise|DataSunriseDBFirewall|1.0|%event_id%|%event_name%|%severity%|src=%src_ip% suser=%user_name% msg=%details%". Placeholders like %s, %u, %d, %event_id%, etc., are substituted with actual event data.'
      }
    ),
    enable: createParameterHelp(
      'Enables or disables this CEF item upon creation. If disabled, events of this type will not be formatted or sent using this item\'s configuration.',
      { suggestion: 'Default is true. Set to false if you want to define the item but not activate it immediately.'}
    )
  }
});

// cef_update_group
registerCommandDescription('cef_update_group', {
  description: createCommandDescription(
    'Updates',
    'an existing CEF group\'s name or enabled state',
    'in DataSunrise.',
    'low'
  ),
  examples: [
    {
      description: 'Rename CEF group "Old_Group" to "New_CEF_Group" and enable it',
      command: 'cef_update_group -name Old_Group -newName New_CEF_Group -enable true'
    }
  ],
  relatedCommands: ['cef_add_group', 'cef_show_groups', 'cef_delete_group'],
  commonIssues: ['If renaming, ensure the new name is unique. If changing enable state, consider impact on items within the group.'],
  contextualHelp: {
    name: createParameterHelp('Current name of the CEF group to update. This name identifies the group to be modified.'),
    newName: createParameterHelp('New name for the CEF group. Must be unique if provided. If omitted, the name is not changed.'),
    enable: createParameterHelp('Set the enabled state of the CEF group (true or false). If a group is disabled, none of its items will be active.')
  }
});

// cef_update_item
registerCommandDescription('cef_update_item', {
  description: createCommandDescription(
    'Updates',
    'an existing CEF item',
    'within a CEF group in DataSunrise.',
    'medium'
  ),
  examples: [
    {
      description: 'Update the CEF string for "LoginSuccessCEF" in group "SIEM_Export_Group"',
      command: 'cef_update_item -name LoginSuccessCEF -groupName SIEM_Export_Group -cef "CEF:0|DataSunrise|Security|8.1|LOGIN_SUCCESS|User login|1|src=%s suser=%s dhost=%s"'
    }
  ],
  relatedCommands: ['cef_add_item', 'cef_show_items', 'cef_delete_item'],
  commonIssues: ['Ensure the item and its group exist. Verify CEF string syntax if updating the -cef parameter.'],
  contextualHelp: {
    name: createParameterHelp('Current name of the CEF item to update. This identifies the item to be modified within its group.'),
    groupName: createParameterHelp('Name of the CEF group the item belongs to. This is crucial for locating the correct item.'),
    newName: createParameterHelp('New name for the CEF item. Must be unique within the group if provided. If omitted, name is not changed.'),
    type: createParameterHelp('New event type for the CEF item. Must be a valid DataSunrise event type.'),
    cef: createParameterHelp('New CEF format string for the item. Ensure correct syntax and placeholders.'),
    enable: createParameterHelp('Set the enabled state of the CEF item (true or false).')
  }
});

// cef_show_groups
registerCommandDescription('cef_show_groups', {
  description: createCommandDescription(
    'Displays',
    'a list of all configured CEF groups',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all CEF groups', command: 'cef_show_groups' }],
  relatedCommands: ['cef_add_group', 'cef_show_group', 'cef_show_items']
});

// cef_show_group
registerCommandDescription('cef_show_group', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific CEF group, including its items',
    'in DataSunrise.',
    'none'
  ),
  examples: [
    {
      description: 'Show details for CEF group "SIEM_Export_Group"',
      command: 'cef_show_group -name SIEM_Export_Group'
    }
  ],
  relatedCommands: ['cef_show_groups', 'cef_show_items', 'cef_add_item'],
  contextualHelp: {
    name: createParameterHelp('Name of the CEF group to display. Use "cef_show_groups" to find available group names.')
  }
});

// cef_show_items
registerCommandDescription('cef_show_items', {
  description: createCommandDescription(
    'Displays',
    'all CEF items within a specified CEF group',
    'in DataSunrise.',
    'none'
  ),
  examples: [
    {
      description: 'List all CEF items in group "SIEM_Export_Group"',
      command: 'cef_show_items -groupName SIEM_Export_Group'
    }
  ],
  relatedCommands: ['cef_add_item', 'cef_show_item', 'cef_show_group', 'cef_update_item'],
  contextualHelp: {
    groupName: createParameterHelp('Name of the CEF group whose items are to be displayed. This group must exist.')
  }
});

// cef_show_item
registerCommandDescription('cef_show_item', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific CEF item within a group',
    'in DataSunrise.',
    'none'
  ),
  examples: [
    {
      description: 'Show details for CEF item "LoginSuccessCEF" in group "SIEM_Export_Group"',
      command: 'cef_show_item -name LoginSuccessCEF -groupName SIEM_Export_Group'
    }
  ],
  relatedCommands: ['cef_add_item', 'cef_show_items', 'cef_update_item'],
  contextualHelp: {
    name: createParameterHelp('Name of the CEF item to display. This item must exist within the specified group.'),
    groupName: createParameterHelp('Name of the CEF group the item belongs to. This group must exist.')
  }
});

// cef_delete_group
registerCommandDescription('cef_delete_group', {
  description: createCommandDescription(
    'Deletes',
    'a specified CEF group',
    'from DataSunrise. The group must be empty of CEF items.',
    'medium' // Deleting can impact SIEM logging
  ),
  detailedDescription: `
This command removes a CEF group. Before deleting a group, all CEF items within it must be deleted first. 
Deleting a CEF group can impact your SIEM integration if it's actively used for exporting logs.
  `,
  examples: [
    {
      description: 'Delete CEF group "Old_CEF_Group"',
      command: 'cef_delete_group -name Old_CEF_Group'
    }
  ],
  relatedCommands: ['cef_add_group', 'cef_delete_item', 'cef_show_items'],
  commonIssues: ['Ensure the group is empty (delete all its items first using "cef_delete_item") before attempting to delete the group. This action cannot be undone easily.'],
  contextualHelp: {
    name: createParameterHelp('Name of the CEF group to delete. Double-check the name before execution.')
  }
});

// cef_delete_item
registerCommandDescription('cef_delete_item', {
  description: createCommandDescription(
    'Deletes',
    'a specific CEF item from a CEF group',
    'in DataSunrise.',
    'medium'
  ),
  examples: [
    {
      description: 'Delete CEF item "ObsoleteItem" from group "SIEM_Export_Group"',
      command: 'cef_delete_item -name ObsoleteItem -groupName SIEM_Export_Group'
    }
  ],
  relatedCommands: ['cef_add_item', 'cef_delete_group', 'cef_show_items'],
  commonIssues: ['This action permanently removes the CEF item configuration. Ensure it is no longer needed.'],
  contextualHelp: {
    name: createParameterHelp('Name of the CEF item to delete from the specified group.'),
    groupName: createParameterHelp('Name of the CEF group from which to delete the item. Both group and item must exist.')
  }
});
