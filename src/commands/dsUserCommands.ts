import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const dsUserCommands: CliCommand[] = [
  {
    toolName: 'ds_user_add',
    description: 'Adds a new DataSunrise administrative user.',
    baseCommand: 'addDSUser',
    params: [
      { name: 'login', type: 'string', description: enhanceParameterDescription('string', 'Unique login name for the new DataSunrise user.'), required: true, cliName: '-login' },
      { name: 'password', type: 'string', description: enhanceParameterDescription('string', 'Password for the new user. Must meet complexity rules.'), required: true, cliName: '-password' },
      { name: 'role', type: 'string', description: enhanceParameterDescription('string', 'Name of an existing Access Role to assign to this user.'), required: true, cliName: '-role' },
      { name: 'email', type: 'string', description: enhanceParameterDescription('string', 'Email address for the user (must be valid format).', 'EMAIL'), required: false, cliName: '-email' },
      { name: 'enableADAuth', type: 'string', description: enhanceParameterDescription('string', 'Enable/disable Active Directory authentication (true | false).'), required: false, cliName: '-enableADAuth' },
      { name: 'allowLogin', type: 'string', description: enhanceParameterDescription('string', 'Allow this user to log in.', undefined, false), required: false, cliName: '-allowLogin' },
      { name: 'twoFactorAuth', type: 'string', description: enhanceParameterDescription('string', 'Two-factor authentication type (DISABLED or EMAIL).', 'ENUM', false), required: false, cliName: '-twoFactorAuth' },
      { name: 'whiteHosts', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated hostnames/IPs for whitelist.', 'LIST'), required: false, cliName: '-whiteHosts' },
      { name: 'whiteGroups', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated host group names for whitelist.', 'LIST'), required: false, cliName: '-whiteGroups' },
      { name: 'blackHosts', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated hostnames/IPs for blacklist.', 'LIST'), required: false, cliName: '-blackHosts' },
      { name: 'blackGroups', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated host group names for blacklist.', 'LIST'), required: false, cliName: '-blackGroups' },
    ],
    category: 'DataSunrise User',
  },
  {
    toolName: 'ds_user_update',
    description: "Updates an existing DataSunrise user's properties.",
    baseCommand: 'updateDSUser',
    params: [
      { name: 'login', type: 'string', description: enhanceParameterDescription('string', 'Login name of the user to update.'), required: true, cliName: '-login' },
      { name: 'role', type: 'string', description: enhanceParameterDescription('string', 'New Access Role name for the user.'), required: false, cliName: '-role' },
      { name: 'email', type: 'string', description: enhanceParameterDescription('string', 'New email address for the user.', 'EMAIL'), required: false, cliName: '-email' },
      { name: 'enableADAuth', type: 'string', description: enhanceParameterDescription('string', 'Enable/disable Active Directory authentication (true | false).'), required: false, cliName: '-enableADAuth' },
      { name: 'allowLogin', type: 'string', description: enhanceParameterDescription('string', 'Allow user to log in into Web Console & CLI (true | false).'), required: false, cliName: '-allowLogin' },
      { name: 'twoFactorAuth', type: 'string', description: enhanceParameterDescription('string', 'Two Factor Authentication Type: Disabled | Email.', 'ENUM'), required: false, cliName: '-twoFactorAuth' },
      { name: 'whiteHosts', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated hostnames/IPs for whitelist.', 'LIST'), required: false, cliName: '-whiteHosts' },
      { name: 'whiteGroups', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated host group names for whitelist.', 'LIST'), required: false, cliName: '-whiteGroups' },
      { name: 'blackHosts', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated hostnames/IPs for blacklist.', 'LIST'), required: false, cliName: '-blackHosts' },
      { name: 'blackGroups', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated host group names for blacklist.', 'LIST'), required: false, cliName: '-blackGroups' },
    ],
    category: 'DataSunrise User',
  },
  {
    toolName: 'ds_user_show_all',
    description: 'Displays a list of all DataSunrise administrative users.',
    baseCommand: 'showDsUsers',
    params: [],
    category: 'DataSunrise User',
  },
  {
    toolName: 'ds_user_show_one',
    description: 'Shows detailed information for a specific DataSunrise user.',
    baseCommand: 'showDsUser',
    params: [
      { name: 'login', type: 'string', description: enhanceParameterDescription('string', 'Login name of the user to display.'), required: true, cliName: '-login' },
    ],
    category: 'DataSunrise User',
  },
  {
    toolName: 'ds_user_change_password',
    description: "Changes a DataSunrise user's password.",
    baseCommand: 'changePwd',
    params: [
      { name: 'login', type: 'string', description: enhanceParameterDescription('string', 'Login name of the user whose password is to be changed.'), required: true, cliName: '-login' },
      { name: 'currentPwd', type: 'string', description: enhanceParameterDescription('string', 'The current password of the user.'), required: true, cliName: '-currentPwd' },
      { name: 'newPwd', type: 'string', description: enhanceParameterDescription('string', 'The new password for the user. Must meet complexity rules.'), required: true, cliName: '-newPwd' },
    ],
    category: 'DataSunrise User',
  },
  {
    toolName: 'ds_user_delete',
    description: 'Deletes a DataSunrise administrative user.',
    baseCommand: 'delDSUser',
    params: [
      { name: 'login', type: 'string', description: enhanceParameterDescription('string', 'Login name of the user to delete.'), required: true, cliName: '-login' },
    ],
    category: 'DataSunrise User',
  },
];
