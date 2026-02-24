import type { INodeProperties } from 'n8n-workflow';

/**
 * Connect Event operations — monitor and manage webhook delivery events
 */
export const connectEventOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['connectEvent'],
    },
  },
  options: [
    {
      name: 'Get Failures',
      value: 'getFailures',
      action: 'Get failed deliveries',
      description: 'Get a list of failed Connect webhook deliveries',
    },
    {
      name: 'Get Logs',
      value: 'getLogs',
      action: 'Get delivery logs',
      description: 'Get Connect webhook delivery logs',
    },
    {
      name: 'Retry',
      value: 'retry',
      action: 'Retry a failed delivery',
      description: 'Retry a failed Connect webhook delivery',
    },
  ],
  default: 'getFailures',
};

/**
 * Connect Event fields
 */
export const connectEventFields: INodeProperties[] = [
  // Retry: Failure ID
  {
    displayName: 'Failure ID',
    name: 'failureId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['connectEvent'],
        operation: ['retry'],
      },
    },
    default: '',
    description: 'The ID of the failed delivery to retry',
  },

  // Get Failures: Pagination
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['connectEvent'],
        operation: ['getFailures', 'getLogs'],
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
        resource: ['connectEvent'],
        operation: ['getFailures', 'getLogs'],
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

  // Get Logs: Filters
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['connectEvent'],
        operation: ['getLogs'],
      },
    },
    options: [
      {
        displayName: 'From Date',
        name: 'fromDate',
        type: 'string',
        default: '',
        description: 'Start date for the log query (ISO 8601 format)',
      },
      {
        displayName: 'To Date',
        name: 'toDate',
        type: 'string',
        default: '',
        description: 'End date for the log query (ISO 8601 format)',
      },
    ],
  },
];
