# DataSunrise MCP Client - Developer Guide

This document provides insights into the development and refactoring process of the `DataSunriseMCPClient` and the associated PyTest integration tests.

## 1. Project Goal

The primary objective was to refactor a suite of PyTest integration tests for DataSunrise. The original tests directly executed DataSunrise CLI commands and asserted against the string output. The goal was to:

1.  Create a Python client (`DataSunriseMCPClient`) to interact with DataSunrise via a Model Context Protocol (MCP) server (`datasunrise-cli` MCP server).
2.  Modify the existing PyTest files (`test_*.py`) to use this MCP client instead of direct CLI calls.
3.  Maintain the existing test logic and sequence of operations as much as possible.

## 2. Refactoring Process

The refactoring was performed iteratively, one test file (`test_*.py`) at a time. For each test file:

1.  **Context Analysis**: The corresponding `contexts/*.py` file was analyzed to identify:
    *   CLI command strings used (e.g., `addApplication -name %s`).
    *   Parameters for these commands.
    *   Sample output strings used for assertions.
2.  **MCP Tool Mapping**: Each CLI command was mapped to its equivalent tool provided by the `datasunrise-cli` MCP server. This involved consulting the MCP server's tool definitions (schemas).
3.  **Client Method Implementation**: A new method was added to `DataSunriseMCPClient` in `/Users/davegornshtein/mcp-client/mcp_client.py` for each group of related MCP tools. These methods:
    *   Accept parameters relevant to the MCP tool.
    *   Construct the arguments dictionary for the MCP tool.
    *   Call the placeholder `_call_mcp_tool` function.
4.  **Test File Modification**: The `test_*.py` file was updated:
    *   To import `DataSunriseMCPClient`.
    *   To initialize `self.mcp_client` in the test class constructor (`__init__`), including a call to `self.mcp_client.connect(...)` with placeholder credentials.
    *   To replace `self.execute(cli_command_string % params)` calls with `self.mcp_client.corresponding_method_name(...)`.
    *   `setup_tests` and `cleanup_tests` methods from the original context files (if present) were integrated into the test class's `__init__` (for setup) and a `teardown_method` (for cleanup), or called directly if they were class methods. These setup/cleanup steps were also converted to use MCP client calls where applicable.
5.  **Assertion Handling**: This was the most challenging part. Original assertions often parsed or directly compared CLI string output.
    *   If an assertion was simple (e.g., checking for "No items found"), it was adapted to check the `data` field of the MCP response (assuming it might contain a similar string for now).
    *   If an assertion involved complex string parsing, regex matching on specific CLI output formats, or relied on extracting IDs from string output, it was marked with `pytest.skip("Assertion needs rework for MCP client output format.")`. This is because the MCP server is expected to return structured JSON data, not raw CLI strings.

## 3. Key Assumptions Made

During the refactoring process, several assumptions were made:

1.  **MCP Tool Equivalence**: It was assumed that for every DataSunrise CLI command used in the tests, an equivalent tool (or set of tools) exists in the `datasunrise-cli` MCP server.
2.  **Parameter Mapping**: Parameters for MCP client methods were derived from the CLI command parameters found in the context files and the MCP tool schemas. It was assumed that these mappings are largely one-to-one or can be logically derived.
3.  **MCP Response Structure (Placeholder)**: The `_call_mcp_tool` function is a placeholder. It returns a dummy success response: `{"status": "success", "data": "Successfully executed {tool_name}"}`. The refactored tests currently assume that the actual MCP tool responses will have a similar top-level structure (a dictionary with at least a `status` key and a `data` key). The content of `data` is the main unknown.
4.  **Session Management**: The `connect` method in the client sets a `self.session_active` flag. It's assumed the MCP server handles session persistence after a successful connection.
5.  **Error Handling**: The current client methods simply return the response from `_call_mcp_tool`. Robust error handling (e.g., raising exceptions for non-success statuses) was not implemented as part of this initial refactoring pass but would be crucial for a production-ready client.
6.  **Output of "Show" Commands**: For `show*` commands (e.g., `application_show_one`), the original tests asserted against detailed, formatted string outputs. It was assumed that the `data` field from the MCP response for these commands might initially contain a CLI-like string or, ideally, structured data (JSON). Assertions were adapted or skipped based on this.
7.  **ID Handling for Updates/Deletes**: Some CLI commands (e.g., `delServer -id %s`) operate on internal IDs. The original tests sometimes extracted these IDs from the string output of a preceding `show` command. This is fragile. It was assumed that for MCP operations:
    *   Entities are primarily identified by name.
    *   If an MCP tool requires an ID, that ID should ideally be returned by the command that created or listed the entity (e.g., an `add` or `show_all` command returning a list of objects with their IDs). This was a major reason for skipping some assertions.
8.  **`sendToAddress` for Subscribers**: The `addSubscriber` CLI command in the context did not explicitly show a `sendToAddress` parameter, but the MCP tool `subscriber_add` requires it. A placeholder value (`"default@example.com"`) was used in the refactored tests.
9.  **Task ID for Static Masking**: The `test_static_masking.py` originally used a direct API call (`ds_api`) to get the `task_id`. It was assumed that the `static_masking_start` MCP tool would ideally return this `task_id`. If not, the test was marked to skip subsequent operations relying on this ID.

## 4. Client-Side Parameter Naming

To avoid conflicts with Python keywords and to improve readability, some parameter names in the `DataSunriseMCPClient` methods were changed from their direct CLI or MCP schema counterparts:
*   `id` (generic) often changed to a more specific `entity_id` (e.g., `license_id`, `backup_id`, `task_id`).
*   `min`, `max` (Python keywords) changed to `min_val`, `max_val`.
*   `file` (Python keyword) changed to `file_name` or `table_file` where appropriate.
*   `instance` (Python keyword) often changed to `inst_name` or `oracle_instance_name` / `db_name` for clarity when multiple instance-like concepts were present.
*   Casing for some parameters like `enableADAuth` in `ds_user_add` was matched to the MCP tool schema (`enableADAuth`) rather than a Pythonic `enable_ad_auth` for directness in argument construction.

## 5. Structure of the `mcp_client.py`

*   **`_call_mcp_tool`**: A private placeholder function. **This needs to be replaced with actual MCP invocation logic.**
*   **`DataSunriseMCPClient` Class**:
    *   `__init__`: Initializes `server_name` and `session_active`.
    *   `connect`: Handles connection and sets `session_active`.
    *   Command Methods: Each public method corresponds to one or more related MCP tools, grouped by DataSunrise entity type (e.g., Application Commands, Core Commands).
        *   Methods construct an `args` dictionary.
        *   They call `_call_mcp_tool`.
        *   Docstrings briefly explain the method and its key parameters.

## 6. Test File Structure Changes

*   **Imports**: Added `sys`, `os`, `pytest`, and `DataSunriseMCPClient`.
*   **`sys.path` Modification**: Added at the top to ensure `mcp_client.py` can be imported. The path used (`../../../../../../Users/davegornshtein/mcp-client`) is absolute and specific to the development environment; this might need to be made relative or configurable for broader use.
*   **Class `__init__`**:
    *   Initializes `self.mcp_client`.
    *   Calls `self.mcp_client.connect(...)` with placeholder credentials (`"your_ds_login"`, `"your_ds_password"`). **These must be replaced with actual credentials.**
    *   Includes a `pytest.skip` if the connection fails, to prevent running tests that depend on an active session.
    *   Calls to replicate `setup_tests` from original context files were moved here (e.g., `_setup_prerequisites_mcp`).
*   **`teardown_method`**: Added where necessary to call cleanup logic (e.g., `_cleanup_prerequisites_mcp`) to ensure resources created during setup or tests are removed.
*   **Test Methods**:
    *   CLI execution calls replaced by `self.mcp_client` method calls.
    *   Assertions:
        *   Simple string assertions (e.g., "No items") were kept, checking `response.get('data', '')`.
        *   Complex string parsing, regex on CLI output, and ID extraction from strings were generally replaced with `pytest.skip(...)`.
    *   Variable names for entities (e.g., `application_name` instead of `application`) were sometimes used to avoid clashes with method names or improve clarity.

## 7. Workflow and Diagrams

### A. General Workflow for Refactoring a Test File:

```mermaid
graph TD
    A[Start: Select test_*.py file] --> B{Analyze corresponding contexts/*.py};
    B --> C{Identify CLI commands & params};
    C --> D{Map CLI to MCP Tools (from MCP Server Schema)};
    D --> E{Implement/Update MCP Client Method(s) in mcp_client.py};
    E --> F{Modify test_*.py: Imports & __init__};
    F --> G{Modify test_*.py: Replace self.execute() with mcp_client calls};
    G --> H{Address Assertions: Adapt simple ones, skip complex ones};
    H --> I{Integrate context setup/cleanup using MCP client};
    I --> J[End: Test file refactored];
```

### B. MCP Client Interaction Model (Conceptual):

```mermaid
sequenceDiagram
    participant TestScript as TestScript (test_*.py)
    participant MCPClient as DataSunriseMCPClient (mcp_client.py)
    participant Placeholder as _call_mcp_tool (placeholder)
    participant MCPServer as datasunrise-cli MCP Server (External)
    participant DS as DataSunrise Instance (External)

    TestScript->>MCPClient: client = DataSunriseMCPClient()
    TestScript->>MCPClient: client.connect(credentials)
    MCPClient->>Placeholder: _call_mcp_tool("connect", args)
    Placeholder-->>MCPServer: (Simulated) Invoke "connect" tool
    MCPServer-->>DS: (Actual) Authenticate
    DS-->>MCPServer: Auth Result
    MCPServer-->>Placeholder: Connect Result
    Placeholder-->>MCPClient: Connect Response
    MCPClient-->>TestScript: Connection Status

    TestScript->>MCPClient: client.application_add(name="App1")
    MCPClient->>Placeholder: _call_mcp_tool("application_add", args)
    Placeholder-->>MCPServer: (Simulated) Invoke "application_add" tool
    MCPServer-->>DS: (Actual) Create Application
    DS-->>MCPServer: Create Result
    MCPServer-->>Placeholder: Add Result
    Placeholder-->>MCPClient: Add Response
    MCPClient-->>TestScript: Add App Response

    TestScript->>MCPClient: client.application_show_one(name="App1")
    MCPClient->>Placeholder: _call_mcp_tool("application_show_one", args)
    Placeholder-->>MCPServer: (Simulated) Invoke "application_show_one" tool
    MCPServer-->>DS: (Actual) Get Application Details
    DS-->>MCPServer: App Details
    MCPServer-->>Placeholder: Show Result (Structured Data Expected)
    Placeholder-->>MCPClient: Show Response
    MCPClient-->>TestScript: Show App Response (Test asserts on this)
```

## 8. Conclusion and Next Steps

The refactoring successfully created the `DataSunriseMCPClient` and updated all specified test files to use it. This lays the groundwork for more robust and maintainable integration tests.

**Immediate Next Steps:**

1.  **Replace Placeholder `_call_mcp_tool`**: This is critical. The current placeholder only simulates calls. It needs to be replaced with actual code that communicates with the MCP server infrastructure.
2.  **Update Credentials**: The placeholder credentials (`"your_ds_login"`, `"your_ds_password"`) in each test file's `__init__` method must be replaced with valid DataSunrise administrative credentials. These might need to come from a secure configuration or environment variables.
3.  **Adapt Assertions**:
    *   Once the actual MCP tool responses (expected to be JSON) are available, the skipped assertions (`pytest.skip`) must be revisited.
    *   Assertion logic needs to be rewritten to validate the structured data returned by the MCP client, rather than parsing CLI strings. This will make assertions more precise and less brittle.
    *   For `show_all` type commands, assertions should check for the presence and correctness of expected items within the returned list/collection.
    *   For `show_one` type commands, assertions should check specific fields in the returned object.
4.  **ID Handling**: Review how entity IDs are handled. If MCP tools that create entities (e.g., `application_add`) return the ID of the created entity, this ID should be captured and used for subsequent operations (e.g., `show_one`, `delete`). This is more reliable than name-based identification in all cases, especially if names are not unique across different types or if IDs are needed for specific API interactions.
5.  **Error Handling in Client**: Enhance `DataSunriseMCPClient` methods to check the `status` from `_call_mcp_tool` and raise appropriate exceptions on failure. This will make tests fail more clearly when MCP operations are unsuccessful.
6.  **Parameter Consistency**: Double-check parameter names and optionality between the client methods, the MCP tool schemas, and the original CLI commands to ensure consistency and correctness. Some client methods (e.g., for updates) were simplified to only include parameters shown in CLI context; they might need to be expanded if the corresponding MCP tools support updating more fields.
7.  **`sys.path` Modification**: The absolute path used for `sys.path.insert` should be made relative or configurable to improve portability of the test suite.

This refactoring provides a solid foundation. Addressing the points above, especially the MCP communication and assertion logic, will be essential to make the test suite fully functional and reliable using the new MCP-based approach.
