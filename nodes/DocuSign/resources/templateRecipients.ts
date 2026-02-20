import type { INodeProperties } from 'n8n-workflow';

/**
 * Template Recipients operations — manage recipients on templates
 */
export const templateRecipientsOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['templateRecipients'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Add a template recipient',
      description: 'Add a new recipient role to a template',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete a template recipient',
      description: 'Remove a recipient from a template',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many template recipients',
      description: 'Get all recipients for a template',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update a template recipient',
      description: 'Update recipient details on a template',
    },
  ],
  default: 'getAll',
};

/**
 * Template Recipients fields
 */
export const templateRecipientsFields: INodeProperties[] = [
  // Shared Template ID
  {
    displayName: 'Template ID',
    name: 'templateId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateRecipients'],
        operation: ['create', 'delete', 'getAll', 'update'],
      },
    },
    default: '',
    description: 'The ID of the template',
  },

  // Create fields
  {
    displayName: 'Role Name',
    name: 'roleName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateRecipients'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The role name for the recipient',
  },
  {
    displayName: 'Recipient Type',
    name: 'recipientType',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['templateRecipients'],
        operation: ['create'],
      },
    },
    options: [
      { name: 'Signer', value: 'signer' },
      { name: 'Carbon Copy', value: 'cc' },
      { name: 'Certified Delivery', value: 'certifiedDelivery' },
    ],
    default: 'signer',
    description: 'The type of recipient',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['templateRecipients'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Default Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Default email for this recipient role',
      },
      {
        displayName: 'Default Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Default name for this recipient role',
      },
      {
        displayName: 'Routing Order',
        name: 'routingOrder',
        type: 'number',
        default: 1,
        description: 'The order in which this recipient receives the envelope',
      },
    ],
  },

  // Delete / Update fields — recipient ID
  {
    displayName: 'Recipient ID',
    name: 'recipientId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['templateRecipients'],
        operation: ['delete', 'update'],
      },
    },
    default: '',
    description: 'The ID of the recipient',
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
        resource: ['templateRecipients'],
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
        description: 'New email for the recipient',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New name for the recipient',
      },
      {
        displayName: 'Role Name',
        name: 'roleName',
        type: 'string',
        default: '',
        description: 'New role name for the recipient',
      },
    ],
  },
];
