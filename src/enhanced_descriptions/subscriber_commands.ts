import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// subscriber_add
registerCommandDescription('subscriber_add', {
  description: createCommandDescription(
    'Adds',
    'a new subscriber for notifications',
    'in DataSunrise. Subscribers are linked to pre-configured SMTP or SNMP servers.',
    'low'
  ),
  detailedDescription: `
This command creates a new subscriber entry in DataSunrise. 
Subscribers define who receives notifications (e.g., alerts, reports) and how they receive them. 
Each subscriber is associated with a pre-configured SMTP server (for email) or an SNMP server (for traps).
  `,
  examples: [
    {
      description: 'Add an email subscriber "AdminEmail" using SMTP server "MainSMTPServer"',
      command: 'subscriber_add -name AdminEmail -serverName MainSMTPServer -sendToAddress "admin@example.com"'
    },
    {
      description: 'Add an SNMP trap subscriber "NMSTraps" using SNMP server "PrimaryNMS"',
      command: 'subscriber_add -name NMSTraps -serverName PrimaryNMS -sendToAddress "10.0.0.5"' // Address here is SNMP trap receiver IP
    }
  ],
  relatedCommands: ['subscriber_update', 'subscriber_show_one', 'subscriber_delete', 'server_add_smtp', 'server_add_snmp'],
  commonIssues: ['Ensure the specified SMTP/SNMP server name exists and is correctly configured.'],
  contextualHelp: {
    name: createParameterHelp(
      'Unique name for the new subscriber.',
      { suggestion: 'e.g., "DBA_Alert_List", "SecurityTeam_SNMP", "Compliance_Reports_Email".' }
    ),
    serverName: createParameterHelp(
      'Name of the pre-configured SMTP or SNMP server to use for this subscriber.',
      { suggestion: 'Use "server_show_all" to list available servers.' }
    ),
    sendToAddress: createParameterHelp(
      'Email address (for SMTP) or SNMP trap destination (e.g., IP address for SNMP) for the subscriber.',
      { suggestion: 'For email: "user@example.com". For SNMP: "192.168.1.100".' }
    )
  }
});

// subscriber_update
registerCommandDescription('subscriber_update', {
  description: createCommandDescription(
    'Updates',
    'an existing subscriber\'s name, server, or notification address',
    'in DataSunrise.',
    'low'
  ),
  examples: [
    {
      description: 'Update subscriber "AdminEmail" to use a new email address and server',
      command: 'subscriber_update -name AdminEmail -sendToAddress "newadmin@example.com" -serverName BackupSMTPServer'
    }
  ],
  relatedCommands: ['subscriber_add', 'subscriber_show_one'],
  contextualHelp: {
    name: createParameterHelp('Current name of the subscriber to update.'),
    newName: createParameterHelp('New name for the subscriber. Must be unique if provided.'),
    serverName: createParameterHelp('New server name (SMTP/SNMP) for the subscriber.'),
    sendToAddress: createParameterHelp('New notification address (email or SNMP destination).')
  }
});

// subscriber_show_all
registerCommandDescription('subscriber_show_all', {
  description: createCommandDescription(
    'Displays',
    'a list of all configured subscribers',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all subscribers', command: 'subscriber_show_all' }]
});

// subscriber_show_one
registerCommandDescription('subscriber_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific subscriber',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show details for subscriber "AdminEmail"', command: 'subscriber_show_one -name AdminEmail' }],
  contextualHelp: { name: createParameterHelp('Name of the subscriber to display.') }
});

// subscriber_delete
registerCommandDescription('subscriber_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specified subscriber',
    'from DataSunrise.',
    'medium' // Deleting subscribers can stop important notifications
  ),
  detailedDescription: 'This command removes a subscriber definition. If this subscriber is used in any rule notifications or report distributions, those notifications will cease.',
  examples: [{ description: 'Delete subscriber "OldAlerts"', command: 'subscriber_delete -name OldAlerts' }],
  commonIssues: ['Verify the subscriber is not critical for receiving important alerts before deletion.'],
  contextualHelp: { name: createParameterHelp('Name of the subscriber to delete.') }
});
