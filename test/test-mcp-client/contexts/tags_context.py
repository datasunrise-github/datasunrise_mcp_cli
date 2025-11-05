from test_cmdline_commands.contexts.commandline_context import CommandlineContext as _base
from test_cmdline_commands.contexts.rules_context import RulesContext as _rule
from test_cmdline_commands.contexts.object_group_context import ObjectGroupContext as _obj_group
from test_cmdline_commands.contexts.periodic_task_context import PeriodicTaskContext as _per_task
from textwrap import dedent as sample


class TagsContext(_base):
    #
    #
    # PARAMETERS
    # =================================================================================================================]
    rule_     = _rule.rule_
    rule_type = _rule.rule_type
    obj_group = _obj_group.obj_gr_01
    per_task  = _per_task.per_task_clean_audit_01
    per_task_type  = _per_task.per_task_type_clean_audit

    # -----------------------------------------------------------------------------------------------------------------]
    tag_name_01 = _base.prefix   + 'tag'
    tag_name_02 = _base.prefix_s + 'Tag'
    # -----------------------------------------------------------------------------------------------------------------]
    ent_rule      = 'Rule'
    ent_per_task  = 'Periodic Task'
    ent_obj_group = 'Object Group'

    #
    #
    # OUTPUT SAMPLES
    # =================================================================================================================]
    sample_no_tags   = r'(\d*)( *): ds::creatorName( *): (\w*)\n' \
                       r'(\d*)( *): ds::dateOfCreation( *): (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})'
    sample_tagged = r'Object Groups:\n' \
                       r'(\d{1,} *): test_object_group\n' \
                       r'Periodic Tasks:\n' \
                       r'(\d{1,} *): test_periodic_task_clean_audit\n' \
                       r'Rules:\n' \
                       r'(\d{1,} *): test_rule_audit\n\nOK\n'
    sample_untagged = sample('''\
        Object Groups:
        Periodic Tasks:
        Rules:

        OK
    ''')
    sample_tag_info  = sample('''\
        Key     : %s
        Value   :

        OK
    ''')

    #
    #
    # CMDLINE FUNCTIONS
    # =================================================================================================================]
    add_tag       = 'addTag -name %s -entityType %s -entityName %s'
    add_rule      = _rule.add_rule
    add_object_gr = _obj_group.add_object_gr
    add_per_task  = _per_task.add_per_clean_audit
    # -----------------------------------------------------------------------------------------------------------------]
    upd_tag       = 'updateTag -name %s -newName %s -entityType %s -entityName %s'
    # -----------------------------------------------------------------------------------------------------------------]
    show_tags     = 'showTags -entityType %s -entityName %s'
    show_tag      = 'showTag -name %s -entityType %s -entityName %s'
    show_tagged   = 'showTagged'                                                                            # NO SAMPLE
    show_untagged = 'showUntagged'                                                                          # NO SAMPLE
    # -----------------------------------------------------------------------------------------------------------------]
    del_tag       = 'delTag -name %s -entityType %s -entityName %s'
    del_rule      = _rule.del_rule
    del_object_gr = _obj_group.del_object_gr
    del_per_task  = _per_task.del_per_task

    #
    #
    # MESSAGES
    # =================================================================================================================]
    msg_tags_already_exist    = "There're already some tags for %s entity"
    msg_some_tagged_objects_u = "There're some tagged objects"
    msg_some_tagged_objects   = "There're some tagged %s"
    msg_tags_werent_created   = "The tags for %s entity weren't created"
    msg_tags_werent_added_u   = "The tags weren't added to objects"
    msg_tags_werent_added     = "The tags weren't added to %s"
    msg_tags_werent_updated   = "The tags for %s weren't updated"
    
    @classmethod
    def setup_tests(cls):
        rule_type = cls.rule_type
        obj_group = cls.obj_group
        per_task  = cls.per_task

        obj_group_in = cls.sws(obj_group)
        per_task_in  = cls.sws(per_task)

        cls.execute(cls.add_rule % (rule_type, rule_type))
        cls.execute(cls.add_object_gr % obj_group_in)
        cls.execute(cls.add_per_task % per_task_in)

    @classmethod
    def cleanup_tests(cls):
        rule = cls.rule_ + cls.rule_type
        obj_group = cls.obj_group
        per_task  = cls.per_task
        per_task_type = cls.per_task_type

        obj_group_in = cls.sws(obj_group)
        per_task_in  = cls.sws(per_task)
        per_task_type_in = cls.sws(per_task_type)

        cls.execute(cls.del_rule % rule)
        cls.execute(cls.del_object_gr % obj_group_in)
        cls.execute(cls.del_per_task % (per_task_in, per_task_type_in))
