import type { INodeProperties } from 'n8n-workflow';

/**
 * Envelope Transfer operations — manage envelope transfer rules
 */
export const envelopeTransferOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['envelopeTransfer'],
    },
  },
  options: [
    {
      name: 'Create Rule',
      value: 'createRule',
      action: 'Create a transfer rule',
      description: 'Create a new envelope transfer rule',
    },
    {
      name: 'Delete Rule',
      value: 'deleteRule',
      action: 'Delete a transfer rule',
      description: 'Delete an envelope transfer rule',
    },
    {
      name: 'Get Rules',
      value: 'getRules',
      action: 'Get transfer rules',
      description: 'Get all envelope transfer rules',
    },
    {
      name: 'Update Rule',
      value: 'updateRule',
      action: 'Update a transfer rule',
      description: 'Update an envelope transfer rule',
    },
  ],
  default: 'getRules',
};

/**
 * Envelope Transfer fields
 */
export const envelopeTransferFields: INodeProperties[] = [
  // Create Rule fields
  {
    displayName: 'From User Email',
    name: 'fromUserEmail',
    type: 'string',
    placeholder: 'name@email.com',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeTransfer'],
        operation: ['createRule'],
      },
    },
    default: '',
    description: 'The email of the user to transfer envelopes from',
  },
  {
    displayName: 'To User Email',
    name: 'toUserEmail',
    type: 'string',
    placeholder: 'name@email.com',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeTransfer'],
        operation: ['createRule'],
      },
    },
    default: '',
    description: 'The email of the user to transfer envelopes to',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['envelopeTransfer'],
        operation: ['createRule'],
      },
    },
    options: [
      {
        displayName: 'Carbon Copy Original Owner',
        name: 'carbonCopyOriginalOwner',
        type: 'boolean',
        default: false,
        description: 'Whether to CC the original owner on transferred envelopes',
      },
    ],
  },

  // Delete / Update fields
  {
    displayName: 'Transfer Rule ID',
    name: 'transferRuleId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeTransfer'],
        operation: ['deleteRule', 'updateRule'],
      },
    },
    default: '',
    description: 'The ID of the transfer rule',
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
        resource: ['envelopeTransfer'],
        operation: ['updateRule'],
      },
    },
    options: [
      {
        displayName: 'Enabled',
        name: 'enabled',
        type: 'boolean',
        default: true,
        description: 'Whether the transfer rule is active',
      },
      {
        displayName: 'To User Email',
        name: 'toUserEmail',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'New target user email',
      },
    ],
  },
];
