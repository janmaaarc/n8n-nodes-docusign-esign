import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, IDataObject } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { webFormsApiRequest } from './helpers';
import { resourceProperty, allOperations, allFields } from './resources/index';

export class DocuSignWebForms implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'DocuSign Web Forms',
    name: 'docuSignWebForms',
    icon: 'file:docusign.svg',
    group: ['output'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with DocuSign Web Forms API',
    defaults: { name: 'DocuSign Web Forms' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'docuSignWebFormsApi', required: true }],
    properties: [resourceProperty, ...allOperations, ...allFields],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const resource = this.getNodeParameter('resource', i) as string;
        const operation = this.getNodeParameter('operation', i) as string;
        let responseData: IDataObject | IDataObject[];

        if (resource === 'webForm') {
          if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
            const qs: Record<string, string | number> = {};
            if (limit) qs.count = limit;
            responseData = await webFormsApiRequest.call(this, 'GET', '/forms', undefined, qs);
          } else if (operation === 'get') {
            const formId = this.getNodeParameter('formId', i) as string;
            responseData = await webFormsApiRequest.call(this, 'GET', `/forms/${formId}`);
          } else if (operation === 'delete') {
            const formId = this.getNodeParameter('formId', i) as string;
            responseData = await webFormsApiRequest.call(this, 'DELETE', `/forms/${formId}`);
          } else {
            throw new NodeApiError(this.getNode(), {}, { message: `Unknown operation: ${operation}` });
          }
        } else if (resource === 'webFormInstance') {
          const formId = this.getNodeParameter('formId', i) as string;
          if (operation === 'create') {
            const returnUrl = this.getNodeParameter('returnUrl', i, '') as string;
            const expirationOffset = this.getNodeParameter('expirationOffset', i, 3600) as number;
            const body: IDataObject = { expirationOffset };
            if (returnUrl) body.returnUrl = returnUrl;
            responseData = await webFormsApiRequest.call(this, 'POST', `/forms/${formId}/instances`, body);
          } else if (operation === 'get') {
            const instanceId = this.getNodeParameter('instanceId', i) as string;
            responseData = await webFormsApiRequest.call(this, 'GET', `/forms/${formId}/instances/${instanceId}`);
          } else {
            throw new NodeApiError(this.getNode(), {}, { message: `Unknown operation: ${operation}` });
          }
        } else {
          throw new NodeApiError(this.getNode(), {}, { message: `Unknown resource: ${resource}` });
        }

        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData as unknown as IDataObject[]),
          { itemData: { item: i } },
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
