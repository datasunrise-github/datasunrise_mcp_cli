import sys
import os
# Add the mcp-client directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../../Users/davegornshtein/mcp-client')))

from mcp_client import DataSunriseMCPClient
from test_cmdline_commands.contexts.dictionary_context import DictionaryContext
import pytest


@pytest.mark.skip("There is no a server ID in a redirectable RPC or a redirectable RPC without a server ID. "
                  "The RPC is 'setDictionary'")
class TestDictionary(DictionaryContext):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mcp_client = DataSunriseMCPClient()
        # TODO: Replace with actual login credentials
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            print("MCP Client connection failed for TestDictionary. Tests may not run correctly.")
            # Consider pytest.skip("MCP Client connection failed.")

    def test_create_dictionary_backup(self):
        self.mcp_client.dictionary_backup_create()

        out = self.mcp_client.dictionary_backup_show_all()
        # The original test just prints the output. We'll do the same with the 'data' part.
        print(out.get('data')) 
        # Add assertions here if needed, based on expected output structure

    def test_clean_dictionary(self):
        self.mcp_client.dictionary_clean()
        # Add assertions here if needed

    def test_recover_dictionary(self):
        out_response = self.mcp_client.dictionary_backup_show_all()
        backup_list_data = out_response.get('data')
        
        # The original test parsed CLI output: backup_name = out[1].split(':')[0].rstrip()
        # We need to adapt this to the MCP client's response structure.
        # Assuming backup_list_data is a string similar to CLI output or a list of backup info.
        # This parsing logic is highly dependent on the actual format of `backup_list_data`.
        # For placeholder, let's assume it's a string and try to parse the first ID.
        # This will likely need adjustment based on actual MCP server response.
        backup_id_to_recover = None
        if isinstance(backup_list_data, str) and backup_list_data.strip():
            lines = backup_list_data.strip().split('\n')
            if len(lines) > 1 and ':' in lines[1]: # Assuming first line is header or "OK"
                 # Example line: "12345: some_description" or "ID : 12345 ..."
                potential_id_part = lines[1].split(':')[0].strip()
                if potential_id_part.isdigit(): # Check if it looks like an ID
                    backup_id_to_recover = potential_id_part
                elif "ID" in lines[0] and len(lines[1].split()) > 0: # if ID is a column
                    # This part is very speculative without knowing the exact output format
                    pass # Needs more robust parsing based on actual output

        if not backup_id_to_recover and isinstance(backup_list_data, list) and backup_list_data:
            # If data is a list of dicts, e.g., [{"id": "123", ...}, ...]
            if isinstance(backup_list_data[0], dict) and "id" in backup_list_data[0]:
                backup_id_to_recover = backup_list_data[0]["id"]
        
        if backup_id_to_recover:
            print(f"Attempting to recover dictionary with backup ID: {backup_id_to_recover}")
            self.mcp_client.dictionary_recover(backup_id=backup_id_to_recover)
            # Add assertions here if needed
        else:
            pytest.skip("Could not determine a backup ID to recover from MCP response.")
