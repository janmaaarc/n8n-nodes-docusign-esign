import type { INodeProperties } from 'n8n-workflow';

export const eventStreamOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['eventStream'] } },
  options: [
    { name: 'Get Events', value: 'get', action: 'Get monitor events', description: 'Retrieve activity events from the Monitor stream' },
    { name: 'List Datasets', value: 'listDatasets', action: 'List datasets', description: 'List available Monitor datasets' },
  ],
  default: 'get',
};

export const eventStreamFields: INodeProperties[] = [
  {
    displayName: 'Cursor',
    name: 'cursor',
    type: 'string',
    displayOptions: { show: { resource: ['eventStream'], operation: ['get'] } },
    default: '',
    description: 'Cursor from a previous response for pagination. Leave empty to start from the beginning.',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: { show: { resource: ['eventStream'], operation: ['get'] } },
    typeOptions: { minValue: 1, maxValue: 2000 },
    default: 100,
    description: 'Number of events to return (max 2000 per call)',
  },
];
