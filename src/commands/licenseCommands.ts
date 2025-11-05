import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const licenseCommands: CliCommand[] = [
  {
    toolName: 'license_update_key',
    description: 'Updates the DataSunrise license using a provided license key string.',
    baseCommand: 'updateLicense',
    params: [
      { name: 'key', type: 'string', description: enhanceParameterDescription('string', 'The license key string.'), required: true, cliName: '-key' },
    ],
    category: 'License',
  },
  {
    toolName: 'license_update_file',
    description: 'Updates DataSunrise licenses from a specified .reg license file.',
    baseCommand: 'updateLicenses',
    params: [
      { name: 'file', type: 'string', description: enhanceParameterDescription('string', 'Location of the file which contains DataSunrise keys.', 'FILE_PATH'), required: true, cliName: '-file' },
    ],
    category: 'License',
  },
  {
    toolName: 'license_show_all',
    description: 'Displays all installed licenses in DataSunrise.',
    baseCommand: 'showLicenses',
    params: [],
    category: 'License',
  },
  {
    toolName: 'license_show_one',
    description: 'Shows detailed information for a specific license identified by its ID.',
    baseCommand: 'showLicense',
    params: [
      { name: 'id', type: 'string', description: enhanceParameterDescription('string', 'ID of the license to display.'), required: true, cliName: '-id' }, // ID might be numeric in practice
    ],
    category: 'License',
  },
  {
    toolName: 'license_delete',
    description: 'Deletes a specific license identified by its ID.',
    baseCommand: 'delLicense',
    params: [
      { name: 'id', type: 'number', description: enhanceParameterDescription('number', 'ID of the license to delete.'), required: true, cliName: '-id' },
    ],
    category: 'License',
  },
];
