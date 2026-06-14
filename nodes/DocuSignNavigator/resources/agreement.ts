import type { INodeProperties } from 'n8n-workflow';

export const agreementOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['navigatorAgreement'] } },
  options: [
    { name: 'Get', value: 'get', action: 'Get an agreement', description: 'Get AI-extracted data from a specific agreement' },
    { name: 'Get Many', value: 'getAll', action: 'Get many agreements', description: 'Search and list Navigator agreements' },
    { name: 'Get Provisions', value: 'getProvisions', action: 'Get agreement provisions', description: 'Get AI-extracted provisions from an agreement' },
  ],
  default: 'getAll',
};

export const agreementFields: INodeProperties[] = [
  {
    displayName: 'Agreement ID',
    name: 'agreementId',
    type: 'string',
    required: true,
    displayOptions: { show: { resource: ['navigatorAgreement'], operation: ['get', 'getProvisions'] } },
    default: '',
    description: 'The ID of the Navigator agreement',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: { show: { resource: ['navigatorAgreement'], operation: ['getAll'] } },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: { show: { resource: ['navigatorAgreement'], operation: ['getAll'], returnAll: [false] } },
    typeOptions: { minValue: 1, maxValue: 100 },
    default: 50,
    description: 'Max number of results to return',
  },
  {
    displayName: 'Search Options',
    name: 'searchOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { resource: ['navigatorAgreement'], operation: ['getAll'] } },
    options: [
      { displayName: 'Search Text', name: 'searchText', type: 'string', default: '', description: 'Text to search for in agreements' },
      { displayName: 'Agreement Type', name: 'agreementType', type: 'string', default: '', description: 'Filter by agreement type (e.g., "nda", "employment")' },
    ],
  },
];
