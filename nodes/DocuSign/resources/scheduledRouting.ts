import type { INodeProperties } from 'n8n-workflow';

/**
 * Scheduled Routing operations — manage delayed/scheduled envelope delivery
 */
export const scheduledRoutingOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['scheduledRouting'],
    },
  },
  options: [
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete scheduled routing',
      description: 'Remove scheduled routing from an envelope',
    },
    {
      name: 'Get',
      value: 'get',
      action: 'Get scheduled routing',
      description: 'Get the workflow/routing rules for an envelope',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update scheduled routing',
      description: 'Set or update scheduled send date for an envelope',
    },
  ],
  default: 'get',
};

/**
 * Scheduled Routing fields
 */
export const scheduledRoutingFields: INodeProperties[] = [
  // Shared Envelope ID
  {
    displayName: 'Envelope ID',
    name: 'envelopeId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['scheduledRouting'],
        operation: ['get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the envelope',
  },

  // Update fields
  {
    displayName: 'Scheduled Send Date',
    name: 'scheduledSendDate',
    type: 'dateTime',
    required: true,
    displayOptions: {
      show: {
        resource: ['scheduledRouting'],
        operation: ['update'],
      },
    },
    default: '',
    description: 'The ISO 8601 date/time when the envelope should be sent',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['scheduledRouting'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Resume Date',
        name: 'resumeDate',
        type: 'dateTime',
        default: '',
        description: 'The date when routing should resume after a delay',
      },
    ],
  },
];
