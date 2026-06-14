import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, IDataObject } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { navigatorApiRequest } from './helpers';
import { resourceProperty, allOperations, allFields } from './resources/index';

export class DocuSignNavigator implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'DocuSign Navigator',
    name: 'docuSignNavigator',
    icon: 'file:docusign.svg',
    group: ['output'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with DocuSign Navigator Agreement Intelligence API',
    defaults: { name: 'DocuSign Navigator' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'docuSignNavigatorApi', required: true }],
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

        if (resource === 'navigatorAgreement') {
          if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const limit = returnAll ? undefined : (this.getNodeParameter('limit', i));
            const searchOptions = this.getNodeParameter('searchOptions', i, {}) as IDataObject;
            const qs: Record<string, string | number> = {};
            if (limit) {qs.count = limit;}
            if (searchOptions.searchText) {qs.search_text = searchOptions.searchText as string;}
            if (searchOptions.agreementType) {qs.agreement_type = searchOptions.agreementType as string;}
            responseData = await navigatorApiRequest.call(this, 'GET', '/agreements', undefined, qs);
          } else if (operation === 'get') {
            const agreementId = this.getNodeParameter('agreementId', i) as string;
            responseData = await navigatorApiRequest.call(this, 'GET', `/agreements/${agreementId}`);
          } else if (operation === 'getProvisions') {
            const agreementId = this.getNodeParameter('agreementId', i) as string;
            responseData = await navigatorApiRequest.call(this, 'GET', `/agreements/${agreementId}/provisions`);
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
