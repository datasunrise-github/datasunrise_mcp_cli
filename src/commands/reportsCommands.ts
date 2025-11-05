import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const reportsCommands: CliCommand[] = [
  // Corresponds to 'showReports' in CLI Guide 26.9 (and 19.19)
  {
    toolName: 'reports_show',
    description: 'Displays reports based on various criteria, such as report type (application, host, user, IP) and event type (audit, masking, security).',
    baseCommand: 'showReports',
    params: [
      { name: 'reportType', type: 'string', description: enhanceParameterDescription('string', 'Type of report to show (app, host, user, ip).', 'ENUM'), required: true, cliName: '-reportType' },
      { name: 'eventType', type: 'string', description: enhanceParameterDescription('string', 'Type of event to filter by (a for audit, m for masking, s for security).', 'ENUM'), required: true, cliName: '-eventType' },
      { name: 'beginDate', type: 'string', description: '[STRING:DATETIME] Begin date (yyyy-MM-dd HH:mm:ss). Optional.', required: false, cliName: '-beginDate' },
      { name: 'endDate', type: 'string', description: '[STRING:DATETIME] End date (yyyy-MM-dd HH:mm:ss). Optional.', required: false, cliName: '-endDate' },
      { name: 'instance', type: 'string', description: '[STRING] Logical name of the instance or "any". Optional.', required: false, cliName: '-instance' },
    ],
    category: 'Reports',
  },
];
