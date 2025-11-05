from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from test_cmdline_commands.contexts.instance_context import InstanceContext as _instance
from textwrap import dedent as sample


class DiscoveryContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    instance_name = _instance.instance_name
    # -----------------------------------------------------------------------------------------------------------------]
    disc_gr_01 = _base.prefix   + 'discovery_group'
    disc_gr_02 = _base.prefix_s + 'Discovery Group'
    disc_attr_01 = _base.prefix   + 'discovery_attribute'
    disc_attr_02 = _base.prefix_s + 'Discovery Attribute'
    # -----------------------------------------------------------------------------------------------------------------]
    disc_gr_copy = ' Copy'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]

    # =================================================================================================================]
    sample_disc_group_no_attr_info   = sample('''\
        Name                 : %s
        
        OK
    ''')
    sample_disc_group_with_attr_info = sample('''\
        Name                 : %s
            
        Attributes:
        %s

        OK
    ''')
    sample_disc_attr_info            = sample('''\
        Name                 : %s
        Column Names         :
        Case Sensitive       : true
        Column Type          : Not Check

        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_disc_gr    = 'addDiscoveryGr -name %s'
    add_disc_attr  = 'addDiscoveryAttr -name %s -group %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_disc_gr    = 'updateDiscoveryGr -name %s -newName %s'
    upd_disc_attr  = 'updateDiscoveryAttr -name %s -newName %s -group %s'
    # -----------------------------------------------------------------------------------------------------------------]
    copy_disc_gr   = 'copyDiscoveryGr -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_disc_grs  = 'showDiscoveryGroups'                                                                  # NO SAMPLE
    show_disc_gr   = 'showDiscoveryGr -name %s'
    show_disc_attr = 'showDiscoveryAttr -name %s -group %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_disc_gr    = 'delDiscoveryGr -name %s'
    del_disc_attr  = 'delDiscoveryAttr -name %s -group %s'

    @classmethod
    def cleanup_tests(cls):
        copy = cls.disc_gr_copy
        group_01 = cls.disc_gr_01 + copy
        group_02 = cls.disc_gr_02 + copy
        group_01_in = cls.sws(group_01)
        group_02_in = cls.sws(group_02)

        cls.execute(cls.del_disc_gr % group_01_in)
        cls.execute(cls.del_disc_gr % group_02_in)
