import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const applicationCommands: CliCommand[] = [
  {
    toolName: 'application_add',
    description: 'Adds a new application. Applications are logical entities in DataSunrise used to group database clients or services for policy application.',
    baseCommand: 'addApplication',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Unique name for the new application.'), required: true, cliName: '-name' },
    ],
    category: 'Application',
  },
  {
    toolName: 'application_update',
    description: "Updates an existing application's name.",
    baseCommand: 'updateApplication',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current name of the application to be updated.'), required: true, cliName: '-name' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'The new name for the application.'), required: true, cliName: '-newName' },
    ],
    category: 'Application',
  },
  {
    toolName: 'application_show_all',
    description: 'Displays a list of all configured applications.',
    baseCommand: 'showApplications',
    params: [],
    category: 'Application',
  },
  {
    toolName: 'application_show_one',
    description: 'Shows detailed information for a specific application.',
    baseCommand: 'showApplication',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the application to display.'), required: true, cliName: '-name' },
    ],
    category: 'Application',
  },
  {
    toolName: 'application_delete',
    description: 'Deletes a specified application.',
    baseCommand: 'delApplication',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the application to delete.'), required: true, cliName: '-name' },
    ],
    category: 'Application',
  },
  {
    toolName: 'show_app_user_capturing_list',
    description: 'Show List Application User Captures.',
    baseCommand: 'showAppUserCapturingList',
    params: [
      { name: 'instance', type: 'string', description: enhanceParameterDescription('string', 'Name of the Instance.'), required: true, cliName: '-instance' },
    ],
    category: 'Application User Capturing', // Changed category to be more specific
  },
  {
    toolName: 'show_app_user_capturing_setting',
    description: 'Show Application User Capturing.',
    baseCommand: 'showAppUserCapturingSetting',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Logical name of Application User Capturing.'), required: true, cliName: '-name' },
      { name: 'instance', type: 'string', description: enhanceParameterDescription('string', 'Name of DB Instance.'), required: true, cliName: '-instance' },
    ],
    category: 'Application User Capturing',
  },
  {
    toolName: 'add_app_user_capturing_setting',
    description: 'Add Application User Capturing.',
    baseCommand: 'addAppUserCapturingSetting',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'App User Capturing logical name.'), required: true, cliName: '-name' },
      { name: 'instance', type: 'string', description: enhanceParameterDescription('string', 'Name of the Instance.'), required: true, cliName: '-instance' },
      { name: 'capturingType', type: 'string', description: enhanceParameterDescription('string', 'Type of capturing.', 'ENUM', undefined, 'query | resultSet | bindVars | sessionParams | sapEcc | orclEBS'), required: false, cliName: '-capturingType' },
      { name: 'caseSensitive', type: 'string', description: enhanceParameterDescription('string', 'Match Pattern case-sensitivity <true | false>.'), required: false, cliName: '-caseSensitive' },
      { name: 'columnIndex', type: 'string', description: enhanceParameterDescription('string', 'Column Index.'), required: false, cliName: '-columnIndex' },
      { name: 'columnName', type: 'string', description: enhanceParameterDescription('string', 'Column Name.'), required: false, cliName: '-columnName' },
      { name: 'enable', type: 'string', description: enhanceParameterDescription('string', 'Enable Application User Capturing <true | false>.'), required: false, cliName: '-enable' },
      { name: 'matchPattern', type: 'string', description: enhanceParameterDescription('string', 'Full Match Pattern.'), required: false, cliName: '-matchPattern' },
    ],
    category: 'Application User Capturing',
  },
  {
    toolName: 'del_app_user_capturing_setting',
    description: 'Deletes an existing Application User Capturing setting.',
    baseCommand: 'delAppUserCapturingSetting',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Logical name of Application User Capturing setting to delete.'), required: true, cliName: '-name' },
      { name: 'instance', type: 'string', description: enhanceParameterDescription('string', 'Name of the DB Instance the setting belongs to.'), required: true, cliName: '-instance' },
    ],
    category: 'Application User Capturing',
  },
  {
    toolName: 'update_app_user_capturing_setting',
    description: 'Update an Application User Capturing.',
    baseCommand: 'updateAppUserCapturingSetting',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'App User Capturing logical name.'), required: true, cliName: '-name' },
      { name: 'instance', type: 'string', description: enhanceParameterDescription('string', 'Name of the Instance.'), required: true, cliName: '-instance' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'New App User Capturing logical name.'), required: false, cliName: '-newName' },
      { name: 'capturingType', type: 'string', description: enhanceParameterDescription('string', 'Type of capturing.', 'ENUM', undefined, 'query | resultSet | bindVars | sessionParams | sapEcc | orclEBS'), required: false, cliName: '-capturingType' },
      { name: 'caseSensitive', type: 'string', description: enhanceParameterDescription('string', 'Match Pattern case-sensitivity <true | false>.'), required: false, cliName: '-caseSensitive' },
      { name: 'columnIndex', type: 'string', description: enhanceParameterDescription('string', 'Column Index.'), required: false, cliName: '-columnIndex' },
      { name: 'columnName', type: 'string', description: enhanceParameterDescription('string', 'Column Name.'), required: false, cliName: '-columnName' },
      { name: 'enable', type: 'string', description: enhanceParameterDescription('string', 'Enable Application User Capturing <true | false>.'), required: false, cliName: '-enable' },
      { name: 'matchPattern', type: 'string', description: enhanceParameterDescription('string', 'Full Match Pattern.'), required: false, cliName: '-matchPattern' },
    ],
    category: 'Application User Capturing',
  },
];
