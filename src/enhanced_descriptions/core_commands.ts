import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// core_start
registerCommandDescription('core_start', {
  description: createCommandDescription(
    'Starts',
    'the DataSunrise core engine forcefully',
    'on the server. This is typically used after maintenance or configuration changes that required a stop.',
    'medium', // securityImpact (service availability)
    true,     // stabilityImpact
    true      // serviceInterruption (if it was stopped)
  ),
  detailedDescription: `
This command forcefully starts the DataSunrise core engine. The core engine is responsible for all database activity monitoring, 
auditing, and protection. Use this command if the engine was previously stopped for maintenance or due to an issue.
Starting the core engine will resume all data protection and auditing activities.
  `,
  examples: [
    {
      description: 'Force start the DataSunrise core engine',
      command: 'core_start -force true'
    }
  ],
  relatedCommands: ['core_stop', 'core_restart', 'core_show_state'],
  commonIssues: ['Ensure no other conflicting processes are running that might prevent the core engine from starting.'],
  contextualHelp: {
    force: createParameterHelp(
      'Force start the core engine.',
      {
        suggestion: 'Typically set to true to ensure the start command is processed.'
      }
    )
  }
});

// restart_backend
registerCommandDescription('restart_backend', {
  description: createCommandDescription(
    'Restarts',
    'the Backend process',
    '',
    'none'
  ),
  detailedDescription: `
This command restarts the Backend process. 
Use the -f flag to force an immediate restart without confirmation.
  `,
  examples: [
    {
      description: 'Force restart the Backend process',
      command: 'restartBackend -f'
    }
  ],
  relatedCommands: []
});

// core_restart
registerCommandDescription('core_restart', {
  description: createCommandDescription(
    'Restarts',
    'the DataSunrise core engine forcefully',
    'on the server. Useful for applying certain configuration changes that require a restart.',
    'high', // securityImpact (brief interruption of protection)
    true,   // stabilityImpact
    true    // serviceInterruption
  ),
  detailedDescription: `
This command forcefully restarts the DataSunrise core engine. 
Restarting the engine will cause a brief interruption in monitoring and protection activities. 
This is often necessary to apply critical configuration updates or to recover from certain operational states.
  `,
  examples: [
    {
      description: 'Force restart the DataSunrise core engine',
      command: 'core_restart -force true'
    }
  ],
  relatedCommands: ['core_start', 'core_stop', 'core_show_state'],
  commonIssues: ['A restart will briefly interrupt traffic monitoring. Schedule during a maintenance window if possible.'],
  contextualHelp: {
    force: createParameterHelp(
      'Force restart the core engine.',
      {
        suggestion: 'Typically set to true to ensure the restart command is processed.'
      }
    )
  }
});

// core_stop
registerCommandDescription('core_stop', {
  description: createCommandDescription(
    'Stops',
    'the DataSunrise core engine forcefully',
    'on the server. This will interrupt monitoring and protection activities.',
    'high', // securityImpact (stops protection)
    true,   // stabilityImpact
    true    // serviceInterruption
  ),
  detailedDescription: `
This command forcefully stops the DataSunrise core engine. 
Stopping the engine will halt all database activity monitoring, auditing, and protection. 
This command should be used with extreme caution, typically only for planned maintenance or critical troubleshooting.
  `,
  examples: [
    {
      description: 'Force stop the DataSunrise core engine',
      command: 'core_stop -force true'
    }
  ],
  relatedCommands: ['core_start', 'core_restart', 'core_show_state'],
  commonIssues: ['Stopping the core engine leaves databases unprotected. Only do this during planned maintenance.'],
  contextualHelp: {
    force: createParameterHelp(
      'Force stop the core engine.',
      {
        suggestion: 'Typically set to true to ensure the stop command is processed.'
      }
    )
  }
});

// core_show_state
registerCommandDescription('core_show_state', {
  description: createCommandDescription(
    'Shows',
    'the operational state of a specific worker process',
    'on a DataSunrise server.',
    'none'
  ),
  detailedDescription: `
This command retrieves and displays the current operational status of a specific worker process 
within the DataSunrise core engine on a designated server. 
It provides insights into whether the worker is running, its process ID, memory usage, and uptime.
  `,
  examples: [
    {
      description: 'Show core state for worker 1 on server "DSServer01"',
      command: 'core_show_state -dsServer DSServer01 -worker 1'
    }
  ],
  relatedCommands: ['core_start', 'core_stop', 'core_restart'],
  contextualHelp: {
    dsServer: createParameterHelp(
      'Name of the DataSunrise server whose core state is to be displayed.',
      {
        suggestion: 'Ensure this server name is configured in your DataSunrise environment.'
      }
    ),
    worker: createParameterHelp(
      'Worker ID (typically 1 for single-worker setups).',
      {
        suggestion: 'Default is usually 1. Check DataSunrise documentation for multi-worker configurations.'
      }
    )
  }
});
