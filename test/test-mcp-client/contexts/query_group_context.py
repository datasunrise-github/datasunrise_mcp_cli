from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from textwrap import dedent as sample


class QueryGroupContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    query_gr_01 = _base.prefix   + 'query_group'
    query_gr_02 = _base.prefix_s + 'Query Group'
    # -----------------------------------------------------------------------------------------------------------------]
    query_sql = 'SELECT * FROM %s'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_no_query_groups   = sample('''\
        QueryGroups:
        Azure Data Studio queries
        DB2 Set Client Info queries
        Toad for Oracle queries
        pgAdmin queries
        SSMS queries
        Oracle SQL Developer queries

        OK
    ''')
    sample_query_groups_info = sample('''\
        QueryGroups:
        Azure Data Studio queries
        DB2 Set Client Info queries
        Toad for Oracle queries
        pgAdmin queries
        SSMS queries
        Oracle SQL Developer queries
        %s
        
        OK
    ''')
    sample_query_group_info  = sample('''\
        Name                 : %s

        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_query_gr    = 'addQueryGroup -name %s'
    add_query_of_gr = 'addQueryOfGroup -name %s -sql %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_query_gr    = 'updateQueryGroup -name %s -newName %s'
    upd_query_of_gr = 'updateQueryOfGroup -name %s -sql %s -newSql %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_query_grs  = 'showQueryGroups'
    show_query_gr   = 'showQueryGroup -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_query_gr    = 'delQueryGroup -name %s'
    del_query       = 'delQuery -name %s -sql %s'
