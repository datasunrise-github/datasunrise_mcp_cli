from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from textwrap import dedent as sample


class ApplicationContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    application_01 = _base.prefix   + 'app'
    application_02 = _base.prefix_s + 'App'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_no_apps   = sample('''\
        No Applications
        
        OK
    ''')
    sample_apps_info = sample('''\
        Applications:
        %s
        
        OK
    ''')
    sample_app_info  = sample('''\
        Name                 : %s
        
        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_app   = 'addApplication -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_app   = 'updateApplication -name %s -newName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_apps = 'showApplications'
    show_app  = 'showApplication -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_app   = 'delApplication -name %s'
