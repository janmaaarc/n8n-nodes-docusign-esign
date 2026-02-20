import type { INodeProperties } from 'n8n-workflow';

/**
 * Payment Tab operations — create envelopes with payment collection
 */
export const paymentTabOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['paymentTab'],
    },
  },
  options: [
    {
      name: 'Create Envelope with Payment',
      value: 'createEnvelope',
      action: 'Create envelope with payment tab',
      description: 'Create an envelope that collects payment during signing',
    },
  ],
  default: 'createEnvelope',
};

/**
 * Payment Tab fields
 */
export const paymentTabFields: INodeProperties[] = [
  {
    displayName: 'Email Subject',
    name: 'emailSubject',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['paymentTab'],
        operation: ['createEnvelope'],
      },
    },
    default: '',
    description: 'The subject line for the envelope email',
  },
  {
    displayName: 'Template ID',
    name: 'templateId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['paymentTab'],
        operation: ['createEnvelope'],
      },
    },
    default: '',
    description: 'The template ID to use for the envelope',
  },
  {
    displayName: 'Signer Email',
    name: 'signerEmail',
    type: 'string',
    placeholder: 'name@email.com',
    required: true,
    displayOptions: {
      show: {
        resource: ['paymentTab'],
        operation: ['createEnvelope'],
      },
    },
    default: '',
    description: 'The email address of the signer',
  },
  {
    displayName: 'Signer Name',
    name: 'signerName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['paymentTab'],
        operation: ['createEnvelope'],
      },
    },
    default: '',
    description: 'The name of the signer',
  },
  {
    displayName: 'Payment Amount',
    name: 'paymentAmount',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['paymentTab'],
        operation: ['createEnvelope'],
      },
    },
    default: '',
    description: 'The payment amount (e.g., "100.00")',
  },
  {
    displayName: 'Currency Code',
    name: 'currencyCode',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['paymentTab'],
        operation: ['createEnvelope'],
      },
    },
    options: [
      { name: 'USD', value: 'USD' },
      { name: 'EUR', value: 'EUR' },
      { name: 'GBP', value: 'GBP' },
      { name: 'CAD', value: 'CAD' },
      { name: 'AUD', value: 'AUD' },
      { name: 'JPY', value: 'JPY' },
    ],
    default: 'USD',
    description: 'The ISO 4217 currency code for the payment',
  },
  {
    displayName: 'Payment Gateway ID',
    name: 'gatewayAccountId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['paymentTab'],
        operation: ['createEnvelope'],
      },
    },
    default: '',
    description: 'The payment gateway account ID configured in DocuSign',
  },
  {
    displayName: 'Item Name',
    name: 'itemName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['paymentTab'],
        operation: ['createEnvelope'],
      },
    },
    default: '',
    description: 'The name/description of the payment item',
  },
];
