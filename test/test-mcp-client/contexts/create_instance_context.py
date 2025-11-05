from test_cmdline_commands.contexts.instance_context import InstanceContext as _base


class SavedContexts(object):
    contexts = {}

def create_instance_context(plus):
    if plus in SavedContexts.contexts:
        return SavedContexts.contexts[plus]

    class CreateInstanceContext(_base):
        @classmethod
        def setup_tests(cls):
            instance = cls.instance_name
            db_type  = cls.db_type
            db_host  = cls.db_host
            db_port  = cls.db_port
            db_name  = cls.db_name
            db_login = cls.db_login
            db_pwd   = cls.db_pwd
            proxy_host = cls.proxy_host
            proxy_port = cls.proxy_port
            save_pwd = cls.save_pwd

            cls._delete_instance()

            if plus:
                cls.execute_with_retry(cls.add_instance_plus % (instance, db_type, db_name, db_host, db_port, db_login, db_pwd,
                                                     proxy_host, proxy_port, save_pwd))

                server_id = cls.server_id()
                cls.execute('arbitrary -function callBackendCheck -serverID %d -jsonContent {}' % server_id)

                cls.wait_core()

                cls.execute('arbitrary -function makeSyncFlush -jsonContent {"workerID":-1}')
            else:
                cls.execute_with_retry(cls.add_instance % (instance, db_type, db_name, db_login))

        @classmethod
        def cleanup_tests(cls):
            cls._delete_instance()

    SavedContexts.contexts[plus] = CreateInstanceContext

    return SavedContexts.contexts[plus]
