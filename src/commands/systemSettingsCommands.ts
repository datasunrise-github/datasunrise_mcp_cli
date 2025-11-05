import { CliCommand, CliParam } from './types.js';

export const systemSettingsCommands: CliCommand[] = [
  // 3.2 Disconnecting from DataSunrise
  {
    toolName: 'system_disconnect',
    description: 'Disconnects from DataSunrise server.',
    baseCommand: 'disconnect',
    category: 'System Settings',
    params: [
      { name: 'f', type: 'boolean', description: 'Disconnect without confirmation.', required: true, cliName: '-f', defaultValue: true },
    ],
  },
  // 3.6 Checking restart necessity
  {
    toolName: 'system_is_need_restart',
    description: 'Checks if restart is needed after certain changes were made.',
    baseCommand: 'isNeedRestart',
    category: 'System Settings',
    params: [],
  },
  // 3.17 Changing the Audit Storage
  {
    toolName: 'system_change_storage',
    description: 'Changes the Audit Storage database. If called without parameters, it typically displays the current audit storage configuration and can be used to check its connection status.',
    baseCommand: 'changeStorage',
    category: 'System Settings',
    params: [
      { name: 'connectionString', type: 'string', description: 'Custom connection string. For PostgreSQL and MS SQL only.', required: false, cliName: '-connectionString' },
      { name: 'database', type: 'string', description: 'Audit Storage database name. For Aurora PostgreSQL, Aurora MySQL, PostgreSQL, MySQL, MS SQL only.', required: false, cliName: '-database' },
      { name: 'schema', type: 'string', description: 'Audit Storage database schema. For Aurora PostgreSQL, PostgreSQL only.', required: false, cliName: '-schema' },
      { name: 'dbType', type: 'string', description: 'Audit Storage DB type (aurora mysql | aurora postgresql | mysql | postgresql | sqlite | mssql).', required: false, cliName: '-dbType' },
      { name: 'folderName', type: 'string', description: 'Folder name for SQLIte Audit Storage.', required: false, cliName: '-folderName' },
      { name: 'host', type: 'string', description: 'Host of the Audit Storage database. For Aurora MySQL, Aurora PostgreSQL, MySQL, MS SQL, PostgreSQL only.', required: false, cliName: '-host' },
      { name: 'login', type: 'string', description: 'Database user login. For Aurora MySQL, Aurora PostgreSQL, MySQL, MS SQL, PostgreSQL only.', required: false, cliName: '-login' },
      { name: 'password', type: 'string', description: 'Database user password. For Aurora MySQL, Aurora PostgreSQL, MySQL, MS SQL, PostgreSQL only.', required: false, cliName: '-password' },
      { name: 'port', type: 'string', description: 'Port of the Audit Storage database. For Aurora MySQL, Aurora PostgreSQL, MySQL, MS SQL, PostgreSQL only.', required: false, cliName: '-port' },
      { name: 'cyberArkFolder', type: 'string', description: 'CyberArk folder name (not for SQLite).', required: false, cliName: '-cyberArkFolder' },
      { name: 'cyberArkSafe', type: 'string', description: 'CyberArk safe name (not for SQLite).', required: false, cliName: '-cyberArkSafe' },
      { name: 'cyberArkObject', type: 'string', description: 'CyberArk object name (not for SQLite).', required: false, cliName: '-cyberArkObject' },
      { name: 'ssl', type: 'string', description: 'Enable SSL (true | false)', required: false, cliName: '-ssl' },
    ],
  },
  // 3.18 Cleaning Audit Storage
  {
    toolName: 'system_clean_audit',
    description: 'Removes all audit data from DataSunrise Audit Storage.',
    baseCommand: 'cleanAudit',
    category: 'System Settings',
    params: [
      { name: 'f', type: 'boolean', description: 'Clean Audit Storage without confirmation.', required: true, cliName: '-f', defaultValue: true },
      { name: 'cleanType', type: 'string', description: 'Method of cleaning: deleteAll (Clean tables using DELETE operation), dropAll (Drop and recreate tables), deleteBefore (Remove all Events before the date specified by -date. For MySQL audit storage only)', required: true, cliName: '-cleanType' },
      { name: 'date', type: 'string', description: 'Used with -cleanType deleteBefore (yyyy-MM-dd HH:mm:ss).', required: false, cliName: '-date' },
      { name: 'u', type: 'boolean', description: 'Force Audit Storage cleaning even if some core processes have not been stopped.', required: false, cliName: '-u' },
    ],
  },
  // 3.20 Showing audit.db Copies (Audit Rotation)
  {
    toolName: 'system_show_audit_rotations',
    description: 'Displays all available audit.db files (audit rotations).',
    baseCommand: 'showAuditRotations',
    category: 'System Settings',
    params: [],
  },
  // 3.21 Creating an audit.db copy (Audit Rotation)
  {
    toolName: 'system_create_audit_rotation',
    description: 'Creates a new audit.db file copy for audit rotation.',
    baseCommand: 'createAuditRotation',
    category: 'System Settings',
    params: [],
  },
  // 3.22 Reading Audit Data from an audit.db Copy (Audit Rotation)
  {
    toolName: 'system_set_audit_rotation', // Corresponds to setAuditRotation in PDF
    description: 'Reads old audit data from a previously-created audit.db file copy.',
    baseCommand: 'setAuditRotation',
    category: 'System Settings',
    params: [
      { name: 'id', type: 'string', description: 'ID of the backup (audit.db copy).', required: true, cliName: '-id' },
    ],
  },
];
