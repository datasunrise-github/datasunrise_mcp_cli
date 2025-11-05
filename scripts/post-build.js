#!/usr/bin/env node
// Cross-platform post-build script to handle file permissions and copying test files
// This script works on Windows, macOS and Linux through Node.js platform abstraction

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Get proper directory paths in a cross-platform way
// This handles Windows backslashes (\) and Unix forward slashes (/) automatically
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const buildDir = path.join(rootDir, 'build');
const testDir = path.join(rootDir, 'test', 'command_test');
const buildTestDir = path.join(buildDir, 'test', 'command_test');
const indexJsPath = path.join(buildDir, 'src', 'index.js');

// Log platform information to help with debugging
console.log(`Operating System: ${process.platform}`);
console.log(`Node.js Version: ${process.version}`);
console.log(`Working Directory: ${process.cwd()}`);

async function main() {
  try {
    console.log('Running post-build tasks...');

    // Step 1: Set executable permissions on build/src/index.js (Unix-only)
    if (fs.existsSync(indexJsPath)) {
      console.log(`Setting executable permissions on ${indexJsPath}`);
      
      if (process.platform !== 'win32') {
        // On Unix-like systems (macOS, Linux), use chmod to make the file executable
        try {
          fs.chmodSync(indexJsPath, '755');
          console.log('File permissions updated successfully');
        } catch (err) {
          console.error('Error setting executable permissions:', err);
        }
      } else {
        // On Windows, executable permissions don't work the same way
        // Windows uses file extensions to determine how to execute files
        // .js files are associated with Node.js if it's installed properly
        console.log('On Windows, executable files are handled via file associations rather than permissions');
      }
    } else {
      console.error(`ERROR: ${indexJsPath} does not exist`);
      process.exit(1);
    }

    // Step 2: Create build/test directory if it doesn't exist
    // fs.mkdirSync with recursive flag works the same on all platforms
    if (!fs.existsSync(buildTestDir)) {
      console.log(`Creating directory: ${buildTestDir}`);
      fs.mkdirSync(buildTestDir, { recursive: true });
    }

    // Step 3: Copy test/*_command_test_cases.json files to build/test/command_test/
    // fs.readdirSync and fs.copyFileSync work the same on all platforms
    const testFiles = fs.readdirSync(testDir);
    const jsonTestFiles = testFiles.filter(file => file.endsWith('_command_test_cases.json'));
    
    if (jsonTestFiles.length === 0) {
      console.log('No _command_test_cases.json files found in test directory');
    } else {
      console.log(`Copying ${jsonTestFiles.length} test JSON files to ${buildTestDir}`);
      
      for (const file of jsonTestFiles) {
        const srcPath = path.join(testDir, file);
        const destPath = path.join(buildTestDir, file);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${file}`);
      }
    }

    // Step 4: Copy test/*.js files to build/test/command_test/
    const jsTestFiles = testFiles.filter(file => file.endsWith('.js'));
    
    if (jsTestFiles.length === 0) {
      console.log('No .js test files found in test directory');
    } else {
      console.log(`Copying ${jsTestFiles.length} .js test files to ${buildTestDir}`);
      
      for (const file of jsTestFiles) {
        const srcPath = path.join(testDir, file);
        const destPath = path.join(buildTestDir, file);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${file}`);
      }
    }

    console.log('Post-build tasks completed successfully');
  } catch (error) {
    console.error('Post-build script failed:', error);
    process.exit(1);
  }
}

main();
