import type { INodeProperties } from 'n8n-workflow';

/**
 * Envelope Attachment operations — manage file attachments on envelopes
 */
export const envelopeAttachmentOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['envelopeAttachment'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Add an attachment',
      description: 'Add a file attachment to an envelope',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete an attachment',
      description: 'Remove an attachment from an envelope',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      action: 'Get many attachments',
      description: 'Get all attachments on an envelope',
    },
  ],
  default: 'getAll',
};

/**
 * Envelope Attachment fields
 */
export const envelopeAttachmentFields: INodeProperties[] = [
  // Shared: Envelope ID
  {
    displayName: 'Envelope ID',
    name: 'envelopeId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeAttachment'],
        operation: ['create', 'getAll', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the envelope',
  },

  // Create fields
  {
    displayName: 'Attachment Name',
    name: 'name',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeAttachment'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the attachment file',
  },
  {
    displayName: 'Attachment Data (Base64)',
    name: 'data',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeAttachment'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The base64-encoded file content',
    typeOptions: {
      rows: 3,
    },
  },
  {
    displayName: 'Access Control',
    name: 'accessControl',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['envelopeAttachment'],
        operation: ['create'],
      },
    },
    options: [
      {
        name: 'Sender Only',
        value: 'sender',
        description: 'Only the sender can access the attachment',
      },
      {
        name: 'Sender and All Recipients',
        value: 'senderAndAllRecipients',
        description: 'The sender and all recipients can access the attachment',
      },
    ],
    default: 'sender',
    description: 'Who can access the attachment',
  },

  // Delete field
  {
    displayName: 'Attachment ID',
    name: 'attachmentId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeAttachment'],
        operation: ['delete'],
      },
    },
    default: '',
    description: 'The ID of the attachment to delete',
  },
];
