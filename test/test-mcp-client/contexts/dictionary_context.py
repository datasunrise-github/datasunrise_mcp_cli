from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base


class DictionaryContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]


    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]


    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    create_dict_backup = 'createDictionaryBackup'
    show_dict_backups  = 'showDictionaryBackups'
    clean_dict         = 'cleanDictionary -f'
    recover_dict       = 'recoverDictionary -id %s'

    #
    #
    # MESSAGES
    # =================================================================================================================]
