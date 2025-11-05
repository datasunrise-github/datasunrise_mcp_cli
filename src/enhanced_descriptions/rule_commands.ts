import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// rule_add_audit
registerCommandDescription('rule_add_audit', {
  description: createCommandDescription(
    'Creates',
    'a new Audit Rule',
    'to track and log user actions and changes made to the target database. This rule can be configured to audit or skip specific activities based on a wide range of criteria.',
    'high', // securityImpact: Creating audit rules is a fundamental security activity.
    false,   // stabilityImpact: Generally low unless a very high volume of traffic is audited.
    false    // serviceInterruption: No direct interruption.
  ),
  detailedDescription: `
The 'rule_add_audit' command is used to create new audit rules in DataSunrise. These rules allow for real-time tracking and logging of all user actions and changes made to the target database.
You can configure the rule to either 'audit' (log) or 'skip' (ignore) specific database activities. The rule can be filtered by a wide range of criteria, including database users, applications, hosts, query types, and more.
This command is essential for establishing a comprehensive audit trail for security and compliance purposes.
  `,
  examples: [
    {
      description: 'Create a simple audit rule to log all SELECT statements on the "customers" table.',
      command: 'rule_add_audit -name "Audit_Customer_Selects" -instance "mydb" -dbType "postgresql" -filterType object -intercSqlSelect true -intercTab "public.customers" -logInStorage true'
    },
    {
      description: 'Create a rule to audit all DDL statements.',
      command: 'rule_add_audit -name "Audit_All_DDL" -instance "any" -filterType ddl -ddlSelectAll true -logInStorage true'
    }
  ],
  relatedCommands: ['rule_update_audit', 'rule_delete', 'rule_show_one'],
  commonIssues: [
    "Ensure that the specified instance and database objects (tables, columns, etc.) exist and are correctly named.",
    "Misconfigured filtering criteria can lead to either too much or too little data being audited. Start with specific criteria and broaden as needed.",
    "Auditing a high volume of traffic can impact performance. It is recommended to test the impact of new audit rules in a non-production environment."
  ],
  contextualHelp: {
    name: createParameterHelp(
      "A unique logical name for the rule. This parameter is REQUIRED.",
      { suggestion: "Choose a descriptive name that reflects the purpose of the rule, e.g., 'Audit_Admin_Logins'." }
    ),
    action: createParameterHelp(
      "Specifies the rule action: 'audit' (log matching traffic) or 'skip' (ignore matching traffic).",
      { suggestion: "Choose 'audit' to log events or 'skip' to create an exception to another audit rule." }
    ),
    dbType: createParameterHelp("The type of database the rule applies to (e.g., 'oracle', 'mysql', 'postgresql'). For rules that apply to all (any) database types, omit this parameter."),
    instance: createParameterHelp("The name of the database instance the rule applies to, or 'any' for all instances."),
    filterType: createParameterHelp(
      "The primary filtering mechanism for the rule. Allowed values: object - on Object Group, group - on Query Group, ddl - on Query Types, inject - on SQL Injection, session - on Session Events.",
      { suggestion: "Choose 'object' to filter by database objects (tables, columns), 'ddl' for DDL statements, or 'session' for session events." }
    ),
    intercSqlSelect: createParameterHelp("Intercept SELECT statements. (true | false)"),
    intercTab: createParameterHelp("A semicolon-separated list of tables/columns to intercept (e.g., 'db.schema.table.column;db.schema.table.column2')."),
    logInStorage: createParameterHelp("Log events in the DataSunrise internal audit storage. (true | false)"),
    logData: createParameterHelp("Log the result set of queries. (true | false)"),
    addUsers: createParameterHelp("A comma-separated list of database users to apply the rule to."),
    addHosts: createParameterHelp("A comma-separated list of client hosts/IPs to apply the rule to."),
    app: createParameterHelp("Filter by the client application name."),
    comment: createParameterHelp("A descriptive comment for the rule."),
    enable: createParameterHelp("Enable or disable the rule upon creation. (true | false)"),
  }
});

// rule_add_masking
registerCommandDescription('rule_add_masking', {
  description: createCommandDescription(
    'Adds',
    'a new Masking Rule to dynamically mask data in query results',
    'in DataSunrise. Protects sensitive data from unauthorized viewing.',
    'high' // Directly impacts data visibility
  ),
  detailedDescription: `
This command creates a Masking Rule. Masking Rules dynamically alter query results to hide or obfuscate sensitive data 
before it reaches the end-user or application. This is a key data protection feature. 
Rules specify which columns to mask, for whom (based on user, app, host criteria), and how to mask the data (e.g., replace with asterisks, show last 4 digits).
  `,
  examples: [
    {
      description: 'Mask SSN column in "Employees" table for all users except "HR_Admin_Group"',
      command: 'rule_add_masking -name Mask_SSN_Employees -instance HR_DB -maskColumns "dbo.Employees.SSN" -maskType "Redact (XXX-XX-XXXX)" -addUserGroups "!HR_Admin_Group"'
      // Note: addUserGroups with "!" prefix often means "not in this group". Syntax varies.
    },
    {
      description: 'Mask all columns in the "test.public.test" table using a regular expression and a custom separator',
      command: 'rule_add_masking -name Mask_All_Test_Cols -instance pg17 -maskColumns "testXXXpublicXXXtestXXX{.*}" -nameSeparator XXX -dbType postgresql -maskType empty'
    }
  ],
  relatedCommands: ['rule_update_masking', 'rule_show_one', 'rule_delete'], // Assuming rule_update_masking exists
  contextualHelp: {
    name: createParameterHelp('Unique name for the rule.'),
    instance: createParameterHelp('Instance name where masking applies (often required for column context).'),
    maskColumns: createParameterHelp('Semicolon-separated columns to mask (e.g., db.schema.table.column;db.schema.table.column2). Regular expressions should be enclosed in curly braces {}. IMPORTANT: When using a regular expression in -maskColumns, the -nameSeparator parameter must ALWAYS be used. All dots (.) in the object name must be replaced with the value of the -nameSeparator. For example, instead of "test.public.test.{.*}", use "-maskColumns "test__public__test__{.*}" -nameSeparator __".'),
    maskType: createParameterHelp('Type of masking to apply (e.g., empty, maskFirst, regex, custom). Consult DataSunrise docs for available types.'),
    // Add other common rule parameters (dbType, enable, comment, schedule, app, users, hosts, etc.)
    maskSelectOnly: createParameterHelp('Apply masking only to SELECT statements. Default: false (may apply to other DML if supported).'),
    keepRowCount: createParameterHelp('Preserve original row count when masking (e.g., by returning NULLs instead of empty set). Default: false.')
  }
});

// rule_add_security
registerCommandDescription('rule_add_security', {
  description: createCommandDescription(
    'Adds',
    'a new Security Rule to block or alert on prohibited database activities',
    'in DataSunrise. 🔒 Enforces data access policies.',
    'high' // Directly blocks/alerts on actions
  ),
  detailedDescription: `
This command creates a Security Rule. Security Rules are used to prevent unauthorized or malicious database activities 
by blocking them, alerting administrators, or disconnecting sessions. 
These rules are central to DataSunrise's database protection capabilities.
  `,
  examples: [
    {
      description: 'Block all "DROP TABLE" commands on "ProductionDB" for non-DBA users',
      command: 'rule_add_security -name Block_Prod_DropTable -instance ProductionDB -addUserGroups "!DBA_Group" -filterType ddl -ddlTypes "DROP_TABLE" -action Block'
    }
  ],
  relatedCommands: ['rule_update_security', 'rule_show_one', 'rule_delete'], // Assuming rule_update_security exists
  contextualHelp: {
    name: createParameterHelp('Unique name for the rule.'),
    action: createParameterHelp('Security action (Block, Alert, Disconnect). Default: Block.'),
    blockType: createParameterHelp('If action is Block: type of block (SQLError, Disconnect). SQLError returns an error to client, Disconnect terminates session.'),
    blockMsg: createParameterHelp('Custom message for SQL Error block type when an action is blocked.'),
    // Add other common rule parameters (dbType, enable, comment, schedule, instance, app, users, hosts, filterType, object/query criteria etc.)
  }
});

// rule_add_learning (Simplified, as learning rules can be complex)
registerCommandDescription('rule_add_learning', {
  description: createCommandDescription(
    'Adds',
    'a new Learning Rule to profile database activity and suggest policies',
    'in DataSunrise. Helps in baselining normal activity.',
    'low'
  ),
  detailedDescription: 'This command creates a Learning Rule. Learning Rules observe database activity over time to build profiles of normal behavior. These profiles can then be used to generate suggested audit or security rules, or for anomaly detection.',
  examples: [
    {
      description: 'Start learning activity on "SalesDB" for application "ReportingTool"',
      command: 'rule_add_learning -name Learn_SalesDB_Reporting -instance SalesDB -app ReportingTool'
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Unique name for the rule.'),
    action: createParameterHelp('Learning action (typically "Learn"). Default: Learn.')
    // Add other common rule parameters (dbType, enable, comment, schedule, instance, app, users, hosts, etc.)
  }
});

// rule_add_external_dispatcher
registerCommandDescription('rule_add_external_dispatcher', {
  description: createCommandDescription(
    'Adds',
    'a new External Dispatcher Rule to send event data to external systems (e.g., SIEM)',
    'from DataSunrise. Facilitates integration with security monitoring tools.',
    'medium' // Affects external logging
  ),
  detailedDescription: 'This command creates an External Dispatcher Rule. These rules determine which audited events are sent to external systems, such as SIEMs or syslog servers, typically using CEF (Common Event Format) groups for formatting.',
  examples: [
    {
      description: 'Dispatch all critical security events from "FinanceDB" to "SIEM_CEF_Group"',
      command: 'rule_add_external_dispatcher -name Dispatch_Finance_Critical -instance FinanceDB -sysLogGr SIEM_CEF_Group'
      // Note: Filters for "critical events" would be part of the rule's conditions (e.g., specific query types, object groups).
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Unique name for the rule.'),
    sysLogGr: createParameterHelp('CEF Group name to use for formatting and sending event data. Required for dispatching.'),
    // Add other common rule parameters
  }
});


// rule_update_audit (Example for an update command)
registerCommandDescription('rule_update_audit', {
  description: createCommandDescription(
    'Updates',
    'an existing Audit Rule',
    'in DataSunrise.',
    'medium'
  ),
  examples: [
    {
      description: 'Disable audit rule "TempAuditRule" and change its action to skip',
      command: 'rule_update_audit -name TempAuditRule -enable false -action skip'
    }
  ],
  contextualHelp: {
    name: createParameterHelp('Current name of the audit rule to update.'),
    enable: createParameterHelp('Enable or disable the rule.'),
    action: createParameterHelp('New action (audit or skip).')
    // Add other updatable parameters from rule_add_audit
  }
});

// rule_show_all
registerCommandDescription('rule_show_all', {
  description: createCommandDescription(
    'Displays',
    'a list of all configured rules (audit, security, masking, etc.)',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all rules', command: 'rule_show_all' }]
});

// rule_show_one
registerCommandDescription('rule_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific rule',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show details for rule "Audit_Finance_DML"', command: 'rule_show_one -name Audit_Finance_DML' }],
  contextualHelp: { name: createParameterHelp('Name of the rule to display.') }
});

// rule_delete
registerCommandDescription('rule_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specified rule',
    'from DataSunrise. 🔒 This can impact security or audit coverage.',
    'high'
  ),
  examples: [{ description: 'Delete rule "ObsoleteAuditRule"', command: 'rule_delete -name ObsoleteAuditRule' }],
  contextualHelp: { name: createParameterHelp('Name of the rule to delete.') }
});
