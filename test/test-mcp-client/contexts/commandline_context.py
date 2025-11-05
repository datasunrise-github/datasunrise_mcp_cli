from configuration.Session import Session
from dsapi.cmdline.dscli.MetadataErrorHandler import MetadataErrorHandler
from contexts.FirewallTest import FirewallTest
from database_v2.database.metadata.UserID import UserID

import re
import os
import json


class CommandlineContext(FirewallTest):
    import test_cmdline_commands as cmdline_tests_dir
    test_cmdline_commands = os.path.dirname(cmdline_tests_dir.__file__)

    #
    #
    # PARAMETERS
    # =================================================================================================================]
    prefix   = 'test_'
    prefix_s = 'Test '
    # -----------------------------------------------------------------------------------------------------------------]
    unique_id = Session.UNIQUE_ID
    user_01 = UserID.TEST_USER_1
    user_02 = UserID.TEST_USER_2
    # -----------------------------------------------------------------------------------------------------------------]
    table_01 = 'users'
    table_02 = 'test'
    column_01_01 = 'user_login'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    exceptions_lines = [
        'Database Type',
        'Instance Type',    # Oracle
        'SYSDBA',           # Oracle
        'Host FQDN',        # Hive
        'Kerberos Realm',   # Hive
        'Database',         # Disabled because of Hive
        'Instance',         # Disabled because of Hive
        'Backend',          # Proxy Info
        'ID',
        'Start Date',
        'Active up to',
        'Starting Time',
        'Ending Time',
        'Row Delimiter',
        'Column Delimiter',
        'Quote',
        'Instance not found'
    ]
    exceptions_lines = [str + '( {1,}?):' for str in exceptions_lines]

    #
    # REGEXPS
    # =================================================================================================================]
    re_date_time = r'(\d{1,}-){1,}\d{1,}\s(\d{1,}:){1,}\d{1,}'  # XX-XX-XX XX:XX:XX
    re_proxy = r' \((.*?)\)'                                    # (local)/(remote)
    re_spaces_end = r'( *?)(?=\n)'
    re_tag_names = r'Name( *?): ds::(\w{1,})'
    re_tag_values = r'Value( *?): (\w{1,})'

    #
    #
    # MESSAGES
    # =================================================================================================================]
    msg_already_exists = "There's already that %s"
    msg_already_exist  = "There're already some %s"
    msg_wasnt_created  = "The %s wasn't created"
    msg_wasnt_added    = "The %s wasn't added"
    msg_wasnt_updated  = "The %s wasn't updated"
    msg_werent_updated = "The %s weren't updated"
    msg_isnt_such      = "There isn't such %s"
    msg_wasnt_deleted  = "The %s wasn't deleted"
    msg_wasnt_copied   = "The %s wasn't copied"

    @classmethod
    def execute(cls, command):
        print()
        print("CMDline command: ", command)
        return cls.ds_api.get_cmdline().execute(command)

    @classmethod
    def execute_with_retry(cls, command):
        def impl():
            return cls.execute(command)
        return cls.execute_cli_command(impl)

    @classmethod
    def execute_cli_command(cls, function):
        last_exception = None
        for _ in range(10):
            try:
                result = function()
                return result
            except Exception as ex:
                print('Exception while execute CLI command:')
                print(str(ex))

                last_exception = ex

                need_retry = MetadataErrorHandler.handle_error(ex)
                if need_retry:
                    print('known exception, retrying...')
                    continue

                raise
        else:
            raise last_exception

    @classmethod
    def line_cut(cls, line):
        line_cut = re.sub(cls.re_spaces_end, '', line)

        return line_cut

    @classmethod
    def out_fix(cls, out, skip_date=False, cut_proxy=False, skip_tags=False):
        out_fix = []
        for line in out:
            line_cut = cls.line_cut(line)
            if any(re.search(exc, line_cut) for exc in cls.exceptions_lines) \
               or skip_date and re.search(cls.re_date_time, line_cut)\
               or skip_tags and (re.search(cls.re_tag_names, line_cut) or re.search(cls.re_tag_values, line_cut)):
                continue
            if cut_proxy and re.search(cls.re_proxy, line_cut):
                line_cut = re.sub(cls.re_proxy, '', line_cut)
            out_fix.append(line_cut)
        out_fix = ''.join(out_fix)

        return out_fix

    @staticmethod
    # string with spaces
    def sws(string):
        if ' ' in string:
            string = '"' + string + '"'

        return string

    @classmethod
    def db_info(cls):
        user_info = cls.get_user_info(cls.user_01)
        table  = cls.table_01
        column = cls.column_01_01

        return user_info.cli_database, user_info.cli_schema, table, column

    @classmethod
    def server_id(cls):
        server_id = json.loads(''.join(cls.execute('showDSServers -json')[0:-1]))['data'][1][0]

        return server_id

    @classmethod
    def server_name(cls):
        server_name = json.loads(''.join(cls.execute('showDSServers -json')[0:-1]))['data'][1][1]

        return server_name

    def call_metadata_func(self, function):
        last_exception = None
        for _ in range(10):
            try:
                result = self.execute(function)
                if result is not None:
                    return result
                else:
                    break
            except Exception as ex:
                print('Exception while call metadata access function:')
                print(str(ex))
                last_exception = ex
                need_retry = MetadataErrorHandler.handle_error(ex)
                if need_retry:
                    print('known exception, retrying...')
                    continue
                raise
        else:
            raise last_exception
