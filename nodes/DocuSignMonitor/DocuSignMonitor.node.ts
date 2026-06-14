import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, IDataObject } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { monitorApiRequest } from './helpers';
import { resourceProperty, allOperations, allFields } from './resources/index';

export class DocuSignMonitor implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'DocuSign Monitor',
    name: 'docuSignMonitor',
    icon: 'file:docusign.svg',
    group: ['output'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with DocuSign Monitor API for activity event streaming',
    defaults: { name: 'DocuSign Monitor' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'docuSignMonitorApi', required: true }],
    properties: [resourceProperty, ...allOperations, ...allFields],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const resource = this.getNodeParameter('resource', i);
        const operation = this.getNodeParameter('operation', i);
        let responseData: IDataObject | IDataObject[];

        if (resource === 'eventStream') {
          if (operation === 'get') {
            const cursor = this.getNodeParameter('cursor', i, '') as string;
            const limit = this.getNodeParameter('limit', i, 100);
            const qs: Record<string, string | number> = { limit };
            if (cursor) {qs.cursor = cursor;}
            responseData = await monitorApiRequest.call(this, 'GET', '/api/v2.0/datasets/monitor.activity/stream', undefined, qs);
          } else if (operation === 'listDatasets') {
            responseData = await monitorApiRequest.call(this, 'GET', '/api/v2.0/datasets');
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
