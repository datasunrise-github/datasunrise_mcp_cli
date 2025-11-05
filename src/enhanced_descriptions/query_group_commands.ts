import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// query_group_add
registerCommandDescription('query_group_add', {
  description: createCommandDescription(
    'Adds',
    'a new Query Group',
    'to DataSunrise. Query Groups are used to categorize SQL queries for policy application or learning.',
    'low'
  ),
  detailedDescription: `
This command creates a new Query Group. Query Groups allow you to collect specific SQL query strings or patterns. 
These groups can then be referenced in security rules (e.g., to block certain queries) or audit rules (e.g., to specifically log or skip certain queries). 
They are also used in learning rules to help DataSunrise understand typical SQL patterns.
  `,
  examples: [
    {
      description: 'Add a new Query Group named "AdminQueries"',
      command: 'query_group_add -name AdminQueries'
    }
  ],
  relatedCommands: ['query_group_add_query', 'query_group_update', 'query_group_show_one', 'query_group_delete'],
  contextualHelp: {
    name: createParameterHelp(
      'Unique name for the new Query Group.',
      { suggestion: 'e.g., "Blocked_SQL_Patterns", "Approved_Admin_Commands", "HighRisk_Queries".' }
    )
  }
});

// query_group_add_query
registerCommandDescription('query_group_add_query', {
  description: createCommandDescription(
    'Adds',
    'a specific SQL query string to an existing Query Group',
    'in DataSunrise.',
    'low'
  ),
  detailedDescription: `
This command adds an individual SQL query text to a previously created Query Group. 
The query can be an exact match or, depending on DataSunrise capabilities, a pattern (though this CLI usually handles exact strings).
  `,
  examples: [
    {
      description: 'Add the query "SELECT * FROM credit_cards" to group "HighRisk_Queries"',
      command: 'query_group_add_query -name HighRisk_Queries -sql "SELECT * FROM credit_cards"'
    }
  ],
  relatedCommands: ['query_group_add', 'query_group_update_query', 'query_group_delete_query'],
  commonIssues: ['Ensure the Query Group specified by -name already exists.'],
  contextualHelp: {
    name: createParameterHelp(
      'Name of the Query Group to add the SQL query to.',
      { suggestion: 'Use "query_group_show_all" to list available groups.' }
    ),
    sql: createParameterHelp(
      'The SQL query text to add to the group.',
      { suggestion: 'Be precise with the SQL syntax. For patterns, consult DataSunrise documentation on supported regex/wildcards if applicable via CLI.' }
    )
  }
});

// query_group_update
registerCommandDescription('query_group_update', {
  description: createCommandDescription(
    'Updates',
    'an existing Query Group\'s name',
    'in DataSunrise.',
    'low'
  ),
  examples: [
    {
      description: 'Rename Query Group "OldQueries" to "LegacyQueries"',
      command: 'query_group_update -name OldQueries -newName LegacyQueries'
    }
  ],
  relatedCommands: ['query_group_add', 'query_group_show_one'],
  contextualHelp: {
    name: createParameterHelp('Current name of the Query Group to update.'),
    newName: createParameterHelp('New name for the Query Group. Must be unique if provided.')
  }
});

// query_group_update_query
registerCommandDescription('query_group_update_query', {
  description: createCommandDescription(
    'Updates',
    'an existing SQL query within a Query Group',
    'in DataSunrise.',
    'low'
  ),
  detailedDescription: 'This command allows modification of an SQL query string that is already part of a Query Group. You must specify the group, the old SQL, and the new SQL.',
  examples: [
    {
      description: 'In group "AdminQueries", change "SELECT version()" to "SELECT @@version"',
      command: 'query_group_update_query -name AdminQueries -sql "SELECT version()" -newSql "SELECT @@version"'
    }
  ],
  relatedCommands: ['query_group_add_query', 'query_group_delete_query'],
  contextualHelp: {
    name: createParameterHelp('Name of the Query Group containing the query.'),
    sql: createParameterHelp('The current SQL query text to be updated. Must be an exact match.'),
    newSql: createParameterHelp('The new SQL query text.')
  }
});

// query_group_show_all
registerCommandDescription('query_group_show_all', {
  description: createCommandDescription(
    'Displays',
    'a list of all configured Query Groups',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all Query Groups', command: 'query_group_show_all' }]
});

// query_group_show_one
registerCommandDescription('query_group_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific Query Group, including its SQL queries',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show details for Query Group "AdminQueries"', command: 'query_group_show_one -name AdminQueries' }],
  contextualHelp: { name: createParameterHelp('Name of the Query Group to display.') }
});

// query_group_delete
registerCommandDescription('query_group_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specified Query Group',
    'from DataSunrise. This does not delete the individual queries if they belong to other groups.',
    'medium' // Deleting groups can affect policies
  ),
  examples: [{ description: 'Delete Query Group "TemporaryQueries"', command: 'query_group_delete -name TemporaryQueries' }],
  contextualHelp: { name: createParameterHelp('Name of the Query Group to delete.') }
});

// query_group_delete_query
registerCommandDescription('query_group_delete_query', {
  description: createCommandDescription(
    'Deletes',
    'a specific SQL query from a Query Group',
    'in DataSunrise.',
    'low'
  ),
  examples: [{ description: 'Remove "DROP TABLE users" from group "Blocked_SQL_Patterns"', command: 'query_group_delete_query -name Blocked_SQL_Patterns -sql "DROP TABLE users"' }],
  contextualHelp: {
    name: createParameterHelp('Name of the Query Group from which to delete the query.'),
    sql: createParameterHelp('The SQL query text to delete from the group. Must be an exact match.')
  }
});
