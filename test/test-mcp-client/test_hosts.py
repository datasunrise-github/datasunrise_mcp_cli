import sys
import os
# Add the mcp-client directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../../Users/davegornshtein/mcp-client')))

from mcp_client import DataSunriseMCPClient
from test_cmdline_commands.contexts.hosts_context import HostsContext
import pytest


class TestHosts(HostsContext):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mcp_client = DataSunriseMCPClient()
        # TODO: Replace with actual login credentials
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            print("MCP Client connection failed for TestHosts. Tests may not run correctly.")
            # Consider pytest.skip("MCP Client connection failed.")

    def test_add_host_01(self):
        obj = 'host'
        host_name = self.host_name
        host_addr = self.host_addr_01

        out = self.mcp_client.host_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_hosts, \
            self.msg_already_exists % obj

        self.mcp_client.host_add(name=host_name, host_address=host_addr)

        out = self.mcp_client.host_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_hosts_info % host_name, \
            self.msg_wasnt_created % obj

        out = self.mcp_client.host_show_one(name=host_name)
        assert self.out_fix(out.get('data', '')) == self.sample_host_info % (host_name, host_addr), \
            self.msg_wasnt_created % obj

    def test_add_host_group_01(self):
        obj = 'host group'
        host = self.host_name
        group = self.host_gr_01

        out = self.mcp_client.host_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_host_groups, \
            self.msg_already_exists % obj

        self.mcp_client.host_group_add(name=group, add_members=host)

        out = self.mcp_client.host_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_host_groups_info % group, \
            self.msg_wasnt_created % obj

        out = self.mcp_client.host_group_show_one(name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_host_group_info % (group, host), \
            self.msg_wasnt_created % obj

    def test_update_host_01_02(self):
        obj = 'host'
        host_name = self.host_name
        host_addr_new = self.host_addr_02 # New address for update

        self.mcp_client.host_update(name=host_name, host_address=host_addr_new)

        out = self.mcp_client.host_show_one(name=host_name)
        assert self.out_fix(out.get('data', '')) == self.sample_host_info % (host_name, host_addr_new), \
            self.msg_wasnt_updated % obj
        
        # The original test calls update twice with the same new address. Replicating.
        self.mcp_client.host_update(name=host_name, host_address=host_addr_new)


    def test_update_host_group_01_02(self):
        obj = 'host group'
        host = self.host_name # Member of the group
        group_01 = self.host_gr_01
        group_02 = self.host_gr_02

        self.mcp_client.host_group_update(name=group_01, new_name=group_02)

        out = self.mcp_client.host_group_show_one(name=group_02)
        assert self.out_fix(out.get('data', '')) == self.sample_host_group_info % (group_02, host), \
            self.msg_wasnt_updated % obj

        # Revert name for consistency if other tests depend on group_01
        self.mcp_client.host_group_update(name=group_02, new_name=group_01)

    def test_delete_host_group_01(self):
        obj = 'host group'
        group = self.host_gr_01 # Name was reverted in previous test

        out = self.mcp_client.host_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_host_groups_info % group, \
            self.msg_isnt_such % obj

        self.mcp_client.host_group_delete(name=group)

        out = self.mcp_client.host_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_host_groups, \
            self.msg_wasnt_deleted % obj

    def test_delete_host_01(self):
        obj = 'host'
        host = self.host_name

        out = self.mcp_client.host_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_hosts_info % host, \
            self.msg_isnt_such % obj

        self.mcp_client.host_delete(name=host)

        out = self.mcp_client.host_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_hosts, \
            self.msg_wasnt_deleted % obj
