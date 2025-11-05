from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from test_cmdline_commands.contexts.create_instance_context import create_instance_context
from framework.base.ContextsManager import with_context
from common.DictionaryDbType import DictionaryDbType
from configuration.Session import Session
from framework.base.ContextsManager import disable

import os
import shutil
import time


@disable('Only local dictionary', condition=Session.FW_DICTIONARY_TYPE != DictionaryDbType.SQLITE)
@with_context(create_instance_context(True))
class CreateReportsConfContext(_base):
    auto   = True
    # -----------------------------------------------------------------------------------------------------------------]
    dictionary = 'dictionary.db'
    event      = 'event.db'
    audit      = 'audit.db'
    # -----------------------------------------------------------------------------------------------------------------]
    test_cmdline_commands = _base.test_cmdline_commands
    test_config_path = os.path.join(test_cmdline_commands, 'test_config')

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
    def test_generate_events(self):
        time.sleep(15)
        print('')

        # -------------------------------------------------------------------------------------------------------------]

        event_type = self.event_audit

        self.execute(self.add_audit_rule)

        if self.auto:
            proxy_connection = self.connect_proxy_by_user(self.user_01)
            time.sleep(10)
            proxy_connection.execute('select * from public.%s' % self.table_01)
            time.sleep(10)
            proxy_connection.close()

        print('')
        for report_type in self.report_types:
            out = self.execute(self.show_reports % (report_type, event_type))
            print(out)
        print('')

        # -------------------------------------------------------------------------------------------------------------]

        event_type = self.event_mask

        db_info_string = '.'.join(self.db_info())
        mask_type = self.mask_type

        self.execute(self.add_mask_rule % (db_info_string, mask_type) + ' -logInStorage true')

        if self.auto:
            proxy_connection = self.connect_proxy_by_user(self.user_01)
            time.sleep(15)
            proxy_connection.execute('insert into public.%s values (1, \'user_01\')' % self.table_01)
            proxy_connection.execute('select * from public.%s' % self.table_01)
            time.sleep(15)
            proxy_connection.close()

        print('')
        for report_type in self.report_types:
            out = self.execute(self.show_reports % (report_type, event_type))
            print(out)
        print('')

        # -------------------------------------------------------------------------------------------------------------]

        event_type = self.event_secur

        self.execute(self.add_security_rule)

        if self.auto:
            proxy_connection = self.connect_proxy_by_user(self.user_01)
            time.sleep(10)
            proxy_connection.execute('select * from public.%s' % self.table_01)
            time.sleep(10)
            proxy_connection.close()

        print('')
        for report_type in self.report_types:
            out = self.execute(self.show_reports % (report_type, event_type))
            print(out)
        print('')

    @classmethod
    def setup_tests(cls):
        fw_workspace = cls.get_workspace_path()

        cls._stop_ds()
        time.sleep(10)
        os.remove(os.path.join(fw_workspace, cls.dictionary))
        os.remove(os.path.join(fw_workspace, cls.event))
        os.remove(os.path.join(fw_workspace, cls.audit))
        cls._start_ds()

        cls.test_generate_events()

        cls._stop_ds()
        shutil.copy(os.path.join(fw_workspace, cls.dictionary), cls.test_config_path)
        shutil.copy(os.path.join(fw_workspace, cls.event),      cls.test_config_path)
        shutil.copy(os.path.join(fw_workspace, cls.audit),      cls.test_config_path)
        cls._start_ds()
