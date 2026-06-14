import type { INodeProperties } from 'n8n-workflow';

export const agreementOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['clickAgreement'] } },
  options: [
    { name: 'Get Many', value: 'getAll', action: 'Get many agreements', description: 'List all agreements for a clickwrap' },
  ],
  default: 'getAll',
};

export const agreementFields: INodeProperties[] = [
  {
    displayName: 'Clickwrap ID',
    name: 'clickwrapId',
    type: 'string',
    required: true,
    displayOptions: { show: { resource: ['clickAgreement'], operation: ['getAll'] } },
    default: '',
    description: 'The ID of the clickwrap to list agreements for',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: { show: { resource: ['clickAgreement'], operation: ['getAll'] } },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: { show: { resource: ['clickAgreement'], operation: ['getAll'], returnAll: [false] } },
    typeOptions: { minValue: 1, maxValue: 100 },
    default: 50,
    description: 'Max number of results to return',
  },
];
