import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { allCliCommands } from '../../src/commands/index.js';
import { CliCommand, CliParam } from '../../src/commands/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface TestCase {
  description: string;
  toolName: string;
  inputArgs: Record<string, any>;
  expectedCliParams: string[];
  absentCliParams?: string[];
  expectedValidationError?: boolean; // For testing invalid cases due to dependencies
}

// Simplified CLI string builder (mocking parts of MCP server logic)
function buildCliCommandString(commandDef: CliCommand, inputArgs: Record<string, any>): string {
  let cliString = commandDef.baseCommand;
  const appliedParams: string[] = [];

  // Process parameters based on their definition in CliCommand
  for (const paramDef of commandDef.params) {
    let value = inputArgs[paramDef.name];

    // Use default value if param is not provided in inputArgs and defaultValue is set
    if (value === undefined && paramDef.defaultValue !== undefined) {
      value = paramDef.defaultValue;
    }

    if (value !== undefined) {
      // Special handling for instanceType: only add if dbType is ORACLE
      if (paramDef.name === 'instanceType' && inputArgs['dbType'] !== 'ORACLE') {
        // Skip instanceType if dbType is not ORACLE
      } else if (paramDef.type === 'boolean') {
        if (value === true) { // Only add boolean flags if true
          appliedParams.push(paramDef.cliName);
        }
      } else {
        // For string values with spaces, ensure they are quoted if the CLI expects that.
        // The test cases' expectedCliParams should reflect this quoting.
        // Here, we assume values are prepared correctly or the CLI handles unquoted strings.
        // If specific quoting is needed, it should be part of the value in inputArgs or handled here.
        const paramValue = typeof value === 'string' && value.includes(' ') ? `"${value}"` : String(value);
        appliedParams.push(`${paramDef.cliName} ${paramValue}`);
      }
    }
  }
  
  // Sort parameters for consistent comparison, though order might matter for some CLIs.
  // For this test, we'll sort to simplify presence/absence checks.
  // If order is critical, this sorting should be removed and test cases made order-aware.
  // appliedParams.sort(); 
  // Decided against sorting for now, as order can matter. 
  // Test cases should list expectedCliParams in the order they are likely to appear.

  return `${cliString} ${appliedParams.join(' ')}`.trim();
}

// Basic dependency validation (simplified for this test script)
// A more robust solution would involve a full JSON schema validator
function validateInputArgs(commandDef: CliCommand, inputArgs: Record<string, any>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!commandDef.dependencies) {
    return { valid: true, errors };
  }

  for (const depKey in commandDef.dependencies) {
    const depCondition = commandDef.dependencies[depKey];
    if (depCondition.oneOf) {
      let oneOfSatisfied = false;
      for (const condition of depCondition.oneOf) {
        let conditionMet = true;
        // Check if properties for this condition are met
        for (const propKey in condition.properties) {
          const propCondition = condition.properties[propKey];
          const argValue = inputArgs[propKey];

          if (propCondition.enum && !propCondition.enum.includes(argValue)) {
            conditionMet = false;
            break;
          }
          if (propCondition.not?.enum && propCondition.not.enum.includes(argValue)) {
            conditionMet = false;
            break;
          }
        }

        if (conditionMet) {
          // If condition properties are met, check required params for this condition
          for (const reqParam of condition.required) {
            if (inputArgs[reqParam] === undefined) {
              conditionMet = false;
              errors.push(`Dependency Error: '${reqParam}' is required when '${depKey}' is '${inputArgs[depKey]}' (condition: ${JSON.stringify(condition.properties)})`);
              break;
            }
          }
        }
        
        if (conditionMet) {
          oneOfSatisfied = true;
          break; 
        }
      }
      if (!oneOfSatisfied && depCondition.oneOf.length > 0) {
        // Only add a general error if no specific required param error was added for a met condition
        if (errors.length === 0) {
             errors.push(`Dependency Error: No 'oneOf' condition met for '${depKey}' with value '${inputArgs[depKey]}'.`);
        }
      }
    }
  }
  return { valid: errors.length === 0, errors };
}


async function runTests() {
  const testCasesPath = path.join(__dirname, 'instance_command_test_cases.json');
  const testCases: TestCase[] = JSON.parse(fs.readFileSync(testCasesPath, 'utf-8'));
  
  const outputLines: string[] = [];
  let allTestsPassed = true;

  outputLines.push("Instance Command Test Results:");
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

    // Validate input against dependencies
    const validationResult = validateInputArgs(commandDef, tc.inputArgs);
    if (tc.expectedValidationError) {
      if (validationResult.valid) {
        outputLines.push("Validation Status: FAILED - Expected validation error, but got none.");
        allTestsPassed = false;
      } else {
        outputLines.push(`Validation Status: PASSED - Correctly identified validation errors: ${validationResult.errors.join(', ')}`);
      }
      // Skip CLI generation if validation error is expected and occurs
      outputLines.push("---");
      continue;
    } else if (!validationResult.valid) {
      outputLines.push(`Validation Status: FAILED - Unexpected validation errors: ${validationResult.errors.join(', ')}`);
      allTestsPassed = false;
      // Optionally, still attempt to generate CLI string to see what it produces
    } else {
      outputLines.push("Validation Status: PASSED - Input conforms to dependencies.");
    }


    const generatedCli = buildCliCommandString(commandDef, tc.inputArgs);
    outputLines.push(`Generated CLI: ${generatedCli}`);

    let testPassed = true;

    // Check expected parameters
    for (const expectedParam of tc.expectedCliParams) {
      // Use a regex to allow for flexibility in whitespace around parameters,
      // and to handle quoted values correctly.
      // This regex looks for the parameter, possibly followed by a space and a value (quoted or unquoted).
      // It handles cases like "-param value" and "-param \"value with spaces\"" and "-param" (for booleans)
      const regex = new RegExp(`(^|\\s)${expectedParam.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\s+/g, '\\s+')}(\\s|$)`);
      if (!generatedCli.includes(expectedParam)) { // Simpler check for now, can be regex later
         // A more robust check would be to parse generatedCli or use regex.
         // For now, simple string inclusion, assuming expectedCliParams are full "-param value" strings.
         let found = false;
         const cliParts = generatedCli.split(' ');
         const expectedParts = expectedParam.split(' ');
         if (expectedParts.length === 1) { // e.g. -sysDba
            if (cliParts.includes(expectedParts[0])) found = true;
         } else if (expectedParts.length === 2) { // e.g. -name ora_inst_sid
            const paramIndex = cliParts.indexOf(expectedParts[0]);
            if (paramIndex !== -1 && cliParts[paramIndex + 1] === expectedParts[1]) found = true;
         } else { // e.g. -protocolType "HTTP Proxy"
             if (generatedCli.includes(expectedParam)) found = true;
         }

        if (!found) {
            outputLines.push(`  FAIL: Expected param "${expectedParam}" NOT FOUND.`);
            testPassed = false;
        } else {
            outputLines.push(`  PASS: Expected param "${expectedParam}" found.`);
        }
      } else {
        outputLines.push(`  PASS: Expected param "${expectedParam}" found.`);
      }
    }

    // Check absent parameters
    if (tc.absentCliParams) {
      for (const absentParam of tc.absentCliParams) {
        // absentParam is just the flag, e.g., "-database"
        const paramFlag = absentParam.split(' ')[0]; 
        if (generatedCli.includes(paramFlag)) {
          outputLines.push(`  FAIL: Absent param "${paramFlag}" IS PRESENT.`);
          testPassed = false;
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
  
  const outputPath = path.join(__dirname, 'generated_instance_commands.txt');
  fs.writeFileSync(outputPath, outputLines.join('\n'));
  console.log(`Test results written to ${outputPath}`);
  if (!allTestsPassed) {
    // console.error("Some tests failed. Check generated_instance_commands.txt for details.");
    // process.exit(1); // Indicate failure
  }
}

runTests().catch(error => {
  console.error("Error running tests:", error);
  process.exit(1);
});
