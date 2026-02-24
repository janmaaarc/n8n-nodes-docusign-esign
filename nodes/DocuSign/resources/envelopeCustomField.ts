import type { INodeProperties } from 'n8n-workflow';

/**
 * Envelope Custom Field operations — manage custom metadata fields on envelopes
 */
export const envelopeCustomFieldOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['envelopeCustomField'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create an envelope custom field',
      description: 'Add a custom metadata field to an envelope',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete an envelope custom field',
      description: 'Remove a custom field from an envelope',
    },
    {
      name: 'Get',
      value: 'get',
      action: 'Get envelope custom fields',
      description: 'Get all custom fields on an envelope',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update an envelope custom field',
      description: 'Update a custom field on an envelope',
    },
  ],
  default: 'get',
};

/**
 * Envelope Custom Field fields
 */
export const envelopeCustomFieldFields: INodeProperties[] = [
  // Shared: Envelope ID
  {
    displayName: 'Envelope ID',
    name: 'envelopeId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeCustomField'],
        operation: ['create', 'get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the envelope',
  },

  // Create fields
  {
    displayName: 'Field Name',
    name: 'fieldName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeCustomField'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the custom field',
  },
  {
    displayName: 'Field Value',
    name: 'fieldValue',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeCustomField'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The value of the custom field',
  },
  {
    displayName: 'Show in UI',
    name: 'show',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['envelopeCustomField'],
        operation: ['create'],
      },
    },
    default: true,
    description: 'Whether the field is visible in the DocuSign UI',
  },
  {
    displayName: 'Required',
    name: 'required',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['envelopeCustomField'],
        operation: ['create'],
      },
    },
    default: false,
    description: 'Whether the field is required',
  },

  // Update / Delete: Field ID
  {
    displayName: 'Field ID',
    name: 'fieldId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeCustomField'],
        operation: ['update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the custom field to update or delete',
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
        resource: ['envelopeCustomField'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Field Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New name for the custom field',
      },
      {
        displayName: 'Field Value',
        name: 'value',
        type: 'string',
        default: '',
        description: 'New value for the custom field',
      },
      {
        displayName: 'Show in UI',
        name: 'show',
        type: 'boolean',
        default: true,
        description: 'Whether the field is visible in the DocuSign UI',
      },
    ],
  },
];
