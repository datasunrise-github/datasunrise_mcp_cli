import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const serverCommands: CliCommand[] = [
  {
    toolName: 'server_add',
    description: 'Adds a new SMTP, SNMP, or External Server configuration.',
    baseCommand: 'addServer',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Logical name of the Server.'), required: true, cliName: '-name' },
      { name: 'serverType', type: 'string', description: enhanceParameterDescription('string', 'Type of server (smtp | snmp | external).', 'ENUM'), required: true, cliName: '-serverType' },
      { name: 'host', type: 'string', description: enhanceParameterDescription('string', 'Server address (hostname or IP).', 'HOSTNAME_OR_IP'), required: false, cliName: '-host' },
      { name: 'port', type: 'string', description: enhanceParameterDescription('string', 'Server port number.', 'PORT'), required: false, cliName: '-port' },
      { name: 'mailFrom', type: 'string', description: enhanceParameterDescription('string', 'SMTP email sender (for serverType smtp).', 'EMAIL'), required: false, cliName: '-mailFrom' },
      { name: 'login', type: 'string', description: enhanceParameterDescription('string', 'Login for the server (e.g., SMTP username).'), required: false, cliName: '-login' },
      { name: 'password', type: 'string', description: enhanceParameterDescription('string', 'Password for the server login (for SMTP).'), required: false, cliName: '-password' },
      { name: 'cert', type: 'string', description: enhanceParameterDescription('string', 'SMTP certificate type (Enabled | Disabled | StartTlsPreferred | StartTlsRequired). Default is Enabled.', 'ENUM'), required: false, cliName: '-cert' },
      { name: 'tls', type: 'string', description: enhanceParameterDescription('string', 'Enable/disable TLS for SMTP (true | false).'), required: false, cliName: '-tls' },
      { name: 'useAuth', type: 'string', description: enhanceParameterDescription('string', 'Use authorization for SMTP server (true | false).'), required: false, cliName: '-useAuth' },
      { name: 'command', type: 'string', description: enhanceParameterDescription('string', 'External Server command (for serverType external).'), required: false, cliName: '-command' },
      { name: 'security', type: 'string', description: enhanceParameterDescription('string', 'Send security emails from this server (true | false).'), required: false, cliName: '-security' },
    ],
    category: 'Server',
  },
  {
    toolName: 'server_update',
    description: "Updates an existing server configuration's name or other properties.",
    baseCommand: 'updateServer',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current name of the server configuration to update.'), required: true, cliName: '-name' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'New name for the server configuration.'), required: false, cliName: '-newName' },
      { name: 'host', type: 'string', description: enhanceParameterDescription('string', 'New hostname or IP address.', 'HOSTNAME_OR_IP'), required: false, cliName: '-host' },
      { name: 'port', type: 'string', description: enhanceParameterDescription('string', 'New port number.', 'PORT'), required: false, cliName: '-port' },
      { name: 'serverType', type: 'string', description: enhanceParameterDescription('string', 'New type of server (smtp | snmp | external).', 'ENUM'), required: false, cliName: '-serverType' },
      { name: 'mailFrom', type: 'string', description: enhanceParameterDescription('string', 'New "Mail From" email address (for SMTP).', 'EMAIL'), required: false, cliName: '-mailFrom' },
      { name: 'login', type: 'string', description: enhanceParameterDescription('string', 'New login for the server.'), required: false, cliName: '-login' },
      { name: 'password', type: 'string', description: enhanceParameterDescription('string', 'New password for the server.'), required: false, cliName: '-password' },
      { name: 'cert', type: 'string', description: enhanceParameterDescription('string', 'New SSL certificate type for SMTP server (Enabled | Disabled | StartTlsPreferred | StartTlsRequired).'), required: false, cliName: '-cert' },
      { name: 'tls', type: 'string', description: enhanceParameterDescription('string', 'New TLS setting (true | false for SMTP).'), required: false, cliName: '-tls' },
      { name: 'useAuth', type: 'string', description: enhanceParameterDescription('string', 'Enable/disable authorization for SMTP server (true | false).'), required: false, cliName: '-useAuth' },
      { name: 'command', type: 'string', description: enhanceParameterDescription('string', 'New external server command (for serverType external).'), required: false, cliName: '-command' },
      { name: 'security', type: 'string', description: enhanceParameterDescription('string', 'Enable/disable sending security emails from this server (true | false).'), required: false, cliName: '-security' },
    ],
    category: 'Server',
  },
  {
    toolName: 'server_show_all',
    description: 'Displays a list of all configured servers (SMTP, SNMP, etc.).',
    baseCommand: 'showServers',
    params: [],
    category: 'Server',
  },
  {
    toolName: 'server_show_one',
    description: 'Shows detailed information for a specific server configuration. Please provide either -name or -id.',
    baseCommand: 'showServer',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the server configuration to display.'), required: false, cliName: '-name' },
      { name: 'id', type: 'string', description: enhanceParameterDescription('string', 'ID of the Server to display.'), required: false, cliName: '-id' },
    ],
    category: 'Server',
  },
  {
    toolName: 'server_delete',
    description: 'Deletes a Server by its name or ID. Please provide either -id or -name.',
    baseCommand: 'delServer',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Logical name of Server to delete.'), required: false, cliName: '-name' },
      { name: 'id', type: 'string', description: enhanceParameterDescription('string', 'ID of the Server to delete.'), required: false, cliName: '-id' },
    ],
    category: 'Server',
  },
];
