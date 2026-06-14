import type { IExecuteFunctions, IDataObject, IHttpRequestMethods, JsonObject } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { setTimeout as delay } from 'node:timers/promises';

const MAX_RETRIES = 3;
const BASE_RETRY_DELAY_MS = 1000;

function getBaseUrl(environment: string): string {
  return environment === 'demo'
    ? 'https://lens-d.docusign.net'
    : 'https://lens.docusign.net';
}

export async function monitorApiRequest(
  this: IExecuteFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body?: IDataObject,
  qs: Record<string, string | number> = {},
): Promise<IDataObject> {
  const credentials = await this.getCredentials('docuSignMonitorApi');
  const environment = credentials.environment as string;
  const url = `${getBaseUrl(environment)}${endpoint}`;

  const options = {
    method,
    url,
    qs,
    json: true,
    timeout: 60000,
    ...(body && Object.keys(body).length > 0 ? { body } : {}),
  };

  let lastError: unknown;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return (await this.helpers.httpRequestWithAuthentication.call(
        this,
        'docuSignMonitorApi',
        options,
      )) as IDataObject;
    } catch (error) {
      lastError = error;
      const statusCode =
        (error as { statusCode?: number }).statusCode ||
        (error as { response?: { statusCode?: number } }).response?.statusCode;
      if (statusCode && statusCode >= 400 && statusCode < 500 && statusCode !== 429) {break;}
      if (attempt < MAX_RETRIES) {
        await delay(BASE_RETRY_DELAY_MS * Math.pow(2, attempt));
        continue;
      }
      break;
    }
  }
  throw new NodeApiError(this.getNode(), lastError as JsonObject);
}
