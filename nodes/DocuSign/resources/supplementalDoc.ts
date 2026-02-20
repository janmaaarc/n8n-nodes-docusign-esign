import type { INodeProperties } from 'n8n-workflow';

/**
 * Supplemental Document operations — attach supplemental documents to envelopes
 */
export const supplementalDocOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['supplementalDoc'],
    },
  },
  options: [
    {
      name: 'Add to Envelope',
      value: 'addToEnvelope',
      action: 'Add supplemental document to envelope',
      description: 'Add a supplemental document (e.g., terms & conditions) to an existing envelope',
    },
  ],
  default: 'addToEnvelope',
};

/**
 * Supplemental Document fields
 */
export const supplementalDocFields: INodeProperties[] = [
  {
    displayName: 'Envelope ID',
    name: 'envelopeId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['supplementalDoc'],
        operation: ['addToEnvelope'],
      },
    },
    default: '',
    description: 'The ID of the envelope to add the supplemental document to',
  },
  {
    displayName: 'Document (Base64 or Binary Property)',
    name: 'document',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['supplementalDoc'],
        operation: ['addToEnvelope'],
      },
    },
    default: '',
    description: 'Base64-encoded document content or binary property name',
  },
  {
    displayName: 'Document Name',
    name: 'documentName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['supplementalDoc'],
        operation: ['addToEnvelope'],
      },
    },
    default: 'supplemental.pdf',
    description: 'The name of the supplemental document',
  },
  {
    displayName: 'Display',
    name: 'display',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['supplementalDoc'],
        operation: ['addToEnvelope'],
      },
    },
    options: [
      {
        name: 'Modal',
        value: 'modal',
        description: 'Display as a modal dialog that must be acknowledged',
      },
      {
        name: 'Inline',
        value: 'inline',
        description: 'Display inline within the document flow',
      },
    ],
    default: 'modal',
    description: 'How the supplemental document is displayed to recipients',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['supplementalDoc'],
        operation: ['addToEnvelope'],
      },
    },
    options: [
      {
        displayName: 'Include in Download',
        name: 'includeInDownload',
        type: 'boolean',
        default: true,
        description: 'Whether to include the supplemental document in the combined download',
      },
      {
        displayName: 'Signer Must Acknowledge',
        name: 'signerMustAcknowledge',
        type: 'options',
        options: [
          { name: 'No Interaction', value: 'no_interaction' },
          { name: 'View', value: 'view' },
          { name: 'Accept', value: 'accept' },
        ],
        default: 'view',
        description: 'Level of acknowledgment required from signers',
      },
    ],
  },
];
