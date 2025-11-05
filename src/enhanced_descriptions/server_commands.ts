import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// server_add (Generic, assuming it's a base for specific types like SMTP/SNMP)
// If 'server_add' is not a direct command but rather specific ones like 'server_add_smtp' are used,
// then this generic one might not need a detailed description or could be omitted.
// For now, providing a general one.
registerCommandDescription('server_add', {
  description: createCommandDescription(
    'Adds',
    'a new server configuration (e.g., SMTP, SNMP)',
    'to DataSunrise for notifications or integrations. Use specific commands like server_add_smtp for detailed setup.',
    'low'
  ),
  detailedDescription: `
This is a general command for adding server configurations. 
DataSunrise integrates with various external servers for functions like email notifications (SMTP) or sending traps (SNMP).
It's often better to use more specific commands like 'server_add_smtp' or 'server_add_snmp' if available, 
as they provide parameters tailored to that server type.
  `,
  examples: [
    {
      description: 'Add a generic server (less common, prefer specific types)',
      command: 'server_add -name MyGenericServer -serverType SMTP -host smtp.example.com -port 25'
    }
  ],
  relatedCommands: ['server_add_smtp', 'server_add_snmp', 'server_update', 'server_show_one', 'server_delete_by_name'],
  contextualHelp: {
    name: createParameterHelp('Unique name for the new server configuration.'),
    serverType: createParameterHelp('Type of server (SMTP, SNMP, etc.). This determines required parameters.'),
    host: createParameterHelp('Hostname or IP address of the server.'),
    port: createParameterHelp('Port number of the server.'),
    mailFrom: createParameterHelp('For SMTP: Email address to use as sender ("Mail From").')
  }
});

// server_add_smtp
registerCommandDescription('server_add_smtp', {
  description: createCommandDescription(
    'Adds',
    'a new SMTP server configuration for email notifications',
    'to DataSunrise.',
    'low'
  ),
  detailedDescription: `
This command configures an SMTP (Simple Mail Transfer Protocol) server in DataSunrise. 
SMTP servers are used to send email notifications for alerts, reports, and system events.
  `,
  examples: [
    {
      description: 'Add an SMTP server "Office365_SMTP" with authentication',
      command: 'server_add_smtp -name Office365_SMTP -host smtp.office365.com -port 587 -mailFrom "noreply@example.com" -login "user@example.com" -password "SmtpPassword!" -certificate true'
    }
  ],
  relatedCommands: ['server_update', 'subscriber_add'], // Subscribers use SMTP servers
  contextualHelp: {
    name: createParameterHelp('Unique name for the SMTP server configuration.'),
    host: createParameterHelp('Hostname or IP address of the SMTP server.'),
    port: createParameterHelp('Port number of the SMTP server (e.g., 25, 465 for SSL, 587 for TLS).'),
    mailFrom: createParameterHelp('Email address to use as the sender ("Mail From").'),
    login: createParameterHelp('Login username for SMTP authentication (if required by the server).'),
    password: createParameterHelp('Password for SMTP authentication. This is sensitive.'),
    certificate: createParameterHelp('Enable SSL/TLS certificate usage for secure connection. Default: true (or based on DataSunrise context).')
  }
});

// server_add_snmp
registerCommandDescription('server_add_snmp', {
  description: createCommandDescription(
    'Adds',
    'a new SNMP server configuration for SNMP trap notifications',
    'to DataSunrise.',
    'low'
  ),
  detailedDescription: `
This command configures an SNMP (Simple Network Management Protocol) server (trap receiver) in DataSunrise. 
SNMP servers are used to send SNMP traps for alerts and system events to network management systems.
  `,
  examples: [
    {
      description: 'Add an SNMP trap receiver "NMS_Server" with community string "public"',
      command: 'server_add_snmp -name NMS_Server -host nms.example.com -port 162 -login "public"'
    }
  ],
  relatedCommands: ['server_update', 'subscriber_add'], // Subscribers can also use SNMP
  contextualHelp: {
    name: createParameterHelp('Unique name for the SNMP server configuration.'),
    host: createParameterHelp('Hostname or IP address of the SNMP server/trap receiver.'),
    port: createParameterHelp('Port number of the SNMP server (typically 162 for traps).'),
    login: createParameterHelp('SNMP community string (for v1/v2c) or user (for SNMPv3).')
    // Add version, auth protocol, priv protocol, etc. for SNMPv3 if supported
  }
});

// server_update
registerCommandDescription('server_update', {
  description: createCommandDescription(
    'Updates',
    'an existing server configuration\'s name or other properties',
    'in DataSunrise.',
    'low'
  ),
  examples: [
    {
      description: 'Rename server "OldSMTPServer" to "NewSMTPServer" and change its host',
      command: 'server_update -name OldSMTPServer -newName NewSMTPServer -host mail.newdomain.com'
    }
  ],
  relatedCommands: ['server_add_smtp', 'server_add_snmp', 'server_show_one'],
  contextualHelp: {
    name: createParameterHelp('Current name of the server configuration to update.'),
    newName: createParameterHelp('New name for the server configuration. Must be unique if provided.'),
    host: createParameterHelp('New hostname or IP address for the server.'),
    port: createParameterHelp('New port number for the server.')
    // Add other updatable params specific to server type (SMTP/SNMP)
  }
});

// server_show_all
registerCommandDescription('server_show_all', {
  description: createCommandDescription(
    'Displays',
    'a list of all configured servers (SMTP, SNMP, etc.)',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all configured servers', command: 'server_show_all' }]
});

// server_show_one
registerCommandDescription('server_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific server configuration',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show details for server "Office365_SMTP"', command: 'server_show_one -name Office365_SMTP' }],
  contextualHelp: { name: createParameterHelp('Name of the server configuration to display.') }
});

// server_delete_by_name
registerCommandDescription('server_delete_by_name', {
  description: createCommandDescription(
    'Deletes',
    'a server configuration by its name',
    'from DataSunrise.',
    'medium' // Deleting servers can affect notifications/integrations
  ),
  examples: [{ description: 'Delete server "OldNMS"', command: 'server_delete_by_name -name OldNMS' }],
  contextualHelp: { name: createParameterHelp('Name of the server configuration to delete.') }
});

// server_delete_by_id
registerCommandDescription('server_delete_by_id', {
  description: createCommandDescription(
    'Deletes',
    'a server configuration by its ID',
    'from DataSunrise.',
    'medium'
  ),
  examples: [{ description: 'Delete server with ID "server_id_123"', command: 'server_delete_by_id -id server_id_123' }],
  contextualHelp: { id: createParameterHelp('ID of the server configuration to delete. Use "server_show_all" to find IDs.') }
});
