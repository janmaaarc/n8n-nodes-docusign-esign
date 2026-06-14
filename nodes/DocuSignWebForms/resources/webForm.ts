import type { INodeProperties } from 'n8n-workflow';

export const webFormOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['webForm'] } },
  options: [
    { name: 'Delete', value: 'delete', action: 'Delete a web form', description: 'Delete a web form' },
    { name: 'Get', value: 'get', action: 'Get a web form', description: 'Get a specific web form' },
    { name: 'Get Many', value: 'getAll', action: 'Get many web forms', description: 'List all web forms for the account' },
  ],
  default: 'getAll',
};

export const webFormFields: INodeProperties[] = [
  {
    displayName: 'Form ID',
    name: 'formId',
    type: 'string',
    required: true,
    displayOptions: { show: { resource: ['webForm'], operation: ['get', 'delete'] } },
    default: '',
    description: 'The ID of the web form',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: { show: { resource: ['webForm'], operation: ['getAll'] } },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: { show: { resource: ['webForm'], operation: ['getAll'], returnAll: [false] } },
    typeOptions: { minValue: 1, maxValue: 100 },
    default: 50,
    description: 'Max number of results to return',
  },
];
