from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from test_cmdline_commands.contexts.instance_context import InstanceContext as _instance
from test_cmdline_commands.contexts.discovery_context import DiscoveryContext as _discovery
from textwrap import dedent as sample


class ReportGenContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    instance_name = _instance.instance_name
    # -----------------------------------------------------------------------------------------------------------------]
    disc_gr_01 = _discovery.disc_gr_01
    disc_gr_02 = _discovery.disc_gr_02
    # -----------------------------------------------------------------------------------------------------------------]
    report_   = _base.prefix   + 'report_generator_'
    report_s_ = _base.prefix_s + 'Report Generator '
    rep_gen_audit_01     = report_   + 'audit'
    rep_gen_audit_02     = report_s_ + 'Audit'
    rep_gen_masking_01   = report_   + 'masking'
    rep_gen_masking_02   = report_s_ + 'Masking'
    rep_gen_security_01  = report_   + 'security'
    rep_gen_security_02  = report_s_ + 'Security'
    rep_gen_oper_errs_01 = report_   + 'operation_errors'
    rep_gen_oper_errs_02 = report_s_ + 'Operation Errors'
    rep_gen_session_01   = report_   + 'session'
    rep_gen_session_02   = report_s_ + 'Session'
    rep_gen_sys_event_01 = report_   + 'system_events'
    rep_gen_sys_event_02 = report_s_ + 'System Events'
    rep_gen_data_disc_01 = report_   + 'data_discovery'
    rep_gen_data_disc_02 = report_s_ + 'Data Discovery'
    # -----------------------------------------------------------------------------------------------------------------]
    report_msg = '%s report generator'
    msg_rep_gen_already_exists = _base.msg_already_exists % report_msg
    msg_rep_gen_wasnt_created  = _base.msg_wasnt_created  % report_msg
    msg_rep_gen_wasnt_updated  = _base.msg_wasnt_updated  % report_msg
    msg_isnt_such_rep_gen      = _base.msg_isnt_such      % report_msg
    msg_rep_gen_wasnt_deleted  = _base.msg_wasnt_deleted  % report_msg

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_no_reps_gen              = sample('''\
        No tasks available

        OK
    ''')
    sample_reps_gen_info            = sample('''\
        Available tasks:
        %s

        OK
    ''')
    sample_audit_rep_gen_info       = sample('''\
    

        Basic Info
        Name                           : %s
        Server                         :
        ReportType                     : Audit
        ReportFormat                   : csv

        Report Details
        Grouping Period                : 60

        Inst & Obj Groups:

        Data Filter                    :
        Req per GroupPeriod            : Any
        Total Num of Ret Rows          : Any
        Query Types:                   :
        Include Oper with Error        : yes



        Columns:
        Name                           : Title
        Query                          :
        SQL Verb                       :
        Total Affected Rows            :
        Interface Hostname             :
        Total Access                   :
        Group Period                   :
        End Time                       :
        Average Time                   :
        DB User Name                   :
        Current Database Name          :
        Service Name                   :
        OS User                        :
        Client IP                      :
        Server IP                      :
        Source Program                 :
        Instance Name                  :
        Server Port                    :
        Client Port                    :
        Client Host                    :
        Touched Object                 :
        Touched Schema                 :
        Application User Name          :
        Proxy User Name                :
        Triggered Rule Name            :
        Proxy Host                     :
        Proxy Port                     :
        Tags                           :
        Error Text                     :
        
        Periods                        : %s%s
        Subscriber                     :
        
        Write to Syslog                : no
        Query Length Limit             : 0

        Startup Frequency
        Frequency                      : Daily
        Repeat Period                  : 1

        Keep Results
        Type                           : Keep Forever

        OK
    ''')
    sample_masking_rep_gen_info     = sample('''\
        
        
        Basic Info
        Name                           : %s
        Server                         :
        ReportType                     : Masking
        ReportFormat                   : csv
        
        Report Details
        Grouping Period                : 60
        
        Inst & Obj Groups:
        
        Data Filter                    :
        Req per GroupPeriod            : Any
        Total Num of Ret Rows          : Any
        Query Types:                   :
        
        
        
        Columns:
        Name                           : Title
        Query                          :
        SQL Verb                       :
        Total Affected Rows            :
        Interface Hostname             :
        Total Access                   :
        Group Period                   :
        End Time                       :
        Average Time                   :
        DB User Name                   :
        Current Database Name          :
        Service Name                   :
        OS User                        :
        Client IP                      :
        Server IP                      :
        Source Program                 :
        Instance Name                  :
        Server Port                    :
        Client Port                    :
        Client Host                    :
        Touched Object                 :
        Touched Schema                 :
        Application User Name          :
        Proxy User Name                :
        Triggered Rule Name            :
        Proxy Host                     :
        Proxy Port                     :
        Tags                           :
        
        Periods                        : %s%s
        Subscriber                     :
        
        Write to Syslog                : no
        
        Startup Frequency
        Frequency                      : Daily
        Repeat Period                  : 1
        
        Keep Results
        Type                           : Keep Forever
        
        OK
    ''')
    sample_security_rep_gen_info    = sample('''\
        
        
        Basic Info
        Name                           : %s
        Server                         :
        ReportType                     : Security
        ReportFormat                   : csv
        
        Report Details
        Grouping Period                : 60
        
        Inst & Obj Groups:
        
        Data Filter                    :
        Req per GroupPeriod            : Any
        Total Num of Ret Rows          : Any
        Query Types:                   :
        
        
        
        Columns:
        Name                           : Title
        Query                          :
        SQL Verb                       :
        Total Affected Rows            :
        Interface Hostname             :
        Total Access                   :
        Group Period                   :
        End Time                       :
        Average Time                   :
        DB User Name                   :
        Current Database Name          :
        Service Name                   :
        OS User                        :
        Client IP                      :
        Server IP                      :
        Source Program                 :
        Instance Name                  :
        Server Port                    :
        Client Port                    :
        Client Host                    :
        Touched Object                 :
        Touched Schema                 :
        Application User Name          :
        Proxy User Name                :
        Triggered Rule Name            :
        Proxy Host                     :
        Proxy Port                     :
        Tags                           :
        
        Periods                        : %s%s
        Subscriber                     :
        
        Write to Syslog                : no
        Query Length Limit             : 0
        
        Startup Frequency
        Frequency                      : Daily
        Repeat Period                  : 1
        
        Keep Results
        Type                           : Keep Forever
        
        OK
    ''')
    sample_oper_errors_rep_gen_info = sample('''\


        Basic Info
        Name                           : %s
        Server                         :
        ReportType                     : Operation Errors
        ReportFormat                   : csv
        
        Report Details
        Grouping Period                : 60
        
        Inst & Obj Groups:
        
        Data Filter                    :
        Req per GroupPeriod            : Any
        Total Num of Ret Rows          : Any
        Query Types:                   :
        
        
        
        Columns:
        Name                           : Title
        Query                          :
        SQL Verb                       :
        Total Affected Rows            :
        Interface Hostname             :
        Total Access                   :
        Begin Time                     :
        End Time                       :
        Average Time                   :
        DB User Name                   :
        Current Database Name          :
        Service Name                   :
        OS User                        :
        Client IP                      :
        Server IP                      :
        Source Program                 :
        Instance Name                  :
        Server Port                    :
        Client Port                    :
        Client Host                    :
        Touched Object                 :
        Touched Schema                 :
        Application User Name          :
        Proxy User Name                :
        Triggered Rule Name            :
        Proxy Host                     :
        Proxy Port                     :
        Tags                           :
        Error Text                     :
        
        Periods                        : %s%s
        Subscriber                     :
        
        Write to Syslog                : no
        Query Length Limit             : 0
        
        Startup Frequency
        Frequency                      : Daily
        Repeat Period                  : 1
        
        Keep Results
        Type                           : Keep Forever
        
        OK
    ''')
    sample_session_rep_gen_info     = sample('''\
    
        
        Basic Info
        Name                           : %s
        Server                         :
        ReportType                     : Session Report
        Session Report Type            : All sessions
        ReportFormat                   : csv
        Data Filter                    :
        
        Columns:
        Name                           : Title
        Begin Time                     :
        End Time                       :
        Average Time                   :
        DB User Name                   :
        Service Name                   :
        Database Name                  :
        OS User                        :
        Client IP                      :
        Client Host                    :
        Server IP                      :
        Source Program                 :
        Instance Name                  :
        Error Code                     :
        Error Text                     :
        Event Count                    :
        Server Port                    :
        Client Port                    :
        Application User Name          :
        Proxy Host                     :
        Proxy Port                     :
        
        Periods                        : %s%s
        Subscriber                     :
        
        Write to Syslog                : no
        
        Startup Frequency
        Frequency                      : Daily
        Repeat Period                  : 1
        
        Keep Results
        Type                           : Keep Forever
        
        OK
    ''')
    sample_sys_events_rep_gen_info  = sample('''\
    
        
        Basic Info
        Name                           : %s
        Server                         :
        ReportType                     : System Events
        ReportFormat                   : csv
        
        Columns:
        Name                           : Title
        Time(short format)             :
        Time(long format)              :
        Level                          :
        Type                           :
        Server                         :
        Message                        :
        
        Periods                        : %s%s
        Subscriber                     :
        
        Write to Syslog                : no
        
        Startup Frequency
        Frequency                      : Daily
        Repeat Period                  : 1
        
        Keep Results
        Type                           : Keep Forever
        
        OK
    ''')
    sample_data_disc_rep_gen_info   = sample('''\
        Object Group not found. Id: 0


        Basic Info
        Name                           : %s
        Server                         :
        ReportType                     : Data Discovery
        ReportFormat                   : csv
        
        Columns:
        Name                           : Title
        Sub Domain                     :
        Domain                         :
        Database Name                  :
        Schema Name                    :
        Table Name                     :
        Column Name                    :
        Column Type                    :
        Security Standards             :
        Hostname                       :
        Instance Name                  :
        Discovery Name                 :
        Start Time                     :
        End Time                       :
        Average Time                   :
        Total Hit Count                :
        Percentage Of Match            :
        Matched Phrase                 :
        Matched Snippet                :
        Hit Count                      :
        Example Of Snippet             :
        Table Type                     :
        Total rows in table            :
        Object Group                   : null
        Schema                         :
        Table                          :
        Analysed Row Count             : 100
        Skip NULL                      : no
        Max percentage                 : 50
        Min Percentage                 : 90
        Search by:
                                       : %s
        Subscriber                     :
        
        Write to Syslog                : no
        
        Startup Frequency
        Frequency                      : Daily
        Repeat Period                  : 1
        
        Keep Results
        Type                           : Keep Forever
        
        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_disc_gr                  = _discovery.add_disc_gr
    add_audit_rep_gen            = 'addAuditReportGen -name %s'
    add_masking_rep_gen          = 'addMaskingReportGen -name %s'
    add_security_rep_gen         = 'addSecurityReportGen -name %s'
    add_operation_errors_rep_gen = 'addOperationErrorsReportGen -name %s'
    add_session_rep_gen          = 'addSessionReportGen -name %s'
    add_system_events_rep_gen    = 'addSystemEventsReportGen -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_audit_rep_gen            = 'updateAuditReportGen -name %s -newName %s'
    upd_masking_rep_gen          = 'updateMaskingReportGen -name %s -newName %s'
    upd_security_rep_gen         = 'updateSecurityReportGen -name %s -newName %s'
    upd_operation_errors_rep_gen = 'updateOperationErrorsReportGen -name %s -newName %s'
    upd_session_rep_gen          = 'updateSessionReportGen -name %s -newName %s'
    upd_system_events_rep_gen    = 'updateSystemEventsReportGen -name %s -newName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_rep_gen                 = 'showReportGen -name %s'
    show_reps_gen                = 'showReportsGen'
    # -----------------------------------------------------------------------------------------------------------------]
    del_disc_gr                  = _discovery.del_disc_gr
    del_rep_gen                  = 'delReportGen -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    enable_audit_objects         = 'changeParameter -name auditObjects -value 1'
    disable_audit_objects        = 'changeParameter -name auditObjects -value 0'

    @classmethod
    def setup_tests(cls):
        group = cls.disc_gr_01
        group_in = cls.sws(group)

        cls.execute(cls.enable_audit_objects)
        cls.execute(cls.add_disc_gr % group_in)

    @classmethod
    def cleanup_tests(cls):
        group = cls.disc_gr_01
        group_in = cls.sws(group)

        cls.execute(cls.disable_audit_objects)
        cls.execute(cls.del_disc_gr % group_in)
