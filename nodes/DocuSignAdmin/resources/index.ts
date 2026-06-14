import type { INodeProperties } from 'n8n-workflow';
import { adminOrgOperations, adminOrgFields } from './organization';
import { adminUserOperations, adminUserFields } from './user';
import { adminAccountOperations, adminAccountFields } from './account';

export const resourceProperty: INodeProperties = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    { name: 'Organization', value: 'adminOrganization', description: 'Manage DocuSign organizations' },
    { name: 'User', value: 'adminUser', description: 'Manage users in an organization' },
    { name: 'Account', value: 'adminAccount', description: 'List accounts in an organization' },
  ],
  default: 'adminOrganization',
};

export const allOperations: INodeProperties[] = [adminOrgOperations, adminUserOperations, adminAccountOperations];
export const allFields: INodeProperties[] = [...adminOrgFields, ...adminUserFields, ...adminAccountFields];
