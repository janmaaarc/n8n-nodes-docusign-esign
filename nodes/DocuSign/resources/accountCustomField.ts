import type { INodeProperties } from 'n8n-workflow';

/**
 * Account Custom Field operations — manage account-level custom field definitions
 */
export const accountCustomFieldOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['accountCustomField'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create an account custom field',
      description: 'Create an account-level custom field definition',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete an account custom field',
      description: 'Delete an account-level custom field',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many account custom fields',
      description: 'Get all account-level custom field definitions',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update an account custom field',
      description: 'Update an account-level custom field',
    },
  ],
  default: 'getAll',
};

/**
 * Account Custom Field fields
 */
export const accountCustomFieldFields: INodeProperties[] = [
  // Create fields
  {
    displayName: 'Field Name',
    name: 'fieldName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['accountCustomField'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the custom field',
  },
  {
    displayName: 'Field Type',
    name: 'fieldType',
    type: 'options',
    required: true,
    displayOptions: {
      show: {
        resource: ['accountCustomField'],
        operation: ['create'],
      },
    },
    options: [
      {
        name: 'Text',
        value: 'text',
        description: 'Free-text field',
      },
      {
        name: 'List',
        value: 'list',
        description: 'Dropdown list field with predefined values',
      },
    ],
    default: 'text',
    description: 'The type of custom field',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['accountCustomField'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Required',
        name: 'required',
        type: 'boolean',
        default: false,
        description: 'Whether the field is required on every envelope',
      },
      {
        displayName: 'Show in UI',
        name: 'show',
        type: 'boolean',
        default: true,
        description: 'Whether the field is visible in the DocuSign UI',
      },
      {
        displayName: 'List Items',
        name: 'listItems',
        type: 'string',
        default: '',
        description: 'Comma-separated list of values (for list type fields)',
      },
    ],
  },

  // Update / Delete: Field ID
  {
    displayName: 'Field ID',
    name: 'fieldId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['accountCustomField'],
        operation: ['update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the custom field',
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
        resource: ['accountCustomField'],
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
        displayName: 'Required',
        name: 'required',
        type: 'boolean',
        default: false,
        description: 'Whether the field is required',
      },
      {
        displayName: 'Show in UI',
        name: 'show',
        type: 'boolean',
        default: true,
        description: 'Whether the field is visible in the UI',
      },
      {
        displayName: 'List Items',
        name: 'listItems',
        type: 'string',
        default: '',
        description: 'Comma-separated list of values (for list type fields)',
      },
    ],
  },
];
