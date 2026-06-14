import type { INodeProperties } from 'n8n-workflow';

export const organizationOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['organization'],
    },
  },
  options: [
    {
      name: 'Get',
      value: 'get',
      action: 'Get an organization',
      description: 'Get details of a specific organization',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many organizations',
      description: 'Get a list of organizations linked to the account',
    },
  ],
  default: 'getAll',
};

export const organizationFields: INodeProperties[] = [
  {
    displayName: 'Organization ID',
    name: 'organizationId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['organization'],
        operation: ['get'],
      },
    },
    default: '',
    description: 'The ID of the organization',
  },
];
