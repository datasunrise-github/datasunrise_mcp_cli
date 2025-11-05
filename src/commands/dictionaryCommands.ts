import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const dictionaryCommands: CliCommand[] = [
  {
    toolName: 'dictionary_backup_create',
    description: 'Creates a backup of the DataSunrise system dictionary (configuration database).',
    baseCommand: 'createDictionaryBackup',
    params: [
      { name: 'o', type: 'boolean', description: 'Backup Objects.', required: false, cliName: '-o' },
      { name: 's', type: 'boolean', description: 'Backup Settings.', required: false, cliName: '-s' },
      { name: 'u', type: 'boolean', description: 'Backup Users.', required: false, cliName: '-u' },
      { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'Server name where proxy is opened or sniffer is used.'), required: false, cliName: '-dsServer' },
    ],
    category: 'Dictionary',
  },
  {
    toolName: 'dictionary_backup_show_all',
    description: 'Displays a list of available dictionary backups.',
    baseCommand: 'showDictionaryBackups',
    params: [
      { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'Server name where proxy is opened or sniffer is used.'), required: false, cliName: '-dsServer'},
    ],
    category: 'Dictionary',
  },
  {
    toolName: 'dictionary_clean',
    description: 'Cleans the DataSunrise dictionary. This is a destructive operation and should be used with caution.',
    baseCommand: 'cleanDictionary',
    params: [
        { name: 'force', type: 'boolean', description: enhanceParameterDescription('boolean', 'Force clean without confirmation.', undefined, true), required: true, cliName: '-f', defaultValue: true},
        { name: 'd', type: 'boolean', description: 'Clean Database entries.', required: false, cliName: '-d' },
        { name: 'o', type: 'boolean', description: 'Clean Object entries.', required: false, cliName: '-o' },
        { name: 'r', type: 'boolean', description: 'Clean Rule entries.', required: false, cliName: '-r' },
        { name: 'restart', type: 'boolean', description: 'Restart the Core after cleaning.', required: false, cliName: '-restart' },
        { name: 's', type: 'boolean', description: 'Clean the Settings.', required: false, cliName: '-s' },
        { name: 'u', type: 'boolean', description: 'Clean User entries.', required: false, cliName: '-u' },
    ],
    category: 'Dictionary',
  },
  {
    toolName: 'dictionary_recover',
    description: 'Recovers the DataSunrise dictionary from a specified backup ID.',
    baseCommand: 'recoverDictionary',
    params: [
      { name: 'id', type: 'string', description: enhanceParameterDescription('string', 'ID of the dictionary backup to recover from.'), required: true, cliName: '-id' },
      { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'Name of the DataSunrise server the backup file is located on.'), required: false, cliName: '-dsServer'},
    ],
    category: 'Dictionary',
  },
];
