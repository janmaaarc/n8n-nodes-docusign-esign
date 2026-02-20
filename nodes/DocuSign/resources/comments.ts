import type { INodeProperties } from 'n8n-workflow';

/**
 * Comments API operations — manage comments on envelopes
 */
export const commentsOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['comments'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create a comment',
      description: 'Add a comment to an envelope',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many comments',
      description: 'Get all comments for an envelope',
    },
  ],
  default: 'getAll',
};

/**
 * Comments fields
 */
export const commentsFields: INodeProperties[] = [
  // Shared envelope ID
  {
    displayName: 'Envelope ID',
    name: 'envelopeId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['comments'],
        operation: ['create', 'getAll'],
      },
    },
    default: '',
    description: 'The ID of the envelope',
  },

  // Create fields
  {
    displayName: 'Comment Text',
    name: 'commentText',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['comments'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The text content of the comment (max 4000 characters)',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['comments'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Thread ID',
        name: 'threadId',
        type: 'string',
        default: '',
        description: 'The thread ID to reply to an existing comment thread',
      },
    ],
  },

  // Get Many fields
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['comments'],
        operation: ['getAll'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['comments'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    default: 50,
    description: 'Max number of results to return',
  },
];
