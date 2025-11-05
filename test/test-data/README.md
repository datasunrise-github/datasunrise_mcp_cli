# DataSunrise CLI MCP Test Data

This directory contains sample JSON test data files for testing the DataSunrise CLI MCP sequences without making actual changes to any systems.

## Test Files

The test files are organized by sequence type:

- `core_status_test.json` - Tests the basic server health check sequence
- `show_instances_test.json` - Tests the direct command to list database instances
- `audit_rule_test.json` - Tests audit rule creation sequence
- `security_rule_test.json` - Tests security rule creation sequence
- `masking_rule_test.json` - Tests data masking rule creation sequence

## Running Tests

There are two ways to run these tests:

### 1. Using the Shell Script

```bash
../run-tests.sh
```

This will run all tests in a simulated mode, where the server interactions are logged but no actual commands are executed on a DataSunrise server.

### 2. Using the Python Script

```bash
../test-sequence.py
```

This script provides a more realistic test by:
1. Starting the MCP server in test mode
2. Sending properly formatted MCP protocol requests
3. Reading the responses (which in test mode are simulated)
4. Reporting on test success/failure

## Test Mode Operation

In test mode:
- The DataSunrise CLI commands aren't actually executed against a real DataSunrise server
- The MCP server simulates successful responses
- These tests validate that:
  - The JSON input files are properly formatted
  - The MCP server can parse and interpret the commands
  - The sequences are properly defined and registered

## Adding New Tests

To add a new test:

1. Create a new JSON file in this directory
2. Follow the pattern of existing test files, providing all required parameters
3. Add the new test to both `../run-tests.sh` and `../test-sequence.py`

## Note on Passwords

The test files contain dummy passwords ("password"). In a real environment:
- Never store actual passwords in plaintext files
- Consider using environment variables or a secure vault for credentials
- For DataSunrise CLI MCP, credentials could be passed at runtime rather than stored
