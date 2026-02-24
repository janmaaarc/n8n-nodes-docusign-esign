import type { INodeProperties } from 'n8n-workflow';

/**
 * Contact operations — manage DocuSign address book contacts
 */
export const contactOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['contact'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create a contact',
      description: 'Create a new contact in the address book',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete a contact',
      description: 'Delete a contact from the address book',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many contacts',
      description: 'Get a list of contacts from the address book',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update a contact',
      description: 'Update a contact in the address book',
    },
  ],
  default: 'getAll',
};

/**
 * Contact fields
 */
export const contactFields: INodeProperties[] = [
  // Create fields
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    required: true,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The contact email address',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The contact display name',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Company',
        name: 'organization',
        type: 'string',
        default: '',
        description: 'The company or organization name',
      },
      {
        displayName: 'Shared',
        name: 'shared',
        type: 'boolean',
        default: false,
        description: 'Whether the contact is shared with other account users',
      },
    ],
  },

  // Update / Delete: Contact ID
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the contact',
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
        resource: ['contact'],
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
        description: 'New email address for the contact',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New display name for the contact',
      },
      {
        displayName: 'Company',
        name: 'organization',
        type: 'string',
        default: '',
        description: 'New company or organization name',
      },
      {
        displayName: 'Shared',
        name: 'shared',
        type: 'boolean',
        default: false,
        description: 'Whether the contact is shared with other account users',
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
        resource: ['contact'],
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
        resource: ['contact'],
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
