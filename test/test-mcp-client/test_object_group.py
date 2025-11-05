import sys
import os
# Add the mcp-client directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../../Users/davegornshtein/mcp-client')))

from mcp_client import DataSunriseMCPClient
from test_cmdline_commands.contexts.object_group_context import ObjectGroupContext
import pytest


class TestObjectGroups(ObjectGroupContext):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mcp_client = DataSunriseMCPClient()
        # TODO: Replace with actual login credentials
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            print("MCP Client connection failed for TestObjectGroups. Tests may not run correctly.")
            # Consider pytest.skip("MCP Client connection failed.")

    def test_add_object_group_01(self):
        obj = 'object group'
        group = self.obj_gr_01

        out = self.mcp_client.object_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_object_groups, \
            self.msg_already_exist % obj + 's'

        self.mcp_client.object_group_add(name=group)

        out = self.mcp_client.object_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_object_groups_info % group, \
            self.msg_wasnt_created % obj

        out = self.mcp_client.object_group_show_one(name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_object_group_info % group, \
            self.msg_wasnt_created % obj

    def test_update_object_group_01_02(self):
        obj = 'object group'
        group_01 = self.obj_gr_01
        group_02 = self.obj_gr_02

        self.mcp_client.object_group_update(name=group_01, new_name=group_02)

        out = self.mcp_client.object_group_show_one(name=group_02)
        assert self.out_fix(out.get('data', '')) == self.sample_object_group_info % group_02, \
            self.msg_wasnt_updated % obj

    def test_delete_object_group_02(self):
        obj = 'object group'
        group = self.obj_gr_02 # This was group_01 renamed to group_02

        out = self.mcp_client.object_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_object_groups_info % group, \
            self.msg_isnt_such % obj

        self.mcp_client.object_group_delete(name=group)

        out = self.mcp_client.object_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_object_groups, \
            self.msg_wasnt_deleted % obj

    def test_add_object_group_02(self): # Re-adding group_02
        obj = 'object group'
        group = self.obj_gr_02

        out = self.mcp_client.object_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_object_groups, \
            self.msg_already_exist % obj + 's'

        self.mcp_client.object_group_add(name=group)

        out = self.mcp_client.object_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_object_groups_info % group, \
            self.msg_wasnt_created % obj

        out = self.mcp_client.object_group_show_one(name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_object_group_info % group, \
            self.msg_wasnt_created % obj

    def test_update_object_group_02_01(self): # Renaming group_02 back to group_01
        obj = 'object group'
        group_01_current_name = self.obj_gr_02
        group_02_new_name = self.obj_gr_01

        self.mcp_client.object_group_update(name=group_01_current_name, new_name=group_02_new_name)

        out = self.mcp_client.object_group_show_one(name=group_02_new_name)
        assert self.out_fix(out.get('data', '')) == self.sample_object_group_info % group_02_new_name, \
            self.msg_wasnt_updated % obj

    def test_delete_object_group_01(self): # Deleting group_01 (which was group_02, then renamed to group_01)
        obj = 'object group'
        group = self.obj_gr_01

        out = self.mcp_client.object_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_object_groups_info % group, \
            self.msg_isnt_such % obj

        self.mcp_client.object_group_delete(name=group)

        out = self.mcp_client.object_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_object_groups, \
            self.msg_wasnt_deleted % obj
