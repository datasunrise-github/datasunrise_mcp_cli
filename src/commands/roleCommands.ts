import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const roleCommands: CliCommand[] = [
  {
    toolName: 'role_add_access', // Was role_add_access_detailed, simplified
    description: 'Adds a new Access Role. Roles define permissions for DataSunrise users. Can optionally link to an Active Directory group.',
    baseCommand: 'addAccessRole',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Unique name for the new access role.'), required: true, cliName: '-name' },
      { name: 'groupDN', type: 'string', description: enhanceParameterDescription('string', 'Active Directory group Distinguished Name(s) to associate with this role.'), required: false, cliName: '-groupDN' },
    ],
    category: 'Role',
  },
  {
    toolName: 'role_update_access',
    description: "Updates an existing Access Role's name or associated AD group DN.",
    baseCommand: 'updateAccessRole',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current name of the Access Role to update.'), required: true, cliName: '-name' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'New name for the Access Role.'), required: false, cliName: '-newName' },
      { name: 'groupDN', type: 'string', description: enhanceParameterDescription('string', 'New Active Directory group DN(s) to associate. Replaces existing.'), required: false, cliName: '-groupDN' },
    ],
    category: 'Role',
  },
  {
    toolName: 'role_show_all_access',
    description: 'Displays a list of all configured Access Roles in DataSunrise.',
    baseCommand: 'showAccessRoles',
    params: [],
    category: 'Role',
  },
  {
    toolName: 'role_show_one_access',
    description: 'Shows detailed information and permissions for a specific Access Role.',
    baseCommand: 'showAccessRole',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Access Role to display.'), required: true, cliName: '-name' },
    ],
    category: 'Role',
  },
  {
    toolName: 'role_grant_all_permissions',
    description: 'Grants all available permissions to a specified Access Role.',
    baseCommand: 'grantAllPermToRole',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Access Role to grant all permissions to.'), required: true, cliName: '-name' },
    ],
    category: 'Role',
  },
  {
    toolName: 'role_grant_permissions',
    description: 'Grants specific permissions (delete, list, edit, insert, view, execute) for specified actions/entities to an Access Role. This command ADDS the specified permissions to any existing permissions; it does not remove other permissions already granted to the role. Use this when you want to add new permissions without altering others.',
    baseCommand: 'grantPermToRole', // Note: The CLI syntax for actions is complex (e.g., -delete "Action1,Action2")
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Access Role.'), required: true, cliName: '-name' },
      { name: 'deleteActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for DELETE permission. See CLI guide for full list.', 'LIST'), required: false, cliName: '-delete' },
      { name: 'listActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for LIST permission. See CLI guide for full list.', 'LIST'), required: false, cliName: '-list' },
      { name: 'editActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for EDIT permission. See CLI guide for full list.', 'LIST'), required: false, cliName: '-edit' },
      { name: 'insertActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for INSERT permission. See CLI guide for full list.', 'LIST'), required: false, cliName: '-insert' },
      { name: 'viewActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for VIEW permission. See CLI guide for full list.', 'LIST'), required: false, cliName: '-view' },
      { name: 'executeActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for EXECUTE permission. See CLI guide for full list.', 'LIST'), required: false, cliName: '-execute'},
    ],
    category: 'Role',
  },
  {
    toolName: 'role_set_permissions',
    description: 'Sets the complete list of permissions for an Access Role. Any permissions previously granted to the role but NOT specified in this command will be REVOKED. Use this when you want to define the exact set of permissions a role should have, effectively overwriting its current permission set.',
    baseCommand: 'setPermissionsToRole',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Access Role.'), required: true, cliName: '-name' },
      { name: 'deleteActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for DELETE permission. See CLI guide for full list.', 'LIST'), required: false, cliName: '-delete' },
      { name: 'listActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for LIST permission. See CLI guide for full list.', 'LIST'), required: false, cliName: '-list' },
      { name: 'editActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for EDIT permission. See CLI guide for full list.', 'LIST'), required: false, cliName: '-edit' },
      { name: 'insertActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for INSERT permission. See CLI guide for full list.', 'LIST'), required: false, cliName: '-insert' },
      { name: 'viewActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for VIEW permission. See CLI guide for full list.', 'LIST'), required: false, cliName: '-view' },
      { name: 'executeActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for EXECUTE permission. See CLI guide for full list.', 'LIST'), required: false, cliName: '-execute'},
    ],
    category: 'Role',
  },
  {
    toolName: 'role_revoke_all_permissions',
    description: 'Revokes all permissions from a specified Access Role.',
    baseCommand: 'revokeAllPermFromRole',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Access Role to revoke all permissions from.'), required: true, cliName: '-name' },
    ],
    category: 'Role',
  },
  {
    toolName: 'role_revoke_permissions',
    description: 'Revokes specific permissions for specified actions/entities from an Access Role.',
    baseCommand: 'revokePermFromRole',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Access Role.'), required: true, cliName: '-name' },
      { name: 'deleteActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for DELETE permission to revoke.', 'LIST'), required: false, cliName: '-delete' },
      { name: 'listActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for LIST permission to revoke.', 'LIST'), required: false, cliName: '-list' },
      { name: 'editActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for EDIT permission to revoke.', 'LIST'), required: false, cliName: '-edit' },
      { name: 'insertActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for INSERT permission to revoke.', 'LIST'), required: false, cliName: '-insert' },
      { name: 'viewActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for VIEW permission to revoke.', 'LIST'), required: false, cliName: '-view' },
      { name: 'executeActions', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated actions/entities for EXECUTE permission to revoke.', 'LIST'), required: false, cliName: '-execute'},
    ],
    category: 'Role',
  },
  {
    toolName: 'role_delete_access',
    description: 'Deletes an Access Role.',
    baseCommand: 'delAccessRole',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the Access Role to delete.'), required: true, cliName: '-name' },
    ],
    category: 'Role',
  },
];
