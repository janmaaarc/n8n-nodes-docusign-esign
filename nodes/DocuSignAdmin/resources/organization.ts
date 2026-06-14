import type { INodeProperties } from 'n8n-workflow';

export const adminOrgOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['adminOrganization'] } },
  options: [
    { name: 'Get', value: 'get', action: 'Get an organization', description: 'Get a specific organization' },
    { name: 'Get Many', value: 'getAll', action: 'Get many organizations', description: 'List all organizations accessible to your account' },
  ],
  default: 'getAll',
};

export const adminOrgFields: INodeProperties[] = [
  {
    displayName: 'Organization ID',
    name: 'adminOrgId',
    type: 'string',
    required: true,
    displayOptions: { show: { resource: ['adminOrganization'], operation: ['get'] } },
    default: '',
    description: 'The ID of the organization',
  },
];
