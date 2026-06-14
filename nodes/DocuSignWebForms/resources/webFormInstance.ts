import type { INodeProperties } from 'n8n-workflow';

export const webFormInstanceOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['webFormInstance'] } },
  options: [
    { name: 'Create', value: 'create', action: 'Create a web form instance', description: 'Create a signing instance for a web form' },
    { name: 'Get', value: 'get', action: 'Get a web form instance', description: 'Get a specific web form instance' },
  ],
  default: 'create',
};

export const webFormInstanceFields: INodeProperties[] = [
  {
    displayName: 'Form ID',
    name: 'formId',
    type: 'string',
    required: true,
    displayOptions: { show: { resource: ['webFormInstance'], operation: ['create', 'get'] } },
    default: '',
    description: 'The ID of the web form',
  },
  {
    displayName: 'Instance ID',
    name: 'instanceId',
    type: 'string',
    required: true,
    displayOptions: { show: { resource: ['webFormInstance'], operation: ['get'] } },
    default: '',
    description: 'The ID of the web form instance',
  },
  {
    displayName: 'Return URL',
    name: 'returnUrl',
    type: 'string',
    displayOptions: { show: { resource: ['webFormInstance'], operation: ['create'] } },
    default: '',
    placeholder: 'https://yourapp.com/complete',
    description: 'URL to redirect to after form completion',
  },
  {
    displayName: 'Expiration Offset',
    name: 'expirationOffset',
    type: 'number',
    displayOptions: { show: { resource: ['webFormInstance'], operation: ['create'] } },
    default: 3600,
    description: 'Number of seconds until the instance token expires',
  },
];
