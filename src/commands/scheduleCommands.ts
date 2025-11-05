import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const scheduleCommands: CliCommand[] = [
  {
    toolName: 'schedule_add',
    description: 'Adds a new schedule. Schedules define time intervals (daily, weekly) during which rules or tasks are active.',
    baseCommand: 'addSchedule',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Unique name for the new schedule.'), required: true, cliName: '-name' },
      { name: 'intervals', type: 'string', description: enhanceParameterDescription('string', 'Semicolon-separated list of intervals. For days use: su, mo, tu, we, th, fr, sa. (e.g., "mo09:00:00-18:00:00;fr09:00:00-18:00:00").', 'SCHEDULE_INTERVALS'), required: false, cliName: '-intervals' },
      { name: 'beginDate', type: 'string', description: enhanceParameterDescription('string', 'Schedule\'s start date and time (yyyy-MM-dd HH:mm:ss).'), required: false, cliName: '-beginDate' },
      { name: 'endDate', type: 'string', description: enhanceParameterDescription('string', 'Schedule\'s end date and time (yyyy-MM-dd HH:mm:ss).'), required: false, cliName: '-endDate' },
    ],
    category: 'Schedule',
  },
  {
    toolName: 'schedule_update',
    description: "Updates an existing schedule's name or its intervals.",
    baseCommand: 'updateSchedule',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current name of the schedule to update.'), required: true, cliName: '-name' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'New name for the schedule.'), required: false, cliName: '-newName' },
      { name: 'intervals', type: 'string', description: enhanceParameterDescription('string', 'New semicolon-separated intervals. Replaces existing.', 'SCHEDULE_INTERVALS'), required: false, cliName: '-intervals' },
      { name: 'beginDate', type: 'string', description: enhanceParameterDescription('string', 'Schedule\'s start date and time (yyyy-MM-dd HH:mm:ss).'), required: false, cliName: '-beginDate' },
      { name: 'endDate', type: 'string', description: enhanceParameterDescription('string', 'Schedule\'s end date and time (yyyy-MM-dd HH:mm:ss).'), required: false, cliName: '-endDate' },
    ],
    category: 'Schedule',
  },
  {
    toolName: 'schedule_show_all',
    description: 'Displays a list of all configured schedules.',
    baseCommand: 'showSchedules',
    params: [],
    category: 'Schedule',
  },
  {
    toolName: 'schedule_show_one',
    description: 'Shows detailed information for a specific schedule, including its time intervals.',
    baseCommand: 'showSchedule',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the schedule to display.'), required: true, cliName: '-name' },
    ],
    category: 'Schedule',
  },
  {
    toolName: 'schedule_delete',
    description: 'Deletes a specified schedule. Ensure it is not in use by any rules or tasks.',
    baseCommand: 'delSchedule',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the schedule to delete.'), required: true, cliName: '-name' },
    ],
    category: 'Schedule',
  },
];
