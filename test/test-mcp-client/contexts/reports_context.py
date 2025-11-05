from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base

import os


class ReportsContext(_base):#
    #
    # PARAMETERS
    # =================================================================================================================]
    dictionary = 'dictionary.db'
    event      = 'event.db'
    audit      = 'audit.db'
    # -----------------------------------------------------------------------------------------------------------------]
    test_cmdline_commands = _base.test_cmdline_commands
    test_config_path = os.path.join(test_cmdline_commands, 'test_config')
    old_config_path  = os.path.join(test_cmdline_commands, 'temp')
    # -----------------------------------------------------------------------------------------------------------------]
    report_types = [
        'app',
        'host',
        'user',
        'ip',
    ]
    event_audit    = 'a'
    event_masking  = 'm'
    event_security = 's'

    #
    #
    # REGEXPS
    # =================================================================================================================]
    re_report_sessions = r'\s[1-9][0-9]{0,}\s+'

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    show_reports = 'showReports -reportType %s -eventType %s'

    #
    #
    # MESSAGES
    # =================================================================================================================]
    msg_wasnt_triggered = "The %s event wasn't triggered"
    msg_no_events       = "There are no any events"

    @classmethod
    def _start_ds(cls):
        cls.start_ds()
        cls.ds_api.get_cmdline().reconnect()
        cls.call_backends_check()
        cls.wait_core()
        

    @classmethod
    def _stop_ds(cls):
        cls.stop_core()
        cls.stop_ds()

    @classmethod
    def setup_tests(cls):
        fw_workspace = cls.get_workspace_path()

        if not os.path.exists(cls.old_config_path):
            os.mkdir(cls.old_config_path)

        # cls._stop_ds()

        # shutil.copy(os.path.join(fw_workspace, cls.dictionary), cls.old_config_path)
        # shutil.copy(os.path.join(fw_workspace, cls.event),      cls.old_config_path)
        # shutil.copy(os.path.join(fw_workspace, cls.audit),      cls.old_config_path)

        # shutil.copy(os.path.join(cls.test_config_path, cls.dictionary), fw_workspace)
        # shutil.copy(os.path.join(cls.test_config_path, cls.event),      fw_workspace)
        # shutil.copy(os.path.join(cls.test_config_path, cls.audit),      fw_workspace)

        # cls._start_ds()

    @classmethod
    def cleanup_tests(cls):
        fw_workspace = cls.get_workspace_path()

        # cls._stop_ds()

        # shutil.copy(os.path.join(cls.old_config_path, cls.dictionary), fw_workspace)
        # shutil.copy(os.path.join(cls.old_config_path, cls.event),      fw_workspace)
        # shutil.copy(os.path.join(cls.old_config_path, cls.audit),      fw_workspace)

        # shutil.rmtree(cls.old_config_path)

        # cls._start_ds()
