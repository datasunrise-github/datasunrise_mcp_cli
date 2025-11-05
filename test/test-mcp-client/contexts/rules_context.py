from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from test_cmdline_commands.contexts.instance_context import InstanceContext as _instance
from textwrap import dedent as sample


class RulesContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    db_type       = _instance.db_type
    instance_name = _instance.instance_name
    # -----------------------------------------------------------------------------------------------------------------]
    rule_ = _base.prefix + 'rule_'
    rule_audit    = rule_ + 'audit'
    rule_masking  = rule_ + 'masking'
    rule_security = rule_ + 'security'
    rule_learn    = rule_ + 'learn'
    rule_ext_disp = rule_ + 'ext_disp'
    rule_type = 'audit'
    mask_type = 'empty'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_no_rules           = sample('''\
        No rules

        OK
    ''')
    sample_rule_info          = sample('''\

        Main Settings:
        Name                           : {}%s
        Enabled                        : %s
        Comment                        :

        Actions:

        OK
    ''').format(rule_)
    sample_audit_rule_info    = sample('''\

        Main Settings:
        Name                           : {}audit
        Enabled                        : %s
        Comment                        :

        Actions:
        Rule Type                      : Audit
        Action                         : Audit
        Log Data                       : no
        Max row count to log           : Default Server value
        Log 1st Event only             : no
        Log Event in Storage           : yes
        Syslog Group                   : no

        Filter Sessions:
        AND

        Filter SQL Statements:

        Intercept SQL statements:
        Select                         : true
        Select in WHERE & JOIN         : true
        Insert                         : true
        Update                         : true
        Delete                         : true
        Function Call                  : true

        Intercept statements from the Object Group : no

        Skip statements from the Object Group : no

        OK
    ''').format(rule_)
    sample_masking_rule_info  = sample('''\

        Main Settings:
        Name                           : {}masking
        Enabled                        : %s
        Comment                        :

        Actions:
        Rule Type                      : Masking
        Log Data                       : no
        Max row count to log           : Default Server value
        Log 1st Event only             : no
        Mask SELECT only               : false
        Keep Row Count                 : false
        Log Event in Storage           : yes
        Syslog Group                   : no

        Filter Sessions:
        AND

        Filter SQL Statements:

        Masked Columns:
        %s

        Mask Parameters:
        Mask Type                      : %s

        OK
    ''').format(rule_)
    sample_security_rule_info = sample('''\

        Main Settings:
        Name                           : {}security
        Enabled                        : %s
        Comment                        :

        Actions:
        Rule Type                      : Security
        Action                         : Block
        Block Type                     : SQL Error
        Block Message                  :
        Log Event in Storage           : yes
        Syslog Group                   : no

        Filter Sessions:
        AND

        Filter SQL Statements:

        Intercept SQL statements:
        Select                         : true
        Select in WHERE & JOIN         : true
        Insert                         : true
        Update                         : true
        Delete                         : true
        Function Call                  : true

        Intercept statements from the Object Group : no

        Skip statements from the Object Group : no

        OK
    ''').format(rule_)
    sample_learn_rule_info    = sample('''\

        Main Settings:
        Name                           : {}learn
        Enabled                        : %s
        Comment                        :

        Actions:
        Rule Type                      : Learning
        Action                         : Learn

        Filter Sessions:
        AND

        Filter SQL Statements:
        Save Statements in Group       : no
        Save Users in Group            : yes, out of Group
        Save Applications              : yes
        Save Objects in Group          : no
        Learn using SELECT             : yes
        Learn using INSERT             : yes
        Learn using UPDATE             : yes
        Learn using DELETE             : yes
        Learn using Functon Call       : yes

        OK
    ''').format(rule_)
    sample_ext_disp_rule_info = sample('''\

        Main Settings:
        Name                           : {}ext_disp
        Enabled                        : %s
        Comment                        :

        Actions:
        Rule Type                      : External

        Filter Sessions:
        AND

        Filter SQL Statements:

        Intercept SQL statements:
        Select                         : true
        Select in WHERE & JOIN         : true
        Insert                         : true
        Update                         : true
        Delete                         : true
        Function Call                  : true

        Intercept statements from the Object Group : no

        Skip statements from the Object Group : no

        OK
    ''').format(rule_)

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_rule          = 'addRule -dbType {} -action %s -name {}%s' \
        .format(db_type, rule_)
    add_audit_rule    = 'addAuditRule -dbType {} -name {}' \
        .format(db_type, rule_audit)
    add_masking_rule  = 'addMaskRule -dbType {} -name {} -instance {} -maskColumns %s -maskType %s'\
        .format(db_type, rule_masking, instance_name)
    add_security_rule = 'addSecurityRule -dbType {} -name {}' \
        .format(db_type, rule_security)
    add_learn_rule    = 'addLearnRule -dbType {} -name {}' \
        .format(db_type, rule_learn)
    # -----------------------------------------------------------------------------------------------------------------]
    upd_rule          = 'updateRule -name {}%s -enable %s' \
        .format(rule_)
    upd_audit_rule    = 'updateAuditRule -name {} -enable %s' \
        .format(rule_audit)
    upd_masking_rule  = 'updateMaskRule -name {} -enable %s' \
        .format(rule_masking)
    upd_security_rule = 'updateSecurityRule -name {} -enable %s' \
        .format(rule_security)
    upd_learn_rule    = 'updateLearnRule -name {} -enable %s' \
        .format(rule_learn)
    # -----------------------------------------------------------------------------------------------------------------]
    show_rules        = 'showRules'                                                                         # NO SAMPLE
    show_rule         = 'showRule -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_rule          = 'delRule -name %s'

    #
    #
    # MESSAGES
    # =================================================================================================================]
    msg_rule_already_exists = _base.msg_already_exists % '%srule'
    msg_rule_wasnt_created  = _base.msg_wasnt_created  % '%srule'
    msg_rule_wasnt_updated  = _base.msg_wasnt_updated  % '%srule'
