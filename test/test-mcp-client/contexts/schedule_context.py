from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from textwrap import dedent as sample


class ScheduleContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    schedule_01 = _base.prefix   + 'schedule'
    schedule_02 = _base.prefix_s + 'Schedule'
    # -----------------------------------------------------------------------------------------------------------------]
    schedule_begin = ''
    schedule_end   = ''
    # -----------------------------------------------------------------------------------------------------------------]
    schedule_days_add     = {
        'mo': '09:00:00-22:59:59',
        'tu': '00:30:00-19:10:00',
        'we': '14:30:00-22:45:00',
        'th': '00:00:00-23:58:00',
        'fr': '19:01:00-21:00:30',
        'sa': '11:57:00-23:57:59',
        'su': '00:00:01-23:59:59'
    }
    schedule_days_show_12 = {
        'mo': '9:00:00 AM-10:59:59 PM',
        'tu': '12:30:00 AM-7:10:00 PM',
        'we': '2:30:00 PM-10:45:00 PM',
        'th': '12:00:00 AM-11:58:00 PM',
        'fr': '7:01:00 PM-9:00:30 PM',
        'sa': '11:57:00 AM-11:57:59 PM',
        'su': '12:00:01 AM-11:59:59 PM'
    }
    schedule_days_show_24 = {
        'mo': '9:00:00-22:59:59',
        'tu': '0:30:00-19:10:00',
        'we': '14:30:00-22:45:00',
        'th': '0:00:00-23:58:00',
        'fr': '19:01:00-21:00:30',
        'sa': '11:57:00-23:57:59',
        'su': '0:00:01-23:59:59'
    }

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_no_schedules   = sample('''\
        No Schedules

        OK
    ''')
    sample_schedules_info = sample('''\
        Schedules:
        %s
        
        OK
    ''')
    sample_schedule_info  = sample('''\
        Name                 : %s
        Active from          : 1970-01-01 01:00:00
        
        Intervals:
        Monday               : %s
        Tuesday              : %s
        Wednesday            : %s
        Thursday             : %s
        Friday               : %s
        Saturday             : %s
        Sunday               : %s
        
        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_schedule   = 'addSchedule -name %s -intervals %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_schedule   = 'updateSchedule -name %s -newName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_schedules = 'showSchedules'
    show_schedule  = 'showSchedule -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_schedule   = 'delSchedule -name %s'
