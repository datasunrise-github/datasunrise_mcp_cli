import os

from database_v2.database.metadata.UserID import UserID
from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from test_cmdline_commands.contexts.instance_context import InstanceContext as _instance
from test_cmdline_commands.contexts.create_instance_context import create_instance_context
from framework.base.ContextsManager import with_context
from textwrap import dedent as sample


@with_context(create_instance_context(True))
class StaticMaskingContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    instance_name = _instance.instance_name
    db_name = _instance.db_name
    # -----------------------------------------------------------------------------------------------------------------]
    schema = 'public'
    table  = 'cmdline_test_stat_mask'
    column = 'test_value'
    # -----------------------------------------------------------------------------------------------------------------]
    select_value_query = 'SELECT * FROM %s'
    tables_list_query  = 'SELECT table_schema, table_name ' \
                         'FROM information_schema.tables ' \
                         'ORDER BY table_schema, table_name;'
    # -----------------------------------------------------------------------------------------------------------------]
    mask_type  = 'maskFirst'
    mask_count = 7
    original_value = 'test_static_mask'
    masked_value   = '*' * mask_count + original_value[mask_count:]
    # -----------------------------------------------------------------------------------------------------------------]
    json_file_path = os.path.join(_base.test_cmdline_commands, 'json')
    json_file = os.path.join(json_file_path, 'static_masking_tables' + '.json')
    json_pattern = sample('''\
        [
          {
            "name": "%s",
            "targetName": "%s",
            "schemas": [
              {
                "name": "%s",
                "targetName": "%s",
                "tables": [
                  {
                    "name": "%s",
                    "columns": [
                      {
                        "name": "%s",
                        "maskType": "%s",
                        "maskCount": %s
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
    ''')

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    pass

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    start_stat_masking   = 'statMask -sourceInstance %s -targetInstance %s -tableFile %s'
    show_stat_masking    = 'showStatMasking -id %s'
    restart_stat_masking = 'restartStatMasking -id %s'

    #
    #
    # MESSAGES
    # =================================================================================================================]
    msg_no_table            = "There's no table in the %sdatabase"
    msg_unexpected_original = "The original value in the source table is different from expected"
    msg_masking_failed      = "The static masking task was failed"

    @classmethod
    def create_json_file(cls):
        user_info_01 = cls.get_user_info(UserID.TEST_USER_1)
        user_info_02 = cls.get_user_info(UserID.TEST_USER_2)

        json_file = cls.json_file
        json_pattern = cls.json_pattern
        file = open(json_file, 'w')
        file.write(json_pattern % (
                   user_info_01.login,
                   user_info_02.login,
                   cls.schema,
                   cls.schema,
                   cls.table,
                   cls.column,
                   cls.mask_type,
                   cls.mask_count))
        file.close()

    @classmethod
    def setup_tests(cls):
        cls.create_json_file()

        table  = cls.table
        column = cls.column
        value  = cls.original_value

        conn_parent = cls.connect_proxy_by_user(cls.user_01)
        conn_parent.execute('CREATE TABLE %s (%s varchar)' % (table, column))
        conn_parent.execute('INSERT INTO %s (%s) VALUES (\'%s\')' % (table, column, value))
        conn_parent.close()

        conn_child  = cls.connect_proxy_by_user(cls.user_02)
        conn_child.execute('CREATE TABLE %s (%s varchar)' % (table, column))
        conn_child.close()

    @classmethod
    def cleanup_tests(cls):
        table = cls.table

        conn_parent = cls.connect_proxy_by_user(cls.user_01)
        conn_parent.execute('DROP TABLE %s' % table)
        conn_parent.close()

        conn_child  = cls.connect_proxy_by_user(cls.user_02)
        conn_child.execute('DROP TABLE %s' % table)
        conn_child.close()
