import type { INodeProperties } from 'n8n-workflow';

/**
 * Envelope Email Setting operations — override email settings per envelope
 */
export const envelopeEmailSettingOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['envelopeEmailSetting'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      action: 'Create email settings',
      description: 'Set custom email settings for an envelope',
    },
    {
      name: 'Delete',
      value: 'delete',
      action: 'Delete email settings',
      description: 'Remove custom email settings from an envelope',
    },
    {
      name: 'Get',
      value: 'get',
      action: 'Get email settings',
      description: 'Get the email settings for an envelope',
    },
    {
      name: 'Update',
      value: 'update',
      action: 'Update email settings',
      description: 'Update email settings for an envelope',
    },
  ],
  default: 'get',
};

/**
 * Envelope Email Setting fields
 */
export const envelopeEmailSettingFields: INodeProperties[] = [
  // Shared: Envelope ID
  {
    displayName: 'Envelope ID',
    name: 'envelopeId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['envelopeEmailSetting'],
        operation: ['get', 'create', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the envelope',
  },

  // Create / Update fields
  {
    displayName: 'Reply Email Address',
    name: 'replyEmailAddressOverride',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['envelopeEmailSetting'],
        operation: ['create', 'update'],
      },
    },
    default: '',
    description: 'Override the reply-to email address for this envelope',
  },
  {
    displayName: 'Reply Email Name',
    name: 'replyEmailNameOverride',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['envelopeEmailSetting'],
        operation: ['create', 'update'],
      },
    },
    default: '',
    description: 'Override the reply-to display name for this envelope',
  },
  {
    displayName: 'BCC Email Addresses',
    name: 'bccEmailAddresses',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['envelopeEmailSetting'],
        operation: ['create', 'update'],
      },
    },
    default: '',
    description: 'Comma-separated list of BCC email addresses for envelope notifications',
  },
];
