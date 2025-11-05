from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from test_cmdline_commands.contexts.server_context import ServerContext as _server
from textwrap import dedent as sample


class SubscriberContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    server_smtp_01   = _server.server_smtp_01
    server_snmp_02   = _server.server_snmp_02
    server_type_smtp = _server.server_type_smtp
    server_type_snmp = _server.server_type_snmp
    smtp_snmp_host = _server.smtp_snmp_host
    smtp_snmp_port = _server.smtp_snmp_port
    mail_from = _server.mail_from
    # -----------------------------------------------------------------------------------------------------------------]
    subscriber_01 = _base.prefix   + 'subscriber'
    subscriber_02 = _base.prefix_s + 'Subscriber'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_no_subscribers   = sample('''\
        No Subscribers

        OK
    ''')
    sample_subscribers_info = sample('''\
        : %s : %s: %s              :
    ''')
    sample_subscriber_info  = sample('''\
        Name                 : %s
        Send to Address      :
        Sending Server Name  : %s
        Sending Server Address : %s

        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_server_stmp   = _server.add_server_stmp
    add_subscriber    = 'addSubscriber -name %s -serverName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_subscriber    = 'updateSubscriber -name %s -newName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_servers      = _server.show_servers
    show_subscribers  = 'showSubscribers'
    show_subscriber   = 'showSubscriber -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_server_name   = _server.del_server_name
    del_subscriber    = 'delSubscriber -name %s'

    @classmethod
    def setup_tests(cls):
        server_01 = cls.server_smtp_01
        server_02 = cls.server_snmp_02
        type_smtp = cls.server_type_smtp
        type_snmp = cls.server_type_snmp
        host = cls.smtp_snmp_host
        port = cls.smtp_snmp_port
        mail_from = cls.mail_from

        server_01_in = cls.sws(server_01)
        server_02_in = cls.sws(server_02)

        cls.execute(cls.add_server_stmp % (server_01_in, type_smtp, host, port, mail_from))
        cls.execute(cls.add_server_stmp % (server_02_in, type_snmp, host, port, mail_from))

    @classmethod
    def cleanup_tests(cls):
        server_01 = cls.server_smtp_01
        server_02 = cls.server_snmp_02

        server_01_in = cls.sws(server_01)
        server_02_in = cls.sws(server_02)

        cls.execute(cls.del_server_name % server_01_in)
        cls.execute(cls.del_server_name % server_02_in)
