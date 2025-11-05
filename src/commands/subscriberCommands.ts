import { CliCommand } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const subscriberCommands: CliCommand[] = [
  {
    toolName: 'subscriber_add',
    description: 'Adds a new subscriber for notifications. Subscribers are linked to pre-configured SMTP or SNMP servers.',
    baseCommand: 'addSubscriber',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Unique name for the new subscriber.'), required: false, cliName: '-name' },
      { name: 'serverName', type: 'string', description: enhanceParameterDescription('string', 'Name of the pre-configured SMTP or SNMP server to use for this subscriber.'), required: true, cliName: '-serverName' },
      { name: 'sendAddress', type: 'string', description: enhanceParameterDescription('string', 'Email address or SNMP trap destination for the subscriber.'), required: true, cliName: '-sendAddress' },
      { name: 'events', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated list of Events to subscribe to.'), required: false, cliName: '-events' },
      { name: 'eventFilter', type: 'string', description: enhanceParameterDescription('string', 'Events filter string.'), required: false, cliName: '-eventFilter' },
    ],
    category: 'Subscriber',
  },
  {
    toolName: 'subscriber_update',
    description: "Updates an existing subscriber's name, server, or notification address.",
    baseCommand: 'updateSubscriber',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current name of the subscriber to update.'), required: true, cliName: '-name' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'New name for the subscriber.'), required: false, cliName: '-newName' },
      { name: 'serverName', type: 'string', description: enhanceParameterDescription('string', 'New server name for the subscriber.'), required: false, cliName: '-serverName' },
      { name: 'sendAddress', type: 'string', description: enhanceParameterDescription('string', 'New notification address.'), required: false, cliName: '-sendAddress' },
      { name: 'events', type: 'string', description: enhanceParameterDescription('string', 'Comma-separated list of Events to subscribe to.'), required: false, cliName: '-events' },
      { name: 'eventFilter', type: 'string', description: enhanceParameterDescription('string', 'Events filter string.'), required: false, cliName: '-eventFilter' },
    ],
    category: 'Subscriber',
  },
  {
    toolName: 'subscriber_show_all',
    description: 'Displays a list of all configured subscribers.',
    baseCommand: 'showSubscribers',
    params: [],
    category: 'Subscriber',
  },
  {
    toolName: 'subscriber_show_one',
    description: 'Shows detailed information for a specific subscriber. Please provide either -name or -id.',
    baseCommand: 'showSubscriber',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the subscriber to display.'), required: false, cliName: '-name' },
      { name: 'id', type: 'string', description: enhanceParameterDescription('string', 'ID of the subscriber to display.'), required: false, cliName: '-id' },
    ],
    category: 'Subscriber',
  },
  {
    toolName: 'subscriber_delete',
    description: 'Deletes a specified subscriber. Please provide either -name or -id.',
    baseCommand: 'delSubscriber',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Name of the subscriber to delete.'), required: false, cliName: '-name' },
      { name: 'id', type: 'string', description: enhanceParameterDescription('string', 'ID of the subscriber to delete.'), required: false, cliName: '-id' },
    ],
    category: 'Subscriber',
  },
];
