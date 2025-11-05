import sys
import os
# Add the mcp-client directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../../Users/davegornshtein/mcp-client')))

from mcp_client import DataSunriseMCPClient
from test_cmdline_commands.contexts.periodic_task_context import PeriodicTaskContext
from test_cmdline_commands.contexts.create_instance_context import create_instance_context
from framework.base.ContextsManager import with_context
import pytest


@with_context(create_instance_context(True))
class TestPeriodicTask(PeriodicTaskContext):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mcp_client = DataSunriseMCPClient()
        # TODO: Replace with actual login credentials
        self.mcp_client.connect(login="your_ds_login", password="your_ds_password")
        if not self.mcp_client.session_active:
            print("MCP Client connection failed for TestPeriodicTask. Tests may not run correctly.")
            # Consider pytest.skip("MCP Client connection failed.")

    def test_add_clean_audit_per_task_01(self):
        obj = 'clean audit'
        per_task = self.per_task_clean_audit_01
        per_task_type = self.per_task_type_clean_audit

        self.mcp_client.periodic_task_add_clean_audit(name=per_task)

        out = self.mcp_client.periodic_task_show_one(name=per_task, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_clean_audit_info % per_task, \
            self.msg_per_task_wasnt_created % obj

    def test_update_clean_audit_per_task_01_02(self):
        obj = 'clean audit'
        per_task_01 = self.per_task_clean_audit_01
        per_task_02 = self.per_task_clean_audit_02
        per_task_type = self.per_task_type_clean_audit

        self.mcp_client.periodic_task_update_clean_audit(name=per_task_01, new_name=per_task_02)

        out = self.mcp_client.periodic_task_show_one(name=per_task_02, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_clean_audit_info % per_task_02, \
            self.msg_per_task_wasnt_created % obj # Original message was "wasnt_created", might be a typo for "wasnt_updated"

    def test_delete_clean_audit_per_task_02(self):
        per_task = self.per_task_clean_audit_02
        per_task_type = self.per_task_type_clean_audit
        self.mcp_client.periodic_task_delete(name=per_task, task_type=per_task_type)

    def test_add_backup_dictionary_per_task_01(self):
        obj = 'backup dictionary'
        backup = self.dict_backup
        per_task = self.per_task_backup_dictionary_01
        per_task_type = self.per_task_type_backup_dictionary

        self.mcp_client.periodic_task_add_backup_dictionary(name=per_task, backup_name=backup)

        out = self.mcp_client.periodic_task_show_one(name=per_task, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_backup_dict_info % per_task, \
            self.msg_per_task_wasnt_created % obj

    def test_update_backup_dictionary_per_task_01_02(self):
        obj = 'backup dictionary'
        per_task_01 = self.per_task_backup_dictionary_01
        per_task_02 = self.per_task_backup_dictionary_02
        per_task_type = self.per_task_type_backup_dictionary
        
        self.mcp_client.periodic_task_update_backup_dictionary(name=per_task_01, new_name=per_task_02)

        out = self.mcp_client.periodic_task_show_one(name=per_task_02, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_backup_dict_info % per_task_02, \
            self.msg_per_task_wasnt_updated % obj

    def test_delete_backup_dictionary_per_task_02(self):
        per_task = self.per_task_backup_dictionary_02
        per_task_type = self.per_task_type_backup_dictionary
        self.mcp_client.periodic_task_delete(name=per_task, task_type=per_task_type)

    def test_add_user_behaviour_per_task_01(self):
        obj = 'user behaviour'
        per_task = self.per_task_user_behaviour_01
        per_task_type = self.per_task_type_user_behaviour
        start_date = self.tr_start_date
        end_date   = self.tr_end_date

        self.mcp_client.periodic_task_add_user_behavior(name=per_task, tr_start_date=start_date, tr_end_date=end_date)

        out = self.mcp_client.periodic_task_show_one(name=per_task, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_user_behaviour_info % per_task, \
            self.msg_per_task_wasnt_created % obj

    def test_update_user_behaviour_per_task_01_02(self):
        obj = 'user behaviour'
        per_task_01 = self.per_task_user_behaviour_01
        per_task_02 = self.per_task_user_behaviour_02
        per_task_type = self.per_task_type_user_behaviour

        self.mcp_client.periodic_task_update_user_behavior(name=per_task_01, new_name=per_task_02)

        out = self.mcp_client.periodic_task_show_one(name=per_task_02, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_user_behaviour_info % per_task_02, \
            self.msg_per_task_wasnt_updated % obj

    def test_delete_user_behaviour_per_task_02(self):
        per_task = self.per_task_user_behaviour_02
        per_task_type = self.per_task_type_user_behaviour
        self.mcp_client.periodic_task_delete(name=per_task, task_type=per_task_type)

    def test_add_query_history_table_relation_learning_per_task_01(self):
        obj = 'query history table relation learning'
        instance = self.instance_name
        per_task = self.per_task_relation_learning_01
        per_task_type = self.per_task_type_relation_learning
        table_rel = self.table_relation_model

        self.mcp_client.periodic_task_add_ddl_table_relation_learning(name=per_task, inst=instance, table_rel=table_rel)

        out = self.mcp_client.periodic_task_show_one(name=per_task, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_rel_learning_info % (per_task, table_rel), \
            self.msg_per_task_wasnt_created % obj

    def test_update_query_history_table_relation_learning_per_task_01_02(self):
        obj = 'query history table relation learning'
        per_task_01 = self.per_task_relation_learning_01
        per_task_02 = self.per_task_relation_learning_02
        per_task_type = self.per_task_type_relation_learning
        table_rel = self.table_relation_model

        self.mcp_client.periodic_task_update_ddl_table_relation_learning(name=per_task_01, new_name=per_task_02)

        out = self.mcp_client.periodic_task_show_one(name=per_task_02, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_rel_learning_info % (per_task_02, table_rel), \
            self.msg_per_task_wasnt_updated % obj

    def test_delete_query_history_table_relation_learning_per_task_02(self):
        per_task = self.per_task_relation_learning_02
        per_task_type = self.per_task_type_relation_learning
        self.mcp_client.periodic_task_delete(name=per_task, task_type=per_task_type)

    def test_add_vulnerability_assessment_per_task_01(self):
        obj = 'vulnerability assessment'
        per_task = self.per_task_vuln_assessment_01
        per_task_type = self.per_task_type_vuln_assessment

        self.mcp_client.periodic_task_add_vulnerability_assessment(name=per_task)

        out = self.mcp_client.periodic_task_show_one(name=per_task, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_vuln_assessment_info % per_task, \
            self.msg_per_task_wasnt_created % obj

    def test_update_vulnerability_assessment_per_task_01_02(self):
        obj = 'vulnerability assessment'
        per_task_01 = self.per_task_vuln_assessment_01
        per_task_02 = self.per_task_vuln_assessment_02
        per_task_type = self.per_task_type_vuln_assessment

        self.mcp_client.periodic_task_update_vulnerability_assessment(name=per_task_01, new_name=per_task_02)

        out = self.mcp_client.periodic_task_show_one(name=per_task_02, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_vuln_assessment_info % per_task_02, \
            self.msg_per_task_wasnt_updated % obj

    def test_delete_vulnerability_assessment_per_task_02(self):
        per_task = self.per_task_vuln_assessment_02
        per_task_type = self.per_task_type_vuln_assessment
        self.mcp_client.periodic_task_delete(name=per_task, task_type=per_task_type)

    def test_add_update_metadata_per_task_01(self):
        obj = 'update metadata'
        instance = self.instance_name
        per_task = self.per_task_update_metadata_01
        per_task_type = self.per_task_type_update_metadata

        self.mcp_client.periodic_task_add_update_metadata(name=per_task, instance=instance)

        out = self.mcp_client.periodic_task_show_one(name=per_task, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_update_metadata_info % per_task, \
            self.msg_per_task_wasnt_created % obj

    def test_update_update_metadata_per_task_01_02(self):
        obj = 'update metadata'
        per_task_01 = self.per_task_update_metadata_01
        per_task_02 = self.per_task_update_metadata_02
        per_task_type = self.per_task_type_update_metadata

        self.mcp_client.periodic_task_update_update_metadata(name=per_task_01, new_name=per_task_02)

        out = self.mcp_client.periodic_task_show_one(name=per_task_02, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_update_metadata_info % per_task_02, \
            self.msg_per_task_wasnt_updated % obj

    def test_delete_update_metadata_per_task_02(self):
        per_task = self.per_task_update_metadata_02
        per_task_type = self.per_task_type_update_metadata
        self.mcp_client.periodic_task_delete(name=per_task, task_type=per_task_type)

    def test_add_data_discovery_per_task_01(self):
        obj = 'data discovery'
        instance = self.instance_name
        per_task = self.per_task_data_discovery_01
        per_task_type = self.per_task_type_discovery
        group = self.disc_gr_01 # This discovery group should be created by setup_tests in context

        self.mcp_client.periodic_task_add_data_discovery(name=per_task, instance=instance, search_by_info_types=group)

        out = self.mcp_client.periodic_task_show_one(name=per_task, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_data_discovery_info % (per_task, group), \
            self.msg_per_task_wasnt_created % obj

    def test_update_data_discovery_per_task_01_02(self):
        obj = 'data discovery'
        per_task_01 = self.per_task_data_discovery_01
        per_task_02 = self.per_task_data_discovery_02
        per_task_type = self.per_task_type_discovery
        group = self.disc_gr_01

        self.mcp_client.periodic_task_update_data_discovery(name=per_task_01, new_name=per_task_02)

        out = self.mcp_client.periodic_task_show_one(name=per_task_02, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_data_discovery_info % (per_task_02, group), \
            self.msg_per_task_wasnt_updated % obj

    def test_delete_data_discovery_per_task_02(self):
        per_task = self.per_task_data_discovery_02
        per_task_type = self.per_task_type_discovery
        self.mcp_client.periodic_task_delete(name=per_task, task_type=per_task_type)

    def test_add_health_check_per_task_01(self):
        obj = 'health check'
        instance = self.instance_name
        per_task = self.per_task_health_check_01
        per_task_type = self.per_task_type_health_check

        self.mcp_client.periodic_task_add_health_check(name=per_task, instance=instance)

        out = self.mcp_client.periodic_task_show_one(name=per_task, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_health_check_info % per_task, \
            self.msg_per_task_wasnt_updated % obj # Original message was "wasnt_updated", might be a typo

    def test_update_health_check_per_task_01_02(self):
        obj = 'health check'
        per_task_01 = self.per_task_health_check_01
        per_task_02 = self.per_task_health_check_02
        per_task_type = self.per_task_type_health_check

        self.mcp_client.periodic_task_update_health_check(name=per_task_01, new_name=per_task_02)

        out = self.mcp_client.periodic_task_show_one(name=per_task_02, task_type=per_task_type)
        assert self.out_fix(out.get('data', ''), skip_tags=True) == self.sample_per_health_check_info % per_task_02, \
            self.msg_per_task_wasnt_updated % obj

    def test_delete_health_check_per_task_02(self):
        per_task = self.per_task_health_check_02
        per_task_type = self.per_task_type_health_check
        self.mcp_client.periodic_task_delete(name=per_task, task_type=per_task_type)
