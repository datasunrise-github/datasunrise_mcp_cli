import sys
import os
# Add the mcp-client directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../../Users/davegornshtein/mcp-client')))

from mcp_client import DataSunriseMCPClient
from test_cmdline_commands.contexts.cef_context import CEFContext
import pytest


class TestCEF(CEFContext):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mcp_client = DataSunriseMCPClient()
        # TODO: Replace with actual login credentials
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            print("MCP Client connection failed for TestCEF. Tests may not run correctly.")
            # Consider pytest.skip("MCP Client connection failed.")

    def test_add_cef_group_01(self):
        obj = 'group'
        group = self.cef_group_01

        out = self.mcp_client.cef_show_groups()
        assert self.out_fix(out.get('data', '')) == self.sample_default_cef_groups, \
            self.msg_cef_already_exists % obj

        self.mcp_client.cef_add_group(name=group)

        out = self.mcp_client.cef_show_groups()
        assert self.out_fix(out.get('data', '')) == self.sample_cef_groups_info % group, \
            self.msg_cef_wasnt_created % obj

        out = self.mcp_client.cef_show_group(name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_cef_group_no_item_info % group, \
            self.msg_cef_wasnt_created % obj

    def test_add_cef_item_01(self):
        obj = 'item'
        item = self.cef_item_01
        group = self.cef_group_01
        cef_type = self.cef_type
        cef_code = self.cef_code

        out = self.mcp_client.cef_show_items(group_name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_no_cef_items, \
            self.msg_cef_already_exists % obj

        self.mcp_client.cef_add_item(name=item, group_name=group, type=cef_type, cef=cef_code)

        out = self.mcp_client.cef_show_items(group_name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_cef_items_info % item, \
            self.msg_cef_wasnt_created % obj

        out = self.mcp_client.cef_show_item(name=item, group_name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_cef_item_info % (item, cef_code), \
            self.msg_cef_wasnt_created % obj

    def test_update_cef_group_01_02(self):
        obj = 'group'
        group_01 = self.cef_group_01
        group_02 = self.cef_group_02
        item = self.cef_item_01
        cef_code = self.cef_code

        self.mcp_client.cef_update_group(name=group_01, new_name=group_02)

        out = self.mcp_client.cef_show_group(name=group_02)
        assert self.out_fix(out.get('data', '')) == self.sample_cef_group_with_item_info % (group_02, item, cef_code), \
            self.msg_cef_wasnt_updated % obj

    def test_update_cef_item_01_02(self):
        obj = 'item'
        item_01 = self.cef_item_01
        item_02 = self.cef_item_02
        group = self.cef_group_02 # Group was updated in previous test
        cef_code = self.cef_code # Original cef_code is used for update

        self.mcp_client.cef_update_item(name=item_01, group_name=group, new_name=item_02, cef=cef_code)

        out = self.mcp_client.cef_show_item(name=item_02, group_name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_cef_item_info % (item_02, cef_code), \
            self.msg_cef_wasnt_updated % obj

    def test_delete_cef_item_02(self):
        obj = 'item'
        item = self.cef_item_02 # Item was updated in previous test
        group = self.cef_group_02 # Group was updated
        cef_code = self.cef_code

        out = self.mcp_client.cef_show_item(name=item, group_name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_cef_item_info % (item, cef_code), \
            self.msg_isnt_such_cef % obj

        self.mcp_client.cef_delete_item(name=item, group_name=group)

        out = self.mcp_client.cef_show_items(group_name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_no_cef_items, \
            self.msg_wasnt_deleted % obj

    def test_delete_cef_group_02(self):
        obj = 'group'
        group = self.cef_group_02 # Group was updated

        out = self.mcp_client.cef_show_group(name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_cef_group_no_item_info % group, \
            self.msg_isnt_such_cef % obj

        self.mcp_client.cef_delete_group(name=group)

        out = self.mcp_client.cef_show_groups()
        assert self.out_fix(out.get('data', '')) == self.sample_default_cef_groups, \
            self.msg_cef_wasnt_deleted % obj

    def test_add_cef_group_02(self): # This test re-adds cef_group_02
        obj = 'group'
        group = self.cef_group_02

        out = self.mcp_client.cef_show_groups()
        assert self.out_fix(out.get('data', '')) == self.sample_default_cef_groups, \
            self.msg_cef_already_exists % obj

        self.mcp_client.cef_add_group(name=group)

        out = self.mcp_client.cef_show_groups()
        assert self.out_fix(out.get('data', '')) == self.sample_cef_groups_info % group, \
            self.msg_cef_wasnt_created % obj

        out = self.mcp_client.cef_show_group(name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_cef_group_no_item_info % group, \
            self.msg_cef_wasnt_created % obj

    def test_add_cef_item_02(self): # This test re-adds cef_item_02 to cef_group_02
        obj = 'item'
        item = self.cef_item_02
        group = self.cef_group_02
        cef_type = self.cef_type
        cef_code = self.cef_code

        out = self.mcp_client.cef_show_items(group_name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_no_cef_items, \
            self.msg_cef_already_exists % obj

        self.mcp_client.cef_add_item(name=item, group_name=group, type=cef_type, cef=cef_code)

        out = self.mcp_client.cef_show_items(group_name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_cef_items_info % item, \
            self.msg_cef_wasnt_created % obj

        out = self.mcp_client.cef_show_item(name=item, group_name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_cef_item_info % (item, cef_code), \
            self.msg_cef_wasnt_created % obj

    def test_update_cef_group_02_01(self): # group_02 (current) to group_01 (new)
        obj = 'group'
        group_01_orig_name = self.cef_group_02 # Current name
        group_02_new_name = self.cef_group_01  # New name
        item = self.cef_item_02 # Item is in group_01_orig_name
        cef_code = self.cef_code

        self.mcp_client.cef_update_group(name=group_01_orig_name, new_name=group_02_new_name)

        out = self.mcp_client.cef_show_group(name=group_02_new_name) # Show by new name
        assert self.out_fix(out.get('data', '')) == self.sample_cef_group_with_item_info % (group_02_new_name, item, cef_code), \
            self.msg_cef_wasnt_updated % obj

    def test_update_cef_item_02_01(self): # item_02 (current) to item_01 (new) in group_01 (which was group_02)
        obj = 'item'
        item_01_orig_name = self.cef_item_02 # Current name
        item_02_new_name = self.cef_item_01  # New name
        group = self.cef_group_01 # Group name is now cef_group_01
        cef_code = self.cef_code

        self.mcp_client.cef_update_item(name=item_01_orig_name, group_name=group, new_name=item_02_new_name, cef=cef_code)

        out = self.mcp_client.cef_show_item(name=item_02_new_name, group_name=group) # Show by new name
        assert self.out_fix(out.get('data', '')) == self.sample_cef_item_info % (item_02_new_name, cef_code), \
            self.msg_cef_wasnt_updated % obj

    def test_delete_cef_item_01(self): # item_01 (which was item_02) from group_01 (which was group_02)
        obj = 'item'
        item = self.cef_item_01 # Item name is now cef_item_01
        group = self.cef_group_01 # Group name is now cef_group_01
        cef_code = self.cef_code

        out = self.mcp_client.cef_show_item(name=item, group_name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_cef_item_info % (item, cef_code), \
            self.msg_isnt_such_cef % obj

        self.mcp_client.cef_delete_item(name=item, group_name=group)

        out = self.mcp_client.cef_show_items(group_name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_no_cef_items, \
            self.msg_wasnt_deleted % obj

    def test_delete_cef_group_01(self): # group_01 (which was group_02)
        obj = 'group'
        group = self.cef_group_01 # Group name is now cef_group_01

        out = self.mcp_client.cef_show_group(name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_cef_group_no_item_info % group, \
            self.msg_isnt_such_cef % obj

        self.mcp_client.cef_delete_group(name=group)

        out = self.mcp_client.cef_show_groups()
        assert self.out_fix(out.get('data', '')) == self.sample_default_cef_groups, \
            self.msg_cef_wasnt_deleted % obj
