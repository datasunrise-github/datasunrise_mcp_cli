# DataSunrise MCP Client

## Overview

The `DataSunriseMCPClient` is a Python client designed to interact with a DataSunrise instance via a Model Context Protocol (MCP) server. This client provides a Pythonic interface to the functionalities exposed by the `datasunrise-cli` MCP server, which in turn wraps the DataSunrise command-line interface.

This client was developed as part of an effort to refactor existing PyTest integration tests that directly invoked CLI commands. By using this MCP client, tests can interact with DataSunrise in a more structured and maintainable way.

## Features

*   Provides methods corresponding to various DataSunrise CLI commands for managing:
    *   Core operations (start, stop, restart, status)
    *   Applications
    *   CEF (Common Event Format) configurations
    *   Database Users, Groups, and Mappings
    *   LDAP Servers
    *   DataSunrise Dictionary (backup, clean, recover)
    *   Data Discovery Groups and Attributes
    *   DataSunrise Administrative Users and Roles
    *   Hosts and Host Groups
    *   Data Import (users, hosts, apps)
    *   Database Instances and their components (interfaces, proxies)
    *   Licenses
    *   Object Groups
    *   System Parameters
    *   Periodic Tasks
    *   Query Groups
    *   Report Generation Tasks
    *   Reports
    *   Rules (Audit, Masking, Security, Learning, External Dispatcher)
    *   Schedules
    *   Notification Servers (SMTP, SNMP)
    *   SSL Key Groups
    *   Static Masking Tasks
    *   Subscribers
    *   Tags
*   Handles connection to the DataSunrise MCP server.
*   Intended for use in automated testing environments, particularly with PyTest.

## Installation / Setup

This client is a single Python file (`mcp_client.py`) and does not require a separate installation package.

1.  **Place `mcp_client.py`**: Ensure the `mcp_client.py` file is accessible in your Python environment. For the refactored tests, it's typically placed in a directory (e.g., `/Users/davegornshtein/mcp-client`) and test files are updated to include this directory in `sys.path`.
2.  **MCP Server**: This client requires the `datasunrise-cli` MCP server to be running and configured to communicate with your DataSunrise instance.
3.  **Dependencies**: The client itself has minimal dependencies (primarily `json`). The tests using it will require `pytest`.

## Basic Usage

```python
import sys
import os

# Add the mcp-client directory to sys.path if needed
# Example: Adjust path as per your project structure
mcp_client_path = '/Users/davegornshtein/mcp-client' # Or relative path
sys.path.insert(0, os.path.abspath(mcp_client_path))

from mcp_client import DataSunriseMCPClient

# Initialize the client
# The default server_name is "datasunrise-cli"
client = DataSunriseMCPClient()

# Connect to the DataSunrise MCP server (and through it, to DataSunrise)
# Replace with actual credentials and connection details
try:
    client.connect(
        host="your_datasunrise_host", # Host of DataSunrise management console
        port="11000",                 # Port of DataSunrise management console
        protocol="https",
        login="your_ds_admin_login",
        password="your_ds_admin_password"
    )
except Exception as e:
    print(f"Connection failed: {e}")
    # Handle connection failure

if client.session_active:
    print("Successfully connected to DataSunrise via MCP.")

    # Example: Show all applications
    try:
        apps = client.application_show_all()
        print("Applications:", apps.get('data'))
    except Exception as e:
        print(f"Error showing applications: {e}")

    # Example: Add an application
    try:
        app_name = "TestAppMCP"
        add_response = client.application_add(name=app_name)
        print(f"Add application '{app_name}' response:", add_response)

        # Verify
        app_details = client.application_show_one(name=app_name)
        print(f"Details for '{app_name}':", app_details.get('data'))

        # Cleanup
        client.application_delete(name=app_name)
        print(f"Deleted application '{app_name}'.")

    except Exception as e:
        print(f"Error managing application: {e}")
else:
    print("Could not establish session with DataSunrise via MCP.")

```

## Placeholder `_call_mcp_tool`

The `mcp_client.py` file contains a placeholder function `_call_mcp_tool`. In a real-world deployment, this function **must be replaced** with the actual mechanism for invoking tools on your MCP server infrastructure. The current placeholder simulates successful calls and returns dummy data.

## Integration with PyTest

The client is designed to be used within PyTest test classes. Typically, an instance of `DataSunriseMCPClient` is created in the `__init__` method of the test class, and its methods are called within individual test methods.

```python
# In your test_example.py

import sys
import os
# Update this path to where mcp_client.py is located
sys.path.insert(0, os.path.abspath('/Users/davegornshtein/mcp-client'))
from mcp_client import DataSunriseMCPClient
import pytest

class TestExampleSuite:
    def __init__(self, *args, **kwargs):
        # super().__init__(*args, **kwargs) # If inheriting from a context base class
        self.mcp_client = DataSunriseMCPClient()
        # IMPORTANT: Replace with actual credentials for your DataSunrise instance
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            # This will skip all tests in this class if connection fails
            pytest.skip("MCP Client connection failed. Skipping tests in this suite.")

    def test_example_operation(self):
        # Pre-condition: Ensure no application named 'MyNewApp' exists
        try:
            self.mcp_client.application_delete(name="MyNewApp")
        except Exception: # Might fail if app doesn't exist, which is fine here
            pass

        # Action: Add a new application
        add_result = self.mcp_client.application_add(name="MyNewApp")
        assert add_result.get("status") == "success"

        # Verification: Show the application
        show_result = self.mcp_client.application_show_one(name="MyNewApp")
        assert show_result.get("status") == "success"
        # Further assertions would depend on the structure of show_result.get('data')

        # Cleanup: Delete the application
        delete_result = self.mcp_client.application_delete(name="MyNewApp")
        assert delete_result.get("status") == "success"
```

See the `DEVELOPER_GUIDE.md` for more details on the refactoring process and assumptions made.
