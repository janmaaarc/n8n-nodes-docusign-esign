import type { INodeProperties } from 'n8n-workflow';
import { accountCustomFieldOperations, accountCustomFieldFields } from './accountCustomField';
import { accountGroupOperations, accountGroupFields } from './accountGroup';
import { accountUserOperations, accountUserFields } from './accountUser';
import { brandOperations, brandFields } from './brand';
import { bulkSendOperations, bulkSendFields } from './bulkSend';
import { chunkedUploadOperations, chunkedUploadFields } from './chunkedUpload';
import { commentsOperations, commentsFields } from './comments';
import { compositeTemplateOperations, compositeTemplateFields } from './compositeTemplate';
import { connectConfigOperations, connectConfigFields } from './connectConfig';
import { connectEventOperations, connectEventFields } from './connectEvent';
import { contactOperations, contactFields } from './contact';
import { customTabOperations, customTabFields } from './customTab';
import { documentGenerationOperations, documentGenerationFields } from './documentGeneration';
import { envelopeOperations, envelopeFields } from './envelope';
import { envelopeAttachmentOperations, envelopeAttachmentFields } from './envelopeAttachment';
import {
  envelopeCustomFieldOperations,
  envelopeCustomFieldFields,
} from './envelopeCustomField';
import {
  envelopeDocumentFieldOperations,
  envelopeDocumentFieldFields,
} from './envelopeDocumentField';
import {
  envelopeEmailSettingOperations,
  envelopeEmailSettingFields,
} from './envelopeEmailSetting';
import { envelopeLockOperations, envelopeLockFields } from './envelopeLock';
import { envelopeTransferOperations, envelopeTransferFields } from './envelopeTransfer';
import { folderOperations, folderFields } from './folder';
import { idVerificationOperations, idVerificationFields } from './idVerification';
import { paymentTabOperations, paymentTabFields } from './paymentTab';
import { permissionProfileOperations, permissionProfileFields } from './permissionProfile';
import { powerFormOperations, powerFormFields } from './powerForm';
import { recipientTabsOperations, recipientTabsFields } from './recipientTabs';
import { scheduledRoutingOperations, scheduledRoutingFields } from './scheduledRouting';
import { signingGroupOperations, signingGroupFields } from './signingGroup';
import { supplementalDocOperations, supplementalDocFields } from './supplementalDoc';
import { templateOperations, templateFields } from './template';
import { templateRecipientsOperations, templateRecipientsFields } from './templateRecipients';

/**
 * Resource selector for the DocuSign node
 */
export const resourceProperty: INodeProperties = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    {
      name: 'Account Custom Field',
      value: 'accountCustomField',
      description: 'Manage account-level custom field definitions',
    },
    {
      name: 'Account Group',
      value: 'accountGroup',
      description: 'Manage account permission groups',
    },
    {
      name: 'Account User',
      value: 'accountUser',
      description: 'Manage users in the DocuSign account',
    },
    {
      name: 'Brand',
      value: 'brand',
      description: 'Create, get, update, and delete account branding',
    },
    {
      name: 'Bulk Send',
      value: 'bulkSend',
      description: 'Create bulk send lists and send envelopes in bulk',
    },
    {
      name: 'Chunked Upload',
      value: 'chunkedUpload',
      description: 'Upload large documents in chunks',
    },
    {
      name: 'Comments',
      value: 'comments',
      description: 'Add and retrieve comments on envelopes',
    },
    {
      name: 'Composite Template',
      value: 'compositeTemplate',
      description: 'Create envelopes combining multiple server templates',
    },
    {
      name: 'Connect Configuration',
      value: 'connectConfig',
      description: 'Manage DocuSign Connect webhook configurations',
    },
    {
      name: 'Connect Event',
      value: 'connectEvent',
      description: 'Monitor and retry Connect webhook deliveries',
    },
    {
      name: 'Contact',
      value: 'contact',
      description: 'Manage contacts in the DocuSign address book',
    },
    {
      name: 'Custom Tab',
      value: 'customTab',
      description: 'Manage reusable custom tab (field) definitions',
    },
    {
      name: 'Document Generation',
      value: 'documentGeneration',
      description: 'Generate documents from templates with dynamic data fields',
    },
    {
      name: 'Envelope',
      value: 'envelope',
      description: 'Create, send, and manage signature envelopes',
    },
    {
      name: 'Envelope Attachment',
      value: 'envelopeAttachment',
      description: 'Manage file attachments on envelopes',
    },
    {
      name: 'Envelope Custom Field',
      value: 'envelopeCustomField',
      description: 'Manage custom metadata fields on envelopes',
    },
    {
      name: 'Envelope Document Field',
      value: 'envelopeDocumentField',
      description: 'Manage custom fields on individual documents in envelopes',
    },
    {
      name: 'Envelope Email Setting',
      value: 'envelopeEmailSetting',
      description: 'Override email settings per envelope',
    },
    {
      name: 'Envelope Lock',
      value: 'envelopeLock',
      description: 'Lock and unlock envelopes for safe editing',
    },
    {
      name: 'Envelope Transfer',
      value: 'envelopeTransfer',
      description: 'Manage envelope ownership transfer rules',
    },
    {
      name: 'Folder',
      value: 'folder',
      description: 'List folders and move envelopes between folders',
    },
    {
      name: 'ID Verification',
      value: 'idVerification',
      description: 'Get available identity verification workflows',
    },
    {
      name: 'Payment Tab',
      value: 'paymentTab',
      description: 'Create envelopes with payment collection',
    },
    {
      name: 'Permission Profile',
      value: 'permissionProfile',
      description: 'Manage permission profiles for account users',
    },
    {
      name: 'PowerForm',
      value: 'powerForm',
      description: 'Create and manage self-service signing forms',
    },
    {
      name: 'Recipient Tabs',
      value: 'recipientTabs',
      description: 'Get and update recipient tabs on envelopes',
    },
    {
      name: 'Scheduled Routing',
      value: 'scheduledRouting',
      description: 'Schedule envelope delivery for a future date',
    },
    {
      name: 'Signing Group',
      value: 'signingGroup',
      description: 'Manage groups where any member can sign on behalf of the group',
    },
    {
      name: 'Supplemental Document',
      value: 'supplementalDoc',
      description: 'Add supplemental documents like terms & conditions to envelopes',
    },
    {
      name: 'Template',
      value: 'template',
      description: 'Create, update, delete, and use envelope templates',
    },
    {
      name: 'Template Recipients',
      value: 'templateRecipients',
      description: 'Manage recipient roles on templates',
    },
  ],
  default: 'envelope',
};

/**
 * All operations for the DocuSign node
 */
export const allOperations: INodeProperties[] = [
  accountCustomFieldOperations,
  accountGroupOperations,
  accountUserOperations,
  brandOperations,
  bulkSendOperations,
  chunkedUploadOperations,
  commentsOperations,
  compositeTemplateOperations,
  connectConfigOperations,
  connectEventOperations,
  contactOperations,
  customTabOperations,
  documentGenerationOperations,
  envelopeOperations,
  envelopeAttachmentOperations,
  envelopeCustomFieldOperations,
  envelopeDocumentFieldOperations,
  envelopeEmailSettingOperations,
  envelopeLockOperations,
  envelopeTransferOperations,
  folderOperations,
  idVerificationOperations,
  paymentTabOperations,
  permissionProfileOperations,
  powerFormOperations,
  recipientTabsOperations,
  scheduledRoutingOperations,
  signingGroupOperations,
  supplementalDocOperations,
  templateOperations,
  templateRecipientsOperations,
];

/**
 * All fields for the DocuSign node
 */
export const allFields: INodeProperties[] = [
  ...accountCustomFieldFields,
  ...accountGroupFields,
  ...accountUserFields,
  ...brandFields,
  ...bulkSendFields,
  ...chunkedUploadFields,
  ...commentsFields,
  ...compositeTemplateFields,
  ...connectConfigFields,
  ...connectEventFields,
  ...contactFields,
  ...customTabFields,
  ...documentGenerationFields,
  ...envelopeFields,
  ...envelopeAttachmentFields,
  ...envelopeCustomFieldFields,
  ...envelopeDocumentFieldFields,
  ...envelopeEmailSettingFields,
  ...envelopeLockFields,
  ...envelopeTransferFields,
  ...folderFields,
  ...idVerificationFields,
  ...paymentTabFields,
  ...permissionProfileFields,
  ...powerFormFields,
  ...recipientTabsFields,
  ...scheduledRoutingFields,
  ...signingGroupFields,
  ...supplementalDocFields,
  ...templateFields,
  ...templateRecipientsFields,
];
