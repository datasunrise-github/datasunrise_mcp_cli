import { CliCommand, CliParam } from './types.js';

export const dsServerCommands: CliCommand[] = [
  // Guide 3.7 Updating DataSunrise Server Parameters
  {
    toolName: 'ds_server_update_parameters', // Changed from updateDsServer to avoid conflict if that's used elsewhere
    description: 'Updates DataSunrise server parameters.',
    baseCommand: 'updateDsServer',
    category: 'DataSunrise Server',
    params: [
      { name: 'name', type: 'string', description: 'Current name of the DataSunrise server.', required: true, cliName: '-name' },
      { name: 'newName', type: 'string', description: 'New name of the DataSunrise server.', required: false, cliName: '-newName' },
      { name: 'backendHost', type: 'string', description: "Backend's hostname.", required: false, cliName: '-backendHost' },
      { name: 'backendPort', type: 'string', description: "Backend's port number.", required: false, cliName: '-backendPort' },
      { name: 'corePort', type: 'string', description: "Core's port number.", required: false, cliName: '-corePort' },
      { name: 'backendHttps', type: 'string', description: 'Enable/disable https for the Backend (true | false).', required: false, cliName: '-backendHttps' },
      { name: 'coreHttps', type: 'string', description: 'Enable/disable https for the Core (true | false).', required: false, cliName: '-coreHttps' },
    ],
  },
  // Guide 3.14 Displaying DataSunrise Server Parameters
  {
    toolName: 'ds_server_show_parameters', // Changed from showDsServer
    description: 'Retrieves information about a specific DataSunrise server.',
    baseCommand: 'showDsServer',
    category: 'DataSunrise Server',
    params: [
      { name: 'name', type: 'string', description: 'Logical name of the DataSunrise server.', required: true, cliName: '-name' },
    ],
  },
  // Guide 3.15 Displaying DataSunrise servers
  {
    toolName: 'ds_server_show_all', // Changed from showDsServers
    description: 'Displays a list of DataSunrise servers.',
    baseCommand: 'showDsServers',
    category: 'DataSunrise Server',
    params: [],
  },
  // Command to delete a DataSunrise Server
  {
    toolName: 'ds_server_delete',
    description: 'Deletes a DataSunrise Server. The \'force\' parameter defaults to true, meaning deletion will be forced unless \'force\' is explicitly set to false.',
    baseCommand: 'delDsServer',
    category: 'DataSunrise Server',
    params: [
      { name: 'name', type: 'string', description: 'Logical name of the Server to delete.', required: true, cliName: '-name' },
      { name: 'force', type: 'string', description: 'Force delete (true | false). Defaults to "true" if not specified.', required: false, cliName: '-force', defaultValue: "true" },
    ],
  },
];
