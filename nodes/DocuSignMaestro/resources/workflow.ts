import type { INodeProperties } from 'n8n-workflow';

export const workflowOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['maestroWorkflow'] } },
  options: [
    { name: 'Get', value: 'get', action: 'Get a workflow', description: 'Get a specific Maestro workflow' },
    { name: 'Get Many', value: 'getAll', action: 'Get many workflows', description: 'List all Maestro workflows' },
    { name: 'Trigger', value: 'trigger', action: 'Trigger a workflow', description: 'Start a new workflow instance' },
  ],
  default: 'getAll',
};

export const workflowFields: INodeProperties[] = [
  {
    displayName: 'Workflow ID',
    name: 'workflowId',
    type: 'string',
    required: true,
    displayOptions: { show: { resource: ['maestroWorkflow'], operation: ['get', 'trigger'] } },
    default: '',
    description: 'The ID of the Maestro workflow',
  },
  {
    displayName: 'Instance Data',
    name: 'instanceData',
    type: 'json',
    displayOptions: { show: { resource: ['maestroWorkflow'], operation: ['trigger'] } },
    default: '{}',
    description: 'JSON data to pass as input to the workflow instance',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: { show: { resource: ['maestroWorkflow'], operation: ['getAll'] } },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: { show: { resource: ['maestroWorkflow'], operation: ['getAll'], returnAll: [false] } },
    typeOptions: { minValue: 1, maxValue: 100 },
    default: 50,
    description: 'Max number of results to return',
  },
];
