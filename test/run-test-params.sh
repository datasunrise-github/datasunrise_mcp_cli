#!/bin/bash
#
# Test runner for parameter storage and secure storage tests
#
# This script compiles the TypeScript code and runs the tests for
# both the regular parameter storage and secure parameter storage.

set -e  # Exit on error

# Ensure build directory exists
echo "Building TypeScript files..."
npm run build

# Create test directory if it doesn't exist
mkdir -p test

# Run parameter storage tests
echo "Running Parameter Storage Tests..."
npx mocha --experimental-vm-modules test/command_test/test_parameter_store.js

# Run secure storage tests
echo "Running Secure Storage Tests..."
npx mocha --experimental-vm-modules test/command_test/test_secure_storage.js

echo "All tests completed!"
