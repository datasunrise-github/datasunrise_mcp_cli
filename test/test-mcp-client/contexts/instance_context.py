from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from test_cmdline_commands.contexts.query_group_context import QueryGroupContext as _query_group
from configuration.Session import Session
from dsapi.cmdline.dscli.DsConverter import DsConverter
from common.DbType import DbType
from textwrap import dedent as sample


class InstanceContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    db_type_raw = Session.DB_DATABASE_TYPE
    db_type = DsConverter.convert(DbType, db_type_raw)
    # -----------------------------------------------------------------------------------------------------------------]
    db_name  = Session.DB_DATABASE_DB_NAME
    db_login = Session.DB_DATABASE_LOGIN
    db_pwd   = Session.DB_DATABASE_PASSWORD
    db_host  = Session.DB_DATABASE_HOST
    db_port  = Session.DB_DATABASE_PORT
    proxy_host = Session.PROXY_HOST
    proxy_port = Session.PROXY_PORT
    save_pwd = 'ds'
    # -----------------------------------------------------------------------------------------------------------------]
    instance_name     = _base.prefix + 'instance_cmdline_' + db_type.strip('"').replace(' ', '_')
    instance_name_upd = _base.unique_id + instance_name
    # -----------------------------------------------------------------------------------------------------------------]
    interface_new_host = '192.168.1.254'
    interface_new_port = str(int(db_port) + 1)
    # -----------------------------------------------------------------------------------------------------------------]
    proxy_new_host = '127.0.0.254'
    proxy_new_port = str(int(proxy_port) + 1)

    #
    #
    # DATABASE TYPES ANALYZER
    # =================================================================================================================]
    is_ifmx = db_type_raw is DbType.INFORMIX
    is_orcl = db_type_raw is DbType.ORACLE

    have_db_names  = [DbType.AURORAPGSQL,
                      DbType.DB2,
                      DbType.GREENPLUM,
                      DbType.HANA,
                      DbType.HIVE,
                      DbType.IMPALASQL,
                      DbType.MARIA_DB,
                      DbType.MONGO,
                      DbType.MSSQL,
                      DbType.MYSQL,
                      DbType.NETEZZA,
                      DbType.POSTGRE,
                      DbType.POSTGRESQL,
                      DbType.REDSHIFT,
                      DbType.TERADATA,
                      DbType.VERTICA]
    empty_db_names = [DbType.MARIA_DB,
                      DbType.MYSQL]

    empty_db_name = db_type_raw in empty_db_names
    out_db_name = '' if empty_db_name else ' ' + db_name
    out_db_attr = \
        'Instance' if is_orcl else \
        'Database'
    cmd_db_attr = \
        ' -database ' if db_type_raw in have_db_names else \
        ' -instance ' if is_orcl else \
        ''
    cmd_orcl_attrs      = '' if not is_orcl else ' -instanceType %s -sysDba %s' % ('sid', 'true')
    cmd_orcl_attrs_plus = '' if not is_orcl else ' -sysDba'
    cmd_ifmx_svr_attr   = '' if not is_ifmx else ' -serverName '

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]]
    sample_no_instances       = sample('''\
        No Instances

        OK
    ''')
    sample_instances_info     = sample('''\
        Instances:
        %s
        
        OK
    ''')
    sample_instance_info      = sample('''\
        Name                 : %s
        Login                : %s
        Search for Table Relations : no
        Environment Name     : DS_ENVIRONMENT
        Automatically Create Environment : no
        
        OK
    ''')
    sample_instance_info_plus = sample('''\
        Name                 : %s
        Login                : %s
        Search for Table Relations : no
        Environment Name     : DS_ENVIRONMENT
        Automatically Create Environment : no
        
        
        Interface: %s:%s
          Proxy: %s:%s

        OK
    ''')
    # -----------------------------------------------------------------------------------------------------------------]
    sample_no_interfaces      = sample('''\
        No Interfaces
        
        OK
    ''')
    sample_interfaces_info    = sample('''\
        Interfaces:
        %s:%s
        
        OK
    ''')
    sample_interface_info     = sample('''\
        Host                 : %s
        Port                 : %s
        IP Version           : Auto
        Encryption           : No
        
        OK
    ''')
    # -----------------------------------------------------------------------------------------------------------------]
    sample_no_proxies         = sample('''\
        No Proxies
        
        OK
    ''')
    sample_proxies_info       = sample('''\
        Proxies:
        %s:%s
        
        OK
    ''')
    sample_proxy_info         = sample('''\
        Host                 : %s
        Port                 : %s
        Enabled              : true

        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    upd_metadata      = 'updateMetadata -instance %s -login %s -password %s'
    # -----------------------------------------------------------------------------------------------------------------]
    add_instance_plus = 'addInstancePlus -name %s -dbType %s{}%s -dbHost %s -dbPort %s ' \
                        '-login %s -password %s -proxyHost %s -proxyPort %s{} -savePassword %s -enableAgent {}' \
                        .format(cmd_db_attr, cmd_orcl_attrs_plus, 'true' if Session.AGENT_TESTS != 0 else 'false')
    add_interface     = 'addInterface -instance %s -newHost %s -newPort %s'
    add_proxy         = 'addProxy -instance %s -interfaceHost %s -interfacePort %s -proxyHost %s -proxyPort %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_instance      = 'updateInstance -name %s -newName %s'
    upd_credential    = 'updateInstanceCredentials -instance %s -login %s -password %s'
    upd_interface     = 'updateInterface -instance %s -prevHost %s -prevPort %s -newHost %s -newPort %s'
    upd_proxy         = 'updateProxy -instance %s -interfaceHost %s -interfacePort %s ' \
                        '-prevProxyHost %s -prevProxyPort %s -proxyHost %s -proxyPort %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_query_grs    = _query_group.show_query_grs
    show_instances    = 'showInstances'                                                                     # NO SAMPLE
    show_instance     = 'showInstance -name %s'
    show_interfaces   = 'showInterfaces'
    show_interface    = 'showInterface -instance %s -host %s -port %s'
    show_proxies      = 'showProxies -instance %s -interfaceHost %s -interfacePort %s'
    show_proxy        = 'showProxy -instance %s -interfaceHost %s -interfacePort %s -proxyHost %s -proxyPort %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_query_gr      = _query_group.del_query_gr
    del_instance      = 'delInstance -name %s'
    del_interface     = 'delInterface -instance %s -host %s -port %s'
    del_proxy         = 'delProxy -instance %s -interfaceHost %s -interfacePort %s -proxyHost %s -proxyPort %s'

    @classmethod
    def _delete_instance(cls):
        instance = cls.instance_name

        out = cls.execute(cls.show_instances)
        if cls.out_fix(out) == cls.sample_instances_info % instance:
            cls.execute(cls.del_instance % instance)

        cls.call_backends_check()  # reset workers
        cls.wait_core()

    @classmethod
    def _clean_after_update_metadata(cls):
        query_groups = [
            'SSMS queries',
            'pgAdmin queries',
            'Oracle SQL Developer queries',
            'Toad for Oracle queries',
        ]

        out = cls.execute(cls.show_query_grs)
        for query_group in query_groups:
            if query_group in cls.out_fix(out):
                cls.execute(cls.del_query_gr % cls.sws(query_group))

    @classmethod
    def cleanup_tests(cls):
        cls._delete_instance()
        #cls._clean_after_update_metadata()
