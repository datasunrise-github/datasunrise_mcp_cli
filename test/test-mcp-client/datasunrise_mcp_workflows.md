# DataSunrise CLI MCP Server: Command Workflows

This document outlines common workflows and valid command sequences for interacting with the DataSunrise MCP Server.

## Basic Workflow Structure

Most interactions with the DataSunrise environment via this MCP server will follow a general pattern:

1.  **Connect:** Establish a session with the DataSunrise firewall using the `connect` command.
2.  **Perform Operations:** Execute one or more commands to manage DataSunrise entities (Applications, Instances, Rules, CEF, Core, Users, etc.).
3.  **Disconnect (Implicit):** The connection is typically managed per CLI invocation by the server; explicit disconnect commands are not usually exposed as separate MCP tools unless the underlying CLI supports persistent sessions that need explicit closure.

## Common Command Sequences

### 1. Managing Applications
*   **Sequence 1: Add and Show Application**
    1.  `connect`
    2.  `application_add` (e.g., with `name="myNewApp"`)
    3.  `application_show_one` (e.g., with `name="myNewApp"`)
*   **Sequence 2: Update Application**
    1.  `connect`
    2.  `application_update` (e.g., with `name="oldAppName"`, `newName="updatedAppName"`)
*   **Sequence 3: Delete Application**
    1.  `connect`
    2.  `application_delete` (e.g., with `name="appToDelete"`)

### 2. Managing CEF Configurations
*   **Sequence 1: Add CEF Group and Item**
    1.  `connect`
    2.  `cef_add_group` (e.g., `name="myCefGroup"`)
    3.  `cef_add_item` (e.g., `groupName="myCefGroup"`, `name="myItem"`, `type="LOGIN_SUCCESSFUL"`, `cef="CEF_FORMAT_STRING"`)
    4.  `cef_show_group` (e.g., `name="myCefGroup"`)
*   **Sequence 2: Update CEF Item**
    1.  `connect`
    2.  `cef_update_item` (provide `name`, `groupName`, and new values)
*   **Sequence 3: Delete CEF Item and Group**
    1.  `connect`
    2.  `cef_delete_item` (provide `name`, `groupName`)
    3.  `cef_delete_group` (provide `name`)

### 3. Managing Core Engine
*   **Sequence 1: Stop and Start Core**
    1.  `connect`
    2.  `core_stop`
    3.  `core_show_state` (to verify, provide `dsServer`)
    4.  `core_start`
    5.  `core_show_state` (to verify, provide `dsServer`)
*   **Sequence 2: Restart Core**
    1.  `connect`
    2.  `core_restart`
    3.  `core_show_state` (to verify, provide `dsServer`)

### 4. Managing Database Users and LDAP
*   **Sequence 1: Add DB User and Group**
    1.  `connect`
    2.  `db_user_add` (e.g., `name="db_user1"`, `inst="myInstance"`)
    3.  `db_user_group_add` (e.g., `name="db_group1"`, `addMembers="db_user1"`)
*   **Sequence 2: Add LDAP Server and AD Mapping**
    1.  `connect`
    2.  `ldap_server_add` (e.g., `name="myLDAP"`, `host="ldap.example.com"`, `port="389"`, `baseDn="dc=example,dc=com"`)
    3.  `db_user_mapping_add` (e.g., `inst="myInstance"`, `adLogin="ad_user"`, `dbLogin="db_user1"`, `dbPassword="password"`, `ldapServer="myLDAP"`)

### 5. Managing Dictionary Backups
*   **Sequence 1: Create and List Backups**
    1.  `connect`
    2.  `dictionary_backup_create`
    3.  `dictionary_backup_show_all`
*   **Sequence 2: Recover Dictionary**
    1.  `connect`
    2.  `dictionary_recover` (provide `id` from `show_all` output)

### 6. Managing Discovery
*   **Sequence 1: Add Discovery Group and Attribute**
    1.  `connect`
    2.  `discovery_group_add` (e.g., `name="PiiDiscovery"`)
    3.  `discovery_attribute_add` (e.g., `group="PiiDiscovery"`, `name="SSN_Column"`, `colNames="SSN;SocialSecurity"`)
    4.  `discovery_group_show_one` (e.g., `name="PiiDiscovery"`)

### 7. Managing DataSunrise Users and Roles
*   **Sequence 1: Add Role and User**
    1.  `connect`
    2.  `role_add_access` (e.g., `name="AuditorRole"`)
    3.  `ds_user_add` (e.g., `login="audit_user"`, `password="password"`, `role="AuditorRole"`)
*   **Sequence 2: Grant Permissions to Role**
    1.  `connect`
    2.  `role_grant_permissions` (e.g., `name="AuditorRole"`, `viewActions="AuditData,Reports"`)

### 8. Managing Hosts and Host Groups
*   **Sequence 1: Add Host and Group**
    1.  `connect`
    2.  `host_add` (e.g., `name="WebServer1"`, `host="192.168.1.10"`)
    3.  `host_group_add` (e.g., `name="WebServers"`, `addMembers="WebServer1"`)

### 9. Managing Imports
*   **Sequence 1: Import Users from CSV**
    1.  `connect`
    2.  `import_users` (e.g., `fileName="/path/to/users.csv"`)

### 10. Managing Instances
*   **Sequence 1: Add and Show Instance**
    1.  `connect`
    2.  `instance_add` (with all required parameters like `name`, `dbType`, `login`, and relevant optional ones)
    3.  `instance_show_one` (using the name provided in `instance_add`)

### 11. Managing Licenses
*   **Sequence 1: Update License from File**
    1.  `connect`
    2.  `license_update_file` (e.g., `file="/path/to/license.reg"`)
    3.  `license_show_all`
*   **Sequence 2: Delete License**
    1.  `connect`
    2.  `license_delete` (provide `id`)

### 12. Managing Object Groups
*   **Sequence 1: Add and Show Object Group**
    1.  `connect`
    2.  `object_group_add` (e.g., `name="SensitiveTables"`)
    3.  `object_group_show_one` (e.g., `name="SensitiveTables"`)
    *(Note: Adding members to object groups might require `object_group_update` or specific member addition commands not yet fully ported).*

### 13. Managing System Parameters
*   **Sequence 1: Show and Change Parameter**
    1.  `connect`
    2.  `parameter_show_all`
    3.  `parameter_change` (e.g., `name="LogDeletePeriod"`, `value="30"`)

### 14. Managing Periodic Tasks
*   **Sequence 1: Add and Show Periodic Backup Task**
    1.  `connect`
    2.  `periodic_task_add_backup_dictionary` (e.g., `name="DailyBackup"`, `backupName="dic_backup_"`)
    3.  `periodic_task_show_one` (e.g., `name="DailyBackup"`, `taskType="Backup Dictionary"`)

### 15. Managing Query Groups
*   **Sequence 1: Add Query Group and Query**
    1.  `connect`
    2.  `query_group_add` (e.g., `name="AdminQueries"`)
    3.  `query_group_add_query` (e.g., `name="AdminQueries"`, `sql="SELECT * FROM users"`)

### 16. Managing Report Generation
*   **Sequence 1: Add and Show Audit Report Generation Task**
    1.  `connect`
    2.  `report_gen_add_audit` (e.g., `name="DailyAuditReport"`, other params for scheduling, format, etc.)
    3.  `report_gen_show_one` (e.g., `name="DailyAuditReport"`)

### 17. Managing Reports (Viewing)
*   **Sequence 1: Show Audit Reports for an Application**
    1.  `connect`
    2.  `reports_show` (`reportType="app"`, `eventType="a"`)

### 18. Managing Rules (Audit Example)
*   **Sequence 1: Add and Show Audit Rule**
    1.  `connect`
    2.  `rule_add_audit` (with all required parameters like `name`, and relevant optional ones for filtering and actions)
    3.  `rule_show_one` (using the name provided in `rule_add_audit`)

### 19. Managing Schedules
*   **Sequence 1: Add and Show Schedule**
    1.  `connect`
    2.  `schedule_add` (e.g., `name="BusinessHours"`, `intervals="mo=09:00:00-17:00:00;tu=09:00:00-17:00:00;..."`)
    3.  `schedule_show_one` (e.g., `name="BusinessHours"`)

### 20. Managing Servers (SMTP/SNMP)
*   **Sequence 1: Add SMTP Server**
    1.  `connect`
    2.  `server_add_smtp` (e.g., `name="MySMTPServer"`, `host="smtp.example.com"`, `port="587"`, `mailFrom="noreply@example.com"`)

### 21. Managing SSL Key Groups
*   **Sequence 1: Add and Show SSL Key Group**
    1.  `connect`
    2.  `ssl_key_group_add` (e.g., `name="MyCertGroup"`)
    3.  `ssl_key_group_show_one` (e.g., `name="MyCertGroup"`)

### 22. Managing Static Masking
*   **Sequence 1: Start Static Masking Task**
    1.  `connect`
    2.  `static_masking_start` (provide `sourceInstance`, `targetInstance`, `tableFile`)
    3.  `static_masking_show_status` (provide task `id` from previous command's output)

### 23. Managing Subscribers
*   **Sequence 1: Add Subscriber**
    1.  `connect`
    2.  `server_add_smtp` (if SMTP server not yet configured)
    3.  `subscriber_add` (e.g., `name="AdminSubscriber"`, `serverName="MySMTPServer"`, `sendToAddress="admin@example.com"`)

### 24. Managing Tags
*   **Sequence 1: Add Tag to a Rule**
    1.  `connect`
    2.  `tag_add` (e.g., `name="CriticalRule"`, `entityType="Rule"`, `entityName="MyAuditRule"`)
    3.  `tag_show_for_entity` (e.g., `entityType="Rule"`, `entityName="MyAuditRule"`)

## General Considerations

*   **Prerequisites:** Many `update` or `delete` operations require the target entity to exist. `show_one` or `show_all` can be used to verify existence before modification or deletion.
*   **Dependencies:** Some entities might depend on others (e.g., a rule might apply to a specific instance or application). These dependencies should be created first.
*   **Error Handling:** The MCP client should be prepared to handle errors returned by the server if a command fails (e.g., entity not found, invalid parameters).
*   **Idempotency:** `add` commands are typically not idempotent (running twice with the same name will likely fail the second time). `delete` commands might be idempotent (deleting a non-existent entity might succeed silently or return a specific "not found" status). `update` commands require the entity to exist.

This document provides a high-level overview. As more commands are added or refined in the MCP server, their respective workflows can be detailed here.
