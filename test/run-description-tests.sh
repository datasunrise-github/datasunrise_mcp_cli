#!/bin/bash

# Build the project to make sure tests run against the latest code
echo "Building project..."
npm run build

# Run the description registry tests
echo "Running description registry tests..."
npm run test:description

# Exit with the test exit code
exit $?
