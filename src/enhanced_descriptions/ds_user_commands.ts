import { registerCommandDescription } from '../description_registry.js';
import { createCommandDescription, enhanceParameterDescription, createParameterHelp } from '../description_helpers.js';

// ds_user_add
registerCommandDescription('ds_user_add', {
  description: createCommandDescription(
    'Adds',
    'a new DataSunrise administrative user',
    'to the system. 🔒 This is a security-sensitive operation.',
    'high'
  ),
  detailedDescription: `
This command creates a new administrative user account for accessing the DataSunrise management console. 
Assigning appropriate roles and managing these users is critical for system security.
  `,
  examples: [
    {
      description: 'Add a new admin user "johndoe" with role "Administrator"',
      command: 'ds_user_add -login johndoe -password "ComplexP@ssw0rd" -role Administrator -email "johndoe@example.com"'
    },
    {
      description: 'Add a read-only user "auditor" with AD authentication enabled',
      command: 'ds_user_add -login auditor -password "SecurePass123!" -role Auditor -email "audit@example.com" -enableADAuth true'
    }
  ],
  relatedCommands: ['ds_user_update', 'ds_user_show_one', 'ds_user_delete', 'role_add_access'],
  commonIssues: [
    'Password must meet complexity requirements defined in DataSunrise.',
    'Ensure the specified Access Role exists.'
  ],
  contextualHelp: {
    login: createParameterHelp('Unique login name for the new DataSunrise user.'),
    password: createParameterHelp('Password for the new user. Must meet complexity rules. This is sensitive.'),
    role: createParameterHelp(
      'Name of an existing Access Role to assign to this user.',
      { suggestion: 'Use "role_show_all_access" to list available roles.'}
    ),
    email: createParameterHelp('Email address for the user (must be valid format). Used for notifications and 2FA if enabled.'),
    enableADAuth: createParameterHelp('Enable Active Directory authentication for this user. Default: false.'),
    allowLogin: createParameterHelp('Allow this user to log in. Default: true.'),
    twoFactorAuth: createParameterHelp('Two-factor authentication type (DISABLED or EMAIL). Default: DISABLED.', { suggestion: 'For enhanced security, consider enabling EMAIL 2FA.'}),
    whiteHosts: createParameterHelp('Comma-separated hostnames/IPs from which this user is allowed to log in.', { suggestion: 'e.g., "192.168.1.100,office.example.com"'}),
    whiteGroups: createParameterHelp('Comma-separated host group names for whitelist.'),
    blackHosts: createParameterHelp('Comma-separated hostnames/IPs from which this user is explicitly denied login.'),
    blackGroups: createParameterHelp('Comma-separated host group names for blacklist.')
  }
});

// ds_user_update
registerCommandDescription('ds_user_update', {
  description: createCommandDescription(
    'Updates',
    'an existing DataSunrise user\'s properties',
    'in the system. 🔒 Security-sensitive.',
    'high'
  ),
  examples: [
    {
      description: 'Change role of user "johndoe" to "Operator" and disable AD auth',
      command: 'ds_user_update -login johndoe -role Operator -enableADAuth false'
    }
  ],
  relatedCommands: ['ds_user_add', 'ds_user_show_one', 'ds_user_change_password'],
  contextualHelp: {
    login: createParameterHelp('Login name of the user to update.'),
    role: createParameterHelp('New Access Role name for the user.'),
    email: createParameterHelp('New email address for the user.'),
    enableADAuth: createParameterHelp('Enable/disable Active Directory authentication.'),
    allowLogin: createParameterHelp('Set whether the user is allowed to log in.'),
    twoFactorAuth: createParameterHelp('Set two-factor authentication type (DISABLED or EMAIL).')
    // Add other updatable params like white/black lists if supported
  }
});

// ds_user_show_all
registerCommandDescription('ds_user_show_all', {
  description: createCommandDescription(
    'Displays',
    'a list of all DataSunrise administrative users',
    'in the system.',
    'none'
  ),
  examples: [{ description: 'List all DataSunrise users', command: 'ds_user_show_all' }]
});

// ds_user_show_one
registerCommandDescription('ds_user_show_one', {
  description: createCommandDescription(
    'Shows',
    'detailed information for a specific DataSunrise user',
    'in the system.',
    'none'
  ),
  examples: [{ description: 'Show details for user "johndoe"', command: 'ds_user_show_one -login johndoe' }],
  contextualHelp: { login: createParameterHelp('Login name of the user to display.') }
});

// ds_user_change_password
registerCommandDescription('ds_user_change_password', {
  description: createCommandDescription(
    'Changes',
    'a DataSunrise user\'s password',
    'in the system. 🔒 Security-sensitive.',
    'high'
  ),
  detailedDescription: `
This command changes the password for a specified DataSunrise administrative user. 
The new password must comply with the password complexity rules configured in DataSunrise.
  `,
  examples: [
    {
      description: 'Change password for user "johndoe"',
      command: 'ds_user_change_password -login johndoe -currentPwd "OldP@ssw0rd" -newPwd "NewSecureP@ssw0rd!"'
    }
  ],
  relatedCommands: ['ds_user_add', 'ds_user_update'],
  commonIssues: ['Ensure the new password meets complexity requirements.'],
  contextualHelp: {
    login: createParameterHelp('Login name of the user whose password is to be changed.'),
    currentPwd: createParameterHelp('The current password of the user. This is sensitive.'),
    newPwd: createParameterHelp('The new password for the user. Must meet complexity rules. This is sensitive.')
  }
});

// ds_user_delete
registerCommandDescription('ds_user_delete', {
  description: createCommandDescription(
    'Deletes',
    'a DataSunrise administrative user',
    'from the system. 🔒 Security-sensitive.',
    'high'
  ),
  detailedDescription: `
This command removes a DataSunrise administrative user account. 
Deleting a user revokes their access to the DataSunrise management console. 
Ensure the user account is no longer needed before deletion. Critical system accounts (like the default admin) may not be deletable.
  `,
  examples: [
    {
      description: 'Delete user "temp_admin"',
      command: 'ds_user_delete -login temp_admin'
    }
  ],
  relatedCommands: ['ds_user_add', 'ds_user_show_one'],
  commonIssues: ['Cannot delete the last administrative user or critical system users.'],
  contextualHelp: {
    login: createParameterHelp('Login name of the user to delete.')
  }
});
