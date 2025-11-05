import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, createParameterHelp } from '../description_helpers.js';

registerCommandDescription('updateMaskRule', {
  description: createCommandDescription(
    'Updates',
    'an existing Masking Rule',
    'with specified parameters. Allows modification of various aspects of a masking rule including its conditions, masking types, and associated entities.',
    'medium', // securityImpact: Modifying masking rules can alter data protection levels.
    false,    // stabilityImpact: Generally low unless misconfigured.
    false     // serviceInterruption: No direct interruption, but changes apply to new sessions/queries.
  ),
  detailedDescription: `
The 'updateMaskRule' command allows for comprehensive modification of existing masking rules.
You must specify the rule to update using the '-name' parameter. Other parameters allow you
to change its action (mask or skip), associated entities (hosts, users, applications),
database types, and fine-tune masking techniques (fixed values, random generation, custom functions, etc.).
This command is essential for adapting masking policies to evolving data security requirements.
  `,
  examples: [
    {
      description: 'Update the action of "SensitiveDataRule" to "skip" and add a comment.',
      command: 'updateMaskRule -name SensitiveDataRule -action skip -comment "Temporarily skipping for maintenance"'
    },
    {
      description: 'Add a new OS user "auditor_usr" and host "10.0.0.5" to "FinancialAuditRule".',
      command: 'updateMaskRule -name FinancialAuditRule -addOsUsers auditor_usr -addHosts 10.0.0.5'
    },
    {
      description: 'Change the masking type for "PIIDataRule" to "emailFull" and set a new filler character.',
      command: 'updateMaskRule -name PIIDataRule -maskType emailFull -filler "X"'
    }
  ],
  relatedCommands: ['createMaskRule', 'deleteMaskRule', 'showMaskRule', 'listMaskRules'], // Assumed related commands
  commonIssues: [
    "Ensure the rule specified by '-name' exists before attempting to update.",
    "Incorrectly configured masking parameters (e.g., '-maskType' with incompatible options like '-days') can lead to errors or undesired behavior.",
    "Changes to rules are typically applied to new database sessions or queries; existing sessions might not reflect updates immediately."
  ],
  contextualHelp: {
    name: createParameterHelp(
      "Rule's logical name. This parameter is REQUIRED to identify the rule to be updated.",
      { suggestion: "Specify the exact name of the existing rule you wish to modify." }
    ),
    action: createParameterHelp(
      "Specifies the rule action: 'mask' (apply masking) or 'skip' (bypass masking for matched traffic).",
      { suggestion: "Choose 'mask' to enforce data masking or 'skip' to exclude matched data from masking." }
    ),
    addHostGroups: createParameterHelp("Comma-separated list of host groups to add to the rule's scope."),
    addHosts: createParameterHelp("Comma-separated list of hosts (IP addresses or hostnames) to add to the rule's scope."),
    addOsUserGroups: createParameterHelp("Comma-separated list of OS user groups to add to the rule's scope."),
    addOsUsers: createParameterHelp("Comma-separated list of OS users or {regexp name} to add to the rule's scope."),
    addSubscribers: createParameterHelp("Add subscribers (comma-separated list of email addresses) for rule notifications."),
    addUserGroups: createParameterHelp("Comma-separated list of database user groups to add to the rule's scope."),
    addUsers: createParameterHelp("Comma-separated list of database users or {regexp name} to add to the rule's scope."),
    app: createParameterHelp("Filter by process application requests (any | <application name> | {regexp})."),
    blockSeparator: createParameterHelp("Name separator for block-level specifications (e.g., in -maskColumns). Default is ';'.", { suggestion: "Use if your schema/table/column names in -maskColumns contain the default '.' separator."}),
    columnDelimiter: createParameterHelp("Delimiter for columns in CSV files. Default is '\\t' (tab). Should not contain quote characters.", { dependsOn: ['fileType:CSV'] }),
    columns: createParameterHelp("Comma-separated names or numbers of columns (for CSV) or XML tags to mask.", { dependsOn: ['fileType:CSV', 'fileType:XML'] }),
    comment: createParameterHelp("A comment or description for the rule."),
    date: createParameterHelp("Fixed date value for masking (YYYY-MM-DD). Use if -maskType is 'fixDate'.", { dependsOn: ['maskType:fixDate'] }),
    dateTime: createParameterHelp("Fixed date and time value for masking (YYYY-MM-DD HH:MM:SS). Use if -maskType is 'fixDateTime'.", { dependsOn: ['maskType:fixDateTime'] }),
    days: createParameterHelp("Range in days for date dispersion. Use if -maskType is 'dateDisp' or 'dateTimeDisp'.", { dependsOn: ['maskType:dateDisp', 'maskType:dateTimeDisp'] }),
    dbType: createParameterHelp("Database type. (e.g., 'oracle', 'mysql', 'mssql', 'any')."),
    debug: createParameterHelp("Enable debug mode to show server input & output for this command execution. (true | false)"),
    delHostGroups: createParameterHelp("Comma-separated list of host groups to remove from the rule's scope."),
    delHosts: createParameterHelp("Comma-separated list of hosts to remove from the rule's scope."),
    delOsUserGroups: createParameterHelp("Comma-separated list of OS user groups to remove from the rule's scope."),
    delOsUsers: createParameterHelp("Comma-separated list of OS users or {regexp name} to remove from the rule's scope."),
    delSubscribers: createParameterHelp("Delete subscribers (comma-separated list of email addresses) for rule notifications."),
    delUserGroups: createParameterHelp("Comma-separated list of database user groups to remove from the rule's scope."),
    delUsers: createParameterHelp("Comma-separated list of database users or {regexp name} to remove from the rule's scope."),
    enable: createParameterHelp("Enable ('true') or disable ('false') the rule."),
    endDate: createParameterHelp("End date for random date interval (YYYY-MM-DD). Use if -maskType is 'rndDate'.", { dependsOn: ['maskType:rndDate'] }),
    endDateTime: createParameterHelp("End date and time for random interval (YYYY-MM-DD HH:MM:SS). Use if -maskType is 'rndDateTime'.", { dependsOn: ['maskType:rndDateTime'] }),
    endTime: createParameterHelp("End time for random time interval (HH:MM:SS). Use if -maskType is 'rndTime'.", { dependsOn: ['maskType:rndTime'] }),
    fileName: createParameterHelp("Path to the file to be masked (must start with '/'). For file-based masking.", { suggestion: "e.g., /path/to/your/file.csv"}),
    fileType: createParameterHelp("Type of file for masking (CSV, JSON, XML, UNSTRUCTURED). Default is CSV.", { suggestion: "Relevant if -fileName is specified."}),
    filler: createParameterHelp("Single character placeholder for masked values. Default is '*'.", { suggestion: "e.g., 'X', '#'"}),
    filterSessionsFile: createParameterHelp("Path to a JSON file defining session filtering rules."),
    fixedVal: createParameterHelp("Fixed numeric value for masking. Use if -maskType is 'fixedNum'.", { dependsOn: ['maskType:fixedNum'] }),
    functionName: createParameterHelp("Name of a custom masking function. Use if -maskType is 'function'.", { dependsOn: ['maskType:function'] }),
    functionParams: createParameterHelp("Comma-separated parameters for the custom function (param=value). Use if -maskType is 'function'.", { dependsOn: ['maskType:function', 'functionName'] }),
    hideRowsCondition: createParameterHelp("SQL-like condition to determine which rows are shown (others hidden). Use if -maskType is 'hideRows'.", { dependsOn: ['maskType:hideRows'] }),
    hours: createParameterHelp("Range in hours for time dispersion. Use if -maskType is 'timeDisp' or 'dateTimeDisp'.", { dependsOn: ['maskType:timeDisp', 'maskType:dateTimeDisp'] }),
    instance: createParameterHelp("Database instance name or 'any' to apply to all instances."),
    json: createParameterHelp("Output server response in JSON format. (true | false)"),
    jsonPath: createParameterHelp("Comma-separated JSONPath expressions to identify values to mask in JSON files.", { dependsOn: ['fileType:JSON'] }),
    keepRowCount: createParameterHelp("Maintain original row count for queries with DISTINCT, GROUP BY, etc. Default is 'false'. (true | false)"),
    listSeparator: createParameterHelp("Separator for lists in parameters like -addHosts, -addUsers, etc. Default is ','.", { suggestion: "Change if your list items naturally contain commas."}),
    log1Event: createParameterHelp("Log only the first event matching this rule. (true | false)"),
    logData: createParameterHelp("Log the result set of data returned to the user. (true | false)"),
    login: createParameterHelp("Database user login for context (rarely needed for rule updates)."),
    logInStorage: createParameterHelp("Log events related to this rule in storage. Default is 'true'. (true | false)"),
    logMaxRowCount: createParameterHelp("Maximum number of rows to log from the result set ('<number>' | 'default' | 'unlimited')."),
    maskColumns: createParameterHelp("Specific columns to mask, formatted (e.g., schema.table.column or db.schema.table.column). Separated by ';'.", { suggestion: "Example: HR.EMPLOYEES.SALARY;SALES.ORDERS.CREDIT_CARD_NUMBER"}),
    maskCount: createParameterHelp("Number of characters to mask/show. Use with -maskType like 'maskFirst', 'showLast'.", { dependsOn: ['maskType:maskFirst', 'maskType:maskLast', 'maskType:maskFirstLast', 'maskType:showFirst', 'maskType:showLast', 'maskType:showFirstLast'] }),
    maskMax: createParameterHelp("Maximum value for interval random masking. Default is 100. Use if -maskType is 'intervalRandom'.", { dependsOn: ['maskType:intervalRandom'] }),
    maskMin: createParameterHelp("Minimum value for interval random masking. Default is 0. Use if -maskType is 'intervalRandom'.", { dependsOn: ['maskType:intervalRandom'] }),
    maskPattern: createParameterHelp("Regular expression pattern to find text for replacement. Use if -maskType is 'regexpReplace'.", { dependsOn: ['maskType:regexpReplace'] }),
    maskSelectOnly: createParameterHelp("Apply masking only to SELECT statements. Default is 'false'. (true | false)"),
    maskType: createParameterHelp("The type of masking to apply (e.g., 'random', 'fixedStr', 'emailFull', 'bankCard'). Default is 'random'."),
    minutes: createParameterHelp("Range in minutes for time dispersion. Use if -maskType is 'timeDisp' or 'dateTimeDisp'.", { dependsOn: ['maskType:timeDisp', 'maskType:dateTimeDisp'] }),
    nameSeparator: createParameterHelp("Separator used within names in -maskColumns (e.g., between schema, table, column). Default is '.'.", { suggestion: "Usually '.', e.g., schema.table.column"}),
    newName: createParameterHelp("New logical name for the rule. If provided, the rule will be renamed."),
    paddingText: createParameterHelp("Character to use for padding in masking types like 'maskFirst'. Default is '*'.", { dependsOn: ['maskType:maskFirst', 'maskType:maskLast', 'maskType:maskFirstLast', 'maskType:showFirst', 'maskType:showLast', 'maskType:showFirstLast'] }),
    password: createParameterHelp("Database user password for context (rarely needed for rule updates)."),
    proxy: createParameterHelp("Proxy configuration string (<host1:port1-server1;...>) or 'any'."),
    quote: createParameterHelp("Quote character used in CSV files. Default is '\\'.", { dependsOn: ['fileType:CSV'] }),
    replaceBy: createParameterHelp("Text to replace matches of -maskPattern. Use if -maskType is 'regexpReplace'.", { dependsOn: ['maskType:regexpReplace', 'maskPattern'] }),
    rowDelimiter: createParameterHelp("Row delimiter for CSV files. Default is '\\n'. Should not contain quote characters.", { dependsOn: ['fileType:CSV'] }),
    schedule: createParameterHelp("Name of a schedule to associate with this rule, or 'no' to remove schedule."),
    seconds: createParameterHelp("Range in seconds for time dispersion. Use if -maskType is 'timeDisp' or 'dateTimeDisp'.", { dependsOn: ['maskType:timeDisp', 'maskType:dateTimeDisp'] }),
    sniffer: createParameterHelp("Sniffer configuration string (<host1-server1;...>) or 'any'."),
    startDate: createParameterHelp("Start date for random date interval (YYYY-MM-DD). Use if -maskType is 'rndDate'.", { dependsOn: ['maskType:rndDate'] }),
    startDateTime: createParameterHelp("Start date and time for random interval (YYYY-MM-DD HH:MM:SS). Use if -maskType is 'rndDateTime'.", { dependsOn: ['maskType:rndDateTime'] }),
    startTime: createParameterHelp("Start time for random time interval (HH:MM:SS). Use if -maskType is 'rndTime'.", { dependsOn: ['maskType:rndTime'] }),
    sysLogGr: createParameterHelp("Syslog group to use for logging events from this rule. Default is 'NO' (do not use syslog group)."),
    time: createParameterHelp("Fixed time value for masking (HH:MM:SS). Use if -maskType is 'fixTime'.", { dependsOn: ['maskType:fixTime'] }),
    withHeader: createParameterHelp("Indicates if CSV file has a header row. Default 'true'. If 'false', -columns should use numbers. (true | false)", { dependsOn: ['fileType:CSV'] }),
    xmlPath: createParameterHelp("Comma-separated XPath expressions to identify values to mask in XML files.", { dependsOn: ['fileType:XML'] })
  }
});