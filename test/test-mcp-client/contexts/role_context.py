from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from test_cmdline_commands.contexts.ds_user_context import DataSunriseUserContext as _ds_user
from textwrap import dedent as sample


class RoleContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    ds_user_custom = _ds_user.ds_user_custom
    # -----------------------------------------------------------------------------------------------------------------]
    role_custom_01 = _ds_user.role_custom_01
    role_custom_02 = _ds_user.role_custom_02

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_default_roles  = sample('''\
        Access Roles:
        Admin
        DataSunrise Admin
        Operator
        Security Manager

        OK
    ''')
    sample_roles_info     = sample('''\
        Access Roles:
        Admin
        DataSunrise Admin
        Operator
        Security Manager
        %s

        OK
    ''')
    # -----------------------------------------------------------------------------------------------------------------]
    actions_list_template = sample('''\
        Name                                : %s
        Group DN                            :
        ------------------------------------------------------------------------
        {group_1}
        ------------------------------------------------------------------------
        {group_2}
        
        OK
    ''')
    action_row_template   = '%-36s:%s'
    # -----------------------------------------------------------------------------------------------------------------]
    actions_group_01 = [
        'AI Detection of Users',
        'AWS S3 Inventory Items',
        'Access Custom File',
        'Access Instance By Role',
        'Access Instance By User',
        'Active Directory Mapping',
        'Agents',
        'Application Data Model',
        'Application User Settings',
        'Applications',
        'Audit Rules',
        'Blocked Users',
        'Compliance Manager',
        'DSAR Configuration',
        'DSAR Field',
        'Data Discovery Filters',
        'Data Discovery Groups',
        'Data Discovery Incremental Data',
        'Data Discovery Incremental Group',
        'Data Discovery Matched Columns',
        'Data Discovery Monitoring Info',
        'Data Discovery Speed Test Task',
        'Data Discovery Task Error',
        'Data Format Converters',
        'DataSunrise Servers',
        'Database Instance Users',
        'Database Instances',
        'Database Interfaces',
        'Database Properties',
        'Database Services',
        'Database Users',
        'Database Users Properties',
        'Databases',
        'Deferred Task Info',
        'Deferred Task Pool Failed',
        'Dynamic SQL Replacements',
        'Encryptions',
        'Entity Groups',
        'Event Tagging',
        'Events',
        'External Users',
        'External Users Mapping',
        'External Users Properties',
        'Function Replacements',
        'Groups of Database Users',
        'Groups of Hosts',
        'Hosts',
        'Instance Properties',
        'Instance Users',
        'LDAP Servers',
        'Large Language Model',
        'Lexicon Groups',
        'Lexicon Items',
        'License Keys',
        'Lua Script',
        'Machine Learning Models',
        'Machine Learning Rules',
        'Masking Caches',
        'Masking Rules',
        'Metadata Columns',
        'Metadata Functions',
        'Metadata Objects',
        'Metadata Schemas',
        'Object Filters',
        'ObjectGroups',
        'Pair of Associated Columns',
        'Periodic Tasks',
        'Proxies',
        'Queries',
        'Queries Map',
        'Query Groups',
        'Resource Manager Deployment',
        'Resource Manager Templates',
        'Results of VA Scanner',
        'Roles',
        'Routine Parameters',
        'Rule Format Preserving Keys',
        'Rule Limits',
        'Rule Subscribers',
        'Rule Users',
        'Rules',
        'SDG Generator Columns',
        'SDG Generators',
        'SDG Results',
        'SDG Task Errors',
        'SSL Key Groups',
        'SSL Keys',
        'SSL Session Cache Entry',
        'SSO Services',
        'Schedules',
        'Security Guidelines',
        'Security Rules',
        'Security Standards',
        'Self Access',
        'Session Cache Entry',
        'Sessions',
        'Sniffers',
        'Sub-item Filter',
        'Subscriber Servers',
        'Subscribers',
        'Syslog Configuration Groups',
        'Syslog Configuration Item',
        'System Settings',
        'Table Reference',
        'Tags',
        'Tasks',
        'Temporary Files',
        'Trailing DB Audit Logs',
        'Update Rules Checker',
        'Users',
        'Web Apps'
    ]
    actions_group_02 = [
        'Audit Cleaning',
        'Audit Storage Changing',
        'Change Audit Partition Enable State Ready ',
        'Change Audit Storage Encryption Settings ',
        'Change Dictionary Encryption Settings ',
        'Change Password Settings',
        'Check Messages Queues',
        'DataSunrise Starting',
        'DataSunrise Stopping',
        'DataSunrise Updating',
        'Dictionary Cleaning',
        'Dictionary Restoring',
        'Discovery Column Content Displaying',
        'Flush',
        'Logs Management',
        'Manual Audit Rotation',
        'Manual Dictionary Backing-up',
        'Monitoring Indicators',
        'Original Query Displaying',
        'Query Bindings Displaying',
        'Query Results Displaying',
        'Reading Database Data',
        'Run System Shell Scripts',
        'Synchronous Flush',
        'View Dynamic Masking Events',
        'View Event Description',
        'View Operation Group',
        'View Query Parsing Errors',
        'View Security Events',
        'View Session Description',
        'View Session Trails',
        'View Top Blocked Queries Per Day',
        'View Transaction Trails',
        'Workers',
    ]


    actions_empty    = [
        'Metadata Functions',
        'Rule Limits',
        'Change Audit Partition Enable State Ready ',
        'Check Messages Queues',
        'Reading database data',
        'Synchronous Flush',
        'Workers',
        'IAC Changeset',
        'IAC Deployment',
        'IAC Resources',
        'IAC Template Parameters',
        'IAC Templates',
        'Database Services',
        'Database Users Properties',
        'Events',
        'External Users',
        'External Users Mapping',
        'External Users Properties',
        'SSL Session Cache Entry',
        'Session Cache Entry',
        'Sub-item Filter',
    ]
    actions_grant    = {
        'Database Interfaces': ' [List, Edit, Insert]',
        'Database Users'     : ' [Delete, List, Edit, Insert, View]',
        'Lua Script'         : ' [List, View]',
    }
    actions_revoke   = {
        'Database Interfaces': ' [List, Edit, Insert]',
        'Database Users'     : ' [Delete, List, Insert, View]',
        'Lua Script'         : ' [List]',
    }
    actions_set      = {
        'Database Interfaces': ' [List, Edit, Insert]',
        'Database Users'     : ' [Insert, View]',
        'Lua Script'         : ' [List]',
        'Users'              : ' [View]',
        'Proxies'            : ' [List, Edit, Insert, View]',
    }
    # -----------------------------------------------------------------------------------------------------------------]
    perm_empty          = ''
    perm_full           = ' [Delete, List, Edit, Insert, View]'
    perm_full_no_insert = ' [Delete, List, Edit, View]'
    perm_execute        = ' [Execute]'
    perm_only_view      = ' [View]'
    # -----------------------------------------------------------------------------------------------------------------]
    sample_ds_users_info = _ds_user.sample_ds_users_info
    sample_ds_user_info  = _ds_user.sample_ds_user_info

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_access_role   = _ds_user.add_access_role
    add_ds_user       = _ds_user.add_ds_user
    # -----------------------------------------------------------------------------------------------------------------]
    upd_access_role   = 'updateAccessRole -name %s -newName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_access_roles = 'showAccessRoles'
    show_access_role  = 'showAccessRole -name %s'
    show_ds_users     = _ds_user.show_ds_users
    show_ds_user      = _ds_user.show_ds_user
    # -----------------------------------------------------------------------------------------------------------------]
    grant_all_perm    = 'grantAllPermToRole -name %s'
    grant_perm        = 'grantPermToRole -name %s ' \
                        '-delete "Database Users" ' \
                        '-list "Database Interfaces,Database Users,Lua Script" ' \
                        '-edit "Database Interfaces,Database Users" ' \
                        '-insert "Database Interfaces,Database Users" ' \
                        '-view "Database Users,Lua Script"'
    set_perm          = 'setPermissionsToRole -name %s ' \
                        '-list "Database Interfaces,Lua Script,Proxies" '\
                        '-edit "Database Interfaces,Proxies" '\
                        '-insert "Database Interfaces,Database Users,Proxies" '\
                        '-view "Database Users,Proxies,Users"'
    revoke_all_perm   = 'revokeAllPermFromRole -name %s'
    revoke_perm       = 'revokePermFromRole -name %s ' \
                        '-edit "Database Users" ' \
                        '-view "Lua Script"'
    # -----------------------------------------------------------------------------------------------------------------]
    del_access_role   = _ds_user.del_access_role

    #
    #
    # MESSAGES
    # =================================================================================================================]
    msg_given_perms   = "The given permissions weren't %s the role"
    msg_all_perms     = "All permissions weren't %s the role"
    msg_tip_for_dev   = '\n' \
                        '\nProbably some new actions for roles were added. Please add new actions to the test list.' \
                        '\nGo to "IntegrationTests/test_cmdline_commands/contexts/role_context.py" ' \
                        '\nand add new actions either to "actions_group_01" or "actions_group_02".' \
                        '\nIf permissions for action remain empty after "grantAllPermToRole" CLI command, ' \
                        '\nplease add this action to the "actions_empty" as well.' \
                        '\n'

    @classmethod
    def create_role_sample(cls, mode='empty'):
        rows_01 = []
        rows_02 = []

        for action in cls.actions_group_01:
            if mode is 'empty' or action in cls.actions_empty or \
                    action not in cls.actions_grant  and mode is 'grant' or \
                    action not in cls.actions_revoke and mode is 'revoke' or \
                    action not in cls.actions_set    and mode is 'set':
                rows_01.append(cls.action_row_template % (action, cls.perm_empty))
            elif mode is 'full':
                if action == 'AI Detection of Users':
                    rows_01.append(cls.action_row_template % (action, cls.perm_full_no_insert))
                elif action == 'Security Guidelines':
                    rows_01.append(cls.action_row_template % (action, cls.perm_only_view))
                elif action == 'Update Rules Checker':
                    rows_01.append(cls.action_row_template % (action, cls.perm_empty))
                else:
                    rows_01.append(cls.action_row_template % (action, cls.perm_full))
            elif mode is 'grant':
                if action in cls.actions_grant:
                    rows_01.append(cls.action_row_template % (action, cls.actions_grant.get(action)))
            elif mode is 'revoke':
                if action in cls.actions_revoke:
                    rows_01.append(cls.action_row_template % (action, cls.actions_revoke.get(action)))
            elif mode is 'set':
                if action in cls.actions_set:
                    rows_01.append(cls.action_row_template % (action, cls.actions_set.get(action)))
        for action in cls.actions_group_02:
            if mode is 'empty' or action in cls.actions_empty or \
                    action not in cls.actions_grant  and mode is 'grant' or \
                    action not in cls.actions_revoke and mode is 'revoke' or \
                    action not in cls.actions_set    and mode is 'set':
                rows_02.append(cls.action_row_template % (action, cls.perm_empty))
            elif mode is 'full':
                rows_02.append(cls.action_row_template % (action, cls.perm_execute))
            elif mode is 'grant':
                if action in cls.actions_grant:
                    rows_02.append(cls.action_row_template % (action, cls.actions_grant.get(action)))
            elif mode is 'revoke':
                if action in cls.actions_revoke:
                    rows_02.append(cls.action_row_template % (action, cls.actions_revoke.get(action)))
            elif mode is 'set':
                if action in cls.actions_set:
                    rows_02.append(cls.action_row_template % (action, cls.actions_set.get(action)))

        _sample = cls.actions_list_template.format(group_1='\n'.join(rows_01), group_2='\n'.join(rows_02))

        return _sample
