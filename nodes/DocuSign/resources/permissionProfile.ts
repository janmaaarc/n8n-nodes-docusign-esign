import type { INodeProperties } from 'n8n-workflow';

/**
 * Permission Profile operations — manage account permission profiles
 */
export const permissionProfileOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['permissionProfile'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create a permission profile',
      description: 'Create a new permission profile for account users',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete a permission profile',
      description: 'Delete a permission profile',
    },
    {
      name: 'Get',
      value: 'get',
      action: 'Get a permission profile',
      description: 'Get details of a permission profile',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many permission profiles',
      description: 'Get a list of permission profiles',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update a permission profile',
      description: 'Update a permission profile',
    },
  ],
  default: 'getAll',
};

/**
 * Permission Profile fields
 */
export const permissionProfileFields: INodeProperties[] = [
  // Get / Update / Delete: Profile ID
  {
    displayName: 'Permission Profile ID',
    name: 'permissionProfileId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['permissionProfile'],
        operation: ['get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the permission profile',
  },

  // Create fields
  {
    displayName: 'Profile Name',
    name: 'permissionProfileName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['permissionProfile'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name for the new permission profile',
  },
  {
    displayName: 'Settings',
    name: 'settings',
    type: 'collection',
    placeholder: 'Add Setting',
    default: {},
    displayOptions: {
      show: {
        resource: ['permissionProfile'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Can Send Envelopes',
        name: 'canSendEnvelope',
        type: 'boolean',
        default: true,
        description: 'Whether users can send envelopes',
      },
      {
        displayName: 'Can Manage Templates',
        name: 'canManageTemplates',
        type: 'boolean',
        default: false,
        description: 'Whether users can manage templates',
      },
      {
        displayName: 'Can Manage Account',
        name: 'canManageAccount',
        type: 'boolean',
        default: false,
        description: 'Whether users can manage account settings',
      },
      {
        displayName: 'Can Manage Users',
        name: 'canManageUsers',
        type: 'boolean',
        default: false,
        description: 'Whether users can manage other users',
      },
      {
        displayName: 'Can Manage Signing Groups',
        name: 'canManageSigningGroups',
        type: 'boolean',
        default: false,
        description: 'Whether users can manage signing groups',
      },
      {
        displayName: 'Allow Bulk Send',
        name: 'allowBulkSend',
        type: 'boolean',
        default: false,
        description: 'Whether users can use bulk send',
      },
      {
        displayName: 'Allow API Access',
        name: 'allowApiAccess',
        type: 'boolean',
        default: true,
        description: 'Whether users have API access',
      },
    ],
  },

  // Update fields
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['permissionProfile'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Profile Name',
        name: 'permissionProfileName',
        type: 'string',
        default: '',
        description: 'New name for the permission profile',
      },
      {
        displayName: 'Can Send Envelopes',
        name: 'canSendEnvelope',
        type: 'boolean',
        default: true,
        description: 'Whether users can send envelopes',
      },
      {
        displayName: 'Can Manage Templates',
        name: 'canManageTemplates',
        type: 'boolean',
        default: false,
        description: 'Whether users can manage templates',
      },
      {
        displayName: 'Can Manage Account',
        name: 'canManageAccount',
        type: 'boolean',
        default: false,
        description: 'Whether users can manage account settings',
      },
      {
        displayName: 'Can Manage Users',
        name: 'canManageUsers',
        type: 'boolean',
        default: false,
        description: 'Whether users can manage other users',
      },
    ],
  },

  // Get All: Pagination
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['permissionProfile'],
        operation: ['getAll'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['permissionProfile'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    default: 50,
    description: 'Max number of results to return',
  },
];
