import sys
import os
# Add the mcp-client directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../../Users/davegornshtein/mcp-client')))

from mcp_client import DataSunriseMCPClient
from test_cmdline_commands.contexts.query_group_context import QueryGroupContext
import pytest


class TestQueryGroups(QueryGroupContext):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mcp_client = DataSunriseMCPClient()
        # TODO: Replace with actual login credentials
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            print("MCP Client connection failed for TestQueryGroups. Tests may not run correctly.")
            # Consider pytest.skip("MCP Client connection failed.")

    def test_add_query_group_01(self):
        obj = 'query group'
        group = self.query_gr_01

        out = self.mcp_client.query_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_query_groups, \
            self.msg_already_exist % obj + 's'

        self.mcp_client.query_group_add(name=group)

        out = self.mcp_client.query_group_show_all()
        # The sample_query_groups_info might need adjustment if MCP returns only the added group
        # or if the format of listing default groups + new group is different.
        # Assuming for now that out_fix can handle it or the MCP output is similar enough.
        assert self.out_fix(out.get('data', '')) == self.sample_query_groups_info % group, \
            self.msg_wasnt_created % obj

        out = self.mcp_client.query_group_show_one(name=group)
        assert self.out_fix(out.get('data', '')) == self.sample_query_group_info % group, \
            self.msg_wasnt_created % obj

    def test_update_query_group_01_02(self):
        obj = 'query group'
        group_01 = self.query_gr_01
        group_02 = self.query_gr_02

        self.mcp_client.query_group_update(name=group_01, new_name=group_02)

        out = self.mcp_client.query_group_show_one(name=group_02)
        assert self.out_fix(out.get('data', '')) == self.sample_query_group_info % group_02, \
            self.msg_wasnt_updated % obj

        self.mcp_client.query_group_update(name=group_02, new_name=group_01) # Revert

    def test_add_query_of_group(self):
        group = self.query_gr_01
        sql = self.query_sql % self.table_01 # self.table_01 needs to be defined or passed

        # Assuming self.table_01 is available from the context
        self.mcp_client.query_group_add_query(name=group, sql=sql)
        # Original test has no assertion, so keeping it that way.

    def test_update_query_of_group(self):
        group = self.query_gr_01
        sql_01 = self.query_sql % self.table_01 # self.table_01
        sql_02 = self.query_sql % self.table_02 # self.table_02

        # Assuming self.table_01 and self.table_02 are available
        self.mcp_client.query_group_update_query(name=group, sql=sql_01, new_sql=sql_02)
        # Original test has no assertion.

    def test_delete_query(self):
        group = self.query_gr_01
        sql = self.query_sql % self.table_02 # self.table_02

        # Assuming self.table_02 is available
        self.mcp_client.query_group_delete_query(name=group, sql=sql)
        # Original test has no assertion.

    def test_delete_query_group_01(self):
        obj = 'query group'
        group = self.query_gr_01 # Name was reverted in update test

        out = self.mcp_client.query_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_query_groups_info % group, \
            self.msg_isnt_such % obj

        self.mcp_client.query_group_delete(name=group)

        out = self.mcp_client.query_group_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_query_groups, \
            self.msg_wasnt_deleted % obj
