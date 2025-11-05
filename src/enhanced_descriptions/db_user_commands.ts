import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// db_user_add
registerCommandDescription('db_user_add', {
  description: createCommandDescription(
    'Adds',
    'a new database user definition',
    'to DataSunrise. This user should exist in the actual database.',
    'low'
  ),
  detailedDescription: `
This command defines a database user within DataSunrise. 
This definition is used to associate database activity with a specific user account for auditing and policy enforcement. 
The user must already exist in the target database.
  `,
  examples: [
    {
      description: 'Add database user "app_user" for instance "OracleDB1"',
      command: 'db_user_add -name app_user -inst OracleDB1 -dbType ORACLE'
    },
    {
      description: 'Add a generic database user "readonly_user" applicable to any MySQL instance',
      command: 'db_user_add -name readonly_user -inst any -dbType MYSQL'
    }
  ],
  relatedCommands: ['db_user_group_add', 'db_user_update', 'db_user_show_one', 'db_user_delete'],
  contextualHelp: {
    name: createParameterHelp(
      'Name of the database user as it exists in the database.'
    ),
    inst: createParameterHelp(
      'Name of the DataSunrise instance this user belongs to, or "any" if applicable to all instances of the specified dbType.',
      {
        suggestion: 'Use "instance_show_all" to list available instances. Use "any" for broadly defined users.'
      }
    ),
    dbType: createParameterHelp(
      'Database type (e.g., ORACLE, MYSQL, ANY). Often inferred if -inst is specific, but good to provide for clarity or with -inst any.',
      {
        suggestion: 'Specify the database platform like POSTGRESQL, MSSQL, etc.'
      }
    )
  }
});

// db_user_group_add
registerCommandDescription('db_user_group_add', {
  description: createCommandDescription(
    'Adds',
    'a new group for database users',
    'in DataSunrise. Members should be existing DB users defined in DataSunrise.',
    'low'
  ),
  detailedDescription: `
This command creates a logical group of database users within DataSunrise. 
Grouping users simplifies policy management, allowing rules to be applied to multiple users simultaneously. 
Members added to the group must already be defined in DataSunrise via 'db_user_add'.
  `,
  examples: [
    {
      description: 'Create a DB user group "dba_users" for Oracle instance "OraPROD" and add "sys", "system"',
      command: 'db_user_group_add -name dba_users -inst OraPROD -dbType ORACLE -addMembers "sys,system"'
    }
  ],
  relatedCommands: ['db_user_add', 'db_user_group_update', 'db_user_group_show_one', 'db_user_group_delete'],
  contextualHelp: {
    name: createParameterHelp('Unique name for the new group of database users.'),
    inst: createParameterHelp('Associated instance name or "any". Scopes the group to a specific instance or DB type.'),
    dbType: createParameterHelp('Database type (e.g., ORACLE, MYSQL, ANY) to scope the group.'),
    addMembers: createParameterHelp(
      'Comma-separated list of existing DB user names (defined in DataSunrise) to add as members.',
      {
        suggestion: 'Ensure users are added via "db_user_add" first.'
      }
    )
  }
});

// db_user_mapping_add
registerCommandDescription('db_user_mapping_add', {
  description: createCommandDescription(
    'Adds',
    'an Active Directory User/Group to Database User mapping',
    'for a specific instance in DataSunrise. Enables AD-based authentication or policy decisions.',
    'medium' // Security-sensitive mapping
  ),
  detailedDescription: `
This command configures a mapping between an Active Directory (AD) user or group and a database user for a specific DataSunrise instance. 
This is often used for features like AD-integrated authentication pass-through or for applying policies based on AD identity.
Requires a pre-configured LDAP server in DataSunrise.
  `,
  examples: [
    {
      description: 'Map AD user "DOMAIN\\ad_user" to DB user "db_app_user" on instance "MSSQL_Finance"',
      command: 'db_user_mapping_add -inst MSSQL_Finance -adLogin "DOMAIN\\ad_user" -dbLogin db_app_user -dbPassword "complexpassword" -ldapServer "MainAD"'
    }
  ],
  relatedCommands: ['ldap_server_add', 'db_user_mapping_show', 'db_user_mapping_delete', 'db_user_mapping_enable', 'db_user_mapping_disable'],
  commonIssues: [
    'Ensure the LDAP server is correctly configured and reachable.',
    'The dbPassword is used for hash generation/verification and should match the actual DB user password.'
  ],
  contextualHelp: {
    inst: createParameterHelp('Name of the DataSunrise instance for this mapping.'),
    adLogin: createParameterHelp('Active Directory login name (e.g., "user@domain.com" or "DOMAIN\\user"). Either this or adGroup is required.'),
    adGroup: createParameterHelp('Active Directory group name. Either this or adLogin is required.'),
    dbLogin: createParameterHelp('Database login name to map to.'),
    dbPassword: createParameterHelp('Password of the database user (for hash generation/verification). This is sensitive.'),
    ldapServer: createParameterHelp('Name of a pre-configured LDAP Server in DataSunrise. Uses default if omitted.'),
    hashType: createParameterHelp('Password hashing algorithm (e.g., MD5, SHA1, CRYPT, PLAIN). Defaults based on DB type.'),
    sysDba: createParameterHelp('For Oracle SHA512: connect as SYSDBA to retrieve salt. Default: false.')
  }
});

// ldap_server_add
registerCommandDescription('ldap_server_add', {
  description: createCommandDescription(
    'Adds',
    'a new LDAP server configuration',
    'to DataSunrise. Used for AD integration features.',
    'medium' // LDAP configuration is security-sensitive
  ),
  detailedDescription: `
This command configures a new LDAP (Lightweight Directory Access Protocol) or Active Directory server connection in DataSunrise. 
This is a prerequisite for features like AD user mapping and AD-based authentication for DataSunrise administrators.
  `,
  examples: [
    {
      description: 'Add an LDAP server configuration "MainAD"',
      command: 'ldap_server_add -name MainAD -host ad.example.com -port 389 -baseDn "DC=example,DC=com" -default true'
    }
  ],
  relatedCommands: ['ldap_server_update', 'ldap_server_show_all', 'ldap_server_delete', 'db_user_mapping_add'],
  contextualHelp: {
    name: createParameterHelp('Logical name for the LDAP server configuration.'),
    host: createParameterHelp('Hostname or IP address of the LDAP server.'),
    port: createParameterHelp('Port number of the LDAP server (e.g., 389 for LDAP, 636 for LDAPS).'),
    default: createParameterHelp('Set this LDAP server as the default for operations that do not specify one.'),
    baseDn: createParameterHelp('Base Distinguished Name (DN) for LDAP searches (e.g., "OU=Users,DC=example,DC=com").')
  }
});

// db_user_update
registerCommandDescription('db_user_update', {
  description: createCommandDescription(
    'Updates',
    'an existing database user\'s name or properties',
    'in DataSunrise. (Note: CLI might only support renaming).',
    'low'
  ),
  examples: [
    {
      description: 'Rename database user "old_app_user" to "new_app_user"',
      command: 'db_user_update -name old_app_user -newName new_app_user'
    }
  ],
  relatedCommands: ['db_user_add', 'db_user_show_one'],
  contextualHelp: {
    name: createParameterHelp('Current name of the database user.'),
    newName: createParameterHelp('New name for the database user. Must be unique.')
  }
});

// db_user_group_update
registerCommandDescription('db_user_group_update', {
  description: createCommandDescription(
    'Updates',
    'an existing database user group\'s name or members',
    'in DataSunrise.',
    'low'
  ),
  examples: [
    {
      description: 'Rename group "old_dba_group" to "new_dba_group" and add "user3", remove "user1"',
      command: 'db_user_group_update -name old_dba_group -newName new_dba_group -addMembers "user3" -removeMembers "user1"'
    }
  ],
  relatedCommands: ['db_user_group_add', 'db_user_group_show_one'],
  contextualHelp: {
    name: createParameterHelp('Current name of the database user group.'),
    newName: createParameterHelp('New name for the group. Must be unique if provided.'),
    addMembers: createParameterHelp('Comma-separated list of DB user names to add.'),
    removeMembers: createParameterHelp('Comma-separated list of DB user names to remove.')
  }
});

// ldap_server_update
registerCommandDescription('ldap_server_update', {
  description: createCommandDescription(
    'Updates',
    'an existing LDAP server\'s configuration',
    'in DataSunrise. (Note: CLI might only support renaming).',
    'medium'
  ),
  examples: [
    {
      description: 'Rename LDAP server "OldAD" to "PrimaryAD"',
      command: 'ldap_server_update -name OldAD -newName PrimaryAD'
    }
  ],
  relatedCommands: ['ldap_server_add', 'ldap_server_show_one'],
  contextualHelp: {
    name: createParameterHelp('Current name of the LDAP server.'),
    newName: createParameterHelp('New name for the LDAP server. Must be unique if provided.')
    // Add other updatable LDAP params if supported by CLI
  }
});

// db_user_show_all
registerCommandDescription('db_user_show_all', {
  description: createCommandDescription(
    'Displays',
    'all database users defined',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all defined database users', command: 'db_user_show_all' }]
});

// db_user_show_one
registerCommandDescription('db_user_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific database user',
    'defined in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show details for DB user "app_user"', command: 'db_user_show_one -name app_user' }],
  contextualHelp: { name: createParameterHelp('Name of the database user to display.') }
});

// db_user_group_show_all
registerCommandDescription('db_user_group_show_all', {
  description: createCommandDescription(
    'Displays',
    'all database user groups',
    'defined in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all database user groups', command: 'db_user_group_show_all' }]
});

// db_user_group_show_one
registerCommandDescription('db_user_group_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific database user group',
    'defined in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show details for DB user group "dba_users"', command: 'db_user_group_show_one -name dba_users' }],
  contextualHelp: { name: createParameterHelp('Name of the database user group to display.') }
});

// db_user_mapping_show
registerCommandDescription('db_user_mapping_show', {
  description: createCommandDescription(
    'Shows',
    'AD to DB user mappings for a specific instance',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show mappings for instance "MSSQL_Finance"', command: 'db_user_mapping_show -instance MSSQL_Finance' }],
  contextualHelp: { instance: createParameterHelp('Name of the instance for which to show mappings.') }
});

// ldap_server_show_all
registerCommandDescription('ldap_server_show_all', {
  description: createCommandDescription(
    'Displays',
    'all configured LDAP servers',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all LDAP server configurations', command: 'ldap_server_show_all' }]
});

// ldap_server_show_one
registerCommandDescription('ldap_server_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific LDAP server',
    'configured in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show details for LDAP server "MainAD"', command: 'ldap_server_show_one -name MainAD' }],
  contextualHelp: { name: createParameterHelp('Name of the LDAP server to display.') }
});

// db_user_mapping_enable
registerCommandDescription('db_user_mapping_enable', {
  description: createCommandDescription(
    'Enables',
    'AD to DB user mapping for an instance',
    'in DataSunrise.',
    'medium'
  ),
  examples: [{ description: 'Enable AD mapping for instance "MSSQL_Finance"', command: 'db_user_mapping_enable -instance MSSQL_Finance -mapType config' }],
  contextualHelp: {
    instance: createParameterHelp('Name of the instance for which to enable mapping.'),
    mapType: createParameterHelp('Type of mapping to enable (e.g., config). Default: "config".')
  }
});

// db_user_mapping_disable
registerCommandDescription('db_user_mapping_disable', {
  description: createCommandDescription(
    'Disables',
    'AD to DB user mapping for an instance',
    'in DataSunrise.',
    'medium'
  ),
  examples: [{ description: 'Disable AD mapping for instance "MSSQL_Finance"', command: 'db_user_mapping_disable -instance MSSQL_Finance' }],
  contextualHelp: { instance: createParameterHelp('Name of the instance for which to disable mapping.') }
});

// db_user_delete
registerCommandDescription('db_user_delete', {
  description: createCommandDescription(
    'Deletes',
    'a database user definition',
    'from DataSunrise.',
    'low'
  ),
  examples: [{ description: 'Delete DB user "old_user"', command: 'db_user_delete -name old_user' }],
  contextualHelp: { name: createParameterHelp('Name of the database user to delete.') }
});

// db_user_group_delete
registerCommandDescription('db_user_group_delete', {
  description: createCommandDescription(
    'Deletes',
    'a database user group',
    'from DataSunrise.',
    'low'
  ),
  examples: [{ description: 'Delete DB user group "temp_group"', command: 'db_user_group_delete -name temp_group' }],
  contextualHelp: { name: createParameterHelp('Name of the database user group to delete.') }
});

// db_user_mapping_delete
registerCommandDescription('db_user_mapping_delete', {
  description: createCommandDescription(
    'Deletes',
    'an AD to DB user mapping',
    'from DataSunrise.',
    'medium'
  ),
  examples: [{ description: 'Delete mapping for AD user "DOMAIN\\user" on instance "MSSQL_Finance"', command: 'db_user_mapping_delete -instance MSSQL_Finance -adLogin "DOMAIN\\user"' }],
  contextualHelp: {
    instance: createParameterHelp('Name of the instance from which to delete the mapping.'),
    adLogin: createParameterHelp('AD login of the mapping to delete.')
  }
});

// ldap_server_delete
registerCommandDescription('ldap_server_delete', {
  description: createCommandDescription(
    'Deletes',
    'an LDAP server configuration',
    'from DataSunrise.',
    'medium'
  ),
  examples: [{ description: 'Delete LDAP server "TestAD"', command: 'ldap_server_delete -name TestAD' }],
  contextualHelp: { name: createParameterHelp('Name of the LDAP server to delete.') }
});
