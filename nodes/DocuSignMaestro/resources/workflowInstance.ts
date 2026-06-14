import type { INodeProperties } from 'n8n-workflow';

export const workflowInstanceOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['maestroInstance'] } },
  options: [
    { name: 'Cancel', value: 'cancel', action: 'Cancel a workflow instance', description: 'Cancel a running workflow instance' },
    { name: 'Get', value: 'get', action: 'Get a workflow instance', description: 'Get details of a workflow instance' },
    { name: 'Get Many', value: 'getAll', action: 'Get many workflow instances', description: 'List all instances of a workflow' },
  ],
  default: 'getAll',
};

export const workflowInstanceFields: INodeProperties[] = [
  {
    displayName: 'Workflow ID',
    name: 'workflowId',
    type: 'string',
    required: true,
    displayOptions: { show: { resource: ['maestroInstance'], operation: ['get', 'getAll', 'cancel'] } },
    default: '',
    description: 'The ID of the Maestro workflow',
  },
  {
    displayName: 'Instance ID',
    name: 'instanceId',
    type: 'string',
    required: true,
    displayOptions: { show: { resource: ['maestroInstance'], operation: ['get', 'cancel'] } },
    default: '',
    description: 'The ID of the workflow instance',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: { show: { resource: ['maestroInstance'], operation: ['getAll'] } },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: { show: { resource: ['maestroInstance'], operation: ['getAll'], returnAll: [false] } },
    typeOptions: { minValue: 1, maxValue: 100 },
    default: 50,
    description: 'Max number of results to return',
  },
];
