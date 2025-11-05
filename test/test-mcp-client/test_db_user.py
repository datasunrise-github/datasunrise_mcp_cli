import sys
import os
# Add the mcp-client directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../../Users/davegornshtein/mcp-client')))

from mcp_client import DataSunriseMCPClient
from test_cmdline_commands.contexts.db_user_context import DatabaseUserContext
from test_cmdline_commands.contexts.create_instance_context import create_instance_context
from framework.base.ContextsManager import with_context
import pytest # Though not explicitly used in this class, often good to have for test files
import re


@with_context(create_instance_context(False))
class TestDatabaseUser(DatabaseUserContext):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mcp_client = DataSunriseMCPClient()
        # TODO: Replace with actual login credentials
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            print("MCP Client connection failed for TestDatabaseUser. Tests may not run correctly.")
            # Consider pytest.skip("MCP Client connection failed.")

    def test_add_database_user_01(self):
        obj = 'database user'
        nl = '\n'
        user = self.db_user_custom_01

        out = self.mcp_client.db_user_show_all()
        assert not re.search(nl + user + nl, self.out_fix(out.get('data', ''))), \
            self.msg_already_exists % obj

        self.mcp_client.db_user_add(name=user)

        out = self.mcp_client.db_user_show_all()
        assert re.search(nl + user + nl, self.out_fix(out.get('data', ''))), \
            self.msg_wasnt_created % obj

        out = self.mcp_client.db_user_show_one(name=user)
        assert self.out_fix(out.get('data', '')) == self.sample_db_user_info % user, \
            self.msg_wasnt_created % obj

    def test_add_database_user_group_01(self):
        obj = 'database user group'
        user = self.db_user_custom_01
        group = self.db_user_gr_custom_01

        out = self.mcp_client.db_user_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_db_user_groups, \
            self.msg_already_exists % obj

        self.mcp_client.db_user_group_add(name=group, add_members=user)

        out = self.mcp_client.db_user_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_db_user_groups_info % group, \
            self.msg_wasnt_created % obj

        out = self.mcp_client.db_user_group_show_one(name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_db_user_group_info % (group, user), \
            self.msg_wasnt_created % obj

    def test_update_database_user_01_02(self):
        obj = 'database user'
        user_01 = self.db_user_custom_01
        user_02 = self.db_user_custom_02

        self.mcp_client.db_user_update(name=user_01, new_name=user_02)

        out = self.mcp_client.db_user_show_one(name=user_02)
        assert self.out_fix(out.get('data', '')) == self.sample_db_user_info % user_02, \
            self.msg_wasnt_updated % obj

    def test_update_database_user_group_01_02(self):
        obj = 'database user group'
        user = self.db_user_custom_02 # User was updated in previous test
        group_01 = self.db_user_gr_custom_01
        group_02 = self.db_user_gr_custom_02

        self.mcp_client.db_user_group_update(name=group_01, new_name=group_02) # Members are not re-added here

        out = self.mcp_client.db_user_group_show_one(name=group_02)
        # The sample expects the user to still be a member. If update doesn't preserve members, this might fail.
        # Assuming update only changes name if add_members/remove_members are not specified.
        # The original test implies members are preserved or re-associated.
        # For the MCP client, if update needs explicit member handling, the client method or test needs adjustment.
        # Current db_user_group_update in client only sets newName if addMembers/removeMembers are None.
        # To match original behavior, we might need to fetch members of group_01 and pass them to update,
        # or assume the test context implies the user is still associated with the renamed group.
        # For now, assuming the sample_db_user_group_info % (group_02, user) is still valid.
        # If the group was empty after rename, this would be: self.sample_db_user_group_info_empty % group_02
        # The original test implies 'user' (db_user_custom_02) is expected.
        # This means the group, when renamed, should still contain its original members.
        # The current client method for group update does not explicitly re-add members.
        # Let's assume the system handles member preservation on rename.
        assert self.out_fix(out.get('data', '')) == self.sample_db_user_group_info % (group_02, user), \
            self.msg_wasnt_updated % obj


    def test_delete_database_user_group_02(self):
        obj = 'database user group'
        group = self.db_user_gr_custom_02

        out = self.mcp_client.db_user_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_db_user_groups_info % group, \
            self.msg_isnt_such % obj

        self.mcp_client.db_user_group_delete(name=group)

        out = self.mcp_client.db_user_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_db_user_groups, \
            self.msg_wasnt_deleted % obj

    def test_delete_database_user_02(self):
        obj = 'database user'
        nl = '\n'
        user = self.db_user_custom_02

        out = self.mcp_client.db_user_show_all()
        assert re.search(nl + user + nl, self.out_fix(out.get('data', ''))), \
            self.msg_isnt_such % obj

        self.mcp_client.db_user_delete(name=user)

        out = self.mcp_client.db_user_show_all()
        assert not re.search(nl + user + nl, self.out_fix(out.get('data', ''))), \
            self.msg_wasnt_deleted % obj

    def test_enable_user_mapping(self):
        instance = self.instance_name
        map_type = self.user_map_type
        self.mcp_client.db_user_mapping_enable(instance=instance, map_type=map_type)
        # Original test has no assertion, so we keep it that way.

    def test_add_ldap_server(self):
        obj = 'LDAP server'
        s = ' '
        col = ":"
        name = self.ldap_name
        host = self.ldap_host
        port = self.ldap_port
        default_str = self.ldap_default # This is 'true' or 'false' as string
        default_bool = default_str.lower() == 'true'
        basedn = self.ldap_basedn

        out = self.mcp_client.ldap_server_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_ldap_servers, \
            self.msg_already_exists % obj

        self.mcp_client.ldap_server_add(name=name, host=host, port=port, default=default_bool, base_dn=basedn)

        out = self.mcp_client.ldap_server_show_all()
        out_fix_data = self.out_fix(out.get('data', ''))
        assert (re.search(s + name + s, out_fix_data) and re.search(host + col + port, out_fix_data)), \
            self.msg_wasnt_created % obj

        out = self.mcp_client.ldap_server_show_one(name=name)
        # del out [0] # This was for CLI list output, MCP client returns dict.
        assert self.out_fix(out.get('data', '')) == self.sample_ldap_server_info % (name, host, port, basedn), \
            self.msg_wasnt_created % obj

    def test_update_ldap_server(self):
        obj = 'LDAP server'
        name = self.ldap_name
        name_upd = self.ldap_name_upd
        host = self.ldap_host # Expected to remain after rename
        port = self.ldap_port # Expected to remain after rename
        basedn = self.ldap_basedn # Expected to remain after rename

        self.mcp_client.ldap_server_update(name=name, new_name=name_upd)

        out = self.mcp_client.ldap_server_show_one(name=name_upd)
        # del out [0] # Not needed for MCP client
        assert self.out_fix(out.get('data', '')) == self.sample_ldap_server_info % (name_upd, host, port, basedn), \
            self.msg_wasnt_updated % obj

        self.mcp_client.ldap_server_update(name=name_upd, new_name=name) # Revert name for subsequent tests

    def test_add_database_user_mapping(self):
        obj = 'database user mapping'
        s = ' '
        nl = '\n'
        instance = self.instance_name
        ad_user = self.ad_user
        db_user = self.db_user_custom_01 # This user should exist from test_add_database_user_01
        db_pwd  = self.db_pwd
        ldap_sv = self.ldap_name # LDAP server added in a previous test

        out = self.mcp_client.db_user_mapping_show(instance=instance)
        assert self.out_fix(out.get('data', '')) == self.sample_no_db_user_mappings, \
            self.msg_already_exists % obj

        self.mcp_client.db_user_mapping_add(inst=instance, ad_login=ad_user, db_login=db_user, db_password=db_pwd, ldap_server=ldap_sv)

        out = self.mcp_client.db_user_mapping_show(instance=instance)
        out_fix_data = self.out_fix(out.get('data', ''))
        assert (re.search(nl + ad_user + s, out_fix_data) and re.search(s + db_user + nl, out_fix_data)), \
            self.msg_wasnt_created % obj

    def test_delete_database_user_mapping(self):
        obj = 'database user mapping'
        s = ' '
        nl = '\n'
        instance = self.instance_name
        ad_user = self.ad_user
        db_user = self.db_user_custom_01 # Assuming this is the mapped user

        out = self.mcp_client.db_user_mapping_show(instance=instance)
        out_fix_data = self.out_fix(out.get('data', ''))
        assert (re.search(nl + ad_user + s, out_fix_data) and re.search(s + db_user + nl, out_fix_data)), \
            self.msg_isnt_such % obj

        self.mcp_client.db_user_mapping_delete(instance=instance, ad_login=ad_user)

        out = self.mcp_client.db_user_mapping_show(instance=instance)
        assert self.out_fix(out.get('data', '')) == self.sample_no_db_user_mappings, \
            self.msg_wasnt_deleted % obj

    def test_delete_ldap_server(self):
        obj = 'LDAP server'
        s = ' '
        col = ":"
        name = self.ldap_name # Name was reverted in test_update_ldap_server
        host = self.ldap_host
        port = self.ldap_port

        out = self.mcp_client.ldap_server_show_all()
        out_fix_data = self.out_fix(out.get('data', ''))
        assert (re.search(s + name + s, out_fix_data) and re.search(host + col + port, out_fix_data)), \
            self.msg_isnt_such % obj

        self.mcp_client.ldap_server_delete(name=name)

        out = self.mcp_client.ldap_server_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_ldap_servers, \
            self.msg_wasnt_deleted % obj

    def test_disable_user_mapping(self):
        instance = self.instance_name
        self.mcp_client.db_user_mapping_disable(instance=instance)
        # Original test has no assertion.
