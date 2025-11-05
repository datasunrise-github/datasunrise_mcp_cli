import { CliCommand } from './types.js';

export const snifferCommands: CliCommand[] = [
  {
    toolName: 'show_sniffers_for_interface', // Changed toolName to be more specific
    baseCommand: 'showSniffers',
    description: 'Show a list of Sniffers for a specific instance interface.',
    params: [
      {
        name: 'instance',
        type: 'string',
        description: 'Logical name of the Instance.',
        cliName: '-instance',
        required: true,
      },
      {
        name: 'interfaceHost',
        type: 'string',
        description: 'Host of the Interface.',
        cliName: '-interfaceHost',
        required: true,
      },
      {
        name: 'interfacePort',
        type: 'string',
        description: 'Port of the Interface.',
        cliName: '-interfacePort',
        required: true,
      },
    ],
  },
  // Potentially add other sniffer-related commands here in the future,
  // e.g., add_sniffer_to_interface, update_sniffer, delete_sniffer
  // For now, only implementing the requested showSniffers (renamed for clarity)
];
