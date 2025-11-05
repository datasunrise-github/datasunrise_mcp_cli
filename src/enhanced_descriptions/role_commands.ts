import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// role_add_access
registerCommandDescription('role_add_access', {
  description: createCommandDescription(
    'Adds',
    'a new Access Role',
    'to DataSunrise. Roles define permissions for DataSunrise users. 🔒 Security-sensitive.',
    'high'
  ),
  detailedDescription: `
This command creates a new Access Role within DataSunrise. 
Access Roles are fundamental to controlling user permissions and access to DataSunrise features and configurations. 
You can optionally link a role to an Active Directory group Distinguished Name (DN) for AD-integrated permission management.
  `,
  examples: [
    {
      description: 'Add a new role "Auditors"',
      command: 'role_add_access -name Auditors'
    },
    {
      description: 'Add a role "DBAdmins_AD" linked to an AD group',
      command: 'role_add_access -name DBAdmins_AD -groupDN "CN=DBAdmins,OU=Groups,DC=example,DC=com"'
    }
  ],
  relatedCommands: ['role_update_access', 'role_show_all_access', 'role_grant_permissions', 'role_delete_access', 'ds_user_add'],
  contextualHelp: {
    name: createParameterHelp(
      'Unique name for the new access role.',
      { suggestion: 'e.g., "ReadOnlyUsers", "SecurityAdministrators", "ReportViewers".' }
    ),
    groupDN: createParameterHelp(
      'Active Directory group Distinguished Name(s) to associate with this role. If provided, users in this AD group may inherit permissions from this role, depending on DataSunrise AD integration settings.',
      { suggestion: 'e.g., "CN=DS_Operators,OU=ITGroups,DC=corp,DC=example,DC=com". Multiple DNs can be comma-separated.' }
    )
  }
});

// role_update_access
registerCommandDescription('role_update_access', {
  description: createCommandDescription(
    'Updates',
    'an existing Access Role\'s name or associated AD group DN',
    'in DataSunrise. 🔒 Security-sensitive.',
    'high'
  ),
  examples: [
    {
      description: 'Rename role "OldRoleName" to "NewRoleName" and update its AD group DN',
      command: 'role_update_access -name OldRoleName -newName NewRoleName -groupDN "CN=NewADGroup,DC=example,DC=com"'
    }
  ],
  relatedCommands: ['role_add_access', 'role_show_one_access'],
  contextualHelp: {
    name: createParameterHelp('Current name of the Access Role to update.'),
    newName: createParameterHelp('New name for the Access Role. Must be unique if provided.'),
    groupDN: createParameterHelp('New Active Directory group DN(s) to associate. Replaces existing. Comma-separated for multiple.')
  }
});

// role_show_all_access
registerCommandDescription('role_show_all_access', {
  description: createCommandDescription(
    'Displays',
    'a list of all configured Access Roles',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'List all Access Roles', command: 'role_show_all_access' }]
});

// role_show_one_access
registerCommandDescription('role_show_one_access', {
  description: createCommandDescription(
    'Shows',
    'detailed information and permissions for a specific Access Role',
    'in DataSunrise.',
    'none'
  ),
  examples: [{ description: 'Show details for role "Auditors"', command: 'role_show_one_access -name Auditors' }],
  contextualHelp: { name: createParameterHelp('Name of the Access Role to display.') }
});

// role_grant_all_permissions
registerCommandDescription('role_grant_all_permissions', {
  description: createCommandDescription(
    'Grants',
    'all available permissions to a specified Access Role',
    'in DataSunrise. 🔒 Use with extreme caution, typically only for super-administrator roles.',
    'high'
  ),
  detailedDescription: 'This command assigns all possible permissions within DataSunrise to the specified Access Role. This effectively makes any user with this role a super-administrator. This should be used very sparingly and only for highly trusted roles.',
  examples: [
    {
      description: 'Grant all permissions to role "SuperAdminRole" (USE WITH CAUTION)',
      command: 'role_grant_all_permissions -name SuperAdminRole'
    }
  ],
  relatedCommands: ['role_grant_permissions', 'role_revoke_all_permissions', 'role_revoke_permissions'],
  contextualHelp: { name: createParameterHelp('Name of the Access Role to grant all permissions to.') }
});

// role_grant_permissions
registerCommandDescription('role_grant_permissions', {
  description: createCommandDescription(
    'Grants',
    'specific permissions (delete, list, edit, insert, view, execute) for specified actions/entities to an Access Role',
    'in DataSunrise. 🔒 Granular permission assignment.',
    'high'
  ),
  detailedDescription: `
This command allows for fine-grained assignment of permissions to an Access Role. 
You can specify which actions (e.g., 'Instance', 'Rule', 'User') the role can perform 
for each permission type (view, insert, edit, delete, list, execute). 
Permissions are additive; this command does not revoke existing permissions not mentioned.
  `,
  examples: [
    {
      description: 'Grant "Auditors" role view access to "Instance" and "Rule" entities, and list access to "User" entities',
      command: 'role_grant_permissions -name Auditors -viewActions "Instance,Rule" -listActions "User"'
    }
  ],
  relatedCommands: ['role_set_permissions', 'role_revoke_permissions', 'role_show_one_access'],
  contextualHelp: {
    name: createParameterHelp('Name of the Access Role to modify.'),
    deleteActions: createParameterHelp('Comma-separated actions/entities for DELETE permission (e.g., "Instance,Rule").'),
    listActions: createParameterHelp('Comma-separated actions/entities for LIST permission.'),
    editActions: createParameterHelp('Comma-separated actions/entities for EDIT permission.'),
    insertActions: createParameterHelp('Comma-separated actions/entities for INSERT permission.'),
    viewActions: createParameterHelp('Comma-separated actions/entities for VIEW permission.'),
    executeActions: createParameterHelp('Comma-separated actions/entities for EXECUTE permission (e.g., for tasks or reports).')
  }
});

// role_set_permissions
registerCommandDescription('role_set_permissions', {
  description: createCommandDescription(
    'Sets',
    'specific permissions for an Access Role, revoking any not explicitly granted in this command',
    'in DataSunrise. 🔒 Overwrites existing permissions for the role.',
    'high'
  ),
  detailedDescription: `
This command defines the complete set of permissions for an Access Role. 
Any permissions previously granted to the role but not included in this command's parameters will be revoked. 
Use this to establish an exact permission set for a role.
  `,
  examples: [
    {
      description: 'Set "ReportViewers" role to only have view access to "Report" and list access to "ReportGenTask"',
      command: 'role_set_permissions -name ReportViewers -viewActions "Report" -listActions "ReportGenTask"'
    }
  ],
  relatedCommands: ['role_grant_permissions', 'role_revoke_permissions', 'role_show_one_access'],
  commonIssues: ['Be careful, as this command overwrites all existing permissions for the role with those specified.'],
  contextualHelp: {
    name: createParameterHelp('Name of the Access Role to modify.'),
    deleteActions: createParameterHelp('Comma-separated actions/entities for DELETE permission. Omit or leave empty for no delete access.'),
    listActions: createParameterHelp('Comma-separated actions/entities for LIST permission.'),
    editActions: createParameterHelp('Comma-separated actions/entities for EDIT permission.'),
    insertActions: createParameterHelp('Comma-separated actions/entities for INSERT permission.'),
    viewActions: createParameterHelp('Comma-separated actions/entities for VIEW permission.'),
    executeActions: createParameterHelp('Comma-separated actions/entities for EXECUTE permission.')
  }
});

// role_revoke_all_permissions
registerCommandDescription('role_revoke_all_permissions', {
  description: createCommandDescription(
    'Revokes',
    'all permissions from a specified Access Role',
    'in DataSunrise. 🔒 Leaves the role with no permissions.',
    'high'
  ),
  examples: [
    {
      description: 'Revoke all permissions from role "FormerAdmin"',
      command: 'role_revoke_all_permissions -name FormerAdmin'
    }
  ],
  relatedCommands: ['role_grant_all_permissions', 'role_revoke_permissions'],
  contextualHelp: { name: createParameterHelp('Name of the Access Role to revoke all permissions from.') }
});

// role_revoke_permissions
registerCommandDescription('role_revoke_permissions', {
  description: createCommandDescription(
    'Revokes',
    'specific permissions for specified actions/entities from an Access Role',
    'in DataSunrise. 🔒 Granular permission removal.',
    'high'
  ),
  examples: [
    {
      description: 'Revoke edit access to "Rule" entities from role "Operators"',
      command: 'role_revoke_permissions -name Operators -editActions "Rule"'
    }
  ],
  relatedCommands: ['role_grant_permissions', 'role_set_permissions', 'role_show_one_access'],
  contextualHelp: {
    name: createParameterHelp('Name of the Access Role to modify.'),
    deleteActions: createParameterHelp('Comma-separated actions/entities for DELETE permission to revoke.'),
    listActions: createParameterHelp('Comma-separated actions/entities for LIST permission to revoke.'),
    editActions: createParameterHelp('Comma-separated actions/entities for EDIT permission to revoke.'),
    insertActions: createParameterHelp('Comma-separated actions/entities for INSERT permission to revoke.'),
    viewActions: createParameterHelp('Comma-separated actions/entities for VIEW permission to revoke.'),
    executeActions: createParameterHelp('Comma-separated actions/entities for EXECUTE permission to revoke.')
  }
});

// role_delete_access
registerCommandDescription('role_delete_access', {
  description: createCommandDescription(
    'Deletes',
    'an Access Role',
    'from DataSunrise. 🔒 Security-sensitive.',
    'high'
  ),
  detailedDescription: `
This command removes an Access Role from DataSunrise. 
Ensure the role is not assigned to any active users before deletion, or those users may lose their configured permissions.
  `,
  examples: [
    {
      description: 'Delete Access Role "ObsoleteRole"',
      command: 'role_delete_access -name ObsoleteRole'
    }
  ],
  relatedCommands: ['role_add_access', 'ds_user_update'], // Users might need role reassignment
  commonIssues: ['Verify no users are currently assigned this role before deletion.'],
  contextualHelp: {
    name: createParameterHelp('Name of the Access Role to delete.')
  }
});
