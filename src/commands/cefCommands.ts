import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const cefCommands: CliCommand[] = [
  {
    toolName: 'cef_add_group',
    description: 'Adds a new CEF (Common Event Format) group. CEF groups organize configurations for exporting audit data to SIEM systems.',
    baseCommand: 'addCefGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Unique name for the new CEF group.'), required: true, cliName: '-name' },
      { name: 'enable', type: 'string', description: enhanceParameterDescription('string', 'Enables or disables the CEF group (true | false). Default: "true".'), required: false, cliName: '-enable' },
    ],
    category: 'CEF',
  },
  {
    toolName: 'cef_add_item',
    description: 'Adds a new CEF item to a specified CEF group. CEF items define how specific DataSunrise events are formatted into CEF messages.',
    baseCommand: 'addCefItem',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Unique name for the new CEF item configuration.'), required: true, cliName: '-name' },
      { name: 'groupName', type: 'string', description: enhanceParameterDescription('string', 'Name of the existing CEF group to add this item to.'), required: true, cliName: '-groupName' },
      { name: 'type', type: 'string', description: enhanceParameterDescription('string', 'Type of DataSunrise event this CEF item handles (e.g., LOGIN_SUCCESSFUL, RULE_MATCHED).', undefined, 'Session Open'), required: true, cliName: '-type', defaultValue: 'Session Open'},
      { name: 'cef', type: 'string', description: enhanceParameterDescription('string', 'The CEF format string for the log message.'), required: true, cliName: '-cef' },
      { name: 'enable', type: 'string', description: enhanceParameterDescription('string', 'Enable or disable the rule (true | false).', undefined, 'true'), required: false, cliName: '-enable' },
    ],
    category: 'CEF',
  },
  {
    toolName: 'cef_update_group',
    description: "Updates an existing CEF group's name or enabled state.",
    baseCommand: 'updateCefGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current name of the CEF group to update.'), required: true, cliName: '-name' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'New name for the CEF group.'), required: false, cliName: '-newName' },
      { name: 'enable', type: 'string', description: enhanceParameterDescription('string', 'Set the enabled state of the CEF group (true | false).'), required: false, cliName: '-enable' },
    ],
    category: 'CEF',
  },
  {
    toolName: 'cef_update_item',
    description: 'Updates an existing CEF item.',
    baseCommand: 'updateCefItem',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current name of the CEF item to update.'), required: true, cliName: '-name' },
      { name: 'groupName', type: 'string', description: enhanceParameterDescription('string', 'Name of the group the item belongs to.'), required: true, cliName: '-groupName' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'New name for the CEF item.'), required: false, cliName: '-newName' },
      { name: 'type', type: 'string', description: enhanceParameterDescription('string', 'New type for the CEF item.'), required: false, cliName: '-type' },
      { name: 'cef', type: 'string', description: enhanceParameterDescription('string', 'New CEF format string for the item.'), required: true, cliName: '-cef' },
      { name: 'enable', type: 'string', description: enhanceParameterDescription('string', 'Set the enabled state of the CEF item (true | false).'), required: false, cliName: '-enable' },
    ],
    category: 'CEF',
  },
  {
    toolName: 'cef_show_groups',
    description: 'Displays a list of all configured CEF groups.',
    baseCommand: 'showCefGroups',
    params: [],
    category: 'CEF',
  },
  {
    toolName: 'cef_show_group',
    description: 'Shows detailed information for a specific CEF group, including its items.',
    baseCommand: 'showCefGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the CEF group to display.'), required: true, cliName: '-name' },
    ],
    category: 'CEF',
  },
  {
    toolName: 'cef_show_items',
    description: 'Displays all CEF items within a specified CEF group.',
    baseCommand: 'showCefItems',
    params: [
      { name: 'groupName', type: 'string', description: enhanceParameterDescription('string', 'Name of the CEF group whose items are to be displayed.'), required: true, cliName: '-groupName' },
    ],
    category: 'CEF',
  },
  {
    toolName: 'cef_show_item',
    description: 'Shows detailed information for a specific CEF item within a group.',
    baseCommand: 'showCefItem',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the CEF item to display.'), required: true, cliName: '-name' },
      { name: 'groupName', type: 'string', description: enhanceParameterDescription('string', 'Name of the CEF group the item belongs to.'), required: true, cliName: '-groupName' },
    ],
    category: 'CEF',
  },
  {
    toolName: 'cef_delete_group',
    description: 'Deletes a specified CEF group. The group must be empty of CEF items.',
    baseCommand: 'delCefGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the CEF group to delete.'), required: true, cliName: '-name' },
    ],
    category: 'CEF',
  },
  {
    toolName: 'cef_delete_item',
    description: 'Deletes a specific CEF item from a CEF group.',
    baseCommand: 'delCefItem',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the CEF item to delete.'), required: true, cliName: '-name' },
      { name: 'groupName', type: 'string', description: enhanceParameterDescription('string', 'Name of the CEF group from which to delete the item.'), required: true, cliName: '-groupName' },
    ],
    category: 'CEF',
  },
];
