import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const hostCommands: CliCommand[] = [
  {
    toolName: 'host_add',
    description: 'Adds a new host, network, or IP address range definition to DataSunrise. These are used in policies and user/group definitions.',
    baseCommand: 'addHost',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Logical name for this host/network/range entry.'), required: true, cliName: '-name' },
      { name: 'host', type: 'string', description: enhanceParameterDescription('string', 'Hostname or single IP address (e.g., "myserver.com" or "192.168.1.100"). Use for single hosts.', 'HOSTNAME_OR_IP'), required: false, cliName: '-host' },
      { name: 'netIPv4', type: 'string', description: enhanceParameterDescription('string', 'IPv4 network address (e.g., "192.168.1.0"). Requires -netMaskV4.', 'IPV4_NETWORK'), required: false, cliName: '-netIPv4' },
      { name: 'netMaskV4', type: 'string', description: enhanceParameterDescription('string', 'Subnet mask for IPv4 network (e.g., "255.255.255.0"). Requires -netIPv4.', 'IPV4_MASK'), required: false, cliName: '-netMaskV4' },
      { name: 'netIPv6', type: 'string', description: enhanceParameterDescription('string', 'IPv6 network address with prefix (e.g., "2001:db8::/48").', 'IPV6_NETWORK'), required: false, cliName: '-netIPv6' },
      { name: 'startIPv4', type: 'string', description: enhanceParameterDescription('string', 'Starting IP address of an IPv4 range. Requires -endIPv4.', 'IPV4_ADDRESS'), required: false, cliName: '-startIPv4' },
      { name: 'endIPv4', type: 'string', description: enhanceParameterDescription('string', 'Ending IP address of an IPv4 range. Requires -startIPv4.', 'IPV4_ADDRESS'), required: false, cliName: '-endIPv4' },
      { name: 'startIPv6', type: 'string', description: enhanceParameterDescription('string', 'Starting IP address of an IPv6 range. Requires -endIPv6.', 'IPV6_ADDRESS'), required: false, cliName: '-startIPv6' },
      { name: 'endIPv6', type: 'string', description: enhanceParameterDescription('string', 'Ending IP address of an IPv6 range. Requires -startIPv6.', 'IPV6_ADDRESS'), required: false, cliName: '-endIPv6' },
    ],
    category: 'Host',
  },
  {
    toolName: 'host_group_add',
    description: 'Adds a new Host Group. Host Groups collect multiple host, network, or IP range definitions for easier policy management.',
    baseCommand: 'addHostGr',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Unique name for the new Host Group.'), required: true, cliName: '-name' },
      { name: 'addMembers', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated list of existing Host/Network/Range names to add as members.', 'LIST'), required: false, cliName: '-addMembers' },
    ],
    category: 'Host',
  },
  {
    toolName: 'host_update',
    description: "Updates an existing host's address or other properties. (CLI Guide 8.4)",
    baseCommand: 'updateHost',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current name of the host entry to update.'), required: true, cliName: '-name' },
      { name: 'host', type: 'string', description: enhanceParameterDescription('string', 'New hostname or IP address for the host entry.', 'HOSTNAME_OR_IP'), required: false, cliName: '-host' },
      { name: 'netIPv4', type: 'string', description: enhanceParameterDescription('string', 'New IPv4 network address (e.g., "192.168.1.0"). Requires -netMaskV4.', 'IPV4_NETWORK'), required: false, cliName: '-netIPv4' },
      { name: 'netMaskV4', type: 'string', description: enhanceParameterDescription('string', 'New subnet mask for IPv4 network (e.g., "255.255.255.0"). Requires -netIPv4.', 'IPV4_MASK'), required: false, cliName: '-netMaskV4' },
      { name: 'netIPv6', type: 'string', description: enhanceParameterDescription('string', 'New IPv6 network address with prefix (e.g., "2001:db8::/48").', 'IPV6_NETWORK'), required: false, cliName: '-netIPv6' },
      { name: 'startIPv4', type: 'string', description: enhanceParameterDescription('string', 'New starting IP address of an IPv4 range. Requires -endIPv4.', 'IPV4_ADDRESS'), required: false, cliName: '-startIPv4' },
      { name: 'endIPv4', type: 'string', description: enhanceParameterDescription('string', 'New ending IP address of an IPv4 range. Requires -startIPv4.', 'IPV4_ADDRESS'), required: false, cliName: '-endIPv4' },
      { name: 'startIPv6', type: 'string', description: enhanceParameterDescription('string', 'New starting IP address of an IPv6 range. Requires -endIPv6.', 'IPV6_ADDRESS'), required: false, cliName: '-startIPv6' },
      { name: 'endIPv6', type: 'string', description: enhanceParameterDescription('string', 'New ending IP address of an IPv6 range. Requires -startIPv6.', 'IPV6_ADDRESS'), required: false, cliName: '-endIPv6' },
    ],
    category: 'Host',
  },
  {
    toolName: 'host_group_update',
    description: "Updates an existing Host Group's name or members.",
    baseCommand: 'updateHostGr',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current name of the Host Group to update.'), required: true, cliName: '-name' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'New name for the Host Group.'), required: false, cliName: '-newName' },
      { name: 'addMembers', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated list of member names to add.', 'LIST'), required: false, cliName: '-addMembers' },
      { name: 'removeMembers', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated list of member names to remove.', 'LIST'), required: false, cliName: '-removeMembers' },
    ],
    category: 'Host',
  },
  {
    toolName: 'host_show_all',
    description: 'Displays a list of all configured hosts, networks, and IP ranges.',
    baseCommand: 'showHosts',
    params: [],
    category: 'Host',
  },
  {
    toolName: 'host_show_one',
    description: 'Shows detailed information for a specific host, network, or IP range entry.',
    baseCommand: 'showHost',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the host/network/range entry to display.'), required: true, cliName: '-name' },
    ],
    category: 'Host',
  },
  {
    toolName: 'host_group_show_all',
    description: 'Displays a list of all configured Host Groups.',
    baseCommand: 'showHostGroups',
    params: [],
    category: 'Host',
  },
  {
    toolName: 'host_group_show_one',
    description: 'Shows detailed information for a specific Host Group, including its members.',
    baseCommand: 'showHostGr',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Host Group to display.'), required: true, cliName: '-name' },
    ],
    category: 'Host',
  },
  {
    toolName: 'host_delete',
    description: 'Deletes a specific host, network, or IP range entry.',
    baseCommand: 'delHost',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the host/network/range entry to delete.'), required: true, cliName: '-name' },
    ],
    category: 'Host',
  },
  {
    toolName: 'host_group_delete',
    description: 'Deletes a specific Host Group. Does not delete its members from DataSunrise.',
    baseCommand: 'delHostGr',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Host Group to delete.'), required: true, cliName: '-name' },
    ],
    category: 'Host',
  },
];
