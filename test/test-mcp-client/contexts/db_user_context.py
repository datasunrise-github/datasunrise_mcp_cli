from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from test_cmdline_commands.contexts.instance_context import InstanceContext as _instance
from textwrap import dedent as sample


class DatabaseUserContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    instance_name = _instance.instance_name
    db_pwd        = _instance.db_pwd
    # -----------------------------------------------------------------------------------------------------------------]
    db_user_custom_01 = _base.prefix   + 'db_user'
    db_user_custom_02 = _base.prefix_s + 'DB User'
    db_user_gr_custom_01 = _base.prefix   + 'db_user_gr'
    db_user_gr_custom_02 = _base.prefix_s + 'DB User Group'
    # -----------------------------------------------------------------------------------------------------------------]
    user_map_type = 'config'
    ad_user = _base.prefix + 'ad_user'
    # -----------------------------------------------------------------------------------------------------------------]
    ldap_name     = _base.prefix + 'ldap_server'
    ldap_name_upd = _base.unique_id + ldap_name
    ldap_host = '192.168.1.51'
    ldap_port = '389'
    ldap_default = 'true'
    ldap_basedn = 'cn=users,dc=db,dc=local'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]

    # =================================================================================================================]
    sample_db_user_info              = sample('''\
        Name                 : %s

        OK
    ''')
    # -----------------------------------------------------------------------------------------------------------------]
    sample_no_db_user_groups         = sample('''\
        No Database User Groups

        OK
    ''')
    sample_db_user_groups_info       = sample('''\
        Database User Groups:
        %s

        OK
    ''')
    sample_db_user_group_info        = sample('''\
        Name                 : %s
        Member               : %s
        
        OK
    ''')
    # -----------------------------------------------------------------------------------------------------------------]
    sample_no_db_user_mappings       = sample('''\
        No Mappings
        
        OK
    ''')
    # -----------------------------------------------------------------------------------------------------------------]
    sample_no_ldap_servers           = sample('''\
        No LDAP Servers

        OK
    ''')
    sample_ldap_server_info          = sample('''\
        Logical Name         : %s
        Address              : %s:%s
        Login Type           : Microsoft Active Directory
        Login                :
        Cyber Ark Safe       :
        Cyber Ark Folder     :
        Cyber Ark Object     :
        Domain               :
        Base DN              : %s
        User Filter          : (&(objectCategory=User)(sAMAccountName=<name>))
        Group Attribute      : memberOf
        Default              : true
        SSL                  : true

        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_db_user       = 'addDbUser -name %s'
    add_db_user_gr    = 'addDbUserGr -name %s -addMembers %s'
    add_db_user_map   = 'addDbUserMapping -instance %s -adLogin %s -dbLogin %s -dbPassword %s -ldapServer %s'

    add_ldap_server   = 'addLdapServer -name %s -host %s -port %s -default %s -baseDn %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_db_user       = 'updateDbUser -name %s -newName %s'
    upd_db_user_gr    = 'updateDbUserGr -name %s -newName %s'
    upd_ldap_server   = 'updateLdapServer -name %s -newName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_db_users     = 'showDbUsers'                                                                       # NO SAMPLE
    show_db_user      = 'showDbUser -name %s'
    show_db_user_grs  = 'showDbUserGroups'
    show_db_user_gr   = 'showDbUserGr -name %s'
    show_db_user_map  = 'showAdDbUserMapping -instance %s'                                                  # NO SAMPLE
    show_ldap_servers = 'showLdapServers'                                                                   # NO SAMPLE
    show_ldap_server  = 'showLdapServer -name %s'
    # -----------------------------------------------------------------------------------------------------------------]
    enable_user_map   = 'updateAuthMappingConfig -instance %s -mapType %s'
    disable_user_map  = 'disableDbUserMapping -instance %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_db_user       = 'delDbUser -name %s'
    del_db_user_gr    = 'delDbUserGr -name %s'
    del_db_user_map   = 'delDbUserMapping -instance %s -adLogin %s'
    del_ldap_server   = 'delLdapServer -name %s'
