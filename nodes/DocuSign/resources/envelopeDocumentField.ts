import type { INodeProperties } from 'n8n-workflow';

/**
 * Envelope Document Field operations — manage custom fields on individual documents
 */
export const envelopeDocumentFieldOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['envelopeDocumentField'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create document fields',
      description: 'Add custom name-value fields to a document',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete document fields',
      description: 'Remove custom fields from a document',
    },
    {
      name: 'Get',
      value: 'get',
      action: 'Get document fields',
      description: 'Get all custom fields on a document',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update document fields',
      description: 'Update custom fields on a document',
    },
  ],
  default: 'get',
};

/**
 * Envelope Document Field fields
 */
export const envelopeDocumentFieldFields: INodeProperties[] = [
  // Shared: Envelope ID
  {
    displayName: 'Envelope ID',
    name: 'envelopeId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeDocumentField'],
        operation: ['get', 'create', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the envelope',
  },
  // Shared: Document ID
  {
    displayName: 'Document ID',
    name: 'documentId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeDocumentField'],
        operation: ['get', 'create', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the document within the envelope',
  },

  // Create / Update: Fields collection
  {
    displayName: 'Document Fields',
    name: 'documentFields',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    displayOptions: {
      show: {
        resource: ['envelopeDocumentField'],
        operation: ['create', 'update'],
      },
    },
    default: {},
    options: [
      {
        displayName: 'Field',
        name: 'field',
        values: [
          {
            displayName: 'Name',
            name: 'name',
            type: 'string',
            default: '',
            description: 'The name of the field',
          },
          {
            displayName: 'Value',
            name: 'value',
            type: 'string',
            default: '',
            description: 'The value of the field',
          },
        ],
      },
    ],
    description: 'Custom name-value fields to set on the document',
  },
];
