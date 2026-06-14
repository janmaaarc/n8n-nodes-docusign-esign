import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, IDataObject } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { adminApiRequest } from './helpers';
import { resourceProperty, allOperations, allFields } from './resources/index';

function requireNonEmpty(node: ReturnType<IExecuteFunctions['getNode']>, label: string, value: string): void {
  if (!value || value.trim() === '') {
    throw new NodeApiError(node, {}, { message: `${label} is required` });
  }
}

function requireEmail(node: ReturnType<IExecuteFunctions['getNode']>, value: string): void {
  if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new NodeApiError(node, {}, { message: 'Email must be a valid email address' });
  }
}

export class DocuSignAdmin implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'DocuSign Admin',
    name: 'docuSignAdmin',
    icon: 'file:docusign.svg',
    group: ['output'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with DocuSign Admin API for user and organization management',
    defaults: { name: 'DocuSign Admin' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'docuSignAdminApi', required: true }],
    properties: [resourceProperty, ...allOperations, ...allFields],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const credentials = await this.getCredentials('docuSignAdminApi');
        const orgId = credentials.organizationId as string;
        const resource = this.getNodeParameter('resource', i) as string;
        const operation = this.getNodeParameter('operation', i) as string;
        let responseData: IDataObject | IDataObject[];

        if (resource === 'adminOrganization') {
          if (operation === 'getAll') {
            responseData = await adminApiRequest.call(this, 'GET', '/organizations');
          } else if (operation === 'get') {
            const adminOrgId = this.getNodeParameter('adminOrgId', i) as string;
            requireNonEmpty(this.getNode(), 'Organization ID', adminOrgId);
            responseData = await adminApiRequest.call(this, 'GET', `/organizations/${adminOrgId}`);
          } else {
            throw new NodeApiError(this.getNode(), {}, { message: `Unknown operation: ${operation}` });
          }
        } else if (resource === 'adminUser') {
          if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
            const qs: Record<string, string | number> = {};
            if (limit) qs.count = limit;
            responseData = await adminApiRequest.call(this, 'GET', `/organizations/${orgId}/users`, undefined, qs);
          } else if (operation === 'get') {
            const userId = this.getNodeParameter('userId', i) as string;
            requireNonEmpty(this.getNode(), 'User ID', userId);
            responseData = await adminApiRequest.call(this, 'GET', `/organizations/${orgId}/users/${userId}`);
          } else if (operation === 'create') {
            const email = this.getNodeParameter('email', i) as string;
            requireEmail(this.getNode(), email);
            const firstName = this.getNodeParameter('firstName', i) as string;
            requireNonEmpty(this.getNode(), 'First Name', firstName);
            const lastName = this.getNodeParameter('lastName', i) as string;
            requireNonEmpty(this.getNode(), 'Last Name', lastName);
            responseData = await adminApiRequest.call(this, 'POST', `/organizations/${orgId}/users`, {
              user_name: `${firstName} ${lastName}`,
              email,
              first_name: firstName,
              last_name: lastName,
            });
          } else if (operation === 'update') {
            const userId = this.getNodeParameter('userId', i) as string;
            requireNonEmpty(this.getNode(), 'User ID', userId);
            const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;
            responseData = await adminApiRequest.call(this, 'PUT', `/organizations/${orgId}/users/${userId}`, updateFields);
          } else if (operation === 'delete') {
            const userId = this.getNodeParameter('userId', i) as string;
            requireNonEmpty(this.getNode(), 'User ID', userId);
            responseData = await adminApiRequest.call(this, 'DELETE', `/organizations/${orgId}/users/${userId}`);
          } else {
            throw new NodeApiError(this.getNode(), {}, { message: `Unknown operation: ${operation}` });
          }
        } else if (resource === 'adminAccount') {
          if (operation === 'getAll') {
            const orgIdForAccounts = this.getNodeParameter('orgIdForAccounts', i) as string;
            requireNonEmpty(this.getNode(), 'Organization ID', orgIdForAccounts);
            responseData = await adminApiRequest.call(this, 'GET', `/organizations/${orgIdForAccounts}/accounts`);
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
