import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const importCommands: CliCommand[] = [
  {
    toolName: 'import_users',
    description: 'Imports DataSunrise users from a specified CSV file.',
    baseCommand: 'importUsers',
    params: [
      { name: 'fileName', type: 'string', description: enhanceParameterDescription('string', 'Path to the CSV file containing user data to import. Each line should begin with the "user;" keyword, followed by a user name.', 'FILE_PATH'), required: true, cliName: '-fileName' },
    ],
    category: 'Import',
  },
  {
    toolName: 'import_hosts',
    description: 'Imports host definitions from a specified CSV file.',
    baseCommand: 'importHosts',
    params: [
      { name: 'fileName', type: 'string', description: enhanceParameterDescription('string', 'Path to the CSV file containing host data to import. Each line should begin with the "host;" keyword, followed by a host name or IP address.', 'FILE_PATH'), required: true, cliName: '-fileName' },
    ],
    category: 'Import',
  },
  {
    toolName: 'import_apps',
    description: 'Imports application definitions from a specified CSV file. Each line should begin with the "app;" keyword, followed by an application name.',
    baseCommand: 'importApps',
    params: [
      { name: 'fileName', type: 'string', description: enhanceParameterDescription('string', 'Path to the CSV file containing application data to import.', 'FILE_PATH'), required: true, cliName: '-fileName' },
    ],
    category: 'Import',
  },
];
