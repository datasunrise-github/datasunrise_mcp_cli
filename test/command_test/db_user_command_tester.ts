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
        if (value === true) {
          appliedParams.push(paramDef.cliName);
        }
      } else {
        const paramValue = typeof value === 'string' && value.includes(' ') ? `"${value}"` : String(value);
        appliedParams.push(`${paramDef.cliName} ${paramValue}`);
      }
    }
  }
  return `${cliString} ${appliedParams.join(' ')}`.trim();
}

function validateInputArgs(commandDef: CliCommand, inputArgs: Record<string, any>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  // DB User commands might have dependencies (e.g., adLogin vs adGroup for db_user_mapping_add)
  // For now, this is a placeholder. A more robust validation would check these.
  if (commandDef.toolName === 'db_user_mapping_add') {
    if (!inputArgs.adLogin && !inputArgs.adGroup) {
      errors.push("Dependency Error: For db_user_mapping_add, either 'adLogin' or 'adGroup' must be provided.");
    }
  }
  if (commandDef.dependencies) {
     // Implement full dependency checking if complex dependencies are added to command definitions
    errors.push("General dependency checking for DB User commands not fully implemented in this test script yet.");
  }
  return { valid: errors.length === 0, errors };
}

async function runTests() {
  const testCasesPath = path.join(__dirname, 'db_user_command_test_cases.json'); // Adjusted path
  const testCases: TestCase[] = JSON.parse(fs.readFileSync(testCasesPath, 'utf-8'));
  
  const outputLines: string[] = [];
  let allTestsPassed = true;

  outputLines.push("DB User Command Test Results:"); // Adjusted title
  outputLines.push("============================");

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
          if (expectedParam.includes('"')) {
            if (generatedCli.includes(expectedParam)) found = true;
          } else if (paramIndex + 1 < cliParts.length && cliParts[paramIndex + 1] === expectedValue) {
            found = true;
          }
        }
      }
      if (!found && expectedParam.includes('"') && generatedCli.includes(expectedParam)) {
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
  
  const outputPath = path.join(__dirname, 'generated_db_user_commands.txt'); // Adjusted output file
  fs.writeFileSync(outputPath, outputLines.join('\n'));
  console.log(`Test results written to ${outputPath}`);
  if (!allTestsPassed) {
    // process.exit(1); 
  }
}

runTests().catch(error => {
  console.error("Error running DB User command tests:", error); // Adjusted error message
  process.exit(1);
});
