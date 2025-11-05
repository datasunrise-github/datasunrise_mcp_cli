import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const coreCommands: CliCommand[] = [
  {
    toolName: 'core_start',
    description: 'Starts the DataSunrise core engine forcefully. This is typically used after maintenance or configuration changes. [HIGH RISK OPERATION - REQUIRES EXPLICIT APPROVAL]',
    baseCommand: 'start',
    params: [
        { name: 'force', type: 'boolean', description: enhanceParameterDescription('boolean', 'Force start without confirmation prompt.', undefined, true), required: true, cliName: '-f', defaultValue: true},
        { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'Server name where operation will be performed. If omitted, the operation targets the local server or a default configured server.'), required: false, cliName: '-dsServer' },
        { name: 'worker', type: 'string', description: enhanceParameterDescription('string', 'Worker name (e.g., proxy address as host:port) to start. Required on Windows systems.'), required: true, cliName: '-worker' }
    ],
    category: 'Core',
    highRiskOperation: true,
    requiresExplicitApproval: true,
  },
  {
    toolName: 'core_restart',
    description: 'Restarts the DataSunrise core engine forcefully. Useful for applying certain configuration changes that require a restart. [HIGH RISK OPERATION - REQUIRES EXPLICIT APPROVAL]',
    baseCommand: 'restart',
    params: [
        { name: 'force', type: 'boolean', description: enhanceParameterDescription('boolean', 'Force restart without confirmation prompt.', undefined, true), required: true, cliName: '-f', defaultValue: true},
        { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'Server name where operation will be performed. If omitted, the operation targets the local server or a default configured server.'), required: false, cliName: '-dsServer' },
        { name: 'worker', type: 'string', description: enhanceParameterDescription('string', 'Worker name (e.g., proxy address as host:port) to restart. Required on Windows systems.'), required: true, cliName: '-worker' }
    ],
    category: 'Core',
    highRiskOperation: true,
    requiresExplicitApproval: true,
  },
  {
    toolName: 'core_stop',
    description: 'Stops the DataSunrise core engine forcefully. This will interrupt monitoring and protection activities. [HIGH RISK OPERATION - REQUIRES EXPLICIT APPROVAL]',
    baseCommand: 'stop',
    params: [
        { name: 'force', type: 'boolean', description: enhanceParameterDescription('boolean', 'Force stop without confirmation prompt.', undefined, true), required: true, cliName: '-f', defaultValue: true},
        { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'Server name where operation will be performed. If omitted, the operation targets the local server or a default configured server.'), required: false, cliName: '-dsServer' },
        { name: 'worker', type: 'string', description: enhanceParameterDescription('string', 'Worker name (e.g., proxy address as host:port) to stop. Required on Windows systems.'), required: true, cliName: '-worker' }
    ],
    category: 'Core',
    highRiskOperation: true,
    requiresExplicitApproval: true,
  },
  {
    toolName: 'core_show_state',
    description: 'Shows the operational state of a specific worker process on a DataSunrise server.',
    baseCommand: 'showCoreState',
    params: [
      { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'Name of the DataSunrise server.'), required: false, cliName: '-dsServer' },
      { name: 'worker', type: 'string', description: enhanceParameterDescription('string', 'Worker name.'), required: true, cliName: '-worker' },
    ],
    category: 'Core',
  },
  {
    toolName: 'restart_backend',
    description: 'Restarts the DataSunrise backend process forcefully.',
    baseCommand: 'restartBackend',
    params: [
      { name: 'force', type: 'boolean', description: enhanceParameterDescription('boolean', 'Force execution without confirmation.', undefined, true), required: true, cliName: '-f', defaultValue: true },
      { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'Server name where proxy is opened or sniffer is used.'), required: false, cliName: '-dsServer' }
    ],
    category: 'Core',
    highRiskOperation: true,
    requiresExplicitApproval: true,
  }
];
