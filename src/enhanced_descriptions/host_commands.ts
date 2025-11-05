import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// host_add
registerCommandDescription('host_add', {
  description: createCommandDescription(
    'Adds',
    'a new host, network, or IP address range definition',
    'to DataSunrise. These are used in policies and user/group definitions.',
    'low'
  ),
  detailedDescription: `
This command defines a network entity in DataSunrise, which can be a single host (by name or IP), 
an entire network (IPv4 or IPv6), or a range of IP addresses. 
These definitions are then used as criteria in security policies, audit rules, or for whitelisting/blacklisting user access.
You must provide parameters for one type of host entry (single host, network, or IP range).
  `,
  examples: [
    {
      description: 'Add a single host by FQDN',
      command: 'host_add -name "appserver1.example.com" -host "appserver1.example.com"'
    },
    {
      description: 'Add an IPv4 network',
      command: 'host_add -name "InternalNetwork" -netIPv4 "192.168.1.0" -netMaskV4 "255.255.255.0"'
    },
    {
      description: 'Add an IPv4 range',
      command: 'host_add -name "GuestWifiRange" -startIPv4 "10.10.0.100" -endIPv4 "10.10.0.200"'
    }
  ],
  relatedCommands: ['host_group_add', 'host_update', 'host_show_one', 'host_delete'],
  commonIssues: ['Ensure IP addresses, masks, and ranges are correctly formatted.'],
  contextualHelp: {
    name: createParameterHelp('Logical name for this host/network/range entry. Must be unique.'),
    host: createParameterHelp('Hostname or single IP address (e.g., "myserver.com" or "192.168.1.100"). Use for single hosts.'),
    netIPv4: createParameterHelp('IPv4 network address (e.g., "192.168.1.0"). Requires -netMaskV4.'),
    netMaskV4: createParameterHelp('Subnet mask for IPv4 network (e.g., "255.255.255.0"). Requires -netIPv4.'),
    netIPv6: createParameterHelp('IPv6 network address with prefix (e.g., "2001:db8::/48").'),
    startIPv4: createParameterHelp('Starting IP address of an IPv4 range. Requires -endIPv4.'),
    endIPv4: createParameterHelp('Ending IP address of an IPv4 range. Requires -startIPv4.'),
    startIPv6: createParameterHelp('Starting IP address of an IPv6 range. Requires -endIPv6.'),
    endIPv6: createParameterHelp('Ending IP address of an IPv6 range. Requires -startIPv6.')
  }
});

// host_group_add
registerCommandDescription('host_group_add', {
  description: createCommandDescription(
    'Adds',
    'a new Host Group',
    'to DataSunrise. Host Groups collect multiple host, network, or IP range definitions for easier policy management.',
    'low'
  ),
  detailedDescription: `
This command creates a Host Group, which is a collection of previously defined host, network, or IP range entries. 
Host Groups simplify policy creation and management by allowing you to refer to multiple network entities with a single group name.
  `,
  examples: [
    {
      description: 'Create a Host Group "TrustedServers" and add "appserver1.example.com" and "InternalNetwork"',
      command: 'host_group_add -name TrustedServers -addMembers "appserver1.example.com,InternalNetwork"'
    }
  ],
  relatedCommands: ['host_add', 'host_group_update', 'host_group_show_one', 'host_group_delete'],
  contextualHelp: {
    name: createParameterHelp('Unique name for the new Host Group.'),
    addMembers: createParameterHelp(
      'Comma-separated list of existing Host/Network/Range names to add as members.',
      { suggestion: 'Ensure member hosts/networks are defined first using "host_add".' }
    )
  }
});

// host_update
registerCommandDescription('host_update', {
  description: createCommandDescription(
    'Updates',
    'an existing host\'s address or other properties',
    'in DataSunrise. (Note: CLI might only support updating the host field for single host entries).',
    'low'
  ),
  examples: [
    {
      description: 'Update the IP address for host entry "old_ip_host" to "192.168.1.50"',
      command: 'host_update -name "old_ip_host" -host "192.168.1.50"'
    }
  ],
  relatedCommands: ['host_add', 'host_show_one'],
  contextualHelp: {
    name: createParameterHelp('Current name of the host entry to update.'),
    host: createParameterHelp('New hostname or IP address for the host entry. This typically applies if the entry is a single host type.')
    // Add other updatable params if supported by CLI for network/range types
  }
});

// host_group_update
registerCommandDescription('host_group_update', {
  description: createCommandDescription(
    'Updates',
    'an existing Host Group\'s name or members',
    'in DataSunrise.',
    'low'
  ),
  examples: [
    {
      description: 'Rename Host Group "OldGroup" to "ProductionServers" and add "newserver", remove "oldserver"',
      command: 'host_group_update -name OldGroup -newName ProductionServers -addMembers "newserver" -removeMembers "oldserver"'
    }
  ],
  relatedCommands: ['host_group_add', 'host_group_show_one'],
  contextualHelp: {
    name: createParameterHelp('Current name of the Host Group to update.'),
    newName: createParameterHelp('New name for the Host Group. Must be unique if provided.'),
    addMembers: createParameterHelp('Comma-separated list of member names to add.'),
    removeMembers: createParameterHelp('Comma-separated list of member names to remove.')
  }
});

// host_show_all
registerCommandDescription('host_show_all', {
  description: createCommandDescription(
    'Displays',
    'a list of all configured hosts, networks, and IP ranges',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all host/network entries', command: 'host_show_all' }]
});

// host_show_one
registerCommandDescription('host_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific host, network, or IP range entry',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show details for host entry "appserver1.example.com"', command: 'host_show_one -name "appserver1.example.com"' }],
  contextualHelp: { name: createParameterHelp('Name of the host/network/range entry to display.') }
});

// host_group_show_all
registerCommandDescription('host_group_show_all', {
  description: createCommandDescription(
    'Displays',
    'a list of all configured Host Groups',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all Host Groups', command: 'host_group_show_all' }]
});

// host_group_show_one
registerCommandDescription('host_group_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific Host Group, including its members',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show details for Host Group "TrustedServers"', command: 'host_group_show_one -name TrustedServers' }],
  contextualHelp: { name: createParameterHelp('Name of the Host Group to display.') }
});

// host_delete
registerCommandDescription('host_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specific host, network, or IP range entry',
    'from DataSunrise.',
    'medium' // Deleting can affect policies
  ),
  examples: [{ description: 'Delete host entry "temp_server"', command: 'host_delete -name temp_server' }],
  contextualHelp: { name: createParameterHelp('Name of the host/network/range entry to delete.') }
});

// host_group_delete
registerCommandDescription('host_group_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specific Host Group',
    'from DataSunrise. Does not delete its members from DataSunrise.',
    'medium' // Deleting groups can affect policies
  ),
  examples: [{ description: 'Delete Host Group "ObsoleteServers"', command: 'host_group_delete -name ObsoleteServers' }],
  contextualHelp: { name: createParameterHelp('Name of the Host Group to delete.') }
});
