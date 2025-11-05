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

async function runTests() {
  const testCasesPath = path.join(__dirname, 'misc_command_test_cases.json');
  const testCases: TestCase[] = JSON.parse(fs.readFileSync(testCasesPath, 'utf-8'));
  
  const outputLines: string[] = [];
  let allTestsPassed = true;

  outputLines.push("Misc Command Test Results:");
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

    const generatedCli = buildCliCommandString(commandDef, tc.inputArgs);
    outputLines.push(`Generated CLI: ${generatedCli}`);

    let testPassed = true;

    for (const expectedParam of tc.expectedCliParams) {
      if (!generatedCli.includes(expectedParam)) {
        let found = false;
        const cliParts = generatedCli.split(' ');
        const expectedParts = expectedParam.split(' ');
        if (expectedParts.length === 1) {
           if (cliParts.includes(expectedParts[0])) found = true;
        } else if (expectedParts.length === 2) {
           const paramIndex = cliParts.indexOf(expectedParts[0]);
           if (paramIndex !== -1 && cliParts[paramIndex + 1] === expectedParts[1]) found = true;
        } else {
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
  
  const outputPath = path.join(__dirname, 'generated_misc_commands.txt');
  fs.writeFileSync(outputPath, outputLines.join('\n'));
  console.log(`Test results written to ${outputPath}`);
}

runTests().catch(error => {
  console.error("Error running tests:", error);
  process.exit(1);
});
