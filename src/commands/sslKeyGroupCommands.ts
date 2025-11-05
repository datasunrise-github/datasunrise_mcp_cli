import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const sslKeyGroupCommands: CliCommand[] = [
  {
    toolName: 'ssl_key_group_add',
    description: 'Adds a new SSL Key Group. SSL Key Groups store SSL certificates and keys for secure connections.',
    baseCommand: 'addSslKeyGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Unique name for the new SSL Key Group.'), required: true, cliName: '-name' },
      { name: 'type', type: 'string', description: enhanceParameterDescription('string', 'Type of the SSL Key Group (Proxy | Sniffer | Interface | Agent | Syslog).', 'ENUM'), required: false, cliName: '-type' },
      { name: 'ca', type: 'string', description: enhanceParameterDescription('string', 'Path to the CA certificate file.', 'FILE_PATH'), required: false, cliName: '-ca' },
      { name: 'cert', type: 'string', description: enhanceParameterDescription('string', 'Path to the certificate file.', 'FILE_PATH'), required: false, cliName: '-cert' },
      { name: 'dh', type: 'string', description: enhanceParameterDescription('string', 'Path to the DH parameters file.', 'FILE_PATH'), required: false, cliName: '-dh' },
      { name: 'ec', type: 'string', description: enhanceParameterDescription('string', 'Path to the EC parameters file.', 'FILE_PATH'), required: false, cliName: '-ec' },
      { name: 'priv', type: 'string', description: enhanceParameterDescription('string', 'Path to the private key file.', 'FILE_PATH'), required: false, cliName: '-priv' },
    ],
    category: 'SSL Key Group',
  },
  {
    toolName: 'ssl_key_group_update',
    description: "Updates an existing SSL Key Group's name.",
    baseCommand: 'updateSslKeyGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current name of the SSL Key Group to update.'), required: true, cliName: '-name' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'New name for the SSL Key Group.'), required: false, cliName: '-newName' },
      { name: 'type', type: 'string', description: enhanceParameterDescription('string', 'New type for the SSL Key Group (Proxy | Sniffer | Interface | Agent | Syslog).', 'ENUM'), required: false, cliName: '-type' },
      { name: 'ca', type: 'string', description: enhanceParameterDescription('string', 'New path to the CA certificate file.', 'FILE_PATH'), required: false, cliName: '-ca' },
      { name: 'cert', type: 'string', description: enhanceParameterDescription('string', 'New path to the certificate file.', 'FILE_PATH'), required: false, cliName: '-cert' },
      { name: 'dh', type: 'string', description: enhanceParameterDescription('string', 'New path to the DH parameters file.', 'FILE_PATH'), required: false, cliName: '-dh' },
      { name: 'ec', type: 'string', description: enhanceParameterDescription('string', 'New path to the EC parameters file.', 'FILE_PATH'), required: false, cliName: '-ec' },
      { name: 'priv', type: 'string', description: enhanceParameterDescription('string', 'New path to the private key file.', 'FILE_PATH'), required: false, cliName: '-priv' },
    ],
    category: 'SSL Key Group',
  },
  {
    toolName: 'ssl_key_group_show_all',
    description: 'Displays a list of all configured SSL Key Groups.',
    baseCommand: 'showSSLKeyGroups',
    params: [],
    category: 'SSL Key Group',
  },
  {
    toolName: 'ssl_key_group_show_one',
    description: 'Shows detailed information for a specific SSL Key Group.',
    baseCommand: 'showSslKeyGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the SSL Key Group to display.'), required: true, cliName: '-name' },
    ],
    category: 'SSL Key Group',
  },
  {
    toolName: 'ssl_key_group_delete',
    description: 'Deletes a specified SSL Key Group. Ensure it is not in use.',
    baseCommand: 'delSslKeyGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the SSL Key Group to delete.'), required: true, cliName: '-name' },
    ],
    category: 'SSL Key Group',
  },
];
