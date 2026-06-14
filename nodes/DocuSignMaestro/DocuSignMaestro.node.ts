import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, IDataObject } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { maestroApiRequest } from './helpers';
import { resourceProperty, allOperations, allFields } from './resources/index';

export class DocuSignMaestro implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'DocuSign Maestro',
    name: 'docuSignMaestro',
    icon: 'file:docusign.svg',
    group: ['output'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with DocuSign Maestro Workflow Builder API',
    defaults: { name: 'DocuSign Maestro' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'docuSignMaestroApi', required: true }],
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

        if (resource === 'maestroWorkflow') {
          if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
            const qs: Record<string, string | number> = {};
            if (limit) qs.count = limit;
            responseData = await maestroApiRequest.call(this, 'GET', '/workflows', undefined, qs);
          } else if (operation === 'get') {
            const workflowId = this.getNodeParameter('workflowId', i) as string;
            responseData = await maestroApiRequest.call(this, 'GET', `/workflows/${workflowId}`);
          } else if (operation === 'trigger') {
            const workflowId = this.getNodeParameter('workflowId', i) as string;
            const instanceDataStr = this.getNodeParameter('instanceData', i, '{}') as string;
            let instanceData: IDataObject = {};
            try { instanceData = JSON.parse(instanceDataStr) as IDataObject; } catch {}
            responseData = await maestroApiRequest.call(this, 'POST', `/workflows/${workflowId}/instances`, instanceData);
          } else {
            throw new NodeApiError(this.getNode(), {}, { message: `Unknown operation: ${operation}` });
          }
        } else if (resource === 'maestroInstance') {
          const workflowId = this.getNodeParameter('workflowId', i) as string;
          if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
            const qs: Record<string, string | number> = {};
            if (limit) qs.count = limit;
            responseData = await maestroApiRequest.call(this, 'GET', `/workflows/${workflowId}/instances`, undefined, qs);
          } else if (operation === 'get') {
            const instanceId = this.getNodeParameter('instanceId', i) as string;
            responseData = await maestroApiRequest.call(this, 'GET', `/workflows/${workflowId}/instances/${instanceId}`);
          } else if (operation === 'cancel') {
            const instanceId = this.getNodeParameter('instanceId', i) as string;
            responseData = await maestroApiRequest.call(this, 'DELETE', `/workflows/${workflowId}/instances/${instanceId}`);
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
