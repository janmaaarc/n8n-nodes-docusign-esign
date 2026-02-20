import type { INodeProperties } from 'n8n-workflow';

/**
 * Recipient Tabs operations — get and update tabs for envelope recipients
 */
export const recipientTabsOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['recipientTabs'],
    },
  },
  options: [
    {
      name: 'Get',
      value: 'get',
      action: 'Get recipient tabs',
      description: 'Get all tabs for a specific recipient in an envelope',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update recipient tabs',
      description: 'Update tab values for a specific recipient',
    },
  ],
  default: 'get',
};

/**
 * Recipient Tabs fields
 */
export const recipientTabsFields: INodeProperties[] = [
  // Shared fields for get and update
  {
    displayName: 'Envelope ID',
    name: 'envelopeId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['recipientTabs'],
        operation: ['get', 'update'],
      },
    },
    default: '',
    description: 'The ID of the envelope',
  },
  {
    displayName: 'Recipient ID',
    name: 'recipientId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['recipientTabs'],
        operation: ['get', 'update'],
      },
    },
    default: '',
    description: 'The ID of the recipient',
  },

  // Update-specific fields
  {
    displayName: 'Tabs',
    name: 'tabs',
    type: 'collection',
    placeholder: 'Add Tab',
    default: {},
    displayOptions: {
      show: {
        resource: ['recipientTabs'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Text Tabs',
        name: 'textTabs',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        options: [
          {
            displayName: 'Tab',
            name: 'tab',
            values: [
              {
                displayName: 'Tab Label',
                name: 'tabLabel',
                type: 'string',
                default: '',
                description: 'The label identifying the tab to update',
              },
              {
                displayName: 'Value',
                name: 'value',
                type: 'string',
                default: '',
                description: 'The new value for the tab',
              },
            ],
          },
        ],
      },
      {
        displayName: 'Checkbox Tabs',
        name: 'checkboxTabs',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        options: [
          {
            displayName: 'Tab',
            name: 'tab',
            values: [
              {
                displayName: 'Tab Label',
                name: 'tabLabel',
                type: 'string',
                default: '',
                description: 'The label identifying the checkbox tab',
              },
              {
                displayName: 'Selected',
                name: 'selected',
                type: 'boolean',
                default: false,
                description: 'Whether the checkbox is selected',
              },
            ],
          },
        ],
      },
    ],
  },
];
