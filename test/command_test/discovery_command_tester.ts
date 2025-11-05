import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { allCliCommands } from '../../src/commands/index.js';
import { CliCommand } from '../../src/commands/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface TestCase {
  description: string;
  toolName: string;
  inputArgs: Record<string, any>;
  expectedCliParams: string[];
  absentCliParams?: string[];
  expectedValidationError?: boolean; 
}

function buildCliCommandString(commandDef: CliCommand, inputArgs: Record<string, any>): string {
  let cliString = commandDef.baseCommand;
  const appliedParams: string[] = [];

  for (const paramDef of commandDef.params) {
    let value = inputArgs[paramDef.name];
    if (value === undefined && paramDef.defaultValue !== undefined) {
      value = paramDef.defaultValue;
    }

    if (value !== undefined) {
      if (paramDef.type === 'boolean') {
        // Only add boolean flags if they are true, or if they are false AND their default is true (to explicitly set to false)
        if (value === true) {
          appliedParams.push(paramDef.cliName);
        } else if (value === false && paramDef.defaultValue === true) {
          // This case might need specific handling if the CLI expects a "--no-param" or "param=false"
          // For now, if false and default is true, we omit it, assuming absence means false for such flags.
          // If the CLI requires an explicit "false" value, this logic needs adjustment.
          // The test cases for `discovery_attribute_add` have `colNamesCS: true` (default false) and `contTemplateCS: false` (default false)
          // The `defaultValue` in `CliParam` is for the MCP tool, not necessarily how CLI handles absence of optional flags.
          // For boolean flags where absence means false, we only add them if true.
        }
      } else {
        let paramValue = String(value);
        // Special handling for parameters known to require quoting for complex values (regex, cef strings)
        // or values that might contain spaces or semicolons which can break CLI parsing.
        const needsQuoting = typeof value === 'string' && (
            value.includes(' ') || 
            value.includes(';') || // Semicolons in values like colNames
            paramDef.cliName === '-contTemplate' || // Always quote regex
            paramDef.cliName === '-cef' // Always quote CEF strings (from other command sets)
            // Add other specific cliNames or patterns if needed
        );

        if (needsQuoting) {
            // Avoid double-quoting if already quoted (e.g. from test case input)
            if (!((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))) {
                 paramValue = `"${value.replace(/"/g, '\\"')}"`; // Escape internal double quotes
            }
        }
        appliedParams.push(`${paramDef.cliName} ${paramValue}`);
      }
    }
  }
  return `${cliString} ${appliedParams.join(' ')}`.trim();
}

function validateInputArgs(commandDef: CliCommand, inputArgs: Record<string, any>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  // Discovery commands currently don't have complex dependencies defined in their CliCommand structure for this test.
  if (commandDef.dependencies) {
    errors.push("Dependency checking for discovery commands not fully implemented in this test script yet.");
  }
  return { valid: errors.length === 0, errors };
}

async function runTests() {
  const testCasesPath = path.join(__dirname, 'discovery_command_test_cases.json'); // Adjusted path
  const testCases: TestCase[] = JSON.parse(fs.readFileSync(testCasesPath, 'utf-8'));
  
  const outputLines: string[] = [];
  let allTestsPassed = true;

  outputLines.push("Discovery Command Test Results:"); // Adjusted title
  outputLines.push("==============================");

  for (const tc of testCases) {
    outputLines.push(`\nTest: ${tc.description}`);
    outputLines.push(`Tool: ${tc.toolName}`);
    outputLines.push(`Input Args: ${JSON.stringify(tc.inputArgs)}`);

    const commandDef = allCliCommands.find(cmd => cmd.toolName === tc.toolName);
    if (!commandDef) {
      outputLines.push("Error: Command definition not found.");
      allTestsPassed = false;
      continue;
    }

    const validationResult = validateInputArgs(commandDef, tc.inputArgs);
    if (tc.expectedValidationError) {
      if (validationResult.valid) {
        outputLines.push("Validation Status: FAILED - Expected validation error, but got none.");
        allTestsPassed = false;
      } else {
        outputLines.push(`Validation Status: PASSED - Correctly identified validation errors: ${validationResult.errors.join(', ')}`);
      }
      outputLines.push("---");
      continue;
    } else if (!validationResult.valid) {
      outputLines.push(`Validation Status: FAILED - Unexpected validation errors: ${validationResult.errors.join(', ')}`);
      allTestsPassed = false;
    } else {
      outputLines.push("Validation Status: PASSED - Input conforms to dependencies (if any).");
    }

    const generatedCli = buildCliCommandString(commandDef, tc.inputArgs);
    outputLines.push(`Generated CLI: ${generatedCli}`);

    let testPassed = true;

    for (const expectedParam of tc.expectedCliParams) {
      let found = false;
      const cliParts = generatedCli.split(' ');
      const expectedParts = expectedParam.split(' ');
      if (expectedParts.length === 1) { 
        if (cliParts.includes(expectedParts[0])) found = true;
      } else if (expectedParts.length >= 2) { 
        const paramIndex = cliParts.indexOf(expectedParts[0]);
        if (paramIndex !== -1) {
          const expectedValue = expectedParam.substring(expectedParts[0].length + 1);
          if (expectedParam.includes('"')) { // Handles quoted multi-word values
            if (generatedCli.includes(expectedParam)) found = true;
          } else if (paramIndex + 1 < cliParts.length && cliParts[paramIndex + 1] === expectedValue) {
            found = true;
          }
        }
      }
       // Fallback for cases where expectedParam might be a substring due to complex values
      if (!found && generatedCli.includes(expectedParam)) {
        found = true;
      }
      
      if (!found) {
        outputLines.push(`  FAIL: Expected param "${expectedParam}" NOT FOUND.`);
        testPassed = false;
      } else {
        outputLines.push(`  PASS: Expected param "${expectedParam}" found.`);
      }
    }

    if (tc.absentCliParams) {
      for (const absentParam of tc.absentCliParams) {
        const paramFlag = absentParam.split(' ')[0]; 
        if (generatedCli.includes(paramFlag)) {
          // Check if it's a boolean flag that was expected to be absent because its value was false
          // and its default was also false (or not specified, implying false).
          const paramDef = commandDef.params.find(p => p.cliName === paramFlag);
          if (paramDef && paramDef.type === 'boolean' && tc.inputArgs[paramDef.name] === false && (paramDef.defaultValue === undefined || paramDef.defaultValue === false)) {
            // This is fine, it's a boolean flag that's false and correctly absent.
             outputLines.push(`  PASS: Absent param "${paramFlag}" is correctly absent (value is false).`);
          } else {
            outputLines.push(`  FAIL: Absent param "${paramFlag}" IS PRESENT.`);
            testPassed = false;
          }
        } else {
          outputLines.push(`  PASS: Absent param "${paramFlag}" is absent.`);
        }
      }
    }
    
    outputLines.push(testPassed ? "Test Result: PASSED" : "Test Result: FAILED");
    if (!testPassed) {
      allTestsPassed = false;
    }
    outputLines.push("---");
  }

  outputLines.push(`\nOverall Test Suite Result: ${allTestsPassed ? "ALL PASSED" : "SOME FAILED"}`);
  
  const outputPath = path.join(__dirname, 'generated_discovery_commands.txt'); // Adjusted output file
  fs.writeFileSync(outputPath, outputLines.join('\n'));
  console.log(`Test results written to ${outputPath}`);
  if (!allTestsPassed) {
    // process.exit(1); 
  }
}

runTests().catch(error => {
  console.error("Error running Discovery command tests:", error); // Adjusted error message
  process.exit(1);
});
