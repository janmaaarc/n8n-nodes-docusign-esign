import type { INodeProperties } from 'n8n-workflow';

/**
 * Chunked Upload operations — upload large documents in chunks
 */
export const chunkedUploadOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['chunkedUpload'],
    },
  },
  options: [
    {
      name: 'Commit',
      value: 'commit',
      action: 'Commit a chunked upload',
      description: 'Finalize a chunked upload session',
    },
    {
      name: 'Initiate',
      value: 'initiate',
      action: 'Initiate a chunked upload',
      description: 'Start a new chunked upload session for a large document',
    },
    {
      name: 'Upload Chunk',
      value: 'uploadChunk',
      action: 'Upload a chunk',
      description: 'Upload a data chunk to an active upload session',
    },
  ],
  default: 'initiate',
};

/**
 * Chunked Upload fields
 */
export const chunkedUploadFields: INodeProperties[] = [
  // Initiate fields
  {
    displayName: 'Content Type',
    name: 'contentType',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['chunkedUpload'],
        operation: ['initiate'],
      },
    },
    default: 'application/pdf',
    description: 'The MIME type of the document being uploaded',
  },
  {
    displayName: 'Total Size (Bytes)',
    name: 'totalSize',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        resource: ['chunkedUpload'],
        operation: ['initiate'],
      },
    },
    default: 0,
    description: 'The total size of the document in bytes',
  },

  // Shared Session ID
  {
    displayName: 'Chunked Upload ID',
    name: 'chunkedUploadId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['chunkedUpload'],
        operation: ['uploadChunk', 'commit'],
      },
    },
    default: '',
    description: 'The chunked upload session ID returned from initiate',
  },

  // Upload Chunk fields
  {
    displayName: 'Chunk Part',
    name: 'chunkPart',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        resource: ['chunkedUpload'],
        operation: ['uploadChunk'],
      },
    },
    typeOptions: {
      minValue: 0,
    },
    default: 0,
    description: 'The zero-based index of the chunk being uploaded',
  },
  {
    displayName: 'Chunk Data (Base64)',
    name: 'chunkData',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['chunkedUpload'],
        operation: ['uploadChunk'],
      },
    },
    default: '',
    description: 'The base64-encoded chunk data',
  },

  // Commit fields
  {
    displayName: 'Action',
    name: 'action',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['chunkedUpload'],
        operation: ['commit'],
      },
    },
    options: [
      { name: 'Commit', value: 'commit', description: 'Finalize the upload' },
    ],
    default: 'commit',
    description: 'The action to perform on the chunked upload',
  },
];
