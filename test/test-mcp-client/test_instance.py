import sys
import os
# Add the mcp-client directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../../Users/davegornshtein/mcp-client')))

from mcp_client import DataSunriseMCPClient
from test_cmdline_commands.contexts.instance_context import InstanceContext
from common.DbType import DbType
from contexts.Wrappers import exclude
import pytest


# ------------------------------#
@exclude(DbType.ATHENA)         #
@exclude(DbType.AURORAPGSQL)    #
@exclude(DbType.AURORAMYSQL)    # host is domain name, cmdline doesn't support domains, only IP
@exclude(DbType.DYNAMODB)       #
@exclude(DbType.REDSHIFT)       #
# ------------------------------#
class TestInstance(InstanceContext):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mcp_client = DataSunriseMCPClient()
        # TODO: Replace with actual login credentials
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            print("MCP Client connection failed for TestInstance. Tests may not run correctly.")
            # Consider pytest.skip("MCP Client connection failed.")

    def _get_instance_add_params(self):
        params = {
            "name": self.instance_name,
            "db_type": self.db_type.strip('"'), # MCP client expects clean db_type
            "login": self.db_login,
            "sysDba": self.is_orcl # Simplified from context's cmd_orcl_attrs
        }
        if self.is_orcl:
            params["oracle_instance_name"] = self.db_name # db_name is SID for Oracle in context
            params["instance_type"] = "sid" # Default in context
        elif self.db_type_raw in self.have_db_names:
             params["db_name"] = self.db_name
        # Add other db_type specific params if needed based on full MCP tool schema
        return params

    def _get_instance_add_plus_params(self):
        params = {
            "name": self.instance_name,
            "db_type": self.db_type.strip('"'),
            "db_host": self.db_host,
            "db_port": self.db_port,
            "login": self.db_login,
            "password": self.db_pwd,
            "mode": "PROXY",
            "proxy_host": self.proxy_host,
            "proxy_port": self.proxy_port,
            "save_pwd": self.save_pwd,
            "sysDba": self.is_orcl, # Simplified
            "enable_agent": True # Based on context format string for add_instance_plus
        }
        if self.is_orcl:
            params["oracle_instance_name"] = self.db_name
        elif self.db_type_raw in self.have_db_names:
            params["db_name"] = self.db_name
        return params

    def test_add_instance(self):
        obj = 'instance'
        instance_params = self._get_instance_add_params()

        out = self.mcp_client.instance_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_instances, \
            self.msg_already_exists % obj

        self.mcp_client.instance_add(**instance_params)

        out = self.mcp_client.instance_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_instances_info % self.instance_name, \
            self.msg_wasnt_created % obj

        out = self.mcp_client.instance_show_one(name=self.instance_name)
        assert self.out_fix(out.get('data', '')) == self.sample_instance_info % (self.instance_name, self.db_login), \
            self.msg_wasnt_created % obj

    def test_update_instance_credentials_invalid_password(self):
        obj = 'credentials'
        out = self.mcp_client.instance_update_credentials(instance=self.instance_name, login=self.db_login, password='1488')
        # Original test asserts `out` is truthy. MCP client returns a dict.
        # We'll assume success if status is "success" or if it doesn't raise an exception.
        assert out.get("status") == "success", self.msg_werent_updated % obj


    def test_update_instance_credentials_valid_password(self):
        obj = 'credentials'
        out = self.mcp_client.instance_update_credentials(instance=self.instance_name, login=self.db_login, password=self.db_pwd)
        assert out.get("status") == "success", self.msg_werent_updated % obj


    def test_update_instance(self):
        obj = 'instance'
        instance_name = self.instance_name
        instance_name_upd = self.instance_name_upd

        self.mcp_client.instance_update(name=instance_name, new_name=instance_name_upd)

        out = self.mcp_client.instance_show_one(name=instance_name_upd)
        assert self.out_fix(out.get('data', '')) == self.sample_instance_info % (instance_name_upd, self.db_login), \
            self.msg_wasnt_updated % obj

        self.mcp_client.instance_update(name=instance_name_upd, new_name=instance_name) # Revert

    def test_add_interface(self):
        obj = 'interface'
        instance_name = self.instance_name # Updated by previous test, now original name
        db_host = self.db_host
        db_port = self.db_port

        out = self.mcp_client.instance_interface_show_all(instance=instance_name)
        assert self.out_fix(out.get('data', '')) == self.sample_no_interfaces, \
            self.msg_already_exists % obj

        self.mcp_client.instance_interface_add(instance=instance_name, new_host=db_host, new_port=db_port)

        out = self.mcp_client.instance_interface_show_all(instance=instance_name)
        assert self.out_fix(out.get('data', '')) == self.sample_interfaces_info % (db_host, db_port), \
            self.msg_wasnt_created % obj

        out = self.mcp_client.instance_interface_show_one(instance=instance_name, host=db_host, port=db_port)
        assert self.out_fix(out.get('data', '')) == self.sample_interface_info % (db_host, db_port), \
            self.msg_wasnt_created % obj

    def test_add_proxy(self):
        obj = 'proxy'
        instance_name = self.instance_name
        db_host = self.db_host
        db_port = self.db_port
        proxy_host = self.proxy_host
        proxy_port = self.proxy_port

        out = self.mcp_client.instance_proxy_show_all(instance=instance_name, interface_host=db_host, interface_port=db_port)
        assert self.out_fix(out.get('data', '')) == self.sample_no_proxies, \
            self.msg_already_exists % obj

        self.mcp_client.instance_proxy_add(instance=instance_name, interface_host=db_host, interface_port=db_port,
                                           proxy_host=proxy_host, proxy_port=proxy_port)

        out = self.mcp_client.instance_proxy_show_all(instance=instance_name, interface_host=db_host, interface_port=db_port)
        assert self.out_fix(out.get('data', '')) == self.sample_proxies_info % (proxy_host, proxy_port), \
            self.msg_wasnt_added % obj

        # proxies = self.ds_api.proxies.get_list() # ds_api calls are outside MCP scope
        # self.wait_worker_up(proxies[0])
        # # print(self.get_ds_api().proxies.get_proxies_status()[0])

        out = self.mcp_client.instance_proxy_show_one(instance=instance_name, interface_host=db_host, interface_port=db_port,
                                                     proxy_host=proxy_host, proxy_port=proxy_port)
        assert self.out_fix(out.get('data', '')) == self.sample_proxy_info % (proxy_host, proxy_port), \
            self.msg_wasnt_added % obj

    def test_update_interface(self):
        obj = 'interface'
        instance_name = self.instance_name
        db_host = self.db_host
        db_port = self.db_port
        new_host = self.interface_new_host
        new_port = self.interface_new_port

        self.mcp_client.instance_interface_update(instance=instance_name, prev_host=db_host, prev_port=db_port,
                                                 new_host=new_host, new_port=new_port)

        out = self.mcp_client.instance_interface_show_all(instance=instance_name)
        assert self.out_fix(out.get('data', '')) == self.sample_interfaces_info % (new_host, new_port), \
            self.msg_wasnt_updated % obj

        self.mcp_client.instance_interface_update(instance=instance_name, prev_host=new_host, prev_port=new_port,
                                                 new_host=db_host, new_port=db_port) # Revert

    def test_update_proxy(self):
        obj = 'proxy'
        instance_name = self.instance_name
        db_host = self.db_host # Interface host/port
        db_port = self.db_port
        proxy_host = self.proxy_host # Current proxy host/port
        proxy_port = self.proxy_port
        new_proxy_host = self.proxy_new_host # New proxy host/port
        new_proxy_port = self.proxy_new_port

        self.mcp_client.instance_proxy_update(instance=instance_name, interface_host=db_host, interface_port=db_port,
                                             prev_proxy_host=proxy_host, prev_proxy_port=proxy_port,
                                             proxy_host=new_proxy_host, proxy_port=new_proxy_port)

        out = self.mcp_client.instance_proxy_show_all(instance=instance_name, interface_host=db_host, interface_port=db_port)
        assert self.out_fix(out.get('data', '')) == self.sample_proxies_info % (new_proxy_host, new_proxy_port), \
            self.msg_wasnt_updated % obj

        self.mcp_client.instance_proxy_update(instance=instance_name, interface_host=db_host, interface_port=db_port,
                                             prev_proxy_host=new_proxy_host, prev_proxy_port=new_proxy_port,
                                             proxy_host=proxy_host, proxy_port=proxy_port) # Revert

    def test_update_metadata(self):
        # execute_with_retry is part of base class, assume it can take a callable
        # We need to wrap the mcp_client call in a lambda or function if execute_with_retry expects a command string
        # For now, assuming execute_with_retry can be adapted or this test simplified to a direct call
        self.mcp_client.instance_update_metadata(instance=self.instance_name, login=self.db_login, password=self.db_pwd)
        # No assertion in original test for this specific call.

    def test_delete_instance(self):
        obj = 'instance' # Corrected from 'interface'
        instance_name = self.instance_name

        out = self.mcp_client.instance_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_instances_info % instance_name, \
            self.msg_isnt_such % obj

        self.mcp_client.instance_delete(name=instance_name)

        out = self.mcp_client.instance_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_no_instances, \
            self.msg_wasnt_deleted % obj

        self.call_backends_check()
        self.wait_core()

    def test_add_instance_plus(self):
        obj = 'instance'
        # instance_name is self.instance_name, which was deleted. Re-using it.
        instance_params = self._get_instance_add_plus_params()
        
        # Assuming execute_with_retry can take a function and its args
        # This might need a lambda: self.execute_with_retry(lambda: self.mcp_client.instance_add_plus(**instance_params))
        self.mcp_client.instance_add_plus(**instance_params)

        out = self.mcp_client.instance_show_all()
        assert self.out_fix(out.get('data', '')) == self.sample_instances_info % self.instance_name, \
            self.msg_wasnt_created % obj

        out = self.mcp_client.instance_show_one(name=self.instance_name)
        assert self.out_fix(out.get('data', ''), cut_proxy=True) == \
            self.sample_instance_info_plus % (self.instance_name, self.db_login, self.db_host, self.db_port, self.proxy_host, self.proxy_port), \
            self.msg_wasnt_created % obj

    def test_update_instance_plus(self): # This test updates an instance created by add_instance_plus
        instance_name = self.instance_name
        instance_name_upd = self.instance_name_upd
        
        self.mcp_client.instance_update(name=instance_name, new_name=instance_name_upd)

        out = self.mcp_client.instance_show_one(name=instance_name_upd)
        assert self.out_fix(out.get('data', ''), cut_proxy=True) == \
            self.sample_instance_info_plus % (instance_name_upd, self.db_login, self.db_host, self.db_port,
                                              self.proxy_host, self.proxy_port)

        self.mcp_client.instance_update(name=instance_name_upd, new_name=instance_name) # Revert

    def test_delete_proxy(self):
        obj = 'proxy'
        instance_name = self.instance_name # Name is reverted
        db_host = self.db_host
        db_port = self.db_port
        proxy_host = self.proxy_host
        proxy_port = self.proxy_port

        out = self.mcp_client.instance_proxy_show_all(instance=instance_name, interface_host=db_host, interface_port=db_port)
        assert self.out_fix(out.get('data', '')) == self.sample_proxies_info % (proxy_host, proxy_port), \
            self.msg_isnt_such % obj

        self.mcp_client.instance_proxy_delete(instance=instance_name, interface_host=db_host, interface_port=db_port,
                                             proxy_host=proxy_host, proxy_port=proxy_port)

        out = self.mcp_client.instance_proxy_show_all(instance=instance_name, interface_host=db_host, interface_port=db_port)
        assert self.out_fix(out.get('data', '')) == self.sample_no_proxies, \
            self.msg_wasnt_deleted % obj

        self.call_backends_check()
        self.wait_core()

    def test_delete_interface(self):
        obj = 'interface'
        instance_name = self.instance_name
        db_host = self.db_host
        db_port = self.db_port

        # After add_instance_plus, an interface is implicitly created.
        # The test_add_interface might not have run or its effects might be gone if instance was deleted.
        # Let's assume an interface exists from add_instance_plus.
        out = self.mcp_client.instance_interface_show_all(instance=instance_name)
        assert self.out_fix(out.get('data', '')) == self.sample_interfaces_info % (db_host, db_port), \
            self.msg_isnt_such % obj

        self.mcp_client.instance_interface_delete(instance=instance_name, host=db_host, port=db_port)

        out = self.mcp_client.instance_interface_show_all(instance=instance_name)
        assert self.out_fix(out.get('data', '')) == self.sample_no_interfaces, \
            self.msg_wasnt_deleted % obj

        self.call_backends_check()
        self.wait_core()
