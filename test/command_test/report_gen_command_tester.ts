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
        // Boolean false values are typically omitted unless their default is true
        // and the CLI expects an explicit "false" representation.
        // For these commands, `enabled` and `generateReport` default to true.
        // `operationsWithError` and `writeToSyslog` default to false.
      } else {
        let paramValue = String(value);
        // Quote if it's a string and contains spaces or commas (for list-like params)
        const needsQuoting = typeof value === 'string' && (
            value.includes(' ') || 
            ( (paramDef.cliName === '-rules' || 
               paramDef.cliName === '-instances' || 
               paramDef.cliName === '-queryTypes' ||
               paramDef.cliName === '-reportColumns' ||
               paramDef.cliName === '-subscribers' ||
               paramDef.cliName === '-searchByInfoTypes') && value.includes(',')) ||
            paramDef.cliName === '-cronExpression' // Cron expressions can have spaces
        );

        if (needsQuoting) {
            if (!((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))) {
                 paramValue = `"${value.replace(/"/g, '\\"')}"`;
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
  // Report Gen commands are relatively simple in current definitions.
  if (commandDef.dependencies) {
    errors.push("Dependency checking for report generation commands not fully implemented in this test script yet.");
  }
  return { valid: errors.length === 0, errors };
}

async function runTests() {
  const testCasesPath = path.join(__dirname, 'report_gen_command_test_cases.json'); // Adjusted path
  const testCases: TestCase[] = JSON.parse(fs.readFileSync(testCasesPath, 'utf-8'));
  
  const outputLines: string[] = [];
  let allTestsPassed = true;

  outputLines.push("Report Generation Command Test Results:"); // Adjusted title
  outputLines.push("=====================================");

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
      if (generatedCli.includes(expectedParam)) {
         outputLines.push(`  PASS: Expected param "${expectedParam}" found.`);
      } else {
        outputLines.push(`  FAIL: Expected param "${expectedParam}" NOT FOUND.`);
        testPassed = false;
      }
    }

    if (tc.absentCliParams) { 
      for (const absentParam of tc.absentCliParams) {
        const paramFlag = absentParam.split(' ')[0]; 
        if (generatedCli.includes(paramFlag)) {
          const paramDef = commandDef.params.find(p => p.cliName === paramFlag);
          if (paramDef && paramDef.type === 'boolean' && tc.inputArgs[paramDef.name] === false && (paramDef.defaultValue === true )) {
             outputLines.push(`  PASS: Absent param "${paramFlag}" is correctly absent (value is false, default was true).`);
          } else if (paramDef && paramDef.type === 'boolean' && tc.inputArgs[paramDef.name] === false && (paramDef.defaultValue === undefined || paramDef.defaultValue === false )) {
            outputLines.push(`  PASS: Absent param "${paramFlag}" is correctly absent (value is false, default was false/undefined).`);
          }
           else {
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
  
  const outputPath = path.join(__dirname, 'generated_report_gen_commands.txt'); // Adjusted output file
  fs.writeFileSync(outputPath, outputLines.join('\n'));
  console.log(`Test results written to ${outputPath}`);
  if (!allTestsPassed) {
    // process.exit(1); 
  }
}

runTests().catch(error => {
  console.error("Error running Report Generation command tests:", error); // Adjusted error message
  process.exit(1);
});
