import type { INodeProperties } from 'n8n-workflow';

export const clickwrapOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['clickwrap'] } },
  options: [
    { name: 'Create', value: 'create', action: 'Create a clickwrap', description: 'Create a new clickwrap agreement' },
    { name: 'Delete', value: 'delete', action: 'Delete a clickwrap', description: 'Delete a clickwrap' },
    { name: 'Get', value: 'get', action: 'Get a clickwrap', description: 'Get a specific clickwrap' },
    { name: 'Get Many', value: 'getAll', action: 'Get many clickwraps', description: 'List all clickwraps for the account' },
    { name: 'Update', value: 'update', action: 'Update a clickwrap', description: 'Update a clickwrap' },
  ],
  default: 'getAll',
};

export const clickwrapFields: INodeProperties[] = [
  {
    displayName: 'Clickwrap Name',
    name: 'clickwrapName',
    type: 'string',
    required: true,
    displayOptions: { show: { resource: ['clickwrap'], operation: ['create'] } },
    default: '',
    description: 'The name of the clickwrap',
  },
  {
    displayName: 'Clickwrap ID',
    name: 'clickwrapId',
    type: 'string',
    required: true,
    displayOptions: { show: { resource: ['clickwrap'], operation: ['get', 'delete', 'update'] } },
    default: '',
    description: 'The ID of the clickwrap',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: { show: { resource: ['clickwrap'], operation: ['update'] } },
    options: [
      { displayName: 'Clickwrap Name', name: 'clickwrapName', type: 'string', default: '', description: 'New name for the clickwrap' },
      { displayName: 'Status', name: 'status', type: 'options', options: [{ name: 'Active', value: 'active' }, { name: 'Inactive', value: 'inactive' }], default: 'active', description: 'Status of the clickwrap' },
    ],
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: { show: { resource: ['clickwrap'], operation: ['getAll'] } },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: { show: { resource: ['clickwrap'], operation: ['getAll'], returnAll: [false] } },
    typeOptions: { minValue: 1, maxValue: 100 },
    default: 50,
    description: 'Max number of results to return',
  },
];
