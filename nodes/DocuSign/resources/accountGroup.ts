import type { INodeProperties } from 'n8n-workflow';

/**
 * Account Group operations — manage permission groups
 */
export const accountGroupOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['accountGroup'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create a group',
      description: 'Create a new permission group',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete a group',
      description: 'Delete a permission group',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many groups',
      description: 'Get all permission groups in the account',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update a group',
      description: 'Update a permission group',
    },
  ],
  default: 'getAll',
};

/**
 * Account Group fields
 */
export const accountGroupFields: INodeProperties[] = [
  // Create fields
  {
    displayName: 'Group Name',
    name: 'groupName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['accountGroup'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the permission group',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['accountGroup'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Permission Profile ID',
        name: 'permissionProfileId',
        type: 'string',
        default: '',
        description: 'The ID of the permission profile to assign to the group',
      },
    ],
  },

  // Delete fields
  {
    displayName: 'Group ID',
    name: 'groupId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['accountGroup'],
        operation: ['delete'],
      },
    },
    default: '',
    description: 'The ID of the group to delete',
  },

  // Update fields
  {
    displayName: 'Group ID',
    name: 'groupId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['accountGroup'],
        operation: ['update'],
      },
    },
    default: '',
    description: 'The ID of the group to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['accountGroup'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Group Name',
        name: 'groupName',
        type: 'string',
        default: '',
        description: 'New name for the group',
      },
      {
        displayName: 'Permission Profile ID',
        name: 'permissionProfileId',
        type: 'string',
        default: '',
        description: 'New permission profile to assign to the group',
      },
    ],
  },

  // Get All fields
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['accountGroup'],
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
        resource: ['accountGroup'],
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
