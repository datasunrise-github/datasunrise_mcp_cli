import sys
import os
# Add the mcp-client directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../../Users/davegornshtein/mcp-client')))

from mcp_client import DataSunriseMCPClient
from test_cmdline_commands.contexts.application_context import ApplicationContext
import pytest


class TestApplication(ApplicationContext):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mcp_client = DataSunriseMCPClient()
        # TODO: Replace with actual login credentials
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            print("MCP Client connection failed for TestApplication. Tests may not run correctly.")
            # Consider pytest.skip("MCP Client connection failed.") if connection is mandatory

    def test_add_application_01(self):
        obj = 'application'
        app = self.application_01
        # app_in = self.sws(app) # Not needed for direct client calls

        out = self.mcp_client.application_show_all()
        # Assuming out_fix and sample_no_apps are compatible with MCP client response structure
        # The actual response from _call_mcp_tool is a dict, adjust assertions if needed.
        # For now, we assume self.out_fix can handle the dict or its 'data' field.
        assert self.out_fix(out.get('data', '')) == self.sample_no_apps, \
            self.msg_already_exists % obj

        self.mcp_client.application_add(name=app)

        out = self.mcp_client.application_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_apps_info % app, \
            self.msg_wasnt_created % obj

        out = self.mcp_client.application_show_one(name=app)
        assert self.out_fix(out.get('data', '')) == self.sample_app_info % app, \
            self.msg_wasnt_created % obj

    def test_update_application_01_02(self):
        obj = 'application'
        app_01 = self.application_01
        app_02 = self.application_02
        # app_01_in = self.sws(app_01) # Not needed
        # app_02_in = self.sws(app_02) # Not needed

        self.mcp_client.application_update(name=app_01, new_name=app_02)

        out = self.mcp_client.application_show_one(name=app_02)
        assert self.out_fix(out.get('data', '')) == self.sample_app_info % app_02, \
            self.msg_wasnt_updated % obj

    def test_delete_application_02(self):
        obj = 'application'
        app = self.application_02
        # app_in = self.sws(app) # Not needed

        out = self.mcp_client.application_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_apps_info % app, \
            self.msg_isnt_such % obj

        self.mcp_client.application_delete(name=app)

        out = self.mcp_client.application_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_apps, \
            self.msg_wasnt_deleted % obj

    def test_add_application_02(self):
        obj = 'application'
        app = self.application_02
        # app_in = self.sws(app) # Not needed

        out = self.mcp_client.application_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_apps, \
            self.msg_already_exists % obj

        self.mcp_client.application_add(name=app)

        out = self.mcp_client.application_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_apps_info % app, \
            self.msg_wasnt_created % obj

        out = self.mcp_client.application_show_one(name=app)
        assert self.out_fix(out.get('data', '')) == self.sample_app_info % app, \
            self.msg_wasnt_created % obj

    def test_update_application_02_01(self):
        obj = 'application'
        app_01 = self.application_02 # Current name
        app_02 = self.application_01 # New name
        # app_01_in = self.sws(app_01) # Not needed
        # app_02_in = self.sws(app_02) # Not needed

        self.mcp_client.application_update(name=app_01, new_name=app_02)

        out = self.mcp_client.application_show_one(name=app_02) # Show by new name
        assert self.out_fix(out.get('data', '')) == self.sample_app_info % app_02, \
            self.msg_wasnt_updated % obj

    def test_delete_application_01(self):
        obj = 'application'
        app = self.application_01
        # app_in = self.sws(app) # Not needed

        out = self.mcp_client.application_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_apps_info % app, \
            self.msg_isnt_such % obj

        self.mcp_client.application_delete(name=app)

        out = self.mcp_client.application_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_apps, \
            self.msg_wasnt_deleted % obj
