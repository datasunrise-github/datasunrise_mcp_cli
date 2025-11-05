import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// schedule_add
registerCommandDescription('schedule_add', {
  description: createCommandDescription(
    'Adds',
    'a new schedule',
    'to DataSunrise. Schedules define time intervals (daily, weekly) during which rules or tasks are active.',
    'low'
  ),
  detailedDescription: `
This command creates a new schedule in DataSunrise. Schedules are used to define specific time windows 
(e.g., business hours, maintenance periods, specific days of the week) during which certain rules 
(audit, security, masking) or periodic tasks become active or inactive.
The -intervals parameter requires a specific format: semicolon-separated day=HH:MM:SS-HH:MM:SS strings.
Days are: mo, tu, we, th, fr, sa, su.
  `,
  examples: [
    {
      description: 'Add a schedule "BusinessHours" for Mon-Fri, 9 AM to 5 PM',
      command: 'schedule_add -name BusinessHours -intervals "mo=09:00:00-17:00:00;tu=09:00:00-17:00:00;we=09:00:00-17:00:00;th=09:00:00-17:00:00;fr=09:00:00-17:00:00"'
    },
    {
      description: 'Add a schedule "WeekendMaintenance" for Sat-Sun, midnight to 6 AM',
      command: 'schedule_add -name WeekendMaintenance -intervals "sa=00:00:00-06:00:00;su=00:00:00-06:00:00"'
    }
  ],
  relatedCommands: ['schedule_update', 'schedule_show_one', 'schedule_delete', 'rule_add_audit'], // Rules use schedules
  commonIssues: ['Ensure the -intervals format is strictly followed. Incorrect formatting will cause errors.'],
  contextualHelp: {
    name: createParameterHelp(
      'Unique name for the new schedule.',
      { suggestion: 'e.g., "PeakHours", "AfterHoursScan", "DailyReportTime".' }
    ),
    intervals: createParameterHelp(
      'Semicolon-separated day=HH:MM:SS-HH:MM:SS strings defining active time slots.',
      { suggestion: 'Example: "mo=09:00:00-17:00:00;tu=09:00:00-12:00:00". Days: mo, tu, we, th, fr, sa, su.' }
    )
  }
});

// schedule_update
registerCommandDescription('schedule_update', {
  description: createCommandDescription(
    'Updates',
    'an existing schedule\'s name or its intervals',
    'in DataSunrise.',
    'low'
  ),
  detailedDescription: 'This command modifies an existing schedule, allowing you to change its name or redefine its active time intervals.',
  examples: [
    {
      description: 'Update schedule "BusinessHours" to end at 6 PM instead of 5 PM on Fridays',
      command: 'schedule_update -name BusinessHours -intervals "mo=09:00:00-17:00:00;tu=09:00:00-17:00:00;we=09:00:00-17:00:00;th=09:00:00-17:00:00;fr=09:00:00-18:00:00"'
    }
  ],
  relatedCommands: ['schedule_add', 'schedule_show_one'],
  contextualHelp: {
    name: createParameterHelp('Current name of the schedule to update.'),
    newName: createParameterHelp('New name for the schedule. Must be unique if provided.'),
    intervals: createParameterHelp('New semicolon-separated intervals. Replaces all existing intervals for this schedule.')
  }
});

// schedule_show_all
registerCommandDescription('schedule_show_all', {
  description: createCommandDescription(
    'Displays',
    'a list of all configured schedules',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all schedules', command: 'schedule_show_all' }]
});

// schedule_show_one
registerCommandDescription('schedule_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific schedule, including its time intervals',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show details for schedule "BusinessHours"', command: 'schedule_show_one -name BusinessHours' }],
  contextualHelp: { name: createParameterHelp('Name of the schedule to display.') }
});

// schedule_delete
registerCommandDescription('schedule_delete', {
  description: createCommandDescription(
    'Deletes',
    'a specified schedule',
    'from DataSunrise. Ensure it is not in use by any rules or tasks.',
    'medium' // Deleting schedules can affect when rules/tasks run
  ),
  detailedDescription: `
This command removes a schedule definition from DataSunrise. 
If this schedule is currently assigned to any rules or periodic tasks, those rules/tasks may revert to being always active or inactive, 
or their behavior might become undefined. Check dependencies before deleting.
  `,
  examples: [{ description: 'Delete schedule "OldWeekendSchedule"', command: 'schedule_delete -name OldWeekendSchedule' }],
  commonIssues: ['Verify the schedule is not in use by active rules or tasks before deletion to avoid unintended behavior changes.'],
  contextualHelp: { name: createParameterHelp('Name of the schedule to delete.') }
});
