import sys
import os
# Add the mcp-client directory to sys.path to allow importing DataSunriseMCPClient
# This assumes mcp_client.py is in /Users/davegornshtein/mcp-client/
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../../Users/davegornshtein/mcp-client')))

from mcp_client import DataSunriseMCPClient # Updated import
from test_cmdline_commands.contexts.core_context import CoreContext
from test_cmdline_commands.contexts.create_instance_context import create_instance_context
from framework.base.ContextsManager import with_context

import pytest


@pytest.mark.skip("There is no a server ID in a redirectable RPC or a redirectable RPC without a server ID. "
                  "The RPC is 'getWorkersList'")
@with_context(create_instance_context(True))
class TestCore(CoreContext):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mcp_client = DataSunriseMCPClient()
        # TODO: Replace with actual login credentials or ensure session is handled appropriately
        # This connect call might need to be more sophisticated depending on session management
        # and whether create_instance_context handles any part of the connection.
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            # Optionally, raise an error or skip tests if connection fails
            print("MCP Client connection failed. Tests may not run correctly.")
            # pytest.skip("MCP Client connection failed.")


    def test_stop_core(self):
        server_name = self.server_name()
        out = self.mcp_client.core_show_state(ds_server=server_name)
        print(out)
        self.mcp_client.core_stop()
        out = self.mcp_client.core_show_state(ds_server=server_name)
        print(out)

    def test_start_core(self):
        server_name = self.server_name()
        out = self.mcp_client.core_show_state(ds_server=server_name)
        print(out)
        self.mcp_client.core_start()
        # server_name = self.server_name() # server_name is already defined
        out = self.mcp_client.core_show_state(ds_server=server_name)
        print(out)

    def test_restart_core(self):
        server_name = self.server_name()
        out = self.mcp_client.core_show_state(ds_server=server_name)
        print(out)
        self.mcp_client.core_restart()
        # server_name = self.server_name() # server_name is already defined
        out = self.mcp_client.core_show_state(ds_server=server_name)
        print(out)
