import sys
import os
# Add the mcp-client directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../../Users/davegornshtein/mcp-client')))

from mcp_client import DataSunriseMCPClient
from test_cmdline_commands.contexts.ds_user_context import DataSunriseUserContext
import pytest


class TestDataSunriseUser(DataSunriseUserContext):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mcp_client = DataSunriseMCPClient()
        # TODO: Replace with actual login credentials
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            print("MCP Client connection failed for TestDataSunriseUser. Tests may not run correctly.")
            # Consider pytest.skip("MCP Client connection failed.")

    def test_add_datasunrise_user(self):
        obj = 'DataSunrise user'
        user = self.ds_user_custom
        role = self.role_01 # Direct role name, not quoted for MCP client

        out = self.mcp_client.ds_user_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_default_ds_users, \
            self.msg_already_exist % obj

        self.mcp_client.ds_user_add(login=user, password='Pa55word_123', role=role)

        out = self.mcp_client.ds_user_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_ds_users_info % user, \
            self.msg_wasnt_created % obj

        out = self.mcp_client.ds_user_show_one(login=user)
        assert self.out_fix(out.get('data', ''), skip_date=True) == self.sample_ds_user_info % (user, role), \
            self.msg_wasnt_created % obj

    def test_update_datasunrise_user(self):
        obj = 'DataSunrise user'
        user = self.ds_user_custom
        role = self.role_02 # Direct role name

        self.mcp_client.ds_user_update(login=user, role=role)

        out = self.mcp_client.ds_user_show_one(login=user)
        assert self.out_fix(out.get('data', ''), skip_date=True) == self.sample_ds_user_info % (user, role), \
            self.msg_wasnt_updated % obj

    def test_change_datasunrise_user_password(self):
        user = self.ds_user_custom
        # Assuming current password after add is 'Pa55word_123', changing to new 'Pa55word_123'
        # The original test used '' as currentPwd, which might imply admin rights or specific behavior.
        # For MCP, we should provide the actual current password if known, or handle as per API.
        # The ds_user_change_password tool requires currentPwd.
        # If the test implies an admin changing another user's password without knowing current,
        # that's a different scenario not directly covered by this specific MCP tool.
        # For now, assuming the test context implies currentPwd is 'Pa55word_123' from add.
        # If currentPwd is truly empty for an admin-like operation, the MCP tool might need adjustment or a different tool.
        # The original command was `changePwd -login %s -currentPwd %s -newPwd %s` with currentPwd as ''.
        # This suggests an admin context. The MCP tool `ds_user_change_password` has `currentPwd` as required.
        # This might be a discrepancy or a specific CLI behavior.
        # For now, I will pass current_pwd as 'Pa55word_123' assuming it was set in add_datasunrise_user.
        # If the intent is an admin reset, the MCP tool might need to support that or be a different tool.
        # The test uses 'Pa55word_123' as the new password, and '' as current.
        # Let's assume the MCP tool `ds_user_change_password` when called by an admin,
        # might allow empty `current_pwd` or it's a simplified test case.
        # The MCP tool definition for `ds_user_change_password` has `currentPwd` as required.
        # This test might fail if the MCP server strictly enforces `currentPwd` unless it's the logged-in user.
        # Given the original test, I will pass '' for current_pwd.
        self.mcp_client.ds_user_change_password(login=user, current_pwd='', new_pwd='Pa55word_123')
        # No assertion in original test.

    def test_delete_datasunrise_user(self):
        obj = 'DataSunrise user'
        user = self.ds_user_custom

        out = self.mcp_client.ds_user_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_ds_users_info % user, \
            self.msg_isnt_such % obj

        self.mcp_client.ds_user_delete(login=user)

        out = self.mcp_client.ds_user_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_default_ds_users, \
            self.msg_wasnt_deleted % obj

    # Note: setup_tests and cleanup_tests in DataSunriseUserContext use add/delAccessRole.
    # These will be handled when test_role.py is processed.
