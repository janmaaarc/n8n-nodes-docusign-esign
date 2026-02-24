import type { INodeProperties } from 'n8n-workflow';

/**
 * Custom Tab operations — manage reusable tab (field) definitions
 */
export const customTabOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['customTab'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create a custom tab',
      description: 'Create a reusable custom tab definition',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete a custom tab',
      description: 'Delete a custom tab definition',
    },
    {
      name: 'Get',
      value: 'get',
      action: 'Get a custom tab',
      description: 'Get details of a custom tab definition',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many custom tabs',
      description: 'Get a list of custom tab definitions',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update a custom tab',
      description: 'Update a custom tab definition',
    },
  ],
  default: 'getAll',
};

/**
 * Custom Tab fields
 */
export const customTabFields: INodeProperties[] = [
  // Get / Update / Delete: Custom Tab ID
  {
    displayName: 'Custom Tab ID',
    name: 'customTabId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['customTab'],
        operation: ['get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the custom tab definition',
  },

  // Create fields
  {
    displayName: 'Tab Label',
    name: 'tabLabel',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['customTab'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The label for the custom tab',
  },
  {
    displayName: 'Tab Type',
    name: 'type',
    type: 'options',
    required: true,
    displayOptions: {
      show: {
        resource: ['customTab'],
        operation: ['create'],
      },
    },
    options: [
      { name: 'Text', value: 'text', description: 'Free-text input field' },
      { name: 'Number', value: 'number', description: 'Numeric input field' },
      { name: 'Date', value: 'date', description: 'Date input field' },
      { name: 'List', value: 'list', description: 'Dropdown list' },
      { name: 'Checkbox', value: 'checkbox', description: 'Checkbox field' },
      { name: 'Radio Group', value: 'radio', description: 'Radio button group' },
      { name: 'Note', value: 'note', description: 'Read-only text note' },
    ],
    default: 'text',
    description: 'The type of tab to create',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['customTab'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Anchor String',
        name: 'anchor',
        type: 'string',
        default: '',
        description: 'Anchor text to position the tab in a document',
      },
      {
        displayName: 'Font',
        name: 'font',
        type: 'options',
        options: [
          { name: 'Default', value: 'default' },
          { name: 'Arial', value: 'arial' },
          { name: 'Courier', value: 'courier' },
          { name: 'Times New Roman', value: 'timesNewRoman' },
        ],
        default: 'default',
        description: 'Font for the tab content',
      },
      {
        displayName: 'Bold',
        name: 'bold',
        type: 'boolean',
        default: false,
        description: 'Whether the text is bold',
      },
      {
        displayName: 'Width',
        name: 'width',
        type: 'number',
        default: 0,
        description: 'Width of the tab in pixels',
        typeOptions: { minValue: 0 },
      },
      {
        displayName: 'Height',
        name: 'height',
        type: 'number',
        default: 0,
        description: 'Height of the tab in pixels',
        typeOptions: { minValue: 0 },
      },
      {
        displayName: 'Required',
        name: 'required',
        type: 'boolean',
        default: false,
        description: 'Whether the tab is required',
      },
      {
        displayName: 'Locked',
        name: 'locked',
        type: 'boolean',
        default: false,
        description: 'Whether the tab is locked and cannot be changed by recipients',
      },
    ],
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
        resource: ['customTab'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Tab Label',
        name: 'tabLabel',
        type: 'string',
        default: '',
        description: 'New label for the custom tab',
      },
      {
        displayName: 'Font',
        name: 'font',
        type: 'string',
        default: '',
        description: 'Font for the tab content',
      },
      {
        displayName: 'Bold',
        name: 'bold',
        type: 'boolean',
        default: false,
        description: 'Whether the text is bold',
      },
      {
        displayName: 'Required',
        name: 'required',
        type: 'boolean',
        default: false,
        description: 'Whether the tab is required',
      },
      {
        displayName: 'Locked',
        name: 'locked',
        type: 'boolean',
        default: false,
        description: 'Whether the tab is locked',
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
        resource: ['customTab'],
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
        resource: ['customTab'],
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
