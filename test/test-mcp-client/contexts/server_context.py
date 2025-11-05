from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from textwrap import dedent as sample


class ServerContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    server_smtp_01 = _base.prefix   + 'server_smtp'
    server_smtp_02 = _base.prefix_s + 'Server SMTP'
    server_snmp_01 = _base.prefix   + 'server_snmp'
    server_snmp_02 = _base.prefix_s + 'Server SNMP'
    # -----------------------------------------------------------------------------------------------------------------]
    server_type_smtp = 'SMTP'
    server_type_snmp = 'SNMP'
    # -----------------------------------------------------------------------------------------------------------------]
    smtp_snmp_host = '192.168.1.42'
    smtp_snmp_port = '5000'
    mail_from = 'dkolganov@dataarmor.ru'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_no_servers       = sample('''\
        No Servers

        OK
    ''')
    sample_servers_info     = sample('''\
        : %s : %s : %s : %s      : %s
    ''')
    sample_server_stmp_info = sample('''\
        Name                 : %s
        Type                 : %s
        Host                 : %s
        Port                 : %s
        Login                :
        Mail From            : %s
        Certificate          : Enabled
        Send security emails from this server : false

        OK
    ''')
    sample_server_snmp_info = sample('''\
        Name                 : %s
        Type                 : %s
        Host                 : %s
        Port                 : %s
        Login                :

        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_server_stmp = 'addServer -name %s -serverType %s -host %s -port %s -mailFrom %s'
    add_server_snmp = 'addServer -name %s -serverType %s -host %s -port %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_server      = 'updateServer -name %s -newName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_servers    = 'showServers'
    show_server     = 'showServer -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_server_name = 'delServer -name %s'
    del_server_id   = 'delServer -id %s'
