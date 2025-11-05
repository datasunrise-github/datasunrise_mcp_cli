import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// periodic_task_add_clean_audit
registerCommandDescription('periodic_task_add_clean_audit', {
  description: createCommandDescription(
    'Adds',
    'a periodic task for cleaning (archiving or deleting) audit data',
    'in DataSunrise. Helps manage audit log storage.',
    'low' // Security impact is low, but data retention policies might be affected
  ),
  detailedDescription: `
This command schedules a recurring task to clean up audit data. 
Cleaning can involve archiving old audit logs to a different location or permanently deleting them based on retention policies. 
This is essential for managing storage space consumed by audit logs and complying with data retention requirements.
Further configuration of the clean audit task (e.g., retention period, archive location) is typically done via specific parameters for this task type or through the DataSunrise UI.
  `,
  examples: [
    {
      description: 'Add a periodic task named "WeeklyAuditClean"',
      command: 'periodic_task_add_clean_audit -name WeeklyAuditClean'
      // Note: Additional parameters for scheduling and action (archive/delete) would be needed.
    }
  ],
  relatedCommands: ['periodic_task_update_clean_audit', 'periodic_task_show_one', 'periodic_task_delete'],
  commonIssues: ['Ensure the task schedule and retention settings align with your organization\'s compliance and data retention policies.'],
  contextualHelp: {
    name: createParameterHelp(
      'Unique name for this clean audit task.',
      { suggestion: 'e.g., "DailyAuditArchive", "MonthlyLogPurge".' }
    )
    // Add other relevant parameters like schedule, retention period, action (archive/delete), archive path etc.
  }
});

// periodic_task_add_backup_dictionary
registerCommandDescription('periodic_task_add_backup_dictionary', {
  description: createCommandDescription(
    'Adds',
    'a periodic task for backing up the DataSunrise system dictionary',
    'on the server. Automates essential configuration backups.',
    'low',
    true, // Stability: Ensures recovery capability
    false
  ),
  detailedDescription: `
This command schedules a recurring task to automatically back up the DataSunrise system dictionary (configuration database). 
Regular automated backups are a best practice for disaster recovery.
  `,
  examples: [
    {
      description: 'Schedule a daily dictionary backup named "DailyConfigBackup"',
      command: 'periodic_task_add_backup_dictionary -name DailyConfigBackup -backupName "daily_dict_backup_%DATE%"'
      // Note: Scheduling parameters (e.g., cron expression) would be needed.
    }
  ],
  relatedCommands: ['dictionary_backup_create', 'periodic_task_show_one', 'periodic_task_delete'],
  contextualHelp: {
    name: createParameterHelp('Unique name for this backup dictionary task.'),
    backupName: createParameterHelp(
      'Template for the backup file name. You can use placeholders like %DATE% or %TIMESTAMP%.',
      { suggestion: 'e.g., "dictionary_backup_%YYYYMMDD%".' }
    )
    // Add scheduling parameters
  }
});

// periodic_task_add_user_behavior
registerCommandDescription('periodic_task_add_user_behavior', {
  description: createCommandDescription(
    'Adds',
    'a periodic task for user behavior analysis and learning',
    'in DataSunrise. Helps in establishing baseline user activity for anomaly detection.',
    'medium' // Affects security by building behavior profiles
  ),
  detailedDescription: `
This command schedules a recurring task for DataSunrise's User Behavior Analysis (UBA) engine. 
The task analyzes audit logs over a specified training period to learn typical user activity patterns. 
These learned profiles are then used to detect anomalous behavior that might indicate a security threat.
  `,
  examples: [
    {
      description: 'Schedule UBA learning task "QuarterlyUBAProfile" with training from 2023-01-01 to 2023-03-31',
      command: 'periodic_task_add_user_behavior -name QuarterlyUBAProfile -trStartDate 2023-01-01 -trEndDate 2023-03-31'
      // Note: Scheduling parameters would be needed.
    }
  ],
  relatedCommands: ['periodic_task_show_one', 'periodic_task_delete'],
  contextualHelp: {
    name: createParameterHelp('Unique name for this user behavior task.'),
    trStartDate: createParameterHelp('Training period start date (yyyy-MM-dd).'),
    trEndDate: createParameterHelp('Training period end date (yyyy-MM-dd).')
    // Add scheduling parameters and instance/user scope if applicable
  }
});

// periodic_task_add_ddl_table_relation_learning
registerCommandDescription('periodic_task_add_ddl_table_relation_learning', {
  description: createCommandDescription(
    'Adds',
    'a periodic task for learning table relations from DDL (Data Definition Language) statements',
    'in DataSunrise. Helps in understanding database schema relationships.',
    'low'
  ),
  detailedDescription: `
This command schedules a task to analyze DDL statements (like CREATE TABLE, ALTER TABLE) from a specified database instance. 
It learns table relationships (e.g., foreign keys) which can be used by DataSunrise for more accurate data modeling and policy enforcement.
  `,
  examples: [
    {
      description: 'Schedule DDL learning for instance "OracleDev" into table relation model "DevSchemaRelations"',
      command: 'periodic_task_add_ddl_table_relation_learning -name LearnDevSchema -inst OracleDev -tableRel DevSchemaRelations -analyzeProcAndFunc true'
    }
  ],
  relatedCommands: ['periodic_task_show_one', 'periodic_task_delete'],
  contextualHelp: {
    name: createParameterHelp('Unique name for this DDL table relation learning task.'),
    inst: createParameterHelp('Name of the database instance whose DDL will be analyzed.'),
    tableRel: createParameterHelp('Name of an existing Table Relation (Data Model) entity in DataSunrise to store results.'),
    analyzeProcAndFunc: createParameterHelp('Analyze DDL of stored procedures and functions. Default: false.'),
    analyzeView: createParameterHelp('Analyze DDL of views. Default: false.'),
    login: createParameterHelp('DB username to read DDL (if not stored in instance config).'),
    password: createParameterHelp('Password for the DB username. This is sensitive.'),
    sysDba: createParameterHelp('For Oracle: Connect as SYSDBA. Default: false.')
    // Add scheduling parameters
  }
});

// periodic_task_add_vulnerability_assessment
registerCommandDescription('periodic_task_add_vulnerability_assessment', {
  description: createCommandDescription(
    'Adds',
    'a periodic task for performing vulnerability assessments on database instances',
    'in DataSunrise. Helps identify security weaknesses.',
    'medium' // Identifies vulnerabilities
  ),
  detailedDescription: `
This command schedules recurring vulnerability assessment scans for specified database instances. 
DataSunrise will check for common misconfigurations, weak passwords, missing patches, and other security vulnerabilities 
based on predefined security standards (e.g., CIS Benchmarks, DISA STIGs).
  `,
  examples: [
    {
      description: 'Schedule a weekly vulnerability assessment "WeeklyVAScan"',
      command: 'periodic_task_add_vulnerability_assessment -name WeeklyVAScan'
      // Note: Parameters for target instances, security standards, and schedule are needed.
    }
  ],
  relatedCommands: ['periodic_task_show_one', 'periodic_task_delete', 'report_gen_add_security'], // Security reports often use VA results
  contextualHelp: {
    name: createParameterHelp('Unique name for this vulnerability assessment task.')
    // Add parameters for target instances, security standards to check against, schedule, notification settings, etc.
  }
});

// periodic_task_add_update_metadata
registerCommandDescription('periodic_task_add_update_metadata', {
  description: createCommandDescription(
    'Adds',
    'a periodic task for updating metadata for a specified database instance',
    'in DataSunrise. Keeps schema information current.',
    'low'
  ),
  detailedDescription: `
This command schedules a recurring task to refresh the database schema metadata for a specified instance. 
DataSunrise uses this metadata (tables, columns, views, procedures, etc.) for various functions, including policy creation and data discovery. 
Regular updates ensure DataSunrise has an accurate view of the database structure.
  `,
  examples: [
    {
      description: 'Schedule daily metadata update for instance "SQLServerProd"',
      command: 'periodic_task_add_update_metadata -name DailyMetaRefresh_SQLProd -instance SQLServerProd'
      // Note: Scheduling parameters are needed.
    }
  ],
  relatedCommands: ['instance_update_metadata', 'periodic_task_show_one', 'periodic_task_delete'],
  contextualHelp: {
    name: createParameterHelp('Unique name for this update metadata task.'),
    instance: createParameterHelp('Name of the database instance for which to update metadata.')
    // Add scheduling parameters
  }
});

// periodic_task_add_data_discovery
registerCommandDescription('periodic_task_add_data_discovery', {
  description: createCommandDescription(
    'Adds',
    'a periodic task for performing data discovery on a database instance',
    'in DataSunrise. Helps find and classify sensitive data.',
    'medium' // Involves scanning data
  ),
  detailedDescription: `
This command schedules a recurring data discovery task. 
The task will scan a specified database instance (or parts of it) to find data matching predefined sensitive data patterns 
(e.g., credit card numbers, social security numbers) defined in Discovery Groups or Information Types.
  `,
  examples: [
    {
      description: 'Schedule a monthly PII discovery scan for instance "CustomerDB"',
      command: 'periodic_task_add_data_discovery -name MonthlyPIIScan_CustomerDB -instance CustomerDB -searchByInfoTypes "CreditCards,SSN,EmailAddresses"'
      // Note: Scheduling parameters are needed.
    }
  ],
  relatedCommands: ['discovery_group_add', 'discovery_attribute_add', 'periodic_task_show_one', 'periodic_task_delete'],
  contextualHelp: {
    name: createParameterHelp('Unique name for this data discovery task.'),
    instance: createParameterHelp('Name of the database instance to perform discovery on.'),
    searchByInfoTypes: createParameterHelp(
      'Comma-separated list of Information Type names (predefined in DataSunrise) to search for.',
      { suggestion: 'e.g., "Credit Card Numbers,Personal Emails,US SSN".'}
    )
    // Add parameters for specific schemas/tables, discovery groups, schedule, etc.
  }
});

// periodic_task_add_health_check
registerCommandDescription('periodic_task_add_health_check', {
  description: createCommandDescription(
    'Adds',
    'a periodic task for performing health checks on a database instance',
    'in DataSunrise. Monitors database availability and basic performance.',
    'low'
  ),
  detailedDescription: `
This command schedules a recurring health check for a specified database instance. 
DataSunrise will periodically attempt to connect to the database and may perform basic checks 
to ensure it's operational and responsive. Results can be used for monitoring and alerting.
  `,
  examples: [
    {
      description: 'Schedule hourly health check for "PrimaryOracleDB"',
      command: 'periodic_task_add_health_check -name HourlyHealthCheck_Oracle1 -instance PrimaryOracleDB'
      // Note: Scheduling parameters are needed.
    }
  ],
  relatedCommands: ['core_show_state', 'periodic_task_show_one', 'periodic_task_delete'],
  contextualHelp: {
    name: createParameterHelp('Unique name for this health check task.'),
    instance: createParameterHelp('Name of the database instance to perform health check on.')
    // Add scheduling and notification parameters
  }
});

// periodic_task_update_clean_audit (Example for an update command)
registerCommandDescription('periodic_task_update_clean_audit', {
  description: createCommandDescription(
    'Updates',
    'an existing periodic clean audit task',
    'in DataSunrise.',
    'low'
  ),
  examples: [
    {
      description: 'Rename task "OldAuditClean" to "ArchivalAuditClean"',
      command: 'periodic_task_update_clean_audit -name OldAuditClean -newName ArchivalAuditClean'
      // Note: Other updatable parameters like schedule, retention would be specified here.
    }
  ],
  relatedCommands: ['periodic_task_add_clean_audit', 'periodic_task_show_one'],
  contextualHelp: {
    name: createParameterHelp('Current name of the task to update.'),
    newName: createParameterHelp('New name for the task. Must be unique if provided.')
    // Add other updatable parameters
  }
});

// periodic_task_show_one
registerCommandDescription('periodic_task_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific periodic task',
    'in DataSunrise.',
    'none'
  ),
  examples: [
    {
      description: 'Show details for task "DailyMetaRefresh_SQLProd" of type "Update Metadata"',
      command: 'periodic_task_show_one -name DailyMetaRefresh_SQLProd -taskType "Update Metadata"'
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Name of the periodic task to display.'),
    taskType: createParameterHelp(
      'Type of the periodic task (e.g., "Clean Audit", "Backup Dictionary", "Update Metadata").',
      { suggestion: 'This helps differentiate tasks if names are similar across types.'}
    )
  }
});

// periodic_task_delete
registerCommandDescription('periodic_task_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specified periodic task',
    'from DataSunrise.',
    'low'
  ),
  examples: [
    {
      description: 'Delete task "OldBackupTask" of type "Backup Dictionary"',
      command: 'periodic_task_delete -name OldBackupTask -taskType "Backup Dictionary"'
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Name of the periodic task to delete.'),
    taskType: createParameterHelp('Type of the periodic task to delete. Important for uniquely identifying the task.')
  }
});
