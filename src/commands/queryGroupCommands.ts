import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const queryGroupCommands: CliCommand[] = [
  {
    toolName: 'query_group_add',
    description: 'Adds a new Query Group. Query Groups are used to categorize SQL queries for policy application or learning.',
    baseCommand: 'addQueryGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Unique name for the new Query Group.'), required: true, cliName: '-name' },
    ],
    category: 'Query Group',
  },
  {
    toolName: 'query_group_add_query',
    description: 'Adds a specific SQL query string to an existing Query Group.',
    baseCommand: 'addQueryOfGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Query Group to add the SQL query to.'), required: true, cliName: '-name' },
      { name: 'sql', type: 'string', description: enhanceParameterDescription('string', 'The SQL query text to add to the group.'), required: false, cliName: '-sql' },
      { name: 'sqlFile', type: 'string', description: enhanceParameterDescription('string', 'Path to a file containing the SQL query text.'), required: false, cliName: '-sqlFile' },
      { name: 'regExp', type: 'string', description: enhanceParameterDescription('string', 'Treat the SQL statement as a regular expression (true | false).'), required: false, cliName: '-regExp' },
    ],
    category: 'Query Group',
  },
  {
    toolName: 'query_group_update',
    description: "Updates an existing Query Group's name.",
    baseCommand: 'updateQueryGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current name of the Query Group to update.'), required: true, cliName: '-name' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'New name for the Query Group.'), required: true, cliName: '-newName' },
    ],
    category: 'Query Group',
  },
  {
    toolName: 'query_group_update_query',
    description: 'Updates an existing SQL query within a Query Group.',
    baseCommand: 'updateQueryOfGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Query Group containing the query.'), required: true, cliName: '-name' },
      { name: 'sql', type: 'string', description: enhanceParameterDescription('string', 'The current SQL query text to be updated.'), required: false, cliName: '-sql' },
      { name: 'sqlFile', type: 'string', description: enhanceParameterDescription('string', 'Path to a file containing the current SQL query text.'), required: false, cliName: '-sqlFile' },
      { name: 'newSql', type: 'string', description: enhanceParameterDescription('string', 'The new SQL query text.'), required: false, cliName: '-newSql' },
      { name: 'newSqlFile', type: 'string', description: enhanceParameterDescription('string', 'Path to a file containing the new SQL query text.'), required: false, cliName: '-newSqlFile' },
      { name: 'regExp', type: 'string', description: enhanceParameterDescription('string', 'Treat the SQL statement as a regular expression (true | false).'), required: false, cliName: '-regExp' },
    ],
    category: 'Query Group',
  },
  {
    toolName: 'query_group_show_all',
    description: 'Displays a list of all configured Query Groups.',
    baseCommand: 'showQueryGroups',
    params: [],
    category: 'Query Group',
  },
  {
    toolName: 'query_group_show_one',
    description: 'Shows detailed information for a specific Query Group, including its SQL queries.',
    baseCommand: 'showQueryGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Query Group to display.'), required: true, cliName: '-name' },
    ],
    category: 'Query Group',
  },
  {
    toolName: 'query_group_delete',
    description: 'Deletes a specified Query Group. This does not delete the individual queries if they belong to other groups.',
    baseCommand: 'delQueryGroup',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Query Group to delete.'), required: true, cliName: '-name' },
    ],
    category: 'Query Group',
  },
  {
    toolName: 'query_group_delete_query',
    description: 'Deletes a specific SQL query from a Query Group.',
    baseCommand: 'delQuery',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Query Group from which to delete the query.'), required: true, cliName: '-name' },
      { name: 'sql', type: 'string', description: enhanceParameterDescription('string', 'The SQL query text to delete from the group.'), required: true, cliName: '-sql' },
    ],
    category: 'Query Group',
  },
];
