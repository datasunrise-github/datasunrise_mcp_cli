import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// license_update_key
registerCommandDescription('license_update_key', {
  description: createCommandDescription(
    'Updates',
    'the DataSunrise license using a provided license key string',
    'on the server. ⚠️ This affects system functionality based on license terms.',
    'medium', // Security: Licensing controls features
    true,     // Stability: Incorrect license can disable features
    false
  ),
  detailedDescription: `
This command applies a new license to the DataSunrise installation using a license key string. 
The license key dictates the enabled features, capacity, and duration of use for the DataSunrise suite. 
Ensure the key is valid and intended for this installation.
  `,
  examples: [
    {
      description: 'Update license with a new key string',
      command: 'license_update_key -key "XXXX-XXXX-XXXX-XXXX-XXXX"'
    }
  ],
  relatedCommands: ['license_update_file', 'license_show_all', 'license_delete'],
  commonIssues: ['Ensure the license key is typed correctly and is not expired.'],
  contextualHelp: {
    key: createParameterHelp(
      'The license key string provided by DataSunrise.',
      {
        suggestion: 'Copy and paste the key carefully to avoid typos.'
      }
    )
  }
});

// license_update_file
registerCommandDescription('license_update_file', {
  description: createCommandDescription(
    'Updates',
    'DataSunrise licenses from a specified .reg license file',
    'on the server. ⚠️ This affects system functionality based on license terms.',
    'medium',
    true,
    false
  ),
  detailedDescription: `
This command applies new licenses to the DataSunrise installation from a .reg license file. 
This file typically contains one or more license keys. 
This method is often used for offline activation or when multiple licenses are being applied.
  `,
  examples: [
    {
      description: 'Update licenses from "/path/to/licenses.reg"',
      command: 'license_update_file -file "/path/to/licenses.reg"'
    }
  ],
  relatedCommands: ['license_update_key', 'license_show_all', 'license_delete'],
  commonIssues: ['Ensure the .reg file is correctly formatted and accessible by the DataSunrise server.'],
  contextualHelp: {
    file: createParameterHelp(
      'Path to the .reg license file.',
      {
        suggestion: 'Provide an absolute path or a path relative to where dscli is executed.'
      }
    )
  }
});

// license_show_all
registerCommandDescription('license_show_all', {
  description: createCommandDescription(
    'Displays',
    'all installed licenses in DataSunrise',
    'on the server.',
    'none'
  ),
  detailedDescription: 'This command lists all licenses currently installed on the DataSunrise server, showing their details such as type, expiration date, and features enabled.',
  examples: [
    {
      description: 'List all installed licenses',
      command: 'license_show_all'
    }
  ],
  relatedCommands: ['license_show_one', 'license_update_key', 'license_update_file']
});

// license_show_one
registerCommandDescription('license_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific license identified by its ID',
    'on the server.',
    'none'
  ),
  detailedDescription: 'This command displays detailed information for a single license, identified by its unique ID. Useful for checking the specifics of a particular license.',
  examples: [
    {
      description: 'Show details for license ID "12345"',
      command: 'license_show_one -id 12345'
    }
  ],
  relatedCommands: ['license_show_all'],
  contextualHelp: {
    id: createParameterHelp(
      'ID of the license to display.',
      {
        suggestion: 'Use "license_show_all" to find the ID of the license you are interested in.'
      }
    )
  }
});

// license_delete
registerCommandDescription('license_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specific license identified by its ID',
    'from the server. ⚠️ This can disable features or the entire system if it\'s the last valid license.',
    'high', // Security: Can disable protective features
    true,   // Stability: Can disable system
    true    // Service interruption: Potentially
  ),
  detailedDescription: `
This command removes a specific license from the DataSunrise installation. 
Deleting a license may disable features or, if it's the primary or only valid license, could render the system non-functional. 
Use with extreme caution.
  `,
  examples: [
    {
      description: 'Delete license ID "67890" (USE WITH CAUTION)',
      command: 'license_delete -id 67890'
    }
  ],
  relatedCommands: ['license_show_all', 'license_update_key', 'license_update_file'],
  commonIssues: ['Ensure you are not deleting the last active license unless intentionally decommissioning the system or applying a new one immediately.'],
  contextualHelp: {
    id: createParameterHelp(
      'ID of the license to delete.',
      {
        suggestion: 'Verify the license ID and understand the impact before deletion.'
      }
    )
  }
});
