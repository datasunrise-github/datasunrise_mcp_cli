from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from textwrap import dedent as sample


class DataSunriseUserContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    ds_user_custom = _base.prefix + 'ds_user'
    # -----------------------------------------------------------------------------------------------------------------]
    role_01 = 'Operator'
    role_02 = 'DataSunrise Admin'
    # -----------------------------------------------------------------------------------------------------------------]
    role_custom_01 = _base.prefix   + 'role'
    role_custom_02 = _base.prefix_s + 'Role'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_default_ds_users = sample('''\
        DataSunrise Users:
        admin

        OK
    ''')
    sample_ds_users_info    = sample('''\
        DataSunrise Users:
        admin
        %s

        OK
    ''')
    sample_ds_user_info     = sample('''\
        Login                               : %s
        E-mail                              :
        Role                                : [%s]
        Two-Factor Authentication           : Disabled
        AD Authentication                   : No
        Allow logging from:
        Deny logging from:
        
        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_access_role = 'addAccessRole -name %s'
    add_ds_user     = 'addDsUser -login %s -password %s -role %s'
    # -----------------------------------------------------------------------------------------------------------------]
    upd_ds_user     = 'updateDsUser -login %s -role %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_ds_users   = 'showDsUsers'
    show_ds_user    = 'showDsUser -login %s'
    # -----------------------------------------------------------------------------------------------------------------]
    change_user_pwd = 'changePwd -login %s -currentPwd %s -newPwd %s'
    # -----------------------------------------------------------------------------------------------------------------]
    del_ds_user     = 'delDsUser -login %s'
    del_access_role = 'delAccessRole -name %s'

    @classmethod
    def setup_tests(cls):
        pass
        # role_01 = cls.role_01
        # role_02 = cls.role_02
        # role_01_in = cls.sws(role_01)
        # role_02_in = cls.sws(role_02)
        #
        # cls.execute(cls.add_access_role % role_01_in)
        # cls.execute(cls.add_access_role % role_02_in)

    @classmethod
    def cleanup_tests(cls):
        pass
        # role_01 = cls.role_01
        # role_02 = cls.role_02
        # role_01_in = cls.sws(role_01)
        # role_02_in = cls.sws(role_02)
        #
        # cls.execute(cls.del_access_role % role_01_in)
        # cls.execute(cls.del_access_role % role_02_in)
