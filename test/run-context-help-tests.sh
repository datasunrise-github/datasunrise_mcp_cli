#!/bin/bash

# Build the TypeScript files
echo "Building TypeScript files..."
npx tsc

# Run the context-aware help tests using Mocha
echo "Running context-aware help tests..."
npx mocha --experimental-modules test/command_test/test_context_aware_help.js

# Check if tests were successful
if [ $? -eq 0 ]; then
  echo "✅ Context-aware help tests passed!"
else
  echo "❌ Context-aware help tests failed!"
  exit 1
fi
