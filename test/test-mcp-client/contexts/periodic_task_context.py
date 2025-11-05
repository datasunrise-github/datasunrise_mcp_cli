from test_cmdline_commands.contexts.instance_context import InstanceContext as _base
from test_cmdline_commands.contexts.discovery_context import DiscoveryContext as _discovery
from textwrap import dedent as sample


class PeriodicTaskContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    instance_name = _base.instance_name
    # -----------------------------------------------------------------------------------------------------------------]
    disc_gr_01 = _discovery.disc_gr_01
    disc_gr_02 = _discovery.disc_gr_02
    # -----------------------------------------------------------------------------------------------------------------]
    per_task_   = _base.prefix   + 'periodic_task_'
    per_task_s_ = _base.prefix_s + 'Periodic Task '
    per_task_clean_audit_01       = per_task_   + 'clean_audit'
    per_task_clean_audit_02       = per_task_s_ + 'Clean Audit'
    per_task_backup_dictionary_01 = per_task_   + 'backup_dictionary'
    per_task_backup_dictionary_02 = per_task_s_ + 'Backup Dictionary'
    per_task_user_behaviour_01    = per_task_   + 'user_behavior'
    per_task_user_behaviour_02    = per_task_s_ + 'User Behavior'
    per_task_relation_learning_01 = per_task_   + 'query_history_table_relation_learning'
    per_task_relation_learning_02 = per_task_s_ + 'Query History Table Relation Learning'
    per_task_vuln_assessment_01   = per_task_   + 'vulnerability_assessment'
    per_task_vuln_assessment_02   = per_task_s_ + 'Vulnerability Assessment'
    per_task_update_metadata_01   = per_task_   + 'update_metadata'
    per_task_update_metadata_02   = per_task_s_ + 'Update Metadata'
    per_task_data_discovery_01    = per_task_   + 'data_discovery'
    per_task_data_discovery_02    = per_task_s_ + 'Data Discovery'
    per_task_health_check_01      = per_task_   + 'health_check'
    per_task_health_check_02      = per_task_s_ + 'Health Check'
    # -----------------------------------------------------------------------------------------------------------------]
    per_task_type_clean_audit       = 'Clean Audit'
    per_task_type_backup_dictionary = 'Backup Dictionary'
    per_task_type_user_behaviour    = 'User Behavior'
    per_task_type_relation_learning = 'Query History Table Relation Learning'
    per_task_type_vuln_assessment   = 'Vulnerability Assessment'
    per_task_type_update_metadata   = 'Update Metadata'
    per_task_type_discovery         = 'Periodic Data Discovery'
    per_task_type_health_check      = 'Health Check'
    # -----------------------------------------------------------------------------------------------------------------]
    dict_backup = 'dictionary_backup'
    tr_start_date = '1970-01-01'
    tr_end_date   = '3099-31-12'
    table_relation_model = 'default_model.' + _base.instance_name

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_per_clean_audit_info     = sample('''\
        
        
        Basic Info
        Name                      : %s
        Server                    : <Any>
        
        Clean Audit Parameters
        Clean Audit Type          : DELETE_CLEAN
        
        Startup Frequency
        Frequency                 : Daily
        Repeat Period             : 1
        
        Keep Results
        Type                      : Keep Forever
        
        Tasks
        Tags
        
        
        OK
    ''')
    sample_per_backup_dict_info     = sample('''\
        
        
        Basic Info
        Name                      : %s
        Server                    : <Any>
        
        Backup Dictionary Parameters
        Backup Name               : dictionary_backup
        Backup Settings           : true
        Backup Users              : true
        Backup Objects            : true
        External Command          :
        
        Startup Frequency
        Frequency                 : Daily
        Repeat Period             : 1
        
        Keep Results
        Type                      : Keep Forever
        
        Tasks
        Tags
        
        
        OK
    ''')
    sample_per_user_behaviour_info  = sample('''\
        
        
        Basic Info
        Name                      : %s
        Server                    : <Any>
        
        User Behavior Parameters
        Reporting Period Type     : Custom Period
        Training End Date         : 3101-07-12
        Generate Report           : false
        
        Startup Frequency
        Frequency                 : Daily
        Repeat Period             : 1
        
        Keep Results
        Type                      : Keep Forever
        
        Tasks
        Tags
        
        
        OK
    ''')
    sample_per_rel_learning_info    = sample('''\
        
        
        Basic Info
        Name                      : %s
        Server                    : <Any>
        
        Query History Table Relation Learning Parameters
        Table relation            : %s
        
        Process tables:
        
        
        Skip tables:
        
        
        Included Object Groups:
        
        Excluded Object Groups:
        
        Startup Frequency
        Frequency                 : Daily
        Repeat Period             : 1
        
        Keep Results
        Type                      : Keep Forever
        
        Tasks
        Tags
        
        
        OK
    ''')
    sample_per_vuln_assessment_info = sample('''\
        
        
        Basic Info
        Name                      : %s
        Server                    : <Any>
        
        Vulnerability Assessment Parameters
        
        Startup Frequency
        Frequency                 : Daily
        Repeat Period             : 1
        
        Keep Results
        Type                      : Keep Forever
        
        Tasks
        Tags
        
        
        OK
    ''')
    sample_per_update_metadata_info = sample('''\
        
        
        Basic Info
        Name                      : %s
        Server                    : <Any>
        
        Update Metadata Parameters
        
        Startup Frequency
        Frequency                 : Daily
        Repeat Period             : 1
        
        Keep Results
        Type                      : Keep Forever
        
        Tasks
        Tags
        
        
        OK
    ''')
    sample_per_data_discovery_info  = sample('''\
        
        
        Basic Info
        Name                      : %s
        Server                    : <Any>
        
        Periodic Data Discovery Parameters
        Login                     : null
        Without Credentials       : no
        Object Group              :
        Analysed Row Count        : 100
        Skip NULL                 : no
        Max percentage            : 50
        Min Percentage            : 90
        Additional Metrics        : no
        Enable statistics on attributes : no
        Schema                    :
        Table                     :
        Search by:                : Information Types
                                  : %s
        
        Startup Frequency
        Frequency                 : Daily
        Repeat Period             : 1
        
        Keep Results
        Type                      : Keep Forever
        
        Tasks
        Tags
        
        
        OK
    ''')
    sample_per_health_check_info    = sample('''\
        
        
        Basic Info
        Name                      : %s
        Server                    : <Any>
        
        Health Check Parameters
        Proxy Testing Method      : On Executing System
        Send Error Messages to Event Monitor : true
        Public Address            :
        Port                      : 0
        
        Startup Frequency
        Frequency                 : Daily
        Repeat Period             : 1
        
        Keep Results
        Type                      : Keep Forever
        
        Tasks
        Tags
        
        
        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_disc_gr               = _discovery.add_disc_gr
    add_per_clean_audit       = 'addPerCleanAudit -name %s'
    add_per_backup_dictionary = 'addPerBackupDictionary -name %s -backupName %s'
    add_per_user_behavior     = 'addPerUserBehavior -name %s -trStartDate %s -trEndDate %s'
    add_per_table_rel_learn   = 'addQueryHisTabRelLearnPerTask -name %s -instance %s -tableRel %s'
    add_per_vuln_assessment   = 'addPerVulnAssessment -name %s'
    add_per_update_metadata   = 'addPerUpdateMetadata -name %s -instance %s'
    add_per_data_discovery    = 'addPerDiscovery -name %s -instance %s -searchByInfoTypes %s'
    add_per_health_check      = 'addPerHealthCheck -name %s -instance %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_per_clean_audit       = 'updatePerCleanAudit -name %s -newName %s'
    upd_per_backup_dictionary = 'updatePerBackupDictionary -name %s -newName %s'
    upd_per_user_behavior     = 'updatePerUserBehavior -name %s -newName %s'
    upd_per_table_rel_learn   = 'updateQueryHisTabRelLearnPerTask -name %s -newName %s'
    upd_per_vuln_assessment   = 'updatePerVulnAssessment -name %s -newName %s'
    upd_per_update_metadata   = 'updatePerUpdateMetadata -name %s -newName %s'
    upd_per_data_discovery    = 'updatePerDiscovery -name %s -newName %s'
    upd_per_health_check      = 'updatePerHealthCheck -name %s -newName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_per_task             = 'showPerTask -name %s -taskType %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_disc_gr               = _discovery.del_disc_gr
    del_per_task              = 'delPerTask -name %s -taskType %s'

    #
    #
    # MESSAGES
    # =================================================================================================================]
    per_task_msg = '%s periodic task'
    msg_per_task_wasnt_created = _base.msg_wasnt_created % per_task_msg
    msg_per_task_wasnt_updated = _base.msg_wasnt_updated % per_task_msg
    msg_per_task_wasnt_deleted = _base.msg_wasnt_deleted % per_task_msg

    @classmethod
    def setup_tests(cls):
        group = cls.disc_gr_01
        group_in = cls.sws(group)

        cls.execute(cls.add_disc_gr % group_in)

    @classmethod
    def cleanup_tests(cls):
        group = cls.disc_gr_01
        group_in = cls.sws(group)

        cls.execute(cls.del_disc_gr % group_in)

        #cls._clean_after_update_metadata()
