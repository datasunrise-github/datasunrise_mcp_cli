import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const staticMaskingCommands: CliCommand[] = [
  {
    toolName: 'static_masking_start',
    description: 'Starts a static masking task. This involves copying data from a source instance to a target instance, applying masking rules as defined in a table configuration JSON file.',
    baseCommand: 'statMask',
    params: [
      { name: 'sourceInstance', type: 'string', description: enhanceParameterDescription('string', 'Name of the source DataSunrise instance.'), required: true, cliName: '-sourceInstance' },
      { name: 'targetInstance', type: 'string', description: enhanceParameterDescription('string', 'Name of the target DataSunrise instance where masked data will be written.'), required: true, cliName: '-targetInstance' },
      { name: 'tableFile', type: 'string', description: enhanceParameterDescription('string', 'Path to the JSON file defining tables and columns to be masked, along with their masking rules.', 'FILE_PATH'), required: true, cliName: '-tableFile' },
      { name: 'sourceLogin', type: 'string', description: enhanceParameterDescription('string', 'Source instance user login.'), required: false, cliName: '-sourceLogin' },
      { name: 'sourcePassword', type: 'string', description: enhanceParameterDescription('string', 'Source instance user password.'), required: false, cliName: '-sourcePassword' },
      { name: 'sourceSysDba', type: 'boolean', description: enhanceParameterDescription('boolean', 'Connect as the SYSDBA to a source database (Oracle-specific).'), required: false, cliName: '-sourceSysDba' },
      { name: 'targetLogin', type: 'string', description: enhanceParameterDescription('string', 'Target instance user login.'), required: false, cliName: '-targetLogin' },
      { name: 'targetPassword', type: 'string', description: enhanceParameterDescription('string', 'Target instance user password.'), required: false, cliName: '-targetPassword' },
      { name: 'targetSysDba', type: 'boolean', description: enhanceParameterDescription('boolean', 'Connect as the SYSDBA to a target database (Oracle-specific).'), required: false, cliName: '-targetSysDba' },
      { name: 'c', type: 'boolean', description: enhanceParameterDescription('boolean', "Create target tables if they don't exist."), required: false, cliName: '-c', defaultValue: true },
      { name: 'd', type: 'boolean', description: enhanceParameterDescription('boolean', "Create target default constraints if they don't exist."), required: false, cliName: '-d' },
      { name: 'i', type: 'boolean', description: enhanceParameterDescription('boolean', "Create target indexes if they don't exist."), required: false, cliName: '-i' },
      { name: 'k', type: 'boolean', description: enhanceParameterDescription('boolean', "Create target foreign keys if they don't exist."), required: false, cliName: '-k' },
      { name: 'o', type: 'boolean', description: enhanceParameterDescription('boolean', "Create target check constraints if they don't exist."), required: false, cliName: '-o' },
      { name: 'r', type: 'boolean', description: enhanceParameterDescription('boolean', "Create target constraints if they don't exist."), required: false, cliName: '-r' },
      { name: 't', type: 'boolean', description: enhanceParameterDescription('boolean', 'Truncate target table before masking.'), required: false, cliName: '-t' },
      { name: 'disableTriggers', type: 'boolean', description: enhanceParameterDescription('boolean', 'Disable triggers.'), required: false, cliName: '-disableTriggers' },
      { name: 'e', type: 'boolean', description: enhanceParameterDescription('boolean', 'Check that target table is empty.'), required: false, cliName: '-e' },
      { name: 'f', type: 'boolean', description: enhanceParameterDescription('boolean', 'Apply related table filters.'), required: false, cliName: '-f' },
      { name: 'loader', type: 'string', description: enhanceParameterDescription('string', 'Database loader.'), required: false, cliName: '-loader' },
      { name: 'p', type: 'boolean', description: enhanceParameterDescription('boolean', 'Mask in place.'), required: false, cliName: '-p' },
      { name: 'parallel', type: 'boolean', description: enhanceParameterDescription('boolean', 'Use parallel load.'), required: false, cliName: '-parallel' },
      { name: 'proxy', type: 'boolean', description: enhanceParameterDescription('boolean', 'Use proxy for masking.'), required: false, cliName: '-proxy' },
      { name: 'rt', type: 'boolean', description: enhanceParameterDescription('boolean', 'Auto-resolve relationship types between related tables if there are undefined ones.'), required: false, cliName: '-rt' },
    ],
    category: 'Static Masking',
  },
  {
    toolName: 'static_masking_show_status',
    description: 'Shows the status and details of a specific static masking task by its ID. Can also save configuration to a file.',
    baseCommand: 'showStatMasking',
    params: [
      { name: 'id', type: 'string', description: enhanceParameterDescription('string', 'ID of the static masking task to display.'), required: true, cliName: '-id' },
      { name: 'file', type: 'string', description: enhanceParameterDescription('string', 'Optional: Directory and file name for the output JSON file with static masking configuration.', 'FILE_PATH'), required: false, cliName: '-file' },
    ],
    category: 'Static Masking',
  },
  {
    toolName: 'static_masking_restart',
    description: 'Restarts a previously run or failed static masking task by its ID.',
    baseCommand: 'restartStatMasking',
    params: [
      { name: 'id', type: 'string', description: enhanceParameterDescription('string', 'ID of the static masking task to restart.'), required: true, cliName: '-id' }, // ID might be numeric
    ],
    category: 'Static Masking',
  },
];
