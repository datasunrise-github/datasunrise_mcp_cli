import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// report_gen_add_audit
registerCommandDescription('report_gen_add_audit', {
  description: createCommandDescription(
    'Adds',
    'a new Audit Report generation task',
    'to DataSunrise. Configures how audit data is filtered, formatted, and scheduled for reporting.',
    'low'
  ),
  detailedDescription: `
This command schedules and configures an Audit Report generation task. 
Audit reports provide summaries and detailed views of database activities based on collected audit logs. 
You can specify filters (instances, users, query types), report format (CSV, PDF, JSON), scheduling, and notification subscribers.
  `,
  examples: [
    {
      description: 'Add a daily PDF audit report for "OracleInstance1" focusing on DML operations',
      command: 'report_gen_add_audit -name Daily_DML_Oracle1 -instances OracleInstance1 -queryTypes "INSERT,UPDATE,DELETE" -reportFormat PDF -cronExpression "0 0 * * *"'
      // Note: More params like subscribers, reportColumns might be needed.
    }
  ],
  relatedCommands: ['report_gen_update_audit', 'report_gen_show_one', 'report_gen_delete'],
  contextualHelp: {
    name: createParameterHelp('Unique name for this audit report generation task.'),
    enabled: createParameterHelp('Enable or disable the scheduled execution. Default: true.'),
    startDate: createParameterHelp('Schedule start date/time (yyyy-MM-dd HH:mm:ss).'),
    endDate: createParameterHelp('Schedule end date/time (yyyy-MM-dd HH:mm:ss).'),
    cronExpression: createParameterHelp('Cron expression for custom scheduling (e.g., "0 2 * * 1" for every Monday at 2 AM).'),
    generateReport: createParameterHelp('Generate a report file. Default: true.'),
    reportFormat: createParameterHelp('Format for the report file (CSV, PDF, JSON).', { suggestion: 'CSV for data analysis, PDF for distribution.'}),
    compressType: createParameterHelp('Compression for the report file (NO, ZIP, GZIP).'),
    operationsWithError: createParameterHelp('Include database operations that resulted in an error. Default: false.'),
    rules: createParameterHelp('Comma-separated list of audit rule names to include in the report scope.', { suggestion: 'Focuses report on specific audit policies.'}),
    instances: createParameterHelp('Comma-separated instances (e.g., "Inst1:ObjGrp1,Inst2"). Optionally specify Object Groups per instance.'),
    queryTypes: createParameterHelp('Comma-separated SQL query types (SELECT, INSERT, UPDATE, DELETE, DDL, DCL, etc.).'),
    dataFilter: createParameterHelp('Custom filter expression (SQL WHERE clause like syntax) to apply to audit data.'),
    reportColumns: createParameterHelp('For CSV: Comma-separated columns to include (Col1:Title1,Col2).'),
    queryLengthLimit: createParameterHelp('Maximum length for SQL queries displayed in the report.'),
    groupingPeriod: createParameterHelp('Period in minutes for grouping similar events in the report.'),
    subscribers: createParameterHelp('Comma-separated subscriber names for notification upon report generation.', { suggestion: 'Ensure subscribers are configured via "subscriber_add".'}),
    writeToSyslog: createParameterHelp('Send notification to syslog. Default: false.'),
    externalCommand: createParameterHelp('External shell command to execute after report generation (e.g., for custom processing or distribution).')
  }
});

// report_gen_add_masking
registerCommandDescription('report_gen_add_masking', {
  description: createCommandDescription(
    'Adds',
    'a new Masking Report generation task',
    'to DataSunrise. Reports on data masking activities.',
    'low'
  ),
  detailedDescription: 'This command schedules a task to generate reports on dynamic data masking activities performed by DataSunrise. It helps track when and where data was masked.',
  examples: [
    {
      description: 'Add a weekly masking report "WeeklyMaskingSummary"',
      command: 'report_gen_add_masking -name WeeklyMaskingSummary'
      // Note: Add scheduling and filter parameters.
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Unique name for this masking report task.')
    // Add relevant parameters for masking reports (filters, schedule, etc.)
  }
});

// report_gen_add_security
registerCommandDescription('report_gen_add_security', {
  description: createCommandDescription(
    'Adds',
    'a new Security Report generation task',
    'to DataSunrise. Reports on security events and policy violations.',
    'low'
  ),
  detailedDescription: 'This command schedules a task to generate reports on security-related events, such as policy violations, blocked queries, and alerts. Useful for security posture reviews.',
  examples: [
    {
      description: 'Add a daily security incident report "DailySecurityAlerts"',
      command: 'report_gen_add_security -name DailySecurityAlerts'
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Unique name for this security report task.')
  }
});

// report_gen_add_operation_errors
registerCommandDescription('report_gen_add_operation_errors', {
  description: createCommandDescription(
    'Adds',
    'a new Operation Errors Report generation task',
    'to DataSunrise. Reports on database operations that resulted in errors.',
    'low'
  ),
  detailedDescription: 'This command schedules a task to generate reports specifically on database operations that failed or returned errors, as captured by DataSunrise.',
  examples: [
    {
      description: 'Add a report for DB operation errors "DB_Error_Log"',
      command: 'report_gen_add_operation_errors -name DB_Error_Log'
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Unique name for this operation errors report task.')
  }
});

// report_gen_add_session (assuming this is for "All Sessions")
registerCommandDescription('report_gen_add_session', {
  description: createCommandDescription(
    'Adds',
    'a new Session Report generation task (for direct or all sessions)',
    'to DataSunrise. Reports on database session activity.',
    'low'
  ),
  detailedDescription: 'This command schedules a task to generate reports on database sessions. Depending on parameters or specific command variant (e.g. direct_session), it can report on all sessions or direct (unproxied) sessions.',
  examples: [
    {
      description: 'Add a report for all database sessions "AllSessionsWeekly"',
      command: 'report_gen_add_session -name AllSessionsWeekly'
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Unique name for this session report task.'),
    inst: createParameterHelp('For Direct Session Report: Database instance name or "any". If omitted for a general session report, it might apply to all instances or require other filters.')
  }
});

// report_gen_add_direct_session
registerCommandDescription('report_gen_add_direct_session', {
  description: createCommandDescription(
    'Adds',
    'a Direct Session Report generation task',
    'to DataSunrise. Reports on database sessions that bypassed DataSunrise proxies.',
    'low'
  ),
  detailedDescription: 'This command schedules a task to generate reports specifically on direct database sessions, i.e., connections made to the database that did not go through a DataSunrise proxy. This is important for identifying unmonitored access.',
  examples: [
    {
      description: 'Add a report for direct sessions to "OracleProd"',
      command: 'report_gen_add_direct_session -name DirectAccess_OracleProd -inst OracleProd'
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Unique name for this direct session report task.'),
    inst: createParameterHelp('Database instance name or "any" to report on direct sessions for.')
  }
});

// report_gen_add_system_events
registerCommandDescription('report_gen_add_system_events', {
  description: createCommandDescription(
    'Adds',
    'a new System Events Report generation task',
    'to DataSunrise. Reports on DataSunrise system-level events.',
    'low'
  ),
  detailedDescription: 'This command schedules a task to generate reports on DataSunrise internal system events, such as service start/stop, configuration changes, errors, etc.',
  examples: [
    {
      description: 'Add a daily system event log "DailyDSSystemLog"',
      command: 'report_gen_add_system_events -name DailyDSSystemLog'
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Unique name for this system events report task.')
  }
});

// report_gen_add_data_discovery (DEPRECATED in favor of periodic_task_add_data_discovery)
registerCommandDescription('report_gen_add_data_discovery', {
  description: createCommandDescription(
    'Adds',
    'a Data Discovery Report generation task (DEPRECATED - use periodic_task_add_data_discovery)',
    'to DataSunrise.',
    'low'
  ),
  detailedDescription: 'This command is for scheduling reports based on data discovery results. Note: Modern DataSunrise versions might handle discovery task scheduling and reporting differently, often via periodic_task_add_data_discovery and then generating reports from those task results.',
  examples: [
    {
      description: 'Add a data discovery report (legacy)',
      command: 'report_gen_add_data_discovery -name DiscoveryReport_Old -instance MyDatabase -searchByInfoTypes "SSN,CreditCard"'
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Name for this data discovery report task.'),
    instance: createParameterHelp('Instance name for discovery.'),
    searchByInfoTypes: createParameterHelp('Comma-separated Information Types.')
  }
});


// report_gen_update_audit
registerCommandDescription('report_gen_update_audit', {
  description: createCommandDescription(
    'Updates',
    'an existing Audit Report generation task',
    'in DataSunrise.',
    'low'
  ),
  examples: [
    {
      description: 'Rename audit report task "OldDailyAudit" to "DailyAuditSummary"',
      command: 'report_gen_update_audit -name OldDailyAudit -newName DailyAuditSummary'
      // Other updatable parameters (schedule, filters, etc.) would be included here.
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Current name of the audit report task to update.'),
    newName: createParameterHelp('New name for the task. Must be unique if provided.')
    // Add other updatable parameters from report_gen_add_audit
  }
});

// report_gen_show_all
registerCommandDescription('report_gen_show_all', {
  description: createCommandDescription(
    'Displays',
    'all configured report generation tasks',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all report generation tasks', command: 'report_gen_show_all' }]
});

// report_gen_show_one
registerCommandDescription('report_gen_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific report generation task',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show details for report task "DailyAuditSummary"', command: 'report_gen_show_one -name DailyAuditSummary' }],
  contextualHelp: { name: createParameterHelp('Name of the report generation task to display.') }
});

// report_gen_delete
registerCommandDescription('report_gen_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specified report generation task',
    'from DataSunrise.',
    'low'
  ),
  examples: [{ description: 'Delete report task "OldWeeklyReport"', command: 'report_gen_delete -name OldWeeklyReport' }],
  contextualHelp: { name: createParameterHelp('Name of the report generation task to delete.') }
});
