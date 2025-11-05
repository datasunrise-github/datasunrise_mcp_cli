import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const connectCommands: CliCommand[] = [
  {
    toolName: 'connect',
    description: 'Connects to the DataSunrise firewall. Establishes a session for subsequent commands.',
    baseCommand: 'connect',
    params: [
      { name: 'host', type: 'string', description: enhanceParameterDescription('string', 'The hostname or IP address of the DataSunrise server.', 'HOSTNAME_OR_IP', '127.0.0.1'), required: false, cliName: '-host' },
      { name: 'port', type: 'string', description: enhanceParameterDescription('string', 'The port number for the DataSunrise server.', 'PORT', '11000'), required: false, cliName: '-port' },
      { name: 'protocol', type: 'string', description: enhanceParameterDescription('string', 'The protocol to use (http or https).', 'ENUM', 'https'), required: false, cliName: '-protocol' },
      { name: 'login', type: 'string', description: enhanceParameterDescription('string', 'The username for authentication. Required if no active session and not using token-based auth.'), required: true, cliName: '-login' },
      { name: 'password', type: 'string', description: enhanceParameterDescription('string', 'The password for the username. Not required if an active session exists, using token-based auth, or if the password is set via the DS_PASSWORD environment variable. Otherwise, it may be required.'), required: false, cliName: '-password' },
      { name: 'sessionType', type: 'string', description: enhanceParameterDescription('string', 'Session type: Single or Multi. If you plan to connect to several DataSunrise applications simultaneously use Multi mode. Default is Single.'), required: false, cliName: '-sessionType' },
    ],
    category: 'Connection',
  },
  // Potentially other connection-related commands like 'disconnect' or 'showConnectionStatus' if they exist.
  {
    toolName: 'connectOAuth2',
    description: 'Connect to the DataSunrise service using OAuth2',
    baseCommand: 'connectOAuth2',
    params: [
        { name: 'host', type: 'string', description: 'host the server is running on. 127.0.0.1 will be used if not specified.', required: false, cliName: '-host' },
        { name: 'port', type: 'string', description: 'port the server is running on. 11000 is used by default.', required: false, cliName: '-port' },
        { name: 'protocol', type: 'string', description: 'protocol (http | https). HTTPS is used by default.', required: false, cliName: '-protocol' },
        { name: 'sessionType', type: 'string', description: 'session type: Single or Multi. If you plan to connect to several DataSunrise applications simultaneously use Multi mode. Default is Single', required: false, cliName: '-sessionType' },
        { name: 'token', type: 'string', description: 'Access Token', required: true, cliName: '-token' },
    ],
    category: 'Connection',
  },
];
