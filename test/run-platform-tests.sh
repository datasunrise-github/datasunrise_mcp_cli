#!/bin/bash

# Run the license command tests which include the special character test cases
echo "Running license command tests..."
npm run test:license-commands

# Run the platform-specific character escaping test
echo -e "\nRunning platform-specific character escaping tests..."
npm run test:platform-escaping

echo -e "\nAll tests completed!"
