# DataSunrise CLI Commands

This document lists the available DataSunrise CLI commands, categorized by their context, as identified from the test files.

## 1. Application Commands (`contexts/application_context.py`)

*   `addApplication -name <application_name>`: Adds a new application.
*   `updateApplication -name <current_application_name> -newName <new_application_name>`: Updates an existing application's name.
*   `showApplications`: Displays a list of all configured applications.
*   `showApplication -name <application_name>`: Shows detailed information for a specific application.
*   `delApplication -name <application_name>`: Deletes an application.

## 2. CEF (Common Event Format) Commands (`contexts/cef_context.py`)

*   `addCefGroup -name <group_name>`: Adds a new CEF group.
*   `addCefItem -name <item_name> -groupName <group_name> -type <cef_type> -cef <cef_code>`: Adds a new CEF item to a specified group.
*   `updateCefGroup -name <current_group_name> -newName <new_group_name>`: Updates an existing CEF group's name.
*   `updateCefItem -name <current_item_name> -newName <new_item_name> -groupName <group_name> -cef <cef_code>`: Updates an existing CEF item.
*   `showCefGroups`: Displays all CEF groups.
*   `showCefGroup -name <group_name>`: Shows detailed information for a specific CEF group.
*   `showCefItems -groupName <group_name>`: Displays all CEF items within a specified group.
*   `showCefItem -name <item_name> -groupName <group_name>`: Shows detailed information for a specific CEF item in a group.
*   `delCefGroup -name <group_name>`: Deletes a CEF group.
*   `delCefItem -name <item_name> -groupName <group_name>`: Deletes a CEF item from a group.

## 3. Core Commands (`contexts/core_context.py`)

*   `start -f`: Starts the core application (forcefully).
*   `restart -f`: Restarts the core application (forcefully).
*   `stop -f`: Stops the core application (forcefully).
*   `showCoreState -dsServer <datasunrise_server_name> -worker <worker_id>`: Shows the state of a specific worker on a DataSunrise server. (Worker ID is '1' in the context).

## 4. Database User Commands (`contexts/db_user_context.py`)

*   `addDbUser -name <db_user_name>`: Adds a new database user.
*   `addDbUserGr -name <group_name> -addMembers <member_names_comma_separated>`: Adds a new database user group with specified members.
*   `addDbUserMapping -instance <instance_name> -adLogin <active_directory_login> -dbLogin <database_login> -dbPassword <database_password> -ldapServer <ldap_server_name>`: Adds an Active Directory to database user mapping.
*   `addLdapServer -name <ldap_server_name> -host <ldap_host> -port <ldap_port> -default <true|false> -baseDn <base_distinguished_name>`: Adds a new LDAP server configuration.
*   `updateDbUser -name <current_db_user_name> -newName <new_db_user_name>`: Updates a database user's name.
*   `updateDbUserGr -name <current_group_name> -newName <new_group_name>`: Updates a database user group's name.
*   `updateLdapServer -name <current_ldap_server_name> -newName <new_ldap_server_name>`: Updates an LDAP server's name.
*   `showDbUsers`: Displays all database users.
*   `showDbUser -name <db_user_name>`: Shows detailed information for a specific database user.
*   `showDbUserGroups`: Displays all database user groups.
*   `showDbUserGr -name <group_name>`: Shows detailed information for a specific database user group.
*   `showAdDbUserMapping -instance <instance_name>`: Shows Active Directory to database user mappings for an instance.
*   `showLdapServers`: Displays all configured LDAP servers.
*   `showLdapServer -name <ldap_server_name>`: Shows detailed information for a specific LDAP server.
*   `enableDbUserMapping -instance <instance_name> -mapType <mapping_type>`: Enables database user mapping for an instance.
*   `disableDbUserMapping -instance <instance_name>`: Disables database user mapping for an instance.
*   `delDbUser -name <db_user_name>`: Deletes a database user.
*   `delDbUserGr -name <group_name>`: Deletes a database user group.
*   `delDbUserMapping -instance <instance_name> -adLogin <active_directory_login>`: Deletes an Active Directory to database user mapping.
*   `delLdapServer -name <ldap_server_name>`: Deletes an LDAP server configuration.

## 5. Dictionary Commands (`contexts/dictionary_context.py`)

*   `createDictionaryBackup`: Creates a backup of the dictionary.
*   `showDictionaryBackups`: Displays available dictionary backups.
*   `cleanDictionary -f`: Cleans the dictionary (forcefully).
*   `recoverDictionary -id <backup_id>`: Recovers the dictionary from a specified backup ID.

## 6. Discovery Commands (`contexts/discovery_context.py`)

*   `addDiscoveryGr -name <group_name>`: Adds a new discovery group.
*   `addDiscoveryAttr -name <attribute_name> -group <group_name>`: Adds a discovery attribute to a group.
*   `updateDiscoveryGr -name <current_group_name> -newName <new_group_name>`: Updates a discovery group's name.
*   `updateDiscoveryAttr -name <current_attribute_name> -newName <new_attribute_name> -group <group_name>`: Updates a discovery attribute.
*   `copyDiscoveryGr -name <group_name>`: Copies an existing discovery group.
*   `showDiscoveryGroups`: Displays all discovery groups.
*   `showDiscoveryGr -name <group_name>`: Shows detailed information for a specific discovery group.
*   `showDiscoveryAttr -name <attribute_name> -group <group_name>`: Shows detailed information for a specific discovery attribute in a group.
*   `delDiscoveryGr -name <group_name>`: Deletes a discovery group.
*   `delDiscoveryAttr -name <attribute_name> -group <group_name>`: Deletes a discovery attribute from a group.

## 7. DataSunrise User Commands (`contexts/ds_user_context.py`)

*   `addAccessRole -name <role_name>`: Adds a new access role.
*   `addDsUser -login <login_name> -password <password> -role <role_name>`: Adds a new DataSunrise user.
*   `updateDsUser -login <login_name> -role <new_role_name>`: Updates a DataSunrise user's role.
*   `showDsUsers`: Displays all DataSunrise users.
*   `showDsUser -login <login_name>`: Shows detailed information for a specific DataSunrise user.
*   `changePwd -login <login_name> -currentPwd <current_password> -newPwd <new_password>`: Changes a DataSunrise user's password.
*   `delDsUser -login <login_name>`: Deletes a DataSunrise user.
*   `delAccessRole -name <role_name>`: Deletes an access role.

## 8. Hosts Commands (`contexts/hosts_context.py`)

*   `addHost -name <host_name> -host <host_address_or_ip>`: Adds a new host.
*   `addHostGr -name <group_name> -addMembers <member_host_names_comma_separated>`: Adds a new host group with specified members.
*   `updateHost -name <current_host_name> -host <new_host_address_or_ip>`: Updates a host's address.
*   `updateHostGr -name <current_group_name> -newName <new_group_name>`: Updates a host group's name.
*   `showHosts`: Displays all configured hosts.
*   `showHost -name <host_name>`: Shows detailed information for a specific host.
*   `showHostGroups`: Displays all host groups.
*   `showHostGr -name <group_name>`: Shows detailed information for a specific host group.
*   `delHost -name <host_name>`: Deletes a host.
*   `delHostGr -name <group_name>`: Deletes a host group.

## 9. Import Commands (`contexts/import_context.py`)

*   `importUsers -fileName <path_to_csv_file>`: Imports users from a CSV file.
*   `importHosts -fileName <path_to_csv_file>`: Imports hosts from a CSV file.
*   `importApps -fileName <path_to_csv_file>`: Imports applications from a CSV file.

## 10. Instance Commands (`contexts/instance_context.py`)
    *(Note: Some commands have conditional parameters based on database type, indicated by `[...]` or `|`. The exact syntax might vary.)*

*   `updateMetadata -instance <instance_name> -login <login> -password <password>`: Updates metadata for an instance.
*   `addInstancePlus -name <instance_name> -dbType <database_type> [-database <db_name> | -instance <oracle_instance_name>] -dbHost <db_host> -dbPort <db_port> -login <login> -password <password> -proxyHost <proxy_host> -proxyPort <proxy_port> [-sysDba] -savePassword <ds|no> -enableAgent <true|false>`: Adds a new database instance with more detailed configuration (interface, proxy).
*   `addInterface -instance <instance_name> -newHost <interface_host> -newPort <interface_port>`: Adds a network interface to an instance.
*   `addProxy -instance <instance_name> -interfaceHost <interface_host> -interfacePort <interface_port> -proxyHost <proxy_host> -proxyPort <proxy_port>`: Adds a proxy configuration to an instance interface.
*   `updateInstance -name <current_instance_name> -newName <new_instance_name>`: Updates an instance's name.
*   `updateInstanceCredentials -instance <instance_name> -login <new_login> -password <new_password>`: Updates credentials for an instance.
*   `updateInterface -instance <instance_name> -prevHost <current_interface_host> -prevPort <current_interface_port> -newHost <new_interface_host> -newPort <new_interface_port>`: Updates an instance's network interface.
*   `updateProxy -instance <instance_name> -interfaceHost <interface_host> -interfacePort <interface_port> -prevProxyHost <current_proxy_host> -prevProxyPort <current_proxy_port> -proxyHost <new_proxy_host> -proxyPort <new_proxy_port>`: Updates a proxy configuration.
*   `showInstances`: Displays all configured instances.
*   `showInstance -name <instance_name>`: Shows detailed information for a specific instance.
*   `showInterfaces`: Displays all interfaces (likely needs an instance context in practice).
*   `showInterface -instance <instance_name> -host <interface_host> -port <interface_port>`: Shows detailed information for a specific interface of an instance.
*   `showProxies -instance <instance_name> -interfaceHost <interface_host> -interfacePort <interface_port>`: Displays proxies for a specific interface.
*   `showProxy -instance <instance_name> -interfaceHost <interface_host> -interfacePort <interface_port> -proxyHost <proxy_host> -proxyPort <proxy_port>`: Shows detailed information for a specific proxy.
*   `delInstance -name <instance_name>`: Deletes an instance.
*   `delInterface -instance <instance_name> -host <interface_host> -port <interface_port>`: Deletes an interface from an instance.
*   `delProxy -instance <instance_name> -interfaceHost <interface_host> -interfacePort <interface_port> -proxyHost <proxy_host> -proxyPort <proxy_port>`: Deletes a proxy from an interface.

## 11. License Commands (`contexts/license_context.py`)

*   `updateLicense -key <license_key_string>`: Updates the license using a key string.
*   `updateLicenses -file <path_to_license_file.reg>`: Updates licenses from a .reg file.
*   `showLicenses`: Displays all installed licenses.
*   `showLicense -id <license_id>`: Shows detailed information for a specific license by ID.
*   `delLicense -id <license_id>`: Deletes a license by ID.

## 12. Object Group Commands (`contexts/object_group_context.py`)

*   `addObjectGroup -name <group_name>`: Adds a new object group.
*   `updateObjectGroup -name <current_group_name> -newName <new_group_name>`: Updates an object group's name.
*   `showObjectGroups`: Displays all object groups.
*   `showObjectGroup -name <group_name>`: Shows detailed information for a specific object group.
*   `delObjectGroup -name <group_name>`: Deletes an object group.

## 13. Parameters Commands (`contexts/parameters_context.py`)

*   `showParameters`: Displays all system parameters and their current values.
*   `changeParameter -name <parameter_name> -value <new_value>`: Changes the value of a system parameter.

## 14. Periodic Task Commands (`contexts/periodic_task_context.py`)

*   `addPerCleanAudit -name <task_name>`: Adds a periodic task for cleaning audit data.
*   `addPerBackupDictionary -name <task_name> -backupName <backup_name_template>`: Adds a periodic task for backing up the dictionary.
*   `addPerUserBehavior -name <task_name> -trStartDate <YYYY-MM-DD> -trEndDate <YYYY-MM-DD>`: Adds a periodic task for user behavior analysis.
*   `addQueryHisTabRelLearnPerTask -name <task_name> -instance <instance_name> -tableRel <table_relation_model_name>`: Adds a periodic task for query history table relation learning.
*   `addPerVulnAssessment -name <task_name>`: Adds a periodic task for vulnerability assessment.
*   `addPerUpdateMetadata -name <task_name> -instance <instance_name>`: Adds a periodic task for updating metadata for an instance.
*   `addPerDiscovery -name <task_name> -instance <instance_name> -searchByInfoTypes <info_type_names_comma_separated>`: Adds a periodic task for data discovery.
*   `addPerHealthCheck -name <task_name> -instance <instance_name>`: Adds a periodic task for health checks on an instance.
*   `updatePerCleanAudit -name <current_task_name> -newName <new_task_name>`: Updates a periodic clean audit task.
*   `updatePerBackupDictionary -name <current_task_name> -newName <new_task_name>`: Updates a periodic backup dictionary task.
*   `updatePerUserBehavior -name <current_task_name> -newName <new_task_name>`: Updates a periodic user behavior task.
*   `updateQueryHisTabRelLearnPerTask -name <current_task_name> -newName <new_task_name>`: Updates a periodic query history table relation learning task.
*   `updatePerVulnAssessment -name <current_task_name> -newName <new_task_name>`: Updates a periodic vulnerability assessment task.
*   `updatePerUpdateMetadata -name <current_task_name> -newName <new_task_name>`: Updates a periodic update metadata task.
*   `updatePerDiscovery -name <current_task_name> -newName <new_task_name>`: Updates a periodic data discovery task.
*   `updatePerHealthCheck -name <current_task_name> -newName <new_task_name>`: Updates a periodic health check task.
*   `showPerTask -name <task_name> -taskType <task_type_string>`: Shows detailed information for a specific periodic task. (Task types include "Clean Audit", "Backup Dictionary", etc.)
*   `delPerTask -name <task_name> -taskType <task_type_string>`: Deletes a periodic task.

## 15. Query Group Commands (`contexts/query_group_context.py`)

*   `addQueryGroup -name <group_name>`: Adds a new query group.
*   `addQueryOfGroup -name <group_name> -sql <sql_query_text>`: Adds an SQL query to a specified group.
*   `updateQueryGroup -name <current_group_name> -newName <new_group_name>`: Updates a query group's name.
*   `updateQueryOfGroup -name <group_name> -sql <current_sql_query_text> -newSql <new_sql_query_text>`: Updates an SQL query within a group.
*   `showQueryGroups`: Displays all query groups.
*   `showQueryGroup -name <group_name>`: Shows detailed information for a specific query group, including its queries.
*   `delQueryGroup -name <group_name>`: Deletes a query group.
*   `delQuery -name <group_name> -sql <sql_query_text>`: Deletes a specific query from a group.

## 16. Query Types Commands (`contexts/query_types_context.py`)

*   No direct CLI commands were found in this context file. It seems to be more for internal test logic.

## 17. Report Generator Commands (`contexts/report_gen_context.py`)

*   `addAuditReportGen -name <generator_name>`: Adds an audit report generator task.
*   `addMaskingReportGen -name <generator_name>`: Adds a masking report generator task.
*   `addSecurityReportGen -name <generator_name>`: Adds a security report generator task.
*   `addOperationErrorsReportGen -name <generator_name>`: Adds an operation errors report generator task.
*   `addSessionReportGen -name <generator_name>`: Adds a session report generator task.
*   `addSystemEventsReportGen -name <generator_name>`: Adds a system events report generator task.
*   `addTransTrailExportReportGen -name <generator_name>`: Adds a Transaction Trail Export report generator task.
*   `addDataDiscoveryReportGen -name <generator_name> -instance <instance_name> -searchByInfoTypes <info_types_comma_separated>`: Adds a data discovery report generator task.
*   `updateAuditReportGen -name <current_generator_name> -newName <new_generator_name>`: Updates an audit report generator.
*   `updateMaskingReportGen -name <current_generator_name> -newName <new_generator_name>`: Updates a masking report generator.
*   `updateSecurityReportGen -name <current_generator_name> -newName <new_generator_name>`: Updates a security report generator.
*   `updateOperationErrorsReportGen -name <current_generator_name> -newName <new_generator_name>`: Updates an operation errors report generator.
*   `updateSessionReportGen -name <current_generator_name> -newName <new_generator_name>`: Updates a session report generator.
*   `updateSystemEventsReportGen -name <current_generator_name> -newName <new_generator_name>`: Updates a system events report generator.
*   `updateDataDiscoveryReportGen -name <current_generator_name> -newName <new_generator_name>`: Updates a data discovery report generator. Deprecated. Please use updatePerDiscovery instead.
*   `showReportGen -name <generator_name>`: Shows detailed information for a specific report generator task.
*   `showReportsGen`: Displays all configured report generator tasks.
*   `delReportGen -name <generator_name>`: Deletes a report generator task.
*   `changeParameter -name auditObjects -value <1|0>`: Enables (1) or disables (0) audit object logging (used by some report generators).

## 18. Reports Commands (`contexts/reports_context.py`)

*   `showReports -reportType <app|host|user|ip> -eventType <a|m|s>`: Displays reports based on type and event type (a: audit, m: masking, s: security).

## 19. Role Commands (`contexts/role_context.py`)

*   `addAccessRole -name <role_name>`: (Duplicate, also in DataSunrise User) Adds a new access role.
*   `updateAccessRole -name <current_role_name> -newName <new_role_name>`: Updates an access role's name.
*   `showAccessRoles`: Displays all access roles.
*   `showAccessRole -name <role_name>`: Shows detailed information and permissions for a specific role.
*   `grantAllPermToRole -name <role_name>`: Grants all available permissions to a role.
*   `grantPermToRole -name <role_name> -delete "<actions_comma_separated>" -list "<actions>" -edit "<actions>" -insert "<actions>" -view "<actions>"`: Grants specific permissions for specified actions to a role. (The context file has hardcoded examples for actions).
*   `setPermissionsToRole -name <role_name> -list "<actions>" -edit "<actions>" -insert "<actions>" -view "<actions>"`: Sets specific permissions, revoking others not listed. (The context file has hardcoded examples for actions).
*   `revokeAllPermFromRole -name <role_name>`: Revokes all permissions from a role.
*   `revokePermFromRole -name <role_name> -edit "<actions>" -view "<actions>"`: Revokes specific permissions for specified actions from a role. (The context file has hardcoded examples for actions).
*   `delAccessRole -name <role_name>`: (Duplicate, also in DataSunrise User) Deletes an access role.

## 20. Rules Commands (`contexts/rules_context.py`)
    *(Note: `-dbType` is often inferred from context but is part of the command structure)*

*   `addRule -dbType <database_type> -action <action_type> -name <rule_name_prefix><action_type>`: A generic way to add a rule (specific commands below are preferred).
*   `addAuditRule -dbType <database_type> -name <rule_name>`: Adds an audit rule.
*   `addMaskRule -dbType <database_type> -name <rule_name> -instance <instance_name> -maskColumns <columns_to_mask_comma_separated> -maskType <masking_type_string>`: Adds a masking rule.
*   `addSecurityRule -dbType <database_type> -name <rule_name>`: Adds a security rule.
*   `addLearnRule -dbType <database_type> -name <rule_name>`: Adds a learning rule.
*   `updateRule -name <rule_name> -enable <true|false>`: Enables or disables a generic rule.
*   `updateAuditRule -name <audit_rule_name> -enable <true|false>`: Enables or disables an audit rule.
*   `updateMaskRule -name <masking_rule_name> -enable <true|false>`: Enables or disables a masking rule.
*   `updateSecurityRule -name <security_rule_name> -enable <true|false>`: Enables or disables a security rule.
*   `updateLearnRule -name <learning_rule_name> -enable <true|false>`: Enables or disables a learning rule.
*   `showRules`: Displays all configured rules.
*   `showRule -name <rule_name>`: Shows detailed information for a specific rule.
*   `delRule -name <rule_name>`: Deletes a rule.

## 21. Schedule Commands (`contexts/schedule_context.py`)

*   `addSchedule -name <schedule_name> -intervals <day=HH:MM:SS-HH:MM:SS;day=...>`: Adds a new schedule with specified time intervals for days of the week (e.g., "mo=09:00:00-17:00:00;tu=09:00:00-17:00:00").
*   `updateSchedule -name <current_schedule_name> -newName <new_schedule_name>`: Updates a schedule's name.
*   `showSchedules`: Displays all configured schedules.
*   `showSchedule -name <schedule_name>`: Shows detailed information for a specific schedule.
*   `delSchedule -name <schedule_name>`: Deletes a schedule.

## 22. Server Commands (`contexts/server_context.py`)

*   `addServer -name <server_name> -serverType <SMTP|SNMP> -host <server_host> -port <server_port> [-mailFrom <email_address_for_smtp>]`: Adds a new server configuration (SMTP or SNMP).
*   `updateServer -name <current_server_name> -newName <new_server_name>`: Updates a server's name.
*   `showServers`: Displays all configured servers.
*   `showServer -name <server_name>`: Shows detailed information for a specific server.
*   `delServer -name <server_name>`: Deletes a server by name.
*   `delServer -id <server_id>`: Deletes a server by ID.

## 23. SSL Key Group Commands (`contexts/ssl_key_group_context.py`)

*   `addSslKeyGroup -name <group_name>`: Adds a new SSL key group.
*   `updateSslKeyGroup -name <current_group_name> -newName <new_group_name>`: Updates an SSL key group's name.
*   `showSSLKeyGroups`: Displays all SSL key groups.
*   `showSslKeyGroup -name <group_name>`: Shows detailed information for a specific SSL key group.
*   `delSslKeyGroup -name <group_name>`: Deletes an SSL key group.

## 24. Static Masking Commands (`contexts/static_masking_context.py`)

*   `statMask -sourceInstance <source_instance_name> -targetInstance <target_instance_name> -tableFile <path_to_json_table_config_file>`: Starts a static masking task based on a JSON configuration file.
*   `showStatMasking -id <task_id>`: Shows the status and details of a static masking task by ID.
*   `restartStatMasking -id <task_id>`: Restarts a static masking task by ID.

## 25. Subscriber Commands (`contexts/subscriber_context.py`)

*   `addSubscriber -name <subscriber_name> -serverName <notification_server_name>`: Adds a new subscriber and links them to a notification server.
*   `updateSubscriber -name <current_subscriber_name> -newName <new_subscriber_name>`: Updates a subscriber's name.
*   `showSubscribers`: Displays all configured subscribers.
*   `showSubscriber -name <subscriber_name>`: Shows detailed information for a specific subscriber.
*   `delSubscriber -name <subscriber_name>`: Deletes a subscriber.

## 26. Tags Commands (`contexts/tags_context.py`)

*   `addTag -name <tag_key> -entityType <Rule|Periodic Task|Object Group> -entityName <name_of_entity_to_tag>`: Adds a tag (key-value, though value seems optional/empty in context) to an entity.
*   `updateTag -name <current_tag_key> -newName <new_tag_key> -entityType <entity_type> -entityName <entity_name>`: Updates a tag's key for a specific entity.
*   `showTags -entityType <entity_type> -entityName <entity_name>`: Displays tags for a specific entity.
*   `showTag -name <tag_key> -entityType <entity_type> -entityName <entity_name>`: Shows detailed information for a specific tag on an entity.
*   `showTagged`: Shows all entities that have tags.
*   `showUntagged`: Shows all entities that do not have tags.
*   `delTag -name <tag_key> -entityType <entity_type> -entityName <entity_name>`: Deletes a tag from an entity.
