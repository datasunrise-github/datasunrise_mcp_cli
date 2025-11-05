import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// ssl_key_group_add
registerCommandDescription('ssl_key_group_add', {
  description: createCommandDescription(
    'Adds',
    'a new SSL Key Group',
    'to DataSunrise. SSL Key Groups store SSL certificates and keys for secure connections. 🔒 Security-sensitive.',
    'medium' // Incorrect SSL setup can lead to insecure connections
  ),
  detailedDescription: `
This command creates a new SSL Key Group. SSL Key Groups are containers within DataSunrise for managing SSL/TLS certificates, 
private keys, and CA certificates. These are used to secure connections between DataSunrise components (like proxies) 
and target databases, or for client certificate authentication. 
Actual certificate files are typically uploaded via the DataSunrise UI or specific CLI commands for certificate import (if available) after the group is created.
  `,
  examples: [
    {
      description: 'Add a new SSL Key Group named "ClientCertAuth_Oracle"',
      command: 'ssl_key_group_add -name ClientCertAuth_Oracle'
    }
  ],
  relatedCommands: ['ssl_key_group_update', 'ssl_key_group_show_one', 'ssl_key_group_delete', 'instance_add_plus'], // Instances can use key groups
  commonIssues: ['Ensure the name is unique. After creation, you will need to add certificates to this group through the UI or other specific commands.'],
  contextualHelp: {
    name: createParameterHelp(
      'Unique name for the new SSL Key Group.',
      { suggestion: 'e.g., "Oracle_Prod_SSL", "WebApp_Client_Certs", "Default_Proxy_Certs".' }
    )
  }
});

// ssl_key_group_update
registerCommandDescription('ssl_key_group_update', {
  description: createCommandDescription(
    'Updates',
    'an existing SSL Key Group\'s name',
    'in DataSunrise.',
    'low'
  ),
  detailedDescription: 'This command allows you to rename an existing SSL Key Group. Managing the certificates within the group is typically done via other means.',
  examples: [
    {
      description: 'Rename SSL Key Group "Old_Certs" to "Archived_Certs"',
      command: 'ssl_key_group_update -name Old_Certs -newName Archived_Certs'
    }
  ],
  relatedCommands: ['ssl_key_group_add', 'ssl_key_group_show_one'],
  contextualHelp: {
    name: createParameterHelp('Current name of the SSL Key Group to update.'),
    newName: createParameterHelp('New name for the SSL Key Group. Must be unique if provided.')
  }
});

// ssl_key_group_show_all
registerCommandDescription('ssl_key_group_show_all', {
  description: createCommandDescription(
    'Displays',
    'a list of all configured SSL Key Groups',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all SSL Key Groups', command: 'ssl_key_group_show_all' }]
});

// ssl_key_group_show_one
registerCommandDescription('ssl_key_group_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific SSL Key Group',
    'in DataSunrise, which may include associated certificates.',
    'none'
  ),
  examples: [{ description: 'Show details for SSL Key Group "ClientCertAuth_Oracle"', command: 'ssl_key_group_show_one -name ClientCertAuth_Oracle' }],
  contextualHelp: { name: createParameterHelp('Name of the SSL Key Group to display.') }
});

// ssl_key_group_delete
registerCommandDescription('ssl_key_group_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specified SSL Key Group',
    'from DataSunrise. 🔒 Ensure it is not in use by any active configurations.',
    'high' // Deleting key groups can break SSL connections
  ),
  detailedDescription: `
This command removes an SSL Key Group and its associated certificates from DataSunrise. 
If this SSL Key Group is currently used by any instance configurations for SSL/TLS connections or client authentication, 
those connections may fail or become insecure after deletion. Verify dependencies before deleting.
  `,
  examples: [
    {
      description: 'Delete SSL Key Group "Expired_Certs" (USE WITH CAUTION)',
      command: 'ssl_key_group_delete -name Expired_Certs'
    }
  ],
  relatedCommands: ['ssl_key_group_add', 'instance_add_plus'],
  commonIssues: ['Ensure the SSL Key Group is not referenced by any active instance or proxy configurations before deletion.'],
  contextualHelp: {
    name: createParameterHelp('Name of the SSL Key Group to delete.')
  }
});
