import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const tagCommands: CliCommand[] = [
  {
    toolName: 'tag_add',
    description: 'Adds a tag (key-value pair, though value is often implicit or not set via CLI) to a DataSunrise entity (Rule, Periodic Task, Object Group).',
    baseCommand: 'addTag',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'The key/name of the tag to add.'), required: true, cliName: '-name' },
      { name: 'entityType', type: 'string', description: enhanceParameterDescription('string', 'Type of the entity to tag (Rule, Periodic Task, Object Group).', 'ENTITY_TYPE'), required: true, cliName: '-entityType' },
      { name: 'entityName', type: 'string', description: enhanceParameterDescription('string', 'Name of the specific entity instance to tag.'), required: true, cliName: '-entityName' },
      { name: 'value', type: 'string', description: 'Optional value for the tag.', required: false, cliName: '-value' },
    ],
    category: 'Tag',
  },
  {
    toolName: 'tag_update',
    description: "Updates an existing tag's key for a specific entity.",
    baseCommand: 'updateTag',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current key/name of the tag to update.'), required: true, cliName: '-name' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'New key/name for the tag.'), required: false, cliName: '-newName' },
      { name: 'entityType', type: 'string', description: enhanceParameterDescription('string', 'Type of the entity the tag belongs to.', 'ENTITY_TYPE'), required: true, cliName: '-entityType' },
      { name: 'entityName', type: 'string', description: enhanceParameterDescription('string', 'Name of the entity the tag belongs to.'), required: true, cliName: '-entityName' },
      { name: 'value', type: 'string', description: 'New optional value for the tag.', required: false, cliName: '-value' },
    ],
    category: 'Tag',
  },
  {
    toolName: 'tag_show_for_entity',
    description: 'Displays all tags associated with a specific DataSunrise entity.',
    baseCommand: 'showTags',
    params: [
      { name: 'entityType', type: 'string', description: enhanceParameterDescription('string', 'Type of the entity (Rule, Periodic Task, Object Group).', 'ENTITY_TYPE'), required: true, cliName: '-entityType' },
      { name: 'entityName', type: 'string', description: enhanceParameterDescription('string', 'Name of the entity whose tags to display.'), required: true, cliName: '-entityName' },
    ],
    category: 'Tag',
  },
  {
    toolName: 'tag_show_one',
    description: 'Shows detailed information for a specific tag on a specific entity.',
    baseCommand: 'showTag',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Key/name of the tag to display.'), required: true, cliName: '-name' },
      { name: 'entityType', type: 'string', description: enhanceParameterDescription('string', 'Type of the entity the tag belongs to.', 'ENTITY_TYPE'), required: true, cliName: '-entityType' },
      { name: 'entityName', type: 'string', description: enhanceParameterDescription('string', 'Name of the entity the tag belongs to.'), required: true, cliName: '-entityName' },
    ],
    category: 'Tag',
  },
  {
    toolName: 'tag_show_tagged_entities',
    description: 'Shows all DataSunrise entities that have at least one tag.',
    baseCommand: 'showTagged',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', "Tag's key."), required: false, cliName: '-name' },
      { name: 'value', type: 'string', description: enhanceParameterDescription('string', "Tag's value."), required: false, cliName: '-value' },
    ],
    category: 'Tag',
  },
  {
    toolName: 'tag_show_untagged_entities',
    description: 'Shows all DataSunrise entities that do not have any tags.',
    baseCommand: 'showUntagged',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Tag\'s key.'), required: false, cliName: '-name' },
    ],
    category: 'Tag',
  },
  {
    toolName: 'tag_delete',
    description: 'Deletes a specific tag from a DataSunrise entity.',
    baseCommand: 'delTag',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Key/name of the tag to delete.'), required: true, cliName: '-name' },
      { name: 'entityType', type: 'string', description: enhanceParameterDescription('string', 'Type of the entity from which to delete the tag.', 'ENTITY_TYPE'), required: true, cliName: '-entityType' },
      { name: 'entityName', type: 'string', description: enhanceParameterDescription('string', 'Name of the entity from which to delete the tag.'), required: true, cliName: '-entityName' },
    ],
    category: 'Tag',
  },
];
