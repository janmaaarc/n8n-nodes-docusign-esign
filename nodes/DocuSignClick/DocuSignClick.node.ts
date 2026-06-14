import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, IDataObject } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { clickApiRequest } from './helpers';
import { resourceProperty, allOperations, allFields } from './resources/index';

export class DocuSignClick implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'DocuSign Click',
    name: 'docuSignClick',
    icon: 'file:docusign.svg',
    group: ['output'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with DocuSign Click (Clickwrap) API',
    defaults: { name: 'DocuSign Click' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'docuSignClickApi', required: true }],
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

        if (resource === 'clickwrap') {
          if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
            const qs: Record<string, string | number> = {};
            if (limit) qs.count = limit;
            responseData = await clickApiRequest.call(this, 'GET', '/clickwraps', undefined, qs);
          } else if (operation === 'get') {
            const clickwrapId = this.getNodeParameter('clickwrapId', i) as string;
            responseData = await clickApiRequest.call(this, 'GET', `/clickwraps/${clickwrapId}`);
          } else if (operation === 'create') {
            const clickwrapName = this.getNodeParameter('clickwrapName', i) as string;
            responseData = await clickApiRequest.call(this, 'POST', '/clickwraps', { clickwrapName, status: 'active' });
          } else if (operation === 'update') {
            const clickwrapId = this.getNodeParameter('clickwrapId', i) as string;
            const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;
            responseData = await clickApiRequest.call(this, 'PUT', `/clickwraps/${clickwrapId}`, updateFields);
          } else if (operation === 'delete') {
            const clickwrapId = this.getNodeParameter('clickwrapId', i) as string;
            responseData = await clickApiRequest.call(this, 'DELETE', `/clickwraps/${clickwrapId}`);
          } else {
            throw new NodeApiError(this.getNode(), {}, { message: `Unknown operation: ${operation}` });
          }
        } else if (resource === 'clickAgreement') {
          const clickwrapId = this.getNodeParameter('clickwrapId', i) as string;
          if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
            const qs: Record<string, string | number> = {};
            if (limit) qs.count = limit;
            responseData = await clickApiRequest.call(this, 'GET', `/clickwraps/${clickwrapId}/agreements`, undefined, qs);
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
