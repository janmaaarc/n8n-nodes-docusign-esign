import type { INodeProperties } from 'n8n-workflow';

/**
 * Account User operations — manage users in the DocuSign account
 */
export const accountUserOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['accountUser'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create a user',
      description: 'Add a new user to the account',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete a user',
      description: 'Remove a user from the account',
    },
    {
      name: 'Get',
      value: 'get',
      action: 'Get a user',
      description: 'Get details of a specific user',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many users',
      description: 'Get all users in the account',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update a user',
      description: 'Update user information',
    },
  ],
  default: 'getAll',
};

/**
 * Account User fields
 */
export const accountUserFields: INodeProperties[] = [
  // Create fields
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    required: true,
    displayOptions: {
      show: {
        resource: ['accountUser'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The email address of the new user',
  },
  {
    displayName: 'User Name',
    name: 'userName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['accountUser'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The full name of the new user',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['accountUser'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Activation Access Code',
        name: 'activationAccessCode',
        type: 'string',
        default: '',
        description: 'The access code for activating the user account',
      },
      {
        displayName: 'Company',
        name: 'company',
        type: 'string',
        default: '',
        description: 'The company name associated with the user',
      },
      {
        displayName: 'Job Title',
        name: 'jobTitle',
        type: 'string',
        default: '',
        description: 'The job title of the user',
      },
    ],
  },

  // Get / Delete fields
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['accountUser'],
        operation: ['get', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the user',
  },

  // Update fields
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['accountUser'],
        operation: ['update'],
      },
    },
    default: '',
    description: 'The ID of the user to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['accountUser'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'New email address for the user',
      },
      {
        displayName: 'User Name',
        name: 'userName',
        type: 'string',
        default: '',
        description: 'New name for the user',
      },
      {
        displayName: 'Company',
        name: 'company',
        type: 'string',
        default: '',
        description: 'New company name for the user',
      },
      {
        displayName: 'Job Title',
        name: 'jobTitle',
        type: 'string',
        default: '',
        description: 'New job title for the user',
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
        resource: ['accountUser'],
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
        resource: ['accountUser'],
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
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['accountUser'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'Active', value: 'Active' },
          { name: 'Closed', value: 'Closed' },
          { name: 'Created', value: 'Created' },
        ],
        default: 'Active',
        description: 'Filter users by status',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Filter users by email substring',
      },
    ],
  },
];
