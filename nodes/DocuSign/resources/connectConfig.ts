import type { INodeProperties } from 'n8n-workflow';

/**
 * Connect Configuration operations — manage DocuSign Connect webhook configurations
 */
export const connectConfigOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['connectConfig'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create a Connect configuration',
      description: 'Create a new webhook configuration',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete a Connect configuration',
      description: 'Delete a webhook configuration',
    },
    {
      name: 'Get',
      value: 'get',
      action: 'Get a Connect configuration',
      description: 'Get details of a specific webhook configuration',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many Connect configurations',
      description: 'Get all webhook configurations',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update a Connect configuration',
      description: 'Update a webhook configuration',
    },
  ],
  default: 'getAll',
};

/**
 * Connect Configuration fields
 */
export const connectConfigFields: INodeProperties[] = [
  // Create fields
  {
    displayName: 'Configuration Name',
    name: 'name',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['connectConfig'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name for this Connect configuration',
  },
  {
    displayName: 'URL to Publish',
    name: 'urlToPublishTo',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['connectConfig'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The webhook URL to receive events',
  },
  {
    displayName: 'Events',
    name: 'events',
    type: 'multiOptions',
    displayOptions: {
      show: {
        resource: ['connectConfig'],
        operation: ['create'],
      },
    },
    options: [
      { name: 'Envelope Sent', value: 'envelope-sent' },
      { name: 'Envelope Delivered', value: 'envelope-delivered' },
      { name: 'Envelope Completed', value: 'envelope-completed' },
      { name: 'Envelope Declined', value: 'envelope-declined' },
      { name: 'Envelope Voided', value: 'envelope-voided' },
      { name: 'Recipient Sent', value: 'recipient-sent' },
      { name: 'Recipient Delivered', value: 'recipient-delivered' },
      { name: 'Recipient Completed', value: 'recipient-completed' },
      { name: 'Recipient Declined', value: 'recipient-declined' },
    ],
    default: ['envelope-completed'],
    description: 'The events that trigger this webhook',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['connectConfig'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Include Documents',
        name: 'includeDocuments',
        type: 'boolean',
        default: false,
        description: 'Whether to include document content in the webhook payload',
      },
      {
        displayName: 'Include Recipients',
        name: 'includeRecipients',
        type: 'boolean',
        default: true,
        description: 'Whether to include recipient information in the webhook payload',
      },
      {
        displayName: 'Require Acknowledgment',
        name: 'requiresAcknowledgement',
        type: 'boolean',
        default: false,
        description: 'Whether to require HTTP 200 acknowledgment from the webhook URL',
      },
    ],
  },

  // Get / Delete fields
  {
    displayName: 'Connect ID',
    name: 'connectId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['connectConfig'],
        operation: ['get', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the Connect configuration',
  },

  // Update fields
  {
    displayName: 'Connect ID',
    name: 'connectId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['connectConfig'],
        operation: ['update'],
      },
    },
    default: '',
    description: 'The ID of the Connect configuration to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['connectConfig'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Configuration Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New name for the configuration',
      },
      {
        displayName: 'URL to Publish',
        name: 'urlToPublishTo',
        type: 'string',
        default: '',
        description: 'New webhook URL',
      },
      {
        displayName: 'Enabled',
        name: 'allowEnvelopePublish',
        type: 'boolean',
        default: true,
        description: 'Whether to enable this Connect configuration',
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
        resource: ['connectConfig'],
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
        resource: ['connectConfig'],
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
