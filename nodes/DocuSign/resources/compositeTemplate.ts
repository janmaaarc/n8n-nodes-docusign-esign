import type { INodeProperties } from 'n8n-workflow';

/**
 * Composite Template operations — create envelopes combining server templates with inline overrides
 */
export const compositeTemplateOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['compositeTemplate'],
    },
  },
  options: [
    {
      name: 'Create Envelope',
      value: 'createEnvelope',
      action: 'Create envelope from composite templates',
      description: 'Create an envelope combining server templates with inline recipients and documents',
    },
  ],
  default: 'createEnvelope',
};

/**
 * Composite Template fields
 */
export const compositeTemplateFields: INodeProperties[] = [
  {
    displayName: 'Email Subject',
    name: 'emailSubject',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['compositeTemplate'],
        operation: ['createEnvelope'],
      },
    },
    default: '',
    description: 'The subject line for the envelope email',
  },
  {
    displayName: 'Server Template IDs',
    name: 'serverTemplateIds',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['compositeTemplate'],
        operation: ['createEnvelope'],
      },
    },
    default: '',
    description: 'Comma-separated list of template IDs to combine',
  },
  {
    displayName: 'Signer Email',
    name: 'signerEmail',
    type: 'string',
    placeholder: 'name@email.com',
    required: true,
    displayOptions: {
      show: {
        resource: ['compositeTemplate'],
        operation: ['createEnvelope'],
      },
    },
    default: '',
    description: 'The email address of the signer',
  },
  {
    displayName: 'Signer Name',
    name: 'signerName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['compositeTemplate'],
        operation: ['createEnvelope'],
      },
    },
    default: '',
    description: 'The name of the signer',
  },
  {
    displayName: 'Role Name',
    name: 'roleName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['compositeTemplate'],
        operation: ['createEnvelope'],
      },
    },
    default: 'Signer',
    description: 'The role name matching the template role',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['compositeTemplate'],
        operation: ['createEnvelope'],
      },
    },
    options: [
      {
        displayName: 'Send Immediately',
        name: 'sendImmediately',
        type: 'boolean',
        default: true,
        description: 'Whether to send the envelope immediately or save as draft',
      },
      {
        displayName: 'Email Blurb',
        name: 'emailBlurb',
        type: 'string',
        default: '',
        description: 'Optional email body text',
      },
    ],
  },
];
