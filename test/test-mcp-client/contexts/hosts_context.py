from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from textwrap import dedent as sample


class HostsContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    host_name = _base.prefix + 'host'
    host_addr_01 = '192.168.1.42'
    host_addr_02 = '192.168.1.228'
    host_gr_01 = _base.prefix   + 'host_group'
    host_gr_02 = _base.prefix_s + 'Host Group'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_no_hosts         = sample('''\
        No Hosts

        OK
    ''')
    sample_hosts_info       = sample('''\
        Hosts:
        %s

        OK
    ''')
    sample_host_info        = sample('''\
        Name                 : %s
        Address Type         : HOST
        Host                 : %s
        
        OK
    ''')
    # -----------------------------------------------------------------------------------------------------------------]
    sample_no_host_groups   = sample('''\
        No Host Groups

        OK
    ''')
    sample_host_groups_info = sample('''\
        Host Groups:
        %s

        OK
    ''')
    sample_host_group_info  = sample('''\
        Name                 : %s
        Member               : %s

        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_host      = 'addHost -name %s -host %s'
    add_host_gr   = 'addHostGr -name %s -addMembers %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_host      = 'updateHost -name %s -host %s'
    upd_host_gr   = 'updateHostGr -name %s -newName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_hosts    = 'showHosts'
    show_host     = 'showHost -name %s'
    show_host_grs = 'showHostGroups'
    show_host_gr  = 'showHostGr -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_host      = 'delHost -name %s'
    del_host_gr   = 'delHostGr -name %s'
