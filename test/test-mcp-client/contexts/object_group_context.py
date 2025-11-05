from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from textwrap import dedent as sample


class ObjectGroupContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    obj_gr_01 = _base.prefix   + 'object_group'
    obj_gr_02 = _base.prefix_s + 'Object Group'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_no_object_groups   = sample('''\
        No Object Groups

        OK
    ''')
    sample_object_groups_info = sample('''\
        Object Group    : Instance
        %s : <Any>

        OK
    ''')
    sample_object_group_info  = sample('''\
        Name                 : %s


        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_object_gr   = 'addObjectGroup -name %s'
    # ---------------------------------------------------------------------------------------------------------------]
    upd_object_gr   = 'updateObjectGroup -name %s -newName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_object_grs = 'showObjectGroups'
    show_object_gr  = 'showObjectGroup -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_object_gr   = 'delObjectGroup -name %s'
