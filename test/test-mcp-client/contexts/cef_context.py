from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from textwrap import dedent as sample


class CEFContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    cef_group_01 = _base.prefix   + 'cef_group'
    cef_group_02 = _base.prefix_s + 'CEF Group'
    cef_item_01  = _base.prefix   + 'cef_item'
    cef_item_02  = _base.prefix_s + 'CEF Item'
    cef_code = _base.prefix   + 'cef_code'
    # -----------------------------------------------------------------------------------------------------------------]
    cef_type = 'Session Open'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_default_cef_groups       = sample('''\
        Syslog Groups:
        default group

        OK
    ''')
    sample_cef_groups_info          = sample('''\
        Syslog Groups:
        default group
        %s

        OK
    ''')
    sample_cef_group_no_item_info   = sample('''\
        Name                 : %s
        Enabled              : yes

        OK
    ''')
    sample_cef_group_with_item_info = sample('''\
        Name                 : %s
        Enabled              : yes
        
        Items:

        Name: %s
        Type: Session Open
        CEF: %s

        OK
    ''')
    # -----------------------------------------------------------------------------------------------------------------]
    sample_no_cef_items             = sample('''\
        No CEF Items

        OK
    ''')
    sample_cef_items_info           = sample('''\
        CEF Items:
        %s

        OK
    ''')
    sample_cef_item_info            = sample('''\
        Name       : %s
        Type       : Session Open
        CEF        : %s

        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_cef_group   = 'addCefGroup -name %s'
    add_cef_item    = 'addCefItem -name %s -groupName %s -type %s -cef %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_cef_group   = 'updateCefGroup -name %s -newName %s'
    upd_cef_item    = 'updateCefItem -name %s -newName %s -groupName %s -cef %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_cef_groups = 'showCefGroups'
    show_cef_group  = 'showCefGroup -name %s'
    show_cef_items  = 'showCefItems -groupName %s'
    show_cef_item   = 'showCefItem -name %s -groupName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_cef_group   = 'delCefGroup -name %s'
    del_cef_item    = 'delCefItem -name %s -groupName %s'

    #
    #
    # MESSAGES
    # =================================================================================================================]
    cef_msg = 'CEF %s'
    msg_cef_already_exists = _base.msg_already_exists % cef_msg
    msg_cef_wasnt_created  = _base.msg_wasnt_created  % cef_msg
    msg_cef_wasnt_updated  = _base.msg_wasnt_updated  % cef_msg
    msg_isnt_such_cef      = _base.msg_isnt_such      % cef_msg
    msg_cef_wasnt_deleted  = _base.msg_wasnt_deleted  % cef_msg
