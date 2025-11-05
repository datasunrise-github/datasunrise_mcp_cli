from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from textwrap import dedent as sample


class SSLKeyGroupContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    ssl_key_group_01 = _base.prefix   + 'ssl_key_group'
    ssl_key_group_02 = _base.prefix_s + 'SSL Key Group'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_no_ssl_key_groups = sample('''\
        Key Groups:
        Default SSL Key Group for AWS
        Default SSL Key Group for Azure
        Proxy Default SSL Key Group for CA Certificate
        Default SSL Key Group for Google Cloud
        
        OK
    ''')
    sample_ssl_key_groups_info = sample('''\
        Key Groups:
        Default SSL Key Group for AWS
        Default SSL Key Group for Azure
        Proxy Default SSL Key Group for CA Certificate
        Default SSL Key Group for Google Cloud
        %s

        OK
    ''')
    sample_ssl_key_group_info = sample('''\
        Name                 : %s

        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_ssl_group   = 'addSslKeyGroup -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_ssl_group   = 'updateSslKeyGroup -name %s -newName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_ssl_groups = 'showSSLKeyGroups'
    show_ssl_group  = 'showSslKeyGroup -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_ssl_group   = 'delSslKeyGroup -name %s'
