import sys
import os
# Add the mcp-client directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../../Users/davegornshtein/mcp-client')))

from mcp_client import DataSunriseMCPClient
from test_cmdline_commands.contexts.import_context import ImportContext
import pytest


@pytest.mark.skip('bug #14836')
class TestImport(ImportContext):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mcp_client = DataSunriseMCPClient()
        # TODO: Replace with actual login credentials
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            print("MCP Client connection failed for TestImport. Tests may not run correctly.")
            # Consider pytest.skip("MCP Client connection failed.")

    def test_import_users(self):
        file = self.import_users_file

        out = self.mcp_client.ds_user_show_all()
        print("\n\nBefore import_users:\n", self.out_fix(out.get('data', '')))

        self.mcp_client.import_users(file_name=file)

        out = self.mcp_client.ds_user_show_all()
        print("\n\nAfter import_users:\n", self.out_fix(out.get('data', '')))

    def test_import_hosts(self):
        file = self.import_hosts_file

        out = self.mcp_client.host_show_all()
        print("\n\nBefore import_hosts:\n", self.out_fix(out.get('data', '')))

        self.mcp_client.import_hosts(file_name=file)

        out = self.mcp_client.host_show_all()
        print("\n\nAfter import_hosts:\n", self.out_fix(out.get('data', '')))

    def test_import_apps(self):
        file = self.import_apps_file

        out = self.mcp_client.application_show_all()
        print("\n\nBefore import_apps:\n", self.out_fix(out.get('data', '')))

        self.mcp_client.import_apps(file_name=file)

        out = self.mcp_client.application_show_all()
        print("\n\nAfter import_apps:\n", self.out_fix(out.get('data', '')))
