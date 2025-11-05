# DataSunrise CLI MCP Testing Guide

This document outlines the testing approach for the DataSunrise CLI MCP project, with a focus on testing the enhanced description system.

## Testing Strategy

The testing strategy includes:

1. **Unit Tests**: Testing individual components like the description registry
2. **Integration Tests**: Testing interactions between components
3. **Manual Testing**: For UI/UX aspects that are difficult to automate

## Running Tests

### All Tests

To run all tests:

```bash
npm test
```

### Description System Tests

To run only the description system tests:

```bash
npm run test:description
```

Or use the test runner script:

```bash
../test/run-description-tests.sh
```

## Test Suite Organization

The tests are organized as follows:

- `test/command_test/test_description_registry.js`: Tests for the description registry system
- Additional test files will be added for each component of the enhanced description system

Each test file focuses on testing a specific module or functionality:

1. The registry system (storing and retrieving descriptions)
2. Parameter validation and contextual help functions
3. Example formatting and usage
4. Integration between descriptions and MCP server

## Writing New Tests

When adding new tests for the enhanced description system, follow these guidelines:

1. Create a test file with a clear naming convention: `test_<module>_<functionality>.js`
2. Start with simple tests that verify basic functionality
3. Add edge cases and error condition tests
4. Include tests for all public methods and interfaces
5. Mock dependencies to isolate the component under test

### Example Test Structure

```javascript
// Import necessary modules
const assert = require('assert');
const { functionToTest } = require('../build/module.js');

describe('Module Name', function() {
  describe('Functionality Group', function() {
    it('should do something specific', function() {
      // Arrange
      const input = 'test input';
      
      // Act
      const result = functionToTest(input);
      
      // Assert
      assert.strictEqual(result, expectedOutput);
    });
    
    // Additional tests...
  });
});
```

## Troubleshooting Common Test Issues

If you encounter failures in the description system tests, check these common issues:

1. **Description Registry Related:**
   - Make sure registry functions are properly importing from the compiled JavaScript
   - Verify that type definitions match the actual data structures
   - Check for duplicate entries or naming conflicts in the registry

2. **Build-Related:**
   - Ensure the project has been built successfully before running tests
   - Clear any cached build files if necessary

3. **Module Loading Issues:**
   - Verify that the ESM module system is correctly set up
   - Check that all import paths are correct in both source and test files

## Extending the Test Suite

To expand test coverage for the enhanced description system:

1. Add tests for description helpers (`src/description_helpers.ts`)
2. Add tests for sequence description helpers (`src/sequence_description_helpers.ts`)
3. Create mock sequences and commands for testing integration
4. Add tests for the MCP tool interface (`get_enhanced_description`)
5. Create tests for parameter validation and contextual help

## Future Test Improvements

The testing system can be enhanced in the following ways:

1. **Automated Client Tests:**
   - Add tests for client-side rendering of enhanced descriptions
   - Test parameter validation in client UI

2. **Coverage Reports:**
   - Add test coverage reporting to identify areas needing more tests

3. **Performance Tests:**
   - Test the performance of the description system with a large number of descriptions
   - Benchmark registration and retrieval operations

4. **Integration Tests:**
   - Create tests that verify the enhanced descriptions work correctly with the full MCP system
   - Test real-world usage scenarios with sample clients

## CI/CD Integration

For continuous integration, the test suite should be run:
1. After every build
2. Before merging pull requests
3. As part of the release process

Test failures should block deployments until they are resolved.
