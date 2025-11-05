import { applicationCommands } from './applicationCommands.js';
import { cefCommands } from './cefCommands.js';
import { connectCommands } from './connectCommands.js';
import { coreCommands } from './coreCommands.js';
import { dbUserCommands } from './dbUserCommands.js';
import { dictionaryCommands } from './dictionaryCommands.js';
import { discoveryCommands } from './discoveryCommands.js';
import { dsUserCommands } from './dsUserCommands.js';
import { hostCommands } from './hostCommands.js';
import { importCommands } from './importCommands.js';
import { instanceCommands } from './instanceCommands.js';
import { licenseCommands } from './licenseCommands.js';
import { objectGroupCommands } from './objectGroupCommands.js';
import { parametersCommands } from './parametersCommands.js';
import { periodicTaskCommands } from './periodicTaskCommands.js';
import { queryGroupCommands } from './queryGroupCommands.js';
import { reportGenCommands } from './reportGenCommands.js';
import { reportsCommands } from './reportsCommands.js';
import { roleCommands } from './roleCommands.js';
import { ruleCommands } from './ruleCommands.js';
import { scheduleCommands } from './scheduleCommands.js';
import { serverCommands } from './serverCommands.js';
import { sslKeyGroupCommands } from './sslKeyGroupCommands.js';
import { staticMaskingCommands } from './staticMaskingCommands.js';
import { subscriberCommands } from './subscriberCommands.js';
import { tagCommands } from './tagCommands.js';
import { miscCommands } from './miscCommands.js';
import { systemSettingsCommands } from './systemSettingsCommands.js';
import { dsServerCommands } from './dsServerCommands.js'; // Added import for dsServerCommands
import { snifferCommands } from './snifferCommands.js';
import { resourceGroupCommands } from './resourceGroupCommands.js';
import { CliCommand } from './types.js';

export const allCliCommands: CliCommand[] = [
  ...connectCommands, // Added connectCommands
  ...applicationCommands,
  ...cefCommands,
  ...coreCommands,
  ...dbUserCommands,
  ...dictionaryCommands,
  ...discoveryCommands,
  ...dsUserCommands,
  ...hostCommands,
  ...importCommands,
  ...instanceCommands,
  ...licenseCommands,
  ...objectGroupCommands,
  ...parametersCommands,
  ...periodicTaskCommands,
  ...queryGroupCommands,
  ...reportGenCommands,
  ...reportsCommands,
  ...roleCommands,
  ...ruleCommands,
  ...scheduleCommands,
  ...serverCommands,
  ...sslKeyGroupCommands,
  ...staticMaskingCommands,
  ...subscriberCommands,
  ...tagCommands,
  ...miscCommands,
  ...systemSettingsCommands,
  ...dsServerCommands, // Added dsServerCommands to the array
  ...snifferCommands,
  ...resourceGroupCommands,
];

// Re-export individual command arrays if needed elsewhere, though allCliCommands is primary
export {
  connectCommands,
  applicationCommands,
  cefCommands,
  coreCommands,
  dbUserCommands,
  dictionaryCommands,
  discoveryCommands,
  dsUserCommands,
  hostCommands,
  importCommands,
  instanceCommands,
  licenseCommands,
  objectGroupCommands,
  parametersCommands,
  periodicTaskCommands,
  queryGroupCommands,
  reportGenCommands,
  reportsCommands,
  roleCommands,
  ruleCommands,
  scheduleCommands,
  serverCommands,
  sslKeyGroupCommands,
  staticMaskingCommands,
  subscriberCommands,
  tagCommands,
  miscCommands,
  systemSettingsCommands,
  dsServerCommands, // Added dsServerCommands to exports
  snifferCommands,
  resourceGroupCommands,
};

export * from './types.js'; // Export types as well
