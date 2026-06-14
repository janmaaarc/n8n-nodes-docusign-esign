import type {
  IHookFunctions,
  IWebhookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
  IDataObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import * as crypto from 'crypto';

function verifySignature(payload: string, signature: string, secret: string): boolean {
  if (!payload || !signature || !secret) return false;
  try {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(payload).digest('base64');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch {
    return false;
  }
}

export class DocuSignMaestroTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'DocuSign Maestro Trigger',
    name: 'docuSignMaestroTrigger',
    icon: 'file:docusign.svg',
    group: ['trigger'],
    version: 1,
    description: 'Receive DocuSign Maestro workflow events',
    defaults: { name: 'DocuSign Maestro Trigger' },
    inputs: [],
    outputs: ['main'],
    credentials: [{ name: 'docuSignMaestroApi', required: true }],
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
          { name: 'Instance Started', value: 'workflow-instance-started' },
          { name: 'Instance Completed', value: 'workflow-instance-completed' },
          { name: 'Instance Failed', value: 'workflow-instance-failed' },
        ],
        default: ['workflow-instance-completed'],
        description: 'Maestro events to listen for',
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
      const credentials = await this.getCredentials('docuSignMaestroApi');
      const secret = credentials.webhookSecret as string;

      if (!secret) {
        throw new NodeApiError(this.getNode(), {}, { message: 'Webhook Secret is required when Verify Signature is enabled. Add it to your DocuSign Maestro API credential.' });
      }

      const signature = this.getHeaderData()['x-docusign-signature-1'] as string;
      const body = this.getBodyData() as IDataObject;
      const payload = JSON.stringify(body);

      if (!signature || !verifySignature(payload, signature, secret)) {
        throw new NodeApiError(this.getNode(), {}, { message: 'Invalid webhook signature' });
      }
    }

    const body = this.getBodyData() as IDataObject;
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
