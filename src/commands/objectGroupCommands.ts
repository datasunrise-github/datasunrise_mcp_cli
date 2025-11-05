import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const objectGroupCommands: CliCommand[] = [
  {
    toolName: 'object_group_add',
    description: 'Adds a new Object Group. Object Groups are used to logically group database objects (tables, columns, schemas, etc.) for policy application.',
    baseCommand: 'addObjectGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Unique name for the new Object Group.'), required: true, cliName: '-name' },
      { name: 'blockSeparator', type: 'string', description: enhanceParameterDescription('string', 'Separator for multiple entries in -tables or -functions (default ";").'), required: false, cliName: '-blockSeparator' },
      { name: 'functions', type: 'string', description: enhanceParameterDescription('string', 'Functions to include in the Group, formatted as "db.schema.package.func;...".', 'LIST'), required: false, cliName: '-functions' },
      { name: 'functionsCsvFile', type: 'string', description: enhanceParameterDescription('string', 'Path to a CSV file containing a list of functions.', 'FILE_PATH'), required: false, cliName: '-functionsCsvFile' },
      { name: 'instance', type: 'string', description: enhanceParameterDescription('string', 'Database Instance to associate the group with (<instance name> | any).'), required: false, cliName: '-instance' },
      { name: 'nameSeparator', type: 'string', description: enhanceParameterDescription('string', 'Separator for object name parts in -tables or -functions (default ".").'), required: false, cliName: '-nameSeparator' },
      { name: 'tables', type: 'string', description: enhanceParameterDescription('string', 'Tables/columns to include in the Group, formatted as "db.schema.table.column;...".', 'LIST'), required: false, cliName: '-tables' },
      { name: 'tablesCsvFile', type: 'string', description: enhanceParameterDescription('string', 'Path to a CSV file containing a list of tables/columns.', 'FILE_PATH'), required: false, cliName: '-tablesCsvFile' },
    ],
    category: 'Object Group',
  },
  {
    toolName: 'object_group_update',
    description: "Updates an existing Object Group's name or its members.",
    baseCommand: 'updateObjectGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current name of the Object Group to update.'), required: true, cliName: '-name' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'New name for the Object Group.'), required: false, cliName: '-newName' },
      { name: 'blockSeparator', type: 'string', description: enhanceParameterDescription('string', 'Separator for multiple entries in -tables or -functions (default ";").'), required: false, cliName: '-blockSeparator' },
      { name: 'functions', type: 'string', description: enhanceParameterDescription('string', 'Functions to include/update in the Group, formatted as "db.schema.package.func;...".', 'LIST'), required: false, cliName: '-functions' },
      { name: 'functionsCsvFile', type: 'string', description: enhanceParameterDescription('string', 'Path to a CSV file with a list of functions to add/update.', 'FILE_PATH'), required: false, cliName: '-functionsCsvFile' },
      { name: 'instance', type: 'string', description: enhanceParameterDescription('string', 'Database Instance to associate the group with (<instance name> | any).'), required: false, cliName: '-instance' },
      { name: 'nameSeparator', type: 'string', description: enhanceParameterDescription('string', 'Separator for object name parts in -tables or -functions (default ".").'), required: false, cliName: '-nameSeparator' },
      { name: 'tables', type: 'string', description: enhanceParameterDescription('string', 'Tables/columns to include/update in the Group, formatted as "db.schema.table.column;...".', 'LIST'), required: false, cliName: '-tables' },
      { name: 'tablesCsvFile', type: 'string', description: enhanceParameterDescription('string', 'Path to a CSV file with a list of tables/columns to add/update.', 'FILE_PATH'), required: false, cliName: '-tablesCsvFile' },
    ],
    category: 'Object Group',
  },
  {
    toolName: 'object_group_show_all',
    description: 'Displays a list of all configured Object Groups.',
    baseCommand: 'showObjectGroups',
    params: [],
    category: 'Object Group',
  },
  {
    toolName: 'object_group_show_one',
    description: 'Shows detailed information for a specific Object Group, including its members.',
    baseCommand: 'showObjectGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Object Group to display.'), required: true, cliName: '-name' },
    ],
    category: 'Object Group',
  },
  {
    toolName: 'object_group_delete',
    description: 'Deletes a specified Object Group. This does not delete the actual database objects.',
    baseCommand: 'delObjectGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Object Group to delete.'), required: true, cliName: '-name' },
    ],
    category: 'Object Group',
  },
];
