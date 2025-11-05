import os

from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from test_cmdline_commands.contexts.ds_user_context import DataSunriseUserContext as _ds_user
from test_cmdline_commands.contexts.hosts_context import HostsContext as _host
from test_cmdline_commands.contexts.application_context import ApplicationContext as _app


class ImportContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    import_file_extension = '.csv'
    import_files_path = os.path.join(_base.test_cmdline_commands, 'import')
    # -----------------------------------------------------------------------------------------------------------------]
    import_users_file = os.path.join(import_files_path, 'users' + import_file_extension)
    import_hosts_file = os.path.join(import_files_path, 'hosts' + import_file_extension)
    import_apps_file  = os.path.join(import_files_path, 'apps'  + import_file_extension)

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]


    #
    #
    # CMDLINE FUNCTIONS
    show_ds_users = _ds_user.show_ds_users
    show_hosts    = _host.show_hosts
    show_apps     = _app.show_apps
    # -----------------------------------------------------------------------------------------------------------------]
    import_users  = 'importUsers -fileName %s'
    import_hosts  = 'importHosts -fileName %s'
    import_apps   = 'importApps -fileName %s'
