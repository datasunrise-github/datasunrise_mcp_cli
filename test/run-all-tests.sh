#!/bin/bash

# Run all tests in the system using the test:all npm script
echo "Running comprehensive test suite for datasunrise-cli-mcp..."
echo "This will run:"
echo " - General tests (mocha test/command_test/test_*.js)"
echo " - Platform-specific character escaping tests"
echo " - Description registry tests"
echo " - All command-specific tests (instance, application, cef, core, etc.)"
echo -e "\nStarting full test suite...\n"

npm run test:all

echo -e "\nComprehensive test suite completed!"
