import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// Register enhanced description for instance_add
registerCommandDescription('instance_add', {
  description: createCommandDescription(
    'Adds',
    'a database instance definition',
    'for monitoring or protection',
    'medium', // securityImpact
    false,    // stabilityImpact
    false     // serviceInterruption
  ),
  detailedDescription: `
This command creates a new logical instance representing a target database in DataSunrise.
An instance is the primary managed entity and must be created before configuring proxies,
rules, or other security features for a target database.

The instance definition includes connection information and metadata about the target
database but does not establish any proxying or protection by itself. After creating
an instance, you typically add interfaces, proxies, and rules.
  `,
  securityImpact: 'medium',
  performanceImpact: `
Creating an instance has minimal performance impact on the DataSunrise server. 
However, each instance will periodically poll its target database for metadata updates,
which can impact the target database's performance if it has a large schema and/or is
already under heavy load.
  `,
  examples: [
    {
      description: 'Add a PostgreSQL instance',
      command: 'instance_add -name postgres-prod -dbType POSTGRESQL -login db_admin -database mydb',
      notes: 'Requires valid database credentials with schema read access'
    },
    {
      description: 'Add an Oracle instance with SYSDBA privileges',
      command: 'instance_add -name oracle-finance -dbType ORACLE -login sys -instance ORCL -sysDba true',
      notes: 'Using SYSDBA gives higher level access but requires more powerful credentials'
    }
  ],
  relatedCommands: [
    'instance_update',
    'instance_delete',
    'instance_show_one',
    'instance_interface_add',
    'instance_proxy_add'
  ],
  relatedSequences: [
    'sequence_setup_database_instance_with_proxy'
  ],
  commonIssues: [
    'Ensure the database login has sufficient privileges to read metadata',
    'Check network connectivity to the database server',
    'For Oracle: specify whether to use SID or SERVICE_NAME properly',
    'For SSL-enabled databases: configure the appropriate SSL key group first'
  ],
  contextualHelp: {
    name: createParameterHelp(
      'Unique logical name for this instance within DataSunrise.',
      {
        suggestion: 'Use a descriptive name that identifies the database environment, e.g., "postgres-prod" or "oracle-finance".'
      }
    ),
    dbType: createParameterHelp(
      'Type of the database to connect to. This determines which protocol and driver DataSunrise will use.',
      {
        suggestion: 'Common types include POSTGRESQL, MYSQL, ORACLE, MSSQL, and MONGODB.'
      }
    ),
    login: createParameterHelp(
      'Database user login DataSunrise will use to connect for metadata retrieval and health checks.',
      {
        suggestion: 'This user should have read access to database schemas but does not need write permissions.'
      }
    ),
    instance: createParameterHelp(
      'Oracle instance name or SID. Required if dbType is ORACLE.',
      {
        suggestion: 'For Oracle, this is typically the SID like "ORCL" or "XE".'
      }
    ),
    database: createParameterHelp(
      'Database name. Required for many dbTypes like POSTGRESQL, MSSQL.',
      {
        suggestion: 'For PostgreSQL or MySQL, this is the name of the database, e.g., "mydb" or "production_db".'
      }
    ),
    sysDba: createParameterHelp(
      'For Oracle: Connect with SYSDBA privileges. Use with caution.',
      {
        suggestion: 'Only set to true if SYSDBA privileges are absolutely necessary for metadata retrieval.',
        warning: 'Connecting as SYSDBA grants extensive permissions.'
      }
    )
    // Add more parameter help entries as needed for other instance_add parameters
  }
});

// Additional instance command descriptions (instance_update, instance_delete, etc.) would follow here.
// For brevity, only instance_add is fully detailed in this example.
