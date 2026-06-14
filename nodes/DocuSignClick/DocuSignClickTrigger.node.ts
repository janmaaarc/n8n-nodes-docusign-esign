import type {
  IHookFunctions,
  IWebhookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import * as crypto from 'crypto';

function verifySignature(payload: string, signature: string, secret: string): boolean {
  if (!payload || !signature || !secret) {return false;}
  try {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(payload).digest('base64');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch {
    return false;
  }
}

export class DocuSignClickTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'DocuSign Click Trigger',
    name: 'docuSignClickTrigger',
    icon: 'file:docusign.svg',
    group: ['trigger'],
    version: 1,
    description: 'Receive DocuSign Click (Clickwrap) webhook events',
    defaults: { name: 'DocuSign Click Trigger' },
    inputs: [],
    outputs: ['main'],
    credentials: [{ name: 'docuSignClickApi', required: true }],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'webhook',
      },
    ],
    properties: [
      {
        displayName: 'Events',
        name: 'events',
        type: 'multiOptions',
        options: [
          { name: 'Agreement Created', value: 'agreement-created' },
          { name: 'Agreement Agreed', value: 'agreement-agreed' },
          { name: 'Agreement Declined', value: 'agreement-declined' },
          { name: 'Agreement Expired', value: 'agreement-expired' },
        ],
        default: ['agreement-agreed'],
        description: 'Click events to listen for',
      },
      {
        displayName: 'Verify Signature',
        name: 'verifySignature',
        type: 'boolean',
        default: true,
        description: 'Whether to verify the HMAC-SHA256 webhook signature using the Webhook Secret from the credential',
      },
    ],
  };

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        return false;
      },
      async create(this: IHookFunctions): Promise<boolean> {
        return true;
      },
      async delete(this: IHookFunctions): Promise<boolean> {
        return true;
      },
    },
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const verifySignatureEnabled = this.getNodeParameter('verifySignature') as boolean;

    if (verifySignatureEnabled) {
      const credentials = await this.getCredentials('docuSignClickApi');
      const secret = credentials.webhookSecret as string;

      if (!secret) {
        throw new NodeApiError(this.getNode(), {}, { message: 'Webhook Secret is required when Verify Signature is enabled. Add it to your DocuSign Click API credential.' });
      }

      const signature = this.getHeaderData()['x-docusign-signature-1'] as string;
      const body = this.getBodyData();
      const payload = JSON.stringify(body);

      if (!signature || !verifySignature(payload, signature, secret)) {
        throw new NodeApiError(this.getNode(), {}, { message: 'Invalid webhook signature' });
      }
    }

    const body = this.getBodyData();
    const selectedEvents = this.getNodeParameter('events') as string[];
    const event = body.event as string;

    if (selectedEvents.length > 0 && event && !selectedEvents.includes(event)) {
      return { noWebhookResponse: true };
    }

    return {
      workflowData: [[{ json: body }]],
    };
  }
}
