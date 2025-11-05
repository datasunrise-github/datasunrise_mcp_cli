import sys
import os
# Add the mcp-client directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../../Users/davegornshtein/mcp-client')))

from mcp_client import DataSunriseMCPClient
from test_cmdline_commands.contexts.discovery_context import DiscoveryContext
import pytest
import re


class TestDiscovery(DiscoveryContext):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mcp_client = DataSunriseMCPClient()
        # TODO: Replace with actual login credentials
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            print("MCP Client connection failed for TestDiscovery. Tests may not run correctly.")
            # Consider pytest.skip("MCP Client connection failed.")

    def test_add_discovery_group_01(self):
        obj = 'discovery group'
        nl = '\n'
        group = self.disc_gr_01

        out = self.mcp_client.discovery_group_show_all()
        assert not re.search(nl + group + nl, self.out_fix(out.get('data', ''))), \
            self.msg_already_exists % obj

        self.mcp_client.discovery_group_add(name=group)

        out = self.mcp_client.discovery_group_show_all()
        assert re.search(nl + group + nl, self.out_fix(out.get('data', ''))), \
            self.msg_wasnt_created % obj

        out = self.mcp_client.discovery_group_show_one(name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_disc_group_no_attr_info % group, \
            self.msg_wasnt_created % obj

    def test_copy_discovery_group_01(self):
        obj = 'discovery group'
        nl = '\n'
        copy_suffix = self.disc_gr_copy # This is " Copy"
        original_group_name = self.disc_gr_01
        copied_group_name = original_group_name + copy_suffix # Test expects this name

        # MCP tool default newName might be different, so we specify it
        self.mcp_client.discovery_group_copy(name=original_group_name, new_name=copied_group_name)

        out = self.mcp_client.discovery_group_show_all()
        # The original assertion checks for "groupname Copy\n"
        # Need to adjust regex if nl + group + copy + nl is too specific or if output format differs
        assert re.search(nl + re.escape(copied_group_name) + nl, self.out_fix(out.get('data', ''))), \
            self.msg_wasnt_copied % obj

    def test_add_discovery_attribute_01(self):
        obj = 'discovery attribute'
        attr = self.disc_attr_01
        group = self.disc_gr_01

        out = self.mcp_client.discovery_group_show_one(name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_disc_group_no_attr_info % group, \
            self.msg_already_exists % obj
        
        # Using default parameters for the attribute as per original test's simplicity
        self.mcp_client.discovery_attribute_add(group=group, name=attr)

        out = self.mcp_client.discovery_attribute_show(group=group, name=attr)
        assert self.out_fix(out.get('data', '')) == self.sample_disc_attr_info % attr, \
            self.msg_wasnt_created % obj

    def test_update_discovery_group_01_02(self):
        obj = 'discovery group'
        attr = self.disc_attr_01 # This attribute is in group_01
        group_01 = self.disc_gr_01
        group_02 = self.disc_gr_02

        self.mcp_client.discovery_group_update(name=group_01, new_name=group_02)

        out = self.mcp_client.discovery_group_show_one(name=group_02)
        assert self.out_fix(out.get('data', '')) == self.sample_disc_group_with_attr_info % (group_02, attr), \
            self.msg_wasnt_updated % obj

    def test_copy_discovery_group_02(self):
        obj = 'discovery group'
        nl = '\n'
        copy_suffix = self.disc_gr_copy
        original_group_name = self.disc_gr_02 # This group now contains attr_01
        copied_group_name = original_group_name + copy_suffix

        self.mcp_client.discovery_group_copy(name=original_group_name, new_name=copied_group_name)

        out = self.mcp_client.discovery_group_show_all()
        assert re.search(nl + re.escape(copied_group_name) + nl, self.out_fix(out.get('data', ''))), \
            self.msg_wasnt_copied % obj

    def test_update_discovery_attribute_01_02(self):
        obj = 'discovery attribute'
        attr_01 = self.disc_attr_01 # Original name
        attr_02 = self.disc_attr_02 # New name
        group = self.disc_gr_02 # Group was updated, contains attr_01

        self.mcp_client.discovery_attribute_update(group=group, name=attr_01, new_name=attr_02)

        out = self.mcp_client.discovery_attribute_show(group=group, name=attr_02)
        assert self.out_fix(out.get('data', '')) == self.sample_disc_attr_info % attr_02, \
            self.msg_wasnt_updated % obj

    def test_delete_discovery_attribute_02(self):
        obj = 'discovery attribute'
        attr = self.disc_attr_02 # Name is now attr_02
        group = self.disc_gr_02

        out = self.mcp_client.discovery_attribute_show(group=group, name=attr)
        assert self.out_fix(out.get('data', '')) == self.sample_disc_attr_info % attr, \
            self.msg_isnt_such % obj

        self.mcp_client.discovery_attribute_delete(group=group, name=attr)

        out = self.mcp_client.discovery_group_show_one(name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_disc_group_no_attr_info % group, \
            self.msg_wasnt_deleted % obj

    def test_delete_discovery_group_02(self):
        obj = 'discovery group'
        nl = '\n'
        group = self.disc_gr_02

        out = self.mcp_client.discovery_group_show_all()
        assert re.search(nl + group + nl, self.out_fix(out.get('data', ''))), \
            self.msg_isnt_such % obj

        self.mcp_client.discovery_group_delete(name=group)

        out = self.mcp_client.discovery_group_show_all()
        assert not re.search(nl + group + nl, self.out_fix(out.get('data', ''))), \
            self.msg_wasnt_deleted % obj

    # Note: The cleanup_tests classmethod in DiscoveryContext is not modified here.
    # If it's invoked, it will use the old self.execute method.
    # This might require further refactoring of the test framework itself.
