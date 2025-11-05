import json

# This is a placeholder for the actual MCP tool calling mechanism.
# In a real scenario, this function would interact with the MCP infrastructure
# to invoke the specified tool on the given server with the provided arguments.
def _call_mcp_tool(server_name: str, tool_name: str, arguments: dict):
    """
    Placeholder for a function that calls an MCP tool.
    This should be replaced with the actual implementation for your MCP environment.
    """
    print(f"Calling MCP Tool on server '{server_name}':")
    print(f"  Tool: {tool_name}")
    print(f"  Arguments: {json.dumps(arguments, indent=2)}")
    # In a real implementation, this would return the result from the MCP tool.
    # For now, returning a dummy success response.
    return {"status": "success", "data": f"Successfully executed {tool_name}"}

class DataSunriseMCPClient:
    def __init__(self, server_name="datasunrise-cli"):
        self.server_name = server_name
        self.session_active = False

    def connect(self, host="127.0.0.1", port="11000", protocol="https", login=None, password=None):
        """
        Connects to the DataSunrise firewall.
        """
        args = {
            "host": host,
            "port": port,
            "protocol": protocol,
        }
        if login:
            args["login"] = login
        if password:
            args["password"] = password
        
        response = _call_mcp_tool(self.server_name, "connect", args)
        # Assuming the connect tool indicates success in its response
        if response.get("status") == "success": # Adjust based on actual response structure
             # Potentially parse session ID or confirmation from response
            print(f"Connection successful: {response.get('data')}")
            self.session_active = True # Mark session as active
        else:
            print(f"Connection failed: {response.get('error', 'Unknown error')}")
            self.session_active = False
        return response

    def core_start(self, force=True):
        """
        Starts the DataSunrise core engine forcefully.
        """
        args = {"force": force}
        return _call_mcp_tool(self.server_name, "core_start", args)

    def core_stop(self, force=True):
        """
        Stops the DataSunrise core engine forcefully.
        """
        args = {"force": force}
        return _call_mcp_tool(self.server_name, "core_stop", args)

    def core_restart(self, force=True):
        """
        Restarts the DataSunrise core engine forcefully.
        """
        args = {"force": force}
        return _call_mcp_tool(self.server_name, "core_restart", args)

    def core_show_state(self, ds_server: str, worker: int = 1):
        """
        Shows the operational state of a specific worker process on a DataSunrise server.
        """
        args = {
            "dsServer": ds_server,
            "worker": worker
        }
        return _call_mcp_tool(self.server_name, "core_show_state", args)

    # --- Application Commands ---
    def application_add(self, name: str):
        """
        Adds a new application.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "application_add", args)

    def application_update(self, name: str, new_name: str):
        """
        Updates an existing application's name.
        """
        args = {"name": name, "newName": new_name}
        return _call_mcp_tool(self.server_name, "application_update", args)

    def application_show_all(self):
        """
        Displays a list of all configured applications.
        """
        args = {}
        return _call_mcp_tool(self.server_name, "application_show_all", args)

    def application_show_one(self, name: str):
        """
        Shows detailed information for a specific application.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "application_show_one", args)

    def application_delete(self, name: str):
        """
        Deletes a specified application.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "application_delete", args)

    # --- CEF Commands ---
    def cef_add_group(self, name: str, enable: bool = True):
        """
        Adds a new CEF group.
        """
        args = {"name": name, "enable": enable}
        return _call_mcp_tool(self.server_name, "cef_add_group", args)

    def cef_add_item(self, name: str, group_name: str, type: str, cef: str, enable: bool = True):
        """
        Adds a new CEF item to a specified CEF group.
        """
        args = {
            "name": name,
            "groupName": group_name,
            "type": type,
            "cef": cef,
            "enable": enable
        }
        return _call_mcp_tool(self.server_name, "cef_add_item", args)

    def cef_update_group(self, name: str, new_name: str = None, enable: bool = None):
        """
        Updates an existing CEF group's name or enabled state.
        """
        args = {"name": name}
        if new_name is not None:
            args["newName"] = new_name
        if enable is not None:
            args["enable"] = enable
        return _call_mcp_tool(self.server_name, "cef_update_group", args)

    def cef_update_item(self, name: str, group_name: str, new_name: str = None, type: str = None, cef: str = None, enable: bool = None):
        """
        Updates an existing CEF item.
        """
        args = {"name": name, "groupName": group_name}
        if new_name is not None:
            args["newName"] = new_name
        if type is not None:
            args["type"] = type
        if cef is not None:
            args["cef"] = cef
        if enable is not None:
            args["enable"] = enable
        return _call_mcp_tool(self.server_name, "cef_update_item", args)

    def cef_show_groups(self):
        """
        Displays a list of all configured CEF groups.
        """
        args = {}
        return _call_mcp_tool(self.server_name, "cef_show_groups", args)

    def cef_show_group(self, name: str):
        """
        Shows detailed information for a specific CEF group.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "cef_show_group", args)

    def cef_show_items(self, group_name: str):
        """
        Displays all CEF items within a specified CEF group.
        """
        args = {"groupName": group_name}
        return _call_mcp_tool(self.server_name, "cef_show_items", args)

    def cef_show_item(self, name: str, group_name: str):
        """
        Shows detailed information for a specific CEF item within a group.
        """
        args = {"name": name, "groupName": group_name}
        return _call_mcp_tool(self.server_name, "cef_show_item", args)

    def cef_delete_group(self, name: str):
        """
        Deletes a specified CEF group.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "cef_delete_group", args)

    def cef_delete_item(self, name: str, group_name: str):
        """
        Deletes a specific CEF item from a CEF group.
        """
        args = {"name": name, "groupName": group_name}
        return _call_mcp_tool(self.server_name, "cef_delete_item", args)

    # --- Database User Commands ---
    def db_user_add(self, name: str, inst: str = None, db_type: str = None):
        args = {"name": name}
        if inst:
            args["inst"] = inst
        if db_type:
            args["dbType"] = db_type
        return _call_mcp_tool(self.server_name, "db_user_add", args)

    def db_user_group_add(self, name: str, inst: str = None, db_type: str = None, add_members: str = None):
        args = {"name": name}
        if inst:
            args["inst"] = inst
        if db_type:
            args["dbType"] = db_type
        if add_members:
            args["addMembers"] = add_members
        return _call_mcp_tool(self.server_name, "db_user_group_add", args)

    def db_user_mapping_add(self, inst: str, db_login: str, db_password: str, 
                              ad_login: str = None, ad_group: str = None, 
                              ldap_server: str = None, hash_type: str = None, sysDba: bool = False):
        args = {
            "inst": inst,
            "dbLogin": db_login,
            "dbPassword": db_password,
            "sysDba": sysDba # Default from MCP schema
        }
        if ad_login:
            args["adLogin"] = ad_login
        if ad_group:
            args["adGroup"] = ad_group
        if ldap_server:
            args["ldapServer"] = ldap_server
        if hash_type:
            args["hashType"] = hash_type
        return _call_mcp_tool(self.server_name, "db_user_mapping_add", args)

    def ldap_server_add(self, name: str, host: str, port: str, base_dn: str, default: bool = True):
        args = {
            "name": name,
            "host": host,
            "port": port,
            "baseDn": base_dn,
            "default": default
        }
        return _call_mcp_tool(self.server_name, "ldap_server_add", args)

    def db_user_update(self, name: str, new_name: str = None):
        args = {"name": name}
        if new_name:
            args["newName"] = new_name
        return _call_mcp_tool(self.server_name, "db_user_update", args)

    def db_user_group_update(self, name: str, new_name: str = None, add_members: str = None, remove_members: str = None):
        args = {"name": name}
        if new_name:
            args["newName"] = new_name
        if add_members:
            args["addMembers"] = add_members
        if remove_members:
            args["removeMembers"] = remove_members
        return _call_mcp_tool(self.server_name, "db_user_group_update", args)

    def ldap_server_update(self, name: str, new_name: str = None, host: str = None, port: str = None, base_dn: str = None, default: bool = None):
        args = {"name": name}
        if new_name: args["newName"] = new_name
        # MCP tool schema for ldap_server_update only has name and newName. 
        # Other params like host, port, baseDn, default are part of add, not update via CLI tool.
        # For a true MCP client, one might need separate methods or more complex logic if the MCP tool supports more update fields.
        # Sticking to what `dscli updateLdapServer` supports, which is primarily renaming.
        return _call_mcp_tool(self.server_name, "ldap_server_update", args)


    def db_user_show_all(self):
        return _call_mcp_tool(self.server_name, "db_user_show_all", {})

    def db_user_show_one(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "db_user_show_one", args)

    def db_user_group_show_all(self):
        return _call_mcp_tool(self.server_name, "db_user_group_show_all", {})

    def db_user_group_show_one(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "db_user_group_show_one", args)

    def db_user_mapping_show(self, instance: str):
        args = {"instance": instance}
        return _call_mcp_tool(self.server_name, "db_user_mapping_show", args)

    def ldap_server_show_all(self):
        return _call_mcp_tool(self.server_name, "ldap_server_show_all", {})

    def ldap_server_show_one(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "ldap_server_show_one", args)

    def db_user_mapping_enable(self, instance: str, map_type: str = "config"):
        args = {"instance": instance, "mapType": map_type}
        return _call_mcp_tool(self.server_name, "db_user_mapping_enable", args)

    def db_user_mapping_disable(self, instance: str):
        args = {"instance": instance}
        return _call_mcp_tool(self.server_name, "db_user_mapping_disable", args)

    def db_user_delete(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "db_user_delete", args)

    def db_user_group_delete(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "db_user_group_delete", args)

    def db_user_mapping_delete(self, instance: str, ad_login: str):
        args = {"instance": instance, "adLogin": ad_login}
        return _call_mcp_tool(self.server_name, "db_user_mapping_delete", args)

    def ldap_server_delete(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "ldap_server_delete", args)

    # --- Dictionary Commands ---
    def dictionary_backup_create(self):
        """
        Creates a backup of the DataSunrise system dictionary.
        """
        args = {}
        return _call_mcp_tool(self.server_name, "dictionary_backup_create", args)

    def dictionary_backup_show_all(self):
        """
        Displays a list of available dictionary backups.
        """
        args = {}
        return _call_mcp_tool(self.server_name, "dictionary_backup_show_all", args)

    def dictionary_clean(self, force: bool = True):
        """
        Cleans the DataSunrise dictionary.
        """
        args = {"force": force}
        return _call_mcp_tool(self.server_name, "dictionary_clean", args)

    def dictionary_recover(self, backup_id: str): # Changed id to backup_id to avoid keyword clash
        """
        Recovers the DataSunrise dictionary from a specified backup ID.
        """
        args = {"id": backup_id}
        return _call_mcp_tool(self.server_name, "dictionary_recover", args)

    # --- Discovery Commands ---
    def discovery_group_add(self, name: str, security_standards: str = None):
        args = {"name": name}
        if security_standards:
            args["securityStandards"] = security_standards
        return _call_mcp_tool(self.server_name, "discovery_group_add", args)

    def discovery_attribute_add(self, group: str, name: str, col_names: str = None, col_names_cs: bool = False,
                                col_type: str = None, cont_template: str = None, cont_template_cs: bool = False,
                                file_name_template: str = None, file_name_template_cs: bool = False,
                                min_val: float = None, max_val: float = None, # Renamed min/max to avoid keyword clash
                                min_date: str = None, max_date: str = None, name_separator: str = ";"):
        args = {
            "group": group,
            "name": name,
            "colNamesCS": col_names_cs,
            "contTemplateCS": cont_template_cs,
            "fileNameTemplateCS": file_name_template_cs,
            "nameSeparator": name_separator
        }
        if col_names: args["colNames"] = col_names
        if col_type: args["colType"] = col_type
        if cont_template: args["contTemplate"] = cont_template
        if file_name_template: args["fileNameTemplate"] = file_name_template
        if min_val is not None: args["min"] = min_val
        if max_val is not None: args["max"] = max_val
        if min_date: args["minDate"] = min_date
        if max_date: args["maxDate"] = max_date
        return _call_mcp_tool(self.server_name, "discovery_attribute_add", args)

    def discovery_group_update(self, name: str, new_name: str = None, security_standards: str = None):
        args = {"name": name}
        if new_name:
            args["newName"] = new_name
        if security_standards:
            args["securityStandards"] = security_standards
        return _call_mcp_tool(self.server_name, "discovery_group_update", args)

    def discovery_attribute_update(self, group: str, name: str, new_name: str = None, col_names: str = None, 
                                   col_names_cs: bool = None, col_type: str = None, 
                                   cont_template: str = None, cont_template_cs: bool = None):
        args = {"group": group, "name": name}
        if new_name: args["newName"] = new_name
        if col_names: args["colNames"] = col_names
        if col_names_cs is not None: args["colNamesCS"] = col_names_cs
        if col_type: args["colType"] = col_type
        if cont_template: args["contTemplate"] = cont_template
        if cont_template_cs is not None: args["contTemplateCS"] = cont_template_cs
        return _call_mcp_tool(self.server_name, "discovery_attribute_update", args)

    def discovery_group_copy(self, name: str, new_name: str = None):
        args = {"name": name}
        if new_name:
            args["newName"] = new_name
        return _call_mcp_tool(self.server_name, "discovery_group_copy", args)

    def discovery_group_show_all(self):
        return _call_mcp_tool(self.server_name, "discovery_group_show_all", {})

    def discovery_group_show_one(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "discovery_group_show_one", args)

    def discovery_attribute_show(self, group: str, name: str):
        args = {"group": group, "name": name}
        return _call_mcp_tool(self.server_name, "discovery_attribute_show", args)

    def discovery_group_delete(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "discovery_group_delete", args)

    def discovery_attribute_delete(self, group: str, name: str):
        args = {"group": group, "name": name}
        return _call_mcp_tool(self.server_name, "discovery_attribute_delete", args)

    # --- DataSunrise User Commands ---
    def ds_user_add(self, login: str, password: str, role: str, email: str = None, 
                    enable_ad_auth: bool = False, allow_login: bool = True, 
                    two_factor_auth: str = "DISABLED", white_hosts: str = None, 
                    white_groups: str = None, black_hosts: str = None, black_groups: str = None):
        args = {
            "login": login,
            "password": password,
            "role": role,
            "enableADAuth": enable_ad_auth, # MCP tool uses this casing
            "allowLogin": allow_login,     # MCP tool uses this casing
            "twoFactorAuth": two_factor_auth # MCP tool uses this casing
        }
        if email: args["email"] = email
        if white_hosts: args["whiteHosts"] = white_hosts
        if white_groups: args["whiteGroups"] = white_groups
        if black_hosts: args["blackHosts"] = black_hosts
        if black_groups: args["blackGroups"] = black_groups
        return _call_mcp_tool(self.server_name, "ds_user_add", args)

    def ds_user_update(self, login: str, role: str = None, email: str = None, 
                       enable_ad_auth: bool = None, allow_login: bool = None, 
                       two_factor_auth: str = None):
        args = {"login": login}
        if role: args["role"] = role
        if email: args["email"] = email
        if enable_ad_auth is not None: args["enableADAuth"] = enable_ad_auth
        if allow_login is not None: args["allowLogin"] = allow_login
        if two_factor_auth: args["twoFactorAuth"] = two_factor_auth
        return _call_mcp_tool(self.server_name, "ds_user_update", args)

    def ds_user_show_all(self):
        return _call_mcp_tool(self.server_name, "ds_user_show_all", {})

    def ds_user_show_one(self, login: str):
        args = {"login": login}
        return _call_mcp_tool(self.server_name, "ds_user_show_one", args)

    def ds_user_change_password(self, login: str, current_pwd: str, new_pwd: str):
        args = {
            "login": login,
            "currentPwd": current_pwd,
            "newPwd": new_pwd
        }
        return _call_mcp_tool(self.server_name, "ds_user_change_password", args)

    def ds_user_delete(self, login: str):
        args = {"login": login}
        return _call_mcp_tool(self.server_name, "ds_user_delete", args)

    # --- Host Commands ---
    def host_add(self, name: str, host_address: str = None, net_ipv4: str = None, net_mask_v4: str = None, 
                 net_ipv6: str = None, start_ipv4: str = None, end_ipv4: str = None, 
                 start_ipv6: str = None, end_ipv6: str = None):
        args = {"name": name}
        if host_address:
            args["host"] = host_address
        elif net_ipv4 and net_mask_v4:
            args["netIPv4"] = net_ipv4
            args["netMaskV4"] = net_mask_v4
        elif net_ipv6:
            args["netIPv6"] = net_ipv6
        elif start_ipv4 and end_ipv4:
            args["startIPv4"] = start_ipv4
            args["endIPv4"] = end_ipv4
        elif start_ipv6 and end_ipv6:
            args["startIPv6"] = start_ipv6
            args["endIPv6"] = end_ipv6
        else:
            # Raise an error or handle as appropriate if no valid host type is provided
            pass # Or default to one type if that makes sense
        return _call_mcp_tool(self.server_name, "host_add", args)

    def host_group_add(self, name: str, add_members: str = None):
        args = {"name": name}
        if add_members:
            args["addMembers"] = add_members
        return _call_mcp_tool(self.server_name, "host_group_add", args)

    def host_update(self, name: str, host_address: str = None): # Changed host to host_address for clarity
        args = {"name": name}
        if host_address: # Corresponds to -host in CLI updateHost
            args["host"] = host_address
        return _call_mcp_tool(self.server_name, "host_update", args)

    def host_group_update(self, name: str, new_name: str = None, add_members: str = None, remove_members: str = None):
        args = {"name": name}
        if new_name:
            args["newName"] = new_name
        if add_members:
            args["addMembers"] = add_members
        if remove_members:
            args["removeMembers"] = remove_members
        return _call_mcp_tool(self.server_name, "host_group_update", args)

    def host_show_all(self):
        return _call_mcp_tool(self.server_name, "host_show_all", {})

    def host_show_one(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "host_show_one", args)

    def host_group_show_all(self):
        return _call_mcp_tool(self.server_name, "host_group_show_all", {})

    def host_group_show_one(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "host_group_show_one", args)

    def host_delete(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "host_delete", args)

    def host_group_delete(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "host_group_delete", args)

    # --- Import Commands ---
    def import_users(self, file_name: str):
        """
        Imports DataSunrise users from a specified CSV file.
        """
        args = {"fileName": file_name}
        return _call_mcp_tool(self.server_name, "import_users", args)

    def import_hosts(self, file_name: str):
        """
        Imports host definitions from a specified CSV file.
        """
        args = {"fileName": file_name}
        return _call_mcp_tool(self.server_name, "import_hosts", args)

    def import_apps(self, file_name: str):
        """
        Imports application definitions from a specified CSV file.
        """
        args = {"fileName": file_name}
        return _call_mcp_tool(self.server_name, "import_apps", args)

    # --- Instance Commands ---
    def instance_add(self, name: str, db_type: str, login: str, 
                     db_name: str = None, oracle_instance_name: str = None, # Use specific names
                     instance_type: str = "sid", sysDba: bool = False, 
                     server_name_informix: str = None, account_snowflake: str = None,
                     aws_region: str = None, query_result_location_athena: str = None,
                     # ... other optional params from MCP tool schema ...
                     env_auto_create: bool = False, env_name: str = None):
        args = {
            "name": name,
            "dbType": db_type,
            "login": login,
            "instanceType": instance_type, # For Oracle
            "sysDba": sysDba,             # For Oracle
            "envAutoCreate": env_auto_create
        }
        if db_name: # Typically for non-Oracle
            args["database"] = db_name
        if oracle_instance_name: # Typically for Oracle
            args["instance"] = oracle_instance_name
        if server_name_informix: args["serverName"] = server_name_informix # For Informix
        if account_snowflake: args["account"] = account_snowflake # For Snowflake
        if aws_region: args["awsRegion"] = aws_region
        if query_result_location_athena: args["queryResultLocation"] = query_result_location_athena
        if env_name: args["envName"] = env_name
        # Add other optional params as needed
        return _call_mcp_tool(self.server_name, "instance_add", args)

    def instance_add_plus(self, name: str, db_type: str, db_host: str, db_port: str, mode: str,
                          proxy_port: str = None, # Required if mode is PROXY
                          login: str = None, password: str = None,
                          db_name: str = None, oracle_instance_name: str = None,
                          save_pwd: str = "ds", proxy_host: str = None, 
                          sniffer_device: str = None, # Required if mode is SNIFFER
                          period_trailing: str = None, format_type_trailing: str = None, connect_type_trailing: str = None,
                          sysDba: bool = False, server: str = None, ssl: bool = False, enable_agent: bool = False):
        args = {
            "name": name,
            "dbType": db_type,
            "dbHost": db_host,
            "dbPort": db_port,
            "mode": mode, # PROXY, SNIFFER, TRAILING, NO
            "sysDba": sysDba,
            "savePassword": save_pwd,
            "ssl": ssl,
            "enableAgent": enable_agent
        }
        if login: args["login"] = login
        if password: args["password"] = password
        if db_name: args["database"] = db_name
        if oracle_instance_name: args["instance"] = oracle_instance_name
        
        if mode.upper() == "PROXY":
            if not proxy_port: raise ValueError("proxy_port is required for PROXY mode")
            args["proxyPort"] = proxy_port
            if proxy_host: args["proxyHost"] = proxy_host
        elif mode.upper() == "SNIFFER":
            if not sniffer_device: raise ValueError("sniffer_device is required for SNIFFER mode")
            args["snifferDevice"] = sniffer_device
        elif mode.upper() == "TRAILING":
            if period_trailing: args["period"] = period_trailing
            if format_type_trailing: args["formatType"] = format_type_trailing
            if connect_type_trailing: args["connectType"] = connect_type_trailing
        
        if server: args["server"] = server
        return _call_mcp_tool(self.server_name, "instance_add_plus", args)

    def instance_update_metadata(self, instance: str, login: str, password: str):
        args = {"instance": instance, "login": login, "password": password}
        return _call_mcp_tool(self.server_name, "instance_update_metadata", args)

    def instance_interface_add(self, instance: str, new_host: str, new_port: str):
        args = {"instance": instance, "newHost": new_host, "newPort": new_port}
        return _call_mcp_tool(self.server_name, "instance_interface_add", args)

    def instance_proxy_add(self, instance: str, interface_host: str, interface_port: str, 
                           proxy_host: str, proxy_port: str):
        args = {
            "instance": instance, 
            "interfaceHost": interface_host, 
            "interfacePort": interface_port,
            "proxyHost": proxy_host,
            "proxyPort": proxy_port
        }
        return _call_mcp_tool(self.server_name, "instance_proxy_add", args)

    def instance_update(self, name: str, new_name: str = None, login: str = None):
        args = {"name": name}
        if new_name: args["newName"] = new_name
        if login: args["login"] = login
        return _call_mcp_tool(self.server_name, "instance_update", args)

    def instance_update_credentials(self, instance: str, login: str, password: str):
        args = {"instance": instance, "login": login, "password": password}
        return _call_mcp_tool(self.server_name, "instance_update_credentials", args)

    def instance_interface_update(self, instance: str, prev_host: str, prev_port: str, 
                                  new_host: str, new_port: str):
        args = {
            "instance": instance,
            "prevHost": prev_host,
            "prevPort": prev_port,
            "newHost": new_host,
            "newPort": new_port
        }
        return _call_mcp_tool(self.server_name, "instance_interface_update", args)

    def instance_proxy_update(self, instance: str, interface_host: str, interface_port: str,
                              prev_proxy_host: str, prev_proxy_port: str,
                              proxy_host: str, proxy_port: str):
        args = {
            "instance": instance,
            "interfaceHost": interface_host,
            "interfacePort": interface_port,
            "prevProxyHost": prev_proxy_host,
            "prevProxyPort": prev_proxy_port,
            "proxyHost": proxy_host,
            "proxyPort": proxy_port
        }
        return _call_mcp_tool(self.server_name, "instance_proxy_update", args)

    def instance_show_all(self):
        return _call_mcp_tool(self.server_name, "instance_show_all", {})

    def instance_show_one(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "instance_show_one", args)

    def instance_interface_show_all(self, instance: str): # Maps to showInterfaces in context
        args = {"instance": instance}
        return _call_mcp_tool(self.server_name, "instance_interface_show_all", args)

    def instance_interface_show_one(self, instance: str, host: str, port: str):
        args = {"instance": instance, "host": host, "port": port}
        return _call_mcp_tool(self.server_name, "instance_interface_show_one", args)

    def instance_proxy_show_all(self, instance: str, interface_host: str, interface_port: str):
        args = {"instance": instance, "interfaceHost": interface_host, "interfacePort": interface_port}
        return _call_mcp_tool(self.server_name, "instance_proxy_show_all", args)

    def instance_proxy_show_one(self, instance: str, interface_host: str, interface_port: str,
                                proxy_host: str, proxy_port: str):
        args = {
            "instance": instance,
            "interfaceHost": interface_host,
            "interfacePort": interface_port,
            "proxyHost": proxy_host,
            "proxyPort": proxy_port
        }
        return _call_mcp_tool(self.server_name, "instance_proxy_show_one", args)

    def instance_delete(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "instance_delete", args)

    def instance_interface_delete(self, instance: str, host: str, port: str):
        args = {"instance": instance, "host": host, "port": port}
        return _call_mcp_tool(self.server_name, "instance_interface_delete", args)

    def instance_proxy_delete(self, instance: str, interface_host: str, interface_port: str,
                              proxy_host: str, proxy_port: str):
        args = {
            "instance": instance,
            "interfaceHost": interface_host,
            "interfacePort": interface_port,
            "proxyHost": proxy_host,
            "proxyPort": proxy_port
        }
        return _call_mcp_tool(self.server_name, "instance_proxy_delete", args)

    # --- License Commands ---
    def license_update_key(self, key: str):
        """
        Updates the DataSunrise license using a provided license key string.
        """
        args = {"key": key}
        return _call_mcp_tool(self.server_name, "license_update_key", args)

    def license_update_file(self, file: str): # Parameter name 'file' matches MCP tool
        """
        Updates DataSunrise licenses from a specified .reg license file.
        """
        args = {"file": file}
        return _call_mcp_tool(self.server_name, "license_update_file", args)

    def license_show_all(self):
        """
        Displays all installed licenses in DataSunrise.
        """
        args = {}
        return _call_mcp_tool(self.server_name, "license_show_all", args)

    def license_show_one(self, license_id: str): # Changed id to license_id
        """
        Shows detailed information for a specific license identified by its ID.
        """
        args = {"id": license_id}
        return _call_mcp_tool(self.server_name, "license_show_one", args)

    def license_delete(self, license_id: int): # MCP tool expects id as number
        """
        Deletes a specific license identified by its ID.
        """
        args = {"id": license_id}
        return _call_mcp_tool(self.server_name, "license_delete", args)

    # --- Object Group Commands ---
    def object_group_add(self, name: str):
        """
        Adds a new Object Group.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "object_group_add", args)

    def object_group_update(self, name: str, new_name: str = None):
        """
        Updates an existing Object Group's name.
        """
        args = {"name": name}
        if new_name:
            args["newName"] = new_name
        return _call_mcp_tool(self.server_name, "object_group_update", args)

    def object_group_show_all(self):
        """
        Displays a list of all configured Object Groups.
        """
        args = {}
        return _call_mcp_tool(self.server_name, "object_group_show_all", args)

    def object_group_show_one(self, name: str):
        """
        Shows detailed information for a specific Object Group.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "object_group_show_one", args)

    def object_group_delete(self, name: str):
        """
        Deletes a specified Object Group.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "object_group_delete", args)

    # --- Parameters Commands ---
    def parameter_show_all(self):
        """
        Displays all system parameters and their current values.
        """
        args = {}
        return _call_mcp_tool(self.server_name, "parameter_show_all", args)

    def parameter_change(self, name: str, value: str):
        """
        Changes the value of a specified system parameter.
        """
        args = {"name": name, "value": value}
        return _call_mcp_tool(self.server_name, "parameter_change", args)

    # --- Periodic Task Commands ---
    def periodic_task_add_clean_audit(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "periodic_task_add_clean_audit", args)

    def periodic_task_add_backup_dictionary(self, name: str, backup_name: str):
        args = {"name": name, "backupName": backup_name}
        return _call_mcp_tool(self.server_name, "periodic_task_add_backup_dictionary", args)

    def periodic_task_add_user_behavior(self, name: str, tr_start_date: str, tr_end_date: str):
        args = {"name": name, "trStartDate": tr_start_date, "trEndDate": tr_end_date}
        return _call_mcp_tool(self.server_name, "periodic_task_add_user_behavior", args)

    def periodic_task_add_ddl_table_relation_learning(self, name: str, inst: str, table_rel: str, 
                                                      analyze_proc_and_func: bool = False, analyze_view: bool = False,
                                                      login: str = None, password: str = None, sysDba: bool = False):
        args = {
            "name": name, "inst": inst, "tableRel": table_rel,
            "analyzeProcAndFunc": analyze_proc_and_func, "analyzeView": analyze_view, "sysDba": sysDba
        }
        if login: args["login"] = login
        if password: args["password"] = password
        return _call_mcp_tool(self.server_name, "periodic_task_add_ddl_table_relation_learning", args)

    def periodic_task_add_vulnerability_assessment(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "periodic_task_add_vulnerability_assessment", args)

    def periodic_task_add_update_metadata(self, name: str, instance: str):
        args = {"name": name, "instance": instance}
        return _call_mcp_tool(self.server_name, "periodic_task_add_update_metadata", args)

    def periodic_task_add_data_discovery(self, name: str, instance: str, search_by_info_types: str):
        args = {"name": name, "instance": instance, "searchByInfoTypes": search_by_info_types}
        return _call_mcp_tool(self.server_name, "periodic_task_add_data_discovery", args)

    def periodic_task_add_health_check(self, name: str, instance: str):
        args = {"name": name, "instance": instance}
        return _call_mcp_tool(self.server_name, "periodic_task_add_health_check", args)

    # Generic update for periodic tasks (renaming)
    # Specific updates like periodic_task_update_clean_audit exist.
    # If other task types have more updateable fields via MCP, they'd need specific methods.
    def periodic_task_update_clean_audit(self, name: str, new_name: str = None): # Matches MCP tool
        args = {"name": name}
        if new_name: args["newName"] = new_name
        return _call_mcp_tool(self.server_name, "periodic_task_update_clean_audit", args)

    # For other updates, assuming a simple rename, map to a generic concept or specific if available
    # The CLI context implies only newName is changed for all these updates.
    # If MCP server has specific update tools for each task type beyond just rename,
    # then dedicated methods would be better. For now, this is a simplification.
    def _periodic_task_generic_update_rename(self, tool_name: str, name: str, new_name: str):
        # This is a helper if MCP server had a generic update tool, or if all specific updates only rename.
        # Based on current MCP server definition, only periodic_task_update_clean_audit is listed.
        # This means other update commands from CLI context might not have direct MCP tool counterparts
        # or they map to a more general update tool that needs taskType.
        # For now, I will assume that if an update tool exists for a specific task type, it's for renaming.
        # If `upd_per_backup_dictionary` maps to `periodic_task_update_backup_dictionary` (hypothetical)
        args = {"name": name, "newName": new_name}
        return _call_mcp_tool(self.server_name, tool_name, args) # tool_name would be e.g. "periodic_task_update_backup_dictionary"

    # Let's assume specific update tools exist for renaming for now, matching CLI context structure
    def periodic_task_update_backup_dictionary(self, name: str, new_name: str):
        return self._periodic_task_generic_update_rename("periodic_task_update_backup_dictionary", name, new_name)
        
    def periodic_task_update_user_behavior(self, name: str, new_name: str):
        return self._periodic_task_generic_update_rename("periodic_task_update_user_behavior", name, new_name)

    def periodic_task_update_ddl_table_relation_learning(self, name: str, new_name: str):
        return self._periodic_task_generic_update_rename("periodic_task_update_ddl_table_relation_learning", name, new_name)

    def periodic_task_update_vulnerability_assessment(self, name: str, new_name: str):
        return self._periodic_task_generic_update_rename("periodic_task_update_vulnerability_assessment", name, new_name)

    def periodic_task_update_update_metadata(self, name: str, new_name: str):
        return self._periodic_task_generic_update_rename("periodic_task_update_update_metadata", name, new_name)

    def periodic_task_update_data_discovery(self, name: str, new_name: str):
        return self._periodic_task_generic_update_rename("periodic_task_update_data_discovery", name, new_name)

    def periodic_task_update_health_check(self, name: str, new_name: str):
        return self._periodic_task_generic_update_rename("periodic_task_update_health_check", name, new_name)


    def periodic_task_show_one(self, name: str, task_type: str):
        args = {"name": name, "taskType": task_type}
        return _call_mcp_tool(self.server_name, "periodic_task_show_one", args)

    def periodic_task_delete(self, name: str, task_type: str):
        args = {"name": name, "taskType": task_type}
        return _call_mcp_tool(self.server_name, "periodic_task_delete", args)

    # --- Query Group Commands ---
    def query_group_add(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "query_group_add", args)

    def query_group_add_query(self, name: str, sql: str):
        args = {"name": name, "sql": sql}
        return _call_mcp_tool(self.server_name, "query_group_add_query", args)

    def query_group_update(self, name: str, new_name: str):
        args = {"name": name, "newName": new_name}
        return _call_mcp_tool(self.server_name, "query_group_update", args)

    def query_group_update_query(self, name: str, sql: str, new_sql: str):
        args = {"name": name, "sql": sql, "newSql": new_sql}
        return _call_mcp_tool(self.server_name, "query_group_update_query", args)

    def query_group_show_all(self):
        return _call_mcp_tool(self.server_name, "query_group_show_all", {})

    def query_group_show_one(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "query_group_show_one", args)

    def query_group_delete(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "query_group_delete", args)

    def query_group_delete_query(self, name: str, sql: str):
        args = {"name": name, "sql": sql}
        return _call_mcp_tool(self.server_name, "query_group_delete_query", args)

    # --- Report Generation Commands ---
    def report_gen_add_audit(self, name: str, **kwargs):
        args = {"name": name, **kwargs}
        return _call_mcp_tool(self.server_name, "report_gen_add_audit", args)

    def report_gen_add_masking(self, name: str, **kwargs):
        args = {"name": name, **kwargs}
        return _call_mcp_tool(self.server_name, "report_gen_add_masking", args)

    def report_gen_add_security(self, name: str, **kwargs):
        args = {"name": name, **kwargs}
        return _call_mcp_tool(self.server_name, "report_gen_add_security", args)

    def report_gen_add_operation_errors(self, name: str, **kwargs):
        args = {"name": name, **kwargs}
        return _call_mcp_tool(self.server_name, "report_gen_add_operation_errors", args)

    def report_gen_add_session(self, name: str, inst: str = None, **kwargs): # `inst` is optional in MCP tool
        args = {"name": name, **kwargs}
        if inst:
            args["inst"] = inst
        return _call_mcp_tool(self.server_name, "report_gen_add_session", args)
        
    def report_gen_add_direct_session(self, name: str, inst: str = None, **kwargs): # MCP tool is report_gen_add_session
        args = {"name": name, **kwargs}
        if inst: # inst is required for addDirectSessionReportGen in CLI, but optional in MCP's report_gen_add_session
            args["inst"] = inst
        # This might need a specific MCP tool or a parameter in report_gen_add_session to distinguish "direct"
        # For now, mapping to the general session report add.
        # If MCP's report_gen_add_session has a way to specify "direct", it should be used here.
        # The CLI context has add_session_rep_gen and add_direct_session_rep_gen.
        # MCP server has report_gen_add_session and report_gen_add_direct_session
        return _call_mcp_tool(self.server_name, "report_gen_add_direct_session", args)


    def report_gen_add_system_events(self, name: str, **kwargs):
        args = {"name": name, **kwargs}
        return _call_mcp_tool(self.server_name, "report_gen_add_system_events", args)

    def report_gen_add_data_discovery(self, name: str, instance: str, search_by_info_types: str, **kwargs):
        # MCP tool 'report_gen_add_data_discovery' is marked as DEPRECATED.
        # Consider using 'periodic_task_add_data_discovery' instead for new implementations.
        args = {"name": name, "instance": instance, "searchByInfoTypes": search_by_info_types, **kwargs}
        return _call_mcp_tool(self.server_name, "report_gen_add_data_discovery", args)

    # Update methods - CLI context only shows renaming. MCP tools might support more.
    # For now, client methods will focus on renaming.
    def report_gen_update_audit(self, name: str, new_name: str = None, **kwargs):
        args = {"name": name, **kwargs}
        if new_name:
            args["newName"] = new_name
        return _call_mcp_tool(self.server_name, "report_gen_update_audit", args)

    # Assuming similar update tools exist for other report types, primarily for renaming
    # These would map to e.g. report_gen_update_masking, report_gen_update_security etc. if they exist
    # If not, a generic update tool or specific logic would be needed.
    # For now, creating stubs that would call hypothetical specific update tools for renaming.
    def _report_gen_generic_update_rename(self, tool_name_suffix: str, name: str, new_name: str):
        # tool_name_suffix e.g., "masking", "security"
        # This is a placeholder structure. Actual MCP tool names must be used.
        # The MCP server definition only lists `report_gen_update_audit`.
        # This implies other specific updates might not exist or are handled by the audit update tool
        # with a type parameter, or not available.
        # For now, I'll assume specific update tools for renaming like `report_gen_update_masking`
        mcp_tool_name = f"report_gen_update_{tool_name_suffix.lower().replace(' ', '_')}"
        args = {"name": name, "newName": new_name}
        # This will fail if the MCP tool doesn't exist.
        # A better approach would be to check MCP server definition for available update tools.
        # Given the CLI context, it seems only renaming is done.
        # The MCP tool `report_gen_update_audit` is the only update tool listed.
        # This means other updates might not be directly supported or need to use this one with more params.
        # For now, I will make these call the audit update tool, which is likely incorrect.
        # This highlights a discrepancy between CLI capabilities and defined MCP tools.
        # A proper solution would be to have specific update tools in MCP or a generic one.
        # For the purpose of this exercise, I will make them call a hypothetical specific tool.
        # If these tools don't exist, these methods will fail.
        print(f"Warning: Calling hypothetical MCP tool {mcp_tool_name}. Verify its existence.")
        return _call_mcp_tool(self.server_name, mcp_tool_name, args)


    def report_gen_update_masking(self, name: str, new_name: str):
        # Assuming report_gen_update_masking exists or report_gen_update_audit can handle it
        return self._report_gen_generic_update_rename("masking", name, new_name)

    def report_gen_update_security(self, name: str, new_name: str):
        return self._report_gen_generic_update_rename("security", name, new_name)

    def report_gen_update_operation_errors(self, name: str, new_name: str):
        return self._report_gen_generic_update_rename("operation_errors", name, new_name)

    def report_gen_update_session(self, name: str, new_name: str):
        return self._report_gen_generic_update_rename("session", name, new_name)

    def report_gen_update_system_events(self, name: str, new_name: str):
        return self._report_gen_generic_update_rename("system_events", name, new_name)
    
    def report_gen_update_data_discovery(self, name: str, new_name: str):
        return self._report_gen_generic_update_rename("data_discovery", name, new_name)


    def report_gen_show_all(self):
        return _call_mcp_tool(self.server_name, "report_gen_show_all", {})

    def report_gen_show_one(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "report_gen_show_one", args)

    def report_gen_delete(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "report_gen_delete", args)

    # --- Reports Commands ---
    def reports_show(self, report_type: str, event_type: str):
        """
        Displays reports based on report type and event type.
        reportType: app, host, user, ip
        eventType: a (audit), m (masking), s (security)
        """
        args = {"reportType": report_type, "eventType": event_type}
        return _call_mcp_tool(self.server_name, "reports_show", args)

    # --- Role Commands ---
    def role_add_access(self, name: str, group_dn: str = None):
        args = {"name": name}
        if group_dn:
            args["groupDN"] = group_dn
        return _call_mcp_tool(self.server_name, "role_add_access", args)

    def role_update_access(self, name: str, new_name: str = None, group_dn: str = None):
        args = {"name": name}
        if new_name:
            args["newName"] = new_name
        if group_dn: # MCP tool takes groupDN for update as well
            args["groupDN"] = group_dn
        return _call_mcp_tool(self.server_name, "role_update_access", args)

    def role_show_all_access(self):
        return _call_mcp_tool(self.server_name, "role_show_all_access", {})

    def role_show_one_access(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "role_show_one_access", args)

    def role_grant_all_permissions(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "role_grant_all_permissions", args)

    def role_grant_permissions(self, name: str, delete_actions: str = None, list_actions: str = None,
                               edit_actions: str = None, insert_actions: str = None,
                               view_actions: str = None, execute_actions: str = None):
        args = {"name": name}
        if delete_actions: args["deleteActions"] = delete_actions
        if list_actions: args["listActions"] = list_actions
        if edit_actions: args["editActions"] = edit_actions
        if insert_actions: args["insertActions"] = insert_actions
        if view_actions: args["viewActions"] = view_actions
        if execute_actions: args["executeActions"] = execute_actions
        return _call_mcp_tool(self.server_name, "role_grant_permissions", args)

    def role_set_permissions(self, name: str, delete_actions: str = None, list_actions: str = None,
                             edit_actions: str = None, insert_actions: str = None,
                             view_actions: str = None, execute_actions: str = None):
        args = {"name": name}
        if delete_actions: args["deleteActions"] = delete_actions
        if list_actions: args["listActions"] = list_actions
        if edit_actions: args["editActions"] = edit_actions
        if insert_actions: args["insertActions"] = insert_actions
        if view_actions: args["viewActions"] = view_actions
        if execute_actions: args["executeActions"] = execute_actions
        return _call_mcp_tool(self.server_name, "role_set_permissions", args)

    def role_revoke_all_permissions(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "role_revoke_all_permissions", args)

    def role_revoke_permissions(self, name: str, delete_actions: str = None, list_actions: str = None,
                                edit_actions: str = None, insert_actions: str = None,
                                view_actions: str = None, execute_actions: str = None):
        args = {"name": name}
        if delete_actions: args["deleteActions"] = delete_actions
        if list_actions: args["listActions"] = list_actions
        if edit_actions: args["editActions"] = edit_actions
        if insert_actions: args["insertActions"] = insert_actions
        if view_actions: args["viewActions"] = view_actions
        if execute_actions: args["executeActions"] = execute_actions
        return _call_mcp_tool(self.server_name, "role_revoke_permissions", args)

    def role_delete_access(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "role_delete_access", args)

    # --- Rule Commands ---
    def rule_add_audit(self, name: str, db_type: str, enable: bool = True, **kwargs):
        args = {"name": name, "dbType": db_type, "enable": enable, **kwargs}
        return _call_mcp_tool(self.server_name, "rule_add_audit", args)

    def rule_add_masking(self, name: str, db_type: str, instance: str, mask_columns: str, mask_type: str, enable: bool = True, **kwargs):
        args = {
            "name": name, "dbType": db_type, "instance": instance, 
            "maskColumns": mask_columns, "maskType": mask_type, "enable": enable, **kwargs
        }
        return _call_mcp_tool(self.server_name, "rule_add_masking", args)

    def rule_add_security(self, name: str, db_type: str, enable: bool = True, **kwargs):
        args = {"name": name, "dbType": db_type, "enable": enable, **kwargs}
        return _call_mcp_tool(self.server_name, "rule_add_security", args)

    def rule_add_learning(self, name: str, db_type: str, enable: bool = True, **kwargs):
        args = {"name": name, "dbType": db_type, "enable": enable, **kwargs}
        return _call_mcp_tool(self.server_name, "rule_add_learning", args)

    def rule_add_external_dispatcher(self, name: str, db_type: str, enable: bool = True, **kwargs):
        args = {"name": name, "dbType": db_type, "enable": enable, **kwargs}
        return _call_mcp_tool(self.server_name, "rule_add_external_dispatcher", args)

    # Update methods for rules - primarily for 'enable' status as per CLI context.
    # MCP tools have many more optional params for updates.
    def rule_update_audit(self, name: str, enable: bool = None, **kwargs):
        args = {"name": name, **kwargs}
        if enable is not None: args["enable"] = enable
        return _call_mcp_tool(self.server_name, "rule_update_audit", args)
        
    # Assuming specific update tools for other rule types, mirroring add tools.
    # If MCP server uses a generic rule_update with a type parameter, this would need adjustment.
    def rule_update_masking(self, name: str, enable: bool = None, **kwargs):
        args = {"name": name, **kwargs}
        if enable is not None: args["enable"] = enable
        # This should ideally call "rule_update_masking" if it exists.
        # For now, pointing to rule_update_audit as a placeholder if specific one is not defined in MCP.
        # This is a known simplification point.
        # Based on MCP server definition, only rule_update_audit is listed.
        # This means other rule updates might not be directly supported or need to use this one.
        # For the purpose of this exercise, I will make them call a hypothetical specific tool.
        # If these tools don't exist, these methods will fail.
        print(f"Warning: Calling hypothetical MCP tool rule_update_masking. Verify its existence or use rule_update_audit with appropriate kwargs.")
        return _call_mcp_tool(self.server_name, "rule_update_masking", args)


    def rule_update_security(self, name: str, enable: bool = None, **kwargs):
        args = {"name": name, **kwargs}
        if enable is not None: args["enable"] = enable
        print(f"Warning: Calling hypothetical MCP tool rule_update_security. Verify its existence or use rule_update_audit with appropriate kwargs.")
        return _call_mcp_tool(self.server_name, "rule_update_security", args)

    def rule_update_learning(self, name: str, enable: bool = None, **kwargs):
        args = {"name": name, **kwargs}
        if enable is not None: args["enable"] = enable
        print(f"Warning: Calling hypothetical MCP tool rule_update_learning. Verify its existence or use rule_update_audit with appropriate kwargs.")
        return _call_mcp_tool(self.server_name, "rule_update_learning", args)

    def rule_update_external_dispatcher(self, name: str, enable: bool = None, **kwargs):
        args = {"name": name, **kwargs}
        if enable is not None: args["enable"] = enable
        print(f"Warning: Calling hypothetical MCP tool rule_update_external_dispatcher. Verify its existence or use rule_update_audit with appropriate kwargs.")
        return _call_mcp_tool(self.server_name, "rule_update_external_dispatcher", args)

    def rule_show_all(self):
        return _call_mcp_tool(self.server_name, "rule_show_all", {})

    def rule_show_one(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "rule_show_one", args)

    def rule_delete(self, name: str):
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "role_delete_access", args)

    # --- Schedule Commands ---
    def schedule_add(self, name: str, intervals: str):
        """
        Adds a new schedule.
        intervals: Semicolon-separated day=HH:MM:SS-HH:MM:SS strings
                   (e.g., "mo=09:00:00-17:00:00;tu=09:00:00-12:00:00")
        """
        args = {"name": name, "intervals": intervals}
        return _call_mcp_tool(self.server_name, "schedule_add", args)

    def schedule_update(self, name: str, new_name: str = None, intervals: str = None):
        """
        Updates an existing schedule's name or its intervals.
        """
        args = {"name": name}
        if new_name:
            args["newName"] = new_name
        if intervals: # MCP tool also takes intervals for update
            args["intervals"] = intervals
        return _call_mcp_tool(self.server_name, "schedule_update", args)

    def schedule_show_all(self):
        """
        Displays a list of all configured schedules.
        """
        args = {}
        return _call_mcp_tool(self.server_name, "schedule_show_all", args)

    def schedule_show_one(self, name: str):
        """
        Shows detailed information for a specific schedule.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "schedule_show_one", args)

    def schedule_delete(self, name: str):
        """
        Deletes a specified schedule.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "schedule_delete", args)

    # --- Server Commands (SMTP/SNMP etc.) ---
    def server_add_smtp(self, name: str, host: str, port: str, mail_from: str, 
                        login: str = None, password: str = None, certificate: bool = True):
        """
        Adds a new SMTP server configuration.
        """
        args = {
            "name": name, "host": host, "port": port, "mailFrom": mail_from,
            "certificate": certificate # Default from MCP schema
        }
        if login: args["login"] = login
        if password: args["password"] = password
        return _call_mcp_tool(self.server_name, "server_add_smtp", args)

    def server_add_snmp(self, name: str, host: str, port: str, login: str = None):
        """
        Adds a new SNMP server configuration.
        """
        args = {"name": name, "host": host, "port": port}
        if login: args["login"] = login # Corresponds to community string or SNMPv3 user
        return _call_mcp_tool(self.server_name, "server_add_snmp", args)

    def server_update(self, name: str, new_name: str = None, host: str = None, port: str = None, **kwargs):
        """
        Updates an existing server configuration.
        Specific parameters depend on the server type being updated.
        Use kwargs for other server-type-specific parameters.
        """
        args = {"name": name, **kwargs}
        if new_name:
            args["newName"] = new_name
        if host:
            args["host"] = host
        if port:
            args["port"] = port
        # Note: The MCP tool `server_update` is generic. 
        # For SMTP, it might take `mailFrom`, `login`, `password`, `certificate`.
        # For SNMP, it might take `login` (community/user).
        # These should be passed via kwargs if needed.
        return _call_mcp_tool(self.server_name, "server_update", args)

    def server_show_all(self):
        """
        Displays a list of all configured servers (SMTP, SNMP, etc.).
        """
        args = {}
        return _call_mcp_tool(self.server_name, "server_show_all", args)

    def server_show_one(self, name: str):
        """
        Shows detailed information for a specific server configuration.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "server_show_one", args)

    def server_delete_by_name(self, name: str):
        """
        Deletes a server configuration by its name.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "server_delete_by_name", args)

    def server_delete_by_id(self, server_id: str): # MCP tool expects id as string
        """
        Deletes a server configuration by its ID.
        """
        args = {"id": server_id}
        return _call_mcp_tool(self.server_name, "server_delete_by_id", args)

    # --- SSL Key Group Commands ---
    def ssl_key_group_add(self, name: str):
        """
        Adds a new SSL Key Group.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "ssl_key_group_add", args)

    def ssl_key_group_update(self, name: str, new_name: str):
        """
        Updates an existing SSL Key Group's name.
        """
        args = {"name": name, "newName": new_name}
        return _call_mcp_tool(self.server_name, "ssl_key_group_update", args)

    def ssl_key_group_show_all(self):
        """
        Displays a list of all configured SSL Key Groups.
        """
        args = {}
        return _call_mcp_tool(self.server_name, "ssl_key_group_show_all", args)

    def ssl_key_group_show_one(self, name: str):
        """
        Shows detailed information for a specific SSL Key Group.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "ssl_key_group_show_one", args)

    def ssl_key_group_delete(self, name: str):
        """
        Deletes a specified SSL Key Group.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "ssl_key_group_delete", args)

    # --- Static Masking Commands ---
    def static_masking_start(self, source_instance: str, target_instance: str, table_file: str):
        """
        Starts a static masking task.
        table_file: Path to the JSON file defining tables and columns to be masked.
        """
        args = {
            "sourceInstance": source_instance,
            "targetInstance": target_instance,
            "tableFile": table_file
        }
        return _call_mcp_tool(self.server_name, "static_masking_start", args)

    def static_masking_show_status(self, task_id: str): # MCP tool expects id as string
        """
        Shows the status and details of a specific static masking task by its ID.
        """
        args = {"id": task_id}
        return _call_mcp_tool(self.server_name, "static_masking_show_status", args)

    def static_masking_restart(self, task_id: str): # MCP tool expects id as string
        """
        Restarts a previously run or failed static masking task by its ID.
        """
        args = {"id": task_id}
        return _call_mcp_tool(self.server_name, "static_masking_restart", args)

    # --- Subscriber Commands ---
    def subscriber_add(self, name: str, server_name: str, send_to_address: str):
        """
        Adds a new subscriber for notifications.
        send_to_address: Email address or SNMP trap destination.
        """
        args = {
            "name": name,
            "serverName": server_name,
            "sendToAddress": send_to_address
        }
        return _call_mcp_tool(self.server_name, "subscriber_add", args)

    def subscriber_update(self, name: str, new_name: str = None, server_name: str = None, send_to_address: str = None):
        """
        Updates an existing subscriber.
        """
        args = {"name": name}
        if new_name:
            args["newName"] = new_name
        if server_name: # Required by MCP tool if updating these fields
            args["serverName"] = server_name
        if send_to_address: # Required by MCP tool if updating these fields
            args["sendToAddress"] = send_to_address
        # Note: MCP tool requires serverName and sendToAddress if any of these are being updated.
        # The CLI context only shows renaming. If only renaming, other fields might be implicitly carried over or re-required.
        # For a robust client, if only newName is provided, one might need to fetch existing serverName/sendToAddress first.
        # For now, matching MCP tool which implies if serverName/sendToAddress are not given, they are not changed (if optional)
        # or it might error if they are required for any update.
        # The MCP schema for subscriber_update makes newName, serverName, sendToAddress all optional if name is given.
        return _call_mcp_tool(self.server_name, "subscriber_update", args)

    def subscriber_show_all(self):
        """
        Displays a list of all configured subscribers.
        """
        args = {}
        return _call_mcp_tool(self.server_name, "subscriber_show_all", args)

    def subscriber_show_one(self, name: str):
        """
        Shows detailed information for a specific subscriber.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "subscriber_show_one", args)

    def subscriber_delete(self, name: str):
        """
        Deletes a specified subscriber.
        """
        args = {"name": name}
        return _call_mcp_tool(self.server_name, "subscriber_delete", args)

    # --- Tag Commands ---
    def tag_add(self, name: str, entity_type: str, entity_name: str):
        """
        Adds a tag to a DataSunrise entity.
        entity_type: Rule, Periodic Task, Object Group
        """
        args = {"name": name, "entityType": entity_type, "entityName": entity_name}
        return _call_mcp_tool(self.server_name, "tag_add", args)

    def tag_update(self, name: str, new_name: str, entity_type: str, entity_name: str):
        """
        Updates an existing tag's key for a specific entity.
        """
        args = {
            "name": name,
            "newName": new_name,
            "entityType": entity_type,
            "entityName": entity_name
        }
        return _call_mcp_tool(self.server_name, "tag_update", args)

    def tag_show_for_entity(self, entity_type: str, entity_name: str):
        """
        Displays all tags associated with a specific DataSunrise entity.
        """
        args = {"entityType": entity_type, "entityName": entity_name}
        return _call_mcp_tool(self.server_name, "tag_show_for_entity", args)

    def tag_show_one(self, name: str, entity_type: str, entity_name: str):
        """
        Shows detailed information for a specific tag on a specific entity.
        """
        args = {"name": name, "entityType": entity_type, "entityName": entity_name}
        return _call_mcp_tool(self.server_name, "tag_show_one", args)

    def tag_show_tagged_entities(self):
        """
        Shows all DataSunrise entities that have at least one tag.
        """
        args = {}
        return _call_mcp_tool(self.server_name, "tag_show_tagged_entities", args)

    def tag_show_untagged_entities(self):
        """
        Shows all DataSunrise entities that do not have any tags.
        """
        args = {}
        return _call_mcp_tool(self.server_name, "tag_show_untagged_entities", args)

    def tag_delete(self, name: str, entity_type: str, entity_name: str):
        """
        Deletes a specific tag from a DataSunrise entity.
        """
        args = {"name": name, "entityType": entity_type, "entityName": entity_name}
        return _call_mcp_tool(self.server_name, "tag_delete", args)
        
    # Add other methods for different MCP tools as needed

if __name__ == '__main__':
    # Example usage (for testing the client directly)
    client = DataSunriseMCPClient()
    
    # Attempt to connect (replace with actual credentials if needed for your setup)
    # For CLI that stores session, login/password might only be needed once.
    # Subsequent calls might not need them if a session is active.
    client.connect(login="your_login", password="your_password") # Provide actual credentials

    if client.session_active:
        # Example: Show core state (replace 'your_ds_server_name' with actual server name)
        core_state = client.core_show_state(ds_server="your_ds_server_name")
        print("Core State:", core_state)

        # Example: Stop core
        # stop_result = client.core_stop()
        # print("Stop Core Result:", stop_result)

        # Example: Start core
        # start_result = client.core_start()
        # print("Start Core Result:", start_result)
    else:
        print("Could not execute further commands as connection failed or session is not active.")
