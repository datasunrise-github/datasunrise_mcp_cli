# DataSunrise CLI MCP Server Commands

This document outlines the CLI commands exposed by the DataSunrise MCP Server. These commands are derived from the DataSunrise CLI functionality.

## Connection Command

### `connect`
Connects to the DataSunrise firewall.
- **CLI Base Command:** `connect`
- **Category:** Connection
- **Parameters:**
    - `host` (string, optional, default: `127.0.0.1`): The hostname or IP address of the DataSunrise server. (CLI flag: `-host`)
    - `port` (string, optional, default: `11000`): The port number for the DataSunrise server. (CLI flag: `-port`)
    - `protocol` (string, optional, default: `https`): The protocol to use (http or https). (CLI flag: `-protocol`)
    - `login` (string, optional): The username for authentication. (CLI flag: `-login`)
    - `password` (string, optional): The password for the username. (CLI flag: `-password`)

## Application Commands

Category: `Application`

### `application_add`
Adds a new application. Applications are logical entities in DataSunrise used to group database clients or services for policy application.
- **CLI Base Command:** `addApplication`
- **Parameters:**
    - `name` (string, required): Unique name for the new application. (CLI flag: `-name`)

### `application_update`
Updates an existing application's name.
- **CLI Base Command:** `updateApplication`
- **Parameters:**
    - `name` (string, required): Current name of the application to be updated. (CLI flag: `-name`)
    - `newName` (string, required): The new name for the application. (CLI flag: `-newName`)

### `application_show_all`
Displays a list of all configured applications.
- **CLI Base Command:** `showApplications`
- **Parameters:** None

### `application_show_one`
Shows detailed information for a specific application.
- **CLI Base Command:** `showApplication`
- **Parameters:**
    - `name` (string, required): Name of the application to display. (CLI flag: `-name`)

### `application_delete`
Deletes a specified application.
- **CLI Base Command:** `delApplication`
- **Parameters:**
    - `name` (string, required): Name of the application to delete. (CLI flag: `-name`)

## CEF Commands

Category: `CEF`

### `cef_add_group`
Adds a new CEF (Common Event Format) group. CEF groups organize configurations for exporting audit data to SIEM systems.
- **CLI Base Command:** `addCefGroup`
- **Parameters:**
    - `name` (string, required): Unique name for the new CEF group. (CLI flag: `-name`)
    - `enable` (boolean, optional, default: `true`): Enables or disables the CEF group. (CLI flag: `-enable`)

### `cef_add_item`
Adds a new CEF item to a specified CEF group. CEF items define how specific DataSunrise events are formatted into CEF messages.
- **CLI Base Command:** `addCefItem`
- **Parameters:**
    - `name` (string, required): Unique name for the new CEF item configuration. (CLI flag: `-name`)
    - `groupName` (string, required): Name of the existing CEF group to add this item to. (CLI flag: `-groupName`)
    - `type` (string, required, default: `"Session Open"`): Type of DataSunrise event this CEF item handles (e.g., LOGIN_SUCCESSFUL, RULE_MATCHED). (CLI flag: `-type`)
    - `cef` (string, required): The CEF format string for the log message. (CLI flag: `-cef`)
    - `enable` (boolean, optional, default: `true`): Enables or disables this CEF item. (CLI flag: `-enable`)

### `cef_update_group`
Updates an existing CEF group's name or enabled state.
- **CLI Base Command:** `updateCefGroup`
- **Parameters:**
    - `name` (string, required): Current name of the CEF group to update. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the CEF group. (CLI flag: `-newName`)
    - `enable` (boolean, optional): Set the enabled state of the CEF group. (CLI flag: `-enable`)

### `cef_update_item`
Updates an existing CEF item.
- **CLI Base Command:** `updateCefItem`
- **Parameters:**
    - `name` (string, required): Current name of the CEF item to update. (CLI flag: `-name`)
    - `groupName` (string, required): Name of the group the item belongs to. (CLI flag: `-groupName`)
    - `newName` (string, optional): New name for the CEF item. (CLI flag: `-newName`)
    - `type` (string, optional): New type for the CEF item. (CLI flag: `-type`)
    - `cef` (string, optional): New CEF format string for the item. (CLI flag: `-cef`)
    - `enable` (boolean, optional): Set the enabled state of the CEF item. (CLI flag: `-enable`)

### `cef_show_groups`
Displays a list of all configured CEF groups.
- **CLI Base Command:** `showCefGroups`
- **Parameters:** None

### `cef_show_group`
Shows detailed information for a specific CEF group, including its items.
- **CLI Base Command:** `showCefGroup`
- **Parameters:**
    - `name` (string, required): Name of the CEF group to display. (CLI flag: `-name`)

### `cef_show_items`
Displays all CEF items within a specified CEF group.
- **CLI Base Command:** `showCefItems`
- **Parameters:**
    - `groupName` (string, required): Name of the CEF group whose items are to be displayed. (CLI flag: `-groupName`)

### `cef_show_item`
Shows detailed information for a specific CEF item within a group.
- **CLI Base Command:** `showCefItem`
- **Parameters:**
    - `name` (string, required): Name of the CEF item to display. (CLI flag: `-name`)
    - `groupName` (string, required): Name of the CEF group the item belongs to. (CLI flag: `-groupName`)

### `cef_delete_group`
Deletes a specified CEF group. The group must be empty of CEF items.
- **CLI Base Command:** `delCefGroup`
- **Parameters:**
    - `name` (string, required): Name of the CEF group to delete. (CLI flag: `-name`)

### `cef_delete_item`
Deletes a specific CEF item from a CEF group.
- **CLI Base Command:** `delCefItem`
- **Parameters:**
    - `name` (string, required): Name of the CEF item to delete. (CLI flag: `-name`)
    - `groupName` (string, required): Name of the CEF group from which to delete the item. (CLI flag: `-groupName`)

## Core Commands

Category: `Core`

### `core_start`
Starts the DataSunrise core engine forcefully. This is typically used after maintenance or configuration changes.
- **CLI Base Command:** `start`
- **Parameters:**
    - `force` (boolean, optional, default: `true`): Force start. (CLI flag: `-f`)

### `core_restart`
Restarts the DataSunrise core engine forcefully. Useful for applying certain configuration changes that require a restart.
- **CLI Base Command:** `restart`
- **Parameters:**
    - `force` (boolean, optional, default: `true`): Force restart. (CLI flag: `-f`)

### `core_stop`
Stops the DataSunrise core engine forcefully. This will interrupt monitoring and protection activities.
- **CLI Base Command:** `stop`
- **Parameters:**
    - `force` (boolean, optional, default: `true`): Force stop. (CLI flag: `-f`)

### `core_show_state`
Shows the operational state of a specific worker process on a DataSunrise server.
- **CLI Base Command:** `showCoreState`
- **Parameters:**
    - `dsServer` (string, required): Name of the DataSunrise server. (CLI flag: `-dsServer`)
    - `worker` (number, optional, default: `1`): Worker ID (typically 1). (CLI flag: `-worker`)

## Database User Commands

Category: `Database User`

### `db_user_add`
Adds a new database user definition to DataSunrise. This user should exist in the actual database.
- **CLI Base Command:** `addDbUser`
- **Parameters:**
    - `name` (string, required): Name of the database user as it exists in the database. (CLI flag: `-name`)
    - `inst` (string, optional): Name of the DataSunrise instance this user belongs to, or "any". (CLI flag: `-inst`)
    - `dbType` (string, optional): Database type (e.g., ORACLE, MYSQL, ANY). Often inferred if -inst is specific. (CLI flag: `-dbType`)

### `db_user_group_add`
Adds a new group for database users. Members should be existing DB users defined in DataSunrise.
- **CLI Base Command:** `addDbUserGr`
- **Parameters:**
    - `name` (string, required): Unique name for the new group of database users. (CLI flag: `-name`)
    - `inst` (string, optional): Associated instance name or "any". (CLI flag: `-inst`)
    - `dbType` (string, optional): Database type (e.g., ORACLE, MYSQL, ANY) to scope the group. (CLI flag: `-dbType`)
    - `addMembers` (string, optional): Comma-separated list of existing DB user names to add as members. (CLI flag: `-addMembers`)

### `db_user_mapping_add`
Adds an Active Directory User/Group to Database User mapping for a specific instance.
- **CLI Base Command:** `addDbUserMapping`
- **Parameters:**
    - `inst` (string, required): Name of the DataSunrise instance for this mapping. (CLI flag: `-inst`)
    - `adLogin` (string, optional): Active Directory login name. Either this or adGroup is required. (CLI flag: `-adLogin`)
    - `adGroup` (string, optional): Active Directory group name. Either this or adLogin is required. (CLI flag: `-adGroup`)
    - `dbLogin` (string, required): Database login name to map to. (CLI flag: `-dbLogin`)
    - `dbPassword` (string, required): Password of the database user (for hash generation/verification). (CLI flag: `-dbPassword`)
    - `ldapServer` (string, optional): Name of a pre-configured LDAP Server in DataSunrise. Uses default if omitted. (CLI flag: `-ldapServer`)
    - `hashType` (string, optional): Password hashing algorithm (e.g., MD5, SHA1, CRYPT, PLAIN). Defaults based on DB type. (CLI flag: `-hashType`)
    - `sysDba` (boolean, optional, default: `false`): For Oracle SHA512: connect as SYSDBA to retrieve salt. (CLI flag: `-sysDba`)

### `ldap_server_add`
Adds a new LDAP server configuration to DataSunrise.
- **CLI Base Command:** `addLdapServer`
- **Parameters:**
    - `name` (string, required): Logical name for the LDAP server configuration. (CLI flag: `-name`)
    - `host` (string, required): Hostname or IP address of the LDAP server. (CLI flag: `-host`)
    - `port` (string, required): Port number of the LDAP server. (CLI flag: `-port`)
    - `default` (boolean, optional, default: `true`): Set this LDAP server as the default. (CLI flag: `-default`)
    - `baseDn` (string, required): Base Distinguished Name (DN) for LDAP searches. (CLI flag: `-baseDn`)

### `db_user_update`
Updates an existing database user's name or properties.
- **CLI Base Command:** `updateDbUser`
- **Parameters:**
    - `name` (string, required): Current name of the database user. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the database user. (CLI flag: `-newName`)

### `db_user_group_update`
Updates an existing database user group's name or members.
- **CLI Base Command:** `updateDbUserGr`
- **Parameters:**
    - `name` (string, required): Current name of the database user group. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the group. (CLI flag: `-newName`)
    - `addMembers` (string, optional): Comma-separated list of DB user names to add. (CLI flag: `-addMembers`)
    - `removeMembers` (string, optional): Comma-separated list of DB user names to remove. (CLI flag: `-removeMembers`)

### `ldap_server_update`
Updates an existing LDAP server's configuration.
- **CLI Base Command:** `updateLdapServer`
- **Parameters:**
    - `name` (string, required): Current name of the LDAP server. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the LDAP server. (CLI flag: `-newName`)

### `db_user_show_all`
Displays all database users defined in DataSunrise.
- **CLI Base Command:** `showDbUsers`
- **Parameters:** None

### `db_user_show_one`
Shows detailed information for a specific database user.
- **CLI Base Command:** `showDbUser`
- **Parameters:**
    - `name` (string, required): Name of the database user to display. (CLI flag: `-name`)

### `db_user_group_show_all`
Displays all database user groups.
- **CLI Base Command:** `showDbUserGroups`
- **Parameters:** None

### `db_user_group_show_one`
Shows detailed information for a specific database user group.
- **CLI Base Command:** `showDbUserGr`
- **Parameters:**
    - `name` (string, required): Name of the database user group to display. (CLI flag: `-name`)

### `db_user_mapping_show`
Shows AD to DB user mappings for a specific instance.
- **CLI Base Command:** `showAdDbUserMapping`
- **Parameters:**
    - `instance` (string, required): Name of the instance for which to show mappings. (CLI flag: `-instance`)

### `ldap_server_show_all`
Displays all configured LDAP servers.
- **CLI Base Command:** `showLdapServers`
- **Parameters:** None

### `ldap_server_show_one`
Shows detailed information for a specific LDAP server.
- **CLI Base Command:** `showLdapServer`
- **Parameters:**
    - `name` (string, required): Name of the LDAP server to display. (CLI flag: `-name`)

### `db_user_mapping_enable`
Enables AD to DB user mapping for an instance.
- **CLI Base Command:** `enableDbUserMapping`
- **Parameters:**
    - `instance` (string, required): Name of the instance for which to enable mapping. (CLI flag: `-instance`)
    - `mapType` (string, required, default: `"config"`): Type of mapping to enable (e.g., config). (CLI flag: `-mapType`)

### `db_user_mapping_disable`
Disables AD to DB user mapping for an instance.
- **CLI Base Command:** `disableDbUserMapping`
- **Parameters:**
    - `instance` (string, required): Name of the instance for which to disable mapping. (CLI flag: `-instance`)

### `db_user_delete`
Deletes a database user definition from DataSunrise.
- **CLI Base Command:** `delDbUser`
- **Parameters:**
    - `name` (string, required): Name of the database user to delete. (CLI flag: `-name`)

### `db_user_group_delete`
Deletes a database user group.
- **CLI Base Command:** `delDbUserGr`
- **Parameters:**
    - `name` (string, required): Name of the database user group to delete. (CLI flag: `-name`)

### `db_user_mapping_delete`
Deletes an AD to DB user mapping.
- **CLI Base Command:** `delDbUserMapping`
- **Parameters:**
    - `instance` (string, required): Name of the instance from which to delete the mapping. (CLI flag: `-instance`)
    - `adLogin` (string, required): AD login of the mapping to delete. (CLI flag: `-adLogin`)

### `ldap_server_delete`
Deletes an LDAP server configuration.
- **CLI Base Command:** `delLdapServer`
- **Parameters:**
    - `name` (string, required): Name of the LDAP server to delete. (CLI flag: `-name`)

## Dictionary Commands

Category: `Dictionary`

### `dictionary_backup_create`
Creates a backup of the DataSunrise system dictionary (configuration database).
- **CLI Base Command:** `createDictionaryBackup`
- **Parameters:** None

### `dictionary_backup_show_all`
Displays a list of available dictionary backups.
- **CLI Base Command:** `showDictionaryBackups`
- **Parameters:** None

### `dictionary_clean`
Cleans the DataSunrise dictionary. This is a destructive operation and should be used with caution.
- **CLI Base Command:** `cleanDictionary`
- **Parameters:**
    - `force` (boolean, optional, default: `true`): Force clean without confirmation. (CLI flag: `-f`)

### `dictionary_recover`
Recovers the DataSunrise dictionary from a specified backup ID.
- **CLI Base Command:** `recoverDictionary`
- **Parameters:**
    - `id` (string, required): ID of the dictionary backup to recover from. (CLI flag: `-id`)

## Discovery Commands

Category: `Discovery`

### `discovery_group_add`
Adds a new Discovery Group. Discovery Groups containerize attributes (filters) for sensitive data searches.
- **CLI Base Command:** `addDiscoveryGr`
- **Parameters:**
    - `name` (string, required): Unique name for the new Discovery Group. (CLI flag: `-name`)
    - `securityStandards` (string, optional): Comma-separated list of security standard names (e.g., HIPAA, PCI DSS) to associate. (CLI flag: `-securityStandards`)

### `discovery_attribute_add`
Adds a discovery attribute (filter criteria) to an existing Discovery Group.
- **CLI Base Command:** `addDiscoveryAttr`
- **Parameters:**
    - `group` (string, required): Name of the existing Discovery Group to add this attribute to. (CLI flag: `-group`)
    - `name` (string, required): Unique name for the new discovery attribute. (CLI flag: `-name`)
    - `colNames` (string, optional): Semicolon-separated list of column names to match (e.g., "SSN;CREDIT_CARD"). (CLI flag: `-colNames`)
    - `colNamesCS` (boolean, optional, default: `false`): Case-sensitive column name matching. (CLI flag: `-colNamesCS`)
    - `colType` (string, optional): Expected data type of columns (ANY, STRING, NUMBER, DATE, etc.). (CLI flag: `-colType`)
    - `contTemplate` (string, optional): Regular expression to match against column content (for STRING types). (CLI flag: `-contTemplate`)
    - `contTemplateCS` (boolean, optional, default: `false`): Case-sensitive content template matching. (CLI flag: `-contTemplateCS`)
    - `fileNameTemplate` (string, optional): Semicolon-separated file name patterns for file-based discovery (e.g., "*.log;data_*.csv"). (CLI flag: `-fileNameTemplate`)
    - `fileNameTemplateCS` (boolean, optional, default: `false`): Case-sensitive file name template matching. (CLI flag: `-fileNameTemplateCS`)
    - `min` (number, optional): Minimum numeric value for NUMBER type columns. (CLI flag: `-min`)
    - `max` (number, optional): Maximum numeric value for NUMBER type columns. (CLI flag: `-max`)
    - `minDate` (string, optional): Minimum date/timestamp (yyyy-MM-dd HH:mm:ss) for DATE types. (CLI flag: `-minDate`)
    - `maxDate` (string, optional): Maximum date/timestamp (yyyy-MM-dd HH:mm:ss) for DATE types. (CLI flag: `-maxDate`)
    - `nameSeparator` (string, optional, default: `";"`): Separator for multi-value string parameters like colNames. (CLI flag: `-nameSeparator`)

### `discovery_group_update`
Updates an existing Discovery Group's name or associated security standards.
- **CLI Base Command:** `updateDiscoveryGr`
- **Parameters:**
    - `name` (string, required): Current name of the Discovery Group to update. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the Discovery Group. (CLI flag: `-newName`)
    - `securityStandards` (string, optional): Comma-separated list of security standard names to set. Replaces existing. (CLI flag: `-securityStandards`)

### `discovery_attribute_update`
Updates an existing discovery attribute within a Discovery Group.
- **CLI Base Command:** `updateDiscoveryAttr`
- **Parameters:**
    - `group` (string, required): Name of the Discovery Group containing the attribute. (CLI flag: `-group`)
    - `name` (string, required): Current name of the discovery attribute to update. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the discovery attribute. (CLI flag: `-newName`)
    - `colNames` (string, optional): Semicolon-separated list of column names to match. (CLI flag: `-colNames`)
    - `colNamesCS` (boolean, optional): Case-sensitive column name matching. (CLI flag: `-colNamesCS`)
    - `colType` (string, optional): Expected data type of columns. (CLI flag: `-colType`)
    - `contTemplate` (string, optional): Regular expression for column content. (CLI flag: `-contTemplate`)
    - `contTemplateCS` (boolean, optional): Case-sensitive content template matching. (CLI flag: `-contTemplateCS`)

### `discovery_group_copy`
Copies an existing Discovery Group and its attributes.
- **CLI Base Command:** `copyDiscoveryGr`
- **Parameters:**
    - `name` (string, required): Name of the Discovery Group to copy. (CLI flag: `-name`)
    - `newName` (string, optional): Name for the new copied Discovery Group. If omitted, a default name is generated. (CLI flag: `-newName`)

### `discovery_group_show_all`
Displays a list of all configured Discovery Groups.
- **CLI Base Command:** `showDiscoveryGroups`
- **Parameters:** None

### `discovery_group_show_one`
Shows detailed information for a specific Discovery Group, including its attributes.
- **CLI Base Command:** `showDiscoveryGr`
- **Parameters:**
    - `name` (string, required): Name of the Discovery Group to display. (CLI flag: `-name`)

### `discovery_attribute_show`
Shows detailed information for a specific discovery attribute within a group.
- **CLI Base Command:** `showDiscoveryAttr`
- **Parameters:**
    - `group` (string, required): Name of the Discovery Group. (CLI flag: `-group`)
    - `name` (string, required): Name of the discovery attribute to display. (CLI flag: `-name`)

### `discovery_group_delete`
Deletes a specified Discovery Group and all its attributes.
- **CLI Base Command:** `delDiscoveryGr`
- **Parameters:**
    - `name` (string, required): Name of the Discovery Group to delete. (CLI flag: `-name`)

### `discovery_attribute_delete`
Deletes a specific discovery attribute from a Discovery Group.
- **CLI Base Command:** `delDiscoveryAttr`
- **Parameters:**
    - `group` (string, required): Name of the Discovery Group from which to delete the attribute. (CLI flag: `-group`)
    - `name` (string, required): Name of the discovery attribute to delete. (CLI flag: `-name`)

## DataSunrise User Commands

Category: `DataSunrise User`

### `ds_user_add`
Adds a new DataSunrise administrative user.
- **CLI Base Command:** `addDsUser`
- **Parameters:**
    - `login` (string, required): Unique login name for the new DataSunrise user. (CLI flag: `-login`)
    - `password` (string, required): Password for the new user. Must meet complexity rules. (CLI flag: `-password`)
    - `role` (string, required): Name of an existing Access Role to assign to this user. (CLI flag: `-role`)
    - `email` (string, optional): Email address for the user (must be valid format). (CLI flag: `-email`)
    - `enableADAuth` (boolean, optional, default: `false`): Enable Active Directory authentication for this user. (CLI flag: `-enableADAuth`)
    - `allowLogin` (boolean, optional, default: `true`): Allow this user to log in. (CLI flag: `-allowLogin`)
    - `twoFactorAuth` (string, optional, default: `"DISABLED"`): Two-factor authentication type (DISABLED or EMAIL). (CLI flag: `-twoFactorAuth`)
    - `whiteHosts` (string, optional): Comma-separated hostnames/IPs for whitelist. (CLI flag: `-whiteHosts`)
    - `whiteGroups` (string, optional): Comma-separated host group names for whitelist. (CLI flag: `-whiteGroups`)
    - `blackHosts` (string, optional): Comma-separated hostnames/IPs for blacklist. (CLI flag: `-blackHosts`)
    - `blackGroups` (string, optional): Comma-separated host group names for blacklist. (CLI flag: `-blackGroups`)

### `ds_user_update`
Updates an existing DataSunrise user's properties.
- **CLI Base Command:** `updateDsUser`
- **Parameters:**
    - `login` (string, required): Login name of the user to update. (CLI flag: `-login`)
    - `role` (string, optional): New Access Role name for the user. (CLI flag: `-role`)
    - `email` (string, optional): New email address for the user. (CLI flag: `-email`)
    - `enableADAuth` (boolean, optional): Enable/disable Active Directory authentication. (CLI flag: `-enableADAuth`)
    - `allowLogin` (boolean, optional): Set whether the user is allowed to log in. (CLI flag: `-allowLogin`)
    - `twoFactorAuth` (string, optional): Set two-factor authentication type (DISABLED or EMAIL). (CLI flag: `-twoFactorAuth`)

### `ds_user_show_all`
Displays a list of all DataSunrise administrative users.
- **CLI Base Command:** `showDsUsers`
- **Parameters:** None

### `ds_user_show_one`
Shows detailed information for a specific DataSunrise user.
- **CLI Base Command:** `showDsUser`
- **Parameters:**
    - `login` (string, required): Login name of the user to display. (CLI flag: `-login`)

### `ds_user_change_password`
Changes a DataSunrise user's password.
- **CLI Base Command:** `changePwd`
- **Parameters:**
    - `login` (string, required): Login name of the user whose password is to be changed. (CLI flag: `-login`)
    - `currentPwd` (string, required): The current password of the user. (CLI flag: `-currentPwd`)
    - `newPwd` (string, required): The new password for the user. Must meet complexity rules. (CLI flag: `-newPwd`)

### `ds_user_delete`
Deletes a DataSunrise administrative user.
- **CLI Base Command:** `delDsUser`
- **Parameters:**
    - `login` (string, required): Login name of the user to delete. (CLI flag: `-login`)

## Host Commands

Category: `Host`

### `host_add`
Adds a new host, network, or IP address range definition to DataSunrise. These are used in policies and user/group definitions.
- **CLI Base Command:** `addHost`
- **Parameters:**
    - `name` (string, required): Logical name for this host/network/range entry. (CLI flag: `-name`)
    - `host` (string, optional): Hostname or single IP address (e.g., "myserver.com" or "192.168.1.100"). Use for single hosts. (CLI flag: `-host`)
    - `netIPv4` (string, optional): IPv4 network address (e.g., "192.168.1.0"). Requires -netMaskV4. (CLI flag: `-netIPv4`)
    - `netMaskV4` (string, optional): Subnet mask for IPv4 network (e.g., "255.255.255.0"). Requires -netIPv4. (CLI flag: `-netMaskV4`)
    - `netIPv6` (string, optional): IPv6 network address with prefix (e.g., "2001:db8::/48"). (CLI flag: `-netIPv6`)
    - `startIPv4` (string, optional): Starting IP address of an IPv4 range. Requires -endIPv4. (CLI flag: `-startIPv4`)
    - `endIPv4` (string, optional): Ending IP address of an IPv4 range. Requires -startIPv4. (CLI flag: `-endIPv4`)
    - `startIPv6` (string, optional): Starting IP address of an IPv6 range. Requires -endIPv6. (CLI flag: `-startIPv6`)
    - `endIPv6` (string, optional): Ending IP address of an IPv6 range. Requires -startIPv6. (CLI flag: `-endIPv6`)

### `host_group_add`
Adds a new Host Group. Host Groups collect multiple host, network, or IP range definitions for easier policy management.
- **CLI Base Command:** `addHostGr`
- **Parameters:**
    - `name` (string, required): Unique name for the new Host Group. (CLI flag: `-name`)
    - `addMembers` (string, optional): Comma-separated list of existing Host/Network/Range names to add as members. (CLI flag: `-addMembers`)

### `host_update`
Updates an existing host's address or other properties.
- **CLI Base Command:** `updateHost`
- **Parameters:**
    - `name` (string, required): Current name of the host entry to update. (CLI flag: `-name`)
    - `host` (string, optional): New hostname or IP address for the host entry. (CLI flag: `-host`)

### `host_group_update`
Updates an existing Host Group's name or members.
- **CLI Base Command:** `updateHostGr`
- **Parameters:**
    - `name` (string, required): Current name of the Host Group to update. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the Host Group. (CLI flag: `-newName`)
    - `addMembers` (string, optional): Comma-separated list of member names to add. (CLI flag: `-addMembers`)
    - `removeMembers` (string, optional): Comma-separated list of member names to remove. (CLI flag: `-removeMembers`)

### `host_show_all`
Displays a list of all configured hosts, networks, and IP ranges.
- **CLI Base Command:** `showHosts`
- **Parameters:** None

### `host_show_one`
Shows detailed information for a specific host, network, or IP range entry.
- **CLI Base Command:** `showHost`
- **Parameters:**
    - `name` (string, required): Name of the host/network/range entry to display. (CLI flag: `-name`)

### `host_group_show_all`
Displays a list of all configured Host Groups.
- **CLI Base Command:** `showHostGroups`
- **Parameters:** None

### `host_group_show_one`
Shows detailed information for a specific Host Group, including its members.
- **CLI Base Command:** `showHostGr`
- **Parameters:**
    - `name` (string, required): Name of the Host Group to display. (CLI flag: `-name`)

### `host_delete`
Deletes a specific host, network, or IP range entry.
- **CLI Base Command:** `delHost`
- **Parameters:**
    - `name` (string, required): Name of the host/network/range entry to delete. (CLI flag: `-name`)

### `host_group_delete`
Deletes a specific Host Group. Does not delete its members from DataSunrise.
- **CLI Base Command:** `delHostGr`
- **Parameters:**
    - `name` (string, required): Name of the Host Group to delete. (CLI flag: `-name`)

## Import Commands

Category: `Import`

### `import_users`
Imports DataSunrise users from a specified CSV file.
- **CLI Base Command:** `importUsers`
- **Parameters:**
    - `fileName` (string, required): Path to the CSV file containing user data to import. (CLI flag: `-fileName`)

### `import_hosts`
Imports host definitions from a specified CSV file.
- **CLI Base Command:** `importHosts`
- **Parameters:**
    - `fileName` (string, required): Path to the CSV file containing host data to import. (CLI flag: `-fileName`)

### `import_apps`
Imports application definitions from a specified CSV file.
- **CLI Base Command:** `importApps`
- **Parameters:**
    - `fileName` (string, required): Path to the CSV file containing application data to import. (CLI flag: `-fileName`)

## Instance Commands

Category: `Instance`

### `instance_show_one`
Shows detailed information for a specific DataSunrise instance.
- **CLI Base Command:** `showInstance`
- **Parameters:**
    - `name` (string, required): Name of the instance to display. (CLI flag: `-name`)

## License Commands

Category: `License`

### `license_update_key`
Updates the DataSunrise license using a provided license key string.
- **CLI Base Command:** `updateLicense`
- **Parameters:**
    - `key` (string, required): The license key string. (CLI flag: `-key`)

### `license_update_file`
Updates DataSunrise licenses from a specified .reg license file.
- **CLI Base Command:** `updateLicenses`
- **Parameters:**
    - `file` (string, required): Path to the .reg license file. (CLI flag: `-file`)

### `license_show_all`
Displays all installed licenses in DataSunrise.
- **CLI Base Command:** `showLicenses`
- **Parameters:** None

### `license_show_one`
Shows detailed information for a specific license identified by its ID.
- **CLI Base Command:** `showLicense`
- **Parameters:**
    - `id` (string, required): ID of the license to display. (CLI flag: `-id`)

### `license_delete`
Deletes a specific license identified by its ID.
- **CLI Base Command:** `delLicense`
- **Parameters:**
    - `id` (number, required): ID of the license to delete. (CLI flag: `-id`)

## Object Group Commands

Category: `Object Group`

### `object_group_add`
Adds a new Object Group. Object Groups are used to logically group database objects (tables, columns, schemas, etc.) for policy application.
- **CLI Base Command:** `addObjectGroup`
- **Parameters:**
    - `name` (string, required): Unique name for the new Object Group. (CLI flag: `-name`)

### `object_group_update`
Updates an existing Object Group's name or its members.
- **CLI Base Command:** `updateObjectGroup`
- **Parameters:**
    - `name` (string, required): Current name of the Object Group to update. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the Object Group. (CLI flag: `-newName`)

### `object_group_show_all`
Displays a list of all configured Object Groups.
- **CLI Base Command:** `showObjectGroups`
- **Parameters:** None

### `object_group_show_one`
Shows detailed information for a specific Object Group, including its members.
- **CLI Base Command:** `showObjectGroup`
- **Parameters:**
    - `name` (string, required): Name of the Object Group to display. (CLI flag: `-name`)

### `object_group_delete`
Deletes a specified Object Group. This does not delete the actual database objects.
- **CLI Base Command:** `delObjectGroup`
- **Parameters:**
    - `name` (string, required): Name of the Object Group to delete. (CLI flag: `-name`)

## Parameter Commands

Category: `Parameter`

### `parameter_show_all`
Displays all system parameters and their current values in DataSunrise.
- **CLI Base Command:** `showParameters`
- **Parameters:** None

### `parameter_change`
Changes the value of a specified system parameter in DataSunrise. Use with caution as incorrect values can affect system stability.
- **CLI Base Command:** `changeParameter`
- **Parameters:**
    - `name` (string, required): The name of the system parameter to change (e.g., AgentPort, LogDeletePeriod). (CLI flag: `-name`)
    - `value` (string, required): The new value for the parameter. Type consistency is important (e.g., string for text, number for numeric values). (CLI flag: `-value`)

## Periodic Task Commands

Category: `Periodic Task`

### `periodic_task_add_clean_audit`
Adds a periodic task for cleaning (archiving or deleting) audit data.
- **CLI Base Command:** `addPerCleanAudit`
- **Parameters:**
    - `name` (string, required): Unique name for this clean audit task. (CLI flag: `-name`)

### `periodic_task_add_backup_dictionary`
Adds a periodic task for backing up the DataSunrise system dictionary.
- **CLI Base Command:** `addPerBackupDictionary`
- **Parameters:**
    - `name` (string, required): Unique name for this backup dictionary task. (CLI flag: `-name`)
    - `backupName` (string, required): Template for the backup file name (e.g., "dictionary_backup"). (CLI flag: `-backupName`)

### `periodic_task_add_user_behavior`
Adds a periodic task for user behavior analysis and learning.
- **CLI Base Command:** `addPerUserBehavior`
- **Parameters:**
    - `name` (string, required): Unique name for this user behavior task. (CLI flag: `-name`)
    - `trStartDate` (string, required): Training period start date (yyyy-MM-dd). (CLI flag: `-trStartDate`)
    - `trEndDate` (string, required): Training period end date (yyyy-MM-dd). (CLI flag: `-trEndDate`)

### `periodic_task_add_ddl_table_relation_learning`
Adds a periodic task for learning table relations from DDL (Data Definition Language) statements.
- **CLI Base Command:** `addDDLTabRelLearnPerTask`
- **Parameters:**
    - `name` (string, required): Unique name for this DDL table relation learning task. (CLI flag: `-name`)
    - `inst` (string, required): Name of the database instance whose DDL will be analyzed. (CLI flag: `-instance`)
    - `tableRel` (string, required): Name of an existing Table Relation (Data Model) entity to store results. (CLI flag: `-tableRel`)
    - `analyzeProcAndFunc` (boolean, optional, default: `false`): Analyze DDL of stored procedures and functions. (CLI flag: `-analyzeProcAndFunc`)
    - `analyzeView` (boolean, optional, default: `false`): Analyze DDL of views. (CLI flag: `-analyzeView`)
    - `login` (string, optional): DB username to read DDL (if not stored in instance config). (CLI flag: `-login`)
    - `password` (string, optional): Password for the DB username. (CLI flag: `-password`)
    - `sysDba` (boolean, optional, default: `false`): For Oracle: Connect as SYSDBA. (CLI flag: `-sysDba`)

### `periodic_task_add_vulnerability_assessment`
Adds a periodic task for performing vulnerability assessments on database instances.
- **CLI Base Command:** `addPerVulnAssessment`
- **Parameters:**
    - `name` (string, required): Unique name for this vulnerability assessment task. (CLI flag: `-name`)

### `periodic_task_add_update_metadata`
Adds a periodic task for updating metadata for a specified database instance.
- **CLI Base Command:** `addPerUpdateMetadata`
- **Parameters:**
    - `name` (string, required): Unique name for this update metadata task. (CLI flag: `-name`)
    - `instance` (string, required): Name of the database instance for which to update metadata. (CLI flag: `-instance`)

### `periodic_task_add_data_discovery`
Adds a periodic task for performing data discovery on a database instance.
- **CLI Base Command:** `addPerDiscovery`
- **Parameters:**
    - `name` (string, required): Unique name for this data discovery task. (CLI flag: `-name`)
    - `instance` (string, required): Name of the database instance to perform discovery on. (CLI flag: `-instance`)
    - `searchByInfoTypes` (string, required): Comma-separated list of Information Type names to search for. (CLI flag: `-searchByInfoTypes`)

### `periodic_task_add_health_check`
Adds a periodic task for performing health checks on a database instance.
- **CLI Base Command:** `addPerHealthCheck`
- **Parameters:**
    - `name` (string, required): Unique name for this health check task. (CLI flag: `-name`)
    - `instance` (string, required): Name of the database instance to perform health check on. (CLI flag: `-instance`)

### `periodic_task_update_clean_audit`
Updates an existing periodic clean audit task.
- **CLI Base Command:** `updatePerCleanAudit`
- **Parameters:**
    - `name` (string, required): Current name of the task to update. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the task. (CLI flag: `-newName`)

### `periodic_task_show_one`
Shows detailed information for a specific periodic task.
- **CLI Base Command:** `showPerTask`
- **Parameters:**
    - `name` (string, required): Name of the periodic task to display. (CLI flag: `-name`)
    - `taskType` (string, required): Type of the periodic task (e.g., "Clean Audit", "Backup Dictionary"). (CLI flag: `-taskType`)

### `periodic_task_delete`
Deletes a specified periodic task.
- **CLI Base Command:** `delPerTask`
- **Parameters:**
    - `name` (string, required): Name of the periodic task to delete. (CLI flag: `-name`)
    - `taskType` (string, required): Type of the periodic task to delete. (CLI flag: `-taskType`)

## Query Group Commands

Category: `Query Group`

### `query_group_add`
Adds a new Query Group. Query Groups are used to categorize SQL queries for policy application or learning.
- **CLI Base Command:** `addQueryGroup`
- **Parameters:**
    - `name` (string, required): Unique name for the new Query Group. (CLI flag: `-name`)

### `query_group_add_query`
Adds a specific SQL query string to an existing Query Group.
- **CLI Base Command:** `addQueryOfGroup`
- **Parameters:**
    - `name` (string, required): Name of the Query Group to add the SQL query to. (CLI flag: `-name`)
    - `sql` (string, required): The SQL query text to add to the group. (CLI flag: `-sql`)

### `query_group_update`
Updates an existing Query Group's name.
- **CLI Base Command:** `updateQueryGroup`
- **Parameters:**
    - `name` (string, required): Current name of the Query Group to update. (CLI flag: `-name`)
    - `newName` (string, required): New name for the Query Group. (CLI flag: `-newName`)

### `query_group_update_query`
Updates an existing SQL query within a Query Group.
- **CLI Base Command:** `updateQueryOfGroup`
- **Parameters:**
    - `name` (string, required): Name of the Query Group containing the query. (CLI flag: `-name`)
    - `sql` (string, required): The current SQL query text to be updated. (CLI flag: `-sql`)
    - `newSql` (string, required): The new SQL query text. (CLI flag: `-newSql`)

### `query_group_show_all`
Displays a list of all configured Query Groups.
- **CLI Base Command:** `showQueryGroups`
- **Parameters:** None

### `query_group_show_one`
Shows detailed information for a specific Query Group, including its SQL queries.
- **CLI Base Command:** `showQueryGroup`
- **Parameters:**
    - `name` (string, required): Name of the Query Group to display. (CLI flag: `-name`)

### `query_group_delete`
Deletes a specified Query Group. This does not delete the individual queries if they belong to other groups.
- **CLI Base Command:** `delQueryGroup`
- **Parameters:**
    - `name` (string, required): Name of the Query Group to delete. (CLI flag: `-name`)

### `query_group_delete_query`
Deletes a specific SQL query from a Query Group.
- **CLI Base Command:** `delQuery`
- **Parameters:**
    - `name` (string, required): Name of the Query Group from which to delete the query. (CLI flag: `-name`)
    - `sql` (string, required): The SQL query text to delete from the group. (CLI flag: `-sql`)

## Report Generation Commands

Category: `Report Generation`

### `report_gen_add_audit`
Adds a new Audit Report generation task. Configures how audit data is filtered, formatted, and scheduled for reporting.
- **CLI Base Command:** `addAuditReportGen`
- **Parameters:**
    - `name` (string, required): Unique name for this audit report generation task. (CLI flag: `-name`)
    - `enabled` (boolean, optional, default: `true`): Enable or disable the scheduled execution. (CLI flag: `-enabled`)
    - `startDate` (string, optional): Schedule start date/time (yyyy-MM-dd HH:mm:ss). (CLI flag: `-startDate`)
    - `endDate` (string, optional): Schedule end date/time (yyyy-MM-dd HH:mm:ss). (CLI flag: `-endDate`)
    - `cronExpression` (string, optional): Cron expression for custom scheduling. (CLI flag: `-cronExpression`)
    - `generateReport` (boolean, optional, default: `true`): Generate a report file. (CLI flag: `-generateReport`)
    - `reportFormat` (string, optional): Format for the report file (CSV, PDF, JSON). (CLI flag: `-reportFormat`)
    - `compressType` (string, optional): Compression for the report file (NO, ZIP, GZIP). (CLI flag: `-compressType`)
    - `operationsWithError` (boolean, optional, default: `false`): Include database operations that resulted in an error. (CLI flag: `-operationsWithError`)
    - `rules` (string, optional): Comma-separated list of audit rule names to include. (CLI flag: `-rules`)
    - `instances` (string, optional): Comma-separated instances (e.g., Inst1:ObjGrp1,Inst2). (CLI flag: `-instances`)
    - `queryTypes` (string, optional): Comma-separated SQL query types (SELECT, INSERT). (CLI flag: `-queryTypes`)
    - `dataFilter` (string, optional): Custom filter expression (SQL WHERE clause like). (CLI flag: `-dataFilter`)
    - `reportColumns` (string, optional): For CSV: Columns to include (Col1:Title1,Col2). (CLI flag: `-reportColumns`)
    - `queryLengthLimit` (number, optional): Maximum length for SQL queries in report. (CLI flag: `-queryLengthLimit`)
    - `groupingPeriod` (number, optional): Period in minutes for grouping events. (CLI flag: `-groupingPeriod`)
    - `subscribers` (string, optional): Comma-separated subscriber names for notification. (CLI flag: `-subscribers`)
    - `writeToSyslog` (boolean, optional, default: `false`): Send notification to syslog. (CLI flag: `-writeToSyslog`)
    - `externalCommand` (string, optional): External shell command to execute after report generation. (CLI flag: `-externalCommand`)

### `report_gen_add_masking`
Adds a new Masking Report generation task.
- **CLI Base Command:** `addMaskingReportGen`
- **Parameters:**
    - `name` (string, required): Unique name for this masking report task. (CLI flag: `-name`)

### `report_gen_add_security`
Adds a new Security Report generation task.
- **CLI Base Command:** `addSecurityReportGen`
- **Parameters:**
    - `name` (string, required): Unique name for this security report task. (CLI flag: `-name`)

### `report_gen_add_operation_errors`
Adds a new Operation Errors Report generation task.
- **CLI Base Command:** `addOperationErrorsReportGen`
- **Parameters:**
    - `name` (string, required): Unique name for this operation errors report task. (CLI flag: `-name`)

### `report_gen_add_session`
Adds a new Session Report generation task (for direct or all sessions).
- **CLI Base Command:** `addSessionReportGen`
- **Parameters:**
    - `name` (string, required): Unique name for this session report task. (CLI flag: `-name`)
    - `inst` (string, optional): For Direct Session Report: Database instance name or "any". (CLI flag: `-inst`)

### `report_gen_add_direct_session`
Add a Direct Session Report generation task.
- **CLI Base Command:** `addDirectSessionReportGen`
- **Parameters:**
    - `name` (string, required): Unique name for this direct session report task. (CLI flag: `-name`)
    - `inst` (string, optional): Database instance name or "any". (CLI flag: `-inst`)

### `report_gen_add_system_events`
Adds a new System Events Report generation task.
- **CLI Base Command:** `addSystemEventsReportGen`
- **Parameters:**
    - `name` (string, required): Unique name for this system events report task. (CLI flag: `-name`)

### `report_gen_add_data_discovery`
Adds a Data Discovery Report generation task (DEPRECATED - use periodic_task_add_data_discovery).
- **CLI Base Command:** `addDataDiscoveryReportGen`
- **Parameters:**
    - `name` (string, required): Name for this data discovery report task. (CLI flag: `-name`)
    - `instance` (string, optional): Instance name for discovery. (CLI flag: `-instance`)
    - `searchByInfoTypes` (string, optional): Comma-separated Information Types. (CLI flag: `-searchByInfoTypes`)

### `report_gen_update_audit`
Updates an existing Audit Report generation task.
- **CLI Base Command:** `updateAuditReportGen`
- **Parameters:**
    - `name` (string, required): Current name of the audit report task to update. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the task. (CLI flag: `-newName`)

### `report_gen_show_all`
Displays all configured report generation tasks.
- **CLI Base Command:** `showReportsGen`
- **Parameters:** None

### `report_gen_show_one`
Shows detailed information for a specific report generation task.
- **CLI Base Command:** `showReportGen`
- **Parameters:**
    - `name` (string, required): Name of the report generation task to display. (CLI flag: `-name`)

### `report_gen_delete`
Deletes a specified report generation task.
- **CLI Base Command:** `delReportGen`
- **Parameters:**
    - `name` (string, required): Name of the report generation task to delete. (CLI flag: `-name`)

## Reports Commands

Category: `Reports`

### `reports_show`
Displays reports based on report type (application, host, user, IP) and event type (audit, masking, security).
- **CLI Base Command:** `showReports`
- **Parameters:**
    - `reportType` (string, required): Type of report to show (app, host, user, ip). (CLI flag: `-reportType`)
    - `eventType` (string, required): Type of event to filter by (a for audit, m for masking, s for security). (CLI flag: `-eventType`)

## Role Commands

Category: `Role`

### `role_add_access`
Adds a new Access Role. Roles define permissions for DataSunrise users. Can optionally link to an Active Directory group.
- **CLI Base Command:** `addAccessRole`
- **Parameters:**
    - `name` (string, required): Unique name for the new access role. (CLI flag: `-name`)
    - `groupDN` (string, optional): Active Directory group Distinguished Name(s) to associate with this role. (CLI flag: `-groupDN`)

### `role_update_access`
Updates an existing Access Role's name or associated AD group DN.
- **CLI Base Command:** `updateAccessRole`
- **Parameters:**
    - `name` (string, required): Current name of the Access Role to update. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the Access Role. (CLI flag: `-newName`)
    - `groupDN` (string, optional): New Active Directory group DN(s) to associate. Replaces existing. (CLI flag: `-groupDN`)

### `role_show_all_access`
Displays a list of all configured Access Roles in DataSunrise.
- **CLI Base Command:** `showAccessRoles`
- **Parameters:** None

### `role_show_one_access`
Shows detailed information and permissions for a specific Access Role.
- **CLI Base Command:** `showAccessRole`
- **Parameters:**
    - `name` (string, required): Name of the Access Role to display. (CLI flag: `-name`)

### `role_grant_all_permissions`
Grants all available permissions to a specified Access Role.
- **CLI Base Command:** `grantAllPermToRole`
- **Parameters:**
    - `name` (string, required): Name of the Access Role to grant all permissions to. (CLI flag: `-name`)

### `role_grant_permissions`
Grants specific permissions (delete, list, edit, insert, view) for specified actions/entities to an Access Role.
- **CLI Base Command:** `grantPermToRole`
- **Parameters:**
    - `name` (string, required): Name of the Access Role. (CLI flag: `-name`)
    - `deleteActions` (string, optional): Comma-separated actions/entities for DELETE permission. (CLI flag: `-delete`)
    - `listActions` (string, optional): Comma-separated actions/entities for LIST permission. (CLI flag: `-list`)
    - `editActions` (string, optional): Comma-separated actions/entities for EDIT permission. (CLI flag: `-edit`)
    - `insertActions` (string, optional): Comma-separated actions/entities for INSERT permission. (CLI flag: `-insert`)
    - `viewActions` (string, optional): Comma-separated actions/entities for VIEW permission. (CLI flag: `-view`)
    - `executeActions` (string, optional): Comma-separated actions/entities for EXECUTE permission. (CLI flag: `-execute`)

### `role_set_permissions`
Sets specific permissions for an Access Role, revoking any not explicitly granted in this command.
- **CLI Base Command:** `setPermissionsToRole`
- **Parameters:**
    - `name` (string, required): Name of the Access Role. (CLI flag: `-name`)
    - `deleteActions` (string, optional): Comma-separated actions/entities for DELETE permission. (CLI flag: `-delete`)
    - `listActions` (string, optional): Comma-separated actions/entities for LIST permission. (CLI flag: `-list`)
    - `editActions` (string, optional): Comma-separated actions/entities for EDIT permission. (CLI flag: `-edit`)
    - `insertActions` (string, optional): Comma-separated actions/entities for INSERT permission. (CLI flag: `-insert`)
    - `viewActions` (string, optional): Comma-separated actions/entities for VIEW permission. (CLI flag: `-view`)
    - `executeActions` (string, optional): Comma-separated actions/entities for EXECUTE permission. (CLI flag: `-execute`)

### `role_revoke_all_permissions`
Revokes all permissions from a specified Access Role.
- **CLI Base Command:** `revokeAllPermFromRole`
- **Parameters:**
    - `name` (string, required): Name of the Access Role to revoke all permissions from. (CLI flag: `-name`)

### `role_revoke_permissions`
Revokes specific permissions for specified actions/entities from an Access Role.
- **CLI Base Command:** `revokePermFromRole`
- **Parameters:**
    - `name` (string, required): Name of the Access Role. (CLI flag: `-name`)
    - `deleteActions` (string, optional): Comma-separated actions/entities for DELETE permission to revoke. (CLI flag: `-delete`)
    - `listActions` (string, optional): Comma-separated actions/entities for LIST permission to revoke. (CLI flag: `-list`)
    - `editActions` (string, optional): Comma-separated actions/entities for EDIT permission to revoke. (CLI flag: `-edit`)
    - `insertActions` (string, optional): Comma-separated actions/entities for INSERT permission to revoke. (CLI flag: `-insert`)
    - `viewActions` (string, optional): Comma-separated actions/entities for VIEW permission to revoke. (CLI flag: `-view`)
    - `executeActions` (string, optional): Comma-separated actions/entities for EXECUTE permission to revoke. (CLI flag: `-execute`)

### `role_delete_access`
Deletes an Access Role.
- **CLI Base Command:** `delAccessRole`
- **Parameters:**
    - `name` (string, required): Name of the Access Role to delete. (CLI flag: `-name`)

## Rule Commands

Category: `Rule`

### `rule_add_audit`
Adds a new Audit Rule to log or skip specified database activities based on various criteria.
- **CLI Base Command:** `addAuditRule`
- **Parameters:**
    - `name` (string, required): Unique name for the rule. (CLI flag: `-name`)
    - `dbType` (string, optional): Database type (e.g., ORACLE, ANY). (CLI flag: `-dbType`)
    - `enable` (boolean, optional, default: `true`): Enable or disable the rule. (CLI flag: `-enable`)
    - `comment` (string, optional): Descriptive comment for the rule. (CLI flag: `-comment`)
    - `schedule` (string, optional): Name of a schedule to apply this rule, or "no". (CLI flag: `-schedule`)
    - `instance` (string, optional): Filter by database instance name or "any". (CLI flag: `-instance`)
    - `app` (string, optional): Filter by client application name (can be regexp like "{regexp}name"). (CLI flag: `-app`)
    - `addUsers` (string, optional): Comma-separated DB users to apply rule to. (CLI flag: `-addUsers`)
    - `addUserGroups` (string, optional): Comma-separated DB user groups. (CLI flag: `-addUserGroups`)
    - `addOsUsers` (string, optional): Comma-separated OS users. (CLI flag: `-addOsUsers`)
    - `addOsUserGroups` (string, optional): Comma-separated OS user groups. (CLI flag: `-addOsUserGroups`)
    - `addHosts` (string, optional): Comma-separated client hosts/IPs. (CLI flag: `-addHosts`)
    - `addHostGroups` (string, optional): Comma-separated client host groups. (CLI flag: `-addHostGroups`)
    - `checkNextRule` (boolean, optional, default: `false`): If false (default), rule processing stops if this rule matches. If true, subsequent rules are evaluated. (CLI flag: `-checkNextRule`)
    - `addSubscribers` (string, optional): Comma-separated subscriber names for notification. (CLI flag: `-addSubscribers`)
    - `sysLogGr` (string, optional): CEF Group name to send event data to for syslog/SIEM, or "no". (CLI flag: `-sysLogGr`)
    - `logInStorage` (boolean, optional, default: `true`): Log the event in DataSunrise internal audit storage. (CLI flag: `-logInStorage`)
    - `action` (string, optional, default: `audit`): Action for the audit rule (audit or skip). (CLI flag: `-action`)
    - `filterType` (string, optional, default: `object`): Primary filtering mechanism (object, group, ddl, inject, session). (CLI flag: `-filterType`)
    - `depersQueries` (boolean, optional): Mask/anonymize sensitive data in SQL queries in audit logs. (CLI flag: `-depersQueries`)
    - `logBindVariables` (boolean, optional): Log values of bind variables used in SQL statements. (CLI flag: `-logBindVariables`)
    - `logData` (boolean, optional, default: `false`): Log the result set of queries. (CLI flag: `-logData`)
    - `logMaxRowCount` (string, optional): Max rows from result set to log (number, default, unlimited). (CLI flag: `-logMaxRowCount`)
    - `ddlTypes` (string, optional): For DDL filter: Comma-separated DDL types (CREATE_TABLE). (CLI flag: `-ddlTypes`)
    - `injWarnLevel` (string, optional): For SQLi filter: Warning level. (CLI flag: `-injWarnLevel`)
    - `sessionsType` (string, optional): For Session filter: Type of sessions (DISABLED, UNSUCCESSFUL, ALL_SUCCESS). (CLI flag: `-sessionsType`)
    - `intercSqlSelect` (boolean, optional): Intercept SELECT statements. (CLI flag: `-intercSqlSelect`)
    - `intercSqlInsert` (boolean, optional): Intercept INSERT statements. (CLI flag: `-intercSqlInsert`)
    - `intercSqlUpdate` (boolean, optional): Intercept UPDATE statements. (CLI flag: `-intercSqlUpdate`)
    - `intercSqlDelete` (boolean, optional): Intercept DELETE statements. (CLI flag: `-intercSqlDelete`)
    - `intercSqlFuncCall` (boolean, optional): Intercept function calls. (CLI flag: `-intercSqlFuncCall`)
    - `intercTab` (string, optional): Comma-separated tables/columns to intercept (db.schema.table.col). (CLI flag: `-intercTab`)
    - `intercObjGr` (string, optional): Comma-separated Object Group names to intercept. (CLI flag: `-intercObjGr`)
    - `skipSqlGr` (string, optional): Comma-separated SQL Query Group names to skip. (CLI flag: `-skipSqlGr`)

### `rule_show_one`
Shows detailed information for a specific rule.
- **CLI Base Command:** `showRule`
- **Parameters:**
    - `name` (string, required): Name of the rule to display. (CLI flag: `-name`)

## Schedule Commands

Category: `Schedule`

### `schedule_add`
Adds a new schedule. Schedules define time intervals (daily, weekly) during which rules or tasks are active.
- **CLI Base Command:** `addSchedule`
- **Parameters:**
    - `name` (string, required): Unique name for the new schedule. (CLI flag: `-name`)
    - `intervals` (string, required): Semicolon-separated day=HH:MM:SS-HH:MM:SS strings (e.g., "mo=09:00:00-17:00:00;tu=09:00:00-12:00:00"). (CLI flag: `-intervals`)

### `schedule_update`
Updates an existing schedule's name or its intervals.
- **CLI Base Command:** `updateSchedule`
- **Parameters:**
    - `name` (string, required): Current name of the schedule to update. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the schedule. (CLI flag: `-newName`)
    - `intervals` (string, optional): New semicolon-separated intervals. Replaces existing. (CLI flag: `-intervals`)

### `schedule_show_all`
Displays a list of all configured schedules.
- **CLI Base Command:** `showSchedules`
- **Parameters:** None

### `schedule_show_one`
Shows detailed information for a specific schedule, including its time intervals.
- **CLI Base Command:** `showSchedule`
- **Parameters:**
    - `name` (string, required): Name of the schedule to display. (CLI flag: `-name`)

### `schedule_delete`
Deletes a specified schedule. Ensure it is not in use by any rules or tasks.
- **CLI Base Command:** `delSchedule`
- **Parameters:**
    - `name` (string, required): Name of the schedule to delete. (CLI flag: `-name`)

## Server Commands

Category: `Server`

### `server_add_smtp`
Adds a new SMTP server configuration for email notifications.
- **CLI Base Command:** `addServer`
- **Parameters:**
    - `name` (string, required): Unique name for the SMTP server configuration. (CLI flag: `-name`)
    - `host` (string, required): Hostname or IP address of the SMTP server. (CLI flag: `-host`)
    - `port` (string, required): Port number of the SMTP server (e.g., 25, 465, 587). (CLI flag: `-port`)
    - `mailFrom` (string, required): Email address to use as the sender ("Mail From"). (CLI flag: `-mailFrom`)
    - `login` (string, optional): Login for SMTP authentication (if required). (CLI flag: `-login`)
    - `password` (string, optional): Password for SMTP authentication. (CLI flag: `-password`)
    - `certificate` (boolean, optional, default: `true`): Enable SSL/TLS certificate usage. (CLI flag: `-certificate`)

### `server_add_snmp`
Adds a new SNMP server configuration for SNMP trap notifications.
- **CLI Base Command:** `addServer`
- **Parameters:**
    - `name` (string, required): Unique name for the SNMP server configuration. (CLI flag: `-name`)
    - `host` (string, required): Hostname or IP address of the SNMP server/trap receiver. (CLI flag: `-host`)
    - `port` (string, required): Port number of the SNMP server (e.g., 162). (CLI flag: `-port`)
    - `login` (string, optional): SNMP community string or user (for SNMPv3). (CLI flag: `-login`)

### `server_update`
Updates an existing server configuration's name or other properties.
- **CLI Base Command:** `updateServer`
- **Parameters:**
    - `name` (string, required): Current name of the server configuration to update. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the server configuration. (CLI flag: `-newName`)
    - `host` (string, optional): New hostname or IP address. (CLI flag: `-host`)
    - `port` (string, optional): New port number. (CLI flag: `-port`)

### `server_show_all`
Displays a list of all configured servers (SMTP, SNMP, etc.).
- **CLI Base Command:** `showServers`
- **Parameters:** None

### `server_show_one`
Shows detailed information for a specific server configuration.
- **CLI Base Command:** `showServer`
- **Parameters:**
    - `name` (string, required): Name of the server configuration to display. (CLI flag: `-name`)

### `server_delete_by_name`
Deletes a server configuration by its name.
- **CLI Base Command:** `delServer`
- **Parameters:**
    - `name` (string, required): Name of the server configuration to delete. (CLI flag: `-name`)

### `server_delete_by_id`
Deletes a server configuration by its ID.
- **CLI Base Command:** `delServer`
- **Parameters:**
    - `id` (string, required): ID of the server configuration to delete. (CLI flag: `-id`)

## SSL Key Group Commands

Category: `SSL Key Group`

### `ssl_key_group_add`
Adds a new SSL Key Group. SSL Key Groups store SSL certificates and keys for secure connections.
- **CLI Base Command:** `addSslKeyGroup`
- **Parameters:**
    - `name` (string, required): Unique name for the new SSL Key Group. (CLI flag: `-name`)

### `ssl_key_group_update`
Updates an existing SSL Key Group's name.
- **CLI Base Command:** `updateSslKeyGroup`
- **Parameters:**
    - `name` (string, required): Current name of the SSL Key Group to update. (CLI flag: `-name`)
    - `newName` (string, required): New name for the SSL Key Group. (CLI flag: `-newName`)

### `ssl_key_group_show_all`
Displays a list of all configured SSL Key Groups.
- **CLI Base Command:** `showSSLKeyGroups`
- **Parameters:** None

### `ssl_key_group_show_one`
Shows detailed information for a specific SSL Key Group.
- **CLI Base Command:** `showSslKeyGroup`
- **Parameters:**
    - `name` (string, required): Name of the SSL Key Group to display. (CLI flag: `-name`)

### `ssl_key_group_delete`
Deletes a specified SSL Key Group. Ensure it is not in use.
- **CLI Base Command:** `delSslKeyGroup`
- **Parameters:**
    - `name` (string, required): Name of the SSL Key Group to delete. (CLI flag: `-name`)

## Static Masking Commands

Category: `Static Masking`

### `static_masking_start`
Starts a static masking task. This involves copying data from a source instance to a target instance, applying masking rules as defined in a table configuration JSON file.
- **CLI Base Command:** `statMask`
- **Parameters:**
    - `sourceInstance` (string, required): Name of the source DataSunrise instance. (CLI flag: `-sourceInstance`)
    - `targetInstance` (string, required): Name of the target DataSunrise instance where masked data will be written. (CLI flag: `-targetInstance`)
    - `tableFile` (string, required): Path to the JSON file defining tables and columns to be masked, along with their masking rules. (CLI flag: `-tableFile`)

### `static_masking_show_status`
Shows the status and details of a specific static masking task by its ID.
- **CLI Base Command:** `showStatMasking`
- **Parameters:**
    - `id` (string, required): ID of the static masking task to display. (CLI flag: `-id`)

### `static_masking_restart`
Restarts a previously run or failed static masking task by its ID.
- **CLI Base Command:** `restartStatMasking`
- **Parameters:**
    - `id` (string, required): ID of the static masking task to restart. (CLI flag: `-id`)

## Subscriber Commands

Category: `Subscriber`

### `subscriber_add`
Adds a new subscriber for notifications. Subscribers are linked to pre-configured SMTP or SNMP servers.
- **CLI Base Command:** `addSubscriber`
- **Parameters:**
    - `name` (string, required): Unique name for the new subscriber. (CLI flag: `-name`)
    - `serverName` (string, required): Name of the pre-configured SMTP or SNMP server to use for this subscriber. (CLI flag: `-serverName`)
    - `sendToAddress` (string, optional): Email address or SNMP trap destination for the subscriber. (CLI flag: `-sendToAddress`)

### `subscriber_update`
Updates an existing subscriber's name, server, or notification address.
- **CLI Base Command:** `updateSubscriber`
- **Parameters:**
    - `name` (string, required): Current name of the subscriber to update. (CLI flag: `-name`)
    - `newName` (string, optional): New name for the subscriber. (CLI flag: `-newName`)
    - `serverName` (string, optional): New server name for the subscriber. (CLI flag: `-serverName`)
    - `sendToAddress` (string, optional): New notification address. (CLI flag: `-sendToAddress`)

### `subscriber_show_all`
Displays a list of all configured subscribers.
- **CLI Base Command:** `showSubscribers`
- **Parameters:** None

### `subscriber_show_one`
Shows detailed information for a specific subscriber.
- **CLI Base Command:** `showSubscriber`
- **Parameters:**
    - `name` (string, required): Name of the subscriber to display. (CLI flag: `-name`)

### `subscriber_delete`
Deletes a specified subscriber.
- **CLI Base Command:** `delSubscriber`
- **Parameters:**
    - `name` (string, required): Name of the subscriber to delete. (CLI flag: `-name`)

## Tag Commands

Category: `Tag`

### `tag_add`
Adds a tag (key-value pair, though value is often implicit or not set via CLI) to a DataSunrise entity (Rule, Periodic Task, Object Group).
- **CLI Base Command:** `addTag`
- **Parameters:**
    - `name` (string, required): The key/name of the tag to add. (CLI flag: `-name`)
    - `entityType` (string, required): Type of the entity to tag (Rule, Periodic Task, Object Group). (CLI flag: `-entityType`)
    - `entityName` (string, required): Name of the specific entity instance to tag. (CLI flag: `-entityName`)

### `tag_update`
Updates an existing tag's key for a specific entity.
- **CLI Base Command:** `updateTag`
- **Parameters:**
    - `name` (string, required): Current key/name of the tag to update. (CLI flag: `-name`)
    - `newName` (string, required): New key/name for the tag. (CLI flag: `-newName`)
    - `entityType` (string, required): Type of the entity the tag belongs to. (CLI flag: `-entityType`)
    - `entityName` (string, required): Name of the entity the tag belongs to. (CLI flag: `-entityName`)

### `tag_show_for_entity`
Displays all tags associated with a specific DataSunrise entity.
- **CLI Base Command:** `showTags`
- **Parameters:**
    - `entityType` (string, required): Type of the entity (Rule, Periodic Task, Object Group). (CLI flag: `-entityType`)
    - `entityName` (string, required): Name of the entity whose tags to display. (CLI flag: `-entityName`)

### `tag_show_one`
Shows detailed information for a specific tag on a specific entity.
- **CLI Base Command:** `showTag`
- **Parameters:**
    - `name` (string, required): Key/name of the tag to display. (CLI flag: `-name`)
    - `entityType` (string, required): Type of the entity the tag belongs to. (CLI flag: `-entityType`)
    - `entityName` (string, required): Name of the entity the tag belongs to. (CLI flag: `-entityName`)

### `tag_show_tagged_entities`
Shows all DataSunrise entities that have at least one tag.
- **CLI Base Command:** `showTagged`
- **Parameters:** None

### `tag_show_untagged_entities`
Shows all DataSunrise entities that do not have any tags.
- **CLI Base Command:** `showUntagged`
- **Parameters:** None

### `tag_delete`
Deletes a specific tag from a DataSunrise entity.
- **CLI Base Command:** `delTag`
- **Parameters:**
    - `name` (string, required): Key/name of the tag to delete. (CLI flag: `-name`)
    - `entityType` (string, required): Type of the entity from which to delete the tag. (CLI flag: `-entityType`)
    - `entityName` (string, required): Name of the entity from which to delete the tag. (CLI flag: `-entityName`)
