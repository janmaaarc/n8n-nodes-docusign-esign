import type { INodeProperties } from 'n8n-workflow';

export const adminAccountOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['adminAccount'] } },
  options: [
    { name: 'Get Many', value: 'getAll', action: 'Get many accounts', description: 'List accounts in an organization' },
  ],
  default: 'getAll',
};

export const adminAccountFields: INodeProperties[] = [
  {
    displayName: 'Organization ID',
    name: 'orgIdForAccounts',
    type: 'string',
    required: true,
    displayOptions: { show: { resource: ['adminAccount'], operation: ['getAll'] } },
    default: '',
    description: 'The ID of the organization to list accounts for',
  },
];
