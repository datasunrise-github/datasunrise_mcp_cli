import { CliCommand } from './types.js';

export const resourceGroupCommands: CliCommand[] = [
    {
        toolName: 'export_resource_group',
        description: 'Export Resource Group',
        baseCommand: 'exportResourceGroup',
        params: [
            { name: 'templateName', cliName: '-templateName', description: 'name of the Template', type: 'string', required: true },
            { name: 'templateFormat', cliName: '-templateFormat', description: 'format of template: JSON', type: 'string', required: true },
            { name: 'auditRules', cliName: '-auditRules', description: 'names of Audit Rules separated by -nameSeparator. Default value of separator is ;', type: 'string', required: false },
            { name: 'auditRulesExt', cliName: '-auditRulesExt', description: 'names of external Audit Rules separated by -nameSeparator. Default value of separator is ;', type: 'string', required: false },
            { name: 'learningRules', cliName: '-learningRules', description: 'names of Learning Rules separated by -nameSeparator. Default value of separator is ;', type: 'string', required: false },
            { name: 'learningRulesExt', cliName: '-learningRulesExt', description: 'names of external Learning Rules separated by -nameSeparator. Default value of separator is ;', type: 'string', required: false },
            { name: 'maskingRules', cliName: '-maskingRules', description: 'names of Dynamic Masking Rules separated by -nameSeparator. Default value of separator is ;', type: 'string', required: false },
            { name: 'maskingRulesExt', cliName: '-maskingRulesExt', description: 'names of external Dynamic Masking Rules separated by -nameSeparator. Default value of separator is ;', type: 'string', required: false },
            { name: 'nameSeparator', cliName: '-nameSeparator', description: 'name separator. Used together with -auditRules, -auditRulesExt, -securityRules, -securityRulesExt, -maskingRules, -maskingRulesExt, -learningRules, -learningRulesExt. Default is ;', type: 'string', required: false },
            { name: 'securityRules', cliName: '-securityRules', description: 'names of Security Rules separated by -nameSeparator. Default value of separator is ;', type: 'string', required: false },
            { name: 'securityRulesExt', cliName: '-securityRulesExt', description: 'names of external Security Rules separated by -nameSeparator. Default value of separator is ;', type: 'string', required: false },
            { name: 'resourceGroup', cliName: '-resourceGroup', description: 'name of the Resource Group', type: 'string', required: false },
        ],
    },
    {
        toolName: 'deploy_resource_group_from_template',
        description: 'Deploy Resource Group from Template',
        baseCommand: 'deployResourceGroupFromTemplate',
        params: [
            { name: 'resourceGroupName', cliName: '-resourceGroupName', description: 'name of the Resource Group', type: 'string', required: true },
            { name: 'templateName', cliName: '-templateName', description: 'name of the Template', type: 'string', required: true },
            { name: 'fileName', cliName: '-fileName', description: 'name of the file with list of parameters', type: 'string', required: false },
            { name: 'parametersName', cliName: '-parametersName', description: 'name of the list of parameters', type: 'string', required: false },
            { name: 'url', cliName: '-url', description: 'URL with list of parameters', type: 'string', required: false },
        ],
    },
];
