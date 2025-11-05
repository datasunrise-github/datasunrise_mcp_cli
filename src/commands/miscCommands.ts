import { CliCommand, CliParam } from './types.js';
import { enhanceParameterDescription } from '../description_helpers.js';

export const miscCommands: CliCommand[] = [
  // Corresponds to 'showWorkers' in CLI Guide 26.1
  {
    toolName: 'misc_show_workers',
    description: 'Displays a list of all available Workers.',
    baseCommand: 'showWorkers',
    category: 'Miscellaneous',
    params: [
      { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'Name of the DataSunrise server. If not set, displays workers for the current server.'), required: false, cliName: '-dsServer' },
    ],
  },
  // Corresponds to 'flush' in CLI Guide 26.2
  {
    toolName: 'misc_flush',
    description: 'Updates Backend data and sends synchronization command to the Core.',
    baseCommand: 'flush',
    category: 'Miscellaneous',
    params: [
      { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'Name of the DataSunrise server. Optional.'), required: false, cliName: '-dsServer' },
      { name: 'worker', type: 'string', description: enhanceParameterDescription('string', 'Worker name. Optional.'), required: false, cliName: '-worker' },
    ],
  },
  // Corresponds to 'showAdminQueryTypes' in CLI Guide 26.3
  {
    toolName: 'misc_show_admin_query_types',
    description: 'Displays types of administrative queries.',
    baseCommand: 'showAdminQueryTypes',
    category: 'Miscellaneous',
    params: [],
  },
  // Corresponds to 'showMostBlocked' in CLI Guide 26.7 (and 5.6, 26.6)
  {
    toolName: 'misc_show_most_blocked',
    description: 'Displays a report on the most frequently blocked queries.',
    baseCommand: 'showMostBlocked',
    category: 'Miscellaneous',
    params: [
      { name: 'beginDate', type: 'string', description: enhanceParameterDescription('string', 'Begin date (yyyy-MM-dd HH:mm:ss). Optional.', 'DATETIME'), required: false, cliName: '-beginDate' },
      { name: 'endDate', type: 'string', description: enhanceParameterDescription('string', 'End date (yyyy-MM-dd HH:mm:ss). Optional.', 'DATETIME'), required: false, cliName: '-endDate' },
      { name: 'instance', type: 'string', description: enhanceParameterDescription('string', 'Logical name of the instance or "any". Optional.'), required: false, cliName: '-instance' },
    ],
  },
  // Corresponds to 'showQueryTypes' in CLI Guide 26.8
  {
    toolName: 'misc_show_query_types',
    description: 'Displays query types.',
    baseCommand: 'showQueryTypes',
    category: 'Miscellaneous',
    params: [],
  },
  // Corresponds to 'showSessions' in CLI Guide 26.10 (and 17.3)
  {
    toolName: 'misc_show_sessions',
    description: 'Displays a list of sessions.',
    baseCommand: 'showSessions',
    category: 'Miscellaneous',
    params: [
      { name: 'a', type: 'boolean', description: enhanceParameterDescription('boolean', 'show active sessions only'), required: false, cliName: '-a' },
      { name: 'app', type: 'string', description: enhanceParameterDescription('string', 'application'), required: false, cliName: '-app' },
      { name: 'appOpt', type: 'string', description: enhanceParameterDescription('string', 'options to search for app. One of Empty, Not Empty, Like, Not Like, Match, Not Match, Any'), required: false, cliName: '-appOpt' },
      { name: 'beginDate', type: 'string', description: enhanceParameterDescription('string', "'beginning date' formatted as yyyy-MM-dd HH:mm:ss"), required: false, cliName: '-beginDate' },
      { name: 'endDate', type: 'string', description: enhanceParameterDescription('string', "'ending date' formatted as yyyy-MM-dd HH:mm:ss"), required: false, cliName: '-endDate' },
      { name: 'host', type: 'string', description: enhanceParameterDescription('string', 'host'), required: false, cliName: '-host' },
      { name: 'hostOpt', type: 'string', description: enhanceParameterDescription('string', 'options to search for host. One of Empty, Not Empty, Like, Not Like, Match, Not Match, Any'), required: false, cliName: '-hostOpt' },
      { name: 'i', type: 'boolean', description: enhanceParameterDescription('boolean', 'show inactive sessions only'), required: false, cliName: '-i' },
      { name: 'instance', type: 'string', description: enhanceParameterDescription('string', "logical name of the Instance or 'any'"), required: false, cliName: '-instance' },
      { name: 'login', type: 'string', description: enhanceParameterDescription('string', 'login'), required: false, cliName: '-login' },
      { name: 'loginOpt', type: 'string', description: enhanceParameterDescription('string', 'options to search for login. One of Empty, Not Empty, Like, Not Like, Match, Not Match, Any'), required: false, cliName: '-loginOpt' },
    ],
  },
  // Corresponds to 'showSystemErrors' in CLI Guide 26.12
  {
    toolName: 'misc_show_system_errors',
    description: 'Displays a report on system errors.',
    baseCommand: 'showSystemErrors',
    category: 'Miscellaneous',
    params: [
      { name: 'beginDate', type: 'string', description: enhanceParameterDescription('string', 'Begin date (yyyy-MM-dd HH:mm:ss). Optional.', 'DATETIME'), required: false, cliName: '-beginDate' },
      { name: 'endDate', type: 'string', description: enhanceParameterDescription('string', 'End date (yyyy-MM-dd HH:mm:ss). Optional.', 'DATETIME'), required: false, cliName: '-endDate' },
    ],
  },
  // Corresponds to 'showThroughputHistory' in CLI Guide 26.13
  {
    toolName: 'misc_show_throughput_history',
    description: 'Displays a throughput history.',
    baseCommand: 'showThroughputHistory',
    category: 'Miscellaneous',
    params: [
      { name: 'beginDate', type: 'string', description: enhanceParameterDescription('string', 'Begin date (yyyy-MM-dd HH:mm:ss). Optional.', 'DATETIME'), required: false, cliName: '-beginDate' },
      { name: 'endDate', type: 'string', description: enhanceParameterDescription('string', 'End date (yyyy-MM-dd HH:mm:ss). Optional.', 'DATETIME'), required: false, cliName: '-endDate' },
    ],
  },
  // Corresponds to 'traceAuditCounters' in CLI Guide 26.14
  {
    toolName: 'misc_trace_audit_counters',
    description: 'Traces Audit Counters.',
    baseCommand: 'traceAuditCounters',
    category: 'Miscellaneous',
    params: [
      { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'Name of the DataSunrise server. Optional.'), required: false, cliName: '-dsServer' },
      { name: 'worker', type: 'string', description: enhanceParameterDescription('string', 'Worker name. Optional.'), required: false, cliName: '-worker' },
    ],
  },
  // Corresponds to 'addSsoService' in CLI Guide 26.16
  {
    toolName: 'misc_add_sso_service',
    description: 'Adds a new SSO Service.',
    baseCommand: 'addSsoService',
    category: 'Miscellaneous',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'SSO service name.'), required: true, cliName: '-name' },
      { name: 'type', type: 'string', description: enhanceParameterDescription('string', 'Type: OpenID Connect or SAML.', 'ENUM'), required: false, cliName: '-type' },
      { name: 'action', type: 'string', description: enhanceParameterDescription('string', 'Action to take. <Deny Access|Create a New User|Create or Update User Based on Response>', 'ENUM'), required: false, cliName: '-action' },
      { name: 'entityID', type: 'string', description: enhanceParameterDescription('string', 'Entity ID (SAML). Optional.'), required: false, cliName: '-entityID' },
      { name: 'assertionConsumeServiceEndpoint', type: 'string', description: enhanceParameterDescription('string', 'Assertion consume service endpoint (SAML). Optional.'), required: false, cliName: '-assertionConsumeServiceEndpoint' },
      { name: 'singleLogoutEndpoint', type: 'string', description: enhanceParameterDescription('string', 'Single logout endpoint (SAML). Optional.'), required: false, cliName: '-singleLogoutEndpoint' },
      { name: 'nameIDFormat', type: 'string', description: enhanceParameterDescription('string', 'Name ID format (SAML). Optional.'), required: false, cliName: '-nameIDFormat' },
      { name: 'dontSignAuthenticationofRequests', type: 'string', description: enhanceParameterDescription('string', 'Dont sign authentication of requests (SAML) (true | false)'), required: false, cliName: '-dontSignAuthenticationofRequests' },
      { name: 'dontCheckSignedAssertions', type: 'string', description: enhanceParameterDescription('string', 'Dont check signed assertions (SAML) (true | false)'), required: false, cliName: '-dontCheckSignedAssertions' },
      { name: 'privateKeyForSignSAMLMessages', type: 'string', description: enhanceParameterDescription('string', 'File with private key for Sign SAML Messages. Optional.', 'FILE_PATH'), required: false, cliName: '-privateKeyForSignSAMLMessages' },
      { name: 'x509CertificateForVerifySAMLMessages', type: 'string', description: enhanceParameterDescription('string', 'File with an X509 Certificate for Verify SAML Messages. Optional.', 'FILE_PATH'), required: false, cliName: '-x509CertificateForVerifySAMLMessages' },
      { name: 'xmlMetadata', type: 'string', description: enhanceParameterDescription('string', 'XML metadata file (SAML). Optional.', 'FILE_PATH'), required: false, cliName: '-xmlMetadata' },
      { name: 'role', type: 'string', description: enhanceParameterDescription('string', 'Role. Execute showAccessRoles to see available roles. Required if -action is "Create a New User".'), required: false, cliName: '-role' },
      { name: 'dSUserNameAttr', type: 'string', description: enhanceParameterDescription('string', 'DS user name attribute. Optional.'), required: false, cliName: '-dSUserNameAttr' },
      { name: 'OIDCClientID', type: 'string', description: enhanceParameterDescription('string', 'OIDC client ID (OpenID Connect). Optional.'), required: false, cliName: '-OIDCClientID' },
      { name: 'OIDCClientSecret', type: 'string', description: enhanceParameterDescription('string', 'OIDC client secret (OpenID Connect). Optional.'), required: false, cliName: '-OIDCClientSecret' },
      { name: 'tokenEndpointURL', type: 'string', description: enhanceParameterDescription('string', 'Token endpoint URL. Optional.'), required: false, cliName: '-tokenEndpointURL' },
      { name: 'tokenKeysEndpointURL', type: 'string', description: enhanceParameterDescription('string', 'Token keys endpoint URL (OpenID Connect). Optional.'), required: false, cliName: '-tokenKeysEndpointURL' },
      { name: 'authorizationTokenEndpointURL', type: 'string', description: enhanceParameterDescription('string', 'Authorization token endpoint URL (OpenID Connect). Optional.'), required: false, cliName: '-authorizationTokenEndpointURL' },
      { name: 'endpoint', type: 'string', description: enhanceParameterDescription('string', 'Endpoint (OpenID Connect). Optional.'), required: false, cliName: '-endpoint' },
      { name: 'setEndpointsManually', type: 'string', description: enhanceParameterDescription('string', 'Set endpoints manually (true | false)'), required: false, cliName: '-setEndpointsManually' },
      { name: 'spMetadataValidUntil', type: 'string', description: enhanceParameterDescription('string', 'SP metadata valid until. Optional.'), required: false, cliName: '-spMetadataValidUntil' },
    ],
  },
  // Corresponds to 'updateSsoService' in CLI Guide 26.17
  {
    toolName: 'misc_update_sso_service',
    description: 'Updates an existing SSO Service.',
    baseCommand: 'updateSsoService',
    category: 'Miscellaneous',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'Current SSO service name.'), required: true, cliName: '-name' },
      { name: 'newName', type: 'string', description: enhanceParameterDescription('string', 'New SSO service name. Optional.'), required: false, cliName: '-newName' },
      { name: 'type', type: 'string', description: enhanceParameterDescription('string', 'Type: OpenID Connect or SAML. Optional.', 'ENUM'), required: false, cliName: '-type' },
      { name: 'action', type: 'string', description: enhanceParameterDescription('string', 'Action to take. Optional.', 'ENUM'), required: false, cliName: '-action' },
      { name: 'entityID', type: 'string', description: enhanceParameterDescription('string', 'Entity ID (SAML). Optional.'), required: false, cliName: '-entityID' },
      { name: 'assertionConsumeServiceEndpoint', type: 'string', description: enhanceParameterDescription('string', 'Assertion consume service endpoint (SAML). Optional.'), required: false, cliName: '-assertionConsumeServiceEndpoint' },
      { name: 'singleLogoutEndpoint', type: 'string', description: enhanceParameterDescription('string', 'Single logout endpoint (SAML). Optional.'), required: false, cliName: '-singleLogoutEndpoint' },
      { name: 'nameIDFormat', type: 'string', description: enhanceParameterDescription('string', 'Name ID format (SAML). Optional.'), required: false, cliName: '-nameIDFormat' },
      { name: 'dontSignAuthenticationofRequests', type: 'string', description: enhanceParameterDescription('string', 'Dont sign authentication of requests (SAML). Optional.'), required: false, cliName: '-dontSignAuthenticationofRequests' },
      { name: 'dontCheckSignedAssertions', type: 'string', description: enhanceParameterDescription('string', 'Dont check signed assertions (SAML). Optional.'), required: false, cliName: '-dontCheckSignedAssertions' },
      { name: 'privateKeyForSignSAMLMessages', type: 'string', description: enhanceParameterDescription('string', 'File with private key for Sign SAML Messages. Optional.', 'FILE_PATH'), required: false, cliName: '-privateKeyForSignSAMLMessages' },
      { name: 'x509CertificateForVerifySAMLMessages', type: 'string', description: enhanceParameterDescription('string', 'File with an X509 Certificate for Verify SAML Messages. Optional.', 'FILE_PATH'), required: false, cliName: '-x509CertificateForVerifySAMLMessages' },
      { name: 'xmlMetadata', type: 'string', description: enhanceParameterDescription('string', 'XML metadata file (SAML). Optional.', 'FILE_PATH'), required: false, cliName: '-xmlMetadata' },
      { name: 'role', type: 'string', description: enhanceParameterDescription('string', 'Role. Optional.'), required: false, cliName: '-role' },
      { name: 'dSUserNameAttr', type: 'string', description: enhanceParameterDescription('string', 'DS user name attribute. Optional.'), required: false, cliName: '-dSUserNameAttr' },
      { name: 'OIDCClientID', type: 'string', description: enhanceParameterDescription('string', 'OIDC client ID (OpenID Connect). Optional.'), required: false, cliName: '-OIDCClientID' },
      { name: 'OIDCClientSecret', type: 'string', description: enhanceParameterDescription('string', 'OIDC client secret (OpenID Connect). Optional.'), required: false, cliName: '-OIDCClientSecret' },
      { name: 'tokenEndpointURL', type: 'string', description: enhanceParameterDescription('string', 'Token endpoint URL. Optional.'), required: false, cliName: '-tokenEndpointURL' },
      { name: 'tokenKeysEndpointURL', type: 'string', description: enhanceParameterDescription('string', 'Token keys endpoint URL (OpenID Connect). Optional.'), required: false, cliName: '-tokenKeysEndpointURL' },
      { name: 'authorizationTokenEndpointURL', type: 'string', description: enhanceParameterDescription('string', 'Authorization token endpoint URL (OpenID Connect). Optional.'), required: false, cliName: '-authorizationTokenEndpointURL' },
      { name: 'endpoint', type: 'string', description: enhanceParameterDescription('string', 'Endpoint (OpenID Connect). Optional.'), required: false, cliName: '-endpoint' },
      { name: 'setEndpointsManually', type: 'string', description: enhanceParameterDescription('string', 'Set endpoints manually. Optional.'), required: false, cliName: '-setEndpointsManually' },
      { name: 'spMetadataValidUntil', type: 'string', description: enhanceParameterDescription('string', 'SP metadata valid until. Optional.'), required: false, cliName: '-spMetadataValidUntil' },
    ],
  },
  // Corresponds to 'showSsoService' in CLI Guide 26.18
  {
    toolName: 'misc_show_sso_service',
    description: 'Displays existing SSO Service settings.',
    baseCommand: 'showSsoService',
    category: 'Miscellaneous',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'SSO service name.'), required: true, cliName: '-name' },
    ],
  },
  // Corresponds to 'delSsoService' in CLI Guide 26.19
  {
    toolName: 'misc_del_sso_service',
    description: 'Deletes an existing SSO Service.',
    baseCommand: 'delSsoService',
    category: 'Miscellaneous',
    params: [
      { name: 'name', type: 'string', description: enhanceParameterDescription('string', 'SSO service name.'), required: true, cliName: '-name' },
    ],
  },
  // Chapter 17: Monitoring Events and Sessions
  {
    toolName: 'misc_show_events',
    description: 'Shows a list of events (Audit, Security, Masking events). (CLI Guide 17.1)',
    baseCommand: 'showEvents',
    category: 'Miscellaneous',
    params: [
      { name: 'id', type: 'string', description: enhanceParameterDescription('string', 'Session ID.'), required: true, cliName: '-id' },
      { name: 'type', type: 'string', description: enhanceParameterDescription('string', 'Rule type: audit | security | mask.', 'ENUM'), required: true, cliName: '-type' },
      { name: 'app', type: 'string', description: enhanceParameterDescription('string', 'Client application.'), required: false, cliName: '-app' },
      { name: 'appOpt', type: 'string', description: enhanceParameterDescription('string', 'Options to search for application: Empty | Not Empty | Like | Not Like | Match | Not Match | Any.', 'ENUM'), required: false, cliName: '-appOpt' },
      { name: 'beginDate', type: 'string', description: enhanceParameterDescription('string', 'Events starting date (yyyy-MM-dd HH:mm:ss).', 'DATETIME'), required: false, cliName: '-beginDate' },
      { name: 'data', type: 'string', description: enhanceParameterDescription('string', 'Data.'), required: false, cliName: '-data' },
      { name: 'dataOpt', type: 'string', description: enhanceParameterDescription('string', 'Options to search for data in result set. One of Like, Any.', 'ENUM'), required: false, cliName: '-dataOpt' },
      { name: 'endDate', type: 'string', description: enhanceParameterDescription('string', 'Ending date (yyyy-MM-dd HH:mm:ss).', 'DATETIME'), required: false, cliName: '-endDate' },
      { name: 'instance', type: 'string', description: enhanceParameterDescription('string', 'DB Instance name.'), required: false, cliName: '-instance' },
      { name: 'login', type: 'string', description: enhanceParameterDescription('string', 'DB user name.'), required: false, cliName: '-login' },
      { name: 'loginOpt', type: 'string', description: enhanceParameterDescription('string', 'Options to search for Login: Empty | Not Empty | Like | Not Like | Match | Not Match | Any.', 'ENUM'), required: false, cliName: '-loginOpt' },
      { name: 'queryTypes', type: 'string', description: enhanceParameterDescription('string', 'Semicolon-separated list of query types.', 'LIST'), required: false, cliName: '-queryTypes' },
      { name: 'rule', type: 'string', description: enhanceParameterDescription('string', 'Rule name.'), required: false, cliName: '-rule' },
      { name: 'sql', type: 'string', description: enhanceParameterDescription('string', 'SQL code.'), required: false, cliName: '-sql' },
      { name: 'sqlOpt', type: 'string', description: enhanceParameterDescription('string', 'Options to search for SQL: Empty | Not Empty | Like | Not Like | Match | Not Match | Any.', 'ENUM'), required: false, cliName: '-sqlOpt' },
    ],
  },
  {
    toolName: 'misc_show_event_details', // Renamed from showEvent to be more descriptive
    description: 'Shows detailed information about a certain event. (CLI Guide 17.1)',
    baseCommand: 'showEvent',
    category: 'Miscellaneous',
    params: [
      { name: 'sid', type: 'string', description: enhanceParameterDescription('string', 'Session ID.'), required: true, cliName: '-sid' },
      { name: 'oid', type: 'string', description: enhanceParameterDescription('string', 'Operation ID.'), required: true, cliName: '-oid' },
      { name: 'eid', type: 'string', description: enhanceParameterDescription('string', 'Execution ID.'), required: true, cliName: '-eid' },
    ],
  },
  {
    toolName: 'misc_show_session_details', // Renamed from showSession
    description: 'Displays session details. (CLI Guide 17.2)',
    baseCommand: 'showSession',
    category: 'Miscellaneous',
    params: [
      { name: 'id', type: 'string', description: enhanceParameterDescription('string', 'Session ID.'), required: true, cliName: '-id' },
    ],
  },
  // misc_show_sessions already covers showActiveSessions (17.3) with -a flag
  {
    toolName: 'misc_show_net_devices',
    description: 'Displays a list of all available network devices and their IP addresses. (CLI Guide 17.4)',
    baseCommand: 'showNetDevices',
    category: 'Miscellaneous',
    params: [
      { name: 'dsServer', type: 'string', description: enhanceParameterDescription('string', 'Server name where proxy is opened or sniffer is used.'), required: false, cliName: '-dsServer'},
    ],
  },
];
